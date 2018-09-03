 var splash = document.getElementById("splash-layer");
var ctxS = splash.getContext("2d");
var gameState = 1;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

var splashScreen = function() {
  drawBackground();
  addButton();
}

function drawBackground() {
  ctxS.beginPath();
  ctxS.rect(0, 0, 640, 480);
  ctxS.fillStyle = "#FF0000";
  ctxS.fill();
  ctxS.closePath();
}

function addButton() {
  ctxS.font = "30px Arial";
  ctxS.fillStyle = "blue";
  ctxS.fillText("Start", splash.width/2 - 30, splash.height/2);
}

function update() {
  if(gameState == 1) {
    if(spacePressed) {
      gameState++;
      startGame();
      spacePressed = false;
    }
    
    if(enterPressed) {
      levelEditor();
//      console.log("enter pressed");
      gameState = 3;
    }
  }
} 

setInterval(update, 10);

splashScreen();
