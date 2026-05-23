import { useState, useEffect, useRef } from 'react';
import { fetchJson } from '../../../api/fetchJson';
import type { CoinSearchResult } from '../search.types';
import { COINGECKO_BASE_URL, COINGECKO_REQUEST_OPTIONS } from '../../../lib/constants';

interface SearchResponse {
  coins: CoinSearchResult[];
}

const DEBOUNCE_MS = 350;
const MIN_QUERY_LENGTH = 2;

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
      setResults(cached);
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const url = `${COINGECKO_BASE_URL}/search?query=${encodeURIComponent(query)}`;
        const data = await fetchJson<SearchResponse>({ url, options: COINGECKO_REQUEST_OPTIONS });
        cacheRef.current.set(query, data.coins);
        setResults(data.coins);
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
