/// <reference types="chrome"/>
import { Request } from "./types";
import { Vault } from "./vault";
console.log("Statting main service");

const vault = new Vault();

chrome.runtime.onMessage.addListener(
    function(request: Request, sender: any, sendResponse: any){

        if(request.header === "getInfo/isInitialized"){
            const isInitialized = vault.initialized;
            sendResponse({message: isInitialized});
            return true;
        }

        if(request.header === "setVault/init"){
            const {encryptedKey , walletAddress , passwordHash, name} = request.params;
            console.log("received address " ,walletAddress);
            vault.init(encryptedKey, walletAddress, passwordHash, name);
            console.log("vault setup done!")
            sendResponse({message: true});
            return true;
        }
    }
)