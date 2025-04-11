import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const [isAuthorized, setIsAuthorized] = useState(null); // null: loading, false: not authorized

  useEffect(() => {
    const verifyAdmin = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/admin', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // If we reach here, the user is an admin
        setIsAuthorized(true);
    } catch (err) {
        alert("Unauthorised access: You are not an admin!")
        // Either token is invalid or user is not an admin
        setIsAuthorized(false);
      }
    };

    if (token) {
      verifyAdmin();
    } else {
      setIsAuthorized(false);
    }
  }, [token]);

  if (isAuthorized === null) {
    return <p>Checking authorization...</p>;
  }

  if (!isAuthorized) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;
