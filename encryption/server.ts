import express from 'express'
import routes from './routes'
import path from 'path'
import { config } from "dotenv"
import { i18nMiddleware } from './e_middlewares/i18n'
import ErrorHandler from './e_middlewares/ErrorHandler'
import rateLimit from 'express-rate-limit'
import { Request, Response } from 'express'
const cors = require('cors')

// load '.env'
// =============================================================================
config({ path: path.resolve(__dirname, './.env') })
// ============================================================================= (end env)

// express server
// =============================================================================
const app = express();
const PORT = process.env.APPLICATION_PORT
// ============================================================================= (end express server)

// cors
// =============================================================================
const corsOptions = {
  origin: [
    `${process.env.NGINX_HOST}:${process.env.NGINX_PORT}`,
    `${process.env.DOCUMENTATION_HOST}:${process.env.DOCUMENTATION_PORT}`
  ],
  methods: ['*']
};
app.use(cors(corsOptions))
// ============================================================================= (end cors)

// middlewares (INIT)
// =============================================================================

// use json
//------------------------------------------------------
app.use(express.json());
//------------------------------------------------------

// translation
//------------------------------------------------------
app.use(i18nMiddleware)
//------------------------------------------------------

// rate limiter
//------------------------------------------------------
export const rateLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 min
  max: 100, // 100 req
  message: (req: Request, res: Response) => ({
    status: "error",
    code: 429,
    message: req.t('too_many_requests'),
  }),
  keyGenerator: (req: Request) => {
    const forwarded = req.headers['x-forwarded-for'];

    if (typeof forwarded === 'string') {
      return forwarded.split(',')[0];
    } else if (Array.isArray(forwarded)) {
      return forwarded[0];
    }
    return req.ip || 'unknown';
  },
});

app.use(rateLimiter);
//------------------------------------------------------

// ============================================================================= (end middlewares)

// run server
// =============================================================================
// microservice main route
app.use('/luckybytes', routes);

// error handler
//------------------------------------------------------
app.use(ErrorHandler);
//------------------------------------------------------

app.listen(PORT, () => {
  console.log(`*** RUNING ON : ${process.env.APPLICATION_HOST}:${PORT} ***`)
})
// ============================================================================= (end run server)