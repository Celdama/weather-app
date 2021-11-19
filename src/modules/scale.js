import convertModule from './convert';

const scaleModule = (() => {
  const scalesBtns = document.querySelectorAll('.weather-scale > button');
  const allDegreeValue = document.querySelectorAll('.degree');

  const toggleOpacityBtn = (btns) => {
    btns.forEach((btn) => {
      const scaleBtn = btn;
      if (btn.classList.contains('opacity-5')) {
        scaleBtn.classList.remove('opacity-5');
        scaleBtn.disabled = true;
      } else {
        scaleBtn.classList.add('opacity-5');
        scaleBtn.disabled = false;
      }
    });
  };

  const changeScale = (scale) => {
    const { convertToF, convertToC } = convertModule;

    allDegreeValue.forEach((degree) => {
      const displayDegree = degree;
      if (scale === 'fahrenheit') {
        const valueToConvert = degree.textContent.slice(0, -1);
        displayDegree.innerHTML = `${Math.round(convertToF(valueToConvert))}&#176F`;
      } else {
        const valueToConvert = degree.textContent.slice(0, -2);
        displayDegree.innerHTML = `${Math.round(convertToC(valueToConvert))}&#176`;
      }
    });
  };

  const changeScaleTemperatureListener = () => {
    scalesBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const { value } = btn.attributes['data-scale'];
        changeScale(value);
        toggleOpacityBtn(scalesBtns);
      });
    });
  };

  return {
    changeScaleTemperatureListener,
  };
})();

export default scaleModule;
