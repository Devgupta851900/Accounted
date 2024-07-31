import { setToken, setUser } from "../../Redux/Slices/profileSlice"; // Redux actions for authentication
import { toast } from "react-hot-toast"; // Toast notifications for feedback

// Logout function to clear user session
export const logout = (navigate) => {
	return (dispatch) => {
		// Clear user token and data in Redux store
		dispatch(setToken(null));
		dispatch(setUser(null));

		// Remove user data from localStorage
		localStorage.removeItem("token");
		localStorage.removeItem("user");

		// Display a success message
		toast.success("Logged Out");

		// Navigate to the home page after logout
		navigate("/");

		// Reload the page to reset the application state
		window.location.reload();
	};
};
