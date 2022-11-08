import { ReactElement, useEffect } from 'react';
import { PATHS } from '../constants';
import { useNavigate } from 'react-router-dom';

interface PrivateRouteProps {
  child: ReactElement
}

const PrivateRoute = ({ child }: PrivateRouteProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!validateLogIn()) {
      navigate(PATHS.LOGIN);
    }
  });

  // TODO: implement check for authentication status
  // If user is not logged in, redirect to login page
  const validateLogIn = () => {
    return true;
  };

  return (
    child
  );
};

export default PrivateRoute;