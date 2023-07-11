// walletAddress, encryptedKey, passwordHash, name

export const initWallet = async (walletAddress: string, encryptedKey: any, passwordHash: any, name: string) => {
    await chrome.storage.local.set({walletAddress: walletAddress});
    await chrome.storage.local.set({encryptedKey: encryptedKey});
    await chrome.storage.local.set({passwordHash: passwordHash});
    await chrome.storage.local.set({name: name});
    console.log(`Initialized wallet with address ${walletAddress} and name ${name}`);
}

export const resetWallet = async () => {
    await chrome.storage.local.remove(["walletAddress"]);
    await chrome.storage.local.remove(["encryptedKey"]);
    await chrome.storage.local.remove(["passwordHash"]);
    await chrome.storage.local.remove(["name"]);
    await chrome.storage.local.remove(["aesKey"]);
    await chrome.storage.local.set({isLoggedIn: false});
    console.log("Wallet ready for setup");
}

export const isInitialized = async () => {
    const {walletAddress} = await chrome.storage.local.get(['walletAddress']);
    const {encryptedKey} = await chrome.storage.local.get(['encryptedKey']);
    const {passwordHash} = await chrome.storage.local.get(['passwordHash']);

    if(walletAddress && encryptedKey && passwordHash) {
        console.log("Wallet found");
        return true;
    } 
    console.log("Wallet not found")
    return false;
}

// check if the password is correct
export const checkPassword = async (password: string) => {
    const {passwordHash} = await chrome.storage.local.get(['passwordHash']);
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hash = await window.crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hash)); 
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex === passwordHash;
}

export const login = async (aesKey: any) => {
    await chrome.storage.local.set({isLoggedIn: true});
    await chrome.storage.local.set({aesKey: aesKey});
    console.log("Logged in successfully")
}

export const loginFound = async () => {
    const {isLoggedIn} = await chrome.storage.local.get(['isLoggedIn']);
    if(isLoggedIn){
        console.log("Log in found");
        return true;
    }
    console.log("No login found");
    return false;
}

export const logout = async () => {
    await chrome.storage.local.remove(["aesKey"]);
    await chrome.storage.local.set({isLoggedIn: false});
    console.log("Logged in successfully")
}


