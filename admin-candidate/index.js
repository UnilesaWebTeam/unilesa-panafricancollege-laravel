// admin-candidate.js
document.addEventListener('DOMContentLoaded', () => {
  const adminNavItems = [
    { label: "Dashboard", to: "../admin-dashboard/index.html" },
    { label: "Candidates", to: "#", active: true },
    { label: "Applications", to: "#" },
    { label: "Documents", to: "#" },
    { label: "Screening", to: "#" },
    { label: "Admission", to: "#" },
    { label: "Reports", to: "#" },
    { label: "Notifications", to: "#" },
    { label: "Profile", to: "#" },
    { label: "Logout", to: "../landing-page/index.html" },
  ];

  const adminNav = document.getElementById('admin-nav');
  adminNav.innerHTML = adminNavItems.map(item => `
    <a href="${item.to}" class="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold transition cursor-pointer ${item.active ? 'bg-primary text-white shadow-md shadow-primary/30' : 'text-foreground/60 hover:bg-white/60 hover:text-primary'}">
      ${item.label}
    </a>
  `).join('');

  // Interactions
  const toast = document.getElementById('action-toast');
  const toastMsg = document.getElementById('toast-message');

  const showToast = (msg) => {
    toastMsg.textContent = msg;
    toast.classList.remove('hidden');
    setTimeout(() => {
      toast.classList.add('hidden');
    }, 3000);
  };

  document.getElementById('btn-review-app').addEventListener('click', () => {
    showToast("Simulated: Opened Application Review Interface");
  });

  document.getElementById('btn-review-docs').addEventListener('click', () => {
    showToast("Simulated: Opened Document Verification Interface");
  });

  // Modal logic
  const statusModal = document.getElementById('status-modal');
  const btnUpdateStatus = document.getElementById('btn-update-status');
  const closeStatusModal = document.getElementById('close-status-modal');
  const cancelStatusModal = document.getElementById('cancel-status-modal');
  const confirmStatusModal = document.getElementById('confirm-status-modal');
  
  const currentStatusDisplay = document.getElementById('current-status-display');
  const newStatusSelect = document.getElementById('new-status-select');

  btnUpdateStatus.addEventListener('click', () => statusModal.classList.remove('hidden'));
  const hideModal = () => statusModal.classList.add('hidden');
  closeStatusModal.addEventListener('click', hideModal);
  cancelStatusModal.addEventListener('click', hideModal);

  confirmStatusModal.addEventListener('click', () => {
    const newStatus = newStatusSelect.value;
    currentStatusDisplay.textContent = newStatus;
    
    // Change color based on status
    if (newStatus.includes('Offered')) currentStatusDisplay.className = "text-lg font-bold text-success mt-1";
    else if (newStatus.includes('Not')) currentStatusDisplay.className = "text-lg font-bold text-destructive mt-1";
    else currentStatusDisplay.className = "text-lg font-bold text-primary mt-1";

    hideModal();
    showToast(`Status updated to: ${newStatus}`);
  });
});
