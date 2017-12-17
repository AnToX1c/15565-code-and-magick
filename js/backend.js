'use strict';

(function () {
  var createRequest = function (onLoad, onError, method, url, data) {
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
      onError('Запрос не успел выполнится за ' + xhr.TIMEOUT + 'мс');
    });
    xhr.TIMEOUT = 25000;
    xhr.open(method, url);
    xhr.send(data);
  };

  window.backend = {
    load: function (onLoad, onError) {
      var method = 'GET';
      var url = 'https://1510.dump.academy/code-and-magick/data';
      createRequest(onLoad, onError, method, url);
    },
    save: function (data, onLoad, onError) {
      var method = 'POST';
      var url = 'https://1510.dump.academy/code-and-magick/';
      createRequest(onLoad, onError, method, url, data);
    }
  };
})();