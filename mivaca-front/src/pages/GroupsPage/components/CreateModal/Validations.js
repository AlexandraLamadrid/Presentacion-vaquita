import Joi from 'joi';

const schema = Joi.object({
  name: Joi.string().trim().min(1).required(),

  color: Joi.string().trim().min(4).max(7).required(),
});

export default schema;
