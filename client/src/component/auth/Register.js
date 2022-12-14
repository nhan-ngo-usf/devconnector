import React from 'react';
import axios from 'axios';

const Register = () => {
	const [formData, setFormData] = React.useState({
		name: '',
		email: '',
		password: '',
		password2: '',
	});

	const { name, email, password, password2 } = { formData };

	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		if (formData.password !== formData.password2) {
			console.log('Passwords do not match');
		} else {
			const { name, email, password } = { formData };
			const newUser = {
				name,
				email,
				password,
			};

			try {
				const config = {
					headers: {
						'Content-Type': 'application/json',
					},
				};
				const body = JSON.stringify(newUser);

				const res = await axios.post('/api/users', body, config);
				console.log(res.data);
			} catch (err) {
				console.error(err.response.data);
			}
		}
	};
	return (
		<>
			<h1 className='large text-primary'>Sign Up</h1>
			<p className='lead'>
				<i className='fas fa-user'></i> Create Your Account
			</p>
			<form
				className='form'
				onSubmit={(e) => onSubmit(e)}>
				<div className='form-group'>
					<input
						type='text'
						placeholder='Name'
						name='name'
						value={name}
						required
						onChange={(e) => onChange(e)}
					/>
				</div>
				<div className='form-group'>
					<input
						type='email'
						placeholder='Email Address'
						name='email'
						value={email}
						onChange={(e) => onChange(e)}
					/>
					<small className='form-text'>
						This site uses Gravatar so if you want a profile image, use a
						Gravatar email
					</small>
				</div>
				<div className='form-group'>
					<input
						type='password'
						placeholder='Password'
						name='password'
						value={password}
						minLength='6'
						onChange={(e) => onChange(e)}
					/>
				</div>
				<div className='form-group'>
					<input
						type='password'
						placeholder='Confirm Password'
						name='password2'
						value={password2}
						minLength='6'
						onChange={(e) => onChange(e)}
					/>
				</div>
				<input
					type='submit'
					className='btn btn-primary'
					value='Register'
				/>
			</form>
			<p className='my-1'>
				Already have an account? <a href='login.html'>Sign In</a>
			</p>
		</>
	);
};

export default Register;