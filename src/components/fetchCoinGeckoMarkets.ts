import { useState } from 'react';
import { fetchJson } from '../api/fetchJson';
import type { CoinMarketData } from './types';

const COINGECKO_MARKETS_URL =
  'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=12&page=1';

const fetchCoinGeckoMarkets = (): {
  marketData: Promise<CoinMarketData[]>;
} => {
  const marketData = fetchJson<CoinMarketData[]>(COINGECKO_MARKETS_URL);

  return {
    marketData,
  };
};

export const useFetchMarketData = () => {
  const [cryptoList, setCryptoList] = useState<CoinMarketData[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const { marketData } = fetchCoinGeckoMarkets();
      const data = await marketData;

      setLoading(false);
      setCryptoList(data);
    } catch (error) {
      setLoading(false);
      setError(`Failed to fetch coins: ${error}`);
    }
  };

  return {
    fetchData,
    cryptoList,
    loading,
    error,
  };
};
