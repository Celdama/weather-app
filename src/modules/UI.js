import fetchModule from './fetchWeather';
import searchModule from './search';
import scaleModule from './scale';

const UI = (() => {
  const initApp = () => {
    const { getWeather } = fetchModule;
    const { searchCity } = searchModule;
    const { changeScaleTemperatureListener } = scaleModule;

    getWeather();
    searchCity();
    changeScaleTemperatureListener();
  };

  return {
    initApp,
  };
})();

export default UI;
