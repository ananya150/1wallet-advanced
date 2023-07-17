// walletAddress, encryptedKey, passwordHash, name
import { providers, Wallet } from 'ethers';
import exconfig from '../exconfig';
import { decryptEncryptionKey, generateEncryptionKey } from './cryptoUtils';

export const initWallet = async (walletAddress: string, encryptedKey: any, passwordHash: any, name: string) => {
    await chrome.storage.local.set({walletAddress: walletAddress});
    await chrome.storage.local.set({encryptedKey: encryptedKey});
    await chrome.storage.local.set({passwordHash: passwordHash});
    await chrome.storage.local.set({name: name});
    await chrome.storage.local.set({batchTransactions: []})
}

export const resetWallet = async () => {
    await chrome.storage.local.remove(["walletAddress"]);
    await chrome.storage.local.remove(["encryptedKey"]);
    await chrome.storage.local.remove(["passwordHash"]);
    await chrome.storage.local.remove(["name"]);
    await chrome.storage.local.remove(["aesKey"]);
    await chrome.storage.local.set({isLoggedIn: false});
    await chrome.storage.local.remove(["batchTransactions"]);
}

export const isInitialized = async () => {
    const {walletAddress} = await chrome.storage.local.get(['walletAddress']);
    const {encryptedKey} = await chrome.storage.local.get(['encryptedKey']);
    const {passwordHash} = await chrome.storage.local.get(['passwordHash']);

    if(walletAddress && encryptedKey && passwordHash)return true;
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
}

export const loginFound = async () => {
    const {isLoggedIn} = await chrome.storage.local.get(['isLoggedIn']);
    if(isLoggedIn){
        return true;
    }
    return false;
}

export const logout = async () => {
    await chrome.storage.local.remove(["aesKey"]);
    await chrome.storage.local.set({isLoggedIn: false});
}

export const getWalletInfo = async () => {
    const {walletAddress} = await chrome.storage.local.get(['walletAddress']);
    const {name} = await chrome.storage.local.get(['name']);
    return {walletAddress, name};
}

export const getSigner = async () => {
    const isLoggedIn = await loginFound();
    if(!isLoggedIn) return null;

    const {aesKey} = await chrome.storage.local.get(['aesKey']);
    const encryptionKey = generateEncryptionKey(aesKey);
    const {encryptedKey} = await chrome.storage.local.get(['encryptedKey']);

    const privKey = decryptEncryptionKey(encryptedKey, encryptionKey);
    
    const provider = new providers.JsonRpcProvider(exconfig.network.provider)
    const signer = new Wallet(privKey!,provider);
    return signer;
}



