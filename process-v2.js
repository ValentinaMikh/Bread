// Variant 02 of the bread-process block: illustrated stages with sound (scene and timing as in the source file).
(()=>{
'use strict';
const root=document.getElementById('process-illustrated');if(!root)return;
const $=(s,r=root)=>r.querySelector(s),$$=(s,r=root)=>[...r.querySelectorAll(s)];
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
const clamp=(v,a=0,b=1)=>Math.min(b,Math.max(a,v));
const ease=t=>t*t*(3-2*t);
const track=()=>{};

/* ═══ ПРОПЕЧЁННОСТЬ: шрифт «сырое → допечено» ═══ */
function setBake(el,b){
  el.style.setProperty('--bake',b.toFixed(3));
  const lvl=b>=.97?0:b>=.8?4:b>=.58?3:b>=.3?2:1;
  if(lvl!==el._l){el._l=lvl;el.style.filter=lvl?`url(#s${el.dataset.size||'b'}${lvl})`:'none'}
}
function tween(el,from,to,ms,done){
  if(reduced){setBake(el,to);done&&done();return}
  const t0=performance.now();cancelAnimationFrame(el._raf);
  const f=now=>{const k=clamp((now-t0)/ms);setBake(el,from+(to-from)*ease(k));if(k<1)el._raf=requestAnimationFrame(f);else done&&done()};
  el._raf=requestAnimationFrame(f);
}
// «Пропекание» — только если у заголовка (или его части) есть класс .baked; без него заголовок статичный.
const title=$('#process-title.baked')||$('#process-title .baked');
if(title){
  setBake(title,0);
  if(reduced)setBake(title,1);
  else{let d=false;const go=()=>{if(!d){d=true;setTimeout(()=>tween(title,0,1,3000),250)}};
    // Bake the title the first time the section scrolls into view.
    new IntersectionObserver((es,o)=>{if(es[0].isIntersecting){o.disconnect();(document.fonts?document.fonts.ready:Promise.resolve()).then(go)}},{threshold:.4}).observe(title)}
}


let curTab=0;
const soundBtn=$('.sound');
// Если на странице есть общий звук сайта (window.breadSound, дизайн 02), блок отдаёт ему управление:
// кнопка «Звук» включает музыку всего сайта, а этапы задают звук хлеба. Иначе — собственный звук блока, как раньше.
const ext=window.breadSound;
let applySection;
if(ext){
  const pill=$('.now-pill');if(pill)pill.remove();
  const sync=on=>{soundBtn.setAttribute('aria-pressed',String(on));soundBtn.setAttribute('aria-label',on?'Выключить звуки':'Включить звуки')};
  ext.onChange(sync);sync(ext.isOn());
  soundBtn.addEventListener('click',()=>ext.toggle());
  applySection=()=>ext.setStage(curTab);
  new IntersectionObserver(([e])=>ext.setStageVisible(e.isIntersecting),{rootMargin:'-45% 0px -45% 0px'}).observe(root);
}else{
const audioBase=new URL('assets/',document.currentScript.src);
const piano=new Audio(new URL('bread-piano.mp3',audioBase));
piano.preload='none';
piano.loop=true;
piano.volume=0;

const effect=new Audio();
effect.preload='none';
effect.volume=0;

const stages=[
  {tracks:['bread-starter.mp3','bread-bubbles.mp3'],label:'Закваска и пузырьки'},
  {tracks:['bread-dough.mp3'],label:'Раскатывание теста'},
  {tracks:['bread-crust.mp3'],label:'Потрескивание корочки'}
];
let trackIndex=0,pillTimer;
let visible=false,muted=false,blocked=false,playing=false,volume=0,fadeFrame;
const pill=$('.now-pill'),pillT=$('span',pill);

function updateButton(){
  const active=playing&&!blocked;
  soundBtn.setAttribute('aria-pressed',String(active));
  soundBtn.setAttribute('aria-label',active?'Выключить звуки':'Включить звуки');
}

function play(audio){
  audio.play().catch(error=>{
    if(error.name==='NotAllowedError'&&playing){
      blocked=true;
      syncPlayback();
    }else if(error.name!=='AbortError'&&error.name!=='NotAllowedError'){
      console.warn('Не удалось воспроизвести звук пекарни',error);
    }
  });
}

function selectEffect(){
  effect.src=new URL(stages[curTab].tracks[trackIndex],audioBase);
  if(playing)play(effect);
}

effect.addEventListener('ended',()=>{
  if(!playing)return;
  trackIndex=(trackIndex+1)%stages[curTab].tracks.length;
  selectEffect();
});

applySection=function(){
  trackIndex=0;
  selectEffect();
  if(!playing)return;
  pillT.textContent=stages[curTab].label;
  pill.classList.add('show');
  clearTimeout(pillTimer);
  pillTimer=setTimeout(()=>pill.classList.remove('show'),3200);
};

function fadeTo(target,immediate){
  cancelAnimationFrame(fadeFrame);
  const from=volume,start=performance.now();
  function step(now){
    const progress=immediate||from===target?1:Math.min(1,(now-start)/650);
    volume=from+(target-from)*progress;
    piano.volume=.35*volume;
    effect.volume=.65*volume;
    if(progress<1)fadeFrame=requestAnimationFrame(step);
    else if(target===0){
      piano.pause();
      effect.pause();
    }
  }
  step(start);
}

function syncPlayback(){
  const shouldPlay=visible&&!muted&&!blocked&&!document.hidden;
  if(shouldPlay!==playing){
    playing=shouldPlay;
    if(playing){
      play(piano);
      play(effect);
    }else{
      pill.classList.remove('show');
    }
    fadeTo(playing?1:0,document.hidden||blocked);
  }else if(document.hidden){
    fadeTo(0,true);
  }
  updateButton();
}

applySection();
new IntersectionObserver(([entry])=>{
  visible=entry.isIntersecting;
  if(!visible)blocked=false;
  syncPlayback();
},{rootMargin:'-10% 0px'}).observe(root);

soundBtn.addEventListener('click',()=>{
  muted=playing;
  blocked=false;
  if(!muted)visible=true;
  syncPlayback();
});
document.addEventListener('click',event=>{
  if(blocked&&visible&&!soundBtn.contains(event.target)){
    blocked=false;
    syncPlayback();
  }
});
document.addEventListener('visibilitychange',syncPlayback);

}

/* ═══ процесс: иллюстрированный мультфильм по этапам ═══ */
const tabs=$$('.tab'),panels=$$('.panels>div');
tabs.forEach((t,i)=>{const p=document.createElement('p');p.className='mobile-stage-copy';p.textContent=$('.tab-copy',t).textContent;panels[i].prepend(p)});
const SCN=(()=>{
  const $g=id=>document.getElementById(id);
  const G=[$g('g0'),$g('g1'),$g('g2')],railEl=$('.rail');
  const ST=[
    {dur:7.8,steps:[['Мука',0],['Вода',1.9],['Замес',3.4],['Пузырьки',5.0]]},
    {dur:9.2,steps:[['Растяжка и формовка',0],['Созревание 16 · 18 · 24 ч',2.8]]},
    {dur:10.8,steps:[['Надрез',0],['В печь',1.8],['Выпечка',3.4],['Остывает и поёт',6.6]]}
  ];
  const seg=(t,a,b)=>clamp((t-a)/(b-a)),E=ease;
  const mixc=(a,b,k)=>a.map((v,i)=>Math.round(v+(b[i]-v)*k)),rgb=c=>`rgb(${c[0]},${c[1]},${c[2]})`;
  const A=(el,k,v)=>el.setAttribute(k,v);
  const T=(x,y,extra='')=>`translate(${x.toFixed(1)} ${y.toFixed(1)})${extra}`;
  function blob(P){
    let d=`M${P[0][0].toFixed(1)} ${P[0][1].toFixed(1)}`;
    for(let j=0;j<P.length-1;j++){
      const p0=P[j-1]||P[j],p1=P[j],p2=P[j+1],p3=P[j+2]||P[j+1];
      d+=`C${(p1[0]+(p2[0]-p0[0])/6).toFixed(1)} ${(p1[1]+(p2[1]-p0[1])/6).toFixed(1)} ${(p2[0]-(p3[0]-p1[0])/6).toFixed(1)} ${(p2[1]-(p3[1]-p1[1])/6).toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
    }
    return d+'Z';
  }

  /* ── этап 1: банка ── */
  const J={fill:$g('j-fill'),water:$g('j-water'),foam:$g('j-foam'),swirl:$g('j-swirl'),bubG:$g('j-bubbles'),bub:$$('#j-bubbles .bb'),band:$g('j-band'),spoon:$g('j-spoon'),fl:$$('#j-flour circle'),flG:$g('j-flour'),cone:$g('j-cone'),puff:$g('j-puff'),puffC:$$('#j-puff circle'),stream:$g('j-stream'),sa:$g('js-a'),sb:$g('js-b'),rip:$g('j-rip'),ripE:$$('#j-rip ellipse'),scoop:$g('j-scoop'),jug:$g('j-jug')};
  const surf=(top,a,t)=>`M186 ${top.toFixed(1)}C212 ${(top+4+a*Math.sin(t*5)).toFixed(1)} 268 ${(top-4-a*Math.sin(t*5+1)).toFixed(1)} 294 ${top.toFixed(1)}V292H186Z`;
  function u0(t){
    const f=E(seg(t,.5,1.9)),w=E(seg(t,2.2,3.4)),r=E(seg(t,5.0,7.2));
    const flourTop=288-34*f,total=288-(34*f+38*w+32*r);
    const fillTop=flourTop+(total-flourTop)*seg(t,2.8,3.9);
    const wob=2.4*seg(t,2.2,2.6)*(1-seg(t,3.3,3.6))+(t>3.4&&t<5.3?3:0)+(t>5?1.2:0);
    A(J.fill,'d',surf(fillTop,wob,t));
    A(J.fill,'fill',rgb(mixc([241,230,204],[233,214,176],seg(t,2.8,4.0))));
    A(J.water,'opacity',(seg(t,2.3,2.6)*(1-seg(t,3.4,3.9))*.6).toFixed(2));
    A(J.water,'d',`M186 ${total.toFixed(1)}C212 ${(total+4).toFixed(1)} 268 ${(total-4).toFixed(1)} 294 ${total.toFixed(1)}V${(fillTop+8).toFixed(1)}H186Z`);
    A(J.foam,'d',`M190 ${(total+1).toFixed(1)}q25 ${(3+Math.sin(t*3)*1.5).toFixed(1)} 50 0t50 0`);
    A(J.foam,'opacity',(seg(t,3.9,4.7)*.8).toFixed(2));
    /* мука из мерной кружки */
    const pour=t>.5&&t<1.9;
    A(J.flG,'opacity',pour?1:0);
    if(pour)J.fl.forEach((c,i)=>{const p=(t*1.6+i/J.fl.length)%1;A(c,'cy',(44+p*(flourTop-44)).toFixed(1));A(c,'cx',(240+Math.sin(i*2.1+t*3)*(2+p*7)).toFixed(1))});
    A(J.cone,'opacity',pour?.22:0);A(J.cone,'d',`M238 44L242 44L${(252).toFixed(1)} ${flourTop.toFixed(1)}L${(228).toFixed(1)} ${flourTop.toFixed(1)}Z`);
    A(J.puff,'opacity',pour?.75:0);J.puffC.forEach((c,i)=>{A(c,'cx',(240+(i-1)*10+Math.sin(t*4+i)*2).toFixed(1));A(c,'cy',(flourTop-3-((t*18+i*5)%7)).toFixed(1));A(c,'r',(5+i+(t*6)%3).toFixed(1))});
    const sc=E(seg(t,0,.6));
    A(J.scoop,'opacity',(1-seg(t,1.8,2.2)).toFixed(2));
    A(J.scoop,'transform',T(266,34-24*seg(t,1.9,2.3),`rotate(${(-2-48*sc+10*seg(t,1.8,2.2)).toFixed(1)})`));
    /* вода из эмалированного кувшина */
    const ja=seg(t,1.9,2.2)*(1-seg(t,3.4,3.7));
    A(J.jug,'opacity',ja.toFixed(2));
    A(J.jug,'transform',T(282,53-18*(1-seg(t,1.9,2.3)),`rotate(${(-6-39*E(seg(t,2.0,2.6))).toFixed(1)})`));
    const sa=seg(t,2.5,2.65)*(1-seg(t,3.2,3.4)),wb=Math.sin(t*9)*2;
    A(J.stream,'opacity',sa.toFixed(2));
    const sd=`M240.5 50Q${(238+wb).toFixed(1)} ${((50+total)/2).toFixed(1)} 240 ${total.toFixed(1)}`;A(J.sa,'d',sd);A(J.sb,'d',sd);
    A(J.rip,'opacity',sa.toFixed(2));J.ripE.forEach((e,i)=>{const p=((t*1.3)+i*.5)%1;A(e,'cx','240');A(e,'cy',(total+1).toFixed(1));A(e,'rx',(6+p*26).toFixed(1));A(e,'ry',(1.5+p*5).toFixed(1));A(e,'opacity',(1-p).toFixed(2))});
    /* ложка + вихрь */
    const sp=seg(t,3.4,3.7)*(1-seg(t,5.0,5.4)),cx=240+Math.cos(t*7)*16,cy=fillTop+4+Math.sin(t*7)*5;
    A(J.spoon,'opacity',sp.toFixed(2));A(J.spoon,'transform',T(cx,cy));
    A(J.swirl,'opacity',(sp*.9).toFixed(2));A(J.swirl,'transform',T(Math.sin(t*7)*8,fillTop-214));
    /* пузырьки с бликами */
    A(J.bubG,'opacity',seg(t,4.0,4.8).toFixed(2));
    J.bub.forEach((g,i)=>{const p=(t*.45+i*.37)%1,x=198+((i*41)%88)+Math.sin(t*2+i)*3,y=286-p*Math.max(10,286-fillTop-4),r=2.2+(i%4)*1.2;A(g,'transform',`translate(${x.toFixed(1)} ${y.toFixed(1)}) scale(${r.toFixed(1)})`)});
    /* резинка-метка */
    A(J.band,'opacity',seg(t,3.7,4.1).toFixed(2));A(J.band,'transform',T(0,-14*(1-E(seg(t,3.7,4.2)))));
  }

  /* ── этап 2: миска, руки, часы ── */
  const D={dough:$g('d-dough'),hi:$g('d-hi'),dust:$$('#d-dust circle'),bub:$$('#d-bub circle'),bubG:$g('d-bub'),sbub:$$('#d-sbub circle'),sbubG:$g('d-sbub'),band:$g('d-band'),x2:$g('d-x2'),dial:$g('d-dial'),hand:$g('d-hand'),hours:$g('d-hours'),hl:$g('d-hand-l'),hr:$g('d-hand-r')};
  const base=236,cx=240;
  const dome=(w,h)=>[[cx-w/2,base],[cx-w*.5,base-h*.3],[cx-w*.36,base-h*.8],[cx,base-h],[cx+w*.36,base-h*.8],[cx+w*.5,base-h*.3],[cx+w/2,base]];
  function u1(t){
    const g=E(seg(t,2.8,8.2));let w=150+38*g,h=46+70*g,hx=0,hy=0,handsOp=0,hdx=0;
    if(t<2.8){
      const ph=(t/1.4)%1,pu=E(seg(ph,.18,.52)),fo=E(seg(ph,.55,.86));
      w=150*(1+.24*pu)*(1-.14*fo);h=46*(1-.14*pu)*(1+.36*fo);
      hx=cx-w/2-10+56*fo;hy=base-h*.30-30*fo;handsOp=seg(t,0,.3)*(1-seg(t,2.5,2.8));
    }else{hdx=-70*seg(t,2.8,3.4);handsOp=1-seg(t,2.8,3.3);hx=cx-w/2-10;hy=base-h*.30}
    A(D.dough,'d',blob(dome(w,h)));
    A(D.hl,'opacity',handsOp.toFixed(2));A(D.hr,'opacity',handsOp.toFixed(2));
    A(D.hl,'transform',T(hx+hdx,hy,' scale(.86)'));A(D.hr,'transform',T(2*cx-hx-hdx,hy,' scale(.86)'));
    A(D.hi,'cx',(cx-w*.2).toFixed(1));A(D.hi,'cy',(base-h*.74).toFixed(1));A(D.hi,'rx',(w*.13).toFixed(1));A(D.hi,'ry',(h*.075).toFixed(1));
    D.dust.forEach((c,i)=>{const u=((i*37)%17)/17*1.6-.8,x=cx+u*w*.46,y=base-h*Math.max(.12,1-u*u)+3+((i*5)%9);A(c,'cx',x.toFixed(1));A(c,'cy',y.toFixed(1));A(c,'r',(.8+(i%3)*.45).toFixed(1))});
    A(D.band,'opacity',seg(t,2.8,3.2).toFixed(2));A(D.x2,'opacity',seg(t,6.4,7.0).toFixed(2));
    A(D.dial,'opacity',seg(t,2.7,3.3).toFixed(2));
    const hp=seg(t,2.8,8.2);A(D.hand,'transform',`rotate(${(360*hp).toFixed(1)})`);D.hours.textContent=Math.round(24*hp)+' ч';
    A(D.bubG,'opacity',(seg(t,3.6,4.6)*.9).toFixed(2));
    D.bub.forEach((c,i)=>A(c,'cx',(cx+(i-2.5)*w*.14).toFixed(1))||A(c,'cy',(base-h*.42+((i*13)%9)).toFixed(1))||A(c,'r',(3+(i%3)*2.2).toFixed(1)));
    A(D.sbubG,'opacity',g>.1?1:0);
    D.sbub.forEach((c,i)=>{const x=cx+(i-2.5)*w*.15,u=Math.min(1,Math.abs(x-cx)/(w/2)),y=base-h*Math.max(.12,1-u*u)-3,pop=(t*.9+i*.31)%1;A(c,'cx',x.toFixed(1));A(c,'cy',y.toFixed(1));A(c,'r',(1+4.2*pop).toFixed(1));A(c,'opacity',((1-pop)*.9).toFixed(2))});
  }

  /* ── этап 3: печь ── */
  const O={loaf:$g('o-loaf'),peel:$g('o-peel'),bodyc:$g('o-bodycol'),dust:$g('o-dust'),e1:$g('o-ear1'),e2:$g('o-ear2'),s1:$g('o-s1'),s2:$g('o-s2'),cr:$$('#o-cracks path'),knife:$g('o-knife'),glow:$g('o-glow'),coals:$g('o-coals'),fl:$$('.o-flame'),steam:$g('o-steam'),steam2:$g('o-steam2'),rings:$$('#o-rings circle'),rack:$g('o-rack'),notes:$$('#o-notes>g')};
  function u2(t){
    const ex=E(seg(t,1.8,2.9)),out=E(seg(t,6.6,7.6));
    const x=330-200*ex+210*out,y=282-10*E(seg(t,7.2,7.6)),sc=1+.14*seg(t,3.4,6.0);
    A(O.loaf,'transform',`translate(${x.toFixed(1)} ${y.toFixed(1)}) scale(${sc.toFixed(3)})`);
    const dx=260*(E(seg(t,2.9,3.6))-E(seg(t,6.0,6.6))+E(seg(t,7.6,8.2)));
    A(O.peel,'transform',`translate(${(x+dx).toFixed(1)} 284)`);
    A(O.bodyc,'opacity',E(seg(t,3.6,6.4)).toFixed(2));
    A(O.dust,'opacity',(seg(t,3.8,5.8)*.95).toFixed(2));
    const ea=seg(t,4.2,6.2);A(O.e1,'opacity',(ea*.95).toFixed(2));A(O.e2,'opacity',(ea*.95).toFixed(2));
    A(O.s1,'stroke-dashoffset',(1-seg(t,.2,1.0)).toFixed(3));A(O.s2,'stroke-dashoffset',(1-seg(t,.7,1.6)).toFixed(3));
    const sw=(1.6+3.2*seg(t,3.4,6.0)).toFixed(2),scol=rgb(mixc([140,110,70],[59,31,14],seg(t,3.4,5.0)));
    A(O.s1,'stroke-width',sw);A(O.s2,'stroke-width',sw);A(O.s1,'stroke',scol);A(O.s2,'stroke',scol);
    const ka=seg(t,.1,.3)*(1-seg(t,1.5,1.7));
    if(ka>0){const p=seg(t,.2,1.5),pt=p<.5?[-26+36*(p*2),-16+4*(p*2)]:[-12+36*((p-.5)*2),-32+4*((p-.5)*2)];A(O.knife,'transform',T(x+pt[0],y+pt[1]))}
    A(O.knife,'opacity',ka.toFixed(2));
    const gl=(.35+.65*E(seg(t,1.2,3.4)))*(1-.92*E(seg(t,6.6,7.6)));
    A(O.glow,'opacity',gl.toFixed(2));A(O.coals,'opacity',(.45+.55*gl*(.85+.15*Math.sin(t*9))).toFixed(2));
    O.fl.forEach(f=>f.style.opacity=Math.min(1,gl*1.15).toFixed(2));
    const sa=seg(t,3.6,4.4)*(1-seg(t,6.2,6.6));
    A(O.steam,'opacity',(sa*.5).toFixed(2));A(O.steam,'transform',T(0,-((t*14)%12)));
    const s2=seg(t,7.3,7.9)*(1-seg(t,9.8,10.5));
    A(O.steam2,'opacity',(s2*.5).toFixed(2));A(O.steam2,'transform',T(x,y-((t*12)%10)));
    A(O.rack,'opacity',seg(t,6.6,7.2).toFixed(2));
    O.cr.forEach((c,i)=>{const s=7.7+i*.22;A(c,'stroke-dasharray','1');A(c,'stroke-dashoffset',(1-seg(t,s,s+.25)).toFixed(3))});
    const ra=seg(t,7.7,8.0)*(1-seg(t,9.6,10.4));
    O.rings.forEach((c,k)=>{const p=t>7.7?((t-7.7)*.9+k/3)%1:0;A(c,'cx',x.toFixed(1));A(c,'cy',(y-26).toFixed(1));A(c,'r',(24+p*72).toFixed(1));A(c,'stroke-dashoffset',(-t*14).toFixed(1));A(c,'opacity',(ra*(1-p)*.7).toFixed(2))});
    O.notes.forEach((n,i)=>{const s=7.9+i*.55,p=seg(t,s,s+2.4);A(n,'opacity',(p>0&&p<1?Math.sin(p*Math.PI)*.95:0).toFixed(2));A(n,'transform',T(x-14+i*11+Math.sin(p*6+i)*6,y-52-p*64,` rotate(${(Math.sin(p*5+i)*10).toFixed(1)})`))});
  }

  const UP=[u0,u1,u2];
  let stage=0,T0=0,running=false,vis=false,raf=0,railBtns=[],railBars=[];
  const stepEnd=(s,k)=>k+1<ST[s].steps.length?ST[s].steps[k+1][1]:ST[s].dur;
  function render(t){
    const st=ST[stage];UP[stage](t);
    A(G[stage],'opacity',(seg(t,0,.35)*(1-seg(t,st.dur-.6,st.dur))).toFixed(2));
    let idx=0;st.steps.forEach((s,k)=>{if(t>=s[1])idx=k});
    railBtns.forEach((b,k)=>{b.classList.toggle('on',k===idx);const end=stepEnd(stage,k),a=st.steps[k][1];railBars[k].style.transform=`scaleX(${k<idx?1:k>idx?0:clamp((t-a)/(end-a)).toFixed(3)})`});
  }
  function frame(now){
    raf=0;if(!running)return;
    let t=(now-T0)/1000;
    if(t>=ST[stage].dur){T0=now;t=0}
    render(t);raf=requestAnimationFrame(frame);
  }
  function update(){
    const want=vis&&!document.hidden&&!reduced;
    if(want&&!running){running=true;raf=requestAnimationFrame(frame)}
    else if(!want&&running){running=false;cancelAnimationFrame(raf)}
  }
  function buildRail(){
    railEl.textContent='';railBtns=[];railBars=[];
    ST[stage].steps.forEach(([name,start],k)=>{
      const b=document.createElement('button');b.type='button';b.innerHTML=`<i></i><span>0${k+1}</span> ${name}`;
      b.addEventListener('click',()=>{
        if(reduced){render(Math.max(0,stepEnd(stage,k)-.15))}
        else{T0=performance.now()-start*1000;if(!running)update()}
      });
      railEl.append(b);railBtns.push(b);railBars.push($('i',b));
    });
  }
  function select(n){
    stage=n;
    G.forEach((g,i)=>{g.style.visibility=i===n?'visible':'hidden';if(i!==n)A(g,'opacity',0)});
    buildRail();T0=performance.now();
    if(reduced||!running)render(reduced?ST[n].dur-.9:.0);
  }
  const io=new IntersectionObserver(es=>{vis=es[0].isIntersecting;update()},{threshold:.2});io.observe($('.stage'));
  document.addEventListener('visibilitychange',update);
  select(0);
  return{select};
})();

function choose(n,focus){
  tabs.forEach((b,i)=>{b.setAttribute('aria-selected',String(i===n));b.tabIndex=i===n?0:-1;panels[i].hidden=i!==n});
  if(focus)tabs[n].focus();
  curTab=n;SCN.select(n);
  applySection();track('stage',{n});
}
tabs.forEach((b,i)=>{
  b.addEventListener('click',()=>choose(i));
  b.addEventListener('keydown',e=>{let n;if(e.key==='ArrowRight'||e.key==='ArrowDown')n=(i+1)%3;else if(e.key==='ArrowLeft'||e.key==='ArrowUp')n=(i+2)%3;else if(e.key==='Home')n=0;else if(e.key==='End')n=2;else return;e.preventDefault();choose(n,true)});
});


/* счётчик часов на шкалах созревания */
if('IntersectionObserver' in window){
  const io=new IntersectionObserver(es=>es.forEach(e=>{
    if(!e.isIntersecting)return;const t=e.target;t.classList.add('in-view');io.unobserve(t);
    if(!reduced){$$('[data-count]',t).forEach(b=>{const to=+b.dataset.count,st=performance.now();const f=now=>{const k=Math.min(1,(now-st)/2200);b.textContent=Math.round(to*(1-Math.pow(1-k,3)))+' ч';if(k<1)requestAnimationFrame(f)};requestAnimationFrame(f)})}
  }),{threshold:.2});
  $$('.timer').forEach(e=>reduced?e.classList.add('in-view'):io.observe(e));
}else $$('.timer').forEach(e=>e.classList.add('in-view'));
})();
