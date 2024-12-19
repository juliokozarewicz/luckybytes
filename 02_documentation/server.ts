import { config } from 'dotenv'
import express from "express"
import path from "path"
import { rateLimiter } from "./rateLimiter"
import swaggerUi from "swagger-ui-express"
const cors = require('cors')

// load '.env'
// =============================================================================

config({ path: path.resolve(__dirname, './.env') })
// ============================================================================= (end env)

// express server
// =============================================================================

const app = express()
const PORT = process.env.DOCUMENTATION_PORT

// cors (authorized domain)
const corsOptions = {
  origin: [
    `${process.env.DOMAIN_ORIGIN}`,
    `${process.env.NGINX_HOST}:${process.env.NGINX_PORT}`,
    `${process.env.DOCUMENTATION_HOST}:${process.env.DOCUMENTATION_PORT}`
  ],
  methods: ['*']
}
app.use(cors(corsOptions))
// ============================================================================= (end express server)

// middlewares (INIT)
// =============================================================================

// documentation
//------------------------------------------------------
const packageJson = require('./package.json')
import documentation from "./1_docs/documentation"

const options = {
  customCss: `
    .topbar { display: none }
    .swagger-ui { 
      width: 85%;
      max-width: 1200px;
      margin: auto;
    }
    .wrapper section { margin-bottom: 50px }
  `,
  customSiteTitle: packageJson.application_name.toUpperCase(),
}

app.use(
  "/documentation/swagger",
  swaggerUi.serve,
  swaggerUi.setup(
    documentation,
    options
  )
)

// redocly
app.get('/documentation/json', cors(corsOptions), (request, response) => {
  response.json(documentation)
})

app.get('/documentation/redocly', cors(corsOptions), (request, response) => {
  const html = `
    <body>

      <div id="redoc-container"></div>
      <script src="https://cdn.jsdelivr.net/npm/redoc@2.0.0-rc.55/bundles/redoc.standalone.min.js"></script>
      <script src="https://cdn.jsdelivr.net/gh/wll8/redoc-try@1.4.9/dist/try.js"></script>
      <script>
        initTry({
          openApi: '${process.env.DOMAIN_ORIGIN}/documentation/json',
          redocOptions: {scrollYOffset: 50},
        })
      </script>
    </body>
  `
  response.setHeader('Content-Type', 'text/html')
  response.send(html)
})
//------------------------------------------------------ (end documentation)

// rate limiter
//------------------------------------------------------
app.use(rateLimiter)
//------------------------------------------------------ (emd rate limiter)

// use json
//------------------------------------------------------
app.use(express.json())
//------------------------------------------------------ (emd json)

// ============================================================================= (end middlewares)

// run server
// =============================================================================
app.listen(PORT, () => {
  console.log(`*** RUNING ON : ${process.env.DOCUMENTATION_HOST}:${PORT} ***`)
})
// ============================================================================= (end run server)