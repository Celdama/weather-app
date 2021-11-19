import { format } from 'date-fns';

const convertModule = (() => {
  const convertToF = (celsius) => (celsius * 1.8) + 32;

  const convertToC = (fahrenheit) => (fahrenheit - 32) / 1.8;

  const convertForecastTempInPercent = (listOfTemp, higherTemp) => {
    const percent = [];

    listOfTemp.forEach((temp) => {
      const temperature = temp.temp_c;
      percent.push((temperature * 100) / higherTemp);
    });

    return percent;
  };

  const getForecastTimeConvert = (listOfTime) => {
    const forecastTime = [];

    listOfTime.forEach((item) => {
      const dateConvert = format(new Date(item.time), 'haa');
      forecastTime.push(dateConvert);
    });

    return forecastTime;
  };

  return {
    convertToF,
    convertToC,
    convertForecastTempInPercent,
    getForecastTimeConvert,
  };
})();

export default convertModule;
