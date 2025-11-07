import { AuthProvider } from "./context/AuthContext";

import RootRoute from "./protected/RootRoute";

const App = () => {
	return (
		<AuthProvider>
			<RootRoute />
		</AuthProvider>
	);
};

export default App;
