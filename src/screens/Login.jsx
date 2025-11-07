import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
	const [formlogin, setFormLogin] = useState({ Username: "", Password: "" });

	const [errormessage, setErrorMessage] = useState("");
	const [loading, setLoading] = useState(false);
	const { SetLoggedIn, setAuthToken } = useAuth();
	const navigate = useNavigate();
	const textFocus = useRef();

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormLogin({ ...formlogin, [name]: value });
	};
	const handleToastMessage = (message) => {
		setErrorMessage(message);
	};

	useEffect(() => {
		textFocus.current.focus();
	}, []);
	useEffect(() => {
		if (errormessage) {
			const timer = setTimeout(() => {
				setErrorMessage(""); // ✅ clears the toast after 3s
			}, 3000);
			return () => clearTimeout(timer); // ✅ cleanup on re-render
		}
	}, [errormessage]);

	const handleLogin = async () => {
		try {
			setLoading(true);
			if (!formlogin?.Username || !formlogin?.Password) {
				setLoading(false);
				handleToastMessage("Username or Password required");
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
			setLoading(false);
			navigate("/");
			// console.log("Login success:", accessLogin.data.accessToken);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			{errormessage && (
				<>
					<div className='toast toast-top toast-center'>
						<div className='alert alert-info'>
							<span>{errormessage}</span>
						</div>
					</div>
				</>
			)}
			<div className='flex flex-col justify-center items-center min-h-screen bg-slate-900 text-white'>
				<div className='flex bg-white w-2/12 justify-center items-center rounded-t-md py-2 border-t-2 border-amber-200 '>
					<span className='text-slate-900'> Welcome to Login </span>
				</div>
				<div className='flex flex-col px-2.5 bg-white w-3/12 rounded-md  shadow-md shadow-white  '>
					<input
						className='py-3 px-3  mt-3 text-black  border-amber-100  border-2 rounded text-sm'
						type='text'
						ref={textFocus}
						placeholder='Username'
						name='Username'
						onChange={handleChange}
						value={formlogin?.Username}
					/>

					<input
						className='py-3 px-3  mt-3 text-black border-amber-100 border-2 rounded text-sm'
						type='password'
						placeholder='Password'
						name='Password'
						onChange={handleChange}
						value={formlogin?.Password}
					/>
					<button
						className='bg-amber-500 py-2 mb-4 mt-4 rounded-md hover:bg-amber-700 hover:cursor-pointer'
						onClick={handleLogin}
						disabled={loading}
					>
						{loading ? "Logging In........." : "Login"}
					</button>
				</div>
			</div>
		</>
	);
};

export default Login;
