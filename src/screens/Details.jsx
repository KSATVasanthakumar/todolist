import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const Details = () => {
	const [counter, setCounter] = useState(0);
	const navigate = useNavigate();

	const handleIncrement = () => {
		setCounter(counter + 1);
	};

	return (
		<>
			<div>Details</div>
			The Count is {counter + 1}
			<button onClick={handleIncrement} className='bg-red-600 text-white px-3 '>
				Increment
			</button>
		</>
	);
};

export default Details;
