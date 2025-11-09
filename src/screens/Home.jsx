import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import HeroSection from "../components/HeroSection";
import HeroCard from "../components/HeroCard";

const Home = () => {
	const navigate = useNavigate();
	const { authToken } = useAuth();

	return (
		<>
			<div className='flex flex-col w-full'>
				<HeroSection />
				<HeroCard />
			</div>
		</>
	);
};

export default Home;
