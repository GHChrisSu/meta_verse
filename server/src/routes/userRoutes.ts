import express from "express";
import { z } from "zod";
import * as authController from "../controllers/authController";
import { PRISMA } from "../config/database.config";
import * as matchmakerHelper from "../helpers/matchmakerHelper";
import { updateUserForNewSession } from "../controllers/authController";
import { removeId } from "../helpers";
import { matchMaker } from "colyseus";
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
  signUp: t.procedure
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

  logIn: t.procedure
    .input(
      z.object({
        email: z.string(),
        password: z.string(),
      })
    )
    .mutation(async (req) => {
      // Check if an account with the email exists
      const user = await PRISMA.user.findFirst({
        where: { email: req.input.email },
      });

      // Check if passwords match
      let validPassword: boolean =
        user != null ? user.password == req.input.password : false;

      if (user == null || validPassword == false) {
        throw "Incorrect email or password";
      }

      // Wait a minimum of 30 seconds when a pending session Id currently exists
      // before letting the user sign in again
      if (
        user.pendingSessionId &&
        user.pendingSessionTimestamp &&
        Date.now() - user.pendingSessionTimestamp <= 30000
      ) {
        let timeLeft = (Date.now() - user.pendingSessionTimestamp) / 1000;
        logger.error(
          `Can't log in right now, try again in ${timeLeft} seconds!`
        );

        throw `Can't log in right now, try again in ${timeLeft} seconds!`;
      }

      // Match make the user into a room filtering based on the user's progress
      const seatReservation: matchMaker.SeatReservation =
        await matchmakerHelper.matchMakeToRoom("lobby_room", user.progress);

      updateUserForNewSession(user, seatReservation.sessionId);

      // Save the user updates to the database
      await PRISMA.user.update({
        where: { id: user.id },
        data: removeId(user),
      });

      // Don't include the password in the user object sent back to the client
      const userCopy = { ...user };
      delete userCopy.password;

      // Send the user data and seat reservation back to the client
      // where the seat reservation can be used by the client to
      // consume the seat reservation and join the room.
      return {
        error: false,
        output: {
          seatReservation,
          user: removeId(userCopy),
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
