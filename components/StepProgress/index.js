// step-progress.js

document.addEventListener('DOMContentLoaded', () => {
  // --- MOCK DATA ---
  const applicationSteps = [
    { key: "verification", label: "Verification" },
    { key: "eligibility", label: "Eligibility" },
    { key: "payment", label: "Payment" },
    { key: "payment_status", label: "Payment Status" },
    { key: "application", label: "Application" },
    { key: "documents", label: "Documents" },
    { key: "review", label: "Review" },
    { key: "submission", label: "Submission" }
  ];

  const stepRoute = {
    verification: "../verify/index.html",
    eligibility: "../eligibility/index.html",
    payment: "../payment/index.html",
    payment_status: "../payment-status/index.html",
    application: "../application/index.html",
    documents: "../document/index.html",
    review: "../review/index.html",
    submission: "../submission/index.html",
  };

  // --- DOM ELEMENTS ---
  const stepListContainer = document.getElementById('step-progress-list');

  // --- RENDER LOGIC ---
  // Determine current step from URL path
  const currentPath = window.location.pathname;
  let currentStepKey = "verification";
  if (currentPath.includes('eligibility')) currentStepKey = "eligibility";
  else if (currentPath.includes('payment-status')) currentStepKey = "payment_status";
  else if (currentPath.includes('payment')) currentStepKey = "payment";
  else if (currentPath.includes('application')) currentStepKey = "application";
  else if (currentPath.includes('document')) currentStepKey = "documents";
  else if (currentPath.includes('review')) currentStepKey = "review";
  else if (currentPath.includes('submission') || currentPath.includes('screening-slip')) currentStepKey = "submission";

  // Fallback to window.CURRENT_STEP if provided manually
  if (window.CURRENT_STEP) currentStepKey = window.CURRENT_STEP;

  const currentIndex = applicationSteps.findIndex(s => s.key === currentStepKey);

  const html = applicationSteps.map((step, i) => {
    const done = i < currentIndex;
    const active = i === currentIndex;
    
    // Determine outer link styling
    let linkClasses = "flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold transition ";
    if (active) {
      linkClasses += "bg-primary text-primary-foreground shadow-brand";
    } else if (done) {
      linkClasses += "bg-primary/10 text-primary";
    } else {
      linkClasses += "bg-foreground/5 text-foreground/40";
    }

    // Determine inner number/icon styling
    let iconClasses = "grid h-5 w-5 place-items-center rounded-full text-[10px] font-bold ";
    if (active) {
      iconClasses += "bg-white/25";
    } else if (done) {
      iconClasses += "bg-primary/20";
    } else {
      iconClasses += "bg-foreground/10";
    }

    const iconContent = done ? "✓" : (i + 1);
    const destination = stepRoute[step.key] || "/verify";

    // Connector line logic
    let connectorHtml = "";
    if (i < applicationSteps.length - 1) {
      const connectorColor = done ? "bg-primary/40" : "bg-foreground/10";
      connectorHtml = `<span class="mx-1 hidden h-px w-6 sm:block sm:w-8 ${connectorColor}"></span>`;
    }

    return `
      <li class="flex items-center shrink-0">
        <a href="${destination}" class="${linkClasses}">
          <span class="${iconClasses}">
            ${iconContent}
          </span>
          ${step.label}
        </a>
        ${connectorHtml}
      </li>
    `;
  }).join('');

  // Inject into DOM
  stepListContainer.innerHTML = html;
});