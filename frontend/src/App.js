import { Flex } from '@chakra-ui/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Footer from './components/Footer';
import Header from './components/Header';
import HomeScreen from './screens/HomeScreen';

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
				</Routes>
			</Flex>
			<Footer />
		</BrowserRouter>
	);
};

export default App;
