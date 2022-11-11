import vehiclesData from '../assets/mock/vehicleData.json';
import { Vehicle } from '../interfaces';
import { useAPIService } from './useAPIService';

// wrapper hook for all Vehicle related API services
export const useVehicleService = () => {
  const apiService = useAPIService();
  const API_PATH = "vehicles/";

  // TODO: replace mock API call to real API call
  const getVehiclesByUser = async (userId: string): Promise<Array<Vehicle>> => {

    const result = await apiService.privateApiRequest(`${API_PATH}user/${userId}`, "GET", {});

    const data = result.data as Record<string, unknown>;

    if (!result.success) {
      const msg = data.message || "Unexpected Error";
      return Promise.reject<Array<Vehicle>>(new Error(`Failed to fetch vehicles: ${msg}`));
    }

    const vehicleData = result.data as Array<Record<string, unknown>>;

    const vehicles = vehicleData.map((v) => {
      const vehicle: Vehicle = {
        vehicleId: v.id as string,
        ownerId: v.user_id as string,
        plate: v.plate as string,
        model: v.model as string,
        vin: v.vin as string,
        mileage: v.mileage as string,
        type: v.type as string
      };

      return vehicle;
    });

    return vehicles;
  };

  const createVehicle = async (vehicle: Vehicle): Promise<string> => {

    const data = {
      id: vehicle.vehicleId,
      user_id: vehicle.ownerId,
      plate: vehicle.plate,
      model: vehicle.model,
      vin: vehicle.vin,
      mileage: vehicle.mileage,
      type: vehicle.type
    };

    const result = await apiService.privateApiRequest(`${API_PATH}`, "POST", data);

    const responseData = result.data as Record<string, unknown>;

    if (!result.success) {
      const msg = responseData.message || "Unexpected Error";
      return Promise.reject<string>(new Error(`Failed to create vehicle: ${msg}`));
    }

    return responseData.id as string;
  };

  const updateVehicle = async (vehicle: Vehicle): Promise<boolean> => {
    
    const data = {
      id: vehicle.vehicleId,
      user_id: vehicle.ownerId,
      plate: vehicle.plate,
      model: vehicle.model,
      vin: vehicle.vin,
      mileage: vehicle.mileage,
      type: vehicle.type
    };

    const result = await apiService.privateApiRequest(`${API_PATH}${vehicle.vehicleId}`, "PUT", data);

    const responseData = result.data as Record<string, unknown>;

    if (!result.success) {
      const msg = responseData.message || "Unexpected Error";
      return Promise.reject<boolean>(new Error(`Failed to create vehicle: ${msg}`));
    }

    return result.success;
  };

  const deleteVehicle = async (vehicle: Vehicle): Promise<boolean> => {

    const result = await apiService.privateApiRequest(`${API_PATH}${vehicle.vehicleId}`, "DELETE", {});

    const responseData = result.data as Record<string, unknown>;

    if (!result.success) {
      const msg = responseData.message || "Unexpected Error";
      return Promise.reject<boolean>(new Error(`Failed to create vehicle: ${msg}`));
    }

    return result.success;
  };

  return {
    getVehiclesByUser,
    createVehicle,
    updateVehicle,
    deleteVehicle
  };
};