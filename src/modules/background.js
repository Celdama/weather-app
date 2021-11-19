import images from '../img/*.png';

const backgroundModule = (() => {
  const app = document.querySelector('#app');
  const main = document.querySelector('main');

  // code from API
  const sunnyCode = [1000];
  const cloudCode = [1003, 1009, 1030];
  const rainCode = [1063, 1180, 1183, 1186, 1189, 1192, 1195, 1198, 1240, 1246];
  const snowCode = [1066, 1069, 1072, 1144, 1117, 1213, 1225, 1222, 1219];

  const setBackgroundUrl = (targets, imgUrl) => {
    targets.forEach((target) => {
      const targetBg = target;
      targetBg.style.backgroundImage = `url('${imgUrl}')`;
    });
  };

  const changeBackgroundImage = (codeWeatherCondition) => {
    const {
      sunny, cloudy, rainy, snow, basic,
    } = images;

    if (sunnyCode.includes(codeWeatherCondition)) {
      setBackgroundUrl([app, main], sunny);
    } else if (cloudCode.includes(codeWeatherCondition)) {
      setBackgroundUrl([app, main], cloudy);
    } else if (rainCode.includes(codeWeatherCondition)) {
      setBackgroundUrl([app, main], rainy);
    } else if (snowCode.includes(codeWeatherCondition)) {
      setBackgroundUrl([app, main], snow);
    } else {
      setBackgroundUrl([app, main], basic);
    }
  };

  return {
    changeBackgroundImage,
  };
})();

export default backgroundModule;
