let Room_1_class = new Room(
    "Level 2", [Screw, Screwdriver], {
        down: {
            x: 360,
            y: 530,
            width: 30,
            height: 50,
            color: "#f00",
            destination: "room2"
        },
        up: {
            x: 205,
            y: 530,
            width: 30,
            height: 50,
            color: "#f00",
            destination: "hub"
        }
    }
);

function room1() {
    const name = Room_1_class.name;
    let items = Room_1_class.items;
    let exits = Room_1_class.exits;
    this.setup = function () {
    };
    this.draw = function () {
        imageMode(CORNER);
        image(background_png, 0, -500, background_png.width / 3, background_png.height / 3);
        drawHUD(name);
        if (debug) {
            debugExits(exits);
        }
        // Draw items
        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            imageMode(CENTER);
            if (debug) {
                rect(item.x, item.y, item.width, item.height);
            }
            image(item.image, item.x, item.y, item.width, item.height);
        }
    };
    this.mousePressed = function () {
        checkExits(exits);
        checkItems(items);
        // soon check exits too
    };
}
