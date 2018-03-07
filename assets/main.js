/* The theme of my hangman is America F*ck Yeah */

var hangman = {
    hint: "",
    currentAnswer: "",
    wins: 0,
    guessesLeft: 10,
    lettersUsed: "",
    answerDiv: "",
    targetArray: [],
    victoryCounter: 0,
    answerArray: ["MOUNT-RUSHMORE", "NIAGARA-FALLS", "WASHINGTON-MONUMENT", "GATEWAY-ARCH", "CARLSBAD-CAVERNS", "BROOKLYN-BRIDGE", "HEARST-CASTLE", "THE-ALAMO", "TRUMP-TOWER"],
    hintArray: ["Chiselled into the Black Hills...", "Cascading on the border...","The obelisk...", "The gateway to the west...", "The Hall of the Giants lies within...", "Above the East River...", "The Enchanted Hill...", "Remember this...", "Covfefe Palace..."],
    generateAnswerAndHint: function() {
      var randomNumber = Math.floor(Math.random() * 9);
      this.hint = this.hintArray[randomNumber];
      hangman.currentAnswer = this.answerArray[randomNumber];
    },
    genTargetArray: function() {
      this.targetArray = this.currentAnswer.split("");
    },
    generateAnswerDiv: function() {
      for (var i = 0; i < this.targetArray.length; i++) {
        if (this.targetArray[i] === "-") {
          console.log(hangman.targetArray);
          this.answerDiv += "<p class='target-letters'>" + "-" + "</p>";
        }
        else {
          this.answerDiv += "<p class='target-letters'>" + "_" + "</p>";
        }
      }
    },

    // This resets the game after a win or loss. //
    resetHangman: function () {
      this.victoryCounter = 0;
      this.lettersUsed = "";
      this.answerDiv = "";
      this.guessesLeft = 10;

      // The first line below prepares the data for the answer and hint.  The second line generates the target Array, which holds the answer within, and the third line gets the data from the first and second line and sends it down to the HTML.
      this.generateAnswerAndHint();
      this.genTargetArray();
      this.generateAnswerDiv();

      // Generates the initial HTML
      hangman.updateHTML();
      var html2 = this.answerDiv;
      document.querySelector("#gameAnswerField").innerHTML = html2;
    },
    updateHTML: function() {
      var html =
      "<h4>Hint: " + hangman.hint + "</h4>" +
      "<p>Wins: " + hangman.wins + "</p>" +
      "<p>Number of Guesses Remaining: " + hangman.guessesLeft + "</p>" +
      "<p>Letters Already Guessed: " + hangman.lettersUsed + "</p>";
      document.querySelector("#game").innerHTML = html;
    }
  };
  
  // The first line below prepares the data for the answer and hint.  The second line generates the target array, which holds the answer within, and the third line creates the answer div, with the underscores.
  hangman.generateAnswerAndHint();
  hangman.genTargetArray();
  hangman.generateAnswerDiv();
  
  // Generates the initial HTML for the lines before the answerDiv.
  hangman.updateHTML();
  
  var html2 = hangman.answerDiv;
  
  document.querySelector("#gameAnswerField").innerHTML = html2;
  
  hangman.updateHTML();
  
  // These sounds are expressions for the winners and losers
  var ohYeahAudio = new Audio("./assets/sounds/Oh-Yeah.mp3");
  var crowdBooAudio = new Audio("./assets/sounds/Crowd-Boo.mp3");
  var userGuess;
  // Captures Key Clicks
  document.onkeyup = function(event) {
    // Sets a counter, if counter is 0, that means the user's guess did not match
    var counter = 0;
    // Determines which exact key was selected. Make it lowercase
    userGuess = String.fromCharCode(event.keyCode).toUpperCase();
    var par = document.getElementsByClassName("target-letters");
  
    // The line below, was added to prevent a user entering letters previously entered, and inflating the victory point count (or subtracting from the number of guesses remaining)
    if (hangman.lettersUsed.indexOf(userGuess) < 0) {
      for (var i = 0; i < hangman.targetArray.length;  i++) {
        if (userGuess === hangman.targetArray[i]) {
          console.log(hangman.targetArray[i] + "you matched");
          hangman.victoryCounter++;
          console.log(hangman.victoryCounter);
          counter++;
          hangman.lettersUsed += userGuess;
          par[i].innerHTML = userGuess;
          if (hangman.victoryCounter === (hangman.targetArray.length - 1)) {
            hangman.wins++;
            ohYeahAudio.play();
            alert("You have " + hangman.wins + " win(s). Somebody call Wheel of Fortune, their on FIRE!");
            hangman.resetHangman();
          }
        }
      }
      if (counter === 0) {
        hangman.guessesLeft = hangman.guessesLeft - 1;
        hangman.lettersUsed += userGuess;
        hangman.updateHTML();
      }
      counter = 0;
  
      hangman.updateHTML();
      if (hangman.guessesLeft === 0) {
        crowdBooAudio.play();
        alert(" That a no for me dog! We need a Webster's over here because this one can't spell!");
        hangman.resetHangman();
      }
    }
  };
  