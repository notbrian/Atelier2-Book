/* eslint no-undef: 0,
 no-unused-vars: 0
 no-console: 0
 */

// this is the engineer file yo



var pubnub = new PubNub({
    subscribeKey: "sub-c-54b88780-135b-11e9-9cda-0ee81137d4bc",
    publishKey: "pub-c-4ef47c2a-486e-4de3-993a-0eea99b708a8",
    ssl: true
})

pubnub.addListener({ message: readIncoming });
pubnub.subscribe({channels: ["thrusters"]})



var mgr;
const debug = true;


let inventory = [];

// Class constructors for data management
class Room {
    constructor(name, items, exits, fixables = []) {
        this.name = name

        this.items = items

        this.exits = exits

        this.fixables = fixables
    }
}

class Item {
    constructor(name, image, description, x, y, width, height) {
        this.name = name;
        this.image = image;
        this.description = description;
        this.x = x;
        this.y = y
        this.width = width;
        this.height = height
    }
}

// Room declarations

let HUD;
let background_png;

// General setup
function setup() {
    createCanvas(800, 600);
    mgr = new SceneManager();

    // Preload scenes. Preloading is normally optional
    // ... but needed if showNextScene() is used.

    mgr.addScene(hub);
    mgr.addScene(room1);
    mgr.addScene(room2);
    // mgr.addScene ( room3 );

    background_png = loadImage("../assets/basic_space.png");
    HUD = loadImage("../assets/EngineerHUD.png")
    mgr.showScene(hub);
    textAlign(CENTER);

    Hammer.image = loadImage(Hammer.image)
    Duct_Tape.image = loadImage(Duct_Tape.image)
    Keypad.image = loadImage(Keypad.image)
    Screw.image = loadImage(Screw.image)
    Screwdriver.image = loadImage(Screwdriver.image)
    toilet_item.image = loadImage(toilet_item.image)
    broken_toilet_img = loadImage('../assets/toiletBroken.png')
    
}

function draw() {
    background(255);
    mgr.draw();
}

function mousePressed() {
    console.log(mouseX, mouseY);
    mgr.handleEvent("mousePressed");
}

function doesCollide(rect) {
    var isCollision = false;
    let x = mouseX;
    let y = mouseY;
    var left = rect.x - rect.width / 2,
        right = rect.x + rect.width / 2;
    var top = rect.y + rect.height / 2,
        bottom = rect.y - rect.height / 2;

    if (x <= right && x >= left && y <= top && y >= bottom) {
        isCollision = true;
    }

    return isCollision;
}

// Draws exits for debugging
function debugExits(exits) {

    for (let exit in exits) {
        let entry = exits[exit];
        fill(entry.color);
        rectMode(CENTER);
        rect(entry.x, entry.y, entry.width, entry.height);
    }
}

// Universal collider function for rooms
function checkExits(exits) {
    for (let exit in exits) {
        let entry = exits[exit];

        console.log(doesCollide(entry), exit);
        if (doesCollide(entry)) {
            console.log("entering", entry.destination);
            mgr.showScene(window[entry.destination]);
            break;
        }
    }
}

function checkItems(items) {
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (doesCollide(item)) {
            console.log(`Putting ${item.name} in inventory.`)
            alert(`You got ${item.name}! ${item.description}`)
            console.log(item, items)
            inventory.push(items.splice(i, 1)[0])
            console.log(item, items)
        }
    }
}


function drawHUD(name) {
    push()
    imageMode(CORNER)
    image(HUD, 0, 0, 800, 600)
    pop()

    push()
    fill(255);
    textSize(35);
    text(name, 283, 540);
    pop()
}


function readIncoming(inMessage) //when new data comes in it triggers this function, 
{                               // this works becsuse we subscribed to the channel in setup()
  
  // simple error check to match the incoming to the channelName
  if(inMessage.channel == "thrusters")
  { let direction = inMessage.message.direction
    console.log(direction)

    if(direction === "up") {
        Hammer.y -= 5
    } else if(direction === "down"){
        Hammer.y +=5
    }
  }
}