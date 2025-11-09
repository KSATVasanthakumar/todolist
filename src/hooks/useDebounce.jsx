import React, { useEffect, useState } from "react";

const useDebounce = (value, delay = 500) => {
	const [debouncedvalue, setDebouncedValue] = useState("");

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		// Cleanup timer on value or delay change
		return () => {
			clearTimeout(handler);
		};
	}, [value, delay]);

	return debouncedvalue;
};

export default useDebounce;
