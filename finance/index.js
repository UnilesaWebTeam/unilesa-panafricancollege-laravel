// finance.js
document.addEventListener('DOMContentLoaded', () => {
  // --- NAVIGATION ---
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: "▤" },
    { id: "transactions", label: "Transactions", icon: "₦" },
    { id: "app_fees", label: "Application Fees", icon: "▦" },
    { id: "acc_fees", label: "Acceptance Fees", icon: "🎓" },
    { id: "reports", label: "Payment Reports", icon: "📊" },
    { id: "profile", label: "Profile", icon: "☺" },
    { id: "logout", label: "Logout", icon: "⏻", to: "../landing-page/index.html" },
  ];

  let currentTab = "dashboard";
  const navContainer = document.getElementById('finance-nav');
  const topbarTitle = document.getElementById('topbar-title');
  
  const renderNav = () => {
    navContainer.innerHTML = navItems.map(item => {
      const isActive = item.id === currentTab;
      const href = item.to ? `href="${item.to}"` : `href="#" data-tab="${item.id}"`;
      return `
        <a ${href} class="nav-link flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold transition cursor-pointer ${isActive ? 'bg-success text-white shadow-md shadow-success/30' : 'text-foreground/60 hover:bg-white/60 hover:text-success'}">
          <span class="w-5 text-center">${item.icon}</span> ${item.label}
        </a>
      `;
    }).join('');

    document.querySelectorAll('.nav-link[data-tab]').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        const tab = el.getAttribute('data-tab');
        switchTab(tab);
      });
    });
  };

  const switchTab = (tabId) => {
    const validTabs = ['dashboard', 'transactions'];
    if (validTabs.includes(tabId)) {
      currentTab = tabId;
      document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
      document.getElementById(`tab-${tabId}`).classList.add('active');
      const item = navItems.find(i => i.id === tabId);
      topbarTitle.textContent = item.label;
      renderNav();
    } else {
      alert(`Simulated navigation to ${tabId} interface.`);
    }
  };

  renderNav();

  // --- TRANSACTIONS ---
  const transactions = [
    { name: "John Doe", jamb: "2026112233AA", type: "Post-UTME Application Fee", amount: "₦5,000", ref: "POSTUTME-001245", date: "12 Sep 2026", status: "Successful" },
    { name: "Jane Smith", jamb: "2026445566BB", type: "Acceptance Fee", amount: "₦100,000", ref: "PAC-AFEE-492812", date: "11 Sep 2026", status: "Successful" },
    { name: "Michael Johnson", jamb: "2026778899CC", type: "Post-UTME Application Fee", amount: "₦5,000", ref: "POSTUTME-001300", date: "10 Sep 2026", status: "Pending" },
    { name: "Sarah Williams", jamb: "2026990011DD", type: "Acceptance Fee", amount: "₦100,000", ref: "PAC-AFEE-492999", date: "09 Sep 2026", status: "Failed" },
    { name: "David Brown", jamb: "2026223344EE", type: "Post-UTME Application Fee", amount: "₦5,000", ref: "POSTUTME-001405", date: "08 Sep 2026", status: "Successful" }
  ];

  const getStatusBadge = (status) => {
    if (status === "Successful") return '<span class="inline-flex items-center rounded-full bg-success/20 px-2 py-0.5 text-xs font-semibold text-success">Successful</span>';
    if (status === "Pending") return '<span class="inline-flex items-center rounded-full bg-warning/20 px-2 py-0.5 text-xs font-semibold text-warning">Pending</span>';
    return '<span class="inline-flex items-center rounded-full bg-destructive/20 px-2 py-0.5 text-xs font-semibold text-destructive">Failed</span>';
  };

  window.openModal = (index) => {
    const tx = transactions[index];
    document.getElementById('modal-name').textContent = tx.name;
    document.getElementById('modal-jamb').textContent = tx.jamb;
    document.getElementById('modal-type').textContent = tx.type;
    document.getElementById('modal-amount').textContent = tx.amount;
    document.getElementById('modal-ref').textContent = tx.ref;
    document.getElementById('modal-date').textContent = tx.date;
    
    const statusText = document.getElementById('modal-status-text');
    const statusIcon = document.getElementById('modal-status-icon');
    
    statusText.textContent = `Payment ${tx.status}`;
    if (tx.status === "Successful") {
      statusText.className = "text-sm font-bold uppercase tracking-wider text-success";
      statusIcon.className = "inline-block text-4xl mb-2 text-success";
      statusIcon.textContent = "✓";
    } else if (tx.status === "Failed") {
      statusText.className = "text-sm font-bold uppercase tracking-wider text-destructive";
      statusIcon.className = "inline-block text-4xl mb-2 text-destructive";
      statusIcon.textContent = "✕";
    } else {
      statusText.className = "text-sm font-bold uppercase tracking-wider text-warning";
      statusIcon.className = "inline-block text-4xl mb-2 text-warning";
      statusIcon.textContent = "○";
    }

    document.getElementById('payment-modal').classList.remove('hidden');
  };

  const renderTransactions = () => {
    const tbody = document.getElementById('transactions-tbody');
    tbody.innerHTML = transactions.map((t, i) => `
      <tr>
        <td class="font-bold">${t.name}</td>
        <td class="text-xs font-mono">${t.jamb}</td>
        <td class="text-sm">${t.type}</td>
        <td class="font-bold text-success">${t.amount}</td>
        <td class="text-xs font-mono">${t.ref}</td>
        <td class="text-sm">${t.date}</td>
        <td>${getStatusBadge(t.status)}</td>
        <td>
          <button class="ui-button ui-button-glass py-1 px-3 text-xs" onclick="openModal(${i})">View</button>
        </td>
      </tr>
    `).join('');
  };

  renderTransactions();

  // Modal close
  document.getElementById('close-payment-modal').addEventListener('click', () => {
    document.getElementById('payment-modal').classList.add('hidden');
  });

  // Print Receipt
  document.getElementById('btn-print-receipt').addEventListener('click', () => {
    window.print();
  });
});
