
// Hub
let Hammer = new Item("Hammer", "../assets/hammer.png"
, "It hammers things."
, 87, 183, 50, 50);

let Duct_Tape = new Item("Duct Tape"
, "../assets/duct_tape.png", "It tapes things."
, 216, 156, 50, 50);

let Keypad = new Item("Keypad", "../assets/keypad.png"
, "You can press numbers on it."
, 378, 158, 50, 50);

// Room1
let Screw = new Item("Screw", "../assets/screw.png"
 ,"This combined with a screwdriver can secure things.",
 88, 312, 50,50
 )

 let Screwdriver = new Item("Screwdriver", "../assets/screwdriver.png"
 ,"This combined with a screw can secure things.",
 256, 257
 , 50,50
 )

 class Toilet extends Item {
     constructor(name, image, description, x, y, width, height) {
         super(name, image, description, x, y, width, height)
     }
 }

 let toilet_item = new Toilet("Toilet", "../assets/toilet.png"
 ,"You already know what this does.",
 530, 240, 673/5, 1183/5)

 let broken_toilet_img