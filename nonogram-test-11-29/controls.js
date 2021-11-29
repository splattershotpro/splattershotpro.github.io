function keys(){
  switch(arrowcooldown){
    case 0:
      
      break;
    case 1:
  if (keyIsDown(UP_ARROW)){
    if (frames==0){
    if(gLocY==0){
    gLocY=gLocMaxY;
    }else{
    gLocY--;
    }
    frames++;
    }else if ((frames<=5 && move1==0)||(frames<=mframes && move1==1)){
      frames++;
    }else if ((frames>5 && move1==0) ||(frames>mframes && move1==1)){
     frames=0;
     move1=0;
    }
    
  }else if(keyIsDown(DOWN_ARROW)){
    if (frames==0){
    if(gLocY==gLocMaxY){
    gLocY=0;
    }else{
    gLocY++;
    }
    frames++;
    }else if ((frames<=5 && move1==0)||(frames<=mframes && move1==1)){
      frames++;
    }else if ((frames>5 && move1==0) ||(frames>mframes && move1==1)){
     frames=0;
     move1=0;
    } 
      
    
  }else if(keyIsDown(RIGHT_ARROW)){
    if (frames==0){
    if(gLocX==gLocMaxX){
    gLocX=0;
    }else{
    gLocX++;
    }
    frames++;
    }else if ((frames<=5 && move1==0)||(frames<=mframes && move1==1)){
      frames++;
    }else if ((frames>5 && move1==0) ||(frames>mframes && move1==1)){
     frames=0;
     move1=0;
    } 
    
  }else if(keyIsDown(LEFT_ARROW)){
    if (frames==0){
    if(gLocX==0){
    gLocX=gLocMaxX;
    }else{
    gLocX--;
    }
    frames++;
    }else if ((frames<=5 && move1==0)||(frames<=mframes && move1==1)){
      frames++;
    }else if ((frames>5 && move1==0) ||(frames>mframes && move1==1)){
     frames=0;
     move1=0;
    }
  }
      
  if(keyIsPressed && (keyCode ===UP_ARROW || keyCode ===DOWN_ARROW || keyCode===RIGHT_ARROW || keyCode ===LEFT_ARROW)){
      if(cursor.oldy!=cursor.y || cursor.oldx!=cursor.x){
        if(keyIsDown(88)||keyIsDown(90)){
        cursorSound2.play(); 
        }else{
        cursorSound.play();
        }
      }
    }
      
      break;
  }
}

function fillKeys(){
  switch(cooldown) {
    case 0:

      break;
    case 1:
  if(keyIsDown(90)){
  if(fillTrue[gLocY][gLocX]==0 && xTrue[gLocY][gLocX]==0 &&(ctype==0 || ctype==1)){
     fillTrue[gLocY][gLocX]=1;
     ctype=1;
     fillIn(1);
  }else if(fillTrue[gLocY][gLocX]==1 &&(ctype==0 || ctype==2)){
   fillTrue[gLocY][gLocX]=0;
   ctype=2;
   fillIn(0);
  }else if(xTrue[gLocY][gLocX]==1 &&(ctype==0 || ctype==3)){
    xTrue[gLocY][gLocX]=0;
    ctype=3;
    fillIn(0);
  }
   checkAns();
      bg.show();
      drawClueGrid();
      image(sCanvas,0,0);
      resetLoc();
      showClues();
      drawGridLines();
  }else if(keyIsDown(88)){
   if(fillTrue[gLocY][gLocX]==0 && xTrue[gLocY][gLocX]==0 &&(ctype==0 || ctype==1)){
     xTrue[gLocY][gLocX]=1;
     ctype=1;
     fillIn(2);
  }else if(fillTrue[gLocY][gLocX]==1 &&(ctype==0 || ctype==2)){
   fillTrue[gLocY][gLocX]=0;
   ctype=2;
   fillIn(0);
  }else if(xTrue[gLocY][gLocX]==1 &&(ctype==0 || ctype==3)){
    xTrue[gLocY][gLocX]=0;
    ctype=3;
    fillIn(0);
  }
  checkAns();
      bg.show();
      drawClueGrid();
      //fillIn();
      image(sCanvas,0,0);
      resetLoc();
      showClues();
      drawGridLines();
  }
 break; 
}
}

function keyReleased(){
    
  if (keyCode === UP_ARROW || keyCode === DOWN_ARROW || keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW){
    arrowcooldown=0;
    setTimeout(arrowCooldownReset,40);
    frames=0;
    move1=1;
  }
  if (keyCode === 90 || keyCode === 88){
    for (let x=0; x<10; x++) {
    for (let y=0; y<10; y++) {
    ctype=0;
    cooldown=1;
    }
  }  
  }
  if (keyCode === 67){
   cooldown=1;
  if (mode==2){
    mode=3; 
  }
  }
}

function keysPaused(){
  if (keyCode === 88){
    mode=2;
    bg.show();
    drawClueGrid();
    image(sCanvas,0,0);
    resetLoc();
    showClues();
    drawGridLines(); 
    cooldown=0;
  }
  if (keyCode === 90){
    mode=1;
    cooldown=0;
    gLocX=0;
    gLocY=0;
    gLocMaxX=4;
    gLocMaxY=1;
    whichbg=0;
    summersMusic.stop();
    menuMusic.loop();
  }
}

function keysTitle(){
   if (keyCode === 90){
    mode=1;
    cooldown=0;
    gLocMaxX=4;
    gLocMaxY=1;
    whichbg=0;
    menuMusic.loop();
  }
}

function keysPuzMenu(){
  switch(cooldown) {
    case 0:
      
      break;
    case 1:
  if (keyIsDown(90) && puzIsStart==0 && instructionsOn==0){
    menuMusic.stop();
    puzStart.play();
    startAnimOn=1;
    puzStartAnim.play();
    cooldown=0;
    puzIsStart=1;
    setTimeout(puzzleSetup,3700);
  }
 if (keyIsDown(67) && puzIsStart==0){
   cooldown=0;
   if(instructionsOn==0){
   instructionsOn=1;
   }else{
   instructionsOn=0;
   }
 }
   break;
}
}

function keysPuzSolved(){
switch(cooldown) {
    case 0:
      
      break;
    case 1:
if (keyIsDown(90)){
    mode=1;
    cooldown=0;
    gLocX=0;
    gLocY=0;
    gLocMaxX=4;
    gLocMaxY=1;
    whichbg=0;
    winMusic.stop();
    menuMusic.loop();
 }
    break;
}
}

function arrowCooldownReset(){
  arrowcooldown=1;
}