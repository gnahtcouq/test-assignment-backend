'use strict'

const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.render('index')
})

router.use('/v1/api/contact', require('@/routes/contact'))

module.exports = router
