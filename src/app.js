const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const { default: helmet } = require('helmet')
const compression = require('compression')
const path = require('path')
const { sequelize } = require('@/models')
const rateLimit = require('express-rate-limit')
const cors = require('cors')

dotenv.config()

const app = express()

// Init middlewares
app.use(morgan('dev'))
app.use(cors())
// Custom rate limit handler
const rateLimitHandler = (req, res) => {
  res.status(429).json({
    status: 'error',
    code: 429,
    message: 'Too many requests from this IP, please try again in an hour!'
  })
}

// Rate limiting
const limiter = rateLimit({
  max: 1, // limit each IP to 1 requests per windowMs
  windowMs: 60 * 60 * 1000, // 1 hour
  handler: rateLimitHandler
})
app.use('/v1/api', limiter)
app.use(helmet())
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", 'https://www.google.com/', 'https://www.gstatic.com/'],
      styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com/'],
      imgSrc: ["'self'", 'data:', 'https:'],
      connectSrc: ["'self'", 'https://reallyfreegeoip.org'],
      fontSrc: ["'self'", 'https:', 'data:'],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'self'", 'https://player.vimeo.com/'],
      sandbox: ['allow-forms', 'allow-scripts', 'allow-same-origin', 'allow-presentation'],
      upgradeInsecureRequests: []
    }
  })
)
app.use(compression())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')))

// Set the views directory
app.set('views', path.join(__dirname, 'views'))

// Set the view engine to HTML
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')

// Init db
sequelize
  .authenticate()
  .then(() => console.log('Database connected...'))
  .catch((err) => console.log('Error: ' + err))

// Sync models
sequelize.sync({ force: false }).then(() => console.log('Database & tables created!'))

// Init routes
app.use('/', require('@/routes'))

// Handling error
app.use((req, res, next) => {
  const error = new Error('Not found')
  error.status = 404
  next(error)
})

app.use((error, req, res, next) => {
  const statusCode = error.status || 500
  return res.status(statusCode).json({
    status: 'error',
    code: statusCode,
    // stack: error.stack,
    message: error.message || 'Internal Server Error'
  })
})

module.exports = app
