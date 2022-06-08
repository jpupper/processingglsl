
PGraphics buffer; //Definimos el objeto que maneja el buffer de video


void setup(){
  size(1200,800);
  buffer = createGraphics(width,height); //Creamos un buffer de video que tenga el mismo ancho y alto. 
  
  //Dibujo todo el contenido de mi sketch en el buffer 1 sola vez.
  dibujarFondoEnelbuffer();
}


void draw(){
   //Como mi buffer ya esta procesado con el dibujo de 5000 circulos, al haberlo dibujado una sola vez y guardado dentro de una imagen 
   //no consume el mismo procesamiento que si tuviera que dibujar 5000 circulos cada frame.
   
   image(buffer,0,0,width,height);
   fill(255,0,0);
   //Dibujamos una ellipse por encima del buffer. Como podemos ver esta ellipse se dibuja en el canvas final pero el dibujo del buffer se mantiene intacto.
   ellipse(mouseX,mouseY,50,50);
   
}

void dibujarFondoEnelbuffer(){
   buffer.beginDraw();//Para comenzar a dibujar algo dentro de un buffer comienzo poniendole begin draw.
   buffer.background(0);
   int cnt = 5000; //Dibujo 5000 circulos
   for(int i=0; i<cnt; i++){
     buffer.fill(random(255),random(255));
     buffer.ellipse(random(width),random(height),random(200),random(200));
   }
   buffer.endDraw();
}
