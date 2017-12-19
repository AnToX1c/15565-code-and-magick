'use strict';

(function () {
  var getRandomArrayItem = function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  };

  window.colorizeElement = function (elem, colors, callback) {
    elem.addEventListener('click', function () {
      callback(elem, getRandomArrayItem(colors));
    });
  };
})();
