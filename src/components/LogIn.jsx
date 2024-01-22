import { useState } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from "../context/authContext";

function Login() {
	const [data, setData] = useState({
		email: "",
		password: ""
	});

	const [errors, setErrors] = useState({});

	const { login } = useAuth();

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
			login(data.email, data.password);
		}
	};

	const validateForm = () => {
		let isValid = true;
		const newErrors = {};

		// Validation email
		const emailRegex = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9_.-]+\.[a-zA-Z]{2,}$/;
		if (!emailRegex.test(data.email)) {
			newErrors.email = "You have entered an invalid email address!";
			isValid = false;
		}

		// Validation password
		if (!data.password) {
			newErrors.password = "Password required";
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

export default Login