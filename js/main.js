// Mobile menu
const btn=document.querySelector('.menu-btn'),list=document.getElementById('nav-list');
if(btn&&list){btn.addEventListener('click',()=>{const o=list.classList.toggle('open');btn.setAttribute('aria-expanded',o)})}
// Missing image -> clearly marked placeholder
function placeholder(img){
  const p=document.createElement('div');p.className='ph';
  p.innerHTML='<b>Image missing</b><code></code>';
  p.querySelector('code').textContent=img.getAttribute('src');
  img.replaceWith(p);
}
document.querySelectorAll('img[data-asset]').forEach(img=>{
  img.addEventListener('error',()=>placeholder(img),{once:true});
  if(img.complete&&img.naturalWidth===0)placeholder(img);
});
// Gallery
const stage=document.getElementById('stage');
if(stage){
  const thumbs=[...document.querySelectorAll('.thumbs button')];
  thumbs.forEach(b=>b.addEventListener('click',()=>{
    thumbs.forEach(x=>x.setAttribute('aria-pressed','false'));
    b.setAttribute('aria-pressed','true');
    const src=b.dataset.src,alt=b.dataset.alt;
    stage.innerHTML='';
    const img=new Image();img.alt=alt;img.setAttribute('data-asset','');img.src=src;
    img.addEventListener('error',()=>placeholder(img),{once:true});
    stage.appendChild(img);
  }));
}
// Contact form -> opens the visitor's email app (static site, no backend)
const form=document.getElementById('contact-form');
if(form){form.addEventListener('submit',e=>{
  e.preventDefault();
  const d=new FormData(form);
  const body=`${d.get('message')}\n\n— ${d.get('name')} (${d.get('email')})`;
  location.href=`mailto:amryasserds@gmail.com?subject=${encodeURIComponent(d.get('subject'))}&body=${encodeURIComponent(body)}`;
})}
