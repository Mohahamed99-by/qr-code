import{c as T,_ as G,r as u,j as c,Q as V}from"./index-qxRmQyyo.js";/**
 * @license lucide-react v0.471.1 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const K=[["path",{d:"M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z",key:"1tc9qg"}],["circle",{cx:"12",cy:"13",r:"3",key:"1vg3eu"}]],Q=T("Camera",K);/**
 * @license lucide-react v0.471.1 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const X=[["rect",{width:"8",height:"4",x:"8",y:"2",rx:"1",ry:"1",key:"tgr4d6"}],["path",{d:"M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2",key:"116196"}]],J=T("Clipboard",X);/**
 * @license lucide-react v0.471.1 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ee=[["path",{d:"M3 7V5a2 2 0 0 1 2-2h2",key:"aa7l1z"}],["path",{d:"M17 3h2a2 2 0 0 1 2 2v2",key:"4qcy5o"}],["path",{d:"M21 17v2a2 2 0 0 1-2 2h-2",key:"6vwrx8"}],["path",{d:"M7 21H5a2 2 0 0 1-2-2v-2",key:"ioqczr"}]],q=T("Scan",ee);/**
 * @license lucide-react v0.471.1 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const te=[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["polyline",{points:"17 8 12 3 7 8",key:"t8dd8p"}],["line",{x1:"12",x2:"12",y1:"3",y2:"15",key:"widbto"}]],ae=T("Upload",te);let O=class m{constructor(e,t,i,s,r){this._legacyCanvasSize=m.DEFAULT_CANVAS_SIZE,this._preferredCamera="environment",this._maxScansPerSecond=25,this._lastScanTimestamp=-1,this._destroyed=this._flashOn=this._paused=this._active=!1,this.$video=e,this.$canvas=document.createElement("canvas"),i&&typeof i=="object"?this._onDecode=t:(console.warn(i||s||r?"You're using a deprecated version of the QrScanner constructor which will be removed in the future":"Note that the type of the scan result passed to onDecode will change in the future. To already switch to the new api today, you can pass returnDetailedScanResult: true."),this._legacyOnDecode=t),t=typeof i=="object"?i:{},this._onDecodeError=t.onDecodeError||(typeof i=="function"?i:this._onDecodeError),this._calculateScanRegion=t.calculateScanRegion||(typeof s=="function"?s:this._calculateScanRegion),this._preferredCamera=t.preferredCamera||r||this._preferredCamera,this._legacyCanvasSize=typeof i=="number"?i:typeof s=="number"?s:this._legacyCanvasSize,this._maxScansPerSecond=t.maxScansPerSecond||this._maxScansPerSecond,this._onPlay=this._onPlay.bind(this),this._onLoadedMetaData=this._onLoadedMetaData.bind(this),this._onVisibilityChange=this._onVisibilityChange.bind(this),this._updateOverlay=this._updateOverlay.bind(this),e.disablePictureInPicture=!0,e.playsInline=!0,e.muted=!0;let n=!1;if(e.hidden&&(e.hidden=!1,n=!0),document.body.contains(e)||(document.body.appendChild(e),n=!0),i=e.parentElement,t.highlightScanRegion||t.highlightCodeOutline){if(s=!!t.overlay,this.$overlay=t.overlay||document.createElement("div"),r=this.$overlay.style,r.position="absolute",r.display="none",r.pointerEvents="none",this.$overlay.classList.add("scan-region-highlight"),!s&&t.highlightScanRegion){this.$overlay.innerHTML='<svg class="scan-region-highlight-svg" viewBox="0 0 238 238" preserveAspectRatio="none" style="position:absolute;width:100%;height:100%;left:0;top:0;fill:none;stroke:#e9b213;stroke-width:4;stroke-linecap:round;stroke-linejoin:round"><path d="M31 2H10a8 8 0 0 0-8 8v21M207 2h21a8 8 0 0 1 8 8v21m0 176v21a8 8 0 0 1-8 8h-21m-176 0H10a8 8 0 0 1-8-8v-21"/></svg>';try{this.$overlay.firstElementChild.animate({transform:["scale(.98)","scale(1.01)"]},{duration:400,iterations:1/0,direction:"alternate",easing:"ease-in-out"})}catch{}i.insertBefore(this.$overlay,this.$video.nextSibling)}t.highlightCodeOutline&&(this.$overlay.insertAdjacentHTML("beforeend",'<svg class="code-outline-highlight" preserveAspectRatio="none" style="display:none;width:100%;height:100%;fill:none;stroke:#e9b213;stroke-width:5;stroke-dasharray:25;stroke-linecap:round;stroke-linejoin:round"><polygon/></svg>'),this.$codeOutlineHighlight=this.$overlay.lastElementChild)}this._scanRegion=this._calculateScanRegion(e),requestAnimationFrame(()=>{let o=window.getComputedStyle(e);o.display==="none"&&(e.style.setProperty("display","block","important"),n=!0),o.visibility!=="visible"&&(e.style.setProperty("visibility","visible","important"),n=!0),n&&(console.warn("QrScanner has overwritten the video hiding style to avoid Safari stopping the playback."),e.style.opacity="0",e.style.width="0",e.style.height="0",this.$overlay&&this.$overlay.parentElement&&this.$overlay.parentElement.removeChild(this.$overlay),delete this.$overlay,delete this.$codeOutlineHighlight),this.$overlay&&this._updateOverlay()}),e.addEventListener("play",this._onPlay),e.addEventListener("loadedmetadata",this._onLoadedMetaData),document.addEventListener("visibilitychange",this._onVisibilityChange),window.addEventListener("resize",this._updateOverlay),this._qrEnginePromise=m.createQrEngine()}static set WORKER_PATH(e){console.warn("Setting QrScanner.WORKER_PATH is not required and not supported anymore. Have a look at the README for new setup instructions.")}static async hasCamera(){try{return!!(await m.listCameras(!1)).length}catch{return!1}}static async listCameras(e=!1){if(!navigator.mediaDevices)return[];let t=async()=>(await navigator.mediaDevices.enumerateDevices()).filter(s=>s.kind==="videoinput"),i;try{e&&(await t()).every(s=>!s.label)&&(i=await navigator.mediaDevices.getUserMedia({audio:!1,video:!0}))}catch{}try{return(await t()).map((s,r)=>({id:s.deviceId,label:s.label||(r===0?"Default Camera":`Camera ${r+1}`)}))}finally{i&&(console.warn("Call listCameras after successfully starting a QR scanner to avoid creating a temporary video stream"),m._stopVideoStream(i))}}async hasFlash(){let e;try{if(this.$video.srcObject){if(!(this.$video.srcObject instanceof MediaStream))return!1;e=this.$video.srcObject}else e=(await this._getCameraStream()).stream;return"torch"in e.getVideoTracks()[0].getSettings()}catch{return!1}finally{e&&e!==this.$video.srcObject&&(console.warn("Call hasFlash after successfully starting the scanner to avoid creating a temporary video stream"),m._stopVideoStream(e))}}isFlashOn(){return this._flashOn}async toggleFlash(){this._flashOn?await this.turnFlashOff():await this.turnFlashOn()}async turnFlashOn(){if(!this._flashOn&&!this._destroyed&&(this._flashOn=!0,this._active&&!this._paused))try{if(!await this.hasFlash())throw"No flash available";await this.$video.srcObject.getVideoTracks()[0].applyConstraints({advanced:[{torch:!0}]})}catch(e){throw this._flashOn=!1,e}}async turnFlashOff(){this._flashOn&&(this._flashOn=!1,await this._restartVideoStream())}destroy(){this.$video.removeEventListener("loadedmetadata",this._onLoadedMetaData),this.$video.removeEventListener("play",this._onPlay),document.removeEventListener("visibilitychange",this._onVisibilityChange),window.removeEventListener("resize",this._updateOverlay),this._destroyed=!0,this._flashOn=!1,this.stop(),m._postWorkerMessage(this._qrEnginePromise,"close")}async start(){if(this._destroyed)throw Error("The QR scanner can not be started as it had been destroyed.");if((!this._active||this._paused)&&(window.location.protocol!=="https:"&&console.warn("The camera stream is only accessible if the page is transferred via https."),this._active=!0,!document.hidden))if(this._paused=!1,this.$video.srcObject)await this.$video.play();else try{let{stream:e,facingMode:t}=await this._getCameraStream();!this._active||this._paused?m._stopVideoStream(e):(this._setVideoMirror(t),this.$video.srcObject=e,await this.$video.play(),this._flashOn&&(this._flashOn=!1,this.turnFlashOn().catch(()=>{})))}catch(e){if(!this._paused)throw this._active=!1,e}}stop(){this.pause(),this._active=!1}async pause(e=!1){if(this._paused=!0,!this._active)return!0;this.$video.pause(),this.$overlay&&(this.$overlay.style.display="none");let t=()=>{this.$video.srcObject instanceof MediaStream&&(m._stopVideoStream(this.$video.srcObject),this.$video.srcObject=null)};return e?(t(),!0):(await new Promise(i=>setTimeout(i,300)),this._paused?(t(),!0):!1)}async setCamera(e){e!==this._preferredCamera&&(this._preferredCamera=e,await this._restartVideoStream())}static async scanImage(e,t,i,s,r=!1,n=!1){let o,l=!1;t&&("scanRegion"in t||"qrEngine"in t||"canvas"in t||"disallowCanvasResizing"in t||"alsoTryWithoutScanRegion"in t||"returnDetailedScanResult"in t)?(o=t.scanRegion,i=t.qrEngine,s=t.canvas,r=t.disallowCanvasResizing||!1,n=t.alsoTryWithoutScanRegion||!1,l=!0):console.warn(t||i||s||r||n?"You're using a deprecated api for scanImage which will be removed in the future.":"Note that the return type of scanImage will change in the future. To already switch to the new api today, you can pass returnDetailedScanResult: true."),t=!!i;try{let d,p;[i,d]=await Promise.all([i||m.createQrEngine(),m._loadImage(e)]),[s,p]=m._drawToCanvas(d,o,s,r);let f;if(i instanceof Worker){let h=i;t||m._postWorkerMessageSync(h,"inversionMode","both"),f=await new Promise((g,b)=>{let j,y,x,w=-1;y=C=>{C.data.id===w&&(h.removeEventListener("message",y),h.removeEventListener("error",x),clearTimeout(j),C.data.data!==null?g({data:C.data.data,cornerPoints:m._convertPoints(C.data.cornerPoints,o)}):b(m.NO_QR_CODE_FOUND))},x=C=>{h.removeEventListener("message",y),h.removeEventListener("error",x),clearTimeout(j),b("Scanner error: "+(C?C.message||C:"Unknown Error"))},h.addEventListener("message",y),h.addEventListener("error",x),j=setTimeout(()=>x("timeout"),1e4);let _=p.getImageData(0,0,s.width,s.height);w=m._postWorkerMessageSync(h,"decode",_,[_.data.buffer])})}else f=await Promise.race([new Promise((h,g)=>window.setTimeout(()=>g("Scanner error: timeout"),1e4)),(async()=>{try{var[h]=await i.detect(s);if(!h)throw m.NO_QR_CODE_FOUND;return{data:h.rawValue,cornerPoints:m._convertPoints(h.cornerPoints,o)}}catch(g){if(h=g.message||g,/not implemented|service unavailable/.test(h))return m._disableBarcodeDetector=!0,m.scanImage(e,{scanRegion:o,canvas:s,disallowCanvasResizing:r,alsoTryWithoutScanRegion:n});throw`Scanner error: ${h}`}})()]);return l?f:f.data}catch(d){if(!o||!n)throw d;let p=await m.scanImage(e,{qrEngine:i,canvas:s,disallowCanvasResizing:r});return l?p:p.data}finally{t||m._postWorkerMessage(i,"close")}}setGrayscaleWeights(e,t,i,s=!0){m._postWorkerMessage(this._qrEnginePromise,"grayscaleWeights",{red:e,green:t,blue:i,useIntegerApproximation:s})}setInversionMode(e){m._postWorkerMessage(this._qrEnginePromise,"inversionMode",e)}static async createQrEngine(e){if(e&&console.warn("Specifying a worker path is not required and not supported anymore."),e=()=>G(()=>import("./qr-scanner-worker.min-D85Z9gVD.js"),[]).then(i=>i.createWorker()),!(!m._disableBarcodeDetector&&"BarcodeDetector"in window&&BarcodeDetector.getSupportedFormats&&(await BarcodeDetector.getSupportedFormats()).includes("qr_code")))return e();let t=navigator.userAgentData;return t&&t.brands.some(({brand:i})=>/Chromium/i.test(i))&&/mac ?OS/i.test(t.platform)&&await t.getHighEntropyValues(["architecture","platformVersion"]).then(({architecture:i,platformVersion:s})=>/arm/i.test(i||"arm")&&13<=parseInt(s||"13")).catch(()=>!0)?e():new BarcodeDetector({formats:["qr_code"]})}_onPlay(){this._scanRegion=this._calculateScanRegion(this.$video),this._updateOverlay(),this.$overlay&&(this.$overlay.style.display=""),this._scanFrame()}_onLoadedMetaData(){this._scanRegion=this._calculateScanRegion(this.$video),this._updateOverlay()}_onVisibilityChange(){document.hidden?this.pause():this._active&&this.start()}_calculateScanRegion(e){let t=Math.round(.6666666666666666*Math.min(e.videoWidth,e.videoHeight));return{x:Math.round((e.videoWidth-t)/2),y:Math.round((e.videoHeight-t)/2),width:t,height:t,downScaledWidth:this._legacyCanvasSize,downScaledHeight:this._legacyCanvasSize}}_updateOverlay(){requestAnimationFrame(()=>{if(this.$overlay){var e=this.$video,t=e.videoWidth,i=e.videoHeight,s=e.offsetWidth,r=e.offsetHeight,n=e.offsetLeft,o=e.offsetTop,l=window.getComputedStyle(e),d=l.objectFit,p=t/i,f=s/r;switch(d){case"none":var h=t,g=i;break;case"fill":h=s,g=r;break;default:(d==="cover"?p>f:p<f)?(g=r,h=g*p):(h=s,g=h/p),d==="scale-down"&&(h=Math.min(h,t),g=Math.min(g,i))}var[b,j]=l.objectPosition.split(" ").map((x,w)=>{const _=parseFloat(x);return x.endsWith("%")?(w?r-g:s-h)*_/100:_});l=this._scanRegion.width||t,f=this._scanRegion.height||i,d=this._scanRegion.x||0;var y=this._scanRegion.y||0;p=this.$overlay.style,p.width=`${l/t*h}px`,p.height=`${f/i*g}px`,p.top=`${o+j+y/i*g}px`,i=/scaleX\(-1\)/.test(e.style.transform),p.left=`${n+(i?s-b-h:b)+(i?t-d-l:d)/t*h}px`,p.transform=e.style.transform}})}static _convertPoints(e,t){if(!t)return e;let i=t.x||0,s=t.y||0,r=t.width&&t.downScaledWidth?t.width/t.downScaledWidth:1;t=t.height&&t.downScaledHeight?t.height/t.downScaledHeight:1;for(let n of e)n.x=n.x*r+i,n.y=n.y*t+s;return e}_scanFrame(){!this._active||this.$video.paused||this.$video.ended||("requestVideoFrameCallback"in this.$video?this.$video.requestVideoFrameCallback.bind(this.$video):requestAnimationFrame)(async()=>{if(!(1>=this.$video.readyState)){var e=Date.now()-this._lastScanTimestamp,t=1e3/this._maxScansPerSecond;e<t&&await new Promise(s=>setTimeout(s,t-e)),this._lastScanTimestamp=Date.now();try{var i=await m.scanImage(this.$video,{scanRegion:this._scanRegion,qrEngine:this._qrEnginePromise,canvas:this.$canvas})}catch(s){if(!this._active)return;this._onDecodeError(s)}!m._disableBarcodeDetector||await this._qrEnginePromise instanceof Worker||(this._qrEnginePromise=m.createQrEngine()),i?(this._onDecode?this._onDecode(i):this._legacyOnDecode&&this._legacyOnDecode(i.data),this.$codeOutlineHighlight&&(clearTimeout(this._codeOutlineHighlightRemovalTimeout),this._codeOutlineHighlightRemovalTimeout=void 0,this.$codeOutlineHighlight.setAttribute("viewBox",`${this._scanRegion.x||0} ${this._scanRegion.y||0} ${this._scanRegion.width||this.$video.videoWidth} ${this._scanRegion.height||this.$video.videoHeight}`),this.$codeOutlineHighlight.firstElementChild.setAttribute("points",i.cornerPoints.map(({x:s,y:r})=>`${s},${r}`).join(" ")),this.$codeOutlineHighlight.style.display="")):this.$codeOutlineHighlight&&!this._codeOutlineHighlightRemovalTimeout&&(this._codeOutlineHighlightRemovalTimeout=setTimeout(()=>this.$codeOutlineHighlight.style.display="none",100))}this._scanFrame()})}_onDecodeError(e){e!==m.NO_QR_CODE_FOUND&&console.log(e)}async _getCameraStream(){if(!navigator.mediaDevices)throw"Camera not found.";let e=/^(environment|user)$/.test(this._preferredCamera)?"facingMode":"deviceId",t=[{width:{min:1024}},{width:{min:768}},{}],i=t.map(s=>Object.assign({},s,{[e]:{exact:this._preferredCamera}}));for(let s of[...i,...t])try{let r=await navigator.mediaDevices.getUserMedia({video:s,audio:!1}),n=this._getFacingMode(r)||(s.facingMode?this._preferredCamera:this._preferredCamera==="environment"?"user":"environment");return{stream:r,facingMode:n}}catch{}throw"Camera not found."}async _restartVideoStream(){let e=this._paused;await this.pause(!0)&&!e&&this._active&&await this.start()}static _stopVideoStream(e){for(let t of e.getTracks())t.stop(),e.removeTrack(t)}_setVideoMirror(e){this.$video.style.transform="scaleX("+(e==="user"?-1:1)+")"}_getFacingMode(e){return(e=e.getVideoTracks()[0])?/rear|back|environment/i.test(e.label)?"environment":/front|user|face/i.test(e.label)?"user":null:null}static _drawToCanvas(e,t,i,s=!1){i=i||document.createElement("canvas");let r=t&&t.x?t.x:0,n=t&&t.y?t.y:0,o=t&&t.width?t.width:e.videoWidth||e.width,l=t&&t.height?t.height:e.videoHeight||e.height;return s||(s=t&&t.downScaledWidth?t.downScaledWidth:o,t=t&&t.downScaledHeight?t.downScaledHeight:l,i.width!==s&&(i.width=s),i.height!==t&&(i.height=t)),t=i.getContext("2d",{alpha:!1}),t.imageSmoothingEnabled=!1,t.drawImage(e,r,n,o,l,0,0,i.width,i.height),[i,t]}static async _loadImage(e){if(e instanceof Image)return await m._awaitImageLoad(e),e;if(e instanceof HTMLVideoElement||e instanceof HTMLCanvasElement||e instanceof SVGImageElement||"OffscreenCanvas"in window&&e instanceof OffscreenCanvas||"ImageBitmap"in window&&e instanceof ImageBitmap)return e;if(e instanceof File||e instanceof Blob||e instanceof URL||typeof e=="string"){let t=new Image;t.src=e instanceof File||e instanceof Blob?URL.createObjectURL(e):e.toString();try{return await m._awaitImageLoad(t),t}finally{(e instanceof File||e instanceof Blob)&&URL.revokeObjectURL(t.src)}}else throw"Unsupported image type."}static async _awaitImageLoad(e){e.complete&&e.naturalWidth!==0||await new Promise((t,i)=>{let s=r=>{e.removeEventListener("load",s),e.removeEventListener("error",s),r instanceof ErrorEvent?i("Image load error"):t()};e.addEventListener("load",s),e.addEventListener("error",s)})}static async _postWorkerMessage(e,t,i,s){return m._postWorkerMessageSync(await e,t,i,s)}static _postWorkerMessageSync(e,t,i,s){if(!(e instanceof Worker))return-1;let r=m._workerMessageId++;return e.postMessage({id:r,type:t,data:i},s),r}};O.DEFAULT_CANVAS_SIZE=400;O.NO_QR_CODE_FOUND="No QR code found";O._disableBarcodeDetector=!1;O._workerMessageId=0;let ie={data:""},se=a=>typeof window=="object"?((a?a.querySelector("#_goober"):window._goober)||Object.assign((a||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:a||ie,re=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,oe=/\/\*[^]*?\*\/|  +/g,z=/\n+/g,$=(a,e)=>{let t="",i="",s="";for(let r in a){let n=a[r];r[0]=="@"?r[1]=="i"?t=r+" "+n+";":i+=r[1]=="f"?$(n,r):r+"{"+$(n,r[1]=="k"?"":e)+"}":typeof n=="object"?i+=$(n,e?e.replace(/([^,])+/g,o=>r.replace(/([^,]*:\S+\([^)]*\))|([^,])+/g,l=>/&/.test(l)?l.replace(/&/g,o):o?o+" "+l:l)):r):n!=null&&(r=/^--/.test(r)?r:r.replace(/[A-Z]/g,"-$&").toLowerCase(),s+=$.p?$.p(r,n):r+":"+n+";")}return t+(e&&s?e+"{"+s+"}":s)+i},E={},U=a=>{if(typeof a=="object"){let e="";for(let t in a)e+=t+U(a[t]);return e}return a},ne=(a,e,t,i,s)=>{let r=U(a),n=E[r]||(E[r]=(l=>{let d=0,p=11;for(;d<l.length;)p=101*p+l.charCodeAt(d++)>>>0;return"go"+p})(r));if(!E[n]){let l=r!==a?a:(d=>{let p,f,h=[{}];for(;p=re.exec(d.replace(oe,""));)p[4]?h.shift():p[3]?(f=p[3].replace(z," ").trim(),h.unshift(h[0][f]=h[0][f]||{})):h[0][p[1]]=p[2].replace(z," ").trim();return h[0]})(a);E[n]=$(s?{["@keyframes "+n]:l}:l,t?"":"."+n)}let o=t&&E.g?E.g:null;return t&&(E.g=E[n]),((l,d,p,f)=>{f?d.data=d.data.replace(f,l):d.data.indexOf(l)===-1&&(d.data=p?l+d.data:d.data+l)})(E[n],e,i,o),n},le=(a,e,t)=>a.reduce((i,s,r)=>{let n=e[r];if(n&&n.call){let o=n(t),l=o&&o.props&&o.props.className||/^go/.test(o)&&o;n=l?"."+l:o&&typeof o=="object"?o.props?"":$(o,""):o===!1?"":o}return i+s+(n??"")},"");function I(a){let e=this||{},t=a.call?a(e.p):a;return ne(t.unshift?t.raw?le(t,[].slice.call(arguments,1),e.p):t.reduce((i,s)=>Object.assign(i,s&&s.call?s(e.p):s),{}):t,se(e.target),e.g,e.o,e.k)}let B,A,W;I.bind({g:1});let S=I.bind({k:1});function de(a,e,t,i){$.p=e,B=a,A=t,W=i}function k(a,e){let t=this||{};return function(){let i=arguments;function s(r,n){let o=Object.assign({},r),l=o.className||s.className;t.p=Object.assign({theme:A&&A()},o),t.o=/ *go\d+/.test(l),o.className=I.apply(t,i)+(l?" "+l:"");let d=a;return a[0]&&(d=o.as||a,delete o.as),W&&d[0]&&W(o),B(d,o)}return s}}var ce=a=>typeof a=="function",L=(a,e)=>ce(a)?a(e):a,he=(()=>{let a=0;return()=>(++a).toString()})(),Y=(()=>{let a;return()=>{if(a===void 0&&typeof window<"u"){let e=matchMedia("(prefers-reduced-motion: reduce)");a=!e||e.matches}return a}})(),pe=20,Z=(a,e)=>{switch(e.type){case 0:return{...a,toasts:[e.toast,...a.toasts].slice(0,pe)};case 1:return{...a,toasts:a.toasts.map(r=>r.id===e.toast.id?{...r,...e.toast}:r)};case 2:let{toast:t}=e;return Z(a,{type:a.toasts.find(r=>r.id===t.id)?1:0,toast:t});case 3:let{toastId:i}=e;return{...a,toasts:a.toasts.map(r=>r.id===i||i===void 0?{...r,dismissed:!0,visible:!1}:r)};case 4:return e.toastId===void 0?{...a,toasts:[]}:{...a,toasts:a.toasts.filter(r=>r.id!==e.toastId)};case 5:return{...a,pausedAt:e.time};case 6:let s=e.time-(a.pausedAt||0);return{...a,pausedAt:void 0,toasts:a.toasts.map(r=>({...r,pauseDuration:r.pauseDuration+s}))}}},F=[],P={toasts:[],pausedAt:void 0},R=a=>{P=Z(P,a),F.forEach(e=>{e(P)})},me={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},ue=(a={})=>{let[e,t]=u.useState(P);u.useEffect(()=>(F.push(t),()=>{let s=F.indexOf(t);s>-1&&F.splice(s,1)}),[e]);let i=e.toasts.map(s=>{var r,n,o;return{...a,...a[s.type],...s,removeDelay:s.removeDelay||((r=a[s.type])==null?void 0:r.removeDelay)||(a==null?void 0:a.removeDelay),duration:s.duration||((n=a[s.type])==null?void 0:n.duration)||(a==null?void 0:a.duration)||me[s.type],style:{...a.style,...(o=a[s.type])==null?void 0:o.style,...s.style}}});return{...e,toasts:i}},ge=(a,e="blank",t)=>({createdAt:Date.now(),visible:!0,dismissed:!1,type:e,ariaProps:{role:"status","aria-live":"polite"},message:a,pauseDuration:0,...t,id:(t==null?void 0:t.id)||he()}),N=a=>(e,t)=>{let i=ge(e,a,t);return R({type:2,toast:i}),i.id},v=(a,e)=>N("blank")(a,e);v.error=N("error");v.success=N("success");v.loading=N("loading");v.custom=N("custom");v.dismiss=a=>{R({type:3,toastId:a})};v.remove=a=>R({type:4,toastId:a});v.promise=(a,e,t)=>{let i=v.loading(e.loading,{...t,...t==null?void 0:t.loading});return typeof a=="function"&&(a=a()),a.then(s=>{let r=e.success?L(e.success,s):void 0;return r?v.success(r,{id:i,...t,...t==null?void 0:t.success}):v.dismiss(i),s}).catch(s=>{let r=e.error?L(e.error,s):void 0;r?v.error(r,{id:i,...t,...t==null?void 0:t.error}):v.dismiss(i)}),a};var fe=(a,e)=>{R({type:1,toast:{id:a,height:e}})},ye=()=>{R({type:5,time:Date.now()})},D=new Map,ve=1e3,xe=(a,e=ve)=>{if(D.has(a))return;let t=setTimeout(()=>{D.delete(a),R({type:4,toastId:a})},e);D.set(a,t)},we=a=>{let{toasts:e,pausedAt:t}=ue(a);u.useEffect(()=>{if(t)return;let r=Date.now(),n=e.map(o=>{if(o.duration===1/0)return;let l=(o.duration||0)+o.pauseDuration-(r-o.createdAt);if(l<0){o.visible&&v.dismiss(o.id);return}return setTimeout(()=>v.dismiss(o.id),l)});return()=>{n.forEach(o=>o&&clearTimeout(o))}},[e,t]);let i=u.useCallback(()=>{t&&R({type:6,time:Date.now()})},[t]),s=u.useCallback((r,n)=>{let{reverseOrder:o=!1,gutter:l=8,defaultPosition:d}=n||{},p=e.filter(g=>(g.position||d)===(r.position||d)&&g.height),f=p.findIndex(g=>g.id===r.id),h=p.filter((g,b)=>b<f&&g.visible).length;return p.filter(g=>g.visible).slice(...o?[h+1]:[0,h]).reduce((g,b)=>g+(b.height||0)+l,0)},[e]);return u.useEffect(()=>{e.forEach(r=>{if(r.dismissed)xe(r.id,r.removeDelay);else{let n=D.get(r.id);n&&(clearTimeout(n),D.delete(r.id))}})},[e]),{toasts:e,handlers:{updateHeight:fe,startPause:ye,endPause:i,calculateOffset:s}}},be=S`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,_e=S`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,Ee=S`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,Se=k("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${a=>a.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${be} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${_e} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${a=>a.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${Ee} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,Ce=S`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,$e=k("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${a=>a.secondary||"#e0e0e0"};
  border-right-color: ${a=>a.primary||"#616161"};
  animation: ${Ce} 1s linear infinite;
`,ke=S`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,je=S`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,Oe=k("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${a=>a.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${ke} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${je} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${a=>a.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,Re=k("div")`
  position: absolute;
`,De=k("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,Ne=S`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,Me=k("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${Ne} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,Fe=({toast:a})=>{let{icon:e,type:t,iconTheme:i}=a;return e!==void 0?typeof e=="string"?u.createElement(Me,null,e):e:t==="blank"?null:u.createElement(De,null,u.createElement($e,{...i}),t!=="loading"&&u.createElement(Re,null,t==="error"?u.createElement(Se,{...i}):u.createElement(Oe,{...i})))},Pe=a=>`
0% {transform: translate3d(0,${a*-200}%,0) scale(.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`,Le=a=>`
0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}
100% {transform: translate3d(0,${a*-150}%,-1px) scale(.6); opacity:0;}
`,Te="0%{opacity:0;} 100%{opacity:1;}",Ie="0%{opacity:1;} 100%{opacity:0;}",He=k("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,Ae=k("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,We=(a,e)=>{let t=a.includes("top")?1:-1,[i,s]=Y()?[Te,Ie]:[Pe(t),Le(t)];return{animation:e?`${S(i)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${S(s)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}},Ve=u.memo(({toast:a,position:e,style:t,children:i})=>{let s=a.height?We(a.position||e||"top-center",a.visible):{opacity:0},r=u.createElement(Fe,{toast:a}),n=u.createElement(Ae,{...a.ariaProps},L(a.message,a));return u.createElement(He,{className:a.className,style:{...s,...t,...a.style}},typeof i=="function"?i({icon:r,message:n}):u.createElement(u.Fragment,null,r,n))});de(u.createElement);var Qe=({id:a,className:e,style:t,onHeightUpdate:i,children:s})=>{let r=u.useCallback(n=>{if(n){let o=()=>{let l=n.getBoundingClientRect().height;i(a,l)};o(),new MutationObserver(o).observe(n,{subtree:!0,childList:!0,characterData:!0})}},[a,i]);return u.createElement("div",{ref:r,className:e,style:t},s)},qe=(a,e)=>{let t=a.includes("top"),i=t?{top:0}:{bottom:0},s=a.includes("center")?{justifyContent:"center"}:a.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:Y()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${e*(t?1:-1)}px)`,...i,...s}},ze=I`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,M=16,Ue=({reverseOrder:a,position:e="top-center",toastOptions:t,gutter:i,children:s,containerStyle:r,containerClassName:n})=>{let{toasts:o,handlers:l}=we(t);return u.createElement("div",{id:"_rht_toaster",style:{position:"fixed",zIndex:9999,top:M,left:M,right:M,bottom:M,pointerEvents:"none",...r},className:n,onMouseEnter:l.startPause,onMouseLeave:l.endPause},o.map(d=>{let p=d.position||e,f=l.calculateOffset(d,{reverseOrder:a,gutter:i,defaultPosition:e}),h=qe(p,f);return u.createElement(Qe,{id:d.id,key:d.id,onHeightUpdate:l.updateHeight,className:d.visible?ze:"",style:h},d.type==="custom"?L(d.message,d):s?s(d):u.createElement(Ve,{toast:d,position:p}))}))},H=v;const Ye=()=>{const[a,e]=u.useState(null),[t,i]=u.useState(null),[s,r]=u.useState(!1),n=u.useRef(null),o=u.useRef(null),l=u.useRef(null),d=u.useRef(null),p=async y=>{const x=y.target.files[0];if(!x)return;const w=new FileReader;w.onloadend=()=>{i(w.result)},w.readAsDataURL(x);try{const _=await O.scanImage(x);e(_)}catch(_){console.error("Error scanning QR code:",_),H.error("Could not read QR code. Please try a different image.",{style:{border:"1px solid #FCA5A5",padding:"16px",color:"#DC2626"},iconTheme:{primary:"#DC2626",secondary:"#FEE2E2"}})}},f=()=>{n.current.click()},h=y=>{navigator.clipboard.writeText(y),H.success("Link copied to clipboard!",{style:{border:"1px solid #E9D5FF",padding:"16px",background:"#FAF5FF",color:"#6B46C1"},iconTheme:{primary:"#9333EA",secondary:"#FAF5FF"}})},g=()=>{o.current&&(l.current=new O(o.current,y=>{e(y)}),l.current.start(),r(!0))},b=()=>{l.current&&l.current.stop(),r(!1)},j=()=>{if(d.current&&o.current){const y=d.current,x=y.getContext("2d");y.width=o.current.videoWidth,y.height=o.current.videoHeight,x.drawImage(o.current,0,0,y.width,y.height),O.scanImage(y).then(w=>{e(w)}).catch(w=>{console.error("Error capturing QR code:",w),H.error("Failed to capture QR code. Please try again.",{style:{border:"1px solid #FCA5A5",padding:"16px",color:"#DC2626"},iconTheme:{primary:"#DC2626",secondary:"#FEE2E2"}})})}};return u.useEffect(()=>()=>{l.current&&l.current.destroy()},[]),c.jsxs("div",{className:"min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4 sm:p-6 lg:p-8",children:[c.jsx(Ue,{position:"top-right"}),c.jsx("div",{className:"max-w-7xl mx-auto",children:c.jsxs("div",{className:"grid md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8",children:[c.jsxs("div",{className:"bg-white/80 backdrop-blur-lg rounded-2xl p-4 sm:p-6 lg:p-8 border border-purple-200 shadow-xl space-y-4 sm:space-y-6 lg:space-y-8 hover:shadow-2xl hover:shadow-purple-200/50 transition-all duration-300",children:[c.jsxs("div",{className:"flex items-center space-x-3 sm:space-x-4",children:[c.jsx("div",{className:"p-2 sm:p-3 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-200",children:c.jsx(V,{className:"text-purple-500 w-6 h-6 sm:w-8 sm:h-8"})}),c.jsx("h1",{className:"text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600",children:"QR Scanner"})]}),c.jsxs("div",{className:"space-y-3 sm:space-y-4",children:[c.jsx("input",{type:"file",ref:n,onChange:p,accept:"image/*",className:"hidden"}),c.jsxs("button",{onClick:f,className:"w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 font-medium shadow-lg hover:shadow-purple-500/25",children:[c.jsx(ae,{className:"w-4 h-4 sm:w-5 sm:h-5"}),c.jsx("span",{className:"text-sm sm:text-base",children:"Upload QR Code"})]})]}),c.jsxs("div",{className:"space-y-3 sm:space-y-4",children:[s?c.jsxs("button",{onClick:b,className:"w-full bg-purple-100 text-purple-700 border border-purple-200 hover:bg-purple-200 px-4 sm:px-6 py-3 sm:py-4 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 font-medium",children:[c.jsx(Q,{className:"w-4 h-4 sm:w-5 sm:h-5"}),c.jsx("span",{className:"text-sm sm:text-base",children:"Stop Camera Scan"})]}):c.jsxs("button",{onClick:g,className:"w-full bg-white hover:bg-purple-50 text-gray-700 border border-purple-200 px-4 sm:px-6 py-3 sm:py-4 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 font-medium",children:[c.jsx(Q,{className:"w-4 h-4 sm:w-5 sm:h-5"}),c.jsx("span",{className:"text-sm sm:text-base",children:"Start Camera Scan"})]}),c.jsxs("div",{className:"relative rounded-xl overflow-hidden border border-purple-200 shadow-lg",children:[c.jsx("video",{ref:o,className:"w-full h-48 sm:h-56 lg:h-64 object-cover bg-purple-900/10"}),c.jsxs("button",{onClick:j,className:"absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 bg-white/80 backdrop-blur-sm hover:bg-purple-50 text-gray-700 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-all duration-300 flex items-center space-x-1.5 sm:space-x-2 border border-purple-200",children:[c.jsx(q,{className:"w-4 h-4 sm:w-[18px] sm:h-[18px]"}),c.jsx("span",{className:"text-sm sm:text-base",children:"Capture QR Code"})]})]})]})]}),c.jsx("div",{className:"bg-white/80 backdrop-blur-lg rounded-2xl p-4 sm:p-6 lg:p-8 border border-purple-200 shadow-xl hover:shadow-2xl hover:shadow-purple-200/50 transition-all duration-300",children:t||a?c.jsxs("div",{className:"space-y-4 sm:space-y-6",children:[t&&c.jsx("div",{className:"bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-3 sm:p-4 border border-purple-200 shadow-lg",children:c.jsx("img",{src:t,alt:"QR Code Preview",className:"max-w-full h-48 sm:h-56 lg:h-64 object-contain rounded-lg mx-auto"})}),a&&c.jsxs("div",{className:"space-y-3 sm:space-y-4",children:[c.jsxs("div",{className:"bg-gradient-to-r from-purple-50 to-pink-50 p-4 sm:p-6 rounded-xl border border-purple-200",children:[c.jsxs("h2",{className:"text-xs sm:text-sm font-medium mb-2 flex items-center text-purple-700",children:[c.jsx(q,{className:"mr-2 w-3 h-3 sm:w-4 sm:h-4"}),"Scanned Link"]}),c.jsx("p",{className:"text-gray-700 break-all font-mono text-xs sm:text-sm",children:a})]}),c.jsxs("button",{onClick:()=>h(a),className:"w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 py-2.5 sm:py-3 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 font-medium shadow-lg hover:shadow-purple-500/25",children:[c.jsx(J,{className:"w-4 h-4 sm:w-[18px] sm:h-[18px]"}),c.jsx("span",{className:"text-sm sm:text-base",children:"Copy Link"})]})]})]}):c.jsxs("div",{className:"flex flex-col items-center justify-center h-full space-y-4 sm:space-y-6 text-center",children:[c.jsx("div",{className:"p-4 sm:p-6 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full border border-purple-200",children:c.jsx(V,{className:"text-purple-500 w-8 h-8 sm:w-12 sm:h-12"})}),c.jsxs("div",{className:"space-y-1 sm:space-y-2",children:[c.jsx("p",{className:"text-gray-700 font-medium text-base sm:text-lg",children:"No QR Code Detected"}),c.jsx("p",{className:"text-purple-600 text-xs sm:text-sm",children:"Upload a QR code image or use your camera to scan"})]})]})})]})}),c.jsx("canvas",{ref:d,className:"hidden"})]})};export{Ye as default};
