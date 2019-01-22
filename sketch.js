/* eslint no-undef: 0,
 no-unused-vars: 0
 no-console: 0
 */

var mgr;
const debug = true;

let inventory = [];


class Room {
    constructor() {
        this.name = "Test"

        this.setup = function () {

        }

        this.draw = function () {

        }
    }


}

let testRoom = new Room;


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

class Item {
    constructor(name, image, description) {
        this.name = name;
        this.image = image;
        this.description = description;
    }
}

let Hammer = new Item("Hammer", "assets/duct_tape.png", "It hammers things.")

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

function debugExits(exits) {

    for (let exit in exits) {
        let entry = exits[exit];
        fill(entry.color);
        rectMode(CENTER);
        rect(entry.x, entry.y, entry.width, entry.height);
    }
}

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
    const name = "The Hub"

    let exits = {
        // room1: {
        //     x: 100,
        //     y: height/2,
        //     width: 50,
        //     height: 120,
        //     color: color("#c000ff")
        // },
        // room2: {
        //     x: width/2,
        //     y: height/2,
        //     width: 70,
        //     height: 120,
        //     color: color("#0bfb0b")
        // },
        down: {
            x: 647,
            y: 539,
            width: 70,
            height: 50,
            color: color("#f00"),
            destination: "room1"
        }
    };


    let background;
    this.setup = function () {
        background = loadImage("assets/basic_space.png");
        imageMode(CENTER);
    };

    this.draw = function () {
        image(background, width / 2, 750, background.width / 3, background.height / 3);
        drawName(name)
        if (debug) {
            debugExits(exits);
        }
    };

    this.mousePressed = function () {
        checkExits(exits);
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