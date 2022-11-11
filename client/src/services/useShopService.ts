import { Service, Shop, Time, RequestResult } from '../interfaces';
import { ResultType } from '@remix-run/router/dist/utils';
import shopsData from '../assets/mock/shopData.json';
import { useAPIService } from './useAPIService';

// wrapper hook for all Shop related API services
export const useShopService = () => {
  const API_PATH = "/shopadmins"; //TODO: double check this is right
  const API_PATH_SHOPS = "shops/";
  const apiService = useAPIService();

  // TODO: test that effectively replaced mock API call
  const getShopsForUser = async (userId: string): Promise<Array<Shop>> => {
    // const data = {
      // userId: userId
    // };

    const result: RequestResult = await apiService.apiRequest(`${API_PATH_SHOPS}/user/:${userId}`, 'GET', {});

    const data = result.data as Record<string, unknown>;
    const responseData = result.data as Array<Record<string, unknown>>;

    if (!result.success) {
      const msg = data.message || "Unexpected Error";
      return Promise.reject(new Error(`Failed to get shops for this user: ${msg}`));
    }

    return responseData.map((shop) => {
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

    // return shopsData.map((shop) => {
    //   return {
    //     shopId: shop.shop_id,
    //     name: shop.name,
    //     address: shop.address,
    //     phone: shop.phone,
    //     email: shop.email,
    //     description: shop.description,
    //     time: shop.time as Time,
    //     services: shop.services.map((service) => {
    //       return {
    //         serviceId: service.service_id,
    //         shopId: service.shop_id,
    //         name: service.name,
    //         description: service.description,
    //         price: service.price
    //       } as Service;
    //     })
    //   } as Shop;
    // });
  };


  // TODO: test that effectively replaced mock API call
  // This API call is to get all the shops for when a client has not logged in
  const getAllShops = async (sort = "price", search = "null"): Promise<Array<Shop>> => {
    const data = null;

    const shops: RequestResult = await apiService.apiRequest(`${API_PATH_SHOPS}${sort}/${search}/`, 'GET', data);

    const shopsData = shops.data as Array<Record<string, unknown>>;

    return shopsData.map((shop) => {
      return {
        shopId: shop.id,
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
    const data = {
      shopId: shop.shopId,
      ownerIds: shop.ownerIds,
      name: shop.name,
      address: shop.address,
      phone: shop.phone,
      email: shop.email,
      services: shop.services,
      description: shop.description
    };

      console.log("Updating Shop");
      console.log(shop);

      //const success = true;

      //return success ? success : Promise.reject<boolean>(new Error("Failed to updated shop"));
    
      const result: RequestResult = await apiService.apiRequest(`${API_PATH}/${shop.shopId}`, 'PUT', data);

      const responseData = result.data as Record<string, unknown>;

      if (!result.success) {
        const msg = responseData.message || "Unexpected Error";
        return Promise.reject<boolean>(new Error(`Failed to update the shop with id: ${msg}`));
      }

      return result.success;
  };

  // TODO: test
  const createShop = async (shop: Shop): Promise<string> => {
    const inputData = {
      shopId: shop.shopId,
      ownerIds: shop.ownerIds,
      name: shop.name,
      address: shop.address,
      phone: shop.phone,
      email: shop.email,
      services: shop.services,
      description: shop.description
    };

    console.log("Creating Shop");
    console.log(shop);

    // const success = true;
    // const shopId = Math.floor(Math.random() * 1000);

    // return success ? shopId.toString() : Promise.reject<string>(new Error("Failed to create shop"));

    const result: RequestResult = await apiService.apiRequest(`${API_PATH}/`, 'POST', inputData);

      const responseData = result.data as Record<string, unknown>;

      if (!result.success) {
        const msg = responseData.message || "Unexpected Error";
        return Promise.reject(new Error(`Failed to create the requested shop: ${msg}`));
      }

      return responseData.id as string;
  };
  
  // TODO: replace mock API call to real API call
  const deleteShop = async (shop: Shop): Promise<boolean> => {
    const data = {
      shopId: shop.shopId,
      ownerIds: shop.ownerIds,
      name: shop.name,
      address: shop.address,
      phone: shop.phone,
      email: shop.email,
      services: shop.services,
      description: shop.description
    };
    
    console.log("Deleting Shop");
    console.log(shop);

    // const success = true;

    // return success ? success : Promise.reject<boolean>(new Error("Failed to delete shop"));
    
    const result: RequestResult = await apiService.apiRequest(`${API_PATH}/${shop.shopId}`, 'DELETE', data);

    const responseData = result.data as Record<string, unknown>;

      if (!result.success) {
        const msg = responseData.message || "Unexpected Error";
        return Promise.reject<boolean>(new Error(`Failed to delete the requested shop: ${msg}`));
      }

      return result.success;
  
  };

  return {
    getShopsForUser,
    getAllShops,
    updateShop,
    createShop,
    deleteShop
  };
};