import crypto from 'crypto'

// create derivative key and IV for crypt
export function deriveKeyAndIV(password: string): {
    keyCrypto: Buffer
    ivCrypto: Buffer
    salt: string
} {
    const salt = String(`${password}${process.env.SECURITY_CODE}`).slice(0, 16)
    const iterations = 100000
    const keyLength = 32
    const ivLength = 16

    const keyCrypto = crypto.pbkdf2Sync(String(`${password}${process.env.SECURITY_CODE}`), salt, iterations, keyLength, 'sha256');
    const ivCrypto = crypto.randomBytes(ivLength);

    return { keyCrypto, ivCrypto, salt }
}