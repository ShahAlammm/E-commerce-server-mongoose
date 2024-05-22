import Joi from 'joi';

// Joi schema for validation
const productValidationSchema = Joi.object({
  name: Joi.string().trim().max(50).required().messages({
    'string.empty': 'Product name is required',
    'string.max': 'Product name should not exceed 100 characters',
  }),
  description: Joi.string().trim().max(500).required().messages({
    'string.empty': 'Product description is required',
    'string.max': 'Product description should not exceed 500 characters',
  }),
  price: Joi.number().min(0).required().messages({
    'number.base': 'Product price must be a number',
    'number.min': 'Product price cannot be negative',
  }),
  category: Joi.string().trim().required().messages({
    'string.empty': 'Product category is required',
  }),
  tags: Joi.array().items(Joi.string()).min(1).required().messages({
    'array.base': 'Tags must be an array of strings',
    'array.min': 'There must be at least one tag',
  }),
  variants: Joi.array()
    .items(
      Joi.object({
        type: Joi.string().trim().required().messages({
          'string.empty': 'Variant type is required',
        }),
        value: Joi.string().trim().required().messages({
          'string.empty': 'Variant value is required',
        }),
      }),
    )
    .required()
    .messages({
      'array.base': 'Variants must be an array of objects',
    }),
  inventory: Joi.object({
    quantity: Joi.number().min(0).required().messages({
      'number.base': 'Inventory quantity must be a number',
      'number.min': 'Inventory quantity cannot be negative',
    }),
    inStock: Joi.boolean().required().messages({
      'boolean.base': 'Inventory stock status must be a boolean',
    }),
  }).required(),
  isDeleted: Joi.boolean(),
});

export default productValidationSchema;
