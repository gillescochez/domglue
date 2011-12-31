/*! domglue (c) G.Cochez - github.com/gillescochez/domglue */
(function(){function c(e,g,f){return new c.init(e,g,f)}c.init=function(e,g,f){f=d(c.settings,f,true);var h=a(e)?e:c.query(e);this[0]={};this[1]=g;c.bind(this,h,g,f);c.extend(this);c.update(this);return this};c.settings={attr:"data-bind",regex:null};d(c,{update:function(f,j){var g,e,h;if(j){this.updateName(f,j)}else{for(g in f[0]){this.updateName(f,g)}}},updateName:function(e,f){for(i=0,len=e[0][f].length;i<len;i++){e[0][f][i].innerHTML=e[1][f]}},extend:function(f){var g,e,h;for(g in f[1]){(function(j){f[j]=function(k){f[1][j]=k;if(f[0][j]){c.updateName(f,j)}}})(g)}},bind:function(g,m,l,h){var k,f,e,j;if(m.length){for(j=0,f=m.length;j<f;j++){c.bind(g,m[j],l,h)}return}k=m.getElementsByTagName("*");f=k.length;j=0;e=m.getAttribute(h.attr);if(e){if(!g[0][e]){g[0][e]=[]}g[0][e].push(m)}for(;j<f;j++){e=k[j].getAttribute(h.attr);if(e&&l[e]!==undefined){if(!g[0][e]){g[0][e]=[]}g[0][e].push(k[j])}}}});function d(j,g,e){if(!g){return j}var f,k,l,h={};if(e){d(h,j)}for(f in g){k=j[f];l=g[f];if(j===l){continue}if(l!==undefined){(e?h:j)[f]=l}}return e?h:j}function a(e){return typeof e==="object"}function b(e){if(a(e)){return e.constructor==Array}else{return false}}c.query=function(j){var m=j.substr(0,1),g,l,e,h,f,o,n,k;if(m==="#"){return document.getElementById(j.replace(m,""))}else{h=j.split(".");f=j.split(":");if(h[1]){l=f[1]?h[1].replace(":"+f[1],""):h[1];g=h[0]}else{l=null;g=f[1]?j.replace(f[1],""):j}e=document.getElementsByTagName(g);if(l){if(document.getElementsByClassName){e=document.getElementsByClassName(l)}else{o=[];for(k=0,n=e.length;k<n;k++){if(e[k].className.indexOf(l)!==-1){o.push(e[k])}}e=o}}if(f[1]){e=e[f[1]]}return e}};window.domglue=c})();