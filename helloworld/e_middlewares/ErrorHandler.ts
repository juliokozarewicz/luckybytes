import { Request, Response, NextFunction } from 'express'
import { LogsGenerator } from '../f_utils/LogsGenerator'
import { z } from 'zod'

// create error function
//------------------------------------------------------------------------
export interface CustomErrorOptions {
  message: string
  code: number
  next?: string
  prev?: string
}

export function createCustomError({
  message,
  code,
  next,
  prev,
}: CustomErrorOptions): Error & { code?: number; next?: string; prev?: string } {
  const error = new Error(message) as Error & { code?: number; next?: string; prev?: string };
  error.code = code
  error.name = 'CustomErrorHandler'
  error.next = next
  error.prev = prev
  return error
}
//------------------------------------------------------------------------

// middleware error
//------------------------------------------------------------------------
const ErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {

  // create custom error
  //------------------------------------------------------------------------
  if (err.name === 'CustomErrorHandler') {
    res.status(err.code).json({
      status: "error",
      code: err.code,
      message: err.message,
      links: {
        self: req.originalUrl,
        next: err.next,
        prev: err.prev,
      }
    })
    return
  }
  //------------------------------------------------------------------------

  // create syntax error
  //------------------------------------------------------------------------
  if (err instanceof SyntaxError) {
    res.status(400).json({
      status: "error",
      code: 400,
      message: req.t("bad_request"),
      links: {
        self: req.originalUrl,
      }
    })
    return
  }
  //------------------------------------------------------------------------

  // create ZOD error
  //------------------------------------------------------------------------
  if (err instanceof z.ZodError) {
    const error = err.errors[0]
    res.status(400).json({
        status: "error",
        code: 400,
        field: error.path.join('.'),
        message: error.message === 'Required' ? req.t("is_required") : error.message,
        links: {
        self: req.originalUrl,
        }
    })
    return
  }
  //------------------------------------------------------------------------

  // server error
  //------------------------------------------------------------------------
  res.status(500).json({
    status: "error",
    code: 500,
    message: req.t("server_error"),
    links: {
      self: req.originalUrl,
      next: '/',
      prev: '/',
    }
  })

  LogsGenerator(
    `${req.ip}`,
    'CRITICAL',
    500,
    `${req.method}`,
    `${req.url}`,
    `${req.headers['user-agent']}`,
    `${err.message}`
  )
  //------------------------------------------------------------------------
}

export default ErrorHandler
//------------------------------------------------------------------------