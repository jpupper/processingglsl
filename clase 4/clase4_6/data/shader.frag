
uniform vec2 resolution;
uniform sampler2D dibujo;
uniform sampler2D imagen;
uniform float time;

void main(){
    vec2 uv = gl_FragCoord.xy / resolution;	
	vec4 dib = texture(dibujo,uv);
	float prom = (dib.r+dib.g+dib.b)/3.;
	
	
	vec2 uv2 = uv;
	uv2.y+=prom*.4;
	
	vec4 img = texture(imagen,uv2);
	
	float forma = sin(uv.y*100.+time);
	
	vec4 fin = img;
	gl_FragColor = vec4(fin.rgb,1.0);
}