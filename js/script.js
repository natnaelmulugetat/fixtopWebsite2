document.addEventListener('DOMContentLoaded',()=>{
  // Mobile navigation
  const header = document.querySelector('.site-header');
  const headerInner = header ? header.querySelector('.header-inner') : null;
  const siteNav = header ? header.querySelector('.nav') : null;
  let menuToggle = null;
  if(headerInner && siteNav){
    if(!siteNav.id) siteNav.id = 'siteNav';
    menuToggle = document.createElement('button');
    menuToggle.type = 'button';
    menuToggle.className = 'menu-toggle';
    menuToggle.setAttribute('aria-label', 'Open navigation menu');
    menuToggle.setAttribute('aria-controls', siteNav.id);
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.innerHTML = '<span></span><span></span><span></span>';
    headerInner.insertBefore(menuToggle, siteNav);

    const setMenuState = (isOpen)=>{
      header.classList.toggle('nav-open', isOpen);
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
    };

    menuToggle.addEventListener('click',()=>{
      setMenuState(!header.classList.contains('nav-open'));
    });

    siteNav.querySelectorAll('a').forEach(link=>{
      link.addEventListener('click',()=>{
        if(window.innerWidth <= 760) setMenuState(false);
      });
    });

    document.addEventListener('click',(event)=>{
      if(header.classList.contains('nav-open') && !header.contains(event.target)){
        setMenuState(false);
      }
    });

    window.addEventListener('resize',()=>{
      if(window.innerWidth > 760) setMenuState(false);
    });
  }

  // Carousel (optional)
  const carousel = document.getElementById('carousel');
  if(carousel){
    const slides = [...carousel.querySelectorAll('.slide')];
    let idx = 0, timer = null;
    const go = (i)=>{
      slides.forEach(s=>s.classList.remove('active'));
      slides[i].classList.add('active');
      idx = i;
    }
    const next = ()=> go((idx+1)%slides.length);
    const prev = ()=> go((idx-1+slides.length)%slides.length);
    const nextBtn = carousel.querySelector('.next');
    const prevBtn = carousel.querySelector('.prev');
    if(nextBtn) nextBtn.addEventListener('click',()=>{next(); restart();});
    if(prevBtn) prevBtn.addEventListener('click',()=>{prev(); restart();});
    function start(){ timer = setInterval(next, 4500); }
    function restart(){ clearInterval(timer); start(); }
    start();
  }

  // Smooth anchor scrolling
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click',e=>{
      const href = a.getAttribute('href');
      if(href.length>1){
        e.preventDefault();
        document.querySelector(href).scrollIntoView({behavior:'smooth'});
      }
    })
  })

  // Filters
  const filters = document.querySelectorAll('.filter');
  const cards = Array.from(document.querySelectorAll('#productGrid .card'));
  filters.forEach(f=> f.addEventListener('click', ()=>{
    filters.forEach(b=>b.classList.remove('active'));
    f.classList.add('active');
    const key = f.getAttribute('data-filter');
    cards.forEach(c=>{
      const cat = c.getAttribute('data-category');
      c.style.display = (key==='all' || key===cat)?'block':'none';
    })
  }))

  // Auto-scroll product rail on products page
  const productTracks = document.querySelectorAll('.products-marquee-track');
  productTracks.forEach(track=>{
    if(track.dataset.cloned === 'true') return;
    const items = Array.from(track.children);
    items.forEach(item=>track.appendChild(item.cloneNode(true)));
    track.dataset.cloned = 'true';
  });

  // Tabbed content on new pages
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabPanels = document.querySelectorAll('.tab-panel');
  tabButtons.forEach(btn=> btn.addEventListener('click', ()=>{
    const target = btn.getAttribute('data-tab');
    tabButtons.forEach(b=> b.classList.toggle('active', b===btn));
    tabPanels.forEach(panel=> panel.classList.toggle('active', panel.id===target));
  }))

  // Accordion expansion for values page
  const accordionItems = document.querySelectorAll('.accordion-item');
  accordionItems.forEach(item=>{
    const trigger = item.querySelector('.accordion-trigger');
    if(trigger){
      trigger.addEventListener('click', ()=>{
        const isOpen = item.classList.contains('open');
        accordionItems.forEach(i=> i.classList.remove('open'));
        if(!isOpen) item.classList.add('open');
      });
    }
  });

  // Contact form on profile pages
  // Language switcher
  const translations = {
    en:{
      heroEyebrow:'POWER THAT IGNITES',
      heroTitle:'INDUSTRY LEADERSHIP',
      heroSub:'Fixtop Trading PLC powers Ethiopia with construction materials, mechanical machinery, and industrial-grade electrical and safety solutions.',
      shopFeatured:'Request a Quote',
      learnMore:'Browse Products',
      contactUs:'CONTACT US',
      feature1Title:'Fast Delivery',
      feature1Desc:'Same-day dispatch for urgent site orders.',
      feature2Title:'Certified Quality',
      feature2Desc:'All tools meet industry standards for safety and durability.',
      feature3Title:'Expert Support',
      feature3Desc:'365-day technical guidance and maintenance advice.',
      feature4Title:'Multi-Language Help',
      feature4Desc:'Switch between languages for an easier ordering experience.'
    },
    fr:{
      heroEyebrow:'PUISSANCE QUI ENFLAMME',
      heroTitle:'LEADERSHIP INDUSTRIEL',
      heroSub:'Fixtop Trading PLC alimente l’Éthiopie avec des matériaux de construction, des machines mécaniques et des solutions électriques et de sécurité de qualité industrielle.',
      shopFeatured:'Demander un devis',
      learnMore:'Parcourir les produits',
      contactUs:'CONTACTEZ-NOUS',
      feature1Title:'Livraison rapide',
      feature1Desc:'Expédition le jour même pour les commandes urgentes.',
      feature2Title:'Qualité certifiée',
      feature2Desc:'Tous les outils respectent les normes de sécurité et de durabilité.',
      feature3Title:'Assistance expert',
      feature3Desc:'Conseils techniques 365 jours par an.',
      feature4Title:'Assistance multilingue',
      feature4Desc:'Basculez entre les langues pour faciliter la commande.'
    },
    ar:{
      heroEyebrow:'قُوَّة تُشْعِل',
      heroTitle:'القيادة الصناعية',
      heroSub:'تدعم فيكستوب تريدنج بي إل سي إثيوبيا بمواد البناء والآلات الميكانيكية وحلول الكهرباء والسلامة ذات المستوى الصناعي.',
      shopFeatured:'اطلب عرض سعر',
      learnMore:'تصفح المنتجات',
      contactUs:'اتصل بنا',
      feature1Title:'تسليم سريع',
      feature1Desc:'شحن في نفس اليوم للطلبات العاجلة.',
      feature2Title:'جودة معتمدة',
      feature2Desc:'جميع الأدوات تلبي معايير السلامة والمتانة.',
      feature3Title:'دعم خبير',
      feature3Desc:'إرشاد فني 365 يومًا في السنة.',
      feature4Title:'دعم بعدة لغات',
      feature4Desc:'التبديل بين اللغات لتجربة أسهل.'
    }
  };
  const langButtons = document.querySelectorAll('.lang-option');
  const textNodes = document.querySelectorAll('[data-key]');
  function setLanguage(lang){
    langButtons.forEach(btn=>btn.classList.toggle('active', btn.getAttribute('data-lang')===lang));
    if(lang==='ar') document.documentElement.dir='rtl'; else document.documentElement.dir='ltr';
    textNodes.forEach(node=>{
      const key = node.getAttribute('data-key');
      if(translations[lang] && translations[lang][key]) node.textContent = translations[lang][key];
    });
  }
  langButtons.forEach(btn=> btn.addEventListener('click', ()=> setLanguage(btn.getAttribute('data-lang'))));
  setLanguage('en');

  // Lazy load images in product grid with fallback
  const lazyImgs = document.querySelectorAll('img.lazy');
  if('IntersectionObserver' in window){
    const lazyObserver = new IntersectionObserver((entries, obs)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          const img = entry.target;
          img.src = img.getAttribute('data-src');
          img.classList.remove('lazy');
          obs.unobserve(img);
        }
      })
    },{rootMargin:'100px'});
    lazyImgs.forEach(i=>lazyObserver.observe(i));
  } else {
    // fallback: load immediately
    lazyImgs.forEach(img=>{
      img.src = img.getAttribute('data-src');
      img.classList.remove('lazy');
    });
  }

  // Lightbox for gallery
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');
  document.querySelectorAll('.gallery-item').forEach(img=>{
    img.addEventListener('click', ()=>{
      if(lightboxImg) lightboxImg.src = img.getAttribute('data-full') || img.src;
      if(lightbox) lightbox.setAttribute('aria-hidden','false');
    })
  })
  document.querySelectorAll('.product-image-card').forEach(trigger=>{
    trigger.addEventListener('click', ()=>{
      const expandedSrc = trigger.getAttribute('data-lightbox-src');
      const expandedAlt = trigger.getAttribute('data-lightbox-alt') || 'Product image';
      const fallbackImage = trigger.querySelector('img');
      if(lightboxImg){
        lightboxImg.src = expandedSrc || (fallbackImage ? fallbackImage.src : '');
        lightboxImg.alt = expandedAlt;
      }
      if(lightbox) lightbox.setAttribute('aria-hidden','false');
    });
  });
  if(lightboxClose) lightboxClose.addEventListener('click', ()=> lightbox.setAttribute('aria-hidden','true'));
  if(lightbox) lightbox.addEventListener('click', (e)=>{ if(e.target===lightbox) lightbox.setAttribute('aria-hidden','true'); })
  document.addEventListener('keydown', (event)=>{
    if(event.key === 'Escape' && lightbox && lightbox.getAttribute('aria-hidden') === 'false'){
      lightbox.setAttribute('aria-hidden','true');
    }
  });

  const jumpLinks = document.querySelectorAll('.product-jump-nav a');
  const productSections = [...document.querySelectorAll('.products-page section[id]')];
  if('IntersectionObserver' in window && jumpLinks.length && productSections.length){
    const linkByHash = new Map([...jumpLinks].map(link=>[link.getAttribute('href'), link]));
    const sectionObserver = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          const activeLink = linkByHash.get(`#${entry.target.id}`);
          jumpLinks.forEach(link=>link.classList.toggle('active', link === activeLink));
        }
      });
    },{rootMargin:'-30% 0px -55% 0px', threshold:0.15});
    productSections.forEach(section=>sectionObserver.observe(section));
  }

  // Stats counters when visible
  const counters = document.querySelectorAll('.stat-value');
  if('IntersectionObserver' in window){
    const counterObserver = new IntersectionObserver((entries, obs)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-target'),10) || 0;
          let cur = 0; const step = Math.max(1, Math.floor(target/60));
          const t = setInterval(()=>{
            cur += step; if(cur>=target){ el.textContent = target; clearInterval(t); } else el.textContent = cur;
          }, 20);
          obs.unobserve(el);
        }
      })
    },{threshold:0.4});
    counters.forEach(c=>counterObserver.observe(c));
  } else {
    // fallback: set targets immediately
    counters.forEach(el=> el.textContent = el.getAttribute('data-target') || '0');
  }

  // Reveal on scroll
  const revealEls = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    const revealObs = new IntersectionObserver((entries, obs)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){ entry.target.classList.add('visible'); obs.unobserve(entry.target); }
      })
    },{threshold:0.12});
    revealEls.forEach(e=>revealObs.observe(e));
  } else {
    revealEls.forEach(e=> e.classList.add('visible'));
  }

  // Back to top
  const back = document.getElementById('backToTop');
  if(back){
    window.addEventListener('scroll', ()=>{ if(window.scrollY>400) back.style.display='block'; else back.style.display='none'; })
    back.addEventListener('click', ()=> window.scrollTo({top:0,behavior:'smooth'}));
  }
});
