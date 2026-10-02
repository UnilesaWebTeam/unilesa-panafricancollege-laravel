// application-success.js

document.addEventListener('DOMContentLoaded', () => {
  // Candidate data matching the portal state
  const mockCandidate = {
    fullName: "Jane Doe",
    jambReg: "202490012345EF",
    programme: "Computer Science",
    phone: "+234 801 234 5678",
    email: "jane.doe@example.com"
  };

  const applicationRecord = {
    applicationNumber: "PUTME/2026/001245",
    submissionDate: "Today, 2 Oct 2026",
    status: "Submitted & Saved"
  };

  // Populate UI elements
  const appNumberEl = document.getElementById('display-app-number');
  const nameEl = document.getElementById('display-name');
  const jambEl = document.getElementById('display-jamb');
  const progEl = document.getElementById('display-prog');
  const dateEl = document.getElementById('display-date');
  const statusEl = document.getElementById('display-status-badge');

  if (appNumberEl) appNumberEl.textContent = applicationRecord.applicationNumber;
  if (nameEl) nameEl.textContent = mockCandidate.fullName;
  if (jambEl) jambEl.textContent = mockCandidate.jambReg;
  if (progEl) progEl.textContent = mockCandidate.programme;
  if (dateEl) dateEl.textContent = applicationRecord.submissionDate;
  if (statusEl) statusEl.textContent = applicationRecord.status;

  // Print button handler
  const printBtn = document.getElementById('btn-print');
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }
});
