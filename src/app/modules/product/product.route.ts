import express from 'express';
import { ProductControllers } from './product.controller';


const router = express.Router();

router.post('/create-product', ProductControllers.createStudent);

router.get('/', ProductControllers.getAllStudents);

router.get('/:studentId', ProductControllers.getSingleStudent);

export const ProductRoutes = router;
