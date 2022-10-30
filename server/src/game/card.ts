export const CARD_VALUE = {
  A: 12,
  '2': 13,
  '3': 1,
  '4': 2,
  '5': 3,
  '6': 4,
  '7': 5,
  '8': 6,
  '9': 7,
  '10': 8,
  J: 9,
  Q: 10,
  K: 11,
};

// 黑桃：spade
// 红桃：heart
// 梅花：club
// 方片：diamond
export const CARD_SHAPE = {
  S: 1,
  H: 2,
  C: 3,
  D: 4,
};

//大小玩分开写是因为只有一张，并且没有黑桃这些区分
export const KINGS = {
  kx: 14, //小王
  Kd: 15, //大王
};

//表示一张牌对象
export class CardClient {
  cardid: number;
  card_data: Card;
}

export default class Card {
  index: number;
  value: number;
  shape: number;
  king: number;

  constructor(value: number, shape: number, king: number) {
    this.index = -1;
    if (value) {
      this.value = value;
    }

    if (shape) {
      this.shape = shape;
    }

    if (king != undefined) {
      this.king = king;
    }
  }
}

//牌型之间大小数值的定义
export const CardsValue = {
  one: {
    name: 'One',
    value: 1,
  },
  double: {
    name: 'Double',
    value: 1,
  },
  three: {
    name: 'Three',
    value: 1,
  },
  boom: {
    //炸弹
    name: 'Boom',
    value: 2,
  },
  threeWithOne: {
    name: 'ThreeWithOne',
    value: 1,
  },
  threeWithTwo: {
    name: 'ThreeWithTwo',
    value: 1,
  },
  plane: {
    name: 'Plane',
    value: 1,
  },
  planeWithOne: {
    name: 'PlaneWithOne',
    value: 1,
  },
  planeWithTwo: {
    name: 'PlaneWithTwo',
    value: 1,
  },
  scroll: {
    //顺子
    name: 'Scroll',
    value: 1,
  },
  doubleScroll: {
    //连队
    name: 'DoubleScroll',
    value: 1,
  },
  kingboom: {
    //王炸
    name: 'kingboom',
    value: 3,
  },
};
