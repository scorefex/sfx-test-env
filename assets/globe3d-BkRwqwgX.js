import{W as J,S as K,a as Q,P as X,V as j,G as S,M as k,l as B,m as y,n as E,o as Y,p as Z,F as z,q as ee,i as p,C as te}from"./three.module-BV2aXcp9.js";const oe=[[51.51,-.12,1.4],[53.48,-2.24,.9],[53.41,-2.98,.8],[52.48,-1.9,.6],[53.8,-1.55,.5],[55.86,-4.25,.5],[40.42,-3.7,1.2],[41.39,2.17,1],[37.39,-5.98,.6],[39.47,-.38,.6],[43.26,-2.93,.4],[45.46,9.19,1],[41.9,12.5,.9],[45.07,7.69,.6],[40.85,14.27,.7],[44.49,11.34,.4],[48.14,11.58,.9],[51.51,7.47,.7],[52.52,13.4,.9],[53.55,9.99,.6],[50.94,6.96,.6],[51.23,6.78,.5],[50.11,8.68,.6],[48.86,2.35,1.3],[43.3,5.37,.6],[45.76,4.84,.6],[50.63,3.06,.4],[38.72,-9.14,.7],[41.15,-8.61,.6],[52.37,4.9,.8],[51.92,4.48,.6],[50.85,4.35,.7],[48.2,16.37,.6],[47.5,19.04,.6],[50.08,14.43,.6],[52.23,21,.7],[44.43,26.1,.6],[42.7,23.32,.4],[41,28.97,1.1],[39.93,32.86,.6],[37.98,23.73,.7],[55.75,37.6,1.1],[59.93,30.33,.6],[50.45,30.52,.7],[59.33,18.06,.5],[55.68,12.57,.5],[59.91,10.75,.4],[60.17,24.94,.4],[53.35,-6.26,.5],[24.71,46.68,1],[21.49,39.19,.8],[25.28,51.53,.6],[25.2,55.27,.8],[24.45,54.38,.5],[29.37,47.98,.5],[31.95,35.93,.5],[33.89,35.5,.4],[30.04,31.24,1.1],[31.2,29.92,.6],[33.57,-7.59,.7],[36.75,3.06,.6],[36.8,10.18,.5],[35.69,51.39,.9],[33.31,44.36,.6],[6.52,3.38,.7],[5.6,-.19,.4],[-1.29,36.82,.4],[-26.2,28.04,.6],[40.71,-74,1],[19.43,-99.13,.8],[-23.55,-46.63,.9],[-22.9,-43.2,.7],[-34.6,-58.4,.8],[4.71,-74.07,.5],[35.68,139.69,.9],[37.56,126.97,.7],[19.07,72.88,.7],[28.61,77.21,.7]],W=(a,i,n=1)=>{const o=p.degToRad(90-a),r=p.degToRad(i+180);return new j(-Math.sin(o)*Math.cos(r)*n,Math.cos(o)*n,Math.sin(o)*Math.sin(r)*n)},ie=`
vec3 hash3(vec3 p){p=vec3(dot(p,vec3(127.1,311.7,74.7)),dot(p,vec3(269.5,183.3,246.1)),dot(p,vec3(113.5,271.9,124.6)));return -1.0+2.0*fract(sin(p)*43758.5453123);}
float noise(vec3 p){vec3 i=floor(p);vec3 f=fract(p);vec3 u=f*f*(3.0-2.0*f);
return mix(mix(mix(dot(hash3(i+vec3(0,0,0)),f-vec3(0,0,0)),dot(hash3(i+vec3(1,0,0)),f-vec3(1,0,0)),u.x),
mix(dot(hash3(i+vec3(0,1,0)),f-vec3(0,1,0)),dot(hash3(i+vec3(1,1,0)),f-vec3(1,1,0)),u.x),u.y),
mix(mix(dot(hash3(i+vec3(0,0,1)),f-vec3(0,0,1)),dot(hash3(i+vec3(1,0,1)),f-vec3(1,0,1)),u.x),
mix(dot(hash3(i+vec3(0,1,1)),f-vec3(0,1,1)),dot(hash3(i+vec3(1,1,1)),f-vec3(1,1,1)),u.x),u.y),u.z);}
float fbm(vec3 p){float v=0.0;float a=0.5;for(int i=0;i<5;i++){v+=a*noise(p);p*=2.03;a*=0.5;}return v;}
`;function ne(a){const i=new J({canvas:a,antialias:!0,alpha:!0,powerPreference:"high-performance"});i.setPixelRatio(Math.min(2,window.devicePixelRatio||1)),i.outputColorSpace=K;const n=new Q,o=new X(30,1,.1,50),r=new j(-.25,.75,-.6).normalize(),v=new S,g=new S,m=new S;v.add(g),g.add(m),n.add(v);const b=new k(new B(1,160,120),new y({uniforms:{uSun:{value:r},uTime:{value:0}},vertexShader:`
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
        ${ie}
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
        }`}));m.add(b);const O=new k(new B(1.08,96,64),new y({uniforms:{uSun:{value:r}},vertexShader:`
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
        }`,side:Y,transparent:!0,blending:E,depthWrite:!1}));v.add(O);let P=11;const d=()=>(P=P*16807%2147483647)/2147483647,A=()=>Math.sqrt(-2*Math.log(Math.max(1e-6,d())))*Math.cos(2*Math.PI*d()),V=[],C=[],T=[];for(const[e,t,s]of oe){const D=Math.round(70*s);for(let h=0;h<D;h++){const _=h<6?.25:1.1+s*.9,M=W(e+A()*_*.8,t+A()*_,1.002);V.push(M.x,M.y,M.z);const I=h<6;C.push(I?3.2*s+1.5:.8+d()*1.6),T.push(I?1:.35+d()*.5)}}const u=new Z;u.setAttribute("position",new z(V,3)),u.setAttribute("aSize",new z(C,1)),u.setAttribute("aGlow",new z(T,1));const F=new ee(u,new y({uniforms:{uSun:{value:r},uPx:{value:1}},vertexShader:`
        attribute float aSize; attribute float aGlow; uniform vec3 uSun; uniform float uPx;
        varying float vA;
        void main(){
          vec3 n = normalize(mat3(modelMatrix) * position);
          vec4 wp = modelMatrix * vec4(position,1.0);
          vec3 view = normalize(cameraPosition - wp.xyz);
          float facing = smoothstep(0.0, 0.25, dot(n, view));
          float night = 1.0 - smoothstep(-0.1, 0.35, dot(n, uSun));
          vA = aGlow * facing * night;
          vec4 mv = viewMatrix * wp;
          gl_PointSize = aSize * uPx * (3.2 / -mv.z);
          gl_Position = projectionMatrix * mv;
        }`,fragmentShader:`
        varying float vA;
        void main(){
          float d = length(gl_PointCoord - 0.5);
          float a = smoothstep(0.5, 0.0, d);
          gl_FragColor = vec4(vec3(1.0, 0.86, 0.62) * (0.6 + a), a * vA);
        }`,transparent:!0,blending:E,depthWrite:!1}));m.add(F);const G=W(47,9),H=-Math.atan2(G.x,G.z),w=p.degToRad(24);g.rotation.x=-(p.degToRad(47)-w);let N=0,f=0;const R=()=>{const e=a.clientWidth||1,t=a.clientHeight||1;i.setSize(e,t,!1),o.aspect=e/t;const s=e/t<1?5.6:4.3;o.position.set(0,Math.sin(w)*s,Math.cos(w)*s),o.lookAt(0,e/t<1?.75:.95,0),o.updateProjectionMatrix(),F.material.uniforms.uPx.value=i.getPixelRatio()*(t/900)*2.2};R();const q=new ResizeObserver(R);q.observe(a);const U=new te,$=()=>{const e=U.getElapsedTime();f+=(N-f)*.08,v.position.y=-.6+.32*Math.min(1,f*1.6),m.rotation.y=H+e*.012+f*.35,b.material.uniforms.uTime.value=e,i.render(n,o)};let c=0,l=!0;const x=()=>{$(),l&&(c=requestAnimationFrame(x))};c=requestAnimationFrame(x);const L=new IntersectionObserver(([e])=>{e.isIntersecting&&!l?(l=!0,c=requestAnimationFrame(x)):e.isIntersecting||(l=!1,cancelAnimationFrame(c))});return L.observe(a),{setProgress(e){N=e},dispose(){l=!1,cancelAnimationFrame(c),L.disconnect(),q.disconnect(),n.traverse(e=>{const t=e;t.geometry?.dispose?.(),t.material?.dispose?.()}),i.dispose()}}}export{ne as createGlobe};
