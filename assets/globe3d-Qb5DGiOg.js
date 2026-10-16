import{_ as re}from"./index-CzcaT88n.js";import{W as he,S as pe,a as ge,P as xe,V as Y,G as J,M as se,l as le,m as K,n as ve,o as ue,p as we,q as Me,F as H,r as ye,C as Se,i as M,g as Pe,N as be}from"./three.module-67034LgH.js";import"./react-D4DUQgMP.js";const de=[{code:"ENG",anchors:[[51.51,-.12,1.4],[53.48,-2.24,1],[53.41,-2.98,.8],[52.48,-1.9,.8],[53.8,-1.55,.6],[54.97,-1.61,.6],[51.45,-2.59,.5],[50.9,-1.4,.5],[52.63,1.3,.4],[52.95,-1.15,.5],[50.37,-4.14,.3],[53.38,-1.47,.5],[52.2,.12,.4]]},{code:"ESP",anchors:[[40.42,-3.7,1.2],[41.39,2.17,1],[37.39,-5.98,.7],[39.47,-.38,.6],[43.26,-2.93,.5],[36.72,-4.42,.5],[41.65,-.89,.4],[43.36,-8.41,.4],[42.24,-8.72,.4],[37.98,-1.13,.4],[38.35,-.48,.4],[41.65,-4.72,.3],[39.57,2.65,.3]]},{code:"ITA",anchors:[[45.46,9.19,1],[41.9,12.5,1],[45.07,7.69,.6],[40.85,14.27,.7],[44.49,11.34,.5],[43.77,11.25,.5],[45.44,12.32,.4],[44.41,8.93,.4],[38.12,13.36,.4],[41.12,16.87,.4],[45.65,13.77,.3],[39.22,9.12,.3]]},{code:"GER",anchors:[[48.14,11.58,.9],[51.51,7.47,.7],[52.52,13.4,.9],[53.55,9.99,.7],[50.94,6.96,.6],[51.23,6.78,.5],[50.11,8.68,.6],[48.78,9.18,.5],[51.34,12.37,.5],[52.37,9.73,.4],[53.08,8.8,.4],[49.45,11.08,.4],[51.05,13.74,.4],[54.32,10.13,.3]]},{code:"FRA",anchors:[[48.86,2.35,1.3],[43.3,5.37,.7],[45.76,4.84,.7],[50.63,3.06,.5],[43.6,1.44,.5],[44.84,-.58,.5],[47.22,-1.55,.5],[43.7,7.27,.5],[48.57,7.75,.4],[48.11,-1.68,.4],[49.26,4.03,.3],[47.32,5.04,.3],[45.19,5.72,.3]]},{code:"NED",anchors:[[52.37,4.9,.8],[51.92,4.48,.6],[52.09,5.12,.5],[51.44,5.47,.5],[53.22,6.57,.3],[52.22,6.89,.3]]},{code:"POR",anchors:[[38.72,-9.14,.8],[41.15,-8.61,.7],[40.2,-8.41,.4],[37.02,-7.93,.3],[41.55,-8.42,.4]]},{code:"BEL",anchors:[[50.85,4.35,.7],[51.22,4.4,.5],[51.05,3.72,.4],[50.63,5.57,.4],[51.21,3.22,.3]]},{code:"SCO",anchors:[[55.86,-4.25,.8],[55.95,-3.19,.6],[57.15,-2.09,.4],[56.46,-2.97,.4]]},{code:"TUR",anchors:[[41,28.97,1.1],[39.93,32.86,.7],[38.42,27.14,.6],[36.9,30.7,.4],[37,35.32,.5],[40.19,29.06,.4],[41,39.72,.4],[37.87,32.48,.4],[39.9,41.27,.3],[37.07,37.38,.4]]},{code:"NOR",anchors:[[59.91,10.75,.6],[60.39,5.32,.5],[63.43,10.39,.4],[58.97,5.73,.4],[67.28,14.4,.3],[69.65,18.96,.3]]},{code:"KSA",anchors:[[24.71,46.68,1.1],[21.49,39.19,.9],[26.42,50.09,.6],[21.39,39.86,.5],[24.47,39.61,.5],[18.22,42.5,.3],[26.33,43.97,.3],[28.38,36.57,.3]]},{code:"BRA",anchors:[[-23.55,-46.63,1.1],[-22.9,-43.2,.9],[-19.92,-43.94,.6],[-30.03,-51.23,.6],[-25.43,-49.27,.5],[-15.79,-47.88,.5],[-12.97,-38.5,.5],[-8.05,-34.9,.5],[-3.73,-38.52,.5],[-3.1,-60.02,.3],[-16.68,-49.25,.3],[-1.46,-48.5,.3],[-27.6,-48.55,.3]]}],Te=[[53.35,-6.26,.5],[48.2,16.37,.6],[47.5,19.04,.6],[50.08,14.43,.6],[52.23,21,.7],[44.43,26.1,.6],[42.7,23.32,.4],[37.98,23.73,.7],[55.75,37.6,1.1],[59.93,30.33,.6],[50.45,30.52,.7],[59.33,18.06,.5],[55.68,12.57,.5],[60.17,24.94,.4],[25.28,51.53,.6],[25.2,55.27,.8],[24.45,54.38,.5],[29.37,47.98,.5],[31.95,35.93,.5],[33.89,35.5,.4],[30.04,31.24,1.1],[31.2,29.92,.6],[33.57,-7.59,.7],[36.75,3.06,.6],[36.8,10.18,.5],[35.69,51.39,.9],[33.31,44.36,.6],[6.52,3.38,.7],[5.6,-.19,.4],[-1.29,36.82,.4],[-26.2,28.04,.6],[40.71,-74,1],[19.43,-99.13,.8],[-34.6,-58.4,.8],[4.71,-74.07,.5],[35.68,139.69,.9],[37.56,126.97,.7],[19.07,72.88,.7],[28.61,77.21,.7]],R=de.length+1,X=(u,f,p=1)=>{const i=M.degToRad(90-u),l=M.degToRad(f+180);return new Y(-Math.sin(i)*Math.cos(l)*p,Math.cos(i)*p,Math.sin(i)*Math.sin(l)*p)},ze=`
vec3 hash3(vec3 p){p=vec3(dot(p,vec3(127.1,311.7,74.7)),dot(p,vec3(269.5,183.3,246.1)),dot(p,vec3(113.5,271.9,124.6)));return -1.0+2.0*fract(sin(p)*43758.5453123);}
float noise(vec3 p){vec3 i=floor(p);vec3 f=fract(p);vec3 u=f*f*(3.0-2.0*f);
return mix(mix(mix(dot(hash3(i+vec3(0,0,0)),f-vec3(0,0,0)),dot(hash3(i+vec3(1,0,0)),f-vec3(1,0,0)),u.x),
mix(dot(hash3(i+vec3(0,1,0)),f-vec3(0,1,0)),dot(hash3(i+vec3(1,1,0)),f-vec3(1,1,0)),u.x),u.y),
mix(mix(dot(hash3(i+vec3(0,0,1)),f-vec3(0,0,1)),dot(hash3(i+vec3(1,0,1)),f-vec3(1,0,1)),u.x),
mix(dot(hash3(i+vec3(0,1,1)),f-vec3(0,1,1)),dot(hash3(i+vec3(1,1,1)),f-vec3(1,1,1)),u.x),u.y),u.z);}
float fbm(vec3 p){float v=0.0;float a=0.5;for(int i=0;i<5;i++){v+=a*noise(p);p*=2.03;a*=0.5;}return v;}
`,Ae=[["826","724","380","276","250"],["826","528","620","056","792","578"],["682","076"]],Re=[[-9,55.05],[-3.2,54.98],[-2.05,55.8],[1,55.8],[1,61.5],[-9,61.5]];async function Oe(){const[{feature:u},f]=await Promise.all([re(()=>import("./index-BnENo9bV.js"),[]),re(()=>import("./countries-50m-DgYPl3oJ.js"),[])]),p=f.default??f,i=u(p,p.objects.countries),l=4096,c=2048,y=o=>(o+180)/360*l,x=o=>(90-o)/180*c,S=(o,n)=>{const m=n.type==="Polygon"?[n.coordinates]:n.type==="MultiPolygon"?n.coordinates:[];for(const r of[-l,0,l])for(const z of m)for(const O of z){let w=0,b=O[0][0];O.forEach(([T,G],A)=>{A&&T-b>180?w-=360:A&&b-T>180&&(w+=360),b=T;const F=y(T+w)+r,V=x(G);A?o.lineTo(F,V):o.moveTo(F,V)}),o.closePath()}},g=()=>{const o=document.createElement("canvas");o.width=l,o.height=c;const n=o.getContext("2d");return n.fillStyle="#000",n.fillRect(0,0,l,c),n.globalCompositeOperation="lighter",{c:o,ctx:n}},d=g();for(const o of i.features)d.ctx.beginPath(),S(d.ctx,o.geometry),d.ctx.fillStyle="#ff0000",d.ctx.fill("evenodd");d.ctx.lineWidth=2.2,d.ctx.strokeStyle="#00ff00",d.ctx.lineJoin="round";for(const o of i.features)d.ctx.beginPath(),S(d.ctx,o.geometry),d.ctx.stroke();const N=g(),L=o=>{for(const n of[-l,0,l])Re.forEach(([m,r],z)=>z?o.lineTo(y(m)+n,x(r)):o.moveTo(y(m)+n,x(r)));o.closePath()};["#ff0000","#00ff00","#0000ff"].forEach((o,n)=>{for(const m of i.features){if(!Ae[n].includes(String(m.id)))continue;const r=N.ctx;r.save(),m.id==="826"&&(r.beginPath(),n===0&&r.rect(-l,0,l*3,c),L(r),r.clip("evenodd")),r.beginPath(),S(r,m.geometry),r.fillStyle=o,r.fill("evenodd"),r.restore()}});const P=o=>{const n=new Pe(o);return n.colorSpace=be,n.anisotropy=8,n};return{land:P(d.c),mask:P(N.c)}}function ke(u){const f=new he({canvas:u,antialias:!0,alpha:!0,powerPreference:"high-performance"});f.setPixelRatio(Math.min(2,window.devicePixelRatio||1)),f.outputColorSpace=pe;const p=new ge,i=new xe(30,1,.1,50),l=new Y(-.25,.75,-.6).normalize(),c=new J,y=new J,x=new J;c.add(y),y.add(x),p.add(c);const S=new se(new le(1,160,120),new K({uniforms:{uSun:{value:l},uTime:{value:0},uLand:{value:null},uMask:{value:null},uMapOn:{value:0},uGroup:{value:new ve}},vertexShader:`
        varying vec3 vN; varying vec3 vLocal; varying vec3 vView; varying vec2 vUv;
        void main(){
          vLocal = position;
          vUv = uv;
          vN = normalize(mat3(modelMatrix) * normal);
          vec4 wp = modelMatrix * vec4(position,1.0);
          vView = normalize(cameraPosition - wp.xyz);
          gl_Position = projectionMatrix * viewMatrix * wp;
        }`,fragmentShader:`
        uniform vec3 uSun; uniform float uTime; uniform sampler2D uLand; uniform sampler2D uMask; uniform float uMapOn; uniform vec4 uGroup;
        varying vec3 vN; varying vec3 vLocal; varying vec3 vView; varying vec2 vUv;
        ${ze}
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
          // Every country: a dark land tone with fine grey borders; the group's covered countries glow yellow
          if (uMapOn > 0.0) {
            vec2 lm = texture2D(uLand, vUv).rg;
            vec3 mk = texture2D(uMask, vUv).rgb;
            float hot = max(dot(mk, uGroup.rgb), uGroup.a);
            vec3 landC = vec3(0.034, 0.038, 0.044) + relief * 0.01;
            col = mix(col, landC, lm.r * uMapOn);
            col += vec3(0.16, 0.17, 0.19) * lm.g * uMapOn * (1.0 - hot);
            col = mix(col, vec3(0.30, 0.20, 0.05), hot * lm.r * 0.85);
            col += vec3(1.0, 0.78, 0.30) * lm.g * hot * 0.9;
          }
          col += clouds * vec3(0.78, 0.82, 0.88) * day * 0.7;
          col += clouds * vec3(0.05, 0.06, 0.08) * (1.0 - day);
          // Thin bright rim where the sun grazes the horizon
          float fres = pow(1.0 - max(dot(n, vView), 0.0), 3.0);
          col += fres * vec3(0.55, 0.68, 0.9) * (0.15 + day * 1.6);
          gl_FragColor = vec4(col, 1.0);
        }`}));x.add(S);const g=S.material.uniforms,d=new ve;Oe().then(({land:e,mask:t})=>{g.uLand.value=e,g.uMask.value=t,g.uMapOn.value=.001}).catch(e=>console.error("World map unavailable:",e));const N=new se(new le(1.08,96,64),new K({uniforms:{uSun:{value:l}},vertexShader:`
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
        }`,side:we,transparent:!0,blending:ue,depthWrite:!1}));c.add(N);let L=11;const P=()=>(L=L*16807%2147483647)/2147483647,o=()=>Math.sqrt(-2*Math.log(Math.max(1e-6,P())))*Math.cos(2*Math.PI*P()),n=[],m=[],r=[],z=[],O=(e,t,a,s,v)=>{const h=Math.round(60*a);for(let C=0;C<h;C++){const k=C<5,ce=k?.22:v*(.7+a*.6),$=X(e+o()*ce*.8,t+o()*ce,1.002);n.push($.x,$.y,$.z),m.push(k?3*a+1.4:.8+P()*1.5),r.push(k?1:.35+P()*.5),z.push(s)}};de.forEach((e,t)=>e.anchors.forEach(([a,s,v])=>O(a,s,v,t,t===12?1.6:.9))),Te.forEach(([e,t,a])=>O(e,t,a,R-1,1.4));const w=new Me;w.setAttribute("position",new H(n,3)),w.setAttribute("aSize",new H(m,1)),w.setAttribute("aGlow",new H(r,1)),w.setAttribute("aNation",new H(z,1));const b=new Array(R).fill(1),T=new Array(R).fill(1),G=new ye(w,new K({uniforms:{uSun:{value:l},uPx:{value:1},uAct:{value:b}},vertexShader:`
        attribute float aSize; attribute float aGlow; attribute float aNation; uniform vec3 uSun; uniform float uPx;
        uniform float uAct[${R}];
        varying float vA; varying float vHot;
        void main(){
          vec3 n = normalize(mat3(modelMatrix) * position);
          vec4 wp = modelMatrix * vec4(position,1.0);
          vec3 view = normalize(cameraPosition - wp.xyz);
          float facing = smoothstep(0.0, 0.25, dot(n, view));
          float night = 1.0 - smoothstep(-0.1, 0.35, dot(n, uSun));
          float k = uAct[int(aNation + 0.5)];
          vHot = clamp(k - 1.0, 0.0, 1.0);
          vA = aGlow * facing * mix(night, 1.0, vHot * 0.7) * min(k, 1.0) * (1.0 - vHot * 0.35);
          vec4 mv = viewMatrix * wp;
          gl_PointSize = aSize * uPx * (3.2 / -mv.z) * (0.75 + 0.25 * min(k, 1.0) - vHot * 0.15);
          gl_Position = projectionMatrix * mv;
        }`,fragmentShader:`
        varying float vA; varying float vHot;
        void main(){
          float d = length(gl_PointCoord - 0.5);
          float a = smoothstep(0.5, 0.0, d);
          vec3 c = mix(vec3(1.0, 0.86, 0.62), vec3(1.0, 0.8, 0.32), vHot);
          gl_FragColor = vec4(c * (0.6 + a + vHot * 0.35), a * vA);
        }`,transparent:!0,blending:ue,depthWrite:!1}));x.add(G);const A=M.degToRad(24),F=M.degToRad(52),V=26,Z=e=>{const t=X(0,e);return-Math.atan2(t.x,t.z)};let Q=0,W=0,ee=1,te=0,U=47,I=9,j=U,q=Z(I),oe=0,D=0;const ne=()=>{const e=u.clientWidth||1,t=u.clientHeight||1;f.setSize(e,t,!1),i.aspect=e/t;const a=e/t<1?5:3.7;i.position.set(0,Math.sin(A)*a,Math.cos(A)*a),i.lookAt(0,e/t<1?.75:.95,0),i.updateProjectionMatrix(),G.material.uniforms.uPx.value=f.getPixelRatio()*(t/900)*2.2};ne();const ae=new ResizeObserver(ne);ae.observe(u);const fe=new Se,me=()=>{const e=fe.getElapsedTime();D+=(oe-D)*.08,W+=(Q-W)*.05,c.position.y=-.6+.32*Math.min(1,D)+W,c.scale.setScalar(c.scale.x+(ee-c.scale.x)*.05);const t=u.clientHeight||1,a=2*i.position.distanceTo(c.position)*Math.tan(M.degToRad(i.fov/2))/t;c.position.y-=te*a;let s=Z(I)-q;s=Math.atan2(Math.sin(s),Math.cos(s)),q+=s*.045,j+=(U-j)*.045,y.rotation.x=M.degToRad(j)-F-M.degToRad(V)*(c.scale.x-1),x.rotation.y=q+Math.sin(e*.08)*.015;for(let v=0;v<R;v++)b[v]+=(T[v]-b[v])*.06;g.uMapOn.value>0&&(g.uMapOn.value=Math.min(1,g.uMapOn.value+.02)),g.uGroup.value.lerp(d,.06),S.material.uniforms.uTime.value=e,f.render(p,i)};let _=0,E=!0;const B=()=>{me(),E&&(_=requestAnimationFrame(B))};_=requestAnimationFrame(B);const ie=new IntersectionObserver(([e])=>{e.isIntersecting&&!E?(E=!0,_=requestAnimationFrame(B)):e.isIntersecting||(E=!1,cancelAnimationFrame(_))});return ie.observe(u),{setProgress(e){oe=e},setFocus(e,t,a,s=-1,v=1){ee=v;for(let h=0;h<R;h++)T[h]=e===null?1:e.includes(h)?1.9:0;d.set(s===0?1:0,s===1?1:0,s===2?1:0,s===3?1:0),[U,I]=t,Q=a??0},setShift(e){te=e},project(e,t){const a=X(e,t,1.003).applyMatrix4(x.matrixWorld),s=new Y().setFromMatrixPosition(c.matrixWorld),v=a.clone().sub(s).normalize().dot(i.position.clone().sub(a).normalize()),h=a.project(i),C=u.clientWidth||1,k=u.clientHeight||1;return{x:(h.x+1)/2*C,y:(1-h.y)/2*k,visible:v>.08}},circle(){const e=u.clientWidth||1,t=u.clientHeight||1,a=c.position.clone().project(i),s=i.position.distanceTo(c.position),v=Math.asin(Math.min(1,c.scale.x/s)),h=t/2*Math.tan(v)/Math.tan(M.degToRad(i.fov/2));return{x:(a.x+1)/2*e,y:(1-a.y)/2*t,r:h}},dispose(){E=!1,cancelAnimationFrame(_),ie.disconnect(),ae.disconnect(),p.traverse(e=>{const t=e;t.geometry?.dispose?.(),t.material?.dispose?.()}),f.dispose()}}}export{de as COUNTRIES,ke as createGlobe};
