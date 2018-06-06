# Virtual Memory

## Table of Contents

* [Notes to Code Reviewers](#notes-to-code-reviewers)
* [Instructions](#instructions)
* [3rd Party Code](#3rd-Party-Code)

## Notes to Code Reviewers

Please read the comments in my app.js file, as they will explain most of what's going on. Also, please note that the game will log a move if the player clicks the same card twice. This is by design, and not a bug. I made it this way so that the player cannot go around the board double-clicking cards to peek at their faces without having the move counter show that they had done so. 

## Instructions

This is a game that tests the short term memory of the player. Click on a card to reveal its symbol. Click another card to see if it matches the first. If you get a match, the two cards you've selected will remain visible. If you don't get a match, the cards will flip back, and you'll have to try and remember where you saw those symbols. Keep clicking and matching until all of the cards are displayed, and you will win the game!

## 3rd Party Code

The following 3rd party libraries and support files were used in this project:
* [Glyph Icons](http://github.com/frexy/glyph-iconset)
* [Bootstrap](https://getbootstrap.com/)
* [jQuery](https://jquery.com/)
* [EasyTimer.js](https://github.com/albert-gonzalez/easytimer.js)
* [Array Shuffler](http://stackoverflow.com/a/2450976)
