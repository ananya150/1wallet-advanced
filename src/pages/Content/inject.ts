export {};

declare global {
    interface Window {
      ethereum: any;
    }
  }
  

class MyWalletProvider {

    public isConnected;

    constructor() {
      this.isConnected = false;
    }
  
    public request({ method, params }: any) {

      return new Promise((resolve, reject) => {
        const message = { method, params };
        window.postMessage(message, '*');
        window.addEventListener('message', async (event) => {
          const {result, error} = event.data;
          if (!result && !error) {
            return;
          }
          if(result){
            resolve(result);
          }else{
            reject(error)
          }
        });
      })
    }
  
    // Add more methods as needed...
  }
  
alert('This is inject script');
console.log("before, ", window.ethereum);
window.ethereum = new MyWalletProvider();
console.log("after , ", window.ethereum);