import {
  _decorator,
  Component,
  Node,
  Material,
  MeshRenderer,
  Mesh,
  ParticleSystem,
  director,
} from "cc";
import { DDZRoomState } from "../../../../../Server/src/rooms/schema/RoomState";
import { DDZManager } from "../../Managers/DDZManager";
import { MMOManager } from "../../Managers/MMOManager";
import { NetworkedEntity } from "../../Player/NetworkedEntity";
import { Interactable } from "../Interactable";
const { ccclass, property } = _decorator;

@ccclass("ButtonPodium")
export class ButtonPodium extends Interactable {
  @property({ type: ParticleSystem })
  private interactionEffects: ParticleSystem = null;
  @property({ type: Material })
  private inUseMat: Material = null;
  @property({ type: Material })
  private availableMat: Material = null;
  @property({ type: MeshRenderer })
  private buttonRenderer: MeshRenderer = null;

  public playerInRange(entity: NetworkedEntity) {
    //Only display in range stuff if the local user is the one in range!
    if (entity.IsMine) super.playerInRange(entity);

    director.loadScene("DDZScene", async () => {
      const client = MMOManager.Instance.client;
      const id = MMOManager.Instance.CurrentUser.id;
      let ddzRoom: Colyseus.Room<DDZRoomState> =
        await client.joinOrCreate<DDZRoomState>("ddz_room", {
          id: "asdiuhkwehaf",
        });

      DDZManager.Instance.setRoom(ddzRoom);
    });
  }

  public playerLeftRange(entity: NetworkedEntity) {
    //Only display in range stuff if the local user is the one in range!
    if (entity.IsMine) super.playerLeftRange(entity);
  }

  public onSuccessfulUse(entity: NetworkedEntity) {
    super.onSuccessfulUse(entity);

    //Button podium also has interaction effects, so play them!
    this.interactionEffects.play();
  }

  public setInUse(inUse: boolean) {
    super.setInUse(inUse);

    //Set the button material to the appropriate one
    this.buttonRenderer.material = this.isInUse
      ? this.inUseMat
      : this.availableMat;
  }
}
