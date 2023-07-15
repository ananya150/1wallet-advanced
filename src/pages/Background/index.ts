/// <reference types="chrome"/>
import { getWalletInfo, logout, resetWallet } from "../utils";
import { Request } from "./types";
console.log("Statting main service");


// Messaging between different scripts

chrome.runtime.onMessage.addListener(

    function(request: Request, sender: any, sendResponse: any){

      // injecting the provider
      if (request.method === "inject script") {

        chrome.scripting
        .executeScript({
          target : {tabId : sender.tab.id},
          files : [ "ex_injectScript.bundle.js" ],
          world:"MAIN"
        })
        sendResponse({tab: sender.tab.id});
     }


     // Wallet methods

     // getting the address
     if(request.method === "eth_requestAccounts") {

      getWalletInfo()
      .then(({ walletAddress }) => {
        sendResponse({ result: walletAddress || '' });
      })
      .catch((error) => {
        sendResponse({ error: 'Error occurred while retrieving wallet info'});
      });
    }




    return true;
    }
)


// On install event listener
chrome.runtime.onInstalled.addListener(async() => {
    // Create an alarm that fires every 30 minutes
    chrome.alarms.create("passwordReset", { periodInMinutes: 30 });
    await resetWallet();
  });


// alarm listener
chrome.alarms.onAlarm.addListener(async(alarm) => {
    if (alarm.name === "passwordReset") {
      // Reset password state
      console.log("Resseting state")
      await logout()
    }
  });

// new window open listener
chrome.windows.onCreated.addListener(async () => {
    console.log("Resseting state due to window");
    await logout();
    
  }, {windowTypes: ['normal']})