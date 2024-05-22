import express from 'express';
import { ProductControllers } from './product.controller';

const router = express.Router();

router.post('/', ProductControllers.createProduct);
router.get('/', ProductControllers.getAllAndSearchProduct);
router.get('/:productId', ProductControllers.getSingleProduct);
router.put('/:productId', ProductControllers.getUpdateProduct);
router.delete('/:productId', ProductControllers.getDeleteProduct);

export const ProductRoutes = router;
