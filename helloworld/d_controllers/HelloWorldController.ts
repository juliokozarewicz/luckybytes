import { NextFunction, Request, Response } from 'express';
import { HelloWorldService } from '../c_services/HelloWorldService'
import { escape } from 'lodash'
import { HelloWorldValidation } from '../b_validations/HelloWorldValidation';

export class HelloWorldController {

  async handle(

    req: Request,
    res: Response,
    next: NextFunction

  ): 
  
  Promise<void> 
  
  {

    try {

      // validation
      const validatingData =  HelloWorldValidation(req).parse(req.query)

      // data object
      const validatedData = {
        message: escape(validatingData.message)
      }

      // call execute
      const callExecute = new HelloWorldService(req.t);
      const response = await callExecute.execute(validatedData)

      //response
      res.status(response.code).json(response)

    } catch (error) {

      next(error)

    }

  }
}