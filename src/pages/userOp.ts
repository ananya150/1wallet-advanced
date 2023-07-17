import { Client } from "userop";
import exconfig from "../exconfig";
import { SimpleAccount } from "./Background/account";
import { getSigner } from "./utils";
import { BundlerJsonRpcProvider } from "userop";
import { Interface } from "ethers/lib/utils";

export const sendExecuteUserOp = async (walletAddress:any, to:string, value: string, data:string) => {
    const signer = await getSigner();
    if(!signer) return {}
    const rpcUrl = exconfig.network.provider;
    const entryPoint = exconfig.network.entryPointAddress;
    const client = await Client.init(rpcUrl, {entryPoint:entryPoint});
    const simpleAccount = await SimpleAccount.init(signer!,rpcUrl,walletAddress);
    try{
        const res = await client.sendUserOperation(
            simpleAccount.execute(to,value,data),
            { onBuild: (op) => console.log("Signed UserOperation:", op) }
        )
        console.log("Waiting for transaction...");
        const ev = await res.wait();
        console.log(`Transaction hash: ${ev?.transactionHash ?? null}`);
        return ev?.transactionHash ?? null;
    }catch(e){
        console.log(e);
        return null;
    }
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

export const getCallData = async (to: string, amount: string) => {
    const tokenAbi = ['function transfer(address to, uint256 value)'];
    const iFace = new Interface(tokenAbi);
    const callData = iFace.encodeFunctionData("transfer", [to,amount]);
    return callData;
}

// export const estimateGas = async (userOp: any) => {
//     const provider = new BundlerJsonRpcProvider(exconfig.network.bundler);
//     await provider.
// }