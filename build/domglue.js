/*! domglue (c) G.Cochez - github.com/gillescochez/domglue */
(function(){function a(c,e,d){return new a.init(c,e,d)}b(a,{settings:{attr:"data-bind",regex:null},init:function(c,e,d){d=b(a.settings,d,true);var f=c.nodeName?c:a.query(c);this[0]={};this[1]=e;a.bind(this,f,e,d);a.extend(this);a.update(this);return this},update:function(c){for(var d in c[0]){c[0][d].innerHTML=c[1][d]}},extend:function(c){for(var d in c[1]){(function(e){c[e]=function(f){c[1][e]=f;if(c[0][e]){c[0][e].innerHTML=f}}})(d)}},bind:function(e,k,j,f){var h=k.getElementsByTagName("*"),d=h.length,g=0,c=k.getAttribute(f.attr);if(c){e[0][c]=k}for(;g<d;g++){c=h[g].getAttribute(f.attr);if(c&&j[c]!==undefined){e[0][c]=h[g]}}}});function b(g,e,c){if(!e){return g}var d,h,i,f={};if(c){b(f,g)}for(d in e){h=g[d];i=e[d];if(g===i){continue}if(i!==undefined){(c?f:g)[d]=i}}return c?f:g}a.query=function(g){var k=g.substr(0,1),e,j,c,f,d,m,l,h;if(k==="#"){return document.getElementById(g.replace(k,""))}else{f=g.split(".");d=g.split(":");if(f[1]){j=d[1]?f[1].replace(":"+d[1],""):f[1];e=f[0]}else{j=null;e=d[1]?g.replace(d[1],""):g}c=document.getElementsByTagName(e);if(j){m=[];for(h=0,l=c.length;h<l;h++){if(c[h].className.indexOf(j)!==-1){m.push(c[h])}}c=m}if(d[1]){c=c[d[1]]}return c}};window.domglue=a})();