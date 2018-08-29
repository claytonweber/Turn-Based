var spacePressed = false;
var leftPressed = false;
var rightPressed = false;
var upPressed = false;
var downPressed = false;
var enterPressed = false;



function keyDownHandler(e) {
    if(e.keyCode == 32) {
      spacePressed = true;
    }
    
    if(e.keyCode == 39) {
      rightPressed = true;
    }
    else if(e.keyCode == 37) {
      leftPressed = true;
    }
    
    if(e.keyCode == 38) {
      upPressed = true;
    }
    else if(e.keyCode == 40) {
      downPressed = true;
    }
  
    if(e.keyCode == 13) {
        enterPressed = true;
      }
  }
  
  function keyUpHandler(e) {
    if(e.keyCode == 32) {
      spacePressed = false;
    }
    
    if(e.keyCode == 39) {
      rightPressed = false;
    }
    else if(e.keyCode == 37) {
      leftPressed = false;
    }
    
    if(e.keyCode == 38) {
      upPressed = false;
    }
    else if(e.keyCode == 40) {
      downPressed = false;
    }
    
    if(e.keyCode == 13) {
      enterPressed = false;
    }
  }