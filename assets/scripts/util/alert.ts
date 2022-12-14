import { _decorator, Component, Color, Node, Graphics } from 'cc';
const { ccclass, property } = _decorator;

export interface AlertButton {
  name: string; //按钮显示名称
  callBack: Function; //回调方法
}

@ccclass('Alert')
export class TagComponent extends Component {
  tag: number = -1;
}

export default class Alert {
  private static DEFAULT_WIDTH: number = 610;
  private static DEFAULT_HEIGHT: number = 400;
  private static DEFAULT_RADIUS: number = 10;
  private static AREA_RATIO: number[] = [0.25, 0.5, 0.25]; //显示区域头部，中部，第部的高度比例
  private static MAX_BTN_NUMBERS: number = 3; //最大支持按钮数量
  private static SEPERATE_DISTANCE: number = 10; // 基本间隔距离
  private static TITLE_FONT_SIZE: number = 40;
  private static BODY_FONT_SIZE: number = 30;
  private static BUTTON_FONT_SIZE: number = 40;
  private static TITLE_COLOR: Color = new Color(0, 0, 0);
  private static TITLE_BG_COLOR: Color = new Color(0, 0, 0, 10);
  private static BODY_COLOR: Color = new Color(0, 0, 0);
  private static BODY_BG_COLOR: Color = new Color(0, 0, 0, 10);
  private static FOOT_BG_COLOR: Color = new Color(0, 0, 0, 10);
  private static BUTTON_FONT_COLOR: Color = new Color(83, 145, 238);
  private static lineColor: Color = new Color(0, 0, 0, 60);
  private static maskColor: Color = new Color(0, 0, 0, 80);
  private static DEFAULT_BUTTON_TEXT: string = "关闭"; //默认的按钮显示文字
  private static PANEL_COLOR: Color = new Color(255, 255, 255);
  private static buttons: AlertButton[] = [];
  private static titleText: string = "";
  private static DEFAULT_FOOT: Node | null = null; //默认底部
  private static bgLayer: Node | null = null; //最终的实例结果
  private static box: Node | null = null;
  public static close() {
        //if (this.bgLayer) this.bgLayer.destroy();
        //this.bgLayer = null;
  }
  public static show(
    title: string,
    message: string,
    button?: AlertButton[] | AlertButton
  ) {
    if (this.bgLayer) return;
    this.titleText = title;
    this._saveBtn(button);
    this._initDefaultPanel();
    this._showPanel(this.bgLayer);
    this.setBodyMessage(message);
  }
  /**
   * 初始化头部
   */
  private static _initDefaultTitle() {
        //let titleArea: cc.Node = new cc.Node();
        //titleArea.name = "titleArea";
        //this.box.addChild(titleArea);

    //设置宽高
        //this._setAreaWidthAndHeight(titleArea);

    //添加子节点
        //let title: cc.Node = new cc.Node();
        //title.name = "title";
        //title.color = this.TITLE_COLOR;
        //let label = title.addComponent(cc.Label);
        //label.string = this.titleText;
        //label.fontSize = this.TITLE_FONT_SIZE;
        //titleArea.addChild(title);

    //填充颜色
        //let ctx = titleArea.addComponent(cc.Graphics);
        //ctx.rect(
        //-titleArea.width / 2,
        //-titleArea.height / 2,
        //titleArea.width,
        //titleArea.height
        //);
        //ctx.fillColor = this.TITLE_BG_COLOR;
        //ctx.fill();
  }
  private static _saveBtn(button: AlertButton[] | AlertButton) {
        //if (!button) {
        //this.buttons = [
        //{
        //name: this.DEFAULT_BUTTON_TEXT,
        //callBack: () => {
        //this.close;
        //},
        //},
        //];
        //return;
        //}
        //if (Array.isArray(button)) {
        //button = <AlertButton[]>button;
        //this.buttons = button;
        //if (button.length > this.MAX_BTN_NUMBERS) {
        //cc.warn(`建议最多${this.MAX_BTN_NUMBERS}个按钮，否则样式影响不美观`);
        //}
        //return;
        //}
        //button = <AlertButton>button;
        //this.buttons = [button];
  }
  private static _setAreaWidthAndHeight(node: Node) {
        //if (node.name == "titleArea") {
        //node.height = this.DEFAULT_HEIGHT * this.AREA_RATIO[0];
        //}
        //if (node.name == "bodyArea") {
        //node.height = this.DEFAULT_HEIGHT * this.AREA_RATIO[1];
        //}
        //if (node.name == "footArea") {
        //node.height = this.DEFAULT_HEIGHT * this.AREA_RATIO[2];
        //}
        //node.width = this.DEFAULT_WIDTH;
        //let widget: cc.Widget = node.addComponent(cc.Widget);
        //widget.isAlignLeft = true;
        //widget.isAlignRight = true;
        //widget.left = 0;
        //widget.right = 0;
  }
  /**
   * 初始化body区域
   */
  private static _initDefaultBody() {
        //let bodyArea: cc.Node = new cc.Node();
        //bodyArea.name = "bodyArea";
    //设置宽高
        //this._setAreaWidthAndHeight(bodyArea);

    //设置布局
        //let layout = bodyArea.addComponent(cc.Layout);
        //layout.type = cc.Layout.Type.VERTICAL;
        //layout.paddingTop = 10;

    //设置文本显示
        //let bodyText: cc.Node = new cc.Node();
        //bodyText.width = bodyArea.width - 100;
        //bodyText.height = bodyArea.height;
        //bodyText.name = "bodyText";
        //let label = bodyText.addComponent(cc.Label);
        //label.overflow = cc.Label.Overflow.SHRINK;
        //label.horizontalAlign = cc.Label.HorizontalAlign.CENTER;
        //label.fontSize = this.BODY_FONT_SIZE;
        //label.string = "信息";
        //bodyText.color = this.BODY_COLOR;
        //bodyArea.addChild(bodyText);

        //let textWidget = bodyText.addComponent(cc.Widget);
        //textWidget.isAlignTop = true;
        //textWidget.top = 50;

    //颜色填充
        //let ctx = bodyArea.addComponent(cc.Graphics);
        //ctx.rect(
        //-bodyArea.width / 2,
        //-bodyArea.height / 2,
        //bodyArea.width,
        //bodyArea.height
        //);
        //ctx.fillColor = this.BODY_BG_COLOR;
        //ctx.fill();

    //画分割线
    // ctx.moveTo(bodyArea.position.x, bodyArea.position.y);
    // ctx.lineTo(bodyArea.position.x + bodyArea.width, bodyArea.position.y);

        //ctx.moveTo(-bodyArea.width / 2, -bodyArea.height / 2);
        //ctx.lineTo(bodyArea.width / 2, -bodyArea.height / 2);
        //ctx.strokeColor = this.lineColor;
        //ctx.stroke();

        //this.box.addChild(bodyArea);
  }
  /**
   * 初始化底部区域
   */
  private static _initDefaultFoot() {
        //let footArea: cc.Node = new cc.Node();
        //this.box.addChild(footArea);
        //footArea.name = "footArea";
    //设置宽高
        //this._setAreaWidthAndHeight(footArea);

        //let layout = footArea.addComponent(cc.Layout);
        //layout.type = cc.Layout.Type.HORIZONTAL;
    // layout.spacingX = 10;
        //layout.startAxis = cc.Layout.AxisDirection.HORIZONTAL;

        //let ctx: cc.Graphics = footArea.addComponent(cc.Graphics);
        //ctx.rect(
        //-footArea.width / 2,
        //-footArea.height / 2,
        //footArea.width,
        //footArea.height
        //);

        //ctx.fillColor = this.FOOT_BG_COLOR;
    // ctx.fillColor = this.PANEL_COLOR;
        //ctx.fill();

        //this.DEFAULT_FOOT = footArea;
        //this._initButtons();
        //this._paintBtnSepatateLine(ctx);
  }
  /**
   * 初始化底部按钮
   */
  private static _initButtons() {
        //for (let i = 0; i < this.buttons.length; i++) {
        //let button: cc.Node = new cc.Node();

        //button.width =
        //(this.DEFAULT_WIDTH -
        //(this.buttons.length + 1) * this.SEPERATE_DISTANCE) /
        //this.buttons.length;
        //button.height = this.DEFAULT_FOOT.height * this.AREA_RATIO[1];

        //let ctx = button.addComponent(cc.Graphics);
        //let text: cc.Node = new cc.Node();
        //text.addComponent(cc.Label).string = this.buttons[i].name;
        //text.color = this.BUTTON_FONT_COLOR;
        //button.addChild(text);

      // button.tag = i;
        //button.addComponent(TagComponent).tag = i;
        //this.DEFAULT_FOOT.addChild(button);
        //this.startListener(button);
        //}
  }
  /**
   * 画间隔线
   * @param ctx
   */
  private static _paintBtnSepatateLine(ctx: Graphics) {
        //let bodyArea = cc.find("panel/bodyArea", this.bgLayer);
        //let footArea = cc.find("panel/footArea", this.bgLayer);

        //let btns: cc.Node[] = footArea.children;
        //for (let i = 0; i < btns.length - 1; i++) {
        //ctx.moveTo(
        //btns[i].position.x + btns[i].width + i * btns[i].width,
        //btns[i].position.y
        //);
        //ctx.lineTo(
        //btns[i].position.x + btns[i].width + i * btns[i].width,
        //btns[i].position.y + footArea.height
        //);
        //ctx.strokeColor = this.lineColor;
        //ctx.stroke();
        //}
  }
  /**
   * 初始化背景遮罩
   */
  private static _initBgLayer() {
        //let mask: cc.Node = new cc.Node();
        //mask.name = "mask";
        //let SCREEN_WIDTH: number = cc.winSize.width;
        //let SCREEN_HEIGHT: number = cc.winSize.height;
        //mask.width = SCREEN_WIDTH;
        //mask.height = SCREEN_HEIGHT;

        //let ctx = mask.addComponent(cc.Graphics);
    // ctx.rect(-SCREEN_WIDTH/2, -SCREEN_HEIGHT/2, SCREEN_WIDTH, SCREEN_HEIGHT);
        //ctx.rect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
        //ctx.stroke();
        //ctx.fillColor = this.maskColor;
        //ctx.fill();

        //mask.setPosition(cc.v2(-SCREEN_WIDTH / 2, -SCREEN_HEIGHT / 2));

        //mask.addComponent(cc.BlockInputEvents);

        //return mask;
  }
  /**
   * 初始化面板
   */
  private static _initDefaultPanel() {
        //this.bgLayer = this._initBgLayer();

        //let box: cc.Node = new cc.Node();
        //let layout: cc.Layout = box.addComponent(cc.Layout);
        //layout.type = cc.Layout.Type.VERTICAL;

        //this.box = box; //中间显示弹窗
        //this.bgLayer.addChild(box); //加上背景遮罩的弹窗
        //box.name = "panel";
        //box.width = this.DEFAULT_WIDTH;
        //box.height = this.DEFAULT_HEIGHT;
        //box.setPosition(this.bgLayer.width / 2, this.bgLayer.height / 2);

        //this._initDefaultTitle();
        //this._initDefaultBody();

        //this._initDefaultFoot();

        //let ctx = box.addComponent(cc.Graphics);
    // ctx.roundRect(-(this.bgLayer.width/2 - box.width/2), -(this.bgLayer.height/2 - this.box.height/2),this.DEFAULT_WIDTH, this.DEFAULT_HEIGHT, this.DEFAULT_RADIUS);
        //ctx.roundRect(
        //-this.box.width / 2,
        //-this.box.height / 2,
        //this.DEFAULT_WIDTH,
        //this.DEFAULT_HEIGHT,
        //this.DEFAULT_RADIUS
        //);
        //ctx.stroke();
        //ctx.fillColor = this.PANEL_COLOR;
        //ctx.fill();
  }
  /**
   * 显示节点
   * @param bgLayer
   */
  private static _showPanel(bgLayer: Node) {
        //if (!bgLayer) return cc.log("面板为空");
        //let sceneNode: cc.Node = cc.director.getScene();
        //let SCREEN_WIDTH: number = cc.winSize.width;
        //let SCREEN_HEIGHT: number = cc.winSize.height;

        //bgLayer.x = bgLayer.x + SCREEN_WIDTH / 2;
        //bgLayer.y = bgLayer.y + SCREEN_HEIGHT / 2;

        //sceneNode.addChild(bgLayer);
  }
  private static startListener(node: Node) {
        //node.on(cc.Node.EventType.TOUCH_START, () => {
        //if (this.buttons.length > 0) {
        // this.buttons[node.tag].callBack();
        //this.buttons[node.getComponent(TagComponent).tag].callBack();
        //}
        //this.close();
        //});
  }
  static setBodyMessage(messagae: string) {
        //cc
        //.find("panel/bodyArea/bodyText", this.bgLayer)
        //.getComponent(cc.Label).string = messagae;
  }
}


/**
 * Note: The original script has been commented out, due to the large number of changes in the script, there may be missing in the conversion, you need to convert it manually
 */
// const { ccclass, property } = cc._decorator;
// 
// export interface AlertButton {
//   name: string; //按钮显示名称
//   callBack: Function; //回调方法
// }
// 
// export class TagComponent extends cc.Component {
//   tag: number = -1;
// }
// 
// @ccclass
// export default class Alert {
//   private static DEFAULT_WIDTH: number = 610;
//   private static DEFAULT_HEIGHT: number = 400;
//   private static DEFAULT_RADIUS: number = 10;
//   private static AREA_RATIO: number[] = [0.25, 0.5, 0.25]; //显示区域头部，中部，第部的高度比例
//   private static MAX_BTN_NUMBERS: number = 3; //最大支持按钮数量
//   private static SEPERATE_DISTANCE: number = 10; // 基本间隔距离
//   private static TITLE_FONT_SIZE: number = 40;
//   private static BODY_FONT_SIZE: number = 30;
//   private static BUTTON_FONT_SIZE: number = 40;
//   private static TITLE_COLOR: cc.Color = new cc.Color(0, 0, 0);
//   private static TITLE_BG_COLOR: cc.Color = new cc.Color(0, 0, 0, 10);
//   private static BODY_COLOR: cc.Color = new cc.Color(0, 0, 0);
//   private static BODY_BG_COLOR: cc.Color = new cc.Color(0, 0, 0, 10);
//   private static FOOT_BG_COLOR: cc.Color = new cc.Color(0, 0, 0, 10);
//   private static BUTTON_FONT_COLOR: cc.Color = new cc.Color(83, 145, 238);
//   private static lineColor: cc.Color = new cc.Color(0, 0, 0, 60);
//   private static maskColor: cc.Color = new cc.Color(0, 0, 0, 80);
//   private static DEFAULT_BUTTON_TEXT: string = "关闭"; //默认的按钮显示文字
//   private static PANEL_COLOR: cc.Color = new cc.Color(255, 255, 255);
// 
//   private static buttons: AlertButton[] = [];
//   private static titleText: string = "";
// 
//   private static DEFAULT_FOOT: cc.Node = null; //默认底部
// 
//   private static bgLayer: cc.Node = null; //最终的实例结果
//   private static box: cc.Node = null;
// 
//   public static close() {
//     if (this.bgLayer) this.bgLayer.destroy();
//     this.bgLayer = null;
//   }
// 
//   public static show(
//     title: string,
//     message: string,
//     button?: AlertButton[] | AlertButton
//   ) {
//     if (this.bgLayer) return;
//     this.titleText = title;
//     this._saveBtn(button);
//     this._initDefaultPanel();
//     this._showPanel(this.bgLayer);
//     this.setBodyMessage(message);
//   }
// 
//   /**
//    * 初始化头部
//    */
//   private static _initDefaultTitle() {
//     let titleArea: cc.Node = new cc.Node();
//     titleArea.name = "titleArea";
//     this.box.addChild(titleArea);
// 
//     //设置宽高
//     this._setAreaWidthAndHeight(titleArea);
// 
//     //添加子节点
//     let title: cc.Node = new cc.Node();
//     title.name = "title";
//     title.color = this.TITLE_COLOR;
//     let label = title.addComponent(cc.Label);
//     label.string = this.titleText;
//     label.fontSize = this.TITLE_FONT_SIZE;
//     titleArea.addChild(title);
// 
//     //填充颜色
//     let ctx = titleArea.addComponent(cc.Graphics);
//     ctx.rect(
//       -titleArea.width / 2,
//       -titleArea.height / 2,
//       titleArea.width,
//       titleArea.height
//     );
//     ctx.fillColor = this.TITLE_BG_COLOR;
//     ctx.fill();
//   }
// 
//   private static _saveBtn(button: AlertButton[] | AlertButton) {
//     if (!button) {
//       this.buttons = [
//         {
//           name: this.DEFAULT_BUTTON_TEXT,
//           callBack: () => {
//             this.close;
//           },
//         },
//       ];
//       return;
//     }
//     if (Array.isArray(button)) {
//       button = <AlertButton[]>button;
//       this.buttons = button;
//       if (button.length > this.MAX_BTN_NUMBERS) {
//         cc.warn(`建议最多${this.MAX_BTN_NUMBERS}个按钮，否则样式影响不美观`);
//       }
//       return;
//     }
//     button = <AlertButton>button;
//     this.buttons = [button];
//   }
// 
//   private static _setAreaWidthAndHeight(node: cc.Node) {
//     if (node.name == "titleArea") {
//       node.height = this.DEFAULT_HEIGHT * this.AREA_RATIO[0];
//     }
//     if (node.name == "bodyArea") {
//       node.height = this.DEFAULT_HEIGHT * this.AREA_RATIO[1];
//     }
//     if (node.name == "footArea") {
//       node.height = this.DEFAULT_HEIGHT * this.AREA_RATIO[2];
//     }
//     node.width = this.DEFAULT_WIDTH;
//     let widget: cc.Widget = node.addComponent(cc.Widget);
//     widget.isAlignLeft = true;
//     widget.isAlignRight = true;
//     widget.left = 0;
//     widget.right = 0;
//   }
// 
//   /**
//    * 初始化body区域
//    */
//   private static _initDefaultBody() {
//     let bodyArea: cc.Node = new cc.Node();
//     bodyArea.name = "bodyArea";
//     //设置宽高
//     this._setAreaWidthAndHeight(bodyArea);
// 
//     //设置布局
//     let layout = bodyArea.addComponent(cc.Layout);
//     layout.type = cc.Layout.Type.VERTICAL;
//     layout.paddingTop = 10;
// 
//     //设置文本显示
//     let bodyText: cc.Node = new cc.Node();
//     bodyText.width = bodyArea.width - 100;
//     bodyText.height = bodyArea.height;
//     bodyText.name = "bodyText";
//     let label = bodyText.addComponent(cc.Label);
//     label.overflow = cc.Label.Overflow.SHRINK;
//     label.horizontalAlign = cc.Label.HorizontalAlign.CENTER;
//     label.fontSize = this.BODY_FONT_SIZE;
//     label.string = "信息";
//     bodyText.color = this.BODY_COLOR;
//     bodyArea.addChild(bodyText);
// 
//     let textWidget = bodyText.addComponent(cc.Widget);
//     textWidget.isAlignTop = true;
//     textWidget.top = 50;
// 
//     //颜色填充
//     let ctx = bodyArea.addComponent(cc.Graphics);
//     ctx.rect(
//       -bodyArea.width / 2,
//       -bodyArea.height / 2,
//       bodyArea.width,
//       bodyArea.height
//     );
//     ctx.fillColor = this.BODY_BG_COLOR;
//     ctx.fill();
// 
//     //画分割线
//     // ctx.moveTo(bodyArea.position.x, bodyArea.position.y);
//     // ctx.lineTo(bodyArea.position.x + bodyArea.width, bodyArea.position.y);
// 
//     ctx.moveTo(-bodyArea.width / 2, -bodyArea.height / 2);
//     ctx.lineTo(bodyArea.width / 2, -bodyArea.height / 2);
//     ctx.strokeColor = this.lineColor;
//     ctx.stroke();
// 
//     this.box.addChild(bodyArea);
//   }
//   /**
//    * 初始化底部区域
//    */
//   private static _initDefaultFoot() {
//     let footArea: cc.Node = new cc.Node();
//     this.box.addChild(footArea);
//     footArea.name = "footArea";
//     //设置宽高
//     this._setAreaWidthAndHeight(footArea);
// 
//     let layout = footArea.addComponent(cc.Layout);
//     layout.type = cc.Layout.Type.HORIZONTAL;
//     // layout.spacingX = 10;
//     layout.startAxis = cc.Layout.AxisDirection.HORIZONTAL;
// 
//     let ctx: cc.Graphics = footArea.addComponent(cc.Graphics);
//     ctx.rect(
//       -footArea.width / 2,
//       -footArea.height / 2,
//       footArea.width,
//       footArea.height
//     );
// 
//     ctx.fillColor = this.FOOT_BG_COLOR;
//     // ctx.fillColor = this.PANEL_COLOR;
//     ctx.fill();
// 
//     this.DEFAULT_FOOT = footArea;
//     this._initButtons();
//     this._paintBtnSepatateLine(ctx);
//   }
// 
//   /**
//    * 初始化底部按钮
//    */
//   private static _initButtons() {
//     for (let i = 0; i < this.buttons.length; i++) {
//       let button: cc.Node = new cc.Node();
// 
//       button.width =
//         (this.DEFAULT_WIDTH -
//           (this.buttons.length + 1) * this.SEPERATE_DISTANCE) /
//         this.buttons.length;
//       button.height = this.DEFAULT_FOOT.height * this.AREA_RATIO[1];
// 
//       let ctx = button.addComponent(cc.Graphics);
//       let text: cc.Node = new cc.Node();
//       text.addComponent(cc.Label).string = this.buttons[i].name;
//       text.color = this.BUTTON_FONT_COLOR;
//       button.addChild(text);
// 
//       // button.tag = i;
//       button.addComponent(TagComponent).tag = i;
//       this.DEFAULT_FOOT.addChild(button);
//       this.startListener(button);
//     }
//   }
// 
//   /**
//    * 画间隔线
//    * @param ctx
//    */
//   private static _paintBtnSepatateLine(ctx: cc.Graphics) {
//     let bodyArea = cc.find("panel/bodyArea", this.bgLayer);
//     let footArea = cc.find("panel/footArea", this.bgLayer);
// 
//     let btns: cc.Node[] = footArea.children;
//     for (let i = 0; i < btns.length - 1; i++) {
//       ctx.moveTo(
//         btns[i].position.x + btns[i].width + i * btns[i].width,
//         btns[i].position.y
//       );
//       ctx.lineTo(
//         btns[i].position.x + btns[i].width + i * btns[i].width,
//         btns[i].position.y + footArea.height
//       );
//       ctx.strokeColor = this.lineColor;
//       ctx.stroke();
//     }
//   }
// 
//   /**
//    * 初始化背景遮罩
//    */
//   private static _initBgLayer() {
//     let mask: cc.Node = new cc.Node();
//     mask.name = "mask";
//     let SCREEN_WIDTH: number = cc.winSize.width;
//     let SCREEN_HEIGHT: number = cc.winSize.height;
//     mask.width = SCREEN_WIDTH;
//     mask.height = SCREEN_HEIGHT;
// 
//     let ctx = mask.addComponent(cc.Graphics);
//     // ctx.rect(-SCREEN_WIDTH/2, -SCREEN_HEIGHT/2, SCREEN_WIDTH, SCREEN_HEIGHT);
//     ctx.rect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
//     ctx.stroke();
//     ctx.fillColor = this.maskColor;
//     ctx.fill();
// 
//     mask.setPosition(cc.v2(-SCREEN_WIDTH / 2, -SCREEN_HEIGHT / 2));
// 
//     mask.addComponent(cc.BlockInputEvents);
// 
//     return mask;
//   }
// 
//   /**
//    * 初始化面板
//    */
//   private static _initDefaultPanel() {
//     this.bgLayer = this._initBgLayer();
// 
//     let box: cc.Node = new cc.Node();
//     let layout: cc.Layout = box.addComponent(cc.Layout);
//     layout.type = cc.Layout.Type.VERTICAL;
// 
//     this.box = box; //中间显示弹窗
//     this.bgLayer.addChild(box); //加上背景遮罩的弹窗
//     box.name = "panel";
//     box.width = this.DEFAULT_WIDTH;
//     box.height = this.DEFAULT_HEIGHT;
//     box.setPosition(this.bgLayer.width / 2, this.bgLayer.height / 2);
// 
//     this._initDefaultTitle();
//     this._initDefaultBody();
// 
//     this._initDefaultFoot();
// 
//     let ctx = box.addComponent(cc.Graphics);
//     // ctx.roundRect(-(this.bgLayer.width/2 - box.width/2), -(this.bgLayer.height/2 - this.box.height/2),this.DEFAULT_WIDTH, this.DEFAULT_HEIGHT, this.DEFAULT_RADIUS);
//     ctx.roundRect(
//       -this.box.width / 2,
//       -this.box.height / 2,
//       this.DEFAULT_WIDTH,
//       this.DEFAULT_HEIGHT,
//       this.DEFAULT_RADIUS
//     );
//     ctx.stroke();
//     ctx.fillColor = this.PANEL_COLOR;
//     ctx.fill();
//   }
// 
//   /**
//    * 显示节点
//    * @param bgLayer
//    */
//   private static _showPanel(bgLayer: cc.Node) {
//     if (!bgLayer) return cc.log("面板为空");
//     let sceneNode: cc.Node = cc.director.getScene();
//     let SCREEN_WIDTH: number = cc.winSize.width;
//     let SCREEN_HEIGHT: number = cc.winSize.height;
// 
//     bgLayer.x = bgLayer.x + SCREEN_WIDTH / 2;
//     bgLayer.y = bgLayer.y + SCREEN_HEIGHT / 2;
// 
//     sceneNode.addChild(bgLayer);
//   }
// 
//   private static startListener(node: cc.Node) {
//     node.on(cc.Node.EventType.TOUCH_START, () => {
//       if (this.buttons.length > 0) {
//         // this.buttons[node.tag].callBack();
//         this.buttons[node.getComponent(TagComponent).tag].callBack();
//       }
//       this.close();
//     });
//   }
// 
//   static setBodyMessage(messagae: string) {
//     cc
//       .find("panel/bodyArea/bodyText", this.bgLayer)
//       .getComponent(cc.Label).string = messagae;
//   }
// }
