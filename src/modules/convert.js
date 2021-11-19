import { format } from 'date-fns';

const convertModule = (() => {
  const convertToF = (celsius) => (celsius * 1.8) + 32;

  const convertToC = (fahrenheit) => (fahrenheit - 32) / 1.8;

  const convertForecastTempInPercent = (listOfTemp, higherTemp) => {
    const percentValueComparedWithHigherTemp = [];

    listOfTemp.forEach((temp) => {
      const temperature = temp.temp_c;
      percentValueComparedWithHigherTemp.push((temperature * 100) / higherTemp);
    });

    return percentValueComparedWithHigherTemp;
  };

  const getForecastHourConvert = (listOfHour) => {
    const forecastHourAMPMFormat = [];

    listOfHour.forEach((item) => {
      const { time } = item;
      const dateConvert = format(new Date(time), 'haa');
      forecastHourAMPMFormat.push(dateConvert);
    });

    return forecastHourAMPMFormat;
  };

  return {
    convertToF,
    convertToC,
    convertForecastTempInPercent,
    getForecastHourConvert,
  };
})();

export default convertModule;
