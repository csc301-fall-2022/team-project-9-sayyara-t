import { Service } from "../interfaces";

// wrapper hook for all Service related API services
export const useServiceService = () => {

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
    createService,
    updateService,
    deleteService
  };
};