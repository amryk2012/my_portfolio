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
// Projects slider
const slider=document.getElementById('slider');
if(slider){
  const prev=document.getElementById('prev'),next=document.getElementById('next');
  const step=()=>{const c=slider.querySelector('.card');return c?c.getBoundingClientRect().width+24:300};
  const upd=()=>{prev.disabled=slider.scrollLeft<=2;next.disabled=slider.scrollLeft+slider.clientWidth>=slider.scrollWidth-2};
  prev.addEventListener('click',()=>slider.scrollBy({left:-step()}));
  next.addEventListener('click',()=>slider.scrollBy({left:step()}));
  slider.addEventListener('scroll',upd,{passive:true});window.addEventListener('resize',upd);upd();
  slider.addEventListener('keydown',e=>{if(e.key==='ArrowRight'){slider.scrollBy({left:step()});e.preventDefault()}if(e.key==='ArrowLeft'){slider.scrollBy({left:-step()});e.preventDefault()}});
}
// Remove a video element whose file is missing so the placeholder behind it shows
document.querySelectorAll('video[data-asset] source').forEach(src=>src.addEventListener('error',()=>{const v=src.closest('video');if(v)v.remove()}));

// Hide the video placeholder as soon as the video file has loaded
document.querySelectorAll('.vslot video').forEach(v=>{
  const ph=v.parentElement.querySelector('.embed-ph');
  const hide=()=>{if(ph)ph.style.display='none'};
  ['loadedmetadata','loadeddata','canplay','play'].forEach(ev=>v.addEventListener(ev,hide));
  if(v.readyState>=1)hide();
});
