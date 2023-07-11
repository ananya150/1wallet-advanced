/// <reference types="chrome"/>
import { initWallet, logout, resetWallet } from "../utils";
import { Request } from "./types";
console.log("Statting main service");

chrome.runtime.onMessage.addListener(
    async function(request: Request, sender: any, sendResponse: any){

        if(request.header === "set/initWallet"){
          try{
            const {encryptedKey, walletAddress, name, passwordHash} = request.params;
            await initWallet(walletAddress, encryptedKey, passwordHash, name);
            sendResponse({message: true});
            return true;
          }catch(e){
            sendResponse({message: false});
            return true;
          }
        }

    }
)

chrome.runtime.onInstalled.addListener(async() => {
    // Create an alarm that fires every 30 minutes
    chrome.alarms.create("passwordReset", { periodInMinutes: 30 });
    await resetWallet();
  });

chrome.alarms.onAlarm.addListener(async(alarm) => {
    if (alarm.name === "passwordReset") {
      // Reset password state
      console.log("Resseting state")
      await logout()
    }
  });

chrome.windows.onCreated.addListener(async () => {
    console.log("Resseting state due to window");
    await logout();
    
  }, {windowTypes: ['normal']})