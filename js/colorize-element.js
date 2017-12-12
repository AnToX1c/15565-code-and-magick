'use strict';

(function () {
  window.colorizeElement = function (elem, colors, callback) {
    elem.addEventListener('click', function () {
      callback(elem, window.getRandomArrayItem(colors));
    });
  };
})();
