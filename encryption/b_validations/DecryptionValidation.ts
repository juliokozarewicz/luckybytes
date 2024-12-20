import { z } from 'zod'
import { Request } from 'express'

export const DecryptionValidation = (req: Request) => {
    return z.object({

        password: z.string()
            .min(8, req.t("must_be_at_least_8_characters_long"))
            .max(255, req.t("contains_too_many_characters"))
            .regex(/^[^<>&'"/]+$/, req.t("contains_disallowed_characters")),

        cryptotext: z.string()
            .min(1, req.t("is_required"))
            .max(1500, req.t("contains_too_many_characters"))
            .regex(/^[^<>&'"/]+$/, req.t("contains_disallowed_characters")),

    })
}

export type DecryptionValidationType = z.infer<ReturnType<typeof DecryptionValidation>> 
