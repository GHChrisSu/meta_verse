// attachment: { format: 'base64', value: 'ABEiM0RVZneImQCqu8zd7v8=' }
// attachment: { format: 'hex', value: '0011223344556677889900AABBCCDDEEFF' }
// attachment: { format: 'json', value: {"param1": "value1", "param2": "value2"} }
        // 钱包链接完成
        // 钱包链接完成

import { _decorator, unt, untBalances } from 'cc';
import {
  ITransaction,
  IAunt,
  IAuntBalances,
  IAssetData,
} from "../../../../ddz_vue/src/hooks/useWalletTypes";
declare global {
  interface Window {
    eventHub: EventHub;
  }
}
export interface EventHub {
  $on: Function;
  $once: Function;
  $off: Function;
  $emit: Function;
}
export interface Payment {
  to: string;
  currencyCode: string;
  amount: number;
}
export interface Attachment {
  format: string;
  value: any;
}
export interface PaymentParameters {
  payments: Payment[];
  description?: string; // memo for receiver
  appAction?: string;
  attachment?: Attachment;
}
export interface PaymentResult {
  transactionId: string;
  satoshiFees: number;
  satoshiAmount: number;
  note?: string;
  type?: string;
  time?: number;
  fiatExchangeRate?: number;
  fiatCurrencyCode?: string;
  participants?: any[];
  attachments?: any;
  appAction?: string;
}
const MOCK = false;
class ChainBow {
  private vueEventHub?: EventHub;
  constructor() {
    this.vueEventHub = window.parent.eventHub;
  }
  isChainBowPlatform() {
    return typeof this.vueEventHub !== "undefined";
  }
  connect(): Promise<IAunt> {
    if (MOCK) {
      const ram = Math.floor(Math.random() * 500000);
      return Promise.resolve({
        username: "suhao1@chainbow.io",
        alias: "suhao" + ram,
        domain: "chainbow.io",
        address: "15x5s1a61x56as4d68" + ram,
      });
    }
    if (!this.vueEventHub) throw new Error("Not in Chain Bow Platform");
    this.vueEventHub.$emit("connect");
    return new Promise((resolve, reject) => {
      this.vueEventHub.$once("connected", (aunt: IAunt) => {
        resolve(aunt);
      });
    });
  }
  async getBalance(): Promise<IAuntBalances> {
    if (MOCK) {
      return Promise.resolve({
        Satoshi: {
          symbol: "BSV",
          name: "BSV",
          balance: "10000",
          decimals: "8",
        },
      });
    }
    if (!this.vueEventHub) throw new Error("Not in Chain Bow Platform");
    this.vueEventHub.$emit("getBalance");
    return new Promise((resolve, reject) => {
      this.vueEventHub.$once("getBalanceDone", (balances: IAuntBalances) => {
        resolve(balances);
      });
    });
  }
  sign(message: string): Promise<any> {
    if (MOCK) return;
    if (!this.vueEventHub) throw new Error("Not in Chain Bow Platform");
    this.vueEventHub.$emit("sign", message);
    return new Promise((resolve, reject) => {
      this.vueEventHub.$once("signDone", (e: any, signResult: any) => {
        if (e) {
          reject(e);
        } else {
          resolve(signResult);
        }
      });
    });
  }
  disConnect(): Promise<string> {
    if (MOCK) return;
    if (!this.vueEventHub) throw new Error("Not in Chain Bow Platform");
    this.vueEventHub.$emit("disConnect");
    return new Promise((resolve, reject) => {
      this.vueEventHub.$once("disConnected", (result: any) => {
        resolve(result);
      });
    });
  }
  listenDisConnect(cb) {
    if (MOCK) return;
    if (!this.vueEventHub) throw new Error("Not in Chain Bow Platform");
    this.vueEventHub.$on("disConnected", () => {
      cb();
    });
  }
  listenNoticeBalance(cb: (balances: IAuntBalances) => void) {
    if (MOCK) return;
    if (!this.vueEventHub) throw new Error("Not in Chain Bow Platform");
    this.vueEventHub.$on("noticeBalance", (balances: IAuntBalances) => {
      cb(balances);
    });
  }
  offNoticeBalance() {
    if (MOCK) return;
    if (!this.vueEventHub) throw new Error("Not in Chain Bow Platform");
    this.vueEventHub.$off("noticeBalance");
  }
  async sendTransaction(transaction: ITransaction): Promise<any> {
    if (MOCK) return;
    if (!this.vueEventHub) throw new Error("Not in Chain Bow Platform");
    this.vueEventHub.$emit("sendTransaction", { transaction });
    return new Promise((resolve, reject) => {
      this.vueEventHub.$once("sendTransactionDone", (e: any, result: any) => {
        if (e) {
          reject(e);
        } else {
          resolve(result);
        }
      });
    });
  }
}
export default ChainBow;

/**
 * Note: The original script has been commented out, due to the large number of changes in the script, there may be missing in the conversion, you need to convert it manually
 */
// import {
//   ITransaction,
//   IAccount,
//   IAccountBalances,
//   IAssetData,
// } from "../../../../ddz_vue/src/hooks/useWalletTypes";
// 
// declare global {
//   interface Window {
//     eventHub: EventHub;
//   }
// }
// 
// export interface EventHub {
//   $on: Function;
//   $once: Function;
//   $off: Function;
//   $emit: Function;
// }
// 
// export interface Payment {
//   to: string;
//   currencyCode: string;
//   amount: number;
// }
// 
// // attachment: { format: 'base64', value: 'ABEiM0RVZneImQCqu8zd7v8=' }
// // attachment: { format: 'hex', value: '0011223344556677889900AABBCCDDEEFF' }
// // attachment: { format: 'json', value: {"param1": "value1", "param2": "value2"} }
// export interface Attachment {
//   format: string;
//   value: any;
// }
// 
// export interface PaymentParameters {
//   payments: Payment[];
//   description?: string; // memo for receiver
//   appAction?: string;
//   attachment?: Attachment;
// }
// 
// export interface PaymentResult {
//   transactionId: string;
//   satoshiFees: number;
//   satoshiAmount: number;
//   note?: string;
//   type?: string;
//   time?: number;
//   fiatExchangeRate?: number;
//   fiatCurrencyCode?: string;
//   participants?: any[];
//   attachments?: any;
//   appAction?: string;
// }
// 
// const MOCK = false;
// 
// class ChainBow {
//   private vueEventHub?: EventHub;
// 
//   constructor() {
//     this.vueEventHub = window.parent.eventHub;
//   }
// 
//   isChainBowPlatform() {
//     return typeof this.vueEventHub !== "undefined";
//   }
// 
//   connect(): Promise<IAccount> {
//     if (MOCK) {
//       const ram = Math.floor(Math.random() * 500000);
//       return Promise.resolve({
//         username: "suhao1@chainbow.io",
//         alias: "suhao" + ram,
//         domain: "chainbow.io",
//         address: "15x5s1a61x56as4d68" + ram,
//       });
//     }
//     if (!this.vueEventHub) throw new Error("Not in Chain Bow Platform");
//     this.vueEventHub.$emit("connect");
//     return new Promise((resolve, reject) => {
//       this.vueEventHub.$once("connected", (account: IAccount) => {
//         // 钱包链接完成
//         resolve(account);
//       });
//     });
//   }
// 
//   async getBalance(): Promise<IAccountBalances> {
//     if (MOCK) {
//       return Promise.resolve({
//         Satoshi: {
//           symbol: "BSV",
//           name: "BSV",
//           balance: "10000",
//           decimals: "8",
//         },
//       });
//     }
//     if (!this.vueEventHub) throw new Error("Not in Chain Bow Platform");
//     this.vueEventHub.$emit("getBalance");
//     return new Promise((resolve, reject) => {
//       this.vueEventHub.$once("getBalanceDone", (balances: IAccountBalances) => {
//         resolve(balances);
//       });
//     });
//   }
// 
//   sign(message: string): Promise<any> {
//     if (MOCK) return;
//     if (!this.vueEventHub) throw new Error("Not in Chain Bow Platform");
//     this.vueEventHub.$emit("sign", message);
//     return new Promise((resolve, reject) => {
//       this.vueEventHub.$once("signDone", (e: any, signResult: any) => {
//         if (e) {
//           reject(e);
//         } else {
//           resolve(signResult);
//         }
//       });
//     });
//   }
// 
//   disConnect(): Promise<string> {
//     if (MOCK) return;
//     if (!this.vueEventHub) throw new Error("Not in Chain Bow Platform");
//     this.vueEventHub.$emit("disConnect");
//     return new Promise((resolve, reject) => {
//       this.vueEventHub.$once("disConnected", (result: any) => {
//         // 钱包链接完成
//         resolve(result);
//       });
//     });
//   }
// 
//   listenDisConnect(cb) {
//     if (MOCK) return;
//     if (!this.vueEventHub) throw new Error("Not in Chain Bow Platform");
//     this.vueEventHub.$on("disConnected", () => {
//       cb();
//     });
//   }
// 
//   listenNoticeBalance(cb: (balances: IAccountBalances) => void) {
//     if (MOCK) return;
//     if (!this.vueEventHub) throw new Error("Not in Chain Bow Platform");
//     this.vueEventHub.$on("noticeBalance", (balances: IAccountBalances) => {
//       cb(balances);
//     });
//   }
// 
//   offNoticeBalance() {
//     if (MOCK) return;
//     if (!this.vueEventHub) throw new Error("Not in Chain Bow Platform");
//     this.vueEventHub.$off("noticeBalance");
//   }
// 
//   async sendTransaction(transaction: ITransaction): Promise<any> {
//     if (MOCK) return;
//     if (!this.vueEventHub) throw new Error("Not in Chain Bow Platform");
//     this.vueEventHub.$emit("sendTransaction", { transaction });
//     return new Promise((resolve, reject) => {
//       this.vueEventHub.$once("sendTransactionDone", (e: any, result: any) => {
//         if (e) {
//           reject(e);
//         } else {
//           resolve(result);
//         }
//       });
//     });
//   }
// }
// 
// export default ChainBow;
