// dashboard-shell.js

document.addEventListener('DOMContentLoaded', () => {
  // --- MOCK DATA ---
  const mockCandidate = {
    fullName: "Jane Doe",
    jambReg: "202512345678DF",
    programme: "B.Sc. Computer Science",
    email: "jane.doe@example.com",
    photo: "https://api.dicebear.com/7.x/notionists/svg?seed=JaneDoe&backgroundColor=e2e8f0"
  };

  const navItems = [
    { label: "Dashboard", icon: "▤", to: "/dashboard" },
    { label: "My Application", icon: "▦", to: "/application" },
    { label: "Personal Information", icon: "◍", to: "/application" },
    { label: "Academic Information", icon: "✎", to: "/application" },
    { label: "Documents", icon: "❐", to: "/documents" },
    { label: "Payment", icon: "₦", to: "/payment" },
    { label: "Screening Slip", icon: "🖨" },
    { label: "Admission Status", icon: "★" },
    { label: "Notifications", icon: "◎" },
    { label: "Profile", icon: "☺" },
    { label: "Logout", icon: "⏻", to: "/" },
  ];

  const notifications = [
    { title: "Payment confirmed", body: "Your ₦5,000 application fee was received." },
    { title: "Documents pending", body: "2 of 5 required documents are still missing." },
    { title: "Screening date announced", body: "Post-UTME screening holds 18 October 2026." },
  ];

  // --- DOM ELEMENTS ---
  const desktopNavContainer = document.getElementById('desktop-nav');
  const mobileNavContainer = document.getElementById('mobile-nav');
  
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileOverlay = document.getElementById('mobile-overlay');
  const mobileBackdrop = document.getElementById('mobile-backdrop');
  const mobileCloseBtn = document.getElementById('mobile-close-btn');

  const globalModal = document.getElementById('global-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalContent = document.getElementById('modal-content');
  const modalClose = document.getElementById('modal-close');

  const topbarWelcome = document.getElementById('topbar-welcome');
  const topbarDetails = document.getElementById('topbar-details');
  const topbarAvatar = document.getElementById('topbar-avatar');

  // --- RENDER TOPBAR ---
  const names = mockCandidate.fullName.split(" ");
  const firstName = names[0];
  const lastName = names[names.length - 1];

  topbarWelcome.textContent = `Welcome, ${firstName} ${lastName}`;
  topbarDetails.textContent = `JAMB Reg. ${mockCandidate.jambReg} · ${mockCandidate.programme}`;
  topbarAvatar.src = mockCandidate.photo;


  // --- RENDER NAVIGATION ---
  const activeTab = window.DASHBOARD_ACTIVE_TAB || "";

  const renderNav = (container, isMobile) => {
    container.innerHTML = navItems.map(item => {
      const isActive = item.label === activeTab;
      
      const baseClasses = "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold transition cursor-pointer nav-item";
      const activeClasses = "bg-primary text-primary-foreground shadow-brand";
      const inactiveClasses = "text-foreground/60 hover:bg-white/60 hover:text-primary";
      
      const finalClasses = `${baseClasses} ${isActive ? activeClasses : inactiveClasses}`;
      
      const innerContent = `
        <span class="grid h-6 w-6 shrink-0 place-items-center text-xs opacity-80">${item.icon}</span>
        <span class="truncate">${item.label}</span>
      `;

      if (item.to) {
        return `<a href="${item.to}" class="${finalClasses}" data-label="${item.label}">${innerContent}</a>`;
      } else {
        return `<button type="button" class="${finalClasses} w-full text-left" data-label="${item.label}" data-demo="true">${innerContent}</button>`;
      }
    }).join('');
  };

  renderNav(desktopNavContainer, false);
  renderNav(mobileNavContainer, true);


  // --- MOBILE MENU LOGIC ---
  const closeMobileMenu = () => mobileOverlay.classList.add('hidden');
  const openMobileMenu = () => mobileOverlay.classList.remove('hidden');

  mobileMenuBtn.addEventListener('click', openMobileMenu);
  mobileBackdrop.addEventListener('click', closeMobileMenu);
  mobileCloseBtn.addEventListener('click', closeMobileMenu);

  // Close mobile menu on any nav click
  document.querySelectorAll('#mobile-nav .nav-item').forEach(el => {
    el.addEventListener('click', closeMobileMenu);
  });


  // --- MODAL LOGIC ---
  const openModal = (title, htmlContent) => {
    modalTitle.textContent = title;
    modalContent.innerHTML = htmlContent;
    globalModal.classList.remove('hidden');
  };

  const closeModal = () => {
    globalModal.classList.add('hidden');
  };

  modalClose.addEventListener('click', closeModal);
  globalModal.addEventListener('click', (e) => {
    if (e.target === globalModal) closeModal();
  });


  // --- EVENT DELEGATION (Prototype Modals) ---
  
  // 1. Topbar Notifications
  document.getElementById('notifs-btn').addEventListener('click', () => {
    const notifHtml = `
      <ul class="space-y-3">
        ${notifications.map(n => `
          <li class="rounded-xl border border-white/60 bg-white/60 p-3">
            <p class="text-sm font-semibold text-foreground">${n.title}</p>
            <p class="mt-1 text-xs text-foreground/60">${n.body}</p>
          </li>
        `).join('')}
      </ul>
    `;
    openModal("Notifications", notifHtml);
  });

  // 2. Topbar Profile
  document.getElementById('profile-btn').addEventListener('click', () => {
    const profileHtml = `
      <div class="flex items-center gap-3">
        <img src="${mockCandidate.photo}" alt="" class="h-14 w-14 rounded-xl object-cover" />
        <div>
          <p class="text-sm font-semibold text-foreground">${mockCandidate.fullName}</p>
          <p class="text-xs text-foreground/60">${mockCandidate.email}</p>
          <span class="ui-badge ui-badge-success mt-2">Verified candidate</span>
        </div>
      </div>
    `;
    openModal("Profile", profileHtml);
  });

  // 3. Demo Nav Links (without 'to' property)
  document.addEventListener('click', (e) => {
    const target = e.target.closest('[data-demo="true"]');
    if (target) {
      const label = target.getAttribute('data-label');
      const demoHtml = `<p class="text-sm text-foreground/70">This section is a UI placeholder in the prototype. No data is stored.</p>`;
      openModal(label, demoHtml);
    }
  });

});