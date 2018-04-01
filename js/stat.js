'use strict';

// constants
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 110;
var CLOUD_Y = 20;
var GAP_TO_RECT = 50;
var GAP_TO_RECT_SHADOW = 10;
var BAR_HEIGHT = 150;
var BAR_WIDTH = 40;
var BAR_MARGIN_BOTTOM = 10;
var PADDING_LEFT = 40;
var PADDING_TOP = 70;

// functions
function renderCloud(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
}

function getMaxElement(arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
}

function renderRect(ctx, x, y, width, height, points, color) {
  ctx.fillStyle = 'black';
  ctx.textBaseline = 'bottom';
  ctx.fillText(Math.floor(points), x, y);
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
}


// function generateColor() {
//   return '#' + Math.floor(Math.random() * 16777215).toString(16)
// }

function generateBlueColor() {
  return 'hsl(240, 100%,' + Math.floor(Math.random() * 100) + '%)';
}

window.renderStatistics = function (ctx, players, times) {

  renderCloud(ctx, CLOUD_X + GAP_TO_RECT_SHADOW, CLOUD_Y + GAP_TO_RECT_SHADOW, 'rgba(0, 0, 0, 0.7)');

  renderCloud(ctx, CLOUD_X, CLOUD_Y, 'white');


  ctx.fillStyle = 'black';
  ctx.textBaseline = 'top';
  ctx.font = '16px PT Mono';

  ctx.fillText('Ура вы победили!', CLOUD_X + PADDING_LEFT, CLOUD_Y);
  ctx.fillText('Список результатов:', CLOUD_X + PADDING_LEFT, CLOUD_Y + 20);

  var maxTime = getMaxElement(times);

  var currentRectHeight;
  var currentRectX;
  var RectY;
  var TextX;
  var TextY;

  for (var i = 0; i < players.length; i++) {

    currentRectHeight = (times[i] * BAR_HEIGHT) / maxTime;
    currentRectX = CLOUD_X + PADDING_LEFT + (GAP_TO_RECT + BAR_WIDTH) * i;
    RectY = CLOUD_Y + PADDING_TOP + BAR_HEIGHT - currentRectHeight;
    TextX = CLOUD_X + PADDING_LEFT + (GAP_TO_RECT + BAR_WIDTH) * i;
    TextY = CLOUD_Y + BAR_HEIGHT + PADDING_TOP + BAR_MARGIN_BOTTOM;


    ctx.fillStyle = 'black';
    ctx.textBaseline = 'top';
    ctx.fillText(players[i], TextX, TextY);

    if (players[i] === 'Вы') {
      renderRect(ctx, currentRectX, RectY, BAR_WIDTH, currentRectHeight, times[i], 'rgba(255, 0, 0, 1)');
    } else {
      renderRect(ctx, currentRectX, RectY, BAR_WIDTH, currentRectHeight, times[i], generateBlueColor());
    }

  }
};

//   MAX_BAR      BAR[I]
// ----------- = --------
//  BAR_WIDTH       X

//  X = (BAR_WIDTH * BAR[I]) / MAX_BAR
