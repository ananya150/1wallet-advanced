/// <reference types="chrome"/>
import { Request } from "./types";
import { Vault } from "./vault";
import { hashPassword } from "./vault/utils";
console.log("Statting main service");

const vault = new Vault();

chrome.runtime.onMessage.addListener(
    async function(request: Request, sender: any, sendResponse: any){

        if(request.header === "getInfo/isInitialized"){
            const isInitialized = vault.initialized;
            sendResponse({message: isInitialized});
            return true;
        }

        if(request.header === "setVault/init"){
            const {encryptedKey , walletAddress , passwordHash, name} = request.params;
            vault.init(encryptedKey, walletAddress, passwordHash, name);
            console.log("vault setup done!")
            sendResponse({message: true});
            return true;
        }

        if(request.header === "getInfo/passHash"){
          const {hash} = request.params;
          const valid = hash === vault.passdHash;
          sendResponse({message: valid});
          return true;
      }
    }
)

chrome.runtime.onInstalled.addListener(() => {
    // Create an alarm that fires every 30 minutes
    // chrome.alarms.create("passwordReset", { periodInMinutes: 10 });
    chrome.storage.local.set({isPasswordEntered: false});
    chrome.storage.local.remove('aeskey');
  });

// chrome.alarms.onAlarm.addListener((alarm) => {
//     if (alarm.name === "passwordReset") {
//       // Reset password state
//       console.log("Resseting state")
//       chrome.storage.local.set({isPasswordEntered: false});
//       chrome.storage.local.remove('aeskey');
//     }
//   });

chrome.windows.onCreated.addListener(() => {
    console.log("Resseting state due to window")
    chrome.storage.local.set({isPasswordEntered: false});
    chrome.storage.local.remove('aeskey');
  }, {windowTypes: ['normal']})