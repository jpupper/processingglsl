
PGraphics buffer; //Definimos el objeto que maneja el buffer de video


void setup(){
  size(1200,800);
  buffer = createGraphics(width,height); //Creamos un buffer de video que tenga el mismo ancho y alto. 
}


void draw(){
    
   
   buffer.beginDraw();//Para comenzar a dibujar algo dentro de un buffer comienzo poniendole begin draw.
   //Aca se puede llamar cualquier función  de processing de forma normal. 
   buffer.background(0);
   buffer.ellipse(mouseX,mouseY,150,150);
   //buffer.ellipse(random(width),random(height),20,20);
   buffer.endDraw();
 
   //Llamamos a la funcion image en la que podemos dibujar el contenido de nuestro buffer de la misma manera que dibujabamos el contenido de una imagen.
   //Podemos mezclar los resultados de los buffers con resultados por fuera de los buffers o mezclar distintos buffers para hacer composiciones.
   image(buffer,0,0,width,height);
   fill(255,0,0);
   
   ellipse(mouseX,mouseY,50,50);
   
}
