// payment.js

document.addEventListener('DOMContentLoaded', () => {
  // --- MOCK DATA ---
  const mockCandidate = {
    fullName: "Jane Doe",
    jambReg: "202512345678DF",
    programme: "B.Sc. Computer Science",
    institution: "Pan African College of Education"
  };
  
  const FEE = 5000;
  const naira = (n) => `₦${n.toLocaleString("en-NG")}`;
  const formattedFee = naira(FEE);

  // --- STATE ---
  let status = "unpaid"; // "unpaid" | "processing" | "successful" | "failed"
  let reference = "POSTUTME-2026-001245";
  let demoFailed = false;

  const genReference = () => {
    const n = Math.floor(1000 + Math.random() * 9000);
    return `POSTUTME-2026-${n}`;
  };

  // --- DOM ELEMENTS ---
  
  // Data displays
  document.getElementById('detail-candidate').textContent = mockCandidate.fullName;
  document.getElementById('detail-jamb-reg').textContent = mockCandidate.jambReg;
  document.getElementById('detail-programme').textContent = mockCandidate.programme;
  document.getElementById('detail-reference').textContent = reference;
  
  const feeDisplays = document.querySelectorAll('.fee-display');
  feeDisplays.forEach(el => el.textContent = formattedFee);

  // Status Displays
  const badgeContainer = document.getElementById('status-badge-container');
  const detailStatus = document.getElementById('detail-status');
  const successRefDisplay = document.getElementById('success-reference-display');

  // Banners
  const banners = {
    unpaid: document.getElementById('banner-unpaid'),
    processing: document.getElementById('banner-processing'),
    successful: document.getElementById('banner-successful'),
    failed: document.getElementById('banner-failed')
  };

  // Actions
  const payBtn = document.getElementById('pay-btn');
  const demoCheckbox = document.getElementById('demo-failed-checkbox');
  const actionGroupPay = document.getElementById('action-group-pay');
  const actionGroupSuccess = document.getElementById('action-group-success');

  // Modal
  const modal = document.getElementById('receipt-modal');
  const viewReceiptBtn = document.getElementById('view-receipt-btn');
  const closeReceiptBtn = document.getElementById('close-receipt-btn');
  const printReceiptBtn = document.getElementById('print-receipt-btn');
  const downloadReceiptBtn = document.getElementById('download-receipt-btn');


  // --- RENDER FUNCTION ---
  const updateUI = () => {
    // 1. Update Badge
    if (status === "successful") {
      badgeContainer.innerHTML = `<span class="ui-badge ui-badge-success">Successful</span>`;
      detailStatus.textContent = "Successful";
    } else if (status === "processing") {
      badgeContainer.innerHTML = `
        <span class="inline-flex items-center gap-2 rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-semibold text-primary">
          <span class="h-1.5 w-1.5 animate-pulse rounded-full bg-primary"></span> Processing
        </span>`;
      detailStatus.textContent = "Processing";
    } else if (status === "failed") {
      badgeContainer.innerHTML = `
        <span class="inline-flex items-center rounded-full bg-destructive/10 px-2.5 py-1 text-[11px] font-semibold text-destructive">Failed</span>`;
      detailStatus.textContent = "Failed";
    } else {
      badgeContainer.innerHTML = `<span class="ui-badge ui-badge-neutral">Unpaid</span>`;
      detailStatus.textContent = "Unpaid";
    }

    // 2. Manage Banners Visibility
    Object.keys(banners).forEach(key => {
      if (key === status) {
        banners[key].classList.remove('hidden');
      } else {
        banners[key].classList.add('hidden');
      }
    });

    // 3. Update Buttons and Inputs
    if (status === "processing") {
      payBtn.disabled = true;
      payBtn.textContent = "Processing…";
      demoCheckbox.disabled = true;
    } else {
      payBtn.disabled = false;
      demoCheckbox.disabled = false;
      payBtn.textContent = status === "failed" ? "Retry Payment" : "Pay Application Fee";
    }

    // 4. Toggle Action Groups (Pay vs Success state)
    if (status === "successful") {
      actionGroupPay.classList.add('hidden');
      actionGroupSuccess.classList.remove('hidden');
      document.getElementById('detail-reference').textContent = reference;
      successRefDisplay.textContent = reference;
    } else {
      actionGroupPay.classList.remove('hidden');
      actionGroupSuccess.classList.add('hidden');
    }
  };

  // Initial Render
  updateUI();


  // --- EVENT LISTENERS ---

  // Checkbox
  demoCheckbox.addEventListener('change', (e) => {
    demoFailed = e.target.checked;
  });

  // Pay Logic (Simulated)
  payBtn.addEventListener('click', () => {
    if (status === "processing") return;
    
    status = "processing";
    updateUI();

    setTimeout(() => {
      if (demoFailed) {
        status = "failed";
        demoFailed = false;
        demoCheckbox.checked = false; // reset UI checkbox
        updateUI();
      } else {
        reference = genReference();
        status = "successful";
        window.location.href = "../payment-status/index.html";
      }
    }, 1500);
  });

  // Modal Handlers
  viewReceiptBtn.addEventListener('click', () => {
    // Populate Modal Data
    document.getElementById('receipt-institution').textContent = mockCandidate.institution;
    document.getElementById('receipt-candidate').textContent = mockCandidate.fullName;
    document.getElementById('receipt-jamb').textContent = mockCandidate.jambReg;
    document.getElementById('receipt-programme').textContent = mockCandidate.programme;
    document.getElementById('receipt-ref').textContent = reference;
    
    const today = new Date().toLocaleDateString("en-NG", {
      year: "numeric", month: "long", day: "numeric"
    });
    document.getElementById('receipt-date').textContent = today;

    // Show modal
    modal.classList.remove('hidden');
  });

  const closeModal = () => modal.classList.add('hidden');
  closeReceiptBtn.addEventListener('click', closeModal);
  downloadReceiptBtn.addEventListener('click', closeModal);
  printReceiptBtn.addEventListener('click', () => window.print());

  // Close modal when clicking outside the content box
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

});