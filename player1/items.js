// Definition file for all the items and fixables

// Hub items
// Every item is required to have a name, image path, flavor text,
// XYPosition, and a width and height
const Hammer = new Item(
  'Hammer'
  , '../assets/hammer.png'
  , 'It hammers things.'
  , 87, 183, 50, 50,
);

const Duct_Tape = new Item(
  'Duct Tape'
  , '../assets/duct_tape.png'
  , 'It tapes things.'
  , 216, 156, 50, 50,
);

const Keypad = new Item(
  'Keypad'
  , '../assets/keypad.png'
  , 'You can press numbers on it.'
  , 378, 158, 50, 50,
);

// Room1
const Screw = new Item(
  'Screw'
  , '../assets/screw.png'
  , 'This combined with a screwdriver can secure things.'
  , 88, 312, 50, 50,
);

const Screwdriver = new Item(
  'Screwdriver'
  , '../assets/screwdriver.png'
  , 'This combined with a screw can secure things.'
  , 256, 257, 50, 50,
);

// Toilet class created from the Item class
// Originally was going to add multiple toilets or events which is why this class is made
class Toilet extends Item {
  constructor(name, image, description, x, y, width, height) {
    super(name, image, description, x, y, width, height);
  }
}

const toilet_item = new Toilet(
  'Toilet'
  , '../assets/toilet.png'
  , 'You already know what this does.'
  , 530, 240, 673 / 5, 1183 / 5,
);

// Variable to store the broken toilet p5.img
let broken_toilet_img;

// Crack class
class Crack extends Item {
  constructor(name, image, description, x, y, width, height) {
    super(name, image, description, x, y, width, height);
  }
}
const crack_1 = new Crack(
  'Crack'
  , '../assets/crack1.png'
  , 'You gotta fix it with something'
  , 530, 240, 673 / 5, 1183 / 5,
);
