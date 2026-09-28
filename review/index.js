// review.js

document.addEventListener('DOMContentLoaded', () => {
  // --- MOCK DATA ---
  const mockCandidate = {
    fullName: "Jane Doe",
    phone: "+234 801 234 5678",
    email: "jane.doe@example.com",
    stateOfOrigin: "Ogun",
    localGovernment: "Abeokuta South",
    jambReg: "202512345678DF",
    jambScore: 245,
    examinationYear: "2025",
    programme: "B.Sc. Computer Science",
    oLevel: [
      { subject: "Mathematics", grade: "A1" },
      { subject: "English Language", grade: "B3" },
      { subject: "Physics", grade: "B2" },
      { subject: "Chemistry", grade: "C4" },
      { subject: "Biology", grade: "B3" }
    ]
  };

  const reviewDocuments = [
    { name: "Passport Photograph", file: "passport-photo.jpg" },
    { name: "O'Level Result", file: "waec-result.pdf" },
    { name: "JAMB Result", file: "jamb-result-slip.pdf" },
    { name: "Birth Certificate", file: null },
    { name: "NIN Slip", file: null },
    { name: "Other Required Documents", file: null },
  ];

  const payment = {
    fee: "₦5,000",
    reference: "POSTUTME-2026-001245",
    status: "Paid",
    date: "12 September 2026",
  };

  const nextOfKin = {
    name: "Adebola Johnson",
    relationship: "Father",
    phone: "+234 802 444 0117",
    address: "14 Ijaiye Road, Abeokuta, Ogun State",
  };

  const requiredDocumentsCount = 6;
  const uploadedCount = reviewDocuments.filter(d => d.file !== null).length;

  // --- STATE ---
  let confirmed = false;
  let submitted = false;

  // --- DOM ELEMENTS ---
  const headerBadge = document.getElementById('header-badge');
  const successBanner = document.getElementById('success-banner');
  const confirmCheckbox = document.getElementById('confirm-checkbox');
  const checkboxError = document.getElementById('checkbox-error');
  const submitBtn = document.getElementById('submit-btn');
  
  const confirmModal = document.getElementById('confirm-modal');
  const modalCancelBtn = document.getElementById('modal-cancel-btn');
  const modalConfirmBtn = document.getElementById('modal-confirm-btn');
  
  // Render targets
  const personalInfoGrid = document.getElementById('personal-info-grid');
  const academicInfoGrid = document.getElementById('academic-info-grid');
  const olevelTbody = document.getElementById('olevel-tbody');
  const nokInfoGrid = document.getElementById('nok-info-grid');
  const documentsTitle = document.getElementById('documents-title');
  const documentsList = document.getElementById('documents-list');
  const paymentInfoGrid = document.getElementById('payment-info-grid');
  const modalProgrammeName = document.getElementById('modal-programme-name');


  // --- UTILS ---
  const renderRow = (label, value) => `
    <div class="rounded-xl border border-white/60 bg-white/50 px-4 py-3">
      <p class="text-xs font-semibold text-foreground/50">${label}</p>
      <p class="mt-1 text-sm font-semibold text-foreground">${value}</p>
    </div>
  `;

  // --- INITIAL RENDER ---
  const initRender = () => {
    // Modal Context
    modalProgrammeName.textContent = mockCandidate.programme;

    // Personal Info
    personalInfoGrid.innerHTML = `
      ${renderRow("Full Name", mockCandidate.fullName)}
      ${renderRow("Date of Birth", "18 April 2006")}
      ${renderRow("Gender", "Male")}
      ${renderRow("Phone Number", mockCandidate.phone)}
      ${renderRow("Email", mockCandidate.email)}
      ${renderRow("State of Origin", mockCandidate.stateOfOrigin)}
      ${renderRow("Local Government", mockCandidate.localGovernment)}
      ${renderRow("Home Address", "14 Ijaiye Road, Abeokuta, Ogun State")}
    `;

    // Academic Info
    academicInfoGrid.innerHTML = `
      ${renderRow("JAMB Registration Number", mockCandidate.jambReg)}
      ${renderRow("JAMB Score", `${mockCandidate.jambScore} / 400`)}
      ${renderRow("Examination Year", mockCandidate.examinationYear)}
      ${renderRow("Programme", mockCandidate.programme)}
    `;

    // O'Level Table
    olevelTbody.innerHTML = mockCandidate.oLevel.map(row => `
      <tr class="border-t border-white/60 bg-white/40">
        <td class="px-4 py-2">${row.subject}</td>
        <td class="px-4 py-2 font-semibold text-primary">${row.grade}</td>
      </tr>
    `).join('');

    // Next of Kin
    nokInfoGrid.innerHTML = `
      ${renderRow("Full Name", nextOfKin.name)}
      ${renderRow("Relationship", nextOfKin.relationship)}
      ${renderRow("Phone Number", nextOfKin.phone)}
      ${renderRow("Address", nextOfKin.address)}
    `;

    // Documents
    documentsTitle.textContent = `Documents (${uploadedCount}/${requiredDocumentsCount} uploaded)`;
    documentsList.innerHTML = reviewDocuments.map(doc => `
      <li class="flex items-center justify-between gap-3 rounded-xl border border-white/60 bg-white/50 px-4 py-3">
        <div class="min-w-0">
          <p class="truncate text-sm font-semibold">${doc.name}</p>
          ${doc.file ? `<p class="truncate text-xs text-foreground/50">${doc.file}</p>` : ''}
        </div>
        <span class="ui-badge ${doc.file ? 'ui-badge-success' : 'ui-badge-neutral'}">
          ${doc.file ? 'Uploaded' : 'Pending'}
        </span>
      </li>
    `).join('');

    // Payment
    paymentInfoGrid.innerHTML = `
      ${renderRow("Application Fee", payment.fee)}
      ${renderRow("Payment Reference", payment.reference)}
      ${renderRow("Date", payment.date)}
      <div class="rounded-xl border border-white/60 bg-white/50 px-4 py-3">
        <p class="text-xs font-semibold text-foreground/50">Payment Status</p>
        <span class="ui-badge ui-badge-success mt-2">${payment.status}</span>
      </div>
    `;
  };

  // --- STATE UPDATES ---
  const updateSubmittedUI = () => {
    if (submitted) {
      headerBadge.textContent = "Submitted";
      headerBadge.className = "ui-badge ui-badge-success";
      
      successBanner.classList.remove('hidden');
      
      confirmCheckbox.disabled = true;
      submitBtn.disabled = true;
      submitBtn.classList.add('disabled');
      submitBtn.textContent = "Application Submitted";
    }
  };


  // --- EVENT LISTENERS ---

  // Checkbox interactions
  confirmCheckbox.addEventListener('change', (e) => {
    confirmed = e.target.checked;
    if (confirmed) {
      checkboxError.classList.add('hidden');
    }
  });

  // Main Submit Button
  submitBtn.addEventListener('click', () => {
    if (submitted) return;
    
    if (!confirmed) {
      checkboxError.classList.remove('hidden');
      return;
    }
    
    // Show Modal
    confirmModal.classList.remove('hidden');
  });

  // Modal Cancel Button
  modalCancelBtn.addEventListener('click', () => {
    confirmModal.classList.add('hidden');
  });

  // Modal Confirm Button
  modalConfirmBtn.addEventListener('click', () => {
    confirmModal.classList.add('hidden');
    submitted = true;
    updateSubmittedUI();
  });

  // Boot
  initRender();
});