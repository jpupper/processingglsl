

PGraphics pgshader;
PGraphics pgdibujo;
PShader sh1;




void setup(){
   size(1200,800,P2D);
   
   sh1 = loadShader("shader.frag","sh.vert");
   sh1.set("resolution",width,height);
   pgshader = createGraphics(width,height,P2D);
   pgdibujo = createGraphics(width,height,P2D);
}

void draw(){
  generarDibujo();
   sh1.set("time",millis()*0.001);
   sh1.set("dibujo",pgdibujo);
  //sh2.set("time",millis()*0.001);
  //image(pgdibujo,0,0,width,height);
   pgshader.beginDraw();
   pgshader.shader(sh1);
   pgshader.rect(0,0,width,height);
   pgshader.endDraw();
   
   //image(pgdibujo,0,0,width,height);
   image(pgshader,0,0,width,height);
}
void generarDibujo(){
  int cnt = 25;
  pgdibujo.beginDraw();
  pgdibujo.beginShape();
  pgdibujo.noStroke();
  for(int i=0; i<cnt; i++){
    pgdibujo.fill(random(255),random(255));
    pgdibujo.vertex(random(width),random(height)); 
  }
  pgdibujo.endShape();
  pgdibujo.endDraw();
  
}

void keyPressed(){
 if(key == 'r'){
   sh1 = loadShader("shader.frag","sh.vert");
 }
  
}
