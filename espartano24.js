
// Sergio Espartano 2.4.0. Datos locales; sin envío a servidores.
const V24KEY='espartano-v24';
let v24;try{v24=JSON.parse(localStorage.getItem(V24KEY))||{modes:{},place:'casa',places:{},wellness:{},health:{},favoriteBreakfast:''}}catch{v24={}};
v24.modes??={};v24.place??='casa';v24.places??={};v24.wellness??={};v24.health??={};v24.favoriteBreakfast??='';
const PLACES={casa:'🏠 Casa',padre:'🏋️ Gimnasio de mi padre',hotel:'🏨 Hotel / viaje',otro:'📍 Otro lugar'};
const DEFAULT_EQUIPMENT={
 casa:{mancuernas:'Mancuernas ajustables hasta 10 kg',bandas:'Bandas elásticas',kettlebell:'Kettlebell de 6 kg',colchoneta:'Colchoneta'},
 padre:{mancuernas:'Mancuernas 12,5 / 15 / 17,5 kg y superiores',banco:'Banco de pesas',bicicleta:'Bicicleta estática',cinta:'Cinta para caminar'},
 hotel:{},otro:{}
};
for(const k of Object.keys(PLACES))v24.places[k]??={...DEFAULT_EQUIPMENT[k]};
function save24(){try{localStorage.setItem(V24KEY,JSON.stringify(v24))}catch{alert('No se pudo guardar. Exporta una copia JSON.');}}
const QUOTES=[
'La disciplina construye lo que la motivación solo imagina.',
'La fuerza empieza cuando decides volver a intentarlo.',
'El descanso también forma parte de la victoria.',
'No necesitas un día perfecto. Necesitas un paso adelante.',
'Que tu constancia hable más alto que tus excusas.',
'Cada repetición es una promesa cumplida.',
'El espejo muestra el presente; tus hábitos construyen el futuro.',
'Entrenar es invertir en la persona que serás mañana.',
'La grandeza se esconde en lo que haces cuando nadie mira.',
'No compitas con ayer: aprende de él.',
'El progreso no exige prisa; exige dirección.',
'Tu mejor marca empieza por presentarte.',
'Una sesión corta también suma.',
'La paciencia es fuerza que sabe esperar.',
'No hay derrota en un descanso necesario.',
'La perseverancia no necesita aplausos.',
'Construye hábitos que sobrevivan a los días difíciles.',
'La victoria es poder elegir y volver a empezar.',
'El cuerpo cambia con el tiempo; el carácter, con las decisiones.',
'La meta no se conquista de golpe: se entrena cada día.',
'No dejes que un día complicado decida toda tu semana.',
'La constancia transforma los pequeños esfuerzos.',
'No persigas la perfección; cultiva la continuidad.',
'La fuerza también es saber bajar el ritmo.',
'El entrenamiento termina; lo aprendido permanece.',
'Lo importante no es cuánto prometes, sino cuánto sostienes.',
'Un espartano también sabe disfrutar de la vida.',
'El progreso verdadero no siempre se ve en la báscula.',
'Cada nuevo día te ofrece una oportunidad sin deudas con ayer.',
'La disciplina es libertad construida poco a poco.',
'Entrena con cabeza; celebra con corazón.'
];
function quoteOfDate(d){let n=Number(d.replaceAll('-',''));return QUOTES[n%QUOTES.length]}
function welcome24(d){return `<section class="card" style="border-color:#89501d;background:linear-gradient(125deg,#302114,#17171b)"><div class="brand">⚔ MENSAJE DEL ESPARTANO</div><h3 style="color:#ffd08d;line-height:1.45">“${esc(quoteOfDate(d))}”</h3><small>Una frase cada día. Entrenar y descansar son parte del camino.</small></section>`}
function modeSelector(d){let m=v24.modes[d]||'normal';return `<section class="card"><b>⚡ Modalidad de entrenamiento</b><p class="hint">Cambia la sesión de hoy sin modificar la rutina semanal.</p><div class="grid">${[['normal','🏋️ Normal'],['express','⚡ Exprés'],['custom','🧩 Personalizado']].map(([id,label])=>`<button class="btn ${m===id?'':'secondary'}" onclick="v24.modes['${d}']='${id}';save24();render()">${label}</button>`).join('')}</div>${m==='express'?'<p class="hint">20–25 min: ejercicios principales, menos series y accesorios.</p>':m==='custom'?'<p class="hint">Personaliza el lugar y el material en Inventario. Ajusta las series manualmente.</p>':''}<p class="hint">Lugar: ${esc(PLACES[v24.place])}. <button class="btn secondary" onclick="changeTab('inventario')">🧰 Inventario</button></p></section>`}
const baseDayView24=dayView;
dayView=function(){return welcome24(focusDate)+baseDayView24()};
const baseSessionUI24=sessionUI;
sessionUI=function(d,s){
 const mode=v24.modes[d]||'normal';
 if(mode==='normal')return modeSelector(d)+baseSessionUI24(d,s);
 const ids=mode==='express'?s.ids.slice(0,Math.min(4,s.ids.length)):s.ids;
 const original=EX;
 // Session variant: reduce displayed set count, preserving all existing recorded series.
 let replacements={};
 if(mode==='express'){for(const id of ids){if(EX[id]){replacements[id]=EX[id];EX[id]={...EX[id],sets:Math.min(2,EX[id].sets)}}}
 }
 let result;
 try{result=baseSessionUI24(d,{...s,ids,title:s.title+(mode==='express'?' · Exprés':' · Personalizado')})}
 finally{for(const [id,obj] of Object.entries(replacements))EX[id]=obj}
 return modeSelector(d)+result;
};
const baseWorkoutFor24=workoutFor;
workoutFor=function(d){const s=baseWorkoutFor24(d);if(!s)return s;const m=v24.modes[d]||'normal';return m==='express'?{...s,ids:s.ids.slice(0,Math.min(4,s.ids.length)),title:s.title+' · Exprés'}:s};
function inventoryView(){
 let k=v24.place,items=v24.places[k];return `<h2>🧰 Mi inventario</h2><p class="hint">Guarda el material de cada lugar. No se borra ningún registro de entrenamiento.</p>${card('Lugar de entrenamiento',`<label>Seleccionar lugar<select onchange="v24.place=this.value;save24();render()">${Object.entries(PLACES).map(([id,name])=>`<option value="${id}" ${k===id?'selected':''}>${name}</option>`).join('')}</select></label><p class="hint">Material disponible:</p>${Object.entries(items).map(([id,name])=>`<div class="entry row"><span>${esc(name)}</span><button class="btn secondary" onclick="delete v24.places['${k}']['${id}'];save24();render()">✕</button></div>`).join('')||'<p class="hint">Sin material registrado: se pueden elegir ejercicios de peso corporal.</p>'}<form onsubmit="addEquipment24(event)"><label>Añadir material o máquina<input name="name" required maxlength="90" placeholder="Ej. Polea alta, mancuernas 20 kg"></label><button class="btn">+ Añadir</button></form>`)}${card('Cómo usarlo',`<p class="hint">Selecciona el lugar antes de entrenar. En esta versión el inventario es editable y visible; todavía no genera automáticamente una rutina nueva según las máquinas disponibles.</p>`)}`;
}
function addEquipment24(e){e.preventDefault();let n=e.target.elements.name.value.trim();if(!n)return;v24.places[v24.place]['item'+Date.now()]=n;save24();render()}
function wellnessView(){
 let d=focusDate,w=v24.wellness[d]||{},h=v24.health[d]||{};
 return `<h2>⌚ Estado del espartano</h2><label>Fecha<input type="date" value="${d}" onchange="focusDate=this.value;render()"></label>${card('Datos de Apple Salud importados',Object.keys(h).length?`<div class="grid">${[['steps','Pasos'],['sleepMinutes','Sueño (min)'],['activeKcal','kcal activas'],['restingHr','Pulso reposo (lpm)'],['hrvMs','VFC (ms)']].map(([k,l])=>`<div><b>${h[k]??'—'}</b><br><small>${l}</small></div>`).join('')}</div><small>Fuente: archivo importado manualmente</small>`:'<p class="hint">Todavía no hay datos importados para esta fecha. No existe una conexión automática con Apple Salud.</p>')}${card('¿Cómo te encuentras?',`<label>Energía (1–10)<input id="well-energy" type="number" min="1" max="10" value="${esc(w.energy??7)}"></label><label>Molestias o fatiga (0–10)<input id="well-fatigue" type="number" min="0" max="10" value="${esc(w.fatigue??0)}"></label><label>Observaciones<textarea id="well-notes">${esc(w.notes||'')}</textarea></label><button class="btn" onclick="saveWellness24('${d}')">Guardar estado</button>`)}${card('Orientación',`<p class="hint">${w.energy!==undefined?(Number(w.energy)<=4||Number(w.fatigue)>=7?'Hoy podrías priorizar descanso o actividad suave, especialmente si tienes molestias.':'Si te encuentras bien, puedes seguir tu sesión prevista y ajustar la intensidad según tus sensaciones.'):'Registra cómo te encuentras para recibir una orientación básica. Ningún indicador del reloj diagnostica tu recuperación.'}</p>`)}${card('Importar datos de Apple Salud',`<p class="hint">La PWA no puede leer HealthKit directamente. Importa un JSON o CSV preparado manualmente o con Atajos de iPhone. Se procesa en este dispositivo y no se envía a servidores.</p><p class="hint">Formato: {"date":"2026-11-14","steps":8000,"sleepMinutes":470,"activeKcal":450,"restingHr":55,"hrvMs":45}. Todos los campos salvo date son opcionales.</p><input type="file" accept=".json,.csv,application/json,text/csv" onchange="importHealth24(event)"><p class="hint">CSV compatible: date,steps,sleepMinutes,activeKcal,restingHr,hrvMs. Puedes dejar columnas vacías si no tienes esos datos. Consulta la guía incluida para crear el Atajo de exportación. La sincronización automática aún no está disponible.</p>`)}`;
}
function saveWellness24(d){v24.wellness[d]={energy:Number($('#well-energy').value),fatigue:Number($('#well-fatigue').value),notes:$('#well-notes').value};save24();render()}
async function importHealth24(e){
 const f=e.target.files?.[0];if(!f)return;
 try{
 const raw=await f.text();
 let obj;
 if(f.name.toLowerCase().endsWith('.csv')){
  const lines=raw.replace(/^\uFEFF/,'').trim().split(/\r?\n/).filter(Boolean);
  if(lines.length<2)throw Error('CSV sin registros');
  const header=lines.shift().split(',').map(x=>x.trim().replace(/^"|"$/g,''));
  if(!header.includes('date'))throw Error('Falta columna date');
  obj=lines.map(line=>{const parts=line.split(',').map(x=>x.trim().replace(/^"|"$/g,''));return Object.fromEntries(header.map((key,i)=>[key,parts[i]]))});
 }else obj=JSON.parse(raw);
 const arr=Array.isArray(obj)?obj:[obj];
 if(arr.length>366)throw Error('Máximo 366 días por importación');
 const keys=['steps','sleepMinutes','activeKcal','restingHr','hrvMs'];let clean={};
 for(const r of arr){
 if(!r||typeof r.date!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(r.date)||Number.isNaN(new Date(r.date+'T12:00:00').getTime()))throw Error('Fecha no válida');
 let entry={};
 for(const k of keys)if(r[k]!==undefined){let n=Number(r[k]);if(!Number.isFinite(n)||n<0||n>1000000)throw Error('Dato no válido: '+k);entry[k]=n}
 clean[r.date]=entry;
 }
 Object.assign(v24.health,clean);save24();render();alert('Datos importados: '+arr.length+' día(s).');
 }catch(err){alert('No se pudo importar: '+err.message)}
}
const baseNutritionPanel24=nutritionPanel;
nutritionPanel=function(d){
 const old=baseNutritionPanel24(d);
 return `<section class="card"><b>🍽️ Tu alimentación, a tu manera</b><p class="hint">Abre Desayuno para elegir cualquier opción, todos los días. Para comida o cena, usa el menú previsto o el catálogo de fuera de casa. Solo suma lo que confirmes.</p><label>Desayuno habitual favorito<select onchange="v24.favoriteBreakfast=this.value;save24()"><option value="">Sin favorito</option>${Object.keys(OUT_FOODS).filter(x=>['kéfir','leche con galletas','porra','churro','tostada','huevos','avena'].some(y=>x.toLowerCase().includes(y))).map(x=>`<option ${v24.favoriteBreakfast===x?'selected':''}>${esc(x)}</option>`).join('')}</select></label>${v24.favoriteBreakfast?`<button class="btn secondary" onclick="favoriteBreakfast24('${d}')">+ Registrar mi desayuno habitual</button>`:''}</section>`+old;
};
function favoriteBreakfast24(d){
 const name=v24.favoriteBreakfast,x=OUT_FOODS[name];if(!x)return;
 if(!confirm('¿Registrar como consumido: '+name+'?'))return;
 db.meals.push({id:Date.now(),date:d,type:'Desayuno',name,quantity:x.portion,kcal:x.kcal,protein:x.protein,carbs:x.carbs,fat:x.fat,source:'estimación editable de comida fuera'});save();render();
}
sections.push(['inventario','🧰','Inventario'],['salud','⌚','Salud']);
const renderBefore24=render;
render=function(){
 if(tab==='inventario'||tab==='salud'){
 $('#today').textContent=new Date().toLocaleDateString('es-ES',{weekday:'long',day:'numeric',month:'long'});
 $('#greeting').textContent=tab==='inventario'?'Inventario de entrenamiento':'Estado del espartano';
 $('#tabs').innerHTML=sections.map(([id,icon,label])=>`<button class="${id===tab?'active':''}" onclick="changeTab('${id}')"><span>${icon}</span>${label}</button>`).join('');
 $('#app').innerHTML=tab==='inventario'?inventoryView():wellnessView();
 }else renderBefore24();
};
const exportBefore24=exportData;
exportData=function(){
 const blob=new Blob([JSON.stringify({version:'2.4.0',exportedAt:new Date().toISOString(),data:db,foodState,v23,schedule,gymChoices,gear,nutrition,v24},null,2)],{type:'application/json'});
 const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='sergio-espartano-copia-'+day()+'.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
};
const importBefore24=importData;
importData=async function(e){
 const f=e.target.files?.[0];if(!f)return;
 let obj;try{obj=JSON.parse(await f.text())}catch{alert('Archivo JSON no válido');return}
 if(obj.version==='2.4.0'&&obj.v24&&obj.data&&obj.v23&&obj.nutrition){
 if(!confirm('¿Restaurar copia completa 2.4? Se sustituirán los registros actuales.'))return;
 db=obj.data;foodState=obj.foodState||foodState;v23=obj.v23;schedule=obj.schedule||schedule;gymChoices=obj.gymChoices||gymChoices;gear=obj.gear||gear;nutrition=obj.nutrition;v24=obj.v24;
 save();saveFood();persist23();saveNutrition();save24();
 localStorage.setItem('espartano-schedule',JSON.stringify(schedule));
 localStorage.setItem('espartano-gym-days',JSON.stringify(gymChoices));
 localStorage.setItem('espartano-gear',JSON.stringify(gear));
 render();alert('Copia 2.4 restaurada.');
 }else await importBefore24(e);
};
render();
