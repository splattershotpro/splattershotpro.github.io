class BG{
  constructor(){
  this.ratio= 1320/639 ;
  this.height=height;
  this.width=this.height*this.ratio;
    
  if(windowWidth>this.width){
  this.width=width;
  this.height=this.width/this.ratio;  
  }
  }
  show(){
    push();
    noSmooth();
    switch(whichbg){
      case 0:
      image(bgprv,0,0,this.width,this.height); 
      break;
      case 1:
         image(bgsummers,0,0,this.width,this.height);   
      break;
      case 2:
      image(bgonett,0,0,this.width,this.height);
      break;
    }
    
    pop();
  }
  resize(){
  this.height=height;
  this.width=this.height*this.ratio;  
    
  if(windowWidth>this.width){
  this.width=width;
  this.height=this.width/this.ratio;  
  }

  }
}