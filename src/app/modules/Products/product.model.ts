import { Schema, model } from 'mongoose';
import { TProduct } from './product.interface';

const productSchema = new Schema<TProduct>(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: [{ type: String, required: true }],
    description: { type: String, required: true },
    quantity: { type: Number, required: true },
    image: { type: String, required: true },
    // isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

const productModel = model<TProduct>('product', productSchema);
export default productModel;
