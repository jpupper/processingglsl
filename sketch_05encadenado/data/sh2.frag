#ifdef GL_ES
precision mediump float;
precision mediump int;
#endif


//Defino las variables uniform
uniform vec2 resolution; //Defino la resolucion
uniform float time; //Defino el tiempo 
uniform sampler2D texturabuffer1; //Paso como textura del buffer generado utilizando processing.

void main(void){
	vec2 uv = gl_FragCoord.xy/resolution;
	
	uv.x+=sin(uv.y*10.+time)*.01+.01;
	uv.y+=sin(uv.x*10.+time)*.01+.01;
	
	vec4 txbuffer = texture2D(texturabuffer1,uv);
	txbuffer +=sin(txbuffer*100.+time)*.2;

	gl_FragColor = txbuffer;
  
}

