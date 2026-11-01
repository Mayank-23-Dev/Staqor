const fs = require('fs');
const file = 'app/problems/[slug]/IDEClient.tsx';
let content = fs.readFileSync(file, 'utf8');

// Fix escaped backticks in className
content = content.replace(/className=\{\\\`/g, 'className={`');
content = content.replace(/\\\`\}/g, '`}');

// Fix escaped newlines in height calculation
content = content.replace(/split\('\\\\n'\)/g, "split('\\n')");

// Fix evaluationResult span className
content = content.replace(/className=\{\\\`ml-2/g, 'className={`ml-2');
content = content.replace(/FAILED"\}\\n                <\/span>/g, 'FAILED"}\n                </span>');

fs.writeFileSync(file, content);
