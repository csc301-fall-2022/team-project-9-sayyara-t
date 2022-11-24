import { RequestResult, Service, ShopService } from "../interfaces";
import { useAPIService } from "./useAPIService";

// wrapper hook for all Service related API services
export const useServiceService = () => {
  const apiService = useAPIService();
  const API_PATH = "services/";

  const getServiceById = async (serviceId: string): Promise<Service> => {

    const result = await apiService.apiRequest(`${API_PATH}${serviceId}`, "GET", {});

    const data = result.data as Record<string, unknown>;

    if (!result.success) {
      const msg = data.message || "Unexpected Error";
      return Promise.reject<Service>(new Error(`Failed to fetch service: ${msg}`));
    }

    const service: Service = {
      serviceId: data.id as string,
      type: data.type as string,
      name: data.name as string
    };

    return service;
  };

  const getAllServices = async (): Promise<Array<Service>> => {

    const result = await apiService.apiRequest(`${API_PATH}`, "GET", {});

    const data = result.data as Record<string, unknown>;

    if (!result.success) {
      const msg = data.message || "Unexpected Error";
      return Promise.reject<Array<Service>>(new Error(`Failed to fetch services: ${msg}`));
    }

    const servicesData = result.data as Array<Record<string, unknown>>;

    const services = servicesData.map((data) => {
      const service: Service = {
        serviceId: data.id as string,
        type: data.type as string,
        name: data.name as string
      };
      return service;
    });

    return services;
  };

  return {
    getServiceById,
    getAllServices
  };
};