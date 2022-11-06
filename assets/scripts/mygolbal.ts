import { _decorator, unt } from 'cc';
import SocketCtr from "./data/socket_ctr";
import PlayerData from "./data/player";
import EventListener from "./util/event_lister";
import Alert from "./util/alert";
import ChainBow from "./util/ChainBow";
const { log } = cc;
declare global {
  interface Window {
    io: any;
    query: any;
  }
}
class MyGlobal {
  socket: SocketCtr;
  playerData: PlayerData;
  eventlister: EventListener;
  chainbow: ChainBow;
  constructor() {
    this.socket = new SocketCtr();
    this.playerData = new PlayerData();
    this.eventlister = new EventListener();
    this.chainbow = new ChainBow();
  }
  login(cb) {
    this.socket.requestLogin(
      {
        aunt: this.playerData.address,
        address: this.playerData.address,
        nickName: this.playerData.nickName,
        avatarUrl: this.playerData.avatarUrl,
        uniqueID: this.playerData.uniqueID,
      },
      (err, result) => {
        if (err != 0) {
          Alert.close();
          Alert.show("登陆失败", err);
          log("err:" + err);
          return;
        }
        log("login sucess" + JSON.stringify(result));
        this.playerData.gobal_count = result.goldcount;
        cb();
      }
    );
  }
}
export default new MyGlobal();

/**
 * Note: The original script has been commented out, due to the large number of changes in the script, there may be missing in the conversion, you need to convert it manually
 */
// import SocketCtr from "./data/socket_ctr";
// import PlayerData from "./data/player";
// import EventListener from "./util/event_lister";
// import Alert from "./util/alert";
// import ChainBow from "./util/ChainBow";
// const { log } = cc;
// 
// declare global {
//   interface Window {
//     io: any;
//     query: any;
//   }
// }
// 
// class MyGlobal {
//   socket: SocketCtr;
//   playerData: PlayerData;
//   eventlister: EventListener;
//   chainbow: ChainBow;
//   constructor() {
//     this.socket = new SocketCtr();
//     this.playerData = new PlayerData();
//     this.eventlister = new EventListener();
//     this.chainbow = new ChainBow();
//   }
// 
//   login(cb) {
//     this.socket.requestLogin(
//       {
//         account: this.playerData.address,
//         address: this.playerData.address,
//         nickName: this.playerData.nickName,
//         avatarUrl: this.playerData.avatarUrl,
//         uniqueID: this.playerData.uniqueID,
//       },
//       (err, result) => {
//         if (err != 0) {
//           Alert.close();
//           Alert.show("登陆失败", err);
//           log("err:" + err);
//           return;
//         }
// 
//         log("login sucess" + JSON.stringify(result));
//         this.playerData.gobal_count = result.goldcount;
//         cb();
//       }
//     );
//   }
// }
// 
// export default new MyGlobal();
