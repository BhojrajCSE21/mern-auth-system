import React from "react";
import { Link } from "react-router-dom";
import "../pages/Home.css";

const Home = () => {
  return (
    <div>
      <h1>Welcome to the MERN Authentication App</h1>
      <p>
        <Link to="/register"><button className="auth-button">Register</button></Link> or <Link to="/login"><button className="auth-button">Login</button></Link>
      </p>
    </div>
  );
};

export default Home;
