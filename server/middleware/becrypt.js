const crypto = require("crypto");

const algorithm = "aes-256-cbc";
const key = crypto.randomBytes(32); // Generate a random key
const iv = crypto.randomBytes(16); // Generate a random initialization vector

function encrypt(text) {
  let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return {
    iv: iv.toString("hex"),
    encryptedData: encrypted.toString("hex"),
  };
}

export function decrypt(encryptedText) {
  let iv = Buffer.from(encryptedText.iv, "hex");
  let encryptedTextBuffer = Buffer.from(encryptedText.encryptedData, "hex");
  let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
  let decrypted = decipher.update(encryptedTextBuffer);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

// Example usage:
const dataToEncrypt = "Hello, World!";
const encrypted = encrypt(dataToEncrypt);
console.log("Encrypted:", encrypted);

const decrypted = decrypt(encrypted);
console.log("Decrypted:", decrypted);
