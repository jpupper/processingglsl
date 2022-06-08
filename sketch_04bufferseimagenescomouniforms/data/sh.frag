#ifdef GL_ES
precision mediump float;
precision mediump int;
#endif


//Defino las variables uniform
uniform vec2 resolution; //Defino la resolucion
uniform float time; //Defino el tiempo 
uniform sampler2D texturabuffer; //Paso como textura del buffer generado utilizando processing.
uniform sampler2D texturaimagen; //Paso como textura una imagen que carge en processing

void main(void){
	vec2 uv = gl_FragCoord.xy/resolution;
	
	vec4 txbuffer = texture2D(texturabuffer,uv);
	vec4 tximg = texture2D(texturaimagen,uv);
	
	vec4 fin = mix(txbuffer,tximg,sin(time+uv.x*100.));
	gl_FragColor = fin;
  
}

