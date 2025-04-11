import{Y as V}from"./react-vendor-CAIQhEhM.js";var de=e=>e.type==="checkbox",se=e=>e instanceof Date,I=e=>e==null;const rt=e=>typeof e=="object";var E=e=>!I(e)&&!Array.isArray(e)&&rt(e)&&!se(e),st=e=>E(e)&&e.target?de(e.target)?e.target.checked:e.target.value:e,Dt=e=>e.substring(0,e.search(/\.\d+(\.|$)/))||e,it=(e,s)=>e.has(Dt(s)),St=e=>{const s=e.constructor&&e.constructor.prototype;return E(s)&&s.hasOwnProperty("isPrototypeOf")},Ee=typeof window<"u"&&typeof window.HTMLElement<"u"&&typeof document<"u";function U(e){let s;const t=Array.isArray(e),a=typeof FileList<"u"?e instanceof FileList:!1;if(e instanceof Date)s=new Date(e);else if(e instanceof Set)s=new Set(e);else if(!(Ee&&(e instanceof Blob||a))&&(t||E(e)))if(s=t?[]:{},!t&&!St(e))s=e;else for(const l in e)e.hasOwnProperty(l)&&(s[l]=U(e[l]));else return e;return s}var Ve=e=>Array.isArray(e)?e.filter(Boolean):[],k=e=>e===void 0,c=(e,s,t)=>{if(!s||!E(e))return t;const a=Ve(s.split(/[,[\].]+?/)).reduce((l,u)=>I(l)?l:l[u],e);return k(a)||a===e?k(e[s])?t:e[s]:a},H=e=>typeof e=="boolean",Ce=e=>/^\w*$/.test(e),at=e=>Ve(e.replace(/["|']|\]/g,"").split(/\.|\[/)),w=(e,s,t)=>{let a=-1;const l=Ce(s)?[s]:at(s),u=l.length,d=u-1;for(;++a<u;){const g=l[a];let F=t;if(a!==d){const T=e[g];F=E(T)||Array.isArray(T)?T:isNaN(+l[a+1])?{}:[]}if(g==="__proto__"||g==="constructor"||g==="prototype")return;e[g]=F,e=e[g]}};const he={BLUR:"blur",FOCUS_OUT:"focusout",CHANGE:"change"},K={onBlur:"onBlur",onChange:"onChange",onSubmit:"onSubmit",onTouched:"onTouched",all:"all"},X={max:"max",min:"min",maxLength:"maxLength",minLength:"minLength",pattern:"pattern",required:"required",validate:"validate"},lt=V.createContext(null),Te=()=>V.useContext(lt),Kt=e=>{const{children:s,...t}=e;return V.createElement(lt.Provider,{value:t},s)};var nt=(e,s,t,a=!0)=>{const l={defaultValues:s._defaultValues};for(const u in e)Object.defineProperty(l,u,{get:()=>{const d=u;return s._proxyFormState[d]!==K.all&&(s._proxyFormState[d]=!a||K.all),t&&(t[d]=!0),e[d]}});return l};function kt(e){const s=Te(),{control:t=s.control,disabled:a,name:l,exact:u}=e||{},[d,g]=V.useState(t._formState),F=V.useRef({isDirty:!1,isLoading:!1,dirtyFields:!1,touchedFields:!1,validatingFields:!1,isValidating:!1,isValid:!1,errors:!1}),T=V.useRef(l);return T.current=l,V.useEffect(()=>t._subscribe({name:T.current,formState:F.current,exact:u,callback:A=>{!a&&g({...t._formState,...A})}}),[t,a,u]),V.useEffect(()=>{F.current.isValid&&t._setValid(!0)},[t]),V.useMemo(()=>nt(d,t,F.current,!1),[d,t])}var J=e=>typeof e=="string",ut=(e,s,t,a,l)=>J(e)?(a&&s.watch.add(e),c(t,e,l)):Array.isArray(e)?e.map(u=>(a&&s.watch.add(u),c(t,u))):(a&&(s.watchAll=!0),t);function Et(e){const s=Te(),{control:t=s.control,name:a,defaultValue:l,disabled:u,exact:d}=e||{},g=V.useRef(a),F=V.useRef(l);g.current=a,V.useEffect(()=>t._subscribe({name:g.current,formState:{values:!0},exact:d,callback:D=>!u&&A(ut(g.current,t._names,D.values||t._formValues,!1,F.current))}),[t,u,d]);const[T,A]=V.useState(t._getWatch(a,l));return V.useEffect(()=>t._removeUnmounted()),T}function Ct(e){const s=Te(),{name:t,disabled:a,control:l=s.control,shouldUnregister:u}=e,d=it(l._names.array,t),g=Et({control:l,name:t,defaultValue:c(l._formValues,t,c(l._defaultValues,t,e.defaultValue)),exact:!0}),F=kt({control:l,name:t,exact:!0}),T=V.useRef(e),A=V.useRef(l.register(t,{...e.rules,value:g,...H(e.disabled)?{disabled:e.disabled}:{}})),D=V.useMemo(()=>Object.defineProperties({},{invalid:{enumerable:!0,get:()=>!!c(F.errors,t)},isDirty:{enumerable:!0,get:()=>!!c(F.dirtyFields,t)},isTouched:{enumerable:!0,get:()=>!!c(F.touchedFields,t)},isValidating:{enumerable:!0,get:()=>!!c(F.validatingFields,t)},error:{enumerable:!0,get:()=>c(F.errors,t)}}),[F,t]),_=V.useCallback(B=>A.current.onChange({target:{value:st(B),name:t},type:he.CHANGE}),[t]),te=V.useCallback(()=>A.current.onBlur({target:{value:c(l._formValues,t),name:t},type:he.BLUR}),[t,l._formValues]),$=V.useCallback(B=>{const N=c(l._fields,t);N&&B&&(N._f.ref={focus:()=>B.focus(),select:()=>B.select(),setCustomValidity:v=>B.setCustomValidity(v),reportValidity:()=>B.reportValidity()})},[l._fields,t]),R=V.useMemo(()=>({name:t,value:g,...H(a)||F.disabled?{disabled:F.disabled||a}:{},onChange:_,onBlur:te,ref:$}),[t,a,F.disabled,_,te,$,g]);return V.useEffect(()=>{const B=l._options.shouldUnregister||u;l.register(t,{...T.current.rules,...H(T.current.disabled)?{disabled:T.current.disabled}:{}});const N=(v,Y)=>{const W=c(l._fields,v);W&&W._f&&(W._f.mount=Y)};if(N(t,!0),B){const v=U(c(l._options.defaultValues,t));w(l._defaultValues,t,v),k(c(l._formValues,t))&&w(l._formValues,t,v)}return!d&&l.register(t),()=>{(d?B&&!l._state.action:B)?l.unregister(t):N(t,!1)}},[t,l,d,u]),V.useEffect(()=>{l._setDisabledField({disabled:a,name:t})},[a,t,l]),V.useMemo(()=>({field:R,formState:F,fieldState:D}),[R,F,D])}const jt=e=>e.render(Ct(e));var Tt=(e,s,t,a,l)=>s?{...t[e],types:{...t[e]&&t[e].types?t[e].types:{},[a]:l||!0}}:{},fe=e=>Array.isArray(e)?e:[e],Ye=()=>{let e=[];return{get observers(){return e},next:l=>{for(const u of e)u.next&&u.next(l)},subscribe:l=>(e.push(l),{unsubscribe:()=>{e=e.filter(u=>u!==l)}}),unsubscribe:()=>{e=[]}}},ke=e=>I(e)||!rt(e);function ee(e,s){if(ke(e)||ke(s))return e===s;if(se(e)&&se(s))return e.getTime()===s.getTime();const t=Object.keys(e),a=Object.keys(s);if(t.length!==a.length)return!1;for(const l of t){const u=e[l];if(!a.includes(l))return!1;if(l!=="ref"){const d=s[l];if(se(u)&&se(d)||E(u)&&E(d)||Array.isArray(u)&&Array.isArray(d)?!ee(u,d):u!==d)return!1}}return!0}var P=e=>E(e)&&!Object.keys(e).length,Le=e=>e.type==="file",j=e=>typeof e=="function",ve=e=>{if(!Ee)return!1;const s=e?e.ownerDocument:0;return e instanceof(s&&s.defaultView?s.defaultView.HTMLElement:HTMLElement)},ot=e=>e.type==="select-multiple",Oe=e=>e.type==="radio",Lt=e=>Oe(e)||de(e),Se=e=>ve(e)&&e.isConnected;function Ot(e,s){const t=s.slice(0,-1).length;let a=0;for(;a<t;)e=k(e)?a++:e[s[a++]];return e}function Rt(e){for(const s in e)if(e.hasOwnProperty(s)&&!k(e[s]))return!1;return!0}function L(e,s){const t=Array.isArray(s)?s:Ce(s)?[s]:at(s),a=t.length===1?e:Ot(e,t),l=t.length-1,u=t[l];return a&&delete a[u],l!==0&&(E(a)&&P(a)||Array.isArray(a)&&Rt(a))&&L(e,t.slice(0,-1)),e}var ft=e=>{for(const s in e)if(j(e[s]))return!0;return!1};function _e(e,s={}){const t=Array.isArray(e);if(E(e)||t)for(const a in e)Array.isArray(e[a])||E(e[a])&&!ft(e[a])?(s[a]=Array.isArray(e[a])?[]:{},_e(e[a],s[a])):I(e[a])||(s[a]=!0);return s}function ct(e,s,t){const a=Array.isArray(e);if(E(e)||a)for(const l in e)Array.isArray(e[l])||E(e[l])&&!ft(e[l])?k(s)||ke(t[l])?t[l]=Array.isArray(e[l])?_e(e[l],[]):{..._e(e[l])}:ct(e[l],I(s)?{}:s[l],t[l]):t[l]=!ee(e[l],s[l]);return t}var ue=(e,s)=>ct(e,s,_e(s));const Ke={value:!1,isValid:!1},je={value:!0,isValid:!0};var dt=e=>{if(Array.isArray(e)){if(e.length>1){const s=e.filter(t=>t&&t.checked&&!t.disabled).map(t=>t.value);return{value:s,isValid:!!s.length}}return e[0].checked&&!e[0].disabled?e[0].attributes&&!k(e[0].attributes.value)?k(e[0].value)||e[0].value===""?je:{value:e[0].value,isValid:!0}:je:Ke}return Ke},yt=(e,{valueAsNumber:s,valueAsDate:t,setValueAs:a})=>k(e)?e:s?e===""?NaN:e&&+e:t&&J(e)?new Date(e):a?a(e):e;const ze={isValid:!1,value:null};var gt=e=>Array.isArray(e)?e.reduce((s,t)=>t&&t.checked&&!t.disabled?{isValid:!0,value:t.value}:s,ze):ze;function Ge(e){const s=e.ref;return Le(s)?s.files:Oe(s)?gt(e.refs).value:ot(s)?[...s.selectedOptions].map(({value:t})=>t):de(s)?dt(e.refs).value:yt(k(s.value)?e.ref.value:s.value,e)}var Ut=(e,s,t,a)=>{const l={};for(const u of e){const d=c(s,u);d&&w(l,u,d._f)}return{criteriaMode:t,names:[...e],fields:l,shouldUseNativeValidation:a}},be=e=>e instanceof RegExp,oe=e=>k(e)?e:be(e)?e.source:E(e)?be(e.value)?e.value.source:e.value:e,Je=e=>({isOnSubmit:!e||e===K.onSubmit,isOnBlur:e===K.onBlur,isOnChange:e===K.onChange,isOnAll:e===K.all,isOnTouch:e===K.onTouched});const Qe="AsyncFunction";var Mt=e=>!!e&&!!e.validate&&!!(j(e.validate)&&e.validate.constructor.name===Qe||E(e.validate)&&Object.values(e.validate).find(s=>s.constructor.name===Qe)),Bt=e=>e.mount&&(e.required||e.min||e.max||e.maxLength||e.minLength||e.pattern||e.validate),Xe=(e,s,t)=>!t&&(s.watchAll||s.watch.has(e)||[...s.watch].some(a=>e.startsWith(a)&&/^\.\w+/.test(e.slice(a.length))));const ce=(e,s,t,a)=>{for(const l of t||Object.keys(e)){const u=c(e,l);if(u){const{_f:d,...g}=u;if(d){if(d.refs&&d.refs[0]&&s(d.refs[0],l)&&!a)return!0;if(d.ref&&s(d.ref,d.name)&&!a)return!0;if(ce(g,s))break}else if(E(g)&&ce(g,s))break}}};function Ze(e,s,t){const a=c(e,t);if(a||Ce(t))return{error:a,name:t};const l=t.split(".");for(;l.length;){const u=l.join("."),d=c(s,u),g=c(e,u);if(d&&!Array.isArray(d)&&t!==u)return{name:t};if(g&&g.type)return{name:u,error:g};l.pop()}return{name:t}}var Nt=(e,s,t,a)=>{t(e);const{name:l,...u}=e;return P(u)||Object.keys(u).length>=Object.keys(s).length||Object.keys(u).find(d=>s[d]===(!a||K.all))},Pt=(e,s,t)=>!e||!s||e===s||fe(e).some(a=>a&&(t?a===s:a.startsWith(s)||s.startsWith(a))),It=(e,s,t,a,l)=>l.isOnAll?!1:!t&&l.isOnTouch?!(s||e):(t?a.isOnBlur:l.isOnBlur)?!e:(t?a.isOnChange:l.isOnChange)?e:!0,qt=(e,s)=>!Ve(c(e,s)).length&&L(e,s),Wt=(e,s,t)=>{const a=fe(c(e,t));return w(a,"root",s[t]),w(e,t,a),e},ge=e=>J(e);function et(e,s,t="validate"){if(ge(e)||Array.isArray(e)&&e.every(ge)||H(e)&&!e)return{type:t,message:ge(e)?e:"",ref:s}}var ie=e=>E(e)&&!be(e)?e:{value:e,message:""},tt=async(e,s,t,a,l,u)=>{const{ref:d,refs:g,required:F,maxLength:T,minLength:A,min:D,max:_,pattern:te,validate:$,name:R,valueAsNumber:B,mount:N}=e._f,v=c(t,R);if(!N||s.has(R))return{};const Y=g?g[0]:d,W=x=>{l&&Y.reportValidity&&(Y.setCustomValidity(H(x)?"":x||""),Y.reportValidity())},O={},ae=Oe(d),le=de(d),Fe=ae||le,z=(B||Le(d))&&k(d.value)&&k(v)||ve(d)&&d.value===""||v===""||Array.isArray(v)&&!v.length,re=Tt.bind(null,R,a,O),Q=(x,b,S,q=X.maxLength,p=X.minLength)=>{const G=x?b:S;O[R]={type:x?q:p,message:G,ref:d,...re(x?q:p,G)}};if(u?!Array.isArray(v)||!v.length:F&&(!Fe&&(z||I(v))||H(v)&&!v||le&&!dt(g).isValid||ae&&!gt(g).isValid)){const{value:x,message:b}=ge(F)?{value:!!F,message:F}:ie(F);if(x&&(O[R]={type:X.required,message:b,ref:Y,...re(X.required,b)},!a))return W(b),O}if(!z&&(!I(D)||!I(_))){let x,b;const S=ie(_),q=ie(D);if(!I(v)&&!isNaN(v)){const p=d.valueAsNumber||v&&+v;I(S.value)||(x=p>S.value),I(q.value)||(b=p<q.value)}else{const p=d.valueAsDate||new Date(v),G=ye=>new Date(new Date().toDateString()+" "+ye),Z=d.type=="time",ne=d.type=="week";J(S.value)&&v&&(x=Z?G(v)>G(S.value):ne?v>S.value:p>new Date(S.value)),J(q.value)&&v&&(b=Z?G(v)<G(q.value):ne?v<q.value:p<new Date(q.value))}if((x||b)&&(Q(!!x,S.message,q.message,X.max,X.min),!a))return W(O[R].message),O}if((T||A)&&!z&&(J(v)||u&&Array.isArray(v))){const x=ie(T),b=ie(A),S=!I(x.value)&&v.length>+x.value,q=!I(b.value)&&v.length<+b.value;if((S||q)&&(Q(S,x.message,b.message),!a))return W(O[R].message),O}if(te&&!z&&J(v)){const{value:x,message:b}=ie(te);if(be(x)&&!v.match(x)&&(O[R]={type:X.pattern,message:b,ref:d,...re(X.pattern,b)},!a))return W(b),O}if($){if(j($)){const x=await $(v,t),b=et(x,Y);if(b&&(O[R]={...b,...re(X.validate,b.message)},!a))return W(b.message),O}else if(E($)){let x={};for(const b in $){if(!P(x)&&!a)break;const S=et(await $[b](v,t),Y,b);S&&(x={...S,...re(b,S.message)},W(S.message),a&&(O[R]=x))}if(!P(x)&&(O[R]={ref:Y,...x},!a))return O}}return W(!0),O};const Ht={mode:K.onSubmit,reValidateMode:K.onChange,shouldFocusError:!0};function pt(e={}){let s={...Ht,...e},t={submitCount:0,isDirty:!1,isLoading:j(s.defaultValues),isValidating:!1,isSubmitted:!1,isSubmitting:!1,isSubmitSuccessful:!1,isValid:!1,touchedFields:{},dirtyFields:{},validatingFields:{},errors:s.errors||{},disabled:s.disabled||!1};const a={};let l=E(s.defaultValues)||E(s.values)?U(s.values||s.defaultValues)||{}:{},u=s.shouldUnregister?{}:U(l),d={action:!1,mount:!1,watch:!1},g={mount:new Set,disabled:new Set,unMount:new Set,array:new Set,watch:new Set},F,T=0;const A={isDirty:!1,dirtyFields:!1,validatingFields:!1,touchedFields:!1,isValidating:!1,isValid:!1,errors:!1};let D={...A};const _={array:Ye(),state:Ye()},te=Je(s.mode),$=Je(s.reValidateMode),R=s.criteriaMode===K.all,B=r=>i=>{clearTimeout(T),T=setTimeout(r,i)},N=async r=>{if(!s.disabled&&(A.isValid||D.isValid||r)){const i=s.resolver?P((await z()).errors):await Q(a,!0);i!==t.isValid&&_.state.next({isValid:i})}},v=(r,i)=>{!s.disabled&&(A.isValidating||A.validatingFields||D.isValidating||D.validatingFields)&&((r||Array.from(g.mount)).forEach(n=>{n&&(i?w(t.validatingFields,n,i):L(t.validatingFields,n))}),_.state.next({validatingFields:t.validatingFields,isValidating:!P(t.validatingFields)}))},Y=(r,i=[],n,y,f=!0,o=!0)=>{if(y&&n&&!s.disabled){if(d.action=!0,o&&Array.isArray(c(a,r))){const h=n(c(a,r),y.argA,y.argB);f&&w(a,r,h)}if(o&&Array.isArray(c(t.errors,r))){const h=n(c(t.errors,r),y.argA,y.argB);f&&w(t.errors,r,h),qt(t.errors,r)}if((A.touchedFields||D.touchedFields)&&o&&Array.isArray(c(t.touchedFields,r))){const h=n(c(t.touchedFields,r),y.argA,y.argB);f&&w(t.touchedFields,r,h)}(A.dirtyFields||D.dirtyFields)&&(t.dirtyFields=ue(l,u)),_.state.next({name:r,isDirty:b(r,i),dirtyFields:t.dirtyFields,errors:t.errors,isValid:t.isValid})}else w(u,r,i)},W=(r,i)=>{w(t.errors,r,i),_.state.next({errors:t.errors})},O=r=>{t.errors=r,_.state.next({errors:t.errors,isValid:!1})},ae=(r,i,n,y)=>{const f=c(a,r);if(f){const o=c(u,r,k(n)?c(l,r):n);k(o)||y&&y.defaultChecked||i?w(u,r,i?o:Ge(f._f)):p(r,o),d.mount&&N()}},le=(r,i,n,y,f)=>{let o=!1,h=!1;const m={name:r};if(!s.disabled){if(!n||y){(A.isDirty||D.isDirty)&&(h=t.isDirty,t.isDirty=m.isDirty=b(),o=h!==m.isDirty);const C=ee(c(l,r),i);h=!!c(t.dirtyFields,r),C?L(t.dirtyFields,r):w(t.dirtyFields,r,!0),m.dirtyFields=t.dirtyFields,o=o||(A.dirtyFields||D.dirtyFields)&&h!==!C}if(n){const C=c(t.touchedFields,r);C||(w(t.touchedFields,r,n),m.touchedFields=t.touchedFields,o=o||(A.touchedFields||D.touchedFields)&&C!==n)}o&&f&&_.state.next(m)}return o?m:{}},Fe=(r,i,n,y)=>{const f=c(t.errors,r),o=(A.isValid||D.isValid)&&H(i)&&t.isValid!==i;if(s.delayError&&n?(F=B(()=>W(r,n)),F(s.delayError)):(clearTimeout(T),F=null,n?w(t.errors,r,n):L(t.errors,r)),(n?!ee(f,n):f)||!P(y)||o){const h={...y,...o&&H(i)?{isValid:i}:{},errors:t.errors,name:r};t={...t,...h},_.state.next(h)}},z=async r=>{v(r,!0);const i=await s.resolver(u,s.context,Ut(r||g.mount,a,s.criteriaMode,s.shouldUseNativeValidation));return v(r),i},re=async r=>{const{errors:i}=await z(r);if(r)for(const n of r){const y=c(i,n);y?w(t.errors,n,y):L(t.errors,n)}else t.errors=i;return i},Q=async(r,i,n={valid:!0})=>{for(const y in r){const f=r[y];if(f){const{_f:o,...h}=f;if(o){const m=g.array.has(o.name),C=f._f&&Mt(f._f);C&&A.validatingFields&&v([y],!0);const M=await tt(f,g.disabled,u,R,s.shouldUseNativeValidation&&!i,m);if(C&&A.validatingFields&&v([y]),M[o.name]&&(n.valid=!1,i))break;!i&&(c(M,o.name)?m?Wt(t.errors,M,o.name):w(t.errors,o.name,M[o.name]):L(t.errors,o.name))}!P(h)&&await Q(h,i,n)}}return n.valid},x=()=>{for(const r of g.unMount){const i=c(a,r);i&&(i._f.refs?i._f.refs.every(n=>!Se(n)):!Se(i._f.ref))&&Ae(r)}g.unMount=new Set},b=(r,i)=>!s.disabled&&(r&&i&&w(u,r,i),!ee(Re(),l)),S=(r,i,n)=>ut(r,g,{...d.mount?u:k(i)?l:J(r)?{[r]:i}:i},n,i),q=r=>Ve(c(d.mount?u:l,r,s.shouldUnregister?c(l,r,[]):[])),p=(r,i,n={})=>{const y=c(a,r);let f=i;if(y){const o=y._f;o&&(!o.disabled&&w(u,r,yt(i,o)),f=ve(o.ref)&&I(i)?"":i,ot(o.ref)?[...o.ref.options].forEach(h=>h.selected=f.includes(h.value)):o.refs?de(o.ref)?o.refs.length>1?o.refs.forEach(h=>(!h.defaultChecked||!h.disabled)&&(h.checked=Array.isArray(f)?!!f.find(m=>m===h.value):f===h.value)):o.refs[0]&&(o.refs[0].checked=!!f):o.refs.forEach(h=>h.checked=h.value===f):Le(o.ref)?o.ref.value="":(o.ref.value=f,o.ref.type||_.state.next({name:r,values:U(u)})))}(n.shouldDirty||n.shouldTouch)&&le(r,f,n.shouldTouch,n.shouldDirty,!0),n.shouldValidate&&me(r)},G=(r,i,n)=>{for(const y in i){const f=i[y],o=`${r}.${y}`,h=c(a,o);(g.array.has(r)||E(f)||h&&!h._f)&&!se(f)?G(o,f,n):p(o,f,n)}},Z=(r,i,n={})=>{const y=c(a,r),f=g.array.has(r),o=U(i);w(u,r,o),f?(_.array.next({name:r,values:U(u)}),(A.isDirty||A.dirtyFields||D.isDirty||D.dirtyFields)&&n.shouldDirty&&_.state.next({name:r,dirtyFields:ue(l,u),isDirty:b(r,o)})):y&&!y._f&&!I(o)?G(r,o,n):p(r,o,n),Xe(r,g)&&_.state.next({...t}),_.state.next({name:d.mount?r:void 0,values:U(u)})},ne=async r=>{d.mount=!0;const i=r.target;let n=i.name,y=!0;const f=c(a,n),o=h=>{y=Number.isNaN(h)||se(h)&&isNaN(h.getTime())||ee(h,c(u,n,h))};if(f){let h,m;const C=i.type?Ge(f._f):st(r),M=r.type===he.BLUR||r.type===he.FOCUS_OUT,At=!Bt(f._f)&&!s.resolver&&!c(t.errors,n)&&!f._f.deps||It(M,c(t.touchedFields,n),t.isSubmitted,$,te),we=Xe(n,g,M);w(u,n,C),M?(f._f.onBlur&&f._f.onBlur(r),F&&F(0)):f._f.onChange&&f._f.onChange(r);const De=le(n,C,M),xt=!P(De)||we;if(!M&&_.state.next({name:n,type:r.type,values:U(u)}),At)return(A.isValid||D.isValid)&&(s.mode==="onBlur"?M&&N():M||N()),xt&&_.state.next({name:n,...we?{}:De});if(!M&&we&&_.state.next({...t}),s.resolver){const{errors:pe}=await z([n]);if(o(C),y){const wt=Ze(t.errors,a,n),$e=Ze(pe,a,wt.name||n);h=$e.error,n=$e.name,m=P(pe)}}else v([n],!0),h=(await tt(f,g.disabled,u,R,s.shouldUseNativeValidation))[n],v([n]),o(C),y&&(h?m=!1:(A.isValid||D.isValid)&&(m=await Q(a,!0)));y&&(f._f.deps&&me(f._f.deps),Fe(n,m,h,De))}},ye=(r,i)=>{if(c(t.errors,i)&&r.focus)return r.focus(),1},me=async(r,i={})=>{let n,y;const f=fe(r);if(s.resolver){const o=await re(k(r)?r:f);n=P(o),y=r?!f.some(h=>c(o,h)):n}else r?(y=(await Promise.all(f.map(async o=>{const h=c(a,o);return await Q(h&&h._f?{[o]:h}:h)}))).every(Boolean),!(!y&&!t.isValid)&&N()):y=n=await Q(a);return _.state.next({...!J(r)||(A.isValid||D.isValid)&&n!==t.isValid?{}:{name:r},...s.resolver||!r?{isValid:n}:{},errors:t.errors}),i.shouldFocus&&!y&&ce(a,ye,r?f:g.mount),y},Re=r=>{const i={...d.mount?u:l};return k(r)?i:J(r)?c(i,r):r.map(n=>c(i,n))},Ue=(r,i)=>({invalid:!!c((i||t).errors,r),isDirty:!!c((i||t).dirtyFields,r),error:c((i||t).errors,r),isValidating:!!c(t.validatingFields,r),isTouched:!!c((i||t).touchedFields,r)}),ht=r=>{r&&fe(r).forEach(i=>L(t.errors,i)),_.state.next({errors:r?t.errors:{}})},Me=(r,i,n)=>{const y=(c(a,r,{_f:{}})._f||{}).ref,f=c(t.errors,r)||{},{ref:o,message:h,type:m,...C}=f;w(t.errors,r,{...C,...i,ref:y}),_.state.next({name:r,errors:t.errors,isValid:!1}),n&&n.shouldFocus&&y&&y.focus&&y.focus()},vt=(r,i)=>j(r)?_.state.subscribe({next:n=>r(S(void 0,i),n)}):S(r,i,!0),Be=r=>_.state.subscribe({next:i=>{Pt(r.name,i.name,r.exact)&&Nt(i,r.formState||A,mt,r.reRenderRoot)&&r.callback({values:{...u},...t,...i})}}).unsubscribe,_t=r=>(d.mount=!0,D={...D,...r.formState},Be({...r,formState:D})),Ae=(r,i={})=>{for(const n of r?fe(r):g.mount)g.mount.delete(n),g.array.delete(n),i.keepValue||(L(a,n),L(u,n)),!i.keepError&&L(t.errors,n),!i.keepDirty&&L(t.dirtyFields,n),!i.keepTouched&&L(t.touchedFields,n),!i.keepIsValidating&&L(t.validatingFields,n),!s.shouldUnregister&&!i.keepDefaultValue&&L(l,n);_.state.next({values:U(u)}),_.state.next({...t,...i.keepDirty?{isDirty:b()}:{}}),!i.keepIsValid&&N()},Ne=({disabled:r,name:i})=>{(H(r)&&d.mount||r||g.disabled.has(i))&&(r?g.disabled.add(i):g.disabled.delete(i))},xe=(r,i={})=>{let n=c(a,r);const y=H(i.disabled)||H(s.disabled);return w(a,r,{...n||{},_f:{...n&&n._f?n._f:{ref:{name:r}},name:r,mount:!0,...i}}),g.mount.add(r),n?Ne({disabled:H(i.disabled)?i.disabled:s.disabled,name:r}):ae(r,!0,i.value),{...y?{disabled:i.disabled||s.disabled}:{},...s.progressive?{required:!!i.required,min:oe(i.min),max:oe(i.max),minLength:oe(i.minLength),maxLength:oe(i.maxLength),pattern:oe(i.pattern)}:{},name:r,onChange:ne,onBlur:ne,ref:f=>{if(f){xe(r,i),n=c(a,r);const o=k(f.value)&&f.querySelectorAll&&f.querySelectorAll("input,select,textarea")[0]||f,h=Lt(o),m=n._f.refs||[];if(h?m.find(C=>C===o):o===n._f.ref)return;w(a,r,{_f:{...n._f,...h?{refs:[...m.filter(Se),o,...Array.isArray(c(l,r))?[{}]:[]],ref:{type:o.type,name:r}}:{ref:o}}}),ae(r,!1,void 0,o)}else n=c(a,r,{}),n._f&&(n._f.mount=!1),(s.shouldUnregister||i.shouldUnregister)&&!(it(g.array,r)&&d.action)&&g.unMount.add(r)}}},Pe=()=>s.shouldFocusError&&ce(a,ye,g.mount),bt=r=>{H(r)&&(_.state.next({disabled:r}),ce(a,(i,n)=>{const y=c(a,n);y&&(i.disabled=y._f.disabled||r,Array.isArray(y._f.refs)&&y._f.refs.forEach(f=>{f.disabled=y._f.disabled||r}))},0,!1))},Ie=(r,i)=>async n=>{let y;n&&(n.preventDefault&&n.preventDefault(),n.persist&&n.persist());let f=U(u);if(_.state.next({isSubmitting:!0}),s.resolver){const{errors:o,values:h}=await z();t.errors=o,f=h}else await Q(a);if(g.disabled.size)for(const o of g.disabled)w(f,o,void 0);if(L(t.errors,"root"),P(t.errors)){_.state.next({errors:{}});try{await r(f,n)}catch(o){y=o}}else i&&await i({...t.errors},n),Pe(),setTimeout(Pe);if(_.state.next({isSubmitted:!0,isSubmitting:!1,isSubmitSuccessful:P(t.errors)&&!y,submitCount:t.submitCount+1,errors:t.errors}),y)throw y},Vt=(r,i={})=>{c(a,r)&&(k(i.defaultValue)?Z(r,U(c(l,r))):(Z(r,i.defaultValue),w(l,r,U(i.defaultValue))),i.keepTouched||L(t.touchedFields,r),i.keepDirty||(L(t.dirtyFields,r),t.isDirty=i.defaultValue?b(r,U(c(l,r))):b()),i.keepError||(L(t.errors,r),A.isValid&&N()),_.state.next({...t}))},qe=(r,i={})=>{const n=r?U(r):l,y=U(n),f=P(r),o=f?l:y;if(i.keepDefaultValues||(l=n),!i.keepValues){if(i.keepDirtyValues){const h=new Set([...g.mount,...Object.keys(ue(l,u))]);for(const m of Array.from(h))c(t.dirtyFields,m)?w(o,m,c(u,m)):Z(m,c(o,m))}else{if(Ee&&k(r))for(const h of g.mount){const m=c(a,h);if(m&&m._f){const C=Array.isArray(m._f.refs)?m._f.refs[0]:m._f.ref;if(ve(C)){const M=C.closest("form");if(M){M.reset();break}}}}for(const h of g.mount)Z(h,c(o,h))}u=U(o),_.array.next({values:{...o}}),_.state.next({values:{...o}})}g={mount:i.keepDirtyValues?g.mount:new Set,unMount:new Set,array:new Set,disabled:new Set,watch:new Set,watchAll:!1,focus:""},d.mount=!A.isValid||!!i.keepIsValid||!!i.keepDirtyValues,d.watch=!!s.shouldUnregister,_.state.next({submitCount:i.keepSubmitCount?t.submitCount:0,isDirty:f?!1:i.keepDirty?t.isDirty:!!(i.keepDefaultValues&&!ee(r,l)),isSubmitted:i.keepIsSubmitted?t.isSubmitted:!1,dirtyFields:f?{}:i.keepDirtyValues?i.keepDefaultValues&&u?ue(l,u):t.dirtyFields:i.keepDefaultValues&&r?ue(l,r):i.keepDirty?t.dirtyFields:{},touchedFields:i.keepTouched?t.touchedFields:{},errors:i.keepErrors?t.errors:{},isSubmitSuccessful:i.keepIsSubmitSuccessful?t.isSubmitSuccessful:!1,isSubmitting:!1})},We=(r,i)=>qe(j(r)?r(u):r,i),Ft=(r,i={})=>{const n=c(a,r),y=n&&n._f;if(y){const f=y.refs?y.refs[0]:y.ref;f.focus&&(f.focus(),i.shouldSelect&&j(f.select)&&f.select())}},mt=r=>{t={...t,...r}},He={control:{register:xe,unregister:Ae,getFieldState:Ue,handleSubmit:Ie,setError:Me,_subscribe:Be,_runSchema:z,_getWatch:S,_getDirty:b,_setValid:N,_setFieldArray:Y,_setDisabledField:Ne,_setErrors:O,_getFieldArray:q,_reset:qe,_resetDefaultValues:()=>j(s.defaultValues)&&s.defaultValues().then(r=>{We(r,s.resetOptions),_.state.next({isLoading:!1})}),_removeUnmounted:x,_disableForm:bt,_subjects:_,_proxyFormState:A,get _fields(){return a},get _formValues(){return u},get _state(){return d},set _state(r){d=r},get _defaultValues(){return l},get _names(){return g},set _names(r){g=r},get _formState(){return t},get _options(){return s},set _options(r){s={...s,...r}}},subscribe:_t,trigger:me,register:xe,handleSubmit:Ie,watch:vt,setValue:Z,getValues:Re,reset:We,resetField:Vt,clearErrors:ht,unregister:Ae,setError:Me,setFocus:Ft,getFieldState:Ue};return{...He,formControl:He}}function zt(e={}){const s=V.useRef(void 0),t=V.useRef(void 0),[a,l]=V.useState({isDirty:!1,isValidating:!1,isLoading:j(e.defaultValues),isSubmitted:!1,isSubmitting:!1,isSubmitSuccessful:!1,isValid:!1,submitCount:0,dirtyFields:{},touchedFields:{},validatingFields:{},errors:e.errors||{},disabled:e.disabled||!1,defaultValues:j(e.defaultValues)?void 0:e.defaultValues});s.current||(s.current={...e.formControl?e.formControl:pt(e),formState:a},e.formControl&&e.defaultValues&&!j(e.defaultValues)&&e.formControl.reset(e.defaultValues,e.resetOptions));const u=s.current.control;return u._options=e,V.useLayoutEffect(()=>u._subscribe({formState:u._proxyFormState,callback:()=>l({...u._formState}),reRenderRoot:!0}),[u]),V.useEffect(()=>u._disableForm(e.disabled),[u,e.disabled]),V.useEffect(()=>{if(u._proxyFormState.isDirty){const d=u._getDirty();d!==a.isDirty&&u._subjects.state.next({isDirty:d})}},[u,a.isDirty]),V.useEffect(()=>{e.values&&!ee(e.values,t.current)?(u._reset(e.values,u._options.resetOptions),t.current=e.values,l(d=>({...d}))):u._resetDefaultValues()},[e.values,u]),V.useEffect(()=>{e.errors&&!P(e.errors)&&u._setErrors(e.errors)},[e.errors,u]),V.useEffect(()=>{u._state.mount||(u._setValid(),u._state.mount=!0),u._state.watch&&(u._state.watch=!1,u._subjects.state.next({...u._formState})),u._removeUnmounted()}),V.useEffect(()=>{e.shouldUnregister&&u._subjects.state.next({values:u._getWatch()})},[e.shouldUnregister,u]),s.current.formState=nt(a,u),s.current}export{jt as C,Kt as F,Te as a,zt as u};
