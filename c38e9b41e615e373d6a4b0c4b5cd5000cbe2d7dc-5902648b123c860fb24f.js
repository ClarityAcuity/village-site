(self.webpackChunkvillage=self.webpackChunkvillage||[]).push([[700,131],{8829:function(t,r,e){"use strict";e.d(r,{gJ:function(){return P},D4:function(){return U},N_:function(){return F},xI:function(){return _}});var n=e(7757),i=e.n(n),a=function(){function t(t,r,e){this.e=[t,r,e]}var r=t.prototype;return r.x=function(){return this.e[0]},r.y=function(){return this.e[1]},r.z=function(){return this.e[2]},r.r=function(){return this.e[0]},r.g=function(){return this.e[1]},r.b=function(){return this.e[2]},r.identical=function(){return new t(this.e[0],this.e[1],this.e[2])},r.opposite=function(){return new t(-this.e[0],-this.e[1],-this.e[2])},r.addVector=function(t){var r=this.identical();return r.e[0]+=t.e[0],r.e[1]+=t.e[1],r.e[2]+=t.e[2],r},r.subtractVector=function(t){var r=this.identical();return r.e[0]-=t.e[0],r.e[1]-=t.e[1],r.e[2]-=t.e[2],r},r.multiplyVector=function(t){var r=this.identical();return r.e[0]*=t.e[0],r.e[1]*=t.e[1],r.e[2]*=t.e[2],r},r.multiplyScalar=function(t){var r=this.identical();return r.e[0]*=t,r.e[1]*=t,r.e[2]*=t,r},r.divideScaler=function(t){var r=this.identical(),e=1/t;return r.e[0]*=e,r.e[1]*=e,r.e[2]*=e,r},r.length=function(){return Math.sqrt(this.e[0]*this.e[0]+this.e[1]*this.e[1]+this.e[2]*this.e[2])},r.squaredLength=function(){return this.e[0]*this.e[0]+this.e[1]*this.e[1]+this.e[2]*this.e[2]},r.makeUnitVector=function(){var t=1/Math.sqrt(this.e[0]*this.e[0]+this.e[1]*this.e[1]+this.e[2]*this.e[2]),r=this.identical();return r.e[0]*=t,r.e[1]*=t,r.e[2]*=t,r},t}();function o(t,r){return t.e[0]*r.e[0]+t.e[1]*r.e[1]+t.e[2]*r.e[2]}function u(t,r){return new a(t.e[1]*r.e[2]-t.e[2]*r.e[1],-(t.e[0]*r.e[2]-t.e[2]*r.e[0]),t.e[0]*r.e[1]-t.e[1]*r.e[0])}function c(t){return t.identical().divideScaler(t.length())}function s(t,r){return t.subtractVector(r.multiplyScalar(2*o(t,r)))}function h(t,r,e){return new a(t,r,e)}var l=e(1788),f=function(){function t(){}return t.prototype.hit=function(t,r,e,n){},t}();function d(t,r,e,n){var i=t.center,a=t.radius,o=t.material,u=r.pointAtParameter(e);n.t=e,n.p=u,n.normal=u.subtractVector(i).divideScaler(a),n.material=o}var v=function(t){function r(r,e,n){var i;return(i=t.call(this)||this).center=r,i.radius=e,i.material=n,i}return(0,l.Z)(r,t),r.prototype.hit=function(t,r,e,n){var i=t.origin().subtractVector(this.center),a=o(t.direction(),t.direction()),u=o(i,t.direction()),c=u*u-a*(o(i,i)-this.radius*this.radius);if(c>0){var s=(-u-Math.sqrt(c))/a;if(s<e&&s>r)return d(this,t,s,n),!0;var h=(-u+Math.sqrt(c))/a;if(h<e&&h>r)return d(this,t,h,n),!0}return!1},r}(f);function p(t,r,e){return new v(t,r,e)}var m=function(t){function r(r,e){var n;return(n=t.call(this)||this).list=r,n.listSize=e,n}return(0,l.Z)(r,t),r.prototype.hit=function(t,r,e,n){for(var i={material:n.material},a=!1,o=e,u=0;u<this.listSize;u++){this.list[u].hit(t,r,o,i)&&(a=!0,o=i.t,n=i)}return{hitAnything:a,closestSoFar:o,hitRecord:n}},r}(f);var g=function(){function t(t,r){this.A=t,this.B=r}var r=t.prototype;return r.origin=function(){return this.A},r.direction=function(){return this.B},r.pointAtParameter=function(t){return this.A.addVector(this.B.multiplyScalar(t))},t}();function R(t,r){return new g(t,r)}var T=function(){function t(t){var r=t.lookFrom,e=void 0===r?h(0,0,0):r,n=t.lookAt,i=void 0===n?h(0,0,-1):n,a=t.vUp,o=void 0===a?h(0,1,0):a,s=t.vFov,l=void 0===s?20:s,f=t.aspect,d=void 0===f?2:f,v=t.aperture,p=void 0===v?0:v,m=t.focusDist,g=void 0===m?1:m;this.lensRadius=p/2;var R=l*Math.PI/180,T=Math.tan(R/2),A=d*T;this.origin=e;var S=c(e.subtractVector(i));this.u=c(u(o,S)),this.v=u(S,this.u),this.lowerLeftCorner=this.origin.subtractVector(this.u.multiplyScalar(A*g)).subtractVector(this.v.multiplyScalar(T*g)).subtractVector(S.multiplyScalar(g)),this.horizontal=this.u.multiplyScalar(2*A*g),this.vertical=this.v.multiplyScalar(2*T*g)}return t.prototype.getRay=function(t,r){var e=function(){var t;do{t=h(Math.random(),Math.random(),0).multiplyScalar(2).subtractVector(h(1,1,0))}while(o(t,t)>=1);return t}().multiplyScalar(this.lensRadius),n=this.u.multiplyScalar(e.x()).addVector(this.v.multiplyScalar(e.y()));return R(this.origin.addVector(n),this.lowerLeftCorner.addVector(this.horizontal.multiplyScalar(t)).addVector(this.vertical.multiplyScalar(r)).subtractVector(this.origin).subtractVector(n))},t}();function A(t){var r=t.lookFrom,e=t.lookAt,n=t.vUp,i=t.vFov,a=t.aspect,o=t.aperture,u=t.focusDist;return new T({lookFrom:r,lookAt:e,vUp:n,vFov:i,aspect:a,aperture:o,focusDist:u})}var S=function(){},x=function(t){function r(r){var e;return(e=t.call(this)||this).albedo=r,e}return(0,l.Z)(r,t),r.prototype.scatter=function(t,r){var e=r.p,n=r.normal,i=e.addVector(n).addVector(F());return{isScatter:!0,scattered:R(e,i.subtractVector(e)),attenuation:this.albedo}},r}(S),b=function(t){function r(r,e){var n;return(n=t.call(this)||this).albedo=r,n.fuzz=e<1?e:1,n}return(0,l.Z)(r,t),r.prototype.scatter=function(t,r){var e=r.p,n=r.normal,i=R(e,s(c(t.direction()),n).addVector(F().multiplyScalar(this.fuzz))),a=this.albedo;return{isScatter:o(i.direction(),n)>0,scattered:i,attenuation:a}},r}(S),E=function(t){function r(r){var e;return(e=t.call(this)||this).refIndex=r,e}return(0,l.Z)(r,t),r.prototype.scatter=function(t,r){var e,n,i,a,u=r.p,l=r.normal,f=s(c(t.direction()),l),d=h(1,1,1);o(t.direction(),l)>0?(e=l.opposite(),n=this.refIndex,a=this.refIndex*o(t.direction(),l)/t.direction().length()):(e=l,n=1/this.refIndex,a=-o(t.direction(),l)/t.direction().length());var v=function(t,r,e){var n,i=c(t),a=o(i,r),u=1-e*e*(1-a*a);return u>0&&(n=i.subtractVector(r.multiplyScalar(a)).multiplyScalar(e).subtractVector(r.multiplyScalar(Math.sqrt(u)))),{isRefracted:u>0,refracted:n}}(t.direction(),e,n),p=v.isRefracted,m=v.refracted;return p?i=function(t,r){var e=(1-r)/(1+r);return(e*=e)+(1-e)*Math.pow(1-t,5)}(a,this.refIndex):(R(u,f),i=1),{isScatter:!0,scattered:Math.random()<i?R(u,f):R(u,m),attenuation:d}},r}(S);var y=function(t){return new x(t)},M=function(t,r){return new b(t,r)},V=function(t){return new E(t)},w=i().mark(P);function _(t,r,e,n){var i=t+e,a=r+n;return[t,r,i,r,t,a,t,a,i,r,i,a]}function F(){var t=h();do{t=h(Math.random(),Math.random(),Math.random()).subtractVector(h(1,1,1))}while(t.squaredLength()>=1);return t}function L(t,r,e){var n=r.hit(t,0,1/0,{}),i=n.hitAnything,a=n.hitRecord;if(i){var o=a.material.scatter(t,a),u=o.isScatter,s=o.scattered,l=o.attenuation;return e<50&&u?l.multiplyVector(L(s,r,e+1)):h(0,0,0)}var f=.5*(c(t.direction()).y()+1);return h(1,1,1).multiplyScalar(1-f).addVector(h(.5,.7,1).multiplyScalar(f))}function U(t,r){for(var e=function(){var t=[];t.push(p(h(0,-1e3,0),1e3,y(h(.5,.5,.5))));for(var r=-9;r<9;r+=3)for(var e=-9;e<9;e+=3){var n=Math.random(),i=h(r+2*Math.random(),.3,e+2*Math.random());i.subtractVector(h(4,.2,0)).length()>.9&&(n<.8?t.push(p(i,.3,y(h(Math.random()*Math.random(),Math.random()*Math.random(),Math.random()*Math.random())))):n<.95?t.push(p(i,.3,M(h(.5*(1+Math.random()),.5*(1+Math.random()),.5*(1+Math.random())),.5*Math.random()))):t.push(p(i,.3,V(1.5))))}return t.push(p(h(0,1,0),1,V(1.5))),t.push(p(h(-4,1,0),1,y(h(.4,.2,.1)))),t.push(p(h(4,1,0),1,M(h(.7,.6,.5),0))),function(t,r){return new m(t,r)}(t,t.length)}(),n=[],i=[],a=r-1;a>=0;a--){for(var o=[],u=0;u<t;u++)n.push(-1),n.push(-1),n.push(-1),n.push(255),o.push(h(0,0,0));i.push(o)}return{image:n,colorMap:i,scene:e}}function P(t){var r,e,n,a,o,u,c,s,l,f;return i().wrap((function(i){for(;;)switch(i.prev=i.next){case 0:return f=function(){for(var t=[],i=n-1;i>=0;i--)for(var u=0;u<e;u++){var c=(u+Math.random())/e,s=(i+Math.random())/n,h=l.getRay(c,s);a[i][u]=a[i][u].identical().addVector(L(h,r,0));var f=a[i][u].divideScaler(o),d=255.99*Math.sqrt(f.e[0]),v=255.99*Math.sqrt(f.e[1]),p=255.99*Math.sqrt(f.e[2]);t.push(d),t.push(v),t.push(p),t.push(255)}return{image:t,colorMap:a}},r=t.scene,e=t.width,n=t.height,a=t.colorMap,o=t.iteration,u=h(12,2,4),c=h(0,0,0),s=u.subtractVector(c).length(),.1,l=A({lookFrom:u,lookAt:c,vUp:h(0,1,0),vFov:20,aspect:e/n,aperture:.1,focusDist:s}),i.next=9,f();case 9:case"end":return i.stop()}}),w)}},2265:function(t,r,e){"use strict";e.r(r),e.d(r,{default:function(){return s}});var n=e(7294),i=e(1526),a=e(8829);function o(t,r,e){var n=t.createShader(r);return t.shaderSource(n,e),t.compileShader(n),t.getShaderParameter(n,t.COMPILE_STATUS)?n:(alert("An error occurred compiling the shaders: "+t.getShaderInfoLog(n)),t.deleteShader(n),null)}var u=[0,0,1,0,0,1,0,1,1,0,1,1];function c(t,r){if(t){t.createProgram();var e=function(t,r,e){var n=o(t,t.VERTEX_SHADER,r),i=o(t,t.FRAGMENT_SHADER,e),a=t.createProgram();return t.attachShader(a,n),t.attachShader(a,i),t.linkProgram(a),t.getProgramParameter(a,t.LINK_STATUS)?a:(alert("Unable to initialize the shader program: "+t.getProgramInfoLog(a)),null)}(t,"#define GLSLIFY 1\nattribute vec2 aVertexPosition;\nattribute vec2 aVertexTexCoord;\n\nuniform vec2 uResolution;\n\nvarying vec2 vTexCoord;\n\nvoid main() {\n    // convert the rectangle from pixels to 0.0 to 1.0\n   vec2 zeroToOne = aVertexPosition / uResolution;\n\n   // convert from 0->1 to 0->2\n   vec2 zeroToTwo = zeroToOne * 2.0;\n\n   // convert from 0->2 to -1->+1 (clipspace)\n   vec2 clipSpace = zeroToTwo - 1.0;\n\n   gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);\n\n   // pass the texCoord to the fragment shader\n   // The GPU will interpolate this value between points.\n   vTexCoord = aVertexTexCoord;\n}\n","precision mediump float;\n#define GLSLIFY 1\n\n// our texture\nuniform sampler2D tex;\n\n// the texCoords passed in from the vertex shader.\nvarying vec2 vTexCoord;\n\nvoid main() {\n   gl_FragColor = texture2D(tex, vTexCoord);\n}\n"),n={program:e,attribLocations:{vertexPosition:t.getAttribLocation(e,"aVertexPosition"),texCoordLocation:t.getAttribLocation(e,"aVertexTexCoord")},uniformLocations:{resolutionUniformLocation:t.getUniformLocation(e,"uResolution")}},i=function(t,r){var e=t.canvas,n=e.width,i=e.height,o=(0,a.xI)(0,0,n,i),c=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,c),t.bufferData(t.ARRAY_BUFFER,new Float32Array(o),t.STATIC_DRAW);var s=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,s),t.bufferData(t.ARRAY_BUFFER,new Float32Array(u),t.STATIC_DRAW);var h=t.createTexture();return t.bindTexture(t.TEXTURE_2D,h),t.texImage2D(t.TEXTURE_2D,0,t.RGBA,n,i,0,t.RGBA,t.UNSIGNED_BYTE,new Uint8Array(r)),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.NEAREST),{position:c,texCoord:s}}(t,r);!function(t,r,e){var n=t.canvas,i=n.width,a=n.height;t.viewport(0,0,i,a),t.clearColor(0,0,0,1),t.clear(t.COLOR_BUFFER_BIT),t.useProgram(r.program);var o=r.attribLocations.vertexPosition,u=t.FLOAT;t.bindBuffer(t.ARRAY_BUFFER,e.position),t.vertexAttribPointer(o,2,u,!1,0,0),t.enableVertexAttribArray(o);var c=r.attribLocations.texCoordLocation,s=t.FLOAT;t.bindBuffer(t.ARRAY_BUFFER,e.texCoord),t.vertexAttribPointer(c,2,s,!1,0,0),t.enableVertexAttribArray(c),t.uniform2f(r.uniformLocations.resolutionUniformLocation,i,a);var h=t.TRIANGLES;t.drawArrays(h,0,6)}(t,n,i)}else alert("Unable to initialize WebGL. Your browser or machine may not support it.")}var s=function(t){var r=t.width,e=t.height,a=t.image,o=(0,n.useRef)();return(0,n.useEffect)((function(){o.current&&c(o.current,a)}),[a]),n.createElement(i.default,{contextRef:function(t){o.current=t},width:r,height:e})}},1526:function(t,r,e){"use strict";e.r(r);var n=e(7294);function i(t){var r=t.width,e=t.height,i=t.contextRef;return n.createElement("canvas",{width:r,height:e,ref:function(t){return t?i(t.getContext("webgl")):null}})}function a(){return!1}r.default=(0,n.memo)(i,a)}}]);
//# sourceMappingURL=c38e9b41e615e373d6a4b0c4b5cd5000cbe2d7dc-5902648b123c860fb24f.js.map