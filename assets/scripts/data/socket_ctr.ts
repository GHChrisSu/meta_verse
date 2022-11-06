import { _decorator } from 'cc';
import EventListener from "../util/event_lister";
import { serverUrl } from "../defines";
import { io } from "socket.io-client";
const { log } = cc;

export default class SocketCtr {
  respone_map: Map<any, any>;
  call_index: number;
  socket: any;
  event: EventListener;
  constructor() {
        //this.respone_map = new Map();
        //this.call_index = 0;
        //this.socket = null;
        //this.event = new EventListener();
  }
  _sendmsg(cmdtype, req, callindex) {
        //this.socket.emit("notify", {
        //cmd: cmdtype,
        //data: req,
        //callindex: callindex,
        //});
  }
  _request(cmdtype, req, callback) {
        //log("send cmd:" + cmdtype + "  " + JSON.stringify(req));
        //this.call_index++;
        //this.respone_map[this.call_index] = callback;
        //this._sendmsg(cmdtype, req, this.call_index);
  }
  initSocket() {
        //this.socket = io(serverUrl);
        //this.socket.on("connection", () => {
        //log("connect server suss!!");
        //this.event.fire("socket_connected");
        //});

        //this.socket.on("notify", (res) => {
        //log("on notify cmd:" + JSON.stringify(res));
        //if (this.respone_map.hasOwnProperty(res.callBackIndex)) {
        //const callback = this.respone_map[res.callBackIndex];
        //if (callback) callback(res.result, res.data);
        //} else {
        //this.event.fire(res.type, res.data);
        //}
        //});

        //this.socket.on("heartbeat", () => {
        //this.socket.emit("heartbeat");
        //});
  }
  restore_player(req, callback) {
        //this._request("restore_player", req, callback);
  }
  requestLogin(req, callback) {
        //this._request("login", req, callback);
  }
  requestTravelerLogin(req, callback) {
        //this._request("travelerLogin", req, callback);
  }
  requestCreatroom(req, callback) {
        //this._request("createroom_req", req, callback);
  }
  requestJoin(req, callback) {
        //this._request("joinroom_req", req, callback);
  }
  requestJoinWaiting(req, callback) {
        //this._request("join_waiting_room_req", req, callback);
  }
  request_enter_room(req, callback) {
        //this._request("enterroom_req", req, callback);
  }
  request_out_room(req, callback) {
        //this._request("outroom_req", req, callback);
  }
  request_buchu_card(req, callback) {
        //this._request("bu_chu_card_req", req, callback);
  }
  requestChuPai(req, callback) {
        //this._request("chu_card_req", req, callback);
  }
  requestPayed(req, callback) {
        //this._request("payed", req, callback);
  }
  
  onSocketConnected(callback) {
        //this.event.on("socket_connected", callback);
  }
  onPlayerJoinRoom(callback) {
        //this.event.on("player_joinroom_notify", callback);
  }
  onPlayerOutRoom(callback) {
        //this.event.on("player_outroom_notify", callback);
  }
  onPlayerReady(callback) {
        //this.event.on("player_ready_notify", callback);
  }
  onGameStart(callback) {
        //this.event.on("gameStart_notify", callback);
  }
  onRestorePlayer(callback) {
        //this.event.on("restore_player", callback);
  }
  onChangeHouseManage(callback) {
        //this.event.on("changehousemanage_notify", callback);
  }
  onOutRoom(callback) {
        //this.event.on("changehousemanage_notify", callback);
  }
  requestReady() {
        //this._sendmsg("player_ready_notify", {}, null);
  }
  requestStart(callback) {
        //this._request("player_start_notify", {}, callback);
  }
  requestRobState(state) {
        //this._sendmsg("player_rob_notify", state, null);
  }
  onPushCards(callback) {
        //this.event.on("pushcard_notify", callback);
  }
  onCanRobState(callback) {
        //this.event.on("canrob_notify", callback);
  }
  onRobState(callback) {
        //this.event.on("canrob_state_notify", callback);
  }
  onChangeMaster(callback) {
        //this.event.on("change_master_notify", callback);
  }
  onShowBottomCard(callback) {
        //this.event.on("change_showcard_notify", callback);
  }
  onCanChuCard(callback) {
        //this.event.on("can_chu_card_notify", callback);
  }
  onRoomChangeState(callback) {
        //this.event.on("room_state_notify", callback);
  }
  onOtherPlayerChuCard(callback) {
        //this.event.on("other_chucard_notify", callback);
  }
  onGameOver(callback) {
        //this.event.on("game_over", callback);
  }
  onPayed(callback) {
        //this.event.on("onPayed", callback);
  }
}


/**
 * Note: The original script has been commented out, due to the large number of changes in the script, there may be missing in the conversion, you need to convert it manually
 */
// import EventListener from "../util/event_lister";
// import { serverUrl } from "../defines";
// import { io } from "socket.io-client";
// const { log } = cc;
// 
// export default class SocketCtr {
//   respone_map: Map<any, any>;
//   call_index: number;
//   socket: any;
//   event: EventListener;
//   constructor() {
//     this.respone_map = new Map();
//     this.call_index = 0;
//     this.socket = null;
//     this.event = new EventListener();
//   }
// 
//   _sendmsg(cmdtype, req, callindex) {
//     this.socket.emit("notify", {
//       cmd: cmdtype,
//       data: req,
//       callindex: callindex,
//     });
//   }
// 
//   _request(cmdtype, req, callback) {
//     log("send cmd:" + cmdtype + "  " + JSON.stringify(req));
//     this.call_index++;
//     this.respone_map[this.call_index] = callback;
//     this._sendmsg(cmdtype, req, this.call_index);
//   }
// 
//   initSocket() {
//     this.socket = io(serverUrl);
//     this.socket.on("connection", () => {
//       log("connect server suss!!");
//       this.event.fire("socket_connected");
//     });
// 
//     this.socket.on("notify", (res) => {
//       log("on notify cmd:" + JSON.stringify(res));
//       if (this.respone_map.hasOwnProperty(res.callBackIndex)) {
//         const callback = this.respone_map[res.callBackIndex];
//         if (callback) callback(res.result, res.data);
//       } else {
//         this.event.fire(res.type, res.data);
//       }
//     });
// 
//     this.socket.on("heartbeat", () => {
//       this.socket.emit("heartbeat");
//     });
//   }
// 
//   restore_player(req, callback) {
//     this._request("restore_player", req, callback);
//   }
//   requestLogin(req, callback) {
//     this._request("login", req, callback);
//   }
//   requestTravelerLogin(req, callback) {
//     this._request("travelerLogin", req, callback);
//   }
//   requestCreatroom(req, callback) {
//     this._request("createroom_req", req, callback);
//   }
//   requestJoin(req, callback) {
//     this._request("joinroom_req", req, callback);
//   }
//   requestJoinWaiting(req, callback) {
//     this._request("join_waiting_room_req", req, callback);
//   }
//   request_enter_room(req, callback) {
//     this._request("enterroom_req", req, callback);
//   }
//   request_out_room(req, callback) {
//     this._request("outroom_req", req, callback);
//   }
//   request_buchu_card(req, callback) {
//     this._request("bu_chu_card_req", req, callback);
//   }
//   requestChuPai(req, callback) {
//     this._request("chu_card_req", req, callback);
//   }
//   requestPayed(req, callback) {
//     this._request("payed", req, callback);
//   }
//   
//   onSocketConnected(callback) {
//     this.event.on("socket_connected", callback);
//   }
//   onPlayerJoinRoom(callback) {
//     this.event.on("player_joinroom_notify", callback);
//   }
//   onPlayerOutRoom(callback) {
//     this.event.on("player_outroom_notify", callback);
//   }
//   onPlayerReady(callback) {
//     this.event.on("player_ready_notify", callback);
//   }
//   onGameStart(callback) {
//     this.event.on("gameStart_notify", callback);
//   }
//   onRestorePlayer(callback) {
//     this.event.on("restore_player", callback);
//   }
//   onChangeHouseManage(callback) {
//     this.event.on("changehousemanage_notify", callback);
//   }
//   onOutRoom(callback) {
//     this.event.on("changehousemanage_notify", callback);
//   }
//   requestReady() {
//     this._sendmsg("player_ready_notify", {}, null);
//   }
//   requestStart(callback) {
//     this._request("player_start_notify", {}, callback);
//   }
//   requestRobState(state) {
//     this._sendmsg("player_rob_notify", state, null);
//   }
//   onPushCards(callback) {
//     this.event.on("pushcard_notify", callback);
//   }
//   onCanRobState(callback) {
//     this.event.on("canrob_notify", callback);
//   }
//   onRobState(callback) {
//     this.event.on("canrob_state_notify", callback);
//   }
//   onChangeMaster(callback) {
//     this.event.on("change_master_notify", callback);
//   }
//   onShowBottomCard(callback) {
//     this.event.on("change_showcard_notify", callback);
//   }
//   onCanChuCard(callback) {
//     this.event.on("can_chu_card_notify", callback);
//   }
//   onRoomChangeState(callback) {
//     this.event.on("room_state_notify", callback);
//   }
//   onOtherPlayerChuCard(callback) {
//     this.event.on("other_chucard_notify", callback);
//   }
//   onGameOver(callback) {
//     this.event.on("game_over", callback);
//   }
//   onPayed(callback) {
//     this.event.on("onPayed", callback);
//   }
// }
