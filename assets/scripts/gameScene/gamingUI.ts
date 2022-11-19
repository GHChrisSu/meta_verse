import { _decorator, unt, Component, Prefab, Node, Label, AudioClip } from "cc";
const { ccclass, property } = _decorator;

import { ITransaction } from "../../../../ddz_vue/src/hooks/useWalletTypes";
import { CardsValue, isopen_sound, qian_state } from "../defines";
import myglobal from "../mygolbal";
import GameScene from "./gameScene";
import Card from "./prefabs/card";
const { log, error } = cc;
export interface GRPerson {
  aunt: string;
  nickName: string;
}
export interface AddressCounter {
  dizhu: GRPerson;
  nongmin: GRPerson[];
}
export interface GameResult {
  winner: string;
  addressCounter: AddressCounter;
}

@ccclass("GamingUI")
export default class GamingUI extends Component {
  @property(Prefab)
  card_prefab: Prefab;
  @property(Node)
  robUI: Node;
  @property(Label)
  robTimerLabel: Label;
  @property(Node)
  bottom_card_pos_node: Node;
  @property(Node)
  playingUI_node: Node;
  @property(Label)
  playingTimerLabel: Label;
  @property(Label)
  tipsLabel: Label; //玩家出牌不合法的tips
  @property(Label)
  trusteeshipLabel: Label;
  @property(AudioClip)
  duizi: AudioClip;
  @property(AudioClip)
  fapai: AudioClip;
  @property(AudioClip)
  womanJiaoDiZhu: AudioClip;
  @property(AudioClip)
  womanBuJiao: AudioClip;
  cards_nods: Node[];
  card_width: number;
  robPlayerAunt: string;
  fapai_end: boolean;
  bottom_card: Node[];
  bottom_card_data: any[];
  choose_card_data: any[];
  outcar_zone: any[];
  push_card_tmp: Node[];
  cur_index_card: number;
  card_data: any;
  fapai_audioID: number;
  countDownRob: NodeJS.Timeout;
  countDownRobSecond: string;
  countDownPlay: NodeJS.Timeout;
  countDownPlaySecond: string;
  onLoad() {
    //自己牌列表
    //this.cards_nods = [];
    //this.card_width = 0;
    //当前可以抢地主的account
    //this.robPlayerAccount = "";
    //发牌动画是否结束
    //this.fapai_end = false;
    //底牌数组
    //this.bottom_card = [];
    //底牌的json对象数据
    //this.bottom_card_data = [];
    //this.choose_card_data = [];
    //this.outcar_zone = [];
    //this.push_card_tmp = [];
    //this.countDownRobSecond = this.robTimerLabel.string;
    //this.countDownPlaySecond = this.playingTimerLabel.string;
    //监听服务器:下发牌消息
    //myglobal.socket.onPushCards((data) => {
    //log("onPushCards" + JSON.stringify(data));
    //this.card_data = data;
    //this.cur_index_card = data.length - 1;
    //this.pushCard(data);
    //if (isopen_sound) {
    //log("start fapai_audioID: " + this.fapai_audioID);
    //}
    //左边移动定时器
    //this.scheduleOnce(this._runactive_pushcard.bind(this), 0.3);
    //this.node.parent.emit("pushcard_other_event");
    //});
    //监听服务器:通知抢地主消息,显示相应的UI
    //myglobal.socket.onCanRobState((data) => {
    //log("onCanRobState" + JSON.stringify(data));
    //这里需要2个变量条件：自己是下一个抢地主，2发牌动画结束
    //this.robPlayerAccount = data;
    //if (data == myglobal.playerData.account && this.fapai_end == true) {
    //clearInterval(this.countDownRob);
    //this.robUI.active = true;
    //this.countDownRob = setInterval(
    //this.countDownRobClock.bind(this),
    //1000
    //);
    //}
    //});
    //监听服务器可以出牌消息
    //myglobal.socket.onCanChuCard((data) => {
    //log("onCanChuCard: " + JSON.stringify(data));
    //判断是不是自己能出牌
    //if (data == myglobal.playerData.account) {
    //先清理出牌区域
    //this.clearOutZone(myglobal.playerData.account);
    //先把自己出牌列表置空
    //this.choose_card_data=[]
    //显示可以出牌的UI
    // TODO 托管先为不出牌
    //if (myglobal.playerData.trusteeship) {
    //this.buchu();
    //} else {
    //clearInterval(this.countDownPlay);
    //this.playingUI_node.active = true;
    //this.countDownPlay = setInterval(
    //this.countDownPlayClock.bind(this),
    //1000
    //);
    //}
    //}
    //});
    //监听服务器：其他玩家出牌消息
    //myglobal.socket.onOtherPlayerChuCard((data) => {
    //{"account":"2357540","cards":[{"cardid":4,"card_data":{"index":4,"value":1,"shape":1}}]}
    //log("onOtherPlayerChuCard" + JSON.stringify(data));
    //const account = data.account;
    //const gameScene_script = this.node.parent.getComponent(
    //"gameScene"
    //) as GameScene;
    //获取出牌区域节点
    //const outCard_node = gameScene_script.getUserOutCardPosByAccount(account);
    //if (outCard_node == null) {
    //return;
    //}
    //const node_cards = [];
    //for (var i = 0; i < data.cards.length; i++) {
    //const card = cc.instantiate(this.card_prefab);
    //card
    //.getComponent("card")
    //.showCards(data.cards[i].card_data, myglobal.playerData.account);
    //node_cards.push(card);
    //}
    // TODO remove other player card
    //gameScene_script.removeCardsFromOtherUser(account, data.cards.length);
    //this.appendOtherCardsToOutZone(outCard_node, node_cards, 0);
    //});
    //监听服务器：game over
    //myglobal.socket.onGameOver(async (data: GameResult) => {
    // 牌桌回归到初始状态
    //this.playingUI_node.active = false;
    //const gamebefore_node = this.node.parent.getChildByName("gamebeforeUI");
    //gamebefore_node.active = true;
    // 地主赢
    //if (myglobal.playerData.masterAccount === data.winner) {
    // 地主不是我 我作為 农民付钱
    //if (myglobal.playerData.account !== myglobal.playerData.masterAccount) {
    //const transaction: ITransaction = {
    //description:
    //"斗地主作为农民输了" +
    //myglobal.playerData.bottom * myglobal.playerData.rate +
    //"Satoshi",
    //outputs: [
    //{
    //to: data.addressCounter.dizhu.account,
    //amount: String(
    //myglobal.playerData.bottom * myglobal.playerData.rate
    //),
    //},
    //],
    //};
    //try {
    //const res = await myglobal.chainbow.sendTransaction(transaction);
    //if (res) {
    //myglobal.socket.requestPayed(
    //Object.assign({}, res, {
    //success: true,
    //account: myglobal.playerData.account,
    //}),
    //() => {}
    //);
    //}
    //} catch (e) {
    //error(e);
    //myglobal.socket.requestPayed(
    //Object.assign(
    //{},
    //{
    //success: false,
    //account: myglobal.playerData.account,
    //}
    //),
    //() => {}
    //);
    //}
    //(this.node.parent.getComponent("gameScene") as GameScene).lose(
    //data,
    //myglobal.playerData.bottom * myglobal.playerData.rate
    //);
    //} else {
    //(this.node.parent.getComponent("gameScene") as GameScene).win(
    //data,
    //myglobal.playerData.bottom * myglobal.playerData.rate
    //);
    //}
    //} else {
    // 农民赢 地主给钱
    //if (myglobal.playerData.account === myglobal.playerData.masterAccount) {
    //const transaction: ITransaction = {
    //description:
    //"斗地主作为地主输了" +
    //2 * myglobal.playerData.bottom * myglobal.playerData.rate +
    //"Satoshi",
    //outputs: [
    //{
    //to: data.addressCounter.nongmin[0],
    //amount: String(
    //myglobal.playerData.bottom * myglobal.playerData.rate
    //),
    //},
    //{
    //to: data.addressCounter.nongmin[1],
    //amount: String(
    //myglobal.playerData.bottom * myglobal.playerData.rate
    //),
    //},
    //],
    //};
    //try {
    //const res = await myglobal.chainbow.sendTransaction(transaction);
    //if (res) {
    //myglobal.socket.requestPayed(
    //Object.assign({}, res, {
    //success: true,
    //account: myglobal.playerData.account,
    //}),
    //() => {}
    //);
    //}
    //} catch (e) {
    //error(e);
    //myglobal.socket.requestPayed(
    //Object.assign(
    //{},
    //{
    //success: false,
    //account: myglobal.playerData.account,
    //}
    //),
    //() => {}
    //);
    //}
    //(this.node.parent.getComponent("gameScene") as GameScene).lose(
    //data,
    //myglobal.playerData.bottom * myglobal.playerData.rate
    //);
    //} else {
    //(this.node.parent.getComponent("gameScene") as GameScene).win(
    //data,
    //myglobal.playerData.bottom * myglobal.playerData.rate
    //);
    //}
    //}
    //});
    //内部事件:显示底牌事件,data是三张底牌数据
    //this.node.on("show_bottom_card_event", (data) => {
    //log("----show_bottom_card_event", data);
    //this.bottom_card_data = data;
    //for (var i = 0; i < data.length; i++) {
    //var card = this.bottom_card[i];
    //var show_data = data[i];
    //var call_data = {
    //obj: card,
    //data: show_data,
    //};
    //log("bottom show_data:" + JSON.stringify(show_data));
    //var run = cc.callFunc(
    //(target, activedata) => {
    //var show_card = activedata.obj;
    //var show_data = activedata.data;
    //log("cc.callFunc:"+JSON.stringify(show_data))
    //show_card.getComponent("card").showCards(show_data);
    //},
    //this,
    //call_data
    //);
    //card.runAction(
    //cc.sequence(
    //cc.rotateBy(0, 180),
    //cc.rotateBy(0.2, -90),
    //run,
    //cc.rotateBy(0.2, -90),
    //cc.scaleBy(1, 1.2)
    //)
    //);
    //}
    //this.node.parent.emit("change_room_state_event",RoomState.ROOM_PLAYING)
    //如果自己地主，给加上三张底牌
    //if (myglobal.playerData.account == myglobal.playerData.masterAccount) {
    //this.scheduleOnce(this.pushThreeCard.bind(this), 0.2);
    //} else {
    //const gameScene = this.node.parent.getComponent(
    //"gameScene"
    //) as GameScene;
    //gameScene.addThreeCardsToOtherUser(myglobal.playerData.masterAccount);
    //}
    //});
    //注册监听一个选择牌消息
    //this.node.on("choose_card_event", (event) => {
    //log("choose_card_event:" + JSON.stringify(event));
    //var detail = event;
    //this.choose_card_data.push(detail);
    //});
    //this.node.on("unchoose_card_event", (event) => {
    //log("unchoose_card_event:" + event);
    //var detail = event;
    //for (var i = 0; i < this.choose_card_data.length; i++) {
    //if (this.choose_card_data[i].cardid == detail) {
    //this.choose_card_data.splice(i, 1);
    //}
    //}
    //});
  }
  countDownPlayClock() {
    //this.playingTimerLabel.string = String(
    //Number(this.playingTimerLabel.string) - 1
    //);
    //if (Number(this.playingTimerLabel.string) <= 0) {
    //this.buchu();
    //}
  }
  countDownRobClock() {
    //this.robTimerLabel.string = String(Number(this.robTimerLabel.string) - 1);
    //if (Number(this.robTimerLabel.string) <= 0) {
    //this.buqiang();
    //}
  }
  //处理发牌的效果
  _runactive_pushcard() {
    //if (this.cur_index_card < 0) {
    //log("pushcard end");
    //this.push_card_tmp = [];
    //this.fapai_end = true;
    //if (this.robPlayerAccount == myglobal.playerData.account) {
    //clearInterval(this.countDownRob);
    //this.robUI.active = true;
    //this.countDownRob = setInterval(
    //this.countDownRobClock.bind(this),
    //1000
    //);
    //}
    //if (isopen_sound) {
    //cc.audioEngine.stop(this.fapai_audioID);
    //}
    //通知gamescene节点，倒计时
    //var sendevent = this.robPlayerAccount;
    //this.node.parent.emit("canrob_event", sendevent);
    //return;
    //}
    //const move_node =
    //this.cards_nods[this.cards_nods.length - this.cur_index_card - 1];
    //move_node.active = true;
    //this.push_card_tmp.push(move_node);
    //this.fapai_audioID = cc.audioEngine.play(this.fapai, false, 0.5);
    //log("runactive cur_index_card: ", this.cur_index_card);
    //log("runactive push_card_tmp: ", this.push_card_tmp);
    //for (var i = 0; i < this.push_card_tmp.length - 1; i++) {
    //const move_node = this.push_card_tmp[i];
    //const newx = move_node.x - this.card_width * 0.4;
    //const action = cc.moveTo(0.1, cc.v2(newx, -250));
    //move_node.runAction(action);
    //}
    //this.cur_index_card--;
    //this.scheduleOnce(this._runactive_pushcard.bind(this), 0.3);
  }

  //对牌排序
  sortCard() {
    //this.cards_nods.sort((x, y) => {
    //var a = (x.getComponent("card") as Card).card_data;
    //var b = (y.getComponent("card") as Card).card_data;
    //if (a.hasOwnProperty("value") && b.hasOwnProperty("value")) {
    //return b.value - a.value;
    //}
    //if (a.hasOwnProperty("king") && !b.hasOwnProperty("king")) {
    //return -1;
    //}
    //if (!a.hasOwnProperty("king") && b.hasOwnProperty("king")) {
    //return 1;
    //}
    //if (a.hasOwnProperty("king") && b.hasOwnProperty("king")) {
    //return b.king - a.king;
    //}
    //});
    //var x = this.cards_nods[0].x;
    //这里使用固定坐标，因为取this.cards_nods[0].xk可能排序为完成，导致x错误
    //所以做1000毫秒的延时
    //var x = -417.6
    //const x =
    //this.cards_nods[0].x > 0 ? -this.cards_nods[0].x : this.cards_nods[0].x;
    //log("sort x:" + x);
    //for (let i = 0; i < this.cards_nods.length; i++) {
    //const card = this.cards_nods[i];
    //card.zIndex = i; //设置牌的叠加次序,zindex越大显示在上面
    //card.x = x + card.width * 0.4 * i;
    //}
  }
  pushCard(data) {
    //if (data) {
    //data.sort((a, b) => {
    //if (a.hasOwnProperty("value") && b.hasOwnProperty("value")) {
    //return b.value - a.value;
    //}
    //if (a.hasOwnProperty("king") && !b.hasOwnProperty("king")) {
    //return -1;
    //}
    //if (!a.hasOwnProperty("king") && b.hasOwnProperty("king")) {
    //return 1;
    //}
    //if (a.hasOwnProperty("king") && b.hasOwnProperty("king")) {
    //return b.king - a.king;
    //}
    //});
    //}
    //创建card预制体
    //this.cards_nods = [];
    //for (var i = 0; i < 17; i++) {
    //var card = cc.instantiate(this.card_prefab);
    //card.scale = 0.8;
    //card.parent = this.node.parent;
    //card.x = card.width * 0.4 * (17 - 1) * (-0.5) + card.width * 0.4 * 0;
    //card.x = card.width * 0.4 * -0.5 * -16 + card.width * 0.4 * 0;
    //这里实现为，每发一张牌，放在已经发的牌最后，然后整体移动
    //card.y = -250;
    //card.active = false;
    //(card.getComponent("card") as Card).showCards(
    //data[i],
    //myglobal.playerData.account
    //);
    //存储牌的信息,用于后面发牌效果
    //this.cards_nods.push(card);
    //this.card_width = card.width;
    //}
    //for (let index = 0; index < this.bottom_card.length; index++) {
    //const element = this.bottom_card[index];
    //element.destroy();
    //}
    //创建3张底牌
    //this.bottom_card = [];
    //for (let i = 0; i < 3; i++) {
    //const di_card = cc.instantiate(this.card_prefab);
    //di_card.scale = 0.4;
    //di_card.position = this.bottom_card_pos_node.position;
    //三张牌，中间坐标就是bottom_card_pos_node节点坐标，
    //0,和2两张牌左右移动windth*0.4
    //if (i == 0) {
    //di_card.x = di_card.x - di_card.width * 0.4;
    //} else if (i == 2) {
    //di_card.x = di_card.x + di_card.width * 0.4;
    //}
    //di_card.x = di_card.width-i*di_card.width-20
    //di_card.y=60
    //di_card.parent = this.node.parent;
    //存储在容器里
    //this.bottom_card.push(di_card);
    //}
  }
  //给玩家发送三张底牌后，过1s,把牌设置到y=-250位置效果
  schedulePushThreeCard() {
    //for (var i = 0; i < this.cards_nods.length; i++) {
    //var card = this.cards_nods[i];
    //if (card.y == -230) {
    //card.y = -250;
    //}
    //}
  }
  //给地主发三张排，并显示在原有牌的后面
  pushThreeCard() {
    //每张牌的其实位置
    //var last_card_x = this.cards_nods[this.cards_nods.length - 1].x;
    //for (var i = 0; i < this.bottom_card_data.length; i++) {
    //var card = cc.instantiate(this.card_prefab);
    //card.scale = 0.8;
    //card.parent = this.node.parent;
    //card.x = last_card_x + (i + 1) * this.card_width * 0.4;
    //card.y = -230; //先把底盘放在-230，在设置个定时器下移到-250的位置
    //log("pushThreeCard x:"+card.x)
    //card
    //.getComponent("card")
    //.showCards(this.bottom_card_data[i], myglobal.playerData.account);
    //card.active = true;
    //this.cards_nods.push(card);
    //}
    //this.sortCard();
    //设置一个定时器，在2s后，修改y坐标为-250
    //this.scheduleOnce(this.schedulePushThreeCard, 2);
  }
  destoryCards(aunt: string, cards) {
    //if (cards.length == 0) {
    //return;
    //}
    /*出牌逻辑
        //1. 将选中的牌 从父节点中移除
        //2. 从this.cards_nods 数组中，删除 选中的牌
        //3. 将 “选中的牌” 添加到出牌区域
        //3.1 清空出牌区域
        //3.2 添加子节点
        //3.3 设置scale
        //3.4 设置position
        //4.  重新设置手中的牌的位置  this.updateCards();
        */
    //1/2步骤删除自己手上的card节点
    //var destroy_card = [];
    //for (var i = 0; i < cards.length; i++) {
    //for (var j = 0; j < this.cards_nods.length; j++) {
    //var card_id = this.cards_nods[j].getComponent("card").card_id;
    //if (card_id == cards[i].cardid) {
    //log("destroy card id:" + card_id);
    //this.cards_nods[j].destroy()
    //this.cards_nods[j].removeFromParent(true);
    //destroy_card.push(this.cards_nods[j]);
    //this.cards_nods.splice(j, 1);
    //}
    //}
    //}
    //this.appendCardsToOutZone(account, destroy_card);
    //this.updateCards();
  }
  destoryAllCards() {
    //for (var i = 0; i < this.cards_nods.length; i++) {
    //if (this.cards_nods[i]) {
    //this.cards_nods[i].destroy();
    //this.cards_nods[i].removeFromParent(true);
    //}
    //}
    //this.cards_nods = [];
    //this.updateCards();
  }
  //清除显示出牌节点全部子节点(就是把出牌的清空)
  clearOutZone(aunt) {
    //var gameScene_script = this.node.parent.getComponent(
    //"gameScene"
    //) as GameScene;
    //var outCard_node = gameScene_script.getUserOutCardPosByAccount(account);
    //var children = outCard_node.children;
    //for (var i = 0; i < children.length; i++) {
    //var card = children[i];
    //card.destroy();
    //}
    //outCard_node.removeAllChildren(true);
  }
  //对出的牌做排序
  pushCardSort(cards) {
    //if (cards.length == 1) {
    //return;
    //}
    //cards.sort((x, y) => {
    //var a = x.getComponent("card").card_data;
    //var b = y.getComponent("card").card_data;
    //if (a.hasOwnProperty("value") && b.hasOwnProperty("value")) {
    //return b.value - a.value;
    //}
    //if (a.hasOwnProperty("king") && !b.hasOwnProperty("king")) {
    //return -1;
    //}
    //if (!a.hasOwnProperty("king") && b.hasOwnProperty("king")) {
    //return 1;
    //}
    //if (a.hasOwnProperty("king") && b.hasOwnProperty("king")) {
    //return b.king - a.king;
    //}
    //});
  }
  appendOtherCardsToOutZone(outCard_node, cards, yoffset) {
    //outCard_node.removeAllChildren(true);
    //log("appendOtherCardsToOutZone length"+cards.length)
    //添加新的子节点
    //for (var i = 0; i < cards.length; i++) {
    //var card = cards[i];
    //outCard_node.addChild(card, 100 + i); //第二个参数是zorder,保证牌不能被遮住
    //}
    //对出牌进行排序
    //设置出牌节点的坐标
    //var zPoint = cards.length / 2;
    //log("appendOtherCardsToOutZone zeroPoint:"+zPoint)
    //for (var i = 0; i < cards.length; i++) {
    //var cardNode = outCard_node.getChildren()[i];
    //var x = (i - zPoint) * 30;
    //var y = cardNode.y + yoffset; //因为每个节点需要的Y不一样，做参数传入
    //log("-----cardNode: x:"+x+" y:"+y)
    //cardNode.setScale(0.5, 0.5);
    //cardNode.setPosition(x, y);
    //}
  }
  //将 “选中的牌” 添加到出牌区域
  //destroy_card是玩家本次出的牌
  appendCardsToOutZone(aunt, destroy_card) {
    //if (destroy_card.length == 0) {
    //return;
    //}
    //先给本次出的牌做一个排序
    //this.pushCardSort(destroy_card);
    //log("appendCardsToOutZone")
    //var gameScene_script = this.node.parent.getComponent("gameScene");
    //获取出牌区域节点
    //var outCard_node = gameScene_script.getUserOutCardPosByAccount(account);
    //this.appendOtherCardsToOutZone(outCard_node, destroy_card, 360);
    //slog("OutZone:"+outCard_node.name)
  }
  //重新排序手上的牌,并移动
  updateCards() {
    //const zeroPoint = this.cards_nods.length / 2;
    //for (let i = 0; i < this.cards_nods.length; i++) {
    //const cardNode = this.cards_nods[i];
    //const x = (i - zeroPoint) * (this.card_width * 0.4);
    //cardNode.setPosition(x, -250);
    //}
  }
  playPushCardSound(card_name) {
    //log("playPushCardSound:" + card_name);
    //if (card_name == "") {
    //return;
    //}
    //switch (card_name) {
    //case CardsValue.one.name:
    //break;
    //case CardsValue.double.name:
    //if (isopen_sound) {
    //cc.audioEngine.play(this.duizi, false, 0.5);
    //}
    //break;
    //}
  }
  onButtonClick(event, customData) {
    //switch (customData) {
    //case "btn_qiandz":
    //this.qiang();
    //break;
    //case "btn_buqiandz":
    //log("btn_buqiandz");
    //this.buqiang();
    //break;
    //case "nopushcard": //不出牌
    //this.buchu();
    //break;
    //case "pushcard": //出牌
    //this.chupai();
    //break;
    //case "tipcard":
    //break;
    //case "trusteeship":
    //myglobal.playerData.trusteeship = !myglobal.playerData.trusteeship;
    //if (myglobal.playerData.trusteeship) {
    //if (this.playingUI_node.active) {
    //myglobal.socket.request_buchu_card([], null);
    //}
    //this.trusteeshipLabel.string = "非托管";
    //} else {
    //this.trusteeshipLabel.string = "托管";
    //}
    //break;
    //default:
    //break;
    //}
  }
  chupai() {
    //先获取本次出牌数据
    //if (this.choose_card_data.length == 0) {
    //this.tipsLabel.string = "请选择牌!";
    //setTimeout(() => {
    //this.tipsLabel.string = "";
    //}, 2000);
    //}
    //myglobal.socket.requestChuPai(this.choose_card_data, (err, data) => {
    //if (err) {
    //log("request_chu_card:" + err);
    //log("request_chu_card" + JSON.stringify(data));
    //if (this.tipsLabel.string == "") {
    //this.tipsLabel.string = data.msg;
    //setTimeout(() => {
    //this.tipsLabel.string = "";
    //}, 2000);
    //}
    //出牌失败，把选择的牌归位
    //for (var i = 0; i < this.cards_nods.length; i++) {
    //var card = this.cards_nods[i];
    //card.emit("reset_card_flag");
    //}
    //this.choose_card_data = [];
    //} else {
    //出牌成功
    //log("resp_chu_card data:" + JSON.stringify(data));
    //this.playingUI_node.active = false;
    //播放出牌的声音
    //resp_chu_card data:{"account":"2519901","msg":"sucess","cardvalue":{"name":"Double","value":1}}
    //{"type":"other_chucard_notify","result":0,"data":{"account":"2519901","cards":[{"cardid":24,"card_data":{"index":24,"value":6,"shape":1}},{"cardid":26,"card_data":{"index":26,"value":6,"shape":3}}]},"callBackIndex":0}
    //this.playPushCardSound(data.cardvalue.name);
    //this.destoryCards(data.account, this.choose_card_data);
    //this.choose_card_data = [];
    //}
    //});
    //clearInterval(this.countDownPlay);
    //this.playingTimerLabel.string = this.countDownPlaySecond;
  }
  buchu() {
    //myglobal.socket.request_buchu_card([], null);
    //this.playingUI_node.active = false;
    //clearInterval(this.countDownPlay);
    //this.playingTimerLabel.string = this.countDownPlaySecond;
  }
  qiang() {
    //myglobal.socket.requestRobState(qian_state.qian);
    //this.robUI.active = false;
    //if (isopen_sound) {
    //cc.audioEngine.play(this.womanJiaoDiZhu, false, 0);
    //}
    //clearInterval(this.countDownRob);
    //this.robTimerLabel.string = this.countDownRobSecond;
    //this.fapai_end = false;
  }
  buqiang() {
    //myglobal.socket.requestRobState(qian_state.buqiang);
    //this.robUI.active = false;
    //if (isopen_sound) {
    //cc.audioEngine.play(this.womanBuJiao, false, 0);
    //}
    //clearInterval(this.countDownRob);
    //this.robTimerLabel.string = this.countDownRobSecond;
    //this.fapai_end = false;
  }
}

/**
 * Note: The original script has been commented out, due to the large number of changes in the script, there may be missing in the conversion, you need to convert it manually
 */
// import { ITransaction } from "../../../../ddz_vue/src/hooks/useWalletTypes";
// import { CardsValue, isopen_sound, qian_state } from "../defines";
// import myglobal from "../mygolbal";
// import GameScene from "./gameScene";
// import Card from "./prefabs/card";
// const { ccclass, property } = cc._decorator;
// const { log, error } = cc;
//
// export interface GRPerson {
//   account: string;
//   nickName: string;
// }
//
// export interface AddressCounter {
//   dizhu: GRPerson;
//   nongmin: GRPerson[];
// }
// export interface GameResult {
//   winner: string;
//   addressCounter: AddressCounter;
// }
//
// @ccclass
// export default class GamingUI extends cc.Component {
//   @property(cc.Prefab)
//   card_prefab: cc.Prefab;
//   @property(cc.Node)
//   robUI: cc.Node;
//   @property(cc.Label)
//   robTimerLabel: cc.Label;
//   @property(cc.Node)
//   bottom_card_pos_node: cc.Node;
//   @property(cc.Node)
//   playingUI_node: cc.Node;
//   @property(cc.Label)
//   playingTimerLabel: cc.Label;
//   @property(cc.Label)
//   tipsLabel: cc.Label; //玩家出牌不合法的tips
//   @property(cc.Label)
//   trusteeshipLabel: cc.Label;
//
//   @property(cc.AudioClip)
//   duizi: cc.AudioClip;
//   @property(cc.AudioClip)
//   fapai: cc.AudioClip;
//   @property(cc.AudioClip)
//   womanJiaoDiZhu: cc.AudioClip;
//   @property(cc.AudioClip)
//   womanBuJiao: cc.AudioClip;
//
//   cards_nods: cc.Node[];
//   card_width: number;
//   robPlayerAccount: string;
//   fapai_end: boolean;
//   bottom_card: cc.Node[];
//   bottom_card_data: any[];
//   choose_card_data: any[];
//   outcar_zone: any[];
//   push_card_tmp: cc.Node[];
//   cur_index_card: number;
//   card_data: any;
//   fapai_audioID: number;
//   countDownRob: NodeJS.Timeout;
//   countDownRobSecond: string;
//   countDownPlay: NodeJS.Timeout;
//   countDownPlaySecond: string;
//
//   onLoad() {
//     //自己牌列表
//     this.cards_nods = [];
//     this.card_width = 0;
//     //当前可以抢地主的account
//     this.robPlayerAccount = "";
//     //发牌动画是否结束
//     this.fapai_end = false;
//     //底牌数组
//     this.bottom_card = [];
//     //底牌的json对象数据
//     this.bottom_card_data = [];
//     this.choose_card_data = [];
//     this.outcar_zone = [];
//
//     this.push_card_tmp = [];
//     this.countDownRobSecond = this.robTimerLabel.string;
//     this.countDownPlaySecond = this.playingTimerLabel.string;
//
//     //监听服务器:下发牌消息
//     myglobal.socket.onPushCards((data) => {
//       log("onPushCards" + JSON.stringify(data));
//       this.card_data = data;
//       this.cur_index_card = data.length - 1;
//       this.pushCard(data);
//       if (isopen_sound) {
//         log("start fapai_audioID: " + this.fapai_audioID);
//       }
//       //左边移动定时器
//       this.scheduleOnce(this._runactive_pushcard.bind(this), 0.3);
//       this.node.parent.emit("pushcard_other_event");
//     });
//
//     //监听服务器:通知抢地主消息,显示相应的UI
//     myglobal.socket.onCanRobState((data) => {
//       log("onCanRobState" + JSON.stringify(data));
//       //这里需要2个变量条件：自己是下一个抢地主，2发牌动画结束
//       this.robPlayerAccount = data;
//       if (data == myglobal.playerData.account && this.fapai_end == true) {
//         clearInterval(this.countDownRob);
//         this.robUI.active = true;
//         this.countDownRob = setInterval(
//           this.countDownRobClock.bind(this),
//           1000
//         );
//       }
//     });
//
//     //监听服务器可以出牌消息
//     myglobal.socket.onCanChuCard((data) => {
//       log("onCanChuCard: " + JSON.stringify(data));
//       //判断是不是自己能出牌
//       if (data == myglobal.playerData.account) {
//         //先清理出牌区域
//         this.clearOutZone(myglobal.playerData.account);
//         //先把自己出牌列表置空
//         //this.choose_card_data=[]
//         //显示可以出牌的UI
//         // TODO 托管先为不出牌
//         if (myglobal.playerData.trusteeship) {
//           this.buchu();
//         } else {
//           clearInterval(this.countDownPlay);
//           this.playingUI_node.active = true;
//           this.countDownPlay = setInterval(
//             this.countDownPlayClock.bind(this),
//             1000
//           );
//         }
//       }
//     });
//
//     //监听服务器：其他玩家出牌消息
//     myglobal.socket.onOtherPlayerChuCard((data) => {
//       //{"account":"2357540","cards":[{"cardid":4,"card_data":{"index":4,"value":1,"shape":1}}]}
//       log("onOtherPlayerChuCard" + JSON.stringify(data));
//
//       const account = data.account;
//       const gameScene_script = this.node.parent.getComponent(
//         "gameScene"
//       ) as GameScene;
//       //获取出牌区域节点
//       const outCard_node = gameScene_script.getUserOutCardPosByAccount(account);
//       if (outCard_node == null) {
//         return;
//       }
//
//       const node_cards = [];
//       for (var i = 0; i < data.cards.length; i++) {
//         const card = cc.instantiate(this.card_prefab);
//         card
//           .getComponent("card")
//           .showCards(data.cards[i].card_data, myglobal.playerData.account);
//         node_cards.push(card);
//       }
//       // TODO remove other player card
//       gameScene_script.removeCardsFromOtherUser(account, data.cards.length);
//       this.appendOtherCardsToOutZone(outCard_node, node_cards, 0);
//     });
//
//     //监听服务器：game over
//     myglobal.socket.onGameOver(async (data: GameResult) => {
//       // 牌桌回归到初始状态
//       this.playingUI_node.active = false;
//       const gamebefore_node = this.node.parent.getChildByName("gamebeforeUI");
//       gamebefore_node.active = true;
//
//       // 地主赢
//       if (myglobal.playerData.masterAccount === data.winner) {
//         // 地主不是我 我作為 农民付钱
//         if (myglobal.playerData.account !== myglobal.playerData.masterAccount) {
//           const transaction: ITransaction = {
//             description:
//               "斗地主作为农民输了" +
//               myglobal.playerData.bottom * myglobal.playerData.rate +
//               "Satoshi",
//             outputs: [
//               {
//                 to: data.addressCounter.dizhu.account,
//                 amount: String(
//                   myglobal.playerData.bottom * myglobal.playerData.rate
//                 ),
//               },
//             ],
//           };
//
//           try {
//             const res = await myglobal.chainbow.sendTransaction(transaction);
//             if (res) {
//               myglobal.socket.requestPayed(
//                 Object.assign({}, res, {
//                   success: true,
//                   account: myglobal.playerData.account,
//                 }),
//                 () => {}
//               );
//             }
//           } catch (e) {
//             error(e);
//             myglobal.socket.requestPayed(
//               Object.assign(
//                 {},
//                 {
//                   success: false,
//                   account: myglobal.playerData.account,
//                 }
//               ),
//               () => {}
//             );
//           }
//           (this.node.parent.getComponent("gameScene") as GameScene).lose(
//             data,
//             myglobal.playerData.bottom * myglobal.playerData.rate
//           );
//         } else {
//           (this.node.parent.getComponent("gameScene") as GameScene).win(
//             data,
//             myglobal.playerData.bottom * myglobal.playerData.rate
//           );
//         }
//       } else {
//         // 农民赢 地主给钱
//         if (myglobal.playerData.account === myglobal.playerData.masterAccount) {
//           const transaction: ITransaction = {
//             description:
//               "斗地主作为地主输了" +
//               2 * myglobal.playerData.bottom * myglobal.playerData.rate +
//               "Satoshi",
//             outputs: [
//               {
//                 to: data.addressCounter.nongmin[0],
//                 amount: String(
//                   myglobal.playerData.bottom * myglobal.playerData.rate
//                 ),
//               },
//               {
//                 to: data.addressCounter.nongmin[1],
//                 amount: String(
//                   myglobal.playerData.bottom * myglobal.playerData.rate
//                 ),
//               },
//             ],
//           };
//
//           try {
//             const res = await myglobal.chainbow.sendTransaction(transaction);
//             if (res) {
//               myglobal.socket.requestPayed(
//                 Object.assign({}, res, {
//                   success: true,
//                   account: myglobal.playerData.account,
//                 }),
//                 () => {}
//               );
//             }
//           } catch (e) {
//             error(e);
//             myglobal.socket.requestPayed(
//               Object.assign(
//                 {},
//                 {
//                   success: false,
//                   account: myglobal.playerData.account,
//                 }
//               ),
//               () => {}
//             );
//           }
//           (this.node.parent.getComponent("gameScene") as GameScene).lose(
//             data,
//             myglobal.playerData.bottom * myglobal.playerData.rate
//           );
//         } else {
//           (this.node.parent.getComponent("gameScene") as GameScene).win(
//             data,
//             myglobal.playerData.bottom * myglobal.playerData.rate
//           );
//         }
//       }
//     });
//
//     //内部事件:显示底牌事件,data是三张底牌数据
//     this.node.on("show_bottom_card_event", (data) => {
//       log("----show_bottom_card_event", data);
//
//       this.bottom_card_data = data;
//
//       for (var i = 0; i < data.length; i++) {
//         var card = this.bottom_card[i];
//         var show_data = data[i];
//         var call_data = {
//           obj: card,
//           data: show_data,
//         };
//         log("bottom show_data:" + JSON.stringify(show_data));
//         var run = cc.callFunc(
//           (target, activedata) => {
//             var show_card = activedata.obj;
//             var show_data = activedata.data;
//             //log("cc.callFunc:"+JSON.stringify(show_data))
//             show_card.getComponent("card").showCards(show_data);
//           },
//           this,
//           call_data
//         );
//
//         card.runAction(
//           cc.sequence(
//             cc.rotateBy(0, 180),
//             cc.rotateBy(0.2, -90),
//             run,
//             cc.rotateBy(0.2, -90),
//             cc.scaleBy(1, 1.2)
//           )
//         );
//       }
//
//       //this.node.parent.emit("change_room_state_event",RoomState.ROOM_PLAYING)
//       //如果自己地主，给加上三张底牌
//       if (myglobal.playerData.account == myglobal.playerData.masterAccount) {
//         this.scheduleOnce(this.pushThreeCard.bind(this), 0.2);
//       } else {
//         const gameScene = this.node.parent.getComponent(
//           "gameScene"
//         ) as GameScene;
//         gameScene.addThreeCardsToOtherUser(myglobal.playerData.masterAccount);
//       }
//     });
//
//     //注册监听一个选择牌消息
//     this.node.on("choose_card_event", (event) => {
//       log("choose_card_event:" + JSON.stringify(event));
//       var detail = event;
//       this.choose_card_data.push(detail);
//     });
//
//     this.node.on("unchoose_card_event", (event) => {
//       log("unchoose_card_event:" + event);
//       var detail = event;
//       for (var i = 0; i < this.choose_card_data.length; i++) {
//         if (this.choose_card_data[i].cardid == detail) {
//           this.choose_card_data.splice(i, 1);
//         }
//       }
//     });
//   }
//
//   countDownPlayClock() {
//     this.playingTimerLabel.string = String(
//       Number(this.playingTimerLabel.string) - 1
//     );
//     if (Number(this.playingTimerLabel.string) <= 0) {
//       this.buchu();
//     }
//   }
//
//   countDownRobClock() {
//     this.robTimerLabel.string = String(Number(this.robTimerLabel.string) - 1);
//     if (Number(this.robTimerLabel.string) <= 0) {
//       this.buqiang();
//     }
//   }
//
//   //处理发牌的效果
//   _runactive_pushcard() {
//     if (this.cur_index_card < 0) {
//       log("pushcard end");
//       this.push_card_tmp = [];
//       this.fapai_end = true;
//       if (this.robPlayerAccount == myglobal.playerData.account) {
//         clearInterval(this.countDownRob);
//         this.robUI.active = true;
//         this.countDownRob = setInterval(
//           this.countDownRobClock.bind(this),
//           1000
//         );
//       }
//
//       if (isopen_sound) {
//         cc.audioEngine.stop(this.fapai_audioID);
//       }
//
//       //通知gamescene节点，倒计时
//       var sendevent = this.robPlayerAccount;
//       this.node.parent.emit("canrob_event", sendevent);
//       return;
//     }
//
//     const move_node =
//       this.cards_nods[this.cards_nods.length - this.cur_index_card - 1];
//     move_node.active = true;
//     this.push_card_tmp.push(move_node);
//     this.fapai_audioID = cc.audioEngine.play(this.fapai, false, 0.5);
//
//     log("runactive cur_index_card: ", this.cur_index_card);
//     log("runactive push_card_tmp: ", this.push_card_tmp);
//
//     for (var i = 0; i < this.push_card_tmp.length - 1; i++) {
//       const move_node = this.push_card_tmp[i];
//       const newx = move_node.x - this.card_width * 0.4;
//       const action = cc.moveTo(0.1, cc.v2(newx, -250));
//       move_node.runAction(action);
//     }
//
//     this.cur_index_card--;
//     this.scheduleOnce(this._runactive_pushcard.bind(this), 0.3);
//   }
//
//   //对牌排序
//   sortCard() {
//     this.cards_nods.sort((x, y) => {
//       var a = (x.getComponent("card") as Card).card_data;
//       var b = (y.getComponent("card") as Card).card_data;
//
//       if (a.hasOwnProperty("value") && b.hasOwnProperty("value")) {
//         return b.value - a.value;
//       }
//       if (a.hasOwnProperty("king") && !b.hasOwnProperty("king")) {
//         return -1;
//       }
//       if (!a.hasOwnProperty("king") && b.hasOwnProperty("king")) {
//         return 1;
//       }
//       if (a.hasOwnProperty("king") && b.hasOwnProperty("king")) {
//         return b.king - a.king;
//       }
//     });
//     //var x = this.cards_nods[0].x;
//     //这里使用固定坐标，因为取this.cards_nods[0].xk可能排序为完成，导致x错误
//     //所以做1000毫秒的延时
//     //var x = -417.6
//     const x =
//       this.cards_nods[0].x > 0 ? -this.cards_nods[0].x : this.cards_nods[0].x;
//     log("sort x:" + x);
//     for (let i = 0; i < this.cards_nods.length; i++) {
//       const card = this.cards_nods[i];
//       card.zIndex = i; //设置牌的叠加次序,zindex越大显示在上面
//       card.x = x + card.width * 0.4 * i;
//     }
//   }
//
//   pushCard(data) {
//     if (data) {
//       data.sort((a, b) => {
//         if (a.hasOwnProperty("value") && b.hasOwnProperty("value")) {
//           return b.value - a.value;
//         }
//         if (a.hasOwnProperty("king") && !b.hasOwnProperty("king")) {
//           return -1;
//         }
//         if (!a.hasOwnProperty("king") && b.hasOwnProperty("king")) {
//           return 1;
//         }
//         if (a.hasOwnProperty("king") && b.hasOwnProperty("king")) {
//           return b.king - a.king;
//         }
//       });
//     }
//     //创建card预制体
//     this.cards_nods = [];
//     for (var i = 0; i < 17; i++) {
//       var card = cc.instantiate(this.card_prefab);
//       card.scale = 0.8;
//       card.parent = this.node.parent;
//       //card.x = card.width * 0.4 * (17 - 1) * (-0.5) + card.width * 0.4 * 0;
//       card.x = card.width * 0.4 * -0.5 * -16 + card.width * 0.4 * 0;
//       //这里实现为，每发一张牌，放在已经发的牌最后，然后整体移动
//       card.y = -250;
//       card.active = false;
//
//       (card.getComponent("card") as Card).showCards(
//         data[i],
//         myglobal.playerData.account
//       );
//       //存储牌的信息,用于后面发牌效果
//       this.cards_nods.push(card);
//       this.card_width = card.width;
//     }
//
//     for (let index = 0; index < this.bottom_card.length; index++) {
//       const element = this.bottom_card[index];
//       element.destroy();
//     }
//
//     //创建3张底牌
//     this.bottom_card = [];
//     for (let i = 0; i < 3; i++) {
//       const di_card = cc.instantiate(this.card_prefab);
//       di_card.scale = 0.4;
//       di_card.position = this.bottom_card_pos_node.position;
//       //三张牌，中间坐标就是bottom_card_pos_node节点坐标，
//       //0,和2两张牌左右移动windth*0.4
//       if (i == 0) {
//         di_card.x = di_card.x - di_card.width * 0.4;
//       } else if (i == 2) {
//         di_card.x = di_card.x + di_card.width * 0.4;
//       }
//
//       //di_card.x = di_card.width-i*di_card.width-20
//       //di_card.y=60
//       di_card.parent = this.node.parent;
//       //存储在容器里
//       this.bottom_card.push(di_card);
//     }
//   }
//
//   //给玩家发送三张底牌后，过1s,把牌设置到y=-250位置效果
//   schedulePushThreeCard() {
//     for (var i = 0; i < this.cards_nods.length; i++) {
//       var card = this.cards_nods[i];
//       if (card.y == -230) {
//         card.y = -250;
//       }
//     }
//   }
//   //给地主发三张排，并显示在原有牌的后面
//   pushThreeCard() {
//     //每张牌的其实位置
//     var last_card_x = this.cards_nods[this.cards_nods.length - 1].x;
//     for (var i = 0; i < this.bottom_card_data.length; i++) {
//       var card = cc.instantiate(this.card_prefab);
//       card.scale = 0.8;
//       card.parent = this.node.parent;
//
//       card.x = last_card_x + (i + 1) * this.card_width * 0.4;
//       card.y = -230; //先把底盘放在-230，在设置个定时器下移到-250的位置
//
//       //log("pushThreeCard x:"+card.x)
//       card
//         .getComponent("card")
//         .showCards(this.bottom_card_data[i], myglobal.playerData.account);
//       card.active = true;
//       this.cards_nods.push(card);
//     }
//
//     this.sortCard();
//     //设置一个定时器，在2s后，修改y坐标为-250
//     this.scheduleOnce(this.schedulePushThreeCard, 2);
//   }
//
//   destoryCards(account: string, cards) {
//     if (cards.length == 0) {
//       return;
//     }
//
//     /*出牌逻辑
//           1. 将选中的牌 从父节点中移除
//           2. 从this.cards_nods 数组中，删除 选中的牌
//           3. 将 “选中的牌” 添加到出牌区域
//               3.1 清空出牌区域
//               3.2 添加子节点
//               3.3 设置scale
//               3.4 设置position
//           4.  重新设置手中的牌的位置  this.updateCards();
//         */
//     //1/2步骤删除自己手上的card节点
//     var destroy_card = [];
//     for (var i = 0; i < cards.length; i++) {
//       for (var j = 0; j < this.cards_nods.length; j++) {
//         var card_id = this.cards_nods[j].getComponent("card").card_id;
//         if (card_id == cards[i].cardid) {
//           log("destroy card id:" + card_id);
//           //this.cards_nods[j].destroy()
//           this.cards_nods[j].removeFromParent(true);
//           destroy_card.push(this.cards_nods[j]);
//           this.cards_nods.splice(j, 1);
//         }
//       }
//     }
//
//     this.appendCardsToOutZone(account, destroy_card);
//     this.updateCards();
//   }
//
//   destoryAllCards() {
//     for (var i = 0; i < this.cards_nods.length; i++) {
//       if (this.cards_nods[i]) {
//         this.cards_nods[i].destroy();
//         this.cards_nods[i].removeFromParent(true);
//       }
//     }
//     this.cards_nods = [];
//
//     this.updateCards();
//   }
//
//   //清除显示出牌节点全部子节点(就是把出牌的清空)
//   clearOutZone(account) {
//     var gameScene_script = this.node.parent.getComponent(
//       "gameScene"
//     ) as GameScene;
//     var outCard_node = gameScene_script.getUserOutCardPosByAccount(account);
//     var children = outCard_node.children;
//     for (var i = 0; i < children.length; i++) {
//       var card = children[i];
//       card.destroy();
//     }
//     outCard_node.removeAllChildren(true);
//   }
//
//   //对出的牌做排序
//   pushCardSort(cards) {
//     if (cards.length == 1) {
//       return;
//     }
//     cards.sort((x, y) => {
//       var a = x.getComponent("card").card_data;
//       var b = y.getComponent("card").card_data;
//
//       if (a.hasOwnProperty("value") && b.hasOwnProperty("value")) {
//         return b.value - a.value;
//       }
//       if (a.hasOwnProperty("king") && !b.hasOwnProperty("king")) {
//         return -1;
//       }
//       if (!a.hasOwnProperty("king") && b.hasOwnProperty("king")) {
//         return 1;
//       }
//       if (a.hasOwnProperty("king") && b.hasOwnProperty("king")) {
//         return b.king - a.king;
//       }
//     });
//   }
//
//   appendOtherCardsToOutZone(outCard_node, cards, yoffset) {
//     outCard_node.removeAllChildren(true);
//
//     //log("appendOtherCardsToOutZone length"+cards.length)
//     //添加新的子节点
//     for (var i = 0; i < cards.length; i++) {
//       var card = cards[i];
//       outCard_node.addChild(card, 100 + i); //第二个参数是zorder,保证牌不能被遮住
//     }
//
//     //对出牌进行排序
//     //设置出牌节点的坐标
//     var zPoint = cards.length / 2;
//     //log("appendOtherCardsToOutZone zeroPoint:"+zPoint)
//     for (var i = 0; i < cards.length; i++) {
//       var cardNode = outCard_node.getChildren()[i];
//       var x = (i - zPoint) * 30;
//       var y = cardNode.y + yoffset; //因为每个节点需要的Y不一样，做参数传入
//       //log("-----cardNode: x:"+x+" y:"+y)
//       cardNode.setScale(0.5, 0.5);
//       cardNode.setPosition(x, y);
//     }
//   }
//   //将 “选中的牌” 添加到出牌区域
//   //destroy_card是玩家本次出的牌
//   appendCardsToOutZone(account, destroy_card) {
//     if (destroy_card.length == 0) {
//       return;
//     }
//     //先给本次出的牌做一个排序
//     this.pushCardSort(destroy_card);
//     //log("appendCardsToOutZone")
//     var gameScene_script = this.node.parent.getComponent("gameScene");
//     //获取出牌区域节点
//     var outCard_node = gameScene_script.getUserOutCardPosByAccount(account);
//     this.appendOtherCardsToOutZone(outCard_node, destroy_card, 360);
//     //slog("OutZone:"+outCard_node.name)
//   }
//
//   //重新排序手上的牌,并移动
//   updateCards() {
//     const zeroPoint = this.cards_nods.length / 2;
//     for (let i = 0; i < this.cards_nods.length; i++) {
//       const cardNode = this.cards_nods[i];
//       const x = (i - zeroPoint) * (this.card_width * 0.4);
//       cardNode.setPosition(x, -250);
//     }
//   }
//
//   playPushCardSound(card_name) {
//     log("playPushCardSound:" + card_name);
//
//     if (card_name == "") {
//       return;
//     }
//
//     switch (card_name) {
//       case CardsValue.one.name:
//         break;
//       case CardsValue.double.name:
//         if (isopen_sound) {
//           cc.audioEngine.play(this.duizi, false, 0.5);
//         }
//         break;
//     }
//   }
//
//   onButtonClick(event, customData) {
//     switch (customData) {
//       case "btn_qiandz":
//         this.qiang();
//         break;
//       case "btn_buqiandz":
//         log("btn_buqiandz");
//         this.buqiang();
//         break;
//       case "nopushcard": //不出牌
//         this.buchu();
//         break;
//       case "pushcard": //出牌
//         this.chupai();
//         break;
//       case "tipcard":
//         break;
//       case "trusteeship":
//         myglobal.playerData.trusteeship = !myglobal.playerData.trusteeship;
//         if (myglobal.playerData.trusteeship) {
//           if (this.playingUI_node.active) {
//             myglobal.socket.request_buchu_card([], null);
//           }
//           this.trusteeshipLabel.string = "非托管";
//         } else {
//           this.trusteeshipLabel.string = "托管";
//         }
//         break;
//       default:
//         break;
//     }
//   }
//
//   chupai() {
//     //先获取本次出牌数据
//     if (this.choose_card_data.length == 0) {
//       this.tipsLabel.string = "请选择牌!";
//       setTimeout(() => {
//         this.tipsLabel.string = "";
//       }, 2000);
//     }
//     myglobal.socket.requestChuPai(this.choose_card_data, (err, data) => {
//       if (err) {
//         log("request_chu_card:" + err);
//         log("request_chu_card" + JSON.stringify(data));
//         if (this.tipsLabel.string == "") {
//           this.tipsLabel.string = data.msg;
//           setTimeout(() => {
//             this.tipsLabel.string = "";
//           }, 2000);
//         }
//
//         //出牌失败，把选择的牌归位
//         for (var i = 0; i < this.cards_nods.length; i++) {
//           var card = this.cards_nods[i];
//           card.emit("reset_card_flag");
//         }
//         this.choose_card_data = [];
//       } else {
//         //出牌成功
//         log("resp_chu_card data:" + JSON.stringify(data));
//         this.playingUI_node.active = false;
//         //播放出牌的声音
//         //resp_chu_card data:{"account":"2519901","msg":"sucess","cardvalue":{"name":"Double","value":1}}
//         //{"type":"other_chucard_notify","result":0,"data":{"account":"2519901","cards":[{"cardid":24,"card_data":{"index":24,"value":6,"shape":1}},{"cardid":26,"card_data":{"index":26,"value":6,"shape":3}}]},"callBackIndex":0}
//         this.playPushCardSound(data.cardvalue.name);
//         this.destoryCards(data.account, this.choose_card_data);
//         this.choose_card_data = [];
//       }
//     });
//     clearInterval(this.countDownPlay);
//     this.playingTimerLabel.string = this.countDownPlaySecond;
//   }
//
//   buchu() {
//     myglobal.socket.request_buchu_card([], null);
//     this.playingUI_node.active = false;
//     clearInterval(this.countDownPlay);
//     this.playingTimerLabel.string = this.countDownPlaySecond;
//   }
//
//   qiang() {
//     myglobal.socket.requestRobState(qian_state.qian);
//     this.robUI.active = false;
//     if (isopen_sound) {
//       cc.audioEngine.play(this.womanJiaoDiZhu, false, 0);
//     }
//     clearInterval(this.countDownRob);
//     this.robTimerLabel.string = this.countDownRobSecond;
//     this.fapai_end = false;
//   }
//
//   buqiang() {
//     myglobal.socket.requestRobState(qian_state.buqiang);
//     this.robUI.active = false;
//     if (isopen_sound) {
//       cc.audioEngine.play(this.womanBuJiao, false, 0);
//     }
//     clearInterval(this.countDownRob);
//     this.robTimerLabel.string = this.countDownRobSecond;
//     this.fapai_end = false;
//   }
// }
