/* NutriFit Práctico · main.js */

/* ================= Animaciones de técnica ================= */
const T=(a,b)=>f=>f<.5?a:b;
const ANIM={
  press_banca_mancuernas:{build:s=>bench(s,true),secs:4,phase:T("BAJA CONTROLADO","SUBE EMPUJANDO"),
    cues:["Retracción escapular: pecho fuera y hombros pegados al banco.","Codos a unos 45º del cuerpo, no abiertos en T.","Pies firmes en el suelo.","Baja controlado y sube sin chocar las mancuernas."]},
  sentadilla_aire:{build:s=>sqRig(s,"air"),secs:4.4,phase:T("BAJA SENTÁNDOTE","SUBE EMPUJANDO EL SUELO"),
    cues:["Baja controlando, talones pegados al suelo.","Rodillas siguiendo la dirección de los pies.","Si tienes poca movilidad o dolor articular: siéntate y levántate de una silla.","Espalda firme, mirada al frente."]},
  plancha:{build:plank,secs:3,phase:()=>"MANTÉN LA POSICIÓN",
    cues:["Codos justo debajo de los hombros.","Cuerpo recto de cabeza a talones.","Aprieta glúteos y abdomen, ombligo hacia dentro.","Respira con calma, sin aguantar el aire.","Si la cadera sube o baja, descansa."]}
};
const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
const act=[];let last=performance.now();

function render(st){
  const per=st.ex.secs*(st.slow?2:1),f=(st.t%per)/per;
  st.draw(ease(f),st.t);
  st.ph.textContent=st.ex.phase(f);
}
function mount(host){
  const ex=ANIM[host.dataset.anim];
  if(!ex||host.firstChild)return;
  host.innerHTML='<svg viewBox="0 0 400 260" role="img" aria-label="Animación de la técnica del ejercicio"></svg>'+
    '<div class="abar"><span class="aph" aria-live="off"></span><button type="button" class="btn sm" data-p>Pausa</button><button type="button" class="btn sm" data-s>Lento</button></div>';
  const svg=host.querySelector("svg");
  const st={ex,t:0,playing:!reduce,slow:false,host,ph:host.querySelector(".aph")};
  st.draw=ex.build(svg);
  render(st);
  act.push(st);
  host.querySelector("[data-p]").onclick=e=>{st.playing=!st.playing;e.target.textContent=st.playing?"Pausa":"Seguir"};
  host.querySelector("[data-s]").onclick=e=>{st.slow=!st.slow;e.target.textContent=st.slow?"Normal":"Lento"};
  if(reduce)host.querySelector("[data-p]").textContent="Seguir";
}
function loop(now){
  const dt=Math.min(.1,(now-last)/1000);last=now;
  act.forEach(s=>{if(s.playing&&s.host.offsetParent){s.t+=dt;render(s)}});
  requestAnimationFrame(loop);
}
document.querySelectorAll("[data-anim]").forEach(mount);
requestAnimationFrame(loop);

/* Pestañas */
(function(){
  const tabs=[...document.querySelectorAll(".demo .tab")];
  tabs.forEach(t=>t.addEventListener("click",()=>select(t)));
  tabs.forEach((t,i)=>t.addEventListener("keydown",e=>{
    if(e.key==="ArrowRight"||e.key==="ArrowLeft"){
      const n=tabs[(i+(e.key==="ArrowRight"?1:-1)+tabs.length)%tabs.length];
      n.focus();select(n);e.preventDefault();
    }
  }));
  function select(tab){
    tabs.forEach(t=>{
      const on=t===tab;
      t.setAttribute("aria-selected",on);
      t.tabIndex=on?0:-1;
      document.getElementById(t.getAttribute("aria-controls")).hidden=!on;
    });
  }
  tabs.forEach((t,i)=>t.tabIndex=i===0?0:-1);
})();

/* ================= Reseñas ================= */
/* Cada reseña va tal cual está en Google (solo erratas). Nombre de Google con inicial del apellido.
   Para añadir otra: copia un bloque y cambia name y text.
   Enlace para dejar reseña (aún NO se muestra): https://g.page/r/CSvYH9VvfNinEAE/review */
const REVIEWS=[
  {name:"Alejandra E.",stars:5,text:"Estaba totalmente estancada con el gimnasio y las comidas. Hacer el test gratuito fue revelador y el plan nutricional y de entrenamiento me devolvió el norte. Un 10 en profesionalidad."},
  {name:"Judith P.",stars:5,text:"Hartísima de probar dietas milagro que me dejaban sin energía el jueves. Este método con comida real es el único que me ha funcionado de verdad. Gracias por todo."},
  {name:"Osiris P.",stars:5,text:"Excelente plan de nutrición para personas ocupadas. Cero recetas de 3 horas. Comida rápida, barata y efectiva. Recomiendo el servicio a 100%."},
  {name:"Ana María R.",stars:5,text:"El test de diagnóstico gratuito ya te abre los ojos de por qué estabas fallando. El plan de 28 días es directo, económico y muy fácil de seguir trabajando de cara al público."}
];
(function(){
  const track=document.getElementById("reviews");
  if(!track)return;
  const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
  track.innerHTML=REVIEWS.map(r=>
    '<article class="rcard"><div class="rhead"><div class="ava" aria-hidden="true">'+esc(r.name.charAt(0))+'</div>'+
    '<div><div class="rname">'+esc(r.name)+'</div><div class="rsrc">Reseña en Google</div></div></div>'+
    '<div class="stars" role="img" aria-label="'+r.stars+' de 5 estrellas">'+"★".repeat(r.stars)+"☆".repeat(5-r.stars)+'</div>'+
    '<p class="rtext">'+esc(r.text)+'</p></article>').join("");
})();

/* ================= Botón flotante del test ================= */
(function(){
  const fab=document.getElementById("fab"),txt=document.getElementById("fabTxt"),hero=document.querySelector(".hero .btn")||document.querySelector(".hero");
  const hide=[document.getElementById("planes"),document.querySelector(".band"),document.querySelector(".final")].filter(Boolean);
  if(!fab||!hero)return;
  const MSG=["Haz el test gratis","Sí, otra vez: el test 😅","Gratis, que no mordemos 🐾","Pesados, pero con cariño 💚","1 min. Menos que un anuncio ⏱","Dale, el sofá puede esperar 🛋️","Tu yo del futuro te lo agradece 🙏","Test gratis. Excusas, no 🙅","¿Sigues ahí? Pues test 👀","Menos que elegir serie 📺"];
  let i=0,heroOut=false;const hiding=new Set();
  const upd=()=>fab.classList.toggle("on",heroOut&&hiding.size===0);
  if("IntersectionObserver" in window){
    new IntersectionObserver(e=>{heroOut=!e[0].isIntersecting&&e[0].boundingClientRect.top<0;upd()},{threshold:0}).observe(hero);
    const io=new IntersectionObserver(es=>{es.forEach(e=>{e.isIntersecting?hiding.add(e.target):hiding.delete(e.target)});upd()},{threshold:0});
    hide.forEach(h=>io.observe(h));
  }else{fab.classList.add("on")}
  if(!reduce)setInterval(()=>{
    if(!fab.classList.contains("on"))return;
    txt.classList.add("out");
    setTimeout(()=>{i=(i+1)%MSG.length;txt.textContent=MSG[i];fab.href="/test?src=web_fab_"+(i+1);txt.classList.remove("out");fab.classList.add("wig");setTimeout(()=>fab.classList.remove("wig"),700)},260);
  },4200);
})();

/* aparecer al hacer scroll (si falla JS, todo se ve igual) */
(function(){
  if(!("IntersectionObserver" in window)||matchMedia("(prefers-reduced-motion:reduce)").matches)return;
  document.documentElement.classList.add("js");
  var els=document.querySelectorAll(".how li,.trust-row li,.plan,.rcard");
  els.forEach(function(e){e.classList.add("rv")});
  var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}})},{threshold:.12});
  els.forEach(function(e,i){e.style.transitionDelay=(i%5)*60+"ms";io.observe(e)});
})();

/* demo interactiva: elegir qué plan ver */
(function(){
  var box=document.getElementById("appshow");if(!box)return;
  var fr=document.getElementById("demoFrame"),note=document.getElementById("demoNote");
  var N={completo:"Entreno, comidas y compra, todo en la misma app.",nutricion:"Solo comida: el entreno sale en gris, como en tu app.",entreno:"Solo entreno: las comidas y la compra salen en gris, como en tu app."};
  var tabs=box.querySelectorAll(".as-tab");
  tabs.forEach(function(t){t.addEventListener("click",function(){
    tabs.forEach(function(x){x.setAttribute("aria-selected",String(x===t))});
    fr.src="/demo-app.html?plan="+t.dataset.plan;note.textContent=N[t.dataset.plan];
  })});
})();
