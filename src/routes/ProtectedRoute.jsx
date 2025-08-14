import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export function ProtectedRoute({ requiredRole }) {
  const { user } = useContext(AuthContext);

  if (!user) return <Navigate to="/" replace />;

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/cardapio" replace />;
  }

  return <Outlet />;
}
