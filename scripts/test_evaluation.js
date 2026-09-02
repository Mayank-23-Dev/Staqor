// Test evaluation pipeline with incomplete code vs complete code
const { runStructuralPreFilter } = require("../lib/groq/prefilter.ts");

const incompleteTypographyCode = {
  html: `<!-- Write your HTML code here -->\n<div class="container">\n  <div class="card">\n    <h2>Typography & Font Studio</h2>\n    <p>Write your markup matching the target specifications...</p>\n  </div>\n</div>`,
  css: `/* Write your CSS styling here */\n:root {\n  --primary: #38bdf8;\n  --bg-dark: #0b0f19;\n}\n\n* {\n  box-sizing: border-box;\n}\n\nbody {\n  padding: 2rem;\n}`,
  js: `// Write your JavaScript code here\ndocument.addEventListener("DOMContentLoaded", () => {\n  // Write your interactive code here\n});`
};

console.log("Testing incomplete starter code with pre-filter...");
const result = runStructuralPreFilter(incompleteTypographyCode, {
  title: "Typography & Font Studio",
  track: "HTML & CSS",
  spec_markdown: "Build a Typography studio with font dropdown, size slider, and live preview."
});

console.log("Pre-filter result:", JSON.stringify(result, null, 2));

if (result.passed === false && result.score < 80) {
  console.log("✅ TEST PASSED: Incomplete starter code is correctly rejected with passed=false!");
} else {
  console.error("❌ TEST FAILED: Incomplete starter code was incorrectly accepted!");
  process.exit(1);
}
