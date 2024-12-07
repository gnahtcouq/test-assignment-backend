'use strict'

const { Contact } = require('@/models')

class ContactService {
  static async submit(payload) {
    const { name, email, country_name, company_name, choose_support, message } = payload
    const contact = await Contact.create({
      contact_name: name,
      contact_email: email,
      contact_country: country_name,
      contact_company: company_name,
      contact_support: choose_support,
      contact_details: message
    })
    return contact
  }
}

module.exports = ContactService
