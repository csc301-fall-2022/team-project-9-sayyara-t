import { RequestResult, Service, ShopService } from "../interfaces";
import { useAPIService } from "./useAPIService";

// wrapper hook for all Service related API services
export const useShopServiceService = () => {
  const apiService = useAPIService();
  const API_PATH = "shopservices/";

  const getShopServicesForShop = async (shopId: string): Promise<Array<ShopService>> => {

    const result = await apiService.apiRequest(`${API_PATH}shop/${shopId}`, "GET", {});

    const data = result.data as Record<string, unknown>;

    if (!result.success) {
      const msg = data.message || "Unexpected Error";
      return Promise.reject<Array<ShopService>>(new Error(`Failed to fetch services: ${msg}`));
    }

    const servicesData = result.data as Array<Record<string, unknown>>;

    const services = servicesData.map((s) => {
      const service: ShopService = {
        shopServiceId: s.id as string,
        serviceId: s.service_id as string,
        shopId: s.shop_id as string,
        price: Number(s.price),
        description: s.description as string
      };
      return service;
    });

    return services;
  };

  const createShopService = async (shopService: ShopService): Promise<string> => {
    const data = {
      shop_id: shopService.shopId,
      service_id: shopService.serviceId,
      price: String(shopService.price),
      description: shopService.description
    };

    const result: RequestResult = await apiService.apiRequest(`${API_PATH}`, 'POST', data);
    const responseData = result.data as Record<string, unknown>;

    if (!result.success) {
      const msg = responseData.message || "Unexpected Error";
      return Promise.reject<string>(new Error(`Failed to create new shopservice: ${msg}`));
    }
    return responseData.id as string;
  };

  const updateShopService = async (shopService: ShopService): Promise<boolean> => {
    const data = {
      shop_id: shopService.shopId,
      service_id: shopService.serviceId,
      description: shopService.description,
      price: String(shopService.price)
    };

    const result: RequestResult = await apiService.apiRequest(`${API_PATH}${shopService.shopServiceId}`, 'PUT', data);
    const responseData = result.data as Record<string, unknown>;

    if (!result.success) {
      const msg = responseData.message || "Unexpected Error";
      return Promise.reject<boolean>(new Error(`Failed to update shopservice: ${msg}`));
    }
    return result.success;
  };

  const deleteShopService = async (shopService: ShopService): Promise<boolean> => {
    const result: RequestResult = await apiService.apiRequest(`${API_PATH}${shopService.serviceId}`, 'DELETE', {});
    const responseData = result.data as Record<string, unknown>;

    if (!result.success) {
      const msg = responseData.message || "Unexpected Error";
      return Promise.reject<boolean>(new Error(`Failed to delete shopservice: ${msg}`));
    }
    return result.success;
  };

  return {
    getShopServicesForShop,
    createShopService,
    updateShopService,
    deleteShopService
  };
};