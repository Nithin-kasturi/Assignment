import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import UserPage from './pages/UserPage';
import Login from './components/Login';
import CheckoutPage from './pages/CheckOutPage';

function App() {
  const [role, setRole] = useState(null);  // 'admin' or 'user'
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (userRole) => {
    setIsAuthenticated(true);
    setRole(userRole);
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/user" element={isAuthenticated && role === 'user' ? <UserPage /> : <Navigate to="/login" />} />
        <Route path="/admin" element={isAuthenticated && role === 'admin' ? <AdminPage /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
