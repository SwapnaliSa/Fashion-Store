import { Flex } from '@chakra-ui/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Footer from './components/Footer';
import Header from './components/Header';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import OrderScreen from './screens/OrderScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductScreen from './screens/ProductScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingScreen from './screens/ShippingScreen';
import UserEditScreen from './screens/UserEditScreen';
import UserListScreen from './screens/UserListScreen';

const App = () => {
	return (
		<BrowserRouter>
			<Header />
			<Flex
				as='main'
				mt='72px'
				direction='column'
				minH='xl'
				py='6'
				px='6'
				bgColor='gray.200'>
				<Routes>
					<Route path='/' element={<HomeScreen />} />
					<Route path='/product/:id' element={<ProductScreen />} />
					<Route path='/cart/:id' element={<CartScreen />} />
					<Route path='/cart' element={<CartScreen />} />
					<Route path='/login' element={<LoginScreen />} />
					<Route path='/register' element={<RegisterScreen />} />
					<Route path='/profile' element={<ProfileScreen />} />
					<Route path='/shipping' element={<ShippingScreen />} />
					<Route path='/payment' element={<PaymentScreen />} />
					<Route path='/placeorder' element={<PlaceOrderScreen />} />
					<Route path='/order/:id' element={<OrderScreen />} />
					<Route path='/admin/userlist' element={<UserListScreen />} />
					<Route path='/admin/user/:id/edit' element={<UserEditScreen />} />
					<Route path='/admin/productlist' element={<ProductListScreen />} />
				</Routes>
			</Flex>
			<Footer />
		</BrowserRouter>
	);
};

export default App;
