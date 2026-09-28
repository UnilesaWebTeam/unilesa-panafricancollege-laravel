// site-footer.js

document.addEventListener('DOMContentLoaded', () => {
  // --- MOCK DATA (from @/data/portal) ---
  const university = {
    name: "Pan African College of Education",
    short: "NU",
    blurb: "In partnership with Unilesa, Pan African College of Education is a centre of excellence committed to advancing knowledge and transforming lives through innovative learning and research.",
    address: "Km 8 Lagos–Ibadan Expressway, Ibadan, Oyo State",
    phone: "+234 800 123 4567",
    email: "admissions@northbridge.edu.ng"
  };

  const quickLinks = [
    { label: "Verify Candidate", to: "../verify/index.html" },
    { label: "Eligibility", to: "../eligibility/index.html" },
    { label: "Programmes", to: "../landing-page/index.html" },
  ];

  const portalLinks = [
    { label: "Home", to: "../landing-page/index.html" },
    { label: "Help Centre", to: "../landing-page/index.html" },
    { label: "Privacy", to: "../landing-page/index.html" },
  ];

  // --- DOM ELEMENTS ---
  const uniName = document.getElementById('footer-uni-name');
  const uniBlurb = document.getElementById('footer-uni-blurb');
  
  const quickLinksList = document.getElementById('quick-links-list');
  
  const address = document.getElementById('footer-address');
  const phone = document.getElementById('footer-phone');
  const email = document.getElementById('footer-email');
  
  const portalLinksList = document.getElementById('portal-links-list');
  const copyright = document.getElementById('footer-copyright');

  // --- RENDER POPULATION ---
  // Brand
  if (uniName) uniName.textContent = university.name;
  if (uniBlurb) uniBlurb.textContent = university.blurb;

  // Contact
  address.textContent = university.address;
  phone.textContent = university.phone;
  email.textContent = university.email;

  // Quick Links Mapping
  quickLinksList.innerHTML = quickLinks.map(l => `
    <li>
      <a class="transition hover:text-primary" href="${l.to}">
        ${l.label}
      </a>
    </li>
  `).join('');

  // Portal Links Mapping
  portalLinksList.innerHTML = portalLinks.map(l => `
    <li>
      <a class="transition hover:text-primary" href="${l.to}">
        ${l.label}
      </a>
    </li>
  `).join('');

  // Copyright Year & Name dynamically populated
  const currentYear = new Date().getFullYear();
  copyright.textContent = `© ${currentYear} ${university.name}. All rights reserved.`;
});