import{_ as ce}from"./index-f2K0WFO7.js";import{W as me,S as he,a as pe,P as ge,V as Y,G as J,M as re,l as se,m as K,n as le,o as ve,p as xe,q as we,F as H,r as Me,C as ye,i as T,g as Se,N as Pe}from"./three.module-67034LgH.js";import"./react-BQmgBeEZ.js";const ue=[{code:"ENG",anchors:[[51.51,-.12,1.4],[53.48,-2.24,1],[53.41,-2.98,.8],[52.48,-1.9,.8],[53.8,-1.55,.6],[54.97,-1.61,.6],[51.45,-2.59,.5],[50.9,-1.4,.5],[52.63,1.3,.4],[52.95,-1.15,.5],[50.37,-4.14,.3],[53.38,-1.47,.5],[52.2,.12,.4]]},{code:"ESP",anchors:[[40.42,-3.7,1.2],[41.39,2.17,1],[37.39,-5.98,.7],[39.47,-.38,.6],[43.26,-2.93,.5],[36.72,-4.42,.5],[41.65,-.89,.4],[43.36,-8.41,.4],[42.24,-8.72,.4],[37.98,-1.13,.4],[38.35,-.48,.4],[41.65,-4.72,.3],[39.57,2.65,.3]]},{code:"ITA",anchors:[[45.46,9.19,1],[41.9,12.5,1],[45.07,7.69,.6],[40.85,14.27,.7],[44.49,11.34,.5],[43.77,11.25,.5],[45.44,12.32,.4],[44.41,8.93,.4],[38.12,13.36,.4],[41.12,16.87,.4],[45.65,13.77,.3],[39.22,9.12,.3]]},{code:"GER",anchors:[[48.14,11.58,.9],[51.51,7.47,.7],[52.52,13.4,.9],[53.55,9.99,.7],[50.94,6.96,.6],[51.23,6.78,.5],[50.11,8.68,.6],[48.78,9.18,.5],[51.34,12.37,.5],[52.37,9.73,.4],[53.08,8.8,.4],[49.45,11.08,.4],[51.05,13.74,.4],[54.32,10.13,.3]]},{code:"FRA",anchors:[[48.86,2.35,1.3],[43.3,5.37,.7],[45.76,4.84,.7],[50.63,3.06,.5],[43.6,1.44,.5],[44.84,-.58,.5],[47.22,-1.55,.5],[43.7,7.27,.5],[48.57,7.75,.4],[48.11,-1.68,.4],[49.26,4.03,.3],[47.32,5.04,.3],[45.19,5.72,.3]]},{code:"NED",anchors:[[52.37,4.9,.8],[51.92,4.48,.6],[52.09,5.12,.5],[51.44,5.47,.5],[53.22,6.57,.3],[52.22,6.89,.3]]},{code:"POR",anchors:[[38.72,-9.14,.8],[41.15,-8.61,.7],[40.2,-8.41,.4],[37.02,-7.93,.3],[41.55,-8.42,.4]]},{code:"BEL",anchors:[[50.85,4.35,.7],[51.22,4.4,.5],[51.05,3.72,.4],[50.63,5.57,.4],[51.21,3.22,.3]]},{code:"SCO",anchors:[[55.86,-4.25,.8],[55.95,-3.19,.6],[57.15,-2.09,.4],[56.46,-2.97,.4]]},{code:"TUR",anchors:[[41,28.97,1.1],[39.93,32.86,.7],[38.42,27.14,.6],[36.9,30.7,.4],[37,35.32,.5],[40.19,29.06,.4],[41,39.72,.4],[37.87,32.48,.4],[39.9,41.27,.3],[37.07,37.38,.4]]},{code:"NOR",anchors:[[59.91,10.75,.6],[60.39,5.32,.5],[63.43,10.39,.4],[58.97,5.73,.4],[67.28,14.4,.3],[69.65,18.96,.3]]},{code:"KSA",anchors:[[24.71,46.68,1.1],[21.49,39.19,.9],[26.42,50.09,.6],[21.39,39.86,.5],[24.47,39.61,.5],[18.22,42.5,.3],[26.33,43.97,.3],[28.38,36.57,.3]]},{code:"BRA",anchors:[[-23.55,-46.63,1.1],[-22.9,-43.2,.9],[-19.92,-43.94,.6],[-30.03,-51.23,.6],[-25.43,-49.27,.5],[-15.79,-47.88,.5],[-12.97,-38.5,.5],[-8.05,-34.9,.5],[-3.73,-38.52,.5],[-3.1,-60.02,.3],[-16.68,-49.25,.3],[-1.46,-48.5,.3],[-27.6,-48.55,.3]]}],be=[[53.35,-6.26,.5],[48.2,16.37,.6],[47.5,19.04,.6],[50.08,14.43,.6],[52.23,21,.7],[44.43,26.1,.6],[42.7,23.32,.4],[37.98,23.73,.7],[55.75,37.6,1.1],[59.93,30.33,.6],[50.45,30.52,.7],[59.33,18.06,.5],[55.68,12.57,.5],[60.17,24.94,.4],[25.28,51.53,.6],[25.2,55.27,.8],[24.45,54.38,.5],[29.37,47.98,.5],[31.95,35.93,.5],[33.89,35.5,.4],[30.04,31.24,1.1],[31.2,29.92,.6],[33.57,-7.59,.7],[36.75,3.06,.6],[36.8,10.18,.5],[35.69,51.39,.9],[33.31,44.36,.6],[6.52,3.38,.7],[5.6,-.19,.4],[-1.29,36.82,.4],[-26.2,28.04,.6],[40.71,-74,1],[19.43,-99.13,.8],[-34.6,-58.4,.8],[4.71,-74.07,.5],[35.68,139.69,.9],[37.56,126.97,.7],[19.07,72.88,.7],[28.61,77.21,.7]],O=ue.length+1,X=(v,d,h=1)=>{const i=T.degToRad(90-v),s=T.degToRad(d+180);return new Y(-Math.sin(i)*Math.cos(s)*h,Math.cos(i)*h,Math.sin(i)*Math.sin(s)*h)},Te=`
vec3 hash3(vec3 p){p=vec3(dot(p,vec3(127.1,311.7,74.7)),dot(p,vec3(269.5,183.3,246.1)),dot(p,vec3(113.5,271.9,124.6)));return -1.0+2.0*fract(sin(p)*43758.5453123);}
float noise(vec3 p){vec3 i=floor(p);vec3 f=fract(p);vec3 u=f*f*(3.0-2.0*f);
return mix(mix(mix(dot(hash3(i+vec3(0,0,0)),f-vec3(0,0,0)),dot(hash3(i+vec3(1,0,0)),f-vec3(1,0,0)),u.x),
mix(dot(hash3(i+vec3(0,1,0)),f-vec3(0,1,0)),dot(hash3(i+vec3(1,1,0)),f-vec3(1,1,0)),u.x),u.y),
mix(mix(dot(hash3(i+vec3(0,0,1)),f-vec3(0,0,1)),dot(hash3(i+vec3(1,0,1)),f-vec3(1,0,1)),u.x),
mix(dot(hash3(i+vec3(0,1,1)),f-vec3(0,1,1)),dot(hash3(i+vec3(1,1,1)),f-vec3(1,1,1)),u.x),u.y),u.z);}
float fbm(vec3 p){float v=0.0;float a=0.5;for(int i=0;i<5;i++){v+=a*noise(p);p*=2.03;a*=0.5;}return v;}
`,ze=[["826","724","380","276","250"],["826","528","620","056","792","578"],["682","076"]],Ae=[[-9,55.05],[-3.2,54.98],[-2.05,55.8],[1,55.8],[1,61.5],[-9,61.5]];async function Oe(){const[{feature:v},d]=await Promise.all([ce(()=>import("./index-BnENo9bV.js"),[]),ce(()=>import("./countries-50m-DgYPl3oJ.js"),[])]),h=d.default??d,i=v(h,h.objects.countries),s=4096,r=2048,M=o=>(o+180)/360*s,g=o=>(90-o)/180*r,y=(o,a)=>{const f=a.type==="Polygon"?[a.coordinates]:a.type==="MultiPolygon"?a.coordinates:[];for(const c of[-s,0,s])for(const z of f)for(const R of z){let x=0,P=R[0][0];R.forEach(([b,G],A)=>{A&&b-P>180?x-=360:A&&P-b>180&&(x+=360),P=b;const F=M(b+x)+c,V=g(G);A?o.lineTo(F,V):o.moveTo(F,V)}),o.closePath()}},p=()=>{const o=document.createElement("canvas");o.width=s,o.height=r;const a=o.getContext("2d");return a.fillStyle="#000",a.fillRect(0,0,s,r),a.globalCompositeOperation="lighter",{c:o,ctx:a}},l=p();for(const o of i.features)l.ctx.beginPath(),y(l.ctx,o.geometry),l.ctx.fillStyle="#ff0000",l.ctx.fill("evenodd");l.ctx.lineWidth=2.2,l.ctx.strokeStyle="#00ff00",l.ctx.lineJoin="round";for(const o of i.features)l.ctx.beginPath(),y(l.ctx,o.geometry),l.ctx.stroke();const N=p(),L=o=>{for(const a of[-s,0,s])Ae.forEach(([f,c],z)=>z?o.lineTo(M(f)+a,g(c)):o.moveTo(M(f)+a,g(c)));o.closePath()};["#ff0000","#00ff00","#0000ff"].forEach((o,a)=>{for(const f of i.features){if(!ze[a].includes(String(f.id)))continue;const c=N.ctx;c.save(),f.id==="826"&&(c.beginPath(),a===0&&c.rect(-s,0,s*3,r),L(c),c.clip("evenodd")),c.beginPath(),y(c,f.geometry),c.fillStyle=o,c.fill("evenodd"),c.restore()}});const S=o=>{const a=new Se(o);return a.colorSpace=Pe,a.anisotropy=8,a};return{land:S(l.c),mask:S(N.c)}}function Ce(v){const d=new me({canvas:v,antialias:!0,alpha:!0,powerPreference:"high-performance"});d.setPixelRatio(Math.min(2,window.devicePixelRatio||1)),d.outputColorSpace=he;const h=new pe,i=new ge(30,1,.1,50),s=new Y(-.25,.75,-.6).normalize(),r=new J,M=new J,g=new J;r.add(M),M.add(g),h.add(r);const y=new re(new se(1,160,120),new K({uniforms:{uSun:{value:s},uTime:{value:0},uLand:{value:null},uMask:{value:null},uMapOn:{value:0},uGroup:{value:new le}},vertexShader:`
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
        ${Te}
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
        }`}));g.add(y);const p=y.material.uniforms,l=new le;Oe().then(({land:e,mask:t})=>{p.uLand.value=e,p.uMask.value=t,p.uMapOn.value=.001}).catch(e=>console.error("World map unavailable:",e));const N=new re(new se(1.08,96,64),new K({uniforms:{uSun:{value:s}},vertexShader:`
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
        }`,side:xe,transparent:!0,blending:ve,depthWrite:!1}));r.add(N);let L=11;const S=()=>(L=L*16807%2147483647)/2147483647,o=()=>Math.sqrt(-2*Math.log(Math.max(1e-6,S())))*Math.cos(2*Math.PI*S()),a=[],f=[],c=[],z=[],R=(e,t,n,u,w)=>{const m=Math.round(60*n);for(let C=0;C<m;C++){const k=C<5,ie=k?.22:w*(.7+n*.6),$=X(e+o()*ie*.8,t+o()*ie,1.002);a.push($.x,$.y,$.z),f.push(k?3*n+1.4:.8+S()*1.5),c.push(k?1:.35+S()*.5),z.push(u)}};ue.forEach((e,t)=>e.anchors.forEach(([n,u,w])=>R(n,u,w,t,t===12?1.6:.9))),be.forEach(([e,t,n])=>R(e,t,n,O-1,1.4));const x=new we;x.setAttribute("position",new H(a,3)),x.setAttribute("aSize",new H(f,1)),x.setAttribute("aGlow",new H(c,1)),x.setAttribute("aNation",new H(z,1));const P=new Array(O).fill(1),b=new Array(O).fill(1),G=new Me(x,new K({uniforms:{uSun:{value:s},uPx:{value:1},uAct:{value:P}},vertexShader:`
        attribute float aSize; attribute float aGlow; attribute float aNation; uniform vec3 uSun; uniform float uPx;
        uniform float uAct[${O}];
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
        }`,transparent:!0,blending:ve,depthWrite:!1}));g.add(G);const A=T.degToRad(24),F=T.degToRad(52),V=26,Z=e=>{const t=X(0,e);return-Math.atan2(t.x,t.z)};let Q=0,W=0,ee=1,U=47,I=9,j=U,q=Z(I),te=0,D=0;const oe=()=>{const e=v.clientWidth||1,t=v.clientHeight||1;d.setSize(e,t,!1),i.aspect=e/t;const n=e/t<1?5:3.7;i.position.set(0,Math.sin(A)*n,Math.cos(A)*n),i.lookAt(0,e/t<1?.75:.95,0),i.updateProjectionMatrix(),G.material.uniforms.uPx.value=d.getPixelRatio()*(t/900)*2.2};oe();const ne=new ResizeObserver(oe);ne.observe(v);const de=new ye,fe=()=>{const e=de.getElapsedTime();D+=(te-D)*.08,W+=(Q-W)*.05,r.position.y=-.6+.32*Math.min(1,D)+W,r.scale.setScalar(r.scale.x+(ee-r.scale.x)*.05);let t=Z(I)-q;t=Math.atan2(Math.sin(t),Math.cos(t)),q+=t*.045,j+=(U-j)*.045,M.rotation.x=T.degToRad(j)-F-T.degToRad(V)*(r.scale.x-1),g.rotation.y=q+Math.sin(e*.08)*.015;for(let n=0;n<O;n++)P[n]+=(b[n]-P[n])*.06;p.uMapOn.value>0&&(p.uMapOn.value=Math.min(1,p.uMapOn.value+.02)),p.uGroup.value.lerp(l,.06),y.material.uniforms.uTime.value=e,d.render(h,i)};let _=0,E=!0;const B=()=>{fe(),E&&(_=requestAnimationFrame(B))};_=requestAnimationFrame(B);const ae=new IntersectionObserver(([e])=>{e.isIntersecting&&!E?(E=!0,_=requestAnimationFrame(B)):e.isIntersecting||(E=!1,cancelAnimationFrame(_))});return ae.observe(v),{setProgress(e){te=e},setFocus(e,t,n,u=-1,w=1){ee=w;for(let m=0;m<O;m++)b[m]=e===null?1:e.includes(m)?1.9:0;l.set(u===0?1:0,u===1?1:0,u===2?1:0,u===3?1:0),[U,I]=t,Q=n??0},project(e,t){const n=X(e,t,1.003).applyMatrix4(g.matrixWorld),u=new Y().setFromMatrixPosition(r.matrixWorld),w=n.clone().sub(u).normalize().dot(i.position.clone().sub(n).normalize()),m=n.project(i),C=v.clientWidth||1,k=v.clientHeight||1;return{x:(m.x+1)/2*C,y:(1-m.y)/2*k,visible:w>.08}},circle(){const e=v.clientWidth||1,t=v.clientHeight||1,n=r.position.clone().project(i),u=i.position.distanceTo(r.position),w=Math.asin(Math.min(1,r.scale.x/u)),m=t/2*Math.tan(w)/Math.tan(T.degToRad(i.fov/2));return{x:(n.x+1)/2*e,y:(1-n.y)/2*t,r:m}},dispose(){E=!1,cancelAnimationFrame(_),ae.disconnect(),ne.disconnect(),h.traverse(e=>{const t=e;t.geometry?.dispose?.(),t.material?.dispose?.()}),d.dispose()}}}export{ue as COUNTRIES,Ce as createGlobe};
