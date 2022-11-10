import shopsData from '../assets/mock/shopData.json';
import { Service, Shop, Time } from '../interfaces';

// wrapper hook for all Shop related API services
export const useShopService = () => {

  // TODO: replace mock API call to real API call
  const getShopsForUser = async (userId: string): Promise<Array<Shop>> => {
    return shopsData.map((shop) => {
      return {
        shopId: shop.shop_id,
        name: shop.name,
        address: shop.address,
        phone: shop.phone,
        email: shop.email,
        description: shop.description,
        time: shop.time as Time,
        services: shop.services.map((service) => {
          return {
            serviceId: service.service_id,
            shopId: service.shop_id,
            name: service.name,
            description: service.description,
            price: service.price
          } as Service;
        })
      } as Shop;
    });
  };

  // TODO: replace mock API call to real API call
  const updateShop = async (shop: Shop): Promise<boolean> => {
    console.log("Updating Shop");
    console.log(shop);

    const success = true;

    return success ? success : Promise.reject<boolean>(new Error("Failed to updated shop"));
  };

  // TODO: replace mock API call to real API call
  const createShop = async (shop: Shop): Promise<string> => {
    console.log("Creating Shop");
    console.log(shop);

    const success = true;
    const shopId = Math.floor(Math.random() * 1000);

    return success ? shopId.toString() : Promise.reject<string>(new Error("Failed to create shop"));
  };
  
  // TODO: replace mock API call to real API call
  const deleteShop = async (shop: Shop): Promise<boolean> => {
    console.log("Deleting Shop");
    console.log(shop);

    const success = true;

    return success ? success : Promise.reject<boolean>(new Error("Failed to delete shop"));
  };

  return {
    getShopsForUser,
    updateShop,
    createShop,
    deleteShop
  };
};