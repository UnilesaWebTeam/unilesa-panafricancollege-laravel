const fs = require('fs');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const html = fs.readFileSync('/home/sir-p/Documents/Coding/unilesa-panafrican-college-laravel/payment/index.html', 'utf8');

const dom = new JSDOM(html, {
  url: "file:///home/sir-p/Documents/Coding/unilesa-panafrican-college-laravel/payment/index.html",
  runScripts: "dangerously",
  resources: "usable"
});

dom.window.onerror = function(msg, source, line, col, error) {
  console.log("Global Error:", msg, line, col);
};

dom.window.document.addEventListener("DOMContentLoaded", () => {
  console.log("DOMContentLoaded fired!");
  setTimeout(() => {
    console.log("detail-candidate text:", dom.window.document.getElementById('detail-candidate').textContent);
  }, 1000);
});
