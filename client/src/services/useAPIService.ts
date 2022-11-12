import { RequestResult } from "../interfaces";
import APIConfig from "./config/config.json";

export const useAPIService = () => {
  const API_URL = APIConfig.API_URL;

  const apiRequest = async (path: string, method: string, data: any) => {
    const result: RequestResult = {
      success: false,
      data: {}
    };

    const headers = new Headers();
    let requestData = null;

    if (method === "POST" || method === "PUT") {
      headers.set('Content-Type', 'application/json');
      headers.set('Accept', 'application/json');

      requestData = JSON.stringify(data);
    }

    const response = await fetch(`${API_URL}${path}`, {
      method: method,
      headers: headers,
      body: requestData
    });

    result.data = await response.json();

    if (response.status === 200) {
      result.success = true;
    }

    return result;
  };

  const privateApiRequest = async (path: string, method: string, data: any) => {
    const result: RequestResult = {
      success: false,
      data: {}
    };

    const token = sessionStorage.getItem('x-access-token');

    if (token === null) {
      result.success = false;
      result.data = { message: "Unauthorized Access" };
      return result;
    }

    const headers = new Headers();
    let requestData = null;
    
    if (method === "POST" || method === "PUT") {
      headers.set('Content-Type', 'application/json');
      headers.set('Accept', 'application/json');

      requestData = JSON.stringify(data);
    }
    
    headers.set('x-access-token', token);
    try {
    const response = await fetch(`${API_URL}${path}`, {
      method: method,
      headers: headers,
      body: requestData
    });

    result.data = await response.json();

    if (response.status === 200) {
      result.success = true;
    }

    return result;
    } catch (e) {
      console.log(e);
      return result;
    }
  };

  return {
    apiRequest,
    privateApiRequest
  };
};