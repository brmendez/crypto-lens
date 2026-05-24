import { useState } from 'react';
import { fetchJson } from '../../../api/fetchJson';
import type { CoinMarketData } from '../coinList.types';
import { COINGECKO_BASE_URL, COINGECKO_REQUEST_OPTIONS } from '../../../lib/constants';

const MARKETS_URL = `${COINGECKO_BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=12&page=1`;

export const FAILED_FETCH_ERROR_MESSAGE =
  'Failed to fetch market data. Please try again in a moment';

export const useFetchMarketData = () => {
  const [cryptoList, setCryptoList] = useState<CoinMarketData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await fetchJson<CoinMarketData[]>({
        url: MARKETS_URL,
        options: COINGECKO_REQUEST_OPTIONS,
      });
      setCryptoList(data);
    } catch (err) {
      setError(`${FAILED_FETCH_ERROR_MESSAGE}: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  return { fetchData, cryptoList, loading, error };
};
