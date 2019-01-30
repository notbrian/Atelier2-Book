/* eslint func-names: 0
 */

// Hub (Level 1) class and scene functions

// Room class to manage data
const Hub_class = new Room(
  // Name of room
  'Level 1'
  // Items in room
  , [Hammer, Duct_Tape, Keypad]
  // Exits in room
  , {
    down: {
      x: 360,
      y: 530,
      width: 30,
      height: 50,
      color: '#f00',
      destination: 'room1',
    },
  },
);

// Actual scene function that gets passed into the scenemanager
function hub() {
  // Assigns constants from the data class
  const name = Hub_class.name;
  const items = Hub_class.items;
  const exits = Hub_class.exits;
  // Setup function for scene
  this.setup = function () {
  };
  // Draw function
  this.draw = function () {
     // Draws the background
    imageMode(CORNER);
    image(background_png, 0, 0, background_png.width / 3, background_png.height / 3);
    // Draws the debug rects
    if (debug) {
      debugExits(exits);
    }
    // Draw items
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      imageMode(CENTER);
      // If debug mode is on, draw bounding box rects
      if (debug) {
        rect(item.x, item.y, item.width, item.height);
      }
      // Draw the image of the object
      image(item.image, item.x, item.y, item.width, item.height);
    }
    // Draw the HUD, passing the name of the room as an arguement
    drawHUD(name);
    // Apply the current thrust direction to the items
    applyThrust(items);
  };
  // Scene mousePressed function
  this.mousePressed = function () {
    // Check if the mouse if clicking on an exit or an item
    checkExits(exits);
    checkItems(items);
  };
}
