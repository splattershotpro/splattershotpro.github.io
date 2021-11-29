let mode=0;
let cooldown=1;
let s, sNum, puzS, sx, sy;
let margin;
let gLocMaxX,gLocMaxY;
let clueMax;
let puzzleSizes = [];
let whichPuz;
let colSw, rowSw;
let puzzleSolved=false;
let cursor;
let summersMusic, menuMusic, winSound, winMusic;
let frames=0;
let mframes=20;
let gLocX=0;
let gLocY=0;
let move1=1;
let fillTrue=[];
let xTrue=[];
let xicon, ebfont, bgsummers,bgonett, bgprv,puzUnsolved,logo, wingraphic,emptybox,instructions;
let instructionsOn=0
let wingraphictint=0;
let ix, iy;
let initX, initY;
let ctype=0;
let fillLoc=[];
let ansKey=[];
let clueNum=0;
let cluesCol=[];
let cluesRow=[];
let clue=[];
let bg;
let pts;
let whichbg=2;
let isSolved=[];
let puzTextSize;
let sCanvas;
let arrowcooldown=1;
let puzStart, puzStartAnim, startAnimOn;
let puzIsStart=0;
let backtomenu=0;
let solvedimgshow=0;
let cursorSound, cursorSound2;

//puzzle solution images and names
let puzImgs=[];
let puzNames=[];

//for puzzle menu
let pthumb;
let thumbX,thumbY;
let menuArr;

function preload(){
  xicon = loadImage ('assets/xIcon.png');
  ebfont = loadFont ('assets/EBMain.ttf');
  bgsummers = loadImage ('assets/summersBG.png');
  bgprv = loadImage ('assets/prvBG.png');
  bgonett = loadImage ('assets/onettBG.png');
  puzUnsolved = loadImage ('assets/puzUnsolved.png');
  summersMusic = loadSound('assets/summers.mp3');
  menuMusic = loadSound('assets/menu.mp3');
  winSound = loadSound('assets/win.wav');
  winMusic = loadSound('assets/win2.wav');
  puzStart = loadSound('assets/puzstart.wav');
  puzStartAnim = loadImage('assets/swirl.gif');
  logo = loadImage('assets/logo.png');
  wingraphic = loadImage('assets/youWon.png');
  emptybox = loadImage('assets/emptybox.png');
  instructions = loadImage('assets/instructions.png');
  
  cursorSound = createAudio('assets/cursor.wav');
  cursorSound2 = createAudio('assets/cursor2.wav');
  
  for(let x=0;x<10;x++){
    puzImgs[x]= loadImage ('assets/puzImgs/pImg'+x+'.png');
  }
  
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  sCanvas=createGraphics(windowWidth, windowHeight);
  sCanvas.clear();
  if(width>height){
    puzS=floor(height/1.95);
    pthumb=floor(height/7);
  }else{
    puzS=floor(width/1.95); 
    pthumb=floor(width/7);
  }
  margin=floor(height/20);
  initX=floor(width/2-margin);
  initY=floor(height/2-margin);
  puzzleSizes = [5,5,10,10,10,15,15,15,15,15];
  cursor = new Cursor();
  bg = new BG();
  ix=initX;
  iy=initY;
  menuArr=[[0,1,2,3,4],[5,6,7,8,9]];
  isSolved=[0,0,0,0,0,0,0,0,0,0];
  puzNames=['Buzz Buzz',
            'Ness (Lost Underworld)',
            'Venus',
            'Phone',
            'Bubble Monkey',
            'Everdred',
            'Flower',
            'Present',
            'Biker Punk',
            'Evil Mushroom'
           ];
  
}

function draw() {
  
  switch (mode) {
    case 0:
      //Title screen
      bg.show();
      titleScreen();
      textAlign(CENTER);
      textFont(ebfont);
      if(width>height){
      textSize(height/14);  
      }else{
      textSize(width/14);  
      }
      text("press Z to start",width/2,height/2);
      keysTitle();
      break;
    case 1:
      //Puzzle menu
      bg.show();
      puzzleMenu();
      keysPuzMenu();
      cursor.show();
      if(instructionsOn==1){
      push();
      imageMode(CENTER);
      noSmooth();
     if(width>height){
     image(instructions,width/2,height/2,height*0.8,height*0.8); 
     }else{
      image(instructions,width/2,height/2,width*0.8,width*0.8); 
     }
      pop();
      }else if(puzIsStart==0){
      push();
      noSmooth();
      fill(255);
      textAlign(CENTER,CENTER);
      textFont(ebfont);
      textSize(pthumb/3);
      text("Press C for instructions",pthumb*1.2,height/14);
      pop();
      keys();  
      }
      switch(startAnimOn){
        case 1:
          push();
          noSmooth();
          image(puzStartAnim,0,0,width,height);
          pop();
          break;
      }
      break;
    case 2:
      //In puzzle
      keys();
      fillKeys();
      cursor.show();
      break;
    case 3:
      //Pause menu
      bg.show();
      cursor.show();
      push();
      noSmooth();
      imageMode(CENTER);
      textAlign(CENTER,CENTER);
      fill(255);
      textSize(puzS/7);
      textFont(ebfont);
      image(emptybox,width/2,height/2,puzS*1.5,puzS*1.5/(192/48));
      text("X to unpause, Z to go to menu",width/2,height/2);
      pop();
      keysPaused();
      break;
    case 4:
      //Puzzle solved
      bg.show();
      image(sCanvas,0,0);
      drawGridLines();
      pts=0;
      resetLoc();
      switch (solvedimgshow){
        case 0:
        puzSolvedAnim();
        break;
        case 1:
        push();
        noSmooth();
        imageMode(CENTER);
        image(wingraphic,width/2,height/4,puzS*1.5,puzS*1.5/(192/48));
          pop();
        puzSolvedAnim2();
      }
      switch (backtomenu){
        case 1:
        keysPuzSolved();
        break;
      }
      break;
  }
  
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
  sCanvas.clear();
  if(width>height){
  puzS=floor(height/1.95); 
  pthumb=floor(height/7);
  }else{
  puzS=floor(width/1.95);
  pthumb=floor(width/7.5);
  }
  bg.resize();
  s=floor(puzS/sNum);
  margin=floor(height/20);
  initX=floor(width/2-margin);
  initY=floor(height/2-margin);
  squareLocs();
  puzTextSize=floor(s+6);
  if(mode==2||mode==3||mode==4){
  bg.show();
  drawClueGrid();
  refill();
  if(mode==4){
  coverXs();  
  }
  image(sCanvas,0,0);
  resetLoc();
  showClues();
  drawGridLines();  
  }
}

function resetLoc(){
 sx=initX;
 sy=initY;
 thumbX=width/2-pthumb*3.5;
 thumbY=height/1.5;
}

function titleScreen(){
push();
imageMode(CENTER);
image(logo,width/2,height/4,height/4*(700/270),height/4);
pop();
}

function puzzleMenu(){
  resetLoc();
  for(let y=0;y<2;y++){
  for(let x=0;x<5;x++){
  if(isSolved[menuArr[y][x]]==0){
    push();
    noSmooth();
    image (puzUnsolved,thumbX,thumbY,pthumb,pthumb);
    pop();
  }else{
    push();
    noSmooth();
    image (puzImgs[menuArr[y][x]],thumbX,thumbY,pthumb,pthumb);
    pop();
    
  }
  thumbX+=pthumb*1.5;
  
  }
  thumbX=width/2-pthumb*3.5;
  thumbY+=pthumb*1.2;
  }
  resetLoc();
  
  push();
  noSmooth();
  fill(255);
  textSize(pthumb);
  textAlign(CENTER,BOTTOM);
  if(isSolved[menuArr[gLocY][gLocX]]==0){
    
    image (puzUnsolved,width/2-pthumb*1.5,height/12,pthumb*3,pthumb*3);
    text("Puzzle "+(menuArr[gLocY][gLocX]+1)+" - "+"???"+" - "+puzzleSizes[menuArr[gLocY][gLocX]]+"x"+puzzleSizes[menuArr[gLocY][gLocX]],width/2,height/2+pthumb); 
    
  }else{
    
    image (puzImgs[menuArr[gLocY][gLocX]],width/2-pthumb*1.5,height/12,pthumb*3,pthumb*3);
    text("Puzzle "+(menuArr[gLocY][gLocX]+1)+" - "+puzNames[menuArr[gLocY][gLocX]]+" - "+puzzleSizes[menuArr[gLocY][gLocX]]+"x"+puzzleSizes[menuArr[gLocY][gLocX]],width/2,height/2+pthumb); 
    
  }
 
  pop();
}

function puzSolvedAnim(){
push();
if (wingraphictint<255){
  wingraphictint+=5;
}
  drawClueGrid();
  resetLoc();
  showClues();
  resetLoc();
  coverXs();
  tint(255,wingraphictint);
  noSmooth();
  imageMode(CENTER);
image(wingraphic,width/2,height/4,puzS*1.5,(puzS*1.5)/(192/48));

pop();
}

function puzSolvedAnim2(){
push();
  if (wingraphictint<255){
  wingraphictint+=5;
  tint(255,wingraphictint);
}
  noSmooth();
  imageMode(CENTER);
  textAlign(CENTER,CENTER);
  fill(255,255,255,wingraphictint);
  textSize(puzS/5);
  textFont(ebfont);
  image(emptybox,width/2,height/4,puzS*1.5,puzS*1.5/(192/48));
  text(puzNames[whichPuz],width/2,height/4);
  imageMode(CORNER);
  image(puzImgs[whichPuz],initX,initY,s*sNum,s*sNum);
pop();
}