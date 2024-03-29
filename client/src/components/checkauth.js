import { useSession } from './IsLoggedIn';
import { useNavigate } from 'react-router-dom';

export const useCheckAuth = () => {
  const { authenticated } = useSession();
  const navigate = useNavigate();

  const checkAuth = () => {
    if (authenticated === false) {
      navigate('/login');
    }
  };

  return checkAuth;
};