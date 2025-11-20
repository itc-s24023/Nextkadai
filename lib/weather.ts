const API_BASE_URL = "https://api.openweathermap.org/data/3.0/onecall";

interface WeatherApiParams {
  lat: number;
  lon: number;
  exclude?: string;
  units: string;
}

type WeatherData = {
  coord?: {
    lon: number;
    lat: number;
  };
  weather?: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  };
  wind?: {
    speed: number;
    deg: number;
    gust?: number;
  };
  clouds?: {
    all: number;
  };
  sys?: {
    sunrise: number;
    sunset: number;
    country: string;
  };
  visibility?: number;
  dt?: number;
  timezone?: number;
  name?: string;
};

export type ForecastData = {
  list: Array<{
    dt: number;
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      humidity: number;
    };
    weather: Array<{
      id: number;
      main: string;
      description: string;
      icon: string;
    }>;
    clouds: {
      all: number;
    };
    wind: {
      speed: number;
      deg: number;
    };
    pop: number; // Probability of precipitation
    dt_txt: string;
  }>;
  city: {
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
};

// 天気アイコンを絵文字に変換
export function getWeatherEmoji(weatherMain: string, icon: string): string {
  const iconCode = icon.slice(0, 2);

  switch (iconCode) {
    case "01":
      return icon.endsWith("d") ? "☀️" : "🌙"; // Clear
    case "02":
      return icon.endsWith("d") ? "🌤️" : "🌙"; // Few clouds
    case "03":
      return "☁️"; // Scattered clouds
    case "04":
      return "☁️"; // Broken clouds
    case "09":
      return "🌧️"; // Shower rain
    case "10":
      return icon.endsWith("d") ? "🌦️" : "🌧️"; // Rain
    case "11":
      return "⛈️"; // Thunderstorm
    case "13":
      return "❄️"; // Snow
    case "50":
      return "🌫️"; // Mist
    default:
      return "🌡️";
  }
}

// 風向きを文字列に変換
export function getWindDirection(deg: number): string {
  const directions = ["北", "北東", "東", "南東", "南", "南西", "西", "北西"];
  const index = Math.round(deg / 45) % 8;
  return directions[index];
}

const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

export async function getWeather({
  lat,
  lon,
  units = "standard",
}: WeatherApiParams): Promise<WeatherData | null> {
  // OpenWeather Current weather data APIのベースURL
  const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

  // APIコールURLを構築
  // lat, lon, appid は必須 [1]
  // units はオプション。指定しない場合は標準単位 (ケルビン) が適用される [1, 2]。
  const url = `${BASE_URL}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}&lang=ja`;

  try {
    console.log(`Calling API: ${url}`); // どのURLをコールしているか確認

    // Node.jsのfetchを使用してAPIを呼び出す
    // 注意: Node.jsの古いバージョンでは、組み込みのfetchを使用するには実験的なフラグやpolyfillが必要な場合があります。
    const response = await fetch(url);

    // レスポンスが正常でなかった場合のエラー処理
    if (!response.ok) {
      // エラーの詳細をJSONで取得しようと試みる
      let errorMessage = `HTTP error! Status: ${response.status}`;
      try {
        const errorData = await response.json();
        errorMessage += `. Details: ${JSON.stringify(errorData)}`;
      } catch {
        // JSON解析に失敗した場合、テキストでエラーを報告
        errorMessage += ` (Could not parse error body as JSON).`;
      }
      console.error(errorMessage);
      return null;
    }

    // レスポンス形式はデフォルトでJSON形式である [1]
    const data = (await response.json()) as WeatherData;

    // 気象現象が発生しなかった場合など、一部のパラメータはレスポンスに含まれないことがある [3]。
    return data;
  } catch (error) {
    console.error("Failed to fetch weather data:", error);
    return null;
  }
}

// 5日間の天気予報を取得
export async function getForecast({
  lat,
  lon,
  units = "standard",
}: WeatherApiParams): Promise<ForecastData | null> {
  const BASE_URL = "https://api.openweathermap.org/data/2.5/forecast";
  const url = `${BASE_URL}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}&lang=ja`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      let errorMessage = `HTTP error! Status: ${response.status}`;
      try {
        const errorData = await response.json();
        errorMessage += `. Details: ${JSON.stringify(errorData)}`;
      } catch {
        errorMessage += ` (Could not parse error body as JSON).`;
      }
      console.error(errorMessage);
      return null;
    }

    const data = (await response.json()) as ForecastData;
    return data;
  } catch (error) {
    console.error("Failed to fetch forecast data:", error);
    return null;
  }
}
