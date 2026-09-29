// admission.js
document.addEventListener('DOMContentLoaded', () => {
  window.DASHBOARD_ACTIVE_TAB = "Admission Status";

  const btnViewLetter = document.getElementById('btn-view-letter');

  if (btnViewLetter) {
    btnViewLetter.addEventListener('click', () => {
      // Simulate download or viewing
      btnViewLetter.textContent = "Downloading...";
      btnViewLetter.disabled = true;
      setTimeout(() => {
        btnViewLetter.textContent = "Letter Downloaded (Simulated)";
        setTimeout(() => {
          btnViewLetter.textContent = "View Admission Letter";
          btnViewLetter.disabled = false;
        }, 3000);
      }, 1500);
    });
  }
});
