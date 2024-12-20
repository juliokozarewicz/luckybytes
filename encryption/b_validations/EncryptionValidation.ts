import { z } from 'zod'
import { Request } from 'express'

export const EncryptionValidation = (req: Request) => {
    return z.object({

        password: z.string()
            .min(8, req.t("must_be_at_least_8_characters_long"))
            .max(255, req.t("contains_too_many_characters"))
            .regex(/^[^<>&'"/]+$/, req.t("contains_disallowed_characters"))
            .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/, req.t("must_contain_at_least_one_uppercase_letter")),

        rawtext: z.string()
            .min(1, req.t("is_required"))
            .max(500, req.t("contains_too_many_characters"))
            .regex(/^[^<>&'"/]+$/, req.t("contains_disallowed_characters")),

    })
}

export type EncryptionValidationType = z.infer<ReturnType<typeof EncryptionValidation>> 
