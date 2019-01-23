/* eslint no-undef: 0,
 no-unused-vars: 0
 no-console: 0
 */

// this is the engineer file yo

var mgr;
const debug = true;

let inventory = [];
let inventory_p;


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



let Hub_class = new Room("Level 1", [Hammer, Duct_Tape, Keypad]);

let Room_1_class = new Room("Level 2", []);

let Room_2_class = new Room("Level 3", []);

let HUD;
let background_png;

function setup() {
    createCanvas(800, 600);
    mgr = new SceneManager();
    // Preload scenes. Preloading is normally optional
    // ... but needed if showNextScene() is used.
    mgr.addScene(hub);
    mgr.addScene(room1);
    mgr.addScene(room2);
    // mgr.addScene ( room3 );
    background_png = loadImage("assets/basic_space.png");
    HUD = loadImage("./assets/EngineerHUD.png")
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
    fill(255);
    textSize(40);
    textAlign(LEFT);
    text(name, 350, height - 35);
    push()
}

function drawHUD(items) {
    pop()
    imageMode(CORNER)
    image(HUD, 0, 0, 800, 600)
    push()

    for (let i = 0; i < inventory.length; i++) {
        const item = inventory[i];
        image(items[i], 514, 43)
    }
}
// Intro scene constructor function


function hub() {
    const name = Hub_class.name
    let items = Hub_class.items

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


    let loadedItems = []

    this.setup = function () {


        for (let i = 0; i < items.length; i++) {
            const element = items[i];
            console.log(element)
            loadedItems.push(loadImage(element.image))

        }


    };

    this.draw = function () {
        imageMode(CENTER)
        image(background_png, width / 2, 750, background_png.width / 3, background_png.height / 3);
        drawHUD(loadedItems);
        drawName(name)
        if (debug) {
            debugExits(exits);
        }

        // Draw items

        for (let i = 0; i < items.length; i++) {
            const element = items[i];
            image(loadedItems[i], element.x, element.y, element.width, element.height)

        }


    };

    this.mousePressed = function () {
        checkExits(exits);
        checkItems(items)
    };
}

// Main games scene constructor function
function room1() {
    const name = Room_1_class.name
    let items = Room_1_class.items

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

    this.setup = function () {

    };

    this.draw = function () {
        pop();
        imageMode(CENTER)
        image(background_png, width / 2, 300, background_png.width / 3, background_png.height / 3);
        push();
        drawHUD();
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
    const name = Room_2_class.name
    let items = Room_2_class.items
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
    this.setup = function () {};

    this.draw = function () {
        pop()
        imageMode(CENTER);
        image(background_png, width / 2, -120, background_png.width / 3, background_png.height / 3);
        push()
        drawHUD();
        drawName(name)
        if (debug) {
            debugExits(exits);
        }

    };

    this.mousePressed = function () {
        checkExits(exits);

    };
}
