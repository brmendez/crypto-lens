import styles from './styles/LoadingSkeleton.module.css';

interface LoadingSkeletonProps {
  count?: number;
}

export const LoadingSkeleton = ({ count = 10 }: LoadingSkeletonProps) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
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
