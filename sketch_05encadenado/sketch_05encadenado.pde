PShader sh1; //Defino el objeto del shader.
PShader sh2; //Defino el objeto del shader.
PGraphics buffer1;
PGraphics buffer2;
PImage img1;

int bufferactivo = 0;
void setup() {

  size(800, 450, P2D);

  buffer1 = createGraphics(width, height, P3D); //Creamos el primer buffer de video
  buffer2 = createGraphics(width, height, P3D); //Creamos el segundo buffer de video
  
  //dibujarFondoEnelbuffer();
  sh1 = loadShader("sh1.frag", "sh.vert");
  sh2 = loadShader("sh2.frag", "sh.vert");
}


void draw() {
  // background(0, 255, 0);

  //SETEO LAS VARIABLES UNIFORMS.
  //las variables uniform son variables a las que yo puedo definirle el valor por fuera del shader y utilizar ese valor dentro del shader.
  sh1.set("time", (float)millis() / 1000); //Paso una variable de tiempo que constantemente aumente su valor para poder animar el shader.
  sh1.set("resolution", (float)width, (float)height);//Paso la resolucion para utilizarla.
  buffer1.beginDraw();
  buffer1.shader(sh1);
  buffer1.rect(0, 0, width, height);
  buffer1.endDraw();
  // image(buffer1,0,0,width,height);

  sh2.set("time", (float)millis() / 1000); //Paso una variable de tiempo que constantemente aumente su valor para poder animar el shader.
  sh2.set("resolution", (float)width, (float)height);//Paso la resolucion para utilizarla.
  sh2.set("texturabuffer1", buffer1);//Paso la resolucion para utilizarla.
  buffer2.beginDraw();
  buffer2.shader(sh2);
  buffer2.rect(0, 0, width, height);
  buffer2.endDraw();

  
  //Dibujo los buffers en relacion de cual esta activo. Esto para poder visualizar 
  if (bufferactivo == 0) {
    image(buffer1, 0, 0, width, height);
    text("Buffer activo 1", 20, 50);
  }
  if (bufferactivo == 1) {
    image(buffer2, 0, 0, width, height);
    text("Buffer activo 2", 20, 50);
  }
  //shader(sh1);
  //rect(0, 0, width, height);

  text("Apreta 1 y 2 para ver los distintos buffers", 20, 50);
}


void keyPressed() {
  //Esto me sirve para ir cambiando el shader en vivo. Modifico el archivo del shader y apreto la r para volverlo a cargar.
  //Esto permitira que se actualice la imagen sin necesidad de tener que reiniciar el programa.
  if (key == 'r') {
    sh1 = loadShader("sh1.frag", "sh.vert");
    sh2 = loadShader("sh2.frag", "sh.vert");
  }
  if (key == '1') {
    bufferactivo = 0;
  }
  if (key == '2') {
    bufferactivo = 1;
  }
}
