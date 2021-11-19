import images from '../img/*.png';

const backgroundModule = (() => {
  const app = document.querySelector('#app');
  const main = document.querySelector('main');

  // code from API
  const sunnyCode = [1000];
  const cloudCode = [1003, 1009, 1030];
  const rainCode = [1063, 1180, 1183, 1186, 1189, 1192, 1195, 1198, 1240, 1246];
  const snowCode = [1066, 1069, 1072, 1144, 1117, 1213, 1225, 1222, 1219];

  const changeBackgroundImage = (codeWeatherCondition) => {
    if (sunnyCode.includes(codeWeatherCondition)) {
      app.style.backgroundImage = `url('${images.sunny}')`;
      main.style.backgroundImage = `url('${images.sunny}')`;
    } else if (cloudCode.includes(codeWeatherCondition)) {
      app.style.backgroundImage = `url('${images.cloudy}')`;
      main.style.backgroundImage = `url('${images.cloudy}')`;
    } else if (rainCode.includes(codeWeatherCondition)) {
      app.style.backgroundImage = `url('${images.rainy}')`;
      main.style.backgroundImage = `url('${images.rainy}')`;
    } else if (snowCode.includes(codeWeatherCondition)) {
      app.style.backgroundImage = `url('${images.snow}')`;
      main.style.backgroundImage = `url('${images.snow}')`;
    } else {
      app.style.backgroundImage = `url('${images.default}')`;
      main.style.backgroundImage = `url('${images.default}')`;
    }
  };

  return {
    changeBackgroundImage,
  };
})();

export default backgroundModule;
