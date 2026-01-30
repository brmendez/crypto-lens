import type { CoinMarketData } from './types';
import styles from './styles/CoinCard.module.css';

interface CoinListItemProps {
  coin: CoinMarketData;
}

export const CoinListItem = ({ coin }: CoinListItemProps) => {
  const isPositive = coin.price_change_percentage_24h >= 0;
  const formattedPrice = coin.current_price.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const formattedChange = Math.abs(coin.price_change_percentage_24h).toFixed(2);

  return (
    <li className={styles.card}>
      <div className={styles.header}>
        <img
          src={coin.image}
          alt={`${coin.name} logo`}
          className={styles.logo}
        />
        <div className={styles.titleSection}>
          <h3 className={styles.name}>{coin.name}</h3>
          <span className={styles.symbol}>{coin.symbol}</span>
        </div>
      </div>

      <div className={styles.priceSection}>
        <p className={styles.price}>{formattedPrice}</p>
        <div className={styles.changeContainer}>
          <span
            className={`${styles.changeBadge} ${isPositive ? styles.positive : styles.negative}`}
          >
            <span className={styles.changeIcon}>{isPositive ? '▲' : '▼'}</span>
            {formattedChange}%
          </span>
        </div>
      </div>
    </li>
  );
};
