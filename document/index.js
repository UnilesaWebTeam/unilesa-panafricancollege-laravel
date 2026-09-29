// documents.js

const CONFIG = {
  BASE_URL: "https://api.northbridge.edu.ng/v1", // Base URL for candidate documents API
};

// Mock required documents list matching `@/data/documents`
const requiredDocuments = [
  { key: "passport", name: "Passport Photograph", hint: "White background, max 200KB", required: true },
  { key: "olevel1", name: "O'Level Result (1st Sitting)", hint: "Clear statement of result or certificate (WAEC/NECO/NABTEB)", required: true },
  { key: "olevel2", name: "O'Level Result (2nd Sitting)", hint: "Optional. Upload if combining two results", required: false },
  { key: "jamb", name: "JAMB Result Slip", hint: "Original JAMB result with passport photo", required: true },
];

// Initial mock uploaded files
const initialUploads = {
  passport: { name: "passport-photo.jpg", previewUrl: null },
  olevel1: { name: "waec-result.pdf", previewUrl: null },
  jamb: { name: "jamb-result-slip.pdf", previewUrl: null },
};

// Page state
const state = {
  uploads: { ...initialUploads },
  notice: null,
};

function setNotice(msg) {
  state.notice = msg;
  const noticeContainer = document.getElementById("notice-container");
  const noticeText = document.getElementById("notice-text");

  if (!noticeContainer || !noticeText) return;

  if (msg) {
    noticeText.textContent = msg;
    noticeContainer.classList.remove("hidden");
  } else {
    noticeContainer.classList.add("hidden");
  }
}

function handleFile(key, name, file) {
  // Clean up previous blob preview if exists
  if (state.uploads[key]?.previewUrl) {
    URL.revokeObjectURL(state.uploads[key].previewUrl);
  }

  const previewUrl = file && file.type.startsWith("image/") ? URL.createObjectURL(file) : null;
  state.uploads[key] = { name, previewUrl };

  setNotice(`"${name}" uploaded successfully.`);
  render();
}

function pickFile(key) {
  const input = document.getElementById(`file-input-${key}`);
  if (input) input.click();
}

function removeUpload(key) {
  if (state.uploads[key]?.previewUrl) {
    URL.revokeObjectURL(state.uploads[key].previewUrl);
  }
  delete state.uploads[key];
  setNotice(null);
  render();
}

function simulateUpload(key, name) {
  handleFile(key, name, null);
}

function renderHeaderProgress() {
  const requiredDocs = requiredDocuments.filter((d) => d.required);
  const uploadedCount = requiredDocs.filter((d) => state.uploads[d.key]).length;
  const requiredCount = requiredDocs.length;
  const progressPercent = Math.round((uploadedCount / requiredCount) * 100);

  const badgeEl = document.getElementById("required-progress-badge");
  const progressFillEl = document.getElementById("progress-bar-fill");
  const progressContainerEl = document.getElementById("progress-bar-container");

  if (badgeEl) {
    badgeEl.textContent = `${uploadedCount}/${requiredCount} required uploaded`;
    badgeEl.className = `badge ${uploadedCount === requiredCount ? "badge-success" : "badge-brand"}`;
  }

  if (progressFillEl) {
    progressFillEl.style.width = `${progressPercent}%`;
  }

  if (progressContainerEl) {
    progressContainerEl.setAttribute("aria-valuenow", progressPercent.toString());
  }
}

function renderDocumentCards() {
  const container = document.getElementById("documents-grid");
  if (!container) return;

  container.innerHTML = requiredDocuments
    .map((doc) => {
      const upload = state.uploads[doc.key];
      const isUploaded = Boolean(upload);

      const reqBadgeClass = doc.required ? "badge-brand" : "badge-neutral";
      const statusBadgeClass = isUploaded ? "badge-success" : "badge-neutral";
      const dropzoneClass = isUploaded ? "upload-dropzone uploaded" : "upload-dropzone";

      let dropzoneContent = "";
      if (upload?.previewUrl) {
        dropzoneContent = `
          <img src="${upload.previewUrl}" alt="Preview of ${upload.name}" class="preview-img" />
        `;
      } else {
        dropzoneContent = `
          <span class="dropzone-icon" aria-hidden="true">${isUploaded ? "✓" : "⬆"}</span>
        `;
      }

      const fileTitle = upload ? upload.name : "Click to choose a file";
      const fileSubtext = upload
        ? "Uploaded successfully"
        : "PDF, JPG or PNG · demo only, nothing is sent anywhere";

      let actionButtonsHtml = "";
      if (isUploaded) {
        actionButtonsHtml = `
          <button type="button" class="btn btn-glass" onclick="pickFile('${doc.key}')">
            Replace
          </button>
          <button type="button" class="btn btn-ghost btn-destructive" onclick="removeUpload('${doc.key}')">
            Remove
          </button>
        `;
      } else {
        const simulatedName = `${doc.name.toLowerCase().replace(/[^a-z]+/g, "-")}.pdf`;
        actionButtonsHtml = `
          <button type="button" class="btn btn-primary" onclick="pickFile('${doc.key}')">
            Upload
          </button>
          <button type="button" class="btn btn-ghost" onclick="simulateUpload('${doc.key}', '${simulatedName}')">
            Simulate upload
          </button>
        `;
      }

      return `
        <div class="card">
          <div class="doc-card-header">
            <div>
              <p class="doc-name">${doc.name}</p>
              <p class="doc-hint">${doc.hint}</p>
            </div>
            <div class="badge-column">
              <span class="badge ${reqBadgeClass}">${doc.required ? "Required" : "Optional"}</span>
              <span class="badge ${statusBadgeClass}">${isUploaded ? "Uploaded" : "Pending"}</span>
            </div>
          </div>

          <input
            id="file-input-${doc.key}"
            type="file"
            accept="image/*,.pdf"
            class="hidden"
            aria-label="Upload ${doc.name}"
            onchange="onFileInputChange('${doc.key}', event)"
          />

          <button
            type="button"
            onclick="pickFile('${doc.key}')"
            class="${dropzoneClass}"
          >
            ${dropzoneContent}
            <span class="dropzone-text">${fileTitle}</span>
            <span class="dropzone-subtext">${fileSubtext}</span>
          </button>

          <div class="action-buttons">
            ${actionButtonsHtml}
          </div>
        </div>
      `;
    })
    .join("");
}

function onFileInputChange(key, event) {
  const file = event.target.files?.[0];
  if (!file) return;
  handleFile(key, file.name, file);
  event.target.value = "";
}

function render() {
  renderHeaderProgress();
  renderDocumentCards();
}

// Global initialization
document.addEventListener("DOMContentLoaded", () => {
  render();
});