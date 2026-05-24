import { useState, useEffect } from 'react';
import { fetchJson } from '../../../api/fetchJson';
import type { CoinMarketData } from '../../coinList/coinList.types';
import { COINGECKO_BASE_URL, COINGECKO_REQUEST_OPTIONS } from '../../../lib/constants';

/**
 * Fetches full market data for a single coin by CoinGecko ID.
 *
 * Coin data and loading state reset synchronously on coinId change (render-phase
 * state update before the effect) to prevent a stale-data flash between selections.
 * Manual refetches are triggered via a nonce increment rather than changing coinId.
 *
 * @param coinId - CoinGecko coin ID, or null to skip fetching.
 * @returns `coin` — market data or null; `isLoading`; `refetch` — re-fetches without changing coinId.
 */
export const useFetchSingleCoin = (coinId: string | null) => {
  const [coin, setCoin] = useState<CoinMarketData | null>(null);
  const [isLoading, setIsLoading] = useState(coinId !== null);
  const [nonce, setNonce] = useState(0);
  const [prevCoinId, setPrevCoinId] = useState(coinId);

  // Render-phase reset: synchronously clears stale coin data and marks
  // loading before the fetch effect runs, eliminating the empty-grid flash.
  if (prevCoinId !== coinId) {
    setPrevCoinId(coinId);
    setCoin(null);
    setIsLoading(coinId !== null);
  }

  useEffect(() => {
    if (!coinId) return;

    let cancelled = false;
    const url = `${COINGECKO_BASE_URL}/coins/markets?vs_currency=usd&ids=${encodeURIComponent(coinId)}`;

    fetchJson<CoinMarketData[]>({ url, options: COINGECKO_REQUEST_OPTIONS })
      .then((data) => { if (!cancelled) setCoin(data[0] ?? null); })
      .catch(() => { if (!cancelled) setCoin(null); })
      .finally(() => { if (!cancelled) setIsLoading(false); });

    return () => { cancelled = true; };
  }, [coinId, nonce]);

  const refetch = () => {
    setIsLoading(true);
    setNonce((n) => n + 1);
  };

  return { coin, isLoading, refetch };
};
