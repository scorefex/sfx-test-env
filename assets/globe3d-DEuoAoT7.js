import{_ as de}from"./index-C7i6kIkn.js";import{I as Ee,F as ut,l as Kt,m as pt,n as Ae,o as Zt,p as ye,q as E,r as Ct,s as Rt,U as we,t as Pe,u as Wt,b as Xt,V as nt,L as Ue,v as Te,e as Z,W as De,S as Le,a as Oe,P as Be,G as dt,w as fe,x as ue,y as Ce,z as Re,H as We,C as He,j as Ne,N as je}from"./three.module-BSORm8Ka.js";import"./react-D4DUQgMP.js";const pe=new Zt,Lt=new E;class Se extends Ee{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry";const t=[-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],n=[-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],a=[0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5];this.setIndex(a),this.setAttribute("position",new ut(t,3)),this.setAttribute("uv",new ut(n,2))}applyMatrix4(t){const n=this.attributes.instanceStart,a=this.attributes.instanceEnd;return n!==void 0&&(n.applyMatrix4(t),a.applyMatrix4(t),n.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(t){let n;t instanceof Float32Array?n=t:Array.isArray(t)&&(n=new Float32Array(t));const a=new Kt(n,6,1);return this.setAttribute("instanceStart",new pt(a,3,0)),this.setAttribute("instanceEnd",new pt(a,3,3)),this.instanceCount=this.attributes.instanceStart.count,this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(t){let n;t instanceof Float32Array?n=t:Array.isArray(t)&&(n=new Float32Array(t));const a=new Kt(n,6,1);return this.setAttribute("instanceColorStart",new pt(a,3,0)),this.setAttribute("instanceColorEnd",new pt(a,3,3)),this}fromWireframeGeometry(t){return this.setPositions(t.attributes.position.array),this}fromEdgesGeometry(t){return this.setPositions(t.attributes.position.array),this}fromMesh(t){return this.fromWireframeGeometry(new Ae(t.geometry)),this}fromLineSegments(t){const n=t.geometry;return this.setPositions(n.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Zt);const t=this.attributes.instanceStart,n=this.attributes.instanceEnd;t!==void 0&&n!==void 0&&(this.boundingBox.setFromBufferAttribute(t),pe.setFromBufferAttribute(n),this.boundingBox.union(pe))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ye),this.boundingBox===null&&this.computeBoundingBox();const t=this.attributes.instanceStart,n=this.attributes.instanceEnd;if(t!==void 0&&n!==void 0){const a=this.boundingSphere.center;this.boundingBox.getCenter(a);let i=0;for(let d=0,p=t.count;d<p;d++)Lt.fromBufferAttribute(t,d),i=Math.max(i,a.distanceToSquared(Lt)),Lt.fromBufferAttribute(n,d),i=Math.max(i,a.distanceToSquared(Lt));this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}}Wt.line={worldUnits:{value:1},linewidth:{value:1},resolution:{value:new Pe},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}};Rt.line={uniforms:we.merge([Wt.common,Wt.fog,Wt.line]),vertexShader:`
		#include <common>
		#include <color_pars_vertex>
		#include <fog_pars_vertex>
		#include <logdepthbuf_pars_vertex>
		#include <clipping_planes_pars_vertex>

		uniform float linewidth;
		uniform vec2 resolution;

		attribute vec3 instanceStart;
		attribute vec3 instanceEnd;

		attribute vec3 instanceColorStart;
		attribute vec3 instanceColorEnd;

		#ifdef WORLD_UNITS

			varying vec4 worldPos;
			varying vec3 worldStart;
			varying vec3 worldEnd;

			#ifdef USE_DASH

				varying vec2 vUv;

			#endif

		#else

			varying vec2 vUv;

		#endif

		#ifdef USE_DASH

			uniform float dashScale;
			attribute float instanceDistanceStart;
			attribute float instanceDistanceEnd;
			varying float vLineDistance;

		#endif

		float trimSegmentAlpha( const in vec4 start, const in vec4 end ) {

			// compute the interpolation factor needed to trim the segment so it terminates
			// between the camera plane and the near plane

			// conservative estimate of the near plane
			float a = projectionMatrix[ 2 ][ 2 ]; // 3nd entry in 3th column
			float b = projectionMatrix[ 3 ][ 2 ]; // 3nd entry in 4th column

			// we need different nearEstimate formula for reversed and default depth buffer
			// a is positive with a reversed depth buffer so it can be used for controlling the code flow
			float nearEstimate = ( a > 0.0 ) ? ( - b / ( a + 1.0 ) ) : ( - 0.5 * b / a );

			return ( nearEstimate - start.z ) / ( end.z - start.z );

		}

		void main() {

			#ifdef USE_COLOR

				vColor.xyz = ( position.y < 0.5 ) ? instanceColorStart : instanceColorEnd;

			#endif

			float aspect = resolution.x / resolution.y;

			// camera space
			vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );
			vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );

			#ifdef USE_DASH

				float lineDistanceStart = dashScale * instanceDistanceStart;
				float lineDistanceEnd = dashScale * instanceDistanceEnd;

			#endif

			#ifdef WORLD_UNITS

				worldStart = start.xyz;
				worldEnd = end.xyz;

			#else

				vUv = uv;

			#endif

			// special case for perspective projection, and segments that terminate either in, or behind, the camera plane
			// clearly the gpu firmware has a way of addressing this issue when projecting into ndc space
			// but we need to perform ndc-space calculations in the shader, so we must address this issue directly
			// perhaps there is a more elegant solution -- WestLangley

			bool perspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 ); // 4th entry in the 3rd column

			if ( perspective ) {

				if ( start.z < 0.0 && end.z >= 0.0 ) {

					float alpha = trimSegmentAlpha( start, end );
					end.xyz = mix( start.xyz, end.xyz, alpha );

					#ifdef USE_DASH

						lineDistanceEnd = mix( lineDistanceStart, lineDistanceEnd, alpha );

					#endif

				} else if ( end.z < 0.0 && start.z >= 0.0 ) {

					float alpha = trimSegmentAlpha( end, start );
					start.xyz = mix( end.xyz, start.xyz, alpha );

					#ifdef USE_DASH

						lineDistanceStart = mix( lineDistanceEnd, lineDistanceStart, alpha );

					#endif

				}

			}

			#ifdef USE_DASH

				vLineDistance = ( position.y < 0.5 ) ? lineDistanceStart : lineDistanceEnd;
				vUv = uv;

			#endif

			// clip space
			vec4 clipStart = projectionMatrix * start;
			vec4 clipEnd = projectionMatrix * end;

			// ndc space
			vec3 ndcStart = clipStart.xyz / clipStart.w;
			vec3 ndcEnd = clipEnd.xyz / clipEnd.w;

			// direction
			vec2 dir = ndcEnd.xy - ndcStart.xy;

			// account for clip-space aspect ratio
			dir.x *= aspect;
			dir = normalize( dir );

			#ifdef WORLD_UNITS

				vec3 worldDir = normalize( end.xyz - start.xyz );
				vec3 tmpFwd = normalize( mix( start.xyz, end.xyz, 0.5 ) );
				vec3 worldUp = normalize( cross( worldDir, tmpFwd ) );
				vec3 worldFwd = cross( worldDir, worldUp );
				worldPos = position.y < 0.5 ? start: end;

				// height offset
				float hw = linewidth * 0.5;
				worldPos.xyz += position.x < 0.0 ? hw * worldUp : - hw * worldUp;

				// don't extend the line if we're rendering dashes because we
				// won't be rendering the endcaps
				#ifndef USE_DASH

					// cap extension
					worldPos.xyz += position.y < 0.5 ? - hw * worldDir : hw * worldDir;

					// add width to the box
					worldPos.xyz += worldFwd * hw;

					// endcaps
					if ( position.y > 1.0 || position.y < 0.0 ) {

						worldPos.xyz -= worldFwd * 2.0 * hw;

					}

				#endif

				// project the worldpos
				vec4 clip = projectionMatrix * worldPos;

				// shift the depth of the projected points so the line
				// segments overlap neatly
				vec3 clipPose = ( position.y < 0.5 ) ? ndcStart : ndcEnd;
				clip.z = clipPose.z * clip.w;

			#else

				vec2 offset = vec2( dir.y, - dir.x );
				// undo aspect ratio adjustment
				dir.x /= aspect;
				offset.x /= aspect;

				// sign flip
				if ( position.x < 0.0 ) offset *= - 1.0;

				// endcaps
				if ( position.y < 0.0 ) {

					offset += - dir;

				} else if ( position.y > 1.0 ) {

					offset += dir;

				}

				// adjust for linewidth
				offset *= linewidth;

				// adjust for clip-space to screen-space conversion // maybe resolution should be based on viewport ...
				offset /= resolution.y;

				// select end
				vec4 clip = ( position.y < 0.5 ) ? clipStart : clipEnd;

				// back to clip space
				offset *= clip.w;

				clip.xy += offset;

			#endif

			gl_Position = clip;

			vec4 mvPosition = ( position.y < 0.5 ) ? start : end; // this is an approximation

			#include <logdepthbuf_vertex>
			#include <clipping_planes_vertex>
			#include <fog_vertex>

		}
		`,fragmentShader:`
		uniform vec3 diffuse;
		uniform float opacity;
		uniform float linewidth;

		#ifdef USE_DASH

			uniform float dashOffset;
			uniform float dashSize;
			uniform float gapSize;

		#endif

		varying float vLineDistance;

		#ifdef WORLD_UNITS

			varying vec4 worldPos;
			varying vec3 worldStart;
			varying vec3 worldEnd;

			#ifdef USE_DASH

				varying vec2 vUv;

			#endif

		#else

			varying vec2 vUv;

		#endif

		#include <common>
		#include <color_pars_fragment>
		#include <fog_pars_fragment>
		#include <logdepthbuf_pars_fragment>
		#include <clipping_planes_pars_fragment>

		vec2 closestLineToLine(vec3 p1, vec3 p2, vec3 p3, vec3 p4) {

			float mua;
			float mub;

			vec3 p13 = p1 - p3;
			vec3 p43 = p4 - p3;

			vec3 p21 = p2 - p1;

			float d1343 = dot( p13, p43 );
			float d4321 = dot( p43, p21 );
			float d1321 = dot( p13, p21 );
			float d4343 = dot( p43, p43 );
			float d2121 = dot( p21, p21 );

			float denom = d2121 * d4343 - d4321 * d4321;

			float numer = d1343 * d4321 - d1321 * d4343;

			mua = numer / denom;
			mua = clamp( mua, 0.0, 1.0 );
			mub = ( d1343 + d4321 * ( mua ) ) / d4343;
			mub = clamp( mub, 0.0, 1.0 );

			return vec2( mua, mub );

		}

		void main() {

			float alpha = opacity;
			vec4 diffuseColor = vec4( diffuse, alpha );

			#include <clipping_planes_fragment>

			#ifdef USE_DASH

				if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard; // discard endcaps

				if ( mod( vLineDistance + dashOffset, dashSize + gapSize ) > dashSize ) discard; // todo - FIX

			#endif

			#ifdef WORLD_UNITS

				// Find the closest points on the view ray and the line segment
				vec3 rayEnd = normalize( worldPos.xyz ) * 1e5;
				vec3 lineDir = worldEnd - worldStart;
				vec2 params = closestLineToLine( worldStart, worldEnd, vec3( 0.0, 0.0, 0.0 ), rayEnd );

				vec3 p1 = worldStart + lineDir * params.x;
				vec3 p2 = rayEnd * params.y;
				vec3 delta = p1 - p2;
				float len = length( delta );
				float norm = len / linewidth;

				#ifndef USE_DASH

					#ifdef USE_ALPHA_TO_COVERAGE

						float dnorm = fwidth( norm );
						alpha = 1.0 - smoothstep( 0.5 - dnorm, 0.5 + dnorm, norm );

					#else

						if ( norm > 0.5 ) {

							discard;

						}

					#endif

				#endif

			#else

				#ifdef USE_ALPHA_TO_COVERAGE

					// artifacts appear on some hardware if a derivative is taken within a conditional
					float a = vUv.x;
					float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
					float len2 = a * a + b * b;
					float dlen = fwidth( len2 );

					if ( abs( vUv.y ) > 1.0 ) {

						alpha = 1.0 - smoothstep( 1.0 - dlen, 1.0 + dlen, len2 );

					}

				#else

					if ( abs( vUv.y ) > 1.0 ) {

						float a = vUv.x;
						float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
						float len2 = a * a + b * b;

						if ( len2 > 1.0 ) discard;

					}

				#endif

			#endif

			#include <logdepthbuf_fragment>
			#include <color_fragment>

			gl_FragColor = vec4( diffuseColor.rgb, alpha );

			#include <tonemapping_fragment>
			#include <colorspace_fragment>
			#include <fog_fragment>
			#include <premultiplied_alpha_fragment>

		}
		`};class be extends Ct{constructor(t){super({type:"LineMaterial",uniforms:we.clone(Rt.line.uniforms),vertexShader:Rt.line.vertexShader,fragmentShader:Rt.line.fragmentShader,clipping:!0}),this.isLineMaterial=!0,this.setValues(t)}get color(){return this.uniforms.diffuse.value}set color(t){this.uniforms.diffuse.value=t}get worldUnits(){return"WORLD_UNITS"in this.defines}set worldUnits(t){t===!0!==this.worldUnits&&(this.needsUpdate=!0),t===!0?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}get linewidth(){return this.uniforms.linewidth.value}set linewidth(t){this.uniforms.linewidth&&(this.uniforms.linewidth.value=t)}get dashed(){return"USE_DASH"in this.defines}set dashed(t){t===!0!==this.dashed&&(this.needsUpdate=!0),t===!0?this.defines.USE_DASH="":delete this.defines.USE_DASH}get dashScale(){return this.uniforms.dashScale.value}set dashScale(t){this.uniforms.dashScale.value=t}get dashSize(){return this.uniforms.dashSize.value}set dashSize(t){this.uniforms.dashSize.value=t}get dashOffset(){return this.uniforms.dashOffset.value}set dashOffset(t){this.uniforms.dashOffset.value=t}get gapSize(){return this.uniforms.gapSize.value}set gapSize(t){this.uniforms.gapSize.value=t}get opacity(){return this.uniforms.opacity.value}set opacity(t){this.uniforms&&(this.uniforms.opacity.value=t)}get resolution(){return this.uniforms.resolution.value}set resolution(t){this.uniforms.resolution.value.copy(t)}get alphaToCoverage(){return"USE_ALPHA_TO_COVERAGE"in this.defines}set alphaToCoverage(t){this.defines&&(t===!0!==this.alphaToCoverage&&(this.needsUpdate=!0),t===!0?this.defines.USE_ALPHA_TO_COVERAGE="":delete this.defines.USE_ALPHA_TO_COVERAGE)}}const qt=new nt,he=new E,me=new E,P=new nt,U=new nt,F=new nt,$t=new E,Jt=new Te,T=new Ue,ve=new E,Ot=new Zt,Bt=new ye,I=new nt;let G,et;function ge(c,t,n){return I.set(0,0,-t,1).applyMatrix4(c.projectionMatrix),I.multiplyScalar(1/I.w),I.x=et/n.width,I.y=et/n.height,I.applyMatrix4(c.projectionMatrixInverse),I.multiplyScalar(1/I.w),Math.abs(Math.max(I.x,I.y))}function Fe(c,t){const n=c.matrixWorld,a=c.geometry,i=a.attributes.instanceStart,d=a.attributes.instanceEnd,p=Math.min(a.instanceCount,i.count);for(let u=0,y=p;u<y;u++){T.start.fromBufferAttribute(i,u),T.end.fromBufferAttribute(d,u),T.applyMatrix4(n);const z=new E,x=new E;G.distanceSqToSegment(T.start,T.end,x,z),x.distanceTo(z)<et*.5&&t.push({point:x,pointOnLine:z,distance:G.origin.distanceTo(x),object:c,face:null,faceIndex:u,uv:null,uv1:null})}}function Ie(c,t,n){const a=t.projectionMatrix,d=c.material.resolution,p=c.matrixWorld,u=c.geometry,y=u.attributes.instanceStart,z=u.attributes.instanceEnd,x=Math.min(u.instanceCount,y.count),v=-t.near;G.at(1,F),F.w=1,F.applyMatrix4(t.matrixWorldInverse),F.applyMatrix4(a),F.multiplyScalar(1/F.w),F.x*=d.x/2,F.y*=d.y/2,F.z=0,$t.copy(F),Jt.multiplyMatrices(t.matrixWorldInverse,p);for(let B=0,Y=x;B<Y;B++){if(P.fromBufferAttribute(y,B),U.fromBufferAttribute(z,B),P.w=1,U.w=1,P.applyMatrix4(Jt),U.applyMatrix4(Jt),P.z>v&&U.z>v)continue;if(P.z>v){const D=P.z-U.z,R=(P.z-v)/D;P.lerp(U,R)}else if(U.z>v){const D=U.z-P.z,R=(U.z-v)/D;U.lerp(P,R)}P.applyMatrix4(a),U.applyMatrix4(a),P.multiplyScalar(1/P.w),U.multiplyScalar(1/U.w),P.x*=d.x/2,P.y*=d.y/2,U.x*=d.x/2,U.y*=d.y/2,T.start.copy(P),T.start.z=0,T.end.copy(U),T.end.z=0;const q=T.closestPointToPointParameter($t,!0);T.at(q,ve);const k=Z.lerp(P.z,U.z,q),$=k>=-1&&k<=1,J=$t.distanceTo(ve)<et*.5;if($&&J){T.start.fromBufferAttribute(y,B),T.end.fromBufferAttribute(z,B),T.start.applyMatrix4(p),T.end.applyMatrix4(p);const D=new E,R=new E;G.distanceSqToSegment(T.start,T.end,R,D),n.push({point:R,pointOnLine:D,distance:G.origin.distanceTo(R),object:c,face:null,faceIndex:B,uv:null,uv1:null})}}}class Ge extends Xt{constructor(t=new Se,n=new be({color:Math.random()*16777215})){super(t,n),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){const t=this.geometry,n=t.attributes.instanceStart,a=t.attributes.instanceEnd,i=new Float32Array(2*n.count);for(let p=0,u=0,y=n.count;p<y;p++,u+=2)he.fromBufferAttribute(n,p),me.fromBufferAttribute(a,p),i[u]=u===0?0:i[u-1],i[u+1]=i[u]+he.distanceTo(me);const d=new Kt(i,2,1);return t.setAttribute("instanceDistanceStart",new pt(d,1,0)),t.setAttribute("instanceDistanceEnd",new pt(d,1,1)),this}raycast(t,n){const a=this.material.worldUnits,i=t.camera;if(i===null&&!a&&console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.'),a===!1&&(this.material.resolution.x===0||this.material.resolution.y===0))return;const d=t.params.Line2!==void 0&&t.params.Line2.threshold||0;G=t.ray;const p=this.matrixWorld,u=this.geometry,y=this.material;et=y.linewidth+d,u.boundingSphere===null&&u.computeBoundingSphere(),Bt.copy(u.boundingSphere).applyMatrix4(p);let z;if(a)z=et*.5;else{const v=Math.max(i.near,Bt.distanceToPoint(G.origin));z=ge(i,v,y.resolution)}if(Bt.radius+=z,G.intersectsSphere(Bt)===!1)return;u.boundingBox===null&&u.computeBoundingBox(),Ot.copy(u.boundingBox).applyMatrix4(p);let x;if(a)x=et*.5;else{const v=Math.max(i.near,Ot.distanceToPoint(G.origin));x=ge(i,v,y.resolution)}Ot.expandByScalar(x),G.intersectsBox(Ot)!==!1&&(a?Fe(this,n):Ie(this,i,n))}onBeforeRender(t){const n=this.material.uniforms;n&&n.resolution&&(t.getViewport(qt),this.material.uniforms.resolution.value.set(qt.z,qt.w))}}const Yt=[{code:"ENG",anchors:[[51.51,-.12,1.4],[53.48,-2.24,1],[53.41,-2.98,.8],[52.48,-1.9,.8],[53.8,-1.55,.6],[54.97,-1.61,.6],[51.45,-2.59,.5],[50.9,-1.4,.5],[52.63,1.3,.4],[52.95,-1.15,.5],[50.37,-4.14,.3],[53.38,-1.47,.5],[52.2,.12,.4]]},{code:"ESP",anchors:[[40.42,-3.7,1.2],[41.39,2.17,1],[37.39,-5.98,.7],[39.47,-.38,.6],[43.26,-2.93,.5],[36.72,-4.42,.5],[41.65,-.89,.4],[43.36,-8.41,.4],[42.24,-8.72,.4],[37.98,-1.13,.4],[38.35,-.48,.4],[41.65,-4.72,.3],[39.57,2.65,.3]]},{code:"ITA",anchors:[[45.46,9.19,1],[41.9,12.5,1],[45.07,7.69,.6],[40.85,14.27,.7],[44.49,11.34,.5],[43.77,11.25,.5],[45.44,12.32,.4],[44.41,8.93,.4],[38.12,13.36,.4],[41.12,16.87,.4],[45.65,13.77,.3],[39.22,9.12,.3]]},{code:"GER",anchors:[[48.14,11.58,.9],[51.51,7.47,.7],[52.52,13.4,.9],[53.55,9.99,.7],[50.94,6.96,.6],[51.23,6.78,.5],[50.11,8.68,.6],[48.78,9.18,.5],[51.34,12.37,.5],[52.37,9.73,.4],[53.08,8.8,.4],[49.45,11.08,.4],[51.05,13.74,.4],[54.32,10.13,.3]]},{code:"FRA",anchors:[[48.86,2.35,1.3],[43.3,5.37,.7],[45.76,4.84,.7],[50.63,3.06,.5],[43.6,1.44,.5],[44.84,-.58,.5],[47.22,-1.55,.5],[43.7,7.27,.5],[48.57,7.75,.4],[48.11,-1.68,.4],[49.26,4.03,.3],[47.32,5.04,.3],[45.19,5.72,.3]]},{code:"NED",anchors:[[52.37,4.9,.8],[51.92,4.48,.6],[52.09,5.12,.5],[51.44,5.47,.5],[53.22,6.57,.3],[52.22,6.89,.3]]},{code:"POR",anchors:[[38.72,-9.14,.8],[41.15,-8.61,.7],[40.2,-8.41,.4],[37.02,-7.93,.3],[41.55,-8.42,.4]]},{code:"BEL",anchors:[[50.85,4.35,.7],[51.22,4.4,.5],[51.05,3.72,.4],[50.63,5.57,.4],[51.21,3.22,.3]]},{code:"SCO",anchors:[[55.86,-4.25,.8],[55.95,-3.19,.6],[57.15,-2.09,.4],[56.46,-2.97,.4]]},{code:"TUR",anchors:[[41,28.97,1.1],[39.93,32.86,.7],[38.42,27.14,.6],[36.9,30.7,.4],[37,35.32,.5],[40.19,29.06,.4],[41,39.72,.4],[37.87,32.48,.4],[39.9,41.27,.3],[37.07,37.38,.4]]},{code:"NOR",anchors:[[59.91,10.75,.6],[60.39,5.32,.5],[63.43,10.39,.4],[58.97,5.73,.4],[67.28,14.4,.3],[69.65,18.96,.3]]},{code:"KSA",anchors:[[24.71,46.68,1.1],[21.49,39.19,.9],[26.42,50.09,.6],[21.39,39.86,.5],[24.47,39.61,.5],[18.22,42.5,.3],[26.33,43.97,.3],[28.38,36.57,.3]]},{code:"BRA",anchors:[[-23.55,-46.63,1.1],[-22.9,-43.2,.9],[-19.92,-43.94,.6],[-30.03,-51.23,.6],[-25.43,-49.27,.5],[-15.79,-47.88,.5],[-12.97,-38.5,.5],[-8.05,-34.9,.5],[-3.73,-38.52,.5],[-3.1,-60.02,.3],[-16.68,-49.25,.3],[-1.46,-48.5,.3],[-27.6,-48.55,.3]]}];Yt.push({code:"UEFA",anchors:[[53.35,-6.26,.5],[48.2,16.37,.6],[47.5,19.04,.6],[50.08,14.43,.6],[52.23,21,.7],[44.43,26.1,.6],[42.7,23.32,.4],[37.98,23.73,.7],[50.45,30.52,.7],[59.33,18.06,.5],[55.68,12.57,.5],[60.17,24.94,.4],[44.79,20.45,.5],[45.81,15.98,.4],[47.37,8.54,.5],[46.95,7.45,.3],[32.08,34.78,.5],[40.41,49.87,.4],[41.72,44.79,.3],[40.18,44.51,.3],[53.9,27.56,.4],[64.15,-21.94,.2],[43.24,76.89,.3],[56.95,24.11,.3],[54.69,25.28,.3],[59.44,24.75,.3],[41.33,19.82,.3],[42,21.43,.3],[43.86,18.41,.3],[46.06,14.51,.3],[48.15,17.11,.3],[47.01,28.86,.3],[35.17,33.36,.3],[49.61,6.13,.2],[57.71,11.97,.3]]});const ke=[[55.75,37.6,1.1],[59.93,30.33,.6],[25.28,51.53,.6],[25.2,55.27,.8],[24.45,54.38,.5],[29.37,47.98,.5],[31.95,35.93,.5],[33.89,35.5,.4],[30.04,31.24,1.1],[31.2,29.92,.6],[33.57,-7.59,.7],[36.75,3.06,.6],[36.8,10.18,.5],[35.69,51.39,.9],[33.31,44.36,.6],[6.52,3.38,.7],[5.6,-.19,.4],[-1.29,36.82,.4],[-26.2,28.04,.6],[40.71,-74,1],[19.43,-99.13,.8],[-34.6,-58.4,.8],[4.71,-74.07,.5],[35.68,139.69,.9],[37.56,126.97,.7],[19.07,72.88,.7],[28.61,77.21,.7]],ft=Yt.length+1,ht=(c,t,n=1)=>{const a=Z.degToRad(90-c),i=Z.degToRad(t+180);return new E(-Math.sin(a)*Math.cos(i)*n,Math.cos(a)*n,Math.sin(a)*Math.sin(i)*n)},Ve=`
vec3 hash3(vec3 p){p=vec3(dot(p,vec3(127.1,311.7,74.7)),dot(p,vec3(269.5,183.3,246.1)),dot(p,vec3(113.5,271.9,124.6)));return -1.0+2.0*fract(sin(p)*43758.5453123);}
float noise(vec3 p){vec3 i=floor(p);vec3 f=fract(p);vec3 u=f*f*(3.0-2.0*f);
return mix(mix(mix(dot(hash3(i+vec3(0,0,0)),f-vec3(0,0,0)),dot(hash3(i+vec3(1,0,0)),f-vec3(1,0,0)),u.x),
mix(dot(hash3(i+vec3(0,1,0)),f-vec3(0,1,0)),dot(hash3(i+vec3(1,1,0)),f-vec3(1,1,0)),u.x),u.y),
mix(mix(dot(hash3(i+vec3(0,0,1)),f-vec3(0,0,1)),dot(hash3(i+vec3(1,0,1)),f-vec3(1,0,1)),u.x),
mix(dot(hash3(i+vec3(0,1,1)),f-vec3(0,1,1)),dot(hash3(i+vec3(1,1,1)),f-vec3(1,1,1)),u.x),u.y),u.z);}
float fbm(vec3 p){float v=0.0;float a=0.5;for(int i=0;i<4;i++){v+=a*noise(p);p*=2.03;a*=0.5;}return v;}
`,xe=[["826","724","380","276","250"],["826","528","620","056","792","578"],["682","076"]],_t=[[-9,55.05],[-3.2,54.98],[-2.05,55.8],[1,55.8],[1,61.5],[-9,61.5]];async function qe(){const[{feature:c,mesh:t},n]=await Promise.all([de(()=>import("./index-BnENo9bV.js"),[]),de(()=>import("./countries-50m-DgYPl3oJ.js"),[])]),a=n.default??n,i=c(a,a.objects.countries),d=4096,p=2048,u=r=>(r+180)/360*d,y=r=>(90-r)/180*p,z=(r,l)=>{const g=l.type==="Polygon"?[l.coordinates]:l.type==="MultiPolygon"?l.coordinates:[];for(const h of[-d,0,d])for(const w of g)for(const M of w){let C=0,W=M[0][0];M.forEach(([H,V],L)=>{L&&H-W>180?C-=360:L&&W-H>180&&(C+=360),W=H;const vt=u(H+C)+h,K=y(V);L?r.lineTo(vt,K):r.moveTo(vt,K)}),r.closePath()}},x=()=>{const r=document.createElement("canvas");r.width=d,r.height=p;const l=r.getContext("2d");return l.fillStyle="#000",l.fillRect(0,0,d,p),l.globalCompositeOperation="lighter",{c:r,ctx:l}},v=x();for(const r of i.features)v.ctx.beginPath(),z(v.ctx,r.geometry),v.ctx.fillStyle="#ff0000",v.ctx.fill("evenodd");v.ctx.lineWidth=2.2,v.ctx.strokeStyle="#00ff00",v.ctx.lineJoin="round";for(const r of i.features)v.ctx.beginPath(),z(v.ctx,r.geometry),v.ctx.stroke();const B=x(),Y=r=>{for(const l of[-d,0,d])_t.forEach(([g,h],w)=>w?r.lineTo(u(g)+l,y(h)):r.moveTo(u(g)+l,y(h)));r.closePath()};["#ff0000","#00ff00","#0000ff"].forEach((r,l)=>{for(const g of i.features){if(!xe[l].includes(String(g.id)))continue;const h=B.ctx;h.save(),g.id==="826"&&(h.beginPath(),l===0&&h.rect(-d,0,d*3,p),Y(h),h.clip("evenodd")),h.beginPath(),z(h,g.geometry),h.fillStyle=r,h.fill("evenodd"),h.restore()}});const it=r=>{const l=new Ne(r);return l.colorSpace=je,l.anisotropy=8,l},q=1.0016,k=(r,l)=>{const g=[];for(const h of r.coordinates)for(let w=1;w<h.length;w++){const[M,C]=h[w-1],[W,H]=h[w];if(Math.abs(W-M)>180||l&&!l((C+H)/2,(M+W)/2))continue;const V=ht(C,M,q),L=ht(H,W,q);g.push(V.x,V.y,V.z,L.x,L.y,L.z)}return g},$=a.objects.countries,J=k(t(a,$)),D="826",R=(r,l)=>{let g=!1;for(let h=0,w=_t.length-1;h<_t.length;w=h++){const[M,C]=_t[h],[W,H]=_t[w];C>l!=H>l&&r<(W-M)*(l-C)/(H-C)+M&&(g=!g)}return g},mt=k({coordinates:[Array.from({length:9},(r,l)=>[-3.06+1.04*l/8,54.98+.81*l/8])]}),zt=xe.map((r,l)=>{const g=k(t(a,$,(w,M)=>r.includes(String(w.id))&&w.id!==D||r.includes(String(M.id))&&M.id!==D));if(!r.includes(D))return g;const h=k(t(a,$,(w,M)=>w.id===D||M.id===D),(w,M)=>R(M,w)===(l===1));return g.concat(h,mt)});return{land:it(v.c),mask:it(B.c),lines:{all:J.concat(mt),hot:zt}}}function Xe(c){const t=new De({canvas:c,antialias:!0,alpha:!0,powerPreference:"high-performance"});let n=Math.min(2,window.devicePixelRatio||1);t.setPixelRatio(n),t.outputColorSpace=Le;const a=new Oe,i=new Be(30,1,.1,50),d=new E(-.25,.75,-.6).normalize(),p=new dt,u=new dt,y=new dt;p.add(u),u.add(y),a.add(p);const z=new Xt(new fe(1,160,120),new Ct({uniforms:{uSun:{value:d},uTime:{value:0},uLand:{value:null},uMask:{value:null},uMapOn:{value:0},uGroup:{value:new nt}},vertexShader:`
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
        ${Ve}
        void main(){
          vec3 n = normalize(vN);
          float light = dot(n, uSun);
          float day = smoothstep(-0.25, 0.55, light);
          // Cloud streaks, stretched along the latitude
          vec3 q = vLocal * vec3(4.2, 11.0, 4.2) + vec3(uTime * 0.012, 0.0, 0.0);
          float c = fbm(q + noise(q * 0.7) * 1.6);
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
            col = mix(col, vec3(0.30, 0.20, 0.05), hot * lm.r * 0.85);
          }
          col += clouds * vec3(0.78, 0.82, 0.88) * day * 0.7;
          col += clouds * vec3(0.05, 0.06, 0.08) * (1.0 - day);
          // Thin bright rim where the sun grazes the horizon
          float fres = pow(1.0 - max(dot(n, vView), 0.0), 3.0);
          col += fres * vec3(0.55, 0.68, 0.9) * (0.15 + day * 1.6);
          gl_FragColor = vec4(col, 1.0);
        }`}));y.add(z);const x=z.material.uniforms,v=new nt,B=[];let Y=null;const it=[],q=(e,o,s)=>{const f=new Se;f.setPositions(e);const m=new be({color:o,linewidth:s,transparent:!0,opacity:0,depthWrite:!1});return m.resolution.set(c.clientWidth||1,c.clientHeight||1),B.push(m),y.add(new Ge(f,m)),m};qe().then(({land:e,mask:o,lines:s})=>{x.uLand.value=e,x.uMask.value=o,x.uMapOn.value=.001,Y=q(s.all,7041917,.9),s.hot.forEach(f=>it.push(q(f,16763213,1.7)))}).catch(e=>console.error("World map unavailable:",e));const k=new Xt(new fe(1.08,96,64),new Ct({uniforms:{uSun:{value:d}},vertexShader:`
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
        }`,side:Ce,transparent:!0,blending:ue,depthWrite:!1}));p.add(k);let $=11;const J=()=>($=$*16807%2147483647)/2147483647,D=()=>Math.sqrt(-2*Math.log(Math.max(1e-6,J())))*Math.cos(2*Math.PI*J()),R=[],mt=[],zt=[],r=[],l=(e,o,s,f,m)=>{const _=Math.round(60*s);for(let b=0;b<_;b++){const S=b<5,O=S?.22:m*(.7+s*.6),j=ht(e+D()*O*.8,o+D()*O,1.002);R.push(j.x,j.y,j.z),mt.push(S?3*s+1.4:.8+J()*1.5),zt.push(S?1:.35+J()*.5),r.push(f)}};Yt.forEach((e,o)=>e.anchors.forEach(([s,f,m])=>l(s,f,m,o,o===12?1.6:.9))),ke.forEach(([e,o,s])=>l(e,o,s,ft-1,1.4));const g=new Re;g.setAttribute("position",new ut(R,3)),g.setAttribute("aSize",new ut(mt,1)),g.setAttribute("aGlow",new ut(zt,1)),g.setAttribute("aNation",new ut(r,1));const h=new Array(ft).fill(1),w=new Array(ft).fill(1),M=new We(g,new Ct({uniforms:{uSun:{value:d},uPx:{value:1},uAct:{value:h}},vertexShader:`
        attribute float aSize; attribute float aGlow; attribute float aNation; uniform vec3 uSun; uniform float uPx;
        uniform float uAct[${ft}];
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
        }`,transparent:!0,blending:ue,depthWrite:!1}));y.add(M);const C=Z.degToRad(24),W=Z.degToRad(52),H=26,V=e=>{const o=ht(0,e);return-Math.atan2(o.x,o.z)},L=e=>({x:e,v:0,to:e}),vt=(e,o,s=6.5)=>{let f=o;for(;f>1e-6;){const m=Math.min(f,.008333333333333333);e.v+=(s*s*(e.to-e.x)-2*s*e.v)*m,e.x+=e.v*m,f-=m}},K=L(47),ot=L(V(9)),gt=L(1),xt=L(0),N=L(0),Et=L(W);let Ht=0,At=null,Qt=null;const Pt=new E(0,.95,0),te=new E,Ut=new E,yt=new E;let Q=0;const ee=.92;let Nt=null,ne=0,ie=!1,at=0;const jt=()=>{const e=c.clientWidth||1,o=c.clientHeight||1;t.setSize(e,o,!1),i.aspect=e/o;const s=e/o<1?5:3.7;i.position.set(0,Math.sin(C)*s,Math.cos(C)*s),Pt.set(0,e/o<1?.75:.95,0),i.lookAt(Pt),i.updateProjectionMatrix(),M.material.uniforms.uPx.value=t.getPixelRatio()*(o/900)*2.2,B.forEach(f=>f.resolution.set(e,o))};jt();const oe=new ResizeObserver(jt);oe.observe(c);const Ft=new He;let It=0,Tt=0,Dt=0;const Gt=Z.degToRad(i.fov/2),st=Z.degToRad,Me=()=>{const e=Math.min(.1,Ft.getDelta()),o=Ft.elapsedTime,s=A=>1-Math.exp(-A*e);Nt?(Q=Nt(),at=Q):at+=(Q-at)*s(40),ie=Math.abs(Q-ne)>1e-4,ne=Q,[K,ot,gt,xt,Et].forEach(A=>vt(A,e)),vt(N,e,6);const f=c.clientHeight||1,m=i.position.distanceTo(Pt),_=2*m*Math.tan(Gt)/f;Dt=_,It+=(Ht-It)*s(9);const b=-.28-ee*(1-Math.min(1,at))+xt.x-It*_;let S=0,O=b,j=0,rt=gt.x,tt=st(K.x)-Et.x;const X=Math.min(1,Math.max(0,N.x));if(X>5e-4&&At){i.updateMatrixWorld(),te.set(0,1-2*At.y/f,.5).unproject(i).sub(i.position).normalize(),yt.copy(i.position).addScaledVector(te,m),Ut.copy(i.position).sub(yt);const A=st(K.x)-Math.atan2(Ut.y,Math.hypot(Ut.x,Ut.z));S=yt.x*X,O=b+(yt.y-b)*X,j=yt.z*X,rt=rt+(At.r*_-rt)*X,tt=tt+(A-tt)*X}p.position.set(S,O,j),p.scale.setScalar(rt),u.rotation.x=tt,y.rotation.y=ot.x;for(let A=0;A<ft;A++)h[A]+=(w[A]-h[A])*s(3);x.uMapOn.value>0&&(x.uMapOn.value=Math.min(1,x.uMapOn.value+e*1.2)),x.uGroup.value.lerp(v,s(3));const ct=x.uGroup.value;Y&&(Y.opacity=.55*Math.min(1,x.uMapOn.value)),it.forEach((A,lt)=>A.opacity=.95*Math.min(1,lt===0?ct.x:lt===1?ct.y:ct.z)),e>0&&(Tt=Tt*.95+(e>.024?1:0)*.05,Tt>.6&&n>1.25&&(n=Math.max(1.25,n-.375),t.setPixelRatio(n),jt(),Tt=0)),z.material.uniforms.uTime.value=o,t.render(a,i),Qt?.()};let wt=0,St=!0;const kt=()=>{Me(),St&&(wt=requestAnimationFrame(kt))};wt=requestAnimationFrame(kt);const ae=new IntersectionObserver(([e])=>{e.isIntersecting&&!St?(St=!0,Ft.getDelta(),wt=requestAnimationFrame(kt)):e.isIntersecting||(St=!1,cancelAnimationFrame(wt))});return ae.observe(c),{setProgressSource(e){Nt=e},setProgress(e){Q=e},setFocus(e,o,s,f=-1,m=1,_){gt.to=m,Et.to=_!==void 0?st(_):W+st(H)*(m-1);for(let O=0;O<ft;O++)w[O]=e===null?1:e.includes(O)?1.9:0;const b=f===4?1:0;v.set(f===0?1:b,f===1?1:b,f===2?1:b,f===3?1:0),K.to=o[0];let S=V(o[1])-ot.x;S=Math.atan2(Math.sin(S),Math.cos(S)),ot.to=ot.x+S,xt.to=s??0},setFrame(e,o){e&&(At=e),N.to=e?1:0,o?.jump&&(N.x=N.to,N.v=0),o?.push&&(N.v=(N.to>N.x?1:-1)*o.push)},onFrame(e){Qt=e},moving(){const e=(o,s)=>Math.abs(o.to-o.x)>s||Math.abs(o.v)>s*3;return e(K,.6)||e(ot,.01)||e(gt,.015)||e(xt,.015)||e(Et,.01)||e(N,.015)||Math.abs(Q-at)>.02||ie||at<.999},setShift(e){Ht=e},riseSpan(){return Dt?ee/Dt:0},fitZoom(e,o,s,f,m,_,b){const S=new dt,O=new dt,j=new dt;S.add(O),O.add(j);const rt=c.clientWidth||1,tt=c.clientHeight||1,X=Dt||2*i.position.distanceTo(Pt)*Math.tan(Gt)/tt;i.updateMatrixWorld();const ct=new E,A=bt=>(S.position.set(0,-.28+(1.12-bt+s)-Ht*X,0),S.scale.setScalar(bt),O.rotation.x=st(o[0])-st(f),j.rotation.y=V(o[1]),S.updateMatrixWorld(!0),ct.setFromMatrixPosition(S.matrixWorld),e.every(([Mt,_e])=>{const Vt=ht(Mt,_e,1.003).applyMatrix4(j.matrixWorld),ze=Vt.clone().sub(ct).normalize().dot(i.position.clone().sub(Vt).normalize()),re=Vt.project(i),ce=(re.x+1)/2*rt,le=(1-re.y)/2*tt;return ze>.22&&ce>=b.x0&&ce<=b.x1&&le>=b.y0&&le<=b.y1}));if(!A(m))return m;if(A(_))return _;let lt=m,se=_;for(let bt=0;bt<16;bt++){const Mt=(lt+se)/2;A(Mt)?lt=Mt:se=Mt}return lt},restTop(e=xt.to,o=gt.to){const s=c.clientHeight||1,f=new E(0,-.28+e,0),m=i.position.distanceTo(f),_=f.project(i),b=Math.asin(Math.min(1,o/m)),S=s/2*Math.tan(b)/Math.tan(Gt);return(1-_.y)/2*s-S*1.1},project(e,o){const s=ht(e,o,1.003).applyMatrix4(y.matrixWorld),f=new E().setFromMatrixPosition(p.matrixWorld),m=s.clone().sub(f).normalize().dot(i.position.clone().sub(s).normalize()),_=s.project(i),b=c.clientWidth||1,S=c.clientHeight||1;return{x:(_.x+1)/2*b,y:(1-_.y)/2*S,visible:m>.08}},circle(){const e=c.clientWidth||1,o=c.clientHeight||1,s=p.position.clone().project(i),f=i.position.distanceTo(p.position),m=Math.asin(Math.min(1,p.scale.x/f)),_=o/2*Math.tan(m)/Math.tan(Z.degToRad(i.fov/2));return{x:(s.x+1)/2*e,y:(1-s.y)/2*o,r:_}},dispose(){St=!1,cancelAnimationFrame(wt),ae.disconnect(),oe.disconnect(),a.traverse(e=>{const o=e;o.geometry?.dispose?.(),o.material?.dispose?.()}),t.dispose()}}}export{Yt as COUNTRIES,Xe as createGlobe};
