import { DecryptionValidationType } from "../b_validations/DecryptionValidation";
import { createCustomError } from "../e_middlewares/ErrorHandler";
import { StandardResponse } from "../f_utils/StandardResponse"
import * as crypto from 'crypto'

export class DecryptionService {

    private t: (key: string) => string;
    constructor(t: (key: string) => string) {
        this.t = t;
    }

    async execute(
        validatedData: DecryptionValidationType
    ): Promise<StandardResponse> {

        const encryptedTXT = validatedData.cryptotext

        // Ensure text is a string and not undefined
        if (!encryptedTXT || typeof encryptedTXT !== 'string') {
            throw createCustomError({
                "message": `${this.t('invalid_text_decrypt')}`,
                "code": 400
            })
        }

        // call decryto func
        const security_code = `${validatedData.password}${process.env.SECURITY_CODE}`
        const keyCrypto = crypto.createHash('sha256').update(security_code).digest('hex').substring(0, 32)
        const ivCrypto = crypto.createHash('sha256').update(security_code).digest('hex').substring(0, 16)
        const decipher = crypto.createDecipheriv('aes-256-cbc', keyCrypto, ivCrypto)
        let decryptedTXT = decipher.update(encryptedTXT, 'hex', 'utf8') + decipher.final('utf8')

        return {
            "status": 'success',
            "code": 200,
            "message": this.t('success_decrypto'),
            "data": [
                {
                    "encrypted_text": decryptedTXT
                }
            ],
            "links": {
                "self": '/luckybytes/decryption',
            }
        }

    }
}