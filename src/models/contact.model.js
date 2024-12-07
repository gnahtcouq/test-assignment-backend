'use strict'

module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define(
    'Contact',
    {
      contact_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Name cannot be empty'
          }
        }
      },
      contact_email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: {
            msg: 'Must be a valid email address'
          },
          notEmpty: {
            msg: 'Email cannot be empty'
          }
        }
      },
      contact_country: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Country cannot be empty'
          }
        }
      },
      contact_company: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Company cannot be empty'
          }
        }
      },
      contact_support: {
        type: DataTypes.ENUM('Sales', 'Career', 'Partnership', 'Billing', 'Media', 'Others'),
        allowNull: false,
        validate: {
          isIn: {
            args: [['Sales', 'Career', 'Partnership', 'Billing', 'Media', 'Others']],
            msg: 'Support must be one of Sales, Career, Partnership, Billing, Media, Others'
          }
        }
      },
      contact_details: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Details cannot be empty'
          }
        }
      }
    },
    {
      tableName: 'get_in_touch_tranvanquocthang'
    }
  )

  return Contact
}
