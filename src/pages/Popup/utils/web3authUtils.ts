import { Web3AuthNoModal } from "@web3auth/no-modal";
import {
  CHAIN_NAMESPACES,
  SafeEventEmitterProvider,
  WALLET_ADAPTERS,
} from "@web3auth/base";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";

const clientId = "BEl497YFHA4Kpq29Uss7FExFqOuaogXj8GOv89wACYyrybc-C2YSb0m2rQpJBskjwrzXvmSh7Ya4143CoswM4pU"; // get from https://dashboard.web3auth.io

export const init = async () => {
    try {
      const chainConfig = {
        chainNamespace: CHAIN_NAMESPACES.EIP155,
        chainId: "0x13881",
        rpcTarget: 'https://polygon-mumbai.g.alchemy.com/v2/Rq-2QXv6NLd6BOUk4xBV5N_Vyo-Wbo2r',
        displayName: "Polygon Mumbai",
        blockExplorer: "https://mumbai.polygonscan.com",
        ticker: "MATIC",
        tickerName: "Matic",
      };
      const web3auth = new Web3AuthNoModal({
        clientId,
        chainConfig,
        web3AuthNetwork: "aqua",
      });
      const privateKeyProvider = new EthereumPrivateKeyProvider({ config: { chainConfig } });
      const openloginAdapter = new OpenloginAdapter({
        privateKeyProvider,
      });
      web3auth.configureAdapter(openloginAdapter);
      await web3auth.init();
      if (web3auth.connected) {
        return {isLoggedIn: true , web3auth, provider: web3auth.provider}
      }
      return {isLoggedIn: false , web3auth, provider: web3auth.provider}

    } catch (error) {
      console.error(error);
    }
  };

export const login = async (web3auth: any) => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    const web3authProvider = await web3auth.connectTo(
      WALLET_ADAPTERS.OPENLOGIN,
      {
        loginProvider: "google",
      }
    );
    return web3authProvider;
  };

export  const logout = async (web3auth: any, setProvider: any, setLoggedIn: any) => {
    if (!web3auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    await web3auth.logout();
    setProvider(null);
    setLoggedIn(false);
  };