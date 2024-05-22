import { Schema, model } from 'mongoose';
import { TProduct } from './product/product.interface';
const productSchema = new Schema<TProduct>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  tags: { type: [String], required: true },
  variants: {
    type: [{ type: { type: String }, value: String }],
    required: true,
  },
  inventory: {
    quantity: { type: Number, required: true },
    inStock: { type: Boolean, required: true },
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

productSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

productSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

// productSchema.pre('aggregate', function (next) {
//   this.pipeline().unshift({$match: {isDeleted: {$ne: true}}});
//   next();
// });

export const ProductModel = model<TProduct>('Product', productSchema);
