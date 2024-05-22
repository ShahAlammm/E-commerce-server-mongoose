// order.validation.ts
import Joi from 'joi';

export const orderValidationSchema = Joi.object({
  email: Joi.string().email().required(),
  productId: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(), // Matches MongoDB ObjectId
  price: Joi.number().greater(0).required(),
  quantity: Joi.number().integer().greater(0).required(),
});
