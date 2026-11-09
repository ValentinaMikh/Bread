/* Лендинг, вариант дизайна 2 (Пекарня МясновЪ). Тексты — как в варианте 1. */
/* ===== Настройки для маркетинга и ИТ ===== */
const CONFIG={
  catalogUrl:'https://www.coolclever.ru/catalog/myasnov/khleba-remeslennye/tselyy-khleb', // подраздел «Целый хлеб» (474367)
  appUrl:'',            // ссылка на приложение (смарт-ссылка App Store / Google Play / RuStore); пусто — кнопка ведёт в каталог
  utm:{utm_source:'landing_bread',utm_medium:'landing',utm_campaign:'bread_nov2026'},
  ymId:null,            // ID счётчика Яндекс Метрики — цели landing_bread_*
    cutoffHour:15, tz:'Europe/Moscow',
  // Сжатые видео: 720p — для телефонов и режима экономии трафика, 1080p — для остальных экранов.
  video:{
    hero:{sm:'../assets/bread-hero-720.mp4',lg:'../assets/bread-hero-1080.mp4'},
    film:{sm:'../assets/bread-process-720.mp4',lg:'../assets/bread-process-1080.mp4'}
  }
};
const IMG={hero:"img/hero.webp",crust:"img/crust.webp",ital_w:"img/ital_w.webp",ital_c:"img/ital_c.webp",ital_s:"img/ital_s.webp",kar_s:"img/kar_s.webp",tp_w:"img/tp_w.webp",tp_s:"img/tp_s.webp",tr_s:"img/tr_s.webp",tr_l:"img/tr_l.webp",oat:"img/oat.webp",fruit:"img/fruit.webp",psh:"img/psh.webp",der:"img/der.webp",der_w:"img/der_w.webp",der_s:"img/der_s.webp",der_l:"img/der_l.webp",rzh:"img/rzh.webp",bor:"img/bor.webp",mbs:"img/mini_baguette_cheese.webp",cia:"img/ciabatta.webp",bgr:"img/baguette_rye.webp",bgf:"img/baguette_fr.webp",bor_w:"img/bor_w.webp",bor_s:"img/bor_s.webp",bor_l:"img/bor_l.webp",home:"img/home.webp"};
const BREADS=[
 {id:'italian',name:'хлеб Итальянский домашний на закваске МЪ ПЕКАРНЯ бум.пак. 900г',w:'900 г',h:24,k:500,g:'long',use:['dinner','cheese'],
  d:'Три вида муки, хрустящая корочка и пористый мякиш.',p:['оливковое масло','томаты','моцарелла'],
  v:[['ital_w','Целиком'],['ital_s','В разрезе'],['ital_c','Корочка']],url:'/catalog/product/khleb-italyanskiy-domashniy-na-zakvaske-900-g-90012344'},
 {id:'tartin-rye',name:'тартин с пророщенным зерном ржи МЪ ПЕКАРНЯ в уп.бум.пак. 400г',w:'400 г',h:18,k:500,g:'long',use:['cheese','breakfast'],
  d:'Глубокие солодовые ноты и пористый мякиш.',p:['сливочное масло','сыр','паштет'],v:[['tr_s','В разрезе'],['tr_l','Ломтики']],url:''},
 {id:'tartin-wheat',name:'тартин пшеничный с пророщенным зерном пшеницы МЪ ПЕКАРНЯ в уп.бум.пак. 450г',w:'450 г',h:18,k:500,g:'long',use:['breakfast'],
  d:'Пшеничный вкус с лёгкими ореховыми нотами.',p:['творожный сыр','авокадо','яйцо'],v:[['tp_w','Целиком'],['tp_s','Ломтики']],url:''},
 {id:'karelian',name:'тартин Карельский солодовый с грецким орехом и клюквой МЪ ПЕКАРНЯ в уп.бум.пак. 450г',w:'450 г',h:16,k:500,g:'long',use:['cheese','breakfast','tea'],
  d:'Солод, лёгкая терпкость ореха и кислинка клюквы.',p:['сырная тарелка','завтрак','чай'],v:[['hero','Целиком'],['kar_s','В разрезе'],['crust','Корочка']],url:''},
 {id:'oat',name:'тартин овсяный с яблоком и корицей МЪ ПЕКАРНЯ в уп.бум.пак. 450г',w:'450 г',h:16,k:500,g:'long',use:['breakfast','tea','cheese'],
  d:'Овсяное зерно, сушёное яблоко и деликатная корица.',p:['сливочное масло','мягкий сыр'],v:[['oat','В разрезе']],url:''},
 {id:'fruit',name:'хлеб бездрожжевой с изюмом и черносливом МЪ ПЕКАРНЯ в уп.бум.пак 500г',w:'500 г',h:24,k:500,g:'long',use:['tea','cheese'],
  d:'Чуть влажный мякиш, солодовый аромат, изюм, чернослив и курага.',sp:'Без добавления хлебопекарных дрожжей',p:['чай','кофе','выдержанный сыр'],v:[['fruit','В разрезе']],url:''},
 {id:'borodinsky',name:'хлеб Бородинский формовой МЪ ПЕКАРНЯ в уп.бум.пак. 400г',w:'400 г',h:null,k:250,g:'classic',form:true,use:['dinner'],
  d:'Ржаная мука, солод и кориандр. Узнаваемый слегка сладковатый вкус и тёмный мякиш.',p:[],v:[['bor_w','Целиком'],['bor_s','В разрезе'],['bor_l','Ломтики']],url:'/catalog/product/khleb-borodinskiy-myasnov-pekarnya-90012324'},
 {id:'rye',name:'хлеб ржаной формовой МЪ ПЕКАРНЯ в уп.бум.пак. 800г',w:'800 г',h:null,k:250,g:'classic',form:true,use:['dinner'],
  d:'Плотный мякиш и выраженная кислинка.',p:['горячие блюда','солёная рыба','сливочное масло'],v:[['rzh','Целиком']],url:'/catalog/product/khleb-rzhanoy-gost-800g-90012374'},
 {id:'village',name:'хлеб Деревенский МЪ ПЕКАРНЯ в уп.бум.пак. 600г',w:'600 г',h:null,k:500,g:'classic',use:['dinner'],
  d:'Пшеничная и ржаная мука, солод и закваска. Ароматный хлеб к супу и домашнему обеду.',p:['суп','домашний обед'],v:[['der_w','Целиком'],['der_s','В разрезе'],['der_l','Ломтики']],url:'/catalog/product/khleb-derevenskiy-600g-90012335'},
 {id:'wheat',name:'хлеб пшеничный МЪ ПЕКАРНЯ в уп.бум.пак. 500г',w:'500 г',h:null,k:500,g:'classic',use:['breakfast','dinner'],
  d:'Плотный ароматный мякиш и толстая корочка.',p:['ломоть с маслом','тост','бутерброд'],v:[['psh','Целиком']],url:'/catalog/product/khleb-pshenichnyy-500g-90012362'}
];
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const word=(n,a,b,c)=>{n=Math.abs(n)%100;const m=n%10;return n>10&&n<20?c:m>1&&m<5?b:m==1?a:c};
function withUtm(u,content){try{const x=new URL(u,'https://www.coolclever.ru');Object.entries(CONFIG.utm).forEach(([k,v])=>x.searchParams.set(k,v));if(content)x.searchParams.set('utm_content',content);return x.toString()}catch(e){return u}}
function track(name,params={}){try{(window.dataLayer=window.dataLayer||[]).push({event:'landing_bread_'+name,...params});if(CONFIG.ymId&&window.ym)ym(CONFIG.ymId,'reachGoal','landing_bread_'+name,params)}catch(e){}}
const breadUrl=b=>withUtm(b.url||CONFIG.catalogUrl,b.id);
const KEGL='<svg class="kgl" aria-hidden="true" width="33" height="20" viewBox="0 0 33 20" fill="#80BA27" xmlns="http://www.w3.org/2000/svg"> <path d="M0 10C0 7.2071 0 5.81065 0.392817 4.68805C1.0964 2.67732 2.67732 1.0964 4.68805 0.392817C5.81065 0 7.2071 0 10 0H23C25.7929 0 27.1893 0 28.312 0.392817C30.3227 1.0964 31.9036 2.67732 32.6072 4.68805C33 5.81065 33 7.2071 33 10C33 12.7929 33 14.1893 32.6072 15.312C31.9036 17.3227 30.3227 18.9036 28.312 19.6072C27.1893 20 25.7929 20 23 20H10C7.2071 20 5.81065 20 4.68805 19.6072C2.67732 18.9036 1.0964 17.3227 0.392817 15.312C0 14.1893 0 12.7929 0 10Z" /> <path d="M8.3461 14.3017C7.70833 14.3017 7.33447 13.9023 7.33447 13.1959V6.79844C7.33447 6.09211 7.70833 5.69263 8.3461 5.69263C8.98386 5.69263 9.35223 6.09211 9.35223 6.79844V9.19532H9.39621L12.1507 6.20211C12.5191 5.79105 12.6895 5.69263 12.9919 5.69263C13.4702 5.69263 13.8661 6.05737 13.8661 6.50896C13.8661 6.79265 13.7781 6.99528 13.5527 7.22687L11.1611 9.75691L13.6846 12.5822C13.9155 12.8486 13.987 13.0107 13.987 13.2886C13.987 13.8791 13.5967 14.3017 13.0469 14.3017C12.684 14.3017 12.4806 14.1859 12.1067 13.7517L9.39621 10.7064H9.35223V13.1959C9.35223 13.9023 8.98386 14.3017 8.3461 14.3017Z" fill="white"/> <path d="M15.323 14.3075C14.7128 14.3075 14.3499 13.9254 14.3499 13.2596V8.98111C14.3499 8.27478 14.7182 7.86951 15.356 7.86951H18.094C18.4679 7.86951 18.7922 8.14741 18.7922 8.62795C18.7922 9.10848 18.4679 9.38638 18.094 9.38638H16.2962V13.2596C16.2962 13.9254 15.9333 14.3075 15.323 14.3075Z" fill="white"/> <path d="M19.5455 14.2381C18.8197 14.2381 18.3469 13.8444 18.3469 13.2365C18.3469 12.7907 18.6383 12.4896 19.0616 12.4896H19.0781C19.6719 12.4896 19.9138 12.067 19.9633 10.8569L20.1447 6.9316C20.1722 6.21948 20.5131 5.82 21.1509 5.82H24.9885C25.6317 5.82 26.0001 6.22527 26.0001 6.9316V13.1959C26.0001 13.9023 25.6317 14.3017 24.9885 14.3017C24.3507 14.3017 23.9823 13.9023 23.9823 13.1959V7.52793H21.9811L21.8216 10.7817C21.7117 13.0454 21.0024 14.2381 19.5455 14.2381Z" fill="white"/> </svg>';
const ICON={clock:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
 scale:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 21h14l-2-12H7L5 21Z"/><circle cx="12" cy="6" r="3"/></svg>',
 form:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M3 9h18l-2 11H5L3 9Z"/><path d="M6 9c0-3 3-5 6-5s6 2 6 5"/></svg>',
 leaf:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 19c0-9 6-14 15-14 0 9-5 15-14 15"/><path d="M5 19l7-7"/></svg>'};
const reduceMotion=matchMedia('(prefers-reduced-motion: reduce)');

const KL_SMALL='<svg class="kl" width="34" height="20" viewBox="0 0 34 20" role="img" aria-label="КлЛ"><rect width="34" height="20" rx="5" fill="#8DB93E"/><path d="M10.868 14C10.7 13.728 10.5 13.436 10.268 13.124C10.044 12.804 9.796 12.488 9.524 12.176C9.26 11.856 8.984 11.552 8.696 11.264C8.408 10.968 8.12 10.708 7.832 10.484V14H5.96V5.684H7.832V8.828C8.32 8.316 8.808 7.784 9.296 7.232C9.792 6.672 10.252 6.156 10.676 5.684H12.896C12.328 6.356 11.756 7.004 11.18 7.628C10.612 8.252 10.012 8.88 9.38 9.512C10.044 10.064 10.684 10.72 11.3 11.48C11.924 12.24 12.52 13.08 13.088 14H10.868ZM18.5191 9.152H15.8311V14H14.0431V7.688H18.5191V9.152ZM23.2366 7.268C23.2126 7.804 23.1806 8.344 23.1406 8.888C23.1086 9.424 23.0446 9.944 22.9486 10.448C22.8606 10.952 22.7286 11.424 22.5526 11.864C22.3846 12.304 22.1486 12.692 21.8446 13.028C21.5486 13.364 21.1766 13.632 20.7286 13.832C20.2806 14.032 19.7326 14.144 19.0846 14.168L18.8806 12.536C19.4566 12.472 19.9006 12.328 20.2126 12.104C20.5246 11.872 20.7606 11.52 20.9206 11.048C21.1206 10.464 21.2606 9.712 21.3406 8.792C21.4286 7.864 21.4726 6.828 21.4726 5.684H27.1486V14H25.2766V7.268H23.2366Z" fill="#fff"/></svg>';
const CLOCK16='<svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 4v4l2.67 1.33M14.67 8A6.67 6.67 0 1 1 1.33 8a6.67 6.67 0 0 1 13.34 0Z" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>';
const CLOCK14='<svg viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M7 3.5V7l2.33 1.17M12.83 7A5.83 5.83 0 1 1 1.17 7a5.83 5.83 0 0 1 11.66 0Z" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>';
const SCALE14='<svg viewBox="0 0 24 24" fill="none" aria-hidden="true" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 21h14l-2-12H7L5 21Z"/><circle cx="12" cy="6" r="3"/></svg>';
const FORM14='<svg viewBox="0 0 24 24" fill="none" aria-hidden="true" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M3 9h18l-2 11H5L3 9Z"/><path d="M6 9c0-3 3-5 6-5s6 2 6 5"/></svg>';

/* ===== ссылки ===== */
$$('[data-cat]').forEach(a=>a.href=withUtm(CONFIG.catalogUrl,'catalog'));
$$('[data-utm]').forEach(a=>a.href=withUtm(a.getAttribute('href'),'format'));
$('#appBtn').href=CONFIG.appUrl?CONFIG.appUrl:withUtm(CONFIG.catalogUrl,'app');

/* ===== шапка: прогресс прокрутки и тень ===== */
(function(){const top=$('#top'),pr=$('#progress');let tick=false;
 function upd(){const h=document.documentElement;pr.style.setProperty('--p',(h.scrollTop/(h.scrollHeight-h.clientHeight||1)).toFixed(4));top.classList.toggle('scrolled',h.scrollTop>8);tick=false}
 addEventListener('scroll',()=>{if(!tick){tick=true;requestAnimationFrame(upd)}},{passive:true});addEventListener('resize',upd,{passive:true});upd()})();

/* ===== появление блоков ===== */
(function(){const els=$$('.reveal');
 if(!('IntersectionObserver' in window)||reduceMotion.matches){els.forEach(e=>e.classList.add('in'));return}
 const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{rootMargin:'0px 0px -8% 0px'});
 els.forEach((e,i)=>{e.style.transitionDelay=(i%3)*80+'ms';io.observe(e)})})();

/* ===== каталог ===== */
function metaHtml(b){return `<span>${SCALE14}${b.w}</span>`+(b.h?`<span>${CLOCK14}${b.h} ${word(b.h,'час','часа','часов')} созревания</span>`:'')+(b.form?`<span>${FORM14}выпекаем в форме</span>`:'')}
(function(){
 const cardHtml=b=>`<article class="card" id="card-${b.id}" data-g="${b.g}" data-use="${b.use.join(' ')}" style="--vt:c-${b.id}">
  <div class="card-media">
   ${b.h?`<span class="badge">${CLOCK16}${b.h} ч</span>`:''}
   ${b.v.map(([k,label],i)=>`<img class="${i?'':'on'}" src="${IMG[k]}" alt="${i?'':b.name+' — '}${label.toLowerCase()}" loading="lazy" decoding="async" width="900" height="900">`).join('')}
   ${b.v.length>1?`<div class="views" role="group" aria-label="Фото: ${b.name}">${b.v.map(([k,label],i)=>`<button type="button" aria-pressed="${!i}" aria-label="${label}"><span>${label}</span></button>`).join('')}</div>`:''}
  </div>
  <div class="card-body">
   <div class="meta">${metaHtml(b)}</div>
   <div class="card-text"><h3>${b.name}</h3><p>${b.d}</p></div>
   <div class="card-foot"><span class="kegl"><b>+${b.k}</b>${KL_SMALL}<span>за предзаказ</span></span>
   <a class="order" href="${breadUrl(b)}" data-sku="${b.id}">Заказать</a></div>
  </div></article>`;
 $('#gLong').innerHTML=BREADS.filter(b=>b.g=='long').map(cardHtml).join('');
 $('#gClassic').innerHTML=BREADS.filter(b=>b.g=='classic').map(cardHtml).join('');
 const chips=$$('.filters .chip');
 chips.forEach(c=>c.addEventListener('click',()=>{const f=c.dataset.f;chips.forEach(x=>x.setAttribute('aria-pressed',String(x===c)));
  const apply=()=>{$$('.card').forEach(card=>card.hidden=!(f=='all'||card.dataset.g==f||card.dataset.use.split(' ').includes(f)));
   $$('.grp').forEach(g=>g.hidden=!$$('.card',g).some(c=>!c.hidden))};
  document.startViewTransition&&!reduceMotion.matches?document.startViewTransition(apply):apply();track('filter',{f})}))})();
document.addEventListener('click',e=>{const a=e.target.closest('.card .order');if(a)track('card_cta',{sku:a.dataset.sku})});

/* ===== Рассмотрите — покажем ближе ===== */
(function(){const btn=$('#lookBtn'),dlg=$('#lookDialog');if(!btn||!dlg)return;
 btn.addEventListener('click',()=>{if(dlg.showModal)dlg.showModal();else dlg.setAttribute('open','');track('look')});
 dlg.addEventListener('click',e=>{if(e.target===dlg)dlg.close()})})();

/* ===== предзаказ: до 15:00 по Москве ===== */
(function(){const box=$('#clock'),st=$('#clkState'),big=$('#clkBig'),sub=$('#clkSub');
 function msk(){const p=new Intl.DateTimeFormat('ru-RU',{timeZone:CONFIG.tz,hour:'2-digit',minute:'2-digit',second:'2-digit',hourCycle:'h23'}).formatToParts(new Date());const g=t=>+p.find(x=>x.type==t).value;return g('hour')*3600+g('minute')*60+g('second')}
 function upd(){const s=msk(),cut=CONFIG.cutoffHour*3600;
  if(s<cut){const left=cut-s,h=Math.floor(left/3600),m=Math.floor(left%3600/60);box.classList.remove('late');
   st.textContent='Принимаем заказы на завтра';big.innerHTML=`${h}<small>${word(h,'час','часа','часов')}</small>${m}<small>мин</small>`;
   sub.innerHTML='Успейте оформить заказ на&nbsp;завтра до&nbsp;15:00.'}
  else{box.classList.add('late');st.textContent='Предзаказ из пекарни';big.textContent='До 15:00';
   sub.textContent='Выберите доступную дату и время получения на сайте или в приложении КуулКлевер.'}}
 upd();setInterval(upd,15000)})();

/* ===== видео: первый экран и «Как рождается наш хлеб» ===== */
(function(){$$('video[data-video]').forEach(v=>{
 const cfg=CONFIG.video[v.dataset.video];
 if(!cfg)return;
 const small=matchMedia('(max-width:768px)').matches||navigator.connection?.saveData;
 const src=typeof cfg==='string'?cfg:(small?cfg.sm:cfg.lg)||cfg.sm||cfg.lg;
 const source=document.createElement('source');
 source.src=src;
 source.type=src.endsWith('.webm')?'video/webm':'video/mp4';
 v.append(source);

 const film=v.closest('.film');
 const button=film&&$('.play',film);
 let observer;
 if(button){
  const icon=$('path',button);
  const playIcon=icon.getAttribute('d');
  function updateButton(){
   button.setAttribute('aria-label',v.paused?'Воспроизвести видео о хлебе':'Приостановить видео о хлебе');
   icon.setAttribute('d',v.paused?playIcon:'M3 2h5v21H3z M13 2h5v21h-5z');
  }
  button.disabled=false;
  updateButton();
  v.addEventListener('playing',()=>{
   film.classList.add('has-video');
   updateButton();
  });
  v.addEventListener('pause',updateButton);
  button.addEventListener('click',()=>{
   observer?.disconnect();
   if(v.paused)v.play().catch(updateButton);
   else v.pause();
  });
 }
 if(reduceMotion.matches){
  v.preload='metadata';
  return;
 }
 observer=new IntersectionObserver(entries=>{
  if(!entries.some(entry=>entry.isIntersecting))return;
  observer.disconnect();
  v.load();
  v.play().catch(()=>{});
 },{rootMargin:'200px'});
 observer.observe(v);
})})();

/* ===== заголовки на телефоне: 40 px (первый экран — 48 px), но если в каждой строке
   оказывается по одному слову — уменьшаем заголовок, пока слова не встанут хотя бы по два ===== */
(function(){
  const mq=matchMedia('(max-width:640px)'),MIN=26;
  const heads=()=>$$('#main h1,#main h2').filter(h=>!h.closest('dialog'));
  function lines(h){const tops=[];const w=document.createTreeWalker(h,NodeFilter.SHOW_TEXT);let n;
    while(n=w.nextNode()){const re=/\S+/g;let m;while(m=re.exec(n.data)){const r=document.createRange();r.setStart(n,m.index);r.setEnd(n,m.index+m[0].length);tops.push(Math.round(r.getBoundingClientRect().top))}}
    const c={};tops.forEach(t=>c[t]=(c[t]||0)+1);return Object.values(c)}
  const allSingle=h=>{const c=lines(h);return c.length>1&&c.every(x=>x===1)};
  function fit(){
    heads().forEach(h=>{h.style.removeProperty('--fit');h.classList.remove('fit')});
    if(!mq.matches)return;
    heads().forEach(h=>{
      if(!allSingle(h))return;
      const t=h.querySelector('.h-xl')||h;let size=parseFloat(getComputedStyle(t).fontSize);
      h.style.setProperty('--fit',size+'px');h.classList.add('fit');
      while(allSingle(h)&&size>MIN){size-=2;h.style.setProperty('--fit',size+'px')}
    });
  }
  let raf;const run=()=>{cancelAnimationFrame(raf);raf=requestAnimationFrame(fit)};
  (document.fonts?document.fonts.ready:Promise.resolve()).then(run);
  addEventListener('resize',run,{passive:true});mq.addEventListener('change',run);
})();

/* ===== кнопка «наверх»: показываем при прокрутке вверх, когда первый экран уже позади ===== */
(function(){const btn=$('#toTop'),hero=$('.hero');if(!btn||!hero)return;btn.hidden=false;
 let last=scrollY,tick=false;
 function upd(){const y=scrollY,past=y>hero.offsetTop+hero.offsetHeight;
  if(!past||y>last+4)btn.classList.remove('show');else if(y<last-4)btn.classList.add('show');
  last=y;tick=false}
 addEventListener('scroll',()=>{if(!tick){tick=true;requestAnimationFrame(upd)}},{passive:true});
 btn.addEventListener('click',e=>{e.preventDefault();btn.classList.remove('show');
  scrollTo({top:0,behavior:reduceMotion.matches?'auto':'smooth'});history.replaceState(null,'','#main');
  setTimeout(()=>$('#h1').focus?.({preventScroll:true}),600);track('to_top')})})();

/* ===== каталог на телефоне: карусель карточек с точками-индикаторами ===== */
(function(){const mq=matchMedia('(max-width:640px)');
 $$('.grid--3,.grid--4').forEach(g=>{
  const dots=document.createElement('div');dots.className='carousel-dots';dots.setAttribute('aria-hidden','true');g.after(dots);
  const cards=()=>$$('.card',g).filter(c=>!c.hidden);
  function build(){const n=cards().length;dots.innerHTML='<i></i>'.repeat(n);mark()}
  function mark(){const cs=cards();if(!cs.length)return;const x=g.scrollLeft,w=cs[0].offsetWidth+12;
   const i=Math.min(cs.length-1,Math.round(x/w));$$('i',dots).forEach((d,k)=>d.classList.toggle('on',k===i))}
  let t;g.addEventListener('scroll',()=>{cancelAnimationFrame(t);t=requestAnimationFrame(mark)},{passive:true});
  new MutationObserver(()=>{g.scrollLeft=0;build()}).observe(g,{subtree:true,attributes:true,attributeFilter:['hidden']});
  build();mq.addEventListener('change',build);
 });
})();


/* ===== хлеба для каждого времени созревания — маленькие карточки ===== */
const LOAF_PH='<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M8 30c0-9 7-15 16-15s16 6 16 15v3c0 2-2 4-4 4H12c-2 0-4-2-4-4Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M17 22l3 5M24 20v6M31 22l-3 5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>';
const RIPEN={
 16:{items:[{id:'karelian',name:'Тартин Карельский солодовый',img:'hero'},{id:'oat',name:'Тартин Овсяный',img:'oat'}],
     note:'Холодная ферментация в&nbsp;климат-камерах при температуре от&nbsp;0 до&nbsp;+5&nbsp;°C, дальше расстойка и&nbsp;печь.'},
 18:{items:[{id:'tartin-wheat',name:'Тартины с&nbsp;пророщенным зерном',img:'tp_w'},{name:'Багет ржаной',img:'bgr'},{name:'Мини-багет с&nbsp;сыром',img:'mbs'}]},
 24:{items:[{id:'italian',name:'Итальянский домашний',img:'ital_w'},{id:'fruit',name:'С&nbsp;изюмом и&nbsp;черносливом',img:'fruit'},{name:'Французский багет',img:'bgf'},{name:'Чиабатта',img:'cia'}]}
};
function ripenItems(h){const r=RIPEN[h];if(!r)return'';
 const card=it=>{const b=it.id&&BREADS.find(x=>x.id===it.id);const href=b?breadUrl(b):withUtm(CONFIG.catalogUrl,'ripen');
  const media=it.img?`<img src="${IMG[it.img]}" alt="" loading="lazy" decoding="async" width="900" height="900">`:`<span class="mini-ph">${LOAF_PH}</span>`;
  return `<li><a class="mini" href="${href}"><span class="mini-media">${media}</span><span class="mini-name">${it.name}</span></a></li>`};
 return `<ul class="mini-cards">${r.items.map(card).join('')}</ul>`+(r.note?`<p class="ripen-note">${r.note}</p>`:'')}
/* ===== часы созревания: циферблат на 12 часов, стрелка делает круг и ещё часть ===== */
(function(){const dial=$('.dial');if(!dial)return;
 const ticks=$('.dial-ticks',dial),ns='http://www.w3.org/2000/svg';
 for(let i=0;i<60;i++){const a=i/60*Math.PI*2,maj=i%5===0,r1=maj?95:99,r2=106,l=document.createElementNS(ns,'line');
  l.setAttribute('x1',120+Math.sin(a)*r1);l.setAttribute('y1',120-Math.cos(a)*r1);l.setAttribute('x2',120+Math.sin(a)*r2);l.setAttribute('y2',120-Math.cos(a)*r2);
  l.setAttribute('class',maj?'major':'minor');ticks.append(l)}
 const hand=$('.dial-hand',dial),arc1=$('.dial-arc1',dial),arc2=$('.dial-arc2',dial),btns=$$('.seg button'),eg=$('.ripen-items');
 let cur=0,anim=0,user=false;
 const draw=v=>{hand.style.transform=`rotate(${v/12*360}deg)`;arc1.style.strokeDashoffset=(100-Math.min(v,12)/12*100).toFixed(2);arc2.style.strokeDashoffset=(100-Math.max(0,v-12)/12*100).toFixed(2)};
 const go=(to,ms)=>new Promise(res=>{cancelAnimationFrame(anim);
  btns.forEach(b=>{const on=+b.dataset.h===to;b.setAttribute('aria-pressed',String(on));if(on)eg.innerHTML=ripenItems(to)});
  if(reduceMotion.matches){cur=to;draw(to);return res()}
  const from=cur,t0=performance.now();
  const f=now=>{const k=Math.min(1,(now-t0)/ms),e=k<.5?4*k*k*k:1-Math.pow(-2*k+2,3)/2;cur=from+(to-from)*e;draw(cur);if(k<1)anim=requestAnimationFrame(f);else res()};
  anim=requestAnimationFrame(f)});
 draw(0);
 btns.forEach(b=>b.addEventListener('click',()=>{user=true;go(+b.dataset.h,2200);track('ripen',{h:+b.dataset.h})}));
 const demo=async()=>{for(const h of [16,18,24]){if(user)return;await go(h,h===16?4200:2600);await new Promise(r=>setTimeout(r,2200))}};
 if('IntersectionObserver' in window){const io=new IntersectionObserver(es=>{if(es[0].isIntersecting){io.disconnect();demo()}},{threshold:.45});io.observe(dial)}else go(24,1);
})();

/* ===== фото в карточке: несколько ракурсов, переключение точками (и наведением на компьютере) ===== */
(function(){
 function show(card,i){const imgs=$$('.card-media img',card),bs=$$('.views button',card);if(!imgs[i])return;
  imgs.forEach((im,k)=>im.classList.toggle('on',k===i));bs.forEach((b,k)=>b.setAttribute('aria-pressed',String(k===i)))}
 document.addEventListener('click',e=>{const b=e.target.closest('.views button');if(!b)return;e.preventDefault();
  const card=b.closest('.card');show(card,$$('.views button',card).indexOf(b));track('card_view',{sku:card.id})});
 if(matchMedia('(hover:hover)').matches){
  document.addEventListener('mousemove',e=>{const m=e.target.closest('.card-media');if(!m)return;const n=$$('img',m).length;if(n<2)return;
   const r=m.getBoundingClientRect();show(m.closest('.card'),Math.min(n-1,Math.floor((e.clientX-r.left)/r.width*n)))});
  document.addEventListener('mouseleave',()=>{},true);
  $$('.card-media').forEach(m=>m.addEventListener('mouseleave',()=>show(m.closest('.card'),0)));
 }
})();

/* ===== Dev Mod: показать или скрыть блок «У каждого хлеба своё время» ===== */
(function(){const sec=$('#ripen');if(!sec)return;
 const set=show=>{sec.hidden=!show};
 set(false);try{set(localStorage.getItem('v2-ripen')==='shown')}catch(e){}
 addEventListener('message',e=>{const d=e.data||{};if(d.bread==='ripen')set(!!d.show)});
})();
