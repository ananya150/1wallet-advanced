import { ethers } from "ethers";

export async function getAccount(provider: any): Promise<any> {
    try {
        const ethersProvider = new ethers.providers.Web3Provider(provider as any)
        const signer = await ethersProvider.getSigner();
        const address = await signer.getAddress();
        return address;
    } catch (error) {
        console.log( error );
        return undefined
    }
}

export async function getKey(provider: any): Promise<any> {
    try {
        const privKey = await provider.request({
            method: "eth_private_key"
          });
        
        return privKey;
    } catch (error) {
        console.log( error );
        return undefined
    }
}