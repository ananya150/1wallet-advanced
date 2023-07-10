export async function decryptPrivateKey(encryptedSigningKey: any, aesKey: any) {
    try {
      const cipherHex = encryptedSigningKey;
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

export async function isPasswordCorrect(enteredPassword: string, hasedPassword: any) {
    const encoder = new TextEncoder();
    const data = encoder.encode(enteredPassword);
  
    try {
      const hash = await window.crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hash)); 
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  
      return hashHex === hasedPassword;
    } catch (err) {
      console.error(err);
    }
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