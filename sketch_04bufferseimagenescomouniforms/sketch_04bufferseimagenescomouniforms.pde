PShader sh; //Defino el objeto del shader.

PGraphics buffer; //Definimos el objeto que maneja el buffer de video
PImage img1;
void setup() {
  //Existen 3 tipos de modo de render. el standart,P2D y P3D.
  //Seteo el tamaño de mi canvas y le pongo el modo de canvas P2D. Este modo de canvas es necesario para que pueda dibujar shaders.
  size(800, 450, P2D);
  //Inicializo mi objeto de shader. Esto accede a la carpeta data en donde obtiene el archivo sh.frag y sh.vert.
  //En este sentido los archivos de los shaders funcionan como imagenes ya que los lee de manera externa,
  //pero en vez de leer un png, lee un archivo de texto donde hay un codigo que se transforma en imagen.
  sh = loadShader("sh.frag", "sh.vert");
  buffer = createGraphics(width, height); //Creamos un buffer de video que tenga el mismo ancho y alto.
  img1 = loadImage("imagen1.png"); //Cargo la imagen.
  //Dibujo todo el contenido de mi sketch en el buffer 1 sola vez.
  dibujarFondoEnelbuffer();
}


void draw() {
  //SETEO LAS VARIABLES UNIFORMS.
  //las variables uniform son variables a las que yo puedo definirle el valor por fuera del shader y utilizar ese valor dentro del shader.
  sh.set("time", (float)millis() / 1000); //Paso una variable de tiempo que constantemente aumente su valor para poder animar el shader.
  sh.set("resolution", (float)width, (float)height);//Paso la resolucion para utilizarla.
  sh.set("texturabuffer", buffer);//Paso la resolucion para utilizarla.
  sh.set("texturaimagen", img1);//Paso la resolucion para utilizarla.
  //Llamo a la función shader a la que le paso el argumento de mi objeto del shader
  shader(sh);
  //Los shaders siempre necesitan una geometria sobre la cual dibujarse o manifestarse.
  //Las geometrias pueden ser rectangulos,circulos o figuras con vertices personalizadas. Tambien se pueden aplicar a geometrias 3D en cajas y esferas.
  rect(0, 0, width, height);
}

void keyPressed() {
  //Esto me sirve para ir cambiando el shader en vivo. Modifico el archivo del shader y apreto la r para volverlo a cargar.
  //Esto permitira que se actualice la imagen sin necesidad de tener que reiniciar el programa.
  if (key == 'r') {
    sh = loadShader("sh.frag", "sh.vert");
  }
}

void dibujarFondoEnelbuffer() {
  buffer.beginDraw();//Para comenzar a dibujar algo dentro de un buffer comienzo poniendole begin draw.
  buffer.background(0);
  int cnt = 5000; //Dibujo 5000 circulos
  for (int i=0; i<cnt; i++) {
    buffer.fill(random(255), random(255));
    buffer.ellipse(random(width), random(height), random(200), random(200));
  }
  buffer.endDraw();
}
