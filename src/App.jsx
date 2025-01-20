import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './Signup';  // Import Signup component
import Login from './Login';    // Import Login component

function App() {
  return (
   
    <Router>
      <Routes>
        {/* Define routes for Login and Signup */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
   
  );
}

export default App;