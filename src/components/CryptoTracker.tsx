import { useEffect, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { useFetchMarketData } from '../features/coinList/hooks/useFetchMarketData';
import { CoinListItem } from '../features/coinList/components/CoinListItem';
import { LoadingSkeleton } from '../features/coinList/components/LoadingSkeleton';
import { useTheme, DARK_THEME, LIGHT_THEME } from './ThemeContext';
import { MoonIcon, SunIcon, RefreshIcon } from '../shared/components/icons';
import { useSearch } from '../features/search/context/search.context';
import { SearchBar } from '../features/search/components/SearchBar';
import { SearchDropdown } from '../features/search/components/SearchDropdown';
import styles from './styles/CryptoTracker.module.css';

const CryptoTrackerContent = () => {
  const { fetchData, cryptoList, loading, error } = useFetchMarketData();
  const { theme, toggleTheme } = useTheme();
  const {
    results,
    isSearchActive,
    isLoadingCoin,
    searchedCoin,
    selectCoin,
    clearSearch,
    refetchSingleCoin,
  } = useSearch();

  const [rawActiveIndex, setRawActiveIndex] = useState(-1);
  const activeIndex = results.length > 0 ? Math.min(rawActiveIndex, results.length - 1) : -1;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { fetchData(); }, []);

  const isRefreshLoading = isSearchActive ? isLoadingCoin : loading;

  const handleRefreshClick = () => {
    window.gtag?.('event', 'crypto_data_refresh', {
      had_error: !!error,
      was_loading: isRefreshLoading,
    });
    if (isSearchActive) {
      refetchSingleCoin();
    } else {
      fetchData();
    }
  };

  const handleSearchKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!results.length) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setRawActiveIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setRawActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && activeIndex >= 0) {
      selectCoin(results[activeIndex].id);
      setRawActiveIndex(-1);
    } else if (e.key === 'Escape') {
      clearSearch();
      setRawActiveIndex(-1);
    }
  };

  const handleSelectCoin = (id: string) => {
    selectCoin(id);
    setRawActiveIndex(-1);
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <div className={styles.titleSection}>
            <h1 className={styles.title}>CryptoLens</h1>
            <p className={styles.subtitle}>
              Real-time cryptocurrency market insights
            </p>
          </div>
          <div className={styles.searchSection}>
            <SearchBar onKeyDown={handleSearchKeyDown} activeIndex={activeIndex} />
            <SearchDropdown activeIndex={activeIndex} onSelect={handleSelectCoin} />
          </div>
          <div className={styles.controls}>
            <button
              className={styles.themeToggle}
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === LIGHT_THEME ? DARK_THEME : LIGHT_THEME} mode`}
            >
              {theme === LIGHT_THEME ? <MoonIcon /> : <SunIcon />}
            </button>
            <button
              className={styles.refreshButton}
              onClick={handleRefreshClick}
              disabled={isRefreshLoading}
            >
              {isRefreshLoading ? (
                <>
                  <span className={styles.spinner}></span>
                  Loading...
                </>
              ) : (
                <>
                  <RefreshIcon />
                  Refresh
                </>
              )}
            </button>
          </div>
        </header>

        {error && !cryptoList.length && !isSearchActive && (
          <div className={styles.errorMessage}>
            <span className={styles.errorIcon}>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {isSearchActive ? (
          <>
            <ul className={styles.coinGrid}>
              {isLoadingCoin ? (
                <LoadingSkeleton count={1} />
              ) : (
                searchedCoin && <CoinListItem coin={searchedCoin} />
              )}
            </ul>
            {!isLoadingCoin && (
              <div className={styles.backButton}>
                <button className={styles.backToTopButton} onClick={clearSearch}>
                  ← Back to top coins
                </button>
              </div>
            )}
          </>
        ) : (
          <ul className={styles.coinGrid}>
            {loading ? (
              <LoadingSkeleton />
            ) : (
              cryptoList.map((coin) => <CoinListItem key={coin.id} coin={coin} />)
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export const CryptoTracker = () => {
  return <CryptoTrackerContent />;
};
