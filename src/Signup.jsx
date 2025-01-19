import React, { useState, useEffect } from "react";

function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [data, setData] = useState([]); // State to store API data
  const [loading, setLoading] = useState(false); // State for loading indicator
  const [apiError, setApiError] = useState(""); // State for API error
const [token ,setToken] = useState();
  // API call inside useEf fect to fetch data when the page is loaded
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
  const registerUser = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://sandbox.techembryo.com/users/api/user/v1/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,  // Token added in Authorization header
          "X-Channel-Id": "WEB",
          "Project": "ASTRO"
        },
        body: JSON.stringify({
          role: "ADMIN",
          mode: "SELF",
          firstName,
          lastName,
          email,
          mobileNo: mobile,
          username: email,
          password,
          extraParams: {
            empCode: "emp-001",
            anniversaryDate: "12-11-2024"
          }
        })
      });
  
      const result = await response.json(); // Parse the response
      if (response.ok) {
        alert("Signup successful!");
        console.log("Signup Response:", result);
      } else {
        console.error("Signup Error:", result);
        setApiError(result.message || "Signup failed.");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      setApiError("Failed to register user.");
    } finally {
      setLoading(false);
    }
  };
  
  // Fetch data when the component is mounted
  useEffect(() => {
    fetchToken();
  }, []);
  
  useEffect(() => {
    if (token) {
      console.log(token, " use effect meimera token ye set hua hai");
    }
  }, [token]);
  const handleValidation = () => {
    let formErrors = {};
    let isValid = true;

    // First Name Validation
    if (!firstName.trim()) {
      formErrors.firstName = "First name is required.";
      isValid = false;
    } else if (!/^[A-Za-z]+$/.test(firstName)) {
      formErrors.firstName = "First name should contain only letters.";
      isValid = false;
    }

    // Last Name Validation
    if (!lastName.trim()) {
      formErrors.lastName = "Last name is required.";
      isValid = false;
    } else if (!/^[A-Za-z]+$/.test(lastName)) {
      formErrors.lastName = "Last name should contain only letters.";
      isValid = false;
    }

    // Mobile Number Validation
    if (!mobile.trim()) {
      formErrors.mobile = "Enter your number.";
      isValid = false;
    } else if (!/^[0-9]{10}$/.test(mobile)) {
      formErrors.mobile = "Only numbers are allowed.";
      isValid = false;
    }

    // Email Validation
    if (!email.trim()) {
      formErrors.email = "Email is required.";
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      formErrors.email = "Please enter a valid email address.";
      isValid = false;
    }

    // Password Validation
    if (!password.trim()) {
      formErrors.password = "Password is required.";
      isValid = false;
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        password
      )
    ) {
      formErrors.password =
        "Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, one digit, and one special character.";
      isValid = false;
    }

    // Confirm Password Validation
    if (!confirmPassword.trim()) {
      formErrors.confirmPassword = "Please confirm your password.";
      isValid = false;
    } else if (password !== confirmPassword) {
      formErrors.confirmPassword = "Passwords do not match.";
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const formData = {
        firstName,
        lastName,
        mobile,
        email,
        password,
      };

      console.log("Form Data Submitted:", formData);
      alert("Form submitted successfully!");
      registerUser();

   
      // Reset form fields
      // setFirstName("");
      // setLastName("");
      // setMobile("");
      // setEmail("");
      // setPassword("");
      // setConfirmPassword("");
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100">
      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <h4 className="mb-3 text-center">Sign up for free</h4>

            {loading ? (
              <div className="text-center">Loading...</div> // Show loading message while fetching API data
            ) : apiError ? (
              <div className="text-center" style={{ color: "red" }}>
                {apiError} {/* Show error if API call fails */}
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="firstName" className="form-label">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      placeholder="First Name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="form-control"
                    />
                    {errors.firstName && (
                      <p style={{ color: "red" }}>{errors.firstName}</p>
                    )}
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="lastName" className="form-label">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      placeholder="Last Name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="form-control"
                    />
                    {errors.lastName && (
                      <p style={{ color: "red" }}>{errors.lastName}</p>
                    )}
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="mobile" className="form-label">
                    Mobile Number
                  </label>
                  <input
                    type="text"
                    id="mobile"
                    placeholder="Mobile Number"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className="form-control"
                  />
                  {errors.mobile && (
                    <p style={{ color: "red" }}>{errors.mobile}</p>
                  )}
                </div>

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
                  />
                  {errors.email && (
                    <p style={{ color: "red" }}>{errors.email}</p>
                  )}
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
                  />
                  {errors.password && (
                    <p style={{ color: "red" }}>{errors.password}</p>
                  )}
                </div>

                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="form-control"
                  />
                  {errors.confirmPassword && (
                    <p style={{ color: "red" }}>{errors.confirmPassword}</p>
                  )}
                </div>

                <p className="mt-3 text-center">
                  By signing up, you confirm that you have read and accepted our{" "}
                  <a href="#">terms and conditions</a> and our{" "}
                  <a href="#">privacy policy</a>.
                </p>
                <button type="submit" className="btn btn-primary w-100 mt-2">
                  Sign up
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
