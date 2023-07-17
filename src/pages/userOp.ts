import { Client } from "userop";
import exconfig from "../exconfig";
import { SimpleAccount } from "./Background/account";
import { getSigner } from "./utils";

export const sendExecuteUserOp = async (signer: any, walletAddress:any, to:string, value: string, data:string) => {
    const rpcUrl = exconfig.network.provider;
    const entryPoint = exconfig.network.entryPointAddress;
    const client = await Client.init(rpcUrl, {entryPoint:entryPoint});
    const simpleAccount = await SimpleAccount.init(signer,rpcUrl,walletAddress);
    
}

export const buildExecuteUserOp = async (walletAddress:any, to:string, value: string, data:string) => {
    const signer = await getSigner();
    if(!signer) return {}
    const rpcUrl = exconfig.network.provider;
    const entryPoint = exconfig.network.entryPointAddress;
    const client = await Client.init(rpcUrl, {entryPoint:entryPoint});
    const simpleAccount = await SimpleAccount.init(signer!,rpcUrl,walletAddress);
    const res = await client.buildUserOperation(
        simpleAccount.execute(to,value,data)
    )
    return res;
}

