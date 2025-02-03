import React, { useEffect, useState } from "react";
import "../styles/pages/Home.css";
import { apiClient } from "../api/ApiClient";
import { RegularUserRegister } from "../api/Api";
import { useApi } from "../hooks/useApi";

// Define the type for user data


const HomePage: React.FC = () => {
  

  // API Call inside useEffect
  

  const newUser: RegularUserRegister = {
    email: "user@example.com",
    username: "new_user",
    password: "securePass123",
  };
  const { data , loading, error } = useApi<RegularUserRegister>(() => apiClient.api.apiRegisterUserCreate(newUser))

  return (
    <div className="container">
      {/* Header */}
      <header className="header">
        <h1>My Website</h1>
        <nav>
          <ul className="nav-links">
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <h2>Welcome to My Website</h2>
        <p>This is a simple homepage built with React and TypeScript.</p>
      </section>

      {/* Main Content */}
      <main className="content">
        <h3>User List</h3>
        {loading && <p>Loading users...</p>}
        {error && <p className="error">{error}</p>}
        <ul>
          
        </ul>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 My Website. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
