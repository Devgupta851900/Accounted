import { setUser, setLoading } from "../../Redux/Slices/profileSlice"; // Redux actions for user state
import { toast } from "react-hot-toast"; // Toast notifications for feedback
import { apiConnector } from "../apiConnector"; // Custom API connector utility
import { endpoints } from "../apis"; // API endpoints

const { UPDATE_API } = endpoints; // Extracting update endpoint from endpoints

// Update function to modify user information
export const update = (data) => {
	return async (dispatch) => {
		dispatch(setLoading(true)); // Set loading state to true during API call

		try {
			// Make API call to update user information
			const response = await apiConnector("PUT", UPDATE_API, data);

			console.log("API RESPONSE", response); // Log API response for debugging

			// Display success toast notification
			toast.success("Update Successful");

			// Extract updated user information from response
			const { user } = response.data;

			// Update Redux store with new user data
			dispatch(setUser(user));

			// Update user information in localStorage
			try {
				localStorage.removeItem("user"); // Remove old user data
				localStorage.setItem("user", JSON.stringify(user)); // Save new user data
			} catch (storageError) {
				console.error("LocalStorage Error", storageError); // Handle localStorage errors
			}
		} catch (error) {
			console.log("Error", error);
			toast.error("Update Failed"); // Display error toast notification
		} finally {
			dispatch(setLoading(false)); // Set loading state to false after API call
		}
	};
};
