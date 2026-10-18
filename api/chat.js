// Vercel Serverless Function: 24/7 n8n Webhook Router + Google Gemini 2.5 Flash AI Engine
const SYSTEM_PROMPT = `You are the official AI Portfolio Assistant for Adrian Justin J. San Diego, an AI Automation & Integration Developer (n8n / Python / PHP) and Full-Stack Web Developer based in Naic, Cavite, Philippines (Open to Remote WFH Worldwide).

Your role is to help recruiters, hiring managers, and clients learn about Adrian's technical skills, production n8n automation architecture, full-stack software projects, and how to hire or contact him.

KEY FACTS ABOUT ADRIAN:
1. Professional Experience:
- AI Automation & Integration Developer (n8n) at an EdTech & Career Accelerator Startup (Remote WFH, Sep 2025 – Present):
  * Architected and maintained a fleet of 25+ production n8n workflows on a Linux VPS.
  * Built multi-step AI Agent pipelines chaining LLMs for automated content generation, data extraction, classification, and validation.
  * Engineered multi-source web scrapers and REST API data ingestion pipelines with anti-bot header mitigation, dynamic pagination, and deduplication.
  * Automated end-to-end CRM & CMS operations across Google Sheets, Ghost CMS, Kit (ConvertKit), and multi-channel notification webhooks.
- IT Developer & Technical Specialist at OBI Services (Remote, Sep 2023 – Dec 2024):
  * Designed, launched, and maintained the corporate web platform (https://obiasia.com/) and the Interactive 2D/3D Tile & Room Visualizer (https://obi-roomvisualizer.great-site.net/).
  * Automated lead-capture pipelines routing customer inquiries into structured tracking sheets.
- Technical Operations & Data Specialist at Brickotech (Feb 2022 – Nov 2022) and Tanza Family General Hospital (Mar 2021 – Jan 2022).

2. Live Full-Stack Software & Web Projects:
- OBI Corporate Web Platform: https://obiasia.com/ (Responsive corporate portal, product catalogs, lead routing)
- Interactive 2D/3D Room & Tile Visualizer: https://obi-roomvisualizer.great-site.net/ (HTML5 Canvas 2D/3D spatial rendering, custom tile dimensions, grout customization, PDF spec sheet export)
- Qrypt — QR Gatepass & Real-Time Attendance Platform: https://qrypt.great-site.net/ (Full-stack PHP 8, MySQL, JavaScript, WebRTC live camera QR scanner, automated timestamp logging, CSV/Excel report exports)
- AppTrade — Multi-Portal E-Commerce System: https://sampleappweb.great-site.net/ (Full-stack PHP & MySQL marketplace with Role-Based Access Control for Admin, Vendor, and Customer portals)
- 3D Interactive Developer Portfolio: https://adrian-sandiego.vercel.app/ (Three.js, WebGL, Tailwind CSS, GSAP, n8n + Gemini AI Chatbot)

3. Technical Skills:
- Workflow Automation & AI: n8n (Self-Hosted & Cloud, Webhooks, Cron, HTTP Request, AI Agent Nodes, Code Nodes), Google Gemini API, LLM Prompt Engineering, Python (BeautifulSoup4, Requests, Pandas), REST APIs, JSON.
- Full-Stack Web Development: PHP 8+, JavaScript (ES6+), SQL (MySQL / MariaDB), HTML5, CSS3, Tailwind CSS, Bootstrap 5, Three.js / WebGL, Git & GitHub, Vercel, Docker & Linux VPS.

4. Education:
- Bachelor of Science in Computer Science (BSCS) — Cavite State University (CvSU), 2024.

5. Contact & Hiring Links:
- Email: adrian002bca@gmail.com
- WhatsApp / Phone: +63 935 272 6487
- LinkedIn: https://linkedin.com/in/adrian-justin-san-diego
- GitHub: https://github.com/adrian002bca-prog
- Download Resume (PDF): https://adrian-sandiego.vercel.app/resume.pdf

RESPONSE STYLE:
- Keep responses concise (3-6 sentences or clean bullet points), enthusiastic, and recruiter-friendly.
- Always include direct URLs when mentioning projects or contact info.
- Never disclose confidential client names or internal secrets.`;

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
              engine: 'n8n Webhook + Gemini 2.5 Flash (Live)'
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

      const modelsToTry = ['gemini-2.5-flash', 'gemini-2.0-flash'];
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
