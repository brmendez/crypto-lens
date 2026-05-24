import { useState, useEffect, useRef } from 'react';
import { fetchJson } from '../../../api/fetchJson';
import type { CoinSearchResult } from '../search.types';
import { COINGECKO_BASE_URL, COINGECKO_REQUEST_OPTIONS } from '../../../lib/constants';
import { trackEvent } from '../../../lib/analytics';

interface SearchResponse {
  coins: CoinSearchResult[];
}

const DEBOUNCE_MS = 350;
const MIN_QUERY_LENGTH = 2;

/**
 * Debounced coin search against the CoinGecko search API.
 * Results are cached in memory per query. GA4 search events fire on network requests only —
 * cache hits are intentionally excluded to track clean, network-triggered signal.
 */
export const useCoinSearch = (query: string) => {
  const [results, setResults] = useState<CoinSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const cacheRef = useRef<Map<string, CoinSearchResult[]>>(new Map());

  useEffect(() => {
    if (query.length < MIN_QUERY_LENGTH) {
      setResults([]);
      return;
    }

    const cached = cacheRef.current.get(query);
    if (cached) {
      // cache hit — intentionally skipped per analytics spec (network-only signal)
      setResults(cached);
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const url = `${COINGECKO_BASE_URL}/search?query=${encodeURIComponent(query)}`;
        const data = await fetchJson<SearchResponse>({ url, options: COINGECKO_REQUEST_OPTIONS });
        const coins = data.coins ?? [];
        cacheRef.current.set(query, coins);
        setResults(coins);
        if (coins.length > 0) {
          trackEvent('search_results_returned', { query, result_count: coins.length });
        } else {
          trackEvent('search_no_results', { query });
        }
      } catch {
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }, DEBOUNCE_MS);

    return () => clearTimeout(timer);
  }, [query]);

  return { results, isLoading };
};
