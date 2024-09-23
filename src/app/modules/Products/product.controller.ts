import { Request, Response } from 'express';
import { productService } from './product.service';
import {
  productValidationSchema,
  TProductRequestBody,
} from './product.interface';

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const product = await productService.findAllProducts();
    if (product.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No Data Found',
        data: [],
      });
    }
    return res.status(200).json({
      success: true,
      message: 'Product retrieved successfully',
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving products',
      error,
    });
  }
};
const createProduct = async (req: Request, res: Response) => {
  const productData = req.body;

  try {
    const product = await productService.createProduct(productData);

    const validation = productValidationSchema.safeParse(productData);

    if (!validation.success) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: 'Invalid product data',
        error: validation.error.errors,
      });
    }

    if (product) {
      return res.status(200).json({
        success: true,
        message: 'Product added successfully',
        data: product,
      });
    } else {
      return res.status(500).json({
        success: false,
        message: 'Error adding product',
        error: '',
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error adding product',
      error,
    });
  }
};

interface TGetProductRequest extends Request {
  params: {
    id: string;
  };
}

const getProductById = async (req: TGetProductRequest, res: Response) => {
  const { id } = req.params;

  try {
    const product = await productService.findProductById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
        data: [],
      });
    }

    res.status(200).json({
      success: true,
      message: 'Product retrieved successfully',
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving product',
      error,
    });
  }
};

interface TUpdateProductRequest extends Request {
  params: {
    id: string;
  };
  body: TProductRequestBody;
}

const updateProduct = async (req: TUpdateProductRequest, res: Response) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const product = await productService.updateProductById(id, updateData);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
        data: [],
      });
    }

    console.log(updateData);

    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      data: {
        name: updateData.name || product.name,
        price: updateData.price || product.price,
        category: updateData.category || product.category,
        description: updateData.description || product.description,
        quantity: updateData.quantity || product.quantity,
        image: updateData.image || product.image,
        // isDeleted: product.isDeleted,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating Product',
      error,
    });
  }
};

interface TDeleteProductRequest extends Request {
  params: {
    id: string;
  };
}

const deleteProduct = async (req: TDeleteProductRequest, res: Response) => {
  const { id } = req.params;

  try {
    const product = await productService.deleteProductById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: 'Product not found',
      });
    }

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Product deleted successfully',
      data: {
        name: product.name,
        price: product.price,
        category: product.category,
        description: product.description,
        image: product.image,
        quantity: product.quantity,
        // isDeleted: true,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: 'Error deleting Product',
      error,
    });
  }
};

export const productController = {
  getAllProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
