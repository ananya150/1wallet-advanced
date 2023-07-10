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
    }
)