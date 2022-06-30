#ifdef GL_ES
precision mediump float;
precision mediump int;
#endif


//Defino las variables uniform
uniform vec2 mouse;
uniform vec2 resolution; //Defino la resolucion
uniform float time; //Defino el tiempo 
uniform sampler2D texturabuffer; //Paso como textura del buffer generado utilizando processing.
uniform sampler2D texturaimagen;

#define PI 3.14159235659

mat2 scale(vec2 _scale){
    return mat2(_scale.x,0.0,
                0.0,_scale.y);
}
mat2 rotate2d(float _angle){
    return mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle));
}

float poly(vec2 uv,vec2 p, float s, float dif,int N,float a){
    // Remap the space to -1. to 1.
    vec2 st = p - uv ;
    // Angle and radius from the current pixel
    float a2 = atan(st.x,st.y)+a;
    float r = PI*2. /float(N);
    float d = cos(floor(.5+a2/r)*r-a2)*length(st);
    float e = 1.0 - smoothstep(s,s+dif,d);
    return e;
}

void main(){
 
 
    vec2 uv = gl_FragCoord.xy / resolution.xy ;
	//vec2 uv2 = uv;
		vec2 uv2 = uv;
	
	float e =sin(uv.x*20.+sin(uv.y*50.+sin(uv.x*20.+time)))*.5+.5;
	
	uv-=vec2(.5);
	//uv*=scale(vec2(0.9));
	//uv*=rotate2d(time+e);
	uv+=vec2(.5);
	
	
	//uv.y+= sin(time)*.5;
		
	vec2 p = vec2(0.5) - uv;
	float r = length(p);
	
	/*float cir = smoothstep(0.2,0.1,r);
			cir =sin(uv.x*20.+sin(uv.y*5.+sin(uv.x*10.)))*.5+.5;*/
				
	float	cir2 = poly(uv,vec2(0.5),0.1,0.1,3,0.0);
	vec3 dib = vec3(cir2);
    
	//uv.x+=.5;
	
	vec4 t1 = texture2D(texturaimagen,vec2(uv.x,1.-uv.y));
	
	gl_FragColor = vec4(t1.rgb,1.);	
}

