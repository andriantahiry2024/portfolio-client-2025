const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/react-spline-ByDf3obY.js","assets/react-vendor-CAIQhEhM.js","assets/index-BO6rIt2l.js","assets/ui-components-DfywtIQG.js","assets/framer-motion-DP8BS7SU.js","assets/index-Cu0ymMSp.css"])))=>i.map(i=>d[i]);
import{_ as a}from"./index-BO6rIt2l.js";import{j as e}from"./ui-components-DfywtIQG.js";import{r as t}from"./react-vendor-CAIQhEhM.js";import"./framer-motion-DP8BS7SU.js";const c=t.lazy(()=>a(()=>import("./react-spline-ByDf3obY.js"),__vite__mapDeps([0,1,2,3,4,5])));function h({scene:o,className:l,allowScroll:n=!0}){const r=t.useRef(null);return t.useEffect(()=>{if(!n||!r.current)return;const i=r.current,s=u=>{window.scrollBy({top:u.deltaY})};return i.addEventListener("wheel",s,{passive:!0}),()=>{i.removeEventListener("wheel",s)}},[n]),e.jsx("div",{ref:r,className:l,style:{touchAction:"pan-y",position:"relative",zIndex:1},children:e.jsx(t.Suspense,{fallback:e.jsx("div",{className:"w-full h-full flex items-center justify-center",children:e.jsx("div",{className:"w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"})}),children:e.jsx(c,{scene:o,style:{pointerEvents:"auto",width:"100%",height:"100%"}})})})}export{h as SplineScene};
