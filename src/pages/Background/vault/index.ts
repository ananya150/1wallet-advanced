import { SimpleAccount } from "./account";
import { NetworkConfig , polygonMumbai} from "./network";
export class Vault {

    private isInitialized: boolean;
    private walletAddress: string | null ;
    private encryptedSigningKey: string | null;

    private chain: NetworkConfig;

    constructor() {
        this.isInitialized = false;
        this.walletAddress = null;
        this.encryptedSigningKey = null;
        this.chain = polygonMumbai;
    }

    public init (encryptedKey: string , walletAddress: string){
        this.isInitialized = true;
        this.encryptedSigningKey = encryptedKey;
        this.walletAddress = walletAddress;
    }

    public updateSigner(newEncryptedSigner: string){
        this.encryptedSigningKey = newEncryptedSigner;
    }

    public reset() {
        this.isInitialized = false;
        this.encryptedSigningKey = null;
        this.walletAddress = null;
    }
    
    

}