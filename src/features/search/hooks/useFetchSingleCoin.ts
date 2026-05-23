import { useState, useEffect } from 'react';
import { fetchJson } from '../../../api/fetchJson';
import type { CoinMarketData } from '../../coinList/coinList.types';
import { COINGECKO_BASE_URL, COINGECKO_REQUEST_OPTIONS } from '../../../lib/constants';

export const useFetchSingleCoin = (coinId: string | null) => {
  const [coin, setCoin] = useState<CoinMarketData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [nonce, setNonce] = useState(0);

  useEffect(() => {
    if (!coinId) return;

    let cancelled = false;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsLoading(true);
    const url = `${COINGECKO_BASE_URL}/coins/markets?vs_currency=usd&ids=${encodeURIComponent(coinId)}`;

    fetchJson<CoinMarketData[]>({ url, options: COINGECKO_REQUEST_OPTIONS })
      .then((data) => { if (!cancelled) setCoin(data[0] ?? null); })
      .catch(() => { if (!cancelled) setCoin(null); })
      .finally(() => { if (!cancelled) setIsLoading(false); });

    return () => { cancelled = true; };
  }, [coinId, nonce]);

  const refetch = () => setNonce((n) => n + 1);

  return { coin, isLoading, refetch };
};
