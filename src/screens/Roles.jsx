import { lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";

const RolesList = lazy(() => import("../components/RolesList"));

const Roles = () => {
	const navigate = useNavigate();
	const handleRoles = (item) => {
		console.log(item.id);
		navigate(`/details/${item.id}`);
	};

	return (
		<div className='flex flex-col min-h-screen w-full '>
			{/* Top Center Title */}
			<div className='flex justify-center py-2'>
				<h1 className='text-2xl md:text-md lg:text-black font-semibold text-black dark:text-white'>
					Roles
				</h1>
			</div>

			{/* Centered Box */}
			<div className='flex flex-1 justify-center items-center flex-col gap-2'>
				<div className='flex justify-center bg-amber-400 w-[95%] sm:w-4/6 md:w-1/3 p-6 mx-auto rounded-lg shadow-lg'>
					<span>List of Roles</span>
				</div>

				<div className='bg-white w-[95%] sm:w-4/6 md:w-1/3 max-h-96 overflow-y-auto p-4 rounded-lg shadow-md'>
					<Suspense
						fallback={
							<div className='text-center py-4'>Loading component...</div>
						}
					>
						<RolesList onRoleClick={handleRoles} />
					</Suspense>
				</div>
			</div>
		</div>
	);
};

export default Roles;
