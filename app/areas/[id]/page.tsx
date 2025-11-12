import Link from 'next/link';
import { client, Area } from '@/lib/microcms';
import styles from './page.module.css';

type WeatherData = {
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  weather: Array<{
    main: string;
    description: string;
  }>;
  wind: {
    speed: number;
  };
};

async function getWeather(lat: string, lon: string): Promise<WeatherData | null> {
  try {
    const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=ja`,
      { next: { revalidate: 3600 } }
    );
    
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error('Weather fetch error:', error);
    return null;
  }
}

export default async function AreaDetail({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;
  
  const area: Area = await client.get({
    endpoint: 'areas',
    contentId: id,
  });

  const weather = await getWeather(area.latitude, area.longitude);

  return (
    <div className={styles.container}>
      <Link href="/" className={styles.backLink}>← 戻る</Link>
      
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
              <div className={styles.temp}>{Math.round(weather.main.temp)}°C</div>
              <div className={styles.weatherDesc}>{weather.weather[0].description}</div>
            </div>
            <div className={styles.weatherDetails}>
              <p>体感温度: {Math.round(weather.main.feels_like)}°C</p>
              <p>湿度: {weather.main.humidity}%</p>
              <p>風速: {weather.wind.speed} m/s</p>
            </div>
          </>
        ) : (
          <p>天気情報を取得できませんでした</p>
        )}
      </div>
    </div>
  );
}