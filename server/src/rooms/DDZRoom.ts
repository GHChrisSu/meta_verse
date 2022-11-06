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

  async onJoin(client: Client, options: any, auth: any) {
    logger.info(`*** On Join - ${client.sessionId} ${client.id} ***`, options);

    // Create a new instance of NetworkedEntityState for this client and assign initial state values
    let ddzNetworkedUser = new DDZUserEntityState().assign({
      id: " client.id,",
    });

    // Sets the coin value of the networked user defaulting to 0 if none exists
    ddzNetworkedUser.coins = auth.coins || 100;

    if (this.state.ddzUserEntityState.keys.length === 0) {
      this.state.ownPlayerId = client.id; //创建房间的玩家
      this.state.bottom = 10;
      this.state.rate = 1;
      this.state.houseManagerId = client.id; //房主(不是地主)
    }

    this.state.ddzUserEntityState.set(client.id, ddzNetworkedUser);
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
