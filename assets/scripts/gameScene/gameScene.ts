import {
  _decorator,
  Component,
  Label,
  Button,
  Node,
  Prefab,
  AudioClip,
  unt,
} from "cc";
const { ccclass, property } = _decorator;

import { RoomState, isopen_sound } from "../defines";
import myglobal from "../mygolbal";
import GamingUI, { GameResult } from "./gamingUI";
import Player from "./prefabs/player_node";
import * as copy from "copy-to-clipboard";
import Alert from "../util/alert";
const { log } = cc;

@ccclass("GameScene")
export default class GameScene extends Component {
  @property(Label)
  di_label: Label;
  @property(Label)
  beishu_label: Label;
  @property(Label)
  roomIdLabel: Label;
  @property(Button)
  shareButton: Button;
  @property(Node)
  musicOnNode: Node;
  @property(Node)
  musicOffNode: Node;
  @property(Prefab)
  player_node_prefabs: Prefab;
  @property(Node)
  players_seat_pos: Node;
  @property(Prefab)
  summary_win: Prefab;
  @property(Prefab)
  summary_lose: Prefab;
  @property(AudioClip)
  bgMusic: AudioClip;
  playerNodeList: Node[];
  roomstate: number;
  playerdata_list_pos: any;
  roomId: string;
  summary_win_node: Node;
  summary_lose_node: Node;
  musicOn() {
    //cc.audioEngine.resumeAll();
    //this.musicOffNode.active = true
    //this.musicOnNode.active = false
  }
  musicOff() {
    //cc.audioEngine.pauseAll();
    //this.musicOffNode.active = false
    //this.musicOnNode.active = true
  }
  clearAllOutZone() {
    //for (let index = 0; index < this.playerNodeList.length; index++) {
    //const node = this.playerNodeList[index];
    //if (node) {
    //const node_script = node.getComponent("player_node") as Player;
    //const seat_node =
    //this.players_seat_pos.children[node_script.seat_index];
    //const index_name = "cardsoutzone" + node_script.seat_index;
    //const out_card_node = seat_node.getChildByName(index_name);
    //const children = out_card_node.children;
    //for (
    //let childrenIndex = 0;
    //childrenIndex < children.length;
    //childrenIndex++
    //) {
    //const card = children[childrenIndex];
    //if (card) card.destroy();
    //}
    //}
    //}
  }
  onLoad() {
    //this.playerNodeList = [];
    //this.di_label.string = "底:" + myglobal.playerData.bottom;
    //this.beishu_label.string = "倍数:" + myglobal.playerData.rate;
    //this.roomstate = RoomState.ROOM_INVALID;
    //监听，给其他玩家发牌(内部事件)
    //this.node.on("pushcard_other_event", () => {
    //log("gamescene pushcard_other_event");
    //for (var i = 0; i < this.playerNodeList.length; i++) {
    //var node = this.playerNodeList[i];
    //if (node) {
    //给playernode节点发送事件
    //node.emit("push_card_event");
    //}
    //}
    //});
    //监听房间状态改变事件
    //myglobal.socket.onRoomChangeState((data) => {
    //回调的函数参数是进入房间用户消息
    //log("onRoomChangeState:" + data);
    //this.roomstate = data;
    //});
    //
    //this.node.on("canrob_event", (event) => {
    //log("gamescene canrob_event:" + event);
    //通知给playernode子节点
    //for (var i = 0; i < this.playerNodeList.length; i++) {
    //var node = this.playerNodeList[i];
    //if (node) {
    //给playernode节点发送事件
    //node.emit("playernode_canrob_event", event);
    //}
    //}
    //});
    //this.node.on("choose_card_event", (event) => {
    //log("--------choose_card_event-----------");
    //var gameui_node = this.node.getChildByName("gamingUI");
    //if (gameui_node == null) {
    //log("get childer name gamingUI");
    //return;
    //}
    //gameui_node.emit("choose_card_event", event);
    //});
    //this.node.on("unchoose_card_event", (event) => {
    //log("--------unchoose_card_event-----------");
    //var gameui_node = this.node.getChildByName("gamingUI");
    //if (gameui_node == null) {
    //log("get childer name gamingUI");
    //return;
    //}
    //gameui_node.emit("unchoose_card_event", event);
    //});
    //myglobal.socket.request_enter_room({}, (err, result) => {
    //log("enter_room_resp" + JSON.stringify(result));
    //if (err != 0) {
    //log("enter_room_resp err:" + err);
    //} else {
    //enter_room成功
    //var seatid = result.seatindex; //自己在房间里的seatid
    //this.playerdata_list_pos = []; //3个用户创建一个空用户列表
    //this.setPlayerSeatPos(seatid);
    //var playerdata_list = result.playerdata;
    //this.roomId = result.roomid;
    //this.roomIdLabel.string = "房间号:" + this.roomId;
    //myglobal.playerData.houseManagerAccount = result.houseManagerAccount;
    //for (var i = 0; i < playerdata_list.length; i++) {
    //consol.log("this----"+this)
    //this.addPlayerNode(playerdata_list[i]);
    //}
    //cc.audioEngine.stopAll();
    //if (isopen_sound) {
    //cc.audioEngine.play(this.bgMusic, true, 0.5);
    //}
    //}
    //var gamebefore_node = this.node.getChildByName("gamebeforeUI");
    //gamebefore_node.emit("init");
    //});
    //在进入房间后，注册其他玩家进入房间的事件
    //myglobal.socket.onPlayerJoinRoom((join_playerdata) => {
    //log("onPlayerJoinRoom:" + JSON.stringify(join_playerdata));
    //this.addPlayerNode(join_playerdata);
    //});
    //myglobal.socket.onPlayerOutRoom((join_playerdata) => {
    //log("onPlayerOutRoom: ", join_playerdata);
    //this.removePlayerNode(join_playerdata);
    //});
    //回调参数是发送准备消息的account
    //myglobal.socket.onPlayerReady((data) => {
    //log("-------onPlayerReady:" + data);
    //for (var i = 0; i < this.playerNodeList.length; i++) {
    //var node = this.playerNodeList[i];
    //if (node) {
    //node.emit("player_ready_notify", data);
    //}
    //}
    //});
    //myglobal.socket.onGameStart(() => {
    //const gamingUI = this.node
    //.getChildByName("gamingUI")
    //.getComponent("gamingUI") as GamingUI;
    //if (gamingUI) gamingUI.destoryAllCards();
    //this.clearAllOutZone();
    //for (var i = 0; i < this.playerNodeList.length; i++) {
    //var node = this.playerNodeList[i];
    //if (node) {
    //node.emit("gamestart_event");
    //}
    //}
    //隐藏gamebeforeUI节点
    //var gamebeforeUI = this.node.getChildByName("gamebeforeUI");
    //if (gamebeforeUI) {
    //gamebeforeUI.active = false;
    //}
    //});
    //myglobal.socket.onGameOver(() => {
    //for (var i = 0; i < this.playerNodeList.length; i++) {
    //const node = this.playerNodeList[i];
    //if (node) {
    //const playerNode = node.getComponent("player_node") as Player;
    //playerNode.masterIcon.active = false;
    //}
    //}
    //});
    //myglobal.socket.onSocketConnected(() => {
    // TODO 获取之前服务器的状态 继续游戏
    //if (myglobal.playerData.houseManagerAccount) {
    //myglobal.socket.restore_player(
    //{
    //account: myglobal.playerData.account,
    //},
    //() => {}
    //);
    //}
    //});
    //myglobal.socket.onRestorePlayer(() => {
    //log("restore player");
    //});
    //监听服务器玩家抢地主消息
    //myglobal.socket.onRobState((event) => {
    //log("-----onRobState" + JSON.stringify(event));
    //onRobState{"account":"2162866","state":1}
    //for (var i = 0; i < this.playerNodeList.length; i++) {
    //var node = this.playerNodeList[i];
    //if (node) {
    //给playernode节点发送事件
    //node.emit("playernode_rob_state_event", event);
    //}
    //}
    //});
    //注册监听服务器确定地主消息
    //myglobal.socket.onChangeMaster((masterAccount: string) => {
    //log("onChangeMaster" + masterAccount);
    //保存一下地主id
    //myglobal.playerData.masterAccount = masterAccount;
    //for (var i = 0; i < this.playerNodeList.length; i++) {
    //var node = this.playerNodeList[i];
    //if (node) {
    //给playernode节点发送事件
    //node.emit("playernode_changemaster_event", masterAccount);
    //}
    //}
    //});
    //注册监听服务器显示底牌消息
    //myglobal.socket.onShowBottomCard((event) => {
    //log("onShowBottomCard---------" + event);
    //const gamingUINode = this.node.getChildByName("gamingUI");
    //gamingUINode.emit("show_bottom_card_event", event);
    //});
    //myglobal.socket.onPayed(async (data) => {
    //if (this.summary_win_node) this.updatePayed(this.summary_win_node, data);
    //if (this.summary_lose_node)
    //this.updatePayed(this.summary_lose_node, data);
    //});
  }
  updatePayed(node: Node, data) {
    //const otherPlayers = node.children.filter(
    //(child) => child.name === "其他玩家底框"
    //);
    //const otherNames = otherPlayers.map((other) =>
    //other.getChildByName("name")
    //);
    //otherNames.forEach((other) => {
    //const otherNameLabel = other.getComponent(cc.Label);
    //if (otherNameLabel.string === data.account) {
    //otherNameLabel.string = otherNameLabel.string + "(已支付)";
    //}
    //});
  }
  //seat_index自己在房间的位置id
  setPlayerSeatPos(seat_index) {
    //log("setPlayerSeatPos seat_index:" + seat_index);
    //界面位置转化成逻辑位置
    //switch (seat_index) {
    //case 0:
    //this.playerdata_list_pos[0] = 0;
    //this.playerdata_list_pos[1] = 1;
    //this.playerdata_list_pos[2] = 2;
    //break;
    //case 1:
    //this.playerdata_list_pos[1] = 0;
    //this.playerdata_list_pos[2] = 1;
    //this.playerdata_list_pos[0] = 2;
    //break;
    //case 2:
    //this.playerdata_list_pos[2] = 0;
    //this.playerdata_list_pos[0] = 1;
    //this.playerdata_list_pos[1] = 2;
    //break;
    //default:
    //break;
    //}
  }
  addPlayerNode(player_data) {
    //const playernode_inst = cc.instantiate(this.player_node_prefabs);
    //playernode_inst.parent = this.node;
    //创建的节点存储在gamescene的列表中
    //this.playerNodeList.push(playernode_inst);
    //玩家在room里的位置索引(逻辑位置)
    //var index = this.playerdata_list_pos[player_data.seatindex];
    //log("seatindex: " + player_data.seatindex + " index: " + index);
    //playernode_inst.position = this.players_seat_pos.children[index].position;
    //(playernode_inst.getComponent("player_node") as Player).init_data(
    //player_data,
    //index
    //);
  }
  removePlayerNode(player_data) {
    //const playerNode = this.playerNodeList.find((playerNode) => {
    //const player = playerNode.getComponent("player_node") as Player;
    //return player.account === player_data.account;
    //});
    //this.playerNodeList = this.playerNodeList.filter((playerNode) => {
    //const player = playerNode.getComponent("player_node") as Player;
    //return player.account !== player_data.account;
    //});
    //playerNode.destroy();
  }
  start() {}
  /*
     做法：先放3个节点在gameacene的场景中cardsoutzone(012)
    */
  getUserOutCardPosByAunt(aunt) {
    //log("getUserOutCardPosByAccount account: " + account);
    //for (var i = 0; i < this.playerNodeList.length; i++) {
    //const node = this.playerNodeList[i];
    //if (node) {
    //获取节点绑定的组件
    //var node_script = node.getComponent("player_node") as Player;
    //如果account和player_node节点绑定的account相同
    //接获取player_node的子节点
    //if (node_script.account === account) {
    //const seat_node =
    //this.players_seat_pos.children[node_script.seat_index];
    //const index_name = "cardsoutzone" + node_script.seat_index;
    //log("getUserOutCardPosByAccount index_name:"+index_name)
    //const out_card_node = seat_node.getChildByName(index_name);
    //log("OutZone:"+ out_card_node.name)
    //return out_card_node;
    //}
    //}
    //}
    //return null;
  }
  addThreeCardsToOtherUser(aunt) {
    //const playerScripts = this.playerNodeList.map(
    //(node) => node.getComponent("player_node") as Player
    //);
    //const player = playerScripts.find((player) => player.account === account);
    //if (player) {
    //player.addThreeCards();
    //}
  }
  removeCardsFromOtherUser(aunt, count) {
    //const playerScripts = this.playerNodeList.map(
    //(node) => node.getComponent("player_node") as Player
    //);
    //const player = playerScripts.find((player) => player.account === account);
    //if (player) {
    //player.removeCards(count);
    //}
  }
  outRoom() {
    //myglobal.socket.request_out_room(
    //{
    //roomId: this.roomId,
    //},
    //(err, result) => {
    //log("out_room_resp" + JSON.stringify(result));
    //if (err != 0) {
    //log("out_room_resp err:" + err);
    //} else {
    //cc.director.loadScene("hallScene");
    //}
    //}
    //);
  }
  win(data: GameResult, amount: number) {
    //this.summary_win_node = cc.instantiate(this.summary_win);
    //const otherPlayers = this.summary_win_node.children.filter(
    //(child) => child.name === "其他玩家底框"
    //);
    // 赢家是地主
    //if (myglobal.playerData.masterAccount === data.winner) {
    // 地主是我
    //if (myglobal.playerData.account === data.winner) {
    //this.summary_win_node
    //.getChildByName("自己灰色底框")
    //.getChildByName("地主标志").active = true;
    //this.summary_win_node
    //.getChildByName("自己灰色底框")
    //.getChildByName("score")
    //.getComponent(cc.Label).string = String(2 * amount);
    //otherPlayers.forEach((other, index) => {
    //const name = other.getChildByName("name").getComponent(cc.Label);
    //name.string = data.addressCounter.nongmin[index].nickName;
    //const score = other.getChildByName("score").getComponent(cc.Label);
    //score.string = String(-amount);
    //});
    //}
    //} else {
    // 赢家是农民
    //otherPlayers[0].getChildByName("地主标志").active = true;
    //const label = otherPlayers[0]
    //.getChildByName("name")
    //.getComponent(cc.Label);
    //label.string = myglobal.playerData.masterAccount;
    //const score = otherPlayers[0]
    //.getChildByName("score")
    //.getComponent(cc.Label);
    //score.string = String(-2 * amount);
    //this.summary_win_node
    //.getChildByName("自己灰色底框")
    //.getChildByName("score")
    //.getComponent(cc.Label).string = String(amount);
    //  除了我之外那个农民
    //const nongminNotMe = data.addressCounter.nongmin.find(
    //(nong) => nong.account !== myglobal.playerData.account
    //);
    //const nongminNotMeName = otherPlayers[1]
    //.getChildByName("name")
    //.getComponent(cc.Label);
    //nongminNotMeName.string = nongminNotMe.nickName;
    //const nongminNotMeScore = otherPlayers[1]
    //.getChildByName("score")
    //.getComponent(cc.Label);
    //nongminNotMeScore.string = String(amount);
    //}
    //this.summary_win_node.parent = this.node;
    //this.summary_win_node.zIndex = 100;
  }

  lose(data: GameResult, amount: number) {
    //this.summary_lose_node = cc.instantiate(this.summary_lose);
    //const otherPlayers = this.summary_lose_node.children.filter(
    //(child) => child.name === "其他玩家底框"
    //);
    // 输家是地主
    //if (myglobal.playerData.masterAccount !== data.winner) {
    // 地主是我
    //if (myglobal.playerData.account === myglobal.playerData.masterAccount) {
    //this.summary_lose_node
    //.getChildByName("自己灰色底框")
    //.getChildByName("地主标志").active = true;
    //this.summary_lose_node
    //.getChildByName("自己灰色底框")
    //.getChildByName("score")
    //.getComponent(cc.Label).string = String(-2 * amount);
    //otherPlayers.forEach((other, index) => {
    //const name = other.getChildByName("name").getComponent(cc.Label);
    //name.string = data.addressCounter.nongmin[index].nickName;
    //const score = other.getChildByName("score").getComponent(cc.Label);
    //score.string = String(amount);
    //});
    //}
    //} else {
    // 输家是农民
    //otherPlayers[0].getChildByName("地主标志").active = true;
    //const name = otherPlayers[0]
    //.getChildByName("name")
    //.getComponent(cc.Label);
    //name.string = myglobal.playerData.masterAccount;
    //const score = otherPlayers[0]
    //.getChildByName("score")
    //.getComponent(cc.Label);
    //score.string = String(2 * amount);
    //this.summary_lose_node
    //.getChildByName("自己灰色底框")
    //.getChildByName("score")
    //.getComponent(cc.Label).string = String(-amount);
    //  除了我之外那个农民
    //const nongminNotMe = data.addressCounter.nongmin.find(
    //(nong) => nong.account !== myglobal.playerData.account
    //);
    //const nongminNotMeName = otherPlayers[1]
    //.getChildByName("name")
    //.getComponent(cc.Label);
    //nongminNotMeName.string = nongminNotMe.nickName;
    //const nongminNotMeScore = otherPlayers[1]
    //.getChildByName("score")
    //.getComponent(cc.Label);
    //nongminNotMeScore.string = String(-amount);
    //}
    //this.summary_lose_node.parent = this.node;
    //this.summary_lose_node.zIndex = 100;
  }
  shareRoom() {
    //const url = `https://game.mydapp.io/?roomId=${this.roomId}`;
    //copy(url);
    //Alert.show("快去分享给朋友吧", "链接已拷贝到剪贴板");
  }
  update() {
    //this.shareButton.node.active = this.playerNodeList.length < 3;
  }
  onDestroy() {
    //myglobal.socket.event.removeAllLister();
    //cc.audioEngine.stopAll();
  }
}

/**
 * Note: The original script has been commented out, due to the large number of changes in the script, there may be missing in the conversion, you need to convert it manually
 */
// import { RoomState, isopen_sound } from "../defines";
// import myglobal from "../mygolbal";
// import GamingUI, { GameResult } from "./gamingUI";
// import Player from "./prefabs/player_node";
// import * as copy from "copy-to-clipboard";
// import Alert from "../util/alert";
//
// const { ccclass, property } = cc._decorator;
// const { log } = cc;
//
// @ccclass
// export default class GameScene extends cc.Component {
//   @property(cc.Label)
//   di_label: cc.Label;
//   @property(cc.Label)
//   beishu_label: cc.Label;
//   @property(cc.Label)
//   roomIdLabel: cc.Label;
//   @property(cc.Button)
//   shareButton: cc.Button;
//   @property(cc.Node)
//   musicOnNode: cc.Node;
//   @property(cc.Node)
//   musicOffNode: cc.Node;
//   @property(cc.Prefab)
//   player_node_prefabs: cc.Prefab;
//   @property(cc.Node)
//   players_seat_pos: cc.Node;
//
//   @property(cc.Prefab)
//   summary_win: cc.Prefab;
//   @property(cc.Prefab)
//   summary_lose: cc.Prefab;
//
//   @property(cc.AudioClip)
//   bgMusic: cc.AudioClip;
//
//   playerNodeList: cc.Node[];
//   roomstate: number;
//   playerdata_list_pos: any;
//   roomId: string;
//   summary_win_node: cc.Node;
//   summary_lose_node: cc.Node;
//
//   musicOn() {
//     cc.audioEngine.resumeAll();
//     this.musicOffNode.active = true
//     this.musicOnNode.active = false
//   }
//
//   musicOff() {
//     cc.audioEngine.pauseAll();
//     this.musicOffNode.active = false
//     this.musicOnNode.active = true
//   }
//
//   clearAllOutZone() {
//     for (let index = 0; index < this.playerNodeList.length; index++) {
//       const node = this.playerNodeList[index];
//       if (node) {
//         const node_script = node.getComponent("player_node") as Player;
//         const seat_node =
//           this.players_seat_pos.children[node_script.seat_index];
//         const index_name = "cardsoutzone" + node_script.seat_index;
//         const out_card_node = seat_node.getChildByName(index_name);
//         const children = out_card_node.children;
//         for (
//           let childrenIndex = 0;
//           childrenIndex < children.length;
//           childrenIndex++
//         ) {
//           const card = children[childrenIndex];
//           if (card) card.destroy();
//         }
//       }
//     }
//   }
//
//   onLoad() {
//     this.playerNodeList = [];
//     this.di_label.string = "底:" + myglobal.playerData.bottom;
//     this.beishu_label.string = "倍数:" + myglobal.playerData.rate;
//     this.roomstate = RoomState.ROOM_INVALID;
//     //监听，给其他玩家发牌(内部事件)
//     this.node.on("pushcard_other_event", () => {
//       log("gamescene pushcard_other_event");
//       for (var i = 0; i < this.playerNodeList.length; i++) {
//         var node = this.playerNodeList[i];
//         if (node) {
//           //给playernode节点发送事件
//           node.emit("push_card_event");
//         }
//       }
//     });
//
//     //监听房间状态改变事件
//     myglobal.socket.onRoomChangeState((data) => {
//       //回调的函数参数是进入房间用户消息
//       log("onRoomChangeState:" + data);
//       this.roomstate = data;
//     });
//     //
//     this.node.on("canrob_event", (event) => {
//       log("gamescene canrob_event:" + event);
//       //通知给playernode子节点
//       for (var i = 0; i < this.playerNodeList.length; i++) {
//         var node = this.playerNodeList[i];
//         if (node) {
//           //给playernode节点发送事件
//           node.emit("playernode_canrob_event", event);
//         }
//       }
//     });
//
//     this.node.on("choose_card_event", (event) => {
//       log("--------choose_card_event-----------");
//       var gameui_node = this.node.getChildByName("gamingUI");
//       if (gameui_node == null) {
//         log("get childer name gamingUI");
//         return;
//       }
//       gameui_node.emit("choose_card_event", event);
//     });
//
//     this.node.on("unchoose_card_event", (event) => {
//       log("--------unchoose_card_event-----------");
//       var gameui_node = this.node.getChildByName("gamingUI");
//       if (gameui_node == null) {
//         log("get childer name gamingUI");
//         return;
//       }
//       gameui_node.emit("unchoose_card_event", event);
//     });
//
//     myglobal.socket.request_enter_room({}, (err, result) => {
//       log("enter_room_resp" + JSON.stringify(result));
//       if (err != 0) {
//         log("enter_room_resp err:" + err);
//       } else {
//         //enter_room成功
//         var seatid = result.seatindex; //自己在房间里的seatid
//         this.playerdata_list_pos = []; //3个用户创建一个空用户列表
//         this.setPlayerSeatPos(seatid);
//
//         var playerdata_list = result.playerdata;
//         this.roomId = result.roomid;
//         this.roomIdLabel.string = "房间号:" + this.roomId;
//         myglobal.playerData.houseManagerAccount = result.houseManagerAccount;
//
//         for (var i = 0; i < playerdata_list.length; i++) {
//           //consol.log("this----"+this)
//           this.addPlayerNode(playerdata_list[i]);
//         }
//
//         cc.audioEngine.stopAll();
//
//         if (isopen_sound) {
//           cc.audioEngine.play(this.bgMusic, true, 0.5);
//         }
//       }
//       var gamebefore_node = this.node.getChildByName("gamebeforeUI");
//       gamebefore_node.emit("init");
//     });
//
//     //在进入房间后，注册其他玩家进入房间的事件
//     myglobal.socket.onPlayerJoinRoom((join_playerdata) => {
//       log("onPlayerJoinRoom:" + JSON.stringify(join_playerdata));
//       this.addPlayerNode(join_playerdata);
//     });
//
//     myglobal.socket.onPlayerOutRoom((join_playerdata) => {
//       log("onPlayerOutRoom: ", join_playerdata);
//       this.removePlayerNode(join_playerdata);
//     });
//
//     //回调参数是发送准备消息的account
//     myglobal.socket.onPlayerReady((data) => {
//       log("-------onPlayerReady:" + data);
//       for (var i = 0; i < this.playerNodeList.length; i++) {
//         var node = this.playerNodeList[i];
//         if (node) {
//           node.emit("player_ready_notify", data);
//         }
//       }
//     });
//
//     myglobal.socket.onGameStart(() => {
//       const gamingUI = this.node
//         .getChildByName("gamingUI")
//         .getComponent("gamingUI") as GamingUI;
//       if (gamingUI) gamingUI.destoryAllCards();
//       this.clearAllOutZone();
//       for (var i = 0; i < this.playerNodeList.length; i++) {
//         var node = this.playerNodeList[i];
//         if (node) {
//           node.emit("gamestart_event");
//         }
//       }
//
//       //隐藏gamebeforeUI节点
//       var gamebeforeUI = this.node.getChildByName("gamebeforeUI");
//       if (gamebeforeUI) {
//         gamebeforeUI.active = false;
//       }
//     });
//
//     myglobal.socket.onGameOver(() => {
//       for (var i = 0; i < this.playerNodeList.length; i++) {
//         const node = this.playerNodeList[i];
//         if (node) {
//           const playerNode = node.getComponent("player_node") as Player;
//           playerNode.masterIcon.active = false;
//         }
//       }
//     });
//
//     myglobal.socket.onSocketConnected(() => {
//       // TODO 获取之前服务器的状态 继续游戏
//       if (myglobal.playerData.houseManagerAccount) {
//         myglobal.socket.restore_player(
//           {
//             account: myglobal.playerData.account,
//           },
//           () => {}
//         );
//       }
//     });
//
//     myglobal.socket.onRestorePlayer(() => {
//       log("restore player");
//     });
//
//     //监听服务器玩家抢地主消息
//     myglobal.socket.onRobState((event) => {
//       log("-----onRobState" + JSON.stringify(event));
//       //onRobState{"account":"2162866","state":1}
//       for (var i = 0; i < this.playerNodeList.length; i++) {
//         var node = this.playerNodeList[i];
//         if (node) {
//           //给playernode节点发送事件
//           node.emit("playernode_rob_state_event", event);
//         }
//       }
//     });
//
//     //注册监听服务器确定地主消息
//     myglobal.socket.onChangeMaster((masterAccount: string) => {
//       log("onChangeMaster" + masterAccount);
//       //保存一下地主id
//       myglobal.playerData.masterAccount = masterAccount;
//       for (var i = 0; i < this.playerNodeList.length; i++) {
//         var node = this.playerNodeList[i];
//         if (node) {
//           //给playernode节点发送事件
//           node.emit("playernode_changemaster_event", masterAccount);
//         }
//       }
//     });
//
//     //注册监听服务器显示底牌消息
//     myglobal.socket.onShowBottomCard((event) => {
//       log("onShowBottomCard---------" + event);
//       const gamingUINode = this.node.getChildByName("gamingUI");
//       gamingUINode.emit("show_bottom_card_event", event);
//     });
//
//     myglobal.socket.onPayed(async (data) => {
//       if (this.summary_win_node) this.updatePayed(this.summary_win_node, data);
//       if (this.summary_lose_node)
//         this.updatePayed(this.summary_lose_node, data);
//     });
//   }
//
//   updatePayed(node: cc.Node, data) {
//     const otherPlayers = node.children.filter(
//       (child) => child.name === "其他玩家底框"
//     );
//
//     const otherNames = otherPlayers.map((other) =>
//       other.getChildByName("name")
//     );
//
//     otherNames.forEach((other) => {
//       const otherNameLabel = other.getComponent(cc.Label);
//       if (otherNameLabel.string === data.account) {
//         otherNameLabel.string = otherNameLabel.string + "(已支付)";
//       }
//     });
//   }
//
//   //seat_index自己在房间的位置id
//   setPlayerSeatPos(seat_index) {
//     log("setPlayerSeatPos seat_index:" + seat_index);
//     //界面位置转化成逻辑位置
//     switch (seat_index) {
//       case 0:
//         this.playerdata_list_pos[0] = 0;
//         this.playerdata_list_pos[1] = 1;
//         this.playerdata_list_pos[2] = 2;
//         break;
//       case 1:
//         this.playerdata_list_pos[1] = 0;
//         this.playerdata_list_pos[2] = 1;
//         this.playerdata_list_pos[0] = 2;
//         break;
//       case 2:
//         this.playerdata_list_pos[2] = 0;
//         this.playerdata_list_pos[0] = 1;
//         this.playerdata_list_pos[1] = 2;
//         break;
//       default:
//         break;
//     }
//   }
//
//   addPlayerNode(player_data) {
//     const playernode_inst = cc.instantiate(this.player_node_prefabs);
//     playernode_inst.parent = this.node;
//     //创建的节点存储在gamescene的列表中
//     this.playerNodeList.push(playernode_inst);
//
//     //玩家在room里的位置索引(逻辑位置)
//     var index = this.playerdata_list_pos[player_data.seatindex];
//     log("seatindex: " + player_data.seatindex + " index: " + index);
//     playernode_inst.position = this.players_seat_pos.children[index].position;
//     (playernode_inst.getComponent("player_node") as Player).init_data(
//       player_data,
//       index
//     );
//   }
//
//   removePlayerNode(player_data) {
//     const playerNode = this.playerNodeList.find((playerNode) => {
//       const player = playerNode.getComponent("player_node") as Player;
//       return player.account === player_data.account;
//     });
//     this.playerNodeList = this.playerNodeList.filter((playerNode) => {
//       const player = playerNode.getComponent("player_node") as Player;
//       return player.account !== player_data.account;
//     });
//     playerNode.destroy();
//   }
//
//   start() {}
//
//   /*
//      做法：先放3个节点在gameacene的场景中cardsoutzone(012)
//     */
//   getUserOutCardPosByAccount(account) {
//     log("getUserOutCardPosByAccount account: " + account);
//     for (var i = 0; i < this.playerNodeList.length; i++) {
//       const node = this.playerNodeList[i];
//       if (node) {
//         //获取节点绑定的组件
//         var node_script = node.getComponent("player_node") as Player;
//         //如果account和player_node节点绑定的account相同
//         //接获取player_node的子节点
//         if (node_script.account === account) {
//           const seat_node =
//             this.players_seat_pos.children[node_script.seat_index];
//           const index_name = "cardsoutzone" + node_script.seat_index;
//           //log("getUserOutCardPosByAccount index_name:"+index_name)
//           const out_card_node = seat_node.getChildByName(index_name);
//           //log("OutZone:"+ out_card_node.name)
//           return out_card_node;
//         }
//       }
//     }
//
//     return null;
//   }
//
//   addThreeCardsToOtherUser(account) {
//     const playerScripts = this.playerNodeList.map(
//       (node) => node.getComponent("player_node") as Player
//     );
//     const player = playerScripts.find((player) => player.account === account);
//     if (player) {
//       player.addThreeCards();
//     }
//   }
//
//   removeCardsFromOtherUser(account, count) {
//     const playerScripts = this.playerNodeList.map(
//       (node) => node.getComponent("player_node") as Player
//     );
//     const player = playerScripts.find((player) => player.account === account);
//     if (player) {
//       player.removeCards(count);
//     }
//   }
//
//   outRoom() {
//     myglobal.socket.request_out_room(
//       {
//         roomId: this.roomId,
//       },
//       (err, result) => {
//         log("out_room_resp" + JSON.stringify(result));
//         if (err != 0) {
//           log("out_room_resp err:" + err);
//         } else {
//           cc.director.loadScene("hallScene");
//         }
//       }
//     );
//   }
//
//   win(data: GameResult, amount: number) {
//     this.summary_win_node = cc.instantiate(this.summary_win);
//     const otherPlayers = this.summary_win_node.children.filter(
//       (child) => child.name === "其他玩家底框"
//     );
//     // 赢家是地主
//     if (myglobal.playerData.masterAccount === data.winner) {
//       // 地主是我
//       if (myglobal.playerData.account === data.winner) {
//         this.summary_win_node
//           .getChildByName("自己灰色底框")
//           .getChildByName("地主标志").active = true;
//
//         this.summary_win_node
//           .getChildByName("自己灰色底框")
//           .getChildByName("score")
//           .getComponent(cc.Label).string = String(2 * amount);
//
//         otherPlayers.forEach((other, index) => {
//           const name = other.getChildByName("name").getComponent(cc.Label);
//           name.string = data.addressCounter.nongmin[index].nickName;
//           const score = other.getChildByName("score").getComponent(cc.Label);
//           score.string = String(-amount);
//         });
//       }
//     } else {
//       // 赢家是农民
//       otherPlayers[0].getChildByName("地主标志").active = true;
//       const label = otherPlayers[0]
//         .getChildByName("name")
//         .getComponent(cc.Label);
//       label.string = myglobal.playerData.masterAccount;
//
//       const score = otherPlayers[0]
//         .getChildByName("score")
//         .getComponent(cc.Label);
//       score.string = String(-2 * amount);
//
//       this.summary_win_node
//         .getChildByName("自己灰色底框")
//         .getChildByName("score")
//         .getComponent(cc.Label).string = String(amount);
//
//       //  除了我之外那个农民
//       const nongminNotMe = data.addressCounter.nongmin.find(
//         (nong) => nong.account !== myglobal.playerData.account
//       );
//       const nongminNotMeName = otherPlayers[1]
//         .getChildByName("name")
//         .getComponent(cc.Label);
//       nongminNotMeName.string = nongminNotMe.nickName;
//
//       const nongminNotMeScore = otherPlayers[1]
//         .getChildByName("score")
//         .getComponent(cc.Label);
//       nongminNotMeScore.string = String(amount);
//     }
//     this.summary_win_node.parent = this.node;
//     this.summary_win_node.zIndex = 100;
//   }
//
//   lose(data: GameResult, amount: number) {
//     this.summary_lose_node = cc.instantiate(this.summary_lose);
//     const otherPlayers = this.summary_lose_node.children.filter(
//       (child) => child.name === "其他玩家底框"
//     );
//     // 输家是地主
//     if (myglobal.playerData.masterAccount !== data.winner) {
//       // 地主是我
//       if (myglobal.playerData.account === myglobal.playerData.masterAccount) {
//         this.summary_lose_node
//           .getChildByName("自己灰色底框")
//           .getChildByName("地主标志").active = true;
//         this.summary_lose_node
//           .getChildByName("自己灰色底框")
//           .getChildByName("score")
//           .getComponent(cc.Label).string = String(-2 * amount);
//
//         otherPlayers.forEach((other, index) => {
//           const name = other.getChildByName("name").getComponent(cc.Label);
//           name.string = data.addressCounter.nongmin[index].nickName;
//           const score = other.getChildByName("score").getComponent(cc.Label);
//           score.string = String(amount);
//         });
//       }
//     } else {
//       // 输家是农民
//       otherPlayers[0].getChildByName("地主标志").active = true;
//       const name = otherPlayers[0]
//         .getChildByName("name")
//         .getComponent(cc.Label);
//       name.string = myglobal.playerData.masterAccount;
//
//       const score = otherPlayers[0]
//         .getChildByName("score")
//         .getComponent(cc.Label);
//       score.string = String(2 * amount);
//
//       this.summary_lose_node
//         .getChildByName("自己灰色底框")
//         .getChildByName("score")
//         .getComponent(cc.Label).string = String(-amount);
//
//       //  除了我之外那个农民
//       const nongminNotMe = data.addressCounter.nongmin.find(
//         (nong) => nong.account !== myglobal.playerData.account
//       );
//       const nongminNotMeName = otherPlayers[1]
//         .getChildByName("name")
//         .getComponent(cc.Label);
//       nongminNotMeName.string = nongminNotMe.nickName;
//
//       const nongminNotMeScore = otherPlayers[1]
//         .getChildByName("score")
//         .getComponent(cc.Label);
//       nongminNotMeScore.string = String(-amount);
//     }
//     this.summary_lose_node.parent = this.node;
//     this.summary_lose_node.zIndex = 100;
//   }
//
//   shareRoom() {
//     const url = `https://game.mydapp.io/?roomId=${this.roomId}`;
//     copy(url);
//     Alert.show("快去分享给朋友吧", "链接已拷贝到剪贴板");
//   }
//
//   update() {
//     this.shareButton.node.active = this.playerNodeList.length < 3;
//   }
//
//   onDestroy() {
//     myglobal.socket.event.removeAllLister();
//     cc.audioEngine.stopAll();
//   }
// }
