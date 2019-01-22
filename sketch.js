/* eslint no-undef: 0,
 no-unused-vars: 0
 no-console: 0
 */

var mgr;
const debug = true;

let inventory = [];


class Room {
    constructor(name, items) {
        this.name = name

        this.items = items
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

let Hammer = new Item("Hammer", "assets/hammer.png",
 "It hammers things.", 87, 183, 50, 50)

 let Duct_Tape = new Item("Duct Tape", "assets/duct_tape.png",
 "It tapes things.", 216, 156, 50, 50)

 let Keypad = new Item("Keypad", "assets/keypad.png",
 "You can press numbers on it.", 378, 158, 50, 50)



let Hub_class = new Room("The Hub", [Hammer, Duct_Tape, Keypad]);





function setup() {
    createCanvas(800, 600);
    mgr = new SceneManager();
    // Preload scenes. Preloading is normally optional
    // ... but needed if showNextScene() is used.
    mgr.addScene(hub);
    mgr.addScene(room1);
    mgr.addScene(room2);
    // mgr.addScene ( room3 );


    mgr.showScene(hub);
    textAlign(CENTER);
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
            inventory.push(Hub_class.items.pop(item))
        }
    }
}

function drawName(name) {
    pop();
    fill(0);
    textSize(40);
    textAlign(LEFT);
    text(name, 20, height - 30);
    push()
}

// Intro scene constructor function
function hub() {
    const name = Hub_class.name

    let exits = {
        down: {
            x: 647,
            y: 539,
            width: 70,
            height: 50,
            color: color("#f00"),
            destination: "room1"
        }
    };

    let items = Hub_class.items

    let loadedImages = []

    let background;
    this.setup = function () {
        background = loadImage("assets/basic_space.png");
        imageMode(CENTER);

        for (let i = 0; i < items.length; i++) {
            const element = items[i];
            console.log(element)
            loadedImages.push(loadImage(element.image))
            
        }
    };

    this.draw = function () {
        image(background, width / 2, 750, background.width / 3, background.height / 3);
        drawName(name)
        if (debug) {
            debugExits(exits);
        }

        // Draw items

        for (let i = 0; i < items.length; i++) {
            const element = items[i];
            image(loadedImages[i], element.x, element.y, element.width, element.height)
            
        }
    };

    this.mousePressed = function () {
        checkExits(exits);
        checkItems(items)
    };
}

// Main games scene constructor function
function room1() {
    let exits = {
        up: {
            x: 648,
            y: 80,
            width: 70,
            height: 50,
            color: color("#0035ff"),
            destination: "hub"
        },
        down: {
            x: 644,
            y: 527,
            width: 70,
            height: 50,
            color: color("#f00"),
            destination: "room2"
        }
    };

    const name = "Room 1"
    let background;
    this.setup = function () {
        background = loadImage("assets/basic_space.png");
        imageMode(CENTER);
    };

    this.draw = function () {
        image(background, width / 2, 300, background.width / 3, background.height / 3);
        drawName(name)

        if (debug) {
            debugExits(exits);
        }

    };

    this.mousePressed = function () {
        checkExits(exits);

    };
}

function room2() {
    let exits = {
        up: {
            x: 648,
            y: 95,
            width: 70,
            height: 50,
            color: color("#0035ff"),
            destination: "room1"
        }
    };
    const name = "Room 2"
    let background;
    this.setup = function () {
        background = loadImage("assets/basic_space.png");
        imageMode(CENTER);
    };

    this.draw = function () {
        image(background, width / 2, -120, background.width / 3, background.height / 3);
        drawName(name)
        if (debug) {
            debugExits(exits);
        }

    };

    this.mousePressed = function () {
        checkExits(exits);

    };
}