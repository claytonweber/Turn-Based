
var enemyCount;
var enemies = [];
var enemyMovementTimer = 50;

var spriteSheetWidth = 80;
var spriteSheetHeight = 40;

class Enemy {
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
    this.src = n.src,
    this.enemyWeight = n.enemyWeight
  }
  
  info() {
    type: "fatty"
  }
}

var blueSplat = {
  name: "blueSplat",
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
  src: 'blueSplat.png',
  enemyWeight: 1
} 

var redSplat = {
  name: "redSplat",
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
  src: redSplat,
  enemyWeight: 2
} 

var blueSplatImage = new Image();
    blueSplatImage.src = 'blueSplat.png';
var redSplatImage = new Image();
    redSplatImage.src = "redSplat.jpg";
