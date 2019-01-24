let Hub_class = new Room(
    "Level 1", [Hammer, Duct_Tape, Keypad], {
        down: {
            x: 360,
            y: 530,
            width: 30,
            height: 50,
            color: "#f00",
            destination: "room1"
        }
    }
);

function hub() {
    const name = Hub_class.name;
    let items = Hub_class.items;
    let exits = Hub_class.exits;
    this.setup = function () {
    };
    this.draw = function () {
        imageMode(CORNER);
        image(background_png, 0, 0, background_png.width / 3, background_png.height / 3);
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

        drawHUD(name);

        applyThrust(items);

    };
    this.mousePressed = function () {
        checkExits(exits);
        checkItems(items);
        // soon check exits too
    };

}
