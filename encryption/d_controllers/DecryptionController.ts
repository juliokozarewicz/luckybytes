import { NextFunction, Request, Response } from 'express';
import { escape } from 'lodash'
import { DecryptionService } from '../c_services/DecryptionService';
import { DecryptionValidation } from '../b_validations/DecryptionValidation';
import { createCustomError } from '../e_middlewares/ErrorHandler';

export class DecryptionController {

  async handle(

    req: Request,
    res: Response,
    next: NextFunction

  ): 
  
  Promise<void> 
  
  {

    try {

      // validation
      const validatingData =  DecryptionValidation(req).parse(req.body)

      // data object
      const validatedData = {
        password: escape(validatingData.password),
        cryptotext: escape(validatingData.cryptotext)
      }

      // call execute
      const callExecute = new DecryptionService(req.t);
      const response = await callExecute.execute(validatedData)

      //response
      res.status(response.code).json(response)

    } catch (error) {

      const errorStr = error instanceof Error ? error.stack || error.message : String(error);

      if (errorStr.includes('bad decrypt') || errorStr.includes('ERR_OSSL_BAD_DECRYPT')) {

        res.status(400).json({
            "status": 'error',
            "code": 400,
            "message": req.t('error_decrypto'),
            "links": {
                "self": '/luckybytes/decryption',
            }
        })
        return
      }

      next(error)

    }

  }
}