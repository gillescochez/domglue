/*! domglue (c) G.Cochez - github.com/gillescochez/domglue */
(function(){function f(h,j){return new f.init(h,j)}f.init=function(h,j){var k=h.nodeName?h:d(h)};f.fn=f.init.prototype;function d(m){var o=m.substr(0,1),k,n,h,l,j,q,p;eq,i;if(o==="#"){return document.getElementById(m.replace(o,""))}else{l=m.split(".");j=m.split(":");if(l[1]){n=j[1]?l[1].replace(j[1],""):l[1];k=l[0]}else{n=null;k=j[1]?m.replace(j[1],""):m}h=document.getElementsByTagName(k);if(n){q=[];for(i=0,p=h.length;i<p;i++){if(this.className.indexOf(n)!==-1){q.push(h[i])}}h=q}if(j[1]){h=h[j[1]]}return h}}function g(m,k,h){if(!k){return m}var j,n,o,l={};for(j in m){n=m[j];o=k[j];if(m===o){continue}if(n!==undefined){l[j]=n}if(o!==undefined){if(!h){m[j]=o}else{l[j]=o}}}return h?l:m}function b(h){return typeof h==="string"}function a(h){return typeof h==="object"}function e(h){return typeof h==="boolean"}function c(h){if(a(h)){return h.constructor==Array}else{return false}}window.domglue=f})();