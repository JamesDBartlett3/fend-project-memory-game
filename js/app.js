
/*
Variable declaration
*/

// Scorekeeping Vars
let moves = 0;
let matches = 0;
let timer = 0;
let rating = 3;
let oneStar = "🌟";
let twoStar = "🌟🌟";
let threeStar = "🌟🌟🌟";

// HTML Content Vars
const dc = '<div class="deck-container"></div>';
const d = '<div class="deck"></div>';
const r1 = '<div id="r1" class="row"></div>';
const r2 = '<div id="r2" class="row"></div>';
const r3 = '<div id="r3" class="row"></div>';
const r4 = '<div id="r4" class="row"></div>';
const c1 = '<div id="c1" class="card"></div>';
const c2 = '<div id="c2" class="card"></div>';
const c3 = '<div id="c3" class="card"></div>';
const c4 = '<div id="c4" class="card"></div>';

// jQuery Vars
const gameSurface = $('.game-surface');

/*
Function instantiation
*/


function loadGlyphs() {
  let glyphs = []
}




$(document).ready(function() {
  /*
  stuff to do when page loads
  */

  gameSurface.append(dc);
  const deckContainer = $('.deck-container');
  deckContainer.append(d);
  const deck = $('.deck');
  deck.append(r1 + r2 + r3 + r4);
  const row = $('.row');
  row.append(c1 + c2 + c3 + c4);
  gameSurface.toggleClass('hidden');


});

/*
* Display the cards on the page
*   - shuffle the list of cards using the provided "shuffle" method below
*   - loop through each card and create its HTML
*   - add each card's HTML to the page
*/


function flip(event) {

}

function check(event) {

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
