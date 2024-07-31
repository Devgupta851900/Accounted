import { setToken, setUser, setLoading } from "../../Redux/Slices/profileSlice"; // Redux actions
import { toast } from "react-hot-toast"; // Toast notifications
import { apiConnector } from "../apiConnector"; // API connector utility
import { endpoints } from "../apis"; // API endpoints

const { LOGIN_API } = endpoints; // Extracting login endpoint from endpoints

// Login function to authenticate users
const login = (data, navigate) => {
	return async (dispatch) => {
		dispatch(setLoading(true)); // Set loading state to true during API call
		try {
			// Making the API call to login endpoint
			const response = await apiConnector("POST", LOGIN_API, data);

			console.log("API RESPONSE", response);

			// Display success toast notification
			toast.success("Login Successful");

			// Extract token and user information from response
			const { token, user } = response.data;

			// Dispatch actions to set token and user in the Redux store
			dispatch(setToken(token));
			dispatch(setUser(user));

			// Save token and user information in localStorage
			try {
				localStorage.setItem("token", JSON.stringify(user.token));
				localStorage.setItem("user", JSON.stringify(user));
			} catch (storageError) {
				console.error("LocalStorage Error", storageError); // Handle localStorage errors
			}

			// Navigate to the profile page and refresh the page
			navigate("/profile");
			window.location.reload(); // Reloading to ensure data consistency
		} catch (error) {
			console.log("Error", error);
			toast.error("Login Failed"); // Display error toast notification
		} finally {
			dispatch(setLoading(false)); // Set loading state to false after API call
		}
	};
};

export default login;
