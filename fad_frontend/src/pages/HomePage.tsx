import React, { useEffect, useState } from "react";
import "../styles/pages/Home.css";
import { apiClient } from "../api/ApiClient";
import { RegularUserRegister } from "../api/Api";
import { useApi,callApi } from "../hooks/useApi";

// Define the type for user data


const HomePage: React.FC = () => {
  

  // API Call inside useEffect
  

  const newUser: RegularUserRegister = {
    email: "user@example.com",
    username: "new_user",
    password: "securePass123",
  };
  //const { data , loading, error } = useApi<void>(() => apiClient.api.apiCheckTestList())

  //const { data: apiData, loading: apiLoading, error: apiError, callApi: api } = callApi<RegularUserRegister>(() =>
    //apiClient.api.apiRegisterUserCreate(newUser)
  //);


  
  return (
    <>
    
  
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

    
      <main className="content">
        <h3>User List</h3>
        
        <ul>
          
        </ul>
      </main>

    
    </div>
    </>
  );
};

export default HomePage;
