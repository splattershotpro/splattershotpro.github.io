function drawClueGrid(){
  colSw=false;
  rowSw=false;
  resetLoc();
  //column clue areas
  for(let x=0;x<sNum;x++){
  push();
  if (colSw == false){
      fill(240,240,240,230-wingraphictint);
    }else{
      fill(220,220,220,230-wingraphictint);
    }
  if (x==gLocX){
    fill(176, 255, 130,255-wingraphictint);
  }
  noStroke();
  rect(sx,sy-s*clueMax,s,s*clueMax);
  pop();  
  sx+=s;
  colSw=!colSw;
  }
  
  resetLoc();
  //row clue areas
  for(let x=0;x<sNum;x++){
  push();
  if (rowSw == false){
      fill(240,240,240,230-wingraphictint);
    }else{
      fill(220,220,220,230-wingraphictint);
  }
  if (x==gLocY){
    fill(176, 255, 130,255-wingraphictint);
  }
  noStroke();
  rect(sx-s*clueMax,sy,s*clueMax,s);
  pop();
  sy+=s;
  rowSw=!rowSw;
  }
}

function drawGridLines(){
resetLoc();
push();
strokeWeight(3);
stroke(100);
noFill();
square(sx,sy,s*sNum);

  if(sNum==10){
  line(initX+5*s,initY,initX+5*s,initY+s*sNum);
  line(initX,initY+5*s,initX+s*sNum,initY+5*s);
  }else if(sNum==15){
  line(initX+5*s,initY,initX+5*s,initY+s*sNum);
  line(initX+10*s,initY,initX+10*s,initY+s*sNum);
  line(initX,initY+5*s,initX+s*sNum,initY+5*s);
  line(initX,initY+10*s,initX+s*sNum,initY+10*s);
  }
  
pop();
}

function showClues(){

//columns
push();
    fill(0,0,0,255-wingraphictint);
    textAlign(CENTER);
    textSize(puzTextSize);
    textFont(ebfont);
for (let x=0;x<sNum;x++){
  for (let y=0;y<clueMax;y++){
    if(cluesCol[x][y]>0||y==clueMax-1){
    text(cluesCol[x][y],sx+s/2,sy-s*(clueMax-0.8));
    }
    sy+=s; 
  }
    sx+=s;
    sy=initY;
  }
 resetLoc();

//rows
for (let x=0;x<sNum;x++){
  for (let y=0;y<clueMax;y++){
    if(cluesRow[x][y]>0||y==clueMax-1){
    text(cluesRow[x][y],sx-s*(clueMax-0.5),sy+s*0.95);
    }
    sx+=s; 
  }
    sy+=s;
    sx=initX;
  }
 resetLoc();
 pop();
}

function fillIn(x){
     push();
    switch (x){
      case 0:
      sCanvas.fill(255);
      sCanvas.stroke(100);
      sCanvas.square(fillLoc[gLocY][gLocX].x,fillLoc[gLocY][gLocX].y,s);  
      break;
      case 1:
      sCanvas.fill(0);
      sCanvas.stroke(100);
      sCanvas.square(fillLoc[gLocY][gLocX].x,fillLoc[gLocY][gLocX].y,s);  
      break;
      case 2:
      sCanvas.image(xicon,fillLoc[gLocY][gLocX].x,fillLoc[gLocY][gLocX].y,s,s);  
      break;
    }
      pop();
}

function emptyFilled(){
resetLoc();
  for(let y=0;y<sNum;y++){
  for(let x=0;x<sNum;x++){
  sCanvas.stroke(100);
  sCanvas.fill(255);
  sCanvas.square(sx,sy,s);
  sx+=s;
  }
  sx=floor(width/2-margin);
  sy+=s;
  }  
}

function refill(){
for(let y=0;y<sNum;y++){  
   for(let x=0;x<sNum;x++){
     push();
    switch (fillTrue[x][y]){
      case 0:
      sCanvas.fill(255);
      sCanvas.stroke(100);
      sCanvas.square(fillLoc[x][y].x,fillLoc[x][y].y,s);
      break;
      case 1:
      sCanvas.fill(0);
      sCanvas.stroke(100);
      sCanvas.square(fillLoc[x][y].x,fillLoc[x][y].y,s);
      break;
    }
      pop();
     
    if(xTrue[x][y]==true){
    sCanvas.image(xicon,fillLoc[x][y].x,fillLoc[x][y].y,s,s);
      }
    }
  }  
}

function getPuzzleSize(){
  sNum=puzzleSizes[whichPuz];
  gLocMaxX=sNum-1;
  gLocMaxY=sNum-1;
  if(sNum==5){
  clueMax=3;
  }else if(sNum==10){
  clueMax=5;
  }else if(sNum==15){
  clueMax=8;
  }  
}

function squareLocs(){
 ix=initX-s;
 iy=initY;
  //Create array to hold locations for squares
   for(let i=0;i<sNum;i++){
    fillLoc[i]=[];
   for(let j=0;j<sNum;j++){
    if(ix<floor(initX+(gLocMaxX*s))){
      ix+=s;
    }else{
      ix=initX;
      iy+=s;
    }
    fillLoc[i][j]=createVector(ix,iy);
  } 
  } 
}

function puzzleSetup(){
  mode=2;
  startAnimOn=0;
  puzStartAnim.reset();
  puzIsStart=0;
  whichPuz=menuArr[gLocY][gLocX];
    wingraphictint=0;
    solvedimgshow=0;
    gLocX=0;
    gLocY=0;
    ansKey=[];
    cluesCol=[];
    cluesRow=[];
    getPuzzleSize();
    s=floor(puzS/sNum);
    ix=initX;
    iy=initY;
    whichbg=1;
    puzTextSize=floor(s+6);
    sCanvas.clear();
    emptyFilled();
    menuMusic.stop();
    summersMusic.loop();

  for (let x=0; x<sNum; x++) {
    fillTrue[x] = [];
    for (let y=0; y<sNum; y++) {
    fillTrue[x][y]=0;
    }
  }
  
  for (let x=0; x<sNum; x++) {
    xTrue[x] = [];
    for (let y=0; y<sNum; y++) {
    xTrue[x][y]=0;
    }
  }
    s=floor(puzS/sNum);
    squareLocs();
    getAns();
    getClues(0);
    getClues(1);
    bg.show();
    drawClueGrid();
}

function coverXs(){
  push();
  sCanvas.fill(255,255,255,wingraphictint);
  sCanvas.stroke(100);
  for(let y=0;y<sNum;y++){
  for(let x=0;x<sNum;x++){
    if(ansKey[y][x]==0){
    sCanvas.square(fillLoc[x][y].x,fillLoc[x][y].y,s);
    }
  }    
  }
  pop();
}