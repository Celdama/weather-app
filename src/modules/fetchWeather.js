import backgroundModule from './background';
import renderModule from './render';

const fetchModule = (() => {
  const processWeatherInfo = (info) => {
    const { location, current } = info;
    const { hour } = info.forecast.forecastday[0];
    const { name, localtime } = location;
    const { text, code } = current.condition;
    const {
      cloud, humidity, wind_kph: wind, precip_mm: precip, temp_c: tempC,
    } = current;

    const currentData = {
      name,
      localtime,
      text,
      cloud,
      humidity,
      wind,
      precip,
      tempC,
      code,
    };

    const forecastData = hour;

    return {
      currentData,
      forecastData,
    };
  };

  const getWeather = async (city = 'Barcelona') => {
    const { renderWeatherData } = renderModule;
    // never keep api key on the frontend, but for the moment I don't have a backend
    const key = '34519799bf724418a98113039211711';

    try {
      const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${key}&q=${city}&days=1&aqi=no&alerts=no`);
      response.json().then((res) => {
        const { currentData, forecastData } = processWeatherInfo(res);
        renderWeatherData(currentData, forecastData);
      });
    } catch (error) {
      throw new Error('error in getWeather function', error);
    }
  };

  return {
    getWeather,
  };
})();

export default fetchModule;
