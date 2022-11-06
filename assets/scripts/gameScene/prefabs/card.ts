import { _decorator, Component, SpriteAtlas, unt } from 'cc';
const { ccclass, property } = _decorator;

import { RoomState } from "../../defines";
import myglobal from "../../mygolbal";
const { log } = cc;

@ccclass('Card')
export default class Card extends Component {
  @property(SpriteAtlas)
  cards_sprite_atlas: SpriteAtlas;
  flag: boolean;
  offset_y: number;
  aunt: string;
  card_id: any;
  card_data: any;
  onLoad() {
        //this.flag = false;
        //this.offset_y = 20;

        //this.node.on("reset_card_flag", (event) => {
        //if (this.flag == true) {
        //this.flag = false;
        //this.node.y -= this.offset_y;
        //}
        //});

    // this.node.on("chu_card_succ",(event)=>{
    //    var chu_card_list = event
    //    for(var i=0;i<chu_card_list.length;i++){
    //     if(chu_card_list[i].card_id==this.card_id){
    //         //this.runToCenter(chu_card_list[i])
    //         //this.node.destory()
    //     }
    //    }
    // })
  }
  runToCenter() {
    //移动到屏幕中间，并带一个牌缩小的效果
  }
  start() {}
  init_data(data) {}
  
  setTouchEvent() {
        //if (this.account === myglobal.playerData.account) {
        //this.node.on(cc.Node.EventType.TOUCH_START, (event) => {
        //var gameScene_node = this.node.parent;
        //var room_state = gameScene_node.getComponent("gameScene").roomstate;
        //if (room_state == RoomState.ROOM_PLAYING) {
        //log("TOUCH_START id:" + this.card_id);
        //if (this.flag == false) {
        //this.flag = true;
        //this.node.y += this.offset_y;
            //通知gameui层选定的牌
        //var carddata = {
        //cardid: this.card_id,
        //card_data: this.card_data,
        //};
        //gameScene_node.emit("choose_card_event", carddata);
        //} else {
        //this.flag = false;
        //this.node.y -= this.offset_y;
            //通知gameUI取消了那张牌
        //gameScene_node.emit("unchoose_card_event", this.card_id);
        //}
        //}
        //});
        //}
  }
  showCards(card, aunt) {
    //card.index是服务器生成card给对象设置的一副牌里唯一id
        //this.card_id = card.index;
    //传入参数 card={"value":5,"shape":1,"index":20}
        //this.card_data = card;
        //if (account) {
        //this.account = account; //标识card属于的玩家
        //}

    //this.node.getComponent(cc.Sprite).spriteFrame =
    //服务器定义牌的表示
    // const cardvalue = {
    //     "A": 12,
    //     "2": 13,
    //     "3": 1,
    //     "4": 2,
    //     "5": 3,
    //     "6": 4,
    //     "7": 5,
    //     "8": 6,
    //     "9": 7,
    //     "10": 8,
    //     "J": 9,
    //     "Q": 10,
    //     "K": 11,
    // }

    //服务器返回的是key,value对应的是资源的编号
        //const CardValue = {
        //"12": 1,
        //"13": 2,
        //"1": 3,
        //"2": 4,
        //"3": 5,
        //"4": 6,
        //"5": 7,
        //"6": 8,
        //"7": 9,
        //"8": 10,
        //"9": 11,
        //"10": 12,
        //"11": 13,
        //};

    // 黑桃：spade
    // 红桃：heart
    // 梅花：club
    // 方片：diamond
    // const CardShape = {
    //     "S": 1,
    //     "H": 2,
    //     "C": 3,
    //     "D": 4,
    // };
        //const cardShpae = {
        //"1": 3,
        //"2": 2,
        //"3": 1,
        //"4": 0,
        //};
        //const Kings = {
        //"14": 54,
        //"15": 53,
        //};

        //var spriteKey = "";
        //if (card.shape) {
        //spriteKey =
        //"card_" + (cardShpae[card.shape] * 13 + CardValue[card.value]);
        //} else {
        //spriteKey = "card_" + Kings[card.king];
        //}

    // log("spriteKey"+spriteKey)
        //this.node.getComponent(cc.Sprite).spriteFrame =
        //this.cards_sprite_atlas.getSpriteFrame(spriteKey);
        //this.setTouchEvent();
  }
}


/**
 * Note: The original script has been commented out, due to the large number of changes in the script, there may be missing in the conversion, you need to convert it manually
 */
// import { RoomState } from "../../defines";
// import myglobal from "../../mygolbal";
// const { ccclass, property } = cc._decorator;
// const { log } = cc;
// 
// @ccclass
// export default class Card extends cc.Component {
//   @property(cc.SpriteAtlas)
//   cards_sprite_atlas: cc.SpriteAtlas;
// 
//   flag: boolean;
//   offset_y: number;
//   account: string;
//   card_id: any;
//   card_data: any;
// 
//   onLoad() {
//     this.flag = false;
//     this.offset_y = 20;
// 
//     this.node.on("reset_card_flag", (event) => {
//       if (this.flag == true) {
//         this.flag = false;
//         this.node.y -= this.offset_y;
//       }
//     });
// 
//     // this.node.on("chu_card_succ",(event)=>{
//     //    var chu_card_list = event
//     //    for(var i=0;i<chu_card_list.length;i++){
//     //     if(chu_card_list[i].card_id==this.card_id){
//     //         //this.runToCenter(chu_card_list[i])
//     //         //this.node.destory()
//     //     }
//     //    }
//     // })
//   }
// 
//   runToCenter() {
//     //移动到屏幕中间，并带一个牌缩小的效果
//   }
//   start() {}
// 
//   init_data(data) {}
//   
//   setTouchEvent() {
//     if (this.account === myglobal.playerData.account) {
//       this.node.on(cc.Node.EventType.TOUCH_START, (event) => {
//         var gameScene_node = this.node.parent;
//         var room_state = gameScene_node.getComponent("gameScene").roomstate;
//         if (room_state == RoomState.ROOM_PLAYING) {
//           log("TOUCH_START id:" + this.card_id);
//           if (this.flag == false) {
//             this.flag = true;
//             this.node.y += this.offset_y;
//             //通知gameui层选定的牌
//             var carddata = {
//               cardid: this.card_id,
//               card_data: this.card_data,
//             };
//             gameScene_node.emit("choose_card_event", carddata);
//           } else {
//             this.flag = false;
//             this.node.y -= this.offset_y;
//             //通知gameUI取消了那张牌
//             gameScene_node.emit("unchoose_card_event", this.card_id);
//           }
//         }
//       });
//     }
//   }
// 
//   showCards(card, account) {
//     //card.index是服务器生成card给对象设置的一副牌里唯一id
//     this.card_id = card.index;
//     //传入参数 card={"value":5,"shape":1,"index":20}
//     this.card_data = card;
//     if (account) {
//       this.account = account; //标识card属于的玩家
//     }
// 
//     //this.node.getComponent(cc.Sprite).spriteFrame =
//     //服务器定义牌的表示
//     // const cardvalue = {
//     //     "A": 12,
//     //     "2": 13,
//     //     "3": 1,
//     //     "4": 2,
//     //     "5": 3,
//     //     "6": 4,
//     //     "7": 5,
//     //     "8": 6,
//     //     "9": 7,
//     //     "10": 8,
//     //     "J": 9,
//     //     "Q": 10,
//     //     "K": 11,
//     // }
// 
//     //服务器返回的是key,value对应的是资源的编号
//     const CardValue = {
//       "12": 1,
//       "13": 2,
//       "1": 3,
//       "2": 4,
//       "3": 5,
//       "4": 6,
//       "5": 7,
//       "6": 8,
//       "7": 9,
//       "8": 10,
//       "9": 11,
//       "10": 12,
//       "11": 13,
//     };
// 
//     // 黑桃：spade
//     // 红桃：heart
//     // 梅花：club
//     // 方片：diamond
//     // const CardShape = {
//     //     "S": 1,
//     //     "H": 2,
//     //     "C": 3,
//     //     "D": 4,
//     // };
//     const cardShpae = {
//       "1": 3,
//       "2": 2,
//       "3": 1,
//       "4": 0,
//     };
//     const Kings = {
//       "14": 54,
//       "15": 53,
//     };
// 
//     var spriteKey = "";
//     if (card.shape) {
//       spriteKey =
//         "card_" + (cardShpae[card.shape] * 13 + CardValue[card.value]);
//     } else {
//       spriteKey = "card_" + Kings[card.king];
//     }
// 
//     // log("spriteKey"+spriteKey)
//     this.node.getComponent(cc.Sprite).spriteFrame =
//       this.cards_sprite_atlas.getSpriteFrame(spriteKey);
//     this.setTouchEvent();
//   }
// }
