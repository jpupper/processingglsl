#ifdef GL_ES
precision mediump float;
#endif


uniform vec2 resolution;
uniform float time;

void main() {
	//SHADER 2
	vec2 uv = gl_FragCoord.xy/resolution;
	gl_FragColor = vec4(uv.x,uv.y,0.5,1.);
}


