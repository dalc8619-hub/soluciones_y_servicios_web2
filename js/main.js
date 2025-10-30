// Utilidades de UI: menú móvil, scroll suave, reveal y formulario
(function(){
  const $ = (sel, ctx=document) => ctx.querySelector(sel);
  const $$ = (sel, ctx=document) => Array.from(ctx.querySelectorAll(sel));

  // Año en footer
  const y = new Date().getFullYear();
  const yEl = $('#y'); if (yEl) yEl.textContent = y;

  // Menú móvil
  const hamburger = $('.hamburger');
  const menu = $('.menu');
  if (hamburger && menu){
    hamburger.addEventListener('click', () => {
      const open = menu.style.display === 'flex';
      menu.style.display = open ? 'none' : 'flex';
      menu.style.flexDirection = 'column';
      menu.style.gap = '0.8rem';
    });
  }

  // Smooth scroll interno
  $$('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href');
      if (!id || id === '#') return;
      const target = $(id);
      if (target){
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth', block:'start'});
      }
    });
  });

  // Animaciones Reveal
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add('in');
        obs.unobserve(entry.target);
      }
    });
  }, {threshold: .15});
  $$('.reveal').forEach(el => obs.observe(el));

  // Back to top
  const backTop = $('#backTop');
  if (backTop){
    window.addEventListener('scroll', () => {
      backTop.style.display = window.scrollY > 500 ? 'block' : 'none';
    });
    backTop.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));
  }

  // Formulario: compone un mailto como fallback universal
  const form = $('#leadForm');
  if (form){
    form.addEventListener('submit', e => {
      e.preventDefault();
      const data = new FormData(form);
      const nombre = data.get('nombre') || '';
      const empresa = data.get('empresa') || '';
      const telefono = data.get('telefono') || '';
      const correo = data.get('correo') || '';
      const interes = data.get('interes') || '';
      const mensaje = data.get('mensaje') || '';
      const subject = encodeURIComponent(`Contacto Web - ${interes}`);
      const body = encodeURIComponent(
        `Nombre: ${nombre}\nEmpresa: ${empresa}\nTeléfono: ${telefono}\nCorreo: ${correo}\nInterés: ${interes}\n\nMensaje: ${mensaje}`
      );
      const mail = $('#contactMail')?.getAttribute('href')?.replace('mailto:','') || 'ssmas.solucionesyservicios@gmail.com';
      window.location.href = `mailto:${mail}?subject=${subject}&body=${body}`;
    });
  }
})();

