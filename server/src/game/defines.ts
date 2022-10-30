export const DEFAULT_GOLD_COUNT = 100;
export const ROOM_FULL_PLAYER_COUNT = 3;

export const ROOM_STATE = {
    ROOM_INVALID: -1,
    ROOM_WAITREADY: 1, //等待游戏
    ROOM_GAMESTART: 2, //开始游戏
    ROOM_PUSHCARD: 3, //发牌
    ROOM_ROBSTATE: 4, //抢地主
    ROOM_SHOWBOTTOMCARD: 5, //显示底牌
    ROOM_PLAYING: 6, //出牌阶段
    ROOM_GAME_OVER: 7, //一局结束阶段
  };

export const CREATE_ROOM_CONFIG = {
    1: {
        bottom: 10000,
        rate: 1
    },
    2: {
        bottom: 20000,
        rate: 1
    },
    3: {
        bottom: 40000,
        rate: 1
    },
    4: {
        bottom: 80000,
        rate: 1
    }
};

export const QIAN_STATE = {
    buqiang:0,
    qian:1,
}
