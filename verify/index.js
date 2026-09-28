// verify.js

document.addEventListener('DOMContentLoaded', () => {
  // --- MOCK DATA ---
  const examinationYears = ["2024", "2023", "2022", "2021"];
  
  const mockCandidateTemplate = {
    fullName: "Jane Doe",
    institution: "Northbridge University",
    jambScore: 245,
    programme: "B.Sc. Computer Science",
    email: "jane.doe@example.com",
    phone: "+234 801 234 5678",
    stateOfOrigin: "Ogun",
    localGovernment: "Abeokuta South",
    photo: "https://api.dicebear.com/7.x/notionists/svg?seed=JaneDoe&backgroundColor=e2e8f0",
    oLevel: [
      { subject: "Mathematics", grade: "A1" },
      { subject: "English Language", grade: "B3" },
      { subject: "Physics", grade: "B2" },
      { subject: "Chemistry", grade: "C4" },
      { subject: "Biology", grade: "B3" }
    ]
  };

  // --- DOM ELEMENTS ---
  const form = document.getElementById('verify-form');
  const jambRegInput = document.getElementById('jamb-reg-input');
  const examYearSelect = document.getElementById('exam-year-select');
  const errorMsg = document.getElementById('error-message');
  const submitBtn = document.getElementById('submit-btn');

  const stateEmpty = document.getElementById('state-empty');
  const stateLoading = document.getElementById('state-loading');
  const stateVerified = document.getElementById('state-verified');

  // --- INITIALIZATION ---
  // Populate Exam Year Dropdown
  examYearSelect.innerHTML = examinationYears.map(year => 
    `<option value="${year}">${year}</option>`
  ).join('');

  // Restrict Input to Numbers
  jambRegInput.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/\D/g, "");
  });

  // --- FORM HANDLING ---
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const jambRegValue = jambRegInput.value.trim();
    const examYearValue = examYearSelect.value;
    
    // Validation
    errorMsg.classList.add('hidden');
    if (!/^\d{10}$/.test(jambRegValue)) {
      errorMsg.textContent = "Enter a valid 10-digit JAMB registration number.";
      errorMsg.classList.remove('hidden');
      return;
    }

    // Set Loading State
    stateEmpty.classList.add('hidden');
    stateVerified.classList.add('hidden');
    stateLoading.classList.remove('hidden');
    submitBtn.disabled = true;
    submitBtn.textContent = "Verifying…";

    // Simulate API Call
    setTimeout(() => {
      // Generate result
      const verifiedResult = {
        ...mockCandidateTemplate,
        jambReg: jambRegValue,
        examinationYear: examYearValue
      };

      // Populate UI with result
      document.getElementById('result-photo').src = verifiedResult.photo;
      document.getElementById('result-name').textContent = verifiedResult.fullName;
      document.getElementById('result-jamb-details').textContent = `JAMB Reg: ${verifiedResult.jambReg} · ${verifiedResult.examinationYear}`;
      document.getElementById('result-institution').textContent = verifiedResult.institution;
      
      document.getElementById('result-score').textContent = verifiedResult.jambScore;
      document.getElementById('result-programme').textContent = verifiedResult.programme;
      document.getElementById('result-email').textContent = verifiedResult.email;
      document.getElementById('result-phone').textContent = verifiedResult.phone;
      document.getElementById('result-state').textContent = verifiedResult.stateOfOrigin;
      document.getElementById('result-lga').textContent = verifiedResult.localGovernment;

      document.getElementById('result-olevel-list').innerHTML = verifiedResult.oLevel.map(row => `
        <li class="frost flex items-center justify-between rounded-xl border border-white/50 bg-white/40 px-3 py-2 text-sm">
          <span class="text-foreground/70">${row.subject}</span>
          <span class="ui-badge ui-badge-neutral">${row.grade}</span>
        </li>
      `).join('');

      // Update State
      stateLoading.classList.add('hidden');
      stateVerified.classList.remove('hidden');
      submitBtn.disabled = false;
      submitBtn.textContent = "Verify Candidate";

    }, 900);
  });
});