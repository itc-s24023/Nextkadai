import Link from "next/link";
import Image from "next/image";
import { client, Area } from "@/lib/microcms";
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
        <div className={styles.grid}>
          {areas.map((area, index) => {
            const feature = areaFeatures[area.id] || {
              badge: "観光地",
              icon: "🌺",
              tip: "魅力的なスポット",
            };

            return (
              <Link
                href={`/areas/${area.id}`}
                key={area.id}
                className={styles.card}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {area.image && (
                  <div className={styles.imageWrapper}>
                    <div className={styles.badge}>{feature.badge}</div>
                    <Image
                      src={area.image.url}
                      alt={area.name}
                      className={styles.image}
                      width={400}
                      height={220}
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                )}
                <div className={styles.cardContent}>
                  <h2 className={styles.cardTitle}>{area.name}</h2>
                  <p className={styles.cardDescription}>{area.description}</p>

                  <div className={styles.cardInfo}>
                    <div className={styles.infoItem}>
                      <span className={styles.infoIcon}>{feature.icon}</span>
                      <span className={styles.infoText}>{feature.tip}</span>
                    </div>
                    <div className={styles.infoItem}>
                      <span className={styles.infoIcon}>🌡️</span>
                      <span className={styles.infoText}>リアルタイム気温</span>
                    </div>
                  </div>
                </div>

                <div className={styles.cardFooter}>
                  <span>天気を見る</span>
                  <span className={styles.liveIndicator}>
                    <span className={styles.pulse}></span>
                    Live
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
