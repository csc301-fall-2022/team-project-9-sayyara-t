import usersData from '../assets/mock/userData.json';
import { User } from '../interfaces';

// wrapper hook for all User related API services
export const useUserService = () => {

  // TODO: change to API call from mock
  const getUser = async (userId: string): Promise<User> => {
    const userData = usersData[userId as keyof typeof usersData];

    if (!userData) {
      return Promise.reject<User>(new Error("User not found"));
    }

    const user: User = {
      userId: userData.user_id,
      roleId: userData.role_id,
      username: userData.username,
      name: userData.name,
      email: userData.email,
      phone: userData.phone
    };

    return user;
  };

  // TODO: change to API call from mock
  const updateUser = async (user: User): Promise<boolean> => {

    console.log(`Updated User`);
    console.log(user);

    const success = true;

    return success ? success : Promise.reject<boolean>(new Error("Failed to update user"));
  };

  return {
    getUser,
    updateUser
  };
};