const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (window.AOS) {
  AOS.init({
    duration: 850,
    once: true,
    disable: window.innerWidth < 768 || prefersReducedMotion
  });

  window.addEventListener("load", () => {
    AOS.refreshHard();
  });
}

const nav = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
  if (!nav) return;
  nav.classList.toggle("scrolled", window.scrollY > 50);
});

document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", () => {
    const navbarCollapse = document.querySelector(".navbar-collapse.show");

    if (!navbarCollapse || !window.bootstrap) return;

    const collapse = bootstrap.Collapse.getOrCreateInstance(navbarCollapse, {
      toggle: false
    });

    collapse.hide();
  });
});

if (window.Swiper && document.querySelector(".mySwiper")) {
  new Swiper(".mySwiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    loop: true,
    coverflowEffect: {
      rotate: 0,
      stretch: 30,
      depth: 120,
      modifier: 0.5,
      slideShadows: false,
      scale: 0.9
    }
  });
}

// Deposit notice: dismissible behavior persisted in localStorage
document.addEventListener('DOMContentLoaded', () => {
  const notice = document.querySelector('.deposit-notice');
  if (!notice) return;

  const key = 'depositNoticeDismissed';
  const dismissed = localStorage.getItem(key) === '1';

  if (dismissed) {
    notice.classList.add('dismissed');
    // hide immediately after transition (avoid flash)
    setTimeout(() => { notice.style.display = 'none'; }, 280);
    return;
  }

  const btn = notice.querySelector('.deposit-close');
  if (!btn) return;

  btn.addEventListener('click', () => {
    notice.classList.add('dismissed');
    localStorage.setItem(key, '1');
    setTimeout(() => { notice.style.display = 'none'; }, 300);
  });
});
