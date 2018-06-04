
/*
Variables
*/

// Game Parameters
const flipBack = 750; // time in milliseconds before mismatched pairs flip back
let timerRunning = false;


// Modal Window Control & Content Variables
let modalSelector = $('#centerModal');
let modalTitle = $('.modal-title');
let modalContent = $('.modal-content');
let modalBody = $('.modal-body');
let modalFooter = $('.modal-footer');
let closeModal = $('#closeModal');
let modalStartGame = $('#startGame');


// Scorekeeping Variables
let playerStars = 3;
let gameTimer = new Timer;
let [playerMoves, finalMoves,
  matchedPairs, cardsFlipped] = Array(4).fill(0);
let [finalTime, finalStars,
  clickTarget, clickedID,
  clickedIcon, openID,
  cardA, cardB] = Array(8).fill('');


// Card Arrays
let masterDeck = []; // will contain paths to all 800 possible glyphs
let gameDeck = []; // will contain 8 random glyph pairs for a total of 16 items
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
const initStars = `
  <li class="rating">Rating: </li>
  <li><i class="fa fa-star"></i></li>
  <li><i class="fa fa-star"></i></li>
  <li><i class="fa fa-star"></i></li>
  <li class="spacer">//</li>
`
const vsText = `
  <p>Hybrid Electrochemical Visuospatial Icon Orientation Engine (The Human Brain)</p>
  <p> -- Vs. -- </p>
  <p>The Inevitable, Unrelenting Laws of Chaos & Entropy</p>
`
const finalScores = `
  <p>You have solved the puzzle. Here are your scores:</p>
  <p class="finalTime">Final Time: </p>
  <p class="finalMoves">Total Moves: </p>
  <p class="finalStars">Star Rating: </p>
`


/*
Game Board Setup Functions
*/

function loadGlyphs() { // store, retrieve, & load glyph icons
  // The first reviewer said this function didn't work for them.
  // One of their screenshots indicated they had cloned my repo
  // to a local hard disk folder, and were viewing it from there
  // in Google Chrome (which disallows local ajax calls).
  // I didn't test for this scenario, because real-world users
  // will view and play the game on a website like GitHub Pages
  // (https://jamesdbartlett.github.io/fend-project-memory-game/),
  // not by downloading the code and running it locally.
  // Please either load the page from the link above, or try it on
  // a browser that allows local ajax calls, like Firefox.
  if (localStorage.getItem("glyphNames") == null) { // if localStorage is empty
    // Download & cache glyph filenames in localStorage
    $.ajaxSetup({async:false}); // synchronous ajax ensures glyph list is loaded.
    $.get("./glyphs.txt", function(data) { // ajax get glyphs.txt file
      masterDeck = data.split(','); // parse data using comma separation
    }, "text"); // ensure data is processed as text rather than JSON object
    localStorage.setItem("glyphNames", JSON.stringify(masterDeck)); // cache in localStorage
    $.ajaxSetup({async:true}); // re-enable asynchronous ajax mode
  }
  else { // otherwise
    console.log('glyph filenames already cached in localStorage.')
  }
  // Parse glyphNames from localStorage to strings & store them in masterDeck array.
  masterDeck = JSON.parse(localStorage.getItem("glyphNames"));
}

function pickIcons() { // load 8 random pairs of icons from masterDeck into gameDeck
  masterDeck = shuffle(masterDeck); // shuffle masterDeck array
  gameDeck = [ // store pairs of icons from first 8 items in masterDeck array
    masterDeck[0], masterDeck[0], masterDeck[1], masterDeck[1],
    masterDeck[2], masterDeck[2], masterDeck[3], masterDeck[3],
    masterDeck[4], masterDeck[4], masterDeck[5], masterDeck[5],
    masterDeck[6], masterDeck[6], masterDeck[7], masterDeck[7]
  ]
  gameDeck = shuffle(gameDeck); // shuffle gameDeck array
}

function buildContainer () { // clear previous game & build empty gameSurface framework
  gameSurface.children().remove();
  gameSurface.append(emptyDeckContainer);
  gameSurface.children().append(emptyDeck);
}

function dealCards() { // deals cards at the beginning of a new game
  for (let r = 0; r < 4; r++) { // loop to iterate over 4 times
    let row = $(emptyRow); // create 4 empty rows
    for (let c = 0; c < 4; c++) { // loop to iterate over 4 times
      let card = $(emptyCard).attr('id', r + "_" + c); // create an empty card
      let icon = gameDeck.shift(); // pull top card from gameDeck array
      // add a glyph from the gameDeck array to empty card
      card.append("<img src='img/glyphs/svg/" + icon + "' alt='" + icon + "'> ");
      row.append(card); // append card to the current row
      // prevent image on card from being selected by mouse
      card.children().addClass('faceDown unClickable noSelect si-glyph');
    }
    $('.deck').append(row);
  }
}

function initTimer() { // initialize the timer display
  $('#timer').text('00:00:00');
}

function hideBoard(val) { // conditionally hides or reveals gameSurface element from player
  if (val == 1) { // if argument is 1
    $(gameSurface).addClass('hidden'); // add hidden class to gameSurface
  }
  else { // otherwise
    $(gameSurface).removeClass('hidden'); // remove hidden class from gameSurface
  }
}

function resetGame() { // resets game variables, timer, & score tickers
  playerMoves = 0;
  matchedPairs = 0;
  playerStars = 3;
  cardsFlipped = 0;
  timerRunning = false;
  openCards = [];
  starsTicker.children().remove();
  starsTicker.append(initStars);
  gameSurface.children().remove();
  movesTicker.children().eq(1).html(playerMoves);
  startTimer();
}


/*
Gameplay & Scorekeeping Functions
*/

function clickCard() { // conditionally calls flipCard, logMove, & checkForMatch
  if (!timerRunning) {
    gameTimer.start();
    timerRunning = true;
  }
  if ($(clickTarget).hasClass('card')) { // must actually be a card
    if (cardsFlipped == 0) { // if no cards are flipped
      cardA = clickTarget; // set cardA to the clicked card image name
      openID = clickedID; // set openID to clickedID
      openCards[0] = clickedIcon; // set openCards[0] to clickedIcon
      flipCard(cardA); // flip cardA
      cardsFlipped = 1; // set cardsFlipped to 1
    }
    else if (openID == clickedID) { // if user clicked the same card twice
      flipCard(clickTarget); // flip it back over
      logMove(); // log a move
      cardsFlipped = 0; // set cardsFlipped back to 0
    }
    else { // if a card is flipped
      cardB = clickTarget; // set cardB to clickTarget
      openCards[1] = clickedIcon; // set openCards[1] to clickedIcon
      flipCard(cardB); // flip cardB
      checkForMatch(); // call checkForMatch
      logMove(); // log a move
      cardsFlipped = 0; // set cardsFlipped back to 0
    }
  }
}

function flipCard(...flips) { // toggle faceDown class on any/all cards passed as args
  for (let flip of flips) { // for all arguments "flips," set each to "flip," and execute:
    $(flip).children().toggleClass('faceDown'); // toggle faceDown class
  }
}

function logMove() { // logs each player move & changes star score accordingly
  playerMoves++; // add 1 to current playerMoves value
  movesTicker.children().eq(1).html(playerMoves); // set movesTicker to current playerMoves value
  switch(true) { // as each of the following conditions occur, remove 1 star from player score
    case (playerMoves == 13): // 13 moves
      removeStar();
      break;
    case (playerMoves == 17): // 17 moves
      removeStar();
      break;
    case (playerMoves == 21): // 21 moves
      removeStar();
      starsTicker.children().eq(0).append('<li>😭</li>'); // replace star with crying face
      break;
  }
}

function checkForMatch() { // increments matchedPairs, calls youWin, disableClicks & flipCard
 if (openCards[0] == openCards[1]) { // if cards match
   $(openCards[0]).addClass('solved unClickable'); // add solved & unClickable
   $(openCards[1]).addClass('solved unClickable'); // classes to both cards
   matchedPairs++; // increment matchedPairs by 1, and
   if (matchedPairs == 8){ // if player has matched all 8 pairs of cards,
     youWin(); // call the youWin function
   }
 }
 else { // otherwise
   disableClicks(); // call disableClicks function
   setTimeout(function() { // wait flipBack milliseconds, then
     flipCard(cardA, cardB); // flip both cards back over
   },
  flipBack);
 }
}

function disableClicks() { // temporarily prevent player from clicking
  $('body').addClass('unClickable'); // add unClickable class to body element
  setTimeout(function() { // wait flipBack milliseconds
    $('body').removeClass('unClickable'); // remove unClickable class from body element
  }, flipBack);
}

function removeStar() { // remove a star from player's rating
  playerStars--; // decrement playerStars by 1
  starsTicker.children().eq(1).remove(); // remove 1 of starTicker's children
}


/*
Game State & Modal Window Functions
*/

function greetPlayer() { // greet player with modal window
  modalBody.append(vsText); // add vsText to modalBody
  closeModal.addClass('hidden'); // hide closeModal element
  modalStartGame.text('Start Game'); // set Start Game text
  modalSelector.modal({'show': true}); // unhide modal window
  modalStartGame.click(function() { // when Start Game button is clicked
    modalSelector.modal('hide'); // hide modal window
    newGame(); // call newGame function
  });
}

function youWin() { // tally scores, display modal window, congratulate player, & offer rematch
  gameTimer.stop(); // stop the timer
  finalTime = $('#timer').html().toString(); // finalize player's time
  finalMoves = playerMoves; // finalize player's move score
  finalStars = playerStars; // finalize player's star score
  modalTitle.text('Congratulations: You Win!'); // add congratulations text to modal title
  modalBody.children().remove(); // clear previous modal window content
  modalStartGame.text('Play Again'); // change "Start Game" button to "Play Again"
  modalBody.append(finalScores); // append finalScores text to modalBody
  modalBody.children($('.finalTime').append(finalTime));
  modalBody.children($('.finalMoves').append(finalMoves));
  modalBody.children($('.finalStars').append(finalStars));
  modalSelector.modal({'show': true}); // unhide modal window
}

function newGame() { // starts a new game
  console.clear();
  hideBoard(1);
  resetGame();
  loadGlyphs();
  pickIcons();
  buildContainer();
  dealCards();
  hideBoard(0);
  initTimer();
}


/*
Debugging Functions
*/

function status(x) { // display current values of click tracking & card manipulation variables
  // Call this function at suspected points of failure in the code.
  // Pass a nickname for the segment in question as the argument.
  // Console will print 3 lines each time the function is called:
  // 1) The code segment's nickname
  // 2) The current variable values
  // 3) A divider line
  console.log(x);
  console.log('Click Target: '+ clickTarget + ' || openCards[0]: ' + openCards[0] + ' || openCards[1]: ' + openCards[1] + ' || Clicked Icon: ' + clickedIcon + ' || Cards Flipped: ' + cardsFlipped);
  console.log('---------------------------');
}


/*
Event Listeners:
*/

gameSurface.click(function(event) { // when user clicks anywhere in the gameSurface
  clickTarget = $(event.target); // set clickTarget to the event target
  clickedIcon = $(clickTarget).children().attr('alt'); // set clickedIcon variable
  clickedID = $(clickTarget).attr('id'); // set clickedID variable
  clickCard(); // call clickCard function
});


/*
3rd Party Functions & Libraries
*/

function startTimer() { // EasyTimer.js
  // source: https://github.com/albert-gonzalez/easytimer.js
  gameTimer.reset();
  gameTimer.start();
  gameTimer.addEventListener('secondsUpdated', function () {
      $('#timer').html(gameTimer.getTimeValues().toString());
  });
  gameTimer.pause();
}


function shuffle(array) { // Shuffle function
  // source http://stackoverflow.com/a/2450976
  let currentIndex = array.length, temporaryValue, randomIndex;
  while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
  }
  return array;
}

/*
stuff to do when page loads
*/
greetPlayer();
