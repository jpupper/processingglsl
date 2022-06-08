PShader sh1; //Defino el objeto del shader.
PGraphics buffer1;

int bufferactivo = 0;
void setup() {

  size(1200, 800, P2D);

  buffer1 = createGraphics(width, height, P3D); //Creamos el primer buffer de video
 
  sh1 = loadShader("sh1.frag", "sh.vert");
}


void draw() {
  // background(0, 255, 0);

  //SETEO LAS VARIABLES UNIFORMS.
  //las variables uniform son variables a las que yo puedo definirle el valor por fuera del shader y utilizar ese valor dentro del shader.
  sh1.set("time", (float)millis() / 1000); //Paso una variable de tiempo que constantemente aumente su valor para poder animar el shader.
  sh1.set("resolution", (float)width, (float)height);//Paso la resolucion para utilizarla.
  sh1.set("feedback", buffer1);//Paso el mismo buffer como textura al shader, esto genera una retroalimentacion conocida como feedback
  sh1.set("mouse", (float)mouseX/(float)width,(float)mouseY/(float)height);//Paso las coordenadas del mouse. Las divido por la resolución para que me devuelva valores normalizados(de 0 a 1).
  buffer1.beginDraw();
  buffer1.shader(sh1);
  buffer1.rect(0, 0, width, height);
  buffer1.endDraw();
  image(buffer1,0,0,width,height);


}


void keyPressed() {
  //Esto me sirve para ir cambiando el shader en vivo. Modifico el archivo del shader y apreto la r para volverlo a cargar.
  //Esto permitira que se actualice la imagen sin necesidad de tener que reiniciar el programa.
  if (key == 'r') {
    sh1 = loadShader("sh1.frag", "sh.vert");
  }
}
