const NS="http://www.w3.org/2000/svg";
const LIME="#b8f919",DARK="#5d7a1a",PLATE="#e8ecea",GREY="#3a474a",GREY2="#2f3a3d";
function el(tag,attrs,parent){const e=document.createElementNS(NS,tag);for(const k in attrs)e.setAttribute(k,attrs[k]);if(parent)parent.appendChild(e);return e}
function seg(svg,w,c){return el("line",{class:"fl","stroke-width":w,stroke:c||LIME},svg)}
function setSeg(e,a,b){e.setAttribute("x1",a.x);e.setAttribute("y1",a.y);e.setAttribute("x2",b.x);e.setAttribute("y2",b.y)}
function ik(A,B,l1,l2,pick){const dx=B.x-A.x,dy=B.y-A.y;let d=Math.hypot(dx,dy);d=Math.max(1,Math.min(d,l1+l2-.01));
  const a=(l1*l1-l2*l2+d*d)/(2*d),h=Math.sqrt(Math.max(0,l1*l1-a*a)),mx=A.x+dx*a/d,my=A.y+dy*a/d;
  const p1={x:mx-dy*h/d,y:my+dx*h/d},p2={x:mx+dy*h/d,y:my-dx*h/d};return pick(p1,p2)}
const maxX=(p,q)=>p.x>=q.x?p:q, minX=(p,q)=>p.x<=q.x?p:q, lowY=(p,q)=>p.y>=q.y?p:q, upY=(p,q)=>p.y<=q.y?p:q;
const ease=t=>(1-Math.cos(2*Math.PI*t))/2;
const lerp=(a,b,t)=>a+(b-a)*t, P2=(a,b,t)=>({x:lerp(a.x,b.x,t),y:lerp(a.y,b.y,t)});
function base(svg){el("rect",{x:0,y:0,width:400,height:260,fill:"#10161a"},svg);el("line",{x1:10,y1:215,x2:390,y2:215,stroke:"#2d383b","stroke-width":3,"stroke-linecap":"round"},svg)}
function note(svg,x,y,t){el("text",{x:x,y:y,fill:"#9aa8a4","font-size":12,"text-anchor":"middle"},svg).textContent=t}
function db(svg){const r=el("rect",{width:24,height:9,rx:3,fill:PLATE,stroke:"#aab3af","stroke-width":1.5},svg);return pt=>{r.setAttribute("x",pt.x-12);r.setAttribute("y",pt.y-4.5)}}
function rig(svg,s){s=s||1;const TO=58*s,TH=50*s,SH=50*s,UA=34*s,FA=32*s;
  const torso=seg(svg,11*s+1),thigh=seg(svg,9*s+1),shin=seg(svg,9*s+1),foot=seg(svg,7),ua=seg(svg,6.5),fa=seg(svg,6);
  const head=el("circle",{r:10*s,fill:LIME},svg);
  return {TO,TH,SH,UA,FA,put(P){const H=P.H,S=P.S,A=P.A,W=P.W;
    const K=P.K||ik(H,A,TH,SH,P.kp||maxX),E=P.E||ik(S,W,UA,FA,P.ep||lowY);
    setSeg(torso,H,S);setSeg(thigh,H,K);setSeg(shin,K,A);setSeg(foot,A,{x:A.x+(P.fd===undefined?1:P.fd)*16*s,y:A.y+5});
    setSeg(ua,S,E);setSeg(fa,E,W);
    const dx=S.x-H.x,dy=S.y-H.y,L=Math.hypot(dx,dy)||1;
    const hp=P.hd||{x:S.x+dx/L*22*s,y:S.y+dy/L*22*s};head.setAttribute("cx",hp.x);head.setAttribute("cy",hp.y);return {K,E}}}}

/* ===== PRESS DE BANCA (barra o mancuernas) ===== */
function bench(svg,dumb){
  base(svg);
  el("rect",{x:92,y:143,width:215,height:9,rx:4,fill:GREY},svg);
  el("rect",{x:112,y:152,width:8,height:63,fill:GREY2},svg);el("rect",{x:282,y:152,width:8,height:63,fill:GREY2},svg);
  const S={x:130,y:131},H={x:218,y:131},A={x:250,y:205};
  const K=ik(H,A,72,72,maxX);
  const torso=seg(svg,13),thigh=seg(svg,10),shin=seg(svg,10),foot=seg(svg,8),ua=seg(svg,8),fa=seg(svg,7);
  setSeg(torso,S,H);setSeg(thigh,H,K);setSeg(shin,K,A);setSeg(foot,A,{x:A.x+24,y:211});
  el("circle",{cx:104,cy:129,r:13,fill:LIME},svg);
  const pr=dumb?12:21,plate=el("circle",{r:pr,fill:PLATE,stroke:"#aab3af","stroke-width":2},svg),inner=el("circle",{r:dumb?4:6,fill:"#10161a"},svg),hand=el("circle",{r:6,fill:LIME},svg);
  return p=>{const W={x:142-8*p,y:112-72*p},E={x:W.x,y:W.y+44};
    [plate,inner,hand].forEach(c=>{c.setAttribute("cx",W.x);c.setAttribute("cy",W.y)});
    setSeg(ua,S,E);setSeg(fa,E,W)}}

/* ===== SENTADILLA CON BARRA (espalda) ===== */
function squat(svg){
  base(svg);
  const A={x:210,y:205},TH=49,SH=49,TO=60;
  const torso=seg(svg,11),thigh=seg(svg,9),shin=seg(svg,9),foot=seg(svg,7),ua=seg(svg,6),fa=seg(svg,6);
  const head=el("circle",{r:10,fill:LIME},svg),plate=el("circle",{r:12,fill:PLATE,stroke:"#aab3af","stroke-width":2},svg),inner=el("circle",{r:3.5,fill:"#10161a"},svg);
  setSeg(foot,A,{x:A.x+22,y:212});
  return p=>{const H={x:A.x-4-30*p,y:108+50*p},L=(6+34*p)*Math.PI/180;
    const K=ik(H,A,TH,SH,maxX),S={x:H.x+TO*Math.sin(L),y:H.y-TO*Math.cos(L)};
    const B={x:S.x-6,y:S.y-5},E={x:S.x-11,y:S.y+20},Hd={x:S.x+29*Math.sin(L*.7+.15),y:S.y-29*Math.cos(L*.7+.15)};
    setSeg(torso,H,S);setSeg(thigh,H,K);setSeg(shin,K,A);setSeg(ua,S,E);setSeg(fa,E,{x:B.x+3,y:B.y+3});
    head.setAttribute("cx",Hd.x);head.setAttribute("cy",Hd.y);
    [plate,inner].forEach(c=>{c.setAttribute("cx",B.x);c.setAttribute("cy",B.y)})}}

/* ===== PLANCHA ===== */
function plank(svg){
  base(svg);
  const S={x:290,y:159},A={x:60,y:205},E={x:290,y:207};
  const dx=A.x-S.x,dy=A.y-S.y,L=Math.hypot(dx,dy),u={x:dx/L,y:dy/L};
  const pt=d=>({x:S.x+u.x*d,y:S.y+u.y*d});
  const body=seg(svg,12),leg=seg(svg,9),ua=seg(svg,8),fa=seg(svg,8),foot=seg(svg,7);
  setSeg(body,S,pt(88));setSeg(leg,pt(88),A);setSeg(ua,S,E);setSeg(fa,E,{x:335,y:207});setSeg(foot,A,{x:A.x-8,y:212});
  el("circle",{cx:314,cy:153,r:13,fill:LIME},svg);
  const guide=el("line",{x1:314,y1:153,x2:A.x-6,y2:A.y+6,stroke:"#ffffff","stroke-width":2,"stroke-dasharray":"6 6",opacity:".55"},svg);
  note(svg,200,130,"cabeza, cadera y talones en línea");
  return (p,t)=>{guide.setAttribute("stroke-dashoffset",-(t||0)*14);guide.setAttribute("opacity",.35+.35*ease((t||0)/3%1))}}

/* ===== PRESS MILITAR / PRESS DE HOMBROS (de pie) ===== */
function militar(svg){
  base(svg);const s=.85,r=rig(svg,s),A={x:200,y:205};const d=db(svg);
  return p=>{const H={x:198,y:A.y-(r.TH+r.SH)*.97},S={x:198,y:H.y-r.TO};
    const W={x:S.x+14-8*p,y:S.y-2-(r.UA+r.FA)*.92*p};r.put({H,S,A,W});d(W)}}

/* ===== FONDOS EN PARALELAS ===== */
function dips(svg){
  base(svg);const W={x:212,y:88};
  el("rect",{x:W.x+22,y:W.y,width:6,height:127,fill:GREY2},svg);
  el("rect",{x:W.x-14,y:W.y-3,width:44,height:6,rx:3,fill:"#6b7a7e"},svg);
  const r=rig(svg,.85);
  return p=>{const S={x:W.x-4,y:W.y-56+40*p},H={x:S.x-10,y:S.y+48},A={x:H.x-12,y:H.y+83};
    r.put({H,S,A,W,ep:minX,kp:minX,fd:-1})}}

/* ===== JALÓN AL PECHO ===== */
function jalon(svg){
  base(svg);
  el("rect",{x:176,y:152,width:48,height:7,rx:3,fill:GREY},svg);
  el("rect",{x:132,y:166,width:78,height:8,rx:3,fill:GREY},svg);el("rect",{x:132,y:174,width:8,height:41,fill:GREY2},svg);
  const top={x:172,y:12};el("circle",{cx:top.x,cy:top.y,r:6,fill:"#6b7a7e"},svg);
  const cab=el("line",{stroke:"#cfd8d4","stroke-width":2},svg);
  const r=rig(svg,1),H={x:158,y:160},A={x:222,y:208};
  const bar=el("rect",{width:34,height:6,rx:3,fill:PLATE},svg);
  return p=>{const S={x:148-6*p,y:104},W={x:S.x+24-4*p,y:lerp(S.y-58,S.y+12,p)};
    r.put({H,S,A,W,ep:lowY,kp:upY,fd:.4});
    setSeg(cab,top,W);bar.setAttribute("x",W.x-17);bar.setAttribute("y",W.y-3)}}

/* ===== REMO A UNA MANO (banco o silla) ===== */
function remo1(svg,chair){
  base(svg);
  el("rect",{x:176,y:150,width:112,height:8,rx:3,fill:GREY},svg);
  el("rect",{x:190,y:158,width:7,height:57,fill:GREY2},svg);el("rect",{x:268,y:158,width:7,height:57,fill:GREY2},svg);
  if(chair)el("rect",{x:282,y:96,width:7,height:62,rx:3,fill:GREY},svg);
  const s=.95,ua2=seg(svg,6,DARK),fa2=seg(svg,6,DARK);
  const r=rig(svg,s),d=db(svg),H={x:150,y:112},S={x:204,y:106},A={x:158,y:205},B={x:214,y:149};
  const E2=ik(S,B,r.UA,r.FA,maxX);setSeg(ua2,S,E2);setSeg(fa2,E2,B);
  return p=>{const W=P2({x:S.x+3,y:S.y+60},{x:S.x-30,y:S.y+20},p);r.put({H,S,A,W,ep:minX,kp:maxX});d(W)}}

/* ===== REMO SENTADO EN POLEA BAJA / BANDA ===== */
function remoPolea(svg,band){
  base(svg);
  el("rect",{x:130,y:170,width:70,height:8,rx:3,fill:GREY},svg);el("rect",{x:238,y:130,width:8,height:85,fill:GREY},svg);
  const anc={x:392,y:172};el("circle",{cx:anc.x,cy:anc.y,r:6,fill:"#6b7a7e"},svg);
  const cab=el("line",{stroke:band?"#ff9a3d":"#cfd8d4","stroke-width":band?4:2,"stroke-linecap":"round"},svg);
  const r=rig(svg,1),H={x:150,y:164},A={x:233,y:172},grip=el("circle",{r:5,fill:PLATE},svg);
  return p=>{const S={x:lerp(H.x+16,H.x-6,p),y:lerp(H.y-55,H.y-58,p)};
    const W=P2({x:S.x+56,y:S.y+30},{x:S.x+12,y:S.y+46},p);
    r.put({H,S,A,W,ep:minX,kp:upY,fd:.3});setSeg(cab,W,anc);grip.setAttribute("cx",W.x);grip.setAttribute("cy",W.y)}}

/* ===== SENTADILLA GOBLET / AL AIRE ===== */
function sqRig(svg,mode){
  base(svg);const r=rig(svg,1),A={x:210,y:205},d=mode==="goblet"?db(svg):null;
  return p=>{const H={x:A.x-4-30*p,y:107+50*p},L=(6+34*p)*Math.PI/180;
    const S={x:H.x+r.TO*Math.sin(L),y:H.y-r.TO*Math.cos(L)};
    const W=mode==="goblet"?{x:S.x-14*Math.sin(L)+14*Math.cos(L),y:S.y+14*Math.cos(L)+14*Math.sin(L)}:{x:S.x+52,y:S.y+8};
    r.put({H,S,A,W,ep:lowY});if(d)d(W)}}

/* ===== PRENSA DE PIERNAS INCLINADA ===== */
function prensa(svg){
  base(svg);
  const u={x:.766,y:-.643},n={x:.643,y:.766},H={x:170,y:178},S={x:126,y:140};
  el("line",{x1:H.x+u.x*30+n.x*26,y1:H.y+u.y*30+n.y*26,x2:H.x+u.x*118+n.x*26,y2:H.y+u.y*118+n.y*26,stroke:GREY,"stroke-width":6,"stroke-linecap":"round"},svg);
  el("line",{x1:H.x+6,y1:H.y+9,x2:S.x+6,y2:S.y+9,stroke:GREY,"stroke-width":16,"stroke-linecap":"round"},svg);
  el("line",{x1:H.x+10,y1:H.y+12,x2:H.x+10,y2:215,stroke:GREY2,"stroke-width":6},svg);el("line",{x1:S.x+12,y1:S.y+14,x2:S.x+12,y2:215,stroke:GREY2,"stroke-width":6},svg);
  const sled=el("line",{stroke:"#6b7a7e","stroke-width":7,"stroke-linecap":"round"},svg);
  const r=rig(svg,1),W={x:H.x-2,y:H.y-16};
  return p=>{const dd=lerp(50,94,p),A={x:H.x+u.x*dd,y:H.y+u.y*dd};
    setSeg(sled,{x:A.x-n.x*24,y:A.y-n.y*24},{x:A.x+n.x*24,y:A.y+n.y*24});
    r.put({H,S,A,W,kp:upY,ep:lowY,fd:.4})}}

/* ===== PESO MUERTO RUMANO ===== */
function rdl(svg){
  base(svg);const r=rig(svg,1),A={x:212,y:205},d=db(svg);
  return p=>{const L=(4+72*p)*Math.PI/180,H={x:A.x-6-34*p,y:A.y-98+8*p};
    const S={x:H.x+r.TO*Math.sin(L),y:H.y-r.TO*Math.cos(L)};
    const W={x:S.x-16*p,y:S.y+60};r.put({H,S,A,W,ep:lowY});d(W)}}

/* ===== HIP THRUST ===== */
function hipthrust(svg){
  base(svg);
  el("rect",{x:60,y:168,width:78,height:8,rx:3,fill:GREY},svg);
  el("rect",{x:68,y:176,width:7,height:39,fill:GREY2},svg);el("rect",{x:124,y:176,width:7,height:39,fill:GREY2},svg);
  const r=rig(svg,1),S={x:112,y:158},A={x:218,y:205};
  const bar=el("circle",{r:13,fill:PLATE,stroke:"#aab3af","stroke-width":2},svg),bi=el("circle",{r:4,fill:"#10161a"},svg);
  return p=>{const phi=(32-32*p)*Math.PI/180,H={x:S.x+58*Math.cos(phi),y:S.y+58*Math.sin(phi)};
    const W={x:H.x+2,y:H.y-8};r.put({H,S,A,W,kp:upY,ep:lowY});
    [bar,bi].forEach(c=>{c.setAttribute("cx",H.x+2);c.setAttribute("cy",H.y-12)})}}

/* ===== PALLOF (vista desde arriba) ===== */
function pallof(svg){
  base(svg);note(svg,200,22,"VISTA DESDE ARRIBA");
  const anc={x:384,y:172};el("rect",{x:376,y:130,width:14,height:84,rx:5,fill:GREY},svg);note(svg,352,196,"polea");
  el("line",{x1:204,y1:172,x2:204,y2:44,stroke:"#fff","stroke-width":2,"stroke-dasharray":"6 6",opacity:".4"},svg);
  note(svg,204,38,"sin girar");
  el("ellipse",{cx:192,cy:208,rx:7,ry:4,fill:GREY},svg);el("ellipse",{cx:216,cy:208,rx:7,ry:4,fill:GREY},svg);
  const cab=el("line",{stroke:"#cfd8d4","stroke-width":2},svg),sh=seg(svg,14);
  const Sl={x:180,y:174},Sr={x:228,y:174};setSeg(sh,Sl,Sr);
  el("circle",{cx:204,cy:178,r:11,fill:"#8fc40f"},svg);
  const u1=seg(svg,6),f1=seg(svg,6),u2=seg(svg,6),f2=seg(svg,6),grip=el("circle",{r:6,fill:PLATE},svg);
  return p=>{const W={x:206,y:lerp(158,118,p)},El=ik(Sl,W,34,32,minX),Er=ik(Sr,W,34,32,maxX);
    setSeg(u1,Sl,El);setSeg(f1,El,W);setSeg(u2,Sr,Er);setSeg(f2,Er,W);setSeg(cab,W,anc);
    grip.setAttribute("cx",W.x);grip.setAttribute("cy",W.y)}}

/* ===== FLEXIONES (suelo / rodillas) ===== */
function pushup(svg,knees){
  base(svg);const r=rig(svg,1),W={x:204,y:206};
  return p=>{const Sy=lerp(139,184,p),Ay=204,A0={x:knees?112:62,y:Ay};
    const len=knees?r.TH+r.TO:r.TH+r.SH+r.TO,dy=Ay-Sy,dx=Math.sqrt(len*len-dy*dy);
    const u={x:dx/len,y:-dy/len},S={x:A0.x+dx,y:Sy};
    if(knees){const H={x:A0.x+u.x*r.TH,y:A0.y+u.y*r.TH};r.put({H,S,K:A0,A:{x:A0.x-34,y:A0.y-22},W,ep:minX})}
    else{const K={x:A0.x+u.x*r.SH,y:A0.y+u.y*r.SH},H={x:K.x+u.x*r.TH,y:K.y+u.y*r.TH};r.put({H,S,K,A:A0,W,ep:minX,fd:-.3})}}}

/* ===== FONDOS DE TRÍCEPS EN SILLA ===== */
function dipsChair(svg){
  base(svg);
  el("rect",{x:62,y:150,width:72,height:7,rx:3,fill:GREY},svg);
  el("rect",{x:68,y:157,width:6,height:58,fill:GREY2},svg);el("rect",{x:122,y:157,width:6,height:58,fill:GREY2},svg);
  const r=rig(svg,1),W={x:118,y:148},A={x:206,y:205};
  return p=>{const S={x:122+4*p,y:84+46*p},H={x:S.x+16,y:S.y+56};r.put({H,S,A,W,ep:minX,kp:upY})}}

/* ===== FACE PULL CON BANDA ===== */
function facepull(svg){
  base(svg);const s=.85,r=rig(svg,s),A={x:196,y:205};
  const H={x:194,y:A.y-(r.TH+r.SH)*.97},S={x:194,y:H.y-r.TO},anc={x:392,y:S.y-20};
  el("circle",{cx:anc.x,cy:anc.y,r:6,fill:"#6b7a7e"},svg);note(svg,300,236,"al final, separa las manos");
  const band=el("line",{stroke:"#ff9a3d","stroke-width":4,"stroke-linecap":"round"},svg),grip=el("circle",{r:5,fill:PLATE},svg);
  return p=>{const W=P2({x:S.x+52,y:S.y-14},{x:S.x+14,y:S.y-20},p);r.put({H,S,A,W,ep:upY});setSeg(band,W,anc);grip.setAttribute("cx",W.x);grip.setAttribute("cy",W.y)}}

/* ===== ZANCADA HACIA ATRÁS ===== */
function lunge(svg){
  base(svg);
  const th2=seg(svg,9,"#8fc40f"),sh2=seg(svg,9,"#8fc40f"),ft2=seg(svg,7,"#8fc40f");
  const r=rig(svg,1),A1={x:216,y:205};
  return p=>{const sp=Math.sin(Math.PI*p),H={x:212-48*p,y:107+50*p},S={x:H.x,y:H.y-58};
    const A2={x:206-122*p,y:205-34*sp};
    r.put({H,S,A:A1,W:{x:S.x+20,y:S.y+34},ep:lowY});
    const K2=ik(H,A2,50,50,lowY);setSeg(th2,H,K2);setSeg(sh2,K2,A2);setSeg(ft2,A2,{x:A2.x-12,y:A2.y+5})}}

/* ===== PUENTE DE GLÚTEOS ===== */
function bridge(svg){
  base(svg);const r=rig(svg,1),S={x:100,y:201},A={x:196,y:205};
  return p=>{const H=P2({x:S.x+58,y:S.y-2},{x:S.x+52,y:S.y-26},p),W={x:S.x+58,y:206};r.put({H,S,A,W,kp:upY,ep:lowY})}}

/* ===== BIRD-DOG ===== */
function birddog(svg){
  base(svg);
  const sT=seg(svg,10),nA=seg(svg,6,DARK),nT=seg(svg,8,DARK),nS=seg(svg,8,DARK);
  const wT=seg(svg,8),wS=seg(svg,8),wA=seg(svg,6);
  const head=el("circle",{r:9,fill:LIME},svg);
  const H={x:110,y:162},S={x:162,y:154},K={x:110,y:206},Ap={x:66,y:206};
  setSeg(sT,H,S);setSeg(nA,S,{x:S.x,y:206});setSeg(nT,H,K);setSeg(nS,K,Ap);head.setAttribute("cx",S.x+20);head.setAttribute("cy",S.y-4);
  return p=>{const A2=P2(Ap,{x:H.x-86,y:H.y+4},p),K2=ik(H,A2,44,44,lowY);setSeg(wT,H,K2);setSeg(wS,K2,A2);
    const a=Math.PI/2*p;setSeg(wA,S,{x:S.x+52*Math.sin(a),y:S.y+52*Math.cos(a)})}}

