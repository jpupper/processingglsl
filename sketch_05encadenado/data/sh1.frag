#ifdef GL_ES
precision mediump float;
precision mediump int;
#endif

//Defino las variables uniform
uniform vec2 resolution; //Defino la resolucion
uniform float time; //Defino el tiempo 

void main(void){
	vec2 uv = gl_FragCoord.xy/resolution;
	
	
	
	float r = sin(uv.x*20.0+time)*.5+.5;
	
	float g = sin(uv.y*20.0-time)*.5+.5;
	
	float b = sin(uv.x*10.0+time)*.5+.5;
	
	vec4 fin = vec4(r,g,b,1.0);
	gl_FragColor = fin;
  
}

