import Link from "next/link";
import { client, Area } from "@/lib/microcms";
import { getWeather } from "@/lib/weather";
import styles from "./page.module.css";



export default async function AreaDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const area: Area = await client.get({
    endpoint: "areas",
    contentId: id,
  });
  console.log(area);

  const weather = await getWeather({lat: parseFloat(area.latitude), lon: parseFloat(area.longtude), units: "metric"});
  console.log(weather);

  return (
    <div className={styles.container}>
      <Link href="/" className={styles.backLink}>
        ← 戻る
      </Link>

      <h1 className={styles.title}>{area.name}</h1>

      {area.image && (
        <img src={area.image.url} alt={area.name} className={styles.image} />
      )}

      <div className={styles.description}>{area.description}</div>

      <div className={styles.weatherCard}>
        <h2>現在の天気</h2>
        {weather ? (
          <>
            <div className={styles.weatherMain}>
              <div className={styles.temp}>
                {Math.round(weather.main.temp)}°C
              </div>
              <div className={styles.weatherDesc}>
                {/* {weather.main.description} */}
              </div>
            </div>
            <div className={styles.weatherDetails}>
              <p>体感温度: {Math.round(weather.main.feels_like)}°C</p>
              <p>湿度: {weather.main.humidity}%</p>
            </div>
          </>
        ) : (
          <p>天気情報を取得できませんでした</p>
        )}
      </div>
    </div>
  );
}
