import axios from "axios";
import React, { useEffect, useState } from "react";

const RolesList = () => {
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
			{roles.map((item) => {
				return <li key={item.id}>{item.name}</li>;
			})}{" "}
		</>
	);
};

export default RolesList;
