import { Component, director, Vec2, _decorator } from "cc";
const { ccclass, property } = _decorator;

import Colyseus from "db://colyseus-sdk/colyseus.js";
import type {
  ChatRoomState,
  NetworkedEntityState,
  RoomState,
} from "../../../../Server/src/rooms/schema/RoomState";
import { Interactable } from "../Environment/Interactable";
import Connector from "../Helpers/Connector";
import { Delay } from "../Helpers/Delay";
import { EventDispatcher } from "../Helpers/EventDispatcher";
import { MovedToGridMessage, ObjectUseMessage } from "../Models/Messages";
import { RequestResponse } from "../Models/RequestResponse";
import { UserData } from "../Models/UserData";
import { NetworkedEntity } from "../Player/NetworkedEntity";
import { ChatManager } from "./ChatManager";
import { EnvironmentController } from "./EnvironmentController";
import { NetworkedEntityFactory } from "./NetworkedEntityFactory";

/*
 * NOTE:
 * This demo makes use of a very basic user authentication system with the intent of having
 * player persistence for unique user accounts and should NOT be used as a real
 * world example of how to implement user authentication as a whole.
 * Do NOT use any email and password combination you actually use anywhere else.
 */

@ccclass("MMOManager")
export class MMOManager extends Component {
  private static _instance: MMOManager;

  public static get Instance() {
    return this._instance;
  }

  private constructor() {
    super();

    if (MMOManager._instance != null) {
      this._shouldSelfDestruct = true;
      return;
    }

    MMOManager._instance = this;
  }

  public onRoomChanged: EventDispatcher<Colyseus.Room<RoomState>> =
    new EventDispatcher<Colyseus.Room<RoomState>>("onRoomChanged");
  public onPlayerAdd: EventDispatcher<NetworkedEntityState> =
    new EventDispatcher<NetworkedEntityState>("onPlayerAdd");
  public onPlayerRemove: EventDispatcher<NetworkedEntityState> =
    new EventDispatcher<NetworkedEntityState>("onPlayerRemove");

  public get IsReady(): boolean {
    return !MMOManager.Instance === false;
  }

  public get CurrentUser() {
    return this._currentUser;
  }

  private set CurrentUser(value: UserData) {
    this._currentUser = value;
  }

  public get Room() {
    return this._room;
  }

  private set Room(value: Colyseus.Room<RoomState>) {
    this._room = value;
  }

  public get ServerTime(): number {
    if (this._currentRoomState) {
      return this._currentRoomState.serverTime;
    }

    console.warn(`Asked for server time but no room yet!`);
    return 0;
  }

  private _shouldSelfDestruct: boolean = false;
  private _currentUser: UserData = null;
  private _room: Colyseus.Room<RoomState> = null;
  private _currentRoomState: RoomState = null;
  private _isQuitting: boolean = false;

  start() {
    if (this._shouldSelfDestruct) {
      this.node.destroy();

      return;
    }

    this.initializeClient();
  }

  onDestroy() {
    this.unregisterHandlers();
  }

  public initializeClient() {
    if (!this.isValid) {
      return;
    }

    console.log(`MMO Manager - Initialize Client`);
  }

  private registerHandlers() {
    console.log(`Register Room Handlers`);

    if (this.Room) {
      this.Room.onLeave.once(this.onLeaveGridRoom);

      this.Room.onStateChange.once(this.onRoomStateChange);

      this.Room.state.networkedUsers.onAdd =
        MMOManager.Instance.onAddNetworkedUser;
      this.Room.state.networkedUsers.onRemove =
        MMOManager.Instance.onRemoveNetworkedUser;

      this.Room.onMessage<ObjectUseMessage>("objectUsed", (msg) => {
        this.awaitObjectInteraction(
          msg.interactedObjectID,
          msg.interactingStateID
        );
      });

      this.Room.onMessage<MovedToGridMessage>("movedToGrid", (msg) => {
        this.onMovedToGrid(msg);
      });
    } else {
      console.error(`Cannot register room handlers, room is null!`);
    }
  }

  private unregisterHandlers() {
    if (this.Room) {
      this.Room.onLeave.remove(this.onLeaveGridRoom);
      this.Room.onStateChange.remove(this.onRoomStateChange);
      this.Room.state.networkedUsers.onAdd = null;
      this.Room.state.networkedUsers.onRemove = null;
    }
  }

  private onRoomStateChange(state: any) {}

  private onAddNetworkedUser(item: NetworkedEntityState, key: string) {
    MMOManager.Instance.spawnPlayer(key);
    MMOManager.Instance.onPlayerAdd?.invoke(item);
  }

  private onRemoveNetworkedUser(item: NetworkedEntityState, key: string) {
    NetworkedEntityFactory.Instance.removeEntity(key);
    MMOManager.Instance.onPlayerRemove?.invoke(item);
  }

  private async onMovedToGrid(msg: MovedToGridMessage) {
    this.unregisterHandlers();

    // Remove all other entities from the scene
    NetworkedEntityFactory.Instance.removeAllEntities(true);

    this.Room.leave(true);

    ChatManager.Instance.leaveChatroom();

    // Transition environment to new grid
    EnvironmentController.Instance.transitionArea(
      msg.prevGridPosition,
      msg.newGridPosition,
      false
    );

    while (EnvironmentController.Instance.LoadingArea) {
      await Delay.delay(100);
    }

    // Join room for the new grid
    this.consumeSeatReservation(
      msg.seatReservation.room,
      msg.seatReservation.sessionId
    );
  }

  private spawnPlayer(entitySessionId: string) {
    const isOUrs: boolean = entitySessionId === this.Room.sessionId;

    const entityState: NetworkedEntityState =
      this.Room.state.networkedUsers.get(entitySessionId);

    if (
      isOUrs === false ||
      (isOUrs && !EnvironmentController.Instance.PlayerObject)
    ) {
      NetworkedEntityFactory.Instance.spawnEntity(entityState, isOUrs);
    } else {
      // Update our existing entity

      if (
        NetworkedEntityFactory.Instance.updateOurEntity(entityState) === false
      ) {
        // Spawn a new entity for us since something went wrong attempting to update our existing one
        NetworkedEntityFactory.Instance.spawnEntity(entityState, true);
      }
    }
  }

  /**
   * Sends the provided user info to the server to attempt the creation of a new account.
   * @param username Username of the new account
   * @param email Email of the new account
   * @param password Password of the new account
   * @param onComplete Callback to execute when the request has completed
   */
  public async userSignUp(username: string, email: string, password: string) {
    const res = await Connector.trpc.signUp.mutate({
      username,
      email,
      password,
    });

    return res;
  }

  /**
   * Send the provided user info to the server to attempt user login.
   * @param email Email of the user account
   * @param password Password of the user account
   * @param onComplete Callback to execute when the request has completed
   */
  public async userLogIn(email: string, password: string) {
    const res = await Connector.trpc.logIn.mutate({
      email,
      password,
    });

    return res;
  }

  public setCurrentUser(response: RequestResponse) {
    this.CurrentUser = new UserData(response.output.user);
  }

  public async loadGridAndConsumeSeatReservation(
    requestResponse: RequestResponse
  ) {
    let playerPrevGrid: Vec2 = this.CurrentUser.gridAsVector2(false);
    let playerProgress: Vec2 = this.CurrentUser.gridAsVector2();

    // Load the grid the player is currently in
    EnvironmentController.Instance.transitionArea(
      playerPrevGrid,
      playerProgress,
      true
    );

    // Wait for grid area load in environment controller to complete
    while (EnvironmentController.Instance.LoadingArea) {
      await Delay.delay(100);
    }

    // Finally join the room by consuming the seat reservation
    this.consumeSeatReservation(
      requestResponse.output.seatReservation.room,
      requestResponse.output.seatReservation.sessionId
    );
  }

  public async consumeSeatReservation(
    room: Colyseus.RoomAvailable,
    sessionId: string
  ) {
    try {
      this.Room = await Connector.client.consumeSeatReservation<RoomState>({
        room,
        sessionId,
      });

      this.onRoomChanged.invoke(this.Room);

      this._currentRoomState = this.Room.state;

      this.joinChatRoom();
      this.registerHandlers();
    } catch (error) {
      console.error(`Error attempting to consume seat reservation - ${error}`);
    }
  }

  private onLeaveGridRoom(code: number) {
    console.log(`We have left the current grid room - ${code}`);
  }

  public exitToMainMenu() {
    if (this._isQuitting) {
      return;
    }

    this._isQuitting = true;
    this.Room.leave(true);

    ChatManager.Instance.leaveChatroom();

    director.loadScene("MMOLoginScene", () => {
      this._isQuitting = false;
    });
  }

  private async joinChatRoom() {
    let chatRoom: Colyseus.Room<ChatRoomState> =
      await Connector.client.joinOrCreate<ChatRoomState>("chat_room", {
        roomID: this.Room.id,
        messageLifetime: ChatManager.Instance.messageShowTime,
      });

    ChatManager.Instance.setRoom(chatRoom);
  }

  private async awaitObjectInteraction(objectID: string, entityID: string) {
    while (!this.Room.state.interactableItems.has(objectID)) {
      //Wait for the room to be aware of the object
      await Delay.delay(100);
    }

    let entity: NetworkedEntity =
      NetworkedEntityFactory.Instance.getEntityById(entityID);
    EnvironmentController.Instance.objectUsed(
      this.Room.state.interactableItems.get(objectID),
      entity
    );
  }

  /**
   * Send an action and message object to the room.
   * @param action The action to take.
   * @param message The message object to pass along to the room.
   */
  public static netSend(action: string, message: any = null) {
    if (!this.Instance.Room) {
      console.error(`Error: Not in room for action ${action} msg `, message);
      return;
    }

    this.Instance.Room.send(action, message);
  }

  /**
   * Sends a message to the room on the server that an <see cref="Interactable"/> has been used
   * @param interactable The "Interactable" used.
   * @param entity The entity that has used the "Interactable".
   */
  public sendObjectInteraction(
    interactable: Interactable,
    entity: NetworkedEntity
  ) {
    MMOManager.netSend("objectInteracted", [
      interactable.ID,
      interactable.getServerType(),
    ]);
  }
}
