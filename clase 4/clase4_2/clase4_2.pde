

PGraphics pg1;
PShader sh1;

void setup(){
   size(1200,800,P3D);
   
   pg1 = createGraphics(width,height,P3D);
   colorMode(HSB);
}

void draw(){
  
  pg1.beginDraw();
  pg1.colorMode(HSB);
  //pg1.background(0,255);
  pg1.pushMatrix();
  pg1.translate(width/2,height/2);
  pg1.rotate(millis()*0.00001);
  
  pg1.translate(-width/2,-height/2);
  pg1.image(pg1,0,0,width,height);
  pg1.popMatrix();
  
  pg1.fill(sin(millis()*0.1)*127+127,200,100);
  pg1.ellipse(mouseX,mouseY,20,20);
  pg1.endDraw();
  
  image(pg1,0,0,width,height);
}
