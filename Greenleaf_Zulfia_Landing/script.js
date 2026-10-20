const contactDialog=document.querySelector('#contact-dialog');const maxDialog=document.querySelector('#max-dialog');
document.querySelectorAll('[data-contact]').forEach(b=>b.addEventListener('click',()=>contactDialog.showModal()));
document.querySelectorAll('[data-max]').forEach(b=>b.addEventListener('click',()=>{if(contactDialog.open)contactDialog.close();maxDialog.showModal()}));
document.querySelectorAll('dialog').forEach(d=>{d.querySelector('.close').addEventListener('click',()=>d.close());d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close()}})});
document.querySelector('#copy-number').addEventListener('click',async()=>{const status=document.querySelector('#copy-status');try{await navigator.clipboard.writeText('+79273068550');status.textContent='Номер скопирован. Добавьте контакт в MAX.'}catch{status.textContent='Не удалось скопировать автоматически. Выделите номер и скопируйте его вручную.'}});
const menu=document.querySelector('.menu-toggle');const nav=document.querySelector('nav');function closeMenu(){nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Открыть меню')}menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Закрыть меню':'Открыть меню')});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});
const tabs=[...document.querySelectorAll('[role=tab]')];function selectTab(tab){tabs.forEach(t=>{const selected=t===tab;t.setAttribute('aria-selected',String(selected));t.tabIndex=selected?0:-1;document.getElementById(t.getAttribute('aria-controls')).hidden=!selected})}tabs.forEach((t,i)=>{t.addEventListener('click',()=>selectTab(t));t.addEventListener('keydown',e=>{let n;if(e.key==='ArrowRight')n=(i+1)%tabs.length;if(e.key==='ArrowLeft')n=(i+tabs.length-1)%tabs.length;if(e.key==='Home')n=0;if(e.key==='End')n=tabs.length-1;if(n!==undefined){e.preventDefault();selectTab(tabs[n]);tabs[n].focus()}})});
const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;if('IntersectionObserver'in window&&!reduceMotion){const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.remove('waiting');observer.unobserve(e.target)}}),{threshold:.08});document.querySelectorAll('.reveal').forEach(el=>{if(el.getBoundingClientRect().top>innerHeight){el.classList.add('waiting');observer.observe(el)}})}
function updateScroll(){document.body.classList.toggle('scrolled',window.scrollY>250)}window.addEventListener('scroll',updateScroll,{passive:true});updateScroll();document.querySelector('#year').textContent=new Date().getFullYear();
const visual=document.querySelector('.hero-visual');if(!reduceMotion&&matchMedia('(hover: hover)').matches){visual.addEventListener('pointermove',e=>{const r=visual.getBoundingClientRect();const x=(e.clientX-r.left-r.width/2)/35,y=(e.clientY-r.top-r.height/2)/35;visual.querySelector('.orbit-one').style.transform=`translate(${x}px,${y}px) rotate(-12deg)`});visual.addEventListener('pointerleave',()=>visual.querySelector('.orbit-one').style.transform='rotate(-12deg)')}

const reviewDialog=document.querySelector('#review-dialog');let reviewTrigger=null;
document.querySelectorAll('[data-review]').forEach(card=>card.addEventListener('click',()=>{
 const template=document.getElementById('review-text-'+card.dataset.review);if(!template)return;
 reviewTrigger=card;
 document.querySelector('#review-dialog-name').textContent=card.querySelector('.review-name').textContent;
 document.querySelector('#review-dialog-initial').textContent=card.querySelector('.review-initial').textContent;
 document.querySelector('#review-dialog-text').replaceChildren(template.content.cloneNode(true));
 reviewDialog.showModal();reviewDialog.scrollTop=0;document.body.classList.add('review-modal-open');
}));
reviewDialog.addEventListener('close',()=>{document.body.classList.remove('review-modal-open');reviewTrigger?.focus({preventScroll:true})});

const certificateDialog=document.querySelector('#certificate-dialog');
let certificateTrigger=null;
document.querySelectorAll('[data-certificate]').forEach(card=>card.addEventListener('click',()=>{
 const name=card.dataset.certificate;
 if(!['iso-45001','gmp','halal'].includes(name))return;
 certificateTrigger=card;
 document.querySelector('#certificate-full-image').src=`assets/certificates/${name}.jpg`;
 document.querySelector('#certificate-full-image').alt=card.querySelector('img').alt;
 document.querySelector('#certificate-dialog-title').textContent=card.dataset.title;
 document.querySelector('#certificate-original').href=`assets/certificates/${name}.pdf`;
 certificateDialog.showModal();
}));
certificateDialog.addEventListener('close',()=>certificateTrigger?.focus({preventScroll:true}));
