import React from 'react';
import './App.css';
import Landing from './component/layout/Landing';
import Navbar from './component/layout/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './component/auth/Login';
import Register from './component/auth/Register';

const App = () => (
	<>
		<Router>
			<Navbar />
			<Routes>
				<Route
					exact
					path='/'
					element={<Landing />}
				/>
				<Route
					path='*'
					element={<p>Path not resolved</p>}
				/>
			</Routes>

			<section className='container'>
				<Routes>
					<Route
						exact
						path='/login'
						element={<Login />}
					/>
					<Route
						exact
						path='/register'
						element={<Register />}
					/>
					<Route
						path='*'
						element={<p>Path not resolved</p>}
					/>
				</Routes>
			</section>
		</Router>
	</>
);

export default App;
