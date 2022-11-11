import { RequestResult, Service } from "../interfaces";
import { useAPIService } from "./useAPIService";

// wrapper hook for all Service related API services
export const useServiceService = () => {
  const apiService = useAPIService();
  const API_PATH = "services/";

  const getServicesForShop = async (shopId: string): Promise<Array<Service>> => {

    const result = await apiService.privateApiRequest(`${API_PATH}shop/${shopId}`, "GET", {});

    const data = result.data as Record<string, unknown>;

    if (!result.success) {
      const msg = data.message || "Unexpected Error";
      return Promise.reject<Array<Service>>(new Error(`Failed to fetch services: ${msg}`));
    }

    const servicesData = result.data as Array<Record<string, unknown>>;

    const services = servicesData.map((s) => {
      const service: Service = {
        serviceId: s.id as string,
        shopId: s.shop_id as string,
        name: s.name as string,
        description: s.description as string,
        price: s.price as number
      };
      return service;
    });

    return services;
  };

  const createService = async (service: Service): Promise<string> => {
    const data = {
      shop_id: service.shopId,
      name: service.name,
      description: service.description,
      price: service.price
    };

    const result: RequestResult = await apiService.apiRequest(`${API_PATH}`, 'POST', data);
    const responseData = result.data as Record<string, unknown>;

    if (!result.success) {
      const msg = responseData.message || "Unexpected Error";
      return Promise.reject<string>(new Error(`Failed to create new service: ${msg}`));
    }
    return responseData.id as string;
  };

  const updateService = async (service: Service): Promise<boolean> => {
    const data = {
      shop_id: service.shopId,
      name: service.name,
      description: service.description,
      price: service.price
    };

    const result: RequestResult = await apiService.apiRequest(`${API_PATH}${service.serviceId}`, 'PUT', data);
    const responseData = result.data as Record<string, unknown>;

    if (!result.success) {
      const msg = responseData.message || "Unexpected Error";
      return Promise.reject<boolean>(new Error(`Failed to update service: ${msg}`));
    }
    return result.success;
  };

  const deleteService = async (service: Service): Promise<boolean> => {
    const data = {
      shop_id: service.shopId,
      name: service.name,
      description: service.description,
      price: service.price
    };

    const result: RequestResult = await apiService.apiRequest(`${API_PATH}${service.serviceId}`, 'DELETE', data);
    const responseData = result.data as Record<string, unknown>;

    if (!result.success) {
      const msg = responseData.message || "Unexpected Error";
      return Promise.reject<boolean>(new Error(`Failed to delete service: ${msg}`));
    }
    return result.success;
  };

  return {
    getServicesForShop,
    createService,
    updateService,
    deleteService
  };
};