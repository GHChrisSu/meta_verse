import { Schema, type, MapSchema, ArraySchema } from "@colyseus/schema";
import { AvatarState } from "./AvatarState";
import { Vector3 } from "../../helpers/Vectors";
import { ROOM_STATE } from "../../game/defines";

export class NetworkedEntityState extends Schema {
  @type("string") id: string = "ID";
  @type("string") chatID: string = "ID";
  //Position
  @type("number") xPos: number = 0.0;
  @type("number") yPos: number = 0.0;
  @type("number") zPos: number = 0.0;
  //Rotation
  @type("number") xRot: number = 0.0;
  @type("number") yRot: number = 0.0;
  @type("number") zRot: number = 0.0;
  @type("number") wRot: number = 0.0;

  @type(AvatarState) avatar: AvatarState = new AvatarState();
  @type("number") coins: number = 0.0;

  //Interpolation values
  @type("number") timestamp: number = 0.0;

  @type("string") username: string = "";
}

export class InteractableState extends Schema {
  @type("string") id: string = "ID";
  @type("boolean") inUse: boolean = false;
  @type("string") interactableType: string = "";
  @type("number") availableTimestamp: number = 0.0;
  @type("number") coinChange: number = 0.0;
  @type("number") useDuration: number = 0.0;
}

export class RoomState extends Schema {
  @type({ map: NetworkedEntityState }) networkedUsers =
    new MapSchema<NetworkedEntityState>();
  @type({ map: InteractableState }) interactableItems =
    new MapSchema<InteractableState>();
  @type("number") serverTime: number = 0.0;

  getUserPosition(sessionId: string): any {
    if (this.networkedUsers.has(sessionId)) {
      const user: NetworkedEntityState = this.networkedUsers.get(sessionId);

      return {
        x: user.xPos,
        y: user.yPos,
        z: user.zPos,
      };
    }

    return null;
  }

  setUserPosition(sessionId: string, position: Vector3) {
    if (this.networkedUsers.has(sessionId)) {
      const user: NetworkedEntityState = this.networkedUsers.get(sessionId);

      user.xPos = position.x;
      user.yPos = position.y;
      user.zPos = position.z;
    }
  }

  getUserRotation(sessionId: string): any {
    if (this.networkedUsers.has(sessionId)) {
      const user: NetworkedEntityState = this.networkedUsers.get(sessionId);

      return {
        x: user.xRot,
        y: user.yRot,
        z: user.zRot,
      };
    }

    return null;
  }

  getUserAvatarState(sessionId: string): AvatarState {
    if (this.networkedUsers.has(sessionId)) {
      const user: NetworkedEntityState = this.networkedUsers.get(sessionId);
      return user.avatar;
    }

    return null;
  }
}

//Chat related schemas
export class ChatMessage extends Schema {
  @type("string") senderID: string = "";
  @type("string") message: string = "";
  @type("number") timestamp: number = 0.0;
  @type("number") createdAt: number = Date.now();
}

//An array of messages for a user
export class ChatQueue extends Schema {
  @type({ array: ChatMessage }) chatMessages = new ArraySchema<ChatMessage>();
}

export class ChatRoomState extends Schema {
  @type({ map: ChatQueue }) chatQueue = new MapSchema<ChatQueue>();
}

export class DDZUserEntityState extends Schema {
  @type("string") id: string = "ID";
  @type("string") username: string = "";
  @type("boolean") ready: boolean = false;
  @type("number") coins: number = 0.0;
}

export class Card extends Schema {
  @type("number") index: number = 0;
  @type("number") value: number = 0;
  @type("number") shape: number = 0;
  @type("number") king: number = 0;
}

export class DDZRoomState extends Schema {
  @type({ map: DDZUserEntityState }) ddzUserEntityState =
    new MapSchema<DDZUserEntityState>();
  @type("number") roomState: ROOM_STATE = ROOM_STATE.ROOM_INVALID;
  @type("string") ownPlayerId: string = "";
  @type("number") bottom: number = 0;
  @type("number") rate: number = 0;
  @type("string") houseManagerId: string = "";
  @type("number") state: number = 0;
  @type({ array: "string" }) robPlayerIds: string[] = new ArraySchema<string>();
  @type("string") roomMasterId: string = "";
  @type({ array: Card }) threeCards: Card[] = new ArraySchema<Card>();
  @type({ array: "string" }) playingIds: string[] = new ArraySchema<string>();
  @type({ array: Card }) curPushCardList: Card[] = new ArraySchema<Card>();
  @type({ array: Card }) lastPushCardList: Card[] = new ArraySchema<Card>();
  @type("string") lastPushCardPlayerId: string = "";
  @type("string") lastPlayerId: string = "";
}
