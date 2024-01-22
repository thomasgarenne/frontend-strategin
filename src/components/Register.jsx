import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function Register() {
	const [data, setData] = useState({
		email: "",
		password: ""
	});

	const [errors, setErrors] = useState({});

	const navigate = useNavigate();

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
			axios.post("https://main--extraordinary-cassata-b86fdf.netlify.app/", data)
				.then((response) => {
					console.log(response);
					toast.success("Account create successfully 😊 👌");
					navigate("/login");
				})
				.catch((error) => {
					console.error(error);
					toast.error(error.response.data);
				});
			}

			setData({
				email: "",
				password: ""
			});
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
		<h2>Veuillez vous inscrire</h2>
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

export default Register