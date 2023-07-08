import { createSlice } from '@reduxjs/toolkit';
import { EVMNetwork } from '../types/network';

export type Vault = {
    vault: string;
    encryptionKey?: string;
    encryptionSalt?: string;
  };

export type NetworkState = {
    activeNetwork: EVMNetwork;
    supportedNetworks: Array<EVMNetwork>;
  };

const Mumbai : EVMNetwork = {
    chainID: '80001',
    family: 'EVM',
    name: 'PolygonMumbai',
    provider: 'https://polygon-mumbai.g.alchemy.com/v2/Rq-2QXv6NLd6BOUk4xBV5N_Vyo-Wbo2r',
    entryPointAddress: '0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789',
    bundler: 'https://api.stackup.sh/v1/node/feb28026c6e152e84625a0c87bb39ab9db60f7c27e2dbc4b1eaa69414a9a489d',
    baseAsset: {
        name: 'MATIC',
        symbol: 'MATIC',
        decimals: 18,
        image: 'https://en.wikipedia.org/wiki/Polygon_%28blockchain%29#/media/File:Polygon_Blockchain_Matic_Logo.svg'
    }
}

export const initialState : NetworkState = {
    activeNetwork: Mumbai,
    supportedNetworks: [Mumbai]
}

type NetworkReducers = {};

const networkSlice = createSlice<NetworkState, NetworkReducers, 'network'>({
    name: 'network',
    initialState,
    reducers: {}
})

export default networkSlice.reducer;
