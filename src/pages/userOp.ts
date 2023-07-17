import { Client } from "userop";
import exconfig from "../exconfig";
import { SimpleAccount } from "./Background/account";
import { getSigner } from "./utils";
import { BundlerJsonRpcProvider } from "userop";
import { Interface } from "ethers/lib/utils";

export const sendExecuteUserOp = async (walletAddress:any, to:string, value: string, data:string, hasPaymaster:boolean) => {
    const signer = await getSigner();
    if(!signer) return {}
    const rpcUrl = exconfig.network.provider;
    const entryPoint = exconfig.network.entryPointAddress;
    const client = await Client.init(rpcUrl, {entryPoint:entryPoint});
    const simpleAccount = await SimpleAccount.init(signer!,rpcUrl,walletAddress,hasPaymaster);
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

export const buildExecuteUserOp = async (walletAddress:any, to:string, value: string, data:string , hasPaymaster: boolean) => {
    const signer = await getSigner();
    if(!signer) return {}
    const rpcUrl = exconfig.network.provider;
    const entryPoint = exconfig.network.entryPointAddress;
    const client = await Client.init(rpcUrl, {entryPoint:entryPoint});
    const simpleAccount = await SimpleAccount.init(signer!,rpcUrl,walletAddress, hasPaymaster);
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

export const getMaticPrice = async () => {
    const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=matic-network&vs_currencies=usd&include_market_cap=false&include_24hr_vol=false&include_24hr_change=false&include_last_updated_at=false&precision=10');
    const response = await res.json();
    return response["matic-network"]["usd"]
}

export const estimateGas = async (userOp: any) => {
    const bundlerRpc = exconfig.network.bundler;
    const payload = {
        jsonrpc: "2.0",
        id: 1,
        method: "eth_estimateUserOperationGas",
        params: [
          // UserOperation object
          userOp,
      
          // Supported EntryPoint address
          exconfig.network.entryPointAddress
        ]
      }
      try {
        const response = await fetch(bundlerRpc, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });
    
        const data = await response.json();
        return data;
      } catch (error) {
        console.log("Unable to fetch gas price due to ",error)
      }
    
}