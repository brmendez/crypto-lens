import type { KeyboardEvent } from 'react';
import { useSearch } from '../context/search.context';
import styles from './styles/SearchBar.module.css';

interface SearchBarProps {
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
}

export const SearchBar = ({ onKeyDown }: SearchBarProps) => {
  const { query, setQuery, clearSearch } = useSearch();

  return (
    <div className={styles.wrapper}>
      <div className={styles.inputContainer}>
        <svg
          className={styles.searchIcon}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          className={styles.input}
          placeholder="Search coins..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={onKeyDown}
          aria-label="Search cryptocurrencies"
          autoComplete="off"
          spellCheck={false}
        />
        {query && (
          <button
            className={styles.clearButton}
            onClick={clearSearch}
            aria-label="Clear search"
            type="button"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
};
