import styles from "./LoadingSkeleton.module.css";

export default function LoadingSkeleton() {
  return (
    <div className={styles.skeletonContainer}>
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className={styles.skeletonCard}>
          <div className={styles.skeletonImage} />
          <div className={styles.skeletonContent}>
            <div className={styles.skeletonTitle} />
            <div className={styles.skeletonDescription} />
            <div
              className={styles.skeletonDescription}
              style={{ width: "80%" }}
            />
            <div className={styles.skeletonInfo}>
              <div className={styles.skeletonInfoItem} />
              <div className={styles.skeletonInfoItem} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
