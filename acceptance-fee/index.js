// acceptance-fee.js
document.addEventListener('DOMContentLoaded', () => {
  window.DASHBOARD_ACTIVE_TAB = "Admission Status";

  const candidateData = {
    name: "Jane Doe",
    programme: "B.Sc. Computer Science",
    amount: "₦100,000"
  };

  let state = "Unpaid"; // Unpaid, Processing, Paid
  let reference = "";

  const receiptContainer = document.getElementById('receipt-container');
  const btnPay = document.getElementById('btn-pay');
  const paymentActionArea = document.getElementById('payment-action-area');
  const postPaymentActions = document.getElementById('post-payment-actions');
  const successBanner = document.getElementById('success-banner');
  const headerStatus = document.getElementById('header-status');
  const btnPrintReceipt = document.getElementById('btn-print-receipt');

  const renderReceipt = () => {
    const rows = [
      { label: "Candidate Name", value: candidateData.name },
      { label: "Programme", value: candidateData.programme },
      { label: "Acceptance Fee", value: candidateData.amount },
      { label: "Payment Status", value: state, highlight: true }
    ];

    if (state === "Paid") {
      rows.push({ label: "Payment Reference", value: reference });
      rows.push({ label: "Date Paid", value: new Date().toLocaleDateString('en-GB') });
    }

    receiptContainer.innerHTML = rows.map(r => `
      <div class="rounded-xl border border-white/60 bg-white/60 px-4 py-3">
        <p class="text-xs font-semibold text-foreground/50 uppercase tracking-wide">${r.label}</p>
        <p class="mt-1 text-sm font-bold ${r.highlight ? (state === 'Paid' ? 'text-success' : 'text-warning') : 'text-foreground'}">
          ${r.value}
        </p>
      </div>
    `).join('');

    // Update Header Badge
    headerStatus.textContent = state;
    if (state === "Paid") {
      headerStatus.className = "ui-badge ui-badge-success";
    } else if (state === "Processing") {
      headerStatus.className = "ui-badge bg-warning/20 text-warning border-warning/30";
    } else {
      headerStatus.className = "ui-badge bg-white/80 border border-foreground/10 text-foreground";
    }
  };

  renderReceipt();

  if (btnPay) {
    btnPay.addEventListener('click', () => {
      if (state === "Paid" || state === "Processing") return;
      
      state = "Processing";
      btnPay.innerHTML = '<span class="spinner"></span> Processing...';
      btnPay.disabled = true;
      renderReceipt();

      // Simulate payment processing
      setTimeout(() => {
        state = "Paid";
        reference = "PAC-AFEE-" + Math.floor(100000 + Math.random() * 900000);
        
        // Update UI for Paid state
        paymentActionArea.classList.add('hidden');
        postPaymentActions.classList.remove('hidden');
        successBanner.classList.remove('hidden');
        
        renderReceipt();
      }, 2500);
    });
  }

  if (btnPrintReceipt) {
    btnPrintReceipt.addEventListener('click', () => {
      window.print();
    });
  }
});
