import{j as e}from"./ui-components-DfywtIQG.js";import{r as c}from"./react-vendor-CAIQhEhM.js";import{a as i,b as h}from"./index-BO6rIt2l.js";import"./framer-motion-DP8BS7SU.js";const b=()=>{const[t,s]=c.useState(!1),[a,r]=c.useState(null),o=async()=>{s(!0),r(null);try{const l=await i(),d=await h();l&&d?(r("success"),setTimeout(()=>{window.location.reload()},1500)):r("partial")}catch(l){console.error("Erreur lors du nettoyage du cache:",l),r("error")}finally{s(!1)}},n=()=>{window.location.href=window.location.href+"?nocache="+Date.now()};return e.jsx("div",{className:"fixed inset-0 z-50 flex items-center justify-center bg-black/80",children:e.jsxs("div",{className:"bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full",children:[e.jsx("h2",{className:"text-xl font-bold mb-4 dark:text-white",children:"Problème de chargement détecté"}),e.jsx("p",{className:"mb-4 dark:text-gray-300",children:"Il semble y avoir un problème avec le cache du navigateur ou le service worker. Essayez de nettoyer le cache pour résoudre ce problème."}),a==="success"&&e.jsx("div",{className:"bg-green-100 dark:bg-green-900 p-3 rounded mb-4 text-green-800 dark:text-green-200",children:"Cache nettoyé avec succès. Rechargement de la page..."}),a==="partial"&&e.jsx("div",{className:"bg-yellow-100 dark:bg-yellow-900 p-3 rounded mb-4 text-yellow-800 dark:text-yellow-200",children:"Le cache a été partiellement nettoyé. Essayez de recharger la page manuellement."}),a==="error"&&e.jsx("div",{className:"bg-red-100 dark:bg-red-900 p-3 rounded mb-4 text-red-800 dark:text-red-200",children:"Une erreur s'est produite lors du nettoyage du cache. Essayez de recharger la page manuellement."}),e.jsxs("div",{className:"flex flex-col sm:flex-row gap-3",children:[e.jsx("button",{onClick:o,disabled:t,className:"px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 flex-1",children:t?e.jsxs(e.Fragment,{children:[e.jsx("span",{className:"inline-block animate-spin mr-2",children:"⟳"}),"Nettoyage en cours..."]}):"Nettoyer le cache et recharger"}),e.jsx("button",{onClick:n,className:"px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 flex-1",children:"Forcer le rechargement"})]})]})})};export{b as default};
