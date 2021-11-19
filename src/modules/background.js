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
      app.style.backgroundImage = 'url(\'https://images.unsplash.com/photo-1586078074298-05dca4848695?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=735&q=80\')';
      main.style.backgroundImage = 'url(\'https://images.unsplash.com/photo-1586078074298-05dca4848695?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=735&q=80\')';
    } else if (cloudCode.includes(codeWeatherCondition)) {
      app.style.backgroundImage = 'url(\'https://images.unsplash.com/photo-1532178910-7815d6919875?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=735&q=80\')';
      main.style.backgroundImage = 'url(\'https://images.unsplash.com/photo-1532178910-7815d6919875?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=735&q=80\')';
    } else if (rainCode.includes(codeWeatherCondition)) {
      app.style.backgroundImage = 'url(\'https://images.unsplash.com/photo-1509635022432-0220ac12960b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80\')';
      main.style.backgroundImage = 'url(\'https://images.unsplash.com/photo-1509635022432-0220ac12960b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80\')';
    } else if (snowCode.includes(codeWeatherCondition)) {
      app.style.backgroundImage = 'url(\'https://images.unsplash.com/photo-1515106426117-7483c8b91e9b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80\')';
      main.style.backgroundImage = 'url(\'https://images.unsplash.com/photo-1515106426117-7483c8b91e9b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80\')';
    } else {
      app.style.backgroundImage = 'url(\'https://images.unsplash.com/photo-1560461311-0535e8fa1ba5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80\')';
      main.style.backgroundImage = 'url(\'https://images.unsplash.com/photo-1560461311-0535e8fa1ba5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80\')';
    }
  };

  return {
    changeBackgroundImage,
  };
})();

export default backgroundModule;
