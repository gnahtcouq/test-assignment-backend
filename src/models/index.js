'use strict'

const sequelize = require('@/configs/config.sequelize')
const { DataTypes } = require('sequelize')

const Contact = require('@/models/contact.model')(sequelize, DataTypes)

module.exports = {
  sequelize,
  Contact
}
