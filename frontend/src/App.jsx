import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/NavBar';
import Register from './components/Register';
import Login from './components/Login';
import Examples from './components/Examples';
import LoadingSpinner from './components/LoadingSpinner';
import LandingPage from './pages/LandingPage';

// Lazy loaded components
const QRCodeScanner = React.lazy(() => import('./pages/QRCodeScanner'));
const LinkQRGenerator = React.lazy(() => import('./pages/LinkQRGenerator'));
const NotFound = React.lazy(() => import('./pages/NotFound'));

const App = () => {
  return (
    <HelmetProvider>
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
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>
    </HelmetProvider>
  );
};

export default App;
