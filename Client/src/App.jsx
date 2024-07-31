import Navbar from "./components/Navbar"; // Import Navbar component
import Tabs from "./components/Tabs"; // Import Tabs component
import { Routes, Route, Navigate } from "react-router-dom"; // Import routing components
import Login from "./components/Login"; // Import Login component
import Signup from "./components/Signup"; // Import Signup component
import { useState } from "react"; // Import useState hook for state management
import { ProtectedRoute } from "./components/ProtectedRoute"; // Import ProtectedRoute component
import AccountInformation from "./components/AccountInformation"; // Import AccountInformation component
import { useSelector } from "react-redux"; // Import useSelector hook to access Redux store

export default function App() {
	// State to manage active tab (login or signup)
	const [tab, setTab] = useState("login");

	// Get the token from Redux store state.profile
	const { token } = useSelector((state) => state.profile);

	return (
		<div className="bg-slate-950 h-screen overflow-auto font-mono">
			{/* Navbar component */}
			<Navbar />

			{/* Render Tabs only if there's no token */}
			{!token && <Tabs tab={tab} setTab={setTab} />}

			{/* Define Routes for the application */}
			<Routes>
				{/* Root path: Render different components based on token and active tab */}
				<Route
					path="/"
					element={
						token ? (
							<Navigate to="/profile" /> // Redirect to profile if logged in
						) : tab === "login" ? (
							<Login setTab={setTab} /> // Show Login component
						) : (
							<Signup setTab={setTab} /> // Show Signup component
						)
					}
				/>
				{/* Profile path: Protected route for authenticated users */}
				<Route
					path="/profile"
					element={
						<ProtectedRoute>
							<AccountInformation />
						</ProtectedRoute>
					}
				/>
			</Routes>
		</div>
	);
}
