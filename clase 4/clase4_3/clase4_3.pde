

PGraphics pg1;
PShader sh1;

void setup(){
   size(1200,800,P3D);
   
   sh1 = loadShader("shader.frag","sh.vert");
   sh1.set("resolution",width,height);
   
   pg1 = createGraphics(width,height,P3D);
   colorMode(HSB);
}

void draw(){
  
  pg1.beginDraw();
  pg1.shader(sh1); 
  pg1.rect(0,0,width,height);
  pg1.endDraw();
  image(pg1,0,0,width,height);
  
  fill(255,0,200);
  ellipse(mouseX,mouseY,50,50); 
}
