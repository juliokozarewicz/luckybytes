import { NextFunction, Request, Response } from 'express';
import { escape } from 'lodash'
import { EncryptionValidation } from '../b_validations/EncryptionValidation';
import { EncryptionService } from '../c_services/EncryptionService';

export class EncryptionController {

  async handle(

    req: Request,
    res: Response,
    next: NextFunction

  ): 
  
  Promise<void> 
  
  {

    try {

      // validation
      const validatingData =  EncryptionValidation(req).parse(req.body)

      // data object
      const validatedData = {
        password: escape(validatingData.password),
        rawtext: escape(validatingData.rawtext)
      }

      // call execute
      const callExecute = new EncryptionService(req.t);
      const response = await callExecute.execute(validatedData)

      //response
      res.status(response.code).json(response)

    } catch (error) {

      next(error)

    }

  }
}