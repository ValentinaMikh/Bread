// Variant 02 of the bread-process block: illustrated stages with sound (scene and timing as in the source file).
(()=>{
'use strict';
const root=document.getElementById('process-illustrated');if(!root)return;
const $=(s,r=root)=>r.querySelector(s),$$=(s,r=root)=>[...r.querySelectorAll(s)];
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
const clamp=(v,a=0,b=1)=>Math.min(b,Math.max(a,v));
const ease=t=>t*t*(3-2*t);
const rnd=Math.random;
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
// «Пропекание» можно ограничить частью заголовка: <span class="baked"> внутри #process-title.
const title=$('#process-title .baked')||$('#process-title');
if(title){
  setBake(title,0);
  if(reduced)setBake(title,1);
  else{let d=false;const go=()=>{if(!d){d=true;setTimeout(()=>tween(title,0,1,3000),250)}};
    // Bake the title the first time the section scrolls into view.
    new IntersectionObserver((es,o)=>{if(es[0].isIntersecting){o.disconnect();(document.fonts?document.fonts.ready:Promise.resolve()).then(go)}},{threshold:.4}).observe(title)}
}

const Sound=(()=>{
  let ctx,master,comp,verbIn,noise,timer,nextT=0,step=0,on=false,burstUntil=0,uiTick=0;
  const bus={},drone={},pad={};
  const L={crust:0,bubble:0,pulse:0,drone:0,mel:0},T={crust:0,bubble:0,pulse:0,drone:0,mel:0};
  const A=[220,261.63,293.66,329.63,392,440,523.25,587.33,659.25,783.99,880,1046.5,1174.66];
  const CHORDS=[[220,261.63,329.63,392],[174.61,220,261.63,329.63],[196,246.94,293.66,392],[220,261.63,329.63,440]];
  let walk=5,chord=0,onCrack=null,onLevels=null;

  function init(){
    if(ctx)return true;
    const C=window.AudioContext||window.webkitAudioContext;if(!C)return false;
    ctx=new C();
    master=ctx.createGain();master.gain.value=0;
    comp=ctx.createDynamicsCompressor();master.connect(comp);comp.connect(ctx.destination);
    const n=ctx.sampleRate*2;noise=ctx.createBuffer(1,n,ctx.sampleRate);
    const d=noise.getChannelData(0);for(let i=0;i<n;i++)d[i]=rnd()*2-1;
    const conv=ctx.createConvolver(),len=Math.floor(ctx.sampleRate*2.6),ir=ctx.createBuffer(2,len,ctx.sampleRate);
    for(let ch=0;ch<2;ch++){const c=ir.getChannelData(ch);for(let i=0;i<len;i++)c[i]=(rnd()*2-1)*Math.pow(1-i/len,2.6)}
    conv.buffer=ir;verbIn=ctx.createGain();verbIn.gain.value=.55;verbIn.connect(conv);
    const vg=ctx.createGain();vg.gain.value=.75;conv.connect(vg);vg.connect(master);
    const sends={crust:.25,bubble:.5,pulse:.12,drone:.1,mel:.95};
    for(const k of Object.keys(sends)){const g=ctx.createGain();g.connect(master);const s=ctx.createGain();s.gain.value=sends[k];g.connect(s);s.connect(verbIn);bus[k]=g}
    // гул печи: пила + шум, фильтр дышит
    const lp=ctx.createBiquadFilter();lp.type='lowpass';lp.frequency.value=240;lp.Q.value=.6;
    [[55,'sawtooth',0,.5],[55,'sawtooth',7,.35],[82.41,'sawtooth',-5,.22],[110,'sine',0,.3]].forEach(([f,t,c,v])=>{const o=ctx.createOscillator();o.type=t;o.frequency.value=f;o.detune.value=c;const g=ctx.createGain();g.gain.value=v;o.connect(g).connect(lp);o.start()});
    const ns=ctx.createBufferSource();ns.buffer=noise;ns.loop=true;const nl=ctx.createBiquadFilter();nl.type='lowpass';nl.frequency.value=150;const ng=ctx.createGain();ng.gain.value=.9;ns.connect(nl).connect(ng).connect(lp);ns.start();
    const lfo=ctx.createOscillator();lfo.frequency.value=.08;const lg=ctx.createGain();lg.gain.value=90;lfo.connect(lg).connect(lp.frequency);lfo.start();
    drone.g=ctx.createGain();drone.g.gain.value=0;lp.connect(drone.g);drone.g.connect(bus.drone);
    // пад — тихий аккорд под «ладом корки»
    const plp=ctx.createBiquadFilter();plp.type='lowpass';plp.frequency.value=900;pad.g=ctx.createGain();pad.g.gain.value=0;plp.connect(pad.g);pad.g.connect(bus.mel);
    pad.o=CHORDS[0].map(f=>{const o=ctx.createOscillator();o.type='triangle';o.frequency.value=f;const g=ctx.createGain();g.gain.value=.5;o.connect(g).connect(plp);o.start();return o});
    return true;
  }
  function nz(t,dur,{f=3000,q=1,type='bandpass',g=.3,f2,b='crust'}={}){
    const s=ctx.createBufferSource(),fl=ctx.createBiquadFilter(),v=ctx.createGain();
    s.buffer=noise;fl.type=type;fl.frequency.setValueAtTime(f,t);if(f2)fl.frequency.exponentialRampToValueAtTime(f2,t+dur);fl.Q.value=q;
    v.gain.setValueAtTime(0,t);v.gain.linearRampToValueAtTime(g,t+Math.min(.004,dur/4));v.gain.exponentialRampToValueAtTime(.0001,t+dur);
    s.connect(fl).connect(v).connect(bus[b]);s.start(t,rnd()*1.5);s.stop(t+dur+.02);
  }
  function tone(t,dur,f,f2,g,type='sine',b='bubble',atk=.005){
    const o=ctx.createOscillator(),v=ctx.createGain();o.type=type;o.frequency.setValueAtTime(f,t);if(f2)o.frequency.exponentialRampToValueAtTime(f2,t+dur);
    v.gain.setValueAtTime(0,t);v.gain.linearRampToValueAtTime(g,t+atk);v.gain.exponentialRampToValueAtTime(.0001,t+dur);o.connect(v).connect(bus[b]);o.start(t);o.stop(t+dur+.03);
  }
  const later=(t,fn)=>setTimeout(fn,Math.max(0,(t-ctx.currentTime)*1000));
  function crackle(t,v){
    const cl=rnd()<.18?3:1;
    for(let i=0;i<cl;i++)nz(t+i*.006,.006+rnd()*.018,{f:2300+rnd()*5400,q:2+rnd()*5,g:(.1+rnd()*.45)*v,b:'crust'});
    if(onCrack&&rnd()<.4)later(t,()=>onCrack(false));
  }
  function ping(t,v){
    walk=clamp(walk+(rnd()<.5?-1:1)*(rnd()<.3?2:1),3,11);
    const f=A[walk];
    nz(t,.008,{f:4200,q:4,g:.25*v,b:'crust'});
    tone(t,.9,f,null,.14*v,'triangle','mel',.004);
    tone(t,.35,f*2,null,.05*v,'sine','mel',.004);
    if(onCrack)later(t,()=>onCrack(true));
  }
  function thump(t,v,soft){
    tone(t,.3,soft?70:62,soft?52:38,(soft?.32:.6)*v,'sine','pulse',.004);
    nz(t,.05,{type:'lowpass',f:1200,g:.18*v,b:'pulse'});
  }
  function bubble(t,v){
    const f=A[2+Math.floor(rnd()*7)]*(rnd()<.35?1:.5);
    tone(t,.09,f*.7,f*1.5,.12*v,'sine','bubble',.003);
  }
  function play(s,t,sd){
    const v=(k)=>L[k];
    if(v('pulse')>.05){
      if(s%8===0)thump(t,v('pulse'));
      else if(s%16===10&&rnd()<.5)thump(t,v('pulse'),true);
      if(s%8===4&&v('pulse')>.4)nz(t,.018,{f:4200,q:8,g:.12*v('pulse'),b:'pulse'});
    }
    if(v('bubble')>.05&&rnd()<v('bubble')*.24)bubble(t+rnd()*sd*.8,v('bubble'));
    for(let k=0;k<3;k++)if(v('crust')>.03&&rnd()<v('crust')*.2)crackle(t+rnd()*sd,v('crust'));
    if(v('mel')>.05&&rnd()<v('mel')*.17)ping(t+rnd()*sd*.6,v('mel'));
    if(s===0&&v('mel')>.1){chord=(chord+1)%CHORDS.length;pad.o.forEach((o,i)=>o.frequency.setTargetAtTime(CHORDS[chord][i],t,1.4))}
  }
  function tick(){
    if(!on||!ctx)return;
    const now=ctx.currentTime;
    for(const k in L)L[k]+=(T[k]-L[k])*.02;
    drone.g.gain.setTargetAtTime(L.drone*.55,now,.3);
    pad.g.gain.setTargetAtTime(L.mel*.2,now,.5);
    const spb=60/(54+L.pulse*8),sd=spb/4;
    while(nextT<now+.15){play(step,nextT,sd);nextT+=sd;step=(step+1)&63}
    if(++uiTick%10===0&&onLevels)onLevels(L);
  }
  function enable(){
    if(!init())return false;
    ctx.resume&&ctx.resume();
    if(on)return true;
    on=true;nextT=ctx.currentTime+.1;
    master.gain.cancelScheduledValues(ctx.currentTime);master.gain.setTargetAtTime(.9,ctx.currentTime,.25);
    clearInterval(timer);timer=setInterval(tick,25);
    return true;
  }
  function disable(){
    if(!ctx||!on)return;on=false;
    master.gain.setTargetAtTime(0,ctx.currentTime,.15);
    setTimeout(()=>{if(!on)clearInterval(timer)},500);
  }
  const ui={
    knife(){const t=ctx.currentTime;nz(t,.05+rnd()*.03,{f:3200+rnd()*1800,q:1.2,g:.1,b:'crust'})},
    thud(){const t=ctx.currentTime;tone(t,.24,150,42,.9,'sine','pulse',.003);nz(t,.07,{type:'lowpass',f:1400,g:.5,b:'pulse'});nz(t+.01,.14,{f:900,q:.6,g:.15,b:'pulse'})},
    rustle(){const t=ctx.currentTime;nz(t,.2,{f:1800,f2:3600,q:.5,g:.14,b:'crust'});nz(t+.08,.16,{f:2600,f2:1600,q:.6,g:.09,b:'crust'})},
    bubble(){const t=ctx.currentTime;[0,.1,.19].forEach((d,i)=>tone(t+d,.09,260+i*90,700+i*160,.14,'sine','bubble',.003))},
    tick(){const t=ctx.currentTime;[0,.5,1].forEach(d=>nz(t+d,.02,{f:4200,q:8,g:.3,b:'pulse'}))},
    fire(){const t=ctx.currentTime;nz(t,.9,{type:'lowpass',f:220,f2:1200,q:.7,g:.4,b:'drone'});for(let i=0;i<10;i++)nz(t+.15+rnd()*.7,.01,{f:3000+rnd()*3000,q:4,g:.22,b:'crust'})},
    click(){nz(ctx.currentTime,.008+rnd()*.012,{f:2600+rnd()*4200,q:3+rnd()*4,g:.3+rnd()*.3,b:'crust'})},
    finale(){const t=ctx.currentTime+.05;[220,277.18,329.63,440,554.37].forEach((f,i)=>tone(t+i*.07,4.2,f,null,.12,'sine','mel',.05))}
  };
  return{
    get on(){return on},
    enable,disable,
    toggle(){on?disable():enable();return on},
    set targets(o){for(const k in T)T[k]=o[k]||0},
    ui(n){if(on&&ctx&&ui[n])ui[n]()},
    burst(sec=3.6){
      if(!enable())return 0;
      const t0=ctx.currentTime+.04;let t=t0;
      while(t<t0+sec){const k=(t-t0)/sec;t+=(.012+rnd()*.1)*(1+k*2.6);crackle(t,1-k*.55);if(onCrack&&rnd()<.5)later(t,()=>onCrack(false))}
      for(let i=0;i<4;i++)ping(t0+sec*.55+i*.5+rnd()*.15,.55);
      return sec;
    },
    set onCrack(f){onCrack=f},
    set onLevels(f){onLevels=f},
    suspend(){ctx&&on&&ctx.suspend&&ctx.suspend()},
    resume(){ctx&&on&&ctx.resume&&ctx.resume()}
  };
})();


/* какие слои музыки звучат на каком этапе */
const MAP=[
  {bubble:.85,crust:.1,label:'пузырьки закваски'},
  {pulse:.8,bubble:.3,label:'пульс брожения: 16, 18, 24 часа'},
  {drone:.95,crust:.35,pulse:.35,label:'гул каменного пода'}
];
let curTab=0;
const pill=$('.now-pill'),pillT=$('span',pill);let pillTimer;
function applySection(){
  Sound.targets=MAP[curTab];
  if(Sound.on){pillT.textContent=MAP[curTab].label;pill.classList.add('show');clearTimeout(pillTimer);pillTimer=setTimeout(()=>pill.classList.remove('show'),3200)}
}
const soundBtn=$('.sound');
soundBtn.addEventListener('click',()=>{
  if(Sound.on){Sound.disable();pill.classList.remove('show')}else{if(!Sound.enable())return;Sound.ui('rustle')}
  soundBtn.setAttribute('aria-pressed',String(Sound.on));
  soundBtn.setAttribute('aria-label',Sound.on?'Выключить звуки':'Включить звуки');
  applySection();
});
document.addEventListener('visibilitychange',()=>document.hidden?Sound.suspend():Sound.resume());
Sound.targets=MAP[0];

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
  let fired={};
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
    if(t<7)fired={};
    O.cr.forEach((c,i)=>{const s=7.7+i*.22;A(c,'stroke-dasharray','1');A(c,'stroke-dashoffset',(1-seg(t,s,s+.25)).toFixed(3));if(t>=s&&!fired[i]){fired[i]=1;if(running)Sound.ui('click')}});
    const ra=seg(t,7.7,8.0)*(1-seg(t,9.6,10.4));
    O.rings.forEach((c,k)=>{const p=t>7.7?((t-7.7)*.9+k/3)%1:0;A(c,'cx',x.toFixed(1));A(c,'cy',(y-26).toFixed(1));A(c,'r',(24+p*72).toFixed(1));A(c,'stroke-dashoffset',(-t*14).toFixed(1));A(c,'opacity',(ra*(1-p)*.7).toFixed(2))});
    O.notes.forEach((n,i)=>{const s=7.9+i*.55,p=seg(t,s,s+2.4);A(n,'opacity',(p>0&&p<1?Math.sin(p*Math.PI)*.95:0).toFixed(2));A(n,'transform',T(x-14+i*11+Math.sin(p*6+i)*6,y-52-p*64,` rotate(${(Math.sin(p*5+i)*10).toFixed(1)})`))});
  }

  const UP=[u0,u1,u2];
  const HOOK=[{3:()=>Sound.ui('bubble')},{1:()=>Sound.ui('tick')},{1:()=>Sound.ui('fire')}];
  let stage=0,T0=0,running=false,vis=false,lastStep=-1,raf=0,railBtns=[],railBars=[];
  const stepEnd=(s,k)=>k+1<ST[s].steps.length?ST[s].steps[k+1][1]:ST[s].dur;
  function render(t){
    const st=ST[stage];UP[stage](t);
    A(G[stage],'opacity',(seg(t,0,.35)*(1-seg(t,st.dur-.6,st.dur))).toFixed(2));
    let idx=0;st.steps.forEach((s,k)=>{if(t>=s[1])idx=k});
    railBtns.forEach((b,k)=>{b.classList.toggle('on',k===idx);const end=stepEnd(stage,k),a=st.steps[k][1];railBars[k].style.transform=`scaleX(${k<idx?1:k>idx?0:clamp((t-a)/(end-a)).toFixed(3)})`});
    if(idx!==lastStep){lastStep=idx;if(running&&HOOK[stage][idx])HOOK[stage][idx]()}
  }
  function frame(now){
    raf=0;if(!running)return;
    let t=(now-T0)/1000;
    if(t>=ST[stage].dur){T0=now;t=0;fired={};lastStep=-1}
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
        if(reduced){lastStep=-1;fired={};render(Math.max(0,stepEnd(stage,k)-.15))}
        else{T0=performance.now()-start*1000;fired={};lastStep=-1;if(!running)update()}
      });
      railEl.append(b);railBtns.push(b);railBars.push($('i',b));
    });
  }
  function select(n){
    stage=n;lastStep=-1;fired={};
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
  Sound.ui(['bubble','tick','fire'][n]);applySection();track('stage',{n});
}
tabs.forEach((b,i)=>{
  b.addEventListener('click',()=>choose(i));
  b.addEventListener('keydown',e=>{let n;if(e.key==='ArrowRight'||e.key==='ArrowDown')n=(i+1)%3;else if(e.key==='ArrowLeft'||e.key==='ArrowUp')n=(i+2)%3;else if(e.key==='Home')n=0;else if(e.key==='End')n=2;else return;e.preventDefault();choose(n,true)});
});


/* счётчик часов на шкалах созревания */
if('IntersectionObserver' in window){
  const io=new IntersectionObserver(es=>es.forEach(e=>{
    if(!e.isIntersecting)return;const t=e.target;t.classList.add('in-view');io.unobserve(t);
    if(!reduced){Sound.ui('tick');$$('[data-count]',t).forEach(b=>{const to=+b.dataset.count,st=performance.now();const f=now=>{const k=Math.min(1,(now-st)/2200);b.textContent=Math.round(to*(1-Math.pow(1-k,3)))+' ч';if(k<1)requestAnimationFrame(f)};requestAnimationFrame(f)})}
  }),{threshold:.2});
  $$('.timer').forEach(e=>reduced?e.classList.add('in-view'):io.observe(e));
}else $$('.timer').forEach(e=>e.classList.add('in-view'));
})();
