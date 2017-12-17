'use strict';

(function () {
  var createRequest = function (onLoad, onError, METHOD, URL, data) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      var error;
      switch (xhr.status) {
        case 200:
          onLoad(xhr.response);
          break;
        case 400:
          error = 'Неверный запрос';
          break;
        case 404:
          error = 'Ничего не найдено';
          break;
        default:
          error = 'Статус ошибки: ' + xhr.status + ' ' + xhr.statusText;
      }
      if (error) {
        onError(error);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполнится за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = 25000;
    xhr.open(METHOD, URL);
    xhr.send(data);
  };

  window.backend = {
    load: function (onLoad, onError) {
      var METHOD = 'GET';
      var URL = 'https://1510.dump.academy/code-and-magick/data';
      createRequest(onLoad, onError, METHOD, URL);
    },
    save: function (data, onLoad, onError) {
      var METHOD = 'POST';
      var URL = 'https://1510.dump.academy/code-and-magick/';
      createRequest(onLoad, onError, METHOD, URL, data);
    }
  };
})();
