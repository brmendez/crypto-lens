import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { CoinSearchResult } from '../search.types';
import type { CoinMarketData } from '../../coinList/coinList.types';
import { useCoinSearch } from '../hooks/useCoinSearch';
import { useFetchSingleCoin } from '../hooks/useFetchSingleCoin';

interface SearchContextType {
  query: string;
  results: CoinSearchResult[];
  selectedCoinId: string | null;
  searchedCoin: CoinMarketData | null;
  isSearchActive: boolean;
  isLoadingResults: boolean;
  isLoadingCoin: boolean;
  setQuery: (q: string) => void;
  selectCoin: (id: string) => void;
  clearSearch: () => void;
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
  const [query, setQueryState] = useState('');
  const [selectedCoinId, setSelectedCoinId] = useState<string | null>(() =>
    new URLSearchParams(window.location.search).get('coin')
  );

  const { results, isLoading: isLoadingResults } = useCoinSearch(query);
  const {
    coin: searchedCoin,
    isLoading: isLoadingCoin,
    refetch: refetchSingleCoin,
  } = useFetchSingleCoin(selectedCoinId);

  const isSearchActive = selectedCoinId !== null;

  const setQuery = (q: string) => setQueryState(q);

  const selectCoin = (id: string) => {
    setSelectedCoinId(id);
    setQueryState('');
    window.history.pushState({}, '', `?coin=${id}`);
  };

  const clearSearch = () => {
    setSelectedCoinId(null);
    setQueryState('');
    window.history.pushState({}, '', window.location.pathname);
  };

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
