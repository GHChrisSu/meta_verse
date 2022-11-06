import { Component, director, _decorator } from "cc";
const { ccclass, property } = _decorator;

import Colyseus from "db://colyseus-sdk/colyseus.js";
import type {
  ChatRoomState,
  DDZRoomState,
  DDZUserEntityState,
} from "../../../../Server/src/rooms/schema/RoomState";
import { EventDispatcher } from "../Helpers/EventDispatcher";
import { RequestResponse } from "../Models/RequestResponse";
import { ChatManager } from "./ChatManager";

@ccclass("DDZManager")
export class DDZManager extends Component {
  private static _instance: DDZManager;

  public static get Instance() {
    return this._instance;
  }

  private constructor() {
    super();

    if (DDZManager._instance != null) return;
    DDZManager._instance = this;
  }

  public onRoomChanged: EventDispatcher<Colyseus.Room<DDZRoomState>> =
    new EventDispatcher<Colyseus.Room<DDZRoomState>>("onRoomChanged");
  public onPlayerAdd: EventDispatcher<DDZUserEntityState> =
    new EventDispatcher<DDZUserEntityState>("onPlayerAdd");
  public onPlayerRemove: EventDispatcher<DDZUserEntityState> =
    new EventDispatcher<DDZUserEntityState>("onPlayerRemove");

  public get ddzRoom(): Colyseus.Room<DDZRoomState> {
    return this._ddzRoom;
  }
  public set ddzRoom(value: Colyseus.Room<DDZRoomState>) {
    this._ddzRoom = value;
  }

  private _client: Colyseus.Client | null = null;
  private _ddzRoom: Colyseus.Room<DDZRoomState> = null;
  private _isQuitting: boolean = false;

  start() {}

  onDestroy() {
    this.unregisterDDZHandlers();
  }

  private registerDDZHandlers() {
    console.log(`Register Room Handlers`);

    if (this.ddzRoom) {
      this.ddzRoom.onStateChange.once(this.onRoomStateChange);

      // this.ddzRoom.state.ddzUserEntityState.onAdd =
      //   DDZManager.Instance.onAddNetworkedUser;
      // this.ddzRoom.state.networkedUsers.onRemove =
      //   DDZManager.Instance.onRemoveNetworkedUser;
    } else {
      console.error(`Cannot register room handlers, room is null!`);
    }
  }

  private unregisterDDZHandlers() {
    if (this.ddzRoom) {
      this.ddzRoom.onStateChange.remove(this.onRoomStateChange);
      this.ddzRoom.state.ddzUserEntityState.onAdd = null;
      this.ddzRoom.state.ddzUserEntityState.onRemove = null;
    }
  }

  private onRoomStateChange(state: any) {}

  public async loadDDZRoomSeatReservation(requestResponse: RequestResponse) {
    // Finally join the room by consuming the seat reservation
    this.consumeDDZSeatReservation(
      requestResponse.output.ddzSeatReservation.room,
      requestResponse.output.ddzSeatReservation.sessionId
    );
  }

  public async consumeDDZSeatReservation(
    room: Colyseus.RoomAvailable,
    sessionId: string
  ) {
    try {
      this.ddzRoom = await this._client.consumeSeatReservation<DDZRoomState>({
        room,
        sessionId,
      });

      this.joinChatRoom();
      this.registerDDZHandlers();
    } catch (error) {
      console.error(`Error attempting to consume seat reservation - ${error}`);
    }
  }

  public exitToMainMenu() {
    if (this._isQuitting) {
      return;
    }

    this._isQuitting = true;
    this.ddzRoom.leave(true);

    ChatManager.Instance.leaveChatroom();

    director.loadScene("MMOLoginScene", () => {
      this._isQuitting = false;
    });
  }

  /** Hand the manager the current ChatRoom  */
  public async setRoom(room: Colyseus.Room<DDZRoomState>) {
    this.ddzRoom = room;

    this.registerDDZHandlers();
    this.joinChatRoom();
  }

  private async joinChatRoom() {
    let chatRoom: Colyseus.Room<ChatRoomState> =
      await this._client.joinOrCreate<ChatRoomState>("chat_room", {
        roomID: this.ddzRoom.id,
        messageLifetime: ChatManager.Instance.messageShowTime,
      });

    ChatManager.Instance.setRoom(chatRoom);
  }
}
