// payment-status.js

document.addEventListener('DOMContentLoaded', () => {
  // Set the active step for the progress bar
  window.CURRENT_STEP = "payment_status";

  // Simulate pulling the reference from URL params or local storage
  const genReference = () => {
    const n = Math.floor(1000 + Math.random() * 9000);
    return `POSTUTME-2026-${n}`;
  };

  const today = new Date().toLocaleDateString("en-NG", {
    year: "numeric", month: "long", day: "numeric"
  });

  document.getElementById('display-ref').textContent = genReference();
  document.getElementById('display-date').textContent = today;
});