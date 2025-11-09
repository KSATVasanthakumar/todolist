import axios from "axios";
import React, { useEffect, useState } from "react";
import useDebounce from "../hooks/useDebounce";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const RolesList = () => {
	const [roles, setRoles] = useState([]);
	const form = useForm();
	const {
		register,
		handleSubmit,
		reset,

		formState: { errors, isSubmitting },
	} = form;
	const [searchquery, setsearchQuery] = useState("");
	const debouncequery = useDebounce(searchquery);
	const [showModal, setShowModal] = useState(false);
	const [errormessage, setErrorMessage] = useState("");
	useEffect(() => {
		if (debouncequery) {
			const handleSearch = async () => {
				const response = await axios.get(
					`https://localhost:7254/api/role/getsearch?name=${debouncequery}`
				);
				console.log(response.data);
				setRoles(response.data);
			};
			handleSearch();
		}
	}, [debouncequery]);

	useEffect(() => {
		getRoles();
	}, []);

	const getRoles = async () => {
		const response = await axios.get("https://localhost:7254/api/role/get");
		setRoles(response.data);
	};
	useEffect(() => {
		if (errormessage) {
			const timer = setTimeout(() => {
				setErrorMessage(""); // ✅ clears the toast after 3s
			}, 3000);
			return () => clearTimeout(timer); // ✅ cleanup on re-render
		}
	}, [errormessage]);
	const handleAddRoles = () => {
		setShowModal(true);
	};
	const submitHandler = async (data) => {
		try {
			const response = await axios.post(
				"https://localhost:7254/api/role/create",
				{
					roleName: data.roleName,
				}
			);

			handleToastMessage(response.data);
			await getRoles();
			reset();
			setShowModal(false);
		} catch (error) {
			console.error("Error adding role:", error);
			handleToastMessage(response.data);
		}
	};

	const handleToastMessage = (message) => {
		setErrorMessage(message);
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
			<div className='justify-start w-full '>
				{/* Search input + button */}
				<div className='flex items-center justify-between space-x-1 flex-1 mb-2'>
					<input
						type='text'
						placeholder='Search roles...'
						className='border-b-2 border-amber-300 px-3 py-1 text-sm w-40'
						onChange={(e) => setsearchQuery(e.target.value)}
					/>
					<button
						className='bg-green-500 text-white px-6 py-1 rounded-md hover:bg-green-600 hover:cursor-pointer'
						onClick={handleAddRoles}
					>
						+
					</button>

					{/* Add New button */}
				</div>

				<div className='space-y-4'>
					{roles.map((item) => {
						return (
							<div key={item.id}>
								<button
									className='bg-amber-100 px-3 py-4 rounded hover:bg-amber-200 hover:cursor-pointer w-full'
									onClick={() => handleRoles(item)}
								>
									<span>{item.name}</span>
								</button>
							</div>
						);
					})}
				</div>

				{showModal && (
					<dialog open id='my_modal_1' className='modal'>
						<div className='modal-box flex flex-col'>
							<h3 className='font-bold text-lg'>Add New Role</h3>

							<form
								noValidate
								onSubmit={handleSubmit(submitHandler)}
								className='flex flex-col space-y-4 mt-4'
							>
								<input
									type='text'
									placeholder='Role Name'
									maxLength={12}
									className='border-b-2 border-amber-300 text-black py-2 outline-none'
									{...register("roleName", {
										required: "Role name is required",
										maxLength: {
											value: 12,
											message: "Max length is 12 characters",
										},
										minLength: {
											value: 3,
											message: "Min length is 3 characters",
										},
									})}
								/>
								{errors.roleName && (
									<p className='text-red-500 text-sm'>
										{errors.roleName.message}
									</p>
								)}

								<div className='flex gap-3 mt-4'>
									<button
										className='btn bg-blue-500 text-white'
										type='submit'
										disabled={isSubmitting}
									>
										{isSubmitting ? "Adding..." : "Add Role"}
									</button>

									<button
										type='button'
										className='btn bg-gray-300'
										onClick={() => setShowModal(false)}
									>
										Close
									</button>
								</div>
							</form>
						</div>
					</dialog>
				)}
			</div>
		</>
	);
};

export default RolesList;
