import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useForm } from "react-hook-form";
let counter = 0;
const Login = () => {
	const form = useForm();
	const {
		register,
		handleSubmit,
		formState: { isSubmitting },
	} = form;
	counter++;
	const [errormessage, setErrorMessage] = useState("");
	const [loading, setLoading] = useState(false);
	const { SetLoggedIn, setAuthToken } = useAuth();
	const navigate = useNavigate();

	const handleToastMessage = (message) => {
		setErrorMessage(message);
	};

	useEffect(() => {
		if (errormessage) {
			const timer = setTimeout(() => {
				setErrorMessage(""); // ✅ clears the toast after 3s
			}, 3000);
			return () => clearTimeout(timer); // ✅ cleanup on re-render
		}
	}, [errormessage]);

	const submitHandler = async (data) => {
		setLoading(true);
		if (!data?.Username || !data?.Password) {
			setLoading(false);
			handleToastMessage("Username or Password required");
			return;
		}
		const accessLogin = await axios.post(
			"https://localhost:7254/api/auth/login",
			{
				Username: data.Username,
				Password: data.Password,
			}
		);
		const token = accessLogin.data;
		setAuthToken(token);
		SetLoggedIn(true);
		localStorage.setItem("setToken", JSON.stringify(token));
		setLoading(false);
		navigate("/");
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
				{/* Header Section */}
				<div className='flex bg-white w-2/12 justify-center items-center rounded-t-md py-2 border-t-2 border-amber-200'>
					<span className='text-slate-900 font-medium'>
						Welcome to Login [{counter}]
					</span>
				</div>

				{/* Login Form */}
				<form
					noValidate
					onSubmit={handleSubmit(submitHandler)}
					className='flex flex-col bg-white w-1/3 p-6 rounded-b-md shadow-xl text-slate-900'
				>
					<h2 className='text-2xl font-semibold text-center mb-6'>Login</h2>

					<input
						className='py-3 px-3 mb-3 text-black border border-amber-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-amber-400'
						type='text'
						placeholder='Username'
						disabled={isSubmitting}
						{...register("Username")}
					/>

					<input
						className='py-3 px-3 mb-5 text-black border border-amber-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-amber-400'
						type='password'
						placeholder='Password'
						disabled={isSubmitting}
						{...register("Password")}
					/>

					<button
						className='bg-amber-500 text-white py-2 rounded-md hover:bg-amber-600 transition-colors disabled:opacity-70'
						type='submit'
						disabled={isSubmitting}
					>
						{isSubmitting ? "Logging In..." : "Login"}
					</button>
				</form>
			</div>
		</>
	);
};

export default Login;
