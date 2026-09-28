// site-header.js

document.addEventListener('DOMContentLoaded', () => {
  // --- MOCK DATA ---
  const university = {
    name: "Pan African College of Education",
    short: "NU",
    tagline: "In Partnership with Unilesa"
  };

  const navLinks = [
    { label: "Home", href: "../landing-page/index.html" },
    { label: "Programmes", href: "../landing-page/index.html#programmes" },
    { label: "Important Info", href: "../landing-page/index.html#about" },
    { label: "Contact", href: "../landing-page/index.html#contact" }
  ];

  // --- DOM ELEMENTS ---
  const uniName = document.getElementById('header-uni-name');
  const uniTagline = document.getElementById('header-uni-tagline');
  
  const desktopNav = document.getElementById('desktop-nav');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileNavContainer = document.getElementById('mobile-nav-container');
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  
  const loginBtn = document.getElementById('login-btn');

  // --- POPULATE BRAND DATA ---
  if (uniName) uniName.textContent = university.name;
  if (uniTagline) uniTagline.textContent = university.tagline;

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