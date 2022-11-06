// @ts-ignore

import { _decorator } from 'cc';
export const serverUrl = document.location.hostname === 'localhost'
  ? "http://localhost"
  : "https://game.mydapp.io";
export const isopen_sound = true;
export const qian_state = {
  buqiang: 0,
  qian: 1,
};
export const RoomState = {
  ROOM_INVALID: -1,
  ROOM_WAITREADY: 1, //等待游戏
  ROOM_GAMESTART: 2, //开始游戏
  ROOM_PUSHCARD: 3, //发牌
  ROOM_ROBSTATE: 4, //抢地主
  ROOM_SHOWBOTTOMCARD: 5, //显示底牌
  ROOM_PLAYING: 6, //出牌阶段
};
export const createRoomConfig = {
  rate_1: {
    needCostGold: 10,
    bottom: 1,
    rate: 1,
  },
  rate_2: {
    needCostGold: 100,
    bottom: 10,
    rate: 2,
  },
  rate_3: {
    needCostGold: 200,
    bottom: 20,
    rate: 3,
  },
  rate_4: {
    needCostGold: 500,
    bottom: 50,
    rate: 4,
  },
};
export const CardsValue = {
  one: {
    name: "One",
    value: 1,
  },
  double: {
    name: "Double",
    value: 1,
  },
  three: {
    name: "Three",
    value: 1,
  },
  boom: {
    name: "Boom",
    value: 2,
  },
  threeWithOne: {
    name: "ThreeWithOne",
    value: 1,
  },
  threeWithTwo: {
    name: "ThreeWithTwo",
    value: 1,
  },
  plane: {
    name: "Plane",
    value: 1,
  },
  planeWithOne: {
    name: "PlaneWithOne",
    value: 1,
  },
  planeWithTwo: {
    name: "PlaneWithTwo",
    value: 1,
  },
  scroll: {
    name: "Scroll",
    value: 1,
  },
  doubleScroll: {
    name: "DoubleScroll",
    value: 1,
  },
  kingboom: {
    name: "kingboom",
    value: 3,
  },
};

/**
 * Note: The original script has been commented out, due to the large number of changes in the script, there may be missing in the conversion, you need to convert it manually
 */
// // @ts-ignore
// export const serverUrl = document.location.hostname === 'localhost'
//   ? "http://localhost"
//   : "https://game.mydapp.io";
// 
// export const isopen_sound = true;
// export const qian_state = {
//   buqiang: 0,
//   qian: 1,
// };
// export const RoomState = {
//   ROOM_INVALID: -1,
//   ROOM_WAITREADY: 1, //等待游戏
//   ROOM_GAMESTART: 2, //开始游戏
//   ROOM_PUSHCARD: 3, //发牌
//   ROOM_ROBSTATE: 4, //抢地主
//   ROOM_SHOWBOTTOMCARD: 5, //显示底牌
//   ROOM_PLAYING: 6, //出牌阶段
// };
// export const createRoomConfig = {
//   rate_1: {
//     needCostGold: 10,
//     bottom: 1,
//     rate: 1,
//   },
//   rate_2: {
//     needCostGold: 100,
//     bottom: 10,
//     rate: 2,
//   },
//   rate_3: {
//     needCostGold: 200,
//     bottom: 20,
//     rate: 3,
//   },
//   rate_4: {
//     needCostGold: 500,
//     bottom: 50,
//     rate: 4,
//   },
// };
// export const CardsValue = {
//   one: {
//     name: "One",
//     value: 1,
//   },
//   double: {
//     name: "Double",
//     value: 1,
//   },
//   three: {
//     name: "Three",
//     value: 1,
//   },
//   boom: {
//     name: "Boom",
//     value: 2,
//   },
//   threeWithOne: {
//     name: "ThreeWithOne",
//     value: 1,
//   },
//   threeWithTwo: {
//     name: "ThreeWithTwo",
//     value: 1,
//   },
//   plane: {
//     name: "Plane",
//     value: 1,
//   },
//   planeWithOne: {
//     name: "PlaneWithOne",
//     value: 1,
//   },
//   planeWithTwo: {
//     name: "PlaneWithTwo",
//     value: 1,
//   },
//   scroll: {
//     name: "Scroll",
//     value: 1,
//   },
//   doubleScroll: {
//     name: "DoubleScroll",
//     value: 1,
//   },
//   kingboom: {
//     name: "kingboom",
//     value: 3,
//   },
// };
