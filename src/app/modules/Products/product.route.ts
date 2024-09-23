import { Router } from 'express';
import { productController } from './product.controller';

const router = Router();

router.get('/products', productController.getAllProducts);
router.post('/products', productController.createProduct);
router.get('/products/:id', productController.getProductById);
router.patch('/products/:id', productController.updateProduct);
router.delete('/products/:id', productController.deleteProduct);

export const productRouter = router;
