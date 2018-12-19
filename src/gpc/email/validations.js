'use strict';

const { Joi } = require('celebrate');

const sendEmailJoi = {
  body: Joi.object({
    firstName: Joi.string().allow(null).allow('').optional(),
    lastName: Joi.string().allow(null).allow('').optional(),
    email: Joi.string().allow(null).allow('').optional(),
    subject: Joi.string().allow(null).allow('').optional(),
    message: Joi.string()
  })
};

module.exports = {
  sendEmailJoi,
};
