import { setToken, setUser, setLoading } from "../../Redux/Slices/profileSlice"; // Redux actions for user state
import { toast } from "react-hot-toast"; // Toast notifications for feedback
import { apiConnector } from "../apiConnector"; // Custom API connector utility
import { endpoints } from "../apis"; // API endpoints

const { REGISTER_API } = endpoints; // Extracting registration endpoint from endpoints

// Signup function to register a new user
const signup = (data, navigate) => {
	return async (dispatch) => {
		dispatch(setLoading(true)); // Set loading state to true during API call

		try {
			console.log(data); // Log input data for debugging

			// Make API call to registration endpoint
			const response = await apiConnector("POST", REGISTER_API, data);

			console.log("API RESPONSE", response); // Log API response for debugging

			// Display success toast notification
			toast.success("Registered Successfully");

			// Extract token and user information from response
			const { token, user } = response.data;

			// Update Redux store with new token and user data
			dispatch(setToken(token));
			dispatch(setUser(user));

			// Save token and user information in localStorage
			try {
				localStorage.setItem("token", JSON.stringify(user.token));
				localStorage.setItem("user", JSON.stringify(user));
			} catch (storageError) {
				console.error("LocalStorage Error", storageError); // Handle localStorage errors
			}

			// Navigate to the profile page after successful signup
			navigate("/profile");
			window.location.reload();
		} catch (error) {
			console.log("Error", error);
			toast.error("Registration Failed"); // Display error toast notification
		} finally {
			dispatch(setLoading(false)); // Set loading state to false after API call
		}
	};
};

export default signup;
