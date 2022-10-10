import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

const getProducts = asyncHandler(async (req, res) => {
	const products = await Product.find({});
	res.json(products);
});

const getProductById = asyncHandler(async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);
		if (product) {
			res.json(product);
		} else {
			res.status(404).json({ message: 'Product not found' });
		}
	} catch (error) {
		console.error(`${error}`.red.bold);
		res.status(500).json({ message: 'Something went wrong' });
	}
});

export { getProducts, getProductById };
