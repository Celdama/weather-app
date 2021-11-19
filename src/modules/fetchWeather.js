import backgroundModule from './background';
import renderModule from './render';

const fetchModule = (() => {
  const processWeatherInfo = (info) => {
    const { location, current } = info;

    const currentDayData = {
      name: location.name,
      country: location.country,
      localtime: location.localtime,
      text: current.condition.text,
      cloud: current.cloud,
      humidity: current.humidity,
      wind: current.wind_kph,
      precip: current.precip_mm,
      tempC: current.temp_c,
      tempF: current.temp_f,
      code: current.condition.code,
    };

    const forecastDayData = info.forecast.forecastday[0].hour;

    return {
      currentDayData,
      forecastDayData,
    };
  };

  const getWeather = async (city = 'Barcelona') => {
    const { changeBackgroundImage } = backgroundModule;
    const { renderForecastHour, renderForecastData, renderWeatherData } = renderModule;
    const key = '34519799bf724418a98113039211711';

    try {
      const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${key}&q=${city}&days=1&aqi=no&alerts=no`);
      response.json().then((res) => {
        const { currentDayData, forecastDayData } = processWeatherInfo(res);
        const { code, localtime } = renderWeatherData(currentDayData, forecastDayData);
        const { timeValue } = renderForecastData(forecastDayData, localtime);
        renderForecastHour(timeValue);
        changeBackgroundImage(code);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return {
    getWeather,
  };
})();

export default fetchModule;
