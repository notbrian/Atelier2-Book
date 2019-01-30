// Create new PubNub object, add listener and subscribe to channels
const pubnub = new PubNub({
  subscribeKey: 'sub-c-54b88780-135b-11e9-9cda-0ee81137d4bc',
  publishKey: 'pub-c-4ef47c2a-486e-4de3-993a-0eea99b708a8',
  ssl: true,
});
pubnub.addListener({
  message: readIncoming,
});
pubnub.subscribe({
  channels: ['shipData', 'gameOver'],
});

// Game over state
let gameOver = false;
// Background p5.image container
let background_png;
// Variable containing the X coordinate of where the player clicked
let nextAsteroidPos = 0;

// Object to feed in the current ship data recieved from PubNub
let ship = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
};

// Setup function
function setup() {
  createCanvas(800, 600);
  ship.x = width / 2;
  ship.y = 400;
  background_png = loadImage('../assets/background.png');
}
// Draw function
function draw() {
  // Draw background
  imageMode(CORNER);
  image(background_png, 0, 0);
  // Draw game over screen if the game is over
  if (gameOver) {
    drawWords();
    return;
  }
  imageMode(CENTER);
  rectMode(CENTER);
  noStroke();
  fill(255, 0, 0, 40);
  // Draw the rectangle that shows the area where asteroids will spawn
  rect(nextAsteroidPos, height / 2, 100, height);
  rect(255, 0, 0, 150);
  // Draw a rect where the ship is and draw "Enemy Ship" inside the rectangle
  rect(ship.x, ship.y, ship.width, ship.height);
  textAlign(CENTER);
  fill(255, 0, 0, 255);
  text('Enemy Ship', ship.x, ship.y);
}

function mousePressed() {
  console.log(mouseX, mouseY);
  // Sets the next asteroid position where the player clicked and send over PubNub
  nextAsteroidPos = mouseX;
  sendAsteroidPos();
}

// Function that sends the asteroid spawn position to player 2
function sendAsteroidPos() {
  pubnub.publish({
    channel: 'asteroidPos',
    message: {
      asteroidX: nextAsteroidPos,
    },
  }, (status, response) => {
    console.log(status, response);
  });
}

// PubNub incoming message handler
function readIncoming(inMessage) {
  // Sets the new ship position
  if (inMessage.channel == 'shipData') {
    ship = inMessage.message.ship;
  }
  // Sets the game over state
  if (inMessage.channel === 'gameOver') {
    if (inMessage.message.gameOver) {
      gameOver = true;
    }
  }
}
// Game over text function
function drawWords() {
  push();
  fill('red');
  textSize(50);
  text('GAME OVER', width * 0.5, height * 0.5);
  pop();
}