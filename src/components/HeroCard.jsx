import React, { useEffect } from "react";

import { animate, motion, useMotionValue, useTransform } from "motion/react";

const HeroCard = () => {
	const rolecount = useMotionValue(0);
	const rounded = useTransform(() => Math.round(rolecount.get()));

	useEffect(() => {
		const rolecontrols = animate(rolecount, 75, { duration: 5 });
		return () => rolecontrols.stop();
	}, []);
	return (
		<>
			<motion.div
				className='flex flex-row justify-around mt-[-60px]'
				initial={{ scale: 0 }}
				animate={{ scale: 1 }}
			>
				<div className='card w-96 bg-base-100 shadow-md hover:shadow-lg transition-shadow'>
					<div className='card-body'>
						<h2 className='card-title text-lg font-semibold text-amber-700'>
							Manage Roles
						</h2>
						<p className='text-sm text-gray-600'>
							Create, update, and delete user roles to manage access
							permissions.
						</p>

						<div className='mt-4 space-y-1 text-sm'>
							<div className='flex  flex-row'>
								<span className='font-medium text-gray-700'>Total Roles:</span>
								<motion.pre>{rounded}</motion.pre>
							</div>
							<p>
								<span className='font-medium text-gray-700'>Last Added:</span>{" "}
								Admin
							</p>
						</div>

						<div className='card-actions justify-end mt-4'>
							<button className='btn btn-sm bg-green-500 text-white hover:bg-green-600'>
								Add New Role
							</button>
						</div>
					</div>
				</div>

				<div className='card w-96 bg-base-100 shadow-md hover:shadow-lg transition-shadow'>
					<div className='card-body'>
						<h2 className='card-title text-lg font-semibold text-blue-700'>
							Manage Users
						</h2>
						<p className='text-sm text-gray-600'>
							View, add, or modify users and assign roles to control access
							levels.
						</p>

						<div className='mt-4 space-y-1 text-sm'>
							<div className='flex  flex-row'>
								<span className='font-medium text-gray-700'>
									Total Users :{"    "}
								</span>
								<motion.pre>{rounded}</motion.pre>
							</div>
							<div className='flex  flex-row'>
								<span className='font-medium text-gray-700'>
									Active Users:{" "}
								</span>{" "}
								<motion.pre>{rounded}</motion.pre>
							</div>
							<div className='flex  flex-row'>
								<span className='font-medium text-gray-700'>
									Pending Invitations:
								</span>{" "}
								<motion.pre>{rounded}</motion.pre>
							</div>
						</div>

						<div className='card-actions justify-end mt-4'>
							<button className='btn btn-sm bg-violet-500 text-white hover:bg-violet-600'>
								Add New User
							</button>
						</div>
					</div>
				</div>

				<div className='card w-96 bg-base-100 shadow-md hover:shadow-lg transition-shadow'>
					<div className='card-body'>
						<h2 className='card-title text-lg font-semibold text-amber-600'>
							Manage Tasks
						</h2>
						<p className='text-sm text-gray-600'>
							Track, assign, and monitor tasks across your team for better
							productivity.
						</p>

						<div className='mt-4 space-y-1 text-sm'>
							<div className='flex  flex-row'>
								<span className='font-medium text-gray-700'>Total Tasks: </span>{" "}
								<motion.pre>{rounded}</motion.pre>
							</div>
							<div className='flex  flex-row'>
								<span className='font-medium text-gray-700'>Completed: </span>{" "}
								<motion.pre>{rounded}</motion.pre>
							</div>
							<div className='flex  flex-row'>
								<span className='font-medium text-gray-700'>Pending: </span>{" "}
								<motion.pre>{rounded}</motion.pre>
							</div>
						</div>

						<div className='card-actions justify-end mt-4'>
							<button className='btn btn-sm bg-amber-500 text-white hover:bg-amber-600'>
								Add New Task
							</button>
						</div>
					</div>
				</div>
			</motion.div>
		</>
	);
};

export default HeroCard;
