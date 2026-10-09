(function () {
  'use strict';

  /* ===== MOBILE NAVIGATION TOGGLE ===== */
  var navToggle = document.querySelector('.nav-toggle');
  var navMobile = document.getElementById('nav-mobile');

  function closeMobileNav() {
    if (!navMobile || !navToggle) return;
    navMobile.hidden = true;
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Open menu');
  }

  function openMobileNav() {
    if (!navMobile || !navToggle) return;
    navMobile.hidden = false;
    navToggle.classList.add('open');
    navToggle.setAttribute('aria-expanded', 'true');
    navToggle.setAttribute('aria-label', 'Close menu');
  }

  if (navToggle && navMobile) {
    navToggle.addEventListener('click', function () {
      if (navMobile.hidden) {
        openMobileNav();
      } else {
        closeMobileNav();
      }
    });

    /* Close mobile nav when a link is clicked */
    navMobile.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMobileNav);
    });

    /* Close on Escape */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !navMobile.hidden) {
        closeMobileNav();
        navToggle.focus();
      }
    });

    /* Close on resize to desktop */
    var resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        if (window.innerWidth >= 768) {
          closeMobileNav();
        }
      }, 150);
    });
  }

  /* ===== HEADER SCROLL EFFECT ===== */
  var header = document.getElementById('site-header');
  if (header) {
    var scrollThreshold = 40;
    window.addEventListener('scroll', function () {
      if (window.scrollY > scrollThreshold) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  /* ===== SMOOTH SCROLL (with header offset fallback) ===== */
  /* CSS handles scroll-behavior: smooth; JS handles closing nav */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#' || targetId.length < 2) return;
      var target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      var headerHeight = header ? header.offsetHeight : 0;
      var targetPos = target.getBoundingClientRect().top + window.scrollY - headerHeight + 1;
      window.scrollTo({
        top: targetPos,
        behavior: 'smooth'
      });
    });
  });

  /* ===== BACK TO TOP ===== */
  var backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 600) {
        backToTop.hidden = false;
        requestAnimationFrame(function () {
          backToTop.classList.add('visible');
        });
      } else {
        backToTop.classList.remove('visible');
        setTimeout(function () {
          if (window.scrollY <= 600) backToTop.hidden = true;
        }, 300);
      }
    }, { passive: true });

    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ===== GALLERY LIGHTBOX ===== */
  var galleryItems = document.querySelectorAll('.gallery-item');
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightbox-img');
  var lightboxClose = document.getElementById('lightbox-close');
  var lastFocused = null;

  function openLightbox(fullSrc, altText) {
    if (!lightbox || !lightboxImg) return;
    lastFocused = document.activeElement;
    lightboxImg.src = fullSrc;
    lightboxImg.alt = altText || '';
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
    setTimeout(function () {
      lightboxClose.focus();
    }, 50);
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.hidden = true;
    lightboxImg.src = '';
    lightboxImg.alt = '';
    document.body.style.overflow = '';
    if (lastFocused && lastFocused.focus) {
      lastFocused.focus();
    }
  }

  galleryItems.forEach(function (item) {
    item.addEventListener('click', function () {
      var fullSrc = this.getAttribute('data-full');
      var img = this.querySelector('img');
      var altText = img ? img.alt : '';
      openLightbox(fullSrc, altText);
    });
  });

  if (lightbox) {
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox || e.target === lightboxClose) {
        closeLightbox();
      }
    });
  }
  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && lightbox && !lightbox.hidden) {
      closeLightbox();
    }
  });

  /* ===== PRIVACY MODAL ===== */
  var openPrivacy = document.getElementById('open-privacy');
  var privacyModal = document.getElementById('privacy-modal');
  var closePrivacy = document.getElementById('close-privacy');
  var privacyTrigger = null;

  function openPrivacyModal() {
    if (!privacyModal) return;
    privacyTrigger = document.activeElement;
    privacyModal.hidden = false;
    document.body.style.overflow = 'hidden';
    var modal = privacyModal.querySelector('.modal');
    if (modal) {
      setTimeout(function () { modal.focus(); }, 50);
    }
  }

  function closePrivacyModal() {
    if (!privacyModal) return;
    privacyModal.hidden = true;
    document.body.style.overflow = '';
    if (privacyTrigger && privacyTrigger.focus) {
      privacyTrigger.focus();
    }
  }

  if (openPrivacy) {
    openPrivacy.addEventListener('click', openPrivacyModal);
  }
  if (closePrivacy) {
    closePrivacy.addEventListener('click', closePrivacyModal);
  }
  if (privacyModal) {
    privacyModal.addEventListener('click', function (e) {
      if (e.target === privacyModal) {
        closePrivacyModal();
      }
    });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && privacyModal && !privacyModal.hidden) {
      closePrivacyModal();
    }
  });

  /* ===== DYNAMIC YEAR ===== */
  var yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ===== DYNAMIC PRIVACY DATE ===== */
  var privacyDateEl = document.getElementById('privacy-date');
  if (privacyDateEl) {
    var now = new Date();
    var months = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'];
    privacyDateEl.textContent = months[now.getMonth()] + ' ' + now.getFullYear();
  }
})();
