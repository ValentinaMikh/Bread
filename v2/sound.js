/* Звук сайта (дизайн 02): тихое пианино на всей странице и звуки хлеба по секциям.
   Включается кнопкой «Звук» в шапке или в блоке процесса. Браузеры не дают играть звук
   без действия посетителя, поэтому по умолчанию звук выключен; если посетитель включал его
   раньше, он продолжится после первого клика или касания на странице. */
(function(){
  const base=new URL('../assets/',document.currentScript.src);
  const T={
    piano:'bread-piano.mp3',
    starter:'bread-starter.mp3',   // закваска
    bubbles:'bread-bubbles.mp3',   // пузырьки
    dough:'bread-dough.mp3',       // раскатывание теста
    crust:'bread-crust.mp3'        // потрескивание корочки
  };
  // Звук хлеба для каждой секции (селектор → дорожки по очереди).
  const SECTIONS=[
    ['.hero','crust'],['#crust','crust'],['.film','dough'],['#look','crust'],
    ['#bread','crust'],['#classic','crust'],['#preorder','dough'],['.band','crust'],
    ['#slice','crust'],['#bakery','starter bubbles'],['.sleep','dough'],
    ['#format','crust'],['#artisan','starter bubbles'],['#store','crust'],['.final','crust']
  ];
  const STAGES=['starter bubbles','dough','crust'];   // этапы блока «Пока хлеб созревает»
  const VOL={piano:.28,effect:.6};
  const KEY='bread-sound';

  const mk=()=>{const a=new Audio();a.preload='none';a.volume=0;return a};
  const piano=mk();piano.src=new URL(T.piano,base);piano.loop=true;
  const fx=[mk(),mk()];let cur=0;              // два канала для плавной смены звука
  let on=false,armed=false,want=null,list=[],idx=0,stage=0,stageVisible=false,secSound='crust';
  const subs=[];

  const save=v=>{try{localStorage.setItem(KEY,v?'on':'off')}catch{}};
  const saved=()=>{try{return localStorage.getItem(KEY)==='on'}catch{return false}};

  function fade(a,to,ms,done){
    cancelAnimationFrame(a._f);const from=a.volume,t0=performance.now();
    (function step(now){const k=Math.min(1,(now-t0)/ms);a.volume=Math.max(0,Math.min(1,from+(to-from)*k));
      if(k<1)a._f=requestAnimationFrame(step);else if(done)done()})(t0);
  }
  function play(a){return a.play().catch(e=>{if(e.name==='NotAllowedError'){setOn(false,true);armed=true}})}

  function startTrack(a){a.src=new URL(T[list[idx]],base);if(on){play(a);fade(a,VOL.effect,900)}}
  fx.forEach(a=>a.addEventListener('ended',()=>{if(a!==fx[cur]||!on)return;idx=(idx+1)%list.length;startTrack(a)}));

  function setSound(name){
    if(name===want)return;want=name;
    const old=fx[cur];fade(old,0,700,()=>old.pause());
    cur=1-cur;list=name.split(' ');idx=0;startTrack(fx[cur]);
  }
  function current(){return stageVisible?STAGES[stage]:secSound}

  function setOn(v,silent){
    if(v===on)return;on=v;if(!silent)save(v);
    if(on){play(piano);fade(piano,VOL.piano,1200);const a=fx[cur];if(!a.src&&want)startTrack(a);else{play(a);fade(a,VOL.effect,900)}}
    else{fade(piano,0,500,()=>piano.pause());fx.forEach(a=>fade(a,0,500,()=>a.pause()))}
    subs.forEach(f=>f(on));
  }

  window.breadSound={
    isOn:()=>on,
    now:()=>({on,sound:want,track:fx[cur].src.split('/').pop(),playing:!fx[cur].paused,piano:!piano.paused}),
    toggle(){armed=false;setOn(!on)},
    onChange(f){subs.push(f)},
    setStage(n){stage=n;if(stageVisible)setSound(current())},
    setStageVisible(v){stageVisible=v;setSound(current())}
  };

  // какая секция сейчас в центре экрана
  function watch(){
    const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){secSound=e.target.dataset.sound;if(!stageVisible)setSound(current())}}),{rootMargin:'-45% 0px -45% 0px'});
    SECTIONS.forEach(([sel,s])=>document.querySelectorAll(sel).forEach(el=>{el.dataset.sound=s;io.observe(el)}));
  }
  document.readyState==='loading'?document.addEventListener('DOMContentLoaded',watch):watch();
  setSound('crust');

  // кнопка в шапке
  document.addEventListener('DOMContentLoaded',()=>{
    document.querySelectorAll('[data-sound-toggle]').forEach(b=>{
      const sync=v=>{b.setAttribute('aria-pressed',String(v));b.setAttribute('aria-label',v?'Выключить музыку и звуки хлеба':'Включить музыку и звуки хлеба')};
      subs.push(sync);sync(on);b.addEventListener('click',()=>window.breadSound.toggle());
    });
  });

  // продолжить, если посетитель включал звук раньше: после первого действия на странице
  if(saved())armed=true;
  const resume=e=>{if(!armed||on)return;if(e.target.closest&&e.target.closest('[data-sound-toggle],.sound'))return;armed=false;setOn(true)};
  ['pointerdown','keydown'].forEach(t=>document.addEventListener(t,resume,{capture:true}));
  document.addEventListener('visibilitychange',()=>{
    if(!on)return;
    if(document.hidden){piano.pause();fx[cur].pause()}else{play(piano);play(fx[cur])}
  });
})();
