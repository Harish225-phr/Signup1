import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // State to manage loading indicator
  const [error, setError] = useState(null); // State to store error messages

  // Handle form submission
  const handleLogin = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Replace with your API URL
      const response = await axios.post('https://yourapi.com/login', {
        email,
        password,
      });

      // Assuming the response contains a token
      if (response.data.token) {
        // Save the token (could use localStorage or a global state)
        localStorage.setItem('token', response.data.token);
        alert('Login successful!');
        // Redirect to dashboard or another page
        window.location.href = '/dashboard'; // Update this according to your routing structure
      }
    } catch (err) {
      setError('Invalid email or password');
      console.error(err);
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
                 <button><Link to="/signup">Sign up here</Link></button>
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
