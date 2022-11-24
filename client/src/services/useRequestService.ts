import { servicesVersion } from 'typescript';
import { User, Request, RequestResult } from '../interfaces';
import { useAPIService } from './useAPIService';

export const useRequestService = () => {
  const apiService = useAPIService();
  const API_PATH = "requests/";

  // TODO: finish all required API calls
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

  const getUserByRequest = async (quoteid: string) : Promise<User> => {
    const userExample = {
        userId: "asdf",
        roleId: 1,
        username: "asdf",
        name: "asdf",
        email: "asdf",
        phone: "asdf"
    };
    console.log(quoteid);
    return userExample;
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
    getUserByRequest
  };
};