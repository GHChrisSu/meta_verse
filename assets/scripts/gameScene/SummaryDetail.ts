import { _decorator, Component } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SummaryDetail')
export default class SummaryDetail extends Component {
  close() {
        //this.node.destroy();
  }
}


/**
 * Note: The original script has been commented out, due to the large number of changes in the script, there may be missing in the conversion, you need to convert it manually
 */
// const { ccclass, property } = cc._decorator;
// 
// @ccclass
// export default class SummaryDetail extends cc.Component {
//   close() {
//     this.node.destroy();
//   }
// }
