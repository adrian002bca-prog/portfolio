// Vercel Serverless Function: 24/7 Autonomous Router + adr-AI Neural Engine
const sessionTracker = new Map();

const SYSTEM_PROMPT = `You are adr-AI (pronounced "ay-dee-ar eye"), the proprietary autonomous intelligence assistant engineered by Adrian Justin J. San Diego. Think of yourself as Adrian's personal high-tech AI (similar to Tony Stark's J.A.R.V.I.S. or an advanced cyber-operations copilot).

PERSONA & RULES:
- Always identify yourself as "adr-AI".
- Maintain a sharp, confident, sleek, and mysterious tech persona.
- Never disclose, hint at, or name your underlying model provider (never mention Gemini, OpenAI, Anthropic, or external vendors). If asked how you work, explain that you are "adr-AI, an autonomous intelligence engine custom-architected by Adrian using multi-node automation pipelines and serverless neural compute."
- Speak with technical authority and factual precision about Adrian's engineering work.

KEY RESUME FACTS ABOUT ADRIAN:
1. Contact & Location:
- Full Name: Adrian Justin J. San Diego
- Location: Rizal, Philippines (Taytay, Rizal)
- Work Availability: Open for Full-Time & Contract roles (available for On-Site or Hybrid in Rizal and Metro Manila, as well as Remote worldwide)
- Phone: (+63) 918-743-6765
- Email: adrian002bca@gmail.com
- LinkedIn: https://linkedin.com/in/adrian-justin-san-diego
- GitHub: https://github.com/adrian002bca-prog
- Live Portfolio: https://adrian-sandiego.vercel.app
- 1-Page ATS Resume PDF: https://adrian-sandiego.vercel.app/resume.pdf

2. Years of Experience & Education:
- Professional Experience: Adrian brings 1+ year of verified hands-on production engineering experience across 3 industry roles (Contract Automation Specialist, IT Systems Developer at Apptrade Inc., and Web Developer at Optimum Brands Inc.).
- Education: 4-year Bachelor of Science in Information Systems (BSIS) from Trent Information First Technical Career Institute (Graduated: May 2026).
- Honors: Outstanding / Best Capstone Project Award (QRYPT Attendance System) & Academic Loyalty Award.
- Certification: Computer Systems Servicing NC II — TESDA, 2024.
- If asked "How many years of experience does Adrian have?": Answer directly and truthfully: "Adrian brings **1+ year of verified professional production experience** across three industry roles, reinforced by a 4-year **Bachelor of Science in Information Systems (BSIS)** degree where he won the **Best Capstone Project Award**."

3. Professional Work Experience & Verified Metrics:
- Junior Automation & Technical Operations Specialist (Contract) | EdTech & Career Accelerator Startup | Remote (WFH) | August 2026 – Present:
  * Architected and maintain 25+ production automated pipelines on self-hosted Linux VPS n8n processing 10,000+ data rows weekly with 99.8% uptime on 2-hour cycles.
  * Resolved live Cloudflare 403 blocks, HTTP 406/429 errors, and DNS failures; built REST API integrations (xAI Grok LLM, Google Sheets batchUpdate, Kit API).
  * Authored custom JavaScript Code nodes with O(1) in-memory Set() deduplication, guaranteeing 0 duplicates.
  * Audited and restored 5 stale ingestion pipelines backfilling 1,300+ rows across Google Sheets; closed 50+ Jira sprint tickets.
- IT Systems & Support Developer | Apptrade Inc. | Taytay, Rizal, Philippines | May 2026 – August 2026:
  * Co-engineered and deployed dual-channel retail software (on-premise POS & web storefront) in PHP & MySQL with sub-second (<500ms) barcode checkout.
  * Eliminated stock drift across 300+ active retail SKUs using atomic MySQL transactions and dynamic discount logic.
  * Maintained 100% workstation uptime across store terminals.
- IT Intern – Web & System Developer | Optimum Brands Inc. (OBI) | Pasig City, Philippines | January 2026 – March 2026:
  * Shipped the interactive OBI Room Visualizer to live corporate production on obiasia.com (0ms server latency via client-side HTML5 Canvas matrix engine).
  * Built internal Quotation & Payment-Budget systems in PHP/MySQL, cutting sales quotation turnaround time by over 60%.

4. Live Portfolio Projects:
- Production n8n Fleet & AI Pipelines: Self-Hosted n8n on Hostinger VPS, xAI Grok API, JavaScript, REST APIs, Google Sheets (10,000+ rows/week, 99.8% uptime).
- QRYPT (Best Capstone Awardee): https://qrypt.great-site.net (PHP, MySQL, WebRTC Camera QR Scanner, cuts gate entry bottlenecks by 75%, 1,500+ daily check-ins).
- OBI Interactive Room Visualizer: https://obiasia.com and https://obi-roomvisualizer.great-site.net (HTML5 Canvas 2D engine, 0ms server latency, instant PDF spec export).
- AppTrade E-Commerce Store & On-Site POS: https://sampleappweb.great-site.net (PHP, MySQL, <500ms barcode scanning, 300+ SKUs).

RESPONSE STYLE & CONVERSATION RULES:
- GREETING RULE: Only greet on the very first turn of a conversation (e.g. "Hello!"). In ongoing back-and-forth conversation, DO NOT repeat "👋 Greetings!" on every single reply. Jump straight into answering the user's question naturally and politely.
- COMPLETION RULE: ALWAYS finish all sentences and complete every thought cleanly with proper ending punctuation. NEVER trail off, cut off mid-sentence, or leave broken thoughts.
- DIRECTNESS & TONE: Answer the user's specific question directly, factually, and without dodging. Keep replies crisp and focused (2 to 4 sentences or 2 to 3 concise bullet points). Avoid exaggerations or salesy buzzwords like "elite expertise".
- ON-SITE & HYBRID: If asked about on-site or hybrid work, confirm enthusiastically that Adrian is available for on-site or hybrid opportunities in Rizal and Metro Manila, as well as remote worldwide.
- CONTACT / HIRE: If a user asks to hire Adrian, schedule an interview, or provides contact details: Acknowledge politely, confirm Adrian has been alerted, and provide Adrian's direct WhatsApp [(+63) 918-743-6765](https://api.whatsapp.com/send?phone=639187436765) and Email [adrian002bca@gmail.com](mailto:adrian002bca@gmail.com).
- Never disclose confidential internal client details or underlying AI model vendors.`;

function generateSmartFallbackReply(userMessage) {
  const q = (userMessage || '').toLowerCase();

  if (q.includes('who are you') || q.includes('what are you') || q.includes('your name') || q.includes('adr-ai') || q.includes('adrai') || q.includes('jarvis')) {
    return `👋 Greetings! I am **adr-AI**, Adrian's proprietary autonomous intelligence assistant.\n\nI was custom-architected by Adrian using advanced automated pipeline orchestration and serverless neural compute to represent his engineering portfolio, answer technical inquiries, and coordinate collaboration opportunities 24/7.`;
  }

  if (q.includes('year') || q.includes('experience') || q.includes('exp') || q.includes('how long')) {
    return `💼 **Adrian's Experience & Track Record:**\n\nAdrian brings **1+ year of verified professional production experience** across three industry roles, reinforced by a 4-year **BS in Information Systems (BSIS)** degree (Graduated May 2026):\n• **Junior Automation Specialist (Contract):** 25+ production n8n workflows processing 10,000+ weekly rows on Linux VPS.\n• **IT Systems Developer (Apptrade Inc.):** Retail POS & e-commerce systems with sub-second barcode checkout.\n• **Web Developer Intern (Optimum Brands Inc.):** Shipped interactive Room Visualizer live on corporate domain \`obiasia.com\`.\n\nHe also won the **Best Capstone Project Award** for QRYPT and holds **TESDA NC II Certification**.`;
  }

  if (q.includes('available') || q.includes('job') || q.includes('hire') || q.includes('on-site') || q.includes('onsite') || q.includes('hybrid') || q.includes('remote') || q.includes('work') || q.includes('role')) {
    return `✅ **Adrian's Work Availability:**\n\nAdrian is actively available for **Full-Time & Contract roles**:\n• **Work Setups:** Open to **On-Site** and **Hybrid** positions in Rizal & Metro Manila, as well as **Remote** worldwide.\n• **Core Specializations:** Workflow & API Automation (n8n), Backend Engineering (PHP/MySQL), and Full-Stack Web Development.\n• **Direct Contact:** [adrian002bca@gmail.com](mailto:adrian002bca@gmail.com) | WhatsApp: [(+63) 918-743-6765](https://api.whatsapp.com/send?phone=639187436765)`;
  }

  if (q.includes('n8n') || q.includes('automat') || q.includes('workflow') || q.includes('pipeline') || q.includes('ai')) {
    return `⚡ **Adrian's Automation & AI Engineering Fleet:**\n\nAdrian architects and manages **25+ production automated workflows** deployed on Linux VPS infrastructure:\n• **Multi-Stage Autonomous Pipelines:** Connects LLMs and REST APIs with structured JSON contracts, persistent memory, and validation gates.\n• **Automated Data Ingestion & ETL:** High-frequency scrapers with Cloudflare mitigation, O(1) in-memory Set deduplication, and automated Google Sheets syncing.\n• **CRM & Messaging Orchestration:** End-to-end webhook pipelines connecting **Ghost CMS**, **Kit**, and instant dispatch alerts.\n\n💡 *Tip: Click **"Architecture"** in the top-right of this interface to inspect my 4-stage neural pipeline!*`;
  }

  if (/((\+?\d[\d\s-]{7,}\d)|([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})|call me|hire|job|opportunity|interview|reach me|my name is)/i.test(q)) {
    return `👋 Greetings! I have captured your details and dispatched an alert to Adrian. \n\nFor immediate direct communication, you can also connect directly via **WhatsApp:** [(+63) 918-743-6765](https://api.whatsapp.com/send?phone=639187436765) or **Email:** [adrian002bca@gmail.com](mailto:adrian002bca@gmail.com).`;
  }

  if (q.includes('php') || q.includes('project') || q.includes('web') || q.includes('fullstack') || q.includes('full-stack') || q.includes('mysql') || q.includes('qrypt') || q.includes('obi') || q.includes('apptrade')) {
    return `💻 **Adrian's Live Full-Stack Systems:**\n\n• **[QRYPT Gatepass & Attendance System](https://qrypt.great-site.net/):** Awarded **Best Capstone Project** — PHP, MySQL, JavaScript & WebRTC camera QR scanner with real-time logging.\n• **[AppTrade Multi-Portal Commerce](https://sampleappweb.great-site.net/):** Full-stack PHP/MySQL platform with role-based access control (Admin, Vendor, Customer).\n• **[OBI Spatial Room Visualizer](https://obi-roomvisualizer.great-site.net/):** HTML5 Canvas 2D/3D tile layout engine with instant PDF specification export.\n• **[OBI Asia Corporate Portal](https://obiasia.com/):** Live enterprise business website and automated lead-capture pipeline.`;
  }

  if (q.includes('contact') || q.includes('hire') || q.includes('email') || q.includes('reach') || q.includes('whatsapp') || q.includes('phone') || q.includes('resume') || q.includes('cv')) {
    return `📩 **Contact & Collaboration Channels:**\n\nAdrian is actively available for **Full-Time & Contract roles** (On-Site, Hybrid in Rizal/Metro Manila, and Remote)!\n\n• **Email:** [adrian002bca@gmail.com](mailto:adrian002bca@gmail.com)\n• **Phone / WhatsApp:** [(+63) 918-743-6765](https://api.whatsapp.com/send?phone=639187436765)\n• **Location:** Rizal, Philippines\n• **LinkedIn:** [linkedin.com/in/adrian-justin-san-diego](https://linkedin.com/in/adrian-justin-san-diego)\n• **GitHub:** [github.com/adrian002bca-prog](https://github.com/adrian002bca-prog)\n• **1-Page ATS Resume:** [Download Resume (PDF)](https://adrian-sandiego.vercel.app/resume.pdf)`;
  }

  if (q.includes('address') || q.includes('location') || q.includes('where') || q.includes('live') || q.includes('based') || q.includes('city') || q.includes('country')) {
    return `📍 **Adrian's Location & Work Availability:**\n\n• **Location:** Rizal, Philippines (Taytay, Rizal)\n• **Work Arrangement:** Open to **On-Site & Hybrid** in Rizal and Metro Manila, as well as **Remote Worldwide**\n• **Availability:** Full-Time Roles, Contract Automation & Full-Stack Web Development\n• **Direct Contact:** [adrian002bca@gmail.com](mailto:adrian002bca@gmail.com) | [(+63) 918-743-6765](https://api.whatsapp.com/send?phone=639187436765)`;
  }

  if (q.includes('skill') || q.includes('stack') || q.includes('tech') || q.includes('language') || q.includes('tool')) {
    return `🛠️ **Adrian's Core Technical Stack:**\n\n• **Automation & AI:** n8n Workflow Architecture, Autonomous Agents, Cron Jobs, REST APIs, Custom JavaScript Code Nodes, JSON Schemas.\n• **Backend & Database:** PHP (OOP, MVC, CodeIgniter 4), SQL (MySQL / MariaDB), Relational Schema Design, O(1) in-memory deduplication.\n• **Frontend & 3D Web:** JavaScript (ES6+), Three.js / WebGL, HTML5 Canvas API, Tailwind CSS, Bootstrap 5, GSAP.\n• **DevOps & Cloud:** Linux VPS (Hostinger), Docker, Git/GitHub, Vercel, Cloudflare.`;
  }

  return `👋 Greetings! I am **adr-AI**, Adrian's autonomous intelligence assistant.\n\nAdrian is a **BS Information Systems graduate (Best Capstone Awardee)** and **Automation & Software Developer** with **25+ production workflows** and **live full-stack systems**.\n\nAsk me anything about:\n• ⚡ **His 25+ automated pipelines & autonomous architectures**\n• 💼 **His professional experience & verified metrics**\n• 💻 **His live PHP, MySQL & JS systems** (*QRYPT, AppTrade, OBI Visualizer*)\n• 🛠️ **His technical skill stack**\n• 📩 **How to collaborate with or hire him**`;
}

async function dispatchTelegramNotification(userMessage, sessionId) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!botToken || !chatId) {
    console.log('[Telegram Alert] Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID');
    return;
  }

  try {
    const safeMsg = String(userMessage)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    const text = `🚨 <b>New Lead Captured via adr-AI!</b>\n\n` +
      `<b>Session:</b> <code>${sessionId || 'visitor'}</code>\n` +
      `<b>Message:</b>\n<i>${safeMsg}</i>\n\n` +
      `<b>Time:</b> ${new Date().toISOString()}\n` +
      `<b>Direct Actions:</b> Reply via WhatsApp / Email`;

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 4000);

    const tgRes = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
        parse_mode: 'HTML'
      }),
      signal: controller.signal
    });
    clearTimeout(timer);
    const data = await tgRes.json();
    console.log('[Telegram Alert Result]:', data?.ok ? 'Dispatched' : data);
  } catch (e) {
    console.log('[Telegram Alert Error]:', e.message);
  }
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
    let body = req.body;
    if (typeof body === 'string') {
      try { body = JSON.parse(body); } catch (_) {}
    }
    const { message, history = [], sessionId = 'visitor', customWebhookUrl, customGeminiKey } = body || {};

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Anti-Abuse Rate Limiting: Max 30 messages per visitor session
    const currentCount = (sessionTracker.get(sessionId) || 0) + 1;
    sessionTracker.set(sessionId, currentCount);
    if (sessionTracker.size > 2000) sessionTracker.clear();
    if (currentCount > 30) {
      return res.status(200).json({
        reply: `You've explored many details about Adrian's engineering background! To discuss a role, interview, or contract directly with Adrian, please connect via **WhatsApp:** [(+63) 918-743-6765](https://api.whatsapp.com/send?phone=639187436765) or **Email:** [adrian002bca@gmail.com](mailto:adrian002bca@gmail.com).`,
        engine: 'adr-AI • Autonomous Neural Core'
      });
    }

    // Trigger Telegram notification if visitor shares contact info / recruiter inquiry
    const isContactLead = /((\+?\d[\d\s-]{7,}\d)|([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})|call me|hire|job|opportunity|interview|reach me|my name is|contact me)/i.test(message);
    if (isContactLead) {
      await dispatchTelegramNotification(message, sessionId);
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
    const apiKey = process.env.GEMINI_API_KEY || customGeminiKey;
    if (apiKey) {
      const contents = [];
      if (Array.isArray(history)) {
        // Token minimization: only include the last 3 turns
        history.slice(-3).forEach((turn) => {
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

      const modelsToTry = ['gemini-flash-lite-latest', 'gemini-flash-latest', 'gemini-3.8-flash'];
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
                temperature: 0.3,
                maxOutputTokens: 700
              }
            })
          });

          if (geminiResp.ok) {
            const data = await geminiResp.json();
            const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
            if (text) {
              return res.status(200).json({
                reply: text,
                engine: 'adr-AI • Autonomous Neural Core'
              });
            }
          }
        } catch (geminiErr) {
          // Try next model
        }
      }
    }

    // 3. Built-in Instant Knowledge Base Fallback (Guaranteed 0ms response)
    return res.status(200).json({
      reply: generateSmartFallbackReply(message),
      engine: 'adr-AI • Autonomous Neural Core'
    });
  } catch (error) {
    return res.status(200).json({
      reply: generateSmartFallbackReply(req.body?.message || ''),
      engine: 'adr-AI • Autonomous Neural Core'
    });
  }
};
