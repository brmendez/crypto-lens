import { useSearch } from '../context/search.context';
import { SEARCH_DROPDOWN_ID, SEARCH_OPTION_ID_PREFIX } from '../../../lib/constants';
import styles from './styles/SearchDropdown.module.css';

interface SearchDropdownProps {
  activeIndex: number;
  onSelect: (id: string) => void;
}

/**
 * Listbox of coin search results. Returns null when the query is fewer than 2 characters.
 *
 * Items use onMouseDown + e.preventDefault() so the input does not lose focus before
 * the click registers — without this the blur fires first and the click is swallowed.
 *
 * @param activeIndex - Index of the highlighted option; driven by parent keyboard navigation.
 * @param onSelect - Called with the coin ID when the user selects a result.
 */
export const SearchDropdown = ({ activeIndex, onSelect }: SearchDropdownProps) => {
  const { query, results, isLoadingResults } = useSearch();

  if (query.length < 2) return null;

  return (
    <ul id={SEARCH_DROPDOWN_ID} className={styles.dropdown} role="listbox" aria-label="Search results">
      {isLoadingResults ? (
        <li className={styles.message}>Searching...</li>
      ) : results.length === 0 ? (
        <li className={styles.message}>No results for &ldquo;{query}&rdquo;</li>
      ) : (
        results.map((coin, index) => (
          <li
            key={coin.id}
            id={`${SEARCH_OPTION_ID_PREFIX}-${index}`}
            className={`${styles.item} ${index === activeIndex ? styles.active : ''}`}
            role="option"
            aria-selected={index === activeIndex}
            onMouseDown={(e) => {
              e.preventDefault();
              onSelect(coin.id);
            }}
          >
            <img src={coin.thumb} alt="" className={styles.thumb} aria-hidden="true" />
            <div className={styles.info}>
              <span className={styles.name}>{coin.name}</span>
              <span className={styles.symbol}>{coin.symbol.toUpperCase()}</span>
            </div>
            <span className={styles.rank}>
              {coin.market_cap_rank !== null ? `#${coin.market_cap_rank}` : '—'}
            </span>
          </li>
        ))
      )}
    </ul>
  );
};
