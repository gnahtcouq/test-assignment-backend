'use strict'

const express = require('express')
const router = express.Router()
const asyncHandler = require('@/helpers/asyncHandler')
const contactController = require('@/controllers/contact.controller')

router.post('/submit', asyncHandler(contactController.submit))

module.exports = router
