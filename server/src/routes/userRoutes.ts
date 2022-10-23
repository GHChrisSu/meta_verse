import express from "express";
import { z } from "zod";
import * as authController from "../controllers/authController";
import { PRISMA } from "../config/database.config";
import * as matchmakerHelper from "../helpers/matchmakerHelper";
import { updateUserForNewSession } from "../controllers/authController";
import { removeId } from "../helpers";
import logger from "../helpers/logger";
import { inferAsyncReturnType, initTRPC } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";
// created for each request
const createContext = ({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) => ({}); // no context
type Context = inferAsyncReturnType<typeof createContext>;

const t = initTRPC.context<Context>().create();

const appRouter = t.router({
  signup: t.procedure
    .input(
      z.object({
        email: z.string(),
        username: z.string(),
        password: z.string(),
      })
    )
    .mutation(async (req) => {
      let user = await PRISMA.user.findFirst({
        where: { email: req.input.email },
      });

      let seatReservation;

      if (user == null) {
        // Create a new user
        user = await PRISMA.user.create({
          data: {
            username: req.input.username,
            email: req.input.email,
            password: req.input.password,
          },
        });

        // Match make the user into a room
        seatReservation = await matchmakerHelper.matchMakeToRoom(
          "lobby_room",
          user.progress
        );

        updateUserForNewSession(user, seatReservation.sessionId);

        await PRISMA.user.update({
          where: { id: user.id },
          data: removeId(user),
        });
      } else {
        logger.error(
          `*** Sign Up Error - User with that email already exists!`
        );
        throw "User with that email already exists!";
      }

      const newUserObj = { ...user };
      delete newUserObj.password; // Don't send the user's password back to the client

      return {
        error: false,
        output: {
          seatReservation,
          user: newUserObj,
        },
      };
    }),
});

export type AppRouter = typeof appRouter;

export default trpcExpress.createExpressMiddleware({
  // @ts-ignore
  router: appRouter,
  createContext,
});
