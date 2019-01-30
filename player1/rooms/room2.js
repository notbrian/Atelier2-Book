// Please refer to hub.js for more detailed comments on rooms
const Room_2_class = new Room(
  'Level 3'
  , []
  , {
    up: {
      x: 205,
      y: 530,
      width: 30,
      height: 50,
      color: '#f00',
      destination: 'room1',
    },
  }
  , [toilet_item],
);

// Starts with the toilet broken
let toiletBroken = true;

function room2() {
  const name = Room_2_class.name;
  const items = Room_2_class.items;
  const exits = Room_2_class.exits;
  const fixables = Room_2_class.fixables;

  this.setup = function () {
  };
  this.draw = function () {
    imageMode(CORNER);
    image(background_png, 0, -1000, background_png.width / 3, background_png.height / 3);
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
    // Draw fixables
    for (let i = 0; i < fixables.length; i++) {
      const item = fixables[i];
      imageMode(CENTER);
      if (debug) {
        rect(item.x, item.y, item.width, item.height);
      }
      // If the toilet is broken, display a broken toilet
      if (toiletBroken) {
        image(broken_toilet_img, item.x, item.y, item.width, item.height);
      } else {
        image(item.image, item.x, item.y, item.width, item.height);
      }
    }
    applyThrust(items);
  };
  this.mousePressed = function () {
    checkExits(exits);
    checkItems(items);

    // Basic Fixable click Code
    if (doesCollide(toilet_item)) {
      // If its already fixed tell them
      if (!toiletBroken) {
        alert("You can't improve this toilet anymore.");
        return;
      }
      let toolable = false;
      for (let i = 0; i < inventory.length; i++) {
        const item = inventory[i];
        console.log(item);
        if (item.name === 'Duct Tape') {
          toolable = true;
          break;
        }
      }
      if (toolable) {
        alert('Fixing the toilet with the duct tape!');
        toiletBroken = false;
      } else {
        alert('You need something else to fix the toilet.');
      }
    }
  };
}
