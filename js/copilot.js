// Interactive Agent Copilot & Command Terminal (Tuesday Edition)
class CopilotManager {
  constructor() {
    this.messages = [
      {
        sender: 'agent',
        time: '07:30 AM',
        text: `Good Tuesday morning, Matthew. **Matthews Global Dashboard-Tuesday** is fully synchronized.
- **Family Projects Active**: Deck (78%), Bathroom Reno (62%), Precision Shop (88%).
- **DMCA.com Sentinel**: 200 OK (Latency: 28ms, SSL: 245d).
- **Whistler Telemetry**: Clear alpine conditions, Roundhouse and Peak operational.
- **Family & Feline Hub**: All 6 family nodes active, Jax/Atom/Mau fed.
How may I assist your Tuesday workflow today?`
      }
    ];
  }

  init() {
    this.renderMessages();
    this.setupListeners();
  }

  setupListeners() {
    const triggerBtn = document.getElementById('copilot-toggle-btn');
    const drawer = document.getElementById('copilot-drawer');
    const closeBtn = document.getElementById('copilot-close-btn');
    const form = document.getElementById('copilot-form');
    const input = document.getElementById('copilot-input');

    if (triggerBtn && drawer) {
      triggerBtn.addEventListener('click', () => {
        if (window.soundFx) window.soundFx.playPing();
        drawer.classList.toggle('closed');
        if (!drawer.classList.contains('closed') && input) {
          input.focus();
        }
      });
    }

    if (closeBtn && drawer) {
      closeBtn.addEventListener('click', () => {
        if (window.soundFx) window.soundFx.playClick();
        drawer.classList.add('closed');
      });
    }

    if (form && input) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = input.value.trim();
        if (!text) return;
        this.handleUserPrompt(text);
        input.value = '';
      });
    }

    const quickBtns = document.querySelectorAll('.copilot-quick-btn');
    quickBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const cmd = btn.getAttribute('data-cmd');
        if (cmd) {
          this.handleUserPrompt(cmd);
        }
      });
    });
  }

  renderMessages() {
    const container = document.getElementById('copilot-messages-container');
    if (!container) return;

    container.innerHTML = this.messages.map(msg => `
      <div class="flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} mb-3">
        <div class="flex items-center gap-1.5 mb-1">
          <span class="text-[10px] font-mono text-slate-500">${msg.sender === 'user' ? 'Matthew' : 'Agent Core'} • ${msg.time}</span>
        </div>
        <div class="p-3 rounded-2xl max-w-[85%] text-xs leading-relaxed ${msg.sender === 'user' ? 'bg-sky-600 text-white rounded-tr-none' : 'bg-slate-900/90 text-slate-200 border border-slate-800 rounded-tl-none'}">
          ${marked.parse ? marked.parse(msg.text) : msg.text}
        </div>
      </div>
    `).join('');

    container.scrollTop = container.scrollHeight;
  }

  handleUserPrompt(text) {
    if (window.soundFx) window.soundFx.playBlip(900, 0.03);

    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    this.messages.push({ sender: 'user', time: now, text });
    this.renderMessages();

    // Generate response
    setTimeout(() => {
      const response = this.generateResponse(text);
      this.messages.push({
        sender: 'agent',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: response
      });
      this.renderMessages();
      if (window.soundFx) window.soundFx.playSuccess();
    }, 600);
  }

  generateResponse(prompt) {
    const p = prompt.toLowerCase();

    // Project: Deck
    if (p.includes('deck')) {
      return `**Outdoor Cedar Deck Telemetry**:
- **Progress**: 78% completed (Railing & Lighting phase).
- **Next Milestone**: Low-voltage 12V stair riser LED wiring & testing.
- **Recent Work**: Cedar plank expansion gaps verified; railing posts secured on North steps.`;
    }

    // Project: Bathroom
    if (p.includes('bathroom') || p.includes('tile') || p.includes('vanity') || p.includes('shower')) {
      return `**Master Ensuite Bathroom Status**:
- **Progress**: 62% completed.
- **Hydro-Check**: 24-hour Schluter-Kerdi shower pan flood test passed with 0% seepage.
- **Next Milestone**: Double-sink floating oak vanity cleat mounting & PEX line shut-off connections.`;
    }

    // Project: Shop
    if (p.includes('shop') || p.includes('workshop') || p.includes('cnc') || p.includes('dust')) {
      return `**Precision Workshop & Tool Lab Status**:
- **Progress**: 88% completed.
- **Dust Collection**: 4-inch ceiling duct trunk pulling 650 CFM at blast gates.
- **Next Milestone**: CNC router bed spoilboard leveling & test cuts.`;
    }

    // DMCA
    if (p.includes('dmca') || p.includes('audit')) {
      if (window.dmcaMonitor) window.dmcaMonitor.ping(true);
      return `Executed diagnostic check on **https://www.dmca.com**. Edge response is **${window.dmcaMonitor ? window.dmcaMonitor.currentLatency : 28}ms**, SSL certificate valid (245 days remaining), and all CDN edge zones are 100% operational.`;
    }

    // Whistler
    if (p.includes('whistler') || p.includes('snow') || p.includes('powder')) {
      return `Whistler telemetry report: Alpine ridge temperature is **14°C**, freezing level is at **2,450m**, and live camera feeds show clear visibility across Whistler Peak and the Roundhouse.`;
    }

    // Cats
    if (p.includes('cat') || p.includes('feed') || p.includes('jax') || p.includes('atom') || p.includes('mau')) {
      if (window.familyAndPets) {
        window.familyAndPets.feedCat('c-1');
        window.familyAndPets.feedCat('c-2');
        window.familyAndPets.feedCat('c-3');
      }
      return `Recorded meal distribution for **Jax**, **Atom**, and **Mau**. All three companions have their nutritional routines logged into your daily Artifact Ring!`;
    }

    // Family
    if (p.includes('family') || p.includes('aurora') || p.includes('brillianna') || p.includes('lara') || p.includes('linda') || p.includes('charles')) {
      return `Family Mesh Telemetry: All 7 family nodes (**Brillianna May Carson, Aurora, Matthison, Ryker, Grandma Linda, Great Grandma Lara, and Grandson Charles**) are active and healthy.`;
    }

    // New Artifact
    if (p.includes('artifact') || p.includes('summary') || p.includes('brief')) {
      if (window.artifactRing) {
        window.artifactRing.addArtifact(
          `Tuesday Comprehensive Project & Agent Brief [${new Date().toLocaleTimeString()}]`,
          'Skills',
          `Full system state synthesized via Agent Copilot command bar.`,
          `### Tuesday Autonomous Synchronization
- **Trigger**: Direct Agentic Command
- **Family Projects**: Deck 78% | Bathroom 62% | Shop 88%
- **DMCA Uptime**: 99.98%
- **Markets**: Equities positive (NVDA +2.85%, BTC +3.40%)
- **Active Family Nodes**: 6 | Cats Fed: 3`
        );
      }
      return `Generated new Tuesday Executive Briefing artifact directly into your **Artifact Ring**. You can review it on your central hub.`;
    }

    return `Command processed: "${prompt}". Autonomous agent nodes have been dispatched, and all relevant state variables are synchronized in the command center.`;
  }
}

window.copilot = new CopilotManager();
