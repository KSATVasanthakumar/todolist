import React from "react";
import {
	FaHome,
	FaInfoCircle,
	FaSignOutAlt,
	FaTasks,
	FaUser,
} from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { GrSettingsOption } from "react-icons/gr";
import { useTheme } from "../context/ThemeContext";
import { CiDark, CiLight } from "react-icons/ci";
const Header = () => {
	const navigate = useNavigate();
	const { SetLoggedIn, setAuthToken, authToken } = useAuth();

	const { toggle, darkMode } = useTheme();

	let username = authToken.username;

	const handleLogout = () => {
		setAuthToken(null);
		SetLoggedIn(false);
		localStorage.removeItem("setToken"); // optional: clear token if stored
		navigate("/login", { replace: true }); // ✅ add leading slash and replace
	};
	return (
		<div className='navbar bg-base-100 shadow-sm px-2 sm:px-6  fixed'>
			<div className='flex-1'>
				<a className='btn btn-ghost text-sm sm:text-md md:text-xl'>V - Task</a>
			</div>

			{/* Navigation Links */}
			<div className='flex'>
				<nav className='flex space-x-4 sm:space-x-6'>
					<NavLink
						to='/'
						className={({ isActive }) =>
							`flex items-center space-x-2 hover:text-amber-100 ${
								isActive ? "text-amber-400" : "text-black"
							}`
						}
					>
						<FaHome className='text-lg sm:text-xl' />
						<span className='hidden sm:inline'>Home</span>
					</NavLink>

					<NavLink
						to='/roles'
						className={({ isActive }) =>
							`flex items-center space-x-2 hover:text-amber-100 ${
								isActive ? "text-amber-400" : "text-black"
							}`
						}
					>
						<FaTasks className='text-lg sm:text-xl' />
						<span className='hidden sm:inline'>Roles</span>
					</NavLink>

					<NavLink
						to='/details'
						className={({ isActive }) =>
							`flex items-center space-x-2 hover:text-amber-100 ${
								isActive ? "text-amber-400" : "text-black"
							}`
						}
					>
						<FaInfoCircle className='text-lg sm:text-xl' />
						<span className='hidden sm:inline'>Details</span>
					</NavLink>

					<NavLink
						to='/profile'
						className={({ isActive }) =>
							`flex items-center space-x-2 hover:text-amber-100 ${
								isActive ? "text-amber-400" : "text-black"
							}`
						}
					>
						<FaUser className='text-lg sm:text-xl' />
						<span className='hidden sm:inline'>Profile</span>
					</NavLink>
				</nav>
			</div>

			{/* Avatar Dropdown */}
			<div className='flex gap-2 px-3 sm:px-5'>
				<div className='dropdown dropdown-end'>
					<div
						tabIndex={0}
						role='button'
						className='btn btn-ghost btn-circle avatar'
					>
						<div className='flex w-10 rounded-full bg-amber-300 justify-center items-center'>
							<span className='text-xl text-black'>{username.charAt(0)}</span>
						</div>
					</div>
					<ul
						tabIndex='-1'
						className='menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow'
					>
						<li>
							<NavLink>
								<FaUser /> Profile
							</NavLink>
						</li>
						<li>
							<NavLink>
								<GrSettingsOption /> Settings
							</NavLink>
						</li>
						<li>
							<button onClick={handleLogout} className='text-red-500'>
								<FaSignOutAlt /> Logout
							</button>
						</li>
					</ul>
				</div>
			</div>

			{/* Dark / Light Toggle */}

			<button onClick={toggle} className='hover:cursor-pointer'>
				{darkMode ? (
					<CiDark className='text-2xl text-black/50' />
				) : (
					<CiLight className='text-2xl text-amber-600' />
				)}
			</button>
		</div>
	);
};

export default Header;
