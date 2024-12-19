import { EncryptionValidationType } from "../b_validations/EncryptionValidation";
import { createCustomError } from "../e_middlewares/ErrorHandler";
import { StandardResponse } from "../f_utils/StandardResponse"
import { deriveKeyAndIV } from "../f_utils/deriveKeyandIV"
import * as crypto from 'crypto'

export class EncryptionService {

    private t: (key: string) => string;
    constructor(t: (key: string) => string) {
        this.t = t;
    }

    async execute(
        validatedData: EncryptionValidationType
    ): Promise<StandardResponse> {

        // text
        const textRaw = validatedData.rawtext

        // Ensure textRaw is a string and not undefined
        if (!textRaw || typeof textRaw !== 'string') {
            throw createCustomError({
                "message": `${this.t('invalid_text')}`,
                "code": 401
            })
        }

        // call cryto func
        const { keyCrypto, ivCrypto } = deriveKeyAndIV(validatedData.password)

        const cipherTXT = crypto.createCipheriv(
            'aes-256-cbc',
            keyCrypto,
            ivCrypto
        )

        const encryptedTXT = cipherTXT.update(textRaw, 'utf8', 'hex') + cipherTXT.final('hex')

        return {
            "status": 'success',
            "code": 200,
            "message": this.t('success_crypto'),
            "data": [
                {
                    "encrypted_text": encryptedTXT
                }
            ],
            "links": {
                "self": '/luckybytes/encryption',
            }
        }

    }
}