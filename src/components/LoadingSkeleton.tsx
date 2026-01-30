import styles from './styles/LoadingSkeleton.module.css';

export const LoadingSkeleton = () => {
  // Render 10 skeleton cards to match the expected number of coins
  return (
    <>
      {Array.from({ length: 10 }).map((_, index) => (
        <li key={index} className={styles.card}>
          <div className={styles.header}>
            <div className={styles.logo}></div>
            <div className={styles.titleSection}>
              <div className={styles.name}></div>
              <div className={styles.symbol}></div>
            </div>
          </div>

          <div className={styles.priceSection}>
            <div className={styles.price}></div>
            <div className={styles.badge}></div>
          </div>
        </li>
      ))}
    </>
  );
};
