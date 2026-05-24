import type { KeyboardEvent } from 'react';
import { useSearch } from '../context/search.context';
import { SEARCH_DROPDOWN_ID, SEARCH_OPTION_ID_PREFIX } from '../../../lib/constants';
import styles from './styles/SearchBar.module.css';

interface SearchBarProps {
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
  activeIndex: number;
}

/**
 * Controlled combobox input for coin search.
 *
 * Keyboard navigation state lives in the parent (CryptoTracker) because arrow keys
 * and Enter must coordinate between this bar and the sibling SearchDropdown.
 *
 * @param onKeyDown - Keyboard handler delegated from the parent.
 * @param activeIndex - Index of the highlighted dropdown option; drives aria-activedescendant.
 */
export const SearchBar = ({ onKeyDown, activeIndex }: SearchBarProps) => {
  const { query, setQuery, clearSearch } = useSearch();
  const isExpanded = query.length >= 2;
  const activeDescendant = activeIndex >= 0 ? `${SEARCH_OPTION_ID_PREFIX}-${activeIndex}` : undefined;

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
          role="combobox"
          className={styles.input}
          placeholder="Search coins..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={onKeyDown}
          aria-label="Search cryptocurrencies"
          aria-haspopup="listbox"
          aria-expanded={isExpanded}
          aria-controls={SEARCH_DROPDOWN_ID}
          aria-autocomplete="list"
          aria-activedescendant={activeDescendant}
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
