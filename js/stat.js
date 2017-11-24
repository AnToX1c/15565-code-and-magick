'use strict';
var max = -1;
var i = 0;

var getMaxElement = function (arr) {
  for (i = 0; i <= arr.length - 1; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }
  return max;
};

window.renderStatistics = function (ctx, names, times) {
  var score = '';
  var histogramHeight = 150;
  var histogramWidth = 40;
  var distanceBetweenHists = 50;
  var columnHeight = 0;
  var maxScore = getMaxElement(times);
  var myHistogramColor = 'rgba(255, 0, 0, 1)';
  var histogramColor = function () {
    return 'rgba(0, 0, 255, ' + Math.random() + ')';
  };

  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(120, 20, 420, 270);
  ctx.fillStyle = 'white';
  ctx.strokeRect(110, 10, 420, 270);
  ctx.fillRect(110, 10, 420, 270);

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', 250, 30);
  ctx.fillText('Список результатов:', 230, 50);
  for (i = 0; i < times.length; i++) {
    score = Math.round(times[i]);
    if (names[i] === 'Вы') {
      ctx.fillStyle = myHistogramColor;
    } else {
      ctx.fillStyle = histogramColor();
    }
    columnHeight = histogramHeight * times[i] / maxScore;
    ctx.fillRect(160 + ((distanceBetweenHists + histogramWidth) * i), 210 + histogramWidth - columnHeight, histogramWidth, columnHeight);
    ctx.fillStyle = '#000';
    ctx.font = '16px PT Mono';
    ctx.fillText(names[i], 160 + ((distanceBetweenHists + histogramWidth) * i), 270);
    ctx.fillText(score, 160 + ((distanceBetweenHists + histogramWidth) * i), 240 - columnHeight);
  }
};
