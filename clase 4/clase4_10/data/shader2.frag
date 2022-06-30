
uniform vec2 resolution;
uniform float time;
void main(){
    vec2 uv = gl_FragCoord.xy / resolution;
	
	float forma = sin(uv.x*100.+time);
	gl_FragColor = vec4(forma);
}