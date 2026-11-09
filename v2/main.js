/* Лендинг, вариант дизайна 2 (Пекарня МясновЪ). Тексты — как в варианте 1. */
/* ===== Настройки для маркетинга и ИТ ===== */
const CONFIG={
  catalogUrl:'https://www.coolclever.ru/catalog/myasnov/khleba-remeslennye/tselyy-khleb', // подраздел «Целый хлеб» (474367)
  appUrl:'',            // ссылка на приложение (смарт-ссылка App Store / Google Play / RuStore); пусто — кнопка ведёт в каталог
  utm:{utm_source:'landing_bread',utm_medium:'landing',utm_campaign:'bread_nov2026'},
  ymId:null,            // ID счётчика Яндекс Метрики — цели landing_bread_*
    cutoffHour:15, tz:'Europe/Moscow',
  // Видео из макета: положите файлы в v2/video/ и впишите пути. Пока пусто — показывается кадр-заставка.
  video:{hero:'',film:''}
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
(function(){const els=$$('.reveal');requestAnimationFrame(()=>$('#heroMedia').classList.add('in'));
 if(!('IntersectionObserver' in window)||reduceMotion.matches){els.forEach(e=>e.classList.add('in'));return}
 const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{rootMargin:'0px 0px -8% 0px'});
 els.forEach((e,i)=>{e.style.transitionDelay=(i%3)*80+'ms';io.observe(e)})})();

/* ===== каталог ===== */
function metaHtml(b){return `<span>${SCALE14}${b.w}</span>`+(b.h?`<span>${CLOCK14}${b.h} ${word(b.h,'час','часа','часов')} созревания</span>`:'')+(b.form?`<span>${FORM14}выпекаем в форме</span>`:'')}
(function(){
 const cardHtml=b=>`<article class="card" id="card-${b.id}" data-g="${b.g}" data-use="${b.use.join(' ')}" style="--vt:c-${b.id}">
  <div class="card-media">
   ${b.h?`<span class="badge">${CLOCK16}${b.h} ч</span>`:''}
   <img src="${IMG[b.v[0][0]]}" alt="${b.name}" loading="lazy" decoding="async" width="900" height="900">
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
(function(){$$('video[data-video]').forEach(v=>{const src=CONFIG.video&&CONFIG.video[v.dataset.video];if(!src)return;
 const s=document.createElement('source');s.src=src;s.type=src.endsWith('.webm')?'video/webm':'video/mp4';v.append(s);
 v.addEventListener('playing',()=>{const f=v.closest('.film');if(f)f.classList.add('has-video')},{once:true});
 if(reduceMotion.matches){v.preload='metadata';return}
 const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){v.load();v.play().catch(()=>{});io.disconnect()}}),{rootMargin:'200px'});io.observe(v)})})();
