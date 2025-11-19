const API_BASE_URL = "https://api.openweathermap.org/data/3.0/onecall";

interface WeatherApiParams {
  lat: number;
  lon: number;
  exclude?: string;
  units: string;
}

type WeatherData = {
  main: {
    temp: number,
    feels_like: number,
    temp_min: number,
    temp_max: number,
    pressure: number,
    humidity: number,
    sea_level: number,
    grnd_level: number
  }
};

const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
export async function getWeather({lat, lon, units = 'standard'}: WeatherApiParams): Promise<WeatherData | null> {
    // OpenWeather Current weather data APIのベースURL
    const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

    // APIコールURLを構築
    // lat, lon, appid は必須 [1]
    // units はオプション。指定しない場合は標準単位 (ケルビン) が適用される [1, 2]。
    const url = `${BASE_URL}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

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
            } catch (e) {
                // JSON解析に失敗した場合、テキストでエラーを報告
                errorMessage += ` (Could not parse error body as JSON).`;
            }
            return null;
        }

        // レスポンス形式はデフォルトでJSON形式である [1]
        const data = await response.json() as WeatherData;
        
        // 気象現象が発生しなかった場合など、一部のパラメータはレスポンスに含まれないことがある [3]。
        return data;

    } catch (error) {
        console.error('Failed to fetch weather data:', error);
        return null;
    }
}
