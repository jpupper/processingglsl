
uniform vec2 resolution;
void main(){
    vec2 uv = gl_FragCoord.xy / resolution;
	gl_FragColor = vec4(uv.x,uv.y,1.0,1.0);
}