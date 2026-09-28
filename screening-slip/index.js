// screening-slip.js

document.addEventListener('DOMContentLoaded', () => {
  // --- MOCK DATA ---
  const mockCandidate = {
    fullName: "Jane Doe",
    jambReg: "202512345678DF",
    programme: "B.Sc. Computer Science",
    jambScore: 245,
    photo: "https://api.dicebear.com/7.x/notionists/svg?seed=JaneDoe&backgroundColor=e2e8f0" // Generic placeholder
  };

  const slip = {
    applicationNumber: "PUTME/2026/001245",
    screeningDate: "Saturday, 18 October 2026 · 9:00 AM",
    venue: "Main Auditorium, Northbridge University, Ibadan Campus",
    status: "Submitted — Awaiting Screening",
    paymentReference: "POSTUTME-2026-001245",
  };

  // --- DOM ELEMENTS ---
  // Candidate info
  document.getElementById('candidate-photo').src = mockCandidate.photo;
  document.getElementById('candidate-photo').alt = `Passport photograph of ${mockCandidate.fullName}`;
  document.getElementById('candidate-name').textContent = mockCandidate.fullName;
  document.getElementById('candidate-badge').textContent = slip.status;

  // Screening info grid
  document.getElementById('slip-date').textContent = slip.screeningDate;
  document.getElementById('slip-venue').textContent = slip.venue;
  document.getElementById('slip-reference').textContent = slip.paymentReference;
  document.getElementById('slip-status').textContent = slip.status;
  document.getElementById('slip-footer-app-number').textContent = slip.applicationNumber;

  // Detail Rows rendering
  const detailRowsContainer = document.getElementById('detail-rows-container');
  const details = [
    { label: "Application Number", value: slip.applicationNumber },
    { label: "JAMB Reg. Number", value: mockCandidate.jambReg },
    { label: "Programme", value: mockCandidate.programme },
    { label: "JAMB Score", value: `${mockCandidate.jambScore} / 400` }
  ];

  detailRowsContainer.innerHTML = details.map(item => `
    <div class="flex justify-between gap-4 border-b border-dashed border-foreground/15 py-2.5 last:border-b-0">
      <span class="text-xs font-semibold uppercase tracking-wide text-foreground/50">${item.label}</span>
      <span class="text-right text-sm font-bold">${item.value}</span>
    </div>
  `).join('');


  // --- INTERACTIVITY ---
  const printBtn = document.getElementById('btn-print');
  const downloadBtn = document.getElementById('btn-download');
  const downloadBanner = document.getElementById('download-banner');
  
  let downloadTimeout;

  // Print function
  printBtn.addEventListener('click', () => {
    window.print();
  });

  // Simulated Download function
  downloadBtn.addEventListener('click', () => {
    downloadBanner.classList.remove('hidden');
    
    // Clear existing timeout if multiple clicks happen
    if (downloadTimeout) {
      clearTimeout(downloadTimeout);
    }
    
    // Hide banner after 4 seconds
    downloadTimeout = window.setTimeout(() => {
      downloadBanner.classList.add('hidden');
    }, 4000);
  });
});