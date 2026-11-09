/* ===== Настройки для маркетинга и ИТ ===== */
const CONFIG={
  catalogUrl:'https://www.coolclever.ru/catalog/myasnov/khleba-remeslennye/tselyy-khleb', // подраздел «Целый хлеб» (474367)
  appUrl:'',            // ссылка на приложение (смарт-ссылка App Store / Google Play / RuStore); пусто — кнопка ведёт в каталог
  utm:{utm_source:'landing_bread',utm_medium:'landing',utm_campaign:'bread_nov2026'},
  ymId:null,            // ID счётчика Яндекс Метрики — цели landing_bread_*
  audioSrc:'',          // файл настоящей записи «поющей» корочки; пока пусто — мягкий синтезированный треск
  cutoffHour:15, tz:'Europe/Moscow'
};
const IMG={hero:"img/hero.webp",crust:"img/crust.webp",ital_w:"img/ital_w.webp",ital_c:"img/ital_c.webp",ital_s:"img/ital_s.webp",kar_s:"img/kar_s.webp",tp_w:"img/tp_w.webp",tp_s:"img/tp_s.webp",tr_s:"img/tr_s.webp",tr_l:"img/tr_l.webp",oat:"img/oat.webp",fruit:"img/fruit.webp",psh:"img/psh.webp",der:"img/der.webp",rzh:"img/rzh.webp",bor:"img/bor.webp",home:"img/home.webp"};
const BREADS=[
 {id:'italian',name:'Итальянский домашний',w:'900 г',h:24,k:500,g:'long',use:['dinner','cheese'],
  d:'Большая буханка для общего стола. Насыщенный вкус с лёгкой сладостью.',p:['оливковое масло','томаты','моцарелла'],
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
const RITUALS={
 plain:{t:'Сначала попробуйте просто так — чтобы познакомиться со вкусом самого хлеба.',b:['wheat','village','italian']},
 butter:{t:'Немного сливочного масла — и ломоть раскрывается по-новому.',b:['wheat','tartin-rye','oat','rye']},
 cheese:{t:'К сырной тарелке — хлеба с орехом, фруктами и солодом.',b:['karelian','fruit','tartin-rye','oat','italian']},
 breakfast:{t:'Ваше доброе утро начинается в пекарне.',b:['tartin-wheat','karelian','wheat']},
 table:{t:'Большая буханка для общего стола. Несколько ломтей к ужину.',b:['italian','village','rye','borodinsky']}
};
const PHRASES=['Хлеб — целое удовольствие!','До дома дойдут не все корочки','Хорошему хлебу нужно время. Вам — первый ломоть','В руках пекаря у хлеба появляется характер','Принесите домой аромат хлеба','Всё начинается с корочки. Всё раскрывается в первом ломте','Сначала попробуйте просто так','Испечём специально для вас'];

/* ===== utils ===== */
document.querySelectorAll('img[data-k]').forEach(i=>i.src=IMG[i.dataset.k]);
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const word=(n,a,b,c)=>{n=Math.abs(n)%100;const m=n%10;return n>10&&n<20?c:m>1&&m<5?b:m==1?a:c};
function withUtm(u,content){try{const x=new URL(u,'https://www.coolclever.ru');Object.entries(CONFIG.utm).forEach(([k,v])=>x.searchParams.set(k,v));if(content)x.searchParams.set('utm_content',content);return x.toString()}catch(e){return u}}
function track(name,params={}){try{(window.dataLayer=window.dataLayer||[]).push({event:'landing_bread_'+name,...params});if(CONFIG.ymId&&window.ym)ym(CONFIG.ymId,'reachGoal','landing_bread_'+name,params)}catch(e){}}
const breadUrl=b=>withUtm(b.url||CONFIG.catalogUrl,b.id);
const KEGL='<svg class="kgl" aria-hidden="true" width="33" height="20" viewBox="0 0 33 20" fill="#80BA27" xmlns="http://www.w3.org/2000/svg"> <path d="M0 10C0 7.2071 0 5.81065 0.392817 4.68805C1.0964 2.67732 2.67732 1.0964 4.68805 0.392817C5.81065 0 7.2071 0 10 0H23C25.7929 0 27.1893 0 28.312 0.392817C30.3227 1.0964 31.9036 2.67732 32.6072 4.68805C33 5.81065 33 7.2071 33 10C33 12.7929 33 14.1893 32.6072 15.312C31.9036 17.3227 30.3227 18.9036 28.312 19.6072C27.1893 20 25.7929 20 23 20H10C7.2071 20 5.81065 20 4.68805 19.6072C2.67732 18.9036 1.0964 17.3227 0.392817 15.312C0 14.1893 0 12.7929 0 10Z" /> <path d="M8.3461 14.3017C7.70833 14.3017 7.33447 13.9023 7.33447 13.1959V6.79844C7.33447 6.09211 7.70833 5.69263 8.3461 5.69263C8.98386 5.69263 9.35223 6.09211 9.35223 6.79844V9.19532H9.39621L12.1507 6.20211C12.5191 5.79105 12.6895 5.69263 12.9919 5.69263C13.4702 5.69263 13.8661 6.05737 13.8661 6.50896C13.8661 6.79265 13.7781 6.99528 13.5527 7.22687L11.1611 9.75691L13.6846 12.5822C13.9155 12.8486 13.987 13.0107 13.987 13.2886C13.987 13.8791 13.5967 14.3017 13.0469 14.3017C12.684 14.3017 12.4806 14.1859 12.1067 13.7517L9.39621 10.7064H9.35223V13.1959C9.35223 13.9023 8.98386 14.3017 8.3461 14.3017Z" fill="white"/> <path d="M15.323 14.3075C14.7128 14.3075 14.3499 13.9254 14.3499 13.2596V8.98111C14.3499 8.27478 14.7182 7.86951 15.356 7.86951H18.094C18.4679 7.86951 18.7922 8.14741 18.7922 8.62795C18.7922 9.10848 18.4679 9.38638 18.094 9.38638H16.2962V13.2596C16.2962 13.9254 15.9333 14.3075 15.323 14.3075Z" fill="white"/> <path d="M19.5455 14.2381C18.8197 14.2381 18.3469 13.8444 18.3469 13.2365C18.3469 12.7907 18.6383 12.4896 19.0616 12.4896H19.0781C19.6719 12.4896 19.9138 12.067 19.9633 10.8569L20.1447 6.9316C20.1722 6.21948 20.5131 5.82 21.1509 5.82H24.9885C25.6317 5.82 26.0001 6.22527 26.0001 6.9316V13.1959C26.0001 13.9023 25.6317 14.3017 24.9885 14.3017C24.3507 14.3017 23.9823 13.9023 23.9823 13.1959V7.52793H21.9811L21.8216 10.7817C21.7117 13.0454 21.0024 14.2381 19.5455 14.2381Z" fill="white"/> </svg>';

/* ===== theme ===== */
(function(){const root=document.documentElement,btn=$('#themeBtn');
 const sync=()=>btn.setAttribute('aria-pressed',String(root.dataset.theme==='dark'));sync();
 btn.addEventListener('click',()=>{const dark=root.dataset.theme==='dark';root.dataset.theme=dark?'light':'dark';sync();try{localStorage.setItem('myasnov-theme',root.dataset.theme)}catch(e){}track('theme',{to:root.dataset.theme})})})();

/* ===== mobile menu ===== */
(function(){const btn=$('#menuBtn'),nav=$('#topNav'),top=$('#top');
 const set=open=>{btn.setAttribute('aria-expanded',String(open));btn.setAttribute('aria-label',open?'Закрыть меню':'Меню');top.classList.toggle('menu-open',open)};
 btn.addEventListener('click',()=>set(btn.getAttribute('aria-expanded')!=='true'));
 nav.addEventListener('click',e=>{if(e.target.closest('a'))set(false)});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&btn.getAttribute('aria-expanded')==='true'){set(false);btn.focus()}});
 document.addEventListener('click',e=>{if(!top.contains(e.target))set(false)})})();

/* ===== links ===== */
$$('[data-cat]').forEach(a=>a.href=withUtm(CONFIG.catalogUrl,'catalog'));
$$('[data-utm]').forEach(a=>a.href=withUtm(a.getAttribute('href'),'footer'));
$('#appBtn').href=CONFIG.appUrl?CONFIG.appUrl:withUtm(CONFIG.catalogUrl,'app');
document.addEventListener('click',e=>{const a=e.target.closest('[data-track]');if(a)track(a.dataset.track,{href:a.href||''})});

/* ===== marquee ===== */
(function(){const t=$('#mq');const html=PHRASES.map(p=>`<span>${p}</span>`).join('');t.innerHTML=html+html;
 document.documentElement.style.setProperty('--clover',`url("data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 2 27.52 28"><path d="M27.513 16C27.513 23.732 21.354 30 13.7565 30C6.159 30 0 23.732 0 16C0 8.26801 6.159 2 13.7565 2C21.354 2 27.513 8.26801 27.513 16Z" fill="#F3AA48"/><path fill-rule="evenodd" clip-rule="evenodd" d="M21.8869 16.0983C21.8474 16.7033 21.5695 18.7496 19.6598 19.6752C18.0364 20.4614 16.0309 20.054 14.7439 18.8019C19.1929 18.4606 20.3005 17.0973 20.5494 16.2673C20.7151 15.7145 20.618 14.9663 20.1202 14.103C20.7134 13.8595 21.1258 13.8157 21.3364 13.9522C21.6117 14.13 21.9648 14.9141 21.8869 16.0983ZM8.88184 19.6706C8.07542 19.2977 7.77202 18.1581 7.74476 17.1942C8.92405 17.9104 10.4441 18.4433 12.1678 18.7159C11.0144 19.735 9.66803 20.0342 8.88184 19.6706ZM12.1565 17.4312C10.428 17.1245 8.92333 16.5208 7.89925 15.7544C8.07118 15.1106 8.34336 14.6948 8.55705 14.6068C8.6041 14.5874 8.65994 14.5777 8.72502 14.5777C9.33269 14.5777 10.7068 15.4388 12.1565 17.4312ZM6.50869 13.8602C6.29807 12.7715 7.09701 10.8643 10.0404 9.0695C11.6568 8.08491 13.1698 7.6358 14.1442 7.6358C14.5232 7.6358 14.8204 7.70321 15.0108 7.83382C15.4694 8.14811 15.6642 8.98861 15.564 10.2062C14.0206 9.41245 12.381 8.97471 11.4373 9.64501C10.4968 10.3128 10.4427 11.9542 11.2659 14.5372C10.0602 13.5126 8.89629 13.0866 8.02567 13.4452C7.50154 13.6613 7.12559 14.1319 6.86793 14.7024C6.69072 14.4298 6.56453 14.1483 6.50869 13.8602ZM12.2288 10.6603C12.3084 10.6039 12.4416 10.5735 12.6201 10.5735C13.172 10.5735 14.1639 10.8676 15.3679 11.5506C15.0667 12.9889 14.4629 14.7533 13.511 16.7217C12.0235 13.24 11.7121 11.0273 12.2288 10.6603ZM19.2765 15.9192C19.0615 16.6362 17.4992 17.221 15.2796 17.4772C16.7544 16.1947 17.9891 15.2843 18.9582 14.702C19.2488 15.1794 19.3711 15.604 19.2765 15.9192ZM18.1667 13.693C17.3515 14.1818 16.4395 14.8369 15.4291 15.6626C15.9484 14.4291 16.3239 13.3071 16.5604 12.3116C17.1853 12.7603 17.7296 13.233 18.1667 13.693ZM22.0717 12.9047C21.4416 12.4969 20.5341 12.5567 19.3627 13.069C18.7827 12.4088 17.9825 11.7074 16.9003 10.9886C16.8713 10.9692 16.8414 10.9507 16.8124 10.9317C17.0863 8.80246 16.6506 7.39952 15.7839 6.80548C14.3272 5.80656 11.4964 6.68751 9.33784 8.00325C7.04653 9.39987 4.76094 11.7322 5.21736 14.0894C5.3673 14.8646 5.80261 15.5901 6.46305 16.2309C6.43358 16.4631 6.416 16.6918 6.41116 16.9096C6.36895 18.7853 7.07424 20.243 8.29794 20.8088C8.69587 20.9929 9.13909 21.0801 9.60298 21.0801C10.2951 21.0801 11.0333 20.8775 11.7426 20.5181C11.262 21.7281 10.9401 22.9941 10.8034 24.2757C10.5879 26.3039 10.7392 28.0494 11.3877 30L12.7434 29.965C12.1502 28.1804 11.9185 26.2584 12.1163 24.4038C12.2957 22.7123 12.8243 21.0494 13.6465 19.5318C14.7484 20.6887 16.3125 21.3384 17.8835 21.3384C18.6926 21.3384 19.5034 21.1665 20.2531 20.8029C21.9631 19.9742 23.0654 18.2452 23.2009 16.1778C23.2981 14.6961 22.8548 13.4115 22.0717 12.9047Z" fill="white"/></svg>')}")`)})();

/* ===== header progress / dock ===== */
(function(){const top=$('#top'),pr=$('#progress'),dock=$('#dock');let tick=false;
 function upd(){const h=document.documentElement;const p=h.scrollTop/(h.scrollHeight-h.clientHeight||1);pr.style.setProperty('--p',p.toFixed(4));top.classList.toggle('scrolled',h.scrollTop>8);
  const bread=$('#bread').getBoundingClientRect();const pre=$('#preorder').getBoundingClientRect();
  const inSection=(bread.top<innerHeight*.6&&bread.bottom>innerHeight*.4)||(pre.top<innerHeight&&pre.bottom>0);
  const show=h.scrollTop>innerHeight*.9&&!inSection&&!top.classList.contains('menu-open');dock.classList.toggle('show',show);dock.setAttribute('aria-hidden',String(!show));dock.querySelector('a').tabIndex=show?0:-1;tick=false}
 addEventListener('scroll',()=>{if(!tick){tick=true;requestAnimationFrame(upd)}},{passive:true});upd();
 const links=$$('.top nav a');const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)links.forEach(a=>a.classList.toggle('on',a.hash==='#'+e.target.id))}),{rootMargin:'-45% 0px -50% 0px'});
 ['crust','time','bread','slice','preorder'].forEach(id=>io.observe(document.getElementById(id)))})();

/* ===== reveal ===== */
(function(){const els=$$('.reveal');if(!('IntersectionObserver' in window)){els.forEach(e=>e.classList.add('in'));return}
 const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{rootMargin:'0px 0px -8% 0px'});
 els.forEach((e,i)=>{e.style.transitionDelay=(i%3)*90+'ms';io.observe(e)});
 requestAnimationFrame(()=>$('#heroMedia').classList.add('in'))})();

/* ===== sound: «поющая» корочка ===== */
(function(){const btn=$('#soundBtn'),lbl=$('#soundLbl'),sp=$('#crackle');let ctx=null,timer=null,audio=null,stopAt=0;
 function spark(){const s=document.createElement('span');s.style.left=(25+Math.random()*55)+'%';s.style.top=(15+Math.random()*60)+'%';sp.appendChild(s);setTimeout(()=>s.remove(),800)}
 function click(t,gain){const len=Math.floor(ctx.sampleRate*(0.004+Math.random()*0.012));const buf=ctx.createBuffer(1,len,ctx.sampleRate);const d=buf.getChannelData(0);
  for(let i=0;i<len;i++){d[i]=(Math.random()*2-1)*Math.pow(1-i/len,3)}
  const src=ctx.createBufferSource();src.buffer=buf;const bp=ctx.createBiquadFilter();bp.type='bandpass';bp.frequency.value=1800+Math.random()*4200;bp.Q.value=0.9+Math.random()*2;
  const g=ctx.createGain();g.gain.value=gain;src.connect(bp).connect(g).connect(ctx.destination);src.start(t)}
 function stop(){clearTimeout(timer);timer=null;if(audio){audio.pause();audio.currentTime=0}btn.classList.remove('playing');btn.setAttribute('aria-pressed','false');lbl.textContent='Послушать корочку'}
 function loop(){if(Date.now()>stopAt){stop();return}const left=(stopAt-Date.now())/7000;const n=1+Math.floor(Math.random()*3*left+left);
  for(let i=0;i<n;i++){click(ctx.currentTime+Math.random()*0.08,0.25+Math.random()*0.6*left)}if(Math.random()<.5)spark();timer=setTimeout(loop,60+Math.random()*(260/(left+.25)))}
 btn.addEventListener('click',()=>{if(btn.classList.contains('playing')){stop();return}
  btn.classList.add('playing');btn.setAttribute('aria-pressed','true');lbl.textContent='Хлеб поёт…';
  if(CONFIG.audioSrc){audio=audio||new Audio(CONFIG.audioSrc);audio.onended=stop;audio.play().catch(stop);const iv=setInterval(()=>{if(!btn.classList.contains('playing'))return clearInterval(iv);spark()},280);return}
  try{ctx=ctx||new (window.AudioContext||window.webkitAudioContext)();ctx.resume();stopAt=Date.now()+7000;loop()}catch(e){stop()}})})();

/* ===== 01 story ===== */
(function(){const imgs=$$('#storyMedia img'),dots=$$('.story-dots button'),steps=$$('.step');
 const set=i=>{imgs.forEach((m,k)=>m.classList.toggle('on',k==i));dots.forEach((m,k)=>{m.classList.toggle('on',k==i);m.setAttribute('aria-pressed',String(k==i))});steps.forEach((m,k)=>m.classList.toggle('on',k==i))};
 dots.forEach(d=>d.addEventListener('click',()=>{const i=+d.dataset.i;set(i);if(sticky.matches)steps[i].scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'center'})}));
 const sticky=matchMedia('(min-width:60em) and (min-height:40em)');
 const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting&&sticky.matches)set(+e.target.dataset.i)}),{rootMargin:'-45% 0px -45% 0px'});steps.forEach(s=>io.observe(s))})();

/* ===== 02 dial ===== */
(function(){const fg=$('#ringFg'),val=$('#ringVal'),list=$('#dialList'),C=326.73;
 function set(h){$$('.seg button').forEach(b=>b.setAttribute('aria-pressed',b.dataset.h==h));val.textContent=h;val.nextElementSibling.textContent=word(h,'час','часа','часов')+' созревания';
  fg.style.strokeDashoffset=C*(1-h/24);list.innerHTML=BREADS.filter(b=>b.h==h).map(b=>`<li><a href="#card-${b.id}" data-goto="${b.id}"><span>${b.name}</span><span>${b.w}</span></a></li>`).join('');track('dial',{hours:h})}
 $$('.seg button').forEach(b=>b.addEventListener('click',()=>set(+b.dataset.h)));
 // list is filled up front so the page height does not jump while scrolling to an anchor; the ring animates on first view
 set(24);fg.style.strokeDashoffset=C;
 const io=new IntersectionObserver(es=>{if(es[0].isIntersecting){io.disconnect();requestAnimationFrame(()=>{fg.style.strokeDashoffset=C*(1-(+val.textContent)/24)})}},{threshold:.4});io.observe($('.dial'))})();

/* ===== 03 cards ===== */
const ICON={clock:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
 scale:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 21h14l-2-12H7L5 21Z"/><circle cx="12" cy="6" r="3"/></svg>',
 form:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M3 9h18l-2 11H5L3 9Z"/><path d="M6 9c0-3 3-5 6-5s6 2 6 5"/></svg>',
 leaf:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 19c0-9 6-14 15-14 0 9-5 15-14 15"/><path d="M5 19l7-7"/></svg>'};
function metaHtml(b){return `<span>${ICON.scale}${b.w}</span>`+(b.h?`<span>${ICON.clock}${b.h} ${word(b.h,'час','часа','часов')} созревания</span>`:'')+(b.form?`<span>${ICON.form}выпекаем в форме</span>`:'')}
function viewsHtml(b,scope){return b.v.length>1?`<div class="views" role="group" aria-label="Ракурс">${b.v.map((x,i)=>`<button type="button" data-v="${i}" aria-pressed="${i==0}">${x[1]}</button>`).join('')}</div>`:''}
(function(){const grid=$('#grid');
 const cardHtml=b=>`<article class="card" id="card-${b.id}" data-g="${b.g}" data-use="${b.use.join(' ')}" style="--vt:c-${b.id}">
  <div class="card-media" data-open="${b.id}">
   ${b.h?`<span class="badge">${ICON.clock}${b.h} ч</span>`:b.form?`<span class="badge badge--form">${ICON.form}в форме</span>`:''}
   ${b.v.map((x,i)=>`<img ${i==0?'class="on"':''} src="${IMG[x[0]]}" alt="${b.name} — ${x[1].toLowerCase()}" decoding="async" width="900" height="900">`).join('')}
   ${viewsHtml(b)}
  </div>
  <div class="card-body">
   <h3>${b.name}</h3>
   <div class="meta">${metaHtml(b)}</div>
   <p>${b.d}</p>
   ${b.sp?`<div class="special">${b.sp}</div>`:''}
   ${b.p.length?`<div class="pairs">${b.p.map(x=>`<span>${x}</span>`).join('')}</div>`:''}
   <div class="card-foot"><span class="kegl"><b>+${b.k}</b>${KEGL}<span>за предзаказ</span></span>
   <a class="btn" href="${breadUrl(b)}" data-track="card_cta" data-sku="${b.id}">Заказать</a></div>
  </div></article>`;
 $('#gLong').innerHTML=BREADS.filter(b=>b.g=='long').map(cardHtml).join('');
 $('#gClassic').innerHTML=BREADS.filter(b=>b.g=='classic').map(cardHtml).join('');
 grid.addEventListener('click',e=>{const v=e.target.closest('.views button');if(v){e.stopPropagation();const card=v.closest('.card');const i=+v.dataset.v;
   $$('.views button',card).forEach(x=>x.setAttribute('aria-pressed',x===v));$$('.card-media img',card).forEach((m,k)=>m.classList.toggle('on',k==i));track('card_view',{sku:card.id.slice(5),view:i});return}
  const o=e.target.closest('[data-open]');if(o)openDlg(o.dataset.open)});
 const chips=$$('.filters .chip');
 chips.forEach(c=>c.addEventListener('click',()=>{const f=c.dataset.f;chips.forEach(x=>x.setAttribute('aria-pressed',x===c));
  const apply=()=>{$$('.card',grid).forEach(card=>card.hidden=!(f=='all'||card.dataset.g==f||card.dataset.use.split(' ').includes(f)));$$('.grp',grid).forEach(g=>g.hidden=!$$('.card',g).some(c=>!c.hidden))};
  document.startViewTransition&&!matchMedia('(prefers-reduced-motion: reduce)').matches?document.startViewTransition(apply):apply();track('filter',{f})}))})();
document.addEventListener('click',e=>{const g=e.target.closest('[data-goto]');if(!g)return;e.preventDefault();const id=g.dataset.goto;
 const chipAll=$('.filters .chip[data-f="all"]');if($('#card-'+id).hidden){$$('.card').forEach(c=>c.hidden=false);$$('.grp').forEach(g=>g.hidden=false);$$('.filters .chip').forEach(x=>x.setAttribute('aria-pressed',x===chipAll))}
 const el=$('#card-'+id);el.scrollIntoView({behavior:'smooth',block:'center'});el.classList.remove('flash');void el.offsetWidth;el.classList.add('flash');track('goto',{sku:id})});

/* ===== dialog ===== */
const dlg=$('#dlg');
function openDlg(id){const b=BREADS.find(x=>x.id==id);if(!b)return;
 $('#dlgT').textContent=b.name;$('#dlgMeta').innerHTML=metaHtml(b);$('#dlgD').textContent=b.d;$('#dlgSp').textContent=b.sp||'';
 $('#dlgP').innerHTML=b.p.map(x=>`<span>${x}</span>`).join('');$('#dlgK').innerHTML=`<b>+${b.k}</b>${KEGL}<span>— наш комплимент за предзаказ</span>`;
 const img=$('#dlgImg');const setV=i=>{img.src=IMG[b.v[i][0]];img.alt=b.name+' — '+b.v[i][1].toLowerCase();$$('#dlgViews button').forEach((x,k)=>x.setAttribute('aria-pressed',k==i))};
 $('#dlgViews').innerHTML=b.v.length>1?b.v.map((x,i)=>`<button type="button" aria-pressed="${i==0}">${x[1]}</button>`).join(''):'';$('#dlgViews').style.display=b.v.length>1?'':'none';
 $$('#dlgViews button').forEach((x,i)=>x.onclick=()=>setV(i));setV(0);
 const a=$('#dlgBtn');a.href=breadUrl(b);a.dataset.sku=b.id;
 dlg.showModal?dlg.showModal():dlg.setAttribute('open','');track('dialog_open',{sku:id})}
dlg.addEventListener('click',e=>{if(e.target===dlg||e.target.closest('[data-close]'))dlg.close()});

/* ===== 04 knife + rituals ===== */
(function(){const c=$('#compare'),r=$('#knife');let used=false;r.addEventListener('input',()=>{c.style.setProperty('--x',r.value+'%');if(!used){used=true;track('knife')}});
 const io=new IntersectionObserver(es=>{if(es[0].isIntersecting){io.disconnect();if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;let t=0;const a=()=>{t+=0.02;const v=50+Math.sin(t*3)*22*Math.max(0,1-t/2.2);c.style.setProperty('--x',v+'%');r.value=v;if(t<2.2&&!used)requestAnimationFrame(a)};a()}},{threshold:.6});io.observe(c);
 const out=$('#ritualOut');const set=k=>{const x=RITUALS[k];$$('.rituals .chip').forEach(b=>b.setAttribute('aria-pressed',b.dataset.r==k));
  out.innerHTML=`<p>${x.t}</p><div class="links">${x.b.map(id=>{const b=BREADS.find(y=>y.id==id);return `<a href="#card-${id}" data-goto="${id}">${b.name}</a>`}).join('')}</div>`};
 $$('.rituals .chip').forEach(b=>b.addEventListener('click',()=>{set(b.dataset.r);track('ritual',{r:b.dataset.r})}));set('plain')})();

/* ===== 05 preorder clock (Москва) ===== */
(function(){const box=$('#clock'),st=$('#clkState'),big=$('#clkBig'),sub=$('#clkSub'),bar=$('#clkBar'),dT=$('#dockT'),dS=$('#dockS');
 function msk(){const p=new Intl.DateTimeFormat('ru-RU',{timeZone:CONFIG.tz,hour:'2-digit',minute:'2-digit',second:'2-digit',hourCycle:'h23'}).formatToParts(new Date());const g=t=>+p.find(x=>x.type==t).value;return g('hour')*3600+g('minute')*60+g('second')}
 function upd(){const s=msk(),cut=CONFIG.cutoffHour*3600;
  if(s<cut){const left=cut-s,h=Math.floor(left/3600),m=Math.floor(left%3600/60);
   box.classList.remove('late');st.textContent='Принимаем заказы на завтра';
   big.innerHTML=h?`${h}<small>${word(h,'час','часа','часов')}</small> ${m}<small>мин</small>`:`${m}<small>${word(m,'минута','минуты','минут')}</small>`;
   sub.innerHTML='осталось до 15:00 по Москве — успейте оформить, и&nbsp;свежий хлеб будет у&nbsp;вас завтра утром.';
   bar.style.setProperty('--w',(100*s/cut).toFixed(1)+'%');dT.textContent=`До 15:00 — ${h?h+' ч ':''}${m} мин`;dS.textContent='Успейте заказать хлеб к завтрашнему утру'}
  else{box.classList.add('late');st.textContent='Приём на завтра закрыт в 15:00';big.textContent='Любой день';
   sub.innerHTML='Заказ на&nbsp;послезавтра и&nbsp;любой другой день можно оформить когда угодно. А&nbsp;завтра до&nbsp;15:00 — снова к&nbsp;следующему утру.';
   bar.style.setProperty('--w','100%');dT.textContent='Испечём специально для вас';dS.textContent='Предзаказ на любой удобный день'}}
 upd();setInterval(upd,15000)})();
