import { configureStore } from "@reduxjs/toolkit";
import profile from "./Slices/profileSlice";

const store = configureStore({
	reducer: {
		profile: profile,
	},
});

export default store;
