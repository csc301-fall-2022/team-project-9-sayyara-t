import { RequestResult, Shop } from "../interfaces";
import { useAPIService } from "./useAPIService";

// wrapper hook for all Service related API services
export const useRatingService = () => {
    const apiService = useAPIService();
    const API_PATH = "ratings/";

    const getShopRating = async (shop: Shop): Promise<number> => {
        const data = {
            shop_id: shop.shopId
        };

        const result: RequestResult = await apiService.apiRequest(`${API_PATH}shop/${shop.shopId}`, 'GET', data);
        const responseData = result.data as Record<string, unknown>;

        if (!result.success) {
            const msg = responseData.message || "Unexpected Error";
            return Promise.reject(new Error(`Failed to fetch rating: ${msg}`));
        }
        const avg = Number(responseData.average_stars);
        return avg;
    };

    const getShopPrice = async (shop: Shop): Promise<number> => {
        const data = {
            shop_id: shop.shopId
        };
        const result: RequestResult = await apiService.apiRequest(`${API_PATH}shop/${shop.shopId}`, 'GET', data);
        const responseData = result.data as Record<string, unknown>;

        if (!result.success) {
            const msg = responseData.message || "Unexpected Error";
            return Promise.reject(new Error(`Failed to fetch rating: ${msg}`));
        }
        const avg = Number(responseData.average_price);
        return avg;
    };


    return {
        getShopRating,
        getShopPrice
    };
};