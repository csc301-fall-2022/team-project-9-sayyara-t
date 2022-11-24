import { servicesVersion } from 'typescript';
import { Request, RequestResult } from '../interfaces';
import { useAPIService } from './useAPIService';
import { useUserService } from './useUserService';

export const useRequestService = () => {
  const apiService = useAPIService();
  const userService = useUserService();
  const API_PATH = "requests/";

  const getRequestByShop = async (shopId: string) : Promise<Array<Request>> => {
    const data = null;

    const requests: RequestResult =  await apiService.apiRequest(`${API_PATH}/shop/${shopId}`, 'GET', data);

    const requestsData = requests.data as Array<Record<string, unknown>>;

    return requestsData.map((request) => {
      return {
        requestId: request.requestId,
        userId: request.userId,
        shopId: request.shopId,
        vehicleId: request.vehicleId,
        quoteId: request.quoteId,
        linkedRequestId: request.linkedRequestId,
        services: request.services,
        state: request.state,
        description: request.description,
        new_used: request.new_used,
        oem_after: request.oem_after
      } as Request;
    });
  };

  const getUserByRequest = async (userId: string) : Promise<string> => {
    const user = await userService.getUser(userId).then((_user) => {
      return _user.name;
    });
    return user;
  };

  const getSelectedRequest = async (shopId: string, searchService: string, searchCustomer: string,
   state: number, rework: number): Promise<Array<Request>> => {
    
    const data = {
      name: (searchCustomer.length === 0) ? null : searchCustomer,
      service: (searchService.length === 0) ? null : searchService,
      state: state,
      rework: (rework !== 0 && rework !== 1) ? null : rework
    };

    const requests: RequestResult = await apiService.apiRequest(`${API_PATH}`, 'POST', data);

    const requestsData = requests.data as Array<Record<string, unknown>>;

    return requestsData.map((request) => {
      return {
        requestId: request.requestId,
        userId: request.userId,
        shopId: request.shopId,
        vehicleId: request.vehicleId,
        quoteId: request.quoteId,
        linkedRequestId: request.linkedRequestId,
        services: request.services,
        state: request.state,
        description: request.description,
        new_used: request.new_used,
        oem_after: request.oem_after
      } as Request;
    });
  };

  return {
    getRequestByShop,
    getUserByRequest,
    getSelectedRequest
  };
};