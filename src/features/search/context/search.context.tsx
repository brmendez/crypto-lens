import { createContext, useCallback, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { CoinSearchResult } from '../search.types';
import type { CoinMarketData } from '../../coinList/coinList.types';
import { useCoinSearch } from '../hooks/useCoinSearch';
import { useFetchSingleCoin } from '../hooks/useFetchSingleCoin';
import { trackEvent } from '../../../lib/analytics';

interface SearchContextType {
  query: string;
  results: CoinSearchResult[];
  selectedCoinId: string | null;
  searchedCoin: CoinMarketData | null;
  isSearchActive: boolean;
  isLoadingResults: boolean;
  isLoadingCoin: boolean;
  setQuery: (q: string) => void;
  /** @param method — how the coin was chosen; passed to GA4 `search_coin_selected` (analytics only, does not affect selection behavior) */
  selectCoin: (id: string, method?: 'mouse' | 'keyboard') => void;
  /** @param method — what triggered the dismissal; passed to GA4 `search_cleared` (analytics only, does not affect clear behavior) */
  clearSearch: (method?: 'button' | 'escape' | 'back_button') => void;
  refetchSingleCoin: () => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

const USE_SEARCH_ERROR = 'useSearch must be used within a SearchProvider';

// eslint-disable-next-line react-refresh/only-export-components
export const useSearch = (): SearchContextType => {
  const context = useContext(SearchContext);
  if (!context) throw new Error(USE_SEARCH_ERROR);
  return context;
};

interface SearchProviderProps {
  children: ReactNode;
}

export const SearchProvider = ({ children }: SearchProviderProps) => {
  const [query, setQuery] = useState('');
  const [selectedCoinId, setSelectedCoinId] = useState<string | null>(() =>
    new URLSearchParams(window.location.search).get('coin')
  );

  useEffect(() => {
    const onPop = () => {
      setSelectedCoinId(new URLSearchParams(window.location.search).get('coin'));
      setQuery('');
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const { results, isLoading: isLoadingResults } = useCoinSearch(query);
  const {
    coin: searchedCoin,
    isLoading: isLoadingCoin,
    refetch: refetchSingleCoin,
  } = useFetchSingleCoin(selectedCoinId);

  const isSearchActive = selectedCoinId !== null;

  const selectCoin = useCallback(
    (id: string, method?: 'mouse' | 'keyboard') => {
      trackEvent('search_coin_selected', {
        coin_id: id,
        query,
        selection_method: method ?? 'mouse',
      });
      setSelectedCoinId(id);
      setQuery('');
      window.history.pushState({}, '', `?coin=${id}`);
    },
    [query]
  );

  const clearSearch = useCallback(
    (method?: 'button' | 'escape' | 'back_button') => {
      trackEvent('search_cleared', {
        query,
        had_active_coin: selectedCoinId !== null,
        clear_method: method ?? 'button',
      });
      setSelectedCoinId(null);
      setQuery('');
      window.history.pushState({}, '', window.location.pathname);
    },
    [query, selectedCoinId]
  );

  return (
    <SearchContext.Provider
      value={{
        query,
        results,
        selectedCoinId,
        searchedCoin,
        isSearchActive,
        isLoadingResults,
        isLoadingCoin,
        setQuery,
        selectCoin,
        clearSearch,
        refetchSingleCoin,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
