import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { AppRouter } from "../../../../server/src/routes/userRoutes";
import Colyseus from "db://colyseus-sdk/colyseus.js";

export class Connector {
  public host: string = "localhost";
  public port: number = 2567;
  public client: Colyseus.Client = new Colyseus.Client(
    `ws://${this.host}:${this.port}`
  );

  // @ts-ignore
  public trpc = createTRPCProxyClient<AppRouter>({
    links: [
      httpBatchLink({
        url: `http://${this.host}:${this.port}/trpc`,
      }),
    ],
  });
}

export default new Connector();
