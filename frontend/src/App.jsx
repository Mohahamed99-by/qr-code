import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/NavBar';

// Lazy load components
const LandingPage = React.lazy(() => import('./pages/LandingPage'));
const Login = React.lazy(() => import('./components/Login'));
const Register = React.lazy(() => import('./components/Register'));
const LinkQRGenerator = React.lazy(() => import('./pages/LinkQRGenerator'));
const QRCodeScanner = React.lazy(() => import('./pages/QRCodeScanner'));
const Examples = React.lazy(() => import('./components/Examples'));
const LoadingSpinner = React.lazy(() => import('./components/LoadingSpinner'));

const App = () => {
  return (
    <Router>
      <Navbar />
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/examples" element={<Examples />} />
          <Route path="/get-started" element={<Login />} />
          <Route path="/sign-up" element={<Register />} />
          <Route path="/qr-code-generate" element={<LinkQRGenerator />} />
          <Route path="/qr-code-scanner" element={<QRCodeScanner />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
