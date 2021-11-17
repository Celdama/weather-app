const { async } = require('regenerator-runtime');

const renderWeatherData = (data) => {
  console.log(data);
  const { name, temp } = data;

  const displayLocalisation = document.querySelector('.localisation');
  const displayTemp = document.querySelector('.weather-deg');

  displayLocalisation.textContent = name;
  displayTemp.innerHTML = `${temp}&#176`;
};

const processWeatherInfo = (info) => {
  const { name, country } = info.location;
  const { temp_c } = info.current;

  const requiredInfo = {
    name,
    country,
    temp: temp_c,
  };

  return requiredInfo;
};

const getWeather = async (city) => {
  try {
    const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=34519799bf724418a98113039211711&q=${city}&aqi=no`);
    response.json().then((res) => {
      const display = processWeatherInfo(res);
      renderWeatherData(display);
    });
  } catch (error) {
    console.log(error);
  }
};

window.onload = function () {
  getWeather('los angeles');
};
