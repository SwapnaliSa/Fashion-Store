import { useParams, useSearchParams } from 'react-router-dom';

const CartScreen = () => {
	const [searchParams] = useSearchParams();

	const { id } = useParams();
	let qty = searchParams.get('qty');

	console.log(id, qty);

	return (
		<div>
			<h1>CartScreen</h1>
		</div>
	);
};

export default CartScreen;
