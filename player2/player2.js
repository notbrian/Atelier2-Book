var pubnub = new PubNub({
    subscribeKey: "sub-c-54b88780-135b-11e9-9cda-0ee81137d4bc",
    publishKey: "pub-c-4ef47c2a-486e-4de3-993a-0eea99b708a8",
    ssl: true
})

pubnub.addListener({ message: readIncoming });
pubnub.subscribe({channels: ["asteroidPos"]})


let background_png;


let ship = {
    x: 0,
    y: 0,
    rot: -90,
    strikes: 0,
    width: 100,
    height: 100
}
let shipImage
let shipThrust_image
let gameOver = false;

// var Asteroid = {
//     x: 400,
//     y: 0,
//     width: 50,
//     height: 50
// };



class Asteroid {
    constructor(x, type, width, height) {
        this.x = x;
        this.y = -100;
        this.type = type
        this.width = width;
        this.height = height;
    }

    update() {
        this.y += 2

        if (this.y > height + this.height) {
            let index = Asteroids.indexOf(this);
            Asteroids.splice(index, 1);


        }

        if (checkShipCollision(this)) {

            if (ship.strikes >= 3) {
                return
            }

            console.log("collision")
            let index = Asteroids.indexOf(this);
            Asteroids.splice(index, 1);

            ship.strikes++;
        }
    }
}

let Asteroids = []

let alertOpacity = 0
let colorFlip = false;
let nextAsteroidPos = 0;
function drawHUD() {
    push()
    imageMode(CORNER)
    image(HUD, 0, 0, 800, 600)
    pop()
}

function checkShipCollision(asteroid) {
    let isCollision = false;

    let shipLeft = ship.x - ship.width / 2,
        shipRight = ship.x + ship.width / 2,
        shipTop = ship.y + ship.height / 2,
        shipBottom = ship.y - ship.height / 2;

    let asteroidLeft = asteroid.x - asteroid.width / 2,
        asteroidRight = asteroid.x + asteroid.width / 2,
        asteroidTop = asteroid.y + asteroid.height / 2,
        asteroidBottom = asteroid.y - asteroid.height / 2;

    if (asteroidRight >= shipLeft &&
        asteroidLeft <= shipRight &&
        asteroidBottom <= shipTop &&
        asteroidTop >= shipBottom) {
        isCollision = true;
        console.log("collision")
    }
    return isCollision;
}

let ast_images = [];

let HUD;

function setup() {
    createCanvas(800, 600);

    background_png = loadImage("../assets/background.png")
    shipImage = loadImage("../assets/ship.png")
    shipThrust_image = loadImage("../assets/shipThrust.png")
    HUD = loadImage("../assets/PilotHUD.png")
    ast_images.push(loadImage("../assets/Meteorite1.png"))
    ast_images.push(loadImage("../assets/Meteorite2.png"))
    ast_images.push(loadImage("../assets/Meteorite3.png"))

    ship.x = width / 2;
    ship.y = 400;

    setInterval(function () {
        let type = Math.round(random(0, 2))
        // Asteroids.push(new Asteroid(random(-100, width + 100), type, ast_images[type].width / 13, ast_images[type].height / 13))
        Asteroids.push(new Asteroid(nextAsteroidPos, type, ast_images[type].width / 13, ast_images[type].height / 13))

    }, 1000)

}

function draw() {
    imageMode(CORNER)
    image(background_png, 0, 0)

    imageMode(CENTER)

    for (var s = 0; s < Asteroids.length; s++) {

        image(ast_images[Asteroids[s].type],
            Asteroids[s].x,
            Asteroids[s].y,
            Asteroids[s].width,
            Asteroids[s].height);

        stroke(255, 0, 0, alertOpacity)
        fill(0, 0, 0, 0)
        rectMode(CENTER)
        rect(Asteroids[s].x,
            Asteroids[s].y,
            Asteroids[s].width,
            Asteroids[s].height)

        Asteroids[s].update();
    }

    if (!gameOver) {
        push()
        translate(ship.x, ship.y)
        rotate(radians(-90))
        stroke(255, 0, 0, alertOpacity)
        fill(0, 0, 0, 0)
        rectMode(CENTER)
        rect(0, 0, ship.width, ship.height)
        if (keyIsPressed) {
            image(shipThrust_image, -8, 0, 120, 100)
        } else {
            image(shipImage, 0, 0, 100, 100)
        }
        pop()


        // Movement

        if (keyIsPressed && key === "a") {
            ship.x -= 3;
        }
        if (keyIsPressed && key === "d") {
            ship.x += 3;

        }

        if (ship.x <= 0) {
            ship.x = 0
        }

        if (ship.x >= width) {
            ship.x = width
        }
    }

    imageMode(CORNER)
    image(HUD, 0, 0)


    let strikes = ""
    for (let i = 0; i < ship.strikes; i++) {
        strikes += "X"
    }
    push()
    textSize(40)
    fill(255, 0, 0)
    textAlign(LEFT)
    text(strikes, 502, 55)
    push()
    fill(255, 0, 0, alertOpacity)
    text("Asteroid Field!", 400, 560)
    pop()
    pop()

    if (ship.strikes >= 3) {
        textAlign(CENTER);
        drawWords();
    }

    if (alertOpacity > 255 || alertOpacity < 0) {
        colorFlip = !colorFlip
    }

    if (colorFlip) {
        alertOpacity -= 5
    } else {
        alertOpacity += 5
    }
}

function mousePressed() {
    console.log(mouseX, mouseY);
}

function keyPressed() {
    if(key === 'a') {
        sendThrust("up")
    } 

    if(key === 'd') {
        sendThrust("down")
    }

}

function keyReleased() {
    sendThrust("stop")
    sendShipPos();
}

function drawWords() {
    push()
    fill('red');
    textSize(50)
    text('GAME OVER', width * 0.5, height * 0.5);
    pop()
    if(!gameOver) {
        pubnub.publish({
            channel : "gameOver",
            message: { 
                gameOver: true
            }
            }, function (status, response) {
                console.log(status, response)
            }
        );
    }
    gameOver = true;
    
}

function sendThrust(direction) {
    pubnub.publish({
        channel : "thrusters",
        message: { 
            direction: direction
        }
        }, function (status, response) {
            console.log(status, response)
        }
    );
    
}

function sendShipPos() {
    pubnub.publish({
        channel : "shipData",
        message: { 
            ship: {
                x: ship.x,
                y: ship.y,
                width: ship.width,
                height: ship.height
            }
        }
        }, function (status, response) {
            console.log(status, response)
        }
    );
    
}



function readIncoming(inMessage) //when new data comes in it triggers this function, 
{                               // this works becsuse we subscribed to the channel in setup()
  
  // simple error check to match the incoming to the channelName
  if(inMessage.channel == "asteroidPos")
  { nextAsteroidPos = inMessage.message.asteroidX
  }
}