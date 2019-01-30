/* eslint no-undef: 0,
 no-unused-vars: 0,
 no-console: 0,
 prefer-destructuring: 0
 */

// Player 1 - Engineer - Main File

// Init Scenemanager variable
let mgr;
// Init debug variable, draws bounding boxes for clickable items when true
const debug = false;
// Init thrust variable, used to shift items on the screen around
let thrust = 'stop';
// Init gameOver variable, when true it displays the game over screen
let gameOver = false;
// Init nventory variable used to keep track of the items picked
const inventory = [];
// Init HUD variable that contains the p5.image of the HUD
let HUD;
// Init variable that contains the p5.image of the background
let background_png;

// Starts a new PubNub object with our pub & sub keys
const pubnub = new PubNub({
  subscribeKey: 'sub-c-54b88780-135b-11e9-9cda-0ee81137d4bc',
  publishKey: 'pub-c-4ef47c2a-486e-4de3-993a-0eea99b708a8',
  ssl: true,
});

// readIncoming function used to read the incoming PubNub messages
function readIncoming(inMessage) {
  // If the incoming message is in the channel "thrusters",
  // update the thrust global variable with the new direction
  if (inMessage.channel === 'thrusters') {
    const direction = inMessage.message.direction;

    thrust = direction;
  }
  // If the incoming message is from the "gameOver" channel, and the game is over,
  // update the gameOver variable to be true. The game is over.
  if (inMessage.channel === 'gameOver') {
    if (inMessage.message.gameOver) {
      gameOver = true;
    }
  }
}

// Tell the PubNub object to listen for messages coming on the thrusters and gameOver channel
pubnub.subscribe({
  channels: ['thrusters', 'gameOver'],
});

// Adds a new listener on the pubnub object
// if a message is received, pass it to the readIncoming function
pubnub.addListener({
  message: readIncoming,
});

// Room class
// I made these classes to make it as modular as possible to create a new room or item
// Saves code and time!
// Scenemanager room functions don't let you store data in them either, so I needed to make a class
// for every room to store dynamic data like items.

class Room {
  // Constructor called when a new Room is created
  constructor(name, items, exits, fixables = []) {
    // Sets the name of the room, displayed in the bottom left of the screen. E.g "Level 1"
    this.name = name;
    // Assigns an array of items to the room
    this.items = items;
    // Assigns an array of exits to the room
    this.exits = exits;
    // Assigns an array of fixable items/events to the room
    this.fixables = fixables;
  }
}

// Item class
class Item {
  constructor(name, image, description, x, y, width, height) {
    this.name = name;
    // Image path for the item, starts off as a filepath, but becomes a p5.image in the setup()
    this.image = image;
    // Flavor text that displays when you pick up an item
    this.description = description;
    // The starting coordinates
    this.x = x;
    this.y = y;
    // The width and the height of the item
    this.width = width;
    this.height = height;
  }
}


// General setup for player 1
function setup() {
  createCanvas(800, 600);
  // Creates a new SceneManager from p5.scenemanager
  mgr = new SceneManager();
  // Preloads scenes from room functions defined in their individual files.
  mgr.addScene(hub);
  mgr.addScene(room1);
  mgr.addScene(room2);
  // Loads the background image into a p5.image
  background_png = loadImage('../assets/basic_space.png');
  HUD = loadImage('../assets/EngineerHUD.png');
  // Displays the hub (level 1) scene as the start
  mgr.showScene(hub);
  // sets the text of the sketch to be center aligned
  textAlign(CENTER);

  // Overwrites all the items/fixables image properties with their p5.image
  Hammer.image = loadImage(Hammer.image);
  Duct_Tape.image = loadImage(Duct_Tape.image);
  Keypad.image = loadImage(Keypad.image);
  Screw.image = loadImage(Screw.image);
  Screwdriver.image = loadImage(Screwdriver.image);
  toilet_item.image = loadImage(toilet_item.image);
  broken_toilet_img = loadImage('../assets/toiletBroken.png');
  crack_1.image = loadImage(crack_1.image);
}

// Main draw loop
function draw() {
  background(255);
  // If the game is over, stop drawing the scene manager scene and
  // display the game over sequence
  if (gameOver) {
    drawWords();
  } else {
    // Draw the current scene in scenemanager
    mgr.draw();
  }
}

// On mouse pressed
function mousePressed() {
  // Debugging tool, makes it easy to place or adjust item position
  console.log(mouseX, mouseY);
  // Run the mousePressed function for the current scene
  mgr.handleEvent('mousePressed');
}
// DoesCollide function, used to check if the mouse is clicking on a clickable item
// Requires an object with an x, y, width, and height property.
// Returns true or false.
function doesCollide(rect) {
  // Start off with assuming there is no collision
  let isCollision = false;
  // Sets up variables to make the algorithm cleaner
  const x = mouseX;
  const y = mouseY;
  // Calculate the sides of our item
  const left = rect.x - (rect.width / 2);
  const right = rect.x + (rect.width / 2);
  const top = rect.y + (rect.height / 2);
  const bottom = rect.y - (rect.height / 2);

  // Calculate if the mouseXY click is inside the item bounding box
  // If it is, set isCollision to true.
  if (x <= right && x >= left && y <= top && y >= bottom) {
    isCollision = true;
  }
  return isCollision;
}

// Draws rectangles for debugging, receives an array of exits
function debugExits(exits) {
  // Loops over ever exit in the exits array and draws a rect
  // on the page to show the bounding box
  for (const exit in exits) {
    const entry = exits[exit];
    fill(entry.color);
    rectMode(CENTER);
    rect(entry.x, entry.y, entry.width, entry.height);
  }
}

// Checks if an exit is clicked and then changes the scene correspondingly
function checkExits(exits) {
  for (const exit in exits) {
    const entry = exits[exit];
    console.log(doesCollide(entry), exit);
    if (doesCollide(entry)) {
      console.log('entering', entry.destination);
      mgr.showScene(window[entry.destination]);
      break;
    }
  }
}

// Checks if an item is clicked by the mouse and then pushes it to the inventory
function checkItems(items) {
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    if (doesCollide(item)) {
      console.log(`Putting ${item.name} in inventory.`);
      alert(`You got ${item.name}! ${item.description}`);
      console.log(item, items);
      inventory.push(items.splice(i, 1)[0]);
      console.log(item, items);
    }
  }
}
// Draws the HUD on the screen and the name of the room
function drawHUD(name) {
  push();
  imageMode(CORNER);
  image(HUD, 0, 0, 800, 600);
  pop();

  push();
  fill(255);
  textSize(35);
  text(name, 283, 540);
  pop();
}
// Moves the items on the screen depending on the value of the thrust variable
function applyThrust(items) {
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    item.y += random(0, 0.5);
    if (thrust === 'up') {
      item.x -= random(-2, 2);
      item.y -= random(2, 6);
    } else if (thrust === 'down') {
      item.x += random(-2, 2);
      item.y += random(2, 6);
    }
  }
}
// Draws the game over screen
function drawWords() {
  push();
  fill('red');
  textSize(50);
  text('GAME OVER', width * 0.5, height * 0.5);
  pop();
}
