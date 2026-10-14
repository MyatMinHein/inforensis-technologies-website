(() => {
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav-links');
  if (toggle && nav) {
    const closeNav = () => { nav.classList.remove('open'); toggle.setAttribute('aria-expanded','false'); toggle.setAttribute('aria-label','Open navigation'); const icon=toggle.querySelector('i'); if(icon) icon.className='fas fa-bars'; };
    toggle.addEventListener('click', () => { const open=!nav.classList.contains('open'); nav.classList.toggle('open',open); toggle.setAttribute('aria-expanded',String(open)); toggle.setAttribute('aria-label',open?'Close navigation':'Open navigation'); const icon=toggle.querySelector('i'); if(icon) icon.className=open?'fas fa-times':'fas fa-bars'; });
    nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeNav));
    document.addEventListener('keydown',e=>{if(e.key==='Escape')closeNav();});
    window.addEventListener('resize',()=>{if(window.innerWidth>760)closeNav();});
  }
  const carousel=document.querySelector('.client-carousel'), track=document.querySelector('.client-track'), dots=document.querySelector('.carousel-dots');
  const slides=track?Array.from(track.children):[], prev=document.querySelector('.carousel-btn.prev'), next=document.querySelector('.carousel-btn.next');
  if(!carousel||!track||!slides.length||!dots)return;
  let index=0, visible=4, maxIndex=0, timer=null;
  const getVisible=()=>window.innerWidth<=760?2:window.innerWidth<=1000?3:4;
  const goTo=n=>{index=Math.max(0,Math.min(n,maxIndex));const first=slides[0];const gap=parseFloat(getComputedStyle(track).gap)||0;track.style.transform=`translateX(${-index*(first.getBoundingClientRect().width+gap)}px)`;Array.from(dots.children).forEach((d,i)=>{d.classList.toggle('active',i===index);d.setAttribute('aria-current',i===index?'true':'false');});};
  const setup=()=>{visible=getVisible();maxIndex=Math.max(0,slides.length-visible);index=Math.min(index,maxIndex);dots.innerHTML='';for(let i=0;i<=maxIndex;i++){const b=document.createElement('button');b.type='button';b.setAttribute('aria-label',`Show client logos starting at ${i+1}`);b.addEventListener('click',()=>{goTo(i);restart();});dots.appendChild(b);}goTo(index);};
  const restart=()=>{if(timer)clearInterval(timer);if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;timer=setInterval(()=>goTo(index>=maxIndex?0:index+1),5000);};
  if(prev)prev.addEventListener('click',()=>{goTo(index<=0?maxIndex:index-1);restart();});if(next)next.addEventListener('click',()=>{goTo(index>=maxIndex?0:index+1);restart();});
  carousel.addEventListener('mouseenter',()=>{if(timer)clearInterval(timer);});carousel.addEventListener('mouseleave',restart);window.addEventListener('resize',setup);setup();restart();
})();
