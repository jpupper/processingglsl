
uniform vec2 resolution;
uniform sampler2D dibujo;
uniform float time;
void main(){
    vec2 uv = gl_FragCoord.xy / resolution;	
	vec4 dib = texture(dibujo,uv);

	float forma = sin(uv.y*100.+time);
	
	
	gl_FragColor = dib;
}