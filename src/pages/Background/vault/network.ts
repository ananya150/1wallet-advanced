import exconfig from "../../../exconfig";

export type NetworkConfig = {
    chainId: string;
    name: string;
    baseTokenSymbol: string;
    rpcUrl: string;
    bundlerUrl: string;
    entryPoint: string;
    factory: string;
}

export const polygonMumbai: NetworkConfig = {
    chainId: exconfig.network.chainID,
    name: exconfig.network.name,
    baseTokenSymbol: "MATIC",
    rpcUrl: exconfig.network.provider,
    bundlerUrl: exconfig.network.bundler,
    entryPoint: exconfig.network.entryPointAddress,
    factory: exconfig.factory_address
}