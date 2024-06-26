import Joi from 'joi';

const schema = Joi.object({
  name: Joi.string().trim().min(1).required(),

  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .trim()
    .min(1)
    .max(50)
    .required(),

  password: Joi.string().trim().min(1).max(30).required(),
});

export default schema;
