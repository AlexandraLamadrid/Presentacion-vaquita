import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const LogoutPage = () => {
  useEffect(() => {
    sessionStorage.removeItem('token');
    window.dispatchEvent(new Event('storage'));
  }, []);

  return <Navigate to="/login" replace />;
};

export default LogoutPage;
