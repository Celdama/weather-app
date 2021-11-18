import getHours from 'date-fns/getHours';

const weatherApp = (() => {
  const displayLocalisation = document.querySelector('.localisation');
  const displayTemp = document.querySelector('.weather-deg');
  const displayLocalTime = document.querySelector('.date');
  const displayWeatherResume = document.querySelector('.weather');
  const displayCloudly = document.querySelector('.cloudly-info');
  const displayHumidity = document.querySelector('.humidity-info');
  const displayWind = document.querySelector('.wind-info');
  const displayRain = document.querySelector('.rain-info');
  const forecastBar = document.querySelectorAll('.prev');
  const currentBar = document.querySelector('.current');
  const displayCurrentHour = document.querySelector('.current-hour');
  const displayCurrentTemp = document.querySelector('.current-temp');
  const displayForecastTemp = document.querySelectorAll('.forecast-temp');

  const convertForecastTempInPercent = (listOfTemp, higherTemp) => {
    const percent = [];

    listOfTemp.forEach((temp) => {
      percent.push((temp * 100) / higherTemp);
    });

    return percent;
  };

  const renderForecastData = (data, currentTime, currentTemp) => {
    const higherDayTemp = data.reduce((p, v) => (p > v ? p : v));
    let currentHour = getHours(new Date(currentTime));
    const forecastTempForNext6Hours = [];

    data.forEach((temp, i) => {
      let dataPush = i;

      if (dataPush < 7) {
        forecastTempForNext6Hours.push(data[currentHour]);
      }

      dataPush += 1;

      currentHour += 1;
      if (currentHour > 23) {
        currentHour = 0;
      }
    });

    displayCurrentHour.textContent = currentHour > 12
      ? `${currentHour}PM` : `${currentHour}AM`;

    displayCurrentTemp.innerHTML = `${Math.round(currentTemp)}&#176`;

    console.log(currentBar);
    currentBar.style.height = `${(currentTemp * 100) / higherDayTemp}%`;
    // console.log((currentTemp * 100) / higherDayTemp);

    const percentValue = convertForecastTempInPercent(forecastTempForNext6Hours, higherDayTemp);

    forecastBar.forEach((bar, i) => {
      bar.style.height = `${percentValue[i]}%`;
    });

    displayForecastTemp.forEach((temp, i) => {
      temp.innerHTML = `${Math.round(forecastTempForNext6Hours[i])}&#176`;
    });
  };

  const renderWeatherData = (currentData, forecastData) => {
    const {
      name, tempC, localtime, text, cloud, humidity,
      wind, precip, tempF,
    } = currentData;

    // console.log(currentData);

    displayLocalisation.textContent = name;
    displayTemp.innerHTML = `${tempC}&#176`;
    displayLocalTime.textContent = localtime;
    displayWeatherResume.textContent = text;
    displayCloudly.innerHTML = `${cloud}%`;
    displayHumidity.innerHTML = `${humidity}%`;
    displayWind.innerHTML = `${wind}km/h`;
    displayRain.innerHTML = `${precip}mm`;

    renderForecastData(forecastData, localtime, tempC);
  };

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
        console.log(res);
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
  weatherApp.getWeather('paris');
};
