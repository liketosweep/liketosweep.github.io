/**
 * mobile-nav.js  v3
 * Firefox Android compatible. Robust nav drawer.
 *
 * HOW TO USE:
 * Paste this entire file's contents at the BOTTOM of your
 * existing script.js  (recommended)
 *
 * OR add this line before </body> in every HTML file:
 * <script src="mobile-nav.js"></script>
 *
 * This script runs only on screens ≤ 768px.
 * It injects a hamburger button and wires up a slide-in nav drawer.
 * It uses inline styles (highest specificity) to beat any existing CSS.
 */

(function () {
  'use strict';

  /* ── Only run on mobile widths ──────────────────────── */
  if (window.innerWidth > 768) return;

  /* ── Wait for DOM ───────────────────────────────────── */
  function run() {

    /* ── 1. Find the nav element ────────────────────────
       Tries multiple selectors in order of specificity.  */
    var nav = (
      document.querySelector('body > nav') ||
      document.querySelector('header > nav') ||
      document.querySelector('nav') ||
      document.querySelector('.navbar') ||
      document.querySelector('header')
    );

    if (!nav) {
      console.warn('[mobile-nav] No nav element found.');
      return;
    }

    /* ── 2. Find the link list <ul> inside nav ──────────*/
    var navList = (
      nav.querySelector('ul') ||
      nav.querySelector('.nav-links') ||
      nav.querySelector('[class*="links"]') ||
      nav.querySelector('[class*="menu"]')
    );

    if (!navList) {
      console.warn('[mobile-nav] No nav list (ul) found inside nav.');
      return;
    }

    /* ── 3. Build overlay ───────────────────────────────*/
    var overlay = document.createElement('div');
    overlay.className = 'mob-overlay';
    document.body.appendChild(overlay);

    /* ── 4. Build hamburger ─────────────────────────────*/
    var hamburger = document.createElement('button');
    hamburger.className = 'mob-hamburger';
    hamburger.setAttribute('type', 'button');
    hamburger.setAttribute('aria-label', 'Open navigation menu');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.innerHTML = '<span></span><span></span><span></span>';

    /* Append hamburger to the nav element */
    nav.appendChild(hamburger);

    /* ── 5. Apply drawer base styles via JS ─────────────
       This defeats any display:none or transform that the
       existing CSS puts on the <ul>. Inline styles beat
       everything except !important in the same element,
       so we combine both approaches.                      */
    function setDrawerClosed() {
      navList.setAttribute('style', [
        'position: fixed',
        'top: 0',
        'right: -110%',
        'bottom: 0',
        'width: 72vw',
        'max-width: 270px',
        'height: 100%',
        'margin: 0',
        'padding: 4.5rem 1.25rem 2rem',
        'list-style: none',
        'display: flex',
        'flex-direction: column',
        'gap: 0',
        'background-color: #0d0d0d',
        'border-left: 1px solid rgba(0,255,157,0.25)',
        'z-index: 99999',
        'overflow-y: auto',
        'overflow-x: hidden',
        'transition: right 0.32s cubic-bezier(0.4,0,0.2,1)',
        'transform: none',
        'visibility: visible',
        'opacity: 1',
      ].join(' !important; ') + ' !important;');
    }

    function setDrawerOpen() {
      navList.setAttribute('style', [
        'position: fixed',
        'top: 0',
        'right: 0',
        'bottom: 0',
        'width: 72vw',
        'max-width: 270px',
        'height: 100%',
        'margin: 0',
        'padding: 4.5rem 1.25rem 2rem',
        'list-style: none',
        'display: flex',
        'flex-direction: column',
        'gap: 0',
        'background-color: #0d0d0d',
        'border-left: 1px solid rgba(0,255,157,0.25)',
        'z-index: 99999',
        'overflow-y: auto',
        'overflow-x: hidden',
        'transition: right 0.32s cubic-bezier(0.4,0,0.2,1)',
        'transform: none',
        'visibility: visible',
        'opacity: 1',
      ].join(' !important; ') + ' !important;');
    }

    /* Set initial closed state */
    setDrawerClosed();

    var isOpen = false;

    function openMenu() {
      isOpen = true;
      setDrawerOpen();
      overlay.classList.add('is-open');
      hamburger.classList.add('is-open');
      hamburger.setAttribute('aria-expanded', 'true');
      document.body.style.setProperty('overflow', 'hidden', 'important');
    }

    function closeMenu() {
      isOpen = false;
      setDrawerClosed();
      overlay.classList.remove('is-open');
      hamburger.classList.remove('is-open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.removeProperty('overflow');
    }

    /* ── 6. Events ──────────────────────────────────────*/
    hamburger.addEventListener('click', function (e) {
      e.stopPropagation();
      isOpen ? closeMenu() : openMenu();
    });

    overlay.addEventListener('click', closeMenu);

    /* Close when a nav link is tapped */
    var links = navList.querySelectorAll('a');
    for (var i = 0; i < links.length; i++) {
      links[i].addEventListener('click', closeMenu);
    }

    /* Close on Escape */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && isOpen) closeMenu();
    });

    /* On resize back to desktop — reset everything */
    window.addEventListener('resize', function () {
      if (window.innerWidth > 768) {
        /* Remove all inline styles so desktop CSS takes back over */
        navList.removeAttribute('style');
        overlay.classList.remove('is-open');
        hamburger.classList.remove('is-open');
        document.body.style.removeProperty('overflow');
        isOpen = false;
      } else {
        /* Back to mobile — re-apply closed state */
        if (!isOpen) setDrawerClosed();
      }
    });

    console.log('[mobile-nav] ✓ Initialized successfully');
  }

  /* ── Run after DOM ready ────────────────────────────── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }

})();
