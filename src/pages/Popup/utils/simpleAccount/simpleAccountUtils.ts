import { BigNumberish, BytesLike, ethers } from "ethers";
import { UserOperationBuilder, BundlerJsonRpcProvider, IPresetBuilderOpts, UserOperationMiddlewareFn } from "userop";
import { EOASignature, estimateUserOperationGas, getGasPrice } from "userop/dist/preset/middleware";
import { SimpleAccount as SimpleAccountImpl, SimpleAccount__factory } from "./typechain-types";
import { EntryPoint, EntryPoint__factory } from "userop/dist/typechain";
import {SimpleAccountFactoryDeployment} from "./deployments/SimpleAccountFactory"
import exconfig from "../../../../exconfig";

const ERC4337 = {
    EntryPoint: "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789",
    SimpleAccount: {
      Factory: "0x43b09ab53ab3102A5062Afa03FaF62C999192932",
    },
};

export class SimpleAccount extends UserOperationBuilder {
    private signer: ethers.Signer;
    private provider: ethers.providers.JsonRpcProvider;
    private entryPoint: EntryPoint;
    private initCode: string;
    proxy: SimpleAccountImpl;

    private constructor (
        signer: ethers.Signer,
        rpcUrl: string,
        address: string,
        opts?: IPresetBuilderOpts
    ) {
        super();
        this.signer = signer;
        this.provider = new BundlerJsonRpcProvider(rpcUrl)
        this.entryPoint = EntryPoint__factory.connect(
            opts?.entryPoint || ERC4337.EntryPoint,
            this.provider
        );
        this.initCode = "0x";
        this.proxy = SimpleAccount__factory.connect(
            address,
            this.provider
        );
    }

    private resolveAccount: UserOperationMiddlewareFn = async (ctx) => {
        ctx.op.nonce = await this.entryPoint.getNonce(ctx.op.sender, 0);
    }

    public static async init(
        signer: ethers.Signer,
        rpcUrl: string,
        address: string,
        opts?: IPresetBuilderOpts
    ) : Promise<SimpleAccount> {
        const instance = new SimpleAccount(signer, rpcUrl, address, opts);
        const base = instance.useDefaults({
            sender: instance.proxy.address,
            signature: await instance.signer.signMessage(
                ethers.utils.arrayify(ethers.utils.keccak256("0xdead"))
            ),
            paymasterAndData: "0x7908fabA3499d6da699E4A67DE2130F9FbAEB924",
            preVerificationGas: "0xC400",
            verificationGasLimit: "0x1D4C0"
        })
        .useMiddleware(instance.resolveAccount)
        .useMiddleware(getGasPrice(instance.provider))
        return base.useMiddleware(EOASignature(instance.signer))
        // return base;
        // const withPM = opts?.paymasterMiddleware ? base.useMiddleware(opts.paymasterMiddleware) : base.useMiddleware(estimateUserOperationGas(instance.provider));
        // return base.useMiddleware(estimateUserOperationGas(instance.provider)).useMiddleware(EOASignature(instance.signer));
    }

    execute(to: string, value: BigNumberish, data: BytesLike) {
        return this.setCallData(
          this.proxy.interface.encodeFunctionData("execute", [to, value, data])
        );
      }

    executeBatch(to: Array<string>, data: Array<BytesLike>) {
        return this.setCallData(
          this.proxy.interface.encodeFunctionData("executeBatch", [to, data])
        );
      }
    
    setName(_name: string) {
        return this.setCallData(
            this.proxy.interface.encodeFunctionData("setName", [_name])
        );
    }
}

// SimpleAccountFactory class to get public information and to deploy wallet 
// wallet is deployed by the deployer cold key.
export class SimpleAccountFactory {
    private provider;
    private ownerAddress;
    private factoryContract;

    constructor(
        address: string
    ){
        this.provider = new ethers.providers.JsonRpcProvider('https://polygon-mumbai.g.alchemy.com/v2/Rq-2QXv6NLd6BOUk4xBV5N_Vyo-Wbo2r' || '');
        const signer = new ethers.Wallet('0x8249b9d07753f932621b92ebc20df71258382e49db32eb48e653788f6c810a95' || '' , this.provider);
        this.ownerAddress = address;
        this.factoryContract = new ethers.Contract(exconfig.factory_address , SimpleAccountFactoryDeployment["abi"] , signer);
    }

    async getWalletAddress() {
        const walletAddress = await this.factoryContract.getAddress(this.ownerAddress, ethers.BigNumber.from(0));
        return walletAddress;
    }

    async found() {
        const walletAddress = await this.getWalletAddress();
        const senderAddressCode = await this.provider.getCode(walletAddress);
        if(senderAddressCode.length > 2){
            return true;
        }else{
            return false;
        }
    }

    async getName() {
        const walletAddress = await this.getWalletAddress();
        const walletContract = new ethers.Contract(walletAddress ,  SimpleAccount__factory.abi , this.provider);
        const name = await walletContract.getName();
        return name;
    }

    async deployWallet() {
        try{
            const transaction = await this.factoryContract.createAccount(this.ownerAddress, ethers.BigNumber.from(0));
            await transaction.wait();
            return true;
        }
        catch(error){
            return false;
        }
    }
}