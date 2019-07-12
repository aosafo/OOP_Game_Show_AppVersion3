/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

class Phrase {
    constructor(phrase) {
        this.phrase = phrase.toLowerCase();
    }
    /**
     * Display phrase on game board
     */
    addPhraseToDisplay() {        let phraseUl = document.getElementsByTagName("ul");        for (let i = 0; i < this.phrase.length; i++) {            let li = document.createElement("li");            if (this.phrase[i] == ' ') {                li.classList.add("space");
                let space = document.createTextNode(" ");
                li.appendChild(space);
            }            else {                li.classList.add("hide");
                li.classList.add("letter");
                li.classList.add(this.phrase[i]);
                let letter = document.createTextNode(this.phrase[i]);
                li.appendChild(letter);
            }            phraseUl[0].appendChild(li);        }    }    /**
     * Checks if passed letter is in phrase
     * @param (string) letter - Letter to check
     */
    checkLetter(letter) {        // Loop through the phrase text and if the letter matches        // the phrase text at index j, return true        for (let j = 0; j < this.phrase.length; j++){
            if (this.phrase[j] == letter)
                return true;
        }        // No match, return false        return false;    }
    /**
     * Displays passed letter on screen after a match is found
     * @param (string) letter - Letter to display
     */
    showMatchedLetter(letter) {

        // Get the matchedLetters that have a class name letter
        const matchedLetters = document.getElementsByClassName(letter);

        // Loop through the matchedLetters and replace the hide class with show
        for (let k = 0; k < matchedLetters.length; k++) {
            matchedLetters[k].className = matchedLetters[k].className.replace(/\bhide\b/g, "show");
        } 
    }
}