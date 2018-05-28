
/*
Variable declaration
*/

let moves = 0;
let matches = 0;
let timer = 0;
const gs = $('.game-surface');
const dc = '<div class="deck-container"></div>';
const d = '<div class="deck"></div>';
const r = '<div class="row"></div>';
const c = '<div class="card"></div>';

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

  gs.children().remove('.deck-container');
  gs.append(dc);
  const deckContainer = $('.deck-container');
  deckContainer.append(d);
  const deck = $('.deck');
  deck.append(r + r + r + r);
  const row = $('.row');
  row.append(c + c + c + c);
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
