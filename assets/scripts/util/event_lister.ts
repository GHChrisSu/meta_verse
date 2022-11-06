import { _decorator } from 'cc';
const { log } = cc;

export default class EventListener {
  register: any;
  constructor() {
        //this.register = {};
  }
  on(type, method) {
        //if (this.register.hasOwnProperty(type)) {
        //this.register[type].push(method);
        //} else {
        //this.register[type] = [method];
        //}
  }
  fire(type, ...args) {
        //if (this.register.hasOwnProperty(type)) {
        //var methodList = this.register[type];
        //for (var i = 0; i < methodList.length; ++i) {
        //var handle = methodList[i];
        //log("handle.call(this,args) type:" + type);
        //handle.apply(this, args);
        //}
        //}
  }
  removeLister(type) {
        //this.register[type] = [];
  }
  removeAllLister() {
        //this.register = {};
  }
}


/**
 * Note: The original script has been commented out, due to the large number of changes in the script, there may be missing in the conversion, you need to convert it manually
 */
// const { log } = cc;
// 
// export default class EventListener {
//   register: any;
// 
//   constructor() {
//     this.register = {};
//   }
//   on(type, method) {
//     if (this.register.hasOwnProperty(type)) {
//       this.register[type].push(method);
//     } else {
//       this.register[type] = [method];
//     }
//   }
//   fire(type, ...args) {
//     if (this.register.hasOwnProperty(type)) {
//       var methodList = this.register[type];
//       for (var i = 0; i < methodList.length; ++i) {
//         var handle = methodList[i];
//         log("handle.call(this,args) type:" + type);
//         handle.apply(this, args);
//       }
//     }
//   }
//   removeLister(type) {
//     this.register[type] = [];
//   }
//   removeAllLister() {
//     this.register = {};
//   }
// }
