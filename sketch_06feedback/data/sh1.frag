#ifdef GL_ES
precision mediump float;
precision mediump int;
#endif

//Defino las variables uniform
uniform vec2 resolution; //Defino la resolucion
uniform float time; //Defino el tiempo 
uniform sampler2D feedback;

uniform vec2 mouse;
void main(void){
	vec2 uv = gl_FragCoord.xy/resolution;
	
	
	vec2 p = vec2(mouse.x,1.-mouse.y) -uv;//Defino un punto mapeado a las uv (Esto esta en los tutoriales unidad 4.)
	float r = length(p); //obtengo el radio. 
	float e = 1.-smoothstep(0.0,0.1,r);
	
	
	vec4 fb = texture2D(feedback,uv);

	
	vec3 fin = vec3(e)+fb.rgb*.95;
	
	gl_FragColor = vec4(fin,1.0);
  
}

