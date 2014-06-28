/*
 * glfx.js
 * https://github.com/after12am/glfx.js
 *
 * Copyright 2011-2014 Evan Wallace
 * Copyright 2012-2014 Satoshi Okami
 * Released under the MIT license
 */
var fx=function(){function o(a,d,c){return Math.max(a,Math.min(d,c))}function u(b){return{_:b,loadContentsOf:function(b){a=this._.gl;this._.loadContentsOf(b)},destroy:function(){a=this._.gl;this._.destroy()}}}function y(a){return u(q.fromElement(a))}function z(a){return new A(this,a)}function B(b,d){var c=a.UNSIGNED_BYTE;if(a.getExtension("OES_texture_float")&&a.getExtension("OES_texture_float_linear")){var e=new q(100,100,a.RGBA,a.FLOAT);try{e.drawTo(function(){c=a.FLOAT})}catch(f){}e.destroy()}this._.texture&&
this._.texture.destroy();this._.spareTexture&&this._.spareTexture.destroy();this.width=b;this.height=d;this._.texture=new q(b,d,a.RGBA,c);this._.spareTexture=new q(b,d,a.RGBA,c);this._.extraTexture=this._.extraTexture||new q(0,0,a.RGBA,c);this._.flippedShader=this._.flippedShader||new h(null,"uniform sampler2D texture;varying vec2 texCoord;void main(){gl_FragColor=texture2D(texture,vec2(texCoord.x,1.0-texCoord.y));}");this._.isInitialized=!0}
function C(a,d,c){if(!this._.isInitialized||a._.width!=this.width||a._.height!=this.height)B.call(this,d?d:a._.width,c?c:a._.height);a._.use();this._.texture.drawTo(function(){h.getDefaultShader().drawRect()});return this}function D(){this._.texture.use();this._.flippedShader.drawRect();return this}function i(a,d,c,e){(c||this._.texture).use();this._.spareTexture.drawTo(function(){a.uniforms(d).drawRect()});this._.spareTexture.swapWith(e||this._.texture)}function E(a){a.parentNode.insertBefore(this,
a);a.parentNode.removeChild(a);return this}function F(){var b=new q(this._.texture.width,this._.texture.height,a.RGBA,a.UNSIGNED_BYTE);this._.texture.use();b.drawTo(function(){h.getDefaultShader().drawRect()});return u(b)}function G(){var b=this._.texture.width,d=this._.texture.height,c=new Uint8Array(4*b*d);this._.texture.drawTo(function(){a.readPixels(0,0,b,d,a.RGBA,a.UNSIGNED_BYTE,c)});return c}function g(b){return function(){a=this._.gl;return b.apply(this,arguments)}}function v(a,d,c,e,f,k,n,
m){var j=c-f,p=e-k,g=n-f,h=m-k,f=a-c+f-n,k=d-e+k-m,i=j*h-g*p,g=(f*h-g*k)/i,j=(j*k-f*p)/i;return[c-a+g*c,e-d+g*e,g,n-a+j*n,m-d+j*m,j,a,d,1]}function w(a){var d=a[0],c=a[1],e=a[2],f=a[3],k=a[4],n=a[5],m=a[6],j=a[7],a=a[8],p=d*k*a-d*n*j-c*f*a+c*n*m+e*f*j-e*k*m;return[(k*a-n*j)/p,(e*j-c*a)/p,(c*n-e*k)/p,(n*m-f*a)/p,(d*a-e*m)/p,(e*f-d*n)/p,(f*j-k*m)/p,(c*m-d*j)/p,(d*k-c*f)/p]}function x(a){var d=a.length;this.xa=[];this.ya=[];this.u=[];this.y2=[];a.sort(function(a,b){return a[0]-b[0]});for(var c=0;c<d;c++)this.xa.push(a[c][0]),
this.ya.push(a[c][1]);this.u[0]=0;this.y2[0]=0;for(c=1;c<d-1;++c){var a=this.xa[c+1]-this.xa[c-1],e=(this.xa[c]-this.xa[c-1])/a,f=e*this.y2[c-1]+2;this.y2[c]=(e-1)/f;this.u[c]=(6*((this.ya[c+1]-this.ya[c])/(this.xa[c+1]-this.xa[c])-(this.ya[c]-this.ya[c-1])/(this.xa[c]-this.xa[c-1]))/a-e*this.u[c-1])/f}this.y2[d-1]=0;for(c=d-2;0<=c;--c)this.y2[c]=this.y2[c]*this.y2[c+1]+this.u[c]}function t(a,d){return new h(null,a+"uniform sampler2D texture;uniform vec2 texSize;varying vec2 texCoord;void main(){vec2 coord=texCoord*texSize;"+
d+"gl_FragColor=texture2D(texture,coord/texSize);vec2 clampedCoord=clamp(coord,vec2(0.0),texSize);if(coord!=clampedCoord){gl_FragColor.a*=max(0.0,1.0-length(coord-clampedCoord));}}")}function H(b,d){a.brightnessContrast=a.brightnessContrast||new h(null,"uniform sampler2D texture;uniform float brightness;uniform float contrast;varying vec2 texCoord;void main(){vec4 color=texture2D(texture,texCoord);color.rgb+=brightness;if(contrast>0.0){color.rgb=(color.rgb-0.5)/(1.0-contrast)+0.5;}else{color.rgb=(color.rgb-0.5)*(1.0+contrast)+0.5;}gl_FragColor=color;}");
i.call(this,a.brightnessContrast,{brightness:o(-1,b,1),contrast:o(-1,d,1)});return this}function s(a){for(var a=new x(a),d=[],c=0;256>c;c++)d.push(o(0,Math.floor(256*a.interpolate(c/255)),255));return d}function I(b,d,c){b=s(b);1==arguments.length?d=c=b:(d=s(d),c=s(c));for(var e=[],f=0;256>f;f++)e.splice(e.length,0,b[f],d[f],c[f],255);this._.extraTexture.initFromBytes(256,1,e);this._.extraTexture.use(1);a.curves=a.curves||new h(null,"uniform sampler2D texture;uniform sampler2D map;varying vec2 texCoord;void main(){vec4 color=texture2D(texture,texCoord);color.r=texture2D(map,vec2(color.r)).r;color.g=texture2D(map,vec2(color.g)).g;color.b=texture2D(map,vec2(color.b)).b;gl_FragColor=color;}");
a.curves.textures({map:1});i.call(this,a.curves,{});return this}function J(b){a.denoise=a.denoise||new h(null,"uniform sampler2D texture;uniform float exponent;uniform float strength;uniform vec2 texSize;varying vec2 texCoord;void main(){vec4 center=texture2D(texture,texCoord);vec4 color=vec4(0.0);float total=0.0;for(float x=-4.0;x<=4.0;x+=1.0){for(float y=-4.0;y<=4.0;y+=1.0){vec4 sample=texture2D(texture,texCoord+vec2(x,y)/texSize);float weight=1.0-abs(dot(sample.rgb-center.rgb,vec3(0.25)));weight=pow(weight,exponent);color+=sample*weight;total+=weight;}}gl_FragColor=color/total;}");
for(var d=0;2>d;d++)i.call(this,a.denoise,{exponent:Math.max(0,b),texSize:[this.width,this.height]});return this}function K(b,d){a.hueSaturation=a.hueSaturation||new h(null,"uniform sampler2D texture;uniform float hue;uniform float saturation;varying vec2 texCoord;void main(){vec4 color=texture2D(texture,texCoord);float angle=hue*3.14159265;float s=sin(angle),c=cos(angle);vec3 weights=(vec3(2.0*c,-sqrt(3.0)*s-c,sqrt(3.0)*s-c)+1.0)/3.0;float len=length(color.rgb);color.rgb=vec3(dot(color.rgb,weights.xyz),dot(color.rgb,weights.zxy),dot(color.rgb,weights.yzx));float average=(color.r+color.g+color.b)/3.0;if(saturation>0.0){color.rgb+=(average-color.rgb)*(1.0-1.0/(1.001-saturation));}else{color.rgb+=(average-color.rgb)*(-saturation);}gl_FragColor=color;}");
i.call(this,a.hueSaturation,{hue:o(-1,b,1),saturation:o(-1,d,1)});return this}function L(b){a.noise=a.noise||new h(null,"uniform sampler2D texture;uniform float amount;varying vec2 texCoord;float rand(vec2 co){return fract(sin(dot(co.xy,vec2(12.9898,78.233)))*43758.5453);}void main(){vec4 color=texture2D(texture,texCoord);float diff=(rand(texCoord)-0.5)*amount;color.r+=diff;color.g+=diff;color.b+=diff;gl_FragColor=color;}");
i.call(this,a.noise,{amount:o(0,b,1)});return this}function M(b){a.sepia=a.sepia||new h(null,"uniform sampler2D texture;uniform float amount;varying vec2 texCoord;void main(){vec4 color=texture2D(texture,texCoord);float r=color.r;float g=color.g;float b=color.b;color.r=min(1.0,(r*(1.0-(0.607*amount)))+(g*(0.769*amount))+(b*(0.189*amount)));color.g=min(1.0,(r*0.349*amount)+(g*(1.0-(0.314*amount)))+(b*0.168*amount));color.b=min(1.0,(r*0.272*amount)+(g*0.534*amount)+(b*(1.0-(0.869*amount))));gl_FragColor=color;}");
i.call(this,a.sepia,{amount:o(0,b,1)});return this}function N(b,d){a.unsharpMask=a.unsharpMask||new h(null,"uniform sampler2D blurredTexture;uniform sampler2D originalTexture;uniform float strength;uniform float threshold;varying vec2 texCoord;void main(){vec4 blurred=texture2D(blurredTexture,texCoord);vec4 original=texture2D(originalTexture,texCoord);gl_FragColor=mix(blurred,original,1.0+strength);}");
this._.extraTexture.ensureFormat(this._.texture);this._.texture.use();this._.extraTexture.drawTo(function(){h.getDefaultShader().drawRect()});this._.extraTexture.use(1);this.triangleBlur(b);a.unsharpMask.textures({originalTexture:1});i.call(this,a.unsharpMask,{strength:d});this._.extraTexture.unuse(1);return this}function O(b){a.vibrance=a.vibrance||new h(null,"uniform sampler2D texture;uniform float amount;varying vec2 texCoord;void main(){vec4 color=texture2D(texture,texCoord);float average=(color.r+color.g+color.b)/3.0;float mx=max(color.r,max(color.g,color.b));float amt=(mx-average)*(-amount*3.0);color.rgb=mix(color.rgb,vec3(mx),amt);gl_FragColor=color;}");
i.call(this,a.vibrance,{amount:o(-1,b,1)});return this}function P(b,d){a.vignette=a.vignette||new h(null,"uniform sampler2D texture;uniform float size;uniform float amount;varying vec2 texCoord;void main(){vec4 color=texture2D(texture,texCoord);float dist=distance(texCoord,vec2(0.5,0.5));color.rgb*=smoothstep(0.8,size*0.799,dist*(amount+size));gl_FragColor=color;}");
i.call(this,a.vignette,{size:o(0,b,1),amount:o(0,d,1)});return this}function Q(b,d,c){a.lensBlurPrePass=a.lensBlurPrePass||new h(null,"uniform sampler2D texture;uniform float power;varying vec2 texCoord;void main(){vec4 color=texture2D(texture,texCoord);color=pow(color,vec4(power));gl_FragColor=vec4(color);}");var e="uniform sampler2D texture0;uniform sampler2D texture1;uniform vec2 delta0;uniform vec2 delta1;uniform float power;varying vec2 texCoord;"+
r+"vec4 sample(vec2 delta){float offset=random(vec3(delta,151.7182),0.0);vec4 color=vec4(0.0);float total=0.0;for(float t=0.0;t<=30.0;t++){float percent=(t+offset)/30.0;color+=texture2D(texture0,texCoord+delta*percent);total+=1.0;}return color/total;}";
a.lensBlur0=a.lensBlur0||new h(null,e+"void main(){gl_FragColor=sample(delta0);}");a.lensBlur1=a.lensBlur1||new h(null,e+"void main(){gl_FragColor=(sample(delta0)+sample(delta1))*0.5;}");a.lensBlur2=a.lensBlur2||(new h(null,e+"void main(){vec4 color=(sample(delta0)+2.0*texture2D(texture1,texCoord))/3.0;gl_FragColor=pow(color,vec4(power));}")).textures({texture1:1});for(var e=
[],f=0;3>f;f++){var k=c+2*f*Math.PI/3;e.push([b*Math.sin(k)/this.width,b*Math.cos(k)/this.height])}b=Math.pow(10,o(-1,d,1));i.call(this,a.lensBlurPrePass,{power:b});this._.extraTexture.ensureFormat(this._.texture);i.call(this,a.lensBlur0,{delta0:e[0]},this._.texture,this._.extraTexture);i.call(this,a.lensBlur1,{delta0:e[1],delta1:e[2]},this._.extraTexture,this._.extraTexture);i.call(this,a.lensBlur0,{delta0:e[1]});this._.extraTexture.use(1);i.call(this,a.lensBlur2,{power:1/b,delta0:e[2]});return this}
function R(b,d,c,e,f,k){a.tiltShift=a.tiltShift||new h(null,"uniform sampler2D texture;uniform float blurRadius;uniform float gradientRadius;uniform vec2 start;uniform vec2 end;uniform vec2 delta;uniform vec2 texSize;varying vec2 texCoord;"+r+"void main(){vec4 color=vec4(0.0);float total=0.0;float offset=random(vec3(12.9898,78.233,151.7182),0.0);vec2 normal=normalize(vec2(start.y-end.y,end.x-start.x));float radius=smoothstep(0.0,1.0,abs(dot(texCoord*texSize-start,normal))/gradientRadius)*blurRadius;for(float t=-30.0;t<=30.0;t++){float percent=(t+offset-0.5)/30.0;float weight=1.0-abs(percent);vec4 sample=texture2D(texture,texCoord+delta/texSize*percent*radius);sample.rgb*=sample.a;color+=sample*weight;total+=weight;}gl_FragColor=color/total;gl_FragColor.rgb/=gl_FragColor.a+0.00001;}");
var n=c-b,m=e-d,j=Math.sqrt(n*n+m*m);i.call(this,a.tiltShift,{blurRadius:f,gradientRadius:k,start:[b,d],end:[c,e],delta:[n/j,m/j],texSize:[this.width,this.height]});i.call(this,a.tiltShift,{blurRadius:f,gradientRadius:k,start:[b,d],end:[c,e],delta:[-m/j,n/j],texSize:[this.width,this.height]});return this}function S(b){a.triangleBlur=a.triangleBlur||new h(null,"uniform sampler2D texture;uniform vec2 delta;varying vec2 texCoord;"+r+"void main(){vec4 color=vec4(0.0);float total=0.0;float offset=random(vec3(12.9898,78.233,151.7182),0.0);for(float t=-30.0;t<=30.0;t++){float percent=(t+offset-0.5)/30.0;float weight=1.0-abs(percent);vec4 sample=texture2D(texture,texCoord+delta*percent);sample.rgb*=sample.a;color+=sample*weight;total+=weight;}gl_FragColor=color/total;gl_FragColor.rgb/=gl_FragColor.a+0.00001;}");
i.call(this,a.triangleBlur,{delta:[b/this.width,0]});i.call(this,a.triangleBlur,{delta:[0,b/this.height]});return this}function T(b,d,c){a.zoomBlur=a.zoomBlur||new h(null,"uniform sampler2D texture;uniform vec2 center;uniform float strength;uniform vec2 texSize;varying vec2 texCoord;"+r+"void main(){vec4 color=vec4(0.0);float total=0.0;vec2 toCenter=center-texCoord*texSize;float offset=random(vec3(12.9898,78.233,151.7182),0.0);for(float t=0.0;t<=40.0;t++){float percent=(t+offset)/40.0;float weight=4.0*(percent-percent*percent);vec4 sample=texture2D(texture,texCoord+toCenter*percent*strength/texSize);sample.rgb*=sample.a;color+=sample*weight;total+=weight;}gl_FragColor=color/total;gl_FragColor.rgb/=gl_FragColor.a+0.00001;}");
i.call(this,a.zoomBlur,{center:[b,d],strength:c,texSize:[this.width,this.height]});return this}function U(b,d,c,e){a.colorHalftone=a.colorHalftone||new h(null,"uniform sampler2D texture;uniform vec2 center;uniform float angle;uniform float scale;uniform vec2 texSize;varying vec2 texCoord;float pattern(float angle){float s=sin(angle),c=cos(angle);vec2 tex=texCoord*texSize-center;vec2 point=vec2(c*tex.x-s*tex.y,s*tex.x+c*tex.y)*scale;return(sin(point.x)*sin(point.y))*4.0;}void main(){vec4 color=texture2D(texture,texCoord);vec3 cmy=1.0-color.rgb;float k=min(cmy.x,min(cmy.y,cmy.z));cmy=(cmy-k)/(1.0-k);cmy=clamp(cmy*10.0-3.0+vec3(pattern(angle+0.26179),pattern(angle+1.30899),pattern(angle)),0.0,1.0);k=clamp(k*10.0-5.0+pattern(angle+0.78539),0.0,1.0);gl_FragColor=vec4(1.0-cmy-k,color.a);}");
i.call(this,a.colorHalftone,{center:[b,d],angle:c,scale:Math.PI/e,texSize:[this.width,this.height]});return this}function V(b,d,c,e){a.dotScreen=a.dotScreen||new h(null,"uniform sampler2D texture;uniform vec2 center;uniform float angle;uniform float scale;uniform vec2 texSize;varying vec2 texCoord;float pattern(){float s=sin(angle),c=cos(angle);vec2 tex=texCoord*texSize-center;vec2 point=vec2(c*tex.x-s*tex.y,s*tex.x+c*tex.y)*scale;return(sin(point.x)*sin(point.y))*4.0;}void main(){vec4 color=texture2D(texture,texCoord);float average=(color.r+color.g+color.b)/3.0;gl_FragColor=vec4(vec3(average*10.0-5.0+pattern()),color.a);}");
i.call(this,a.dotScreen,{center:[b,d],angle:c,scale:Math.PI/e,texSize:[this.width,this.height]});return this}function W(b){a.edgeWork1=a.edgeWork1||new h(null,"uniform sampler2D texture;uniform vec2 delta;varying vec2 texCoord;"+r+"void main(){vec2 color=vec2(0.0);vec2 total=vec2(0.0);float offset=random(vec3(12.9898,78.233,151.7182),0.0);for(float t=-30.0;t<=30.0;t++){float percent=(t+offset-0.5)/30.0;float weight=1.0-abs(percent);vec3 sample=texture2D(texture,texCoord+delta*percent).rgb;float average=(sample.r+sample.g+sample.b)/3.0;color.x+=average*weight;total.x+=weight;if(abs(t)<15.0){weight=weight*2.0-1.0;color.y+=average*weight;total.y+=weight;}}gl_FragColor=vec4(color/total,0.0,1.0);}");
a.edgeWork2=a.edgeWork2||new h(null,"uniform sampler2D texture;uniform vec2 delta;varying vec2 texCoord;"+r+"void main(){vec2 color=vec2(0.0);vec2 total=vec2(0.0);float offset=random(vec3(12.9898,78.233,151.7182),0.0);for(float t=-30.0;t<=30.0;t++){float percent=(t+offset-0.5)/30.0;float weight=1.0-abs(percent);vec2 sample=texture2D(texture,texCoord+delta*percent).xy;color.x+=sample.x*weight;total.x+=weight;if(abs(t)<15.0){weight=weight*2.0-1.0;color.y+=sample.y*weight;total.y+=weight;}}float c=clamp(10000.0*(color.y/total.y-color.x/total.x)+0.5,0.0,1.0);gl_FragColor=vec4(c,c,c,1.0);}");
i.call(this,a.edgeWork1,{delta:[b/this.width,0]});i.call(this,a.edgeWork2,{delta:[0,b/this.height]});return this}function X(b,d,c){a.hexagonalPixelate=a.hexagonalPixelate||new h(null,"uniform sampler2D texture;uniform vec2 center;uniform float scale;uniform vec2 texSize;varying vec2 texCoord;void main(){vec2 tex=(texCoord*texSize-center)/scale;tex.y/=0.866025404;tex.x-=tex.y*0.5;vec2 a;if(tex.x+tex.y-floor(tex.x)-floor(tex.y)<1.0)a=vec2(floor(tex.x),floor(tex.y));else a=vec2(ceil(tex.x),ceil(tex.y));vec2 b=vec2(ceil(tex.x),floor(tex.y));vec2 c=vec2(floor(tex.x),ceil(tex.y));vec3 TEX=vec3(tex.x,tex.y,1.0-tex.x-tex.y);vec3 A=vec3(a.x,a.y,1.0-a.x-a.y);vec3 B=vec3(b.x,b.y,1.0-b.x-b.y);vec3 C=vec3(c.x,c.y,1.0-c.x-c.y);float alen=length(TEX-A);float blen=length(TEX-B);float clen=length(TEX-C);vec2 choice;if(alen<blen){if(alen<clen)choice=a;else choice=c;}else{if(blen<clen)choice=b;else choice=c;}choice.x+=choice.y*0.5;choice.y*=0.866025404;choice*=scale/texSize;gl_FragColor=texture2D(texture,choice+center/texSize);}");
i.call(this,a.hexagonalPixelate,{center:[b,d],scale:c,texSize:[this.width,this.height]});return this}function Y(b){a.ink=a.ink||new h(null,"uniform sampler2D texture;uniform float strength;uniform vec2 texSize;varying vec2 texCoord;void main(){vec2 dx=vec2(1.0/texSize.x,0.0);vec2 dy=vec2(0.0,1.0/texSize.y);vec4 color=texture2D(texture,texCoord);float bigTotal=0.0;float smallTotal=0.0;vec3 bigAverage=vec3(0.0);vec3 smallAverage=vec3(0.0);for(float x=-2.0;x<=2.0;x+=1.0){for(float y=-2.0;y<=2.0;y+=1.0){vec3 sample=texture2D(texture,texCoord+dx*x+dy*y).rgb;bigAverage+=sample;bigTotal+=1.0;if(abs(x)+abs(y)<2.0){smallAverage+=sample;smallTotal+=1.0;}}}vec3 edge=max(vec3(0.0),bigAverage/bigTotal-smallAverage/smallTotal);gl_FragColor=vec4(color.rgb-dot(edge,edge)*strength*100000.0,color.a);}");
i.call(this,a.ink,{strength:b*b*b*b*b,texSize:[this.width,this.height]});return this}function Z(b,d,c,e){a.bulgePinch=a.bulgePinch||t("uniform float radius;uniform float strength;uniform vec2 center;","coord-=center;float distance=length(coord);if(distance<radius){float percent=distance/radius;if(strength>0.0){coord*=mix(1.0,smoothstep(0.0,radius/distance,percent),strength*0.75);}else{coord*=mix(1.0,pow(percent,1.0+strength*0.75)*radius/distance,1.0-percent);}}coord+=center;");
i.call(this,a.bulgePinch,{radius:c,strength:o(-1,e,1),center:[b,d],texSize:[this.width,this.height]});return this}function $(b,d,c){a.matrixWarp=a.matrixWarp||t("uniform mat3 matrix;uniform bool useTextureSpace;","if(useTextureSpace)coord=coord/texSize*2.0-1.0;vec3 warp=matrix*vec3(coord,1.0);coord=warp.xy/warp.z;if(useTextureSpace)coord=(coord*0.5+0.5)*texSize;");b=Array.prototype.concat.apply([],b);if(4==b.length)b=
[b[0],b[1],0,b[2],b[3],0,0,0,1];else if(9!=b.length)throw"can only warp with 2x2 or 3x3 matrix";i.call(this,a.matrixWarp,{matrix:d?w(b):b,texSize:[this.width,this.height],useTextureSpace:c|0});return this}function aa(a,d){var c=v.apply(null,d),e=v.apply(null,a),c=w(c);return this.matrixWarp([c[0]*e[0]+c[1]*e[3]+c[2]*e[6],c[0]*e[1]+c[1]*e[4]+c[2]*e[7],c[0]*e[2]+c[1]*e[5]+c[2]*e[8],c[3]*e[0]+c[4]*e[3]+c[5]*e[6],c[3]*e[1]+c[4]*e[4]+c[5]*e[7],c[3]*e[2]+c[4]*e[5]+c[5]*e[8],c[6]*e[0]+c[7]*e[3]+c[8]*e[6],
c[6]*e[1]+c[7]*e[4]+c[8]*e[7],c[6]*e[2]+c[7]*e[5]+c[8]*e[8]])}function ba(b,d,c,e){a.swirl=a.swirl||t("uniform float radius;uniform float angle;uniform vec2 center;","coord-=center;float distance=length(coord);if(distance<radius){float percent=(radius-distance)/radius;float theta=percent*percent*angle;float s=sin(theta);float c=cos(theta);coord=vec2(coord.x*c-coord.y*s,coord.x*s+coord.y*c);}coord+=center;");
i.call(this,a.swirl,{radius:c,center:[b,d],angle:e,texSize:[this.width,this.height]});return this}var l={};(function(){function a(b){if(!b.getExtension("OES_texture_float"))return!1;var c=b.createFramebuffer(),e=b.createTexture();b.bindTexture(b.TEXTURE_2D,e);b.texParameteri(b.TEXTURE_2D,b.TEXTURE_MAG_FILTER,b.NEAREST);b.texParameteri(b.TEXTURE_2D,b.TEXTURE_MIN_FILTER,b.NEAREST);b.texParameteri(b.TEXTURE_2D,b.TEXTURE_WRAP_S,b.CLAMP_TO_EDGE);b.texParameteri(b.TEXTURE_2D,b.TEXTURE_WRAP_T,b.CLAMP_TO_EDGE);
b.texImage2D(b.TEXTURE_2D,0,b.RGBA,1,1,0,b.RGBA,b.UNSIGNED_BYTE,null);b.bindFramebuffer(b.FRAMEBUFFER,c);b.framebufferTexture2D(b.FRAMEBUFFER,b.COLOR_ATTACHMENT0,b.TEXTURE_2D,e,0);c=b.createTexture();b.bindTexture(b.TEXTURE_2D,c);b.texParameteri(b.TEXTURE_2D,b.TEXTURE_MAG_FILTER,b.LINEAR);b.texParameteri(b.TEXTURE_2D,b.TEXTURE_MIN_FILTER,b.LINEAR);b.texParameteri(b.TEXTURE_2D,b.TEXTURE_WRAP_S,b.CLAMP_TO_EDGE);b.texParameteri(b.TEXTURE_2D,b.TEXTURE_WRAP_T,b.CLAMP_TO_EDGE);b.texImage2D(b.TEXTURE_2D,
0,b.RGBA,2,2,0,b.RGBA,b.FLOAT,new Float32Array([2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]));var e=b.createProgram(),d=b.createShader(b.VERTEX_SHADER),f=b.createShader(b.FRAGMENT_SHADER);b.shaderSource(d,"attribute vec2 vertex;void main(){gl_Position=vec4(vertex,0.0,1.0);}");b.shaderSource(f,"uniform sampler2D texture;void main(){gl_FragColor=texture2D(texture,vec2(0.5));}");b.compileShader(d);b.compileShader(f);b.attachShader(e,d);b.attachShader(e,
f);b.linkProgram(e);d=b.createBuffer();b.bindBuffer(b.ARRAY_BUFFER,d);b.bufferData(b.ARRAY_BUFFER,new Float32Array([0,0]),b.STREAM_DRAW);b.enableVertexAttribArray(0);b.vertexAttribPointer(0,2,b.FLOAT,!1,0,0);d=new Uint8Array(4);b.useProgram(e);b.viewport(0,0,1,1);b.bindTexture(b.TEXTURE_2D,c);b.drawArrays(b.POINTS,0,1);b.readPixels(0,0,1,1,b.RGBA,b.UNSIGNED_BYTE,d);return 127===d[0]||128===d[0]}function d(){}function c(a){"OES_texture_float_linear"===a?(void 0===this.$OES_texture_float_linear$&&Object.defineProperty(this,
"$OES_texture_float_linear$",{enumerable:!1,configurable:!1,writable:!1,value:new d}),a=this.$OES_texture_float_linear$):a=n.call(this,a);return a}function e(){var a=m.call(this);-1===a.indexOf("OES_texture_float_linear")&&a.push("OES_texture_float_linear");return a}try{var f=document.createElement("canvas").getContext("experimental-webgl")}catch(k){}if(f&&-1===f.getSupportedExtensions().indexOf("OES_texture_float_linear")&&a(f)){var n=WebGLRenderingContext.prototype.getExtension,m=WebGLRenderingContext.prototype.getSupportedExtensions;
WebGLRenderingContext.prototype.getExtension=c;WebGLRenderingContext.prototype.getSupportedExtensions=e}})();var a;l.canvas=function(){var b=document.createElement("canvas");try{a=b.getContext("experimental-webgl",{premultipliedAlpha:!1})}catch(d){a=null}if(!a)throw"This browser does not support WebGL";b._={gl:a,isInitialized:!1,texture:null,spareTexture:null,flippedShader:null};b.texture=g(y);b.draw=g(C);b.update=g(D);b.replace=g(E);b.contents=g(F);b.getPixelArray=g(G);b.brightnessContrast=g(H);
b.hexagonalPixelate=g(X);b.hueSaturation=g(K);b.colorHalftone=g(U);b.triangleBlur=g(S);b.unsharpMask=g(N);b.perspective=g(aa);b.matrixWarp=g($);b.bulgePinch=g(Z);b.tiltShift=g(R);b.dotScreen=g(V);b.edgeWork=g(W);b.lensBlur=g(Q);b.zoomBlur=g(T);b.noise=g(L);b.denoise=g(J);b.curves=g(I);b.swirl=g(ba);b.ink=g(Y);b.vignette=g(P);b.vibrance=g(O);b.sepia=g(M);b.glitch=g(z);return b};l.splineInterpolate=s;l.ALPHA=6406;l.LUMINANCE=6409;l.LUMINANCE_ALPHA=6410;l.RGB=6407;l.RGBA=6408;l.UNSIGNED_BYTE=5121;l.UNSIGNED_SHORT_4_4_4_4=
32819;l.UNSIGNED_SHORT_5_5_5_1=32820;l.UNSIGNED_SHORT_5_6_5=33635;var h=function(){function b(b,e){var c=a.createShader(b);a.shaderSource(c,e);a.compileShader(c);if(!a.getShaderParameter(c,a.COMPILE_STATUS))throw"compile error: "+a.getShaderInfoLog(c);return c}function d(d,k){this.texCoordAttribute=this.vertexAttribute=null;this.program=a.createProgram();d=d||c;k=k||e;k="precision highp float;"+k;a.attachShader(this.program,b(a.VERTEX_SHADER,d));a.attachShader(this.program,b(a.FRAGMENT_SHADER,k));
a.linkProgram(this.program);if(!a.getProgramParameter(this.program,a.LINK_STATUS))throw"link error: "+a.getProgramInfoLog(this.program);}var c="attribute vec2 vertex;attribute vec2 _texCoord;varying vec2 texCoord;void main(){texCoord=_texCoord;gl_Position=vec4(vertex*2.0-1.0,0.0,1.0);}",e="uniform sampler2D texture;varying vec2 texCoord;void main(){gl_FragColor=texture2D(texture,texCoord);}";d.prototype.destroy=function(){a.deleteProgram(this.program);
this.program=null};d.prototype.uniforms=function(b){a.useProgram(this.program);for(var c in b)if(b.hasOwnProperty(c)){var e=a.getUniformLocation(this.program,c);if(null!==e){var d=b[c];if("[object Array]"==Object.prototype.toString.call(d))switch(d.length){case 1:a.uniform1fv(e,new Float32Array(d));break;case 2:a.uniform2fv(e,new Float32Array(d));break;case 3:a.uniform3fv(e,new Float32Array(d));break;case 4:a.uniform4fv(e,new Float32Array(d));break;case 9:a.uniformMatrix3fv(e,!1,new Float32Array(d));
break;case 16:a.uniformMatrix4fv(e,!1,new Float32Array(d));break;default:throw"dont't know how to load uniform \""+c+'" of length '+d.length;}else if("[object Number]"==Object.prototype.toString.call(d))a.uniform1f(e,d);else throw'attempted to set uniform "'+c+'" to invalid value '+(d||"undefined").toString();}}return this};d.prototype.textures=function(b){a.useProgram(this.program);for(var e in b)b.hasOwnProperty(e)&&a.uniform1i(a.getUniformLocation(this.program,e),b[e]);return this};d.prototype.drawRect=
function(b,e,c,d){var j=a.getParameter(a.VIEWPORT),e=void 0!==e?(e-j[1])/j[3]:0,b=void 0!==b?(b-j[0])/j[2]:0,c=void 0!==c?(c-j[0])/j[2]:1,d=void 0!==d?(d-j[1])/j[3]:1;null==a.vertexBuffer&&(a.vertexBuffer=a.createBuffer());a.bindBuffer(a.ARRAY_BUFFER,a.vertexBuffer);a.bufferData(a.ARRAY_BUFFER,new Float32Array([b,e,b,d,c,e,c,d]),a.STATIC_DRAW);null==a.texCoordBuffer&&(a.texCoordBuffer=a.createBuffer(),a.bindBuffer(a.ARRAY_BUFFER,a.texCoordBuffer),a.bufferData(a.ARRAY_BUFFER,new Float32Array([0,0,
0,1,1,0,1,1]),a.STATIC_DRAW));null==this.vertexAttribute&&(this.vertexAttribute=a.getAttribLocation(this.program,"vertex"),a.enableVertexAttribArray(this.vertexAttribute));null==this.texCoordAttribute&&(this.texCoordAttribute=a.getAttribLocation(this.program,"_texCoord"),a.enableVertexAttribArray(this.texCoordAttribute));a.useProgram(this.program);a.bindBuffer(a.ARRAY_BUFFER,a.vertexBuffer);a.vertexAttribPointer(this.vertexAttribute,2,a.FLOAT,!1,0,0);a.bindBuffer(a.ARRAY_BUFFER,a.texCoordBuffer);
a.vertexAttribPointer(this.texCoordAttribute,2,a.FLOAT,!1,0,0);a.drawArrays(a.TRIANGLE_STRIP,0,4)};d.getDefaultShader=function(){a.defaultShader=a.defaultShader||new d;return a.defaultShader};return d}();x.prototype.interpolate=function(a){for(var d=0,c=this.ya.length-1;1<c-d;){var e=c+d>>1;this.xa[e]>a?c=e:d=e}var e=this.xa[c]-this.xa[d],f=(this.xa[c]-a)/e,a=(a-this.xa[d])/e;return f*this.ya[d]+a*this.ya[c]+((f*f*f-f)*this.y2[d]+(a*a*a-a)*this.y2[c])*e*e/6};var q=function(){function b(b,c,d,g){this.gl=
a;this.id=a.createTexture();this.width=b;this.height=c;this.format=d;this.type=g;a.bindTexture(a.TEXTURE_2D,this.id);a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MAG_FILTER,a.LINEAR);a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MIN_FILTER,a.LINEAR);a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_S,a.CLAMP_TO_EDGE);a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_T,a.CLAMP_TO_EDGE);b&&c&&a.texImage2D(a.TEXTURE_2D,0,this.format,b,c,0,this.format,this.type,null)}function d(a){null==c&&(c=document.createElement("canvas"));
c.width=a.width;c.height=a.height;a=c.getContext("2d");a.clearRect(0,0,c.width,c.height);return a}b.fromElement=function(c){var d=new b(0,0,a.RGBA,a.UNSIGNED_BYTE);d.loadContentsOf(c);return d};b.prototype.loadContentsOf=function(b){this.width=b.width||b.videoWidth;this.height=b.height||b.videoHeight;a.bindTexture(a.TEXTURE_2D,this.id);a.texImage2D(a.TEXTURE_2D,0,this.format,this.format,this.type,b)};b.prototype.initFromBytes=function(b,c,d){this.width=b;this.height=c;this.format=a.RGBA;this.type=
a.UNSIGNED_BYTE;a.bindTexture(a.TEXTURE_2D,this.id);a.texImage2D(a.TEXTURE_2D,0,a.RGBA,b,c,0,a.RGBA,this.type,new Uint8Array(d))};b.prototype.destroy=function(){a.deleteTexture(this.id);this.id=null};b.prototype.use=function(b){a.activeTexture(a.TEXTURE0+(b||0));a.bindTexture(a.TEXTURE_2D,this.id)};b.prototype.unuse=function(b){a.activeTexture(a.TEXTURE0+(b||0));a.bindTexture(a.TEXTURE_2D,null)};b.prototype.ensureFormat=function(b,c,d,g){if(1==arguments.length)var h=arguments[0],b=h.width,c=h.height,
d=h.format,g=h.type;if(b!=this.width||c!=this.height||d!=this.format||g!=this.type)this.width=b,this.height=c,this.format=d,this.type=g,a.bindTexture(a.TEXTURE_2D,this.id),a.texImage2D(a.TEXTURE_2D,0,this.format,b,c,0,this.format,this.type,null)};b.prototype.drawTo=function(b){a.framebuffer=a.framebuffer||a.createFramebuffer();a.bindFramebuffer(a.FRAMEBUFFER,a.framebuffer);a.framebufferTexture2D(a.FRAMEBUFFER,a.COLOR_ATTACHMENT0,a.TEXTURE_2D,this.id,0);if(a.checkFramebufferStatus(a.FRAMEBUFFER)!==
a.FRAMEBUFFER_COMPLETE)throw Error("incomplete framebuffer");a.viewport(0,0,this.width,this.height);b();a.bindFramebuffer(a.FRAMEBUFFER,null)};var c=null;b.prototype.fillUsingCanvas=function(b){b(d(this));this.format=a.RGBA;this.type=a.UNSIGNED_BYTE;a.bindTexture(a.TEXTURE_2D,this.id);a.texImage2D(a.TEXTURE_2D,0,a.RGBA,a.RGBA,a.UNSIGNED_BYTE,c);return this};b.prototype.toImage=function(b){this.use();h.getDefaultShader().drawRect();var f=4*this.width*this.height,g=new Uint8Array(f),i=d(this),m=i.createImageData(this.width,
this.height);a.readPixels(0,0,this.width,this.height,a.RGBA,a.UNSIGNED_BYTE,g);for(var j=0;j<f;j++)m.data[j]=g[j];i.putImageData(m,0,0);b.src=c.toDataURL()};b.prototype.swapWith=function(a){var b;b=a.id;a.id=this.id;this.id=b;b=a.width;a.width=this.width;this.width=b;b=a.height;a.height=this.height;this.height=b;b=a.format;a.format=this.format;this.format=b};return b}(),r="float random(vec3 scale,float seed){return fract(sin(dot(gl_FragCoord.xyz+seed,scale))*43758.5453+seed);}",
A=function(a,d){var c=a._.gl;a.draw(d);var e=a.getPixelArray(),f,g,h,i,j;this.width=function(a){f=a=a||d._.width;return this};this.height=function(a){g=a=a||d._.height;return this};this.shortenX=function(a){f=d._.width-(a||0);return this};this.shortenY=function(a){g=d._.height-(a||0);return this};this.type=function(a){switch(a){case l.UNSIGNED_BYTE:case l.UNSIGNED_SHORT_5_6_5:case l.UNSIGNED_SHORT_4_4_4_4:case l.UNSIGNED_SHORT_5_5_5_1:i=a;break;default:console.log("[GLITCH TYPE ERROR] type supports only fx.UNSIGNED_BYTE, fx.UNSIGNED_SHORT_5_6_5, fx.UNSIGNED_SHORT_4_4_4_4, fx.UNSIGNED_SHORT_5_5_5_1.")}return this};
this.format=function(a){switch(a){case l.ALPHA:case l.LUMINANCE:case l.LUMINANCE_ALPHA:case l.RGB:case l.RGBA:h=a;break;default:console.log("[GLITCH FORMAT ERROR] format supports only fx.ALPHA, fx.LUMINANCE, fx.LUMINANCE_ALPHA, fx.RGB and fx.RGBA.")}return this};this.offset=function(a){for(var b=e.subarray(0,a),a=e.subarray(a,e.length),c=new Uint8Array(e.length),d=0,f=0;f<a.length;f++)c[d]=a[f],d++;for(f=0;f<b.length;f++)c[d]=b[f],d++;e=c;return this};this.length=function(){return e.length()};this.process=
function(a){j=a||function(){};return this};this.update=function(){f=f||d._.width;g=g||d._.height;h=h||l.RGBA;i=i||l.UNSIGNED_BYTE;j=j||function(){};j(e);c.bindTexture(c.TEXTURE_2D,d._.id);c.texImage2D(c.TEXTURE_2D,0,h,f,g,0,h,i,e);a.draw(d).update();return this}};return l}();
