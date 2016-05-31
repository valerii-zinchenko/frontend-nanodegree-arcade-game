// Size of one X-step
var dx = 101;
// Size of one Y-step
var dy = 83;
var NWaters = 1;
var NRoads = 4;
var NGrass = 2;
var gridSize = [NWaters + NRoads + NGrass, 6];

function randomNumber (min, max) {
	return Math.round(min + Math.random() * (max - min));
}

/**
 * Abstract character.
 *
 * @constructor
 * @param {String} sprite - Path to the image/sprite
 */
var Character = function(sprite) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
	this.sprite = sprite;
};
// Path to the sprite/image
Character.prototype.sprite = "";

// X-coordinate
Character.prototype.x = 0;

// Y-coordinate
Character.prototype.y = 0;

/**
 * Update the enemy's position, required method for game
 * Should be redefined in each child class.
 *
 * @abstract
 * @param {Number} dt - A time delta between ticks
 */
Character.prototype.update = function(dt){
	// You should multiply any movement by the dt parameter
	// which will ensure the game runs at the same speed for
	// all computers.
};

/**
 * Main rendering routine.
 * Draw a character on the screen, required method for game
 */
Character.prototype.render = function(){
	ctx.drawImage(Resources.get(this.sprite), this.x * dx, this.y * dy);
};


/**
 * Enemy class
 *
 * @constructor
 * @param {String} sprite - Path to the image/sprite
 */
var Enemy = function() {
	Enemy.prototype.constructor.call(this, 'images/enemy-bug.png');

	this.y = randomNumber(NWaters, NRoads);
	this.speed = randomNumber(1, 3);
};
Enemy.prototype = Object.create(Character.prototype);

Enemy.prototype.speed = 1;	// 1 dx per second

Enemy.prototype.update = function(dt) {
	this.x += dt * this.speed;
};

/**
 * Player class
 *
 * @constructor
 * @param {String} sprite - Path to the image/sprite
 */
var Player = function(id) {
	Player.prototype.constructor.call(this, players[id || 0]);

	this.x = randomNumber(0, 5);
};
Player.prototype = Object.create(Character.prototype);
Player.prototype.y = NWaters + NRoads;

/**
 * Handle user controls
 */
Player.prototype.handleInput = function(direction){
	switch (direction) {
		case 'left':
			this.x--;
			break;

		case 'up':
			this.y--;
			break;

		case 'right':
			this.x++;
			break;

		case 'down':
			this.y++;
			break;
	}
};

// a set of available player characters
var players = [
	'images/char-boy.png',
	'images/char-cat-girl.png',
	'images/char-horn-girl.png',
	'images/char-pink-girl.png',
	'images/char-princess-girl.png'
];

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
for (var i = 0; i < NRoads; i++) {
	allEnemies.push(new Enemy());
}
var player = new Player();


// Map of the keyboard keys to player actions
var allowedKeys = {
	37: 'left',
	38: 'up',
	39: 'right',
	40: 'down'
};
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
	var action = allowedKeys[e.keyCode];
	// reduce the amount of calling the event handler of unhandled actions.
	if (action) {
		player.handleInput(action);
	}
});
