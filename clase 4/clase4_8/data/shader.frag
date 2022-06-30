
uniform vec2 resolution;
uniform sampler2D dibujo;
uniform sampler2D imagen;
uniform float time;

void main(){
    vec2 uv = gl_FragCoord.xy / resolution;	
	vec4 img = texture(imagen,vec2(uv.x,uv.y));
	
	float a = sin(img.g*10.+time);

	img.rgb*=vec3(a);
	gl_FragColor = vec4(img.rgb,1.);
}