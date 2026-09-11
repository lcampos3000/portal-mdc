const ORIGINAL_STUDENTS = [];
const CALENDAR = [{"id":"1-2026-08-11","series":"1ª série","date":"2026-08-11","time":"14h às 15h30","title":"História","components":["História"],"type":"Síntese substitutiva"},{"id":"1-2026-08-18","series":"1ª série","date":"2026-08-18","time":"14h às 15h30","title":"Química","components":["Química"],"type":"Síntese substitutiva"},{"id":"1-2026-08-25","series":"1ª série","date":"2026-08-25","time":"14h às 15h30","title":"Matemática","components":["Matemática"],"type":"Síntese substitutiva"},{"id":"1-2026-09-01","series":"1ª série","date":"2026-09-01","time":"14h às 17h","title":"Biologia / Língua Portuguesa","components":["Biologia","Língua Portuguesa"],"type":"Síntese substitutiva"},{"id":"1-2026-09-08","series":"1ª série","date":"2026-09-08","time":"14h às 17h","title":"Geografia / Filosofia","components":["Geografia","Filosofia"],"type":"Síntese substitutiva"},{"id":"1-2026-09-15","series":"1ª série","date":"2026-09-15","time":"14h às 17h","title":"Física / Literatura","components":["Física","Literatura"],"type":"Síntese substitutiva","featured":true},{"id":"1-2026-09-22","series":"1ª série","date":"2026-09-22","time":"14h às 17h","title":"Produção de Textos / História","components":["Produção de Textos","História"],"type":"Síntese"},{"id":"1-2026-09-29","series":"1ª série","date":"2026-09-29","time":"13h30 às 17h30","title":"Simulado SAS UFMG","components":[],"type":"Síntese (4 pts)"},{"id":"1-2026-10-06","series":"1ª série","date":"2026-10-06","time":"13h30 às 19h","title":"Simulado CSA ENEM 80% — Dia 1","components":[],"type":"Processual (5 pts)"},{"id":"1-2026-10-20","series":"1ª série","date":"2026-10-20","time":"13h30 às 18h30","title":"Simulado CSA ENEM 80% — Dia 2","components":[],"type":"Processual (5 pts)"},{"id":"1-2026-10-27","series":"1ª série","date":"2026-10-27","time":"14h às 17h","title":"Química / Língua Inglesa","components":["Química","Língua Inglesa"],"type":"Síntese"},{"id":"1-2026-11-03","series":"1ª série","date":"2026-11-03","time":"14h às 17h","title":"Biologia / Língua Portuguesa","components":["Biologia","Língua Portuguesa"],"type":"Síntese"},{"id":"1-2026-11-10","series":"1ª série","date":"2026-11-10","time":"13h30 às 17h30","title":"Produção de Textos / Matemática","components":["Produção de Textos","Matemática"],"type":"Síntese"},{"id":"1-2026-11-17","series":"1ª série","date":"2026-11-17","time":"14h às 17h","title":"Geografia / Filosofia","components":["Geografia","Filosofia"],"type":"Síntese"},{"id":"1-2026-11-24","series":"1ª série","date":"2026-11-24","time":"14h às 17h","title":"Física / Literatura","components":["Física","Literatura"],"type":"Síntese"},{"id":"1-2026-12-01","series":"1ª série","date":"2026-12-01","time":"13h30 às 17h30","title":"Simulado CSA UFMG","components":[],"type":"Síntese (11 pts)"},{"id":"1-2026-12-03","series":"1ª série","date":"2026-12-03","time":"A definir","title":"Segunda Chamada — Dia 1","components":[],"type":"Síntese"},{"id":"1-2026-12-04","series":"1ª série","date":"2026-12-04","time":"A definir","title":"Segunda Chamada — Dia 2","components":[],"type":"Síntese"},{"id":"2-2026-08-10","series":"2ª série","date":"2026-08-10","time":"14h às 17h","title":"Produção de Textos / Química","components":["Produção de Textos","Química"],"type":"Avaliação mista substitutiva"},{"id":"2-2026-08-17","series":"2ª série","date":"2026-08-17","time":"14h às 17h","title":"Matemática / Língua Portuguesa","components":["Matemática","Língua Portuguesa"],"type":"Avaliação mista substitutiva"},{"id":"2-2026-08-24","series":"2ª série","date":"2026-08-24","time":"14h às 17h","title":"Biologia / Filosofia","components":["Biologia","Filosofia"],"type":"Avaliação mista substitutiva"},{"id":"2-2026-08-31","series":"2ª série","date":"2026-08-31","time":"14h às 17h","title":"Geografia / Física","components":["Geografia","Física"],"type":"Avaliação mista substitutiva"},{"id":"2-2026-09-14","series":"2ª série","date":"2026-09-14","time":"14h às 17h","title":"História / Literatura","components":["História","Literatura"],"type":"Avaliação mista substitutiva","featured":true},{"id":"2-2026-09-21","series":"2ª série","date":"2026-09-21","time":"14h às 17h","title":"Produção de Textos / Química","components":["Produção de Textos","Química"],"type":"Avaliação mista"},{"id":"2-2026-09-28","series":"2ª série","date":"2026-09-28","time":"13h30 às 17h30","title":"Simulado SAS UFMG","components":[],"type":"Síntese (4 pts)"},{"id":"2-2026-10-05","series":"2ª série","date":"2026-10-05","time":"14h às 17h","title":"Matemática / Língua Portuguesa","components":["Matemática","Língua Portuguesa"],"type":"Avaliação mista"},{"id":"2-2026-10-19","series":"2ª série","date":"2026-10-19","time":"13h30 às 19h","title":"Simulado CSA ENEM 100% — Dia 1","components":[],"type":"Processual (5 pts)"},{"id":"2-2026-10-26","series":"2ª série","date":"2026-10-26","time":"13h30 às 18h30","title":"Simulado CSA ENEM 100% — Dia 2","components":[],"type":"Processual (5 pts)"},{"id":"2-2026-11-09","series":"2ª série","date":"2026-11-09","time":"14h às 17h","title":"Biologia / Filosofia","components":["Biologia","Filosofia"],"type":"Avaliação mista"},{"id":"2-2026-11-11","series":"2ª série","date":"2026-11-11","time":"Horário da aula","title":"Língua Inglesa","components":["Língua Inglesa"],"type":"Avaliação mista substitutiva"},{"id":"2-2026-11-16","series":"2ª série","date":"2026-11-16","time":"14h às 17h","title":"Geografia / Física","components":["Geografia","Física"],"type":"Avaliação mista"},{"id":"2-2026-11-23","series":"2ª série","date":"2026-11-23","time":"14h às 17h","title":"História / Literatura","components":["História","Literatura"],"type":"Avaliação mista"},{"id":"2-2026-11-30","series":"2ª série","date":"2026-11-30","time":"13h30 às 17h30","title":"Simulado CSA UFMG","components":[],"type":"Síntese (11 pts)"},{"id":"2-2026-12-03","series":"2ª série","date":"2026-12-03","time":"A definir","title":"Segunda Chamada — Dia 1","components":[],"type":"Síntese"},{"id":"2-2026-12-04","series":"2ª série","date":"2026-12-04","time":"A definir","title":"Segunda Chamada — Dia 2","components":[],"type":"Síntese"},{"id":"3-2026-08-03","series":"3ª série","date":"2026-08-03","time":"14h às 16h30","title":"Matemática / Biologia I e II / História","components":[],"type":"Processual discursiva"},{"id":"3-2026-08-10","series":"3ª série","date":"2026-08-10","time":"14h às 16h","title":"Física I e II / Literatura","components":[],"type":"Processual discursiva"},{"id":"3-2026-08-17","series":"3ª série","date":"2026-08-17","time":"14h às 16h30","title":"Química / Geografia / Filosofia / Português","components":[],"type":"Processual discursiva"},{"id":"3-2026-08-24","series":"3ª série","date":"2026-08-24","time":"13h30 às 19h","title":"Simulado CSA ENEM — Dia 1","components":[],"type":"Síntese substitutiva"},{"id":"3-2026-08-31","series":"3ª série","date":"2026-08-31","time":"13h30 às 18h30","title":"Simulado CSA ENEM — Dia 2","components":[],"type":"Síntese substitutiva"},{"id":"3-2026-09-14","series":"3ª série","date":"2026-09-14","time":"13h30 às 19h","title":"Simulado SAS ENEM 5 — Dia 1","components":[],"type":"Processual"},{"id":"3-2026-09-21","series":"3ª série","date":"2026-09-21","time":"13h30 às 18h30","title":"Simulado SAS ENEM 5 — Dia 2","components":[],"type":"Processual"},{"id":"3-2026-10-05","series":"3ª série","date":"2026-10-05","time":"13h30 às 19h","title":"Simulado CSA ENEM — Dia 1","components":[],"type":"Síntese"},{"id":"3-2026-10-07-10","series":"3ª série","date":"2026-10-07","dateEnd":"2026-10-10","time":"Janela online","title":"Simulado SAS ENEM 6 — Dia 1","components":[],"type":"Sem pontuação"},{"id":"3-2026-10-17-19","series":"3ª série","date":"2026-10-17","dateEnd":"2026-10-19","time":"Janela online","title":"Simulado SAS ENEM 6 — Dia 2","components":[],"type":"Sem pontuação"},{"id":"3-2026-10-19","series":"3ª série","date":"2026-10-19","time":"13h30 às 18h30","title":"Simulado CSA ENEM — Dia 2","components":[],"type":"Síntese"},{"id":"3-2026-11-08","series":"3ª série","date":"2026-11-08","time":"Domingo","title":"ENEM 2026 — Dia 1","components":[],"type":"Informativo"},{"id":"3-2026-11-15","series":"3ª série","date":"2026-11-15","time":"Domingo","title":"ENEM 2026 — Dia 2","components":[],"type":"Informativo"},{"id":"3-2026-11-18","series":"3ª série","date":"2026-11-18","time":"8h às 11h40","title":"Matemática / Biologia I e II / História","components":[],"type":"Síntese objetiva final"},{"id":"3-2026-11-24","series":"3ª série","date":"2026-11-24","time":"9h às 11h40","title":"Física I e II / Literatura","components":[],"type":"Síntese objetiva final"},{"id":"3-2026-11-30","series":"3ª série","date":"2026-11-30","time":"8h às 11h40","title":"Química / Geografia / Filosofia / Português","components":[],"type":"Síntese objetiva final"},{"id":"3-2026-12-03","series":"3ª série","date":"2026-12-03","time":"A definir","title":"Segunda Chamada — Dia 1","components":[],"type":"Síntese"},{"id":"3-2026-12-04","series":"3ª série","date":"2026-12-04","time":"A definir","title":"Segunda Chamada — Dia 2","components":[],"type":"Síntese"}];
const STORAGE_KEY='csa_exam_mixer_v1';
const TODAY='2026-09-10';

function deepClone(x){return JSON.parse(JSON.stringify(x))}
function esc(s){return String(s??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]))}
function fmtDate(iso,end){const [y,m,d]=iso.split('-'); let s=`${d}/${m}/${y}`; if(end){const [y2,m2,d2]=end.split('-');s=`${d}/${m} a ${d2}/${m2}/${y2}`} return s}
function toast(msg){const el=document.getElementById('toast');el.textContent=msg;el.classList.add('show');setTimeout(()=>el.classList.remove('show'),2200)}
function hashSeed(str){let h=2166136261>>>0;for(const ch of String(str)){h^=ch.charCodeAt(0);h=Math.imul(h,16777619)}return h>>>0}
function rngFrom(seed){let a=hashSeed(seed);return function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return ((t^t>>>14)>>>0)/4294967296}}
function mean(arr){const x=arr.filter(v=>Number.isFinite(v));return x.length?x.reduce((a,b)=>a+b,0)/x.length:null}
function countBy(arr,fn){const o={};arr.forEach(x=>{const k=fn(x);o[k]=(o[k]||0)+1});return o}
function normalizeComponent(name){
  const raw=String(name||'').trim(), s=raw.toUpperCase();
  const map={'ESTUDOS DE BIOLOGIA':'Biologia','ESTUDOS GEOGRÁFICOS':'Geografia','ESTUDOS DE FÍSICA':'Física','ESTUDOS HISTÓRICOS':'História','ESTUDOS ARTÍSTICOS':'Arte','EDUCACAO FISICA':'Educação Física','EDUCAÇÃO FISICA':'Educação Física','EDUCACAO FÍSICA':'Educação Física','FÍSICA':'Física','HISTÓRIA':'História','LITERATURA':'Literatura','MATEMÁTICA':'Matemática','BIOLOGIA':'Biologia','GEOGRAFIA':'Geografia','FILOSOFIA':'Filosofia','QUÍMICA':'Química','SOCIOLOGIA':'Sociologia','ARTE':'Arte','LÍNGUA PORTUGUESA':'Língua Portuguesa','LÍNGUA INGLESA':'Língua Inglesa','PRODUÇÃO DE TEXTOS':'Produção de Textos'};
  return map[s]||raw.replace(/\b\w/g,c=>c.toUpperCase());
}
function defaultState(){
  return {students:deepClone(ORIGINAL_STUDENTS),generation:null,maps:null,roomSetup:null,selectedSeat:null,showOriginPrint:false};
}
let state=(()=>{try{const x=JSON.parse(localStorage.getItem(STORAGE_KEY));return x&&x.students?x:defaultState()}catch(e){return defaultState()}})();
function save(){localStorage.setItem(STORAGE_KEY,JSON.stringify(state));document.getElementById('saveStatus').textContent='Salvo localmente • '+new Date().toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'})}
function seriesStudents(series){return state.students.filter(s=>s.series===series)}
function componentsForSeries(series){return [...new Set(seriesStudents(series).flatMap(s=>Object.keys(s.scores||{})))].sort((a,b)=>a.localeCompare(b,'pt-BR'))}
function originCounts(series){return countBy(seriesStudents(series),s=>s.origin)}
function goView(id){document.querySelectorAll('.view').forEach(v=>v.classList.toggle('active',v.id===id));document.querySelectorAll('.nav button').forEach(b=>b.classList.toggle('active',b.dataset.view===id));window.scrollTo({top:0,behavior:'smooth'});if(id==='mapsView')renderMaps();if(id==='publicView')renderPublic();}
document.querySelectorAll('.nav button').forEach(b=>b.addEventListener('click',()=>goView(b.dataset.view)));

function renderDashboard(){
  const s1=seriesStudents('1ª série').length,s2=seriesStudents('2ª série').length;
  const k=[
    ['1ª série',s1+' estudantes','4 salas misturadas'],
    ['2ª série',s2+' estudantes','3 salas misturadas'],
    ['Base atual',(s1+s2)+' estudantes',s1+s2?'Dados importados localmente':'Importe as MDCs em Dados e backup'],
    ['Mapeamento',state.maps?'Pronto':'Ainda não gerado',state.generation?state.generation.examTitle:'Escolha uma aplicação']
  ];
  document.getElementById('kpis').innerHTML=k.map(([a,b,c])=>`<div class="card kpi"><span>${esc(a)}</span><strong>${esc(b)}</strong><span>${esc(c)}</span></div>`).join('');
  const next=CALENDAR.filter(e=>e.date>=TODAY&&e.series!=='3ª série').sort((a,b)=>a.date.localeCompare(b.date)).slice(0,5);
  document.getElementById('nextExams').innerHTML=next.map(e=>`<div style="padding:8px 0;border-bottom:1px solid #edf0f3"><b>${fmtDate(e.date)} • ${esc(e.series)}</b><br><span style="font-size:12px;color:var(--muted)">${esc(e.title)} — ${esc(e.time)}</span></div>`).join('');
}
function renderCalendar(){
  const fs=document.getElementById('calendarSeries').value, fp=document.getElementById('calendarPeriod').value;
  let ev=CALENDAR.filter(e=>(fs==='Todas'||e.series===fs)&&(fp==='all'||e.date>=TODAY));
  ev.sort((a,b)=>a.date.localeCompare(b.date)||a.series.localeCompare(b.series));
  document.getElementById('calendarBody').innerHTML=ev.map(e=>{
    const past=e.date<TODAY, can=e.series!=='3ª série';
    return `<tr class="${e.featured?'featured ':''}${past?'past':''}">
      <td><b>${fmtDate(e.date,e.dateEnd)}</b>${e.featured?'<br><span class="tag red">prioridade atual</span>':''}</td>
      <td><span class="tag">${esc(e.series)}</span></td><td>${esc(e.time)}</td><td><b>${esc(e.title)}</b></td><td>${esc(e.type)}</td>
      <td class="no-print">${can?`<button class="btn small soft" onclick="useExam('${e.id}')">Usar na divisão</button>`:'<span style="color:var(--muted);font-size:11px">calendário apenas</span>'}</td>
    </tr>`}).join('');
}
document.getElementById('calendarSeries').addEventListener('change',renderCalendar);
document.getElementById('calendarPeriod').addEventListener('change',renderCalendar);

function examsForSeries(series){return CALENDAR.filter(e=>e.series===series)}
function updateExamSelect(){
  const series=document.getElementById('genSeries').value, sel=document.getElementById('genExam');
  sel.innerHTML=examsForSeries(series).map(e=>`<option value="${e.id}">${fmtDate(e.date,e.dateEnd)} — ${esc(e.title)}</option>`).join('');
  const featured=examsForSeries(series).find(e=>e.featured);
  if(featured)sel.value=featured.id;
  updateCriteria(true); updateRoomDefaults();
}
function updateCriteria(fromExam=false){
  const series=document.getElementById('genSeries').value, comps=componentsForSeries(series);
  const c1=document.getElementById('criterion1'), c2=document.getElementById('criterion2');
  const options=['<option value="">— nenhum —</option>'].concat(comps.map(c=>`<option>${esc(c)}</option>`)).join('');
  c1.innerHTML=options;c2.innerHTML=options;
  const exam=CALENDAR.find(e=>e.id===document.getElementById('genExam').value);
  let suggested=(exam?.components||[]).filter(c=>comps.includes(c)).slice(0,2);
  if(series==='1ª série' && exam?.id==='1-2026-09-15')suggested=['Física','Literatura'];
  if(series==='2ª série' && exam?.id==='2-2026-09-14')suggested=['História','Literatura'];
  if(!suggested.length)suggested=series==='1ª série'?['Física','Literatura']:['História','Literatura'];
  c1.value=suggested[0]||comps[0]||'';c2.value=suggested[1]||'';
  if(fromExam){
    const d=exam?.date?.replaceAll('-','')||'';
    document.getElementById('genSeed').value=d||Date.now().toString();
  }
}
function useExam(id){
  const e=CALENDAR.find(x=>x.id===id);if(!e||e.series==='3ª série')return;
  goView('generatorView');document.getElementById('genSeries').value=e.series;updateExamSelect();document.getElementById('genExam').value=id;updateCriteria(true);updateRoomDefaults();
}
window.useExam=useExam;
document.getElementById('genSeries').addEventListener('change',updateExamSelect);
document.getElementById('genExam').addEventListener('change',()=>updateCriteria(true));

function updateRoomDefaults(){
  const series=document.getElementById('genSeries').value,n=seriesStudents(series).length;
  const defaultK=series==='1ª série'?4:3;
  document.getElementById('roomCount').value=defaultK;
  buildRoomConfigs(defaultK,n);
}
function buildRoomConfigs(k,n,preserve=false){
  const cont=document.getElementById('roomConfigs');let old=[];
  if(preserve)old=[...cont.querySelectorAll('.room-config')].map(x=>({name:x.querySelector('.rname')?.value,cols:+x.querySelector('.rcols')?.value||4,rows:+x.querySelector('.rrows')?.value||8}));
  const caps=Array.from({length:k},(_,i)=>Math.floor(n/k)+(i<n%k?1:0));
  cont.innerHTML=Array.from({length:k},(_,i)=>{
    const x=old[i]||{}, cols=x.cols||4, rows=x.rows||Math.ceil(caps[i]/cols);
    return `<div class="room-config"><b>Sala ${String(i+1).padStart(2,'0')} • alvo ${caps[i]} estudantes</b><div class="mini">
      <input class="rname" value="${esc(x.name||('SALA '+String(i+1).padStart(2,'0')))}" title="Nome da sala">
      <input class="rcols" type="number" min="2" max="8" value="${cols}" title="Colunas">
      <input class="rrows" type="number" min="2" max="15" value="${rows}" title="Fileiras">
    </div><div style="font-size:10px;color:var(--muted);margin-top:5px">nome • colunas • fileiras</div></div>`;
  }).join('');
}
document.getElementById('roomCount').addEventListener('change',()=>{const k=Math.max(2,Math.min(8,+document.getElementById('roomCount').value||2));buildRoomConfigs(k,seriesStudents(document.getElementById('genSeries').value).length,true)});
document.getElementById('resetRoomsBtn').addEventListener('click',()=>buildRoomConfigs(+document.getElementById('roomCount').value,seriesStudents(document.getElementById('genSeries').value).length,false));

function makeMetrics(students,criteria){
  const globals={};criteria.forEach(c=>globals[c]=mean(students.map(s=>s.scores?.[c]))??50);
  const m=students.map(s=>{const crit={};criteria.forEach(c=>crit[c]=Number.isFinite(s.scores?.[c])?s.scores[c]:globals[c]);return {...s,_crit:crit,_comp:mean(Object.values(crit))??50}});
  const ordered=[...m].sort((a,b)=>b._comp-a._comp);
  const tiers={};ordered.forEach((s,i)=>tiers[s.id]=i<ordered.length/3?'Alta':i<2*ordered.length/3?'Intermediária':'Apoio');
  m.forEach(s=>s._tier=tiers[s.id]);return {students:m,globals,tiers};
}
function assignmentCost(rooms,criteria,globals,targets,metricMap){
  let cost=0;
  rooms.forEach((ids,i)=>{
    const ss=ids.map(id=>metricMap[id]),oc=countBy(ss,s=>s.origin),tc=countBy(ss,s=>s._tier);
    Object.keys(targets[i].origin).forEach(o=>cost+=5*Math.pow((oc[o]||0)-targets[i].origin[o],2));
    Object.keys(targets[i].tier).forEach(t=>cost+=8*Math.pow((tc[t]||0)-targets[i].tier[t],2));
    criteria.forEach(c=>{const mm=mean(ss.map(s=>s._crit[c]));if(mm!=null)cost+=3*Math.pow((mm-globals[c])/2,2)});
  });return cost;
}
