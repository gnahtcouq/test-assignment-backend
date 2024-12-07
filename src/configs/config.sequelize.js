const { Sequelize } = require('sequelize')
const fs = require('fs')
const dotenv = require('dotenv')

dotenv.config()

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'mysql',
  dialectOptions: {
    ssl: {
      rejectUnauthorized: true,
      ca: fs.readFileSync('src/certs/ca.pem')
    }
  }
})

module.exports = sequelize
