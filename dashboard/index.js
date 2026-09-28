// application.js

const CONFIG = {
  BASE_URL: "https://api.northbridge.edu.ng/v1", // Config base URL
};

// Mock data as supplied in candidate store
const mockCandidate = {
  fullName: "Adebayo Olawale Johnson",
  phone: "+234 803 123 4567",
  email: "a.johnson@example.com",
  stateOfOrigin: "Ogun State",
  localGovernment: "Abeokuta South",
  programme: "Computer Science",
  jambReg: "202490012345EF",
  jambScore: 278,
  examinationYear: "2024",
  oLevel: [
    { subject: "Mathematics", grade: "A1" },
    { subject: "English Language", grade: "B2" },
    { subject: "Physics", grade: "B3" },
    { subject: "Chemistry", grade: "B2" },
    { subject: "Biology", grade: "A1" },
  ],
};

const sections = [
  "Personal Information",
  "Academic Information",
  "Next of Kin",
  "Birth Information",
];

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[+0-9][0-9\s-]{8,}$/;

// Application State
const state = {
  step: 0,
  savedMessage: null,
  errors: {},
  form: {
    fullName: mockCandidate.fullName,
    dob: "2006-04-18",
    gender: "Male",
    phone: mockCandidate.phone,
    email: mockCandidate.email,
    stateOfOrigin: mockCandidate.stateOfOrigin,
    lga: mockCandidate.localGovernment,
    address: "14 Ijaiye Road, Abeokuta, Ogun State",
    kinName: "Adebola Johnson",
    kinRelationship: "Father",
    kinPhone: "+234 802 444 0117",
    kinAddress: "14 Ijaiye Road, Abeokuta, Ogun State",
    placeOfBirth: "Abeokuta, Ogun State",
    nationality: "Nigerian",
    religion: "Christianity",
    maritalStatus: "Single",
    birthCertificate: "",
  },
};

// Validation Logic
function validate(step, form) {
  const e = {};
  if (step === 0) {
    if (!form.fullName.trim()) e.fullName = "Full name is required.";
    else if (form.fullName.trim().length < 5)
      e.fullName = "Enter your full name as it appears on JAMB.";
    if (!form.dob) e.dob = "Date of birth is required.";
    if (!form.gender) e.gender = "Select your gender.";
    if (!form.phone.trim()) e.phone = "Phone number is required.";
    else if (!phonePattern.test(form.phone.trim()))
      e.phone = "Enter a valid phone number.";
    if (!form.email.trim()) e.email = "Email address is required.";
    else if (!emailPattern.test(form.email.trim()))
      e.email = "Enter a valid email address.";
    if (!form.stateOfOrigin.trim())
      e.stateOfOrigin = "State of origin is required.";
    if (!form.lga.trim()) e.lga = "Local government is required.";
    if (form.address.trim().length < 10)
      e.address = "Enter your full home address.";
  }
  if (step === 2) {
    if (!form.kinName.trim()) e.kinName = "Next of kin name is required.";
    if (!form.kinRelationship) e.kinRelationship = "Select a relationship.";
    if (!form.kinPhone.trim()) e.kinPhone = "Phone number is required.";
    else if (!phonePattern.test(form.kinPhone.trim()))
      e.kinPhone = "Enter a valid phone number.";
    if (form.kinAddress.trim().length < 10)
      e.kinAddress = "Enter the full address.";
  }
  if (step === 3) {
    if (!form.placeOfBirth.trim())
      e.placeOfBirth = "Place of birth is required.";
    if (!form.nationality.trim()) e.nationality = "Nationality is required.";
    if (!form.maritalStatus) e.maritalStatus = "Select your marital status.";
    if (!form.birthCertificate)
      e.birthCertificate = "Attach your birth certificate or age declaration.";
  }
  return e;
}

// Set form field value
function setFieldValue(key, value) {
  state.form[key] = value;
  state.errors[key] = undefined;
  state.savedMessage = null;
  renderErrors();
  renderSavedAlert();
}

// Navigation Actions
function nextStep() {
  const e = validate(state.step, state.form);
  state.errors = e;
  if (Object.keys(e).length > 0) {
    render();
    return;
  }
  state.savedMessage = null;
  state.step = Math.min(state.step + 1, sections.length - 1);
  render();
}

function prevStep() {
  state.errors = {};
  state.savedMessage = null;
  state.step = Math.max(state.step - 1, 0);
  render();
}

function saveAndContinue() {
  const e = validate(state.step, state.form);
  state.errors = e;
  if (Object.keys(e).length > 0) {
    render();
    return;
  }
  state.savedMessage = `${sections[state.step] || "Section"} saved locally (demo only).`;
  if (state.step < sections.length - 1) {
    state.step += 1;
  }
  render();
}

// Render Functions
function renderHeader() {
  const titleEl = document.getElementById("step-title");
  const subtitleEl = document.getElementById("step-subtitle");
  const badgeEl = document.getElementById("completion-badge");
  const progressFill = document.getElementById("progress-bar-fill");

  const percent = Math.round(((state.step + 1) / sections.length) * 100);

  if (titleEl) titleEl.textContent = sections[state.step] || "";
  if (subtitleEl)
    subtitleEl.textContent = `Step ${state.step + 1} of ${sections.length} · ${mockCandidate.programme}`;
  if (badgeEl) badgeEl.textContent = `${percent}% complete`;
  if (progressFill) progressFill.style.width = `${percent}%`;

  // Render Step Nav Buttons
  const navContainer = document.getElementById("step-navigation");
  if (navContainer) {
    navContainer.innerHTML = sections
      .map((label, i) => {
        const isActive = i === state.step;
        const isCompleted = i < state.step;
        let className = "step-btn";
        if (isActive) className += " active";
        else if (isCompleted) className += " completed";

        return `
        <li>
          <button type="button" class="${className}" data-step="${i}">
            <span class="step-num">${isCompleted ? "✓" : i + 1}</span>
            ${label}
          </button>
        </li>
      `;
      })
      .join("");

    navContainer.querySelectorAll("button").forEach((btn) => {
      btn.addEventListener("click", () => {
        const targetStep = parseInt(btn.getAttribute("data-step"), 10);
        state.errors = {};
        state.step = targetStep;
        render();
      });
    });
  }
}

function renderFormInputs() {
  // Bind current form values to inputs
  Object.keys(state.form).forEach((key) => {
    const el = document.getElementById(key);
    if (el) {
      el.value = state.form[key];
    }
  });

  const birthCertText = document.getElementById("birth-cert-filename");
  if (birthCertText) {
    birthCertText.textContent =
      state.form.birthCertificate ||
      "No file attached (PDF or JPG, max 2MB)";
  }
}

function renderAcademicSection() {
  // Populate static/dynamic academic information for Step 1
  const jambReg = document.getElementById("info-jambReg");
  const jambScore = document.getElementById("info-jambScore");
  const examYear = document.getElementById("info-examYear");
  const programme = document.getElementById("info-programme");
  const olevelBody = document.getElementById("olevel-table-body");

  if (jambReg) jambReg.textContent = mockCandidate.jambReg;
  if (jambScore) jambScore.textContent = `${mockCandidate.jambScore} / 400`;
  if (examYear) examYear.textContent = mockCandidate.examinationYear;
  if (programme) programme.textContent = mockCandidate.programme;

  if (olevelBody) {
    olevelBody.innerHTML = mockCandidate.oLevel
      .map(
        (row) => `
      <tr>
        <td>${row.subject}</td>
        <td class="grade-text">${row.grade}</td>
      </tr>
    `
      )
      .join("");
  }
}

function renderStepVisibility() {
  // Toggle visibility of step sections
  for (let i = 0; i < sections.length; i++) {
    const sec = document.getElementById(`step-section-${i}`);
    if (sec) {
      if (i === state.step) {
        sec.classList.remove("hidden");
      } else {
        sec.classList.add("hidden");
      }
    }
  }

  // Toggle buttons
  const prevBtn = document.getElementById("btn-previous");
  const nextBtn = document.getElementById("btn-next");
  const dashboardLink = document.getElementById("btn-dashboard");

  if (prevBtn) prevBtn.disabled = state.step === 0;

  if (state.step < sections.length - 1) {
    if (nextBtn) nextBtn.classList.remove("hidden");
    if (dashboardLink) dashboardLink.classList.add("hidden");
  } else {
    if (nextBtn) nextBtn.classList.add("hidden");
    if (dashboardLink) dashboardLink.classList.remove("hidden");
  }
}

function renderErrors() {
  const hasErrors = Object.values(state.errors).some(Boolean);
  const alertContainer = document.getElementById("alert-container");

  if (alertContainer) {
    if (hasErrors) {
      alertContainer.classList.remove("hidden");
    } else {
      alertContainer.classList.add("hidden");
    }
  }

  // Update error message text fields
  const fieldKeys = [
    "fullName",
    "dob",
    "gender",
    "phone",
    "email",
    "stateOfOrigin",
    "lga",
    "address",
    "kinName",
    "kinRelationship",
    "kinPhone",
    "kinAddress",
    "placeOfBirth",
    "nationality",
    "maritalStatus",
    "birthCertificate",
  ];

  fieldKeys.forEach((key) => {
    const errEl = document.getElementById(`error-${key}`);
    if (errEl) {
      if (state.errors[key]) {
        errEl.textContent = state.errors[key];
        errEl.classList.remove("hidden");
      } else {
        errEl.textContent = "";
        errEl.classList.add("hidden");
      }
    }
  });
}

function renderSavedAlert() {
  const savedContainer = document.getElementById("saved-container");
  const savedText = document.getElementById("saved-text");

  if (savedContainer && savedText) {
    if (state.savedMessage) {
      savedText.textContent = state.savedMessage;
      savedContainer.classList.remove("hidden");
    } else {
      savedContainer.classList.add("hidden");
    }
  }
}

function render() {
  renderHeader();
  renderStepVisibility();
  renderFormInputs();
  renderAcademicSection();
  renderErrors();
  renderSavedAlert();
}

// Event Listeners Initialization
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("application-form");
  if (form) {
    form.addEventListener("submit", (ev) => {
      ev.preventDefault();
      nextStep();
    });
  }

  // Bind Input Change Handlers
  const bindInput = (id, key) => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener("input", (e) => setFieldValue(key, e.target.value));
      el.addEventListener("change", (e) => setFieldValue(key, e.target.value));
    }
  };

  bindInput("fullName", "fullName");
  bindInput("dob", "dob");
  bindInput("gender", "gender");
  bindInput("phone", "phone");
  bindInput("email", "email");
  bindInput("stateOfOrigin", "stateOfOrigin");
  bindInput("lga", "lga");
  bindInput("address", "address");
  bindInput("kinName", "kinName");
  bindInput("kinRelationship", "kinRelationship");
  bindInput("kinPhone", "kinPhone");
  bindInput("kinAddress", "kinAddress");
  bindInput("placeOfBirth", "placeOfBirth");
  bindInput("nationality", "nationality");
  bindInput("religion", "religion");
  bindInput("maritalStatus", "maritalStatus");

  // Attachment button click demo handler
  const attachBtn = document.getElementById("btn-attach-doc");
  if (attachBtn) {
    attachBtn.addEventListener("click", () => {
      setFieldValue("birthCertificate", "birth-certificate.pdf");
    });
  }

  // Action Buttons
  const prevBtn = document.getElementById("btn-previous");
  if (prevBtn) {
    prevBtn.addEventListener("click", prevStep);
  }

  const saveBtn = document.getElementById("btn-save");
  if (saveBtn) {
    saveBtn.addEventListener("click", saveAndContinue);
  }

  // Initial Render
  render();
});