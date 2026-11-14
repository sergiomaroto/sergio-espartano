// Version visible on every screen, including the installed PWA.
const VERSION='2.4.1';
const previousRender=render;
render=function(){previousRender();const g=document.getElementById('greeting');if(g&&g.textContent.includes('Sergio Espartano 2.3'))g.textContent=g.textContent.replace(/Sergio Espartano 2\.3(?:\.\d+)?/,'Sergio Espartano '+VERSION);const header=document.querySelector('header');if(header){let badge=document.getElementById('version-indicator');if(!badge){badge=document.createElement('div');badge.id='version-indicator';badge.style.cssText='color:#ff8c22;font-size:12px;font-weight:700;margin-top:8px';header.appendChild(badge)}badge.textContent='Versión '+VERSION+' · Importación Salud JSON/CSV';}};
render();
