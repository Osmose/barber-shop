/**
 * almond 0.2.6 Copyright (c) 2011-2012, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/almond for details
 */

//     keymaster.js
//     (c) 2011-2012 Thomas Fuchs
//     keymaster.js may be freely distributed under the MIT license.

/**
 * @license
 * Lo-Dash 1.3.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modern -o ./dist/lodash.js`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.4.4 <http://underscorejs.org/>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud Inc.
 * Available under MIT license <http://lodash.com/license>
 */

(function(){var e,t,n;(function(r){function d(e,t){return h.call(e,t)}function v(e,t){var n,r,i,s,o,u,a,f,c,h,p=t&&t.split("/"),d=l.map,v=d&&d["*"]||{};if(e&&e.charAt(0)===".")if(t){p=p.slice(0,p.length-1),e=p.concat(e.split("/"));for(f=0;f<e.length;f+=1){h=e[f];if(h===".")e.splice(f,1),f-=1;else if(h===".."){if(f===1&&(e[2]===".."||e[0]===".."))break;f>0&&(e.splice(f-1,2),f-=2)}}e=e.join("/")}else e.indexOf("./")===0&&(e=e.substring(2));if((p||v)&&d){n=e.split("/");for(f=n.length;f>0;f-=1){r=n.slice(0,f).join("/");if(p)for(c=p.length;c>0;c-=1){i=d[p.slice(0,c).join("/")];if(i){i=i[r];if(i){s=i,o=f;break}}}if(s)break;!u&&v&&v[r]&&(u=v[r],a=f)}!s&&u&&(s=u,o=a),s&&(n.splice(0,o,s),e=n.join("/"))}return e}function m(e,t){return function(){return s.apply(r,p.call(arguments,0).concat([e,t]))}}function g(e){return function(t){return v(t,e)}}function y(e){return function(t){a[e]=t}}function b(e){if(d(f,e)){var t=f[e];delete f[e],c[e]=!0,i.apply(r,t)}if(!d(a,e)&&!d(c,e))throw new Error("No "+e);return a[e]}function w(e){var t,n=e?e.indexOf("!"):-1;return n>-1&&(t=e.substring(0,n),e=e.substring(n+1,e.length)),[t,e]}function E(e){return function(){return l&&l.config&&l.config[e]||{}}}var i,s,o,u,a={},f={},l={},c={},h=Object.prototype.hasOwnProperty,p=[].slice;o=function(e,t){var n,r=w(e),i=r[0];return e=r[1],i&&(i=v(i,t),n=b(i)),i?n&&n.normalize?e=n.normalize(e,g(t)):e=v(e,t):(e=v(e,t),r=w(e),i=r[0],e=r[1],i&&(n=b(i))),{f:i?i+"!"+e:e,n:e,pr:i,p:n}},u={require:function(e){return m(e)},exports:function(e){var t=a[e];return typeof t!="undefined"?t:a[e]={}},module:function(e){return{id:e,uri:"",exports:a[e],config:E(e)}}},i=function(e,t,n,i){var s,l,h,p,v,g=[],w;i=i||e;if(typeof n=="function"){t=!t.length&&n.length?["require","exports","module"]:t;for(v=0;v<t.length;v+=1){p=o(t[v],i),l=p.f;if(l==="require")g[v]=u.require(e);else if(l==="exports")g[v]=u.exports(e),w=!0;else if(l==="module")s=g[v]=u.module(e);else if(d(a,l)||d(f,l)||d(c,l))g[v]=b(l);else{if(!p.p)throw new Error(e+" missing "+l);p.p.load(p.n,m(i,!0),y(l),{}),g[v]=a[l]}}h=n.apply(a[e],g);if(e)if(s&&s.exports!==r&&s.exports!==a[e])a[e]=s.exports;else if(h!==r||!w)a[e]=h}else e&&(a[e]=n)},e=t=s=function(e,t,n,a,f){return typeof e=="string"?u[e]?u[e](t):b(o(e,t).f):(e.splice||(l=e,t.splice?(e=t,t=n,n=null):e=r),t=t||function(){},typeof n=="function"&&(n=a,a=f),a?i(r,e,t,n):setTimeout(function(){i(r,e,t,n)},4),s)},s.config=function(e){return l=e,l.deps&&s(l.deps,l.callback),s},e._defined=a,n=function(e,t,n){t.splice||(n=t,t=[]),!d(a,e)&&!d(f,e)&&(f[e]=[e,t,n])},n.amd={jQuery:!0}})(),n("almond",function(){}),function(){var e=function(){this.table=[],this.componentMap={},this.componentEnum={},this.componentPool=[],this.entityPool=[],this.queryCache={},this.entityCounter=0};e.prototype.createEntity=function(e){if(typeof e!="string")return this.entityPool.pop()||this.entityCounter++},e.prototype.destroyEntity=function(e){for(var t=this.table.length;t--;)this.table[t][e]!==undefined&&this.componentPool[t].push(this.table[t].splice(e,1,undefined)[0]);this.entityPool.push(e),this.queryCache={}},e.prototype.attachComponentTo=function(e,t){if(typeof this.componentMap[e]!="undefined")return this.componentPool[this.componentEnum[e]].length>0?this.table[this.componentEnum[e]][t]=this.componentPool[this.componentEnum[e]].pop():this.table[this.componentEnum[e]][t]=new this.componentMap[e],this.clearSystemCacheForComponent(e),this.table[this.componentEnum[e]][t];throw new Error("Component of type: "+e+" is undefined")},e.prototype.removeComponentFrom=function(e,t){this.componentPool[this.componentEnum[e]].push(this.table[this.componentEnum[e]].splice(t,1,undefined)[0]),this.clearSystemCacheForComponent(e)},e.prototype.getComponent=function(e,t){return this.table[this.componentEnum[e]][t]},e.prototype.defineComponent=function(e,t){var n=this.table.push([])-1;this.componentPool.push([]),this.componentEnum[e]=n,this.componentMap[e]=t(),this.componentMap[e].prototype.type=e},e.prototype.clearSystemCacheForComponent=function(e){this.queryCache={}},e.prototype.query=function(e,t){if(t in this.queryCache)return this.queryCache[t];var n=[];for(var r=0;r<this.entityCounter;r++)for(var i=0;i<e.length;i++){if(e[i]===undefined)throw new Error("Component of type: "+e[i]+" is undefined");if(this.table[this.componentEnum[e[i]]][r]===undefined)break;if(i===e.length-1)for(var s=0;s<e.length;s++)n.push(this.table[this.componentEnum[e[s]]][r])}return this.queryCache[t]=n,this.queryCache[t]};var t={activeSystems:[],definedSystems:{},game:function(e,t){this.ctx=e.getContext("2d"),t()},getContext:function(){return this.ctx},system:function(e,t){this.definedSystems[e]=t();if(typeof this.definedSystems[e].requires=="undefined")throw new Error("System missing a requires field with component dependencies");return typeof this.definedSystems[e].systemType=="undefined"&&(this.definedSystems[e].systemType=e),this.definedSystems[e].requiresString=this.definedSystems[e].requires.toString(),this},addSystem:function(e){return this.activeSystems.push(this.definedSystems[e]),this},removeSystem:function(e){this.activeSystems.splice(this.activeSystems.indexOf(this.definedSystems[e]))},resetSystemQueryCache:function(e){var t=this.definedSystems[e].requires.toString();return delete this.ecManager.queryCache[t],this},component:function(e,t){return this.ecManager.defineComponent(e,t),this},update:function(){var e;for(var t=0,n=this.activeSystems.length;t<n;t++)e=this.ecManager.query(this.activeSystems[t].requires,this.activeSystems[t].requiresString),typeof e!="undefined"&&this.activeSystems[t].process(e)},attachComponentTo:function(e,t){return this.ecManager.attachComponentTo(e,t)},removeComponentFrom:function(e,t){return this.ecManager.removeComponentFrom(e,t)},getComponent:function(e,t){return this.ecManager.getComponent(e,t)},createEntity:function(e){return this.ecManager.createEntity(e)},destroyEntity:function(e){return this.ecManager.destroyEntity(e)},reset:function(){this.activeSystems=[],this.definedSystems={},this.ecManager=new e,console.log("resetting dima state"),this.testInfo()},testInfo:function(){console.log("-------------------"),console.log("DEFINED SYSTEMS:");for(var e in this.definedSystems)console.log(e);console.log("-------------------"),console.log("ACTIVE SYSTEMS:"),this.activeSystems.forEach(function(e){console.log(e)}),console.log("-------------------"),console.log("COMPONENTS");for(var t=0;t<this.ecManager.table.length;t++)for(var n=0;n<this.ecManager.table[t].length;n++)typeof this.ecManager.table[t][n]=="undefined"?console.log("no component"):console.log(this.ecManager.table[t][n].type);console.log("-------------------")}};t.ecManager=new e,window.dima=t}(),n("dima",function(e){return function(){var t,n;return t||e.dima}}(this)),function(e){function f(e,t){var n=e.length;while(n--)if(e[n]===t)return n;return-1}function l(e,t){if(e.length!=t.length)return!1;for(var n=0;n<e.length;n++)if(e[n]!==t[n])return!1;return!0}function h(e){for(t in r)r[t]=e[c[t]]}function p(e,t){var i,o,u,l,c;i=e.keyCode,f(a,i)==-1&&a.push(i);if(i==93||i==224)i=91;if(i in r){r[i]=!0;for(u in s)s[u]==i&&(m[u]=!0);return}h(e);if(!m.filter.call(this,e))return;if(!(i in n))return;for(l=0;l<n[i].length;l++){o=n[i][l];if(o.scope==t||o.scope=="all"){c=o.mods.length>0;for(u in r)if(!r[u]&&f(o.mods,+u)>-1||r[u]&&f(o.mods,+u)==-1)c=!1;(o.mods.length==0&&!r[16]&&!r[18]&&!r[17]&&!r[91]||c)&&o.method(e,o)===!1&&(e.preventDefault?e.preventDefault():e.returnValue=!1,e.stopPropagation&&e.stopPropagation(),e.cancelBubble&&(e.cancelBubble=!0))}}}function d(e){var t=e.keyCode,n,i=f(a,t);i>=0&&a.splice(i,1);if(t==93||t==224)t=91;if(t in r){r[t]=!1;for(n in s)s[n]==t&&(m[n]=!1)}}function v(){for(t in r)r[t]=!1;for(t in s)m[t]=!1}function m(e,t,r){var i,s;i=T(e),r===undefined&&(r=t,t="all");for(var o=0;o<i.length;o++)s=[],e=i[o].split("+"),e.length>1&&(s=N(e),e=[e[e.length-1]]),e=e[0],e=u(e),e in n||(n[e]=[]),n[e].push({shortcut:i[o],scope:t,method:r,key:i[o],mods:s})}function g(e,t){var r=e.split("+"),i=[],s,o;r.length>1&&(i=N(r),e=r[r.length-1]),e=u(e),t===undefined&&(t=S());if(!n[e])return;for(s in n[e])o=n[e][s],o.scope===t&&l(o.mods,i)&&(n[e][s]={})}function y(e){return typeof e=="string"&&(e=u(e)),f(a,e)!=-1}function b(){return a.slice(0)}function w(e){var t=(e.target||e.srcElement).tagName;return t!="INPUT"&&t!="SELECT"&&t!="TEXTAREA"}function E(e){i=e||"all"}function S(){return i||"all"}function x(e){var t,r,i;for(t in n){r=n[t];for(i=0;i<r.length;)r[i].scope===e?r.splice(i,1):i++}}function T(e){var t;return e=e.replace(/\s/g,""),t=e.split(","),t[t.length-1]==""&&(t[t.length-2]+=","),t}function N(e){var t=e.slice(0,e.length-1);for(var n=0;n<t.length;n++)t[n]=s[t[n]];return t}function C(e,t,n){e.addEventListener?e.addEventListener(t,n,!1):e.attachEvent&&e.attachEvent("on"+t,function(){n(window.event)})}function L(){var t=e.key;return e.key=k,t}var t,n={},r={16:!1,18:!1,17:!1,91:!1},i="all",s={"⇧":16,shift:16,"⌥":18,alt:18,option:18,"⌃":17,ctrl:17,control:17,"⌘":91,command:91},o={backspace:8,tab:9,clear:12,enter:13,"return":13,esc:27,escape:27,space:32,left:37,up:38,right:39,down:40,del:46,"delete":46,home:36,end:35,pageup:33,pagedown:34,",":188,".":190,"/":191,"`":192,"-":189,"=":187,";":186,"'":222,"[":219,"]":221,"\\":220},u=function(e){return o[e]||e.toUpperCase().charCodeAt(0)},a=[];for(t=1;t<20;t++)o["f"+t]=111+t;var c={16:"shiftKey",18:"altKey",17:"ctrlKey",91:"metaKey"};for(t in s)m[t]=!1;C(document,"keydown",function(e){p(e,i)}),C(document,"keyup",d),C(window,"focus",v);var k=e.key;e.key=m,e.key.setScope=E,e.key.getScope=S,e.key.deleteScope=x,e.key.filter=w,e.key.isPressed=y,e.key.getPressedKeyCodes=b,e.key.noConflict=L,e.key.unbind=g,typeof module!="undefined"&&(module.exports=key)}(this),n("keymaster",function(e){return function(){var t,n;return t||e.key}}(this)),n("core/drawing",["require","dima"],function(e){var t=e("dima");t.component("drawableBox",function(){return function(){this.width=1,this.height=1,this.color="#000000"}}),t.system("drawBox",function(){return{requires:["position","drawableBox"],process:function(e){var n=t.getContext();for(var r=0;r<e.length;r+=2){var i=e[r],s=e[r+1];n.save(),n.fillStyle=s.color,n.fillRect(i.x,i.y,s.width,s.height),n.restore()}}}}),t.component("background",function(){return function(){this.color="#FFFFFF"}}),t.system("drawBackground",function(){return{requires:["background"],process:function(e){var n=t.getContext(),r=n.canvas;for(var i=0;i<e.length;i++){var s=e[i];n.save(),n.fillStyle=s.color,n.fillRect(0,0,r.width,r.height),n.restore()}}}})}),n("entities/background",["require","dima","core/drawing"],function(e){var t=e("dima");return e("core/drawing"),{create:function(e){var n=t.createEntity();return t.attachComponentTo("background",n).color=e,n}}}),function(e){function R(e,t,n){var r=(n||0)-1,i=e.length;while(++r<i)if(e[r]===t)return r;return-1}function U(e,t){var n=typeof t;e=e.cache;if(n=="boolean"||t==null)return e[t];n!="number"&&n!="string"&&(n="object");var r=n=="number"?t:u+t;return e=e[n]||(e[n]={}),n=="object"?e[r]&&R(e[r],t)>-1?0:-1:e[r]?0:-1}function z(e){var t=this.cache,n=typeof e;if(n=="boolean"||e==null)t[e]=!0;else{n!="number"&&n!="string"&&(n="object");var r=n=="number"?e:u+e,i=t[n]||(t[n]={});n=="object"?(i[r]||(i[r]=[])).push(e)==this.array.length&&(t[n]=!1):i[r]=!0}}function W(e){return e.charCodeAt(0)}function X(e,t){var n=e.index,r=t.index;e=e.criteria,t=t.criteria;if(e!==t){if(e>t||typeof e=="undefined")return 1;if(e<t||typeof t=="undefined")return-1}return n<r?-1:1}function V(e){var t=-1,n=e.length,r=K();r["false"]=r["null"]=r["true"]=r["undefined"]=!1;var i=K();i.array=e,i.cache=r,i.push=z;while(++t<n)i.push(e[t]);return r.object===!1?(Y(i),null):i}function $(e){return"\\"+j[e]}function J(){return r.pop()||[]}function K(){return i.pop()||{array:null,cache:null,criteria:null,"false":!1,index:0,leading:!1,maxWait:0,"null":!1,number:null,object:null,push:null,string:null,trailing:!1,"true":!1,"undefined":!1,value:null}}function Q(){}function G(e){e.length=0,r.length<f&&r.push(e)}function Y(e){var t=e.cache;t&&Y(t),e.array=e.cache=e.criteria=e.object=e.number=e.string=e.value=null,i.length<f&&i.push(e)}function Z(e,t,n){t||(t=0),typeof n=="undefined"&&(n=e?e.length:0);var r=-1,i=n-t||0,s=Array(i<0?0:i);while(++r<i)s[r]=e[t+r];return s}function et(n){function Pt(e){return e&&typeof e=="object"&&!Xt(e)&&dt.call(e,"__wrapped__")?e:new Ht(e)}function Ht(e){this.__wrapped__=e}function jt(e,t,n,r){function a(){var r=arguments,f=s?this:t;i||(e=t[o]),n.length&&(r=r.length?(r=Ot.call(r),u?r.concat(n):n.concat(r)):n);if(this instanceof a){f=Ft(e.prototype);var l=e.apply(f,r);return dn(l)?l:f}return e.apply(f,r)}var i=pn(e),s=!n,o=t;if(s){var u=r;n=t}else if(!i){if(!r)throw new nt;t=e}return a}function Ft(e){return dn(e)?Et(e):{}}function It(e){return Jt[e]}function qt(e,t,n){var r=(r=Pt.indexOf)===tr?R:r;return r}function Rt(e){return function(n,r,i,s){return typeof r!="boolean"&&r!=null&&(s=i,i=!s||s[r]!==n?r:t,r=!1),i!=null&&(i=Pt.createCallback(i,s)),e(n,r,i,s)}}function Ut(e){var n,r;return!!e&&bt.call(e)==_&&(n=e.constructor,!pn(n)||n instanceof n)?(tn(e,function(e,t){r=t}),r===t||dt.call(e,r)):!1}function zt(e){return Kt[e]}function Wt(e){return bt.call(e)==N}function Gt(e,n,r,i,s,o){var u=e;typeof n!="boolean"&&n!=null&&(i=r,r=n,n=!1);if(typeof r=="function"){r=typeof i=="undefined"?r:Pt.createCallback(r,i,1),u=r(u);if(typeof u!="undefined")return u;u=e}var a=dn(u);if(a){var f=bt.call(u);if(!H[f])return u;var l=Xt(u)}if(!a||!n)return a?l?Z(u):Qt({},u):u;var c=Dt[f];switch(f){case k:case L:return new c(+u);case M:case P:return new c(u);case D:return c(u.source,v.exec(u))}var h=!s;s||(s=J()),o||(o=J());var p=s.length;while(p--)if(s[p]==e)return o[p];return u=l?c(u.length):{},l&&(dt.call(e,"index")&&(u.index=e.index),dt.call(e,"input")&&(u.input=e.input)),s.push(e),o.push(u),(l?Pn:nn)(e,function(e,i){u[i]=Gt(e,n,r,t,s,o)}),h&&(G(s),G(o)),u}function Yt(e,t,n){return Gt(e,!0,t,n)}function en(e,t,n){var r;return t=Pt.createCallback(t,n),nn(e,function(e,n,i){if(t(e,n,i))return r=n,!1}),r}function rn(e){var t=[];return tn(e,function(e,n){pn(e)&&t.push(n)}),t.sort()}function sn(e,t){return e?dt.call(e,t):!1}function on(e){var t=-1,n=$t(e),r=n.length,i={};while(++t<r){var s=n[t];i[e[s]]=s}return i}function un(e){return e===!0||e===!1||bt.call(e)==k}function an(e){return e?typeof e=="object"&&bt.call(e)==L:!1}function fn(e){return e?e.nodeType===1:!1}function ln(e){var t=!0;if(!e)return t;var n=bt.call(e),r=e.length;return n==C||n==P||n==N||n==_&&typeof r=="number"&&pn(e.splice)?!r:(nn(e,function(){return t=!1}),t)}function cn(e,t,n,r,i,s){var u=n===o;if(typeof n=="function"&&!u){n=Pt.createCallback(n,r,2);var a=n(e,t);if(typeof a!="undefined")return!!a}if(e===t)return e!==0||1/e==1/t;var f=typeof e,l=typeof t;if(e===e&&(!e||f!="function"&&f!="object")&&(!t||l!="function"&&l!="object"))return!1;if(e==null||t==null)return e===t;var c=bt.call(e),h=bt.call(t);c==N&&(c=_),h==N&&(h=_);if(c!=h)return!1;switch(c){case k:case L:return+e==+t;case M:return e!=+e?t!=+t:e==0?1/e==1/t:e==+t;case D:case P:return e==Q(t)}var p=c==C;if(!p){if(dt.call(e,"__wrapped__ ")||dt.call(t,"__wrapped__"))return cn(e.__wrapped__||e,t.__wrapped__||t,n,r,i,s);if(c!=_)return!1;var d=e.constructor,v=t.constructor;if(d!=v&&!(pn(d)&&d instanceof d&&pn(v)&&v instanceof v))return!1}var m=!i;i||(i=J()),s||(s=J());var g=i.length;while(g--)if(i[g]==e)return s[g]==t;var y=0;a=!0,i.push(e),s.push(t);if(p){g=e.length,y=t.length,a=y==e.length;if(!a&&!u)return a;while(y--){var b=g,w=t[y];if(u){while(b--)if(a=cn(e[b],w,n,r,i,s))break}else if(!(a=cn(e[y],w,n,r,i,s)))break}return a}return tn(t,function(t,o,u){if(dt.call(u,o))return y++,a=dt.call(e,o)&&cn(e[o],t,n,r,i,s)}),a&&!u&&tn(e,function(e,t,n){if(dt.call(n,t))return a=--y>-1}),m&&(G(i),G(s)),a}function hn(e){return xt(e)&&!Tt(parseFloat(e))}function pn(e){return typeof e=="function"}function dn(e){return!!e&&!!B[typeof e]}function vn(e){return gn(e)&&e!=+e}function mn(e){return e===null}function gn(e){return typeof e=="number"||bt.call(e)==M}function bn(e){return e?typeof e=="object"&&bt.call(e)==D:!1}function wn(e){return typeof e=="string"||bt.call(e)==P}function En(e){return typeof e=="undefined"}function Sn(e,t,n){var r=arguments,i=0,s=2;if(!dn(e))return e;if(n===o)var u=r[3],a=r[4],f=r[5];else{var l=!0;a=J(),f=J(),typeof n!="number"&&(s=r.length),s>3&&typeof r[s-2]=="function"?u=Pt.createCallback(r[--s-1],r[s--],2):s>2&&typeof r[s-1]=="function"&&(u=r[--s])}while(++i<s)(Xt(r[i])?Pn:nn)(r[i],function(t,n){var r,i,s=t,l=e[n];if(t&&((i=Xt(t))||yn(t))){var c=a.length;while(c--)if(r=a[c]==t){l=f[c];break}if(!r){var h;if(u){s=u(l,t);if(h=typeof s!="undefined")l=s}h||(l=i?Xt(l)?l:[]:yn(l)?l:{}),a.push(t),f.push(l),h||(l=Sn(l,t,o,u,a,f))}}else u&&(s=u(l,t),typeof s=="undefined"&&(s=t)),typeof s!="undefined"&&(l=s);e[n]=l});return l&&(G(a),G(f)),e}function xn(e,t,n){var r=qt(),i=typeof t=="function",s={};if(i)t=Pt.createCallback(t,n);else var o=lt.apply(rt,Ot.call(arguments,1));return tn(e,function(e,n,u){if(i?!t(e,n,u):r(o,n)<0)s[n]=e}),s}function Tn(e){var t=-1,n=$t(e),i=n.length,s=r(i);while(++t<i){var o=n[t];s[t]=[o,e[o]]}return s}function Nn(e,t,n){var r={};if(typeof t!="function"){var i=-1,s=lt.apply(rt,Ot.call(arguments,1)),o=dn(e)?s.length:0;while(++i<o){var u=s[i];u in e&&(r[u]=e[u])}}else t=Pt.createCallback(t,n),tn(e,function(e,n,i){t(e,n,i)&&(r[n]=e)});return r}function Cn(e,t,n,r){var i=Xt(e);t=Pt.createCallback(t,r,4);if(n==null)if(i)n=[];else{var s=e&&e.constructor,o=s&&s.prototype;n=Ft(o)}return(i?Pn:nn)(e,function(e,r,i){return t(n,e,r,i)}),n}function kn(e){var t=-1,n=$t(e),i=n.length,s=r(i);while(++t<i)s[t]=e[n[t]];return s}function Ln(e){var t=-1,n=lt.apply(rt,Ot.call(arguments,1)),i=n.length,s=r(i);while(++t<i)s[t]=e[n[t]];return s}function An(e,t,n){var r=-1,i=qt(),s=e?e.length:0,o=!1;return n=(n<0?Ct(0,s+n):n)||0,s&&typeof s=="number"?o=(wn(e)?e.indexOf(t,n):i(e,t,n))>-1:nn(e,function(e){if(++r>=n)return!(o=e===t)}),o}function On(e,t,n){var r={};return t=Pt.createCallback(t,n),Pn(e,function(e,n,i){n=Q(t(e,n,i)),dt.call(r,n)?r[n]++:r[n]=1}),r}function Mn(e,t,n){var r=!0;t=Pt.createCallback(t,n);var i=-1,s=e?e.length:0;if(typeof s=="number"){while(++i<s)if(!(r=!!t(e[i],i,e)))break}else nn(e,function(e,n,i){return r=!!t(e,n,i)});return r}function _n(e,t,n){var r=[];t=Pt.createCallback(t,n);var i=-1,s=e?e.length:0;if(typeof s=="number")while(++i<s){var o=e[i];t(o,i,e)&&r.push(o)}else nn(e,function(e,n,i){t(e,n,i)&&r.push(e)});return r}function Dn(e,t,n){t=Pt.createCallback(t,n);var r=-1,i=e?e.length:0;if(typeof i!="number"){var o;return nn(e,function(e,n,r){if(t(e,n,r))return o=e,!1}),o}while(++r<i){var s=e[r];if(t(s,r,e))return s}}function Pn(e,t,n){var r=-1,i=e?e.length:0;t=t&&typeof n=="undefined"?t:Pt.createCallback(t,n);if(typeof i=="number"){while(++r<i)if(t(e[r],r,e)===!1)break}else nn(e,t);return e}function Hn(e,t,n){var r={};return t=Pt.createCallback(t,n),Pn(e,function(e,n,i){n=Q(t(e,n,i)),(dt.call(r,n)?r[n]:r[n]=[]).push(e)}),r}function Bn(e,t){var n=Ot.call(arguments,2),i=-1,s=typeof t=="function",o=e?e.length:0,u=r(typeof o=="number"?o:0);return Pn(e,function(e){u[++i]=(s?t:e[t]).apply(e,n)}),u}function jn(e,t,n){var i=-1,s=e?e.length:0;t=Pt.createCallback(t,n);if(typeof s=="number"){var o=r(s);while(++i<s)o[i]=t(e[i],i,e)}else o=[],nn(e,function(e,n,r){o[++i]=t(e,n,r)});return o}function Fn(e,t,n){var r=-Infinity,i=r;if(!t&&Xt(e)){var s=-1,o=e.length;while(++s<o){var u=e[s];u>i&&(i=u)}}else t=!t&&wn(e)?W:Pt.createCallback(t,n),Pn(e,function(e,n,s){var o=t(e,n,s);o>r&&(r=o,i=e)});return i}function In(e,t,n){var r=Infinity,i=r;if(!t&&Xt(e)){var s=-1,o=e.length;while(++s<o){var u=e[s];u<i&&(i=u)}}else t=!t&&wn(e)?W:Pt.createCallback(t,n),Pn(e,function(e,n,s){var o=t(e,n,s);o<r&&(r=o,i=e)});return i}function qn(e,t){var n=-1,i=e?e.length:0;if(typeof i=="number"){var s=r(i);while(++n<i)s[n]=e[n][t]}return s||jn(e,t)}function Rn(e,t,n,r){if(!e)return n;var i=arguments.length<3;t=Pt.createCallback(t,r,4);var s=-1,o=e.length;if(typeof o=="number"){i&&(n=e[++s]);while(++s<o)n=t(n,e[s],s,e)}else nn(e,function(e,r,s){n=i?(i=!1,e):t(n,e,r,s)});return n}function Un(e,t,n,r){var i=e,s=e?e.length:0,o=arguments.length<3;if(typeof s!="number"){var u=$t(e);s=u.length}return t=Pt.createCallback(t,r,4),Pn(e,function(e,r,a){r=u?u[--s]:--s,n=o?(o=!1,i[r]):t(n,i[r],r,a)}),n}function zn(e,t,n){return t=Pt.createCallback(t,n),_n(e,function(e,n,r){return!t(e,n,r)})}function Wn(e){var t=-1,n=e?e.length:0,i=r(typeof n=="number"?n:0);return Pn(e,function(e){var n=ct(At()*(++t+1));i[t]=i[n],i[n]=e}),i}function Xn(e){var t=e?e.length:0;return typeof t=="number"?t:$t(e).length}function Vn(e,t,n){var r;t=Pt.createCallback(t,n);var i=-1,s=e?e.length:0;if(typeof s=="number"){while(++i<s)if(r=t(e[i],i,e))break}else nn(e,function(e,n,i){return!(r=t(e,n,i))});return!!r}function $n(e,t,n){var i=-1,s=e?e.length:0,o=r(typeof s=="number"?s:0);t=Pt.createCallback(t,n),Pn(e,function(e,n,r){var s=o[++i]=K();s.criteria=t(e,n,r),s.index=i,s.value=e}),s=o.length,o.sort(X);while(s--){var u=o[s];o[s]=u.value,Y(u)}return o}function Jn(e){return e&&typeof e.length=="number"?Z(e):kn(e)}function Qn(e){var t=-1,n=e?e.length:0,r=[];while(++t<n){var i=e[t];i&&r.push(i)}return r}function Gn(e){var t=-1,n=qt(),r=e?e.length:0,i=lt.apply(rt,Ot.call(arguments,1)),s=[],o=r>=a&&n===R;if(o){var u=V(i);u?(n=U,i=u):o=!1}while(++t<r){var f=e[t];n(i,f)<0&&s.push(f)}return o&&Y(i),s}function Yn(e,t,n){var r=-1,i=e?e.length:0;t=Pt.createCallback(t,n);while(++r<i)if(t(e[r],r,e))return r;return-1}function Zn(e,t,n){if(e){var r=0,i=e.length;if(typeof t!="number"&&t!=null){var s=-1;t=Pt.createCallback(t,n);while(++s<i&&t(e[s],s,e))r++}else{r=t;if(r==null||n)return e[0]}return Z(e,0,kt(Ct(0,r),i))}}function tr(e,t,n){if(typeof n=="number"){var r=e?e.length:0;n=n<0?Ct(0,r+n):n||0}else if(n){var i=ar(e,t);return e[i]===t?i:-1}return e?R(e,t,n):-1}function nr(e,t,n){if(!e)return[];var r=0,i=e.length;if(typeof t!="number"&&t!=null){var s=i;t=Pt.createCallback(t,n);while(s--&&t(e[s],s,e))r++}else r=t==null||n?1:t||r;return Z(e,0,kt(Ct(0,i-r),i))}function rr(e){var t=arguments,n=t.length,r=-1,i=J(),s=-1,o=qt(),u=e?e.length:0,f=[],l=J();while(++r<n){var c=t[r];i[r]=o===R&&(c?c.length:0)>=a&&V(r?t[r]:l)}e:while(++s<u){var h=i[0];c=e[s];if((h?U(h,c):o(l,c))<0){r=n,(h||l).push(c);while(--r){h=i[r];if((h?U(h,c):o(t[r],c))<0)continue e}f.push(c)}}while(n--)h=i[n],h&&Y(h);return G(i),G(l),f}function ir(e,t,n){if(e){var r=0,i=e.length;if(typeof t!="number"&&t!=null){var s=i;t=Pt.createCallback(t,n);while(s--&&t(e[s],s,e))r++}else{r=t;if(r==null||n)return e[i-1]}return Z(e,Ct(0,i-r))}}function sr(e,t,n){var r=e?e.length:0;typeof n=="number"&&(r=(n<0?Ct(0,r+n):kt(n,r-1))+1);while(r--)if(e[r]===t)return r;return-1}function or(e,t,n){e=+e||0,n=+n||1,t==null&&(t=e,e=0);var i=-1,s=Ct(0,at((t-e)/n)),o=r(s);while(++i<s)o[i]=e,e+=n;return o}function ur(e,t,n){if(typeof t!="number"&&t!=null){var r=0,i=-1,s=e?e.length:0;t=Pt.createCallback(t,n);while(++i<s&&t(e[i],i,e))r++}else r=t==null||n?1:Ct(0,t);return Z(e,r)}function ar(e,t,n,r){var i=0,s=e?e.length:i;n=n?Pt.createCallback(n,r,1):Mr,t=n(t);while(i<s){var o=i+s>>>1;n(e[o])<t?i=o+1:s=o}return i}function fr(e){return Xt(e)||(arguments[0]=e?Ot.call(e):rt),lr(lt.apply(rt,arguments))}function cr(e){var t=-1,n=e?Fn(qn(e,"length")):0,i=r(n<0?0:n);while(++t<n)i[t]=qn(e,t);return i}function hr(e){return Gn(e,Ot.call(arguments,1))}function pr(e){return e?cr(arguments):[]}function dr(e,t){var n=-1,r=e?e.length:0,i={};while(++n<r){var s=e[n];t?i[s]=t[n]:i[s[0]]=s[1]}return i}function vr(e,t){return e<1?t():function(){if(--e<1)return t.apply(this,arguments)}}function mr(e,t){return Bt.fastBind||wt&&arguments.length>2?wt.call.apply(wt,arguments):jt(e,t,Ot.call(arguments,2))}function gr(e){var t=arguments.length>1?lt.apply(rt,Ot.call(arguments,1)):rn(e),n=-1,r=t.length;while(++n<r){var i=t[n];e[i]=mr(e[i],e)}return e}function yr(e,t){return jt(e,t,Ot.call(arguments,2),o)}function br(){var e=arguments;return function(){var t=arguments,n=e.length;while(n--)t=[e[n].apply(this,t)];return t[0]}}function wr(e,t,n){if(e==null)return Mr;var r=typeof e;if(r!="function"){if(r!="object")return function(t){return t[e]};var i=$t(e);return function(t){var n=i.length,r=!1;while(n--)if(!(r=cn(t[i[n]],e[i[n]],o)))break;return r}}return typeof t=="undefined"||g&&!g.test(ht.call(e))?e:n===1?function(n){return e.call(t,n)}:n===2?function(n,r){return e.call(t,n,r)}:n===4?function(n,r,i,s){return e.call(t,n,r,i,s)}:function(n,r,i){return e.call(t,n,r,i)}}function Er(e,t,n){function p(){ft(l),ft(c),o=0,l=c=null}function d(){var t=h&&(!m||o>1);p(),t&&(a!==!1&&(u=new f),i=e.apply(s,r))}function v(){p();if(h||a!==t)u=new f,i=e.apply(s,r)}var r,i,s,o=0,u=0,a=!1,l=null,c=null,h=!0;t=Ct(0,t||0);if(n===!0){var m=!0;h=!1}else dn(n)&&(m=n.leading,a="maxWait"in n&&Ct(t,n.maxWait||0),h="trailing"in n?n.trailing:h);return function(){r=arguments,s=this,o++,ft(c);if(a===!1)m&&o<2&&(i=e.apply(s,r));else{var n=new f;!l&&!m&&(u=n);var h=a-(n-u);h<=0?(ft(l),l=null,u=n,i=e.apply(s,r)):l||(l=yt(v,h))}return t!==a&&(c=yt(d,t)),i}}function Sr(e){var n=Ot.call(arguments,1);return yt(function(){e.apply(t,n)},1)}function xr(e,n){var r=Ot.call(arguments,2);return yt(function(){e.apply(t,r)},n)}function Tr(e,t){function n(){var r=n.cache,i=u+(t?t.apply(this,arguments):arguments[0]);return dt.call(r,i)?r[i]:r[i]=e.apply(this,arguments)}return n.cache={},n}function Nr(e){var t,n;return function(){return t?n:(t=!0,n=e.apply(this,arguments),e=null,n)}}function Cr(e){return jt(e,Ot.call(arguments,1))}function kr(e){return jt(e,Ot.call(arguments,1),null,o)}function Lr(e,t,n){var r=!0,i=!0;n===!1?r=!1:dn(n)&&(r="leading"in n?n.leading:r,i="trailing"in n?n.trailing:i),n=K(),n.leading=r,n.maxWait=t,n.trailing=i;var s=Er(e,t,n);return Y(n),s}function Ar(e,t){return function(){var n=[e];return vt.apply(n,arguments),t.apply(this,n)}}function Or(e){return e==null?"":Q(e).replace(E,It)}function Mr(e){return e}function _r(e){Pn(rn(e),function(t){var n=Pt[t]=e[t];Pt.prototype[t]=function(){var e=this.__wrapped__,t=[e];vt.apply(t,arguments);var r=n.apply(Pt,t);return e&&typeof e=="object"&&e===r?this:new Ht(r)}})}function Dr(){return n._=ot,this}function Hr(e,t){e==null&&t==null&&(t=1),e=+e||0,t==null?(t=e,e=0):t=+t||0;var n=At();return e%1||t%1?e+kt(n*(t-e+parseFloat("1e-"+((n+"").length-1))),t):e+ct(n*(t-e+1))}function Br(e,n){var r=e?e[n]:t;return pn(r)?e[n]():r}function jr(e,n,r){var i=Pt.templateSettings;e||(e=""),r=Zt({},r,i);var s=Zt({},r.imports,i.imports),o=$t(s),u=kn(s),a,f=0,p=r.interpolate||w,v="__p += '",g=z((r.escape||w).source+"|"+p.source+"|"+(p===m?d:w).source+"|"+(r.evaluate||w).source+"|$","g");e.replace(g,function(t,n,r,i,s,o){return r||(r=i),v+=e.slice(f,o).replace(S,$),n&&(v+="' +\n__e("+n+") +\n'"),s&&(a=!0,v+="';\n"+s+";\n__p += '"),r&&(v+="' +\n((__t = ("+r+")) == null ? '' : __t) +\n'"),f=o+t.length,t}),v+="';\n";var y=r.variable,b=y;b||(y="obj",v="with ("+y+") {\n"+v+"\n}\n"),v=(a?v.replace(l,""):v).replace(c,"$1").replace(h,"$1;"),v="function("+y+") {\n"+(b?"":y+" || ("+y+" = {});\n")+"var __t, __p = '', __e = _.escape"+(a?", __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n":";\n")+v+"return __p\n}";var E="\n/*\n//@ sourceURL="+(r.sourceURL||"/lodash/template/source["+T++ +"]")+"\n*/";try{var x=A(o,"return "+v+E).apply(t,u)}catch(N){throw N.source=v,N}return n?x(n):(x.source=v,x)}function Fr(e,t,n){e=(e=+e)>-1?e:0;var i=-1,s=r(e);t=Pt.createCallback(t,n,1);while(++i<e)s[i]=t(i);return s}function Ir(e){return e==null?"":Q(e).replace(p,zt)}function qr(e){var t=++s;return Q(e==null?"":e)+t}function Rr(e,t){return t(e),e}function Ur(){return Q(this.__wrapped__)}function zr(){return this.__wrapped__}n=n?tt.defaults(e.Object(),n,tt.pick(e,x)):e;var r=n.Array,i=n.Boolean,f=n.Date,A=n.Function,j=n.Math,F=n.Number,q=n.Object,z=n.RegExp,Q=n.String,nt=n.TypeError,rt=[],it=q.prototype,st=Q.prototype,ot=n._,ut=z("^"+Q(it.valueOf).replace(/[.*+?^${}()|[\]\\]/g,"\\$&").replace(/valueOf|for [^\]]+/g,".+?")+"$"),at=j.ceil,ft=n.clearTimeout,lt=rt.concat,ct=j.floor,ht=A.prototype.toString,pt=ut.test(pt=q.getPrototypeOf)&&pt,dt=it.hasOwnProperty,vt=rt.push,mt=it.propertyIsEnumerable,gt=n.setImmediate,yt=n.setTimeout,bt=it.toString,wt=ut.test(wt=bt.bind)&&wt,Et=ut.test(Et=q.create)&&Et,St=ut.test(St=r.isArray)&&St,xt=n.isFinite,Tt=n.isNaN,Nt=ut.test(Nt=q.keys)&&Nt,Ct=j.max,kt=j.min,Lt=n.parseInt,At=j.random,Ot=rt.slice,Mt=ut.test(n.attachEvent),_t=wt&&!/\n|true/.test(wt+Mt),Dt={};Dt[C]=r,Dt[k]=i,Dt[L]=f,Dt[O]=A,Dt[_]=q,Dt[M]=F,Dt[D]=z,Dt[P]=Q,Ht.prototype=Pt.prototype;var Bt=Pt.support={};Bt.fastBind=wt&&!_t,Pt.templateSettings={escape:/<%-([\s\S]+?)%>/g,evaluate:/<%([\s\S]+?)%>/g,interpolate:m,variable:"",imports:{_:Pt}};var Xt=St,Vt=function(e){var t,n=e,r=[];if(!n)return r;if(!B[typeof e])return r;for(t in n)dt.call(n,t)&&r.push(t);return r},$t=Nt?function(e){return dn(e)?Nt(e):[]}:Vt,Jt={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},Kt=on(Jt),Qt=function(e,t,n){var r,i=e,s=i;if(!i)return s;var o=arguments,u=0,a=typeof n=="number"?2:o.length;if(a>3&&typeof o[a-2]=="function")var f=Pt.createCallback(o[--a-1],o[a--],2);else a>2&&typeof o[a-1]=="function"&&(f=o[--a]);while(++u<a){i=o[u];if(i&&B[typeof i]){var l=-1,c=B[typeof i]&&$t(i),h=c?c.length:0;while(++l<h)r=c[l],s[r]=f?f(s[r],i[r]):i[r]}}return s},Zt=function(e,t,n){var r,i=e,s=i;if(!i)return s;var o=arguments,u=0,a=typeof n=="number"?2:o.length;while(++u<a){i=o[u];if(i&&B[typeof i]){var f=-1,l=B[typeof i]&&$t(i),c=l?l.length:0;while(++f<c)r=l[f],typeof s[r]=="undefined"&&(s[r]=i[r])}}return s},tn=function(e,t,n){var r,i=e,s=i;if(!i)return s;if(!B[typeof i])return s;t=t&&typeof n=="undefined"?t:Pt.createCallback(t,n);for(r in i)if(t(i[r],r,e)===!1)return s;return s},nn=function(e,t,n){var r,i=e,s=i;if(!i)return s;if(!B[typeof i])return s;t=t&&typeof n=="undefined"?t:Pt.createCallback(t,n);var o=-1,u=B[typeof i]&&$t(i),a=u?u.length:0;while(++o<a){r=u[o];if(t(i[r],r,e)===!1)return s}return s},yn=function(e){if(!e||bt.call(e)!=_)return!1;var t=e.valueOf,n=typeof t=="function"&&(n=pt(t))&&pt(n);return n?e==n||pt(e)==n:Ut(e)},Kn=_n,er=Rt(function Wr(e,t,n){var r=-1,i=e?e.length:0,s=[];while(++r<i){var o=e[r];n&&(o=n(o,r,e)),Xt(o)?vt.apply(s,t?o:Wr(o)):s.push(o)}return s}),lr=Rt(function(e,t,n){var r=-1,i=qt(),s=e?e.length:0,o=[],u=!t&&s>=a&&i===R,f=n||u?J():o;if(u){var l=V(f);l?(i=U,f=l):(u=!1,f=n?f:(G(f),o))}while(++r<s){var c=e[r],h=n?n(c,r,e):c;if(t?!r||f[f.length-1]!==h:i(f,h)<0)(n||u)&&f.push(h),o.push(c)}return u?(G(f.array),Y(f)):n&&G(f),o});_t&&I&&typeof gt=="function"&&(Sr=mr(gt,n));var Pr=Lt(y+"08")==8?Lt:function(e,t){return Lt(wn(e)?e.replace(b,""):e,t||0)};return Pt.after=vr,Pt.assign=Qt,Pt.at=Ln,Pt.bind=mr,Pt.bindAll=gr,Pt.bindKey=yr,Pt.compact=Qn,Pt.compose=br,Pt.countBy=On,Pt.createCallback=wr,Pt.debounce=Er,Pt.defaults=Zt,Pt.defer=Sr,Pt.delay=xr,Pt.difference=Gn,Pt.filter=_n,Pt.flatten=er,Pt.forEach=Pn,Pt.forIn=tn,Pt.forOwn=nn,Pt.functions=rn,Pt.groupBy=Hn,Pt.initial=nr,Pt.intersection=rr,Pt.invert=on,Pt.invoke=Bn,Pt.keys=$t,Pt.map=jn,Pt.max=Fn,Pt.memoize=Tr,Pt.merge=Sn,Pt.min=In,Pt.omit=xn,Pt.once=Nr,Pt.pairs=Tn,Pt.partial=Cr,Pt.partialRight=kr,Pt.pick=Nn,Pt.pluck=qn,Pt.range=or,Pt.reject=zn,Pt.rest=ur,Pt.shuffle=Wn,Pt.sortBy=$n,Pt.tap=Rr,Pt.throttle=Lr,Pt.times=Fr,Pt.toArray=Jn,Pt.transform=Cn,Pt.union=fr,Pt.uniq=lr,Pt.unzip=cr,Pt.values=kn,Pt.where=Kn,Pt.without=hr,Pt.wrap=Ar,Pt.zip=pr,Pt.zipObject=dr,Pt.collect=jn,Pt.drop=ur,Pt.each=Pn,Pt.extend=Qt,Pt.methods=rn,Pt.object=dr,Pt.select=_n,Pt.tail=ur,Pt.unique=lr,_r(Pt),Pt.chain=Pt,Pt.prototype.chain=function(){return this},Pt.clone=Gt,Pt.cloneDeep=Yt,Pt.contains=An,Pt.escape=Or,Pt.every=Mn,Pt.find=Dn,Pt.findIndex=Yn,Pt.findKey=en,Pt.has=sn,Pt.identity=Mr,Pt.indexOf=tr,Pt.isArguments=Wt,Pt.isArray=Xt,Pt.isBoolean=un,Pt.isDate=an,Pt.isElement=fn,Pt.isEmpty=ln,Pt.isEqual=cn,Pt.isFinite=hn,Pt.isFunction=pn,Pt.isNaN=vn,Pt.isNull=mn,Pt.isNumber=gn,Pt.isObject=dn,Pt.isPlainObject=yn,Pt.isRegExp=bn,Pt.isString=wn,Pt.isUndefined=En,Pt.lastIndexOf=sr,Pt.mixin=_r,Pt.noConflict=Dr,Pt.parseInt=Pr,Pt.random=Hr,Pt.reduce=Rn,Pt.reduceRight=Un,Pt.result=Br,Pt.runInContext=et,Pt.size=Xn,Pt.some=Vn,Pt.sortedIndex=ar,Pt.template=jr,Pt.unescape=Ir,Pt.uniqueId=qr,Pt.all=Mn,Pt.any=Vn,Pt.detect=Dn,Pt.findWhere=Dn,Pt.foldl=Rn,Pt.foldr=Un,Pt.include=An,Pt.inject=Rn,nn(Pt,function(e,t){Pt.prototype[t]||(Pt.prototype[t]=function(){var t=[this.__wrapped__];return vt.apply(t,arguments),e.apply(Pt,t)})}),Pt.first=Zn,Pt.last=ir,Pt.take=Zn,Pt.head=Zn,nn(Pt,function(e,t){Pt.prototype[t]||(Pt.prototype[t]=function(t,n){var r=e(this.__wrapped__,t,n);return t==null||n&&typeof t!="function"?r:new Ht(r)})}),Pt.VERSION="1.3.1",Pt.prototype.toString=Ur,Pt.prototype.value=zr,Pt.prototype.valueOf=zr,Pn(["join","pop","shift"],function(e){var t=rt[e];Pt.prototype[e]=function(){return t.apply(this.__wrapped__,arguments)}}),Pn(["push","reverse","sort","unshift"],function(e){var t=rt[e];Pt.prototype[e]=function(){return t.apply(this.__wrapped__,arguments),this}}),Pn(["concat","slice","splice"],function(e){var t=rt[e];Pt.prototype[e]=function(){return new Ht(t.apply(this.__wrapped__,arguments))}}),Pt}var t,r=[],i=[],s=0,o={},u=+(new Date)+"",a=75,f=40,l=/\b__p \+= '';/g,c=/\b(__p \+=) '' \+/g,h=/(__e\(.*?\)|\b__t\)) \+\n'';/g,p=/&(?:amp|lt|gt|quot|#39);/g,d=/\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g,v=/\w*$/,m=/<%=([\s\S]+?)%>/g,g=(g=/\bthis\b/)&&g.test(et)&&g,y=" 	\f ﻿\n\r\u2028\u2029 ᠎             　",b=RegExp("^["+y+"]*0+(?=.$)"),w=/($^)/,E=/[&<>"']/g,S=/['\n\r\t\u2028\u2029\\]/g,x=["Array","Boolean","Date","Function","Math","Number","Object","RegExp","String","_","attachEvent","clearTimeout","isFinite","isNaN","parseInt","setImmediate","setTimeout"],T=0,N="[object Arguments]",C="[object Array]",k="[object Boolean]",L="[object Date]",A="[object Error]",O="[object Function]",M="[object Number]",_="[object Object]",D="[object RegExp]",P="[object String]",H={};H[O]=!1,H[N]=H[C]=H[k]=H[L]=H[M]=H[_]=H[D]=H[P]=!0;var B={"boolean":!1,"function":!0,object:!0,number:!1,string:!1,"undefined":!1},j={"\\":"\\","'":"'","\n":"n","\r":"r","	":"t","\u2028":"u2028","\u2029":"u2029"},F=B[typeof exports]&&exports,I=B[typeof module]&&module&&module.exports==F&&module,q=B[typeof global]&&global;q&&(q.global===q||q.window===q)&&(e=q);var tt=et();typeof n=="function"&&typeof n.amd=="object"&&n.amd?(e._=tt,n("lodash",[],function(){return tt})):F&&!F.nodeType?I?(I.exports=tt)._=tt:F._=tt:e._=tt}(this),n("core/movement",["require","lodash","dima","keymaster"],function(e){var t=e("lodash"),n=e("dima"),r=e("keymaster");n.component("position",function(){return function(){this.x=0,this.y=0}}),n.component("velocity",function(){return function(){this.x=0,this.y=0}}),n.system("applyVelocity",function(){return{requires:["velocity","position"],process:function(e){for(var t=0;t<e.length;t+=2){var n=e[t],r=e[t+1];r.x+=n.x,r.y+=n.y}}}}),n.component("arrowMovement",function(){return function(){this.speed=1}}),n.system("handleArrowMovement",function(){return{requires:["arrowMovement","velocity"],process:function(e){for(var t=0;t<e.length;t+=2){var n=e[t],i=e[t+1];i.x=0,i.y=0,r.isPressed("up")&&(i.y-=n.speed),r.isPressed("down")&&(i.y+=n.speed),r.isPressed("left")&&(i.x-=n.speed),r.isPressed("right")&&(i.x+=n.speed)}}}}),n.component("collisionMap",function(){function e(){this.map=null,this.tileWidth=16,this.tileHeight=16,this.mapWidth=10,this.mapHeight=9,this.debugDraw=!1}return e.prototype={initialize:function(e,n){this.map=e,t.extend(this,n)}},e}),n.system("debugDrawCollisionMap",function(){return{requires:["collisionMap"],process:function(e){var r=n.getContext();r.save(),r.fillStyle="#000000",t.forEach(e,function(e){t.forEach(e.map,function(n,i){t.forEach(n,function(t,n){if(t){var s=n*e.tileWidth,o=i*e.tileHeight;r.fillRect(s,o,e.tileWidth,e.tileHeight)}})})}),r.restore()}}})}),n("entities/player",["require","dima","core/movement","core/drawing"],function(e){var t=e("dima");return e("core/movement"),e("core/drawing"),{create:function(e,n){var r=t.createEntity(),i=t.attachComponentTo("position",r);i.x=e||20,i.y=n||20;var s=t.attachComponentTo("drawableBox",r);s.width=8,s.height=8;var o=t.attachComponentTo("velocity",r),u=t.attachComponentTo("arrowMovement",r);return u.speed=2,r}}}),n("game",["require","dima","keymaster","entities/background","entities/player"],function(e){function t(){var t=e("dima"),n=e("keymaster"),r=function(){return window.mozRequestAnimationFrame||window.msRequestAnimationFrame||window.webkitRequestAnimationFrame||function(e){setTimeout(e,30)}}(),i=document.getElementById("game"),s=i.getContext("2d");i.width=480,i.height=432,s.scale(3,3),s.mozImageSmoothingEnabled=!1;var o=e("entities/background"),u=e("entities/player");t.game(i,function(){function n(){t.update(),r(n)}t.addSystem("handleArrowMovement"),t.addSystem("applyVelocity"),t.addSystem("drawBackground"),t.addSystem("drawBox"),t.addSystem("debugDrawCollisionMap"),u.create(20,20),o.create("#FFFF88");var e=t.createEntity();t.attachComponentTo("collisionMap",e).initialize([[0,0,0,0,0,0,0,0,1,0],[0,0,0,0,0,1,0,0,0,0],[0,0,0,0,0,0,0,1,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,1,1,0,0,0,0,0,0],[0,0,0,1,0,0,1,0,0,0],[1,0,0,0,0,0,0,0,0,0],[1,0,0,0,0,1,0,1,0,0],[0,0,0,0,0,0,0,0,0,0]]),n()})}return{load:t}}),t.config({baseUrl:"js",paths:{dima:"vendor/dima/src/core",keymaster:"vendor/keymaster/keymaster",lodash:"vendor/lodash/dist/lodash"},shim:{dima:{exports:"dima"},keymaster:{exports:"key"}}}),t(["game"],function(e){e.load()}),n("bootstrap",function(){})})();