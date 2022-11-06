import { Client, Room, ServerError } from "colyseus";
import { PRISMA } from "../config/database.config";
import CardManager from "../game/card_manager";
import { ROOM_STATE } from "../game/defines";
import { removeId } from "../helpers";
import logger from "../helpers/logger";
import { AvatarState } from "./schema/AvatarState";
import {
  ChatMessage,
  ChatQueue,
  ChatRoomState,
  DDZRoomState,
  DDZUserEntityState,
  NetworkedEntityState,
} from "./schema/RoomState";

export class DDZRoom extends Room<DDZRoomState> {
  carder: CardManager; //发牌对象

  onCreate(options: any) {
    this.setState(new DDZRoomState());

    logger.info(
      "*********************** MMO DDZ ROOM CREATED ***********************"
    );
    console.log(options);
    logger.info("***********************");

    this.registerForMessages();
  }

  /** onAuth is called before onJoin */
  async onAuth(client: Client, options: any, request: any) {
    // Check for a user with a pending sessionId that matches this client's sessionId
    let user = await PRISMA.user.findFirst({
      where: {
        pendingSessionId: client.sessionId,
      },
    });

    if (user) {
      // A user with the pendingSessionId does exist

      // Update user; clear their pending session Id and update their active session Id
      user.activeSessionId = client.sessionId;
      user.pendingSessionId = "";

      // Save the user changes to the database
      await PRISMA.user.update({
        where: { id: user.id },
        data: removeId(user),
      });

      // Returning the user object equates to returning a "truthy" value that allows the onJoin function to continue
      return user;
    } else {
      // No user object was found with the pendingSessionId like we expected
      logger.error(
        `On Auth - No user found for session Id - ${client.sessionId}`
      );

      throw new ServerError(400, "Bad session!");
    }
  }

  async onJoin(client: Client, options: any, auth: any) {
    logger.info(`*** On Join - ${client.sessionId} ***`);

    // Create a new instance of NetworkedEntityState for this client and assign initial state values
    let newNetworkedUser = new DDZUserEntityState().assign({
      id: client.id,
      username: auth.username,
    });

    // Sets the coin value of the networked user defaulting to 0 if none exists
    newNetworkedUser.coins = auth.coins || 100;

    if (this.state.ddzUserEntityState.keys.length === 0) {
      this.state.ownPlayerId = client.id; //创建房间的玩家
      this.state.bottom = 10;
      this.state.rate = 1;
      this.state.houseManagerId = client.id; //房主(不是地主)
      this.state.roomState = ROOM_STATE.ROOM_INVALID; //房间状态
      this.state.robPlayerIds = []; //复制一份房间内player,做抢地主操作
      this.state.roomMasterId = undefined; //房间地主引用
      this.state.threeCards = []; //三张底牌
      this.state.playingIds = []; //存储出牌的用户(一轮)
      this.state.curPushCardList = []; //当前玩家出牌列表
      this.state.lastPushCardList = []; //玩家上一次出的牌
      this.state.lastPushCardPlayerId = ""; //最后一个出牌的account
    }

    this.state.ddzUserEntityState.set(client.id, newNetworkedUser);
  }

  // Callback when a client has left the room
  async onLeave(client: Client, consented: boolean) {
    logger.info(`***Chat User Leave - ${client.id} ***`);
  }

  onDispose() {
    console.log("room", this.roomId, "disposing...");
  }

  registerForMessages() {
    this.onMessage("player_ready", (client: Client, message: any) => {
      this.handleNewMessage(client, message);
      const ddzUser = this.state.ddzUserEntityState.get(client.sessionId);
      ddzUser.ready = true;
    });

    this.onMessage("player_start", (client: Client, message: any) => {
      // TODO: 判断是否都准备 都准备开始 没有都准备不开始
    });

    this.onMessage("player_rob", (client: Client, message: any) => {
      // TODO: 抢地主
    });

    this.onMessage("bu_chu_card_req", (client: Client, message: any) => {
      // this.room.playerBuChuCard();
    });

    this.onMessage("chu_card_req", (client: Client, message: any) => {
      // this.room.playerChuCard(this, data, (err, result) => {
      //   if (err) {
      //     console.log("playerChuCard cb err:" + err + " " + result);
      //     this._notify("chu_card_res", err, result.data, callindex);
      //   }
      //   this._notify("chu_card_res", err, result.data, callindex);
      // });
    });
  }

  handleNewMessage(client: Client, message: any) {
    console.log(client, message);

    // let newChatMessage = new ChatMessage().assign({
    //   senderID: client.sessionId,
    //   message: message.message,
    //   timestamp: this.serverTime + this.messageLifetime,
    // });

    // this.placeMessageInQueue(client, newChatMessage);
  }
}
