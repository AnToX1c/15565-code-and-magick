'use strict';

var getMaxElement = function (arr) {
  var max = -1;
  for (var i = 0; i <= arr.length - 1; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }
  return max;
};

window.renderStatistics = function (ctx, names, times) {
  var i = 0;
  var histogramHeight = 150;
  var histogramWidth = 40;
  var distanceBetweenHists = 50;
  var maxScore = getMaxElement(times);
  var myHistogramColor = 'rgba(255, 0, 0, 1)';
  var histogramColor = function () {
    return 'rgba(0, 0, 255, ' + Math.random() + ')';
  };
  var columnHeight = function () {
    return histogramHeight * times[i] / maxScore;
  };
  var drawHistogram = function () {
    ctx.fillRect(160 + ((distanceBetweenHists + histogramWidth) * i), 210 + histogramWidth - columnHeight(), histogramWidth, columnHeight());
  };
  var drawScore = function (name, score) {
    ctx.fillStyle = '#000';
    ctx.font = '16px PT Mono';
    ctx.fillText(name, 160 + ((distanceBetweenHists + histogramWidth) * i), 270);
    ctx.fillText(Math.round(score), 160 + ((distanceBetweenHists + histogramWidth) * i), 240 - columnHeight());
  };
  var drawResultCloud = function () {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(120, 20, 420, 270);
    ctx.fillStyle = 'white';
    ctx.strokeRect(110, 10, 420, 270);
    ctx.fillRect(110, 10, 420, 270);
    ctx.fillStyle = '#000';
    ctx.font = '16px PT Mono';
    ctx.fillText('Ура вы победили!', 250, 30);
    ctx.fillText('Список результатов:', 230, 50);
  };

  drawResultCloud();
  for (i = 0; i < times.length; i++) {
    if (names[i] === 'Вы') {
      ctx.fillStyle = myHistogramColor;
    } else {
      ctx.fillStyle = histogramColor();
    }
    drawHistogram();
    drawScore(names[i], times[i]);
  }
};
