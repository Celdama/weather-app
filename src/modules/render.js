import { format, getHours } from 'date-fns';
import convertModule from './convert';

const renderModule = (() => {
  const displayLocalisation = document.querySelector('.localisation');
  const displayTemp = document.querySelector('.weather-deg');
  const displayLocalTime = document.querySelector('.date');
  const displayWeatherResume = document.querySelector('.weather');
  const displayCloudly = document.querySelector('.cloudly-info');
  const displayHumidity = document.querySelector('.humidity-info');
  const displayWind = document.querySelector('.wind-info');
  const displayRain = document.querySelector('.rain-info');
  const displayForecastHour = document.querySelectorAll('.forecast-hour');
  const forecastBar = document.querySelectorAll('.prev');
  const displayForecastTemp = document.querySelectorAll('.forecast-temp');

  const renderForecastHour = (hour) => {
    displayForecastHour.forEach((li, i) => {
      li.textContent = hour[i];
    });
  };

  const renderForecastData = (data, currentTime) => {
    const { convertForecastTempInPercent, getForecastHourConvert } = convertModule;
    const allTempOfThisDay = [];

    data.forEach((item) => {
      allTempOfThisDay.push(item.temp_c);
    });

    const higherDayTemp = allTempOfThisDay.reduce((p, v) => (p > v ? p : v));
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

    const percentValue = convertForecastTempInPercent(forecastTempForNext6Hours, higherDayTemp);
    const timeValue = getForecastHourConvert(forecastTempForNext6Hours);

    forecastBar.forEach((bar, i) => {
      bar.style.height = `${percentValue[i]}%`;
    });

    displayForecastTemp.forEach((temp, i) => {
      const tempToDisplay = `${Math.round(forecastTempForNext6Hours[i].temp_c)}&#176`;
      temp.innerHTML = `${tempToDisplay}`;
    });

    return {
      timeValue,
    };
  };

  const renderWeatherData = (currentData) => {
    const {
      name, tempC, localtime, text, cloud, humidity,
      wind, precip, code: weatherCode,
    } = currentData;

    displayLocalisation.textContent = name;
    displayTemp.innerHTML = `${tempC}&#176`;
    displayLocalTime.textContent = `${format(new Date(localtime), 'EEEE h:mm aa')}`;
    displayWeatherResume.textContent = text;
    displayCloudly.innerHTML = `${cloud}%`;
    displayHumidity.innerHTML = `${humidity}%`;
    displayWind.innerHTML = `${wind}km/h`;
    displayRain.innerHTML = `${precip}mm`;

    return {
      weatherCode,
      localtime,
    };
  };

  return {
    renderWeatherData,
    renderForecastHour,
    renderForecastData,
  };
})();

export default renderModule;
