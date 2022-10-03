import { Grid, Heading } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';

import ProductCard from '../components/ProductCard';

const HomeScreen = () => {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		const fetchProducts = async () => {
			const { data } = await axios.get('/api/products');
			setProducts(data);
		};
		fetchProducts();
	}, []);

	return (
		<>
			<Heading as='h2' mb='8' fontSize='xl'>
				Latest Products
			</Heading>

			<Grid templateColumns='1fr 1fr 1fr 1fr' gap='8'>
				{products.map((product) => (
					<ProductCard product={product} key={product._id} />
				))}
			</Grid>
		</>
	);
};

export default HomeScreen;
