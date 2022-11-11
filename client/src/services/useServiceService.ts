import { Service } from "../interfaces";
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

  // TODO: replace mock API call to real API call
  const createService = async (service: Service): Promise<string> => {
    console.log(`Created Service`);
    console.log(service);

    const success = true;
    const serviceId = Math.floor(Math.random() * 1000);

    return success ? serviceId.toString() : Promise.reject<string>(new Error("Failed to create service."));
  };

  // TODO: replace mock API call to real API call
  const updateService = async (service: Service): Promise<boolean> => {
    console.log(`Updated Service`);
    console.log(service);

    const success = true;

    return success ? success : Promise.reject<boolean>(new Error("Failed to update service."));
  };

  // TODO: replace mock API call to real API call
  const deleteService = async (service: Service): Promise<boolean> => {
    console.log(`Deleted Service`);
    console.log(service);

    const success = true;

    return success ? success : Promise.reject<boolean>(new Error("Failed to delete service."));
  };

  return {
    getServicesForShop,
    createService,
    updateService,
    deleteService
  };
};