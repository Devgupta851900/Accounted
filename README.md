```markdown
# MERN Stack Project

## Overview

This project is a full-featured web application built using the MERN stack (MongoDB, Express, React, Node.js). It offers a secure and responsive platform for user authentication and profile management.

## Technologies Used

### Frontend

- React.js: JavaScript library for building user interfaces
- Redux: State management for React applications
- Tailwind CSS: Utility-first CSS framework for styling
- Vite: Fast bundler and development server for modern web projects

### Backend

- Node.js: JavaScript runtime environment
- Express.js: Web framework for Node.js
- MongoDB: NoSQL database
- Mongoose: MongoDB object modeling tool

### Additional Tools

- Concurrently: Runs multiple commands concurrently for server and client

## Features

- **User Authentication:**
    - Secure login and registration with encrypted passwords
- **Profile Management:**
    - Access to a protected profile page with editable user details
    - Secure editing with password verification
- **Responsive Design:**
    - Fully responsive for all device sizes

## Getting Started

### Prerequisites

- Node.js (download from [Node.js website](https://nodejs.org/))
- MongoDB (set up local or cloud instance)
```
### Installation

1. **Clone the repository:**

   ```bash
   git clone <your-repository-url>
   cd <project-folder>
   ```

2. **Install server and client dependencies:**

   ```bash
   npm install
   cd client
   npm install
   cd ../server
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the Server directory and add your configuration:

   ```env
   PORT=<your-port-number>
   DB_URL=<your-mongodb-uri>
   JWT_SECRET=<your-secret-key>
   ```

### Running the Application

1. **Start the development server:**

   ```bash
   cd ..
   npm run dev
   ```

   This starts both the server and client.

2. **Access the application:**

   Open `http://localhost:5173` in your web browser.
