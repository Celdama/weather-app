const weatherApp = (() => {
  const displayLocalisation = document.querySelector('.localisation');
  const displayTemp = document.querySelector('.weather-deg');
  const displayLocalTime = document.querySelector('.date');
  const displayWeatherResume = document.querySelector('.weather');
  const displayCloudly = document.querySelector('.cloudly-info');
  const displayHumidity = document.querySelector('.humidity-info');
  const displayWind = document.querySelector('.wind-info');
  const displayRain = document.querySelector('.rain-info');

  const renderWeatherData = (currentData, forecastData) => {
    console.log(forecastData);

    const {
      name, tempC, localtime, text, cloud, humidity,
      wind, precip, tempF,
    } = currentData;

    displayLocalisation.textContent = name;
    displayTemp.innerHTML = `${tempC}&#176`;
    displayLocalTime.textContent = localtime;
    displayWeatherResume.textContent = text;
    displayCloudly.innerHTML = `${cloud}%`;
    displayHumidity.innerHTML = `${humidity}%`;
    displayWind.innerHTML = `${wind}km/h`;
    displayRain.innerHTML = `${precip}mm`;
  };

  const processWeatherInfo = (info) => {
    const { location, current } = info;

    const currentDayData = {
      name: location.name,
      country: location.country,
      localtime: location.localtime,
      text: current.condition,
      cloud: current.cloud,
      humidity: current.humidity,
      wind: current.wind_kph,
      precip: current.precip_mm,
      tempC: current.temp_c,
      tempF: current.temp_f,
    };

    const forecastDayData = [];
    const hours = info.forecast.forecastday[0].hour;

    hours.forEach((hour) => {
      forecastDayData.push(hour.temp_c);
    });

    return {
      currentDayData,
      forecastDayData,
    };
  };

  const getWeather = async (city) => {
    const key = '34519799bf724418a98113039211711';

    try {
      const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${key}&q=${city}&days=1&aqi=no&alerts=no`);
      response.json().then((res) => {
        const { currentDayData, forecastDayData } = processWeatherInfo(res);
        renderWeatherData(currentDayData, forecastDayData);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return {
    getWeather,
  };
})();

window.onload = () => {
  weatherApp.getWeather('new york');
};
