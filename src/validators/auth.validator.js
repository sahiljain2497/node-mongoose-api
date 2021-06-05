const Joi = require('joi');

module.exports = {
  // POST /v1/auth/register
  register: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6).max(128),
  }),

  // POST /v1/auth/login
  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6).max(128),
  }),
};
