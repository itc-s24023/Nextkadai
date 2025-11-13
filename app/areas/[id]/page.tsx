import Link from "next/link";
import { client, Area } from "@/lib/microcms";
import { fetchWeatherData } from "@/lib/weather";
import styles from "./page.module.css";

type WeatherData = {
  current: {
    temp: number;
    feels_like: number;
    humidity: number;
    weather: Array<{
      main: string;
      description: string;
    }>;
    wind_speed: number;
  };
};

async function getWeather(
  lat: string,
  lon: string
): Promise<WeatherData | null> {
  try {
    const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
    if (!apiKey) return null;

    const data = await fetchWeatherData({
      lat: parseFloat(lat),
      lon: parseFloat(lon),
      exclude: "",
      appid: apiKey,
    });

    return data;
  } catch (error) {
    console.error("Weather fetch error:", error);
    return null;
  }
}

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

  const weather = await getWeather(area.latitude, area.longitude);

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
                {Math.round(weather.current.temp)}°C
              </div>
              <div className={styles.weatherDesc}>
                {weather.current.weather[0].description}
              </div>
            </div>
            <div className={styles.weatherDetails}>
              <p>体感温度: {Math.round(weather.current.feels_like)}°C</p>
              <p>湿度: {weather.current.humidity}%</p>
              <p>風速: {weather.current.wind_speed} m/s</p>
            </div>
          </>
        ) : (
          <p>天気情報を取得できませんでした</p>
        )}
      </div>
    </div>
  );
}
