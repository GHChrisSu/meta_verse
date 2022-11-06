import { _decorator, unt } from 'cc';
const getRandomStr = function (count) {
  var str = "";
  for (var i = 0; i < count; i++) {
    str += Math.floor(Math.random() * 10);
  }
  return str;
};

export default class PlayerData {
  uniqueID: string;
  aunt: string;
  address: string;
  nickName: string;
  avatarUrl: string;
  gobal_count: number;
  masterAunt: string;
  bottom: number;
  rate: number;
  houseManagerAunt: string;
  trusteeship: boolean = false;
  constructor() {
        //this.uniqueID = 1 + getRandomStr(6);
        //this.account = "2" + getRandomStr(6);
        //this.nickName = "tiny" + getRandomStr(3);
        //this.avatarUrl = "avatar_" + (Math.floor(Math.random() * 3) + 1);
        //this.masterAccount = "";
        //this.gobal_count = 0;
  }
}


/**
 * Note: The original script has been commented out, due to the large number of changes in the script, there may be missing in the conversion, you need to convert it manually
 */
// const getRandomStr = function (count) {
//   var str = "";
//   for (var i = 0; i < count; i++) {
//     str += Math.floor(Math.random() * 10);
//   }
//   return str;
// };
// 
// export default class PlayerData {
//   uniqueID: string;
//   account: string;
//   address: string;
//   nickName: string;
//   avatarUrl: string;
//   gobal_count: number;
//   masterAccount: string;
//   bottom: number;
//   rate: number;
//   houseManagerAccount: string;
//   trusteeship: boolean = false;
//   constructor() {
//     this.uniqueID = 1 + getRandomStr(6);
//     this.account = "2" + getRandomStr(6);
//     this.nickName = "tiny" + getRandomStr(3);
//     this.avatarUrl = "avatar_" + (Math.floor(Math.random() * 3) + 1);
//     this.masterAccount = "";
//     this.gobal_count = 0;
//   }
// }
