import{k as F,l as O,q as V,N as x,O as P,P as B,Q as q,R as Q,v as W,A as Z,C as j,c as z,n as G}from"./runtime.fzMmQ1dr.js";function K(e){console.warn("hydration_mismatch")}const ue=1,de=2,le=4,_e=8,he=16,me=64,ve=1,pe=2,Ee=4,ye=8,X=1,J=2,I="[",L="]",ee="",Te=`${L}!`,w={},ge=Symbol(),ne=["touchstart","touchmove","touchend"];let u=!1;function S(e){u=e}let _=null,h;function H(e){_=e,h=e&&e[0]}function M(){return h.previousSibling??h}function T(e){if(e.nodeType!==8)return e;var n=e;if(n.data!==I)return e;for(var t=[],a=0;(n=n.nextSibling)!==null;){if(n.nodeType===8){var r=n.data;if(r===I)a+=1;else if(r[0]===L){if(a===0)return _=t,h=t[0],n;a-=1}}t.push(n)}throw K(),w}var D,te;function k(){if(D===void 0){D=window,te=document;var e=Element.prototype;e.__click=void 0,e.__className="",e.__attributes=null,e.__e=void 0,Text.prototype.__t=void 0}}function E(){return document.createTextNode("")}function Ce(e){const n=e.firstChild;return u?n===null?e.appendChild(E()):T(n):n}function Se(e,n){if(!u){var t=e.firstChild;return t instanceof Comment&&t.data===""?t.nextSibling:t}return T(h)}function re(e,n=!1){var t=e.nextSibling;if(!u)return t;var a=t.nodeType;if(a===8&&t.data===ee)return re(t,n);if(n&&a!==3){var r=E();return t==null||t.before(r),r}return T(t)}function ae(e){e.textContent=""}function Ae(e){for(var n=0;n<e.length;n++)U.add(e[n]);for(var t of N)t(e)}function A(e){var b;var n=this,t=n.ownerDocument,a=e.type,r=((b=e.composedPath)==null?void 0:b.call(e))||[],o=r[0]||e.target,i=0,l=e.__root;if(l){var d=r.indexOf(l);if(d!==-1&&(n===document||n===window)){e.__root=n;return}var m=r.indexOf(n);if(m===-1)return;d<=m&&(i=d)}if(o=r[i]||e.target,o!==n){F(e,"currentTarget",{configurable:!0,get(){return o||t}});try{for(var y,c=[];o!==null;){var v=o.parentNode||o.host||null;try{var f=o["__"+a];if(f!==void 0&&!o.disabled)if(O(f)){var[g,...$]=f;g.apply(o,[e,...$])}else f.call(o,e)}catch(C){y?c.push(C):y=C}if(e.cancelBubble||v===n||v===null)break;o=v}if(y){for(let C of c)queueMicrotask(()=>{throw C});throw y}}finally{e.__root=n,o=n}}}let s;function oe(){s=void 0}function Ie(e){let n=null,t=u;var a;if(u){for(n=_,s===void 0&&(s=document.head.firstChild);s.nodeType!==8||s.data!==I;)s=s.nextSibling;s=T(s),s=s.nextSibling}else a=document.head.appendChild(E());try{V(()=>e(a),x)}finally{t&&H(n)}}const U=new Set,N=new Set;function we(e,n){(e.__t??(e.__t=e.nodeValue))!==n&&(e.nodeValue=e.__t=n)}function Ne(e,n,t,a){n===void 0||n(e,t)}function ie(e,n){const t=n.anchor??n.target.appendChild(E());return P(()=>Y(e,{...n,anchor:t}),!1)}function Re(e,n){n.intro=n.intro??!1;const t=n.target,a=_;try{return P(()=>{S(!0);for(var r=t.firstChild;r&&(r.nodeType!==8||r.data!==I);)r=r.nextSibling;if(!r)throw w;const o=T(r),i=Y(e,{...n,anchor:o});return S(!1),i},!1)}catch(r){if(r===w)return n.recover===!1&&B(),k(),ae(t),S(!1),ie(e,n);throw r}finally{S(!!a),H(a),oe()}}function Y(e,{target:n,anchor:t,props:a={},events:r,context:o,intro:i=!0}){k();const l=new Set,d=c=>{for(let v=0;v<c.length;v++){const f=c[v],g=ne.includes(f);l.has(f)||(l.add(f),n.addEventListener(f,A,{passive:g}),document.addEventListener(f,A,{passive:g}))}};d(q(U)),N.add(d);let m;const y=Q(()=>(W(()=>{if(o){Z({});var c=z;c.c=o}r&&(a.$$events=r),m=e(t,a)||{},o&&j()}),()=>{for(const c of l)n.removeEventListener(c,A),document.removeEventListener(c,A);N.delete(d),R.delete(m)}));return R.set(m,y),m}let R=new WeakMap;function be(e){const n=R.get(e);n==null||n()}function se(e){var n=document.createElement("template");return n.innerHTML=e,n.content}function De(e){if(O(e))for(var n=0;n<e.length;n++){var t=e[n];t.isConnected&&t.remove()}else e.isConnected&&e.remove()}function p(e,n){var t;(t=G).nodes??(t.nodes={start:e,end:n})}function Oe(e,n){var t=(n&X)!==0,a=(n&J)!==0,r,o=!e.startsWith("<!>");return()=>{if(u)return p(M(),_[_.length-1]),h;r||(r=se(o?e:"<!>"+e),t||(r=r.firstChild));var i=a?document.importNode(r,!0):r.cloneNode(!0);if(t){var l=i.firstChild,d=i.lastChild;p(l,d)}else p(i,i);return i}}function Pe(e){if(!u){var n=E();return p(n,n),n}var t=h;return t||e.before(t=E()),p(t,t),t}function Le(){if(u)return p(M(),_[_.length-1]),h;var e=document.createDocumentFragment(),n=document.createComment(""),t=E();return e.append(n,t),p(n,t),e}function He(e,n){u||e.before(n)}const ce="5";typeof window<"u"&&(window.__svelte||(window.__svelte={v:new Set})).v.add(ce);export{te as $,_e as A,le as B,he as C,Ae as D,ue as E,Ie as F,Te as H,Ee as P,ge as U,He as a,S as b,Le as c,_ as d,we as e,Se as f,Ce as g,u as h,re as i,ve as j,pe as k,ye as l,Re as m,ie as n,Pe as o,h as p,I as q,De as r,Ne as s,Oe as t,be as u,T as v,me as w,de as x,ae as y,E as z};
