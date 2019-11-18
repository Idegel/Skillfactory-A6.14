const numDivs = 36;
const maxHits = 10;

let hits = 0;
let firstHitTime = 0;

function round() {
  // FIXME: надо бы убрать "target" прежде чем искать новый
  $('.target').removeClass('target');
  $('.miss').removeClass('miss');

  let divSelector = randomDivId();
  $(divSelector).addClass("target");
  $(divSelector).text(hits + 1);
  // TODO: помечать target текущим номером

  // FIXME: тут надо определять при первом клике firstHitTime
  if (hits === 1) {
    firstHitTime = getTimestamp();
    console.log(firstHitTime);
  }

  if (hits === maxHits) {
    endGame();
  }
}

function endGame() {
  // FIXME: спрятать игровое поле сначала
  $('.game-field, #button-start').hide();

  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $("#total-time-played").text(totalPlayedSeconds);

  $("#win-message").removeClass("d-none");
}

function handleClick(event) {
  // FIXME: убирать текст со старых таргетов. Кажется есть .text?
  let target = $(event.target);

  //$(".game-field").click(handleClick);  

  if ($(event.target).hasClass("target")) {
    target.text('');
    hits = hits + 1;
    round();
  }
  else {
    $(event.target).hasClass("miss");
  }
  // TODO: как-то отмечать если мы промахнулись? См CSS класс .miss
}

$(function () {
  $('#button-start').click(function () {
    round();
    $('.game-field').click(handleClick);
  });
});

function init() {
  // TODO: заказчик просил отдельную кнопку, запускающую игру а не просто по загрузке
  $("#button-reload").click(function() {
    location.reload();
  });
}

$(document).ready(init);
