
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Login from './components/Login';  // Import your Login component
import Register from './components/Register';  // Import your Register component
import LinkQRGenerator from './pages/LinkQRGenerator';
import QRCodeScanner from './pages/QRCodeScanner'
import Navbar from './components/NavBar';
import Examples from './components/Examples';
import Profile from './pages/profile';
const App = () => {
  return (
    <div>
      
      <Router>
          <Navbar />
        <Routes>
      
          <Route path="/" element={<LandingPage />} />
          <Route path="/examples" element={<Examples />} />
          <Route path="/get-started" element={<Login />} />
          <Route path="/sign-up" element={<Register />} />
          <Route path="/Profile/:id" element={<Profile />} />
          <Route path="/qr-code-generate" element={<LinkQRGenerator />} />
          <Route path="/qr-code-scanner" element={<QRCodeScanner />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
