/// <reference types="chrome"/>
import { Vault } from "./vault";
console.log("Statting main service");

const vault = new Vault();

chrome.runtime.onMessage.addListener(
    function(request: any, sender: any, sendResponse: any){
        console.log("request is ", request);
        console.log("Sender is ", sender);
        sendResponse({message: "Received"});
        return true;
    }
)