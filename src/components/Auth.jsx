import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Auth() {
	const [data, setData] = useState({
		email: "",
		password: ""
	});

	const [errors, setErrors] = useState({});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setData((prevData) => ({
			...prevData,
			[name]: value
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (validateForm()) {
			axios.post("http://localhost:3000/login", data)
				.then((response) => {
					console.log(response);
					toast.success(response.data.message);
				})
				.catch((error) => {
					console.error(error);
					toast.error(error.response.data);
				});
			}
	};

	const validateForm = () => {
		let isValid = true;
		const newErrors = {};

		// valid email
		const emailRegex = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9_.-]+\.[a-zA-Z]{2,}$/;
		if (!emailRegex.test(data.email)) {
			newErrors.email = "You have entered an invalid email address!";
			isValid = false;
		}

		// valid password
		const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z]).{12,}$/;
		if (!passwordRegex.test(data.password)) {
			newErrors.password = "Password must contain at least one uppercase letter, one lowercase letter, one digit, one special character, and be at least 12 characters long.";
			isValid = false;
		}

		setErrors(newErrors);
		return isValid;
	}

  return (
	<div>
		<ToastContainer />
		<h2>Authentification</h2>
		<form onSubmit={handleSubmit}>
			<div className="group-input">
				<label htmlFor="email" >Email</label>
				<input type="text" name="email" id="email" placeholder="john@doe.fr" onChange={handleChange} value={data.email} />
				<span>{errors.email}</span>
			</div>
			<div className="group-input">
				<label htmlFor="password">Mot de passe</label>
				<input type="password" name="password" id="password" placeholder="************" onChange={handleChange} value={data.password} />
				<span>{errors.password}</span>
			</div>
			<div className="group-input">
				<button type="submit">Se connecter</button>
			</div>
		</form>
	</div>
  )
}

export default Auth