// Vercel Serverless Function: 24/7 n8n Webhook Router + Google Gemini AI Engine
const SYSTEM_PROMPT = `You are the official AI Portfolio Assistant for Adrian Justin J. San Diego, an Automation & Software Developer specializing in Workflow & API Engineering (n8n), Full-Stack Web Development (PHP, JavaScript, MySQL), and LLM Integrations based in Rizal, Philippines (Open to Remote WFH Worldwide).

KEY RESUME FACTS ABOUT ADRIAN:
1. Contact & Location:
- Full Name: Adrian Justin J. San Diego
- Location: Rizal, Philippines (Taytay, Rizal) — Available for Remote (WFH) Worldwide
- Phone: (+63) 918-743-6765
- Email: adrian002bca@gmail.com
- LinkedIn: https://linkedin.com/in/adrian-justin-san-diego
- GitHub: https://github.com/adrian002bca-prog
- Live Portfolio: https://adrian-sandiego.vercel.app
- 1-Page ATS Resume PDF: https://adrian-sandiego.vercel.app/resume.pdf

2. Education & Certifications:
- Bachelor of Science in Information Systems (BSIS) — Trent Information First Technical Career Institute, Taytay, Rizal (Graduated: May 2026)
- Awards: Outstanding / Best Capstone Award (QRYPT System) & Academic Loyalty Award
- Certification: Computer Systems Servicing NC II — TESDA, 2024

3. Professional Work Experience:
- Junior Automation & Technical Operations Specialist (Contract) | EdTech & Career Accelerator Startup | Remote (WFH) | August 2026 – Present:
  * Engineered, upgraded, and actively maintain 25+ production automated workflows and scrapers on self-hosted n8n on Hostinger running on recurring 2–3 hour cycles.
  * Resolved live Cloudflare 403 blocks, HTTP 406/429 errors, and DNS failures; built REST API integrations (xAI Grok LLM, Google Sheets batchUpdate, Kit API).
  * Authored custom JavaScript Code nodes with O(1) in-memory Set() and multi-field fingerprint deduplication, guaranteeing 0 duplicates.
  * Audited and restored 5 stale ingestion pipelines backfilling 1,300+ rows across Google Sheets.
  * Closed 50+ technical tickets in an agile Jira Kanban sprint delivery framework.
- IT Systems & Support Developer | Apptrade Inc. | Taytay, Rizal, Philippines | May 2026 – August 2026:
  * Developed and maintained full-stack locally hosted PHP & MySQL Point-of-Sale (POS) and inventory systems deployed on-site via XAMPP, plus online e-commerce platform.
  * Built barcode scanning, cart/checkout workflows, receipt printing, dynamic discounts, and MySQL relational schemas.
- IT Intern – Web & System Developer | Optimum Brands Inc. (OBI) | Pasig City, Philippines | January 2026 – March 2026:
  * Engineered the interactive browser-based OBI Room Visualizer (deployed live on official obiasia.com), Quotation System, and Payment-Budget System using PHP, JavaScript (Canvas API), HTML5, CSS3, and MySQL.

4. Live Portfolio Projects:
- Automated Data Ingestion & AI Pipeline: Self-Hosted n8n, xAI Grok API, JavaScript, REST APIs, Google Sheets
- QRYPT (Best Capstone Awardee): https://qrypt.great-site.net/qr-code-attendance-system/qr-code-attendance-system/user.php (PHP, MySQL, WebRTC Camera QR Scanner)
- AppTrade E-Commerce Store & On-Site POS: https://sampleappweb.great-site.net/index.php (PHP, MySQL, Bootstrap 5, XAMPP)
- OBI Interactive Room Visualizer: https://obiasia.com and https://obi-roomvisualizer.great-site.net (PHP, JavaScript Canvas API, HTML5/CSS3, MySQL)

RESPONSE STYLE:
- Keep responses concise (3-6 sentences or clean bullet points), enthusiastic, confident, and recruiter-friendly.
- Always include direct URLs when mentioning projects or contact info.
- Never disclose confidential internal client details.`;

function generateSmartFallbackReply(userMessage) {
  const q = (userMessage || '').toLowerCase();

  if (q.includes('n8n') || q.includes('automat') || q.includes('workflow') || q.includes('pipeline') || q.includes('ai')) {
    return `⚡ **Adrian's n8n & AI Automation Expertise:**\n\nAdrian architects and manages **25+ production n8n workflows** deployed on Linux VPS infrastructure:\n• **Multi-Step AI Agent Pipelines:** Connects LLMs (Google Gemini, REST APIs) with structured JSON outputs, memory buffers, and automated quality validation.\n• **Automated Data Ingestion & ETL:** Multi-source web scraping, anti-bot header mitigation, deduplication, and automated syncing to **Google Sheets**.\n• **CRM & CMS Orchestration:** End-to-end webhook pipelines integrating **Ghost CMS**, **Kit (ConvertKit)** subscriber tagging, and real-time email/chat alerts.\n\n💡 *Tip: Click the **"Workflow"** button in the top-right of this chat to inspect or download the actual `.json` n8n workflow powering this assistant!*`;
  }

  if (q.includes('php') || q.includes('project') || q.includes('web') || q.includes('fullstack') || q.includes('full-stack') || q.includes('mysql') || q.includes('qrypt') || q.includes('obi') || q.includes('apptrade')) {
    return `💻 **Adrian's Live Full-Stack Web & Software Projects:**\n\n• **Qrypt (QR Gatepass & Attendance System):** https://qrypt.great-site.net/ — Built with **PHP, MySQL, JavaScript & WebRTC** for live camera QR scanning, real-time attendance logs, and CSV exports.\n• **AppTrade (Multi-Portal E-Commerce):** https://sampleappweb.great-site.net/ — Full-stack **PHP & MySQL** marketplace featuring Role-Based Access Control (Admin, Vendor, and Customer portals).\n• **Interactive 2D/3D Room Visualizer:** https://obi-roomvisualizer.great-site.net/ — **HTML5 Canvas & JS** spatial rendering engine with live tile layout and PDF spec export.\n• **OBI Services Corporate Portal:** https://obiasia.com/ — Production business website and automated lead-capture pipeline.`;
  }

  if (q.includes('contact') || q.includes('hire') || q.includes('email') || q.includes('reach') || q.includes('whatsapp') || q.includes('phone') || q.includes('resume') || q.includes('cv')) {
    return `📩 **Contact & Hire Adrian Justin J. San Diego:**\n\nAdrian is currently open to **Remote (WFH) AI Automation (n8n)** and **Full-Stack Software/Web Developer** roles worldwide!\n\n• **Email:** adrian002bca@gmail.com\n• **WhatsApp / Phone:** https://api.whatsapp.com/send?phone=639352726487 (+63 935 272 6487)\n• **LinkedIn:** https://linkedin.com/in/adrian-justin-san-diego\n• **GitHub:** https://github.com/adrian002bca-prog\n• **Resume (1-Page ATS PDF):** https://adrian-sandiego.vercel.app/resume.pdf`;
  }

  if (q.includes('address') || q.includes('location') || q.includes('where') || q.includes('live') || q.includes('based') || q.includes('city') || q.includes('country')) {
    return `📍 **Adrian's Location & Work Availability:**\n\n• **Location:** Naic, Cavite, Philippines\n• **Work Arrangement:** Open to **Remote (WFH) Worldwide**\n• **Availability:** Full-Time Roles, Contract Automation & Full-Stack Web Dev\n• **Contact:** adrian002bca@gmail.com | +63 935 272 6487 (https://api.whatsapp.com/send?phone=639352726487)`;
  }

  if (q.includes('skill') || q.includes('stack') || q.includes('tech') || q.includes('language') || q.includes('tool')) {
    return `🛠️ **Adrian's Core Technical Stack:**\n\n• **Automation & AI:** n8n (Webhooks, AI Agents, Cron, HTTP Request, Code Nodes), Google Gemini API, Python (BeautifulSoup4, Requests, Pandas), REST APIs.\n• **Backend & Database:** PHP 8+ (OOP, PDO), SQL (MySQL / MariaDB), Node.js, Relational Schema Design, RBAC Authentication.\n• **Frontend & 3D Web:** JavaScript (ES6+), Three.js / WebGL, HTML5 Canvas, Tailwind CSS, Bootstrap 5, GSAP.\n• **DevOps & Cloud:** Linux VPS (Hostinger), Docker, Git/GitHub, Vercel, Cloudflare.`;
  }

  return `👋 Hi! I'm **Adrian's n8n + Gemini AI Assistant**.\n\nAdrian Justin J. San Diego is a **BS Computer Science graduate** and **AI Automation (n8n) & Full-Stack Developer** with **25+ production n8n workflows** and **5 live web applications**.\n\nAsk me anything about:\n• ⚡ **His n8n & AI Agent workflows**\n• 💻 **His live PHP, MySQL & JavaScript projects** (*Qrypt, AppTrade, OBI Visualizer*)\n• 🛠️ **His technical stack (n8n, Python, PHP, SQL, Three.js)**\n• 📩 **How to contact him or download his resume**`;
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, history = [], sessionId = 'visitor', customWebhookUrl, customGeminiKey } = req.body || {};

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    // 1. Try Live n8n Webhook first if configured
    const webhookUrl = customWebhookUrl || process.env.N8N_WEBHOOK_URL;
    if (webhookUrl && webhookUrl.startsWith('http')) {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 8000);
        const n8nResp = await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message, sessionId, chatInput: message }),
          signal: controller.signal
        });
        clearTimeout(timeout);

        if (n8nResp.ok) {
          const n8nData = await n8nResp.json();
          const replyText = n8nData.reply || n8nData.output || n8nData.text;
          if (replyText) {
            return res.status(200).json({
              reply: replyText,
              engine: 'n8n Webhook + Gemini AI (Live)'
            });
          }
        }
      } catch (err) {
        // Automatic zero-downtime failover to direct Google Gemini API
      }
    }

    // 2. Call Google Gemini API (24/7 Cloud Execution with identical n8n System Prompt)
    const apiKey = customGeminiKey || process.env.GEMINI_API_KEY;
    if (apiKey) {
      const contents = [];
      if (Array.isArray(history)) {
        history.slice(-6).forEach((turn) => {
          if (turn && turn.text) {
            contents.push({
              role: turn.role === 'user' ? 'user' : 'model',
              parts: [{ text: String(turn.text) }]
            });
          }
        });
      }
      contents.push({
        role: 'user',
        parts: [{ text: message }]
      });

      const modelsToTry = ['gemini-flash-latest', 'gemini-3.8-flash', 'gemini-2.5-flash'];
      for (const modelName of modelsToTry) {
        try {
          const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${encodeURIComponent(apiKey)}`;
          const geminiResp = await fetch(geminiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              systemInstruction: {
                parts: [{ text: SYSTEM_PROMPT }]
              },
              contents,
              generationConfig: {
                temperature: 0.4,
                maxOutputTokens: 600
              }
            })
          });

          if (geminiResp.ok) {
            const data = await geminiResp.json();
            const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
            if (text) {
              return res.status(200).json({
                reply: text,
                engine: `n8n Agent Architecture • ${modelName}`
              });
            }
          }
        } catch (geminiErr) {
          // Try next Gemini model
        }
      }
    }

    // 3. Built-in Instant Knowledge Base Fallback (Guaranteed 0ms response if no key set yet)
    return res.status(200).json({
      reply: generateSmartFallbackReply(message),
      engine: 'n8n AI Agent • Portfolio Knowledge Engine'
    });
  } catch (error) {
    return res.status(200).json({
      reply: generateSmartFallbackReply(req.body?.message || ''),
      engine: 'n8n AI Agent • Portfolio Knowledge Engine'
    });
  }
};
