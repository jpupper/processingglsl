PShader sh; //Defino el objeto del shader.

void setup(){
  
  //Existen 3 tipos de modo de render. el standart,P2D y P3D.
  //Seteo el tamaño de mi canvas y le pongo el modo de canvas P2D. Este modo de canvas es necesario para que pueda dibujar shaders.
  size(800,450,P2D);
  
  //Inicializo mi objeto de shader. Esto accede a la carpeta data en donde obtiene el archivo sh.frag y sh.vert.
  //En este sentido los archivos de los shaders funcionan como imagenes ya que los lee de manera externa,
  //pero en vez de leer un png, lee un archivo de texto donde hay un codigo que se transforma en imagen.
  sh = loadShader("sh.frag", "sh.vert");  
}

void draw(){
  
  //SETEO LAS VARIABLES UNIFORMS.
  //las variables uniform son variables a las que yo puedo definirle el valor por fuera del shader y utilizar ese valor dentro del shader.
  sh.set("time", (float)millis() / 1000); //Paso una variable de tiempo que constantemente aumente su valor para poder animar el shader.
  sh.set("resolution", (float)width,(float)height);//Paso la resolucion para utilizarla.   
  //Llamo a la función shader a la que le paso el argumento de mi objeto del shader
  shader(sh);
  
  //Los shaders siempre necesitan una geometria sobre la cual dibujarse o manifestarse. 
  //Las geometrias pueden ser rectangulos,circulos o figuras con vertices personalizadas. Tambien se pueden aplicar a geometrias 3D en cajas y esferas.
  rect(0,0,width,height);
}

void keyPressed(){
  //Esto me sirve para ir cambiando el shader en vivo. Modifico el archivo del shader y apreto la r para volverlo a cargar.
  //Esto permitira que se actualice la imagen sin necesidad de tener que reiniciar el programa.
  if(key == 'r'){
     sh = loadShader("sh.frag", "sh.vert");
  }
}
