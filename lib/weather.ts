const API_BASE_URL = "https://api.openweathermap.org/data/3.0/onecall";

interface WeatherApiParams {
  lat: number;
  lon: number;
  exclude?: string;
  appid: string;
}

export async function fetchWeatherData({
  lat,
  lon,
  exclude = "",
  appid,
}: WeatherApiParams) {
  const params = new URLSearchParams({
    lat: lat.toString(),
    lon: lon.toString(),
    appid,
  });

  if (exclude) {
    params.append("exclude", exclude);
  }

  const url = `${API_BASE_URL}?${params.toString()}`;

  const response = await fetch(url);

  console.log(response)
  if (!response.ok) {
    throw new Error(`Weather API error: ${response.status}`);
  }

  return response.json();
}
