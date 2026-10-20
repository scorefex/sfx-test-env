import{_ as Ze}from"./index-DzDY1LuP.js";import{I as ut,F as ie,l as Fe,m as oe,n as pt,o as Ie,p as rt,V as E,q as Ae,r as Ue,U as ct,s as ht,t as Pe,M as Ge,u as Y,L as mt,v as vt,i as J,W as gt,S as xt,a as yt,P as wt,G as We,w as Qe,x as et,y as St,z as bt,H as Mt,C as _t,g as zt,N as Et}from"./three.module-DcPyBqb0.js";import"./react-D4DUQgMP.js";const tt=new Ie,_e=new E;class lt extends ut{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry";const e=[-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],n=[-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],o=[0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5];this.setIndex(o),this.setAttribute("position",new ie(e,3)),this.setAttribute("uv",new ie(n,2))}applyMatrix4(e){const n=this.attributes.instanceStart,o=this.attributes.instanceEnd;return n!==void 0&&(n.applyMatrix4(e),o.applyMatrix4(e),n.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(e){let n;e instanceof Float32Array?n=e:Array.isArray(e)&&(n=new Float32Array(e));const o=new Fe(n,6,1);return this.setAttribute("instanceStart",new oe(o,3,0)),this.setAttribute("instanceEnd",new oe(o,3,3)),this.instanceCount=this.attributes.instanceStart.count,this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(e){let n;e instanceof Float32Array?n=e:Array.isArray(e)&&(n=new Float32Array(e));const o=new Fe(n,6,1);return this.setAttribute("instanceColorStart",new oe(o,3,0)),this.setAttribute("instanceColorEnd",new oe(o,3,3)),this}fromWireframeGeometry(e){return this.setPositions(e.attributes.position.array),this}fromEdgesGeometry(e){return this.setPositions(e.attributes.position.array),this}fromMesh(e){return this.fromWireframeGeometry(new pt(e.geometry)),this}fromLineSegments(e){const n=e.geometry;return this.setPositions(n.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ie);const e=this.attributes.instanceStart,n=this.attributes.instanceEnd;e!==void 0&&n!==void 0&&(this.boundingBox.setFromBufferAttribute(e),tt.setFromBufferAttribute(n),this.boundingBox.union(tt))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new rt),this.boundingBox===null&&this.computeBoundingBox();const e=this.attributes.instanceStart,n=this.attributes.instanceEnd;if(e!==void 0&&n!==void 0){const o=this.boundingSphere.center;this.boundingBox.getCenter(o);let i=0;for(let d=0,u=e.count;d<u;d++)_e.fromBufferAttribute(e,d),i=Math.max(i,o.distanceToSquared(_e)),_e.fromBufferAttribute(n,d),i=Math.max(i,o.distanceToSquared(_e));this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}}Pe.line={worldUnits:{value:1},linewidth:{value:1},resolution:{value:new ht},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}};Ue.line={uniforms:ct.merge([Pe.common,Pe.fog,Pe.line]),vertexShader:`
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
		`};class dt extends Ae{constructor(e){super({type:"LineMaterial",uniforms:ct.clone(Ue.line.uniforms),vertexShader:Ue.line.vertexShader,fragmentShader:Ue.line.fragmentShader,clipping:!0}),this.isLineMaterial=!0,this.setValues(e)}get color(){return this.uniforms.diffuse.value}set color(e){this.uniforms.diffuse.value=e}get worldUnits(){return"WORLD_UNITS"in this.defines}set worldUnits(e){e===!0!==this.worldUnits&&(this.needsUpdate=!0),e===!0?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}get linewidth(){return this.uniforms.linewidth.value}set linewidth(e){this.uniforms.linewidth&&(this.uniforms.linewidth.value=e)}get dashed(){return"USE_DASH"in this.defines}set dashed(e){e===!0!==this.dashed&&(this.needsUpdate=!0),e===!0?this.defines.USE_DASH="":delete this.defines.USE_DASH}get dashScale(){return this.uniforms.dashScale.value}set dashScale(e){this.uniforms.dashScale.value=e}get dashSize(){return this.uniforms.dashSize.value}set dashSize(e){this.uniforms.dashSize.value=e}get dashOffset(){return this.uniforms.dashOffset.value}set dashOffset(e){this.uniforms.dashOffset.value=e}get gapSize(){return this.uniforms.gapSize.value}set gapSize(e){this.uniforms.gapSize.value=e}get opacity(){return this.uniforms.opacity.value}set opacity(e){this.uniforms&&(this.uniforms.opacity.value=e)}get resolution(){return this.uniforms.resolution.value}set resolution(e){this.uniforms.resolution.value.copy(e)}get alphaToCoverage(){return"USE_ALPHA_TO_COVERAGE"in this.defines}set alphaToCoverage(e){this.defines&&(e===!0!==this.alphaToCoverage&&(this.needsUpdate=!0),e===!0?this.defines.USE_ALPHA_TO_COVERAGE="":delete this.defines.USE_ALPHA_TO_COVERAGE)}}const Ne=new Y,nt=new E,it=new E,M=new Y,_=new Y,H=new Y,He=new E,je=new vt,z=new mt,ot=new E,ze=new Ie,Ee=new rt,j=new Y;let F,X;function at(l,e,n){return j.set(0,0,-e,1).applyMatrix4(l.projectionMatrix),j.multiplyScalar(1/j.w),j.x=X/n.width,j.y=X/n.height,j.applyMatrix4(l.projectionMatrixInverse),j.multiplyScalar(1/j.w),Math.abs(Math.max(j.x,j.y))}function At(l,e){const n=l.matrixWorld,o=l.geometry,i=o.attributes.instanceStart,d=o.attributes.instanceEnd,u=Math.min(o.instanceCount,i.count);for(let f=0,y=u;f<y;f++){z.start.fromBufferAttribute(i,f),z.end.fromBufferAttribute(d,f),z.applyMatrix4(n);const b=new E,x=new E;F.distanceSqToSegment(z.start,z.end,x,b),x.distanceTo(b)<X*.5&&e.push({point:x,pointOnLine:b,distance:F.origin.distanceTo(x),object:l,face:null,faceIndex:f,uv:null,uv1:null})}}function Ut(l,e,n){const o=e.projectionMatrix,d=l.material.resolution,u=l.matrixWorld,f=l.geometry,y=f.attributes.instanceStart,b=f.attributes.instanceEnd,x=Math.min(f.instanceCount,y.count),m=-e.near;F.at(1,H),H.w=1,H.applyMatrix4(e.matrixWorldInverse),H.applyMatrix4(o),H.multiplyScalar(1/H.w),H.x*=d.x/2,H.y*=d.y/2,H.z=0,He.copy(H),je.multiplyMatrices(e.matrixWorldInverse,u);for(let T=0,K=x;T<K;T++){if(M.fromBufferAttribute(y,T),_.fromBufferAttribute(b,T),M.w=1,_.w=1,M.applyMatrix4(je),_.applyMatrix4(je),M.z>m&&_.z>m)continue;if(M.z>m){const A=M.z-_.z,C=(M.z-m)/A;M.lerp(_,C)}else if(_.z>m){const A=_.z-M.z,C=(_.z-m)/A;_.lerp(M,C)}M.applyMatrix4(o),_.applyMatrix4(o),M.multiplyScalar(1/M.w),_.multiplyScalar(1/_.w),M.x*=d.x/2,M.y*=d.y/2,_.x*=d.x/2,_.y*=d.y/2,z.start.copy(M),z.start.z=0,z.end.copy(_),z.end.z=0;const I=z.closestPointToPointParameter(He,!0);z.at(I,ot);const G=J.lerp(M.z,_.z,I),V=G>=-1&&G<=1,k=He.distanceTo(ot)<X*.5;if(V&&k){z.start.fromBufferAttribute(y,T),z.end.fromBufferAttribute(b,T),z.start.applyMatrix4(u),z.end.applyMatrix4(u);const A=new E,C=new E;F.distanceSqToSegment(z.start,z.end,C,A),n.push({point:C,pointOnLine:A,distance:F.origin.distanceTo(C),object:l,face:null,faceIndex:T,uv:null,uv1:null})}}}class Pt extends Ge{constructor(e=new lt,n=new dt({color:Math.random()*16777215})){super(e,n),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){const e=this.geometry,n=e.attributes.instanceStart,o=e.attributes.instanceEnd,i=new Float32Array(2*n.count);for(let u=0,f=0,y=n.count;u<y;u++,f+=2)nt.fromBufferAttribute(n,u),it.fromBufferAttribute(o,u),i[f]=f===0?0:i[f-1],i[f+1]=i[f]+nt.distanceTo(it);const d=new Fe(i,2,1);return e.setAttribute("instanceDistanceStart",new oe(d,1,0)),e.setAttribute("instanceDistanceEnd",new oe(d,1,1)),this}raycast(e,n){const o=this.material.worldUnits,i=e.camera;if(i===null&&!o&&console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.'),o===!1&&(this.material.resolution.x===0||this.material.resolution.y===0))return;const d=e.params.Line2!==void 0&&e.params.Line2.threshold||0;F=e.ray;const u=this.matrixWorld,f=this.geometry,y=this.material;X=y.linewidth+d,f.boundingSphere===null&&f.computeBoundingSphere(),Ee.copy(f.boundingSphere).applyMatrix4(u);let b;if(o)b=X*.5;else{const m=Math.max(i.near,Ee.distanceToPoint(F.origin));b=at(i,m,y.resolution)}if(Ee.radius+=b,F.intersectsSphere(Ee)===!1)return;f.boundingBox===null&&f.computeBoundingBox(),ze.copy(f.boundingBox).applyMatrix4(u);let x;if(o)x=X*.5;else{const m=Math.max(i.near,ze.distanceToPoint(F.origin));x=at(i,m,y.resolution)}ze.expandByScalar(x),F.intersectsBox(ze)!==!1&&(o?At(this,n):Ut(this,i,n))}onBeforeRender(e){const n=this.material.uniforms;n&&n.resolution&&(e.getViewport(Ne),this.material.uniforms.resolution.value.set(Ne.z,Ne.w))}}const Ve=[{code:"ENG",anchors:[[51.51,-.12,1.4],[53.48,-2.24,1],[53.41,-2.98,.8],[52.48,-1.9,.8],[53.8,-1.55,.6],[54.97,-1.61,.6],[51.45,-2.59,.5],[50.9,-1.4,.5],[52.63,1.3,.4],[52.95,-1.15,.5],[50.37,-4.14,.3],[53.38,-1.47,.5],[52.2,.12,.4]]},{code:"ESP",anchors:[[40.42,-3.7,1.2],[41.39,2.17,1],[37.39,-5.98,.7],[39.47,-.38,.6],[43.26,-2.93,.5],[36.72,-4.42,.5],[41.65,-.89,.4],[43.36,-8.41,.4],[42.24,-8.72,.4],[37.98,-1.13,.4],[38.35,-.48,.4],[41.65,-4.72,.3],[39.57,2.65,.3]]},{code:"ITA",anchors:[[45.46,9.19,1],[41.9,12.5,1],[45.07,7.69,.6],[40.85,14.27,.7],[44.49,11.34,.5],[43.77,11.25,.5],[45.44,12.32,.4],[44.41,8.93,.4],[38.12,13.36,.4],[41.12,16.87,.4],[45.65,13.77,.3],[39.22,9.12,.3]]},{code:"GER",anchors:[[48.14,11.58,.9],[51.51,7.47,.7],[52.52,13.4,.9],[53.55,9.99,.7],[50.94,6.96,.6],[51.23,6.78,.5],[50.11,8.68,.6],[48.78,9.18,.5],[51.34,12.37,.5],[52.37,9.73,.4],[53.08,8.8,.4],[49.45,11.08,.4],[51.05,13.74,.4],[54.32,10.13,.3]]},{code:"FRA",anchors:[[48.86,2.35,1.3],[43.3,5.37,.7],[45.76,4.84,.7],[50.63,3.06,.5],[43.6,1.44,.5],[44.84,-.58,.5],[47.22,-1.55,.5],[43.7,7.27,.5],[48.57,7.75,.4],[48.11,-1.68,.4],[49.26,4.03,.3],[47.32,5.04,.3],[45.19,5.72,.3]]},{code:"NED",anchors:[[52.37,4.9,.8],[51.92,4.48,.6],[52.09,5.12,.5],[51.44,5.47,.5],[53.22,6.57,.3],[52.22,6.89,.3]]},{code:"POR",anchors:[[38.72,-9.14,.8],[41.15,-8.61,.7],[40.2,-8.41,.4],[37.02,-7.93,.3],[41.55,-8.42,.4]]},{code:"BEL",anchors:[[50.85,4.35,.7],[51.22,4.4,.5],[51.05,3.72,.4],[50.63,5.57,.4],[51.21,3.22,.3]]},{code:"SCO",anchors:[[55.86,-4.25,.8],[55.95,-3.19,.6],[57.15,-2.09,.4],[56.46,-2.97,.4]]},{code:"TUR",anchors:[[41,28.97,1.1],[39.93,32.86,.7],[38.42,27.14,.6],[36.9,30.7,.4],[37,35.32,.5],[40.19,29.06,.4],[41,39.72,.4],[37.87,32.48,.4],[39.9,41.27,.3],[37.07,37.38,.4]]},{code:"NOR",anchors:[[59.91,10.75,.6],[60.39,5.32,.5],[63.43,10.39,.4],[58.97,5.73,.4],[67.28,14.4,.3],[69.65,18.96,.3]]},{code:"KSA",anchors:[[24.71,46.68,1.1],[21.49,39.19,.9],[26.42,50.09,.6],[21.39,39.86,.5],[24.47,39.61,.5],[18.22,42.5,.3],[26.33,43.97,.3],[28.38,36.57,.3]]},{code:"BRA",anchors:[[-23.55,-46.63,1.1],[-22.9,-43.2,.9],[-19.92,-43.94,.6],[-30.03,-51.23,.6],[-25.43,-49.27,.5],[-15.79,-47.88,.5],[-12.97,-38.5,.5],[-8.05,-34.9,.5],[-3.73,-38.52,.5],[-3.1,-60.02,.3],[-16.68,-49.25,.3],[-1.46,-48.5,.3],[-27.6,-48.55,.3]]}];Ve.push({code:"UEFA",anchors:[[53.35,-6.26,.5],[48.2,16.37,.6],[47.5,19.04,.6],[50.08,14.43,.6],[52.23,21,.7],[44.43,26.1,.6],[42.7,23.32,.4],[37.98,23.73,.7],[50.45,30.52,.7],[59.33,18.06,.5],[55.68,12.57,.5],[60.17,24.94,.4],[44.79,20.45,.5],[45.81,15.98,.4],[47.37,8.54,.5],[46.95,7.45,.3],[32.08,34.78,.5],[40.41,49.87,.4],[41.72,44.79,.3],[40.18,44.51,.3],[53.9,27.56,.4],[64.15,-21.94,.2],[43.24,76.89,.3],[56.95,24.11,.3],[54.69,25.28,.3],[59.44,24.75,.3],[41.33,19.82,.3],[42,21.43,.3],[43.86,18.41,.3],[46.06,14.51,.3],[48.15,17.11,.3],[47.01,28.86,.3],[35.17,33.36,.3],[49.61,6.13,.2],[57.71,11.97,.3]]});const Tt=[[55.75,37.6,1.1],[59.93,30.33,.6],[25.28,51.53,.6],[25.2,55.27,.8],[24.45,54.38,.5],[29.37,47.98,.5],[31.95,35.93,.5],[33.89,35.5,.4],[30.04,31.24,1.1],[31.2,29.92,.6],[33.57,-7.59,.7],[36.75,3.06,.6],[36.8,10.18,.5],[35.69,51.39,.9],[33.31,44.36,.6],[6.52,3.38,.7],[5.6,-.19,.4],[-1.29,36.82,.4],[-26.2,28.04,.6],[40.71,-74,1],[19.43,-99.13,.8],[-34.6,-58.4,.8],[4.71,-74.07,.5],[35.68,139.69,.9],[37.56,126.97,.7],[19.07,72.88,.7],[28.61,77.21,.7]],ne=Ve.length+1,pe=(l,e,n=1)=>{const o=J.degToRad(90-l),i=J.degToRad(e+180);return new E(-Math.sin(o)*Math.cos(i)*n,Math.cos(o)*n,Math.sin(o)*Math.sin(i)*n)},Dt=`
vec3 hash3(vec3 p){p=vec3(dot(p,vec3(127.1,311.7,74.7)),dot(p,vec3(269.5,183.3,246.1)),dot(p,vec3(113.5,271.9,124.6)));return -1.0+2.0*fract(sin(p)*43758.5453123);}
float noise(vec3 p){vec3 i=floor(p);vec3 f=fract(p);vec3 u=f*f*(3.0-2.0*f);
return mix(mix(mix(dot(hash3(i+vec3(0,0,0)),f-vec3(0,0,0)),dot(hash3(i+vec3(1,0,0)),f-vec3(1,0,0)),u.x),
mix(dot(hash3(i+vec3(0,1,0)),f-vec3(0,1,0)),dot(hash3(i+vec3(1,1,0)),f-vec3(1,1,0)),u.x),u.y),
mix(mix(dot(hash3(i+vec3(0,0,1)),f-vec3(0,0,1)),dot(hash3(i+vec3(1,0,1)),f-vec3(1,0,1)),u.x),
mix(dot(hash3(i+vec3(0,1,1)),f-vec3(0,1,1)),dot(hash3(i+vec3(1,1,1)),f-vec3(1,1,1)),u.x),u.y),u.z);}
float fbm(vec3 p){float v=0.0;float a=0.5;for(int i=0;i<4;i++){v+=a*noise(p);p*=2.03;a*=0.5;}return v;}
`,st=[["826","724","380","276","250"],["826","528","620","056","792","578"],["682","076"]],ue=[[-9,55.05],[-3.2,54.98],[-2.05,55.8],[1,55.8],[1,61.5],[-9,61.5]];async function Lt(){const[{feature:l,mesh:e},n]=await Promise.all([Ze(()=>import("./index-BnENo9bV.js"),[]),Ze(()=>import("./countries-50m-DgYPl3oJ.js"),[])]),o=n.default??n,i=l(o,o.objects.countries),d=4096,u=2048,f=r=>(r+180)/360*d,y=r=>(90-r)/180*u,b=(r,c)=>{const v=c.type==="Polygon"?[c.coordinates]:c.type==="MultiPolygon"?c.coordinates:[];for(const p of[-d,0,d])for(const w of v)for(const S of w){let D=0,R=S[0][0];S.forEach(([W,q],U)=>{U&&W-R>180?D-=360:U&&R-W>180&&(D+=360),R=W;const se=f(W+D)+p,$=y(q);U?r.lineTo(se,$):r.moveTo(se,$)}),r.closePath()}},x=()=>{const r=document.createElement("canvas");r.width=d,r.height=u;const c=r.getContext("2d");return c.fillStyle="#000",c.fillRect(0,0,d,u),c.globalCompositeOperation="lighter",{c:r,ctx:c}},m=x();for(const r of i.features)m.ctx.beginPath(),b(m.ctx,r.geometry),m.ctx.fillStyle="#ff0000",m.ctx.fill("evenodd");m.ctx.lineWidth=2.2,m.ctx.strokeStyle="#00ff00",m.ctx.lineJoin="round";for(const r of i.features)m.ctx.beginPath(),b(m.ctx,r.geometry),m.ctx.stroke();const T=x(),K=r=>{for(const c of[-d,0,d])ue.forEach(([v,p],w)=>w?r.lineTo(f(v)+c,y(p)):r.moveTo(f(v)+c,y(p)));r.closePath()};["#ff0000","#00ff00","#0000ff"].forEach((r,c)=>{for(const v of i.features){if(!st[c].includes(String(v.id)))continue;const p=T.ctx;p.save(),v.id==="826"&&(p.beginPath(),c===0&&p.rect(-d,0,d*3,u),K(p),p.clip("evenodd")),p.beginPath(),b(p,v.geometry),p.fillStyle=r,p.fill("evenodd"),p.restore()}});const Z=r=>{const c=new zt(r);return c.colorSpace=Et,c.anisotropy=8,c},I=1.0016,G=(r,c)=>{const v=[];for(const p of r.coordinates)for(let w=1;w<p.length;w++){const[S,D]=p[w-1],[R,W]=p[w];if(Math.abs(R-S)>180||c&&!c((D+W)/2,(S+R)/2))continue;const q=pe(D,S,I),U=pe(W,R,I);v.push(q.x,q.y,q.z,U.x,U.y,U.z)}return v},V=o.objects.countries,k=G(e(o,V)),A="826",C=(r,c)=>{let v=!1;for(let p=0,w=ue.length-1;p<ue.length;w=p++){const[S,D]=ue[p],[R,W]=ue[w];D>c!=W>c&&r<(R-S)*(c-D)/(W-D)+S&&(v=!v)}return v},ae=G({coordinates:[Array.from({length:9},(r,c)=>[-3.06+1.04*c/8,54.98+.81*c/8])]}),he=st.map((r,c)=>{const v=G(e(o,V,(w,S)=>r.includes(String(w.id))&&w.id!==A||r.includes(String(S.id))&&S.id!==A));if(!r.includes(A))return v;const p=G(e(o,V,(w,S)=>w.id===A||S.id===A),(w,S)=>C(S,w)===(c===1));return v.concat(p,ae)});return{land:Z(m.c),mask:Z(T.c),lines:{all:k.concat(ae),hot:he}}}function Rt(l){const e=new gt({canvas:l,antialias:!0,alpha:!0,powerPreference:"high-performance"});let n=Math.min(2,window.devicePixelRatio||1);e.setPixelRatio(n),e.outputColorSpace=xt;const o=new yt,i=new wt(30,1,.1,50),d=new E(-.25,.75,-.6).normalize(),u=new We,f=new We,y=new We;u.add(f),f.add(y),o.add(u);const b=new Ge(new Qe(1,160,120),new Ae({uniforms:{uSun:{value:d},uTime:{value:0},uLand:{value:null},uMask:{value:null},uMapOn:{value:0},uGroup:{value:new Y}},vertexShader:`
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
        ${Dt}
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
        }`}));y.add(b);const x=b.material.uniforms,m=new Y,T=[];let K=null;const Z=[],I=(t,a,s)=>{const h=new lt;h.setPositions(t);const g=new dt({color:a,linewidth:s,transparent:!0,opacity:0,depthWrite:!1});return g.resolution.set(l.clientWidth||1,l.clientHeight||1),T.push(g),y.add(new Pt(h,g)),g};Lt().then(({land:t,mask:a,lines:s})=>{x.uLand.value=t,x.uMask.value=a,x.uMapOn.value=.001,K=I(s.all,7041917,.9),s.hot.forEach(h=>Z.push(I(h,16763213,1.7)))}).catch(t=>console.error("World map unavailable:",t));const G=new Ge(new Qe(1.08,96,64),new Ae({uniforms:{uSun:{value:d}},vertexShader:`
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
        }`,side:St,transparent:!0,blending:et,depthWrite:!1}));u.add(G);let V=11;const k=()=>(V=V*16807%2147483647)/2147483647,A=()=>Math.sqrt(-2*Math.log(Math.max(1e-6,k())))*Math.cos(2*Math.PI*k()),C=[],ae=[],he=[],r=[],c=(t,a,s,h,g)=>{const P=Math.round(60*s);for(let L=0;L<P;L++){const O=L<5,N=O?.22:g*(.7+s*.6),ee=pe(t+A()*N*.8,a+A()*N,1.002);C.push(ee.x,ee.y,ee.z),ae.push(O?3*s+1.4:.8+k()*1.5),he.push(O?1:.35+k()*.5),r.push(h)}};Ve.forEach((t,a)=>t.anchors.forEach(([s,h,g])=>c(s,h,g,a,a===12?1.6:.9))),Tt.forEach(([t,a,s])=>c(t,a,s,ne-1,1.4));const v=new bt;v.setAttribute("position",new ie(C,3)),v.setAttribute("aSize",new ie(ae,1)),v.setAttribute("aGlow",new ie(he,1)),v.setAttribute("aNation",new ie(r,1));const p=new Array(ne).fill(1),w=new Array(ne).fill(1),S=new Mt(v,new Ae({uniforms:{uSun:{value:d},uPx:{value:1},uAct:{value:p}},vertexShader:`
        attribute float aSize; attribute float aGlow; attribute float aNation; uniform vec3 uSun; uniform float uPx;
        uniform float uAct[${ne}];
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
        }`,transparent:!0,blending:et,depthWrite:!1}));y.add(S);const D=J.degToRad(24),R=J.degToRad(52),W=26,q=t=>{const a=pe(0,t);return-Math.atan2(a.x,a.z)},U=t=>({x:t,v:0,to:t}),se=(t,a,s=4.2)=>{let h=a;for(;h>1e-6;){const g=Math.min(h,.008333333333333333);t.v+=(s*s*(t.to-t.x)-2*s*t.v)*g,t.x+=t.v*g,h-=g}},$=U(47),Q=U(q(9)),re=U(1),ce=U(0),me=U(0),ve=U(R);let ke=0,ge=null,qe=null;const Te=new E(0,.95,0),$e=new E,xe=new E,le=new E;let De=0,ye=0;const Le=()=>{const t=l.clientWidth||1,a=l.clientHeight||1;e.setSize(t,a,!1),i.aspect=t/a;const s=t/a<1?5:3.7;i.position.set(0,Math.sin(D)*s,Math.cos(D)*s),Te.set(0,t/a<1?.75:.95,0),i.lookAt(Te),i.updateProjectionMatrix(),S.material.uniforms.uPx.value=e.getPixelRatio()*(a/900)*2.2,T.forEach(h=>h.resolution.set(t,a))};Le();const Je=new ResizeObserver(Le);Je.observe(l);const Oe=new _t;let Be=0,we=0;const Ke=J.degToRad(i.fov/2),Se=J.degToRad,ft=()=>{const t=Math.min(.1,Oe.getDelta()),a=Oe.elapsedTime,s=B=>1-Math.exp(-B*t);ye+=(De-ye)*s(7),[$,Q,re,ce,ve].forEach(B=>se(B,t)),se(me,t,3.6);const h=l.clientHeight||1,g=i.position.distanceTo(Te),P=2*g*Math.tan(Ke)/h;Be+=(ke-Be)*s(9);const L=-.6+.32*Math.min(1,ye)+ce.x-Be*P;let O=0,N=L,ee=0,be=re.x,Me=Se($.x)-ve.x;const te=Math.min(1,Math.max(0,me.x));if(te>5e-4&&ge){i.updateMatrixWorld(),$e.set(0,1-2*ge.y/h,.5).unproject(i).sub(i.position).normalize(),le.copy(i.position).addScaledVector($e,g),xe.copy(i.position).sub(le);const B=Se($.x)-Math.atan2(xe.y,Math.hypot(xe.x,xe.z));O=le.x*te,N=L+(le.y-L)*te,ee=le.z*te,be=be+(ge.r*P-be)*te,Me=Me+(B-Me)*te}u.position.set(O,N,ee),u.scale.setScalar(be),f.rotation.x=Me,y.rotation.y=Q.x+Math.sin(a*.08)*.015;for(let B=0;B<ne;B++)p[B]+=(w[B]-p[B])*s(3);x.uMapOn.value>0&&(x.uMapOn.value=Math.min(1,x.uMapOn.value+t*1.2)),x.uGroup.value.lerp(m,s(3));const Re=x.uGroup.value;K&&(K.opacity=.55*Math.min(1,x.uMapOn.value)),Z.forEach((B,Ye)=>B.opacity=.95*Math.min(1,Ye===0?Re.x:Ye===1?Re.y:Re.z)),t>0&&(we=we*.95+(t>.024?1:0)*.05,we>.6&&n>1.25&&(n=Math.max(1.25,n-.375),e.setPixelRatio(n),Le(),we=0)),b.material.uniforms.uTime.value=a,e.render(o,i),qe?.()};let de=0,fe=!0;const Ce=()=>{ft(),fe&&(de=requestAnimationFrame(Ce))};de=requestAnimationFrame(Ce);const Xe=new IntersectionObserver(([t])=>{t.isIntersecting&&!fe?(fe=!0,Oe.getDelta(),de=requestAnimationFrame(Ce)):t.isIntersecting||(fe=!1,cancelAnimationFrame(de))});return Xe.observe(l),{setProgress(t){De=t},setFocus(t,a,s,h=-1,g=1,P){re.to=g,ve.to=P!==void 0?Se(P):R+Se(W)*(g-1);for(let N=0;N<ne;N++)w[N]=t===null?1:t.includes(N)?1.9:0;const L=h===4?1:0;m.set(h===0?1:L,h===1?1:L,h===2?1:L,h===3?1:0),$.to=a[0];let O=q(a[1])-Q.x;O=Math.atan2(Math.sin(O),Math.cos(O)),Q.to=Q.x+O,ce.to=s??0},setFrame(t){t&&(ge=t),me.to=t?1:0},onFrame(t){qe=t},moving(){const t=(a,s)=>Math.abs(a.to-a.x)>s||Math.abs(a.v)>s*3;return t($,.4)||t(Q,.006)||t(re,.01)||t(ce,.01)||t(ve,.006)||t(me,.01)||Math.abs(De-ye)>.01},setShift(t){ke=t},restTop(){const t=l.clientHeight||1,a=new E(0,-.6+.32+ce.to,0),s=i.position.distanceTo(a),h=a.project(i),g=Math.asin(Math.min(1,re.to/s)),P=t/2*Math.tan(g)/Math.tan(Ke);return(1-h.y)/2*t-P*1.1},project(t,a){const s=pe(t,a,1.003).applyMatrix4(y.matrixWorld),h=new E().setFromMatrixPosition(u.matrixWorld),g=s.clone().sub(h).normalize().dot(i.position.clone().sub(s).normalize()),P=s.project(i),L=l.clientWidth||1,O=l.clientHeight||1;return{x:(P.x+1)/2*L,y:(1-P.y)/2*O,visible:g>.08}},circle(){const t=l.clientWidth||1,a=l.clientHeight||1,s=u.position.clone().project(i),h=i.position.distanceTo(u.position),g=Math.asin(Math.min(1,u.scale.x/h)),P=a/2*Math.tan(g)/Math.tan(J.degToRad(i.fov/2));return{x:(s.x+1)/2*t,y:(1-s.y)/2*a,r:P}},dispose(){fe=!1,cancelAnimationFrame(de),Xe.disconnect(),Je.disconnect(),o.traverse(t=>{const a=t;a.geometry?.dispose?.(),a.material?.dispose?.()}),e.dispose()}}}export{Ve as COUNTRIES,Rt as createGlobe};
