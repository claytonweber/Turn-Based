var customLevel = home.background;
var collisionMap = false;
var rowCount = 0,
    rowCount2 = 0,
    rowCount3 = 0,
    rowCount4 = 0;

//console.log("CURRENTLY EDITING" + `${customLevel}`)


function levelEditor() {
  ctxS.clearRect(0, 0, canvas.width, canvas.height);
  
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
  
  for(var i = 0; i <= 11; i++) {
    customLevel[i].forEach(function(piss) {
      if(piss == 1) { 
        ctxBg.beginPath();
        ctxBg.rect(0 + (rowCount * tileSize) , 0 + (i * tileSize), tileSize, tileSize);
        ctxBg.fillStyle = "#00FF00";
        ctxBg.fill();
        ctxBg.closePath();
        }  
      if(piss == 2) { 
        ctxBg.beginPath();
        ctxBg.rect(0 + (rowCount * tileSize) , 0 + (i * tileSize), tileSize, tileSize);
        ctxBg.fillStyle = "green";
        ctxBg.fill();
        ctxBg.closePath();
        }  
      rowCount++;
  //        console.log(count)
      if(rowCount > 15) {
        rowCount = 0;
      }
    })
  }
}

document.addEventListener("mousedown", getPosition, false);



//this shit is for the "level editor"
//event is mouseDown position
function getPosition(event){
  if(gameState === 3) {
    var x = event.x;
    var y = event.y;


    x -= canvas.offsetLeft;
    y -= canvas.offsetTop;
    
    console.log("x:" + x + " y:" + y);
    if(x % 40 > 20) {
//      console.log("not divisible by 40");
    }
    var closestEdgeX = x - (x%40);
    var closestEdgeY = y - (y%40);
    
    var row = closestEdgeX/40;
    var col = closestEdgeY/40;
    
    
    if(collisionMap ==  true) {
      if(customLevel[col][row] == 0) {
        console.log("0 -> 1", col, row);
        customLevel[col][row] = 1;
      }   
    
      else if(customLevel[col][row] == 1) {
        console.log("1 -> 0", col, row);
        customLevel[col][row] = 0;
      } 
    }
    if(collisionMap == false) {
        if(customLevel[col][row] == 0) {
          console.log("0 -> 1", col, row);
          customLevel[col][row] = 1;
        }   
    
        else if(customLevel[col][row] == 1) {
          console.log("1 -> 0", col, row);
          customLevel[col][row] = 2;
        }

        else if(customLevel[col][row] == 2) {
          console.log("1 -> 0", col, row);
          customLevel[col][row] = 0;
        }
    }
  

    
    
   

    var customString = JSON.stringify(customLevel);
    var prettyCustomString = customString.replace(/,/g, "," + " ");
    var prettierCustomString = prettyCustomString.replace(/\[/g, '\n' + '\[');
    console.log(prettierCustomString);
   
    
//    collisionElements.push({x: x, y: y});
//    ctx.beginPath();
//    ctx.rect(closestEdgeX, closestEdgeY, tileSize, tileSize);
//    ctx.fillStyle = "black";
//    ctx.fill();
//    ctx.closePath(); 
    
    updateCustomLevel();
  }
}

function updateCustomLevel() {
  ctxBg.clearRect(0, 0, canvas.width, canvas.height);
  for(var i = 0; i <= 11; i++) {
    customLevel[i].forEach(function(piss) {
      if(piss == 1) { 
        ctxBg.beginPath(); 
        ctxBg.rect(0 + (rowCount * tileSize) , 0 + (i * tileSize), tileSize, tileSize);
        ctxBg.fillStyle = "#00FF00";
        ctxBg.fill();
        ctxBg.closePath();
        }  
      rowCount++;
      if(rowCount > 15) {
        rowCount = 0;
      }
      
      if(piss == 2) { 
        ctxBg.beginPath(); 
        ctxBg.rect(0 + (rowCount2 * tileSize) , 0 + (i * tileSize), tileSize, tileSize);
        ctxBg.fillStyle = "green";
        ctxBg.fill();
        ctxBg.closePath();
        }  
      rowCount2++;
      if(rowCount2 > 15) {
        rowCount2 = 0;
      }
//      if(piss == 0) {
//        ctxBg.beginPath();
//        ctxBg.rect(0 + (count2 * tileSize) , 0 + (i * tileSize), tileSize, tileSize);
//        ctxBg.fillStyle = "white";
//        ctxBg.fill();
//        ctxBg.closePath();
//      }
//      if(count2 > 15) {
//        count2 = 0;
//      }
    })
  }
}
