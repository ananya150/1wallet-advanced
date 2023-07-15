export {};

declare global {
    interface Window {
      oneWallet: any
    }
  }
  
type RequestArguments = {
  method: string;
  params?: any
}

class EthereumProvider {
  public isOneWallet: boolean;
  public isConnected: boolean;
  

  constructor() {
    this.isOneWallet = true;
    this.isConnected = false;
  }

  public request({ method, params }: RequestArguments ) {

    return new Promise((resolve, reject) => {

      const message = { method, params };
      window.postMessage(message, '*');
      window.addEventListener('message', async (event) => {
        const {result, error} = event.data;
        if (result === undefined && error === undefined) {
          return;
        }
        if(error){
          reject(error)
        }else{
          resolve(result);
        }
      });
    })
  }
}

class OneWaletProvider {
  public ethereum: EthereumProvider;
  constructor() {
    this.ethereum = new EthereumProvider();
  }
}

window.oneWallet = new OneWaletProvider();