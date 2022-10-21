import express from 'express';
import {
	deleteProduct,
	getProductById,
	getProducts,
} from '../controllers/productController.js';
import { admin, protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/').get(getProducts);
router.route('/:id').get(getProductById).delete(protect, admin, deleteProduct);

export default router;
