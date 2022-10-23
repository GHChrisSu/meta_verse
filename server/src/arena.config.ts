import Arena from "@colyseus/arena";
import { monitor } from "@colyseus/monitor";
import express from "express";
import { connect } from "./config/database.config";
import userRoutes from "./routes/userRoutes";

/**
 * Import your Room files
 */
import { ChatRoom } from "./rooms/ChatRoom";
import { MMORoom } from "./rooms/MMORoom";
import logger from "./helpers/logger";

export default Arena({
  getId: () => "Your Colyseus App",

  initializeGameServer: (gameServer) => {
    /**
     * Define your room handlers:
     */
    gameServer.define("chat_room", ChatRoom).filterBy(["roomID"]);
    gameServer.define("lobby_room", MMORoom).filterBy(["progress"]); // Filter room by "progress" (which grid we're wanting to join EX: -1x2)
  },

  initializeExpress: (app) => {
    /**
     * Bind your custom express routes here:
     */
    // Body parser - reads data from request body into json object
    app.use(express.json());
    app.use(express.urlencoded({ extended: true, limit: "10kb" }));

    // Register routes for our simple user auth
    app.use("/trpc", userRoutes);

    // Connect to our database
    connect().then(async () => {
      logger.info(`*** Connected to Database! ***`);
    });

    app.get("/", (req, res) => {
      res.send("It's time to kick ass and chew bubblegum!");
    });

    /**
     * Bind @colyseus/monitor
     * It is recommended to protect this route with a password.
     * Read more: https://docs.colyseus.io/tools/monitor/
     */
    app.use("/colyseus", monitor());
  },

  beforeListen: () => {
    /**
     * Before before gameServer.listen() is called.
     */
  },
});
