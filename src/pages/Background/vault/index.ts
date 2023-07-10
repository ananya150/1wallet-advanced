import { SimpleAccount } from "./account";
import { BigNumberish, BytesLike, ethers } from "ethers";
import { NetworkConfig , polygonMumbai} from "./network";
import { decryptPrivateKey } from "./utils";
import { Client } from "userop";

type SimpleAccountFuctions = "setName" | "executeBatch" | "execute";
type FucntionParams<T> = T extends "setName" ? 
        {
            name: string
        }: 
        T extends "executeBatch" ?
        {
            tos: Array<string>, datas: Array<BytesLike>
        }: 
        T extends "execute" ?
        {
            to: string, value: BigNumberish, data: BytesLike
        }:
        never;

export class Vault {

    private isInitialized: boolean;
    private walletAddress: string | null ;
    private passwordHash: any | null;
    private encryptedSigningKey: any | null;
    private name: string ;
    private chain: NetworkConfig;

    constructor () {
        this.isInitialized = false;
        this.walletAddress = null;
        this.encryptedSigningKey = null;
        this.passwordHash = null;
        this.name = ''
        this.chain = polygonMumbai;
    }

    get initialized() {
        return this.isInitialized;
    }

    public init (encryptedKey: any , walletAddress: string , passwordHash: any, name:string){
        this.isInitialized = true;
        this.encryptedSigningKey = encryptedKey;
        this.walletAddress = walletAddress;
        this.passwordHash = passwordHash;
        this.name = name;
    }

    public updateSigner(newEncryptedSigner: string){
        this.encryptedSigningKey = newEncryptedSigner;
    }

    public reset() {
        this.isInitialized = false;
        this.encryptedSigningKey = null;
        this.walletAddress = null;
        this.passwordHash = null;
    }
    
    public async callContract(decryptionKey: any, functionSelector: SimpleAccountFuctions , params: FucntionParams<typeof functionSelector> ) {
        if(!this.isInitialized){
            return false;
        }
        const signingKey = await decryptPrivateKey(this.encryptedSigningKey, decryptionKey) as string;
        const provider = new ethers.providers.JsonRpcProvider(this.chain.rpcUrl);
        const signer = new ethers.Wallet(signingKey, provider);
        const client = await Client.init(this.chain.rpcUrl, {entryPoint: this.chain.entryPoint});
        const accountApi = await SimpleAccount.init(signer, this.chain.bundlerUrl, this.walletAddress!);
        if(functionSelector === "setName" && 'name' in params){
            try{
                const res = await client.sendUserOperation(
                    accountApi.setName(params.name)
                    );
                return true;
            }catch(error){
                console.log(error);
                return false;
            } 
        } else if (functionSelector === "execute" && 'to' in params && 'value' in params && 'data' in params){
            try{
                const res = await client.sendUserOperation(
                    accountApi.execute(params.to, params.value, params.data),
                  );
                return true;
            }catch(error){
                console.log(error);
                return false;
            } 
        } else if (functionSelector === "executeBatch" && 'tos' in params && 'datas' in params){
            try{
                const res = await client.sendUserOperation(
                    accountApi.executeBatch(params.tos, params.datas),
                  );
                return true;
            }catch(error){
                console.log(error);
                return false;
            }
        } else{
            return false;
        }
    }

}