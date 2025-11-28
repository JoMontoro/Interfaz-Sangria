
(function () {
  'use strict';

  function fillPromo() {
    const span = document.getElementById('promo-text');
    if (!span) return;
    const base = '[] OFERTAS ';
    const container = span.parentElement;
    if (!container) return;

    function ensureFill() {
      // Empezar desde el texto base para evitar acumulaciones infinitas
      span.textContent = base;

      // Añadir repeticiones hasta cubrir el ancho del contenedor (+5% de margen)
      const targetWidth = Math.ceil(container.clientWidth * 0.90);
      let safety = 0;
      while (span.scrollWidth < targetWidth && safety < 500) {
        span.textContent += base;
        safety++;
      }
    }

    // Ejecutar al primer render
    requestAnimationFrame(ensureFill);

    // Recalcular al redimensionar: ResizeObserver si está disponible, fallback a resize con debounce
    if (window.ResizeObserver) {
      const ro = new ResizeObserver(() => requestAnimationFrame(ensureFill));
      ro.observe(container);
    } else {
      let t;
      window.addEventListener(
        'resize',
        () => {
          clearTimeout(t);
          t = setTimeout(() => requestAnimationFrame(ensureFill), 120);
        },
        { passive: true }
      );
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fillPromo);
  } else {
    fillPromo();
  }



})();
