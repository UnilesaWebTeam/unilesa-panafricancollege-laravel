// sysadmin.js
document.addEventListener('DOMContentLoaded', () => {
  // --- NAVIGATION ---
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: "▤" },
    { id: "candidates", label: "Candidates", icon: "👥" },
    { id: "applications", label: "Applications", icon: "▦" },
    { id: "programmes", label: "Programmes", icon: "📚" },
    { id: "users", label: "Users", icon: "🛡️" },
    { id: "payments", label: "Payments", icon: "₦" },
    { id: "admissions", label: "Admissions", icon: "🎓" },
    { id: "announcements", label: "Announcements", icon: "📢" },
    { id: "reports", label: "Reports", icon: "📊" },
    { id: "settings", label: "Settings", icon: "⚙️" },
    { id: "profile", label: "Profile", icon: "☺" },
    { id: "logout", label: "Logout", icon: "⏻", to: "../landing-page/index.html" },
  ];

  let currentTab = "dashboard";
  const navContainer = document.getElementById('sysadmin-nav');
  const topbarTitle = document.getElementById('topbar-title');
  
  const renderNav = () => {
    navContainer.innerHTML = navItems.map(item => {
      const isActive = item.id === currentTab;
      const href = item.to ? `href="${item.to}"` : `href="#" data-tab="${item.id}"`;
      return `
        <a ${href} class="nav-link flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold transition cursor-pointer ${isActive ? 'bg-primary text-white shadow-md shadow-primary/30' : 'text-foreground/60 hover:bg-white/60 hover:text-primary'}">
          <span class="w-5 text-center">${item.icon}</span> ${item.label}
        </a>
      `;
    }).join('');

    // Attach listeners
    document.querySelectorAll('.nav-link[data-tab]').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        const tab = el.getAttribute('data-tab');
        switchTab(tab);
      });
    });
  };

  const switchTab = (tabId) => {
    // We only built specific tabs for the demo
    const validTabs = ['dashboard', 'users', 'programmes', 'settings', 'announcements', 'reports'];
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

  // --- CHARTS (MOCKED CSS BARS) ---
  const renderChart = (containerId, labelsId, data) => {
    const container = document.getElementById(containerId);
    const labelsDiv = document.getElementById(labelsId);
    const maxVal = Math.max(...data.map(d => d.value));

    container.innerHTML = data.map(d => {
      const height = Math.max(5, (d.value / maxVal) * 100);
      return `<div class="chart-bar" style="height: ${height}%;" title="${d.label}: ${d.value}"><span>${d.value}</span></div>`;
    }).join('');

    labelsDiv.innerHTML = data.map(d => `<div class="chart-label flex-1 truncate px-1">${d.label}</div>`).join('');
  };

  renderChart('chart-programmes', 'chart-programmes-labels', [
    { label: "CS", value: 450 }, { label: "Med", value: 300 }, { label: "Law", value: 200 }, { label: "Eng", value: 150 }
  ]);
  renderChart('chart-status', 'chart-status-labels', [
    { label: "Submitted", value: 208 }, { label: "Review", value: 300 }, { label: "Screened", value: 600 }, { label: "Offered", value: 420 }
  ]);
  renderChart('chart-payments', 'chart-payments-labels', [
    { label: "App Fee", value: 5500000 }, { label: "Acc Fee", value: 35000000 }
  ]);
  renderChart('chart-trends', 'chart-trends-labels', [
    { label: "W1", value: 100 }, { label: "W2", value: 300 }, { label: "W3", value: 650 }, { label: "W4", value: 1245 }
  ]);


  // --- USER MANAGEMENT ---
  const users = [
    { name: "Admin Officer", email: "admin@pan.edu.ng", role: "HOD/Admin", status: "Active" },
    { name: "ICT Support", email: "ict@pan.edu.ng", role: "ICT", status: "Active" },
    { name: "Bursar Accounts", email: "finance@pan.edu.ng", role: "Bursary", status: "Active" },
    { name: "John Doe", email: "john@student.com", role: "Candidate", status: "Inactive" },
  ];
  
  const renderUsers = () => {
    document.getElementById('users-tbody').innerHTML = users.map((u, i) => `
      <tr>
        <td class="font-bold">${u.name}</td>
        <td class="text-sm">${u.email}</td>
        <td><span class="ui-badge bg-blue-100 text-blue-700">${u.role}</span></td>
        <td><span class="ui-badge ${u.status === 'Active' ? 'bg-success/20 text-success' : 'bg-destructive/20 text-destructive'}">${u.status}</span></td>
        <td class="flex gap-2">
          <button class="ui-button ui-button-glass py-1 px-2 text-xs" onclick="alert('Edit User ${u.name}')">Edit</button>
          <button class="ui-button ui-button-glass py-1 px-2 text-xs" onclick="alert('Assign Role for ${u.name}')">Role</button>
          <button class="ui-button ui-button-destructive py-1 px-2 text-xs" onclick="alert('Deactivate ${u.name}')">${u.status === 'Active' ? 'Deactivate' : 'Activate'}</button>
        </td>
      </tr>
    `).join('');
  };
  renderUsers();
  document.getElementById('btn-add-user').addEventListener('click', () => alert("Simulated: Open Add User Modal"));


  // --- PROGRAMME MANAGEMENT ---
  const programmes = [
    { name: "B.Sc. Computer Science", dept: "Computer Science", fac: "Science", minScore: 180, apps: 450, status: "Active" },
    { name: "MBBS Medicine", dept: "Medicine", fac: "Health Sciences", minScore: 250, apps: 300, status: "Active" },
    { name: "B.A. English", dept: "English", fac: "Arts", minScore: 160, apps: 120, status: "Inactive" },
  ];

  const renderProgrammes = () => {
    document.getElementById('programmes-tbody').innerHTML = programmes.map(p => `
      <tr>
        <td class="font-bold">${p.name}</td>
        <td class="text-sm">${p.dept}</td>
        <td class="text-sm">${p.fac}</td>
        <td class="font-bold text-primary">${p.minScore}</td>
        <td>${p.apps}</td>
        <td><span class="ui-badge ${p.status === 'Active' ? 'bg-success/20 text-success' : 'bg-gray-200 text-gray-700'}">${p.status}</span></td>
        <td class="flex gap-2">
          <button class="ui-button ui-button-glass py-1 px-2 text-xs" onclick="alert('Edit Programme')">Edit</button>
          <button class="ui-button ui-button-glass py-1 px-2 text-xs" onclick="alert('Toggle Status')">${p.status === 'Active' ? 'Deactivate' : 'Activate'}</button>
        </td>
      </tr>
    `).join('');
  };
  renderProgrammes();
  document.getElementById('btn-add-programme').addEventListener('click', () => alert("Simulated: Open Add Programme Modal"));


  // --- SETTINGS ---
  document.getElementById('btn-save-settings').addEventListener('click', () => {
    alert("Simulated: Settings saved successfully!");
  });

  // --- ANNOUNCEMENTS ---
  const announcements = [
    { title: "2026 Post-UTME Screening Dates", desc: "Official dates for the screening exercise have been finalized.", date: "12 Sep 2026", expiry: "30 Oct 2026", status: "Published" },
    { title: "Application Deadline Extension", desc: "The application portal will now close on 31 Oct 2026.", date: "10 Sep 2026", expiry: "31 Oct 2026", status: "Published" },
    { title: "Hostel Accommodation Note", desc: "Hostel balloting will begin immediately after admission is offered.", date: "08 Sep 2026", expiry: "31 Dec 2026", status: "Unpublished" },
  ];

  const renderAnnouncements = () => {
    document.getElementById('announcements-tbody').innerHTML = announcements.map(a => `
      <tr>
        <td class="font-bold">${a.title}</td>
        <td class="text-sm truncate max-w-xs">${a.desc}</td>
        <td class="text-sm">${a.date}</td>
        <td class="text-sm">${a.expiry}</td>
        <td><span class="ui-badge ${a.status === 'Published' ? 'bg-success/20 text-success' : 'bg-warning/20 text-warning'}">${a.status}</span></td>
        <td class="flex gap-2">
          <button class="ui-button ui-button-glass py-1 px-2 text-xs" onclick="alert('Edit Announcement')">Edit</button>
          <button class="ui-button ui-button-glass py-1 px-2 text-xs" onclick="alert('Toggle Status')">${a.status === 'Published' ? 'Unpublish' : 'Publish'}</button>
          <button class="ui-button ui-button-destructive py-1 px-2 text-xs" onclick="alert('Delete Announcement')">Delete</button>
        </td>
      </tr>
    `).join('');
  };
  if(document.getElementById('announcements-tbody')) {
    renderAnnouncements();
    document.getElementById('btn-add-announcement').addEventListener('click', () => alert("Simulated: Open Add Announcement Modal"));
  }

});
