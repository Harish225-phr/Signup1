import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // State to manage loading indicator
  const [error, setError] = useState(null); 
  const [apiError, setApiError] = useState("");// State to store error messages
const [token ,setToken] = useState();
  // Handle form submission
  const fetchToken = async () => { 
    try {
      setLoading(true);
      const response = await fetch("https://sandbox.techembryo.com/users/api/user/v1/token", {
        method: "POST", // POST request for fetching token
        headers: {
          "Content-Type": "application/json", // Set content type to JSON
          "X-Channel-Id": "WEB",
          "Project": "TEST",
        },
        body: JSON.stringify({
          name :"harish baby",
          clientId: "Lzf1wrUP24U1IPJYYlhfBBwPikl7y6sX",  // Add clientId
          clientSecret: "Ll10zxNhUfChJ65YrEMe6WJagU5QDljD", // Add clientSecret
          currentTimeMillis: Date.now() // Add currentTimeMillis
        }),
      });
      const result = await response.json(); // Parse the JSON response
      console.log("API Data:", result);
      setToken(result.response.token); // Save the data from the API response
      console.log(token,"mera token ye set hua hai");
      console.log(result.response.token,"ye kraa deye re mene");
    } catch (error) {
      console.error("Error fetching data:", error);
      setApiError("Failed to fetch data from the API."); // Set API error message
    } finally {
      setLoading(false);
    }
  };
    useEffect(() => {
      fetchToken();
    }, []);
    
    useEffect(() => {
      if (token) {
        console.log(token, " use effect meimera token ye set hua hai");
      }
    }, [token]);

  const handleLogin = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    console.log("Login button clicked");
    
    try {
      setLoading(true);
      const response = await fetch("https://sandbox.techembryo.com/users/api/user/v1/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,  // Token added in Authorization header
          "X-Channel-Id": "WEB",
          "Project": "TEST"
        },


        body: JSON.stringify({
          username: email,
          password: password,  // Ensure password is properly referenced
          currentTimeMillis: new Date().getTime() // Getting current time in milliseconds
        })
        
      });
  
      const result = await response.json(); // Parse the response
      if (response.ok) {
        alert("Login successful!");
        console.log("Signup Response:", result);
      } else {
        console.error("Signup Error:", result);
        setError(result.message || "Signup failed.");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      setApiError("Failed to register user.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100">
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <h4 className="mb-3 text-center">Login</h4>

            {loading ? (
              <div className="text-center">Loading...</div> // Show loading message while logging in
            ) : error ? (
              <div className="text-center" style={{ color: "red" }}>
                {error} {/* Show error if login fails */}
              </div>
            ) : (
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary w-100 mt-2" disabled={loading}>
                  {loading ? 'Logging in...' : 'Login'}
                </button>

                <p className="mt-3 text-center">
                  Don't have an account?{' '}
                  <Link to="/signup" className="btn btn-link">Sign up here</Link>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
