function generateBalanced(){
  const series=document.getElementById('genSeries').value;
  const exam=CALENDAR.find(e=>e.id===document.getElementById('genExam').value);
  const criteria=[document.getElementById('criterion1').value,document.getElementById('criterion2').value].filter(Boolean);
  if(!criteria.length){toast('Escolha pelo menos um critério de desempenho.');return}
  const base=seriesStudents(series);if(!base.length){toast('Não há estudantes na base desta série.');return}
  const k=Math.max(2,Math.min(8,+document.getElementById('roomCount').value||2));
  const configs=[...document.querySelectorAll('.room-config')].slice(0,k).map((x,i)=>({name:x.querySelector('.rname').value.trim()||`SALA ${i+1}`,cols:+x.querySelector('.rcols').value||4,rows:+x.querySelector('.rrows').value||8}));
  const capacityTargets=Array.from({length:k},(_,i)=>Math.floor(base.length/k)+(i<base.length%k?1:0));
  configs.forEach((c,i)=>{const minSeats=capacityTargets[i];if(c.cols*c.rows<minSeats)c.rows=Math.ceil(minSeats/c.cols)});
  const seed=document.getElementById('genSeed').value||Date.now().toString(),rng=rngFrom(seed);
  const mm=makeMetrics(base,criteria),metricMap=Object.fromEntries(mm.students.map(s=>[s.id,s]));
  const origins=[...new Set(base.map(s=>s.origin))].sort(),tierNames=['Alta','Intermediária','Apoio'];
  const totalO=countBy(mm.students,s=>s.origin), totalT=countBy(mm.students,s=>s._tier), n=base.length;
  const targets=capacityTargets.map(cap=>({origin:Object.fromEntries(origins.map(o=>[o,totalO[o]*cap/n])),tier:Object.fromEntries(tierNames.map(t=>[t,totalT[t]*cap/n]))}));
  let rooms=Array.from({length:k},()=>[]);
  const pools={};tierNames.forEach(t=>{let a=mm.students.filter(s=>s._tier===t).sort((a,b)=>b._comp-a._comp);for(let i=0;i<a.length;i+=k){const chunk=a.slice(i,i+k);chunk.sort(()=>rng()-.5);a.splice(i,chunk.length,...chunk)}pools[t]=a});
  const order=[];while(tierNames.some(t=>pools[t].length)){tierNames.forEach(t=>{if(pools[t].length)order.push(pools[t].shift())})}
  function incCost(i,s){
    if(rooms[i].length>=capacityTargets[i])return 1e12;
    const temp=[...rooms[i],s.id].map(id=>metricMap[id]),m=temp.length,frac=m/capacityTargets[i],oc=countBy(temp,x=>x.origin),tc=countBy(temp,x=>x._tier);
    let c=0;origins.forEach(o=>c+=5*Math.pow((oc[o]||0)-targets[i].origin[o]*frac,2));tierNames.forEach(t=>c+=7*Math.pow((tc[t]||0)-targets[i].tier[t]*frac,2));
    criteria.forEach(cr=>{const sm=temp.reduce((a,x)=>a+x._crit[cr],0),exp=mm.globals[cr]*m;c+=.0008*Math.pow(sm-exp,2)});
    return c+rng()*.001;
  }
  order.forEach(s=>{let best=0,bestC=Infinity;for(let i=0;i<k;i++){const c=incCost(i,s);if(c<bestC){bestC=c;best=i}}rooms[best].push(s.id)});
  let best=assignmentCost(rooms,criteria,mm.globals,targets,metricMap);
  for(let it=0;it<10000;it++){
    let a=Math.floor(rng()*k),b=Math.floor(rng()*k);if(a===b||!rooms[a].length||!rooms[b].length)continue;
    const ia=Math.floor(rng()*rooms[a].length),ib=Math.floor(rng()*rooms[b].length);
    [rooms[a][ia],rooms[b][ib]]=[rooms[b][ib],rooms[a][ia]];
    const c=assignmentCost(rooms,criteria,mm.globals,targets,metricMap);
    if(c<=best||rng()<0.00012)best=c;else [rooms[a][ia],rooms[b][ib]]=[rooms[b][ib],rooms[a][ia]];
  }
  const roomObjs=rooms.map((ids,i)=>({name:configs[i].name,capacity:capacityTargets[i],cols:configs[i].cols,rows:configs[i].rows,studentIds:ids}));
  state.generation={series,examId:exam?.id||'',examTitle:exam?.title||'Aplicação',date:exam?.date||'',time:exam?.time||'',criteria,seed,globals:mm.globals,metrics:Object.fromEntries(mm.students.map(s=>[s.id,{comp:s._comp,tier:s._tier,crit:s._crit}]))};
  state.roomSetup=roomObjs.map(r=>({name:r.name,capacity:r.capacity,cols:r.cols,rows:r.rows}));
  state.maps=roomObjs.map((r,i)=>({...r,seats:seatStudents(r.studentIds,r.cols,r.rows,metricMap,rngFrom(seed+'|seat|'+i))}));
  state.selectedSeat=null;save();renderGenerationAudit();renderDashboard();renderMaps();toast('Distribuição equilibrada gerada.');
}
function seatingPenalty(seats,idx,metricMap,cols){
  const id=seats[idx];if(!id)return 0;const s=metricMap[id];let p=0,row=Math.floor(idx/cols),col=idx%cols;
  [[0,-1],[-1,0],[-1,-1],[-1,1]].forEach(([dr,dc],j)=>{const r=row+dr,c=col+dc;if(r<0||c<0||c>=cols)return;const ni=r*cols+c,nid=seats[ni];if(!nid)return;const n=metricMap[nid];if(n.origin===s.origin)p+=j<2?30:8;if(n._tier==='Alta'&&s._tier==='Alta')p+=j<2?4:1});
  return p;
}
function totalSeatPenalty(seats,metricMap,cols){return seats.reduce((a,_,i)=>a+seatingPenalty(seats,i,metricMap,cols),0)}
function seatStudents(ids,cols,rows,metricMap,rng){
  const size=cols*rows,remaining=[...ids],seats=Array(size).fill(null);
  for(let idx=0;idx<size&&remaining.length;idx++){
    let bestJ=0,best=Infinity;
    for(let j=0;j<remaining.length;j++){seats[idx]=remaining[j];const p=seatingPenalty(seats,idx,metricMap,cols)+rng();seats[idx]=null;if(p<best){best=p;bestJ=j}}
    seats[idx]=remaining.splice(bestJ,1)[0];
  }
  let best=totalSeatPenalty(seats,metricMap,cols);
  for(let it=0;it<2500;it++){const a=Math.floor(rng()*size),b=Math.floor(rng()*size);if(a===b)continue;[seats[a],seats[b]]=[seats[b],seats[a]];const p=totalSeatPenalty(seats,metricMap,cols);if(p<=best)best=p;else [seats[a],seats[b]]=[seats[b],seats[a]]}
  return seats;
}
function metricMapCurrent(){
  if(!state.generation)return {};
  const students=seriesStudents(state.generation.series), mm=makeMetrics(students,state.generation.criteria);
  return Object.fromEntries(mm.students.map(s=>[s.id,s]));
}
function roomIds(room){return (room.seats||[]).filter(Boolean)}
function renderGenerationAudit(){
  const el=document.getElementById('generationAudit');if(!state.generation||!state.maps){el.innerHTML='<div class="notice warn">Ainda não há uma distribuição gerada.</div>';return}
  const g=state.generation, metric=metricMapCurrent();
  const rows=state.maps.map((r,i)=>{const ss=roomIds(r).map(id=>metric[id]).filter(Boolean),oc=countBy(ss,s=>s.origin),tc=countBy(ss,s=>s._tier);
    return `<tr><td><b>${esc(r.name)}</b></td><td>${ss.length}/${r.capacity}</td><td>${g.criteria.map(c=>`${esc(c)} ${mean(ss.map(s=>s._crit[c])).toFixed(1)}%`).join(' • ')}</td><td>${Object.entries(oc).map(([o,n])=>`${esc(o)}: ${n}`).join(' • ')}</td><td>${`Alta ${tc.Alta||0} • Interm. ${tc['Intermediária']||0} • Apoio ${tc.Apoio||0}`}</td></tr>`}).join('');
  el.innerHTML=`<div class="notice"><b>${esc(g.series)} • ${fmtDate(g.date)} • ${esc(g.examTitle)}</b><br>Critérios: ${g.criteria.map(esc).join(' + ')} • semente ${esc(g.seed)}</div>
  <div class="table-wrap"><table><thead><tr><th>Sala</th><th>Ocupação</th><th>Médias</th><th>Turmas de origem</th><th>Faixas</th></tr></thead><tbody>${rows}</tbody></table></div>`;
}
document.getElementById('generateBtn').addEventListener('click',generateBalanced);
document.getElementById('goMapsBtn').addEventListener('click',()=>goView('mapsView'));

function balanceScore(room,metric){
  const ids=roomIds(room),ss=ids.map(id=>metric[id]).filter(Boolean);if(!ss.length||!state.generation)return 0;
  const g=state.generation,all=seriesStudents(g.series),origins=[...new Set(all.map(s=>s.origin))],allO=countBy(all,s=>s.origin),tc=countBy(ss,s=>s._tier),allMetric=Object.values(metric),allT=countBy(allMetric,s=>s._tier);
  let penalty=Math.abs(ids.length-room.capacity)*8;
  g.criteria.forEach(c=>penalty+=Math.abs((mean(ss.map(s=>s._crit[c]))??0)-g.globals[c])*2.8);
  origins.forEach(o=>penalty+=Math.abs((countBy(ss,s=>s.origin)[o]||0)-allO[o]*room.capacity/all.length)*2.2);
  ['Alta','Intermediária','Apoio'].forEach(t=>penalty+=Math.abs((tc[t]||0)-allT[t]*room.capacity/all.length)*2.4);
  return Math.max(0,Math.round(100-penalty));
}
