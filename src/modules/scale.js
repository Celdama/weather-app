import convertModule from './convert';

const scaleModule = (() => {
  const scalesBtns = document.querySelectorAll('.weather-scale > button');
  const allDegreeValue = document.querySelectorAll('.degree');

  const toggleOpacityBtn = (btns) => {
    btns.forEach((btn) => {
      if (btn.classList.contains('opacity-5')) {
        btn.classList.remove('opacity-5');
        btn.disabled = true;
      } else {
        btn.classList.add('opacity-5');
        btn.disabled = false;
      }
    });
  };

  const changeScale = (scale) => {
    const { convertToF, convertToC } = convertModule;

    allDegreeValue.forEach((degree) => {
      if (scale === 'fahrenheit') {
        const valueToConvert = degree.textContent.slice(0, -1);
        degree.innerHTML = `${Math.round(convertToF(valueToConvert))}&#176F`;
      } else {
        const valueToConvert = degree.textContent.slice(0, -2);
        degree.innerHTML = `${Math.round(convertToC(valueToConvert))}&#176`;
      }
    });
  };

  const changeScaleTemperatureListener = () => {
    scalesBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        changeScale(btn.attributes['data-scale'].value);
        toggleOpacityBtn(scalesBtns);
      });
    });
  };

  return {
    changeScaleTemperatureListener,
  };
})();

export default scaleModule;
