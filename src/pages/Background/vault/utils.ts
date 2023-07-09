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