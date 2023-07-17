import { BigNumberish, BytesLike, ethers } from "ethers";
import { UserOperationBuilder, BundlerJsonRpcProvider, IPresetBuilderOpts, UserOperationMiddlewareFn } from "userop";
import { EOASignature, getGasPrice } from "userop/dist/preset/middleware";
import { EntryPoint, EntryPoint__factory } from "userop/dist/typechain";
import { SimpleAccount as SimpleAccountImpl, SimpleAccount__factory } from "./typechain-types";

export class SimpleAccount extends UserOperationBuilder {
    private signer: ethers.Signer;
    private provider: ethers.providers.JsonRpcProvider;
    private entryPoint: EntryPoint;
    public paymaster: string;
    proxy: SimpleAccountImpl;

    private constructor (
        signer: ethers.Signer,
        bundlerRpcUrl: string,
        walletAddress: string,
        hasPaymaster?: boolean,
        opts?: IPresetBuilderOpts,
    ) {
        super();
        this.signer = signer;
        this.provider = new BundlerJsonRpcProvider(bundlerRpcUrl)
        this.entryPoint = EntryPoint__factory.connect(
            opts?.entryPoint || "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789",
            this.provider
        );
        this.proxy = SimpleAccount__factory.connect(
            walletAddress,
            this.provider
        );
        this.paymaster = '0x';
        if(hasPaymaster) this.paymaster = '0x7908fabA3499d6da699E4A67DE2130F9FbAEB924';
    }

    private resolveAccount: UserOperationMiddlewareFn = async (ctx) => {
        ctx.op.nonce = await this.entryPoint.getNonce(ctx.op.sender, 0);
    }

    public static async init(
        signer: ethers.Signer,
        rpcUrl: string,
        address: string,
        hasPaymaster?: boolean,
        opts?: IPresetBuilderOpts
    ) : Promise<SimpleAccount> {
        const instance = new SimpleAccount(signer, rpcUrl, address, hasPaymaster ,opts);
        const base = instance.useDefaults({
            sender: instance.proxy.address,
            signature: await instance.signer.signMessage(
                ethers.utils.arrayify(ethers.utils.keccak256("0xdead"))
            ),
            paymasterAndData: instance.paymaster,
            preVerificationGas: "0xC400",
            verificationGasLimit: "0x1D4C0"
        })
        .useMiddleware(instance.resolveAccount)
        .useMiddleware(getGasPrice(instance.provider))
        return base.useMiddleware(EOASignature(instance.signer))
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