export const COINGECKO_BASE_URL = 'https://api.coingecko.com/api/v3';

export const COINGECKO_REQUEST_OPTIONS: RequestInit = {
  method: 'GET',
  headers: {
    'x-cg-demo-api-key': import.meta.env.VITE_CL_API_KEY,
  },
};
