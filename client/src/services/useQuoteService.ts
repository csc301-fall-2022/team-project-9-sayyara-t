import React from 'react';
import { Quote, RequestResult } from '../interfaces';
import { useAPIService } from './useAPIService';

export const useQuoteService = () => {
  const apiService = useAPIService();
  const API_PATH = "quotes/";

  const createQuote = async (quote: Quote): Promise<string> => {
    const data = {
      labour: quote.labour,
      parts: {"parts": quote.parts},
      fees: { "fees": quote.fees },
      discount: quote.discount,
      total: quote.total,
      note: quote.note
    };

    const result: RequestResult = await apiService.privateApiRequest(`${API_PATH}`, "POST", data);

    const responseData = result.data as Record<string, unknown>;

    if (!result.success) {
      const msg = responseData.message || "Unexpected Error";
      return Promise.reject(new Error(`Failed to create the quote: ${msg}`));
    }

    return responseData.id as string;
  };

  const updateQuote = async (quote: Quote): Promise<boolean> => {
    const data = {
      labour: quote.labour,
      parts: {"parts": quote.parts},
      fees: { "fees": quote.fees },
      discount: quote.discount,
      total: quote.total,
      note: quote.note
    };

    const result: RequestResult = await apiService.privateApiRequest(`${API_PATH}${quote.quoteId}`, "PUT", data);

    const responseData = result.data as Record<string, unknown>;

    if (!result.success) {
      const msg = responseData.message || "Unexpected Error";
      return Promise.reject(new Error(`Failed to create the quote: ${msg}`));
    }

    return true;
  };

  const getQuoteById = async (quoteId: string): Promise<Quote> => {
    const result: RequestResult = await apiService.privateApiRequest(`${API_PATH}${quoteId}`, "GET", {});

    const data = result.data as Record<string, unknown>;

    if (!result.success) {
      const msg = data.message || "Unexpected Error";
      return Promise.reject<Quote>(new Error(`Failed to fetch quote: ${msg}`));
    }

    const quote: Quote = {
      quoteId: data.id as string,
      labour: data.labour as number,
      parts: (data.parts as Record<string, number>)["parts"] as number,
      fees: (data.fees as Record<string, number>)["fees"] as number,
      discount: data.discount as number,
      total: data.total as number,
      note: data.note as string
    };

    return quote;
  };

  return {
    createQuote,
    updateQuote,
    getQuoteById
  };
};
