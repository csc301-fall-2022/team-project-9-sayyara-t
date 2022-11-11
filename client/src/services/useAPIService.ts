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
    headers.set('Content-Type', 'application/json');
    headers.set('Accept', 'application/json');

    const response = await fetch(`${API_URL}${path}`, {
      method: method,
      headers: headers,
      body: JSON.stringify(data)
    });

    result.data = await response.json();

    if (response.status === 200) {
      result.success = true;
    }

    return result;
  };

  return {
    apiRequest
  };
};