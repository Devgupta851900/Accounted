// Base URL for API requests, taken from environment variables
const BASE_URL = import.meta.env.VITE_API_URL;

// Object to store API endpoints
export const endpoints = {
  REGISTER_API: `${BASE_URL}/register`, // Endpoint for user registration
  LOGIN_API: `${BASE_URL}/login`,       // Endpoint for user login
  UPDATE_API: `${BASE_URL}/update`,     // Endpoint for updating user information
};
