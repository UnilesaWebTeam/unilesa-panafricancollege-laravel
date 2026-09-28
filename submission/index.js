// submission.js

document.addEventListener('DOMContentLoaded', () => {
  // --- MOCK DATA ---
  const mockCandidate = {
    fullName: "Jane Doe",
    jambReg: "202512345678DF",
    programme: "B.Sc. Computer Science",
  };

  const submission = {
    applicationNumber: "PUTME/2026/001245",
    date: "12 September 2026, 4:32 PM",
    status: "Submitted",
  };

  // --- DOM ELEMENTS ---
  const appNumberDisplay = document.getElementById('display-app-number');
  const detailsGridContainer = document.getElementById('details-grid-container');
  const statusBadge = document.getElementById('display-status-badge');

  // --- RENDER ---
  // Highlight Application Number
  appNumberDisplay.textContent = submission.applicationNumber;

  // Build the details grid
  const detailsData = [
    { label: "Candidate Name", value: mockCandidate.fullName },
    { label: "JAMB Registration Number", value: mockCandidate.jambReg },
    { label: "Programme", value: mockCandidate.programme },
    { label: "Submission Date", value: submission.date }
  ];

  detailsGridContainer.innerHTML = detailsData.map(item => `
    <div class="rounded-xl border border-white/60 bg-white/50 px-4 py-3">
      <p class="text-xs font-semibold text-foreground/50">${item.label}</p>
      <p class="mt-1 text-sm font-semibold text-foreground">${item.value}</p>
    </div>
  `).join('');

  // Status Badge
  statusBadge.textContent = `${submission.status} — Awaiting Screening`;
});