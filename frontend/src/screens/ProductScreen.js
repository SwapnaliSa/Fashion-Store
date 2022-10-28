import {
	Box,
	Button,
	Flex,
	FormControl,
	FormLabel,
	Grid,
	Heading,
	Image,
	Link,
	Select,
	Text,
	Textarea,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';

import {
	createProductReview,
	listProductDetails,
} from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Rating from '../components/Rating';
import { PRODUCT_REVIEW_CREATE_RESET } from '../constants/productConstants';

const ProductScreen = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [qty, setQty] = useState(1);
	const [rating, setRating] = useState(0);
	const [comment, setComment] = useState('');

	const { id } = useParams();

	const productDetails = useSelector((state) => state.productDetails);
	const { loading, product, error } = productDetails;

	const userLogin = useSelector((state) => state.userLogin);
	const { userInfo } = userLogin;

	const productReviewCreate = useSelector((state) => state.productReviewCreate);
	const { success: successProductReview, error: errorProductReview } =
		productReviewCreate;

	useEffect(() => {
		if (successProductReview) {
			alert('Review submitted');
			setRating(0);
			setComment('');
			dispatch({ type: PRODUCT_REVIEW_CREATE_RESET });
		}

		dispatch(listProductDetails(id));
	}, [id, dispatch, successProductReview]);

	const addToCartHandler = () => {
		navigate(`/cart/${id}?qty=${qty}`);
	};

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(createProductReview(id, { rating, comment }));
	};

	return (
		<>
			<Flex mb='5'>
				<Button as={RouterLink} to='/' colorScheme='gray'>
					Go Back
				</Button>
			</Flex>

			{loading ? (
				<Loader />
			) : error ? (
				<Message type='error'>{error}</Message>
			) : (
				<>
					<Grid templateColumns='5fr 4fr 3fr' gap='10'>
						{/* Column 1 */}
						<Image src={product.image} alt={product.name} borderRadius='md' />

						{/* Column 2 */}
						<Flex direction='column'>
							<Heading as='h6' fontSize='base' color='gray.500'>
								{product.brand}
							</Heading>

							<Heading as='h2' fontSize='4xl' mb='4'>
								{product.name}
							</Heading>

							<Rating
								value={product.rating}
								text={`${product.numReviews} reviews`}
							/>

							<Heading
								as='h5'
								my='5'
								fontSize='4xl'
								fontWeight='bold'
								color='teal.600'>
								₹{product.price}
							</Heading>

							<Text>{product.description}</Text>
						</Flex>

						{/* Column 3 */}
						<Flex direction='column'>
							<Flex justifyContent='space-between' py='2'>
								<Text>Price: </Text>
								<Text fontWeight='bold'>₹{product.price}</Text>
							</Flex>

							<Flex justifyContent='space-between' py='2'>
								<Text>Status: </Text>
								<Text fontWeight='bold'>
									{product.countInStock > 0 ? 'In Stock' : 'Not Available'}
								</Text>
							</Flex>

							{product.countInStock > 0 && (
								<Flex justifyContent='space-between' py='2'>
									<Text>Qty: </Text>
									<Select
										value={qty}
										onChange={(e) => setQty(e.target.value)}
										width='30%'>
										{[...Array(product.countInStock).keys()].map((i) => (
											<option key={i + 1} value={i + 1}>
												{i + 1}
											</option>
										))}
									</Select>
								</Flex>
							)}

							<Button
								bg='gray.800'
								colorScheme='teal'
								my='2'
								textTransform='uppercase'
								letterSpacing='wide'
								disabled={product.countInStock === 0}
								onClick={addToCartHandler}>
								Add to cart
							</Button>
						</Flex>
					</Grid>

					{/* Reviews Display */}
					<Box mt='10'>
						<Box>
							<Heading as='h2' size='xl' mb='4'>
								Reviews
							</Heading>

							{product.reviews.length === 0 && <Message>No Reviews</Message>}

							{product.reviews.length !== 0 && (
								<Box p='4' bgColor='white' rounded='mb' mb='1' mt='5'>
									{product.reviews.map((review) => (
										<Flex direction='column' key={review._id} mb='5'>
											<Flex justifyContent='space-between'>
												<Text fontSize='lg'>
													<strong>{review.name}</strong>
													{review.createdAt?.substring(0, 10)}
												</Text>
												<Rating value={review.rating} />
											</Flex>
											<Text mt='2'>{review.comment}</Text>
										</Flex>
									))}
								</Box>
							)}

							{/* Review Form */}
							<Box
								p='10'
								bgColor='white'
								rounded='md'
								border='2px'
								mt='10'
								borderColor='gray.300'>
								<Heading as='h3' size='lg' mb='6'>
									Write a review
								</Heading>

								{errorProductReview && (
									<Message type='error'>{errorProductReview}</Message>
								)}

								{userInfo ? (
									<form onSubmit={submitHandler}>
										<FormControl id='rating' mb='3'>
											<FormLabel>Rating</FormLabel>
											<Select
												placeholder='Select Option'
												value={rating}
												onChange={(e) => setRating(e.target.value)}>
												<option>Select...</option>
												<option value='1'>1 - Poor</option>
												<option value='2'>2 - Okay</option>
												<option value='3'>3 - Good</option>
												<option value='4'>4 - Very Good</option>
												<option value='5'>5 - Excellent</option>
											</Select>
										</FormControl>

										<FormControl id='comment' mb='3'>
											<FormLabel>Comment</FormLabel>
											<Textarea
												value={comment}
												onChange={(e) => setComment(e.target.value)}></Textarea>
										</FormControl>

										<Button colorScheme='teal' type='submit'>
											Post Review
										</Button>
									</form>
								) : (
									<Message>
										Please{' '}
										<Link as={RouterLink} to='/login'>
											login
										</Link>{' '}
										to write a review
									</Message>
								)}
							</Box>
						</Box>
					</Box>
				</>
			)}
		</>
	);
};

export default ProductScreen;
