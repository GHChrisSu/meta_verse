//发牌管理器
import Card, { CARD_VALUE, CARD_SHAPE, KINGS, CardsValue } from './card';
import config from "../config";
const console = config.console;

export default class CardManager {
  card_list: Card[];
  constructor() {
    this.card_list = new Array<Card>();

    //创建牌
    this.creatleCard();
    //洗牌
    this.shuffleCard();
  }

  //发牌
  creatleCard() {
    //实例化52张牌
    for (const cv in CARD_VALUE) {
      for (const cs in CARD_SHAPE) {
        //实例化牌对象
        var card = new Card(CARD_VALUE[cv], CARD_SHAPE[cs], undefined);
        card.index = this.card_list.length;
        this.card_list.push(card);
      }
    }

    for (var i in KINGS) {
      var card = new Card(undefined, undefined, KINGS[i]);
      card.index = this.card_list.length;
      this.card_list.push(card);
    }
  }

  shuffleCard() {
    for (var i = this.card_list.length - 1; i >= 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      //随机交换
      const tmpCard = this.card_list[randomIndex];
      this.card_list[randomIndex] = this.card_list[i];
      this.card_list[i] = tmpCard;
    }
    return this.card_list;
  }

  //把牌分成三份和三张带翻的牌
  //每份牌17张
  splitThreeCards() {
    var threeCards = {};
    for (var i = 0; i < 17; i++) {
      for (var j = 0; j < 3; j++) {
        if (threeCards.hasOwnProperty(j)) {
          threeCards[j].push(this.card_list.pop());
        } else {
          threeCards[j] = [this.card_list.pop()];
        }
      }
    }

    return [threeCards[0], threeCards[1], threeCards[2], this.card_list];
  }

  //出一张牌
  isOneCard(cardList) {
    if (cardList.length === 1) {
      return true;
    }
    return false;
  }

  //是否对子
  isDoubleCard(cardList) {
    if (cardList.length != 2) {
      return false;
    }
    //cardList[0].value==undefined说明是大小王，值是存储在king字段
    if (cardList[0].card_data.value == undefined || cardList[0].card_data.value != cardList[1].card_data.value) {
      return false;
    }

    return true;
  }

  //三张不带
  isthree(cardList) {
    if (cardList.length != 3) {
      return false;
    }
    //不能是大小王
    if (cardList[0].card_data.value == undefined || cardList[1].card_data.value == undefined) {
      return false;
    }
    //判断三张牌是否相等
    if (cardList[0].card_data.value != cardList[1].card_data.value) {
      return false;
    }

    if (cardList[0].card_data.value != cardList[2].card_data.value) {
      return false;
    }

    if (cardList[1].card_data.value != cardList[2].card_data.value) {
      return false;
    }
    return true;
  }
  //三带一
  isThreeAndOne(cardList) {
    if (cardList.length != 4) {
      return false;
    }
    //被带的一张放在2头
    if (cardList[1].card_data.value == undefined || cardList[2].card_data.value == undefined) {
      return false;
    }
    if (cardList[0].card_data.value == cardList[1].card_data.value && cardList[1].card_data.value == cardList[2].card_data.value) {
      return true;
    } else if (cardList[1].card_data.value == cardList[2].card_data.value && cardList[2].card_data.value == cardList[3].card_data.value) {
      return true;
    }
    return false;
  }

  //三带二
  isThreeAndTwo(cardList) {
    if (cardList.length != 5) {
      return false;
    }

    if (cardList[0].card_data.value == cardList[1].card_data.value && cardList[1].card_data.value == cardList[2].card_data.value) {
      if (cardList[3].card_data.value == cardList[4].card_data.value) {
        return true;
      }
    } else if (cardList[2].card_data.value == cardList[3].card_data.value && cardList[3].card_data.value == cardList[4].card_data.value) {
      if (cardList[0].card_data.value == cardList[1].card_data.value) {
        return true;
      }
    }

    return false;
  }

  //四张炸弹
  isBoom(cardList) {
    if (cardList.length != 4) {
      return false;
    }

    var map = {};
    for (var i = 0; i < cardList.length; i++) {
      if (map.hasOwnProperty(cardList[i].card_data.value)) {
        map[cardList[i].card_data.value]++;
      } else {
        map[cardList[i].card_data.value] = 1;
      }
    }

    var keys = Object.keys(map);
    if (keys.length == 1) {
      return true;
    }

    return false;
  }

  //王炸
  isKingBoom(cardList) {
    if (cardList.length != 2) {
      return false;
    }

    if (cardList[0].card_data.king != undefined && cardList[1].card_data.king != undefined) {
      return true;
    }

    return false;
  }

  //飞机不带
  isPlan(cardList) {
    if (cardList.length != 6) {
      return false;
    }

    var map = {};
    for (var i = 0; i < cardList.length; i++) {
      if (map.hasOwnProperty(cardList[i].card_data.value)) {
        map[cardList[i].card_data.value]++;
      } else {
        map[cardList[i].card_data.value] = 1;
      }
    }

    var keys = Object.keys(map);
    console.log('IsPlan keys' + keys);
    if (keys.length == 2) {
      //判断相同牌是否为三张
      for (const key in map) {
        if (map[key] != 3) {
          return false;
        }
      }

      //判断是否为相邻的牌
      var p1 = Number(keys[0]);
      var p2 = Number(keys[1]);
      if (Math.abs(p1 - p2) != 1) {
        return false;
      }
      return true;
    }

    return false;
  }

  //飞机带2个单张
  isPlanWithSing(cardList) {
    if (cardList.length != 8) {
      return false;
    }

    var map = {};
    for (var i = 0; i < cardList.length; i++) {
      if (map.hasOwnProperty(cardList[i].card_data.value)) {
        map[cardList[i].card_data.value]++;
      } else {
        map[cardList[i].card_data.value] = 1;
      }
    }

    var keys = Object.keys(map);
    console.log('IsPlan keys' + keys);
    if (keys.length != 4) {
      return false;
    }
    //判断是否有2个三张牌
    var three_list = [];
    var sing_count = 0;
    for (const i in map) {
      if (map[i] == 3) {
        three_list.push(i);
      } else if (map[i] == 1) {
        sing_count++;
      }
    }

    if (three_list.length != 2 || sing_count != 2) {
      return false;
    }

    //判断是否为相邻的牌
    var p1 = Number(three_list[0]);
    var p2 = Number(three_list[1]);
    if (Math.abs(p1 - p2) != 1) {
      return false;
    }

    return true;
  }
  //飞机带2对
  isPlanWithDouble(cardList) {
    if (cardList.length != 10) {
      return false;
    }

    var map = {};
    for (var i = 0; i < cardList.length; i++) {
      if (map.hasOwnProperty(cardList[i].card_data.value)) {
        map[cardList[i].card_data.value]++;
      } else {
        map[cardList[i].card_data.value] = 1;
      }
    }

    var keys = Object.keys(map);
    if (keys.length != 4) {
      return false;
    }
    /*
        "3":3,
        "4":4,
        "j":2,
        "9":2,
        */
    var three_list = [];
    var double_count = 0;
    for (const i in map) {
      if (map[i] == 3) {
        three_list.push(i);
      } else if (map[i] == 2) {
        double_count++;
      }
    }

    if (three_list.length != 2 || double_count != 2) {
      return false;
    }

    //判断是否为相邻的牌
    var p1 = Number(three_list[0]);
    var p2 = Number(three_list[1]);
    if (Math.abs(p1 - p2) != 1) {
      return false;
    }

    return true;
  }

  //顺子
  isShunzi(cardList) {
    if (cardList.length < 5 || cardList.length > 12) {
      return false;
    }
    var tmp_cards = cardList;
    //不能有2或者大小王
    for (var i = 0; i < tmp_cards.length; i++) {
      if (tmp_cards[i].card_data.value == 13 || tmp_cards[i].card_data.value == 14 || tmp_cards[i].card_data.value == 15) {
        return false;
      }
    }

    //排序 从小到大
    //sort返回正值做交换
    tmp_cards.sort(function (x, y) {
      return Number(x.card_data.value) - Number(y.card_data.value);
    });
    //console.log("IsShunzi tmp_cards"+JSON.stringify(tmp_cards))
    for (var i = 0; i < tmp_cards.length; i++) {
      if (i + 1 == tmp_cards.length) {
        break;
      }
      var p1 = Number(tmp_cards[i].card_data.value);
      var p2 = Number(tmp_cards[i + 1].card_data.value);
      if (Math.abs(p1 - p2) != 1) {
        return false;
      }
    }

    return true;
  }

  //连队
  isLianDui(cardList) {
    if (cardList.length < 6 || cardList.length > 24) {
      return false;
    }

    //不能包括大小王,和2
    for (var i = 0; i < cardList.length; i++) {
      if (cardList[i].card_data.value == 14 || cardList[i].card_data.value == 15 || cardList[i].card_data.value == 13) {
        return false;
      }
    }

    var map = {};
    for (var i = 0; i < cardList.length; i++) {
      if (map.hasOwnProperty(cardList[i].card_data.value)) {
        map[cardList[i].card_data.value]++;
      } else {
        map[cardList[i].card_data.value] = 1;
      }
    }

    //相同牌只能是2张
    for (var key in map) {
      if (map[key] != 2) {
        return false;
      }
    }
    var keys = Object.keys(map);
    if (keys.length < 3) {
      return false;
    }
    //从小到大排序
    keys.sort(function (x, y) {
      return Number(x) - Number(y);
    });

    //对子之间相减绝对值只能是1
    for (var i = 0; i < keys.length; i++) {
      if (i + 1 == keys.length) {
        break;
      }
      var p1 = Number(keys[i]);
      var p2 = Number(keys[i + 1]);
      if (Math.abs(p1 - p2) != 1) {
        return false;
      }
    }

    return true;
  }

  //cardA是上次出的牌
  //cardB是当前出的牌
  //cardB大于cardA返回true
  compareOne(cardA, cardB) {
    console.log('compareOne');
    var valueA = 0;
    if (cardA[0].card_data.value == undefined) {
      valueA = cardA[0].card_data.king;
    } else {
      valueA = cardA[0].card_data.value;
    }

    var valueB = 0;
    if (cardB[0].card_data.value == undefined) {
      valueB = cardB[0].card_data.king;
    } else {
      valueB = cardB[0].card_data.value;
    }

    if (valueA >= valueB) {
      return false;
    }
    return true;
  }

  compareDouble(cardA, cardB) {
    console.log('compareDouble');
    var result = this.compareOne(cardA, cardB);
    return result;
  }

  compareThree(cardA, cardB) {
    console.log('compareThree');
    var result = this.compareOne(cardA, cardB);
    return result;
  }

  compareBoom(cardA, cardB) {
    console.log('compareBoom');
    var result = false;
    if (cardA.length == 4 && cardB.length == 4) {
      result = this.compareOne(cardA, cardB);
    }

    return result;
  }

  compareBoomKing(cardA, cardB) {
    if (cardB.length != 2) {
      return false;
    }
    return true;
  }
  //三带一大小比较
  comparePlanWithSing(cardA, cardB) {
    //将三带存储到2个列表
    var lista = [];
    var listb = [];
    var map = {};
    for (var i = 0; i < cardA.length; i++) {
      if (map.hasOwnProperty(cardA.card_data.value)) {
        lista.push(cardA);
      } else {
        map[cardA.card_data.value] = 1;
      }
    }

    for (var i = 0; i < cardB.length; i++) {
      if (map.hasOwnProperty(cardB.card_data.value)) {
        listb.push(cardB);
      } else {
        map[cardB.card_data.value] = 1;
      }
    }

    var result = this.compareOne(cardA, cardB);
    return result;
  }

  comparePlanWithTow(cardA, cardB) {
    let mapA = {};
    let mapB = {};

    for (var i = 0; i < cardA.length; i++) {
      if (mapA.hasOwnProperty(cardA[i].card_data.value)) {
        mapA[cardA[i].card_data.value].push(cardA[i]);
      } else {
        mapA[cardA[i].card_data.value] = [cardA[i]];
      }
    }
    for (var i = 0; i < cardB.length; i++) {
      if (mapB.hasOwnProperty(cardB[i].card_data.value)) {
        mapB[cardB[i].card_data.value].push(cardB[i]);
      } else {
        mapB[cardB[i].card_data.value] = [cardB[i]];
      }
    }

    var listA = [];
    for (const i in mapA) {
      if (mapA[i].length === 3) {
        listA = mapA[i];
      }
    }

    var listB = [];
    for (const i in mapB) {
      if (mapB[i].length === 3) {
        listB = mapB[i];
      }
    }

    var result = this.compareOne(listA, listB);
    return result;
  }

  comparePlan(cardA, cardB) {
    var mapA = {};
    for (var i = 0; i < cardA.length; i++) {
      if (mapA.hasOwnProperty(cardA[i].card_data.value)) {
        mapA[cardA[i].card_data.value].push(cardA[i]);
      } else {
        mapA[cardA[i].card_data.value] = [cardA[i]];
      }
    }

    var listA = [];
    var maxNum = 16;
    //找到飞机里最小的一张牌
    for (const i in mapA) {
      if (Number(i) < maxNum) {
        maxNum = Number(i);
        listA = mapA[i];
      }
    }

    //处理cardB
    var mapB = {};
    for (var i = 0; i < cardB.length; i++) {
      if (mapB.hasOwnProperty(cardB[i].card_data.value)) {
        mapB[cardB[i].card_data.value].push(cardB[i]);
      } else {
        mapB[cardB[i].card_data.value] = [cardB[i]];
      }
    }

    maxNum = 16;
    var listB = [];
    for (const i in mapB) {
      if (Number(i) < maxNum) {
        maxNum = Number(i);
        listB = mapB[i];
      }
    }

    var result = this.compareThree(listA, listB);
    return result;
  }

  //飞机带2张单排
  comparePlaneWithOne(cardA, cardB) {
    var result = false;
    var mapA = {};
    var listA = [];
    for (var i = 0; i < cardA.length; i++) {
      if (mapA.hasOwnProperty(cardA[i].card_data.value)) {
        listA.push(cardA[i]);
      } else {
        mapA[cardA[i].card_data.value] = [cardA[i]];
      }
    }

    var mapB = {};
    var listB = [];
    for (var i = 0; i < cardB.length; i++) {
      if (mapB.hasOwnProperty(cardB[i].card_data.value)) {
        listB.push(cardB[i]);
      } else {
        mapB[cardB[i].card_data.value] = [cardB[i]];
      }
    }

    result = this.comparePlan(listA, listB);
    return result;
  }

  //飞机带2对
  comparePlaneWithDouble(cardA, cardB) {
    var mapA = {};
    for (var i = 0; i < cardA.length; i++) {
      if (mapA.hasOwnProperty(cardA[i].card_data.value)) {
        mapA[cardA[i].card_data.value].push(cardA[i]);
      } else {
        mapA[cardA[i].card_data.value] = [cardA[i]];
      }
    }
    var mapB = {};
    for (var i = 0; i < cardB.length; i++) {
      if (mapB.hasOwnProperty(cardB[i].card_data.value)) {
        mapB[cardB[i].card_data.value].push(cardB[i]);
      } else {
        mapB[cardB[i].card_data.value] = [cardB[i]];
      }
    }

    var listA = [];
    for (const i in mapA) {
      if (mapA[i].length === 3) {
        for (var j = 0; j < mapA[i].length; j++) {
          listA.push(mapA[i][j]);
        }
      }
    }
    console.log('list a = ' + JSON.stringify(listA));

    var listB = [];
    for (const i in mapB) {
      if (mapB[i].length === 3) {
        for (var j = 0; j < mapB[i].length; j++) {
          listB.push(mapB[i][j]);
        }
      }
    }

    var result = this.comparePlan(listA, listB);
    return result;
  }

  compareScroll(cardA, cardB) {
    console.log('compareScroll');
    if (cardA.length != cardB.length) {
      return false;
    }

    var minNumA = 100;
    for (var i = 0; i < cardA.length; i++) {
      if (cardA[i].card_data.value < minNumA) {
        minNumA = cardA[i].card_data.value;
      }
    }

    var minNumB = 100;
    for (let i = 0; i < cardB.length; i++) {
      if (cardB[i].card_data.value < minNumB) {
        minNumB = cardB[i].card_data.value;
      }
    }

    console.log('min a = ' + minNumA);
    console.log('min b = ' + minNumB);
    if (minNumA <= minNumB) {
      return true;
    }

    return false;
  }

  compareDoubleScroll(cardA, cardB) {
    var mapA = {};
    var listA = [];
    for (var i = 0; i < cardA.length; i++) {
      if (mapA.hasOwnProperty(cardA[i].card_data.value)) {
      } else {
        mapA[cardA[i].card_data.value] = true;
        listA.push(cardA[i]);
      }
    }

    var mapB = {};
    var listB = [];
    for (var i = 0; i < cardB.length; i++) {
      if (mapB.hasOwnProperty(cardB[i].card_data.value)) {
      } else {
        mapB[cardB[i].card_data.value] = true;
        listB.push(cardB[i]);
      }
    }

    console.log('list a = ' + JSON.stringify(listA));
    console.log('list b = ' + JSON.stringify(listB));

    return this.compareScroll(listA, listB);
  }
  //cardA上次出的牌
  //cardB本次出的牌
  //current_card_value当前牌型
  compare(cardA, cardB, current_card_value) {
    var result = false;
    switch (current_card_value.name) {
      case CardsValue.one.name:
        result = this.compareOne(cardA, cardB);
        break;
      case CardsValue.double.name:
        result = this.compareDouble(cardA, cardB);
        break;
      case CardsValue.three.name:
        result = this.compareThree(cardA, cardB);
        break;
      case CardsValue.threeWithOne.name:
        result = this.compareThree(cardA, cardB);
        break;
      case CardsValue.threeWithTwo.name:
        result = this.compareThree(cardA, cardB);
        break;
      case CardsValue.boom.name:
        result = this.compareBoom(cardA, cardB);
        break;
      case CardsValue.kingboom.name:
        result = this.compareBoomKing(cardA, cardB);
        break;
      case CardsValue.planeWithOne.name:
        result = this.comparePlanWithSing(cardA, cardB);
        break;
      case CardsValue.planeWithTwo.name:
        result = this.comparePlanWithTow(cardA, cardB);
        break;
      case CardsValue.plane.name:
        result = this.comparePlan(cardA, cardB);
        break;
      case CardsValue.planeWithOne.name:
        result = this.comparePlaneWithOne(cardA, cardB);
        break;
      case CardsValue.planeWithTwo.name:
        result = this.comparePlaneWithDouble(cardA, cardB);
        break;
      case CardsValue.scroll.name:
        result = this.compareScroll(cardA, cardB);
        break;
      case CardsValue.doubleScroll.name:
        result = this.compareDoubleScroll(cardA, cardB);
        break;
      default:
        console.log('no found card value!');
        result = false;
        break;
    }

    return result;
  }

  compareWithCard(last_cards, current_cards) {
    console.log('last_cards' + JSON.stringify(last_cards));
    console.log('current_cards' + JSON.stringify(current_cards));
    const card_last_value = this.isCanPushs(last_cards);
    const card_current_value = this.isCanPushs(current_cards);
    if (card_last_value.value < card_current_value.value) {
      console.log('compareWithCard less');
      return true;
    } else if (last_cards.value == current_cards.value) {
      //牌型必须相同
      if (card_last_value.name != card_current_value.name) {
        return false;
      }

      var result = this.compare(last_cards, current_cards, card_last_value);

      return result;
    } else {
      return false;
    }
  }

  isCanPushs(cardList: Array<Card>) {
    // 大牌在前判断
    if (this.isKingBoom(cardList)) {
      console.log('IsKingBoom sucess');
      return CardsValue.kingboom;
    }

    if (this.isBoom(cardList)) {
      console.log('IsBoom sucess');
      return CardsValue.boom;
    }

    if (this.isOneCard(cardList)) {
      console.log('isOneCard sucess');
      return CardsValue.one;
    }

    if (this.isDoubleCard(cardList)) {
      console.log('IsDoubleCard sucess');
      return CardsValue.double;
    }

    if (this.isthree(cardList)) {
      console.log('Isthree sucess');
      return CardsValue.three;
    }

    if (this.isThreeAndOne(cardList)) {
      console.log('IsThreeAndOne sucess');
      return CardsValue.threeWithOne;
    }

    if (this.isThreeAndTwo(cardList)) {
      console.log('IsThreeAndTwo sucess');
      return CardsValue.threeWithTwo;
    }

    if (this.isPlan(cardList)) {
      console.log('IsPlan sucess');
      return CardsValue.plane;
    }

    if (this.isPlanWithSing(cardList)) {
      console.log('IsPlanWithSing sucess');
      return CardsValue.planeWithOne;
    }

    if (this.isPlanWithDouble(cardList)) {
      console.log('IsPlanWithDouble sucess');
      return CardsValue.planeWithTwo;
    }

    if (this.isShunzi(cardList)) {
      console.log('IsShunzi sucess');
      return CardsValue.scroll;
    }

    if (this.isLianDui(cardList)) {
      console.log('IsLianDui sucess');
      return CardsValue.doubleScroll;
    }
    //return false
    return undefined;
  }
}
