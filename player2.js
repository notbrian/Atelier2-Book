let background_png;


let ship = {
    x: 0,
    y: 0,
    rot: -90,
    strikes: 0
}
let shipImage
let shipThrust_image
function drawHUD() {
    push()
    imageMode(CORNER)
    image(HUD, 0, 0, 800, 600)
    pop()
}

function setup() {
    createCanvas(800, 600);

    background_png = loadImage("./assets/background.png")
    shipImage = loadImage("./assets/ship.png")
    shipThrust_image = loadImage("./assets/shipThrust.png")

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

}

function mousePressed() {
    console.log(mouseX, mouseY)
}


// Asteroid :
// {
//     x
//     y
//     width
//     height
// }

// Asteroids[Asteroid]

// draw() {
//    Loop over the Asteroids array {
//        For each Asteroid, subtract the y value by 5
//    }


//    Check if the asteroid is hitting the ship {
//        If it is, then take a strike off the ship
//    }
    


// }