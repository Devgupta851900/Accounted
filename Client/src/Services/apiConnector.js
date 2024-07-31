import axios from "axios";

// Create an instance of axios for API requests
export const axiosInstance = axios.create({
  // You can set default configurations here, such as baseURL, headers, etc.
});

// Function to make API calls using the axios instance
export const apiConnector = (method, url, bodyData = null, headers = null, params = null) => {
  return axiosInstance({
    method,        // HTTP method (GET, POST, etc.)
    url,           // API endpoint URL
    data: bodyData, // Request body data (for POST, PUT, etc.)
    headers,       // Custom headers for the request
    params         // URL parameters for the request
  });
};
