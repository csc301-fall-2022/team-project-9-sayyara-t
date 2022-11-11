import vehiclesData from '../assets/mock/vehicleData.json';
import { Vehicle } from '../interfaces';

// wrapper hook for all Vehicle related API services
export const useVehicleService = () => {

  // TODO: replace mock API call to real API call
  const getVehiclesByUser = async (userId: string): Promise<Array<Vehicle>> => {
    const vehicles = Object.values(vehiclesData);
    const userVehicles: Array<Vehicle> = [];

    vehicles.forEach((vehicle) => {
      if (vehicle.user_id == userId) {
        userVehicles.push({
          vehicleId: vehicle.vehicle_id,
          ownerId: vehicle.user_id,
          plate: vehicle.plate,
          model: vehicle.model,
          vin: vehicle.vin,
          mileage: vehicle.mileage,
          type: vehicle.type
        } as Vehicle);
      }
    });

    return userVehicles;
  };

  // TODO: replace mock API call to real API call
  const createVehicle = async (vehicle: Vehicle): Promise<string> => {
    console.log(`Created Vehicle`);
    console.log(vehicle);

    const success = true;
    const vehicleId = Math.floor(Math.random() * 1000);

    return success ? vehicleId.toString() : Promise.reject<string>(new Error("Failed to create vehicle."));
  };

  // TODO: replace mock API call to real API call
  const updateVehicle = async (vehicle: Vehicle): Promise<boolean> => {
    console.log(`Updated Vehicle`);
    console.log(vehicle);

    const success = true;

    return success ? success : Promise.reject<boolean>(new Error("Failed to update vehicle."));
  };

  // TODO: replace mock API call to real API call
  const deleteVehicle = async (vehicle: Vehicle): Promise<boolean> => {
    console.log(`Deleted Vehicle`);
    console.log(vehicle);

    const success = true;

    return success ? success : Promise.reject<boolean>(new Error("Failed to delete vehicle."));
  };

  return {
    getVehiclesByUser,
    createVehicle,
    updateVehicle,
    deleteVehicle
  };
};