class NPC {
  constructor(n) {
    this.name = n.name;
    this.spriteSheetWidth = n.spriteSheetWidth,
    this.spriteSheetHeight = n.spriteSheetHeight,
    this.col = n.col,
    this.row = n.row,
    this.width = n.width;
    this.height = n.height;
    this.x = n.x;
    this.y = n.y;
    this.srcX = n.srcX,
    this.srcY = n.srcY,
    this.animationTimer = n.animationTimer,
    this.src = n.src
    
  }
  talk() {
    return "Greetings traveler";
  }
}

var skeeterInfo = {
  name: "skeeter",
  spriteSheetWidth: 80, //full width
  spriteSheetHeight: 40,  //full height
  col: 2,
  row: 1,
  width: spriteSheetWidth/2,
  height: spriteSheetHeight,
  currentFrame: 0,
  frameCount: 2,
  x: 80,
  y: 80,
  srcX: 0,
  srcY: 0,
  animationTimer: 0,
  src: dudeImage
} 


var dudeImage = new Image();
    dudeImage.src = "skeeter.png";  
var dude = new NPC(skeeterInfo);


var redBaddyImage = new Image();
var redBaddy = new NPC(skeeterInfo);
redBaddyImage.src = "redSplat.jpg";
redBaddy.y = 160;
redBaddy.name = "redBaddy"
redBaddy.src = redBaddyImage;
 