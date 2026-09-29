// admin-dashboard.js
document.addEventListener('DOMContentLoaded', () => {
  const adminNavItems = [
    { label: "Dashboard", to: "#", active: true },
    { label: "Candidates", to: "#" },
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

  const candidates = [
    { name: "John Doe", jamb: "2026112233AA", prog: "Computer Science", score: 250, elig: "Eligible", status: "Submitted", date: "12 Sep 2026" },
    { name: "Jane Smith", jamb: "2026445566BB", prog: "Medicine", score: 280, elig: "Eligible", status: "Under Review", date: "11 Sep 2026" },
    { name: "Michael Johnson", jamb: "2026778899CC", prog: "Accounting", score: 210, elig: "Pending", status: "Incomplete", date: "10 Sep 2026" },
    { name: "Sarah Williams", jamb: "2026990011DD", prog: "Law", score: 245, elig: "Eligible", status: "Screening Completed", date: "09 Sep 2026" },
    { name: "David Brown", jamb: "2026223344EE", prog: "Engineering", score: 180, elig: "Not Eligible", status: "Declined", date: "08 Sep 2026" }
  ];

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Submitted': return '<span class="inline-flex items-center rounded-full bg-blue-100 px-2 py-0.5 text-xs font-semibold text-blue-700">Submitted</span>';
      case 'Under Review': return '<span class="inline-flex items-center rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-semibold text-yellow-700">Under Review</span>';
      case 'Incomplete': return '<span class="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs font-semibold text-gray-700">Incomplete</span>';
      case 'Screening Completed': return '<span class="inline-flex items-center rounded-full bg-purple-100 px-2 py-0.5 text-xs font-semibold text-purple-700">Screening Done</span>';
      case 'Declined': return '<span class="inline-flex items-center rounded-full bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-700">Declined</span>';
      default: return `<span>${status}</span>`;
    }
  };

  const getEligBadge = (elig) => {
    if(elig === 'Eligible') return '<span class="text-success font-bold">Yes</span>';
    if(elig === 'Not Eligible') return '<span class="text-destructive font-bold">No</span>';
    return '<span class="text-warning font-bold">Pending</span>';
  };

  const tbody = document.getElementById('candidate-tbody');
  tbody.innerHTML = candidates.map(c => `
    <tr>
      <td class="font-semibold">${c.name}</td>
      <td class="text-sm font-mono">${c.jamb}</td>
      <td>${c.prog}</td>
      <td class="font-bold">${c.score}</td>
      <td>${getEligBadge(c.elig)}</td>
      <td>${getStatusBadge(c.status)}</td>
      <td class="text-xs">${c.date}</td>
      <td>
        <a href="../admin-candidate/index.html" class="ui-button ui-button-primary" style="padding: 0.25rem 0.75rem; font-size: 0.75rem;">View</a>
      </td>
    </tr>
  `).join('');
});
