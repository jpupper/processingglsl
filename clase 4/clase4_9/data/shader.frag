
uniform vec2 resolution;
uniform sampler2D dibujo;
uniform sampler2D imagen;
uniform sampler2D feedback;

uniform vec2 mouse;
uniform float time;

void main(){
    vec2 uv = gl_FragCoord.xy / resolution;	
	vec2 fb_uv = uv; //UVS DEL FEEDBACK
	float fix = resolution.x/resolution.y;
	uv.x*=fix;
	vec2 p = vec2(mouse.x*fix,1.-mouse.y) -uv;
	float r = length(p);
	float cir = 1.-smoothstep(0.0,.2,r);
	
	fb_uv.y+=0.01;
	vec4 fb = texture(feedback,fb_uv);
	
	vec4 fin = cir+fb*.91;
	gl_FragColor = vec4(fin.rgb,1.);
}