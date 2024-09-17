import { Router } from 'express';
import { productController } from './product.controller';

const router = Router();

router.get('/', productController.getAllProducts);
router.post('/', productController.createProduct);
router.get('/:id', productController.getProductById);
router.patch('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

export const productRouter = router;
