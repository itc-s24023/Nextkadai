import Link from "next/link";
import Image from "next/image";
import { client, Area } from "@/lib/microcms";
import {
  getWeather,
  getForecast,
  getWeatherEmoji,
  getWindDirection,
} from "@/lib/weather";
import FavoriteButton from "@/app/components/FavoriteButton";
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

  const weather = await getWeather({
    lat: parseFloat(area.latitude),
    lon: parseFloat(area.longtude),
    units: "metric",
  });
  const forecast = await getForecast({
    lat: parseFloat(area.latitude),
    lon: parseFloat(area.longtude),
    units: "metric",
  });
  console.log(weather);

  // 予報データから日ごとに集約
  type DailyForecast = {
    date: string;
    temp_max: number;
    temp_min: number;
    weather: { id: number; main: string; description: string; icon: string };
    pop: number;
  };

  const dailyForecasts = forecast?.list
    .reduce((acc: DailyForecast[], item) => {
      const date = new Date(item.dt * 1000).toLocaleDateString("ja-JP", {
        month: "short",
        day: "numeric",
      });
      const existing = acc.find((f) => f.date === date);

      if (!existing) {
        acc.push({
          date,
          temp_max: item.main.temp_max,
          temp_min: item.main.temp_min,
          weather: item.weather[0],
          pop: item.pop,
        });
      } else {
        existing.temp_max = Math.max(existing.temp_max, item.main.temp_max);
        existing.temp_min = Math.min(existing.temp_min, item.main.temp_min);
      }
      return acc;
    }, [])
    .slice(0, 5);

  return (
    <div className={styles.container}>
      <Link href="/" className={styles.backLink}>
        ← 戻る
      </Link>

      <h1 className={styles.title}>{area.name}</h1>

      {area.image && (
        <Image
          src={area.image.url}
          alt={area.name}
          className={styles.image}
          width={800}
          height={400}
        />
      )}

      <div className={styles.description}>{area.description}</div>

      <div className={styles.favoriteButtonWrapper}>
        <FavoriteButton areaId={area.id} areaName={area.name} />
      </div>

      <div className={styles.weatherCard}>
        <h2>現在の天気</h2>
        {weather ? (
          <>
            <div className={styles.weatherMain}>
              <div className={styles.weatherIcon}>
                {weather.weather &&
                  weather.weather[0] &&
                  getWeatherEmoji(
                    weather.weather[0].main,
                    weather.weather[0].icon
                  )}
              </div>
              <div className={styles.temp}>
                {Math.round(weather.main.temp)}°C
              </div>
              <div className={styles.weatherDesc}>
                {weather.weather && weather.weather[0]?.description}
              </div>
            </div>
            <div className={styles.weatherDetails}>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>体感温度</span>
                <span className={styles.detailValue}>
                  {Math.round(weather.main.feels_like)}°C
                </span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>湿度</span>
                <span className={styles.detailValue}>
                  {weather.main.humidity}%
                </span>
              </div>
              {weather.wind && (
                <>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>風速</span>
                    <span className={styles.detailValue}>
                      {weather.wind.speed.toFixed(1)} m/s
                    </span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>風向</span>
                    <span className={styles.detailValue}>
                      {getWindDirection(weather.wind.deg)}
                    </span>
                  </div>
                </>
              )}
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>気圧</span>
                <span className={styles.detailValue}>
                  {weather.main.pressure} hPa
                </span>
              </div>
              {weather.visibility && (
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>視界</span>
                  <span className={styles.detailValue}>
                    {(weather.visibility / 1000).toFixed(1)} km
                  </span>
                </div>
              )}
              {weather.sys && (
                <>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>日の出</span>
                    <span className={styles.detailValue}>
                      {new Date(weather.sys.sunrise * 1000).toLocaleTimeString(
                        "ja-JP",
                        { hour: "2-digit", minute: "2-digit" }
                      )}
                    </span>
                  </div>
                  <div className={styles.detailItem}>
                    <span className={styles.detailLabel}>日の入</span>
                    <span className={styles.detailValue}>
                      {new Date(weather.sys.sunset * 1000).toLocaleTimeString(
                        "ja-JP",
                        { hour: "2-digit", minute: "2-digit" }
                      )}
                    </span>
                  </div>
                </>
              )}
            </div>
          </>
        ) : (
          <p>天気情報を取得できませんでした</p>
        )}
      </div>

      {dailyForecasts && dailyForecasts.length > 0 && (
        <div className={styles.forecastSection}>
          <h2>5日間の天気予報</h2>
          <div className={styles.forecastGrid}>
            {dailyForecasts.map((day: DailyForecast, index: number) => (
              <div key={index} className={styles.forecastCard}>
                <div className={styles.forecastDate}>{day.date}</div>
                <div className={styles.forecastIcon}>
                  {getWeatherEmoji(day.weather.main, day.weather.icon)}
                </div>
                <div className={styles.forecastTemp}>
                  <span className={styles.tempMax}>
                    {Math.round(day.temp_max)}°
                  </span>
                  <span className={styles.tempMin}>
                    {Math.round(day.temp_min)}°
                  </span>
                </div>
                <div className={styles.forecastDesc}>
                  {day.weather.description}
                </div>
                <div className={styles.forecastPop}>
                  💧 {Math.round(day.pop * 100)}%
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
