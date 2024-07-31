import { createSlice } from "@reduxjs/toolkit";

// Initial state with user and token from localStorage if available
const initialState = {
	user: localStorage.getItem("user")
		? JSON.parse(localStorage.getItem("user"))
		: null,
	loading: false,
	token: localStorage.getItem("token")
		? JSON.parse(localStorage.getItem("token"))
		: null, // Parse token from localStorage to JSON
};

// Create a slice of the Redux store for user profile management
const profileSlice = createSlice({
	name: "profile",
	initialState, // Use shorthand property for initial state
	reducers: {
		// Reducer to set the user in the state
		setUser: (state, action) => {
			state.user = action.payload; // Use action.payload to update user state
		},
		// Reducer to set the loading state
		setLoading: (state, action) => {
			state.loading = action.payload; // Use action.payload to update loading state
		},
		// Reducer to set the token in the state
		setToken: (state, action) => {
			state.token = action.payload; // Correctly set the token in the state
		},
	},
});

// Export actions to be used in components
export const { setLoading, setUser, setToken } = profileSlice.actions;

// Export reducer to be used in the store
export default profileSlice.reducer;
