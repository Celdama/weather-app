import fetchModule from './fetchWeather';

const searchModule = (() => {
  const input = document.querySelector('input');
  const form = document.querySelector('form');
  const scalesBtn = document.querySelectorAll('.weather-scale > button');

  const getSearchBarValue = () => input.value;

  const resetScaleBtn = (btns) => {
    btns.forEach((btn) => {
      if (btn.textContent === 'Celsius') {
        btn.disabled = true;
        btn.className = '';
      } else {
        btn.disabled = false;
        btn.className = 'opacity-5';
      }
    });
  };

  const searchCity = () => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const city = getSearchBarValue();
      fetchModule.getWeather(city);
      resetScaleBtn(scalesBtn);
      form.reset();
    });
  };

  return {
    searchCity,
  };
})();

export default searchModule;
