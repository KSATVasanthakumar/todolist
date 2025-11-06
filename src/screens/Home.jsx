import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Home = () => {
	const navigate = useNavigate();
	const { authToken } = useAuth();

	return (
		<>
			<div>Home</div>
			Welcome, {authToken?.username ? authToken.username : "Guest"} 👋
			<button onClick={() => navigate("details")}>Details</button>
		</>
	);
};

export default Home;
