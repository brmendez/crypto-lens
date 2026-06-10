import type { KeyboardEvent } from 'react';
import { useSearch } from '../context/search.context';
import {
  SEARCH_DROPDOWN_ID,
  SEARCH_OPTION_ID_PREFIX,
} from '../../../lib/constants';
import { SearchIcon } from '../../../shared/components/icons';
import styles from './styles/SearchBar.module.css';

interface SearchBarProps {
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
  activeIndex: number;
}

export const SearchBar = ({ onKeyDown, activeIndex }: SearchBarProps) => {
  const { query, setQuery, clearSearch } = useSearch();
  const isExpanded = query.length >= 2;
  const activeDescendant =
    activeIndex >= 0 ? `${SEARCH_OPTION_ID_PREFIX}-${activeIndex}` : undefined;

  return (
    <div className={styles.wrapper}>
      <div className={styles.inputContainer}>
        <div className={styles.searchIcon}>
          <SearchIcon />
        </div>
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
            onClick={() => clearSearch('button')}
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
