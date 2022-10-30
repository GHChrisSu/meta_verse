import Player from './player';
import Room from './room';
import { CREATE_ROOM_CONFIG } from './defines';
import config from '../config';
const console = config.console;

export interface PlayerInfo {
  uniqueID: string;
  nickName: string;
  account: string;
  address: string;
}

export default class GameCtr {
  playerList: Player[];
  roomInfoList: Room[];

  constructor() {
    this.playerList = new Array<Player>();
    this.roomInfoList = new Array<Room>();
  }

  createPlayer(playerInfo: PlayerInfo, socket, callindex) {
    const player = this.playerList.find(player => player.account === playerInfo.account);
    if (!player) {
      const player = new Player(playerInfo, socket, callindex, this);
      this.playerList.push(player);
    } else {
      player.listenOnEvent(socket);
      player.loggedIn(callindex);
    }
    const players = this.playerList.map(player => player.account);
    console.log('player list: ', players);
  }

  restore_player(account, socket) {
    const player = this.playerList.find(player => player.account === account);
    player.listenOnEvent(socket);
  }

  createRoom(data, ownPlayer: Player, callback) {
    const room = new Room(data, ownPlayer);
    this.roomInfoList.push(room);

    room.joinPlayer(ownPlayer);
    if (callback) {
      callback(0, {
        room: room,
        data: {
          roomid: room.roomId,
          bottom: room.bottom,
          rate: room.rate,
        },
      });
    }
  }

  //notify{"type":"joinroom_resp","result":null,"data":{"data":{"roomid":"714950","gold":100}},"callBackIndex":3}
  joinWaitingRoom(data, player, callback) {
    const roomInfo = this.roomInfoList.find(roomInfo => !roomInfo.isFull());
    this.join(roomInfo, data, player, callback);
  }

  //notify{"type":"joinroom_resp","result":null,"data":{"data":{"roomid":"714950","gold":100}},"callBackIndex":3}
  joinRoom(data, player, callback) {
    const roomInfo = this.roomInfoList.find(roomInfo => roomInfo.roomId === data.roomid);
    this.join(roomInfo, data, player, callback);
  }

  join(roomInfo, data, player, callback) {
    if (roomInfo) {
      if (roomInfo.isFull()) {
        callback('room if full of 3 persons: ' + data.roomid);
      } else {
        roomInfo.joinPlayer(player);
        const resp = {
          room: roomInfo,
          data: {
            roomid: roomInfo.roomId,
            bottom: roomInfo.bottom,
            rate: roomInfo.rate,
          },
        };
        callback(0, resp);
      }
    } else {
      callback('no such room: ' + data.roomid);
    }
  }

  outRoom(data, player, callback) {
    const roomInfo = this.roomInfoList.find(roomInfo => roomInfo.roomId === data.roomId);
    if (roomInfo) {
      roomInfo.outPlayer(player);
      if (roomInfo.playerList.length === 0) this.roomInfoList = this.roomInfoList.filter(roomInfoInList => roomInfoInList !== roomInfo);
      callback(0, {});
    } else {
      callback('no found room:' + data.roomid);
    }
  }

  removeFromPlayerList(player: Player) {
    this.playerList = this.playerList.filter(playerInList => player.account !== playerInList.account);
  }
}
