import{a as d,t as m,e as i,g as c,f as v,i as b}from"../chunks/disclose-version.BR-4IzaJ.js";import{x as a,y as h,z as $,s as p,g as x,A as _,B as y,C as w}from"../chunks/runtime.fzMmQ1dr.js";import{i as z}from"../chunks/lifecycle.CsT3JRpe.js";import{s as A}from"../chunks/entry.CTQxWfiB.js";function B(s,r,t){if(s==null)return r(void 0),a;const e=s.subscribe(r,t);return e.unsubscribe?()=>e.unsubscribe():e}function C(s,r,t){const e=t[r]??(t[r]={store:null,source:$(void 0),unsubscribe:a});if(e.store!==s)if(e.unsubscribe(),e.store=s??null,s==null)p(e.source,void 0),e.unsubscribe=a;else{var u=!0;e.unsubscribe=B(s,n=>{u?(e.source.v=n,u=!1):p(e.source,n)})}return x(e.source)}function E(){const s={};return h(()=>{for(var r in s)s[r].unsubscribe()}),s}const S=()=>{const s=A;return{page:{subscribe:s.page.subscribe},navigating:{subscribe:s.navigating.subscribe},updated:s.updated}},j={subscribe(s){return S().page.subscribe(s)}};var k=m("<h1> </h1> <p> </p>",1);function H(s,r){_(r,!1);const t=E(),e=()=>C(j,"$page",t);z();var u=k(),n=v(u),f=c(n),g=b(b(n,!0)),l=c(g);y(()=>{var o;i(f,e().status),i(l,(o=e().error)==null?void 0:o.message)}),d(s,u),w()}export{H as component};
