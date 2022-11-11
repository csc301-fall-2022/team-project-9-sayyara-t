import { RequestResult, User } from '../interfaces';
import { useAPIService } from './useAPIService';

// wrapper hook for all Authentication related API services
export const useAuthService = () => {
  const API_PATH = "auth/";
  const apiService = useAPIService();

  const signUp = async (user: User, password: string): Promise<boolean> => {
    const data = {
      username: user.username,
      password: password,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role_id: user.roleId
    };

    const result: RequestResult = await apiService.apiRequest(`${API_PATH}signup`, 'POST', data);

    if (!result.success) {
      const msg = result.data.message || "Unexpected Error";
      return Promise.reject<boolean>(new Error(`Failed to sign-up: ${msg}`));
    }

    return result.success;
  };

  return {
    signUp
  };
};