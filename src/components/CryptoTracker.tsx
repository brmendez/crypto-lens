import { useEffect } from 'react';
import { useFetchMarketData } from './fetchCoinGeckoMarkets';
import { CoinListItem } from './CoinListItem';
import { LoadingSkeleton } from './LoadingSkeleton';
import { ThemeProvider, useTheme } from './ThemeContext';
import { MoonIcon, SunIcon, RefreshIcon } from './icons';
import styles from './styles/CryptoTracker.module.css';

const CryptoTrackerContent = () => {
  const { fetchData, cryptoList, loading, error } = useFetchMarketData();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    fetchData();
  }, []);

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
          <div className={styles.controls}>
            <button
              className={styles.themeToggle}
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? <MoonIcon /> : <SunIcon />}
            </button>
            <button
              className={styles.refreshButton}
              onClick={fetchData}
              disabled={loading}
            >
              {loading ? (
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

        {error && (
          <div className={styles.errorMessage}>
            <span className={styles.errorIcon}>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        <ul className={styles.coinGrid}>
          {loading ? (
            <LoadingSkeleton />
          ) : (
            cryptoList.map((coin) => <CoinListItem key={coin.id} coin={coin} />)
          )}
        </ul>
      </div>
    </div>
  );
};

export const CryptoTracker = () => {
  return (
    <ThemeProvider>
      <CryptoTrackerContent />
    </ThemeProvider>
  );
};
