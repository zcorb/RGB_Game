/*****GAME LOGIC VARs*****/

// The colors of the in-play squares
var colors = [];

// The background color of the main page used to
// hide inactive squares
var bkgdColor = "#232323";

// The background color of the h1 header
var h1BkgdColor = document.querySelector("h1").style["background-color"];

// Min number of squares to start a game
var baseNumSquares = 3;

// The color for the user to guess
var goalColor = "rgb(0, 0, 0)";


/*****GAME VISUALS VARs*****/

// All squares in the game
var squares = document.querySelectorAll(".square");

// The browser text telling user the color to guess
var colorDisplay = document.querySelector("#colorDisplay");

// Guess feedback to user ("Correct!" or "Try again!")
var messageDisplay = document.querySelector("#message");

// The h1 header
var h1 = document.querySelector("h1");


/*****GAME BUTTON VARs (and set game difficulty)*****/

// Button to reset the game
var resetButton = document.querySelector("#reset");

// Buttons to change game difficulty (easy, medium, hard)
var difficultyButtons = document.querySelectorAll(".difficulty");

// The game's default difficulty
var selectedButton = difficultyButtons[difficultyButtons.length-1];

// Choose the highest difficulty for the start
// of the game
selectedButton.classList.add("selected");

// The difficulty of the game
// easy (3), medium (6), hard (9)
var gameDifficulty = difficultyButtons.length * baseNumSquares;



/*****SET UP THE GAME BOARD*****/

// Make difficulty buttons clickable
for (var i = 0; i < difficultyButtons.length; i++) {
	// Create the function to assign to eventListener
	var buildButtonLogic = setButtonLogic(difficultyButtons[i],i);

	// Have buttons change difficulty when clicked
	difficultyButtons[i].addEventListener("click", buildButtonLogic);
};

// Reset the game when clicked
resetButton.addEventListener("click", function(){
	resetGame();
});

// Build the game
resetGame();


/*****FUNCTIONS*****/

// Function for eventListener "click" action:
//  Select this button, deselect the currently selected
//  button, and reset the game
function setButtonLogic(myButton, index){
	return function(){
		if(myButton !== selectedButton){
			gameDifficulty = (index + 1) * baseNumSquares;
			myButton.classList.add("selected");
			selectedButton.classList.remove("selected");
			selectedButton = myButton;

			resetGame();
		}
	};
}

// Reset game board
function resetGame(){
	// Generate all new colors
	colors = chooseRandColors(gameDifficulty);

	// Pick a new goal color
	goalColor = pickColor();

	// Change the color of the squares
	// Assign "goal" color's square
	updateSquareDisplay();

	// Update browser display for goal color
	colorDisplay.textContent = goalColor.toUpperCase();

	// Change h1 head backgroud back to default
	h1.style["background-color"] = h1BkgdColor;

	// Change browser display for reset button
	// to default
	resetButton.textContent = "New Colors";

	// Change browser display for user feedback
	// to default
	messageDisplay.textContent = "";
}

// Change the color of all active square to
// match 'color'
function changeColors(color){
	for (var i = 0; i < colors.length; i++) {
		if(squares[i].style["background-color"] !== color) {squares[i].style["background-color"] = color;
		}
	}
}

// Pick a random color from the colors[] array
function pickColor(){
	var index = Math.floor(Math.random() * colors.length);
	return colors[index];
}

// Create an array of random colors
function chooseRandColors(num){
	// Create array
	var arr = [];

	// Add num random colors to array
	for (var i = 0; i < num; i++) {
		arr.push(randColorGen());
	}

	return arr;
}

// Generate a random rgb-based color in
// string format
function randColorGen(){
	// Pick red, green, and blue from 0-255
	var r = Math.floor(Math.random() * 256);
	var g = Math.floor(Math.random() * 256);
	var b = Math.floor(Math.random() * 256);

	return "rgb(" + r +", " + g + ", " + b + ")";
}

// Update squares' color display
// Set "click" eventListeners based on goal color
function updateSquareDisplay(){
	for(var i = 0; i < squares.length; i++){
		// Assuming color #i exists in the colors array...
		if(colors[i]){

			// Add color to square
			squares[i].style["background-color"] = colors[i];
			squares[i].style.display = "block";

			// Add click listeners to square
			squares[i].addEventListener("click", function(){

				// Grab color of clicked square
				var clickedColor = this.style["background-color"];

				// Compare square's color to goal color
				// If matching, praise the user and change all
				// squares to this squares color
				if(clickedColor === goalColor){
					messageDisplay.textContent = "Correct!";
					changeColors(goalColor);
					h1.style["background-color"] = goalColor;
					resetButton.textContent = "Play again?";

				// Otherwise, encourage user and fade out
				// the square 
				} else {
					this.style["background-color"] = bkgdColor;
					messageDisplay.textContent = "Try again!"
				}
			});
			
		// Otherwise, hide this square
		} else{
			squares[i].style.display = "none";
		}
	}
}
