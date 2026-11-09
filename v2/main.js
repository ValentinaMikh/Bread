/* Лендинг, вариант дизайна 2 (Пекарня МясновЪ). Тексты — как в варианте 1. */
/* ===== Настройки для маркетинга и ИТ ===== */
const CONFIG={
  catalogUrl:'https://www.coolclever.ru/catalog/myasnov/khleba-remeslennye/tselyy-khleb', // подраздел «Целый хлеб» (474367)
  appUrl:'',            // ссылка на приложение (смарт-ссылка App Store / Google Play / RuStore); пусто — кнопка ведёт в каталог
  utm:{utm_source:'landing_bread',utm_medium:'landing',utm_campaign:'bread_nov2026'},
  ymId:null,            // ID счётчика Яндекс Метрики — цели landing_bread_*
    cutoffHour:15, tz:'Europe/Moscow'
};
const IMG={hero:"img/hero.webp",crust:"img/crust.webp",ital_w:"img/ital_w.webp",ital_c:"img/ital_c.webp",ital_s:"img/ital_s.webp",kar_s:"img/kar_s.webp",tp_w:"img/tp_w.webp",tp_s:"img/tp_s.webp",tr_s:"img/tr_s.webp",tr_l:"img/tr_l.webp",oat:"img/oat.webp",fruit:"img/fruit.webp",psh:"img/psh.webp",der:"img/der.webp",rzh:"img/rzh.webp",bor:"img/bor.webp",home:"img/home.webp"};
const BREADS=[
 {id:'italian',name:'Хлеб Итальянский домашний на закваске',w:'900 г',h:24,k:500,g:'long',use:['dinner','cheese'],
  d:'Три вида муки, хрустящая корочка и пористый мякиш.',p:['оливковое масло','томаты','моцарелла'],
  v:[['ital_w','Целиком'],['ital_s','В разрезе'],['ital_c','Корочка']],url:'/catalog/product/khleb-italyanskiy-domashniy-na-zakvaske-900-g-90012344'},
 {id:'tartin-wheat',name:'Тартин пшеничный с пророщенным зерном пшеницы',w:'400 г',h:18,k:500,g:'long',use:['breakfast'],
  d:'Пшеничный вкус с лёгкими ореховыми нотами.',p:['творожный сыр','авокадо','яйцо'],v:[['tp_w','Целиком'],['tp_s','Ломтики']],url:''},
 {id:'tartin-rye',name:'Тартин с пророщенным зерном ржи',w:'400 г',h:18,k:500,g:'long',use:['cheese','breakfast'],
  d:'Глубокие солодовые ноты и пористый мякиш.',p:['сливочное масло','сыр','паштет'],v:[['tr_s','В разрезе'],['tr_l','Ломтики']],url:''},
 {id:'karelian',name:'Тартин Карельский солодовый с грецким орехом и клюквой',w:'450 г',h:16,k:500,g:'long',use:['cheese','breakfast','tea'],
  d:'Солод, лёгкая терпкость ореха и кислинка клюквы.',p:['сырная тарелка','завтрак','чай'],v:[['hero','Целиком'],['kar_s','В разрезе'],['crust','Корочка']],url:''},
 {id:'oat',name:'Тартин Овсяный с яблоком и корицей',w:'450 г',h:16,k:500,g:'long',use:['breakfast','tea','cheese'],
  d:'Овсяное зерно, сушёное яблоко и деликатная корица.',p:['сливочное масло','мягкий сыр'],v:[['oat','В разрезе']],url:''},
 {id:'fruit',name:'Хлеб бездрожжевой с изюмом и черносливом',w:'500 г',h:24,k:500,g:'long',use:['tea','cheese'],
  d:'Чуть влажный мякиш, солодовый аромат, изюм, чернослив и курага.',sp:'Без добавления хлебопекарных дрожжей',p:['чай','кофе','выдержанный сыр'],v:[['fruit','В разрезе']],url:''},
 {id:'wheat',name:'Пшеничный',w:'500 г',h:null,k:500,g:'classic',use:['breakfast','dinner'],
  d:'Плотный ароматный мякиш и толстая корочка.',p:['ломоть с маслом','тост','бутерброд'],v:[['psh','Целиком']],url:'/catalog/product/khleb-pshenichnyy-500g-90012362'},
 {id:'village',name:'Деревенский',w:'600 г',h:null,k:500,g:'classic',use:['dinner'],
  d:'Пшеничная и ржаная мука, солод и закваска. Ароматный хлеб к супу и домашнему обеду.',p:['суп','домашний обед'],v:[['der','Целиком']],url:'/catalog/product/khleb-derevenskiy-600g-90012335'},
 {id:'rye',name:'Ржаной формовой',w:'800 г',h:null,k:250,g:'classic',form:true,use:['dinner'],
  d:'Плотный мякиш и выраженная кислинка.',p:['горячие блюда','солёная рыба','сливочное масло'],v:[['rzh','Целиком']],url:'/catalog/product/khleb-rzhanoy-gost-800g-90012374'},
 {id:'borodinsky',name:'Бородинский формовой',w:'400 г',h:null,k:250,g:'classic',form:true,use:['dinner'],
  d:'Ржаная мука, солод и кориандр. Узнаваемый слегка сладковатый вкус и тёмный мякиш.',p:[],v:[['bor','Целиком']],url:'/catalog/product/khleb-borodinskiy-myasnov-pekarnya-90012324'}
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

/* ===== тема ===== */
(function(){const root=document.documentElement,btn=$('#themeBtn');
 const sync=()=>btn.setAttribute('aria-pressed',String(root.dataset.theme==='dark'));sync();
 btn.addEventListener('click',()=>{root.dataset.theme=root.dataset.theme==='dark'?'light':'dark';sync();try{localStorage.setItem('myasnov-theme',root.dataset.theme)}catch(e){}track('theme',{to:root.dataset.theme})})})();

/* ===== ссылки ===== */
$$('[data-cat]').forEach(a=>a.href=withUtm(CONFIG.catalogUrl,'catalog'));
$$('[data-utm]').forEach(a=>a.href=withUtm(a.getAttribute('href'),'format'));
$('#appBtn').href=CONFIG.appUrl?CONFIG.appUrl:withUtm(CONFIG.catalogUrl,'app');

/* ===== шапка: прогресс, тень; нижняя панель на телефоне ===== */
(function(){const top=$('#top'),pr=$('#progress'),dock=$('#dock'),links=$$('a',dock);let tick=false;
 function upd(){const h=document.documentElement;pr.style.setProperty('--p',(h.scrollTop/(h.scrollHeight-h.clientHeight||1)).toFixed(4));top.classList.toggle('scrolled',h.scrollTop>8);
  const near=id=>{const r=document.getElementById(id).getBoundingClientRect();return r.top<innerHeight&&r.bottom>0};
  const show=h.scrollTop>innerHeight*.9&&!near('bread')&&!near('preorder');
  dock.classList.toggle('show',show);dock.setAttribute('aria-hidden',String(!show));links.forEach(a=>a.tabIndex=show?0:-1);tick=false}
 addEventListener('scroll',()=>{if(!tick){tick=true;requestAnimationFrame(upd)}},{passive:true});addEventListener('resize',upd,{passive:true});upd()})();

/* ===== появление блоков ===== */
(function(){const els=$$('.reveal');if(!('IntersectionObserver' in window)||reduceMotion.matches){els.forEach(e=>e.classList.add('in'));return}
 const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{rootMargin:'0px 0px -8% 0px'});
 els.forEach((e,i)=>{e.style.transitionDelay=(i%3)*80+'ms';io.observe(e)});
 requestAnimationFrame(()=>$('#heroMedia').classList.add('in'))})();

/* ===== Сколько созревает тесто — как в первой версии ===== */
(function(){const fg=$('#ringFg'),val=$('#ringVal'),lbl=$('#ringLbl'),list=$('#dialList'),C=326.73;let seen=false;
 const rows={16:BREADS.filter(b=>b.h===16).map(b=>`<li><a href="#card-${b.id}" data-goto="${b.id}"><span>${b.name}</span><span>${b.w}</span></a></li>`).join('')};
 const other=`<li><a href="${withUtm(CONFIG.catalogUrl,'dial')}"><span>Выбрать хлеб с долгим созреванием →</span></a></li><li class="dial-note">Ассортимент и характеристики — в каталоге.</li>`;
 function set(h,user){$$('.seg button').forEach(b=>b.setAttribute('aria-pressed',String(+b.dataset.h===h)));val.textContent=h;lbl.textContent=word(h,'час','часа','часов')+' созревания';
  list.innerHTML=rows[h]||other;if(seen)fg.style.strokeDashoffset=C*(1-h/24);if(user)track('dial',{hours:h})}
 $$('.seg button').forEach(b=>b.addEventListener('click',()=>set(+b.dataset.h,true)));
 set(16);
 const io=new IntersectionObserver(es=>{if(es[0].isIntersecting){io.disconnect();seen=true;requestAnimationFrame(()=>{fg.style.strokeDashoffset=C*(1-(+val.textContent)/24)})}},{threshold:.4});io.observe($('.dial'))})();

/* ===== каталог ===== */
function metaHtml(b){return `<span>${ICON.scale}${b.w}</span>`+(b.h?`<span>${ICON.clock}${b.h} ${word(b.h,'час','часа','часов')} созревания</span>`:'')+(b.form?`<span>${ICON.form}выпекаем в форме</span>`:'')}
(function(){const grid=$('#grid');
 const cardHtml=b=>`<article class="card" id="card-${b.id}" data-g="${b.g}" data-use="${b.use.join(' ')}" style="--vt:c-${b.id}">
  <div class="card-media">
   ${b.h?`<span class="badge">${ICON.clock}${b.h} ч</span>`:''}
   <img src="${IMG[b.v[0][0]]}" alt="${b.name}" loading="lazy" decoding="async" width="900" height="900">
  </div>
  <div class="card-body">
   <h3>${b.name}</h3>
   <div class="meta">${metaHtml(b)}</div>
   <p>${b.d}</p>
   <div class="card-foot"><span class="kegl"><b>+${b.k}</b>${KEGL}<span>за предзаказ</span></span>
   <a class="btn" href="${breadUrl(b)}" data-sku="${b.id}">Заказать</a></div>
  </div></article>`;
 $('#gLong').innerHTML=BREADS.filter(b=>b.g=='long').map(cardHtml).join('');
 $('#gClassic').innerHTML=BREADS.filter(b=>b.g=='classic').map(cardHtml).join('');
 const chips=$$('.filters .chip');
 chips.forEach(c=>c.addEventListener('click',()=>{const f=c.dataset.f;chips.forEach(x=>x.setAttribute('aria-pressed',String(x===c)));
  const apply=()=>{$$('.card',grid).forEach(card=>card.hidden=!(f=='all'||card.dataset.g==f||card.dataset.use.split(' ').includes(f)));$$('.grp',grid).forEach(g=>g.hidden=!$$('.card',g).some(c=>!c.hidden))};
  document.startViewTransition&&!reduceMotion.matches?document.startViewTransition(apply):apply();track('filter',{f})}))})();
document.addEventListener('click',e=>{const g=e.target.closest('[data-goto]');if(!g)return;e.preventDefault();const id=g.dataset.goto,el=$('#card-'+id);
 if(el.hidden){$$('.card').forEach(c=>c.hidden=false);$$('.grp').forEach(g=>g.hidden=false);$$('.filters .chip').forEach(x=>x.setAttribute('aria-pressed',String(x.dataset.f==='all')))}
 el.scrollIntoView({behavior:reduceMotion.matches?'auto':'smooth',block:'center'});el.classList.remove('flash');void el.offsetWidth;el.classList.add('flash');track('goto',{sku:id})});
document.addEventListener('click',e=>{const a=e.target.closest('.card .btn');if(a)track('card_cta',{sku:a.dataset.sku})});

/* ===== Рассмотрите — потом попробуйте: нож ===== */
(function(){const c=$('#compare'),r=$('#knife');let used=false;
 r.addEventListener('input',()=>{used=true;c.style.setProperty('--x',r.value+'%')});
 const io=new IntersectionObserver(es=>{if(es[0].isIntersecting){io.disconnect();if(reduceMotion.matches||used)return;let t=0;const a=()=>{if(used)return;t+=0.02;const v=50+Math.sin(t*3)*22*Math.max(0,1-t/2.2);c.style.setProperty('--x',v+'%');r.value=v;if(t<2.2)requestAnimationFrame(a)};a()}},{threshold:.6});io.observe(c)})();

/* ===== предзаказ: до 15:00 по Москве — тексты первой версии ===== */
(function(){const box=$('#clock'),st=$('#clkState'),big=$('#clkBig'),sub=$('#clkSub'),bar=$('#clkBar');
 function msk(){const p=new Intl.DateTimeFormat('ru-RU',{timeZone:CONFIG.tz,hour:'2-digit',minute:'2-digit',second:'2-digit',hourCycle:'h23'}).formatToParts(new Date());const g=t=>+p.find(x=>x.type==t).value;return g('hour')*3600+g('minute')*60+g('second')}
 function upd(){const s=msk(),cut=CONFIG.cutoffHour*3600;
  if(s<cut){const left=cut-s,h=Math.floor(left/3600),m=Math.floor(left%3600/60);box.classList.remove('late');
   st.textContent='Принимаем заказы на завтра';big.innerHTML=`${h}<small>${word(h,'час','часа','часов')}</small> ${m}<small>мин</small>`;
   sub.innerHTML='Осталось до 15:00 по Москве — успейте оформить, и&nbsp;свежий хлеб будет у&nbsp;вас завтра утром.';bar.style.setProperty('--w',(100*s/cut).toFixed(1)+'%')}
  else{box.classList.add('late');st.textContent='Предзаказ из пекарни';big.textContent='До 15:00';
   sub.textContent='Выберите доступную дату и время получения на сайте или в приложении КуулКлевер.';bar.style.setProperty('--w','100%')}}
 upd();setInterval(upd,15000)})();
