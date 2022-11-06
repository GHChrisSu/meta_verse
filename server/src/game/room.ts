import { CREATE_ROOM_CONFIG, QIAN_STATE, ROOM_STATE } from "./defines";
import CardManager from "./card_manager";
import Player from "./player";
import Card, { CardClient } from "./card";
import config from "../config";
const console = config.console;

const rooms: string[] = [];

interface GRPerson {
  account: string;
  nickName: string;
}

interface AddressCounter {
  dizhu: GRPerson;
  nongmin: GRPerson[];
}
interface GameResult {
  winner: string;
  addressCounter: AddressCounter;
}

const getRandomStr = (count: number) => {
  let str = "";
  for (var i = 0; i < count; i++) {
    str += Math.floor(Math.random() * 10);
  }
  if (rooms.includes(str)) {
    str = getRandomStr(count);
  } else {
    rooms.push(str);
  }
  return str;
};

export default class Room {
  roomId: string;
  playerList: Player[];
  ownPlayer: Player;
  bottom: number;
  rate: number;
  houseManager: Player;
  state: number;
  carder: CardManager;
  robPlayer: Player[];
  roomMaster: Player;
  threeCards: Card[];
  playing: Player[];
  curPushCardList: Card[];
  lastPushCardList: Card[];
  lastPushCardAccount: string;
  lastPlayer: Player;

  constructor(data, player: Player) {
    this.roomId = getRandomStr(6);
    this.playerList = [];
    console.log("creat room id:" + this.roomId);

    const tconfig = CREATE_ROOM_CONFIG[data.type];

    this.ownPlayer = player; //创建房间的玩家
    this.bottom = data.amount || tconfig?.bottom;
    this.rate = tconfig?.rate || 1; //倍数
    this.houseManager = player; //房主(不是地主)
    this.state = ROOM_STATE.ROOM_INVALID; //房间状态
    this.robPlayer = []; //复制一份房间内player,做抢地主操作
    this.roomMaster = undefined; //房间地主引用
    this.threeCards = []; //三张底牌
    this.playing = []; //存储出牌的用户(一轮)
    this.curPushCardList = []; //当前玩家出牌列表
    this.lastPushCardList = []; //玩家上一次出的牌
    this.lastPushCardAccount = ""; //最后一个出牌的account
  }

  isFull() {
    return this.playerList.length >= 3;
  }

  changeState(state) {
    if (this.state == state) {
      return;
    }
    this.state = state;
    switch (state) {
      case ROOM_STATE.ROOM_WAITREADY:
        break;
      case ROOM_STATE.ROOM_WAITREADY:
        break;
      case ROOM_STATE.ROOM_GAMESTART:
        this.gameStart();
        //切换到发牌状态
        this.changeState(ROOM_STATE.ROOM_PUSHCARD);
        break;
      case ROOM_STATE.ROOM_PUSHCARD:
        console.log("push card state");
        //这个函数把54张牌分成4份[玩家1，玩家2，玩家3,底牌]
        this.threeCards = this.carder.splitThreeCards();
        for (var i = 0; i < this.playerList.length; i++) {
          this.playerList[i].sendCard(this.threeCards[i]);
        }
        //切换到抢地主状态
        this.changeState(ROOM_STATE.ROOM_ROBSTATE);
        break;
      case ROOM_STATE.ROOM_ROBSTATE:
        console.log("change ROOM_ROBSTATE state");
        this.robPlayer = [];
        for (var i = this.playerList.length - 1; i >= 0; i--) {
          this.robPlayer.push(this.playerList[i]);
        }
        console.log("this.robplayer length:" + this.robPlayer.length);
        this.turnRob();
        break;
      case ROOM_STATE.ROOM_SHOWBOTTOMCARD:
        //暂停s，让玩家看行底牌
        setTimeout(() => {
          this.changeState(ROOM_STATE.ROOM_PLAYING);
          //下个当前状态给客户端
          for (var i = 0; i < this.playerList.length; i++) {
            this.playerList[i].sendRoomState(ROOM_STATE.ROOM_PLAYING);
          }
        }, 1000);
        break;
      case ROOM_STATE.ROOM_PLAYING:
        this.resetInitChuCardPlayer();
        //下发出牌消息
        this.sendChuPaiMessage();
        break;
      case ROOM_STATE.ROOM_GAME_OVER:
        this.lastPushCardList = [];
        break;
      default:
        break;
    }
  }

  joinPlayer(player: Player) {
    if (player) {
      player.seatindex = this.playerList.length;
      const playerInfo = {
        account: player.account,
        nick_name: player.nickName,
        avatarUrl: player.avatarUrl,
        goldcount: player.gold,
        seatindex: player.seatindex,
      };
      //把用户信息广播个给房间其他用户
      for (var i = 0; i < this.playerList.length; i++) {
        this.playerList[i].sendPlayerJoinRoom(playerInfo);
      }
      this.playerList.push(player);
    }
  }

  outPlayer(player: Player) {
    if (player) {
      const playerInfo = {
        account: player.account,
        nick_name: player.nickName,
        goldcount: player.gold,
        seatindex: player.seatindex,
      };
      this.playerList = this.playerList.filter(
        (playerInList) => playerInList !== player
      );
      //把用户信息广播个给房间其他用户
      for (var i = 0; i < this.playerList.length; i++) {
        this.playerList[i].sendPlayerOutRoom(playerInfo);
      }
    }
  }

  enter_room(player: Player, callback) {
    //获取房间内其他玩家数据
    var player_data = [];
    console.log("enter_room _player_list.length:" + this.playerList.length);
    for (var i = 0; i < this.playerList.length; i++) {
      var data = {
        account: this.playerList[i].account,
        nick_name: this.playerList[i].nickName,
        goldcount: this.playerList[i].gold,
        seatindex: this.playerList[i].seatindex,
        isready: this.playerList[i].ready,
      };
      player_data.push(data);
      console.log("enter_room userdata:" + JSON.stringify(data));
    }

    //var seatid = getSeatIndex(this._player_list) //分配一个座位号
    if (callback) {
      var enterroom_para = {
        seatindex: player.seatindex, //自己在房间内的位置
        roomid: this.roomId, //房间roomid
        playerdata: player_data, //房间内玩家用户列表
        houseManagerAccount: this.houseManager.account,
      };
      callback(0, enterroom_para);
      //https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564763901986&di=82c257959de2c29ea027a4c2a00952e0&imgtype=0&src=http%3A%2F%2Fimages.liqucn.com%2Fimg%2Fh1%2Fh988%2Fimg201711250941030_info400X400.jpg
    }
  }
  //重新设置房主
  changeHouseManage(player: Player) {
    if (player) {
      this.houseManager = player;
      //这里需要加上，掉线用户account过去
      for (var i = 0; i < this.playerList.length; i++) {
        this.playerList[i].sendPlayerChangeManage(this.houseManager.account);
      }
    }
  }
  //玩家掉线接口
  playerOffLine(player: Player) {
    //通知房间内那个用户掉线,并且用用户列表删除
    for (var i = 0; i < this.playerList.length; i++) {
      // TODO 掉线之后进入托管状态 只托管一局 （回来的话继续， 一局结局之后退出）

      if (this.playerList[i].account === player.account) {
        //判断是否为房主掉线
        if (this.houseManager.account == player.account) {
          if (this.playerList.length >= 1) {
            this.changeHouseManage(this.playerList[0]);
          }
        }
      }
    }
  }

  playerReady(player: Player) {
    //告诉房间里所有用户，有玩家ready
    for (var i = 0; i < this.playerList.length; i++) {
      this.playerList[i].sendplayerReady(player.account);
    }
  }

  //下发开始游戏消息
  gameStart() {
    for (var i = 0; i < this.playerList.length; i++) {
      this.playerList[i].gameStart();
    }
  }

  //发送下个玩家，开始抢地主
  turnRob() {
    if (this.robPlayer.length == 0) {
      //都抢过了，需要确定最终地主人选,直接退出
      console.log("rob player end");
      this.changeMaster();
      //改变房间状态，显示底牌
      this.changeState(ROOM_STATE.ROOM_SHOWBOTTOMCARD);
      return;
    }

    //弹出已经抢过的用户
    const can_player = this.robPlayer.pop();
    if (this.robPlayer.length == 0 && this.roomMaster === undefined) {
      //没有抢地主，并且都抢过了,就设置为最后抢的玩家
      this.roomMaster = can_player;
    }

    for (var i = 0; i < this.playerList.length; i++) {
      //通知下一个可以抢地主的玩家
      this.playerList[i].SendCanRob(can_player.account);
    }
  }

  //客户端到服务器: 发送地主改变的消息
  changeMaster() {
    // 底牌加到地主
    this.roomMaster.cards = this.roomMaster.cards.concat(this.threeCards[3]);
    for (var i = 0; i < this.playerList.length; i++) {
      this.playerList[i].SendChangeMaster(this.roomMaster.account);
    }

    //显示底牌
    for (var i = 0; i < this.playerList.length; i++) {
      //把三张底牌的消息发送给房间里的用户
      this.playerList[i].SendShowBottomCard(this.threeCards[3]);
    }
  }
  //房主点击开始游戏按钮
  playerStart(player: Player, cb) {
    if (this.playerList.length != 3) {
      if (cb) {
        cb(-2, null);
      }
      return;
    }

    //判断是有都准备成功
    for (var i = 0; i < this.playerList.length; i++) {
      if (this.playerList[i].account !== this.houseManager.account) {
        if (this.playerList[i].ready == false) {
          cb(-3, null);
          return;
        }
      }
    }

    this.carder = new CardManager(); //发牌对象
    //开始游戏
    if (cb) {
      cb(0, {});
    }

    //下发游戏开始广播消息
    this.changeState(ROOM_STATE.ROOM_GAMESTART);
  }

  //一轮出牌完毕，调用这个函数重置出牌数组
  resetInitChuCardPlayer() {
    const master_index = this.playerList.findIndex(
      (player) => player.account === this.roomMaster.account
    );

    //重新计算出牌的顺序
    for (let i = 0; i < this.playerList.length - 1; i++) {
      const chuPaiIndex = (master_index + i) % this.playerList.length;
      this.playing[i] = this.playerList[chuPaiIndex];
    }
  }

  //下发:谁出牌的消息
  sendChuPaiMessage() {
    if (this.state !== ROOM_STATE.ROOM_PLAYING) return;
    const currentChuPaiPlayer = this.playing.shift();
    for (var i = 0; i < this.playerList.length; i++) {
      //通知下一个出牌的玩家
      if (!currentChuPaiPlayer.account) {
        console.log("playing : ", this.playing);
        console.log("playerList : ", this.playerList);
      }
      this.playerList[i].SendChuCard(currentChuPaiPlayer.account);
    }
    console.log("player 出牌 length", this.playing.length);
    // 一旦要了牌 出牌顺序就重置
    const nextPlayerIndex =
      this.playerList.findIndex(
        (player) => player.account === currentChuPaiPlayer.account
      ) + 1;
    for (let i = 0; i < this.playerList.length; i++) {
      const chuPaiIndex = (nextPlayerIndex + i) % this.playerList.length;
      this.playing[i] = this.playerList[chuPaiIndex];
    }
    console.log("player 出牌完重置 length", this.playing.length);
  }

  playerBuChuCard() {
    const cur_chu_card_player = this.playing.shift();
    for (var i = 0; i < this.playerList.length; i++) {
      //通知下一个出牌的玩家
      this.playerList[i].SendChuCard(cur_chu_card_player.account);
    }
    console.log("player 不出牌 this.playing.length", this.playing.length);
    if (this.playing.length === 1) {
      this.lastPushCardList = [];
      this.lastPushCardAccount = "";

      const nextPlayerIndex =
        this.playerList.findIndex(
          (player) => player.account === cur_chu_card_player.account
        ) + 1;
      for (let i = 0; i < this.playerList.length; i++) {
        const chuPaiIndex = (nextPlayerIndex + i) % this.playerList.length;
        this.playing[i] = this.playerList[chuPaiIndex];
      }
      console.log("player 不出牌完重置 length", this.playing.length);
    }
  }

  //广播玩家出牌的消息
  //player出牌的玩家
  sendPlayerPushCard(player: Player, cards: CardClient[]) {
    if (player == null || cards.length == 0) {
      return;
    }

    player.removePushCards(cards);

    // 判断是否出完牌为胜利 构造交易 地主付钱给两个农民或者 农民付钱给两个地主
    if (player.cards.length === 0) {
      this.changeState(ROOM_STATE.ROOM_GAME_OVER);
      const addressCounter = this.gatherAddress();
      for (var i = 0; i < this.playerList.length; i++) {
        this.playerList[i].ready = false;
        const data: GameResult = {
          winner: player.account,
          addressCounter,
        };
        this.playerList[i].sendGameOver(data);
      }
    } else {
      for (var i = 0; i < this.playerList.length; i++) {
        //不转发给自己
        if (this.playerList[i] == player) {
          continue;
        }
        const data = {
          account: player.account,
          cards: cards,
        };
        this.playerList[i].SendOtherChuCard(data);
      }
    }
  }

  gatherAddress() {
    const addressCounter: AddressCounter = {
      nongmin: [],
      dizhu: {} as GRPerson,
    };
    for (var i = 0; i < this.playerList.length; i++) {
      if (this.playerList[i].account === this.roomMaster.account) {
        addressCounter.dizhu = {
          account: this.roomMaster.account,
          nickName: this.roomMaster.nickName,
        };
      } else {
        addressCounter.nongmin.push({
          account: this.playerList[i].account,
          nickName: this.roomMaster.nickName,
        });
      }
    }
    return addressCounter;
  }

  //玩家出牌
  playerChuCard(player: Player, data, cb) {
    console.log("playerChuCard" + JSON.stringify(data));
    //当前没有出牌,不用走下面判断
    if (data == 0) {
      const resp = {
        data: {
          account: player.account,
          msg: "choose card",
        },
      };
      cb(-1, resp);
      return;
    }
    //this.cur_push_card_list = data
    //先判断自己是否有这么几张牌
    //先判断牌型是否满足规则
    var cardvalue = this.carder.isCanPushs(data);
    if (cardvalue == undefined) {
      const resp = {
        data: {
          account: player.account,
          msg: "不可用牌型",
        },
      };
      cb(-1, resp);
      return;
    } else {
      if (this.lastPushCardList.length == 0) {
        //出牌成功
        this.lastPushCardList = data;
        this.lastPushCardAccount = player.account;
        const resp = {
          data: {
            account: player.account,
            msg: "sucess",
            cardvalue: cardvalue,
          },
        };
        //回调函数会给出牌玩家发送出牌成功消息
        cb(0, resp);
        //把该玩家出的牌广播给其他玩家
        this.sendPlayerPushCard(player, data);
        //通知下一个玩家出牌
        this.sendChuPaiMessage();
        return;
      }
      //和上次玩家出牌进行比较
      if (false == this.carder.compareWithCard(this.lastPushCardList, data)) {
        console.log("last_push_card_list", this.lastPushCardList);
        const resp = {
          data: {
            account: player.account,
            msg: "当前牌太小",
            cardvalue: cardvalue,
          },
        };
        cb(-2, resp);
      } else {
        //出牌成功
        this.lastPushCardList = data;
        this.lastPushCardAccount = player.account;
        const resp = {
          data: {
            account: player.account,
            msg: "choose card sucess",
            cardvalue: cardvalue,
          },
        };
        //回调函数会给出牌玩家发送出牌成功消息
        cb(0, resp);
        //把该玩家出的牌广播给其他玩家
        this.sendPlayerPushCard(player, data);
        //通知下一个玩家出牌
        this.sendChuPaiMessage();
      }
    }
  }
  //客户端到服务器: 处理玩家抢地主消息
  playerRobmaster(player, data) {
    console.log("playerRobmaster value:" + data);
    if (QIAN_STATE.buqiang == data) {
      //记录当前抢到地主的玩家id
    } else if (QIAN_STATE.qian == data) {
      this.roomMaster = player;
    } else {
      console.log("playerRobmaster state error:" + data);
    }
    if (player == null) {
      console.log("trun rob master end");
      return;
    }
    //广播这个用户抢地主状态(抢了或者不抢)
    var value = data;
    for (var i = 0; i < this.playerList.length; i++) {
      data = {
        account: player.account,
        state: value,
      };
      this.playerList[i].sendRobState(data);
    }
    this.turnRob();
  }
}
