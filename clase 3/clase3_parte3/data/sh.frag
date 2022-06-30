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

///SOFT LIGHT
#define ADD 1 
#define	AVERAGE 2
#define	COLOR_BURN 3
#define	COLOR_DODGE 4
#define	DARKEN 5
#define	DIFFERENCE 6
#define	EXCLUSION 7
#define	GLOW 8
#define	HARD_LIGHT 9
#define	HARD_MIX 10
#define	LIGHTEN 11
#define	LINEAR_BURN 12
#define	LINEAR_DODGE 13
#define	LINEAR_LIGHT 14
#define	MULTIPLY 15
#define	NEGATION 16
#define	NORMAL 17
#define	OVERLAY 18
#define	PHOENIX 19
#define	PIN_LIGHT 20
#define	REFLECT 21
#define	SCREEN 22
#define	SOFT_LIGHT 23
#define	SUBTRACT 24
#define	VIVID_LIGHT 25


float blendSoftLight(float base, float blend) {
	return (blend<0.5)?(2.0*base*blend+base*base*(1.0-2.0*blend)):(sqrt(base)*(2.0*blend-1.0)+2.0*base*(1.0-blend));
}

vec3 blendSoftLight(vec3 base, vec3 blend) {
	return vec3(blendSoftLight(base.r,blend.r),blendSoftLight(base.g,blend.g),blendSoftLight(base.b,blend.b));
}

vec3 blendSoftLight(vec3 base, vec3 blend, float opacity) {
	return (blendSoftLight(base, blend) * opacity + base * (1.0 - opacity));
}

//ADD : 
float blendAdd(float base, float blend) {
	return min(base+blend,1.0);
}

vec3 blendAdd(vec3 base, vec3 blend) {
	return min(base+blend,vec3(1.0));
}

vec3 blendAdd(vec3 base, vec3 blend, float opacity) {
	return (blendAdd(base, blend) * opacity + base * (1.0 - opacity));
}


vec3 blendAverage(vec3 base, vec3 blend) {
	return (base+blend)/2.0;
}

vec3 blendAverage(vec3 base, vec3 blend, float opacity) {
	return (blendAverage(base, blend) * opacity + base * (1.0 - opacity));
}
  
float blendColorBurn(float base, float blend) {
	return (blend==0.0)?blend:max((1.0-((1.0-base)/blend)),0.0);
}

vec3 blendColorBurn(vec3 base, vec3 blend) {
	return vec3(blendColorBurn(base.r,blend.r),blendColorBurn(base.g,blend.g),blendColorBurn(base.b,blend.b));
}

vec3 blendColorBurn(vec3 base, vec3 blend, float opacity) {
	return (blendColorBurn(base, blend) * opacity + base * (1.0 - opacity));
}
float blendColorDodge(float base, float blend) {
	return (blend==1.0)?blend:min(base/(1.0-blend),1.0);
}

vec3 blendColorDodge(vec3 base, vec3 blend) {
	return vec3(blendColorDodge(base.r,blend.r),blendColorDodge(base.g,blend.g),blendColorDodge(base.b,blend.b));
}

vec3 blendColorDodge(vec3 base, vec3 blend, float opacity) {
	return (blendColorDodge(base, blend) * opacity + base * (1.0 - opacity));
}

float blendDarken(float base, float blend) {
	return min(blend,base);
}

vec3 blendDarken(vec3 base, vec3 blend) {
	return vec3(blendDarken(base.r,blend.r),blendDarken(base.g,blend.g),blendDarken(base.b,blend.b));
}

vec3 blendDarken(vec3 base, vec3 blend, float opacity) {
	return (blendDarken(base, blend) * opacity + base * (1.0 - opacity));
}


vec3 blendDifference(vec3 base, vec3 blend) {
	return abs(base-blend);
}

vec3 blendDifference(vec3 base, vec3 blend, float opacity) {
	return (blendDifference(base, blend) * opacity + base * (1.0 - opacity));
}


vec3 blendExclusion(vec3 base, vec3 blend) {
	return base+blend-2.0*base*blend;
}

vec3 blendExclusion(vec3 base, vec3 blend, float opacity) {
	return (blendExclusion(base, blend) * opacity + base * (1.0 - opacity));
}

float blendLighten(float base, float blend) {
	return max(blend,base);
}

vec3 blendLighten(vec3 base, vec3 blend) {
	return vec3(blendLighten(base.r,blend.r),blendLighten(base.g,blend.g),blendLighten(base.b,blend.b));
}

vec3 blendLighten(vec3 base, vec3 blend, float opacity) {
	return (blendLighten(base, blend) * opacity + base * (1.0 - opacity));
}
float blendLinearBurn(float base, float blend) {
	// Note : Same implementation as BlendSubtractf
	return max(base+blend-1.0,0.0);
}

vec3 blendLinearBurn(vec3 base, vec3 blend) {
	// Note : Same implementation as BlendSubtract
	return max(base+blend-vec3(1.0),vec3(0.0));
}

vec3 blendLinearBurn(vec3 base, vec3 blend, float opacity) {
	return (blendLinearBurn(base, blend) * opacity + base * (1.0 - opacity));
}
float blendLinearDodge(float base, float blend) {
	// Note : Same implementation as BlendAddf
	return min(base+blend,1.0);
}

vec3 blendLinearDodge(vec3 base, vec3 blend) {
	// Note : Same implementation as BlendAdd
	return min(base+blend,vec3(1.0));
}

vec3 blendLinearDodge(vec3 base, vec3 blend, float opacity) {
	return (blendLinearDodge(base, blend) * opacity + base * (1.0 - opacity));
}
float blendLinearLight(float base, float blend) {
	return blend<0.5?blendLinearBurn(base,(2.0*blend)):blendLinearDodge(base,(2.0*(blend-0.5)));
}

vec3 blendLinearLight(vec3 base, vec3 blend) {
	return vec3(blendLinearLight(base.r,blend.r),blendLinearLight(base.g,blend.g),blendLinearLight(base.b,blend.b));
}

vec3 blendLinearLight(vec3 base, vec3 blend, float opacity) {
	return (blendLinearLight(base, blend) * opacity + base * (1.0 - opacity));
}
vec3 blendMultiply(vec3 base, vec3 blend) {
	return base*blend;
}

vec3 blendMultiply(vec3 base, vec3 blend, float opacity) {
	return (blendMultiply(base, blend) * opacity + base * (1.0 - opacity));
}


vec3 blendNegation(vec3 base, vec3 blend) {
	return vec3(1.0)-abs(vec3(1.0)-base-blend);
}

vec3 blendNegation(vec3 base, vec3 blend, float opacity) {
	return (blendNegation(base, blend) * opacity + base * (1.0 - opacity));
}

vec3 blendNormal(vec3 base, vec3 blend) {
	return blend;
}

vec3 blendNormal(vec3 base, vec3 blend, float opacity) {
	return (blendNormal(base, blend) * opacity + base * (1.0 - opacity));
}

float blendOverlay(float base, float blend) {
	return base<0.5?(2.0*base*blend):(1.0-2.0*(1.0-base)*(1.0-blend));
}

vec3 blendOverlay(vec3 base, vec3 blend) {
	return vec3(blendOverlay(base.r,blend.r),blendOverlay(base.g,blend.g),blendOverlay(base.b,blend.b));
}

vec3 blendOverlay(vec3 base, vec3 blend, float opacity) {
	return (blendOverlay(base, blend) * opacity + base * (1.0 - opacity));
}
vec3 blendPhoenix(vec3 base, vec3 blend) {
	return min(base,blend)-max(base,blend)+vec3(1.0);
}

vec3 blendPhoenix(vec3 base, vec3 blend, float opacity) {
	return (blendPhoenix(base, blend) * opacity + base * (1.0 - opacity));
}
float blendPinLight(float base, float blend) {
	return (blend<0.5)?blendDarken(base,(2.0*blend)):blendLighten(base,(2.0*(blend-0.5)));
}

vec3 blendPinLight(vec3 base, vec3 blend) {
	return vec3(blendPinLight(base.r,blend.r),blendPinLight(base.g,blend.g),blendPinLight(base.b,blend.b));
}

vec3 blendPinLight(vec3 base, vec3 blend, float opacity) {
	return (blendPinLight(base, blend) * opacity + base * (1.0 - opacity));
}

float blendReflect(float base, float blend) {
	return (blend==1.0)?blend:min(base*base/(1.0-blend),1.0);
}

vec3 blendReflect(vec3 base, vec3 blend) {
	return vec3(blendReflect(base.r,blend.r),blendReflect(base.g,blend.g),blendReflect(base.b,blend.b));
}

vec3 blendReflect(vec3 base, vec3 blend, float opacity) {
	return (blendReflect(base, blend) * opacity + base * (1.0 - opacity));
}
  
float blendScreen(float base, float blend) {
	return 1.0-((1.0-base)*(1.0-blend));
}

vec3 blendScreen(vec3 base, vec3 blend) {
	return vec3(blendScreen(base.r,blend.r),blendScreen(base.g,blend.g),blendScreen(base.b,blend.b));
}

vec3 blendScreen(vec3 base, vec3 blend, float opacity) {
	return (blendScreen(base, blend) * opacity + base * (1.0 - opacity));
}
float blendSubstract(float base, float blend) {
	return max(base+blend-1.0,0.0);
}

vec3 blendSubstract(vec3 base, vec3 blend) {
	return max(base+blend-vec3(1.0),vec3(0.0));
}

vec3 blendSubstract(vec3 base, vec3 blend, float opacity) {
	return (blendSubstract(base, blend) * opacity + blend * (1.0 - opacity));
}
float blendVividLight(float base, float blend) {
	return (blend<0.5)?blendColorBurn(base,(2.0*blend)):blendColorDodge(base,(2.0*(blend-0.5)));
}

vec3 blendVividLight(vec3 base, vec3 blend) {
	return vec3(blendVividLight(base.r,blend.r),blendVividLight(base.g,blend.g),blendVividLight(base.b,blend.b));
}

vec3 blendVividLight(vec3 base, vec3 blend, float opacity) {
	return (blendVividLight(base, blend) * opacity + base * (1.0 - opacity));
}
vec3 blendHardLight(vec3 base, vec3 blend) {
	return blendOverlay(blend,base);
}

vec3 blendHardLight(vec3 base, vec3 blend, float opacity) {
	return (blendHardLight(base, blend) * opacity + base * (1.0 - opacity));
}
vec3 blendGlow(vec3 base, vec3 blend) {
	return blendReflect(blend,base);
}

vec3 blendGlow(vec3 base, vec3 blend, float opacity) {
	return (blendGlow(base, blend) * opacity + base * (1.0 - opacity));
}

float blendHardMix(float base, float blend) {
	return (blendVividLight(base,blend)<0.5)?0.0:1.0;
}

vec3 blendHardMix(vec3 base, vec3 blend) {
	return vec3(blendHardMix(base.r,blend.r),blendHardMix(base.g,blend.g),blendHardMix(base.b,blend.b));
}

vec3 blendHardMix(vec3 base, vec3 blend, float opacity) {
	return (blendHardMix(base, blend) * opacity + base * (1.0 - opacity));
}


vec3 blendMode( int mode, vec3 base, vec3 blend ){
	if( mode == 1 ){
		return blendAdd( base, blend );
	}else
	if( mode == 2 ){
		return blendAverage( base, blend );
	}else
	if( mode == 3 ){
		return blendColorBurn( base, blend );
	}else
	if( mode == 4 ){
		return blendColorDodge( base, blend );
	}else
	if( mode == 5 ){
		return blendDarken( base, blend );
	}else
	if( mode == 6 ){
		return blendDifference( base, blend );
	}else
	if( mode == 7 ){
		return blendExclusion( base, blend );
	}else
	if( mode == 8 ){
		return blendGlow( base, blend );
	}else
	if( mode == 9 ){
		return blendHardLight( base, blend );
	}else
	if( mode == 10 ){
		return blendHardMix( base, blend );
	}else
	if( mode == 11 ){
		return blendLighten( base, blend );
	}else
	if( mode == 12 ){
		return blendLinearBurn( base, blend );
	}else
	if( mode == 13 ){
		return blendLinearDodge( base, blend );
	}else
	if( mode == 14 ){
		return blendLinearLight( base, blend );
	}else
	if( mode == 15 ){
		return blendMultiply( base, blend );
	}else
	if( mode == 16 ){
		return blendNegation( base, blend );
	}else
	if( mode == 17 ){
		return blendNormal( base, blend );
	}else
	if( mode == 18 ){
		return blendOverlay( base, blend );
	}else
	if( mode == 19 ){
		return blendPhoenix( base, blend );
	}else
	if( mode == 20 ){
		return blendPinLight( base, blend );
	}else
	if( mode == 21 ){
		return blendReflect( base, blend );
	}else
	if( mode == 22 ){
		return blendScreen( base, blend );
	}else
	if( mode == 23 ){
		return blendSoftLight( base, blend );
	}else
	if( mode == 24 ){
		return blendSubstract( base, blend );
	}else
	if( mode == 25 ){
		return blendVividLight( base, blend );
	}
	return vec3(0.0);
}
vec3 blendMode( int mode, vec3 base, vec3 blend ,float opacity){
	if( mode == 1 ){
		return blendAdd( base, blend ,opacity);
	}else
	if( mode == 2 ){
		return blendAverage( base, blend ,opacity);
	}else
	if( mode == 3 ){
		return blendColorBurn( base, blend ,opacity);
	}else
	if( mode == 4 ){
		return blendColorDodge( base, blend ,opacity);
	}else
	if( mode == 5 ){
		return blendDarken( base, blend ,opacity);
	}else
	if( mode == 6 ){
		return blendDifference( base, blend ,opacity);
	}else
	if( mode == 7 ){
		return blendExclusion( base, blend,opacity );
	}else
	if( mode == 8 ){
		return blendGlow( base, blend ,opacity);
	}else
	if( mode == 9 ){
		return blendHardLight( base, blend ,opacity);
	}else
	if( mode == 10 ){
		return blendHardMix( base, blend,opacity );
	}else
	if( mode == 11 ){
		return blendLighten( base, blend ,opacity);
	}else
	if( mode == 12 ){
		return blendLinearBurn( base, blend ,opacity);
	}else
	if( mode == 13 ){
		return blendLinearDodge( base, blend,opacity );
	}else
	if( mode == 14 ){
		return blendLinearLight( base, blend ,opacity);
	}else
	if( mode == 15 ){
		return blendMultiply( base, blend ,opacity);
	}else
	if( mode == 16 ){
		return blendNegation( base, blend ,opacity);
	}else
	if( mode == 17 ){
		return blendNormal( base, blend ,opacity);
	}else
	if( mode == 18 ){
		return blendOverlay( base, blend ,opacity);
	}else
	if( mode == 19 ){
		return blendPhoenix( base, blend ,opacity);
	}else
	if( mode == 20 ){
		return blendPinLight( base, blend ,opacity);
	}else
	if( mode == 21 ){
		return blendReflect( base, blend ,opacity);
	}else
	if( mode == 22 ){
		return blendScreen( base, blend ,opacity);
	}else
	if( mode == 23 ){
		return blendSoftLight( base, blend ,opacity);
	}else
	if( mode == 24 ){
		return blendSubstract( base, blend ,opacity);
	}else
	if( mode == 25 ){
		return blendVividLight( base, blend ,opacity);
	}
	return vec3(0.0);
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
	
	vec3 fin = blendMode(int(floor(sin(time)*10.+10.)),vec3(t1.rgb),vec3(cir2),1.5);
	gl_FragColor = vec4(fin,1.);
	
}

