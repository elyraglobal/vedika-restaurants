/* ============================================================
   VEDIKA — interactions
   Branch chooser (WhatsApp/call/directions) · nav · preloader
   Lenis smooth scroll · GSAP reveals · lightbox · menu scroll-spy
   ============================================================ */

/* ---- Branch + message data ---- */
const BRANCHES = [
  { name:'Miran Sahib', phone:'917889663490', maps:'https://www.google.com/maps?q=32.6427128,74.8110926' },
  { name:'Karan Bagh',  phone:'917000666251', maps:'https://www.google.com/maps?q=32.66974,74.837407' }
];
const MESSAGES = {
  order:'Hi Vedika! I would like to place an order: ',
  book:'Hi Vedika! I would like to book a table (date / time / guests): ',
  enquire:'Hi Vedika! I would like to enquire about an event / catering: ',
  whatsapp:'Hi Vedika! '
};

/* ---- Branch chooser modal ---- */
const chooser = document.getElementById('chooser');
const links = document.getElementById('chooserLinks');

function hrefFor(mode, b){
  if(mode === 'call') return 'tel:+' + b.phone;
  if(mode === 'directions') return b.maps;
  return 'https://wa.me/' + b.phone + '?text=' + encodeURIComponent(MESSAGES[mode] || MESSAGES.whatsapp);
}
function openChooser(mode){
  links.innerHTML = '';
  BRANCHES.forEach(b => {
    const a = document.createElement('a');
    a.href = hrefFor(mode, b);
    a.textContent = (mode === 'call' ? '📞 ' : mode === 'directions' ? '📍 ' : '💬 ') + b.name;
    if(mode !== 'call'){ a.target = '_blank'; a.rel = 'noopener'; }
    links.appendChild(a);
  });
  chooser.hidden = false;
}
document.addEventListener('click', e => {
  const t = e.target.closest('[data-chooser]');
  if(t){ e.preventDefault(); openChooser(t.dataset.chooser); }
});
if(chooser){
  document.getElementById('chooserClose').onclick = () => chooser.hidden = true;
  chooser.addEventListener('click', e => { if(e.target === chooser) chooser.hidden = true; });
  document.addEventListener('keydown', e => { if(e.key === 'Escape') chooser.hidden = true; });
}

/* ---- Nav toggle (mobile) ---- */
const tog = document.getElementById('navToggle');
const menu = document.getElementById('navMenu');
if(tog && menu){
  tog.onclick = () => {
    const open = menu.classList.toggle('open');
    tog.setAttribute('aria-expanded', open);
  };
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.classList.remove('open')));
}

/* ---- Preloader ---- */
window.addEventListener('load', () => {
  const bar = document.getElementById('plBar');
  if(bar) bar.style.width = '100%';
  const p = document.getElementById('preloader');
  if(p) setTimeout(() => p.classList.add('done'), 400);
});

/* ---- Motion (respects prefers-reduced-motion) ---- */
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

if(!reduce){
  /* Lenis smooth scroll */
  if(window.Lenis){
    const lenis = new Lenis({ duration:1.1, smoothWheel:true });
    function raf(t){ lenis.raf(t); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    if(window.gsap && window.ScrollTrigger) lenis.on('scroll', ScrollTrigger.update);
  }
  /* GSAP reveals (fallback reveals everything if the CDN is unavailable) */
  if(window.gsap && window.ScrollTrigger){
    gsap.registerPlugin(ScrollTrigger);
    gsap.utils.toArray('.reveal').forEach(el => {
      gsap.fromTo(el, { opacity:0, y:40 },
        { opacity:1, y:0, duration:.8, ease:'power2.out',
          scrollTrigger:{ trigger:el, start:'top 85%' } });
    });
  } else {
    document.querySelectorAll('.reveal').forEach(el => el.style.opacity = 1);
  }
} else {
  document.querySelectorAll('.reveal').forEach(el => el.style.opacity = 1);
}

/* ---- Navbar hide/show + scroll progress ---- */
let last = 0;
const nav = document.getElementById('navbar');
const prog = document.getElementById('navProgress');
addEventListener('scroll', () => {
  const y = scrollY;
  if(nav) nav.classList.toggle('hide', y > last && y > 200);
  last = y;
  if(prog){
    const h = document.documentElement.scrollHeight - innerHeight;
    prog.style.width = (h > 0 ? y / h * 100 : 0) + '%';
  }
});

/* ---- Gallery lightbox ---- */
document.querySelectorAll('.gallery-item img').forEach(img => {
  img.addEventListener('click', () => {
    const lb = document.createElement('div');
    lb.className = 'lightbox';
    lb.innerHTML = '<img src="' + img.src + '" alt="">';
    lb.onclick = () => lb.remove();
    document.addEventListener('keydown', function esc(e){ if(e.key === 'Escape'){ lb.remove(); document.removeEventListener('keydown', esc); } });
    document.body.appendChild(lb);
  });
});

/* ---- Menu page scroll-spy ---- */
const spy = document.querySelectorAll('.menu-cat-nav a');
if(spy.length){
  const secs = [...spy].map(a => document.querySelector(a.getAttribute('href')));
  addEventListener('scroll', () => {
    let i = secs.findIndex(s => s && s.getBoundingClientRect().top > 120);
    i = i === -1 ? secs.length - 1 : Math.max(0, i - 1);
    spy.forEach(a => a.classList.remove('active'));
    if(spy[i]) spy[i].classList.add('active');
  });
}
