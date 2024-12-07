require('module-alias/register')

const app = require('@/app')

const PORT = process.env.DEV_APP_PORT || 8080

const server = app.listen(PORT, () => {
  console.log(`WSV start with port ${PORT}`)
})
