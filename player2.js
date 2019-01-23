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

    if(asteroidRight >= shipLeft && 
        asteroidLeft <= shipRight && 
        asteroidBottom <= shipTop &&
        asteroidTop >= shipBottom) {
            isCollision = true;
        }

    return isCollision;
}

function setup() {
    createCanvas(800, 600);

    background_png = loadImage("./assets/background.png")
    shipImage = loadImage("./assets/ship.png")
    shipThrust_image = loadImage("./assets/shipThrust.png")
    ast_image = loadImage("./assets/Meteorite1.png")

    ship.x = width /2;
    ship.y = 520;
}
function draw() {
    image(background_png, 0,0)
    push()
    translate(ship.x,  ship.y)
    rotate(radians(-90))
    imageMode(CENTER)
    if(keyIsPressed ) {
       image(shipThrust_image, 0, 0, 120,100)
    } else {
       image(shipImage, 0, 0, 100,100)
    }
    pop()
    for (var s = 0; s < Asteroids.length; s++) {
      image(ast_image, Asteroid.x, Asteroid.y, Asteroid.width, Asteroid.height);
      asteroidFall()
      checkShipCollision(Asteroid)
    }

    if(keyIsPressed && key === "a") {
        ship.x -= 3;
    }
    if(keyIsPressed && key === "d") {
        ship.x += 3;
    }

    if(ship.x <= 0 ) {
        ship.x = 0
    }

    if(ship.x >= width ) {
        ship.x = width
    }
    textAlign(CENTER);
    drawWords(width * 0.5);
}

function mousePressed() {
    console.log(mouseX, mouseY);
}

var Asteroid = {
  x : Math.random(0,799),
  y : 0,
  width : 15,
  height : 10
};


// Asteroids[Asteroid]
var Asteroids = [Asteroid];
// draw() {
function asteroidFall() {
         for (var i = 0; i < Asteroids.length; i++) {
              Asteroids[i].y = Asteroids[i].y + 5
         }
        }
//        For each Asteroid, subtract the y value by 5
//    }


//    Check if the asteroid is hitting the ship {
//        If it is, then take a strike off the ship
//    }
function collisonCheck() {
  for (var i = 0; i < Asteroids.length; i++) {
    if (checkShipCollision(Asteroids[i]) && ship.strikes < 3) {
        ship.strikes++
        console.log('!')
    }
    else if (checkShipCollision() && ship.strikes == 3) {
      s=null;
      function drawWords(x) {
        fill('red');
        text('GAME OVER', width * 0.5, height * 0.5);
}

    }
    else {

    };
  };
}


// }
