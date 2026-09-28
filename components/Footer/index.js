// site-footer.js

document.addEventListener('DOMContentLoaded', () => {
  // --- MOCK DATA (from @/data/portal) ---
  const university = {
    name: "Northbridge University",
    short: "NU",
    blurb: "A centre of excellence committed to advancing knowledge and transforming lives through innovative learning and research.",
    address: "Km 8 Lagos–Ibadan Expressway, Ibadan, Oyo State",
    phone: "+234 800 123 4567",
    email: "admissions@northbridge.edu.ng"
  };

  const quickLinks = [
    { label: "Verify Candidate", to: "/verify" },
    { label: "Eligibility", to: "/eligibility" },
    { label: "Programmes", to: "/" },
  ];

  const portalLinks = [
    { label: "Home", to: "/" },
    { label: "Help Centre", to: "/" },
    { label: "Privacy", to: "/" },
  ];

  // --- DOM ELEMENTS ---
  const uniShort = document.getElementById('footer-uni-short');
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
  uniShort.textContent = university.short;
  uniName.textContent = university.name;
  uniBlurb.textContent = university.blurb;

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