import styles from "./page.module.css";

export default function LoadingArea() {
  return (
    <div className={styles.container}>
      <div className={styles.backLink}>← 戻る</div>

      <div className={styles.skeletonTitle} />

      <div className={styles.skeletonImage} />

      <div className={styles.skeletonDescription} />

      <div className={styles.weatherCard}>
        <h2>天気情報を読み込んでいます...</h2>
        <div className={styles.skeletonWeather} />
      </div>
    </div>
  );
}
