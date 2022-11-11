import { RequestResult } from "../interfaces";
import { useAPIService } from "./useAPIService";

export const useShopAdminServices = () => {
  const apiService = useAPIService();
  const API_PATH = "shopadmins/";

  const createShopAdmin = async (userId: string, shopId: string): Promise<boolean> => {
    const data = {
      user_id: userId,
      shop_id: shopId
    };

    const result: RequestResult = await apiService.privateApiRequest(`${API_PATH}`, 'POST', data);

    const responseData = result.data as Record<string, unknown>;

    if (!result.success) {
      const msg = responseData.message || "Unexpected Error";
      return Promise.reject(new Error(`Failed to create the requested shop: ${msg}`));
    }

    return result.success;
  };

  return {
    createShopAdmin
  };
};