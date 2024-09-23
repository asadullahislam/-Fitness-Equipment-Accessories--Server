import { TProduct, TProductRequestBody } from './product.interface';
import productModel from './product.model';

const createProduct = async (product: TProduct) => {
  const result = await productModel.create(product);
  return result;
};

const findProductById = async (id: string) => {
  const result = await productModel.findById(id);
  return result;
};

const findAllProducts = async () => {
  const result = await productModel.find();
  return result;
};

const updateProductById = async (
  id: string,
  updateData: Partial<TProductRequestBody>,
) => {
  const result = await productModel.findByIdAndUpdate(id, updateData);
  return result;
};

const deleteProductById = async (id: string) => {
  const result = await productModel.findByIdAndDelete(id);
  return result;
};

export const productService = {
  createProduct,
  findAllProducts,
  findProductById,
  updateProductById,
  deleteProductById,
};
