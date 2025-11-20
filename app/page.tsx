import { client, Area } from "@/lib/microcms";
import AreaList from "./components/AreaList";
import styles from "./page.module.css";

export default async function Home() {
  const data = await client.get({
    endpoint: "areas",
  });

  const areas: Area[] = data.contents;

  // 地域ごとの特徴を追加
  const areaFeatures: Record<
    string,
    { badge: string; icon: string; tip: string }
  > = {
    naha: { badge: "都市部", icon: "🏙️", tip: "ショッピング＆観光" },
    nago: { badge: "リゾート", icon: "🏖️", tip: "美ら海水族館近く" },
    ishigaki: { badge: "離島", icon: "🏝️", tip: "美しいビーチ" },
    miyako: { badge: "離島", icon: "🌊", tip: "透明度抜群の海" },
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>🌴 沖縄天気ナビ</h1>
        <p className={styles.subtitle}>Okinawa Weather Navigator</p>
        <p className={styles.description}>
          美しい沖縄の各地域の天気情報をリアルタイムでお届けします
        </p>
      </header>

      <div className={styles.gridWrapper}>
        <AreaList areas={areas} areaFeatures={areaFeatures} />
      </div>
    </div>
  );
}
