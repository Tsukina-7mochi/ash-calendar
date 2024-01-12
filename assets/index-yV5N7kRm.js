(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function e(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=e(s);fetch(s.href,i)}})();const O=(n,t)=>`${n}`.padStart(t,"0"),Lt=/^(\d+)-(\d+)-(\d+)$/,y=class y{static parse(t){const e=t.match(Lt);if(e===null)return null;const r=e[1],s=e[2],i=e[3];return typeof r!="string"||typeof s!="string"||typeof i!="string"?null:new y(parseInt(r),parseInt(s),parseInt(i))}static today(){const t=new Date;return new y(t.getFullYear(),t.getMonth()+1,t.getDate())}get rawDate(){return new Date(this.year,this.month-1,this.date)}get monthName(){return y.monthNames[this.month-1]}get dayOfWeekName(){return y.dayOfWeekNames[this.dayOfWeek]}get dateString(){return`${O(this.year,4)}-${O(this.month,2)}-${O(this.date,2)}`}get dateStringShort(){return`${O(this.year,4)}${O(this.month,2)}${O(this.date,2)}`}constructor(t,e,r){this.year=t,this.month=e,this.date=r;const s=new Date(t,e-1,r);this.dayOfWeek=s.getDay()}normalized(){const t=this.rawDate;return new y(t.getFullYear(),t.getMonth()+1,t.getDate())}toString(){return this.dateString}equals(t){return this.year===t.year&&this.month===t.month&&this.date===t.date}};y.monthNames=["Jan.","Feb.","Mar.","Apr.","May.","Jun.","Jul.","Aug.","Sep.","Oct.","Nov.","Dec."],y.dayOfWeekNames=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],y.litConverter={fromAttribute(t,e){return e!==y||typeof t!="string"?null:y.parse(t)},toAttribute(t,e){return e!==y?null:t.toString()}};let f=y;class Ut{constructor(t={}){this.map=t}get(t){return this.map[t]}set(t,e){this.map[t]=e}setById(t,e){const r=document.getElementById(e??t);if(r===null)throw Error(`Element with id ${e} is not found.`);this.set(t,r)}}const Y=class Y extends Event{constructor(t,e){super(Y.eventName,e),this.date=t}};Y.eventName="date-change";let W=Y;/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const j=globalThis,rt=j.ShadowRoot&&(j.ShadyCSS===void 0||j.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,nt=Symbol(),ct=new WeakMap;let vt=class{constructor(t,e,r){if(this._$cssResult$=!0,r!==nt)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(rt&&t===void 0){const r=e!==void 0&&e.length===1;r&&(t=ct.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),r&&ct.set(e,t))}return t}toString(){return this.cssText}};const Nt=n=>new vt(typeof n=="string"?n:n+"",void 0,nt),P=(n,...t)=>{const e=n.length===1?n[0]:t.reduce((r,s,i)=>r+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+n[i+1],n[0]);return new vt(e,n,nt)},Dt=(n,t)=>{if(rt)n.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const e of t){const r=document.createElement("style"),s=j.litNonce;s!==void 0&&r.setAttribute("nonce",s),r.textContent=e.cssText,n.appendChild(r)}},lt=rt?n=>n:n=>n instanceof CSSStyleSheet?(t=>{let e="";for(const r of t.cssRules)e+=r.cssText;return Nt(e)})(n):n;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Rt,defineProperty:Tt,getOwnPropertyDescriptor:Mt,getOwnPropertyNames:It,getOwnPropertySymbols:Ht,getPrototypeOf:Bt}=Object,b=globalThis,ht=b.trustedTypes,kt=ht?ht.emptyScript:"",G=b.reactiveElementPolyfillSupport,D=(n,t)=>n,q={toAttribute(n,t){switch(t){case Boolean:n=n?kt:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,t){let e=n;switch(t){case Boolean:e=n!==null;break;case Number:e=n===null?null:Number(n);break;case Object:case Array:try{e=JSON.parse(n)}catch{e=null}}return e}},it=(n,t)=>!Rt(n,t),dt={attribute:!0,type:String,converter:q,reflect:!1,hasChanged:it};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),b.litPropertyMetadata??(b.litPropertyMetadata=new WeakMap);class C extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=dt){if(e.state&&(e.attribute=!1),this._$Ei(),this.elementProperties.set(t,e),!e.noAccessor){const r=Symbol(),s=this.getPropertyDescriptor(t,r,e);s!==void 0&&Tt(this.prototype,t,s)}}static getPropertyDescriptor(t,e,r){const{get:s,set:i}=Mt(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get(){return s==null?void 0:s.call(this)},set(o){const l=s==null?void 0:s.call(this);i.call(this,o),this.requestUpdate(t,l,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??dt}static _$Ei(){if(this.hasOwnProperty(D("elementProperties")))return;const t=Bt(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(D("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(D("properties"))){const e=this.properties,r=[...It(e),...Ht(e)];for(const s of r)this.createProperty(s,e[s])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[r,s]of e)this.elementProperties.set(r,s)}this._$Eh=new Map;for(const[e,r]of this.elementProperties){const s=this._$Eu(e,r);s!==void 0&&this._$Eh.set(s,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const r=new Set(t.flat(1/0).reverse());for(const s of r)e.unshift(lt(s))}else t!==void 0&&e.push(lt(t));return e}static _$Eu(t,e){const r=e.attribute;return r===!1?void 0:typeof r=="string"?r:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var t;this._$Eg=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$ES(),this.requestUpdate(),(t=this.constructor.l)==null||t.forEach(e=>e(this))}addController(t){var e;(this._$E_??(this._$E_=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&((e=t.hostConnected)==null||e.call(t))}removeController(t){var e;(e=this._$E_)==null||e.delete(t)}_$ES(){const t=new Map,e=this.constructor.elementProperties;for(const r of e.keys())this.hasOwnProperty(r)&&(t.set(r,this[r]),delete this[r]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Dt(t,this.constructor.elementStyles),t}connectedCallback(){var t;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$E_)==null||t.forEach(e=>{var r;return(r=e.hostConnected)==null?void 0:r.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$E_)==null||t.forEach(e=>{var r;return(r=e.hostDisconnected)==null?void 0:r.call(e)})}attributeChangedCallback(t,e,r){this._$AK(t,r)}_$EO(t,e){var i;const r=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,r);if(s!==void 0&&r.reflect===!0){const o=(((i=r.converter)==null?void 0:i.toAttribute)!==void 0?r.converter:q).toAttribute(e,r.type);this._$Em=t,o==null?this.removeAttribute(s):this.setAttribute(s,o),this._$Em=null}}_$AK(t,e){var i;const r=this.constructor,s=r._$Eh.get(t);if(s!==void 0&&this._$Em!==s){const o=r.getPropertyOptions(s),l=typeof o.converter=="function"?{fromAttribute:o.converter}:((i=o.converter)==null?void 0:i.fromAttribute)!==void 0?o.converter:q;this._$Em=s,this[s]=l.fromAttribute(e,o.type),this._$Em=null}}requestUpdate(t,e,r,s=!1,i){if(t!==void 0){if(r??(r=this.constructor.getPropertyOptions(t)),!(r.hasChanged??it)(s?i:this[t],e))return;this.C(t,e,r)}this.isUpdatePending===!1&&(this._$Eg=this._$EP())}C(t,e,r){this._$AL.has(t)||this._$AL.set(t,e),r.reflect===!0&&this._$Em!==t&&(this._$Ej??(this._$Ej=new Set)).add(t)}async _$EP(){this.isUpdatePending=!0;try{await this._$Eg}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var r;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[i,o]of this._$Ep)this[i]=o;this._$Ep=void 0}const s=this.constructor.elementProperties;if(s.size>0)for(const[i,o]of s)o.wrapped!==!0||this._$AL.has(i)||this[i]===void 0||this.C(i,this[i],o)}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),(r=this._$E_)==null||r.forEach(s=>{var i;return(i=s.hostUpdate)==null?void 0:i.call(s)}),this.update(e)):this._$ET()}catch(s){throw t=!1,this._$ET(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){var e;(e=this._$E_)==null||e.forEach(r=>{var s;return(s=r.hostUpdated)==null?void 0:s.call(r)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$ET(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$Eg}shouldUpdate(t){return!0}update(t){this._$Ej&&(this._$Ej=this._$Ej.forEach(e=>this._$EO(e,this[e]))),this._$ET()}updated(t){}firstUpdated(t){}}C.elementStyles=[],C.shadowRootOptions={mode:"open"},C[D("elementProperties")]=new Map,C[D("finalized")]=new Map,G==null||G({ReactiveElement:C}),(b.reactiveElementVersions??(b.reactiveElementVersions=[])).push("2.0.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const R=globalThis,F=R.trustedTypes,ut=F?F.createPolicy("lit-html",{createHTML:n=>n}):void 0,_t="$lit$",_=`lit$${(Math.random()+"").slice(9)}$`,bt="?"+_,zt=`<${bt}>`,S=document,T=()=>S.createComment(""),M=n=>n===null||typeof n!="object"&&typeof n!="function",At=Array.isArray,jt=n=>At(n)||typeof(n==null?void 0:n[Symbol.iterator])=="function",Q=`[ 	
\f\r]`,N=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,pt=/-->/g,ft=/>/g,w=RegExp(`>|${Q}(?:([^\\s"'>=/]+)(${Q}*=${Q}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),gt=/'/g,yt=/"/g,wt=/^(?:script|style|textarea|title)$/i,Wt=n=>(t,...e)=>({_$litType$:n,strings:t,values:e}),m=Wt(1),L=Symbol.for("lit-noChange"),g=Symbol.for("lit-nothing"),$t=new WeakMap,E=S.createTreeWalker(S,129);function Et(n,t){if(!Array.isArray(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return ut!==void 0?ut.createHTML(t):t}const qt=(n,t)=>{const e=n.length-1,r=[];let s,i=t===2?"<svg>":"",o=N;for(let l=0;l<e;l++){const a=n[l];let d,h,c=-1,u=0;for(;u<a.length&&(o.lastIndex=u,h=o.exec(a),h!==null);)u=o.lastIndex,o===N?h[1]==="!--"?o=pt:h[1]!==void 0?o=ft:h[2]!==void 0?(wt.test(h[2])&&(s=RegExp("</"+h[2],"g")),o=w):h[3]!==void 0&&(o=w):o===w?h[0]===">"?(o=s??N,c=-1):h[1]===void 0?c=-2:(c=o.lastIndex-h[2].length,d=h[1],o=h[3]===void 0?w:h[3]==='"'?yt:gt):o===yt||o===gt?o=w:o===pt||o===ft?o=N:(o=w,s=void 0);const p=o===w&&n[l+1].startsWith("/>")?" ":"";i+=o===N?a+zt:c>=0?(r.push(d),a.slice(0,c)+_t+a.slice(c)+_+p):a+_+(c===-2?l:p)}return[Et(n,i+(n[e]||"<?>")+(t===2?"</svg>":"")),r]};class I{constructor({strings:t,_$litType$:e},r){let s;this.parts=[];let i=0,o=0;const l=t.length-1,a=this.parts,[d,h]=qt(t,e);if(this.el=I.createElement(d,r),E.currentNode=this.el.content,e===2){const c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(s=E.nextNode())!==null&&a.length<l;){if(s.nodeType===1){if(s.hasAttributes())for(const c of s.getAttributeNames())if(c.endsWith(_t)){const u=h[o++],p=s.getAttribute(c).split(_),$=/([.?@])?(.*)/.exec(u);a.push({type:1,index:i,name:$[2],strings:p,ctor:$[1]==="."?Vt:$[1]==="?"?Jt:$[1]==="@"?Yt:K}),s.removeAttribute(c)}else c.startsWith(_)&&(a.push({type:6,index:i}),s.removeAttribute(c));if(wt.test(s.tagName)){const c=s.textContent.split(_),u=c.length-1;if(u>0){s.textContent=F?F.emptyScript:"";for(let p=0;p<u;p++)s.append(c[p],T()),E.nextNode(),a.push({type:2,index:++i});s.append(c[u],T())}}}else if(s.nodeType===8)if(s.data===bt)a.push({type:2,index:i});else{let c=-1;for(;(c=s.data.indexOf(_,c+1))!==-1;)a.push({type:7,index:i}),c+=_.length-1}i++}}static createElement(t,e){const r=S.createElement("template");return r.innerHTML=t,r}}function U(n,t,e=n,r){var o,l;if(t===L)return t;let s=r!==void 0?(o=e._$Co)==null?void 0:o[r]:e._$Cl;const i=M(t)?void 0:t._$litDirective$;return(s==null?void 0:s.constructor)!==i&&((l=s==null?void 0:s._$AO)==null||l.call(s,!1),i===void 0?s=void 0:(s=new i(n),s._$AT(n,e,r)),r!==void 0?(e._$Co??(e._$Co=[]))[r]=s:e._$Cl=s),s!==void 0&&(t=U(n,s._$AS(n,t.values),s,r)),t}class Ft{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:r}=this._$AD,s=((t==null?void 0:t.creationScope)??S).importNode(e,!0);E.currentNode=s;let i=E.nextNode(),o=0,l=0,a=r[0];for(;a!==void 0;){if(o===a.index){let d;a.type===2?d=new k(i,i.nextSibling,this,t):a.type===1?d=new a.ctor(i,a.name,a.strings,this,t):a.type===6&&(d=new Kt(i,this,t)),this._$AV.push(d),a=r[++l]}o!==(a==null?void 0:a.index)&&(i=E.nextNode(),o++)}return E.currentNode=S,s}p(t){let e=0;for(const r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,e),e+=r.strings.length-2):r._$AI(t[e])),e++}}class k{get _$AU(){var t;return((t=this._$AM)==null?void 0:t._$AU)??this._$Cv}constructor(t,e,r,s){this.type=2,this._$AH=g,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=r,this.options=s,this._$Cv=(s==null?void 0:s.isConnected)??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=U(this,t,e),M(t)?t===g||t==null||t===""?(this._$AH!==g&&this._$AR(),this._$AH=g):t!==this._$AH&&t!==L&&this._(t):t._$litType$!==void 0?this.g(t):t.nodeType!==void 0?this.$(t):jt(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==g&&M(this._$AH)?this._$AA.nextSibling.data=t:this.$(S.createTextNode(t)),this._$AH=t}g(t){var i;const{values:e,_$litType$:r}=t,s=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=I.createElement(Et(r.h,r.h[0]),this.options)),r);if(((i=this._$AH)==null?void 0:i._$AD)===s)this._$AH.p(e);else{const o=new Ft(s,this),l=o.u(this.options);o.p(e),this.$(l),this._$AH=o}}_$AC(t){let e=$t.get(t.strings);return e===void 0&&$t.set(t.strings,e=new I(t)),e}T(t){At(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let r,s=0;for(const i of t)s===e.length?e.push(r=new k(this.k(T()),this.k(T()),this,this.options)):r=e[s],r._$AI(i),s++;s<e.length&&(this._$AR(r&&r._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){var r;for((r=this._$AP)==null?void 0:r.call(this,!1,!0,e);t&&t!==this._$AB;){const s=t.nextSibling;t.remove(),t=s}}setConnected(t){var e;this._$AM===void 0&&(this._$Cv=t,(e=this._$AP)==null||e.call(this,t))}}class K{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,r,s,i){this.type=1,this._$AH=g,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=i,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=g}_$AI(t,e=this,r,s){const i=this.strings;let o=!1;if(i===void 0)t=U(this,t,e,0),o=!M(t)||t!==this._$AH&&t!==L,o&&(this._$AH=t);else{const l=t;let a,d;for(t=i[0],a=0;a<i.length-1;a++)d=U(this,l[r+a],e,a),d===L&&(d=this._$AH[a]),o||(o=!M(d)||d!==this._$AH[a]),d===g?t=g:t!==g&&(t+=(d??"")+i[a+1]),this._$AH[a]=d}o&&!s&&this.O(t)}O(t){t===g?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class Vt extends K{constructor(){super(...arguments),this.type=3}O(t){this.element[this.name]=t===g?void 0:t}}class Jt extends K{constructor(){super(...arguments),this.type=4}O(t){this.element.toggleAttribute(this.name,!!t&&t!==g)}}class Yt extends K{constructor(t,e,r,s,i){super(t,e,r,s,i),this.type=5}_$AI(t,e=this){if((t=U(this,t,e,0)??g)===L)return;const r=this._$AH,s=t===g&&r!==g||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,i=t!==g&&(r===g||s);s&&this.element.removeEventListener(this.name,this,r),i&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e;typeof this._$AH=="function"?this._$AH.call(((e=this.options)==null?void 0:e.host)??this.element,t):this._$AH.handleEvent(t)}}class Kt{constructor(t,e,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){U(this,t)}}const X=R.litHtmlPolyfillSupport;X==null||X(I,k),(R.litHtmlVersions??(R.litHtmlVersions=[])).push("3.1.0");const Gt=(n,t,e)=>{const r=(e==null?void 0:e.renderBefore)??t;let s=r._$litPart$;if(s===void 0){const i=(e==null?void 0:e.renderBefore)??null;r._$litPart$=s=new k(t.insertBefore(T(),i),i,void 0,e??{})}return s._$AI(n),s};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class v extends C{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e;const t=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=t.firstChild),t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Gt(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)==null||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)==null||t.setConnected(!1)}render(){return L}}var mt;v._$litElement$=!0,v.finalized=!0,(mt=globalThis.litElementHydrateSupport)==null||mt.call(globalThis,{LitElement:v});const Z=globalThis.litElementPolyfillSupport;Z==null||Z({LitElement:v});(globalThis.litElementVersions??(globalThis.litElementVersions=[])).push("4.0.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const x=n=>(t,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(n,t)}):customElements.define(n,t)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Qt={attribute:!0,type:String,converter:q,reflect:!1,hasChanged:it},Xt=(n=Qt,t,e)=>{const{kind:r,metadata:s}=e;let i=globalThis.litPropertyMetadata.get(s);if(i===void 0&&globalThis.litPropertyMetadata.set(s,i=new Map),i.set(e.name,n),r==="accessor"){const{name:o}=e;return{set(l){const a=t.get.call(this);t.set.call(this,l),this.requestUpdate(o,a,n)},init(l){return l!==void 0&&this.C(o,void 0,n),l}}}if(r==="setter"){const{name:o}=e;return function(l){const a=this[o];t.call(this,l),this.requestUpdate(o,a,n)}}throw Error("Unsupported decorator location: "+r)};function A(n){return(t,e)=>typeof e=="object"?Xt(n,t,e):((r,s,i)=>{const o=s.hasOwnProperty(i);return s.constructor.createProperty(i,o?{...r,wrapped:!0}:r),o?Object.getOwnPropertyDescriptor(s,i):void 0})(n,t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function Zt(n){return A({...n,state:!0,attribute:!1})}var te=Object.defineProperty,ee=Object.getOwnPropertyDescriptor,St=(n,t,e,r)=>{for(var s=r>1?void 0:r?ee(t,e):t,i=n.length-1,o;i>=0;i--)(o=n[i])&&(s=(r?o(t,e,s):o(s))||s);return r&&s&&te(t,e,s),s};let tt=class extends v{constructor(){super(...arguments),this.date=f.today()}render(){return m`${this.date.dayOfWeekName}`}};St([A({converter:f.litConverter,type:f})],tt.prototype,"date",2);tt=St([x("calendar-day-of-week")],tt);var se=Object.defineProperty,re=Object.getOwnPropertyDescriptor,ot=(n,t,e,r)=>{for(var s=r>1?void 0:r?re(t,e):t,i=n.length-1,o;i>=0;i--)(o=n[i])&&(s=(r?o(t,e,s):o(s))||s);return r&&s&&se(t,e,s),s};let H=class extends v{constructor(){super(...arguments),this.date=f.today(),this.dayRange=3}render(){const n=new Array(this.dayRange*2+1).fill(0).map((t,e)=>{const r=new f(this.date.year,this.date.month,this.date.date+e-this.dayRange).normalized();return m`
        <div @click="${()=>{const i=new W(r,{bubbles:!0,composed:!0});console.log(i),this.dispatchEvent(i)}}" class="${e===this.dayRange?"today day":"day"}">
          ${r.date}
        </div>
      `});return m`${n}`}};H.styles=P`
    :host {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      width: 100%;
      height: 100%;
      font-size: 1.5em;
    }

    .day {
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }

    .today {
      font-size: 2em;
    }
  `;ot([A({converter:f.litConverter,type:f})],H.prototype,"date",2);ot([A({type:Number})],H.prototype,"dayRange",2);H=ot([x("calendar-days")],H);var ne=Object.defineProperty,ie=Object.getOwnPropertyDescriptor,Pt=(n,t,e,r)=>{for(var s=r>1?void 0:r?ie(t,e):t,i=n.length-1,o;i>=0;i--)(o=n[i])&&(s=(r?o(t,e,s):o(s))||s);return r&&s&&ne(t,e,s),s};let V=class extends v{constructor(){super(...arguments),this.date=f.today()}render(){return m`
      <calendar-year-month .date=${this.date}></calendar-year-month>
      <calendar-days .date=${this.date}></calendar-days>
      <calendar-day-of-week .date=${this.date}></calendar-day-of-week>
    `}};V.styles=P`
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0.5em;
      height: 10em;
      font-weight: lighter;
    }

    calendar-days {
      flex-grow: 1;
    }
  `;Pt([A({converter:f.litConverter,type:f})],V.prototype,"date",2);V=Pt([x("calendar-root")],V);var oe=Object.defineProperty,ae=Object.getOwnPropertyDescriptor,xt=(n,t,e,r)=>{for(var s=r>1?void 0:r?ae(t,e):t,i=n.length-1,o;i>=0;i--)(o=n[i])&&(s=(r?o(t,e,s):o(s))||s);return r&&s&&oe(t,e,s),s};let et=class extends v{constructor(){super(...arguments),this.date=f.today()}render(){return m`${this.date.monthName} ${this.date.year}`}};xt([A({converter:f.litConverter,type:f})],et.prototype,"date",2);et=xt([x("calendar-year-month")],et);const ce=P`
  button {
    appearance: unset;
    font-style: unset;
    font-variant-ligatures: unset;
    font-variant-caps: unset;
    font-variant-numeric: unset;
    font-variant-east-asian: unset;
    font-variant-alternates: unset;
    font-variant-position: unset;
    font-weight: unset;
    font-stretch: unset;
    font-size: unset;
    font-family: unset;
    font-optical-sizing: unset;
    font-kerning: unset;
    font-feature-settings: unset;
    font-variation-settings: unset;
    text-rendering: unset;
    color: unset;
    letter-spacing: unset;
    word-spacing: unset;
    line-height: unset;
    text-transform: unset;
    text-indent: unset;
    text-shadow: unset;
    display: unset;
    text-align: unset;
    align-items: unset;
    cursor: unset;
    box-sizing: unset;
    background-color: unset;
    margin: unset;
    padding-block: unset;
    padding-inline: unset;
    border-width: unset;
    border-style: unset;
    border-color: unset;
    border-image: unset;
  }
`,Ot=P`
  ${ce}

  button {
    cursor: pointer;
  }

  button:select {
    outline: 2px solid var(--c-text);
  }
`;P`
  .material-symbols-outlined {
    font-variation-settings:
      'FILL' 0,
      'wght' 400,
      'GRAD' 0,
      'opsz' 24;
    line-height: 1em;
  }
`;var le=Object.defineProperty,he=Object.getOwnPropertyDescriptor,de=(n,t,e,r)=>{for(var s=r>1?void 0:r?he(t,e):t,i=n.length-1,o;i>=0;i--)(o=n[i])&&(s=(r?o(t,e,s):o(s))||s);return r&&s&&le(t,e,s),s};let J=class extends v{render(){return m`
      <button id="root">
        <slot></slot>
      </button>
    `}};J.styles=[Ot,P`
      #root {
        display: flex;
        width: 100%;
        height: 100%;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        background-color: var(--c-overlay-bg);
        border-radius: var(--border-radius);
      }

      #root:hover {
        background-color: var(--c-overlay-bg-hover);
      }

      #root:active {
        background-color: var(--c-overlay-bg-active);
      }
    `];J=de([x("overlay-button")],J);var ue=Object.defineProperty,pe=Object.getOwnPropertyDescriptor,Ct=(n,t,e,r)=>{for(var s=r>1?void 0:r?pe(t,e):t,i=n.length-1,o;i>=0;i--)(o=n[i])&&(s=(r?o(t,e,s):o(s))||s);return r&&s&&ue(t,e,s),s};let st=class extends J{constructor(){super(),this.checked=!1,this.addEventListener("click",n=>{this._toggle(),n.preventDefault(),n.stopPropagation()})}_toggle(){this.checked=!this.checked,this.dispatchEvent(new Event(this.checked?"enable":"disable",{bubbles:!0,composed:!0}))}render(){const n=this.checked?m`<slot name="if-enabled"></slot>`:m`<slot name="if-disabled"></slot>`;return m`
      <label id="root">
        <input type="checkbox" ?checked=${this.checked} hidden />
        ${n}
      </label>
    `}};Ct([A({type:Boolean})],st.prototype,"checked",2);st=Ct([x("overlay-button-toggle")],st);const fe=m`<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />`;var ge=Object.defineProperty,ye=Object.getOwnPropertyDescriptor,at=(n,t,e,r)=>{for(var s=r>1?void 0:r?ye(t,e):t,i=n.length-1,o;i>=0;i--)(o=n[i])&&(s=(r?o(t,e,s):o(s))||s);return r&&s&&ge(t,e,s),s};let B=class extends v{constructor(){super(...arguments),this.url=location.href,this.copied=!1}_copyURL(){var n,t;(t=(n=navigator.clipboard)==null?void 0:n.writeText(this.url))==null||t.then(()=>{this.copied=!0,setTimeout(()=>{this.copied=!1},1e3)})}_close(){this.dispatchEvent(new Event("close",{bubbles:!0,composed:!0}))}render(){const t=`https://twitter.com/intent/tweet?text=${encodeURI(this.url)}`;return m`
      ${fe}

      <header>
        <h2>Share this ASH</h2>
        <button id="close" @click="${this._close}">
          <span class="material-symbols-outlined">
            close
          </span>
        </button>
      </header>

      <button class="url-field" @click="${this._copyURL}">
        <span>
          ${this.url}
        </span>
        <span class="material-symbols-outlined">
          content_copy
        </span>
        ${this.copied?m`<span class="copied">Copied!</span>`:""}
      </button>

      <nav>
        <a href="${t}" class="share" rel="nofollow noopener" target="_blank">
          Twitter (X)
        </a>
      </nav>
    `}};B.styles=[Ot,P`
      :host {
        font-weight: lighter;
        background-color: var(--c-overlay-bg);
        padding: 1em;
        border-radius: var(--border-radius);
      }

      header {
        display: flex;
      }

      header h2 {
        flex-grow: 1;
        line-height: inherit;
        font-weight: inherit;
        margin: 0;
      }

      header button > * {
        display: contents;
      }

      .url-field {
        display: block;
        padding: 0.25em 0.5em;
        border: 1px solid var(--c-text);
        border-radius: var(--border-radius);
        margin: 0.5em 0;
      }

      .url-field:hover {
        background-color: rgba(255, 255, 255, 0.1);
      }

      .material-symbols-outlined {
        line-height: 0;
        transform: translateY(0.25em);
      }

      span.copied {
        position: absolute;
        background-color: var(--c-overlay-bg);
        padding: 0.5em;
        border-radius: var(--border-radius);
        transform: translate(0.75em, -0.5em);
      }

      nav {
        display: flex;
      }

      nav > a {
        display: block;
        background-color: var(--c-text);
        padding: 0.5em;
        border-radius: var(--border-radius);
        color: var(--c-bg);
        text-decoration: none;
      }
    `];at([A({type:String})],B.prototype,"url",2);at([Zt()],B.prototype,"copied",2);B=at([x("share-dialog")],B);const $e=function(n){const t=new Map;for(const e of n.slice(1).split("&")){const r=e.indexOf("=");r===-1?t.set(e,""):t.set(e.slice(0,r),e.slice(r+1))}return t},me=function(n){const t=n.get("main-image"),e=n.get("no-ash"),r=n.get("calendar-root"),s=n.get("navigate-before-button"),i=n.get("navigate-next-button"),o=function(c){var $;const p=$e(c).get("date");return typeof p=="string"?($=f.parse(p))==null?void 0:$.normalized():null},l=function(c){const u=`https://raw.githubusercontent.com/ash-chan-calendar/image/master/${c.dateStringShort}.png`,p=`photo of ${c}`;t.setAttribute("src",""),t.setAttribute("src",u),t.setAttribute("alt",p),e.classList.add("hidden"),r.setAttribute("date",c.toString())};let a=o(location.search)??f.today();const d=function(c){a=c,window.history.pushState({},"",`?date=${c.toString()}`),l(c)},h=function(c,u){const p=new f(c.year,c.month,c.date+u).normalized();d(p)};l(a),window.addEventListener("popstate",()=>{a=o(location.search)??f.today(),r.setAttribute("date",a.toString()),l(a)}),t.addEventListener("error",()=>e.classList.remove("hidden")),s.addEventListener("click",()=>h(a,-1)),i.addEventListener("click",()=>h(a,1)),r.addEventListener(W.eventName,c=>{d(c.date)})},ve=function(n){const t=n.get("controls"),e=n.get("hide-ui-button"),r=()=>{t.classList.remove("hidden"),document.body.removeEventListener("click",r),document.body.removeEventListener("touchend",r)},s=()=>{t.classList.add("hidden"),document.body.addEventListener("click",r),document.body.addEventListener("touchend",r)};e.addEventListener("click",i=>{s(),i.stopPropagation()})},_e=function(n,t=250){const e=n.get("main-image"),r=n.get("rotate-button"),s=n.get("fit-screen-button");let i=!1,o=0,l=1;const a=function(){const u=document.body.clientWidth,p=document.body.clientHeight,$=e.width,z=e.height;return o%2===0?i?Math.max(u/$,p/z):Math.min(u/$,p/z):i?Math.max(p/$,u/z):Math.min(p/$,u/z)},d=function(){e.style.transform=`translate(-50%, -50%) rotate(${o*90}deg) scale(${l})`},h=function(u=!0){u?e.classList.remove("no-transition"):e.classList.add("no-transition"),l=a(),d()};e.addEventListener("load",()=>{h(!1)}),s.addEventListener("click",()=>{i=!i,h()}),r.addEventListener("click",()=>{o+=1,h()});let c;window.addEventListener("resize",()=>{clearTimeout(c),c=setTimeout(()=>{h()},t)})},be=function(n){const t=n.get("controls"),e=n.get("share-button"),r=n.get("share-dialog");t.addEventListener("click",()=>{r.classList.add("hidden")}),e.addEventListener("click",s=>{r.classList.remove("hidden"),s.stopPropagation()}),r.addEventListener("close",()=>{r.classList.add("hidden")}),r.addEventListener("click",s=>{s.stopPropagation()})};window.addEventListener("DOMContentLoaded",()=>{const n=new Ut;n.setById("main-image"),n.setById("no-ash"),n.setById("controls"),n.setById("hide-ui-button","hide-ui"),n.setById("rotate-button","rotate"),n.setById("fit-screen-button","fit-screen"),n.setById("share-button","share"),n.setById("navigate-next-button","navigate-next"),n.setById("navigate-before-button","navigate-before"),n.setById("calendar-root"),n.setById("share-dialog"),me(n),ve(n),_e(n),be(n)});
