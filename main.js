var canvas = document.getElementById("play-layer");
var ctx = canvas.getContext("2d");

var canvasCollision = document.getElementById("collision-layer");
var ctxCollision = canvasCollision.getContext("2d");

var canvasBg = document.getElementById("bg-layer");
var ctxBg = canvasBg.getContext("2d");

var canvasUI = document.getElementById("ui-layer");
var ctxUI = canvasUI.getContext("2d");

var canvasCollect = document.getElementById("collect-layer");
var ctxCol = canvasCollect.getContext("2d");

var canvasHUD = document.getElementById("hud-layer");
var ctxHUD = canvasHUD.getContext("2d");

var tileSize = 40;
var columns = 16;
var rows = 12;

var currentLevel = level.indexOf(home);

var invulTimer = 75;
var player = {
  playerX: 200,
  playerY: 200,
  health: 5
}

var backgroundColors = {
  dirtPath : "tan"
}
 
var bomb = {
  width: 20,
  height: 20,
  x: canvas.width - 20, 
  y: 120
}

var doorway = {
  width: 20,
  height: 40,
  x: canvas.width - 520,
  y: 40 
}

// trista wants to be a slinky boy from monster's inc but a ferret weilding a sword
// mike 
// collin
// zach

var baddy = new Image();
baddy.src = "baddy.png";
var baddyCount;
var baddies = [];
var baddyMovementTimer = 50;

var skeeter = new Image();
skeeter.src = "skeeter.png";
var spriteSheetWidth = 80;
var spriteSheetHeight = 40;
var skeeterInfo = {
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
  animationTimer: 0
}

var pw = 40; //player width
var ph = 40; //player height
var playerSpeed = 40;
var speedThrottle = 500;
//var currentTile = level[currentLevel].background[0, 0];

var collisionElements = [];

var facing = "down";

var count = 0;
var count2 = 0;

var rightTouch = false;
var leftTouch = false;
var topTouch = false;
var bottomTouch = false;

function startGame() {
  ctxS.clearRect(0, 0, splash.width, splash.height);
  drawLevel();
  drawPlayer();
  drawBaddies();
  drawNPC();
  setInterval(loop, 30);

}
 
function drawLevel() {
  //this just draws the background
  for(var i = 0; i <= 11; i++) {
      level[currentLevel].background[i].forEach(function(piss) {
        if(piss == 0) {
          ctxBg.beginPath();
          ctxBg.rect(0 + (count * tileSize) , 0 + (i * tileSize), tileSize, tileSize);
          ctxBg.fillStyle = backgroundColors.dirtPath;
          ctxBg.fill();
          ctxBg.closePath();
          }  
        if(piss == 1) {
          ctxBg.beginPath();
          ctxBg.rect(0 + (count * tileSize) , 0 + (i * tileSize), tileSize, tileSize);
          ctxBg.fillStyle = "#00FF00";
          ctxBg.fill();
          ctxBg.closePath();
          }
        if(piss == 2) {
          ctxBg.beginPath();
          ctxBg.rect(0 + (count * tileSize) , 0 + (i * tileSize), tileSize, tileSize);
          ctxBg.fillStyle = "green";
          ctxBg.fill();
          ctxBg.closePath();
        }
        count++;
        if(count > 15) {
          count = 0;
        }
      })
  }
  
  // COLLISION SHIT 
  for(var j = 0; j <= 11; j++) {
    var shitCount = 0;
//    console.log(j)
    level[currentLevel].collision[j].forEach(function(shit) {
//    console.log(j , shit);
    
    if(shit === 1) {
      ctxCollision.beginPath();
      ctxCollision.rect(0 + (count2 * tileSize) , 0 + (j * tileSize), tileSize, tileSize);
      ctxCollision.fillStyle = "green";
      ctxCollision.fill();
      ctxCollision.closePath();

      //every time shit == 4, create an object with those values,
      //an empty array will be created for colmns that dont have collision elements??
      var x = (0 + (count2 * tileSize));
      var y = 0 + (j * tileSize); 

//      collisionElements[j][`${shitCount}`] = {x: x, y: y};
      collisionElements.push({x: x, y: y});
      shitCount++;

    }  
    //columns
    count2++;
    if(count2 > 15) {
      count2 = 0;
    }
    })
  }

  //GRID SYSTEM
  for(i=0; i <= columns; i += 1) {
    ctxUI.beginPath();
    ctxUI.moveTo(i * ph, 0);
    ctxUI.lineTo(i * ph, canvas.height);
    ctxUI.strokeStyle = "black";
    ctxUI.stroke();
  }
   
  for(i=0; i <= rows; i += 1) {
    ctxUI.beginPath();
    ctxUI.moveTo(0, i * pw);
    ctxUI.lineTo(canvas.width, i * pw);
    ctxUI.strokeStyle = "black";
    ctxUI.stroke();
  } 
  
  //HUD
  ctxHUD.font = "20px Arial";
  ctxHUD.fillStyle = "red";
  ctxHUD.fillText("Health" +  ' ' + player.health, 5, canvas.height -12); 
  
  //collectibles 
  ctxCol.beginPath();
  ctxCol.rect(bomb.x, bomb.y, bomb.width, bomb.height);
  ctxCol.fillStyle = "pink";
  ctxCol.fill();
  ctxCol.closePath();
  
  ctxCol.beginPath();
  ctxCol.rect(doorway.x, doorway.y, doorway.width, doorway.height);
  ctxCol.fillStyle = "brown";
  ctxCol.fill();
  ctxCol.closePath();

  checkCollision();
}

function updateLevel() {
  // COLLISION SHIT 
  for(i = 0; i < collisionElements.length; i ++) {
    ctxCollision.beginPath();
    //I only did it like this bc idk how to make it not add empty objects in the draw level create collision thing
    if(collisionElements[i] != undefined) {
      ctxCollision.rect(collisionElements[i].x, collisionElements[i].y, tileSize, tileSize);
    }
    ctxCollision.fillStyle = "red";
    ctxCollision.fill();
    ctxCollision.closePath();
  }
  
  for(e = 0; e < baddies.length; e++) {
    ctx.drawImage(baddy, baddies[e].x, baddies[e].y);
  } 
//  console.log(collisionElements)
}
 
function drawPlayer() {
  ctx.beginPath();
  ctx.rect(player.playerX, player.playerY, pw, ph);
  ctx.fillStyle = "#000000";
  ctx.fill();
  ctx.closePath();
}

function drawBaddies() {
//  ctx.drawImage(baddy, 120, 80); 
  console.log("drawing baddies");
  for(i=0; i < level[currentLevel]["maxBaddyCount"]; i++) {
    var rx =  Math.floor(Math.random() * 16) * 40;
    var ry =  Math.floor(Math.random() * 12) * 40;
       console.log(rx, ry);
    
    ctx.drawImage(baddy, rx, ry);
    baddies[i] = {x: rx, y: ry};
    console.log(baddies[i]);
    
  }
}

function baddyAI() {
  var distanceFromBaddy = 200;
  
  //if player x is larger than baddy, increase baddy x.
  //if player x - baddy x > player y - baddy y. move X. else move y.
  baddies.forEach(function(m) {
    //if player x is within a certain distance
    if(player.playerX + distanceFromBaddy >= m.x) {
      //if player y is within a certain distance
      if(player.playerY + distanceFromBaddy >= m.y) {
        if(m.x > player.playerX) {
          m.x -= 40;
        } else if(m.x < player.playerX) {
          m.x += 40;
        } 
        
//      console.log(m);
      }
      
    }
 
  })
  baddyMovementTimer = 0;
//  console.log(player.playerX + distanceFromBaddy);
  
}

function drawNPC() {
  ctx.drawImage(skeeter, 0, 0, 40, 40, 40, 40, 40, 40);
}

function loop() {
  //every frame the standard canvas is cleared so that it can be updated 
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPlayer();
//  drawBaddies();
  updateLevel();
  
  timers();
  animate();
  baddyCollision();
  if(baddyMovementTimer > 100) {baddyAI(); }
  if(player.playerX === collisionElements.x && player.playerY === collisionElements.y) {
    console.log("touch touch");
  }
  if(speedThrottle >= 5) {
    if(leftPressed) checkCollision();
    if(rightPressed) checkCollision();
    if(upPressed) checkCollision();
    if(downPressed) checkCollision();
  }
  
//  console.log(baddyMovementTimer);
  if(spacePressed) fire();
  
  
  /////this is needed for the "level editor/////
//  document.addEventListener("mousedown", getPosition, false);
}

function animate() {
  
  updateFrame();
  ctx.drawImage(skeeter, skeeterInfo.srcX, skeeterInfo.srcY, skeeterInfo.width, skeeterInfo.height, skeeterInfo.x, skeeterInfo.y, skeeterInfo.width, skeeterInfo.height);
}
function updateFrame() {
  if(skeeterInfo.animationTimer > 30) { 
    skeeterInfo.currentFrame = ++skeeterInfo.currentFrame % skeeterInfo.frameCount;
    skeeterInfo.animationTimer = 0;
  }
  skeeterInfo.srcX = skeeterInfo.currentFrame * skeeterInfo.width;
}
function timers() {
  speedThrottle++;
  baddyMovementTimer++;
  invulTimer++;
  skeeterInfo.animationTimer++;
}

function playerMovement() {
  
  if(leftPressed && !leftTouch) {
    if(!upPressed && !downPressed) {
      if(player.playerX >= pw) {
        player.playerX -= playerSpeed;
        facing = "left";
        speedThrottle = 0;
      }
    }
  }
  if(rightPressed && !rightTouch) {
    if(!upPressed && !downPressed) {
      if(player.playerX < canvas.width - pw) {
        player.playerX += playerSpeed;
        facing = "right";
        speedThrottle = 0;
      }
    }
  }

  if(upPressed && !topTouch) {
    if(!leftPressed && !rightPressed) {
      if(player.playerY >= ph) {
        player.playerY -= playerSpeed;
        facing = "up";  
        speedThrottle = 0;
      }
    }
  }
  if(downPressed && !bottomTouch) {
    if(!leftPressed && !rightPressed) {
      if(player.playerY < canvas.height - ph) {
        player.playerY += playerSpeed;
        facing = "down";
        speedThrottle = 0;
      }
    }
  }
}

function baddyCollision() {
  baddies.forEach(function(e) {
//      console.log(e["x"]);
      
      if(player.playerX === e["x"]) {
        if(player.playerY === e["y"]) {
          console.log("touching!");
          updateHUD();
        }
      }
    })
}

function updateHUD() {
    //HUD
  if(invulTimer > 100) {
    player.health--;
    ctxHUD.clearRect(0, 0, canvas.width, canvas.height);
    ctxHUD.font = "20px Arial";
    ctxHUD.fillStyle = "red";
    ctxHUD.fillText("Health" +  ' ' + player.health, 5, canvas.height-12); 
    invulTimer = 0;
  }
}

function checkCollision() {
  var sameX = false;
  var sameY = false;
  rightTouch = false;
  leftTouch = false;
  topTouch = false;
  bottomTouch = false;
  
  
  for(i=0; i<collisionElements.length; i++) {
    
    //if the object isn't an empty array
    if(collisionElements[i] != undefined) {
      //if player.y is equal to collision.y
      if(player.playerY === collisionElements[i].y) {
        sameY = true;
      } else {
        sameY = false;
      } 
      
      
      if(player.playerX === collisionElements[i].x) {
        sameX = true;
      } else {
        sameX = false;
      } 
      
      if(player.playerX === collisionElements[i].x - tileSize && sameY) {
        rightTouch = true;
      } 
      if(player.playerX === collisionElements[i].x + tileSize && sameY) {
        leftTouch = true;
      } 
      
      if(player.playerY === collisionElements[i].y - tileSize && sameX) {
        bottomTouch = true;
      } 
      if(player.playerY === collisionElements[i].y + tileSize && sameX) {
        topTouch = true;
      } 
      
    } 
  }
  playerMovement();
}

function boom() {
  if(player.playerX + 20 === bomb.x) {
    if(player.playerY === bomb.y) {
      console.log("have bomb");
      baddies.forEach(function(e) {
        baddies.pop(e);
      });
      
      
    }
  } 
} 

function levelNav() {
  if(player.playerX === doorway.x) {
    if(player.playerY === doorway.y) {
//      console.log("have bomb");
      baddies.forEach(function(e) {
//        baddies.pop(e);
        console.log(baddies);
      });
      collisionElements.forEach(function(e) {
        collisionElements.pop(e);
      });
      currentLevel = level.indexOf(peach);
      console.log(level[currentLevel]["name"]);
      player.playerX = 0;
      drawLevel();
      drawBaddies();
    }
  } 
}

function fire() {
  if(spacePressed) {
    ctx.beginPath();
    ctx.moveTo(player.playerX + 20, player.playerY + 20);
    if(facing == "right") ctx.lineTo(player.playerX + 100, player.playerY + 20);
    if(facing == "left") ctx.lineTo(player.playerX - 60, player.playerY + 20);
    if(facing == "down") ctx.lineTo(player.playerX + pw/2, player.playerY + 100);
    if(facing == "up") ctx.lineTo(player.playerX + pw/2, player.playerY - 60);
    
    ctx.strokeStyle = "red";
    ctx.stroke();
    
    //using this shit for debug
//    console.log(invulTimer);
//    console.log(player);
    boom();
    levelNav();
  }
}




