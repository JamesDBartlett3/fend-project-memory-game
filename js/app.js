
/*
Variables and functions for card deck

let deckSize = 8;

let iconSet = [];

$(document).ready(function() {
  $.get('./img/glyph/svg/', function(data) {
    icons.push(data);
  }
}
*/

const surface = document.querySelector('.game-surface');
let cardDeck = [''];

function loadGlyphs() {
  let glyphs = []
}

function dealCards() {
  loadGlyphs();
  surface.innerHTML = '';

}

$(document).ready(function() {
  /*
  stuff to do when page loads
  */

  // Snippet Source: https://stackoverflow.com/a/11213851
  $.ajax({
    url: "./img/glyphs/svg/",
    success: function(data){
       $(data).find("a:contains(.svg)").each(function(){
          // will loop through
          let images = $(this).attr("href");
          console.log(images);

       });
    }
  });

});

/*
* Display the cards on the page
*   - shuffle the list of cards using the provided "shuffle" method below
*   - loop through each card and create its HTML
*   - add each card's HTML to the page
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
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
