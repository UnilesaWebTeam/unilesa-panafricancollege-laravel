// eligibility.js

document.addEventListener('DOMContentLoaded', () => {
  // --- MOCK DATA ---
  // Representing the imported `mockCandidate` object
  const mockCandidate = {
    fullName: 'Jane Doe',
    programme: 'B.Sc. Computer Science',
    jambScore: 245,
    requiredScore: 200,
    jambReg: '202512345678DF',
    eligible: true // Change this to false to test the ineligible state
  };

  const eligible = mockCandidate.eligible;

  // --- DOM ELEMENTS ---
  const badgeEl = document.getElementById('eligibility-badge');
  const alertEligible = document.getElementById('alert-eligible');
  const alertIneligible = document.getElementById('alert-ineligible');
  const detailsContainer = document.getElementById('candidate-details');
  const scoreBreakdownContainer = document.getElementById('score-breakdown-container');
  const proceedBtn = document.getElementById('proceed-btn');

  // --- RENDER ELIGIBILITY STATE ---
  if (eligible) {
    badgeEl.textContent = 'Eligible';
    badgeEl.className = 'ui-badge ui-badge-success';
    alertEligible.classList.remove('hidden');
    proceedBtn.classList.remove('disabled');
    proceedBtn.removeAttribute('aria-disabled');
    proceedBtn.href = '../payment/index.html';
  } else {
    badgeEl.textContent = 'Not Eligible';
    badgeEl.className = 'ui-badge ui-badge-neutral';
    alertIneligible.classList.remove('hidden');
    proceedBtn.classList.add('disabled');
    proceedBtn.setAttribute('aria-disabled', 'true');
    proceedBtn.href = '#'; // Disable navigation
  }

  // --- RENDER DETAILS LIST (<dl>) ---
  const detailsData = [
    { label: 'Candidate', value: mockCandidate.fullName },
    { label: 'Programme', value: mockCandidate.programme },
    { label: 'JAMB Score', value: mockCandidate.jambScore.toString() },
    { label: 'Required Minimum Score', value: mockCandidate.requiredScore.toString() },
    { label: 'JAMB Reg', value: mockCandidate.jambReg },
    { label: 'Eligibility', value: eligible ? 'Eligible' : 'Not Eligible' }
  ];

  detailsContainer.innerHTML = detailsData.map(item => `
    <div>
      <dt class="text-xs font-semibold text-foreground/40">${item.label}</dt>
      <dd class="mt-1 text-sm font-medium text-foreground/80">${item.value}</dd>
    </div>
  `).join('');


  // --- RENDER SCORE BREAKDOWN & BARS ---
  const renderScoreBar = (label, value, max, isBrand) => {
    const pct = Math.min(100, Math.round((value / max) * 100));
    const barColorClass = isBrand ? 'bg-primary' : 'bg-foreground/30';
    
    return `
      <div>
        <div class="flex items-center justify-between text-xs font-semibold text-foreground/60">
          <span>${label}</span>
          <span>${value}</span>
        </div>
        <div class="mt-2 h-2.5 overflow-hidden rounded-full bg-foreground/10">
          <div class="h-full rounded-full ${barColorClass}" style="width: ${pct}%"></div>
        </div>
      </div>
    `;
  };

  const marginScore = mockCandidate.jambScore - mockCandidate.requiredScore;
  const marginPrefix = marginScore >= 0 ? '+' : '';

  scoreBreakdownContainer.innerHTML = `
    ${renderScoreBar('Your JAMB Score', mockCandidate.jambScore, 400, true)}
    ${renderScoreBar('Required Minimum', mockCandidate.requiredScore, 400, false)}
    <div class="frost rounded-xl border border-white/50 bg-white/40 p-4 text-sm mt-4">
      <p class="font-semibold text-foreground/80">
        Margin: ${marginPrefix}${marginScore}
      </p>
      <p class="mt-1 text-xs text-foreground/50">
        You scored ${Math.abs(marginScore)} points ${marginScore >= 0 ? 'above' : 'below'} the cut-off for ${mockCandidate.programme}.
      </p>
    </div>
  `;
});