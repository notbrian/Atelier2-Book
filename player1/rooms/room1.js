// Please refer to hub.js for more detailed comments on rooms

// Creates data class
const Room_1_class = new Room(
  'Level 2'
  , [Screw, Screwdriver]
  , {
    down: {
      x: 360,
      y: 530,
      width: 30,
      height: 50,
      color: '#f00',
      destination: 'room2',
    },
    up: {
      x: 205,
      y: 530,
      width: 30,
      height: 50,
      color: '#f00',
      destination: 'hub',
    },
  }
  , [crack_1],
);

// Creates scene function
function room1() {
  const name = Room_1_class.name;
  const items = Room_1_class.items;
  const exits = Room_1_class.exits;
  const fixables = Room_1_class.fixables;
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

    // Draw any fixable object (Cracks, broken toilets)
    for (let i = 0; i < fixables.length; i++) {
      const item = fixables[i];
      imageMode(CENTER);
      if (debug) {
        rect(item.x, item.y, item.width, item.height);
      }
      image(item.image, item.x, item.y, item.width, item.height);
    }

    applyThrust(items);
  };
  this.mousePressed = function () {
    checkExits(exits);
    checkItems(items);

    // Manual collision detection of the fixable in the room 
    if (doesCollide(crack_1)) {
      let toolable = false;
      // Searches if the player has the right tool
      for (let i = 0; i < inventory.length; i++) {
        const item = inventory[i];
        console.log(item);
        // If they have the duct tape stop looping
        if (item.name === 'Duct Tape') {
          toolable = true;
          break;
        }
      }
      // If they can fix the problem, fix it and remove the fixable
      if (toolable) {
        alert('Fixing the crack with the duct tape!');
        toolable = false;
        const index = fixables.indexOf(crack_1);
        fixables.splice(index, 1);
      }
      // If they don't have the required item 
      else {
        alert('You need something else to fix the crack.');
      }
    }
  };
}
