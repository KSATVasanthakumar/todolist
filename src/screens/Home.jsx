import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const Home = () => {
	const navigate = useNavigate();
	const { authToken } = useAuth();
	const [roles, setRoles] = useState([]);
	const fetched = useRef(false);
	useEffect(() => {
		if (fetched.current) return;
		fetched.current = true;

		const getRoles = async () => {
			const response = await axios.get("https://api.restful-api.dev/objects");
			setRoles(response.data);
			console.log(response.data);
		};
		getRoles();
	}, []);

	return (
		<>
			<div>Home</div>
			Welcome, {authToken?.username ? authToken.username : "Guest"} 👋
			<button onClick={() => navigate("details")}>Details</button>
		</>
	);
};

export default Home;
