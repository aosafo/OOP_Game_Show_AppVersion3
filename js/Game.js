/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

class Game {
    constructor() {
        this.missed = 0;
        this.phrases = this.createPhrases();
        this.activePhrase = null;
    }

    /**
     * Creates phrases for use in game
     * @return {array} An array of phrases that could be used in the game
     */
    createPhrases() {        let phraseArr = [];        phraseArr.push(new Phrase("Jesus is lord"));        phraseArr.push(new Phrase("Blessings in the name of Jesus"));        phraseArr.push(new Phrase("Favor grace"));        phraseArr.push(new Phrase("Anointed preacher"));        phraseArr.push(new Phrase("Bible text"));        return phraseArr;    }    /**
     * Selects random phrase from phrases property
     * @return {Object} Phrase object chosen to be used
     */
    getRandomPhrase() {        return this.phrases[Math.floor(Math.random() * this.phrases.length)];    }    /**
     * Begins game by selecting a random phrase and displaying it to user
     */
    startGame() {                // Get the overlay and hide it        let overlay = document.getElementById("overlay");        overlay.style.display = "none";        // Check if we won previously and update the overlay class from win to start        if (overlay.classList.contains("win"))           overlay.className = overlay.className.replace(/\bwin\b/g, "start");        // Check if we lost previously and update the overlay class from lose to start        if (overlay.classList.contains("lose"))        overlay.className = overlay.className.replace(/\blose\b/g, "start");        // Get a randomn phrase Object        let phraseObj = this.getRandomPhrase();                        // Add the Phrase to the display        phraseObj.addPhraseToDisplay();        // Set the active phrase object        this.activePhrase = phraseObj;            }    /**
     * Checks for winning move
     * @return {boolean} True if game has been won, false if game wasn't
       won
     */
    checkForWin() {        // Get the Letters that have a class name called letter
        const letters = document.getElementsByClassName("letter");        // Loop through the letters and check if it has the css class hide.        // If it does, the user has not revealed all the letters, so no win        for (let m = 0; m < letters.length; m++) {            if (letters[m].classList.contains("hide"))
                return false;
        }        return true;    }
    /**
     * Increases the value of the missed property
     * Removes a life from the scoreboard
     * Checks if player has remaining lives and ends game if player is out lives
     */
    removeLife() {

        // Get all the lives
        const lives = document.getElementsByClassName("tries");
        
        lives[this.missed].firstElementChild.src = "images/lostHeart.png";

        if (this.missed == 4) {
            this.gameOver(false);
        }

        this.missed++;
    }

    /**
     * Displays game over message
     * @param {boolean} gameWon - Whether or not the user won the game
     */
    gameOver(gameWon) {

        // Display the original start screen overlay
        let overlay = document.getElementById("overlay");        overlay.style.display = "block";

        // Get the overlay h1 element
        const game_over_message = document.getElementById("game-over-message");

        // If the user won the game, display win message, else display loss
        // message
        if (gameWon) {
            game_over_message.innerText = "Great Job!";
            overlay.className = overlay.className.replace(/\bstart\b/g, "win");
        }
        else {
            game_over_message.innerText = "Sorry, better luck next time!";
            overlay.className = overlay.className.replace(/\bstart\b/g, "lose");
        }

        // Reset some properties        // Remove all the li elements from the Phrase ul element        //Get the phrase ul element        let phraseUl = document.getElementsByTagName("ul");        // Get the Letters that have a class name called letter
        const letters = document.querySelectorAll(".letter");        // Get the spaces        const spaces = document.querySelectorAll(".space");        // Remove the letters        for (let n = 0; n < letters.length; n++) {            phraseUl[0].removeChild(letters[n]);        }        // Remove spaces        for (let t = 0; t < spaces.length; t++) {            phraseUl[0].removeChild(spaces[t]);        }

        // Enable all of the onscreen keyboard buttons and update each to use the `key` CSS class,
        // and not use the`chosen` or`wrong` CSS classes.
        const buttons = document.getElementsByClassName("key");

        for (let p = 0; p < buttons.length; p++) {
            
            buttons[p].disabled = false;

            if (buttons[p].classList.contains("chosen"))
                buttons[p].classList.remove("chosen");

            if (buttons[p].classList.contains("wrong"))
               buttons[p].classList.remove("wrong");
        }

        // Reset all of the heart images

        const lives = document.getElementsByClassName("tries");

        for (let v = 0; v < lives.length; v++) 
            lives[v].firstElementChild.src = "images/liveHeart.png";
        
    }

    /**
     * Handles onscreen keyboard button clicks
     * @param (HTMLButtonElement) button - The clicked button element
     */
    handleInteraction(button) {

        
        // Disable the selected letter's onscreen keyboard button
        button.disabled = true;

        // Check if the phrase contains the guessed letter, if it contains it,
        // add the chosen Css class to the selected letter's keyboard button,
        // call the showMatchedLetter() method on the phrase, and then
        // call the checkForWin() method, if the player has won the game, 
        // also call the gameOver() method if not, add the wrong Css class 
        // to the selected letter's keyboard button and call the removeLife 
        // method
        if (this.activePhrase.checkLetter(button.innerText)) {
            button.classList.add("chosen");
            this.activePhrase.showMatchedLetter(button.innerText);

            if (this.checkForWin()) {
                this.gameOver(true); 
            }
        }
        else {

            button.classList.add("wrong");
            this.removeLife();
        }
        
    }
}