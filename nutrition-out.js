
// Sergio Espartano 2.3.2 - Comidas fuera de casa y extras.
// Todos los consumos se incorporan al registro original db.meals.
const OUT_FOODS={
 'Coliflor cocida':{kcal:58,protein:4,carbs:11,fat:1,portion:'200 g'},
 'Mayonesa':{kcal:136,protein:0.2,carbs:0.3,fat:15,portion:'20 g'},
 'Albóndigas en salsa':{kcal:390,protein:24,carbs:18,fat:24,portion:'200 g'},
 'Arroz cocido':{kcal:195,protein:4,carbs:42,fat:0.5,portion:'150 g'},
 'Ensalada mixta':{kcal:100,protein:2,carbs:8,fat:7,portion:'1 plato'},
 'Verduras cocidas':{kcal:90,protein:4,carbs:15,fat:1,portion:'200 g'},
 'Pescado a la plancha':{kcal:160,protein:30,carbs:0,fat:4,portion:'150 g'},
 'Pollo a la plancha':{kcal:220,protein:40,carbs:0,fat:5,portion:'150 g'},
 'Tarta (porción)':{kcal:350,protein:5,carbs:45,fat:17,portion:'1 porción'},
 'Fruta (pieza)':{kcal:80,protein:1,carbs:20,fat:0,portion:'1 pieza'},
 'Yogur natural':{kcal:90,protein:5,carbs:7,fat:4,portion:'1 unidad'},
 'Helado (bola)':{kcal:140,protein:3,carbs:17,fat:7,portion:'1 bola'},
 'Cerveza 330 ml':{kcal:140,protein:1,carbs:11,fat:0,portion:'330 ml'},
 'Cerveza 500 ml':{kcal:210,protein:2,carbs:17,fat:0,portion:'500 ml'},
 'Cerveza sin alcohol 330 ml':{kcal:70,protein:1,carbs:15,fat:0,portion:'330 ml'},
 'Refresco azucarado 330 ml':{kcal:139,protein:0,carbs:35,fat:0,portion:'330 ml'},
 'Refresco zero 330 ml':{kcal:2,protein:0,carbs:0,fat:0,portion:'330 ml'},
 'Vino 150 ml':{kcal:125,protein:0,carbs:4,fat:0,portion:'150 ml'},
 'Otro (valores manuales)':{kcal:0,protein:0,carbs:0,fat:0,portion:'1 ración'}
};
// Catálogo ampliado: estimaciones por ración habitual, editables antes de guardar.
const OUT_CATEGORIES={
 '🥩 Carnes y asados':[
 ['Entrecot de vaca madurada (300 g)',810,66,0,60,'300 g'],['Chuletón de vaca madurada (300 g comestibles)',900,66,0,70,'300 g comestibles'],['Solomillo de ternera (200 g)',360,52,0,16,'200 g'],['Carne a la piedra (300 g, corte medio)',750,78,0,49,'300 g'],['Churrasco (250 g)',650,55,0,47,'250 g'],['Secreto ibérico (200 g)',620,38,0,52,'200 g'],['Cinta de lomo (200 g)',330,48,0,14,'200 g'],['Cordero asado (250 g)',650,55,0,48,'250 g'],['Cochinillo asado (250 g)',700,48,0,55,'250 g'],['Hamburguesa Angus con pan y queso',760,43,48,43,'1 hamburguesa'],['Albóndigas caseras en salsa',390,24,18,24,'200 g'],['Pollo asado con piel',400,48,0,23,'200 g']],
 '🍝 Pastas, arroces y pizzas':[
 ['Espaguetis carbonara',750,28,85,33,'1 plato, 350 g'],['Espaguetis boloñesa',650,32,82,21,'1 plato, 350 g'],['Pasta al pesto',690,19,85,31,'1 plato, 330 g'],['Lasaña de carne',620,35,47,33,'1 ración, 350 g'],['Canelones de carne',520,27,48,24,'1 ración, 300 g'],['Raviolis de carne con salsa',560,25,72,19,'1 plato, 300 g'],['Risotto de setas',540,14,75,20,'1 plato, 300 g'],['Paella mixta',580,27,70,21,'1 plato, 350 g'],['Arroz con pollo',520,30,64,15,'1 plato, 350 g'],['Pizza margarita',850,32,105,32,'1 pizza mediana'],['Pizza barbacoa',1100,49,110,48,'1 pizza mediana']],
 '🍲 Cocina casera y platos españoles':[
 ['Cocido madrileño completo',850,46,65,44,'1 comida, sopa + vuelco'],['Sopa de cocido con fideos',190,9,24,6,'1 plato, 300 ml'],['Garbanzos con carne del cocido',610,38,43,30,'1 plato'],['Lentejas estofadas',390,20,52,12,'1 plato, 350 g'],['Fabada asturiana',680,35,55,34,'1 plato, 350 g'],['Callos a la madrileña',450,28,14,32,'1 plato, 300 g'],['Tortilla de patatas',330,13,27,19,'1 pincho grande'],['Huevos rotos con jamón',670,27,53,38,'1 plato'],['Croquetas caseras',300,10,28,17,'4 unidades'],['Salmorejo con huevo y jamón',330,11,27,20,'1 cuenco, 250 ml'],['Patatas bravas',410,6,53,20,'1 ración'],['Gyozas de pollo',320,17,39,10,'6 unidades']],
 '🥗 Ensaladas, verduras y entrantes':[
 ['Ensalada de queso de cabra',450,15,20,34,'1 plato'],['Ensalada de burrata',480,22,17,37,'1 plato'],['Ensalada de canónigos, jamón y frutos secos',350,17,15,25,'1 plato'],['Ensaladilla rusa',380,10,25,27,'1 ración'],['Brócoli con champiñones y bacon',310,16,17,20,'1 plato'],['Coliflor cocida con mayonesa',194,4,11,16,'200 g + 20 g mayonesa'],['Gazpacho',110,3,12,6,'1 vaso, 250 ml'],['Tabla de quesos',450,25,6,36,'1 ración, 120 g'],['Jamón ibérico',220,30,0,11,'100 g'],['Pan con tomate y aceite',280,6,40,11,'1 ración']],
 '🦪 Mariscos y pescados':[
 ['Almejas a la marinera',240,23,12,11,'1 ración, 250 g con salsa'],['Almejas al vapor',130,24,6,2,'200 g comestibles'],['Mejillones al vapor',150,20,7,5,'200 g comestibles'],['Gambas al ajillo',330,32,3,21,'1 ración'],['Pulpo a la gallega',300,28,25,9,'1 ración'],['Calamares a la romana',450,22,38,24,'1 ración'],['Sepia a la plancha',210,31,2,8,'200 g'],['Salmón a la plancha',330,32,0,22,'150 g'],['Gallo a la plancha',170,31,0,5,'180 g']],
 '🍰 Postres y dulces':[
 ['Tarta de queso',380,6,35,24,'1 porción'],['Tarta de chocolate',450,6,48,26,'1 porción'],['Tiramisú',420,7,42,24,'1 porción'],['Flan casero',220,7,32,7,'1 unidad'],['Arroz con leche',260,7,43,7,'1 cuenco'],['Natillas',190,6,28,6,'1 cuenco'],['Helado de dos bolas',280,6,34,14,'2 bolas'],['Fruta de temporada',90,1,22,0,'1 pieza']],
 '🍺🍷 Bebidas y aperitivos':[
 ['Cerveza caña 200 ml',85,1,7,0,'200 ml'],['Cerveza tercio 330 ml',140,1,11,0,'330 ml'],['Cerveza pinta 500 ml',210,2,17,0,'500 ml'],['Cerveza sin alcohol 330 ml',70,1,15,0,'330 ml'],['Vino tinto copa 150 ml',125,0,4,0,'150 ml'],['Vino blanco copa 150 ml',120,0,4,0,'150 ml'],['Vino rosado copa 150 ml',120,0,4,0,'150 ml'],['Vino espumoso copa 120 ml',95,0,3,0,'120 ml'],['Sangría vaso 250 ml',180,0,25,0,'250 ml'],['Vermut rojo 100 ml',145,0,16,0,'100 ml'],['Tinto de verano 330 ml',160,0,22,0,'330 ml'],['Sidra vaso 250 ml',115,0,12,0,'250 ml'],['Combinado con refresco normal',220,0,24,0,'1 vaso'],['Combinado con refresco zero',100,0,0,0,'1 vaso'],['Refresco normal 330 ml',139,0,35,0,'330 ml'],['Refresco zero 330 ml',2,0,0,0,'330 ml'],['Agua',0,0,0,0,'1 vaso'],['Café solo',3,0,0,0,'1 taza'],['Café con leche',75,4,6,4,'1 taza']]
};
const OUT_CATEGORY_LOOKUP={};
for(const [category,items] of Object.entries(OUT_CATEGORIES))for(const [name,kcal,protein,carbs,fat,portion] of items){OUT_FOODS[name]={kcal,protein,carbs,fat,portion};OUT_CATEGORY_LOOKUP[name]=category}
function outFoodOptions(){
 const groups=Object.entries(OUT_CATEGORIES).map(([group,items])=>`<optgroup label="${esc(group)}">${items.map(([name])=>`<option value="${esc(name)}">${esc(name)}</option>`).join('')}</optgroup>`).join('');
 return `<option value="">Selecciona un plato o bebida</option>${groups}<optgroup label="Otros y opciones anteriores">${Object.keys(OUT_FOODS).filter(k=>!OUT_CATEGORY_LOOKUP[k]).map(k=>`<option value="${esc(k)}">${esc(k)}</option>`).join('')}</optgroup>`
}
function outFoodFilter(input){const sel=input.form.elements.food;const q=input.value.trim().toLocaleLowerCase('es');for(const option of sel.options){if(!option.value)continue;option.hidden=!!q&&!option.textContent.toLocaleLowerCase('es').includes(q)};if(q){const first=[...sel.options].find(o=>o.value&&!o.hidden);if(first){sel.value=first.value;outFoodSelect(sel)}}}
function outFoodSelect(f){const o=OUT_FOODS[f.value];if(!o)return;const form=f.form;form.elements.portion.value=o.portion;for(const k of ['kcal','protein','carbs','fat'])form.elements[k].value=o[k]}
function outFoodAdd(e,date,slot){
 e.preventDefault();const f=e.target.elements;
 const name=f.food.value==='Otro (valores manuales)'?f.custom.value.trim():f.food.value;
 const qty=Number(f.qty.value),vals={};
 for(const k of ['kcal','protein','carbs','fat'])vals[k]=Number(f[k].value);
 if(!name||!Number.isFinite(qty)||qty<=0||qty>99||Object.values(vals).some(v=>!Number.isFinite(v)||v<0||v>10000)){alert('Comprueba nombre, cantidad y valores por ración.');return}
 const item={id:Date.now()+Math.floor(Math.random()*10000),date,type:slot,name,quantity:`${qty} × ${f.portion.value||'ración'}`,source:'estimación editable de comida fuera',...Object.fromEntries(Object.entries(vals).map(([k,v])=>[k,round1(v*qty)]))};
 db.meals.push(item);if(save())render();
}
function outFoodForm(date,slot){
 return `<form onsubmit="outFoodAdd(event,'${date}','${slot}')">
 <label>Buscar plato o bebida<input name="search" type="search" placeholder="Ej. chuletón, carbonara, almejas, vino..." oninput="outFoodFilter(this)"></label>
 <label>Alimento o bebida<select name="food" required onchange="outFoodSelect(this)">
 ${outFoodOptions()}</select></label>
 <label>Otro plato (si eliges «Otro»)<input name="custom" placeholder="Ej. croquetas caseras"></label>
 <div class="grid"><label>Raciones o unidades<input name="qty" type="number" min="0.25" max="99" step="0.25" value="1" required></label>
 <label>Tamaño de cada ración<input name="portion" placeholder="Ej. 200 g o 330 ml" required></label></div>
 <p class="hint">Valores aproximados POR RACIÓN. Puedes modificarlos si conoces la receta o etiqueta.</p>
 <div class="grid">${[['kcal','Calorías (kcal)'],['protein','Proteínas (g)'],['carbs','Hidratos (g)'],['fat','Grasas (g)']].map(([k,l])=>`<label>${l}<input name="${k}" type="number" min="0" step="0.1" value="0" required></label>`).join('')}</div>
 <button class="btn">✓ Añadir a lo consumido</button></form>`;
}
function outFoodPanel(date){
 const items=db.meals.filter(x=>x.date===date&&x.source==='estimación editable de comida fuera');
 const kcal=round1(items.reduce((a,x)=>a+Number(x.kcal||0),0));
 return `<details class="card" open><summary><b>🍽️ Comida fuera de casa y bebidas</b><br><small>Carnes, pastas, cocina casera, mariscos, vinos y extras</small></summary>
 <p class="hint">Registra lo que realmente has tomado. Puedes añadir varios platos y varias bebidas a la misma comida: aperitivo, primero, segundo, vino, cerveza, postre... Los valores se suman automáticamente al total diario de arriba.</p>
 ${['Primero','Segundo','Acompañamiento','Postre','Bebidas y extras'].map((slot,i)=>`<details class="entry"><summary>+ ${slot}</summary>${outFoodForm(date,slot==='Bebidas y extras'?'Bebidas y extras':`Comida · ${slot}`)}</details>`).join('')}
 <p class="hint"><b>Registrado en esta sección: ${kcal} kcal</b>. Los valores son aproximados, especialmente en recetas caseras, salsas y alcohol. Las calorías del alcohol no se deducen de los macros.</p>
 ${items.map(x=>`<div class="entry row"><span><b>${esc(x.name)}</b><br><small>${esc(x.type)} · ${esc(x.quantity)} · ${round1(x.kcal)} kcal</small></span><button class="btn secondary" onclick="removeEntry('meals',${Number(x.id)})">✕</button></div>`).join('')}
 <p class="hint">Postre: puedes incluirlo si te apetece. El registro muestra su impacto estimado, no lo clasifica como permitido o prohibido. El alcohol no tiene un nivel de consumo sin riesgo; registra las unidades sin compensarlas con ejercicio.</p>
 </details>`;
}
const nutritionPanelBeforeOut=nutritionPanel;
nutritionPanel=function(date){return nutritionPanelBeforeOut(date)+outFoodPanel(date)};
render();
