// Player 2 - Pilot File
// Create new PubNub with pub/sub keys
const pubnub = new PubNub({
  subscribeKey: 'sub-c-54b88780-135b-11e9-9cda-0ee81137d4bc',
  publishKey: 'pub-c-4ef47c2a-486e-4de3-993a-0eea99b708a8',
  ssl: true,
});
// Create PubNub listener
pubnub.addListener({
  message: readIncoming,
});
// Subscribe to relevant channels
pubnub.subscribe({
  channels: ['asteroidPos'],
});
// Variable to contain background image
let background_png;
// Object that contains the ship data
const ship = {
  x: 0,
  y: 0,
  rot: -90,
  // Counts the asteroid hits
  strikes: 0,
  width: 100,
  height: 100,
};
// Var that holds the p5.image of the ship
let shipImage;
// Var that holds the p5.image of the ship when thrusting
let shipThrust_image;
// State of the game
let gameOver = false;
// How much time does a round start off, in seconds
let timer = 90;
// Variable that holds the opacity value of red flashing text
let alertOpacity = 0;
// Boolean that controls whether to increment or decrement the alertOpacity
let colorFlip = false;
// HUD variable
let HUD;
// Asteroids array contains all the actively drawn asteroids
const Asteroids = [];
// The next asteroid
let nextAsteroidPos = 0;

// Array that holds all the p5.images of the asteroid sprites
const ast_images = [];

// Asteroid class
class Asteroid {
  constructor(x, type, width, height) {
    this.x = x;
    this.y = -100;
    this.type = type;
    this.width = width;
    this.height = height;
  }
  // Update function for Asteroid
  update() {
    // Move the asteroid down 2 pixels
    this.y += 2;
    // If the asteroid is well off the screen, remove it from the Asteroids array
    if (this.y > height + this.height) {
      const index = Asteroids.indexOf(this);
      Asteroids.splice(index, 1);
    }
    // Check if the asteroid hit the ship
    if (checkShipCollision(this)) {
      // If the ship strikes are equal/greater than 3, end the function
      if (ship.strikes >= 3) {
        return;
      }
      // Logs a collision
      console.log('collision');
      // Removes the asteroid from the Asteroids array
      const index = Asteroids.indexOf(this);
      Asteroids.splice(index, 1);
      // Increments the number of strikes by 1
      ship.strikes++;
    }
  }
}
// Draws the HUD
function drawHUD() {
  push();
  imageMode(CORNER);
  image(HUD, 0, 0, 800, 600);
  pop();
}
// Check if an asteroid has hit the ship
function checkShipCollision(asteroid) {
  let isCollision = false;
  // Calculate sides of ship and asteroid
  const shipLeft = ship.x - (ship.width / 2);
  const shipRight = ship.x + (ship.width / 2);
  const shipTop = ship.y + (ship.height / 2);
  const shipBottom = ship.y - (ship.height / 2);
  const asteroidLeft = asteroid.x - (asteroid.width / 2);
  const asteroidRight = asteroid.x + (asteroid.width / 2);
  const asteroidTop = asteroid.y + (asteroid.height / 2);
  const asteroidBottom = asteroid.y - (asteroid.height / 2);

  if (asteroidRight >= shipLeft &&
        asteroidLeft <= shipRight &&
        asteroidBottom <= shipTop &&
        asteroidTop >= shipBottom) {
    isCollision = true;
    console.log('collision');
  }
  return isCollision;
}

function setup() {
  createCanvas(800, 600);
  // Loads images
  background_png = loadImage('../assets/background.png');
  shipImage = loadImage('../assets/ship.png');
  shipThrust_image = loadImage('../assets/shipThrust.png');
  HUD = loadImage('../assets/PilotHUD.png');
  ast_images.push(loadImage('../assets/Meteorite1.png'));
  ast_images.push(loadImage('../assets/Meteorite2.png'));
  ast_images.push(loadImage('../assets/Meteorite3.png'));
  // Sets ship default position, needs to be in setup to access width
  ship.x = width / 2;
  ship.y = 400;
  // Asteroid spawning interval
  setInterval(() => {
    const type = Math.round(random(0, 2));
    Asteroids.push(new Asteroid(nextAsteroidPos, type, ast_images[type].width / 13, ast_images[type].height / 13));
  }, 1200);
}

function draw() {
// Draw background
  imageMode(CORNER);
  image(background_png, 0, 0);
  imageMode(CENTER);
  // Loops through Asteroids array and draws
  for (let s = 0; s < Asteroids.length; s++) {
    // Draw asteroid image
    image(
      ast_images[Asteroids[s].type],
      Asteroids[s].x,
      Asteroids[s].y,
      Asteroids[s].width,
      Asteroids[s].height,
    );
    // Draw the red danger box around the Asteroid
    // It was an aesthetic and design choice to add this in
    // It shows the actual collision box of the asteroid
    // which gives the player a better sense of how to dodge the asteroids.
    // Rather than if it wasn't included, you would often clip the
    // rectangle despite it looking like you dodged the asteroid.
    stroke(255, 0, 0, alertOpacity);
    fill(0, 0, 0, 0);
    rectMode(CENTER);
    rect(
      Asteroids[s].x,
      Asteroids[s].y,
      Asteroids[s].width,
      Asteroids[s].height,
    );
    // Update the asteroid
    Asteroids[s].update();
  }
  // If the game isn't over run this block
  if (!gameOver) {
    // Draw the ship on the screen
    push();
    translate(ship.x, ship.y);
    rotate(radians(-90));
    stroke(255, 0, 0, alertOpacity);
    fill(0, 0, 0, 0);
    rectMode(CENTER);
    rect(0, 0, ship.width, ship.height);
    // If a key is pressed, switch the image to the thrusting image
    if (keyIsPressed) {
      image(shipThrust_image, -8, 0, 120, 100);
    } else {
      image(shipImage, 0, 0, 100, 100);
    }
    pop();

    // Movement
    // If a key is pressed and its the a key, move the ship to the left
    if (keyIsPressed && key === 'a') {
      ship.x -= 3;
    }
    // If d is pressed, move to the right
    if (keyIsPressed && key === 'd') {
      ship.x += 3;
    }

    // Stop the ship from moving off the visible canvas
    if (ship.x <= 0) {
      ship.x = 0;
    }
    if (ship.x >= width) {
      ship.x = width;
    }
    // Draw the HUD
    imageMode(CORNER);
    image(HUD, 0, 0);

    // Deincrement the counter, found an example on the internet
    if (frameCount % 60 == 0 && timer > 0) { // if the frameCount is divisible by 60, then a second has passed. it will stop at 0
      timer--;
    }
    // Draw the timer on the screen
    push();
    textSize(30);
    fill(255, 0, 0);
    noStroke();
    const timerText = sec2human(timer);
    text(timerText, 489, 50);
    pop();

    // Create a string of X's depending on the number of strikes
    let strikes = '';
    for (let i = 0; i < ship.strikes; i++) {
      strikes += 'X';
    }
    // Draws the strikes and the "Asteroid Field!" text
    push();
    textSize(40);
    fill(255, 0, 0);
    textAlign(LEFT);
    text(strikes, 577, 55);
    push();
    fill(255, 0, 0, alertOpacity);
    text('Asteroid Field!', 400, 560);
    pop();
    pop();

    // If the number of strikes is >= 3, draw the game over screen
  }
  if (ship.strikes >= 3) {
    drawWords();
  }

  // If the timer is over, write the game over text on the screen
  if (timer == 0) {
    drawWords();
  }
  // Fades the opacity of the red flashing elements on the page
  if (alertOpacity > 255 || alertOpacity < 0) {
    // Flips a boolean to determine when to start counting up 0-255 and then to count down 255-0
    colorFlip = !colorFlip;
  }
  if (colorFlip) {
    alertOpacity -= 5;
  } else {
    alertOpacity += 5;
  }
}

function mousePressed() {
  // Debugging position
  console.log(mouseX, mouseY);
}

function keyPressed() {
  // If the 'a' key is pressed, run sendThrust with the arguement of "up"
  // Sends a PubNub message to player 1
  if (key === 'a') {
    sendThrust('up');
  }
  // Viceversa for "d"
  if (key === 'd') {
    sendThrust('down');
  }
}
// When a key is released send a "stop" message to indicate the ship has stopped moving
function keyReleased() {
  sendThrust('stop');
  // Sends the position of the ship to player 3 only when the ship has stopped
  sendShipPos();
}

// Game over function
function drawWords() {
  push();
  textAlign(CENTER);
  fill('red');
  textSize(50);
  text('GAME OVER', width * 0.5, height * 0.5);
  pop();
  console.log('test');
  // Sends a PubNub message saying the game is over
  // This has an if statement, and takes place before 'gameOver = true' for optimization
  // Otherwise a PubNub message would be sent everytime a frame is rendered
  if (!gameOver) {
    pubnub.publish({
      channel: 'gameOver',
      message: {
        gameOver: true,
      },
    }, (status, response) => {
      console.log(status, response);
    });
  }
  // Sets gameOver to be true
  gameOver = true;
}
// sendThrust function sends the thrusters direction to player 1
function sendThrust(direction) {
  pubnub.publish({
    channel: 'thrusters',
    message: {
      direction,
    },
  }, (status, response) => {
    console.log(status, response);
  });
}
// sendShipPos function sends the current ship data to player 3
function sendShipPos() {
  pubnub.publish({
    channel: 'shipData',
    message: {
      ship: {
        x: ship.x,
        y: ship.y,
        width: ship.width,
        height: ship.height,
      },
    },
  }, (status, response) => {
    console.log(status, response);
  });
}
// Function that gets called when a new message comes in
function readIncoming(inMessage) {
  if (inMessage.channel == 'asteroidPos') {
    nextAsteroidPos = inMessage.message.asteroidX;
  }
}
// Function that converts seconds to a minute:seconds format
// Found on StackOverflow
function sec2human(seconds) {
  let sec = seconds % 60;
  const min = parseInt(seconds / 60, 10);
  if (sec.toString().length == 1) { // padding
    sec = `0${sec}`;
  }
  return `${min}:${sec}`;
}
