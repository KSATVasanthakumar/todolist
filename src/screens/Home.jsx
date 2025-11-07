import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const Home = () => {
	const navigate = useNavigate();
	const { authToken } = useAuth();
	const [roles, setRoles] = useState([]);
	
	useEffect(() => {
		const getRoles = async () => {
			const response = await axios.get("https://localhost:7254/api/role/get");
			setRoles(response.data);
		};
		getRoles();
	}, []);

	return (
		<>
			<div>Home</div>
			Welcome, {authToken?.username ? authToken.username : "Guest"} 👋
			<div>
				{roles.map((item) => {
					return <li key={item.id}>{item.name}</li>;
				})}
			</div>
			<button onClick={() => navigate("details")}>Details</button>
		</>
	);
};

export default Home;
