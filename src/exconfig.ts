// eslint-disable-next-line import/no-anonymous-default-export
// export default {
//     enablePasswordEncryption: true,
//     showTransactionConfirmationScreen: true,
//     factory_address: '0x43b09ab53ab3102A5062Afa03FaF62C999192932',
//     stateVersion: '0.1',
//     network: {
//       chainID: '80001',
//       family: 'EVM',
//       name: 'PolygonMumbai',
//       provider: 'https://polygon-mumbai.g.alchemy.com/v2/Rq-2QXv6NLd6BOUk4xBV5N_Vyo-Wbo2r',
//       entryPointAddress: '0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789',
//       bundler: 'https://api.stackup.sh/v1/node/feb28026c6e152e84625a0c87bb39ab9db60f7c27e2dbc4b1eaa69414a9a489d',
//       baseAsset: {
//         name: 'MATIC',
//         symbol: 'MATIC',
//         decimals: 18,
//         image: 'https://en.wikipedia.org/wiki/Polygon_%28blockchain%29#/media/File:Polygon_Blockchain_Matic_Logo.svg'
//         }
//     },
//   };
  

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  enablePasswordEncryption: false,
  showTransactionConfirmationScreen: true,
  factory_address: '0x9406Cc6185a346906296840746125a0E44976454',
  stateVersion: '0.1',
  network: {
    chainID: '11155111',
    family: 'EVM',
    name: 'Sepolia',
    provider: 'https://sepolia.infura.io/v3/bdabe9d2f9244005af0f566398e648da',
    entryPointAddress: '0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789',
    bundler: 'https://sepolia.voltaire.candidewallet.com/rpc',
    baseAsset: {
      symbol: 'ETH',
      name: 'ETH',
      decimals: 18,
      image:
        'https://ethereum.org/static/6b935ac0e6194247347855dc3d328e83/6ed5f/eth-diamond-black.webp',
    },
  },
};
