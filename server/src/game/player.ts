import Room from "./room";
import Gamectr, { PlayerInfo } from "./game_ctr";
import Card, { CardClient } from "./card";
import config from "../config";
import { ROOM_STATE } from "./defines";
const console = config.console;

const INTERVAL_TIME = 5000;
export default class Player {
  nickName: string;
  account: string;
  address: string;
  gold: any;
  socket: any;
  gamesctr: Gamectr;
  room: Room;
  seatindex: number;
  ready: boolean;
  cards: Card[];
  trusteeship: boolean = false;
  heartBeatInterval: NodeJS.Timeout;

  constructor(info: PlayerInfo, socket, callindex, gamectr) {
    this.nickName = info.nickName; //用户昵称
    this.account = info.account; //用户账号
    this.address = info.address; //头像
    this.gamesctr = gamectr;
    this.room = undefined; //所在房间的引用
    this.seatindex = 0; //在房间的位置
    this.ready = false; //当前在房间的状态 是否点击了准备按钮
    this.cards = []; //当前手上的牌

    this.listenOnEvent(socket);
    this.loggedIn(callindex);
  }

  loggedIn(callindex) {
    //通知客户端登录成功，返回数据
    this._notify("login_resp", 0, {}, callindex);
  }

  listenOnEvent(socket) {
    this.socket = socket;
    //data分3个部分 cmd,{data},callindex
    socket.on("notify", (req) => {
      var cmd = req.cmd;
      var data = req.data;
      var callindex = req.callindex;
      console.log("_notify" + JSON.stringify(req));
      switch (cmd) {
        case "createroom_req":
          this.gamesctr.createRoom(data, this, (err, result) => {
            if (err != 0) {
              console.log("create_room err:" + err);
            } else {
              this.room = result.room;
            }

            this._notify("createroom_resp", err, result.data, callindex);
          });

          break;
        case "joinroom_req":
          this.gamesctr.joinRoom(req.data, this, (err, result) => {
            if (err) {
              console.log("joinroom_req err:" + err);
              this._notify("joinroom_resp", err, null, callindex);
            } else {
              //加入房间成功
              this.room = result.room;
              this._notify("joinroom_resp", err, result.data, callindex);
            }
          });
          break;
        case "join_waiting_room_req":
          this.gamesctr.joinWaitingRoom(req.data, this, (err, result) => {
            if (err) {
              console.log("joinroom_req err: " + err);
              this._notify("joinroom_resp", err, null, callindex);
            } else {
              //加入房间成功
              this.room = result.room;
              this._notify("joinroom_resp", err, result.data, callindex);
            }
          });
          break;
        case "outroom_req":
          this.ready = false;
          this.gamesctr.outRoom(req.data, this, (err, result) => {
            if (err) {
              this._notify("outroom_resp", err, null, callindex);
            } else {
              this._notify("outroom_resp", err, result.data, callindex);
            }
          });
          break;
        case "enterroom_req":
          this.room.enter_room(this, (err, result) => {
            if (err != 0) {
              this._notify("enter_room_resp", err, {}, callindex);
            } else {
              //enterroom成功
              this.seatindex = result.seatindex;
              this._notify("enter_room_resp", err, result, callindex);
            }
          });

          break;
        case "player_ready_notify": //玩家准备消息通知
          this.ready = true;
          this.room.playerReady(this);
          break;
        case "player_start_notify": //客户端:房主发送开始游戏消息
          this.room.playerStart(this, (err, result) => {
            if (err) {
              console.log("player_start_notify err" + err);
              this._notify("player_start_notify", err, null, callindex);
            } else {
              this._notify("player_start_notify", err, result.data, callindex);
            }
          });
          break;
        case "player_rob_notify": //客户端发送抢地主消息
          if (this.room.state !== ROOM_STATE.ROOM_ROBSTATE) return;
          this.room.playerRobmaster(this, data);
          break;
        case "bu_chu_card_req": //客户端发送出牌消息
          if (this.room.state !== ROOM_STATE.ROOM_PLAYING) return;
          this.room.playerBuChuCard();
          break;
        case "chu_card_req":
          if (this.room.state !== ROOM_STATE.ROOM_PLAYING) return;
          this.room.playerChuCard(this, data, (err, result) => {
            if (err) {
              console.log("playerChuCard cb err:" + err + " " + result);
              this._notify("chu_card_res", err, result.data, callindex);
            }
            this._notify("chu_card_res", err, result.data, callindex);
          });
          break;
        case "restore_player":
          this.gamesctr.restore_player(data.account, socket);
          this._notify("restore_player", null, {}, callindex);
          break;
        default:
          break;
      }
    });

    socket.on("disconnect", () => {
      this.playerDisconnect();
    });
  }

  playerDisconnect() {
    console.log("player disconnect");
    if (this.room) {
      this.room.playerOffLine(this);
      this.gamesctr.outRoom({ roomId: this.room.roomId }, this, () => {});
    }
    this.gamesctr.removeFromPlayerList(this);
    if (this.heartBeatInterval) clearInterval(this.heartBeatInterval);
  }

  //内部使用的发送数据函数
  _notify(type, result, data, callBackIndex) {
    console.log("notify =" + JSON.stringify(data));
    this.socket.emit("notify", {
      type: type,
      result: result,
      data: data,
      callBackIndex: callBackIndex,
    });
  }

  sendPlayerJoinRoom(data) {
    console.log("player join room notify" + JSON.stringify(data));
    this._notify("player_joinroom_notify", 0, data, 0);
  }

  sendPlayerOutRoom(data) {
    console.log("player out room notify" + JSON.stringify(data));
    this._notify("player_outroom_notify", 0, data, 0);
  }

  //发送有玩家准备好消息
  sendplayerReady(data) {
    this._notify("player_ready_notify", 0, data, 0);
  }

  gameStart() {
    //console.log("player gameStart")
    this._notify("gameStart_notify", 0, {}, 0);
  }

  sendPlayerChangeManage(data) {
    console.log("sendPlayerChangeManage: account:" + data);
    this._notify("changehousemanage_notify", 0, data, 0);
  }

  sendCard(data) {
    this.cards = data;
    this._notify("pushcard_notify", 0, data, 0);
  }

  //发送谁可以抢地主
  SendCanRob(data) {
    console.log("SendCanRob" + data);
    this._notify("canrob_notify", 0, data, 0);
  }

  //通知抢地主状态
  sendRobState(data) {
    this._notify("canrob_state_notify", 0, data, 0);
  }

  //发送当前地主是谁
  SendChangeMaster(data) {
    this._notify("change_master_notify", 0, data, 0);
  }

  //发送给客户端:显示底牌
  SendShowBottomCard(data) {
    this._notify("change_showcard_notify", 0, data, 0);
  }

  SendChuCard(data) {
    this._notify("can_chu_card_notify", 0, data, 0);
  }

  sendRoomState(data) {
    this._notify("room_state_notify", 0, data, 0);
  }

  //通知：其他玩家出牌广播
  SendOtherChuCard(data) {
    this._notify("other_chucard_notify", 0, data, 0);
  }

  //通知：游戏结束
  sendGameOver(data) {
    this._notify("game_over", 0, data, 0);
  }

  //删除玩家出过的牌
  removePushCards(remve_cards: CardClient[]) {
    if (remve_cards.length == 0) {
      return;
    }

    const removeCardIds = remve_cards.map((rcard) => rcard.cardid);

    this.cards = this.cards.filter((card) => {
      return !removeCardIds.includes(card.index);
    });
  }
}
