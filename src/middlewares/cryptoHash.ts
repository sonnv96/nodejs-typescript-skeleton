import crypto from "crypto"

export class CryptoHash {

    hash(password) {
        return new Promise((resolve, reject) => {
            const salt = crypto.randomBytes(16).toString("hex")

            crypto.scrypt(password, salt, 64, (err, derivedKey) => {
                if (err) reject(err);
                resolve(salt + ":" + derivedKey.toString('hex'))
            });
        })
    }

     verify(password, passwordHash) {
        return new Promise((resolve, reject) => {
            const [salt, key] = passwordHash.split(":")
            crypto.scrypt(password, salt, 64, (err, derivedKey) => {
                if (err) reject(err);
                resolve(key == derivedKey.toString('hex'))
            });
        })
    }   

}