// site-header.js

document.addEventListener('DOMContentLoaded', () => {
  // --- MOCK DATA ---
  const university = {
    name: "Northbridge University",
    short: "NU",
    tagline: "Post-UTME Application Portal"
  };

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Programmes", href: "/#programmes" },
    { label: "Important Info", href: "/#about" },
    { label: "Contact", href: "/#contact" }
  ];

  // --- DOM ELEMENTS ---
  const uniShort = document.getElementById('header-uni-short');
  const uniName = document.getElementById('header-uni-name');
  const uniTagline = document.getElementById('header-uni-tagline');
  
  const desktopNav = document.getElementById('desktop-nav');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileNavContainer = document.getElementById('mobile-nav-container');
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  
  const loginBtn = document.getElementById('login-btn');

  // --- POPULATE BRAND DATA ---
  uniShort.textContent = university.short;
  uniName.textContent = university.name;
  uniTagline.textContent = university.tagline;

  // --- POPULATE NAVIGATION ---
  const currentPath = window.location.pathname;

  // Desktop Links
  desktopNav.innerHTML = navLinks.map(link => {
    const isActive = currentPath === link.href ? 'active' : '';
    return `<a href="${link.href}" class="nav-link transition hover:text-primary ${isActive}">${link.label}</a>`;
  }).join('');

  // Mobile Links
  mobileNav.innerHTML = navLinks.map(link => `
    <li>
      <a href="${link.href}" class="mobile-nav-link block rounded-lg px-2 py-2 transition hover:bg-white/60 hover:text-primary">
        ${link.label}
      </a>
    </li>
  `).join('');

  // --- EVENT LISTENERS ---

  // Mobile Menu Toggle
  let mobileOpen = false;
  mobileMenuToggle.addEventListener('click', () => {
    mobileOpen = !mobileOpen;
    if (mobileOpen) {
      mobileNavContainer.classList.remove('hidden');
    } else {
      mobileNavContainer.classList.add('hidden');
    }
  });

  // Close mobile menu when a link is clicked
  const mobileLinkEls = document.querySelectorAll('.mobile-nav-link');
  mobileLinkEls.forEach(el => {
    el.addEventListener('click', () => {
      mobileOpen = false;
      mobileNavContainer.classList.add('hidden');
    });
  });

  // Host Page 'onLogin' Delegation
  loginBtn.addEventListener('click', () => {
    if (typeof window.onLogin === 'function') {
      window.onLogin();
    } else {
      console.warn("window.onLogin is not defined on the host page.");
    }
  });
});