
uniform vec2 resolution;
uniform sampler2D dibujo;
uniform sampler2D imagen;
uniform sampler2D feedback;

uniform vec2 mouse;
uniform float time;


mat2 scale(vec2 _scale){
    return mat2(_scale.x,0.0,
                0.0,_scale.y);
}
void main(){
    vec2 uv = gl_FragCoord.xy / resolution;	
	vec2 fb_uv = uv; //UVS DEL FEEDBACK
	
	vec4 img = texture(imagen,uv);
	float prom = (img.r+img.g+img.b)/3.;
	
	float fix = resolution.x/resolution.y;
	uv.x*=fix;
	vec2 p = vec2(mouse.x*fix,1.-mouse.y) -uv;
	float r = length(p);
	float cir = 1.-smoothstep(0.0,.2,r);
	
	fb_uv-=vec2(.5);
	fb_uv*=scale(vec2(.94));
	fb_uv+=vec2(.5);
	
	vec4 fb = texture(feedback,fb_uv);
	
	vec4 fin = cir+fb*.99*img;
	
	
	gl_FragColor = vec4(fin.rgb,1.);
}