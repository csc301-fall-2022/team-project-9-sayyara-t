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

  const validateLogIn = () => {
    return (sessionStorage.getItem('x-access-token') !== null &&
            sessionStorage.getItem('userId') !== null &&
            sessionStorage.getItem('roleId') !== null);
  };

  return (
    child
  );
};

export default PrivateRoute;