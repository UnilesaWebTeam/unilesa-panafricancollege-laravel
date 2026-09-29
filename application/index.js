// application/index.js
document.addEventListener('DOMContentLoaded', () => {
  window.DASHBOARD_ACTIVE_TAB = "My Application";

  const steps = [
    { title: "Personal Information", id: "step-section-0" },
    { title: "Academic Information", id: "step-section-1" },
    { title: "Next of Kin", id: "step-section-2" },
    { title: "Birth Information", id: "step-section-3" }
  ];

  let currentStep = 0;

  const btnNext = document.getElementById('btn-next');
  const btnPrev = document.getElementById('btn-previous');
  const btnSave = document.getElementById('btn-save');
  const stepTitle = document.getElementById('step-title');
  const stepSubtitle = document.getElementById('step-subtitle');
  const progressBar = document.getElementById('progress-bar-fill');
  const completionBadge = document.getElementById('completion-badge');
  const savedContainer = document.getElementById('saved-container');
  const savedText = document.getElementById('saved-text');
  
  // File upload simulation
  const btnAttachDoc = document.getElementById('btn-attach-doc');
  const birthCertFilename = document.getElementById('birth-cert-filename');

  if (btnAttachDoc) {
    btnAttachDoc.addEventListener('click', () => {
      birthCertFilename.textContent = "birth_certificate_scan.pdf";
      birthCertFilename.classList.add('text-foreground');
    });
  }

  const renderStep = () => {
    // Hide all steps
    steps.forEach((step, index) => {
      const el = document.getElementById(step.id);
      if (index === currentStep) {
        el.classList.remove('hidden');
      } else {
        el.classList.add('hidden');
      }
    });

    // Update headers
    stepTitle.textContent = steps[currentStep].title;
    stepSubtitle.textContent = `Step ${currentStep + 1} of ${steps.length} · Computer Science`;
    
    // Update progress
    const progress = ((currentStep + 1) / steps.length) * 100;
    progressBar.style.width = `${progress}%`;
    completionBadge.textContent = `${progress}% complete`;

    // Update step indicator buttons
    document.querySelectorAll('.step-btn').forEach((btn, index) => {
      if (index === currentStep) {
        btn.classList.add('active');
        btn.classList.remove('completed');
      } else if (index < currentStep) {
        btn.classList.remove('active');
        btn.classList.add('completed');
      } else {
        btn.classList.remove('active', 'completed');
      }
    });

    // Update action buttons
    btnPrev.disabled = currentStep === 0;

    if (currentStep === steps.length - 1) {
      btnNext.textContent = "Proceed to Documents";
    } else {
      btnNext.textContent = "Next";
    }
  };

  btnNext.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent form submission
    
    if (currentStep < steps.length - 1) {
      currentStep++;
      renderStep();
    } else {
      // Final step -> navigate to documents
      window.location.href = "../document/index.html";
    }
  });

  btnPrev.addEventListener('click', () => {
    if (currentStep > 0) {
      currentStep--;
      renderStep();
    }
  });

  btnSave.addEventListener('click', () => {
    savedContainer.classList.remove('hidden');
    savedText.textContent = "Draft saved successfully.";
    setTimeout(() => {
      savedContainer.classList.add('hidden');
    }, 3000);
  });

  // Pre-fill mock data
  const mockCandidate = {
    fullName: "Jane Doe",
    dob: "2006-04-18",
    gender: "Female",
    phone: "+234 801 234 5678",
    email: "jane.doe@example.com",
    stateOfOrigin: "Ogun State",
    lga: "Abeokuta South",
    address: "123 Academic Way",
    kinName: "John Doe Snr",
    kinRelationship: "Father",
    kinPhone: "+234 802 345 6789",
    kinAddress: "123 Academic Way",
    placeOfBirth: "Abeokuta",
    nationality: "Nigerian",
    maritalStatus: "Single"
  };

  Object.keys(mockCandidate).forEach(key => {
    const el = document.getElementById(key);
    if (el) {
      el.value = mockCandidate[key];
    }
  });

  // Initial render
  renderStep();
});
