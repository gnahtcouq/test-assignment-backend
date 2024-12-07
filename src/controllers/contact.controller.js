'use strict'

const { SuccessResponse } = require('@/core/success.response')
const ContactService = require('@/services/contact.service')

class ContactController {
  submit = async (req, res, next) => {
    try {
      const contact = await ContactService.submit(req.body)
      new SuccessResponse({
        message: 'Contact form submitted successfully!',
        metadata: contact
      }).send(res)
    } catch (error) {
      if (error.name === 'SequelizeValidationError') {
        const validationErrors = error.errors.map((err) => err.message)
        return res.status(400).json({
          status: 'error',
          code: 400,
          message: 'Validation error',
          errors: validationErrors
        })
      }
      next(error)
    }
  }
}

module.exports = new ContactController()
