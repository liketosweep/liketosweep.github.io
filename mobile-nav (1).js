/**
 * mobile-nav.js v2
 * Fixes: hamburger causes blur overlay but menu never appears.
 * Root cause: the nav <ul> likely has display:none from desktop CSS.
 *             "all: unset" in mobile.css resets it to display:flex,
 *             but if desktop CSS loads AFTER and wins, it stays hidden.
 *             This JS forces display:flex inline (highest specificity).
 *
 * Usage: paste entire contents at the BOTTOM of your existing script.js
 *        OR add: <script src="mobile-nav.js"></script> before </body>
 */
(function () {
  'use strict';

  function initMobileNav() {
    if (window.innerWidth > 768) return; // desktop: do nothing

    /* ── Find nav elements ─────────────────────────────── */
    const nav = document.querySelector('nav, .navbar, header nav');
    if (!nav) return;

    const navList = nav.querySelector('ul, .nav-links');
    if (!navList) return;

    /* ── Create overlay ────────────────────────────────── */
    const overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    document.body.appendChild(overlay);

    /* ── Create hamburger ──────────────────────────────── */
    const hamburger = document.createElement('button');
    hamburger.className = 'hamburger';
    hamburger.setAttribute('aria-label', 'Toggle menu');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.innerHTML = '<span></span><span></span><span></span>';
    nav.appendChild(hamburger);

    /* ── Force the drawer to be ready ─────────────────── */
    /*  If the existing CSS hides the ul with display:none,
        we override inline so it stays in the DOM but off-screen */
    function applyDrawerBaseStyle() {
      navList.style.cssText = [
        'position: fixed',
        'top: 0',
        'right: -100%',
        'width: min(75vw, 280px)',
        'height: 100vh',
        'height: 100dvh',
        'background-color: #0d0d0d',
        'border-left: 1px solid rgba(0,255,157,0.2)',
        'display: flex',
        'flex-direction: column',
        'padding: 5rem 1.5rem 2rem',
        'list-style: none',
        'z-index: 10000',
        'overflow-y: auto',
        'transition: right 0.35s cubic-bezier(0.4,0,0.2,1)',
        'margin: 0',
        'gap: 0',
      ].join(' !important; ') + ' !important;';
    }

    applyDrawerBaseStyle();

    /* ── Open / close helpers ──────────────────────────── */
    function openMenu() {
      navList.style.setProperty('right', '0', 'important');
      overlay.classList.add('open');
      hamburger.classList.add('open');
      hamburger.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
      navList.style.setProperty('right', '-100%', 'important');
      overlay.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }

    /* ── Events ────────────────────────────────────────── */
    hamburger.addEventListener('click', function () {
      hamburger.classList.contains('open') ? closeMenu() : openMenu();
    });

    overlay.addEventListener('click', closeMenu);

    navList.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });

    /* On resize to desktop: reset inline styles and close */
    window.addEventListener('resize', function () {
      if (window.innerWidth > 768) {
        navList.style.cssText = '';
        overlay.classList.remove('open');
        document.body.style.overflow = '';
        hamburger.classList.remove('open');
      } else {
        applyDrawerBaseStyle();
      }
    });
  }

  /* Run after DOM is ready */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileNav);
  } else {
    initMobileNav();
  }
})();
