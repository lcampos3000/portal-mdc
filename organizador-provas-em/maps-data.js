function renderMaps(){
  const grid=document.getElementById('mapsGrid'),bal=document.getElementById('balanceGrid');
  if(!state.maps||!state.generation){grid.innerHTML='<div class="notice warn no-print">Gere uma distribuição primeiro.</div>';bal.innerHTML='';return}
  const stu=Object.fromEntries(state.students.map(s=>[s.id,s])),metric=metricMapCurrent(), showOrigin=state.showOriginPrint;
  bal.innerHTML=state.maps.map((r,i)=>{const ids=roomIds(r),ss=ids.map(id=>metric[id]).filter(Boolean),oc=countBy(ss,s=>s.origin),tc=countBy(ss,s=>s._tier),score=balanceScore(r,metric);
    return `<div class="balance-card"><div class="balance-head"><b>${esc(r.name)}</b><span class="balance-score">${score}/100</span></div>
      <div class="mini-bars">${state.generation.criteria.map(c=>`<div class="mini-line"><span>${esc(c)}</span><b>${(mean(ss.map(s=>s._crit[c]))??0).toFixed(1)}%</b></div>`).join('')}
      <div class="mini-line"><span>Faixas</span><b>${tc.Alta||0}/${tc['Intermediária']||0}/${tc.Apoio||0}</b></div>
      <div class="mini-line"><span>Ocupação</span><b>${ids.length}/${r.capacity}</b></div></div></div>`}).join('');
  grid.innerHTML=state.maps.map((r,ri)=>{
    const cols=r.cols||4,selected=state.selectedSeat;
    const seats=(r.seats||[]);
    return `<article class="room-map"><h3>${esc(r.name)}</h3><div class="room-sub">${fmtDate(state.generation.date)} • ${esc(state.generation.examTitle)} • ${roomIds(r).length} estudantes</div>
      <div class="front">QUADRO / FRENTE DA SALA</div>
      <div class="seat-grid" style="grid-template-columns:repeat(${cols},minmax(0,1fr))">${seats.map((id,si)=>{
        const s=id?stu[id]:null,isSel=selected&&selected.r===ri&&selected.s===si;
        return `<div class="seat ${s?'':'empty'} ${isSel?'selected':''}" onclick="seatClick(${ri},${si})" draggable="${s?'true':'false'}" ondragstart="seatDrag(event,${ri},${si})" ondragover="event.preventDefault()" ondrop="seatDrop(event,${ri},${si})">
          <span class="num">${si+1}</span>${s?`<div class="name">${esc(s.name)}</div><div class="origin ${showOrigin?'print-origin':''}">${esc(s.origin)}</div>`:'<div class="name">VAZIA</div>'}</div>`}).join('')}</div>
      <div class="room-foot"><span>Use clique + clique para trocar posições</span><span>${r.cols} colunas × ${r.rows} fileiras</span></div></article>`;
  }).join('');
  applyPrintOrigin();
  renderPublic();
}
function applyPrintOrigin(){
  let style=document.getElementById('originPrintStyle');
  if(!style){style=document.createElement('style');style.id='originPrintStyle';document.head.appendChild(style)}
  style.textContent=state.showOriginPrint?'@media print{.room-map .origin{display:block!important;color:#555!important;font-size:6.5pt!important}}':'';
}
window.seatClick=function(r,s){
  if(!state.maps)return;
  if(!state.selectedSeat){state.selectedSeat={r,s};renderMaps();return}
  const a=state.selectedSeat,b={r,s};state.selectedSeat=null;
  [state.maps[a.r].seats[a.s],state.maps[b.r].seats[b.s]]=[state.maps[b.r].seats[b.s],state.maps[a.r].seats[a.s]];
  save();renderMaps();toast('Posições trocadas.');
}
window.seatDrag=function(ev,r,s){ev.dataTransfer.setData('text/plain',JSON.stringify({r,s}))}
window.seatDrop=function(ev,r,s){ev.preventDefault();try{const a=JSON.parse(ev.dataTransfer.getData('text/plain'));state.selectedSeat=null;[state.maps[a.r].seats[a.s],state.maps[r].seats[s]]=[state.maps[r].seats[s],state.maps[a.r].seats[a.s]];save();renderMaps()}catch(e){}}
document.getElementById('shuffleSeatsBtn').addEventListener('click',()=>{
  if(!state.maps||!state.generation)return toast('Gere uma distribuição primeiro.');
  const metric=metricMapCurrent(),seed=state.generation.seed+'|reshuffle|'+Date.now();
  state.maps.forEach((r,i)=>r.seats=seatStudents(roomIds(r),r.cols,r.rows,metric,rngFrom(seed+'|'+i)));save();renderMaps();toast('Carteiras reorganizadas sem trocar estudantes de sala.');
});
document.getElementById('showOriginPrint').addEventListener('change',e=>{state.showOriginPrint=e.target.checked;save();applyPrintOrigin();renderMaps()});
function printMode(mode){document.body.classList.remove('print-maps','print-public');document.body.classList.add(mode);setTimeout(()=>{window.print();setTimeout(()=>document.body.classList.remove(mode),200)},50)}
document.getElementById('printMapsBtn').addEventListener('click',()=>printMode('print-maps'));
document.getElementById('printPublicBtn').addEventListener('click',()=>printMode('print-public'));

function assignmentRows(){
  if(!state.maps)return[];
  const stu=Object.fromEntries(state.students.map(s=>[s.id,s])),rows=[];
  state.maps.forEach(r=>r.seats.forEach((id,i)=>{if(id&&stu[id])rows.push({name:stu[id].name,origin:stu[id].origin,room:r.name,seat:i+1})}));
  return rows.sort((a,b)=>a.name.localeCompare(b.name,'pt-BR'));
}
function renderPublic(){
  const el=document.getElementById('publicList'),sub=document.getElementById('publicSubtitle');if(!state.maps||!state.generation){el.innerHTML='<div class="notice warn">Gere uma distribuição primeiro.</div>';sub.textContent='';return}
  const q=(document.getElementById('publicSearch')?.value||'').trim().toLocaleUpperCase('pt-BR'),rows=assignmentRows().filter(x=>!q||x.name.toLocaleUpperCase('pt-BR').includes(q));
  sub.textContent=`${fmtDate(state.generation.date)} • ${state.generation.examTitle} • ${state.generation.series}`;
  el.innerHTML=rows.map(x=>`<div class="public-item"><span>${esc(x.name)}</span><b>${esc(x.room)}</b></div>`).join('');
}
document.getElementById('publicSearch').addEventListener('input',renderPublic);
document.getElementById('fullscreenBtn').addEventListener('click',async()=>{const el=document.querySelector('#publicView .public-mode');try{if(!document.fullscreenElement)await el.requestFullscreen();else await document.exitFullscreen()}catch(e){toast('Tela cheia indisponível neste navegador.')}});

function downloadBlob(name,content,type='text/plain;charset=utf-8'){
  const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([content],{type}));a.download=name;document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},1000)
}
document.getElementById('exportCsvBtn').addEventListener('click',()=>{
  if(!state.maps)return toast('Gere uma distribuição primeiro.');
  const rows=assignmentRows(),csv=['Estudante;Turma de origem;Sala;Carteira'].concat(rows.map(x=>[x.name,x.origin,x.room,x.seat].map(v=>`"${String(v).replaceAll('"','""')}"`).join(';'))).join('\n');
  downloadBlob(`distribuicao_${state.generation.series.replaceAll(' ','_')}_${state.generation.date}.csv`,'\ufeff'+csv,'text/csv;charset=utf-8');
});
document.getElementById('downloadMapHtmlBtn').addEventListener('click',()=>{
  if(!state.maps)return toast('Gere uma distribuição primeiro.');
  const clone=document.documentElement.cloneNode(true);clone.querySelectorAll('.side,.top,.no-print').forEach(x=>x.remove());clone.querySelectorAll('.view').forEach(x=>{if(x.id!=='mapsView')x.remove();else x.classList.add('active')});
  const out='<!doctype html>\n'+clone.outerHTML;downloadBlob(`mapas_${state.generation.series.replaceAll(' ','_')}_${state.generation.date}.html`,out,'text/html;charset=utf-8');
});

function renderDataset(){
  const counts=originCounts('1ª série'),counts2=originCounts('2ª série');
  document.getElementById('datasetPills').innerHTML=Object.entries({...counts,...counts2}).map(([k,v])=>`<span class="source-pill">${esc(k)} • ${v} estudantes</span>`).join('');
}
document.getElementById('backupBtn').addEventListener('click',()=>downloadBlob('backup_organizador_provas.json',JSON.stringify(state,null,2),'application/json'));
document.getElementById('restoreFile').addEventListener('change',async e=>{const f=e.target.files[0];if(!f)return;try{const x=JSON.parse(await f.text());if(!x.students)throw new Error();state=x;save();initUI();toast('Backup restaurado.')}catch(err){toast('Backup inválido.')}});
document.getElementById('clearLocalBtn').addEventListener('click',()=>{if(confirm('Restaurar a base original e apagar mapas/ajustes locais?')){state=defaultState();save();initUI();toast('Base original restaurada.')}});

async function inflateRaw(u8){
  if(typeof DecompressionStream==='undefined')throw new Error('Seu navegador não oferece descompactação necessária para XLSX.');
  const ds=new DecompressionStream('deflate-raw'),stream=new Blob([u8]).stream().pipeThrough(ds);return new Uint8Array(await new Response(stream).arrayBuffer());
}
function findEOCD(dv){
  for(let i=dv.byteLength-22;i>=Math.max(0,dv.byteLength-65557);i--)if(dv.getUint32(i,true)===0x06054b50)return i;throw new Error('ZIP inválido');
}
async function unzipXlsx(buffer){
  const dv=new DataView(buffer),u8=new Uint8Array(buffer),eocd=findEOCD(dv),entries=dv.getUint16(eocd+10,true),cdOffset=dv.getUint32(eocd+16,true),dec=new TextDecoder('utf-8'),out={};let p=cdOffset;
  for(let n=0;n<entries;n++){
    if(dv.getUint32(p,true)!==0x02014b50)throw new Error('Diretório ZIP inválido');
    const method=dv.getUint16(p+10,true),comp=dv.getUint32(p+20,true),nameLen=dv.getUint16(p+28,true),extraLen=dv.getUint16(p+30,true),commentLen=dv.getUint16(p+32,true),local=dv.getUint32(p+42,true),name=dec.decode(u8.slice(p+46,p+46+nameLen));
    const lName=dv.getUint16(local+26,true),lExtra=dv.getUint16(local+28,true),start=local+30+lName+lExtra,chunk=u8.slice(start,start+comp);
    if(!name.endsWith('/'))out[name]=method===0?chunk:method===8?await inflateRaw(chunk):null;
    p+=46+nameLen+extraLen+commentLen;
  }return out;
}
function xmlText(u8){return new TextDecoder('utf-8').decode(u8)}
function parseXml(u8){return new DOMParser().parseFromString(xmlText(u8),'application/xml')}
function childText(el,tag){const x=[...el.children].find(c=>c.localName===tag);return x?.textContent??''}
async function parseMdcXlsx(file){
  const files=await unzipXlsx(await file.arrayBuffer());
  if(!files['xl/workbook.xml'])throw new Error('XLSX sem workbook');
  let shared=[];if(files['xl/sharedStrings.xml']){const x=parseXml(files['xl/sharedStrings.xml']);shared=[...x.getElementsByTagNameNS('*','si')].map(si=>[...si.getElementsByTagNameNS('*','t')].map(t=>t.textContent||'').join(''))}
  const wb=parseXml(files['xl/workbook.xml']),rels=parseXml(files['xl/_rels/workbook.xml.rels']),relMap={};
  [...rels.getElementsByTagNameNS('*','Relationship')].forEach(r=>relMap[r.getAttribute('Id')]=r.getAttribute('Target'));
  const sheet=[...wb.getElementsByTagNameNS('*','sheet')][0],rid=sheet.getAttributeNS('http://schemas.openxmlformats.org/officeDocument/2006/relationships','id')||sheet.getAttribute('r:id'),target=relMap[rid];
  const sheetPath=target.startsWith('/')?target.slice(1):'xl/'+target.replace(/^\/+/,'');
  const sx=parseXml(files[sheetPath]),rows=[];
  [...sx.getElementsByTagNameNS('*','row')].forEach(re=>{
    const row=[];let current=0;[...re.children].filter(c=>c.localName==='c').forEach(c=>{
      const ref=c.getAttribute('r');let col=current+1;if(ref){const m=ref.match(/^([A-Z]+)/);if(m){col=0;for(const ch of m[1])col=col*26+ch.charCodeAt(0)-64}}
      while(row.length<col-1)row.push('');
      const t=c.getAttribute('t');let val='';
      if(t==='inlineStr')val=[...c.getElementsByTagNameNS('*','t')].map(x=>x.textContent||'').join('');
      else{const v=[...c.children].find(x=>x.localName==='v')?.textContent??'';if(t==='s')val=shared[+v]??'';else if(v!==''&&!isNaN(+v))val=+v;else val=v}
      row.push(val);current=col;
    });rows.push(row);
  });
  if(rows.length<3)throw new Error('Estrutura MDC não reconhecida');
  const h1=rows[0],h2=rows[1],scoreCols={};
  for(let i=1;i<Math.min(h1.length,h2.length);i++)if(String(h2[i]).trim()==='% Desempenho')scoreCols[normalizeComponent(h1[i])]=i;
  let code='';for(const r of rows){for(const v of r){const m=String(v).match(/Turma\s+é\s+(M[12]C[ABCD]M)/i);if(m)code=m[1].toUpperCase()}}
  let sm=file.name.match(/([12])\s*[ªºa]?\s*s[eé]rie\s*([ABCD])/i),series='',origin='';
  if(sm){series=sm[1]==='1'?'1ª série':'2ª série';origin=`${sm[1]}ª ${sm[2].toUpperCase()}`}
  if(!series&&code){const m=code.match(/^M([12])C([ABCD])M$/);if(m){series=m[1]==='1'?'1ª série':'2ª série';origin=`${m[1]}ª ${m[2]}`}}
  if(!series){const ans=prompt(`Não consegui identificar a turma de "${file.name}". Digite 1A, 1B, 1C, 1D, 2A, 2B ou 2C:`)||'';const m=ans.trim().match(/^([12])\s*([ABCD])$/i);if(!m)throw new Error('Turma não informada');series=m[1]==='1'?'1ª série':'2ª série';origin=`${m[1]}ª ${m[2].toUpperCase()}`}
  const students=[];
  rows.slice(2).forEach(r=>{const name=String(r[0]??'').trim();if(!name||name.startsWith('Filtros aplicados'))return;const scores={};Object.entries(scoreCols).forEach(([c,i])=>{const v=r[i];if(typeof v==='number'&&Number.isFinite(v))scores[c]=Math.round(v*100000)/1000});students.push({id:`${origin}|${name}`,name,series,origin,scores})});
  return {series,origin,students};
}
document.getElementById('importMdcBtn').addEventListener('click',async()=>{
  const files=[...document.getElementById('mdcFiles').files];if(!files.length)return toast('Selecione pelo menos uma planilha.');
  let done=0;
  try{
    for(const f of files){const x=await parseMdcXlsx(f);state.students=state.students.filter(s=>s.origin!==x.origin).concat(x.students);done++}
    state.generation=null;state.maps=null;state.roomSetup=null;save();initUI();toast(`${done} turma(s) atualizada(s). Gere uma nova distribuição.`);
  }catch(e){console.error(e);toast('Falha na importação: '+e.message)}
});

function initUI(){
  document.getElementById('showOriginPrint').checked=!!state.showOriginPrint;
  renderDashboard();renderCalendar();renderDataset();updateExamSelect();renderGenerationAudit();renderMaps();renderPublic();
}
initUI();
