import{j as e}from"./ui-components-DfywtIQG.js";import{r as l,h as L,d as U,L as p}from"./react-vendor-CAIQhEhM.js";import{c as u,u as D,d as z,B as d}from"./index-BO6rIt2l.js";import{X as P}from"./x-B-daqFj6.js";import{m as R}from"./framer-motion-DP8BS7SU.js";/**
 * @license lucide-react v0.394.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const j=u("LogOut",[["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}],["polyline",{points:"16 17 21 12 16 7",key:"1gabdz"}],["line",{x1:"21",x2:"9",y1:"12",y2:"12",key:"1uyos4"}]]);/**
 * @license lucide-react v0.394.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const B=u("Menu",[["line",{x1:"4",x2:"20",y1:"12",y2:"12",key:"1e0a9i"}],["line",{x1:"4",x2:"20",y1:"6",y2:"6",key:"1owob3"}],["line",{x1:"4",x2:"20",y1:"18",y2:"18",key:"yk5zj1"}]]);/**
 * @license lucide-react v0.394.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const N=u("Moon",[["path",{d:"M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z",key:"a7tn18"}]]);/**
 * @license lucide-react v0.394.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const S=u("Sun",[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"m4.93 4.93 1.41 1.41",key:"149t6j"}],["path",{d:"m17.66 17.66 1.41 1.41",key:"ptbguv"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"m6.34 17.66-1.41 1.41",key:"1m8zz5"}],["path",{d:"m19.07 4.93-1.41 1.41",key:"1shlcs"}]]);/**
 * @license lucide-react v0.394.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const C=u("User",[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]]),E="https://backend.teckforgeek.com",A=`${E}/api`,$="https://corsproxy.io/?",O=!0,g=n=>{const r=n.startsWith("/")?n:`/${n}`,a=`${A}${r}`;return`${$}${encodeURIComponent(a)}`},F=async(n,r={})=>{const a=localStorage.getItem("authToken"),i=new Headers(r.headers||{});return a&&i.set("Authorization",`Bearer ${a}`),!i.has("Content-Type")&&!r.body&&i.set("Content-Type","application/json"),fetch(g(n),{...r,headers:i})},X=async(n,r={})=>{const a=new Headers(r.headers||{});return!a.has("Content-Type")&&!r.body&&a.set("Content-Type","application/json"),fetch(g(n),{...r,headers:a})};console.log("API Configuration:");console.log("- Mode:","production");console.log("- Base URL:",E);console.log("- API URL:",A);console.log("- Using CORS Proxy:",O);console.log("- Example proxied URL:",g("/chat"));const Y=({className:n=""})=>{const[r,a]=l.useState("dark"),[i,I]=l.useState(!1),[f,m]=l.useState(!1),[o,h]=l.useState(null),x=L(),b=U();l.useLayoutEffect(()=>{const t=localStorage.getItem("theme")||"dark";document.documentElement.classList.toggle("dark",t==="dark"),a(t)},[]);const k=[{name:"Accueil",href:"#home"},{name:"À propos",href:"#about"},{name:"Compétences",href:"#skills"},{name:"Interactif",href:"#interactive"},{name:"Projets",href:"#projects"},{name:"Passions",href:"#passions"},{name:"Blog",href:"/blog",isExternal:!0},{name:"Admin",href:"/admin",isExternal:!0},{name:"Contact",href:"#contact"}];l.useEffect(()=>{const t=()=>{I(window.scrollY>10)};return window.addEventListener("scroll",t),()=>window.removeEventListener("scroll",t)},[]),l.useEffect(()=>{(async()=>{if(!localStorage.getItem("authToken")){h(null);return}try{const s=await F("/auth/me");if(s.ok){const T=await s.json();h(T)}else console.error(`Erreur d'authentification: ${s.status}`),localStorage.removeItem("authToken"),h(null)}catch(s){console.error("Erreur lors de la récupération des données utilisateur:",s),localStorage.removeItem("authToken"),h(null)}})()},[b]);const{toast:M}=D(),y=()=>{localStorage.removeItem("authToken"),h(null),m(!1),M({title:"Déconnexion réussie",description:"Vous avez été déconnecté avec succès.",variant:"success"}),x("/login")},v=()=>{document.documentElement.classList.add("disable-transitions");const t=r==="dark"?"light":"dark";document.documentElement.classList.toggle("dark",t==="dark"),a(t),requestAnimationFrame(()=>{localStorage.setItem("theme",t),setTimeout(()=>{document.documentElement.classList.remove("disable-transitions")},100)})},w=(t,c=!1)=>{if(c)x(t);else if(b.pathname!=="/"&&t.startsWith("#"))x("/"),setTimeout(()=>{const s=document.querySelector(t);s&&s.scrollIntoView({behavior:"smooth"})},100);else{const s=document.querySelector(t);s&&s.scrollIntoView({behavior:"smooth"})}m(!1)};return e.jsxs("header",{className:z("fixed top-0 w-full z-50 transition-all duration-300",i?"dark:bg-black/90 dark:text-white bg-white/90 backdrop-blur-md border-b border-border/40 shadow-sm text-black":"dark:bg-black/70 dark:text-white bg-white/90 backdrop-blur-sm text-black",n),children:[e.jsxs("div",{className:"max-w-[1280px] mx-auto px-4 h-20 flex items-center justify-between",children:[e.jsx("div",{className:"flex items-center",children:e.jsxs("a",{href:"/",className:"text-xl font-bold tracking-tight hover:text-primary transition-colors flex items-center gap-2",onClick:t=>{t.preventDefault(),x("/")},children:[e.jsx("div",{className:"h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm",children:"NA"}),e.jsx("span",{className:"bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600 font-extrabold dark:from-blue-400 dark:to-purple-500",children:"Portfolio"})]})}),e.jsxs("nav",{className:"hidden md:flex items-center space-x-1 overflow-x-auto",children:[" ",e.jsxs("div",{id:"desktop-nav-links-container",className:"bg-gray-100 dark:bg-neutral-800/60 backdrop-blur-sm rounded-full px-2 py-1.5 border border-gray-200 dark:border-neutral-700 flex flex-wrap text-neutral-700 dark:text-white",children:[" ",k.filter(t=>!(t.name==="Admin"&&(!o||!["ADMIN","SUPERADMIN"].includes(o.role)))).filter(t=>!(t.name==="Blog"&&b.pathname.startsWith("/blog"))).map(t=>e.jsx("a",{href:t.href,className:"text-sm font-medium hover:text-primary transition-colors px-3 py-1.5 rounded-full dark:hover:bg-white/20 hover:bg-gray-200 dark:text-white/90 dark:hover:text-white",onClick:c=>{c.preventDefault(),w(t.href,t.isExternal)},children:t.name},t.name))]}),e.jsxs("div",{className:"flex items-center space-x-3 ml-4",children:[" ",o?e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"bg-primary/10 rounded-full px-3 py-1.5 hidden lg:flex items-center gap-2 border border-primary/20",children:[e.jsx(C,{className:"h-4 w-4 text-primary"}),e.jsx("span",{className:"text-sm font-medium text-primary",children:o.name||o.email})]}),e.jsxs(d,{variant:"ghost",size:"sm",onClick:y,className:"flex items-center rounded-full hover:bg-red-500/10 hover:text-red-500 transition-colors",children:[e.jsx(j,{className:"h-4 w-4 mr-1"}),"Déconnexion"]})]}):e.jsxs(e.Fragment,{children:[e.jsx(d,{variant:"ghost",size:"sm",asChild:!0,className:"rounded-full dark:hover:bg-white/10 hover:bg-gray-100 dark:text-white dark:border-white/10",children:e.jsx(p,{to:"/login",children:"Connexion"})}),e.jsx(d,{variant:"default",size:"sm",asChild:!0,className:"rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-md hover:shadow-blue-500/20 border-none text-white",children:e.jsx(p,{to:"/create-user",children:"S'inscrire"})})]}),e.jsx(d,{variant:"outline",size:"icon",onClick:v,"aria-label":"Toggle theme",className:"rounded-full border border-border/40 dark:bg-black/70 bg-gray-100/80 backdrop-blur-sm dark:hover:bg-black/90 hover:bg-gray-200/80 dark:text-white dark:border-white/20",children:r==="dark"?e.jsx(S,{className:"h-4 w-4"}):e.jsx(N,{className:"h-4 w-4"})})]})]}),e.jsxs("div",{className:"flex items-center md:hidden space-x-2",children:[e.jsx(d,{variant:"outline",size:"icon",onClick:v,"aria-label":"Toggle theme",className:"rounded-full border border-border/40 dark:bg-black/70 bg-gray-100/80 backdrop-blur-sm dark:hover:bg-black/90 hover:bg-gray-200/80 h-9 w-9 dark:text-white dark:border-white/20",children:r==="dark"?e.jsx(S,{className:"h-4 w-4"}):e.jsx(N,{className:"h-4 w-4"})}),e.jsx(d,{variant:"outline",size:"icon",onClick:()=>m(!f),"aria-label":"Toggle menu",className:"rounded-full border border-border/40 dark:bg-black/70 bg-gray-100/80 backdrop-blur-sm dark:hover:bg-black/90 hover:bg-gray-200/80 h-9 w-9 dark:text-white dark:border-white/20",children:f?e.jsx(P,{className:"h-4 w-4"}):e.jsx(B,{className:"h-4 w-4"})})]})]}),f&&e.jsx(R.div,{initial:{opacity:0,y:-20},animate:{opacity:1,y:0},exit:{opacity:0,y:-20},transition:{duration:.2},className:"md:hidden dark:bg-black/95 dark:text-white bg-white/95 backdrop-blur-md border-t border-border/30 shadow-lg",children:e.jsxs("div",{className:"container mx-auto px-4 py-6 space-y-2",children:[k.filter(t=>!(t.name==="Admin"&&(!o||!["ADMIN","SUPERADMIN"].includes(o.role)))).filter(t=>!(t.name==="Blog"&&b.pathname.startsWith("/blog"))).map(t=>e.jsx("a",{href:t.href,className:"block rounded-full px-4 py-2.5 text-base font-medium hover:bg-primary/10 hover:text-primary transition-colors dark:text-white/90 dark:hover:text-white",onClick:c=>{c.preventDefault(),w(t.href,t.isExternal)},children:t.name},t.name)),e.jsx("div",{className:"border-t border-border/20 pt-4 mt-4 space-y-3",children:o?e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"px-4 py-2 text-base font-medium text-primary flex items-center bg-primary/10 rounded-full",children:[e.jsx(C,{className:"h-4 w-4 mr-2"}),o.name||o.email]}),e.jsxs("button",{onClick:y,className:"block w-full text-left rounded-full px-4 py-2.5 text-base font-medium hover:bg-red-500/10 hover:text-red-500 transition-colors flex items-center",children:[e.jsx(j,{className:"h-4 w-4 mr-2"}),"Déconnexion"]})]}):e.jsxs(e.Fragment,{children:[e.jsx(p,{to:"/login",onClick:()=>m(!1),className:"block rounded-full px-4 py-2.5 text-base font-medium hover:bg-primary/10 hover:text-primary transition-colors",children:"Connexion"}),e.jsx(p,{to:"/create-user",onClick:()=>m(!1),className:"block rounded-full px-4 py-2.5 text-base font-medium bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center hover:shadow-md hover:shadow-blue-500/20 transition-all",children:"S'inscrire"})]})})]})})]})};export{A,Y as N,C as U,F as a,X as f};
