const fs = require('fs');

let jsCode = fs.readFileSync('payment/index.js', 'utf8');

if (!jsCode.includes('try {')) {
  jsCode = jsCode.replace("// Removed DOMContentLoaded wrapper", 
  "// Removed DOMContentLoaded wrapper try {");
  
  jsCode = jsCode.replace("});", 
  "} catch(e) { document.body.innerHTML = '<div style=\"padding:20px; color:red; font-size:24px;\">ERROR: ' + e.message + '<br>' + e.stack + '</div>'; } 
// End of file
