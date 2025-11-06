import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
	const [formlogin, setFormLogin] = useState({ Username: "", Password: "" });
	const { SetLoggedIn, setAuthToken } = useAuth();
	const navigate = useNavigate();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormLogin({ ...formlogin, [name]: value });
	};

	const handleLogin = async () => {
		// localStorage.setItem("setToken", JSON.stringify(formlogin));
		// navigate("/");
		try {
			if (!formlogin?.Username || !formlogin?.Password) {
				alert("Username or Password required");
				return;
			}

			const accessLogin = await axios.post(
				"https://localhost:7254/api/auth/login",
				{
					Username: formlogin.Username,
					Password: formlogin.Password,
				}
			);
			const token = accessLogin.data;
			SetLoggedIn(true);
			setAuthToken(token);
			localStorage.setItem("setToken", JSON.stringify(token));
			navigate("/");
			// console.log("Login success:", accessLogin.data.accessToken);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<div>
			<input
				type='text'
				placeholder='Username'
				name='Username'
				onChange={handleChange}
				value={formlogin?.Username}
			/>

			<input
				type='password'
				placeholder='Password'
				name='Password'
				onChange={handleChange}
				value={formlogin?.Password}
			/>
			<button onClick={handleLogin}>Login</button>
		</div>
	);
};

export default Login;
