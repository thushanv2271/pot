// Generates a clean single-page placeholder resume PDF (no dependencies).
// Replace public/Thushan-Vithana-Resume.pdf with your real resume anytime.
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const out = path.join(root, "public", "Thushan-Vithana-Resume.pdf");

const esc = (s) => s.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");

const lines = [
  ["F2", 26, "Thushan Vithana"],
  ["F1", 13, "Software Engineer - Azend Technologies"],
  ["F1", 10, "Colombo, Sri Lanka  |  thushan.v@azendtech.com  |  github.com/thushanvithana"],
  ["", 0, ""],
  ["F2", 13, "Summary"],
  ["F1", 10, "Full-stack software engineer crafting fast, elegant products with .NET, React and"],
  ["F1", 10, "Next.js - where engineering precision meets expressive, tactile interfaces."],
  ["", 0, ""],
  ["F2", 13, "Experience"],
  ["F2", 11, "Associate Software Engineer - Azend Technologies (2024 - Present)"],
  ["F1", 10, "ASP.NET Core APIs, Entity Framework data layers, React + TypeScript frontends,"],
  ["F1", 10, "Docker deployments to Azure and Fly.io; testing with xUnit and NUnit."],
  ["F2", 11, "Full-Stack Developer - Freelance & Open Source (2022 - 2024)"],
  ["F1", 10, "Delivered MERN-stack applications end to end; built Scholar, a school-management"],
  ["F1", 10, "platform on React + .NET."],
  ["", 0, ""],
  ["F2", 13, "Skills"],
  ["F1", 10, "C#, ASP.NET Core, Entity Framework, SQL Server, Azure, Docker, TypeScript,"],
  ["F1", 10, "JavaScript, React, Next.js, Node.js, MongoDB, xUnit, NUnit, Git, REST APIs"],
  ["", 0, ""],
  ["F2", 13, "Selected Projects"],
  ["F1", 10, "Scholar Web App - school-management platform (React, Material UI, C#/.NET)"],
  ["F1", 10, "MERN Stack Platform - full-stack JavaScript application"],
  ["F1", 10, "Hotel Management System - C++ design-pattern architecture exercise"],
  ["F1", 10, "Smart Task Manager - C# service layer with a JavaScript frontend"],
];

let y = 770;
let content = "BT\n";
for (const [font, size, text] of lines) {
  if (!text) {
    y -= 10;
    continue;
  }
  y -= size + 7;
  content += `/${font} ${size} Tf 1 0 0 1 60 ${y} Tm (${esc(text)}) Tj\n`;
}
content += "ET";

const objects = [
  "<< /Type /Catalog /Pages 2 0 R >>",
  "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
  "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>",
  "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
  "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>",
  `<< /Length ${content.length} >>\nstream\n${content}\nendstream`,
];

let pdf = "%PDF-1.4\n";
const offsets = [0];
objects.forEach((obj, i) => {
  offsets.push(pdf.length);
  pdf += `${i + 1} 0 obj\n${obj}\nendobj\n`;
});
const xref = pdf.length;
pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
for (let i = 1; i <= objects.length; i++) {
  pdf += `${String(offsets[i]).padStart(10, "0")} 00000 n \n`;
}
pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF\n`;

writeFileSync(out, pdf, "binary");
console.log(`✓ ${path.relative(root, out)} (${pdf.length} bytes)`);
