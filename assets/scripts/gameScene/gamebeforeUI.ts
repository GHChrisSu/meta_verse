import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

import { isopen_sound } from "../defines";
import myglobal from "../mygolbal";
import Alert from "../util/alert";
const { log } = cc;

@ccclass('GamebeforeUI')
export default class GameBeforeUI extends Component {
  @property(Node)
  btn_ready: Node;
  @property(Node)
  btn_gamestart: Node;
  onLoad() {
        //this.btn_gamestart.active = false;
        //this.btn_ready.active = false;

    //监听本地的发送的消息
        //this.node.on("init", () => {
        //log("game beforeui init");
        //log(
        //"myglobal.playerData.houseManager" +
        //myglobal.playerData.houseManagerAccount
        //);
        //log("myglobal.playerData.account" + myglobal.playerData.account);
        //if (
        //myglobal.playerData.houseManagerAccount == myglobal.playerData.account
        //) {
        //自己就是房主
        //this.btn_gamestart.active = true;
        //this.btn_ready.active = false;
        //} else {
        //this.btn_gamestart.active = false;
        //this.btn_ready.active = true;
        //}
        //});

    //监听服务器发送来的消息
        //myglobal.socket.onChangeHouseManage((data) => {
        //log(
        //"gamebrforeUI onChangeHouseManage revice" + JSON.stringify(data)
        //);
        //myglobal.playerData.houseManagerAccount = data;
        //if (
        //myglobal.playerData.houseManagerAccount == myglobal.playerData.account
        //) {
        //自己就是房主
        //this.btn_gamestart.active = true;
        //this.btn_ready.active = false;
        //} else {
        //this.btn_gamestart.active = false;
        //this.btn_ready.active = true;
        //}
        //});

        //myglobal.socket.onOutRoom((data) => {});
  }
  start() {}
  onButtonClick(event, customData) {
        //switch (customData) {
        //case "btn_ready":
        //myglobal.socket.requestReady();
        //break;
        //case "btn_start":
        //myglobal.socket.requestStart(function (err, data) {
        //if (err != 0) {
        //Alert.show("没有准备", "")
        //log("requestStart err" + err);
        //} else {
        //log("requestStart data: " + JSON.stringify(data));
        //}
        //});
        //break;
        //default:
        //break;
        //}
  }
}


/**
 * Note: The original script has been commented out, due to the large number of changes in the script, there may be missing in the conversion, you need to convert it manually
 */
// import { isopen_sound } from "../defines";
// import myglobal from "../mygolbal";
// import Alert from "../util/alert";
// const { ccclass, property } = cc._decorator;
// const { log } = cc;
// 
// @ccclass
// export default class GameBeforeUI extends cc.Component {
//   @property(cc.Node)
//   btn_ready: cc.Node;
//   @property(cc.Node)
//   btn_gamestart: cc.Node;
// 
//   onLoad() {
//     this.btn_gamestart.active = false;
//     this.btn_ready.active = false;
// 
//     //监听本地的发送的消息
//     this.node.on("init", () => {
//       log("game beforeui init");
//       log(
//         "myglobal.playerData.houseManager" +
//           myglobal.playerData.houseManagerAccount
//       );
//       log("myglobal.playerData.account" + myglobal.playerData.account);
//       if (
//         myglobal.playerData.houseManagerAccount == myglobal.playerData.account
//       ) {
//         //自己就是房主
//         this.btn_gamestart.active = true;
//         this.btn_ready.active = false;
//       } else {
//         this.btn_gamestart.active = false;
//         this.btn_ready.active = true;
//       }
//     });
// 
//     //监听服务器发送来的消息
//     myglobal.socket.onChangeHouseManage((data) => {
//       log(
//         "gamebrforeUI onChangeHouseManage revice" + JSON.stringify(data)
//       );
//       myglobal.playerData.houseManagerAccount = data;
//       if (
//         myglobal.playerData.houseManagerAccount == myglobal.playerData.account
//       ) {
//         //自己就是房主
//         this.btn_gamestart.active = true;
//         this.btn_ready.active = false;
//       } else {
//         this.btn_gamestart.active = false;
//         this.btn_ready.active = true;
//       }
//     });
// 
//     myglobal.socket.onOutRoom((data) => {});
//   }
// 
//   start() {}
// 
//   onButtonClick(event, customData) {
//     switch (customData) {
//       case "btn_ready":
//         myglobal.socket.requestReady();
//         break;
//       case "btn_start":
//         myglobal.socket.requestStart(function (err, data) {
//           if (err != 0) {
//             Alert.show("没有准备", "")
//             log("requestStart err" + err);
//           } else {
//             log("requestStart data: " + JSON.stringify(data));
//           }
//         });
//         break;
//       default:
//         break;
//     }
//   }
// }
