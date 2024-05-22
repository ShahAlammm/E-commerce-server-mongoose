import { ProductModel } from '../product.model';
import { TProduct } from './product.interface';

const createProductIntoDB = async (product: TProduct) => {
  const result = await ProductModel.create(product);
  return result;
};

// Create a case-insensitive regex for the search term
const getAllAndSearchProductsInDB = async (searchTerm: string) => {
  try {
    if (searchTerm) {
      const regex = new RegExp(searchTerm, 'i');
      const result = await ProductModel.find({
        $or: [
          { name: regex },
          { description: regex },
          { category: regex },
          { tags: regex },
        ],
      });
      return result;
    } else {
      const result = await ProductModel.find();
      return result;
    }
  } catch (error) {
    throw new Error(`Unable to search products: ${error}`);
  }
};

const getSingleProductIntoDB = async (_id: string) => {
  const result = await ProductModel.findOne({ _id });
  // const result = await ProductModel.aggregate([{$match: {_id: _id}}])

  return result;
};

const getUpdateProductIntoDB = async (_id: string, updateProduct: TProduct) => {
  const result = await ProductModel.updateOne({ _id }, updateProduct);
  return result;
};

const getDeleteProductIntoDB = async (_id: string) => {
  const result = await ProductModel.updateOne({ _id }, { isDeleted: true });
  return result;
};

export const ProductServices = {
  createProductIntoDB,
  getSingleProductIntoDB,
  getUpdateProductIntoDB,
  getDeleteProductIntoDB,
  getAllAndSearchProductsInDB,
};
