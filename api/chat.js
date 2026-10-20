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
  * Authored custom JavaScript Code nodes with O(1) in-memory Set() deduplication, ensuring zero duplicate entries observed across consecutive batch runs.
  * Audited and restored 5 stale ingestion pipelines backfilling 1,300+ rows across Google Sheets; closed 50+ Jira sprint tickets.
- IT Systems & Support Developer | Apptrade Inc. | Taytay, Rizal, Philippines | May 2026 – August 2026:
  * Co-engineered and deployed dual-channel retail software (on-premise POS & web storefront) in PHP & MySQL with sub-second (<500ms) barcode checkout.
  * Eliminated stock drift across 300+ active retail SKUs using atomic MySQL transactions and dynamic discount logic.
  * Maintained continuous workstation uptime across store terminals.
- IT Intern – Web & System Developer | Optimum Brands Inc. (OBI) | Pasig City, Philippines | January 2026 – March 2026:
  * Shipped the interactive OBI Room Visualizer to live corporate production on obiasia.com (instant client-side rendering with no server round-trip via HTML5 Canvas matrix engine).
  * Built internal Quotation & Payment-Budget systems in PHP/MySQL, cutting sales quotation turnaround time by over 60%.

4. Live Portfolio Projects:
- Production n8n Fleet & AI Pipelines: Self-Hosted n8n on Hostinger VPS, xAI Grok API, JavaScript, REST APIs, Google Sheets (10,000+ rows/week, 99.8% uptime).
- QRYPT (Best Capstone Awardee): https://qrypt.great-site.net (PHP, MySQL, WebRTC Camera QR Scanner, cuts gate entry bottlenecks by 75%, 1,500+ daily check-ins).
- OBI Interactive Room Visualizer: https://obiasia.com and https://obi-roomvisualizer.great-site.net (HTML5 Canvas 2D engine, instant client-side rendering, instant PDF spec export).
- AppTrade E-Commerce Store & On-Site POS: https://sampleappweb.great-site.net (PHP, MySQL, <500ms barcode scanning, 300+ SKUs).

RESPONSE STYLE & CONVERSATION RULES:
- GREETING RULE: Only greet on the very first turn of a conversation (e.g. "Hello!"). In ongoing back-and-forth conversation, DO NOT repeat "👋 Greetings!" on every single reply. Jump straight into answering the user's question naturally and politely.
- COMPLETION RULE: ALWAYS finish all sentences and complete every thought cleanly with proper ending punctuation. NEVER trail off, cut off mid-sentence, or leave broken thoughts.
- DIRECTNESS & TONE: Answer the user's specific question directly, factually, and without dodging. Keep replies crisp and focused (2 to 4 sentences or 2 to 3 concise bullet points). Avoid exaggerations or salesy buzzwords like "elite expertise".
- ON-SITE & HYBRID: If asked about on-site or hybrid work, confirm enthusiastically that Adrian is available for on-site or hybrid opportunities in Rizal and Metro Manila, as well as remote worldwide.
- INTERVIEW SCHEDULING RULE: If asked what date or time Adrian is available for an interview, or when he can talk/meet:
  * State standard hours: Monday – Friday, 9:00 AM – 6:00 PM PHT (UTC+8). He is also glad to accommodate US (EST/PST), UK, or Australian timezones upon request.
  * Mention advance notice: Available on 24-hour advance notice or sooner.
  * Provide the two booking paths: They can leave their preferred date, time, and company name right in the chat (alert will be sent to Adrian's phone immediately), OR connect directly via WhatsApp [(+63) 918-743-6765](https://api.whatsapp.com/send?phone=639187436765) and Email [adrian002bca@gmail.com](mailto:adrian002bca@gmail.com).
- CONTACT / HIRE: If a user asks to hire Adrian, schedule an interview, or provides contact details: Acknowledge politely, confirm Adrian has been alerted, and provide Adrian's direct WhatsApp [(+63) 918-743-6765](https://api.whatsapp.com/send?phone=639187436765) and Email [adrian002bca@gmail.com](mailto:adrian002bca@gmail.com).
- Never disclose confidential internal client details or underlying AI model vendors.`;

function generateSmartFallbackReply(userMessage) {
  const q = (userMessage || '').toLowerCase();

  // 1. Identity & Persona
  if (/\b(who are you|what are you|your name|what is adr-ai)\b/i.test(q) || q.includes('adr-ai') || q.includes('adrai') || q.includes('jarvis')) {
    return `👋 Greetings! I am **adr-AI**, Adrian's proprietary autonomous intelligence assistant.\n\nI was custom-architected by Adrian using advanced automated pipeline orchestration and serverless neural compute to represent his engineering portfolio, answer technical inquiries, and coordinate collaboration opportunities 24/7.`;
  }

  // 2. High-Priority Technical: 25+ n8n Workflows, Anti-Scraping, Deduplication, ETL
  if (q.includes('incident') || q.includes('post-mortem') || q.includes('postmortem') || q.includes('outage') || q.includes('war stor') || q.includes('failure')) {
    return `🛡️ **3 Critical Production Incidents Adrian Diagnosed & Resolved:**\n\n1. **Cloudflare 403 & HTTP 429 Concurrency Stalls (n8n VPS Fleet):**\n• *Problem:* Automated scrapers stalled from anti-bot challenge pages and burst request limits.\n• *Fix:* Implemented dynamic User-Agent rotation, adaptive request jitter (800–2400ms), and exponential backoff retries with circuit breaker fallback (99.8% uptime restored).\n\n2. **Silent Schema Drift & 1,300-Row Backfill (Google Sheets API):**\n• *Problem:* 5 ingestion pipelines silently failed on downstream writes due to unversioned upstream key changes.\n• *Fix:* Deployed strict JSON schema validation gates with instant Telegram alerts, and automated backfilling of 1,300+ missing rows via Google Sheets \`batchUpdate\` API.\n\n3. **Dual-Channel SKU Race Conditions & Drift (Apptrade Inc.):**\n• *Problem:* Peak checkout volume caused phantom inventory and overselling across 300+ retail SKUs.\n• *Fix:* Replaced non-atomic queries with ACID InnoDB transactions using \`SELECT ... FOR UPDATE\` row-level locking, coupled with sub-500ms barcode scanning.\n\n👉 *You can inspect the full breakdown in the **#incidents** section of this portfolio!*`;
  }

  if (q.includes('n8n') || q.includes('workflow') || q.includes('pipeline') || q.includes('automat') || q.includes('anti-scraping') || q.includes('scraping') || q.includes('dedup') || q.includes('cloudflare')) {
    return `⚡ **Adrian's 25+ Production n8n Workflows & Operational Engineering:**\n\nAdrian architects and manages an enterprise fleet of **25+ production automated pipelines** deployed on self-hosted Linux VPS (Hostinger), processing **10,000+ data rows weekly** with **99.8% uptime** on 2-hour cron cycles.\n\n**How He Solves Production-Grade Challenges:**\n• **Anti-Scraping & Incident Mitigation:** Bypassed aggressive Cloudflare 403 blocks and HTTP 429 rate limits by configuring rotating User-Agents, adaptive request throttling, and custom exponential backoff retry logic.\n• **O(1) In-Memory Deduplication:** Authored custom JavaScript Code nodes in n8n utilizing ES6 \`Set()\` data structures for O(1) lookups against composite key hashes, guaranteeing zero duplicate entries written across consecutive batch runs.\n• **Data Pipeline Ingestion & Resiliency:** Audited and restored 5 stale ingestion pipelines, backfilling 1,300+ missing rows into Google Sheets via the \`batchUpdate\` API.\n• **Autonomous AI & Output Contracts:** Connected xAI Grok and Google GenAI nodes with strict JSON schema validation, persistent memory buffers, Ghost CMS, and Kit (ConvertKit) CRM subscriber tagging.\n\n💡 *Tip: Click **"Nodes"** at the top right of this chat to inspect the 4-stage pipeline architecture!*`;
  }

  // 3. High-Priority Technical: Apptrade Retail POS & E-Commerce System
  if (q.includes('pos') || q.includes('apptrade') || q.includes('barcode') || q.includes('retail') || q.includes('sku') || q.includes('inventory') || q.includes('checkout')) {
    return `🛒 **Apptrade Inc. — Retail POS & Dual-Channel E-Commerce System:**\n\nAt **Apptrade Inc.** (Taytay, Rizal), Adrian co-engineered and deployed a dual-channel retail platform combining a high-throughput on-premise Point of Sale (POS) system with an online e-commerce storefront:\n\n• **Sub-Second Barcode Scanning:** Optimized physical USB/laser barcode scanner ingestion in JavaScript & PHP to complete transactions in **under 500ms** at physical checkout counters.\n• **Atomic Inventory Management:** Designed strict ACID-compliant MySQL transactions and row-locking logic preventing inventory drift and race conditions across **300+ live retail SKUs**.\n• **Multi-Portal Architecture:** Role-based access control (Admin, Inventory Manager, Cashier, Customer) with real-time audit logging and dynamic promotional discount calculation.\n• **Continuous Station Uptime:** Maintained continuous operational uptime across all retail hardware terminals and receipt printer interfaces.\n\n🔗 **Live Web Demo:** [Sample AppTrade Storefront](https://sampleappweb.great-site.net/) *(Free hosting, may take a few seconds to wake up)*`;
  }

  // 4. Capstone Project: QRYPT QR Gatepass & Attendance
  if (q.includes('qrypt') || q.includes('capstone') || q.includes('attendance') || q.includes('gatepass') || q.includes('webrtc') || q.includes('trent')) {
    return `🏆 **QRYPT Attendance & Campus Gatepass System (Best Capstone Project Awardee):**\n\nAwarded **Best Capstone Project** & Academic Loyalty Award at Trent Information First Technical Career Institute (Graduated May 2026):\n\n• **The Challenge:** Long manual physical check-in queues causing severe morning bottlenecks at campus entrance gates.\n• **The Architecture:** A high-speed QR-based gatepass and attendance ecosystem powered by PHP, MySQL, and HTML5 WebRTC camera scanning.\n• **Production Impact:** Cut gate entry bottlenecks by **75%**, smoothly managing **1,500+ daily student and staff verifications** with real-time automated timestamp logging and emergency offline caching.\n\n🔗 **Live Web Demo:** [QRYPT Attendance Portal](https://qrypt.great-site.net/) *(Free hosting)*`;
  }

  // 5. OBI Interactive Room Visualizer
  if (q.includes('obi') || q.includes('optimum') || q.includes('visualizer') || q.includes('canvas')) {
    return `🎨 **Optimum Brands Inc. (OBI) — Interactive Room Visualizer:**\n\nDuring his internship at Optimum Brands Inc. (Pasig City), Adrian built and deployed interactive client-facing software directly to live production:\n\n• **Matrix Canvas Engine:** Engineered an interactive HTML5 Canvas 2D/3D surface and wall tile layout engine with matrix transformations, delivering instant client-side rendering with no server round-trip.\n• **Client Experience:** Instant pattern switching, custom dimensions, color alterations, and 1-click PDF spec sheet quotation generation.\n• **Business Impact:** Built internal Quotation & Payment-Budget systems in PHP/MySQL, slashing corporate sales quotation turnaround by over **60%**.\n• **Live Production Deployment:** Shipped live to corporate production on **[obiasia.com](https://obiasia.com)**.\n\n🔗 **Live Visualizer Demo:** [OBI Room Visualizer Demo](https://obi-roomvisualizer.great-site.net/)`;
  }

  // 6. Resume / CV Download
  if (q.includes('resume') || q.includes('cv') || q.includes('download resume') || q.includes('download cv') || q.includes('pdf')) {
    return `📄 **Adrian's 1-Page ATS-Optimized Resume:**\n\nAdrian's 1-page resume covers his verified production metrics, technical skill stack, academic awards, and contact details.\n\n👉 **[Click Here to Download Adrian's Resume (PDF)](https://adrian-sandiego.vercel.app/resume.pdf)**\n\n**Snapshot Summary:**\n• **Education:** Bachelor of Science in Information Systems (BSIS), Graduated May 2026 (Best Capstone Awardee).\n• **Experience:** 1+ year hands-on production engineering across Automation (25+ n8n workflows), Retail POS Systems (Apptrade), and Full-Stack Web Development (OBI).\n• **Certifications:** TESDA NC II (Computer Systems Servicing).\n• **Direct Contact:** [adrian002bca@gmail.com](mailto:adrian002bca@gmail.com) | [(+63) 918-743-6765](https://api.whatsapp.com/send?phone=639187436765)`;
  }

  // 7. Interview Scheduling & Booking
  if (q.includes('interview') || q.includes('schedule') || q.includes('earliest start') || q.includes('timezone') || q.includes('time zone') || q.includes('book interview') || (q.includes('when') && (q.includes('talk') || q.includes('meet') || q.includes('call')))) {
    return `📅 **Adrian's Interview Availability & Work Schedule:**\n\nAdrian is actively interviewing and ready to take screening calls or technical deep-dives!\n\n• **Earliest Start Date:** Immediate / Ready to onboard (BSIS Completed May 2026).\n• **Timezone:** Philippines Standard Time (UTC+8 / PHT). He is flexible and readily accommodates US (EST/PST), UK/European (GMT/CET), or Australian (AEST) business hours upon request.\n• **Standard Hours:** Monday – Friday, 9:00 AM – 6:00 PM PHT (or scheduled shifts).\n• **Advance Notice:** Available on 24-hour advance notice or sooner.\n\n👉 **How to Lock In a Time:**\n1. **Reply right here** with your preferred date, time, and company name — an instant priority alert will be dispatched to Adrian's phone.\n2. **Connect directly:** Reach Adrian via **[WhatsApp (+63 918-743-6765)](https://api.whatsapp.com/send?phone=639187436765)** or **[Email (adrian002bca@gmail.com)](mailto:adrian002bca@gmail.com)**.`;
  }

  // 8. Experience & Years of Track Record
  if (q.includes('year') || q.includes('experience') || q.includes('exp') || q.includes('how long') || q.includes('background') || q.includes('track record')) {
    return `💼 **Adrian's Experience & Track Record:**\n\nAdrian brings **1+ year of verified professional production experience** across three industry roles, reinforced by a 4-year **BS in Information Systems (BSIS)** degree (Graduated May 2026):\n\n• **Junior Automation Specialist (Contract):** 25+ production n8n workflows processing 10,000+ weekly rows on Linux VPS. Solved Cloudflare 403 blocks, rate limits, and authored O(1) Set deduplication.\n• **IT Systems Developer (Apptrade Inc.):** Built dual-channel retail systems (on-premise POS with <500ms barcode scanning & web store) with atomic MySQL transactions preventing stock drift across 300+ SKUs.\n• **Web Developer Intern (Optimum Brands Inc.):** Shipped interactive Room Visualizer live on corporate domain \`obiasia.com\` with instant client-side Canvas rendering.\n\n**Honors & Credentials:** Best Capstone Project Award (QRYPT), Academic Loyalty Award, and TESDA NC II Certification.`;
  }

  // 9. Work Availability & Locations (Precise regex without matching substring 'work' in 'workflow')
  if (/\b(available|availability|work setup|work arrangement|relocat|hybrid|onsite|on-site|remote|full-time|fulltime|part-time|contract)\b/i.test(q) || q.includes('open to work') || q.includes('where can you work')) {
    return `✅ **Adrian's Work Availability:**\n\nAdrian is actively available for **Full-Time & Contract roles**:\n• **Work Setups:** Open to **On-Site** and **Hybrid** positions in Rizal & Metro Manila, as well as **Remote** worldwide.\n• **Core Specializations:** Workflow & API Automation (n8n), Backend Engineering (PHP/MySQL), and Full-Stack Web Development.\n• **Direct Contact:** [adrian002bca@gmail.com](mailto:adrian002bca@gmail.com) | WhatsApp: [(+63) 918-743-6765](https://api.whatsapp.com/send?phone=639187436765)`;
  }

  // 10. Technical Skills & Stack
  if (q.includes('skill') || q.includes('stack') || q.includes('tech') || q.includes('language') || q.includes('tool') || q.includes('framework')) {
    return `🛠️ **Adrian's Core Technical Stack:**\n\n• **Automation & AI:** n8n Workflow Architecture, Autonomous Agents, Cron Jobs, REST APIs, Custom JavaScript Code Nodes, JSON Schemas.\n• **Backend & Database:** PHP (OOP, MVC, CodeIgniter 4), SQL (MySQL / MariaDB), Relational Schema Design, O(1) in-memory Set deduplication.\n• **Frontend & 3D Web:** JavaScript (ES6+), Three.js / WebGL, HTML5 Canvas API, Tailwind CSS, Bootstrap 5, GSAP.\n• **DevOps & Cloud:** Linux VPS (Hostinger), Docker, Git/GitHub, Vercel, Cloudflare mitigation.`;
  }

  // 11. General Project Overview
  if (q.includes('project') || q.includes('portfolio') || q.includes('work done') || q.includes('built')) {
    return `💻 **Adrian's Live Full-Stack Systems:**\n\n• **[Production n8n Fleet]:** 25+ workflows on Linux VPS, 10,000+ rows/week, 99.8% uptime.\n• **[QRYPT Gatepass & Attendance System](https://qrypt.great-site.net/):** Awarded **Best Capstone Project** — PHP, MySQL, JavaScript & WebRTC camera QR scanner with real-time logging.\n• **[AppTrade Multi-Portal Commerce](https://sampleappweb.great-site.net/):** Full-stack retail POS & e-commerce with <500ms barcode scanning.\n• **[OBI Spatial Room Visualizer](https://obi-roomvisualizer.great-site.net/):** HTML5 Canvas matrix layout engine with instant PDF export (live on **[obiasia.com](https://obiasia.com)**).`;
  }

  // 12. Contact / Direct Lead Capture
  if (/((\+?\d[\d\s-]{7,}\d)|([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})|call me|hire|job|opportunity|reach me|my name is)/i.test(q) || q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('whatsapp') || q.includes('reach')) {
    return `📩 **Contact & Collaboration Channels:**\n\nAdrian is actively available for **Full-Time & Contract roles** (On-Site, Hybrid in Rizal/Metro Manila, and Remote)!\n\n• **Email:** [adrian002bca@gmail.com](mailto:adrian002bca@gmail.com)\n• **Phone / WhatsApp:** [(+63) 918-743-6765](https://api.whatsapp.com/send?phone=639187436765)\n• **Location:** Rizal, Philippines\n• **LinkedIn:** [linkedin.com/in/adrian-justin-san-diego](https://linkedin.com/in/adrian-justin-san-diego)\n• **GitHub:** [github.com/adrian002bca-prog](https://github.com/adrian002bca-prog)\n• **1-Page ATS Resume:** [Download Resume (PDF)](https://adrian-sandiego.vercel.app/resume.pdf)`;
  }

  // Default Fallback
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

    // Trigger Telegram notification in background without blocking response
    const isContactLead = /((\+?\d[\d\s-]{7,}\d)|([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})|call me|hire|job|opportunity|interview|schedule|meeting|reach me|my name is|contact me)/i.test(message);
    if (isContactLead) {
      dispatchTelegramNotification(message, sessionId).catch((e) => console.log('[Background TG error]:', e.message));
    }

    // 1. Try Live n8n Webhook first if configured (Strict 3.5s timeout)
    const webhookUrl = customWebhookUrl || process.env.N8N_WEBHOOK_URL;
    if (webhookUrl && webhookUrl.startsWith('http')) {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 3500);
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
        // Automatic fast failover to direct Google Gemini API
      }
    }

    // 2. Call Google Gemini API (Strict 4s timeout per attempt, valid model targets)
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

      const modelsToTry = ['gemini-1.5-flash', 'gemini-2.0-flash'];
      for (const modelName of modelsToTry) {
        try {
          const geminiController = new AbortController();
          const geminiTimeout = setTimeout(() => geminiController.abort(), 4000);

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
            }),
            signal: geminiController.signal
          });
          clearTimeout(geminiTimeout);

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
          // Fast try next model or instant knowledge fallback
        }
      }
    }

    // 3. Built-in Instant Knowledge Base Fallback (Sub-second response guarantee)
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
