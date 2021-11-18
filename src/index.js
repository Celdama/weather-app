import format from 'date-fns/format';
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
  const displayForecastTemp = document.querySelectorAll('.forecast-temp');
  const displayForecastHour = document.querySelectorAll('.forecast-hour');
  const form = document.querySelector('form');
  const app = document.querySelector('#app');
  const main = document.querySelector('main');

  const convertForecastTempInPercent = (listOfTemp, higherTemp) => {
    const percent = [];

    listOfTemp.forEach((temp) => {
      const temperature = temp.temp_c;
      percent.push((temperature * 100) / higherTemp);
    });

    return percent;
  };

  const renderForecastHour = (hour) => {
    displayForecastHour.forEach((li, i) => {
      li.textContent = hour[i];
    });
  };

  const getForecastTimeConvert = (listOfTime) => {
    const forecastTime = [];

    listOfTime.forEach((item) => {
      const dateConvert = format(new Date(item.time), 'haa');
      forecastTime.push(dateConvert);
    });

    return forecastTime;
  };

  const renderForecastData = (data, currentTime) => {
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
    const timeValue = getForecastTimeConvert(forecastTempForNext6Hours);

    renderForecastHour(timeValue);

    forecastBar.forEach((bar, i) => {
      bar.style.height = `${percentValue[i]}%`;
    });

    displayForecastTemp.forEach((temp, i) => {
      const tempToDisplay = `${Math.round(forecastTempForNext6Hours[i].temp_c)}&#176`;
      temp.innerHTML = `${tempToDisplay}`;
    });
  };

  const changeBackgroundImage = (codeWeatherCondition) => {
    // code from API
    const sunnyCode = [1000];
    const cloudCode = [1003, 1009, 1030];
    const rainCode = [1063, 1180, 1183, 1186, 1189, 1192, 1195, 1198, 1240, 1246];
    const snowCode = [1066, 1069, 1072, 1144, 1117, 1213, 1225, 1222, 1219];

    if (sunnyCode.includes(codeWeatherCondition)) {
      app.style.backgroundImage = 'url(\'https://images.unsplash.com/photo-1586078074298-05dca4848695?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=735&q=80\')';
      main.style.backgroundImage = 'url(\'https://images.unsplash.com/photo-1586078074298-05dca4848695?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=735&q=80\')';
    } else if (cloudCode.includes(codeWeatherCondition)) {
      app.style.backgroundImage = 'url(\'https://images.unsplash.com/photo-1532178910-7815d6919875?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=735&q=80\')';
      main.style.backgroundImage = 'url(\'https://images.unsplash.com/photo-1532178910-7815d6919875?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=735&q=80\')';
    } else if (rainCode.includes(codeWeatherCondition)) {
      app.style.backgroundImage = 'url(\'https://images.unsplash.com/photo-1509635022432-0220ac12960b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80\')';
      main.style.backgroundImage = 'url(\'https://images.unsplash.com/photo-1509635022432-0220ac12960b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80\')';
    } else if (snowCode.includes(codeWeatherCondition)) {
      app.style.backgroundImage = 'url(\'https://images.unsplash.com/photo-1515106426117-7483c8b91e9b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80\')';
      main.style.backgroundImage = 'url(\'https://images.unsplash.com/photo-1515106426117-7483c8b91e9b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80\')';
    } else {
      app.style.backgroundImage = 'url(\'https://images.unsplash.com/photo-1560461311-0535e8fa1ba5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80\')';
      main.style.backgroundImage = 'url(\'https://images.unsplash.com/photo-1560461311-0535e8fa1ba5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80\')';
    }
  };

  const renderWeatherData = (currentData, forecastData) => {
    const {
      name, tempC, localtime, text, cloud, humidity,
      wind, precip, tempF, code,
    } = currentData;

    displayLocalisation.textContent = name;
    displayTemp.innerHTML = `${tempC}&#176`;
    displayLocalTime.textContent = localtime;
    displayWeatherResume.textContent = text;
    displayCloudly.innerHTML = `${cloud}%`;
    displayHumidity.innerHTML = `${humidity}%`;
    displayWind.innerHTML = `${wind}km/h`;
    displayRain.innerHTML = `${precip}mm`;

    renderForecastData(forecastData, localtime, tempC);

    changeBackgroundImage(code);
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
      code: current.condition.code,
    };

    const forecastDayDataWithHour = info.forecast.forecastday[0].hour;

    return {
      currentDayData,
      forecastDayDataWithHour,
    };
  };

  const getWeather = async (city = 'Barcelona') => {
    const key = '34519799bf724418a98113039211711';

    try {
      const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${key}&q=${city}&days=1&aqi=no&alerts=no`);
      response.json().then((res) => {
        const { currentDayData, forecastDayDataWithHour } = processWeatherInfo(res);
        renderWeatherData(currentDayData, forecastDayDataWithHour);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getSearchBarVaue = () => {
    const input = document.querySelector('input');
    return input.value;
  };

  const searchCity = () => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const city = getSearchBarVaue();
      getWeather(city);
      form.reset();
    });
  };

  return {
    getWeather,
    searchCity,
  };
})();

window.onload = () => {
  weatherApp.getWeather();
  weatherApp.searchCity();
};
