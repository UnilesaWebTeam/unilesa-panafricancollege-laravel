// dashboard.js
document.addEventListener('DOMContentLoaded', () => {
  window.DASHBOARD_ACTIVE_TAB = "Dashboard";

  // Display published announcements
  const announcements = [
    { title: "2026 Post-UTME Screening Dates", desc: "Official dates for the screening exercise have been finalized. Please ensure you print your screening slip before October 15th.", date: "12 Sep 2026" },
    { title: "Application Deadline Extension", desc: "The application portal will now close on 31 Oct 2026. Late applications will not be entertained.", date: "10 Sep 2026" },
  ];

  const container = document.getElementById('announcements-container');
  if (container) {
    if (announcements.length === 0) {
      container.innerHTML = `<p class="text-sm text-foreground/50 italic">No new announcements.</p>`;
    } else {
      container.innerHTML = announcements.map(a => `
        <div class="announcement-card">
          <div class="flex justify-between items-start mb-1">
            <h3 class="font-bold text-foreground">${a.title}</h3>
            <span class="text-xs font-semibold text-primary/70">${a.date}</span>
          </div>
          <p class="text-sm text-foreground/80">${a.desc}</p>
        </div>
      `).join('');
    }
  }
});