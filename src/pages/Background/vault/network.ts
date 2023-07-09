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
    chainId: "0x13881",
    name: "Mumbai Testnet",
    baseTokenSymbol: "MATIC",
    rpcUrl: "https://polygon-mumbai.g.alchemy.com/v2/Rq-2QXv6NLd6BOUk4xBV5N_Vyo-Wbo2r",
    bundlerUrl: "https://api.stackup.sh/v1/node/feb28026c6e152e84625a0c87bb39ab9db60f7c27e2dbc4b1eaa69414a9a489d",
    entryPoint: "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789",
    factory: "0xdF13083f2a3D4fa51420a506cEBB635bdEA76304"
}