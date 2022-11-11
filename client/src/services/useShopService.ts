import { ResultType } from '@remix-run/router/dist/utils';
import shopsData from '../assets/mock/shopData.json';
import { Service, Shop, Time, RequestResult } from '../interfaces';
import { useAPIService } from './useAPIService';

// wrapper hook for all Shop related API services
export const useShopService = () => {
  const API_PATH = "shops/";
  const apiService = useAPIService();

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

  // This API call is to get all the shops for when a client has not logged in
  const getAllShops = async (sort = "price", search = "null"): Promise<Array<Shop>> => {
    const data = null;

    const shops: RequestResult = await apiService.apiRequest(`${API_PATH}${sort}/${search}/`, 'GET', data);

    const shopsData = shops.data as Array<Record<string, unknown>>;

    return shopsData.map((shop) => {
      return {
        shopId: shop.shop_id,
        name: shop.name,
        address: shop.address,
        phone: shop.phone,
        email: shop.email,
        description: shop.description,
        time: shop.time as Time
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
    getAllShops,
    updateShop,
    createShop,
    deleteShop
  };
};