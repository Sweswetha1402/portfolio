const body=document.body;
const toggle=document.querySelector('.theme-toggle');
const saved=localStorage.getItem('portfolio-theme');
if(saved==='dark') body.classList.add('dark');
toggle.addEventListener('click',()=>{
  body.classList.toggle('dark');
  localStorage.setItem('portfolio-theme',body.classList.contains('dark')?'dark':'light');
});

const observer=new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

const counters=document.querySelectorAll('[data-count]');
const countObserver=new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(!entry.isIntersecting)return;
    const el=entry.target, target=Number(el.dataset.count), prefix=el.dataset.prefix||'', suffix=el.dataset.suffix||'';
    const start=performance.now(), duration=900;
    const tick=(now)=>{
      const p=Math.min((now-start)/duration,1);
      const eased=1-Math.pow(1-p,3);
      el.textContent=prefix+Math.round(target*eased)+suffix;
      if(p<1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    countObserver.unobserve(el);
  });
},{threshold:.5});
counters.forEach(el=>countObserver.observe(el));