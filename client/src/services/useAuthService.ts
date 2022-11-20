import { RequestResult, User } from '../interfaces';
import { useAPIService } from './useAPIService';
import { PATHS } from '../constants';

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

    const responseData = result.data as Record<string, unknown>;

    if (!result.success) {
      const msg = responseData.message || "Unexpected Error";
      return Promise.reject<boolean>(new Error(`Failed to sign-up: ${msg}`));
    }

    return result.success;
  };

  const signIn = async (username: string, password: string): Promise<boolean> => {
    const data = {
      username: username,
      password: password
    };

    const result: RequestResult = await apiService.apiRequest(`${API_PATH}signin`, 'POST', data);

    const responseData = result.data as Record<string, unknown>;

    if (!result.success) {
      const msg = responseData.message || "Unexpected Error";
      return Promise.reject<boolean>(new Error(`Failed to log in: ${msg}`));
    }

    // stores the token in the session storage under the key "x-access-token"
    sessionStorage.setItem("x-access-token", <string>responseData.accessToken);
    sessionStorage.setItem("userId", <string>responseData.id);
    sessionStorage.setItem("roleId", <string>responseData.role_id);

    return result.success;
  };

  const signOut = async (): Promise<boolean> => {
    sessionStorage.removeItem('x-access-token');
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('roleId');
    const success = true;
    return success;
  };

  return {
    signUp,
    signIn,
    signOut
  };
};