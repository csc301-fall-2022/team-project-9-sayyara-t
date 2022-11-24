import usersData from '../assets/mock/userData.json';
import { RequestResult, User } from '../interfaces';
import { useAPIService } from './useAPIService';

// wrapper hook for all User related API services
export const useUserService = () => {
  const apiService = useAPIService();
  const API_PATH = "user/";

  const getCurrentUser = async (): Promise<User> => {
    
    const result: RequestResult = await apiService.privateApiRequest(`${API_PATH}details`, "GET", {});

    const data = result.data as Record<string, unknown>;

    if (!result.success) {
      const msg = data.message || "Unexpected Error";
      return Promise.reject<User>(new Error(`Failed to fetch user: ${msg}`));
    }

    const user: User = {
      userId: data.id as string,
      roleId: data.role_id as number,
      username: data.username as string,
      name: data.name as string,
      email: data.email as string,
      phone: data.phone as string
    };

    return user;
  };

  const updateUser = async (user: User): Promise<boolean> => {

    const data = {
      user_id: user.userId,
      role_id: user.roleId,
      username: user.username,
      name: user.name,
      email: user.email,
      phone: user.phone
    };

    const result = await apiService.privateApiRequest(`${API_PATH}update`, "PUT", data);

    const responseData = result.data as Record<string, unknown>;

    if (!result.success) {
      const msg = responseData.message || "Unexpected Error";
      return Promise.reject<boolean>(new Error(`Failed to update user: ${msg}`));
    }

    return result.success;
  };

  return {
    getCurrentUser,
    updateUser
  };
};