import Joi from 'joi';

const schema = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .trim()
    .min(10)
    .max(50)
    .required()
    .messages({
      'string.empty': 'Email can not be empty',
      'string.min': 'Email should have at least 10 characters',
      'string.max': 'Email should have less than 50 characters',
      'string.base': `Email should be a type of 'email'`,
      'string.email': 'Email must be a valid email',
    }),

  password: Joi.string().trim().min(5).max(30).required().messages({
    'string.empty': 'Password can not be empty',
    // 'string.min': 'Password should have at least 5 characters',
    // 'string.max': 'Password should have less than 30 characters',
    'string.base': `Password should be a type of 'text'`,
  }),
});

export default schema;
