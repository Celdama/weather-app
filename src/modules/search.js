import fetchModule from './fetchWeather';

const searchModule = (() => {
  const input = document.querySelector('input');
  const form = document.querySelector('form');
  const scalesBtn = document.querySelectorAll('.weather-scale > button');

  const getSearchBarValue = () => input.value;

  const resetScaleBtn = (btns) => {
    btns.forEach((btn) => {
      const resetBtn = btn;
      if (btn.textContent === 'Celsius') {
        resetBtn.disabled = true;
        resetBtn.className = '';
      } else {
        resetBtn.disabled = false;
        resetBtn.className = 'opacity-5';
      }
    });
  };

  const searchCity = () => {
    const { getWeather } = fetchModule;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      getWeather(getSearchBarValue());
      resetScaleBtn(scalesBtn);
      form.reset();
    });
  };

  return {
    searchCity,
  };
})();

export default searchModule;
