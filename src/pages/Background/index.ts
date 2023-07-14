/// <reference types="chrome"/>
import { initWallet, logout, resetWallet } from "../utils";
import { Request } from "./types";
console.log("Statting main service");


chrome.runtime.onMessage.addListener(
    async function(request: Request, sender: any, sendResponse: any){

      if (request.method === "inject script") {
        await chrome.scripting
        .executeScript({
          target : {tabId : sender.tab.id},
          files : [ "ex_injectScript.bundle.js" ],
          world:"MAIN"
        })
        .then(() => console.log("script injected on target frames"));
        sendResponse({tab: sender.tab.id});
        return true
     }

     if(request.method === "net_version") {
       console.log(`Got the request ${request.method} in background script`);
       const result = 'Network Id: 80001';
       sendResponse({result});
       return true;
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