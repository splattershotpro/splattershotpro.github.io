class Cursor{
  
  constructor(){
  this.x=sx;
  this.y=sy;
  this.oldx=this.x;
  this.oldy=this.y;
  }
  
  show(){
  switch (mode){
    case 1:
      this.oldx=this.x;
      this.oldy=this.y;
      this.setPos(gLocX,gLocY);
      push();
      noFill();
      stroke(145, 255, 0);
      strokeWeight(4);
      square(this.x,this.y,pthumb);
      pop();
      break;
    case 2:
      this.oldx=this.x;
      this.oldy=this.y;
      this.setPos(gLocX,gLocY);
      if(this.oldx!=this.x || this.oldy!=this.y){
      bg.show();
      drawClueGrid();
      image(sCanvas,0,0);
      resetLoc();
      showClues();
      drawGridLines();  
      }
      push();
      noFill();
      stroke(145, 255, 0);
      strokeWeight(4);
      square(this.x,this.y,s);
      pop();
      break;
  }
  
  }
  
  setPos(x,y){
    switch (mode){
      case 1:
        this.x=thumbX+(x*pthumb*1.5);
        this.y=thumbY+(y*pthumb*1.2);
        break;
        case 2:
        this.x=sx+(x*s);
        this.y=sy+(y*s);
        break;
    }
  }
  
}