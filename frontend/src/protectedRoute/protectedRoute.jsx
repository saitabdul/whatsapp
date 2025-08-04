import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import { useContext } from 'react';

const ProtectedRoute = ({ children }) => {
  const { authUser } = useContext(AuthContext);
  return authUser ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
