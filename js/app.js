
/*
Variable declaration
*/

// Scorekeeping Vars
let moves = 0;
let matches = 0;
let timer = new Timer;
let rating = 3;

// Glyphs & Icons
let glyphs = [];
let icons = [];

// HTML Content
const dc = '<div class="deck-container"></div>';
const d = '<div class="deck"></div>';
const star = '<li><i class="fa fa-star"></i></li>'


/*
Functions
*/

function buildContainer () {
  const gameSurface = $('.game-surface');
  gameSurface.append(dc);
  $('.deck-container').append(d);
  gameSurface.toggleClass('hidden');
}


function pickIcons() {
  $.ajaxSetup({async:false});
  $.get("./glyphs.txt", function(data) {
    glyphs = data.split(',');
  }, "text");
  glyphs = shuffle(glyphs);
  icons = [
    glyphs[0], glyphs[0], glyphs[1], glyphs[1],
    glyphs[2], glyphs[2], glyphs[3], glyphs[3],
    glyphs[4], glyphs[4], glyphs[5], glyphs[5],
    glyphs[6], glyphs[6], glyphs[7], glyphs[7]
  ]
  icons = shuffle(icons);
  $.ajaxSetup({async:true});
}

function deployCards() {
  let cardCount = 0;
  for (let r = 0; r < 4; r++) {
    let row = $('<div class="row"></div>');
    for (let c = 0; c < 4; c++) {
      let card = $('<div class="card"></div>').attr('id', r + "_" + c);
      let image = icons.pop([cardCount]);
      card.append("<img src='" + image + "' alt='" + image + "'> ");
      card.css('class', 'hidden');
      row.append(card);
      cardCount++;
    }
    $('.deck').append(row);
  }
}

function updateScore() {

}

function flip(event) {

}

function check(event) {

}

function reload() {
  location.reload();
}



/*
* Display the cards on the page
*   - shuffle the list of cards using the provided "shuffle" method below
*   - loop through each card and create its HTML
*   - add each card's HTML to the page
*/



// Event Listeners:



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


/*
stuff to do when page loads
*/
buildContainer();
pickIcons();
deployCards();
timer.start();
timer.addEventListener('secondsUpdated', function (e) {
    $('#timer').html(timer.getTimeValues().toString());
});
