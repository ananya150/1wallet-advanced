export function generateEncryptionKey(password: string): Uint8Array {
    const encoder = new TextEncoder();
    const passwordData = encoder.encode(password);
    const encryptionKey = new Uint8Array(passwordData.length);
    
    for (let i = 0; i < passwordData.length; i++) {
      encryptionKey[i] = passwordData[i] ^ 0xFF; // XOR with 0xFF (255) for simplicity
    }
    return encryptionKey;
  }
  
  

export function encryptPrivateKey(privateKey: string, encryptionKey: Uint8Array): string {
    const encoder = new TextEncoder();
    const data = encoder.encode(privateKey);
    const encryptedData = new Uint8Array(data.length);
    
    for (let i = 0; i < data.length; i++) {
      encryptedData[i] = data[i] ^ encryptionKey[i % encryptionKey.length];
    }
    
    const base64String = arrayBufferToBase64(encryptedData);
    return base64String;
  }

  function arrayBufferToBase64(buffer: ArrayBuffer): string {
    const binaryArray = new Uint8Array(buffer);
    let base64String = '';
    
    binaryArray.forEach((byte) => {
      base64String += String.fromCharCode(byte);
    });
    
    return btoa(base64String);
  }

export function decryptEncryptionKey(encryptedData: string, encryptionKey: Uint8Array): string {
    const binaryString = atob(encryptedData);
    const encryptedBytes = new Uint8Array(binaryString.length);
    
    for (let i = 0; i < binaryString.length; i++) {
      encryptedBytes[i] = binaryString.charCodeAt(i);
    }
    
    const decryptedData = new Uint8Array(encryptedBytes.length);
    
    for (let i = 0; i < encryptedBytes.length; i++) {
      decryptedData[i] = encryptedBytes[i] ^ encryptionKey[i % encryptionKey.length];
    }
    
    const decoder = new TextDecoder();
    const decryptedPrivateKey = decoder.decode(decryptedData);
    return decryptedPrivateKey;
  }


  
  export async function hashPassword(password: string) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
  
    try {
      const hash = await window.crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hash)); 
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      return hashHex;
    } catch (err) {
      console.error(err);
    }
  }



  export async function isPasswordCorrect(enteredPassword: string) {
    const encoder = new TextEncoder();
    const data = encoder.encode(enteredPassword);
  
    try {
      const hash = await window.crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hash)); 
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  
      const { passwordHash } = await chrome.storage.local.get('passwordHash');
      return hashHex === passwordHash;
    } catch (err) {
      console.error(err);
    }
  }