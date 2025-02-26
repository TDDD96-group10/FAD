import React, { useEffect, useState } from "react";
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
    </div>
  );
};

export default HomePage;
