import { format, getHours } from 'date-fns';
import convertModule from './convert';
import backgroundModule from './background';

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
  const forecastCandle = document.querySelectorAll('.prev');
  const displayForecastTemp = document.querySelectorAll('.forecast-temp');

  const renderForecastHour = (hour) => {
    displayForecastHour.forEach((li, i) => {
      const liToDisplayHour = li;
      liToDisplayHour.textContent = hour[i];
    });
  };

  const getHigherTempOfCurrentDay = (allTemp) => {
    const allTempOfCurrentDay = [];

    allTemp.forEach((item) => {
      const { temp_c: tempC } = item;
      allTempOfCurrentDay.push(tempC);
    });

    const higherValue = allTempOfCurrentDay.reduce((p, v) => (p > v ? p : v));

    return higherValue;
  };

  const getForecastDataForNext6Hours = (allForecastData, time) => {
    const forecastTempForNext6Hours = [];
    const currentHour = getHours(new Date(time));

    for (let i = currentHour; i < currentHour + 7; i += 1) {
      forecastTempForNext6Hours.push(allForecastData[i]);
    }

    return forecastTempForNext6Hours;
  };

  const renderPercentValue = (values) => {
    forecastCandle.forEach((candle, i) => {
      const candleBody = candle;
      candleBody.style.height = `${values[i]}%`;
    });
  };

  const renderForecastTemp = (nextTemp) => {
    displayForecastTemp.forEach((li, i) => {
      const temp = li;
      const { temp_c: tempC } = nextTemp[i];
      const tempToDisplay = `${Math.round(tempC)}&#176`;
      temp.innerHTML = `${tempToDisplay}`;
    });
  };

  const renderForecastData = (data, currentTime) => {
    const { convertForecastTempInPercent, getForecastHourConvert } = convertModule;

    const higherTemp = getHigherTempOfCurrentDay(data);
    const next6hoursData = getForecastDataForNext6Hours(data, currentTime);

    renderPercentValue(convertForecastTempInPercent(next6hoursData, higherTemp));
    renderForecastTemp(next6hoursData);
    renderForecastHour(getForecastHourConvert(next6hoursData));
  };

  const renderWeatherData = (currentData, forecastData) => {
    const { changeBackgroundImage } = backgroundModule;

    const {
      name, tempC, localtime, text, cloud, humidity,
      wind, precip, code: weatherCode,
    } = currentData;

    changeBackgroundImage(weatherCode);
    renderForecastData(forecastData, localtime);

    displayLocalisation.textContent = name;
    displayTemp.innerHTML = `${tempC}&#176`;
    displayLocalTime.textContent = `${format(new Date(localtime), 'EEEE h:mm aa')}`;
    displayWeatherResume.textContent = text;
    displayCloudly.innerHTML = `${cloud}%`;
    displayHumidity.innerHTML = `${humidity}%`;
    displayWind.innerHTML = `${wind}km/h`;
    displayRain.innerHTML = `${precip}mm`;
  };

  return {
    renderWeatherData,
  };
})();

export default renderModule;
