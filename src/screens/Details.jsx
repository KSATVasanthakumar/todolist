import React, { Suspense, lazy, useState } from "react";
import { useNavigate } from "react-router-dom";

const RolesList = lazy(() => import("../components/RolesList"));

const Details = () => {
	const [counter, setCounter] = useState(0);
	const navigate = useNavigate();

	return (
		<>
			<div>Details</div>
			<Suspense
				fallback={
					<div className='text-center text-gray-400 py-4'>Loading roles...</div>
				}
			>
				<RolesList />
			</Suspense>
		</>
	);
};

export default Details;
