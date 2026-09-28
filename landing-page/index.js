// index.js

document.addEventListener('DOMContentLoaded', () => {
  // --- MOCK DATA (Extracted from @/data/portal) ---
  const keyDates = [
    { label: 'Application Opens', value: 'Nov 04, 2025', note: 'Online portal opens' },
    { label: 'Application Closes', value: 'Jan 15, 2026', note: 'Late entries not accepted' },
    { label: 'Screening Exercise', value: 'Feb 10, 2026', note: 'CBT Examination' },
    { label: 'Merit List Release', value: 'Mar 01, 2026', note: 'First batch admission' }
  ];

  const processSteps = [
    { title: 'Create Account', note: 'Verify your JAMB details' },
    { title: 'Make Payment', note: 'Pay screening fee securely' },
    { title: 'Fill Form', note: 'Upload O\'Level & Documents' },
    { title: 'Print Slip', note: 'Bring to screening venue' }
  ];

  const programmes = [
    { name: 'Computer Science', faculty: 'Science', duration: '4 Years', cutOff: '200', highlight: true },
    { name: 'Accounting', faculty: 'Management Sciences', duration: '4 Years', cutOff: '180', highlight: false },
    { name: 'Law', faculty: 'Law', duration: '5 Years', cutOff: '220', highlight: true },
    { name: 'Mass Communication', faculty: 'Arts', duration: '4 Years', cutOff: '190', highlight: false }
  ];

  const university = {
    address: 'KM 10, University Road, PMB 1001, City, State.',
    phone: '+234 800 123 4567',
    email: 'admissions@northbridge.edu.ng'
  };

  const mockStatus = {
    decision: 'Recommended for Admission',
    candidate: 'John Doe',
    programme: 'B.Sc. Computer Science',
    badge: 'Admitted'
  };

  // --- DOM ELEMENTS ---
  const modalEl = document.getElementById('global-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');
  const modalCloseBtn = document.getElementById('modal-close-btn');

  const statusForm = document.getElementById('status-form');
  const statusResultCard = document.getElementById('status-result');
  
  const contactForm = document.getElementById('contact-form');

  // --- INITIALIZE DYNAMIC CONTENT ---
  
  // Render Key Dates
  const datesGrid = document.getElementById('key-dates-grid');
  datesGrid.innerHTML = keyDates.map(item => `
    <div class="ui-card">
      <p class="text-xs font-semibold text-foreground/40">${item.label}</p>
      <p class="mt-2 font-display text-xl font-bold">${item.value}</p>
      <p class="mt-1 text-xs text-foreground/50">${item.note}</p>
    </div>
  `).join('');

  // Render Process Steps
  const stepsGrid = document.getElementById('process-steps-grid');
  stepsGrid.innerHTML = processSteps.map((step, i) => `
    <div class="ui-card">
      <span class="grid h-9 w-9 place-items-center rounded-lg bg-primary/10 font-display text-sm font-bold text-primary">${i + 1}</span>
      <p class="mt-3 text-sm font-semibold">${step.title}</p>
      <p class="mt-1 text-xs text-foreground/50">${step.note}</p>
    </div>
  `).join('');

  // Render Programmes
  const programmesGrid = document.getElementById('programmes-grid');
  programmesGrid.innerHTML = programmes.map(p => `
    <div class="ui-card">
      <p class="font-display text-sm font-bold">${p.name}</p>
      <p class="mt-1 text-xs text-foreground/50">${p.faculty}</p>
      <p class="mt-1 text-xs text-foreground/40">${p.duration}</p>
      <span class="ui-badge ${p.highlight ? 'ui-badge-success' : 'ui-badge-brand'} mt-4 inline-block">
        Cut-off ${p.cutOff}
      </span>
    </div>
  `).join('');

  // Render University Contact Data
  document.getElementById('contact-address').textContent = university.address;
  document.getElementById('contact-phone').textContent = university.phone;
  document.getElementById('contact-email').textContent = university.email;


  // --- MODAL LOGIC ---
  const openModal = (title, body) => {
    modalTitle.textContent = title;
    modalBody.textContent = body;
    modalEl.classList.remove('hidden');
    
    // Slight delay to allow display:block to apply before animating opacity
    requestAnimationFrame(() => {
      modalEl.classList.remove('opacity-0');
      modalEl.firstElementChild.classList.remove('scale-95');
    });
  };

  const closeModal = () => {
    modalEl.classList.add('opacity-0');
    modalEl.firstElementChild.classList.add('scale-95');
    
    // Wait for transition
    setTimeout(() => {
      modalEl.classList.add('hidden');
    }, 200);
  };

  modalCloseBtn.addEventListener('click', closeModal);
  
  // Close on outside click
  modalEl.addEventListener('click', (e) => {
    if (e.target === modalEl) closeModal();
  });


  // --- EVENT LISTENERS ---

  // Status Form Submit
  if (statusForm) {
    statusForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Populate mock status result
      document.getElementById('result-decision').textContent = mockStatus.decision;
      document.getElementById('result-details').textContent = `${mockStatus.candidate} · ${mockStatus.programme}`;
      document.getElementById('result-badge').textContent = mockStatus.badge;
      
      // Show result card
      statusResultCard.classList.remove('hidden');
    });
  }

  // Contact Form Submit
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      openModal(
        "Message sent",
        "Thank you for reaching out. The admissions office will respond within 2 working days. (Demo only — nothing was submitted.)"
      );
      contactForm.reset();
    });
  }

  // Programme "View all" trigger
  const viewAllBtn = document.getElementById('view-all-programmes-btn');
  if (viewAllBtn) {
    viewAllBtn.addEventListener('click', () => {
      openModal(
        "Full programme list",
        "The complete catalogue of faculties and courses is not part of this prototype. The seven programmes shown are sample entries."
      );
    });
  }

  // Make openModal available globally in case it needs to be called from the future SiteHeader partial
  window.openModal = openModal;
});