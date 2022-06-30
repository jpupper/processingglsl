

PGraphics pg1;
PShader sh1;


PGraphics pg2;
PShader sh2;

void setup(){
   size(1200,800,P3D);
   
   sh1 = loadShader("shader.frag","sh.vert");
   sh1.set("resolution",width,height);
   pg1 = createGraphics(width,height,P3D);
   
   sh2 = loadShader("shader2.frag","sh.vert");
   sh2.set("resolution",width,height);
   
   pg2 = createGraphics(width,height,P3D);
   colorMode(HSB);
}

void draw(){
  background(255,0,0);
  
  sh1.set("time",millis()*0.001);
  sh2.set("time",millis()*0.001);
  
  pg1.beginDraw();
  //pg1.background(0);
  pg1.shader(sh1); 
  pg1.rect(0,0,width,height);
  pg1.endDraw();
  
  pg2.beginDraw();
  //pg2.background(0);
  pg2.shader(sh2); 
  pg2.rect(0,0,width,height);
  pg2.endDraw();
  
 // image(pg1,0,0,width,height);
  //image(pg2,0,0,width,height);
  
 
}
