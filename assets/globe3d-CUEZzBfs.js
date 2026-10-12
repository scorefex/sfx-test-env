import{W as se,S as le,a as ve,P as de,V as oe,G as F,M as Y,l as Z,m as L,n as ee,o as he,p as me,F as w,q as ue,C as fe,i as d}from"./three.module-BV2aXcp9.js";const ae=[{code:"ENG",anchors:[[51.51,-.12,1.4],[53.48,-2.24,1],[53.41,-2.98,.8],[52.48,-1.9,.8],[53.8,-1.55,.6],[54.97,-1.61,.6],[51.45,-2.59,.5],[50.9,-1.4,.5],[52.63,1.3,.4],[52.95,-1.15,.5],[50.37,-4.14,.3],[53.38,-1.47,.5],[52.2,.12,.4]]},{code:"ESP",anchors:[[40.42,-3.7,1.2],[41.39,2.17,1],[37.39,-5.98,.7],[39.47,-.38,.6],[43.26,-2.93,.5],[36.72,-4.42,.5],[41.65,-.89,.4],[43.36,-8.41,.4],[42.24,-8.72,.4],[37.98,-1.13,.4],[38.35,-.48,.4],[41.65,-4.72,.3],[39.57,2.65,.3]]},{code:"ITA",anchors:[[45.46,9.19,1],[41.9,12.5,1],[45.07,7.69,.6],[40.85,14.27,.7],[44.49,11.34,.5],[43.77,11.25,.5],[45.44,12.32,.4],[44.41,8.93,.4],[38.12,13.36,.4],[41.12,16.87,.4],[45.65,13.77,.3],[39.22,9.12,.3]]},{code:"GER",anchors:[[48.14,11.58,.9],[51.51,7.47,.7],[52.52,13.4,.9],[53.55,9.99,.7],[50.94,6.96,.6],[51.23,6.78,.5],[50.11,8.68,.6],[48.78,9.18,.5],[51.34,12.37,.5],[52.37,9.73,.4],[53.08,8.8,.4],[49.45,11.08,.4],[51.05,13.74,.4],[54.32,10.13,.3]]},{code:"FRA",anchors:[[48.86,2.35,1.3],[43.3,5.37,.7],[45.76,4.84,.7],[50.63,3.06,.5],[43.6,1.44,.5],[44.84,-.58,.5],[47.22,-1.55,.5],[43.7,7.27,.5],[48.57,7.75,.4],[48.11,-1.68,.4],[49.26,4.03,.3],[47.32,5.04,.3],[45.19,5.72,.3]]},{code:"NED",anchors:[[52.37,4.9,.8],[51.92,4.48,.6],[52.09,5.12,.5],[51.44,5.47,.5],[53.22,6.57,.3],[52.22,6.89,.3]]},{code:"POR",anchors:[[38.72,-9.14,.8],[41.15,-8.61,.7],[40.2,-8.41,.4],[37.02,-7.93,.3],[41.55,-8.42,.4]]},{code:"BEL",anchors:[[50.85,4.35,.7],[51.22,4.4,.5],[51.05,3.72,.4],[50.63,5.57,.4],[51.21,3.22,.3]]},{code:"SCO",anchors:[[55.86,-4.25,.8],[55.95,-3.19,.6],[57.15,-2.09,.4],[56.46,-2.97,.4]]},{code:"TUR",anchors:[[41,28.97,1.1],[39.93,32.86,.7],[38.42,27.14,.6],[36.9,30.7,.4],[37,35.32,.5],[40.19,29.06,.4],[41,39.72,.4],[37.87,32.48,.4],[39.9,41.27,.3],[37.07,37.38,.4]]},{code:"NOR",anchors:[[59.91,10.75,.6],[60.39,5.32,.5],[63.43,10.39,.4],[58.97,5.73,.4],[67.28,14.4,.3],[69.65,18.96,.3]]},{code:"KSA",anchors:[[24.71,46.68,1.1],[21.49,39.19,.9],[26.42,50.09,.6],[21.39,39.86,.5],[24.47,39.61,.5],[18.22,42.5,.3],[26.33,43.97,.3],[28.38,36.57,.3]]},{code:"BRA",anchors:[[-23.55,-46.63,1.1],[-22.9,-43.2,.9],[-19.92,-43.94,.6],[-30.03,-51.23,.6],[-25.43,-49.27,.5],[-15.79,-47.88,.5],[-12.97,-38.5,.5],[-8.05,-34.9,.5],[-3.73,-38.52,.5],[-3.1,-60.02,.3],[-16.68,-49.25,.3],[-1.46,-48.5,.3],[-27.6,-48.55,.3]]}],pe=[[53.35,-6.26,.5],[48.2,16.37,.6],[47.5,19.04,.6],[50.08,14.43,.6],[52.23,21,.7],[44.43,26.1,.6],[42.7,23.32,.4],[37.98,23.73,.7],[55.75,37.6,1.1],[59.93,30.33,.6],[50.45,30.52,.7],[59.33,18.06,.5],[55.68,12.57,.5],[60.17,24.94,.4],[25.28,51.53,.6],[25.2,55.27,.8],[24.45,54.38,.5],[29.37,47.98,.5],[31.95,35.93,.5],[33.89,35.5,.4],[30.04,31.24,1.1],[31.2,29.92,.6],[33.57,-7.59,.7],[36.75,3.06,.6],[36.8,10.18,.5],[35.69,51.39,.9],[33.31,44.36,.6],[6.52,3.38,.7],[5.6,-.19,.4],[-1.29,36.82,.4],[-26.2,28.04,.6],[40.71,-74,1],[19.43,-99.13,.8],[-34.6,-58.4,.8],[4.71,-74.07,.5],[35.68,139.69,.9],[37.56,126.97,.7],[19.07,72.88,.7],[28.61,77.21,.7]],s=ae.length+1,te=(i,r,c=1)=>{const a=d.degToRad(90-i),l=d.degToRad(r+180);return new oe(-Math.sin(a)*Math.cos(l)*c,Math.cos(a)*c,Math.sin(a)*Math.sin(l)*c)},ge=`
vec3 hash3(vec3 p){p=vec3(dot(p,vec3(127.1,311.7,74.7)),dot(p,vec3(269.5,183.3,246.1)),dot(p,vec3(113.5,271.9,124.6)));return -1.0+2.0*fract(sin(p)*43758.5453123);}
float noise(vec3 p){vec3 i=floor(p);vec3 f=fract(p);vec3 u=f*f*(3.0-2.0*f);
return mix(mix(mix(dot(hash3(i+vec3(0,0,0)),f-vec3(0,0,0)),dot(hash3(i+vec3(1,0,0)),f-vec3(1,0,0)),u.x),
mix(dot(hash3(i+vec3(0,1,0)),f-vec3(0,1,0)),dot(hash3(i+vec3(1,1,0)),f-vec3(1,1,0)),u.x),u.y),
mix(mix(dot(hash3(i+vec3(0,0,1)),f-vec3(0,0,1)),dot(hash3(i+vec3(1,0,1)),f-vec3(1,0,1)),u.x),
mix(dot(hash3(i+vec3(0,1,1)),f-vec3(0,1,1)),dot(hash3(i+vec3(1,1,1)),f-vec3(1,1,1)),u.x),u.y),u.z);}
float fbm(vec3 p){float v=0.0;float a=0.5;for(int i=0;i<5;i++){v+=a*noise(p);p*=2.03;a*=0.5;}return v;}
`;function xe(i){const r=new se({canvas:i,antialias:!0,alpha:!0,powerPreference:"high-performance"});r.setPixelRatio(Math.min(2,window.devicePixelRatio||1)),r.outputColorSpace=le;const c=new ve,a=new de(30,1,.1,50),l=new oe(-.25,.75,-.6).normalize(),v=new F,x=new F,p=new F;v.add(x),x.add(p),c.add(v);const G=new Y(new Z(1,160,120),new L({uniforms:{uSun:{value:l},uTime:{value:0}},vertexShader:`
        varying vec3 vN; varying vec3 vLocal; varying vec3 vView;
        void main(){
          vLocal = position;
          vN = normalize(mat3(modelMatrix) * normal);
          vec4 wp = modelMatrix * vec4(position,1.0);
          vView = normalize(cameraPosition - wp.xyz);
          gl_Position = projectionMatrix * viewMatrix * wp;
        }`,fragmentShader:`
        uniform vec3 uSun; uniform float uTime;
        varying vec3 vN; varying vec3 vLocal; varying vec3 vView;
        ${ge}
        void main(){
          vec3 n = normalize(vN);
          float light = dot(n, uSun);
          float day = smoothstep(-0.25, 0.55, light);
          // Cloud streaks, stretched along the latitude
          vec3 q = vLocal * vec3(4.2, 11.0, 4.2) + vec3(uTime * 0.012, 0.0, 0.0);
          float c = fbm(q + fbm(q * 0.7) * 1.4);
          float clouds = smoothstep(0.16, 0.55, c) * 0.75;
          // Land relief, barely visible on the night side
          float relief = fbm(vLocal * 4.0) * 0.5 + 0.5;
          vec3 col = vec3(0.010, 0.012, 0.016) + relief * 0.012;
          col += clouds * vec3(0.78, 0.82, 0.88) * day * 0.7;
          col += clouds * vec3(0.05, 0.06, 0.08) * (1.0 - day);
          // Thin bright rim where the sun grazes the horizon
          float fres = pow(1.0 - max(dot(n, vView), 0.0), 3.0);
          col += fres * vec3(0.55, 0.68, 0.9) * (0.15 + day * 1.6);
          gl_FragColor = vec4(col, 1.0);
        }`}));p.add(G);const ne=new Y(new Z(1.08,96,64),new L({uniforms:{uSun:{value:l}},vertexShader:`
        varying vec3 vN; varying vec3 vView;
        void main(){
          vN = normalize(mat3(modelMatrix) * normal);
          vec4 wp = modelMatrix * vec4(position,1.0);
          vView = normalize(cameraPosition - wp.xyz);
          gl_Position = projectionMatrix * viewMatrix * wp;
        }`,fragmentShader:`
        uniform vec3 uSun; varying vec3 vN; varying vec3 vView;
        void main(){
          float rim = pow(clamp(1.0 + dot(vN, vView) * 1.0, 0.0, 1.0), 5.0);
          float lit = smoothstep(-0.3, 0.8, dot(normalize(vN), uSun));
          gl_FragColor = vec4(vec3(0.62, 0.74, 1.0) * rim * (0.25 + lit * 1.8), rim);
        }`,side:he,transparent:!0,blending:ee,depthWrite:!1}));v.add(ne);let V=11;const g=()=>(V=V*16807%2147483647)/2147483647,H=()=>Math.sqrt(-2*Math.log(Math.max(1e-6,g())))*Math.cos(2*Math.PI*g()),_=[],k=[],O=[],q=[],B=(t,e,o,n,f)=>{const T=Math.round(60*o);for(let N=0;N<T;N++){const E=N<5,X=E?.22:f*(.7+o*.6),C=te(t+H()*X*.8,e+H()*X,1.002);_.push(C.x,C.y,C.z),k.push(E?3*o+1.4:.8+g()*1.5),O.push(E?1:.35+g()*.5),q.push(n)}};ae.forEach((t,e)=>t.anchors.forEach(([o,n,f])=>B(o,n,f,e,e===12?1.6:.9))),pe.forEach(([t,e,o])=>B(t,e,o,s-1,1.4));const h=new me;h.setAttribute("position",new w(_,3)),h.setAttribute("aSize",new w(k,1)),h.setAttribute("aGlow",new w(O,1)),h.setAttribute("aNation",new w(q,1));const M=new Array(s).fill(1),I=new Array(s).fill(1),W=new ue(h,new L({uniforms:{uSun:{value:l},uPx:{value:1},uAct:{value:M}},vertexShader:`
        attribute float aSize; attribute float aGlow; attribute float aNation; uniform vec3 uSun; uniform float uPx;
        uniform float uAct[${s}];
        varying float vA; varying float vHot;
        void main(){
          vec3 n = normalize(mat3(modelMatrix) * position);
          vec4 wp = modelMatrix * vec4(position,1.0);
          vec3 view = normalize(cameraPosition - wp.xyz);
          float facing = smoothstep(0.0, 0.25, dot(n, view));
          float night = 1.0 - smoothstep(-0.1, 0.35, dot(n, uSun));
          float k = uAct[int(aNation + 0.5)];
          vHot = clamp(k - 1.0, 0.0, 1.0);
          vA = aGlow * facing * mix(night, 1.0, vHot * 0.7) * min(k, 1.0 + vHot * 0.6);
          vec4 mv = viewMatrix * wp;
          gl_PointSize = aSize * uPx * (3.2 / -mv.z) * (0.75 + 0.25 * min(k, 1.0) + vHot * 0.55);
          gl_Position = projectionMatrix * mv;
        }`,fragmentShader:`
        varying float vA; varying float vHot;
        void main(){
          float d = length(gl_PointCoord - 0.5);
          float a = smoothstep(0.5, 0.0, d);
          vec3 c = mix(vec3(1.0, 0.86, 0.62), vec3(1.0, 0.8, 0.32), vHot);
          gl_FragColor = vec4(c * (0.6 + a + vHot * 0.35), a * vA);
        }`,transparent:!0,blending:ee,depthWrite:!1}));p.add(W);const j=d.degToRad(24),ie=d.degToRad(52),U=t=>{const e=te(0,t);return-Math.atan2(e.x,e.z)};let $=0,S=0,y=47,z=9,A=y,P=U(z),D=0,b=0;const K=()=>{const t=i.clientWidth||1,e=i.clientHeight||1;r.setSize(t,e,!1),a.aspect=t/e;const o=t/e<1?5:3.7;a.position.set(0,Math.sin(j)*o,Math.cos(j)*o),a.lookAt(0,t/e<1?.75:.95,0),a.updateProjectionMatrix(),W.material.uniforms.uPx.value=r.getPixelRatio()*(e/900)*2.2};K();const J=new ResizeObserver(K);J.observe(i);const re=new fe,ce=()=>{const t=re.getElapsedTime();b+=(D-b)*.08,S+=($-S)*.05,v.position.y=-.6+.32*Math.min(1,b/.14)+S;let e=U(z)-P;e=Math.atan2(Math.sin(e),Math.cos(e)),P+=e*.045,A+=(y-A)*.045,x.rotation.x=d.degToRad(A)-ie,p.rotation.y=P+Math.sin(t*.08)*.015;for(let o=0;o<s;o++)M[o]+=(I[o]-M[o])*.06;G.material.uniforms.uTime.value=t,r.render(c,a)};let m=0,u=!0;const R=()=>{ce(),u&&(m=requestAnimationFrame(R))};m=requestAnimationFrame(R);const Q=new IntersectionObserver(([t])=>{t.isIntersecting&&!u?(u=!0,m=requestAnimationFrame(R)):t.isIntersecting||(u=!1,cancelAnimationFrame(m))});return Q.observe(i),{setProgress(t){D=t},setFocus(t,e,o){for(let n=0;n<s;n++)I[n]=t===null?1:t.includes(n)?1.9:n===s-1?.3:.45;[y,z]=e,$=o??0},circle(){const t=i.clientWidth||1,e=i.clientHeight||1,o=v.position.clone().project(a),n=a.position.distanceTo(v.position),f=Math.asin(Math.min(1,1/n)),T=e/2*Math.tan(f)/Math.tan(d.degToRad(a.fov/2));return{x:(o.x+1)/2*t,y:(1-o.y)/2*e,r:T}},dispose(){u=!1,cancelAnimationFrame(m),Q.disconnect(),J.disconnect(),c.traverse(t=>{const e=t;e.geometry?.dispose?.(),e.material?.dispose?.()}),r.dispose()}}}export{ae as COUNTRIES,xe as createGlobe};
