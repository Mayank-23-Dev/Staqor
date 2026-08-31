import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const problems = [
    {
      title: "Interactive Counter",
      slug: "interactive-counter",
      difficulty: "Easy",
      topic: "JavaScript DOM",
      category: "HTML & CSS",
      acceptance_rate: 85.5,
      description: "Create a simple interactive counter. The UI has a number displaying the current count (starting at 0), and two buttons: 'Increment' and 'Decrement'. Write the JavaScript to make the buttons update the count.",
      starter_code: {
        html: `<div class="counter-box">\n  <h1 id="count">0</h1>\n  <button id="decrementBtn">Decrement</button>\n  <button id="incrementBtn">Increment</button>\n</div>`,
        css: `.counter-box { text-align: center; font-family: sans-serif; padding: 2rem; }\nbutton { margin: 0.5rem; padding: 0.5rem 1rem; cursor: pointer; }`,
        js: `// Get DOM elements\nconst countEl = document.getElementById('count');\nconst decBtn = document.getElementById('decrementBtn');\nconst incBtn = document.getElementById('incrementBtn');\n\n// Write your logic here\n`
      }
    },
    {
      title: "Toggle Dark Mode",
      slug: "toggle-dark-mode",
      difficulty: "Medium",
      topic: "JavaScript DOM",
      category: "HTML & CSS",
      acceptance_rate: 72.3,
      description: "Implement a dark mode toggle. When the button is clicked, toggle the 'dark' class on the body element. The HTML and CSS are already provided.",
      starter_code: {
        html: `<body>\n  <h1>Welcome to my site</h1>\n  <button id="themeToggle">Toggle Theme</button>\n</body>`,
        css: `body { background: white; color: black; transition: 0.3s; }\nbody.dark { background: #1a1a1a; color: white; }\nbutton { padding: 10px; }`,
        js: `// Implement the theme toggle logic\nconst btn = document.getElementById('themeToggle');\n`
      }
    }
  ];

  for (const prob of problems) {
    await supabase.from('problems').upsert(prob, { onConflict: 'slug' });
  }
  
  return NextResponse.json({ success: true });
}
