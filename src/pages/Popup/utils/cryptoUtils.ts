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

export async function deriveEncryptionKey(password: string) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
  
    try {
      const baseKey = await window.crypto.subtle.importKey(
        'raw',
        data,
        { name: 'PBKDF2' },
        false,
        ['deriveKey']
      );
  
      const aesKey = await window.crypto.subtle.deriveKey(
        {
          name: 'PBKDF2',
          salt: window.crypto.getRandomValues(new Uint8Array(16)),
          iterations: 100000,
          hash: 'SHA-256'
        },
        baseKey,
        { name: 'AES-GCM', length: 256 },
        false,
        ['encrypt', 'decrypt']
      );
  
      return aesKey;
    } catch (err) {
      console.error(err);
    }
  }
  
export async function encryptPrivateKey(aesKey: any, privateKey: string) {
    const encoder = new TextEncoder();
    const data = encoder.encode(privateKey);
  
    try {
      const ciphertext = await window.crypto.subtle.encrypt(
        { name: 'AES-GCM', iv: window.crypto.getRandomValues(new Uint8Array(12)) },
        aesKey,
        data
      );
  
      const cipherArray = Array.from(new Uint8Array(ciphertext)); 
      const cipherHex = cipherArray.map(b => b.toString(16).padStart(2, '0')).join('');
      return cipherHex;
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

export async function decryptPrivateKey(aesKey: any) {
    try {
      const { privateKey: cipherHex } = await chrome.storage.local.get('privateKey');
      const cipherBytes = new Uint8Array(cipherHex.match(/.{1,2}/g).map((byte: any) => parseInt(byte, 16)));
  
      const decryptedData = await window.crypto.subtle.decrypt(
        { name: 'AES-GCM', iv: window.crypto.getRandomValues(new Uint8Array(12)) },
        aesKey,
        cipherBytes
      );
  
      const decoder = new TextDecoder();
      const privateKey = decoder.decode(decryptedData);
      return privateKey;
    } catch (err) {
      console.error(err);
    }
  }