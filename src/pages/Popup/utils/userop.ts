import { ethers } from "ethers";
import { Client } from "userop";
import { SimpleAccount } from "./simpleAccount/simpleAccountUtils";

const rpcUrl = process.env.REACT_APP_BUNDLER_URL || ''
const entryPoint = '0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789';

export const getClient = async () => {
    const client = await Client.init(rpcUrl, {entryPoint: entryPoint});
    return client;
}

export const getSimpleAccount = async (signer: ethers.Signer , walletAddress: string) => {
    const wallet = await SimpleAccount.init(
        signer, rpcUrl , walletAddress
    )
    return wallet;
}

export const changeWalletName = async (signer: ethers.Signer , walletAddress: string , name: string) => {
    const client = await getClient();
    const wallet = await getSimpleAccount(signer , walletAddress);
    try{
        const res = await client.sendUserOperation(
            wallet.setName(name),
            { onBuild: (op) => console.log("Signed UserOperation:", op) }
          );
        console.log(res);
        return true;
    }catch(error){
        console.log(error);
        return false;
    } 
}