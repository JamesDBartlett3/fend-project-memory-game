
/*
Variables
*/

// Modal Control & Content Vars
let modalSelector = $('#centerModal');
let modalTitle = $('.modal-title');
let modalContent = $('.modal-content');
let modalBody = $('.modal-body');
let modalFooter = $('.modal-footer');
let closeModal = $('#closeModal');
let modalStartGame = $('#startGame');

// Scorekeeping Vars
let moves = 0;
let matches = 0;
let timer = new Timer;
let finalTime = '';
let stars = 3;
let cardsFlipped = 0;
let clickTarget = '';
let clickedIcon = '';
let clickedID = '';
let openID = '';
let cardA = '';
let cardB = '';
let glyphsCached = false;

// Arrays
let glyphs = []; // will contain paths to all 800 possible glyphs
let icons = []; // will contain 8 random glyph pairs for a total of 16 items
let openCards = []; // will contain up to 2 cards at a time, for comparison


// Empty HTML Content & jQuery Selectors
const emptyDeckContainer = '<div class="deck-container"></div>';
const emptyDeck = '<div class="deck"></div>';
const emptyRow = '<div class="row"></div>';
const emptyCard = '<div class="card"></div>';
const gameSurface = $('.game-surface');
const starsTicker = $('.stars');
const movesTicker = $('.moves');

// Template Literals
let initStars = `
  <li class="rating">Rating: </li>
  <li><i class="fa fa-star"></i></li>
  <li><i class="fa fa-star"></i></li>
  <li><i class="fa fa-star"></i></li>
  <li class="spacer">//</li>
  `


/*
Original Functions
*/

function buildContainer () {
  gameSurface.children().remove();
  gameSurface.append(emptyDeckContainer);
  gameSurface.children().append(emptyDeck);
}

function storeGlyphs() {
  if (glyphsCached == false) {
    if (localStorage.getItem("glyphNames") == null) { //if localStorage is empty
      // Download & cache glyph filenames in localStorage
      $.ajaxSetup({async:false}); //synchronous ajax mode ensures download completion
      $.get("./glyphs.txt", function(data) { // ajax get glyphs.txt file
        glyphs = data.split(','); // parse data using comma separation
      }, "text"); // ensure data is processed as text rather than JSON object
      localStorage.setItem("glyphNames", JSON.stringify(glyphs)); // cache in localStorage
      $.ajaxSetup({async:true}); // re-enable asynchronous ajax mode
      glyphsCached = true;
    }
    else {
      glyphsCached = true;
      // console.log('glyph filenames already cached in localStorage.')
    }
  }
}

function loadGlyphs() {
  glyphs = JSON.parse(localStorage.getItem("glyphNames"));
}

function pickIcons() {
  glyphs = shuffle(glyphs); // shuffle glyphs array
  icons = [ // store pairs of icons from first 8 items in glyphs array
    glyphs[0], glyphs[0], glyphs[1], glyphs[1],
    glyphs[2], glyphs[2], glyphs[3], glyphs[3],
    glyphs[4], glyphs[4], glyphs[5], glyphs[5],
    glyphs[6], glyphs[6], glyphs[7], glyphs[7]
  ]
  icons = shuffle(icons); // shuffle icons array
}

function dealCards() { //
  let cardCount = 0;
  for (let r = 0; r < 4; r++) {
    let row = $(emptyRow);
    for (let c = 0; c < 4; c++) {
      let card = $(emptyCard).attr('id', r + "_" + c);
      let icon = icons.shift([cardCount]);
      card.append("<img src='img/glyphs/svg/" + icon + "' alt='" + icon + "'> ");
      row.append(card);
      card.children().addClass('faceDown unClickable noSelect si-glyph');
      cardCount++;
    }
    $('.deck').append(row);
  }
}

function logMove() {
  moves++;
  movesTicker.children().eq(1).html(moves);
  switch(true) {
    case (moves == 13):
      removeStar();
      break;
    case (moves == 17):
      removeStar();
      break;
    case (moves == 21):
      removeStar();
      starsTicker.children().eq(0).append('<li>😭</li>');
      break;
  }
}

function clickCard() {
  if ($(clickTarget).hasClass('card')) {
    if (openID == clickedID) {
      flipCard(clickTarget);
      logMove();
      cardsFlipped = 0;
    }
    else if (cardsFlipped == 0) {
      cardA = clickTarget;
      openCards[0] = clickedIcon;
      flipCard(cardA);
      cardsFlipped = 1;
    }
    else {
      cardB = clickTarget;
      openCards[1] = clickedIcon;
      flipCard(cardB);
      checkForMatch();
      logMove();
      cardsFlipped = 0;
    }
  }
}

function flipCard(f) {
  $(f).children().toggleClass('faceDown');
}

function removeStar() {
  stars--;
  starsTicker.children().eq(1).remove();
}

function disableClicks() {
  $('.game-surface').addClass('unClickable');
  setTimeout(function() {
    $('.game-surface').removeClass('unClickable');
  }, 750);
}

function status(x) {
  console.log(x);
  console.log('Click Target: '+ clickTarget + ' || openCards[0]: ' + openCards[0] + ' || openCards[1]: ' + openCards[1] + ' || Clicked Icon: ' + clickedIcon + ' || Cards Flipped: ' + cardsFlipped);
  console.log('---------------------------');
}

function hideBoard(val) {
  if (val == 1) {
    $(gameSurface).addClass('hidden');
  }
  else {
    $(gameSurface).removeClass('hidden');
  }
}

function checkForMatch() {
 if (openCards[0] == openCards[1]) {
   $(cardA).addClass('solved');
   $(cardB).addClass('solved');
   matches++;
   if (matches == 8){
     youWin();
   }
 }
 else {
   disableClicks();
   setTimeout(function() {
     flipCard(cardA);
     flipCard(cardB);
   },
  750);
 }
}

function greeting() {
  modalBody.append('<p>Hybrid Electrochemical Visuospatial Icon Orientation Engine (The Human Brain)</p><p> -- Vs. -- </p><p>The Inevitable, Unrelenting Laws of Chaos & Entropy</p>')
  closeModal.addClass('hidden');
  modalStartGame.text('Start Game');
  modalSelector.modal({'show': true});
  modalStartGame.click(function() {
    modalSelector.modal('hide');
    newGame();
  });
}


function youWin() {
  timer.stop();
  finalTime = $('#timer').html().toString();
  modalTitle.text('Congratulations: You Win!');
  modalBody.children().remove();
  modalStartGame.text('Play Again');
  modalBody.append('<p>You have solved the puzzle. Here are your scores:</p>');
  modalBody.append('<p>Final Time: ' + finalTime + '</p>');
  modalBody.append('<p>Total Moves: ' + moves + '</p>');
  modalBody.append('<p>Star Rating: ' + stars + '</p>');

  // animate/detonate gameSurface
  modalSelector.modal({'show': true});
}


function reload() {
  moves = 0;
  matches = 0;
  stars = 3;
  cardsFlipped = 0;
  openCards = [];
  starsTicker.children().remove();
  starsTicker.append(initStars);
  gameSurface.children().remove();
  timer.reset();
  movesTicker.children().eq(1).html(moves);
}

function newGame() {
  console.clear();
  hideBoard(1);
  reload();
  storeGlyphs();
  loadGlyphs();
  pickIcons();
  buildContainer();
  dealCards();
  startTimer();
  hideBoard(0);
}


/*
3rd Party Functions & Libraries
*/

// EasyTimer.js -- source: https://github.com/albert-gonzalez/easytimer.js
function startTimer() {
  timer.start();
  timer.addEventListener('secondsUpdated', function (e) {
      $('#timer').html(timer.getTimeValues().toString());
  });
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}


// Event Listeners:

gameSurface.click(function(event) {
  clickTarget = $(event.target);
  clickedIcon = $(clickTarget).children().attr('alt');
  clickedID = $(clickTarget).attr('id');
  clickCard();
});

/*
stuff to do when page loads
*/
greeting();
