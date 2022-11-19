import {
  _decorator,
  Component,
  Label,
  unt,
  Sprite,
  Node,
  Prefab,
  SpriteFrame,
} from "cc";
const { ccclass, property } = _decorator;

import { qian_state } from "../../defines";
import myglobal from "../../mygolbal";
const { log } = cc;
import axios from "axios";

@ccclass("PlayerNode")
export default class Player extends Component {
  @property(Label)
  account_label: Label;
  @property(Label)
  nickname_label: Label;
  @property(Sprite)
  room_touxiang: Sprite;
  @property(Label)
  globalcount_label: Label;
  @property(Sprite)
  headimage: Sprite;
  @property(Node)
  readyimage: Node;
  @property(Node)
  offlineimage: Node;
  @property(Node)
  card_node: Node;
  @property(Prefab)
  card_prefab: Prefab;
  @property(SpriteFrame)
  robimage_sp: SpriteFrame;
  @property(SpriteFrame)
  robnoimage_sp: SpriteFrame;
  @property(Sprite)
  robIconSp: Sprite;
  @property(Node)
  robIcon_Sp: Node;
  @property(Node)
  robnoIcon_Sp: Node;
  @property(Node)
  masterIcon: Node;
  aunt: string;
  cardlist_node: Node[];
  seat_index: number;
  onLoad() {
    //this.readyimage.active = false;
    //this.offlineimage.active = false;
    //监听开始游戏事件(客户端发给客户端)
    //this.node.on("gamestart_event", (event) => {
    //this.readyimage.active = false;
    //});
    //给其他玩家发牌事件
    //this.node.on("push_card_event", (event) => {
    //log("on push_card_event");
    //自己不再发牌
    //if (this.account == myglobal.playerData.account) {
    //return;
    //}
    //this.initCards();
    //});
    //this.node.on("playernode_rob_state_event", (event) => {
    //{"account":"2162866","state":1}
    //var detail = event;
    //if (this.account == detail.account) {
    //if (detail.state == qian_state.qian) {
    //log("this.robIcon_Sp.active = true");
    //this.robIcon_Sp.active = true;
    //} else if (detail.state == qian_state.buqiang) {
    //this.robnoIcon_Sp.active = true;
    //} else {
    //log("get rob value :" + detail.state);
    //}
    //}
    //});
    //this.node.on("playernode_changemaster_event", (event) => {
    //var detail = event;
    //this.robIcon_Sp.active = false;
    //this.robnoIcon_Sp.active = false;
    //this.masterIcon.active = detail == this.account;
    //});
  }
  getSpriteFrameFromStr(imgStr: string): Promise<SpriteFrame> {
    //return new Promise((resolve, reject) => {
    //const img = new Image();
    //img.onload = () => {
    //const tex = new cc.Texture2D();
    //tex.initWithElement(img);
    //tex.handleLoadedTexture();
    //const sp = new cc.SpriteFrame(tex);
    //resolve(sp);
    //};
    //img.src = imgStr;
    //});
  }
  //这里初始化房间内位置节点信息(自己和其他玩家) data玩家节点数据 index玩家在房间的位置索引
  async init_data(data, index) {
    //log("init_data:" + JSON.stringify(data));
    //this.account = data.account;
    //this.account_label.string = data.account;
    //this.nickname_label.string = data.nick_name;
    //if (index === 0) {
    //const balances = await myglobal.chainbow.getBalance();
    //this.globalcount_label.string = `${balances.Satoshi.balance} ${balances.Satoshi.symbol}`;
    //myglobal.chainbow.listenNoticeBalance((balances) => {
    //this.globalcount_label.string = `${balances.Satoshi.balance} ${balances.Satoshi.symbol}`;
    //});
    //}
    //this.cardlist_node = [];
    //this.seat_index = index;
    //if (data.isready == true) {
    //this.readyimage.active = true;
    //}
    //if (data.nick_name.indexOf("@") !== -1) {
    //const res = await axios({
    //method: "get",
    //url: `https://lucky.mydapp.io/luckyBall/avatar?paymail=${data.nick_name}`,
    //});
    //this.headimage.spriteFrame = await this.getSpriteFrameFromStr(res.data);
    //} else {
    //这里根据传入的avarter来获取本地图像
    //var head_image_path =
    //"UI/headimage/avatar_" + (Math.floor(Math.random() * 3) + 1);
    //cc.loader.loadRes(head_image_path, cc.SpriteFrame, (err, spriteFrame) => {
    //if (err) {
    //log(err.message || err);
    //return;
    //}
    //this.headimage.spriteFrame = spriteFrame;
    //});
    //}
    //注册一个player_ready消息
    //this.node.on("player_ready_notify", (event) => {
    //log("player_ready_notify event", event);
    //var detail = event;
    //log("------player_ready_notify detail:" + detail);
    //if (detail == this.account) {
    //this.readyimage.active = true;
    //}
    //});
    //if (index == 1) {
    //this.card_node.x = -this.card_node.x - 30;
    //}
  }
  initCards() {
    //this.card_node.active = true;
    //for (var i = 0; i < 17; i++) {
    //var card = cc.instantiate(this.card_prefab);
    //card.scale = 0.6;
    //log(" this.card_node.parent.parent" + this.card_node.parent.parent.name);
    //card.parent = this.card_node;
    //const height = card.height;
    //card.y = (8 - i) * height * 0.12;
    //card.x = 0;
    //this.cardlist_node.push(card);
    //}
  }
  addThreeCards() {
    //for (var i = 0; i < 3; i++) {
    //var card = cc.instantiate(this.card_prefab);
    //card.scale = 0.6;
    //card.parent = this.card_node;
    //const height = card.height;
    //card.y =
    //(this.cardlist_node[this.cardlist_node.length - 1].y - i - 1) *
    //height *
    //0.12;
    //card.x = 0;
    //this.cardlist_node.push(card);
    //}
  }
  removeCards(count) {
    //for (let i = 0; i < count; i++) {
    //const node = this.cardlist_node.pop();
    //node.destroy();
    //}
  }
  protected onDestroy(): void {
    //myglobal.chainbow.offNoticeBalance();
  }
}

/**
 * Note: The original script has been commented out, due to the large number of changes in the script, there may be missing in the conversion, you need to convert it manually
 */
// import { qian_state } from "../../defines";
// import myglobal from "../../mygolbal";
// const { ccclass, property } = cc._decorator;
// const { log } = cc;
// import axios from "axios";
//
// @ccclass
// export default class Player extends cc.Component {
//   @property(cc.Label)
//   account_label: cc.Label;
//   @property(cc.Label)
//   nickname_label: cc.Label;
//   @property(cc.Sprite)
//   room_touxiang: cc.Sprite;
//   @property(cc.Label)
//   globalcount_label: cc.Label;
//   @property(cc.Sprite)
//   headimage: cc.Sprite;
//   @property(cc.Node)
//   readyimage: cc.Node;
//   @property(cc.Node)
//   offlineimage: cc.Node;
//   @property(cc.Node)
//   card_node: cc.Node;
//   @property(cc.Prefab)
//   card_prefab: cc.Prefab;
//   @property(cc.SpriteFrame)
//   robimage_sp: cc.SpriteFrame;
//   @property(cc.SpriteFrame)
//   robnoimage_sp: cc.SpriteFrame;
//   @property(cc.Sprite)
//   robIconSp: cc.Sprite;
//   @property(cc.Node)
//   robIcon_Sp: cc.Node;
//   @property(cc.Node)
//   robnoIcon_Sp: cc.Node;
//   @property(cc.Node)
//   masterIcon: cc.Node;
//
//   account: string;
//   cardlist_node: cc.Node[];
//   seat_index: number;
//
//   onLoad() {
//     this.readyimage.active = false;
//     this.offlineimage.active = false;
//
//     //监听开始游戏事件(客户端发给客户端)
//     this.node.on("gamestart_event", (event) => {
//       this.readyimage.active = false;
//     });
//
//     //给其他玩家发牌事件
//     this.node.on("push_card_event", (event) => {
//       log("on push_card_event");
//       //自己不再发牌
//       if (this.account == myglobal.playerData.account) {
//         return;
//       }
//       this.initCards();
//     });
//
//     this.node.on("playernode_rob_state_event", (event) => {
//       //{"account":"2162866","state":1}
//       var detail = event;
//
//       if (this.account == detail.account) {
//         if (detail.state == qian_state.qian) {
//           log("this.robIcon_Sp.active = true");
//           this.robIcon_Sp.active = true;
//         } else if (detail.state == qian_state.buqiang) {
//           this.robnoIcon_Sp.active = true;
//         } else {
//           log("get rob value :" + detail.state);
//         }
//       }
//     });
//
//     this.node.on("playernode_changemaster_event", (event) => {
//       var detail = event;
//       this.robIcon_Sp.active = false;
//       this.robnoIcon_Sp.active = false;
//       this.masterIcon.active = detail == this.account;
//     });
//   }
//
//   getSpriteFrameFromStr(imgStr: string): Promise<cc.SpriteFrame> {
//     return new Promise((resolve, reject) => {
//       const img = new Image();
//       img.onload = () => {
//         const tex = new cc.Texture2D();
//         tex.initWithElement(img);
//         tex.handleLoadedTexture();
//         const sp = new cc.SpriteFrame(tex);
//         resolve(sp);
//       };
//       img.src = imgStr;
//     });
//   }
//
//   //这里初始化房间内位置节点信息(自己和其他玩家) data玩家节点数据 index玩家在房间的位置索引
//   async init_data(data, index) {
//     log("init_data:" + JSON.stringify(data));
//     this.account = data.account;
//     this.account_label.string = data.account;
//     this.nickname_label.string = data.nick_name;
//     if (index === 0) {
//       const balances = await myglobal.chainbow.getBalance();
//       this.globalcount_label.string = `${balances.Satoshi.balance} ${balances.Satoshi.symbol}`;
//       myglobal.chainbow.listenNoticeBalance((balances) => {
//         this.globalcount_label.string = `${balances.Satoshi.balance} ${balances.Satoshi.symbol}`;
//       });
//     }
//     this.cardlist_node = [];
//     this.seat_index = index;
//     if (data.isready == true) {
//       this.readyimage.active = true;
//     }
//
//     if (data.nick_name.indexOf("@") !== -1) {
//       const res = await axios({
//         method: "get",
//         url: `https://lucky.mydapp.io/luckyBall/avatar?paymail=${data.nick_name}`,
//       });
//       this.headimage.spriteFrame = await this.getSpriteFrameFromStr(res.data);
//     } else {
//       //这里根据传入的avarter来获取本地图像
//       var head_image_path =
//         "UI/headimage/avatar_" + (Math.floor(Math.random() * 3) + 1);
//       cc.loader.loadRes(head_image_path, cc.SpriteFrame, (err, spriteFrame) => {
//         if (err) {
//           log(err.message || err);
//           return;
//         }
//         this.headimage.spriteFrame = spriteFrame;
//       });
//     }
//
//     //注册一个player_ready消息
//     this.node.on("player_ready_notify", (event) => {
//       log("player_ready_notify event", event);
//       var detail = event;
//       log("------player_ready_notify detail:" + detail);
//       if (detail == this.account) {
//         this.readyimage.active = true;
//       }
//     });
//
//     if (index == 1) {
//       this.card_node.x = -this.card_node.x - 30;
//     }
//   }
//
//   initCards() {
//     this.card_node.active = true;
//     for (var i = 0; i < 17; i++) {
//       var card = cc.instantiate(this.card_prefab);
//       card.scale = 0.6;
//       log(" this.card_node.parent.parent" + this.card_node.parent.parent.name);
//       card.parent = this.card_node;
//       const height = card.height;
//       card.y = (8 - i) * height * 0.12;
//       card.x = 0;
//
//       this.cardlist_node.push(card);
//     }
//   }
//
//   addThreeCards() {
//     for (var i = 0; i < 3; i++) {
//       var card = cc.instantiate(this.card_prefab);
//       card.scale = 0.6;
//       card.parent = this.card_node;
//       const height = card.height;
//       card.y =
//         (this.cardlist_node[this.cardlist_node.length - 1].y - i - 1) *
//         height *
//         0.12;
//       card.x = 0;
//
//       this.cardlist_node.push(card);
//     }
//   }
//
//   removeCards(count) {
//     for (let i = 0; i < count; i++) {
//       const node = this.cardlist_node.pop();
//       node.destroy();
//     }
//   }
//
//   protected onDestroy(): void {
//     myglobal.chainbow.offNoticeBalance();
//   }
// }
