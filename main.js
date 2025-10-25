$(document).ready(function() {
  function getSymbols(level) {
    let easy = ['🍎','🍎','🍌','🍌'];

    let medium = ['🍎','🍎','🍌','🍌','🍒','🍒','🍇','🍇','🍉','🍉','🍍','🍍','🥝','🥝','🍓','🍓'];

    let hard = ['🍎','🍎','🍎','🍎','🍒','🍒','🍒','🍒','🍉','🍉','🍉','🍉',
                '🥝','🥝','🥝','🥝','🥥','🥥','🥥','🥥','🍊','🍊','🍊','🍊',
                '🥭','🥭','🥭','🥭','🍋','🍋','🍋','🍋','🍆','🍆','🍆','🍆'];

    let Advanced = ['🍎','🍎','🍌','🍌','🍒','🍒','🍇','🍇','🍉','🍉','🍍','🍍',
                    '🥝','🥝','🍓','🍓','🥥','🥥','🍑','🍑','🍊','🍊','🍐','🍐',
                    '🥭','🥭','🍈','🍈','🍋','🍋','🍏','🍏','🍆','🍆','🌽','🌽'];

    if (level === "easy") return easy;
    if (level === "hard") return hard;
    if (level === "Advanced") return Advanced;
    return medium;
  }

  function setGrid(level) {
    if (level === "easy") {
      $("#game-board").css("grid-template-columns", "repeat(2, 80px)");
    } else if (level === "hard") {
      $("#game-board").css("grid-template-columns", "repeat(6, 80px)");
    } else if (level === "Advanced"){
      $("#game-board").css("grid-template-columns", "repeat(6, 80px)");
    } else {
      $("#game-board").css("grid-template-columns", "repeat(4, 80px)");
    }
  }

  function buildGame(level) {
    let symbols = getSymbols(level);
    symbols = symbols.sort(() => 0.5 - Math.random());

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
