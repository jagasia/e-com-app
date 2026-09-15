import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function AdminRoute({ children }) {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!user.roles || !user.roles.includes('ADMIN')) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}

export default AdminRoute;
