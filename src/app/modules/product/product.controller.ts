import { Request, Response } from 'express';

import { ProductServices } from './product.service';
import productValidationSchema from './product.validate';

const createProduct = async (req: Request, res: Response) => {
  try {
    const product = req.body;

    const { error, value } = productValidationSchema.validate(product);

    const result = await ProductServices.createProductIntoDB(value);

    if (error) {
      res.status(500).json({
        success: false,
        message: 'something went wrong!',
        error: error.details,
      });
    }

    res.status(200).json({
      success: true,
      message: 'Product created successfully!',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'An error occurred while retrieving products',
      error: error,
      data: null,
    });
  }
};

const getAllAndSearchProduct = async (req: Request, res: Response) => {
  try {
    const { searchTerm } = req.query;

    const result = await ProductServices.getAllAndSearchProductsInDB(
      searchTerm as string,
    );

    const message = searchTerm
      ? `Products matching search term '${searchTerm}' fetched successfully!`
      : 'products fetched successfully!';

    res.status(200).json({
      success: true,
      message,
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'An error occurred while retrieving products',
      error: error,
      data: null,
    });
  }
};

const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.getSingleProductIntoDB(productId);
    res.status(200).json({
      success: true,
      message: 'Products fetched successfully!',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'An error occurred while updating the product',
      error,
    });
  }
};

const getUpdateProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const update = req.body;
    const result = await ProductServices.getUpdateProductIntoDB(
      productId,
      update,
    );

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Products updated successfully!',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'An error occurred while updating the product',
      error,
    });
  }
};

const getDeleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.getDeleteProductIntoDB(productId);

    if (result) {
      return res.status(404).json({
        success: false,
        message: 'Product deleted successfully!',
        data: null,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'An error occurred while deleted the product',
      error,
    });
  }
};

export const ProductControllers = {
  createProduct,
  getSingleProduct,
  getUpdateProduct,
  getDeleteProduct,
  getAllAndSearchProduct,
};
