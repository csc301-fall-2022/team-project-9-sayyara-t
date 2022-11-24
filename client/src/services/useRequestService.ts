import { Request, RequestResult } from '../interfaces';
import { useAPIService } from './useAPIService';
import { useUserService } from './useUserService';

export const useRequestService = () => {
  const apiService = useAPIService();
  const userService = useUserService();
  const API_PATH = "requests/";

  const createRequest = async (request: Request): Promise<boolean> => {
    const data = {
      user_id: request.userId,
      shop_id: request.shopId,
      vehicle_id: request.vehicleId,
      linked_request_id: request.linkedRequestId.length > 0 ? request.linkedRequestId : null,
      services: request.services,
      state: request.state,
      description: request.description,
      new_used: request.newUsed,
      oem_after: request.oemAfter
    };

    const result: RequestResult = await apiService.privateApiRequest(`${API_PATH}`, "POST", data);

    const responseData = result.data as Record<string, unknown>;

    if (!result.success) {
      const msg = responseData.message || "Unexpected Error";
      return Promise.reject(new Error(`Failed to create the request: ${msg}`));
    }

    return true;
  };

  const updateRequest = async (request: Request): Promise<boolean> => {
    const data = {
      user_id: request.userId,
      shop_id: request.shopId,
      vehicle_id: request.vehicleId,
      linked_request_id: request.linkedRequestId,
      services: request.services,
      state: request.state,
      description: request.description,
      new_used: request.newUsed,
      oem_after: request.oemAfter
    };

    const result: RequestResult = await apiService.privateApiRequest(`${API_PATH}${request.requestId}`, "PUT", data);

    const responseData = result.data as Record<string, unknown>;

    if (!result.success) {
      const msg = responseData.message || "Unexpected Error";
      return Promise.reject(new Error(`Failed to update the request: ${msg}`));
    }

    return true;
  };

  const deleteRequest = async (requestId: string): Promise<boolean> => {
    const result: RequestResult = await apiService.privateApiRequest(`${API_PATH}${requestId}`, "DELETE", {});

    const responseData = result.data as Record<string, unknown>;

    if (!result.success) {
      const msg = responseData.message || "Unexpected Error";
      return Promise.reject(new Error(`Failed to update the request: ${msg}`));
    }

    return true;
  };

  const getRequestsbyUserId = async (userId: string): Promise<Request[]> => {
    const result: RequestResult = await apiService.privateApiRequest(`${API_PATH}user/${userId}`, "GET", {});

    const data = result.data as Record<string, unknown>;

    if (!result.success) {
      const msg = data.message || "Unexpected Error";
      return Promise.reject(new Error(`Failed to fetch requests: ${msg}`));
    }

    const responseData = result.data as Array<Record<string, unknown>>;

    return responseData.map((request) => {
      return {
        requestId: request.id,
        userId: request.user_id,
        shopId: request.shop_id,
        vehicleId: request.vehicle_id,
        linkedRequestId: request.linked_request_id,
        services: request.services,
        state: request.state,
        description: request.description,
        newUsed: request.new_used,
        oemAfter: request.oem_after,
        quoteId: request.quote_id
      } as Request;
    });
  };

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
    createRequest,
    updateRequest,
    deleteRequest,
    getRequestsbyUserId,
    getRequestByShop,
    getUserByRequest,
    getSelectedRequest
  };
};