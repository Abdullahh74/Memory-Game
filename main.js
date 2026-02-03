$(document).ready(function() {
  function getSymbols(level) {
    const symbolsByLevel = {
      easy: ['🍎', '🍎', '🍌', '🍌'],
      medium: ['🍎', '🍎', '🍌', '🍌', '🍒', '🍒', '🍇', '🍇', '🍉', '🍉', '🍍', '🍍', '🥝', '🥝', '🍓', '🍓'],
      hard: ['🍎', '🍎', '🍎', '🍎', '🍒', '🍒', '🍒', '🍒', '🍉', '🍉', '🍉', '🍉',
        '🥝', '🥝', '🥝', '🥝', '🥥', '🥥', '🥥', '🥥', '🍊', '🍊', '🍊', '🍊',
        '🥭', '🥭', '🥭', '🥭', '🍋', '🍋', '🍋', '🍋', '🍆', '🍆', '🍆', '🍆'],
      advanced: ['🍎', '🍎', '🍌', '🍌', '🍒', '🍒', '🍇', '🍇', '🍉', '🍉', '🍍', '🍍',
        '🥝', '🥝', '🍓', '🍓', '🥥', '🥥', '🍑', '🍑', '🍊', '🍊', '🍐', '🍐',
        '🥭', '🥭', '🍈', '🍈', '🍋', '🍋', '🍏', '🍏', '🍆', '🍆', '🌽', '🌽'],
    };

    return symbolsByLevel[level] ?? symbolsByLevel.medium;
  }

  function setGrid(level) {
    const columnsByLevel = {
      easy: 2,
      medium: 4,
      hard: 6,
      advanced: 6,
    };

    const columns = columnsByLevel[level] ?? columnsByLevel.medium;
    $("#game-board").css("grid-template-columns", `repeat(${columns}, 80px)`);
  }

  function buildGame(level) {
    let symbols = [...getSymbols(level)].sort(() => 0.5 - Math.random());

    $("#game-board").empty();
    setGrid(level);

    for (const element of symbols) {
      $("#game-board").append(`<div class="card" data-symbol="${element}"></div>`);
    }

    let flippedCards = [];
    let moves = 0;
    let lockBoard = false;
    $("#moves").text(moves);

    $(".card").click(function() {
      if (lockBoard) return;  
      if ($(this).hasClass("flipped")) return;

      $(this).addClass("flipped").text($(this).data("symbol"));
      flippedCards.push($(this));

      if (flippedCards.length === 2) {
        moves++;
        $("#moves").text(moves);

        let card1 = flippedCards[0];
        let card2 = flippedCards[1];

        if (card1.data("symbol") === card2.data("symbol")) {
          flippedCards = [];
        } else {
          lockBoard = true;
          setTimeout(() => {
            card1.removeClass("flipped").text("");
            card2.removeClass("flipped").text("");
            flippedCards = [];
            lockBoard = false;
          }, 1000);
        }
      }
    });
  }

  let currentLevel = $("#level").val();
  buildGame(currentLevel);

  $("#level").change(function() {
    currentLevel = $(this).val();
    buildGame(currentLevel);
  });
});
