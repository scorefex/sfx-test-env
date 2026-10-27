import{_ as Zt}from"./index-CuKGVhB3.js";import{I as ue,F as ot,l as Ft,m as at,n as pe,o as It,p as re,V as E,q as At,r as Ut,U as ce,s as he,t as Pt,M as Gt,u as Z,L as me,v as ve,i as K,W as ge,S as xe,a as ye,P as we,G as Wt,w as Qt,x as te,y as Se,z as be,H as Me,C as _e,g as ze,N as Ee}from"./three.module-DcPyBqb0.js";import"./react-D4DUQgMP.js";const ee=new It,_t=new E;class le extends ue{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry";const t=[-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],n=[-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],a=[0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5];this.setIndex(a),this.setAttribute("position",new ot(t,3)),this.setAttribute("uv",new ot(n,2))}applyMatrix4(t){const n=this.attributes.instanceStart,a=this.attributes.instanceEnd;return n!==void 0&&(n.applyMatrix4(t),a.applyMatrix4(t),n.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(t){let n;t instanceof Float32Array?n=t:Array.isArray(t)&&(n=new Float32Array(t));const a=new Ft(n,6,1);return this.setAttribute("instanceStart",new at(a,3,0)),this.setAttribute("instanceEnd",new at(a,3,3)),this.instanceCount=this.attributes.instanceStart.count,this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(t){let n;t instanceof Float32Array?n=t:Array.isArray(t)&&(n=new Float32Array(t));const a=new Ft(n,6,1);return this.setAttribute("instanceColorStart",new at(a,3,0)),this.setAttribute("instanceColorEnd",new at(a,3,3)),this}fromWireframeGeometry(t){return this.setPositions(t.attributes.position.array),this}fromEdgesGeometry(t){return this.setPositions(t.attributes.position.array),this}fromMesh(t){return this.fromWireframeGeometry(new pe(t.geometry)),this}fromLineSegments(t){const n=t.geometry;return this.setPositions(n.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new It);const t=this.attributes.instanceStart,n=this.attributes.instanceEnd;t!==void 0&&n!==void 0&&(this.boundingBox.setFromBufferAttribute(t),ee.setFromBufferAttribute(n),this.boundingBox.union(ee))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new re),this.boundingBox===null&&this.computeBoundingBox();const t=this.attributes.instanceStart,n=this.attributes.instanceEnd;if(t!==void 0&&n!==void 0){const a=this.boundingSphere.center;this.boundingBox.getCenter(a);let i=0;for(let d=0,u=t.count;d<u;d++)_t.fromBufferAttribute(t,d),i=Math.max(i,a.distanceToSquared(_t)),_t.fromBufferAttribute(n,d),i=Math.max(i,a.distanceToSquared(_t));this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}}Pt.line={worldUnits:{value:1},linewidth:{value:1},resolution:{value:new he},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}};Ut.line={uniforms:ce.merge([Pt.common,Pt.fog,Pt.line]),vertexShader:`
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
		`};class de extends At{constructor(t){super({type:"LineMaterial",uniforms:ce.clone(Ut.line.uniforms),vertexShader:Ut.line.vertexShader,fragmentShader:Ut.line.fragmentShader,clipping:!0}),this.isLineMaterial=!0,this.setValues(t)}get color(){return this.uniforms.diffuse.value}set color(t){this.uniforms.diffuse.value=t}get worldUnits(){return"WORLD_UNITS"in this.defines}set worldUnits(t){t===!0!==this.worldUnits&&(this.needsUpdate=!0),t===!0?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}get linewidth(){return this.uniforms.linewidth.value}set linewidth(t){this.uniforms.linewidth&&(this.uniforms.linewidth.value=t)}get dashed(){return"USE_DASH"in this.defines}set dashed(t){t===!0!==this.dashed&&(this.needsUpdate=!0),t===!0?this.defines.USE_DASH="":delete this.defines.USE_DASH}get dashScale(){return this.uniforms.dashScale.value}set dashScale(t){this.uniforms.dashScale.value=t}get dashSize(){return this.uniforms.dashSize.value}set dashSize(t){this.uniforms.dashSize.value=t}get dashOffset(){return this.uniforms.dashOffset.value}set dashOffset(t){this.uniforms.dashOffset.value=t}get gapSize(){return this.uniforms.gapSize.value}set gapSize(t){this.uniforms.gapSize.value=t}get opacity(){return this.uniforms.opacity.value}set opacity(t){this.uniforms&&(this.uniforms.opacity.value=t)}get resolution(){return this.uniforms.resolution.value}set resolution(t){this.uniforms.resolution.value.copy(t)}get alphaToCoverage(){return"USE_ALPHA_TO_COVERAGE"in this.defines}set alphaToCoverage(t){this.defines&&(t===!0!==this.alphaToCoverage&&(this.needsUpdate=!0),t===!0?this.defines.USE_ALPHA_TO_COVERAGE="":delete this.defines.USE_ALPHA_TO_COVERAGE)}}const Nt=new Z,ne=new E,ie=new E,M=new Z,_=new Z,j=new Z,Ht=new E,jt=new ve,z=new me,oe=new E,zt=new It,Et=new re,F=new Z;let G,Y;function ae(l,t,n){return F.set(0,0,-t,1).applyMatrix4(l.projectionMatrix),F.multiplyScalar(1/F.w),F.x=Y/n.width,F.y=Y/n.height,F.applyMatrix4(l.projectionMatrixInverse),F.multiplyScalar(1/F.w),Math.abs(Math.max(F.x,F.y))}function Ae(l,t){const n=l.matrixWorld,a=l.geometry,i=a.attributes.instanceStart,d=a.attributes.instanceEnd,u=Math.min(a.instanceCount,i.count);for(let f=0,y=u;f<y;f++){z.start.fromBufferAttribute(i,f),z.end.fromBufferAttribute(d,f),z.applyMatrix4(n);const b=new E,x=new E;G.distanceSqToSegment(z.start,z.end,x,b),x.distanceTo(b)<Y*.5&&t.push({point:x,pointOnLine:b,distance:G.origin.distanceTo(x),object:l,face:null,faceIndex:f,uv:null,uv1:null})}}function Ue(l,t,n){const a=t.projectionMatrix,d=l.material.resolution,u=l.matrixWorld,f=l.geometry,y=f.attributes.instanceStart,b=f.attributes.instanceEnd,x=Math.min(f.instanceCount,y.count),m=-t.near;G.at(1,j),j.w=1,j.applyMatrix4(t.matrixWorldInverse),j.applyMatrix4(a),j.multiplyScalar(1/j.w),j.x*=d.x/2,j.y*=d.y/2,j.z=0,Ht.copy(j),jt.multiplyMatrices(t.matrixWorldInverse,u);for(let T=0,X=x;T<X;T++){if(M.fromBufferAttribute(y,T),_.fromBufferAttribute(b,T),M.w=1,_.w=1,M.applyMatrix4(jt),_.applyMatrix4(jt),M.z>m&&_.z>m)continue;if(M.z>m){const A=M.z-_.z,C=(M.z-m)/A;M.lerp(_,C)}else if(_.z>m){const A=_.z-M.z,C=(_.z-m)/A;_.lerp(M,C)}M.applyMatrix4(a),_.applyMatrix4(a),M.multiplyScalar(1/M.w),_.multiplyScalar(1/_.w),M.x*=d.x/2,M.y*=d.y/2,_.x*=d.x/2,_.y*=d.y/2,z.start.copy(M),z.start.z=0,z.end.copy(_),z.end.z=0;const V=z.closestPointToPointParameter(Ht,!0);z.at(V,oe);const I=K.lerp(M.z,_.z,V),k=I>=-1&&I<=1,q=Ht.distanceTo(oe)<Y*.5;if(k&&q){z.start.fromBufferAttribute(y,T),z.end.fromBufferAttribute(b,T),z.start.applyMatrix4(u),z.end.applyMatrix4(u);const A=new E,C=new E;G.distanceSqToSegment(z.start,z.end,C,A),n.push({point:C,pointOnLine:A,distance:G.origin.distanceTo(C),object:l,face:null,faceIndex:T,uv:null,uv1:null})}}}class Pe extends Gt{constructor(t=new le,n=new de({color:Math.random()*16777215})){super(t,n),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){const t=this.geometry,n=t.attributes.instanceStart,a=t.attributes.instanceEnd,i=new Float32Array(2*n.count);for(let u=0,f=0,y=n.count;u<y;u++,f+=2)ne.fromBufferAttribute(n,u),ie.fromBufferAttribute(a,u),i[f]=f===0?0:i[f-1],i[f+1]=i[f]+ne.distanceTo(ie);const d=new Ft(i,2,1);return t.setAttribute("instanceDistanceStart",new at(d,1,0)),t.setAttribute("instanceDistanceEnd",new at(d,1,1)),this}raycast(t,n){const a=this.material.worldUnits,i=t.camera;if(i===null&&!a&&console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.'),a===!1&&(this.material.resolution.x===0||this.material.resolution.y===0))return;const d=t.params.Line2!==void 0&&t.params.Line2.threshold||0;G=t.ray;const u=this.matrixWorld,f=this.geometry,y=this.material;Y=y.linewidth+d,f.boundingSphere===null&&f.computeBoundingSphere(),Et.copy(f.boundingSphere).applyMatrix4(u);let b;if(a)b=Y*.5;else{const m=Math.max(i.near,Et.distanceToPoint(G.origin));b=ae(i,m,y.resolution)}if(Et.radius+=b,G.intersectsSphere(Et)===!1)return;f.boundingBox===null&&f.computeBoundingBox(),zt.copy(f.boundingBox).applyMatrix4(u);let x;if(a)x=Y*.5;else{const m=Math.max(i.near,zt.distanceToPoint(G.origin));x=ae(i,m,y.resolution)}zt.expandByScalar(x),G.intersectsBox(zt)!==!1&&(a?Ae(this,n):Ue(this,i,n))}onBeforeRender(t){const n=this.material.uniforms;n&&n.resolution&&(t.getViewport(Nt),this.material.uniforms.resolution.value.set(Nt.z,Nt.w))}}const Vt=[{code:"ENG",anchors:[[51.51,-.12,1.4],[53.48,-2.24,1],[53.41,-2.98,.8],[52.48,-1.9,.8],[53.8,-1.55,.6],[54.97,-1.61,.6],[51.45,-2.59,.5],[50.9,-1.4,.5],[52.63,1.3,.4],[52.95,-1.15,.5],[50.37,-4.14,.3],[53.38,-1.47,.5],[52.2,.12,.4]]},{code:"ESP",anchors:[[40.42,-3.7,1.2],[41.39,2.17,1],[37.39,-5.98,.7],[39.47,-.38,.6],[43.26,-2.93,.5],[36.72,-4.42,.5],[41.65,-.89,.4],[43.36,-8.41,.4],[42.24,-8.72,.4],[37.98,-1.13,.4],[38.35,-.48,.4],[41.65,-4.72,.3],[39.57,2.65,.3]]},{code:"ITA",anchors:[[45.46,9.19,1],[41.9,12.5,1],[45.07,7.69,.6],[40.85,14.27,.7],[44.49,11.34,.5],[43.77,11.25,.5],[45.44,12.32,.4],[44.41,8.93,.4],[38.12,13.36,.4],[41.12,16.87,.4],[45.65,13.77,.3],[39.22,9.12,.3]]},{code:"GER",anchors:[[48.14,11.58,.9],[51.51,7.47,.7],[52.52,13.4,.9],[53.55,9.99,.7],[50.94,6.96,.6],[51.23,6.78,.5],[50.11,8.68,.6],[48.78,9.18,.5],[51.34,12.37,.5],[52.37,9.73,.4],[53.08,8.8,.4],[49.45,11.08,.4],[51.05,13.74,.4],[54.32,10.13,.3]]},{code:"FRA",anchors:[[48.86,2.35,1.3],[43.3,5.37,.7],[45.76,4.84,.7],[50.63,3.06,.5],[43.6,1.44,.5],[44.84,-.58,.5],[47.22,-1.55,.5],[43.7,7.27,.5],[48.57,7.75,.4],[48.11,-1.68,.4],[49.26,4.03,.3],[47.32,5.04,.3],[45.19,5.72,.3]]},{code:"NED",anchors:[[52.37,4.9,.8],[51.92,4.48,.6],[52.09,5.12,.5],[51.44,5.47,.5],[53.22,6.57,.3],[52.22,6.89,.3]]},{code:"POR",anchors:[[38.72,-9.14,.8],[41.15,-8.61,.7],[40.2,-8.41,.4],[37.02,-7.93,.3],[41.55,-8.42,.4]]},{code:"BEL",anchors:[[50.85,4.35,.7],[51.22,4.4,.5],[51.05,3.72,.4],[50.63,5.57,.4],[51.21,3.22,.3]]},{code:"SCO",anchors:[[55.86,-4.25,.8],[55.95,-3.19,.6],[57.15,-2.09,.4],[56.46,-2.97,.4]]},{code:"TUR",anchors:[[41,28.97,1.1],[39.93,32.86,.7],[38.42,27.14,.6],[36.9,30.7,.4],[37,35.32,.5],[40.19,29.06,.4],[41,39.72,.4],[37.87,32.48,.4],[39.9,41.27,.3],[37.07,37.38,.4]]},{code:"NOR",anchors:[[59.91,10.75,.6],[60.39,5.32,.5],[63.43,10.39,.4],[58.97,5.73,.4],[67.28,14.4,.3],[69.65,18.96,.3]]},{code:"KSA",anchors:[[24.71,46.68,1.1],[21.49,39.19,.9],[26.42,50.09,.6],[21.39,39.86,.5],[24.47,39.61,.5],[18.22,42.5,.3],[26.33,43.97,.3],[28.38,36.57,.3]]},{code:"BRA",anchors:[[-23.55,-46.63,1.1],[-22.9,-43.2,.9],[-19.92,-43.94,.6],[-30.03,-51.23,.6],[-25.43,-49.27,.5],[-15.79,-47.88,.5],[-12.97,-38.5,.5],[-8.05,-34.9,.5],[-3.73,-38.52,.5],[-3.1,-60.02,.3],[-16.68,-49.25,.3],[-1.46,-48.5,.3],[-27.6,-48.55,.3]]}];Vt.push({code:"UEFA",anchors:[[53.35,-6.26,.5],[48.2,16.37,.6],[47.5,19.04,.6],[50.08,14.43,.6],[52.23,21,.7],[44.43,26.1,.6],[42.7,23.32,.4],[37.98,23.73,.7],[50.45,30.52,.7],[59.33,18.06,.5],[55.68,12.57,.5],[60.17,24.94,.4],[44.79,20.45,.5],[45.81,15.98,.4],[47.37,8.54,.5],[46.95,7.45,.3],[32.08,34.78,.5],[40.41,49.87,.4],[41.72,44.79,.3],[40.18,44.51,.3],[53.9,27.56,.4],[64.15,-21.94,.2],[43.24,76.89,.3],[56.95,24.11,.3],[54.69,25.28,.3],[59.44,24.75,.3],[41.33,19.82,.3],[42,21.43,.3],[43.86,18.41,.3],[46.06,14.51,.3],[48.15,17.11,.3],[47.01,28.86,.3],[35.17,33.36,.3],[49.61,6.13,.2],[57.71,11.97,.3]]});const Te=[[55.75,37.6,1.1],[59.93,30.33,.6],[25.28,51.53,.6],[25.2,55.27,.8],[24.45,54.38,.5],[29.37,47.98,.5],[31.95,35.93,.5],[33.89,35.5,.4],[30.04,31.24,1.1],[31.2,29.92,.6],[33.57,-7.59,.7],[36.75,3.06,.6],[36.8,10.18,.5],[35.69,51.39,.9],[33.31,44.36,.6],[6.52,3.38,.7],[5.6,-.19,.4],[-1.29,36.82,.4],[-26.2,28.04,.6],[40.71,-74,1],[19.43,-99.13,.8],[-34.6,-58.4,.8],[4.71,-74.07,.5],[35.68,139.69,.9],[37.56,126.97,.7],[19.07,72.88,.7],[28.61,77.21,.7]],it=Vt.length+1,ht=(l,t,n=1)=>{const a=K.degToRad(90-l),i=K.degToRad(t+180);return new E(-Math.sin(a)*Math.cos(i)*n,Math.cos(a)*n,Math.sin(a)*Math.sin(i)*n)},De=`
vec3 hash3(vec3 p){p=vec3(dot(p,vec3(127.1,311.7,74.7)),dot(p,vec3(269.5,183.3,246.1)),dot(p,vec3(113.5,271.9,124.6)));return -1.0+2.0*fract(sin(p)*43758.5453123);}
float noise(vec3 p){vec3 i=floor(p);vec3 f=fract(p);vec3 u=f*f*(3.0-2.0*f);
return mix(mix(mix(dot(hash3(i+vec3(0,0,0)),f-vec3(0,0,0)),dot(hash3(i+vec3(1,0,0)),f-vec3(1,0,0)),u.x),
mix(dot(hash3(i+vec3(0,1,0)),f-vec3(0,1,0)),dot(hash3(i+vec3(1,1,0)),f-vec3(1,1,0)),u.x),u.y),
mix(mix(dot(hash3(i+vec3(0,0,1)),f-vec3(0,0,1)),dot(hash3(i+vec3(1,0,1)),f-vec3(1,0,1)),u.x),
mix(dot(hash3(i+vec3(0,1,1)),f-vec3(0,1,1)),dot(hash3(i+vec3(1,1,1)),f-vec3(1,1,1)),u.x),u.y),u.z);}
float fbm(vec3 p){float v=0.0;float a=0.5;for(int i=0;i<4;i++){v+=a*noise(p);p*=2.03;a*=0.5;}return v;}
`,se=[["826","724","380","276","250"],["826","528","620","056","792","578"],["682","076"]],pt=[[-9,55.05],[-3.2,54.98],[-2.05,55.8],[1,55.8],[1,61.5],[-9,61.5]];async function Le(){const[{feature:l,mesh:t},n]=await Promise.all([Zt(()=>import("./index-BnENo9bV.js"),[]),Zt(()=>import("./countries-50m-DgYPl3oJ.js"),[])]),a=n.default??n,i=l(a,a.objects.countries),d=4096,u=2048,f=r=>(r+180)/360*d,y=r=>(90-r)/180*u,b=(r,c)=>{const v=c.type==="Polygon"?[c.coordinates]:c.type==="MultiPolygon"?c.coordinates:[];for(const p of[-d,0,d])for(const w of v)for(const S of w){let D=0,R=S[0][0];S.forEach(([W,$],U)=>{U&&W-R>180?D-=360:U&&R-W>180&&(D+=360),R=W;const rt=f(W+D)+p,J=y($);U?r.lineTo(rt,J):r.moveTo(rt,J)}),r.closePath()}},x=()=>{const r=document.createElement("canvas");r.width=d,r.height=u;const c=r.getContext("2d");return c.fillStyle="#000",c.fillRect(0,0,d,u),c.globalCompositeOperation="lighter",{c:r,ctx:c}},m=x();for(const r of i.features)m.ctx.beginPath(),b(m.ctx,r.geometry),m.ctx.fillStyle="#ff0000",m.ctx.fill("evenodd");m.ctx.lineWidth=2.2,m.ctx.strokeStyle="#00ff00",m.ctx.lineJoin="round";for(const r of i.features)m.ctx.beginPath(),b(m.ctx,r.geometry),m.ctx.stroke();const T=x(),X=r=>{for(const c of[-d,0,d])pt.forEach(([v,p],w)=>w?r.lineTo(f(v)+c,y(p)):r.moveTo(f(v)+c,y(p)));r.closePath()};["#ff0000","#00ff00","#0000ff"].forEach((r,c)=>{for(const v of i.features){if(!se[c].includes(String(v.id)))continue;const p=T.ctx;p.save(),v.id==="826"&&(p.beginPath(),c===0&&p.rect(-d,0,d*3,u),X(p),p.clip("evenodd")),p.beginPath(),b(p,v.geometry),p.fillStyle=r,p.fill("evenodd"),p.restore()}});const Q=r=>{const c=new ze(r);return c.colorSpace=Ee,c.anisotropy=8,c},V=1.0016,I=(r,c)=>{const v=[];for(const p of r.coordinates)for(let w=1;w<p.length;w++){const[S,D]=p[w-1],[R,W]=p[w];if(Math.abs(R-S)>180||c&&!c((D+W)/2,(S+R)/2))continue;const $=ht(D,S,V),U=ht(W,R,V);v.push($.x,$.y,$.z,U.x,U.y,U.z)}return v},k=a.objects.countries,q=I(t(a,k)),A="826",C=(r,c)=>{let v=!1;for(let p=0,w=pt.length-1;p<pt.length;w=p++){const[S,D]=pt[p],[R,W]=pt[w];D>c!=W>c&&r<(R-S)*(c-D)/(W-D)+S&&(v=!v)}return v},st=I({coordinates:[Array.from({length:9},(r,c)=>[-3.06+1.04*c/8,54.98+.81*c/8])]}),mt=se.map((r,c)=>{const v=I(t(a,k,(w,S)=>r.includes(String(w.id))&&w.id!==A||r.includes(String(S.id))&&S.id!==A));if(!r.includes(A))return v;const p=I(t(a,k,(w,S)=>w.id===A||S.id===A),(w,S)=>C(S,w)===(c===1));return v.concat(p,st)});return{land:Q(m.c),mask:Q(T.c),lines:{all:q.concat(st),hot:mt}}}function Re(l){const t=new ge({canvas:l,antialias:!0,alpha:!0,powerPreference:"high-performance"});let n=Math.min(2,window.devicePixelRatio||1);t.setPixelRatio(n),t.outputColorSpace=xe;const a=new ye,i=new we(30,1,.1,50),d=new E(-.25,.75,-.6).normalize(),u=new Wt,f=new Wt,y=new Wt;u.add(f),f.add(y),a.add(u);const b=new Gt(new Qt(1,160,120),new At({uniforms:{uSun:{value:d},uTime:{value:0},uLand:{value:null},uMask:{value:null},uMapOn:{value:0},uGroup:{value:new Z}},vertexShader:`
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
        ${De}
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
        }`}));y.add(b);const x=b.material.uniforms,m=new Z,T=[];let X=null;const Q=[],V=(e,o,s)=>{const h=new le;h.setPositions(e);const g=new de({color:o,linewidth:s,transparent:!0,opacity:0,depthWrite:!1});return g.resolution.set(l.clientWidth||1,l.clientHeight||1),T.push(g),y.add(new Pe(h,g)),g};Le().then(({land:e,mask:o,lines:s})=>{x.uLand.value=e,x.uMask.value=o,x.uMapOn.value=.001,X=V(s.all,7041917,.9),s.hot.forEach(h=>Q.push(V(h,16763213,1.7)))}).catch(e=>console.error("World map unavailable:",e));const I=new Gt(new Qt(1.08,96,64),new At({uniforms:{uSun:{value:d}},vertexShader:`
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
        }`,side:Se,transparent:!0,blending:te,depthWrite:!1}));u.add(I);let k=11;const q=()=>(k=k*16807%2147483647)/2147483647,A=()=>Math.sqrt(-2*Math.log(Math.max(1e-6,q())))*Math.cos(2*Math.PI*q()),C=[],st=[],mt=[],r=[],c=(e,o,s,h,g)=>{const P=Math.round(60*s);for(let L=0;L<P;L++){const O=L<5,H=O?.22:g*(.7+s*.6),et=ht(e+A()*H*.8,o+A()*H,1.002);C.push(et.x,et.y,et.z),st.push(O?3*s+1.4:.8+q()*1.5),mt.push(O?1:.35+q()*.5),r.push(h)}};Vt.forEach((e,o)=>e.anchors.forEach(([s,h,g])=>c(s,h,g,o,o===12?1.6:.9))),Te.forEach(([e,o,s])=>c(e,o,s,it-1,1.4));const v=new be;v.setAttribute("position",new ot(C,3)),v.setAttribute("aSize",new ot(st,1)),v.setAttribute("aGlow",new ot(mt,1)),v.setAttribute("aNation",new ot(r,1));const p=new Array(it).fill(1),w=new Array(it).fill(1),S=new Me(v,new At({uniforms:{uSun:{value:d},uPx:{value:1},uAct:{value:p}},vertexShader:`
        attribute float aSize; attribute float aGlow; attribute float aNation; uniform vec3 uSun; uniform float uPx;
        uniform float uAct[${it}];
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
        }`,transparent:!0,blending:te,depthWrite:!1}));y.add(S);const D=K.degToRad(24),R=K.degToRad(52),W=26,$=e=>{const o=ht(0,e);return-Math.atan2(o.x,o.z)},U=e=>({x:e,v:0,to:e}),rt=(e,o,s=6.5)=>{let h=o;for(;h>1e-6;){const g=Math.min(h,.008333333333333333);e.v+=(s*s*(e.to-e.x)-2*s*e.v)*g,e.x+=e.v*g,h-=g}},J=U(47),tt=U($(9)),ct=U(1),lt=U(0),N=U(0),vt=U(R);let kt=0,gt=null,qt=null;const Tt=new E(0,.95,0),$t=new E,xt=new E,dt=new E;let Dt=0,yt=0;const Lt=()=>{const e=l.clientWidth||1,o=l.clientHeight||1;t.setSize(e,o,!1),i.aspect=e/o;const s=e/o<1?5:3.7;i.position.set(0,Math.sin(D)*s,Math.cos(D)*s),Tt.set(0,e/o<1?.75:.95,0),i.lookAt(Tt),i.updateProjectionMatrix(),S.material.uniforms.uPx.value=t.getPixelRatio()*(o/900)*2.2,T.forEach(h=>h.resolution.set(e,o))};Lt();const Jt=new ResizeObserver(Lt);Jt.observe(l);const Ot=new _e;let Bt=0,wt=0;const Kt=K.degToRad(i.fov/2),St=K.degToRad,fe=()=>{const e=Math.min(.1,Ot.getDelta()),o=Ot.elapsedTime,s=B=>1-Math.exp(-B*e);yt+=(Dt-yt)*s(7),[J,tt,ct,lt,vt].forEach(B=>rt(B,e)),rt(N,e,6);const h=l.clientHeight||1,g=i.position.distanceTo(Tt),P=2*g*Math.tan(Kt)/h;Bt+=(kt-Bt)*s(9);const L=-.6+.32*Math.min(1,yt)+lt.x-Bt*P;let O=0,H=L,et=0,bt=ct.x,Mt=St(J.x)-vt.x;const nt=Math.min(1,Math.max(0,N.x));if(nt>5e-4&&gt){i.updateMatrixWorld(),$t.set(0,1-2*gt.y/h,.5).unproject(i).sub(i.position).normalize(),dt.copy(i.position).addScaledVector($t,g),xt.copy(i.position).sub(dt);const B=St(J.x)-Math.atan2(xt.y,Math.hypot(xt.x,xt.z));O=dt.x*nt,H=L+(dt.y-L)*nt,et=dt.z*nt,bt=bt+(gt.r*P-bt)*nt,Mt=Mt+(B-Mt)*nt}u.position.set(O,H,et),u.scale.setScalar(bt),f.rotation.x=Mt,y.rotation.y=tt.x;for(let B=0;B<it;B++)p[B]+=(w[B]-p[B])*s(3);x.uMapOn.value>0&&(x.uMapOn.value=Math.min(1,x.uMapOn.value+e*1.2)),x.uGroup.value.lerp(m,s(3));const Rt=x.uGroup.value;X&&(X.opacity=.55*Math.min(1,x.uMapOn.value)),Q.forEach((B,Yt)=>B.opacity=.95*Math.min(1,Yt===0?Rt.x:Yt===1?Rt.y:Rt.z)),e>0&&(wt=wt*.95+(e>.024?1:0)*.05,wt>.6&&n>1.25&&(n=Math.max(1.25,n-.375),t.setPixelRatio(n),Lt(),wt=0)),b.material.uniforms.uTime.value=o,t.render(a,i),qt?.()};let ft=0,ut=!0;const Ct=()=>{fe(),ut&&(ft=requestAnimationFrame(Ct))};ft=requestAnimationFrame(Ct);const Xt=new IntersectionObserver(([e])=>{e.isIntersecting&&!ut?(ut=!0,Ot.getDelta(),ft=requestAnimationFrame(Ct)):e.isIntersecting||(ut=!1,cancelAnimationFrame(ft))});return Xt.observe(l),{setProgress(e){Dt=e},setFocus(e,o,s,h=-1,g=1,P){ct.to=g,vt.to=P!==void 0?St(P):R+St(W)*(g-1);for(let H=0;H<it;H++)w[H]=e===null?1:e.includes(H)?1.9:0;const L=h===4?1:0;m.set(h===0?1:L,h===1?1:L,h===2?1:L,h===3?1:0),J.to=o[0];let O=$(o[1])-tt.x;O=Math.atan2(Math.sin(O),Math.cos(O)),tt.to=tt.x+O,lt.to=s??0},setFrame(e,o){e&&(gt=e),N.to=e?1:0,o?.jump&&(N.x=N.to,N.v=0),o?.push&&(N.v=(N.to>N.x?1:-1)*o.push)},onFrame(e){qt=e},moving(){const e=(o,s)=>Math.abs(o.to-o.x)>s||Math.abs(o.v)>s*3;return e(J,.6)||e(tt,.01)||e(ct,.015)||e(lt,.015)||e(vt,.01)||e(N,.015)||Math.abs(Dt-yt)>.02},setShift(e){kt=e},restTop(){const e=l.clientHeight||1,o=new E(0,-.6+.32+lt.to,0),s=i.position.distanceTo(o),h=o.project(i),g=Math.asin(Math.min(1,ct.to/s)),P=e/2*Math.tan(g)/Math.tan(Kt);return(1-h.y)/2*e-P*1.1},project(e,o){const s=ht(e,o,1.003).applyMatrix4(y.matrixWorld),h=new E().setFromMatrixPosition(u.matrixWorld),g=s.clone().sub(h).normalize().dot(i.position.clone().sub(s).normalize()),P=s.project(i),L=l.clientWidth||1,O=l.clientHeight||1;return{x:(P.x+1)/2*L,y:(1-P.y)/2*O,visible:g>.08}},circle(){const e=l.clientWidth||1,o=l.clientHeight||1,s=u.position.clone().project(i),h=i.position.distanceTo(u.position),g=Math.asin(Math.min(1,u.scale.x/h)),P=o/2*Math.tan(g)/Math.tan(K.degToRad(i.fov/2));return{x:(s.x+1)/2*e,y:(1-s.y)/2*o,r:P}},dispose(){ut=!1,cancelAnimationFrame(ft),Xt.disconnect(),Jt.disconnect(),a.traverse(e=>{const o=e;o.geometry?.dispose?.(),o.material?.dispose?.()}),t.dispose()}}}export{Vt as COUNTRIES,Re as createGlobe};
