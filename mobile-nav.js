/* ============================================================
   mobile-nav.js — Hamburger menu for mobile
   Add this script at the BOTTOM of <body> in every HTML file:
   <script src="mobile-nav.js"></script>
   (or paste contents into your existing script.js)
   ============================================================ */

(function () {
  'use strict';

  function initMobileNav() {
    const nav = document.querySelector('nav, .navbar, header nav');
    if (!nav) return;

    const navList = nav.querySelector('ul, .nav-links');
    if (!navList) return;

    /* Create hamburger button */
    const hamburger = document.createElement('button');
    hamburger.className = 'hamburger';
    hamburger.setAttribute('aria-label', 'Toggle navigation');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.innerHTML = '<span></span><span></span><span></span>';

    /* Create overlay */
    const overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    document.body.appendChild(overlay);

    /* Insert hamburger into nav */
    nav.appendChild(hamburger);

    function openMenu() {
      navList.classList.add('open');
      overlay.classList.add('open');
      hamburger.classList.add('open');
      hamburger.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
      navList.classList.remove('open');
      overlay.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', function () {
      const isOpen = navList.classList.contains('open');
      isOpen ? closeMenu() : openMenu();
    });

    /* Close on overlay click */
    overlay.addEventListener('click', closeMenu);

    /* Close on nav link click */
    navList.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    /* Close on Escape key */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });

    /* Close menu when resizing back to desktop */
    window.addEventListener('resize', function () {
      if (window.innerWidth > 768) closeMenu();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileNav);
  } else {
    initMobileNav();
  }
})();
