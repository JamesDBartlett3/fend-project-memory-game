
/*
Variables
*/

// Scorekeeping Vars
let moves = 0;
let matches = 0;
let timer = new Timer;
let stars = 3;
let cardsFlipped = 0;
let clickTarget = "";
let clickedIcon = "";
let clickedID = "";
let openID = "";
let cardA = "";
let cardB = "";
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
      card.children().addClass('faceDown unClickable noSelect');
      cardCount++;
    }
    $('.deck').append(row);
  }
}

function logMove() {
  moves++;
  movesTicker.children().eq(1).html(moves);
  switch(true) {
    case (moves == 10):
      removeStar();
      break;
    case (moves == 20):
      removeStar();
      break;
    case (moves == 30):
      removeStar();
      starsTicker.children().eq(0).append('<li>😭</li>');
      break;
  }
}

function clickCard() {
  if ($(clickTarget).hasClass('card')) {
    status('Entering clickCard function...');
    if (openID == clickedID) {
      status('0_A');
      flipCard(clickTarget);
      logMove();
      cardsFlipped = 0;
      status('0_B');
    }
    else if (cardsFlipped == 0) {
      status('1_A');
      cardA = clickTarget;
      openCards[0] = clickedIcon;
      flipCard(cardA);
      cardsFlipped = 1;
      status('1_B');
    }
    else {
      status('2_A');
      cardB = clickTarget;
      openCards[1] = clickedIcon;
      flipCard(cardB);
      checkForMatch();
      logMove();
      cardsFlipped = 0;
      status('2_B');
    }
    status('Exiting clickCard function...');
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
  }, 1000);
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
   console.log("matched!");
   $(cardA).addClass('solved');
   $(cardB).addClass('solved');
 }
 else {
   disableClicks();
   setTimeout(function() {
     console.log("sorry!");
     flipCard(cardA);
     flipCard(cardB);
   },
  1000);

 }
}

// function clicktivated(x, target) {
//   if (x) {
//     $(target).removeClass('unClickable');
//   }
//   else {
//     $(target).addClass('unClickable');
//   }
// }

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
3rd Party Functions
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
  // console.log(clickTarget);
  clickTarget = $(event.target);
  clickedIcon = $(clickTarget).children().attr('alt');
  clickedID = $(clickTarget).attr('id');
  status('Values on exiting gameSurface.click event...')
  clickCard();
});

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */




/*
stuff to do when page loads
*/
newGame();
