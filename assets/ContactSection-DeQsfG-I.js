import{j as e}from"./ui-components-DfywtIQG.js";import{r as m}from"./react-vendor-CAIQhEhM.js";import{f as b}from"./Navbar-Br-R-wJO.js";import{u as k}from"./form-utils-BrWWUA8f.js";import{c as f,d as M,u as C,B as S,C as z}from"./index-BO6rIt2l.js";import{I as u}from"./input-CSwwItPP.js";import{F as L,a as i,b as n,c as l,d as c,e as d}from"./form-C1XMHbEb.js";import{M as E}from"./mail-CwJOVsX5.js";import{P as F,M as B}from"./phone-CvBEarNu.js";import"./x-B-daqFj6.js";import"./framer-motion-DP8BS7SU.js";import"./label-BWDTXRGg.js";/**
 * @license lucide-react v0.394.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const T=f("CircleCheckBig",[["path",{d:"M22 11.08V12a10 10 0 1 1-5.93-9.14",key:"g774vq"}],["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}]]);/**
 * @license lucide-react v0.394.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const V=f("Send",[["path",{d:"m22 2-7 20-4-9-9-4Z",key:"1q3vgg"}],["path",{d:"M22 2 11 13",key:"nzbqef"}]]),y=m.forwardRef(({className:x,...r},a)=>e.jsx("textarea",{className:M("flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",x),ref:a,...r}));y.displayName="Textarea";const $=({id:x="contact"})=>{const r=k({defaultValues:{name:"",email:"",subject:"",message:""}}),[a,p]=m.useState(!1),[j,h]=m.useState("idle"),[w,g]=m.useState(""),{toast:v}=C(),N=async s=>{p(!0),h("idle"),g(""),console.log("Envoi du formulaire de contact:",s);try{const t=await b("/contact",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(s)});if(console.log("Réponse du serveur:",t.status),!t.ok){const o=await t.json();throw new Error(o.error||`HTTP error! status: ${t.status}`)}h("success"),r.reset(),v({title:"Message envoyé",description:"Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.",variant:"success"})}catch(t){console.error("Erreur lors de l'envoi du message:",t),console.error("Détails de l'erreur:",t.message,t.stack),h("error");const o=t.message||"Une erreur est survenue.";g(o),v({title:"Erreur",description:o,variant:"destructive"})}finally{p(!1)}};return e.jsx("section",{id:x,className:"py-20 px-4 md:px-8 lg:px-12 w-full min-h-screen flex items-center",style:{backgroundColor:"var(--background)"},children:e.jsxs("div",{className:"max-w-6xl mx-auto w-full",children:[e.jsxs("div",{className:"text-center mb-12",children:[e.jsx("h2",{className:"text-3xl md:text-4xl font-bold mb-4",children:"Me Contacter"}),e.jsx("p",{className:"text-muted-foreground max-w-2xl mx-auto",children:"N'hésitez pas à me contacter si vous avez des questions ou si vous souhaitez collaborer. Je vous répondrai dans les plus brefs délais."})]}),e.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-2 gap-12",children:[e.jsxs("div",{className:"space-y-8",children:[e.jsx("h3",{className:"text-2xl font-semibold",children:"Restons en Contact"}),e.jsxs("div",{className:"space-y-6",children:[e.jsxs("div",{className:"flex items-start space-x-4",children:[e.jsx("div",{className:"bg-primary/10 p-3 rounded-full",children:e.jsx(E,{className:"h-6 w-6 text-primary"})}),e.jsxs("div",{children:[e.jsx("h4",{className:"font-medium",children:"Email"}),e.jsx("p",{className:"text-muted-foreground",children:"andriantahirynomena@gmail.com"})]})]}),e.jsxs("div",{className:"flex items-start space-x-4",children:[e.jsx("div",{className:"bg-primary/10 p-3 rounded-full",children:e.jsx(F,{className:"h-6 w-6 text-primary"})}),e.jsxs("div",{children:[e.jsx("h4",{className:"font-medium",children:"Téléphone"}),e.jsx("p",{className:"text-muted-foreground",children:"+261 34 96 712 22"})]})]}),e.jsxs("div",{className:"flex items-start space-x-4",children:[e.jsx("div",{className:"bg-primary/10 p-3 rounded-full",children:e.jsx(B,{className:"h-6 w-6 text-primary"})}),e.jsxs("div",{children:[e.jsx("h4",{className:"font-medium",children:"Localisation"}),e.jsx("p",{className:"text-muted-foreground",children:"Antananarivo, Madagascar"})]})]})]}),e.jsxs("div",{className:"pt-6",children:[e.jsx("h3",{className:"text-2xl font-semibold mb-4",children:"Suivez-moi"}),e.jsxs("div",{className:"flex space-x-4",children:[e.jsx("div",{className:"h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors cursor-pointer",children:e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:"text-primary",children:[e.jsx("path",{d:"M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"}),e.jsx("rect",{width:"4",height:"12",x:"2",y:"9"}),e.jsx("circle",{cx:"4",cy:"4",r:"2"})]})}),e.jsx("div",{className:"h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors cursor-pointer",children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:"text-primary",children:e.jsx("path",{d:"M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"})})}),e.jsx("div",{className:"h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors cursor-pointer",children:e.jsxs("svg",{xmlns:"http://www.w3.org/2000/svg",width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:"text-primary",children:[e.jsx("rect",{width:"20",height:"20",x:"2",y:"2",rx:"5",ry:"5"}),e.jsx("path",{d:"M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"}),e.jsx("line",{x1:"17.5",x2:"17.51",y1:"6.5",y2:"6.5"})]})}),e.jsx("div",{className:"h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors cursor-pointer",children:e.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:"text-primary",children:e.jsx("path",{d:"M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"})})})]})]})]}),e.jsxs("div",{className:"bg-card p-6 rounded-lg shadow-sm border border-border",children:[e.jsx("h3",{className:"text-2xl font-semibold mb-6",children:"Envoyez-moi un Message"}),e.jsx(L,{...r,children:e.jsxs("form",{onSubmit:r.handleSubmit(N),className:"space-y-6",children:[e.jsx(i,{control:r.control,name:"name",render:({field:s})=>e.jsxs(n,{children:[e.jsx(l,{children:"Nom"}),e.jsx(c,{children:e.jsx(u,{placeholder:"Votre nom",...s})}),e.jsx(d,{})]})}),e.jsx(i,{control:r.control,name:"email",render:({field:s})=>e.jsxs(n,{children:[e.jsx(l,{children:"Email"}),e.jsx(c,{children:e.jsx(u,{placeholder:"Votre email",...s})}),e.jsx(d,{})]})}),e.jsx(i,{control:r.control,name:"subject",render:({field:s})=>e.jsxs(n,{children:[e.jsx(l,{children:"Sujet"}),e.jsx(c,{children:e.jsx(u,{placeholder:"Sujet de votre message",...s})}),e.jsx(d,{})]})}),e.jsx(i,{control:r.control,name:"message",render:({field:s})=>e.jsxs(n,{children:[e.jsx(l,{children:"Message"}),e.jsx(c,{children:e.jsx(y,{placeholder:"Votre message",className:"min-h-32 resize-none",...s})}),e.jsx(d,{})]})}),e.jsxs(S,{type:"submit",className:"w-full",disabled:a,children:[" ",a?e.jsxs(e.Fragment,{children:[e.jsxs("svg",{className:"animate-spin -ml-1 mr-3 h-5 w-5 text-white",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",children:[e.jsx("circle",{className:"opacity-25",cx:"12",cy:"12",r:"10",stroke:"currentColor",strokeWidth:"4"}),e.jsx("path",{className:"opacity-75",fill:"currentColor",d:"M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"})]}),"Envoi en cours..."]}):e.jsxs(e.Fragment,{children:[e.jsx(V,{className:"mr-2 h-4 w-4"}),"Envoyer le Message"]})]}),e.jsxs("div",{className:"mt-4 text-center",children:[j==="success"&&e.jsxs("p",{className:"text-green-600 dark:text-green-400 flex items-center justify-center",children:[e.jsx(T,{className:"mr-2 h-5 w-5"})," Message envoyé avec succès !"]}),j==="error"&&e.jsxs("p",{className:"text-red-600 dark:text-red-400 flex items-center justify-center",children:[e.jsx(z,{className:"mr-2 h-5 w-5"})," Erreur : ",w]})]})]})})]})]})]})})};export{$ as default};
