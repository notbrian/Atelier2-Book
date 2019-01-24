var pubnub = new PubNub({
    subscribeKey: "sub-c-54b88780-135b-11e9-9cda-0ee81137d4bc",
    publishKey: "pub-c-4ef47c2a-486e-4de3-993a-0eea99b708a8",
    ssl: true
})

pubnub.addListener({
    message: readIncoming
});
pubnub.subscribe({
    channels: ["shipData", "gameOver"]
})

let gameOver = false;
let background_png;
let alertOpacity = 0
let colorFlip = false;
let nextAsteroidPos = 0;
let ship = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
}

function drawHUD() {
    push()
    imageMode(CORNER)
    image(HUD, 0, 0, 800, 600)
    pop()
}

function setup() {
    createCanvas(800, 600);
    ship.x = width / 2;
    ship.y = 400;
    background_png = loadImage("../assets/background.png")
}

function draw() {
    if (gameOver) {
        imageMode(CORNER)
        image(background_png, 0, 0)
        
        drawWords();

        return;
    }
    imageMode(CORNER)
    image(background_png, 0, 0)

    imageMode(CENTER)

    rectMode(CENTER);
    noStroke()
    fill(255, 0, 0, 40)
    rect(nextAsteroidPos, height / 2, 100, height)
    rect(255, 0, 0, 150)
    rect(ship.x, ship.y, ship.width, ship.height);
    textAlign(CENTER)
    fill(255, 0, 0, 255)
    text("Enemy Ship", ship.x, ship.y)
}

function mousePressed() {
    console.log(mouseX, mouseY);
    nextAsteroidPos = mouseX;
    sendAsteroidPos();
}

function sendAsteroidPos() {
    pubnub.publish({
        channel: "asteroidPos",
        message: {
            asteroidX: nextAsteroidPos
        }
    }, function (status, response) {
        console.log(status, response)
    });

}



function readIncoming(inMessage) //when new data comes in it triggers this function, 
{ // this works becsuse we subscribed to the channel in setup()

    // simple error check to match the incoming to the channelName
    if (inMessage.channel == "shipData") {
        ship = inMessage.message.ship
    }
    if (inMessage.channel == "gameOver") {
        if (inMessage.message.gameOver) {
            gameOver = true;
        }
    }
}

function drawWords() {
    push()
    fill('red');
    textSize(50)
    text('GAME OVER', width * 0.5, height * 0.5);
    pop()

}