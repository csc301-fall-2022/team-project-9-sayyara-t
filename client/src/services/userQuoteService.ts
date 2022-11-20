import { User, Quote } from '../interfaces';
import { useAPIService } from './useAPIService';

// wrapper hook for all User related API services
export const useQuoteService = () => {
  const apiService = useAPIService();
  const API_PATH = "quote/";

  // TODO: finish all required API calls
  const getQuoteByShop = async (shopid: string) : Promise<Array<Quote>> => {
    console.log(shopid);
    return [];
  };

  const updatePriceByQuote = async (quoteid: string) : Promise<boolean> => {
    console.log(quoteid);
    return false;
  };

  // Return an example of User object
  const getUserByQuote = async (quoteid: string) : Promise<User> => {
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

  return {
    getQuoteByShop,
    updatePriceByQuote,
    getUserByQuote
  };
};