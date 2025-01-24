# MERN User Authentication System

## Description
A User Authentication System built with the MERN stack (MongoDB, Express, React, Node.js). The system allows users to:

- Register a new account
- Log in with their credentials
- Access a protected dashboard after logging in

## Features
- JWT-based Authentication
- Password hashing using bcrypt
- User-friendly UI with React

## Installation

### Frontend
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/mern-auth-app.git
   cd mern-auth-app
   npm install
   npm run dev
   ```

### Backend
1. Clone the backend repository:
   ```bash
   git clone https://github.com/yourusername/mern-auth-backend.git
   cd mern-auth-backend
   npm install
   ```

2. Create a `.env` file in the root of the backend directory with the following content:
   ```bash
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

3. Run the backend server:
   ```bash
   npm start
   ```

## Testing
- Test the registration and login APIs with Postman.
  - `POST /api/register`: For registering a new user.
  - `POST /api/login`: For logging in.
  - `GET /api/me`: For accessing protected user details (requires a valid JWT).


