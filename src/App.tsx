// @ts-nocheck
import React, { useState, useCallback, useRef, useMemo, useEffect } from "react";
const genId = () => Math.random().toString(36).slice(2, 10);
const COLORS = ["#ef4444","#f59e0b","#10b981","#3b82f6","#8b5cf6","#ec4899","#0ea5e9","#64748b","#dc2626","#d97706","#059669","#2563eb"];
const GRUPOS = ["A","B","C","D"];
const GRUPO_COLORS = { A:"#1e3a8a", B:"#d97706", C:"#059669", D:"#9333ea" };
const LOGO_LIGA = "data:image/jpeg;base64,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";
const LOGO_ARAGUA = "data:image/jpeg;base64,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";
const LOGO_FVB = "data:image/jpeg;base64,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";
const LOGO_FIBA = "data:image/jpeg;base64,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";
const LOGO_TORNEO = "data:image/jpeg;base64,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";


const F = { bar: "'Barlow Condensed', sans-serif", out: "'Outfit', sans-serif" };
// Text contrast: returns white or dark based on bg luminance
const txtC=(hex)=>{const c=hex.replace('#','');const r=parseInt(c.substr(0,2),16),g=parseInt(c.substr(2,2),16),b=parseInt(c.substr(4,2),16);return(r*299+g*587+b*114)/1000>140?"#1e293b":"#ffffff";};
// TeamBadge: shows logo or initials with correct contrast
function TB({team,size=34,fontSize="0.6rem",border}){
  if(team?.logo)return <img src={team.logo} alt="" style={{width:size,height:size,borderRadius:"50%",objectFit:"cover",flexShrink:0,border:border||`2px solid ${team.color||"#64748b"}`}}/>;
  return <div style={{width:size,height:size,borderRadius:"50%",background:team?.color||"#64748b",display:"flex",alignItems:"center",justifyContent:"center",color:txtC(team?.color||"#64748b"),fontWeight:900,fontSize,flexShrink:0,border:border||"none",textShadow:"0 1px 2px rgba(0,0,0,0.3)"}}>{(team?.nombre||"??").slice(0,2)}</div>;
}

// ═══════════════════════════════════════════════
// FIBA 3x3 APPENDIX D — CLASSIFICATION (2026)
// 1. Most wins
// 2. H2H win/loss (within pool only)
// 3. Most points scored in average (cap 21/game, no forfeits)
// 4. Seeding (maintain order)
// ═══════════════════════════════════════════════
const calcH2HWins = (tid, opps, fin) => {
  let w=0,l=0;
  fin.filter(m=>(m.localId===tid&&opps.includes(m.visitId))||(m.visitId===tid&&opps.includes(m.localId))).forEach(m=>{
    const eL=m.localId===tid; const mi=eL?(m.marcadorL||0):(m.marcadorV||0); const su=eL?(m.marcadorV||0):(m.marcadorL||0);
    if(mi>su)w++; else l++;
  });
  return {w,l};
};
const calcPPG = (tid, fin) => {
  const games=fin.filter(m=>m.localId===tid||m.visitId===tid);
  if(!games.length) return 0;
  let total=0;
  games.forEach(m=>{const eL=m.localId===tid; const pf=eL?(m.marcadorL||0):(m.marcadorV||0); total+=Math.min(pf,21);});
  return total/games.length;
};
const resolverEmpate3x3 = (emp, fin) => {
  if(emp.length<=1) return emp;
  const ids=emp.map(e=>e.id);
  // Step 2: H2H win/loss
  const h2h={};emp.forEach(e=>{h2h[e.id]=calcH2HWins(e.id,ids.filter(x=>x!==e.id),fin);});
  const byH2H=[...emp].sort((a,b)=>h2h[b.id].w-h2h[a.id].w);
  const res=[];let i=0;
  while(i<byH2H.length){let j=i+1;while(j<byH2H.length&&h2h[byH2H[j].id].w===h2h[byH2H[i].id].w)j++;
    const sub=byH2H.slice(i,j);
    if(sub.length>1){
      // Step 3: PPG avg (cap 21)
      const ppg={};sub.forEach(e=>{ppg[e.id]=calcPPG(e.id,fin);});
      sub.sort((a,b)=>ppg[b.id]-ppg[a.id]);
    }
    res.push(...sub);i=j;
  }
  return res;
};
const sortFIBA3x3=(equipos,fin)=>{
  // Step 1: Most wins
  const byWins=[...equipos].sort((a,b)=>b.jg-a.jg);
  const r=[];let i=0;
  while(i<byWins.length){let j=i+1;while(j<byWins.length&&byWins[j].jg===byWins[i].jg)j++;
    r.push(...resolverEmpate3x3(byWins.slice(i,j),fin));i=j;
  }
  return r;
};
const calcForma=(tid,fin,n=5)=>{const r=fin.filter(m=>m.localId===tid||m.visitId===tid).sort((a,b)=>(a.fecha||'').localeCompare(b.fecha||''));return r.slice(-n).map(m=>{const eL=m.localId===tid;const mi=eL?(m.marcadorL||0):(m.marcadorV||0);const su=eL?(m.marcadorV||0):(m.marcadorL||0);return mi>su?'G':'P';});};

// Round-robin calendar generator
const genRoundRobin=(teamIds)=>{
  const n=teamIds.length; if(n<2) return [];
  const ids=[...teamIds]; if(n%2!==0) ids.push(null);
  const rounds=[]; const half=ids.length/2;
  for(let r=0;r<ids.length-1;r++){
    const round=[];
    for(let i=0;i<half;i++){
      const a=ids[i],b=ids[ids.length-1-i];
      if(a&&b) round.push({localId:a,visitId:b});
    }
    rounds.push(round);
    ids.splice(1,0,ids.pop());
  }
  return rounds;
};


// ═══════════════ LOCALSTORAGE PERSISTENCE ═══════════════
const LS_KEY = "torneo3x3_v2";
const lsGet = (key, def) => { try { const d = localStorage.getItem(`${LS_KEY}_${key}`); return d ? JSON.parse(d) : def; } catch { return def; } };
const lsSet = (key, val) => { try { localStorage.setItem(`${LS_KEY}_${key}`, JSON.stringify(val)); } catch(e) { console.warn("localStorage full", e); } };

// ═══════════════ MAIN APP ═══════════════
export default function Torneo3x3() {
  const [genero, setGenero] = useState(null);
  const [view, setView] = useState("menu");
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const handler = e => { e.preventDefault(); setDeferredPrompt(e); };
    window.addEventListener('beforeinstallprompt', handler);
    if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone) setIsInstalled(true);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const result = await deferredPrompt.userChoice;
    if (result.outcome === 'accepted') setIsInstalled(true);
    setDeferredPrompt(null);
  };
  const [allTeams, setAllTeams] = useState(() => lsGet("teams", []));
  const [allPlayers, setAllPlayers] = useState(() => lsGet("players", []));
  const [allMatches, setAllMatches] = useState(() => lsGet("matches", []));
  const [allStats, setAllStats] = useState(() => lsGet("stats", []));
  const [allJugadas, setAllJugadas] = useState(() => lsGet("jugadas", []));
  const [mesaMatch, setMesaMatch] = useState(null);
  const [mesaStep, setMesaStep] = useState("select");
  const [toast, setToast] = useState(null);
  const toastRef = useRef(null);
  const showToast = useCallback((msg, color = "#10b981") => { if (toastRef.current) clearTimeout(toastRef.current); setToast({ msg, color }); toastRef.current = setTimeout(() => setToast(null), 1800); }, []);

  // Auto-save to localStorage
  useEffect(() => { lsSet("teams", allTeams); }, [allTeams]);
  useEffect(() => { lsSet("players", allPlayers); }, [allPlayers]);
  useEffect(() => { lsSet("matches", allMatches); }, [allMatches]);
  useEffect(() => { lsSet("stats", allStats); }, [allStats]);
  useEffect(() => { lsSet("jugadas", allJugadas); }, [allJugadas]);

  const teams = allTeams.filter(t => t.genero === genero);
  const players = allPlayers.filter(p => { const t = allTeams.find(x => x.id === p.equipoId); return t?.genero === genero; });
  const matches = allMatches.filter(m => m.genero === genero);
  const finMatches = useMemo(() => matches.filter(m => m.estatus === "finalizado"), [matches]);
  const statsPartido = allStats.filter(s => { const m = allMatches.find(x => x.id === s.matchId); return m?.genero === genero; });

  const setTeams = fn => setAllTeams(prev => { const o = prev.filter(t => t.genero !== genero); const c = prev.filter(t => t.genero === genero); return [...o, ...(typeof fn==='function'?fn(c):fn)]; });

  // Auto-generate calendar for a group
  const generarCalendario = useCallback((grupo) => {
    const gt = allTeams.filter(t => t.genero === genero && t.grupo === grupo);
    if (gt.length < 2) return;
    // Remove existing programados for this group+genero
    setAllMatches(prev => {
      const existing = prev.filter(m => {
        if (m.genero !== genero || m.estatus !== "programado") return true;
        const lT = allTeams.find(t => t.id === m.localId);
        const vT = allTeams.find(t => t.id === m.visitId);
        return !(lT?.grupo === grupo && vT?.grupo === grupo);
      });
      const rounds = genRoundRobin(gt.map(t => t.id));
      const newMatches = [];
      rounds.forEach((round, ri) => {
        round.forEach(pair => {
          // Don't add if match already exists (programado or finalizado)
          const exists = existing.some(m => m.genero === genero &&
            ((m.localId===pair.localId&&m.visitId===pair.visitId)||(m.localId===pair.visitId&&m.visitId===pair.localId)));
          if (!exists) newMatches.push({ id: genId(), localId: pair.localId, visitId: pair.visitId, marcadorL: 0, marcadorV: 0, estatus: "programado", fecha: "", jornada: ri + 1, genero });
        });
      });
      return [...existing, ...newMatches];
    });
    showToast(`📅 Calendario Grupo ${grupo} generado`);
  }, [allTeams, genero, showToast]);

  const handleStat = useCallback((jugador, equipo, pts) => {
    if (!mesaMatch) return;
    setAllStats(prev => { const k=`${mesaMatch.id}_${jugador.id}`; const ex=prev.find(s=>s.id===k); if(ex)return prev.map(s=>s.id===k?{...s,puntos:(s.puntos||0)+pts,[pts===1?'p1':'p2']:(s[pts===1?'p1':'p2']||0)+1}:s); return [...prev,{id:k,matchId:mesaMatch.id,jugadorId:jugador.id,jugadorNombre:jugador.nombre,jugadorNumero:jugador.numero,equipo,puntos:pts,p1:pts===1?1:0,p2:pts===2?1:0}]; });
    setAllJugadas(prev => [{id:genId(),matchId:mesaMatch.id,jugadorId:jugador.id,jugadorNombre:jugador.nombre,jugadorNumero:jugador.numero,equipo,puntos:pts,timestamp:Date.now()},...prev]);
    setAllMatches(prev => prev.map(m=>m.id===mesaMatch.id?{...m,marcadorL:equipo==="local"?(m.marcadorL||0)+pts:m.marcadorL,marcadorV:equipo==="visit"?(m.marcadorV||0)+pts:m.marcadorV}:m));
    showToast(`${jugador.nombre.split(" ")[0]} — ${pts===1?"🏀 +1":"🔥 +2"}`, "#3b82f6");
  }, [mesaMatch, showToast]);

  // Delete ANY play (not just last)
  const handleDeletePlay = useCallback((jugada) => {
    if (!jugada) return;
    setAllJugadas(prev => prev.filter(j => j.id !== jugada.id));
    setAllStats(prev => prev.map(s => { if(s.id!==`${jugada.matchId}_${jugada.jugadorId}`)return s; return {...s,puntos:Math.max(0,(s.puntos||0)-jugada.puntos),[jugada.puntos===1?'p1':'p2']:Math.max(0,(s[jugada.puntos===1?'p1':'p2']||0)-1)}; }).filter(s => (s.puntos||0)>0));
    setAllMatches(prev => prev.map(m => m.id===jugada.matchId?{...m,marcadorL:jugada.equipo==="local"?Math.max(0,(m.marcadorL||0)-jugada.puntos):m.marcadorL,marcadorV:jugada.equipo==="visit"?Math.max(0,(m.marcadorV||0)-jugada.puntos):m.marcadorV}:m));
    showToast("🗑️ Jugada eliminada", "#ef4444");
  }, [showToast]);

  const finalizarPartido = useCallback(() => { if(!mesaMatch)return; setAllMatches(prev=>prev.map(m=>m.id===mesaMatch.id?{...m,estatus:"finalizado"}:m)); setMesaMatch(null);setMesaStep("select"); showToast("✅ Partido finalizado"); }, [mesaMatch, showToast]);
  const crearPartido = useCallback((lid,vid,fase) => { const m={id:genId(),localId:lid,visitId:vid,marcadorL:0,marcadorV:0,estatus:"programado",fecha:new Date().toISOString().split("T")[0],genero,fase:fase||null}; setAllMatches(prev=>[...prev,m]);setMesaMatch(m);setMesaStep("active"); }, [genero]);
  const iniciarPartido = useCallback((match) => { setMesaMatch(match); setMesaStep("active"); }, []);

  const calcStandings = useCallback(grupo => {
    const gt=teams.filter(t=>t.grupo===grupo); const fin=finMatches;
    const enriched=gt.map(team=>{
      let jj=0,jg=0,jp=0,pf=0,pc=0;
      fin.forEach(m=>{const eL=m.localId===team.id;const eV=m.visitId===team.id;if(!eL&&!eV)return;jj++;
        const mi=eL?(m.marcadorL||0):(m.marcadorV||0);const su=eL?(m.marcadorV||0):(m.marcadorL||0);
        pf+=mi;pc+=su;if(mi>su)jg++;else jp++;
      });
      const ppg=jj>0?pf/jj:0;
      return{...team,jj,jg,jp,pf,pc,dif:pf-pc,ppg:ppg.toFixed(1),forma:calcForma(team.id,fin)};
    });
    return sortFIBA3x3(enriched,fin);
  }, [teams, finMatches]);

  const calcLeaders = useCallback(() => {
    const finIds=new Set(finMatches.map(m=>m.id)); const sf=statsPartido.filter(s=>finIds.has(s.matchId)); const agg={};
    sf.forEach(s=>{if(!agg[s.jugadorId]){const pl=allPlayers.find(p=>p.id===s.jugadorId);const tm=allTeams.find(t=>t.id===pl?.equipoId);agg[s.jugadorId]={jugadorId:s.jugadorId,nombre:s.jugadorNombre,numero:s.jugadorNumero,equipo:tm?.nombre||"",equipoColor:tm?.color||"#64748b",puntos:0,partidos:0};}agg[s.jugadorId].puntos+=s.puntos||0;agg[s.jugadorId].partidos+=1;});
    return Object.values(agg).sort((a,b)=>b.puntos-a.puntos);
  }, [finMatches, statsPartido, allTeams, allPlayers]);

  const genLabel=genero==="M"?"MASCULINO":"FEMENINO"; const genColor=genero==="M"?"#1e3a8a":"#db2777";

  return (
    <div style={S.app}>
      <link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800;900&family=Outfit:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      {toast&&<div style={{...S.toast,background:toast.color}}>{toast.msg}</div>}
      {genero===null&&<GenderSelect onSelect={g=>{setGenero(g);setView("menu");}} allTeams={allTeams} allMatches={allMatches} onReset={()=>{if(!window.confirm("⚠️ ¿BORRAR TODOS LOS DATOS?\nEquipos, jugadores, partidos, estadísticas...\nEsta acción no se puede deshacer."))return;setAllTeams([]);setAllPlayers([]);setAllMatches([]);setAllStats([]);setAllJugadas([]);try{Object.keys(localStorage).filter(k=>k.startsWith(LS_KEY)).forEach(k=>localStorage.removeItem(k));}catch(e){}showToast("🗑️ Datos borrados","#ef4444");}} canInstall={!!deferredPrompt&&!isInstalled} onInstall={handleInstall} />}
      {genero!==null&&view==="menu"&&<MenuView teams={teams} players={players} matches={matches} onNav={setView} genLabel={genLabel} genColor={genColor} onBackGender={()=>setGenero(null)} onNuclear={()=>{if(!window.confirm("☢️ ¿BORRAR ABSOLUTAMENTE TODO?\n\nEquipos, jugadores, logos, partidos,\nestadísticas, calendario, playoff...\n\n⚠️ AMBAS CATEGORÍAS (M y F)\n\nEsta acción NO se puede deshacer."))return;if(!window.confirm("🔴 ÚLTIMA CONFIRMACIÓN\n\n¿Estás SEGURO? Se perderá TODO."))return;setAllTeams([]);setAllPlayers([]);setAllMatches([]);setAllStats([]);setAllJugadas([]);setGenero(null);setView("menu");try{Object.keys(localStorage).filter(k=>k.startsWith(LS_KEY)).forEach(k=>localStorage.removeItem(k));}catch(e){}showToast("☢️ TODO BORRADO","#ef4444");}} />}
      {genero!==null&&view==="admin"&&<AdminView teams={teams} setTeams={setTeams} players={players} allPlayers={allPlayers} setAllPlayers={setAllPlayers} onBack={()=>setView("menu")} showToast={showToast} genero={genero} genLabel={genLabel} genColor={genColor} />}
      {genero!==null&&view==="calendar"&&<CalendarView teams={teams} matches={matches} allTeams={allTeams} onGenerarCalendario={generarCalendario} onIniciarPartido={iniciarPartido} setMesaStep={setMesaStep} onNav={setView} onBack={()=>setView("menu")} genLabel={genLabel} genColor={genColor} />}
      {genero!==null&&view==="standings"&&<StandingsView calcStandings={calcStandings} onBack={()=>setView("menu")} genLabel={genLabel} genColor={genColor} teams={teams} />}
      {genero!==null&&view==="mesa"&&<MesaView step={mesaStep} teams={teams} players={players} mesaMatch={mesaMatch} matches={matches} statsPartido={statsPartido} allJugadas={allJugadas} onCrearPartido={crearPartido} onStat={handleStat} onDeletePlay={handleDeletePlay} onFinalizar={finalizarPartido} onBack={()=>setView("menu")} setMesaStep={setMesaStep} setMesaMatch={setMesaMatch} genColor={genColor} />}
      {genero!==null&&view==="leaders"&&<LeadersView leaders={calcLeaders()} onBack={()=>setView("menu")} genLabel={genLabel} genColor={genColor} />}
      {genero!==null&&view==="playoff"&&<PlayoffView teams={teams} matches={matches} allTeams={allTeams} calcStandings={calcStandings} onCrearPartido={crearPartido} onIniciarPartido={iniciarPartido} setMesaStep={setMesaStep} onNav={setView} onBack={()=>setView("menu")} genLabel={genLabel} genColor={genColor} genero={genero} />}
      {genero!==null&&view==="arbitros"&&<ArbitrosView teams={teams} finMatches={finMatches} allTeams={allTeams} onBack={()=>setView("menu")} genLabel={genLabel} genColor={genColor} />}
    </div>
  );
}

// ═══════════════ GENDER ═══════════════
function GenderSelect({onSelect,allTeams,allMatches,onReset,canInstall,onInstall}){const mT=allTeams.filter(t=>t.genero==="M").length,fT=allTeams.filter(t=>t.genero==="F").length;const mG=allMatches.filter(m=>m.genero==="M"&&m.estatus==="finalizado").length,fG=allMatches.filter(m=>m.genero==="F"&&m.estatus==="finalizado").length;const total=allTeams.length;const[h,setH]=useState(null);return(<div style={S.menuWrap}><div style={S.menuDots}/><div style={{textAlign:"center",marginBottom:16,position:"relative",zIndex:1}}><div style={{display:"flex",justifyContent:"center",alignItems:"center",marginBottom:16}}><img src={LOGO_TORNEO} alt="3x3 Aragua" style={{width:140,height:140,objectFit:"contain",borderRadius:18,boxShadow:"0 8px 30px rgba(0,0,0,0.4)"}}/></div><h1 style={S.menuTitle}>TORNEO 3×3</h1><p style={S.menuSub}>Asociación de Baloncesto de Aragua · 2026</p><div style={{marginTop:6,display:"flex",justifyContent:"center",alignItems:"center",gap:8}}><img src={LOGO_FVB} alt="FVB" style={{width:24,height:24,borderRadius:"50%",objectFit:"cover",border:"1.5px solid rgba(255,255,255,0.2)"}}/><span style={{fontSize:"0.42rem",color:"rgba(255,255,255,0.3)",fontFamily:F.bar,letterSpacing:1}}>FVB · FIBA 3x3</span></div></div><div style={{marginTop:8,marginBottom:10,textAlign:"center",position:"relative",zIndex:1}}><p style={{fontFamily:F.bar,fontWeight:700,fontSize:"0.75rem",color:"rgba(255,255,255,0.5)",letterSpacing:2,textTransform:"uppercase"}}>Selecciona categoría</p>{total>0&&<p style={{fontSize:"0.44rem",color:"rgba(255,255,255,0.25)",marginTop:2}}>💾 {total} equipos guardados en este dispositivo</p>}</div><div style={{display:"flex",gap:14,width:"100%",maxWidth:400,position:"relative",zIndex:1}}>{[{g:"M",icon:"♂",label:"MASCULINO",color:"#1e3a8a",accent:"#3b82f6",teams:mT,games:mG},{g:"F",icon:"♀",label:"FEMENINO",color:"#9d174d",accent:"#ec4899",teams:fT,games:fG}].map(it=>(<button key={it.g} onClick={()=>onSelect(it.g)} onMouseEnter={()=>setH(it.g)} onMouseLeave={()=>setH(null)} style={{flex:1,padding:"28px 14px",borderRadius:18,border:`2px solid ${h===it.g?it.accent:it.color+"88"}`,background:h===it.g?`linear-gradient(160deg,${it.color},${it.accent})`:"rgba(255,255,255,0.04)",color:"white",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:6,transition:"all 0.25s",transform:h===it.g?"translateY(-3px) scale(1.02)":"none",boxShadow:h===it.g?`0 10px 30px ${it.accent}55`:"none"}}><span style={{fontSize:"2.2rem"}}>{it.icon}</span><span style={{fontFamily:F.bar,fontWeight:900,fontSize:"1.1rem",letterSpacing:2}}>{it.label}</span><span style={{fontSize:"0.5rem",opacity:0.6}}>{it.teams} equipos · {it.games} partidos</span></button>))}</div>{canInstall&&<button onClick={onInstall} style={{marginTop:20,background:"linear-gradient(135deg,#059669,#10b981)",border:"none",color:"white",padding:"10px 24px",borderRadius:12,cursor:"pointer",fontFamily:F.bar,fontWeight:900,fontSize:"0.72rem",letterSpacing:1.5,position:"relative",zIndex:1,boxShadow:"0 4px 16px rgba(16,185,129,0.4)",display:"flex",alignItems:"center",gap:8}}>📲 INSTALAR APP</button>}<div style={{display:"flex",gap:10,marginTop:canInstall?10:20,position:"relative",zIndex:1}}>{total>0&&<button onClick={onReset} style={{background:"rgba(239,68,68,0.15)",border:"1px solid rgba(239,68,68,0.3)",color:"#fca5a5",padding:"6px 16px",borderRadius:8,cursor:"pointer",fontFamily:F.bar,fontWeight:700,fontSize:"0.54rem",letterSpacing:1}}>🗑️ REINICIAR TORNEO</button>}</div></div>);}

// ═══════════════ MENU ═══════════════
function MenuView({teams,players,matches,onNav,genLabel,genColor,onBackGender,onNuclear}){
  const accent=genColor==="#1e3a8a"?"#3b82f6":"#ec4899";
  const items=[
    {key:"admin",icon:"🛡️",label:"EQUIPOS",sub:"Y JUGADORES",desc:"Gestionar nóminas",color:"#0ea5e9",accent:"#38bdf8"},
    {key:"calendar",icon:"📅",label:"CALENDARIO",sub:"",desc:"Fixture por grupo",color:"#059669",accent:"#34d399"},
    {key:"standings",icon:"📊",label:"POSICIONES",sub:"",desc:"FIBA 3x3 2026",color:genColor,accent},
    {key:"mesa",icon:"⏱️",label:"MESA",sub:"TÉCNICA",desc:"Registro en vivo",color:"#7c3aed",accent:"#a78bfa"},
    {key:"leaders",icon:"👑",label:"MVP",sub:"",desc:"Máximo anotador",color:"#b45309",accent:"#f59e0b"},
    {key:"playoff",icon:"🏆",label:"PLAYOFF",sub:"",desc:"Cuartos · Semis · Final",color:"#ea580c",accent:"#fb923c"},
    {key:"arbitros",icon:"⚖️",label:"ÁRBITROS",sub:"",desc:"Cobro por partido",color:"#dc2626",accent:"#f87171"},
  ];
  const fin=matches.filter(m=>m.estatus==="finalizado").length;
  return(
    <div style={{...S.menuWrap,background:genColor==="#1e3a8a"?"linear-gradient(160deg,#020617 0%,#0f172a 30%,#1e1b4b 60%,#0f172a 100%)":"linear-gradient(160deg,#1a0a1f 0%,#2e1065 40%,#4a044e 70%,#1a0a1f 100%)"}}>
      <div style={S.menuDots}/>
      <div style={{textAlign:"center",marginBottom:12,position:"relative",zIndex:1}}>
        <img src={LOGO_TORNEO} alt="3x3 Aragua" style={{width:64,height:64,objectFit:"contain",borderRadius:10,marginBottom:6}}/>
        <div style={{display:"inline-flex",alignItems:"center",gap:6,background:`${genColor}cc`,padding:"3px 14px",borderRadius:20,marginBottom:4}}>
          <div style={{width:6,height:6,borderRadius:"50%",background:accent,boxShadow:`0 0 8px ${accent}`}}/>
          <span style={{fontFamily:F.bar,fontWeight:900,fontSize:"0.62rem",letterSpacing:3,color:"white"}}>{genLabel}</span>
        </div>
      </div>
      <div style={{width:"100%",maxWidth:400,position:"relative",zIndex:1}}>
        {/* Top 2 big cards */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:8}}>
          {items.slice(0,2).map(it=><MCard key={it.key} {...it} onClick={()=>onNav(it.key)} big/>)}
        </div>
        {/* Middle row: 3 cards */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:8,marginBottom:8}}>
          {items.slice(2,5).map(it=><MCard key={it.key} {...it} onClick={()=>onNav(it.key)}/>)}
        </div>
        {/* Bottom row: 2 cards */}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:10}}>
          {items.slice(5).map(it=><MCard key={it.key} {...it} onClick={()=>onNav(it.key)}/>)}
        </div>
      </div>
      {/* Stats bar */}
      <div style={{display:"flex",gap:16,justifyContent:"center",marginBottom:12,position:"relative",zIndex:1}}>
        {[{n:teams.length,l:"Equipos"},{n:matches.length,l:"Partidos"},{n:fin,l:"Jugados"}].map((s,i)=>(
          <div key={i} style={{textAlign:"center"}}>
            <div style={{fontFamily:F.bar,fontWeight:900,fontSize:"1rem",color:"white"}}>{s.n}</div>
            <div style={{fontSize:"0.4rem",color:"rgba(255,255,255,0.35)",fontWeight:700,letterSpacing:1,textTransform:"uppercase"}}>{s.l}</div>
          </div>
        ))}
      </div>
      <div style={{display:"flex",gap:8,position:"relative",zIndex:1}}>
        <button onClick={onBackGender} style={{background:"rgba(255,255,255,0.06)",backdropFilter:"blur(10px)",WebkitBackdropFilter:"blur(10px)",border:"1px solid rgba(255,255,255,0.1)",color:"rgba(255,255,255,0.5)",padding:"7px 16px",borderRadius:10,cursor:"pointer",fontFamily:F.bar,fontWeight:700,fontSize:"0.58rem",letterSpacing:1}}>← CATEGORÍA</button>
        <button onClick={onNuclear} style={{background:"rgba(239,68,68,0.08)",border:"1px solid rgba(239,68,68,0.2)",color:"#f87171",padding:"7px 12px",borderRadius:10,cursor:"pointer",fontFamily:F.bar,fontWeight:700,fontSize:"0.52rem",letterSpacing:0.5}}>☢️</button>
      </div>
    </div>
  );
}
function MCard({icon,label,sub,desc,color,accent,onClick,big}){
  const[h,setH]=useState(false);const[pressed,setPressed]=useState(false);
  return(
    <button onClick={onClick} onMouseEnter={()=>setH(true)} onMouseLeave={()=>{setH(false);setPressed(false);}} onMouseDown={()=>setPressed(true)} onMouseUp={()=>setPressed(false)} onTouchStart={()=>{setH(true);setPressed(true);}} onTouchEnd={()=>{setH(false);setPressed(false);}}
      style={{
        padding:big?"16px 14px":"12px 8px",borderRadius:16,border:"none",
        background:h?`linear-gradient(145deg,${color}dd,${accent}aa)`:"rgba(255,255,255,0.04)",
        backdropFilter:"blur(12px)",WebkitBackdropFilter:"blur(12px)",
        color:"white",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:big?"flex-start":"center",gap:big?8:5,
        transition:"all 0.25s cubic-bezier(0.4,0,0.2,1)",
        transform:pressed?"scale(0.95)":h?"translateY(-2px)":"none",
        boxShadow:h?`0 8px 32px ${color}44, inset 0 1px 0 rgba(255,255,255,0.1)`:"inset 0 1px 0 rgba(255,255,255,0.05), 0 1px 3px rgba(0,0,0,0.2)",
        outline:h?`1px solid ${accent}66`:"1px solid rgba(255,255,255,0.06)",
        position:"relative",overflow:"hidden",textAlign:big?"left":"center",
      }}>
      {/* Glow orb */}
      <div style={{position:"absolute",top:"-30%",right:"-20%",width:"60%",height:"60%",borderRadius:"50%",background:`radial-gradient(circle,${color}${h?"30":"10"} 0%,transparent 70%)`,transition:"all 0.3s"}}/>
      {/* Icon container */}
      <div style={{
        width:big?36:32,height:big?36:32,borderRadius:big?10:8,
        background:h?`rgba(255,255,255,0.2)`:`linear-gradient(135deg,${color}44,${accent}22)`,
        display:"flex",alignItems:"center",justifyContent:"center",fontSize:big?"1.2rem":"1rem",
        transition:"all 0.25s",position:"relative",zIndex:1,
        boxShadow:h?`0 4px 12px ${color}55`:"none",
      }}>{icon}</div>
      {/* Text */}
      <div style={{position:"relative",zIndex:1}}>
        <div style={{fontFamily:F.bar,fontWeight:900,fontSize:big?"0.82rem":"0.64rem",letterSpacing:big?1.5:1,lineHeight:1.2}}>
          {label}{sub&&<span style={{fontWeight:600,opacity:0.7}}> {sub}</span>}
        </div>
        {big&&<div style={{fontSize:"0.44rem",opacity:0.5,marginTop:2,fontWeight:600}}>{desc}</div>}
      </div>
    </button>
  );
}

// ═══════════════ ADMIN ═══════════════
function AdminView({teams,setTeams,players,allPlayers,setAllPlayers,onBack,showToast,genero,genLabel,genColor}){const[sub,setSub]=useState("teams");const[selTeam,setSelTeam]=useState(null);const[tName,setTName]=useState("");const[tGrupo,setTGrupo]=useState("A");const[tColor,setTColor]=useState(COLORS[0]);const[tLogo,setTLogo]=useState(null);const[editTId,setEditTId]=useState(null);const[pName,setPName]=useState("");const[pNum,setPNum]=useState("");const[editPId,setEditPId]=useState(null);const[epName,setEpName]=useState("");const[epNum,setEpNum]=useState("");const[confirmDel,setConfirmDel]=useState(null);const logoRef=useRef(null);
  const handleLogo=(e)=>{const file=e.target.files?.[0];if(!file)return;if(file.size>500000)return showToast("Máx 500KB","#ef4444");const reader=new FileReader();reader.onload=ev=>{const img=new Image();img.onload=()=>{const canvas=document.createElement('canvas');const max=120;let w=img.width,h=img.height;if(w>h){if(w>max){h=h*(max/w);w=max;}}else{if(h>max){w=w*(max/h);h=max;}}canvas.width=w;canvas.height=h;canvas.getContext('2d').drawImage(img,0,0,w,h);setTLogo(canvas.toDataURL('image/jpeg',0.7));};img.src=ev.target.result;};reader.readAsDataURL(file);};
  const addTeam=()=>{if(!tName.trim())return showToast("Falta nombre","#ef4444");if(teams.some(t=>t.nombre===tName.trim().toUpperCase()&&t.id!==editTId))return showToast("Nombre repetido","#ef4444");if(editTId){setTeams(p=>p.map(t=>t.id===editTId?{...t,nombre:tName.trim().toUpperCase(),grupo:tGrupo,color:tColor,logo:tLogo||t.logo||null}:t));showToast("✅ Editado");setEditTId(null);}else{setTeams(p=>[...p,{id:genId(),nombre:tName.trim().toUpperCase(),grupo:tGrupo,color:tColor,logo:tLogo||null,genero}]);showToast("✅ Creado");}setTName("");setTGrupo("A");setTColor(COLORS[0]);setTLogo(null);};
  const addPlayer=()=>{if(!pName.trim()||!pNum.trim())return showToast("Faltan datos","#ef4444");const num=parseInt(pNum);const tp=allPlayers.filter(p=>p.equipoId===selTeam?.id);if(tp.length>=4)return showToast("Máx 4","#ef4444");if(tp.some(p=>p.numero===num))return showToast(`#${num} ya existe`,"#ef4444");setAllPlayers(p=>[...p,{id:genId(),nombre:pName.trim().toUpperCase(),numero:num,equipoId:selTeam?.id}]);setPName("");setPNum("");showToast("✅ Agregado");};
  if(sub==="roster"&&selTeam){const tp=allPlayers.filter(p=>p.equipoId===selTeam.id).sort((a,b)=>a.numero-b.numero);return(<div style={S.page}><Hdr title={`📋 ${selTeam.nombre}`} onBack={()=>setSub("teams")} color={selTeam.color}/><div style={{padding:14,maxWidth:480,margin:"0 auto",width:"100%"}}><div style={{...S.card,padding:14,marginBottom:12}}><p style={{...S.lbl,marginBottom:8,fontSize:"0.68rem"}}>AGREGAR ({tp.length}/4)</p><div style={{display:"flex",gap:6}}><input type="number" placeholder="#" value={pNum} onChange={e=>setPNum(e.target.value)} style={{...S.inp,width:48,textAlign:"center",fontWeight:900}}/><input type="text" placeholder="Nombre y Apellido" value={pName} onChange={e=>setPName(e.target.value)} onKeyDown={e=>e.key==="Enter"&&addPlayer()} style={{...S.inp,flex:1}}/><button onClick={addPlayer} style={{...S.btnSm,background:"#10b981"}}>+</button></div></div><div style={S.card}>{tp.length===0?<div style={{padding:28,textAlign:"center",color:"#94a3b8",fontSize:"0.76rem"}}>Sin jugadores</div>:tp.map(p=>(<div key={p.id} style={{padding:"10px 14px",borderBottom:"1px solid #f1f5f9",display:"flex",alignItems:"center",gap:8}}>{editPId===p.id?<><input type="number" value={epNum} onChange={e=>setEpNum(e.target.value)} style={{...S.inp,width:44,textAlign:"center",fontWeight:900,padding:"5px 3px"}}/><input type="text" value={epName} onChange={e=>setEpName(e.target.value)} style={{...S.inp,flex:1,padding:"5px 7px"}}/><button onClick={()=>{if(!epName.trim()||!epNum.trim())return;setAllPlayers(p2=>p2.map(pl=>pl.id===p.id?{...pl,nombre:epName.trim().toUpperCase(),numero:parseInt(epNum)}:pl));setEditPId(null);showToast("✅");}} style={{...S.btnSm,background:"#10b981",fontSize:"0.75rem"}}>✓</button><button onClick={()=>setEditPId(null)} style={{...S.btnSm,background:"#94a3b8",fontSize:"0.75rem"}}>✕</button></>:<><span style={{background:selTeam.color,color:txtC(selTeam.color),padding:"2px 7px",borderRadius:5,fontWeight:900,fontSize:"0.8rem",minWidth:28,textAlign:"center"}}>{p.numero}</span><span style={{flex:1,fontWeight:600,fontSize:"0.82rem",color:"#1e293b"}}>{p.nombre}</span><button onClick={()=>{setEditPId(p.id);setEpName(p.nombre);setEpNum(String(p.numero));}} style={S.iconBtn}>✏️</button><button onClick={()=>{setAllPlayers(pr=>pr.filter(pl=>pl.id!==p.id));showToast("🗑️","#ef4444");}} style={S.iconBtn}>🗑️</button></>}</div>))}</div></div></div>);}
  return(<div style={S.page}><Hdr title={`🛡️ EQUIPOS ${genLabel}`} onBack={onBack} color={genColor}/>{confirmDel&&<CModal msg={confirmDel.msg} onOk={()=>{confirmDel.fn();setConfirmDel(null);}} onNo={()=>setConfirmDel(null)}/>}<div style={{padding:14,maxWidth:480,margin:"0 auto",width:"100%"}}><div style={{...S.card,padding:14,marginBottom:14}}><p style={{...S.lbl,marginBottom:8,fontSize:"0.68rem"}}>{editTId?"EDITAR":"NUEVO"} EQUIPO</p><input type="text" placeholder="Nombre del equipo" value={tName} onChange={e=>setTName(e.target.value.toUpperCase())} style={{...S.inp,marginBottom:8}}/><div style={{display:"flex",gap:8,marginBottom:8}}><div style={{flex:1}}><label style={S.lbl}>GRUPO</label><select value={tGrupo} onChange={e=>setTGrupo(e.target.value)} style={S.inp}>{GRUPOS.map(g=><option key={g} value={g}>Grupo {g}</option>)}</select></div><div style={{flex:1}}><label style={S.lbl}>COLOR</label><div style={{display:"flex",gap:3,flexWrap:"wrap",marginTop:3}}>{COLORS.map(c=><div key={c} onClick={()=>setTColor(c)} style={{width:19,height:19,borderRadius:"50%",background:c,cursor:"pointer",border:tColor===c?"3px solid #0f172a":"2px solid transparent"}}/>)}</div></div></div><div style={{display:"flex",gap:6}}>{editTId&&<button onClick={()=>{setEditTId(null);setTName("");setTLogo(null);}} style={{...S.btnFull,background:"#e2e8f0",color:"#64748b",flex:1}}>CANCELAR</button>}<button onClick={addTeam} style={{...S.btnFull,background:genColor,flex:2}}>{editTId?"💾 GUARDAR":"➕ CREAR"}</button></div><div style={{marginTop:8,display:"flex",alignItems:"center",gap:10}}><input ref={logoRef} type="file" accept="image/*" onChange={handleLogo} style={{display:"none"}}/>{tLogo?<img src={tLogo} alt="" style={{width:40,height:40,borderRadius:"50%",objectFit:"cover",border:`2px solid ${tColor}`}}/>:<div style={{width:40,height:40,borderRadius:"50%",background:tColor,display:"flex",alignItems:"center",justifyContent:"center",color:txtC(tColor),fontWeight:900,fontSize:"0.55rem"}}>{(tName||"??").slice(0,2)}</div>}<button onClick={()=>logoRef.current?.click()} style={{background:"#f1f5f9",border:"1px solid #e2e8f0",padding:"5px 10px",borderRadius:6,cursor:"pointer",fontSize:"0.56rem",fontWeight:700,color:"#64748b"}}>📷 {tLogo?"Cambiar":"Subir"} Logo</button>{tLogo&&<button onClick={()=>setTLogo(null)} style={{background:"none",border:"none",cursor:"pointer",fontSize:"0.7rem",color:"#ef4444"}}>✕</button>}<span style={{fontSize:"0.42rem",color:"#94a3b8"}}>Opcional · máx 500KB</span></div></div>{teams.length===0?<Empty icon="🏀" title="Sin equipos" desc={`Crea equipos para ${genLabel}`}/>:GRUPOS.map(g=>{const gt=teams.filter(t=>t.grupo===g);if(!gt.length)return null;return(<div key={g}><div style={{fontSize:"0.56rem",fontWeight:900,color:GRUPO_COLORS[g],letterSpacing:1.5,marginBottom:4,marginTop:8,fontFamily:F.bar}}>GRUPO {g}</div>{gt.map(t=>{const cnt=allPlayers.filter(p=>p.equipoId===t.id).length;return(<div key={t.id} style={{...S.card,marginBottom:6,display:"flex",alignItems:"center",padding:"10px 12px",gap:10}}><TB team={t} size={34} fontSize="0.6rem"/><div style={{flex:1}}><div style={{fontWeight:800,fontSize:"0.82rem",color:"#1e293b"}}>{t.nombre}</div><div style={{fontSize:"0.55rem",color:"#94a3b8"}}>{cnt}/4</div></div><button onClick={()=>{setSelTeam(t);setSub("roster");}} style={{...S.btnSm,background:t.color,color:txtC(t.color),fontSize:"0.52rem",fontWeight:800,padding:"5px 8px"}}>📋</button><button onClick={()=>{setEditTId(t.id);setTName(t.nombre);setTGrupo(t.grupo);setTColor(t.color);setTLogo(t.logo||null);}} style={S.iconBtn}>✏️</button><button onClick={()=>setConfirmDel({msg:`¿Eliminar "${t.nombre}"?`,fn:()=>{setTeams(p=>p.filter(x=>x.id!==t.id));setAllPlayers(p=>p.filter(x=>x.equipoId!==t.id));showToast("🗑️","#ef4444");}})} style={S.iconBtn}>🗑️</button></div>);})}</div>);})}</div></div>);}

// ═══════════════ CALENDARIO ═══════════════
function CalendarView({teams,matches,allTeams,onGenerarCalendario,onIniciarPartido,setMesaStep,onNav,onBack,genLabel,genColor}){
  const ag=GRUPOS.filter(g=>teams.some(t=>t.grupo===g));
  return(<div style={S.page}><Hdr title={`📅 CALENDARIO ${genLabel}`} onBack={onBack} color={genColor}/>
    <div style={{padding:"12px 10px 80px"}}>
      {ag.length===0?<Empty icon="📅" title="Sin equipos" desc="Registra equipos primero"/>:
      ag.map(g=>{
        const gt=teams.filter(t=>t.grupo===g);
        const gMatches=matches.filter(m=>{const lT=allTeams.find(t=>t.id===m.localId);const vT=allTeams.find(t=>t.id===m.visitId);return lT?.grupo===g&&vT?.grupo===g;});
        const prog=gMatches.filter(m=>m.estatus==="programado");
        const fin=gMatches.filter(m=>m.estatus==="finalizado");
        return(<div key={g} style={{...S.card,borderTop:`3px solid ${GRUPO_COLORS[g]}`,marginBottom:14}}>
          <div style={{padding:"9px 12px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <span style={{fontFamily:F.bar,fontWeight:800,fontSize:"0.8rem",color:GRUPO_COLORS[g],letterSpacing:1.5}}>🏀 GRUPO {g}</span>
            <button onClick={()=>onGenerarCalendario(g)} style={{background:GRUPO_COLORS[g],color:"white",border:"none",padding:"5px 10px",borderRadius:6,fontWeight:800,fontSize:"0.52rem",cursor:"pointer",fontFamily:F.bar,letterSpacing:0.5}}>⚡ GENERAR</button>
          </div>
          {gMatches.length===0?<div style={{padding:20,textAlign:"center",color:"#94a3b8",fontSize:"0.7rem"}}>Presiona GENERAR ({gt.length} equipos)</div>:
          <div>
            {fin.length>0&&<div style={{padding:"4px 12px",fontSize:"0.46rem",fontWeight:900,color:"#10b981",letterSpacing:1,fontFamily:F.bar}}>FINALIZADOS ({fin.length})</div>}
            {fin.map(m=>{const lT=allTeams.find(t=>t.id===m.localId);const vT=allTeams.find(t=>t.id===m.visitId);return(
              <div key={m.id} style={{padding:"8px 12px",borderBottom:"1px solid #f1f5f9",display:"flex",alignItems:"center",gap:6}}>
                <div style={{width:8,height:8,borderRadius:"50%",background:"#10b981",flexShrink:0}}/>
                <span style={{flex:1,fontWeight:700,fontSize:"0.7rem",color:"#1e293b"}}>{lT?.nombre||"?"}</span>
                <span style={{fontWeight:900,color:"#1e293b",fontSize:"0.8rem",padding:"2px 8px",background:"#f1f5f9",borderRadius:5}}>{m.marcadorL||0} - {m.marcadorV||0}</span>
                <span style={{flex:1,fontWeight:700,fontSize:"0.7rem",color:"#1e293b",textAlign:"right"}}>{vT?.nombre||"?"}</span>
              </div>
            );})}
            {prog.length>0&&<div style={{padding:"4px 12px",fontSize:"0.46rem",fontWeight:900,color:"#f59e0b",letterSpacing:1,fontFamily:F.bar,marginTop:fin.length?4:0}}>PENDIENTES ({prog.length})</div>}
            {prog.map(m=>{const lT=allTeams.find(t=>t.id===m.localId);const vT=allTeams.find(t=>t.id===m.visitId);return(
              <div key={m.id} style={{padding:"8px 12px",borderBottom:"1px solid #f1f5f9",display:"flex",alignItems:"center",gap:6}}>
                <div style={{width:8,height:8,borderRadius:"50%",background:"#f59e0b",flexShrink:0}}/>
                <span style={{flex:1,fontWeight:700,fontSize:"0.7rem",color:"#64748b"}}>{lT?.nombre||"?"}</span>
                <span style={{fontSize:"0.56rem",color:"#94a3b8",fontWeight:700}}>VS</span>
                <span style={{flex:1,fontWeight:700,fontSize:"0.7rem",color:"#64748b",textAlign:"right"}}>{vT?.nombre||"?"}</span>
                <button onClick={()=>{onIniciarPartido(m);setMesaStep("active");onNav("mesa");}} style={{background:"#7c3aed",color:"white",border:"none",padding:"4px 8px",borderRadius:5,fontWeight:900,fontSize:"0.5rem",cursor:"pointer",flexShrink:0}}>▶️</button>
              </div>
            );})}
          </div>}
        </div>);
      })}
    </div>
  </div>);
}

// ═══════════════ POSICIONES — FIBA 3x3 D ═══════════════
function StandingsView({calcStandings,onBack,genLabel,genColor,teams}){const ag=GRUPOS.filter(g=>teams.some(t=>t.grupo===g));return(<div style={S.page}><Hdr title={`📊 ${genLabel}`} onBack={onBack} color={genColor}/><div style={{padding:"12px 10px 80px"}}>{ag.length===0?<Empty icon="📊" title="Sin equipos" desc="Registra equipos primero"/>:ag.map(g=>{const ranked=calcStandings(g).map((e,i)=>({...e,playoffZone:i<2}));return <GrpTable key={g} teams={ranked} label={`GRUPO ${g}`} color={GRUPO_COLORS[g]}/>;})}<div style={{padding:"10px 4px",fontSize:"0.44rem",color:"#94a3b8",lineHeight:1.6}}><strong>Clasificación FIBA 3x3 (Apéndice D 2026):</strong> 1) Más victorias → 2) H2H ganó/perdió → 3) Promedio puntos anotados (tope 21/juego) → 4) Seeding</div></div></div>);}
function GrpTable({teams,label,color}){if(!teams.length)return null;return(<div style={{...S.card,borderTop:`3px solid ${color}`,marginBottom:14}}><div style={{padding:"9px 12px",fontFamily:F.bar,fontWeight:800,fontSize:"0.8rem",color,letterSpacing:1.5,display:"flex",alignItems:"center",gap:8}}>🏀 {label}</div><div style={{overflowX:"auto"}}><table style={{width:"100%",borderCollapse:"collapse",fontSize:"0.7rem",minWidth:420}}><thead><tr style={{background:"#f8fafc",color:"#94a3b8",fontSize:"0.46rem",letterSpacing:1,textTransform:"uppercase"}}><th style={S.th}>#</th><th style={{...S.th,textAlign:"left"}}>Equipo</th><th style={S.th}>JJ</th><th style={{...S.th,background:`${color}15`,color,fontWeight:900}}>JG</th><th style={S.th}>JP</th><th style={S.th}>PF</th><th style={S.th}>PC</th><th style={S.th}>DIF</th><th style={S.th}>PPG</th><th style={{...S.th,minWidth:68}}>FORMA</th></tr></thead><tbody>{teams.map((eq,i)=>(<tr key={eq.id} style={{borderBottom:"1px solid #f1f5f9",background:eq.playoffZone?`${color}06`:"transparent",borderLeft:eq.playoffZone?`3px solid ${color}`:"3px solid transparent"}}><td style={S.td}><div style={{width:20,height:20,borderRadius:"50%",background:eq.playoffZone?color:"#f1f5f9",color:eq.playoffZone?"white":"#94a3b8",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.55rem",fontWeight:900,margin:"0 auto",position:"relative"}}>{i+1}{eq.playoffZone&&<div style={{position:"absolute",bottom:-1,right:-3,width:6,height:6,borderRadius:"50%",background:"#10b981",border:"1px solid white"}}/>}</div></td><td style={{...S.td,textAlign:"left"}}><div style={{display:"flex",alignItems:"center",gap:5}}><TB team={eq} size={20} fontSize="0.42rem"/><div><span style={{fontWeight:700,fontSize:"0.66rem",color:"#1e293b",display:"block"}}>{eq.nombre}</span>{eq.playoffZone&&<span style={{fontSize:"0.4rem",fontWeight:900,color:"#10b981"}}>✓ PLAYOFF</span>}</div></div></td><td style={{...S.td,color:"#64748b"}}>{eq.jj}</td><td style={{...S.td,color:"#10b981",fontWeight:900,fontSize:"0.85rem"}}>{eq.jg}</td><td style={{...S.td,color:"#ef4444",fontWeight:700}}>{eq.jp}</td><td style={{...S.td,color:"#64748b"}}>{eq.pf}</td><td style={{...S.td,color:"#64748b"}}>{eq.pc}</td><td style={{...S.td,color:eq.dif>=0?"#3b82f6":"#ef4444",fontWeight:700}}>{eq.dif>0?`+${eq.dif}`:eq.dif}</td><td style={{...S.td,color:"#7c3aed",fontWeight:700}}>{eq.ppg}</td><td style={S.td}><div style={{display:"flex",gap:2,justifyContent:"center"}}>{eq.forma?.length?eq.forma.map((r,idx)=>(<div key={idx} style={{width:14,height:14,borderRadius:3,background:r==='G'?"#10b981":"#ef4444",color:"white",fontSize:"0.4rem",fontWeight:900,display:"flex",alignItems:"center",justifyContent:"center"}}>{r}</div>)):<span style={{fontSize:"0.5rem",color:"#cbd5e1"}}>—</span>}</div></td></tr>))}</tbody></table></div><div style={{padding:"5px 12px",background:"#f8fafc",borderTop:"1px solid #f1f5f9",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:6}}><div style={{display:"flex",alignItems:"center",gap:4}}><div style={{width:6,height:6,borderRadius:"50%",background:"#10b981"}}/><span style={{fontSize:"0.44rem",color:"#10b981",fontWeight:700}}>Clasifica (top 2)</span></div><div style={{display:"flex",alignItems:"center",gap:4}}><div style={{width:12,height:12,borderRadius:2,background:"#10b981",display:"flex",alignItems:"center",justifyContent:"center"}}><span style={{color:"white",fontSize:"0.38rem",fontWeight:900}}>G</span></div><div style={{width:12,height:12,borderRadius:2,background:"#ef4444",display:"flex",alignItems:"center",justifyContent:"center"}}><span style={{color:"white",fontSize:"0.38rem",fontWeight:900}}>P</span></div><span style={{fontSize:"0.44rem",color:"#94a3b8"}}>Últimos 5</span></div></div></div>);}

// ═══════════════ MESA ═══════════════
function MesaView({step,teams,players,mesaMatch,matches,statsPartido,allJugadas,onCrearPartido,onStat,onDeletePlay,onFinalizar,onBack,setMesaStep,setMesaMatch,genColor}){const[localId,setLocalId]=useState("");const[visitId,setVisitId]=useState("");const[showHist,setShowHist]=useState(false);const[confirmFin,setConfirmFin]=useState(false);const[delConfirm,setDelConfirm]=useState(null);
  if(step==="select"){const ec=matches.filter(m=>m.estatus==="programado");return(<div style={S.page}><Hdr title="⏱️ MESA TÉCNICA" onBack={onBack} color={genColor}/><div style={{padding:14,maxWidth:440,margin:"0 auto",width:"100%"}}>{teams.length<2?<Empty icon="⏱️" title="2+ equipos requeridos" desc="Registra equipos primero"/>:<div style={{...S.card,padding:14}}><p style={{fontFamily:F.bar,fontWeight:700,fontSize:"0.78rem",color:"#1e293b",marginBottom:10}}>CREAR PARTIDO</p><label style={S.lbl}>Local</label><select style={S.inp} value={localId} onChange={e=>setLocalId(e.target.value)}><option value="">Seleccionar...</option>{teams.map(t=><option key={t.id} value={t.id}>{t.nombre}</option>)}</select><label style={{...S.lbl,marginTop:8}}>Visitante</label><select style={S.inp} value={visitId} onChange={e=>setVisitId(e.target.value)}><option value="">Seleccionar...</option>{teams.filter(t=>t.id!==localId).map(t=><option key={t.id} value={t.id}>{t.nombre}</option>)}</select><button onClick={()=>{if(localId&&visitId)onCrearPartido(localId,visitId);}} disabled={!localId||!visitId} style={{...S.btnFull,marginTop:12,background:localId&&visitId?"#7c3aed":"#e2e8f0",color:localId&&visitId?"white":"#94a3b8"}}>🏀 INICIAR</button></div>}{ec.length>0&&<div style={{...S.card,marginTop:10}}><div style={{padding:"8px 14px",fontFamily:F.bar,fontWeight:800,fontSize:"0.68rem",color:"#7c3aed",borderBottom:"1px solid #f1f5f9"}}>PROGRAMADOS ({ec.length})</div>{ec.map(m=>{const l=teams.find(t=>t.id===m.localId);const v=teams.find(t=>t.id===m.visitId);return(<button key={m.id} onClick={()=>{setMesaMatch(m);setMesaStep("active");}} style={{width:"100%",padding:"10px 14px",background:"white",border:"none",borderBottom:"1px solid #f1f5f9",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center"}}><span style={{fontWeight:700,fontSize:"0.72rem",color:"#1e293b"}}>{l?.nombre} vs {v?.nombre}</span><span style={{fontWeight:900,color:"#7c3aed",fontSize:"0.8rem"}}>{m.marcadorL||0} - {m.marcadorV||0}</span></button>);})}</div>}</div></div>);}
  const cur=matches.find(m=>m.id===mesaMatch?.id)||mesaMatch;const lT=teams.find(t=>t.id===cur?.localId);const vT=teams.find(t=>t.id===cur?.visitId);const lP=players.filter(p=>p.equipoId===cur?.localId);const vP=players.filter(p=>p.equipoId===cur?.visitId);const ms=statsPartido.filter(s=>s.matchId===cur?.id);const mj=allJugadas.filter(j=>j.matchId===cur?.id);const gs=pid=>ms.find(s=>s.jugadorId===pid)||{};
  return(<div style={{background:"#0a0a0a",minHeight:"100vh",display:"flex",flexDirection:"column",color:"white"}}>{confirmFin&&<CModal msg={`¿FINALIZAR?\n${lT?.nombre} ${cur?.marcadorL} - ${cur?.marcadorV} ${vT?.nombre}`} onOk={()=>{setConfirmFin(false);onFinalizar();}} onNo={()=>setConfirmFin(false)}/>}{delConfirm&&<CModal msg={`¿Eliminar jugada?\n#${delConfirm.jugadorNumero} ${delConfirm.jugadorNombre} +${delConfirm.puntos}`} onOk={()=>{onDeletePlay(delConfirm);setDelConfirm(null);}} onNo={()=>setDelConfirm(null)}/>}<div style={{background:"#111",padding:"10px 12px",display:"flex",alignItems:"center",justifyContent:"center",gap:10,borderBottom:"2px solid #1e293b"}}><div style={{textAlign:"right",flex:1}}><div style={{fontFamily:F.bar,fontWeight:800,fontSize:"0.66rem",color:lT?.color}}>{lT?.nombre}</div></div><div style={{display:"flex",alignItems:"center",gap:8,background:"#1e293b",padding:"5px 16px",borderRadius:10}}><span style={{fontSize:"1.7rem",fontWeight:900,fontFamily:F.bar}}>{cur?.marcadorL||0}</span><span style={{fontSize:"0.5rem",color:"#475569"}}>VS</span><span style={{fontSize:"1.7rem",fontWeight:900,fontFamily:F.bar}}>{cur?.marcadorV||0}</span></div><div style={{textAlign:"left",flex:1}}><div style={{fontFamily:F.bar,fontWeight:800,fontSize:"0.66rem",color:vT?.color}}>{vT?.nombre}</div></div></div><div style={{flex:1,display:"flex",overflow:"hidden"}}><div style={{flex:1,padding:"5px 4px",borderRight:"1px solid #1e293b",overflowY:"auto"}}><div style={{textAlign:"center",marginBottom:4,background:`${lT?.color}33`,padding:"3px 0",borderRadius:5,fontSize:"0.52rem",fontWeight:900,color:lT?.color}}>LOCAL</div>{lP.length===0?<NoPl/>:lP.map(p=><PCard key={p.id} player={p} team="local" tc={lT?.color} stats={gs(p.id)} onStat={onStat}/>)}</div><div style={{flex:1,padding:"5px 4px",overflowY:"auto"}}><div style={{textAlign:"center",marginBottom:4,background:`${vT?.color}33`,padding:"3px 0",borderRadius:5,fontSize:"0.52rem",fontWeight:900,color:vT?.color}}>VISITANTE</div>{vP.length===0?<NoPl/>:vP.map(p=><PCard key={p.id} player={p} team="visit" tc={vT?.color} stats={gs(p.id)} onStat={onStat}/>)}</div></div><div style={{padding:"7px 8px",background:"#0f172a",display:"flex",gap:5,borderTop:"2px solid #1e293b"}}><button onClick={()=>setMesaStep("select")} style={mBtn("#334155")}>SALIR</button><button onClick={()=>setShowHist(true)} style={mBtn("#334155")}>📜 {mj.length}</button><button onClick={()=>setConfirmFin(true)} style={{...mBtn("#065f46"),flex:2,fontWeight:900}}>✅ FINALIZAR</button></div>
  {showHist&&<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.92)",zIndex:4000,display:"flex",justifyContent:"center",alignItems:"center",padding:14}}><div style={{background:"#1e293b",width:"100%",maxWidth:360,borderRadius:12,overflow:"hidden",maxHeight:"70vh",display:"flex",flexDirection:"column"}}><div style={{padding:"10px 16px",background:"#0f172a",display:"flex",justifyContent:"space-between",alignItems:"center",fontWeight:900,fontSize:"0.72rem"}}><span>📜 HISTORIAL ({mj.length})</span><button onClick={()=>setShowHist(false)} style={{background:"#334155",border:"none",color:"white",borderRadius:"50%",width:24,height:24,cursor:"pointer",fontSize:"0.66rem"}}>✕</button></div><div style={{overflowY:"auto",flex:1,padding:6}}>{mj.length===0?<p style={{textAlign:"center",color:"#475569",padding:16,fontSize:"0.7rem"}}>Sin jugadas</p>:mj.map((j,i)=>(<div key={j.id} style={{padding:"6px 10px",marginBottom:2,borderRadius:5,background:i===0?"#0f2d1f":"#0f172a",border:`1px solid ${i===0?"#10b981":"#1e293b"}`,display:"flex",justifyContent:"space-between",alignItems:"center",gap:5}}><div style={{display:"flex",alignItems:"center",gap:5,flex:1,minWidth:0}}><span style={{background:j.equipo==="local"?"#1e3a8a":"#7f1d1d",color:"white",padding:"1px 5px",borderRadius:3,fontWeight:900,fontSize:"0.58rem",flexShrink:0}}>#{j.jugadorNumero}</span><span style={{fontWeight:700,fontSize:"0.64rem",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{j.jugadorNombre}</span></div><span style={{fontWeight:900,color:"#10b981",fontSize:"0.62rem",flexShrink:0}}>+{j.puntos}</span><button onClick={()=>setDelConfirm(j)} style={{background:"#7f1d1d",border:"none",color:"#fca5a5",borderRadius:4,padding:"2px 6px",cursor:"pointer",fontSize:"0.56rem",fontWeight:900,flexShrink:0}}>🗑️</button></div>))}</div></div></div>}
  </div>);}
function NoPl(){return<p style={{textAlign:"center",color:"#475569",fontSize:"0.58rem",padding:10}}>Sin jugadores</p>}
function PCard({player,team,tc,stats,onStat}){const s=stats||{};const[fl,setFl]=useState(null);const click=pts=>{onStat(player,team,pts);setFl(pts);setTimeout(()=>setFl(null),200);};return(<div style={{marginBottom:5,padding:"7px 7px 5px",borderRadius:8,background:"#1a1a1a",border:"1px solid #2d2d2d"}}><div style={{display:"flex",alignItems:"center",gap:5,marginBottom:5}}><span style={{background:tc,color:txtC(tc||"#64748b"),padding:"2px 6px",borderRadius:4,fontWeight:900,fontSize:"0.72rem",minWidth:22,textAlign:"center"}}>{player.numero}</span><span style={{fontWeight:700,color:"white",fontSize:"0.7rem",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",flex:1}}>{player.nombre}</span><span style={{fontFamily:F.bar,fontWeight:900,fontSize:"0.95rem",color:"#fbbf24"}}>{s.puntos||0}</span></div><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:4}}><button onClick={()=>click(1)} style={{padding:"9px 4px",background:fl===1?"white":"#475569",border:"none",borderRadius:6,color:fl===1?"#475569":"white",fontWeight:900,fontSize:"0.68rem",cursor:"pointer",transform:fl===1?"scale(0.93)":"scale(1)",transition:"all 0.1s",lineHeight:1.3}}>+1<br/><span style={{fontSize:"0.52rem",fontWeight:600}}>DENTRO</span><br/><span style={{fontSize:"0.72rem"}}>{s.p1||0}</span></button><button onClick={()=>click(2)} style={{padding:"9px 4px",background:fl===2?"white":"#7c3aed",border:"none",borderRadius:6,color:fl===2?"#7c3aed":"white",fontWeight:900,fontSize:"0.68rem",cursor:"pointer",transform:fl===2?"scale(0.93)":"scale(1)",transition:"all 0.1s",lineHeight:1.3}}>+2<br/><span style={{fontSize:"0.52rem",fontWeight:600}}>FUERA</span><br/><span style={{fontSize:"0.72rem"}}>{s.p2||0}</span></button></div></div>);}

// ═══════════════ MVP ═══════════════
function LeadersView({leaders,onBack,genLabel,genColor}){const leader=leaders[0];const others=leaders.slice(1,10);return(<div style={S.page}><Hdr title={`👑 MVP ${genLabel}`} onBack={onBack} color={genColor}/><div style={{padding:"12px 12px 80px",maxWidth:500,margin:"0 auto"}}>{leaders.length===0?<Empty icon="👑" title="Sin estadísticas" desc="Finaliza partidos desde la mesa"/>:<div style={S.card}>{leader&&<div style={{background:`linear-gradient(160deg,#0f172a 0%,${genColor}cc 100%)`,padding:16,color:"white"}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}><span style={{fontFamily:F.bar,fontWeight:800,fontSize:"0.58rem",letterSpacing:2}}>👑 MÁXIMO ANOTADOR</span><span style={{background:"rgba(255,255,255,0.15)",padding:"2px 8px",borderRadius:5,fontSize:"0.48rem",fontWeight:900}}>#1</span></div><div style={{display:"flex",alignItems:"center",gap:12}}><div style={{width:56,height:56,borderRadius:"50%",background:leader.equipoColor,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,fontSize:"1.4rem",color:txtC(leader.equipoColor||"#64748b"),border:"3px solid rgba(255,255,255,0.3)",flexShrink:0}}>{leader.nombre.charAt(0)}</div><div style={{flex:1}}><div style={{fontFamily:F.bar,fontWeight:900,fontSize:"1rem",textTransform:"uppercase"}}>{leader.nombre}</div><div style={{fontSize:"0.52rem",opacity:0.7}}>{leader.equipo} · #{leader.numero}</div><div style={{display:"flex",alignItems:"baseline",gap:5,marginTop:3}}><span style={{fontSize:"2.2rem",fontWeight:900,fontFamily:F.bar,lineHeight:1}}>{leader.puntos}</span><span style={{fontSize:"0.7rem",fontWeight:700,opacity:0.8}}>PTS</span></div><div style={{fontSize:"0.52rem",opacity:0.6,marginTop:1}}>{leader.partidos} PJ · {(leader.puntos/leader.partidos).toFixed(1)} PPG</div></div></div></div>}{others.map((p,i)=>(<div key={p.jugadorId} style={{padding:"9px 14px",display:"flex",alignItems:"center",borderBottom:"1px solid #f1f5f9",gap:8}}><span style={{width:20,fontWeight:900,color:"#cbd5e1",fontSize:"0.8rem",textAlign:"center",flexShrink:0}}>{i+2}</span><div style={{width:30,height:30,borderRadius:"50%",background:p.equipoColor,display:"flex",alignItems:"center",justifyContent:"center",color:txtC(p.equipoColor||"#64748b"),fontWeight:900,fontSize:"0.72rem",flexShrink:0}}>{p.nombre.charAt(0)}</div><div style={{flex:1,minWidth:0}}><div style={{fontWeight:700,fontSize:"0.76rem",color:"#1e293b",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{p.nombre}</div><div style={{fontSize:"0.48rem",color:"#94a3b8"}}>{p.equipo} · {(p.puntos/p.partidos).toFixed(1)} PPG</div></div><div style={{textAlign:"right",flexShrink:0}}><div style={{fontWeight:900,color:genColor,fontSize:"0.9rem"}}>{p.puntos}<span style={{fontSize:"0.48rem",color:"#94a3b8",marginLeft:2}}>PTS</span></div></div></div>))}</div>}</div></div>);}

// ═══════════════ PLAYOFF ═══════════════
function PlayoffView({teams,matches,allTeams,calcStandings,onCrearPartido,onIniciarPartido,setMesaStep,onNav,onBack,genLabel,genColor,genero}){
  // Get top 2 from each active group
  const activeGrupos=GRUPOS.filter(g=>teams.some(t=>t.grupo===g));
  const classified={};
  activeGrupos.forEach(g=>{const r=calcStandings(g);classified[g]=[r[0]||null,r[1]||null];});
  const get=(g,pos)=>classified[g]?.[pos]||null;

  // Bracket: QF matchups
  const bracket=[
    {id:"QF1",fase:"Cuartos 1",label:"1A vs 2B",t1:get("A",0),t2:get("B",1)},
    {id:"QF2",fase:"Cuartos 2",label:"1C vs 2D",t1:get("C",0),t2:get("D",1)},
    {id:"QF3",fase:"Cuartos 3",label:"1B vs 2A",t1:get("B",0),t2:get("A",1)},
    {id:"QF4",fase:"Cuartos 4",label:"1D vs 2C",t1:get("D",0),t2:get("C",1)},
  ];

  // Find playoff matches by fase tag
  const findMatch=(fase)=>matches.find(m=>m.fase===fase);
  const getWinner=(fase)=>{const m=findMatch(fase);if(!m||m.estatus!=="finalizado")return null;return(m.marcadorL||0)>(m.marcadorV||0)?allTeams.find(t=>t.id===m.localId):allTeams.find(t=>t.id===m.visitId);};

  // Semis
  const sf=[
    {id:"SF1",fase:"Semi 1",t1:getWinner("QF1"),t2:getWinner("QF2")},
    {id:"SF2",fase:"Semi 2",t1:getWinner("QF3"),t2:getWinner("QF4")},
  ];
  // Final
  const finalMatch={id:"F",fase:"FINAL",t1:getWinner("SF1"),t2:getWinner("SF2")};
  const champion=getWinner("F");

  const crearPlayoff=(fase,t1,t2)=>{
    if(!t1||!t2)return;
    const existing=matches.find(m=>m.fase===fase);
    if(existing)return;
    const m={id:genId(),localId:t1.id,visitId:t2.id,marcadorL:0,marcadorV:0,estatus:"programado",fecha:new Date().toISOString().split("T")[0],genero,fase};
    // We need to add this match via the parent — use a workaround through crearPartido pattern
    // Actually we need direct access to setAllMatches. Let's use a custom approach:
    return m;
  };
  const [,forceUpdate]=useState(0);

  const handleCrear=(fase,t1,t2)=>{
    if(!t1||!t2)return;
    if(matches.find(m=>m.fase===fase))return;
    // We'll create the match by dispatching to parent
    const m={id:genId(),localId:t1.id,visitId:t2.id,marcadorL:0,marcadorV:0,estatus:"programado",fecha:new Date().toISOString().split("T")[0],genero,fase};
    // Access parent state through a trick - pass match to onIniciarPartido
    onCrearPartido.__addPlayoff?.(m);
  };

  // Render a bracket slot
  const Slot=({fase,label,t1,t2,round})=>{
    const m=findMatch(fase);
    const fin=m?.estatus==="finalizado";
    const winner=fin?getWinner(fase):null;
    const prog=m?.estatus==="programado";
    return(
      <div style={{background:"#fff",borderRadius:10,border:`2px solid ${fin?"#10b981":prog?"#f59e0b":"#e2e8f0"}`,overflow:"hidden",marginBottom:8}}>
        <div style={{padding:"5px 10px",background:fin?"#10b981":prog?"#f59e0b":"#e2e8f0",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <span style={{fontFamily:F.bar,fontWeight:800,fontSize:"0.56rem",color:fin||prog?"white":"#94a3b8",letterSpacing:1}}>{label}</span>
          {fin&&<span style={{fontSize:"0.48rem",fontWeight:900,color:"white"}}>✅</span>}
          {prog&&<span style={{fontSize:"0.48rem",fontWeight:900,color:"white"}}>EN CURSO</span>}
        </div>
        <div style={{padding:"6px 10px"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:3}}>
            <div style={{display:"flex",alignItems:"center",gap:5,flex:1}}>
              {t1?<><TB team={t1} size={18} fontSize="0.38rem"/><span style={{fontWeight:700,fontSize:"0.62rem",color:winner?.id===t1.id?"#10b981":"#1e293b"}}>{t1.nombre}</span></>:<span style={{fontSize:"0.56rem",color:"#cbd5e1",fontStyle:"italic"}}>Por definir</span>}
            </div>
            {m&&<span style={{fontWeight:900,fontSize:"0.78rem",color:winner?.id===t1?.id?"#10b981":"#64748b"}}>{m.marcadorL||0}</span>}
          </div>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <div style={{display:"flex",alignItems:"center",gap:5,flex:1}}>
              {t2?<><TB team={t2} size={18} fontSize="0.38rem"/><span style={{fontWeight:700,fontSize:"0.62rem",color:winner?.id===t2.id?"#10b981":"#1e293b"}}>{t2.nombre}</span></>:<span style={{fontSize:"0.56rem",color:"#cbd5e1",fontStyle:"italic"}}>Por definir</span>}
            </div>
            {m&&<span style={{fontWeight:900,fontSize:"0.78rem",color:winner?.id===t2?.id?"#10b981":"#64748b"}}>{m.marcadorV||0}</span>}
          </div>
        </div>
        {!m&&t1&&t2&&<button onClick={()=>{onCrearPartido(t1.id,t2.id,fase);onNav("mesa");}} style={{width:"100%",padding:"6px",background:"#7c3aed",color:"white",border:"none",fontWeight:900,fontSize:"0.52rem",cursor:"pointer",fontFamily:F.bar,letterSpacing:1}}>▶️ CREAR PARTIDO</button>}
        {prog&&<button onClick={()=>{onIniciarPartido(m);setMesaStep("active");onNav("mesa");}} style={{width:"100%",padding:"6px",background:"#f59e0b",color:"white",border:"none",fontWeight:900,fontSize:"0.52rem",cursor:"pointer",fontFamily:F.bar,letterSpacing:1}}>⏱️ IR A MESA</button>}
      </div>
    );
  };

  return(<div style={S.page}><Hdr title={`🏆 PLAYOFF ${genLabel}`} onBack={onBack} color="#ea580c"/>
    <div style={{padding:"12px 10px 80px"}}>
      {champion&&<div style={{background:"linear-gradient(135deg,#f59e0b,#ea580c)",borderRadius:14,padding:16,marginBottom:14,textAlign:"center",boxShadow:"0 6px 24px rgba(234,88,12,0.3)"}}>
        <div style={{fontSize:"2rem",marginBottom:4}}>🏆</div>
        <div style={{fontFamily:F.bar,fontWeight:900,fontSize:"1.1rem",color:"white",letterSpacing:2}}>CAMPEÓN</div>
        <div style={{display:"flex",justifyContent:"center",alignItems:"center",gap:10,marginTop:8}}>
          <TB team={champion} size={48} fontSize="0.7rem" border="3px solid white"/>
          <div style={{textAlign:"left"}}><div style={{fontFamily:F.bar,fontWeight:900,fontSize:"1.3rem",color:"white"}}>{champion.nombre}</div><div style={{fontSize:"0.5rem",color:"rgba(255,255,255,0.7)"}}>Grupo {champion.grupo}</div></div>
        </div>
      </div>}

      {activeGrupos.length<2?<Empty icon="🏆" title="Necesitas 2+ grupos" desc="Registra equipos en al menos 2 grupos"/>:<>
        <div style={{...S.card,padding:12,marginBottom:14}}>
          <div style={{fontFamily:F.bar,fontWeight:800,fontSize:"0.7rem",color:"#ea580c",letterSpacing:1,marginBottom:8}}>📋 CLASIFICADOS POR GRUPO</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6}}>
            {activeGrupos.map(g=>{const r=calcStandings(g);return(
              <div key={g} style={{background:"#f8fafc",borderRadius:8,padding:8,border:`2px solid ${GRUPO_COLORS[g]}22`}}>
                <div style={{fontFamily:F.bar,fontWeight:900,fontSize:"0.54rem",color:GRUPO_COLORS[g],marginBottom:4}}>GRUPO {g}</div>
                {[0,1].map(i=>{const t=r[i];return t?(<div key={i} style={{display:"flex",alignItems:"center",gap:4,marginBottom:2}}>
                  <span style={{fontWeight:900,fontSize:"0.5rem",color:i===0?"#f59e0b":"#94a3b8",width:12}}>{i+1}°</span>
                  <TB team={t} size={16} fontSize="0.36rem"/>
                  <span style={{fontWeight:700,fontSize:"0.56rem",color:"#1e293b",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{t.nombre}</span>
                </div>):<div key={i} style={{fontSize:"0.5rem",color:"#cbd5e1",paddingLeft:12}}>—</div>;})}
              </div>
            );})}
          </div>
        </div>

        <div style={{fontFamily:F.bar,fontWeight:900,fontSize:"0.72rem",color:"#ea580c",letterSpacing:1.5,marginBottom:6}}>🏀 CUARTOS DE FINAL</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6,marginBottom:14}}>
          {bracket.map(b=><Slot key={b.id} fase={b.id} label={b.fase} t1={b.t1} t2={b.t2} round="QF"/>)}
        </div>

        <div style={{fontFamily:F.bar,fontWeight:900,fontSize:"0.72rem",color:"#ea580c",letterSpacing:1.5,marginBottom:6}}>⚡ SEMIFINALES</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6,marginBottom:14}}>
          {sf.map(b=><Slot key={b.id} fase={b.id} label={b.fase} t1={b.t1} t2={b.t2} round="SF"/>)}
        </div>

        <div style={{fontFamily:F.bar,fontWeight:900,fontSize:"0.72rem",color:"#ea580c",letterSpacing:1.5,marginBottom:6}}>🏆 FINAL</div>
        <Slot fase="F" label="GRAN FINAL" t1={finalMatch.t1} t2={finalMatch.t2} round="F"/>
      </>}
    </div>
  </div>);
}

// ═══════════════ ÁRBITROS ═══════════════
function ArbitrosView({teams,finMatches,allTeams,onBack,genLabel,genColor}){
  const[tarifa,setTarifa]=useState(5);
  const teamData=teams.map(team=>{
    const jj=finMatches.filter(m=>m.localId===team.id||m.visitId===team.id).length;
    return{...team,jj,monto:jj*tarifa};
  }).sort((a,b)=>b.jj-a.jj);
  const totalPartidos=finMatches.length;
  const totalCobro=teamData.reduce((s,t)=>s+t.monto,0);
  const totalPorEquipo=teamData.reduce((s,t)=>s+t.jj,0);
  return(<div style={S.page}><Hdr title={`⚖️ ÁRBITROS ${genLabel}`} onBack={onBack} color="#dc2626"/>
    <div style={{padding:"12px 10px 80px",maxWidth:500,margin:"0 auto"}}>
      <div style={{...S.card,padding:14,marginBottom:14}}>
        <p style={{fontFamily:F.bar,fontWeight:800,fontSize:"0.72rem",color:"#1e293b",marginBottom:10,letterSpacing:1}}>💰 TARIFA POR PARTIDO</p>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <span style={{fontWeight:900,fontSize:"0.9rem",color:"#64748b"}}>$</span>
          <input type="number" value={tarifa} onChange={e=>setTarifa(Math.max(0,parseFloat(e.target.value)||0))} style={{...S.inp,width:100,textAlign:"center",fontWeight:900,fontSize:"1.1rem"}} min="0" step="0.5"/>
          <span style={{fontSize:"0.6rem",color:"#94a3b8",fontWeight:600}}>por partido pitado</span>
        </div>
        <p style={{fontSize:"0.48rem",color:"#94a3b8",marginTop:6}}>Este monto se cobra a cada equipo participante por cada partido jugado</p>
      </div>
      <div style={{...S.card,marginBottom:14,borderTop:"3px solid #dc2626"}}>
        <div style={{padding:"10px 14px",background:"linear-gradient(135deg,#7f1d1d,#dc2626)",color:"white",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div><div style={{fontFamily:F.bar,fontWeight:900,fontSize:"0.78rem",letterSpacing:1}}>RESUMEN GENERAL</div><div style={{fontSize:"0.48rem",opacity:0.7,marginTop:2}}>{genLabel} · {totalPartidos} partidos finalizados</div></div>
          <div style={{textAlign:"right"}}><div style={{fontFamily:F.bar,fontWeight:900,fontSize:"1.5rem"}}>${totalCobro.toFixed(2)}</div><div style={{fontSize:"0.42rem",opacity:0.7}}>RECAUDACIÓN TOTAL</div></div>
        </div>
        <div style={{padding:"8px 14px",background:"#fef2f2",display:"flex",justifyContent:"space-around",gap:8}}>
          <div style={{textAlign:"center"}}><div style={{fontWeight:900,fontSize:"0.9rem",color:"#dc2626"}}>{totalPartidos}</div><div style={{fontSize:"0.42rem",color:"#94a3b8",fontWeight:700}}>PARTIDOS</div></div>
          <div style={{textAlign:"center"}}><div style={{fontWeight:900,fontSize:"0.9rem",color:"#dc2626"}}>{teamData.length}</div><div style={{fontSize:"0.42rem",color:"#94a3b8",fontWeight:700}}>EQUIPOS</div></div>
          <div style={{textAlign:"center"}}><div style={{fontWeight:900,fontSize:"0.9rem",color:"#dc2626"}}>${tarifa.toFixed(2)}</div><div style={{fontSize:"0.42rem",color:"#94a3b8",fontWeight:700}}>TARIFA</div></div>
          <div style={{textAlign:"center"}}><div style={{fontWeight:900,fontSize:"0.9rem",color:"#dc2626"}}>{totalPorEquipo}</div><div style={{fontSize:"0.42rem",color:"#94a3b8",fontWeight:700}}>PARTICIPACIONES</div></div>
        </div>
      </div>
      {teamData.length===0?<Empty icon="⚖️" title="Sin partidos finalizados" desc="Finaliza partidos desde la mesa técnica"/>:
      <div style={S.card}>
        <div style={{overflowX:"auto"}}>
          <table style={{width:"100%",borderCollapse:"collapse",fontSize:"0.7rem",minWidth:360}}>
            <thead><tr style={{background:"#f8fafc",color:"#94a3b8",fontSize:"0.46rem",letterSpacing:1,textTransform:"uppercase"}}>
              <th style={{...S.th,textAlign:"left",paddingLeft:12}}>Equipo</th>
              <th style={S.th}>Grupo</th>
              <th style={S.th}>PJ</th>
              <th style={{...S.th,background:"#fef2f2",color:"#dc2626",fontWeight:900}}>MONTO</th>
            </tr></thead>
            <tbody>{teamData.map((t,i)=>(<tr key={t.id} style={{borderBottom:"1px solid #f1f5f9",background:i%2===0?"white":"#fafafa"}}>
              <td style={{...S.td,textAlign:"left",paddingLeft:8}}>
                <div style={{display:"flex",alignItems:"center",gap:6}}>
                  <TB team={t} size={22} fontSize="0.42rem"/>
                  <span style={{fontWeight:700,fontSize:"0.68rem",color:"#1e293b"}}>{t.nombre}</span>
                </div>
              </td>
              <td style={S.td}><span style={{background:GRUPO_COLORS[t.grupo]||"#64748b",color:"white",padding:"1px 6px",borderRadius:4,fontWeight:900,fontSize:"0.5rem"}}>{t.grupo}</span></td>
              <td style={{...S.td,fontWeight:900,color:"#1e293b",fontSize:"0.85rem"}}>{t.jj}</td>
              <td style={{...S.td,fontWeight:900,color:"#dc2626",fontSize:"0.85rem"}}>${t.monto.toFixed(2)}</td>
            </tr>))}</tbody>
            <tfoot><tr style={{background:"#1e293b"}}>
              <td colSpan={2} style={{...S.td,textAlign:"right",color:"white",fontWeight:900,fontSize:"0.6rem",paddingRight:8}}>TOTAL</td>
              <td style={{...S.td,color:"#fbbf24",fontWeight:900,fontSize:"0.85rem"}}>{totalPorEquipo}</td>
              <td style={{...S.td,color:"#fbbf24",fontWeight:900,fontSize:"0.85rem"}}>${totalCobro.toFixed(2)}</td>
            </tr></tfoot>
          </table>
        </div>
        <div style={{padding:"8px 12px",background:"#f8fafc",borderTop:"1px solid #e2e8f0",fontSize:"0.44rem",color:"#94a3b8",lineHeight:1.5}}>
          <strong>Nota:</strong> Incluye todos los partidos finalizados (fase de grupos, semifinales, final). Cada equipo paga ${tarifa.toFixed(2)} por cada partido jugado.
        </div>
      </div>}
    </div>
  </div>);
}

// ═══════════════ SHARED ═══════════════
function Hdr({title,onBack,color="#1e3a8a"}){return<div style={{background:color,padding:"11px 14px",color:"white",display:"flex",justifyContent:"space-between",alignItems:"center",boxShadow:"0 3px 10px rgba(0,0,0,0.15)",flexShrink:0}}><h2 style={{margin:0,fontFamily:F.bar,fontWeight:900,fontSize:"0.92rem",letterSpacing:1}}>{title}</h2><button onClick={onBack} style={{background:"rgba(255,255,255,0.15)",color:"white",border:"none",padding:"5px 12px",borderRadius:7,fontWeight:700,cursor:"pointer",fontSize:"0.64rem"}}>← VOLVER</button></div>;}
function Empty({icon,title,desc}){return<div style={{...S.card,padding:34,textAlign:"center",color:"#94a3b8"}}><div style={{fontSize:"1.5rem",marginBottom:4}}>{icon}</div><p style={{fontWeight:700,fontSize:"0.78rem",margin:"0 0 3px",color:"#475569"}}>{title}</p><p style={{fontSize:"0.64rem",margin:0}}>{desc}</p></div>;}
function CModal({msg,onOk,onNo}){return<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.85)",zIndex:9000,display:"flex",alignItems:"center",justifyContent:"center",padding:18}}><div style={{background:"#1e293b",borderRadius:14,padding:22,maxWidth:300,width:"100%",border:"1px solid #334155",boxShadow:"0 20px 60px rgba(0,0,0,0.5)"}}><p style={{color:"white",fontWeight:700,fontSize:"0.85rem",textAlign:"center",marginBottom:20,lineHeight:1.5,whiteSpace:"pre-line"}}>{msg}</p><div style={{display:"flex",gap:8}}><button onClick={onNo} style={{flex:1,padding:10,background:"#334155",color:"#94a3b8",border:"none",borderRadius:7,fontWeight:700,fontSize:"0.7rem",cursor:"pointer"}}>CANCELAR</button><button onClick={onOk} style={{flex:1,padding:10,background:"#10b981",color:"white",border:"none",borderRadius:7,fontWeight:900,fontSize:"0.7rem",cursor:"pointer"}}>CONFIRMAR</button></div></div></div>;}
const mBtn=bg=>({flex:1,padding:"10px 0",background:bg,color:"white",border:"none",borderRadius:7,fontWeight:700,fontSize:"0.58rem",cursor:"pointer",fontFamily:F.bar,letterSpacing:0.5});

const S={app:{fontFamily:F.out,minHeight:"100vh",background:"#f3f4f6"},menuWrap:{minHeight:"100vh",background:"linear-gradient(160deg,#0a0f1f 0%,#0f1d4e 40%,#1a0a3e 100%)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:18,position:"relative",overflow:"hidden"},menuDots:{position:"absolute",inset:0,backgroundImage:"radial-gradient(circle,rgba(255,255,255,0.03) 1px,transparent 1px)",backgroundSize:"24px 24px"},menuTitle:{fontFamily:F.bar,fontWeight:900,fontSize:"2.2rem",color:"white",letterSpacing:4,margin:0,textShadow:"0 4px 20px rgba(0,0,0,0.4)"},menuSub:{color:"#fbbf24",fontSize:"0.6rem",fontWeight:700,letterSpacing:2,margin:"4px 0 0",textTransform:"uppercase",fontFamily:F.bar},page:{minHeight:"100vh",background:"#f3f4f6",display:"flex",flexDirection:"column"},card:{background:"white",borderRadius:12,overflow:"hidden",boxShadow:"0 2px 10px rgba(0,0,0,0.05)",border:"1px solid #e2e8f0"},th:{padding:"7px 4px",textAlign:"center"},td:{padding:"7px 4px",textAlign:"center",fontWeight:700,fontSize:"0.7rem"},inp:{width:"100%",padding:"8px 10px",borderRadius:7,border:"1px solid #e2e8f0",fontSize:"0.78rem",fontWeight:600,background:"#f8fafc",boxSizing:"border-box",color:"#1e293b"},lbl:{fontSize:"0.5rem",fontWeight:800,color:"#94a3b8",textTransform:"uppercase",letterSpacing:0.5,display:"block",marginBottom:2,fontFamily:F.bar},btnFull:{width:"100%",padding:11,borderRadius:8,border:"none",color:"white",fontWeight:900,fontSize:"0.78rem",cursor:"pointer",fontFamily:F.bar,letterSpacing:1},btnSm:{background:"#10b981",color:"white",border:"none",borderRadius:6,padding:"6px 10px",fontWeight:900,cursor:"pointer",fontSize:"0.82rem"},iconBtn:{background:"none",border:"none",cursor:"pointer",fontSize:"0.82rem",padding:"2px 3px"},toast:{position:"fixed",top:14,left:"50%",transform:"translateX(-50%)",color:"white",padding:"7px 16px",borderRadius:20,fontWeight:900,fontSize:"0.7rem",boxShadow:"0 5px 18px rgba(0,0,0,0.4)",zIndex:9000,whiteSpace:"nowrap",fontFamily:F.bar,letterSpacing:0.5}};