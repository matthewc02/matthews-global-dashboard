// ARMS Framework & Glowing Artifact Ring Visualizer
// Applications, Routines, Memory, Skills + Daily Activity & Task Artifacts (Tuesday Edition)

const ARTIFACT_STORAGE_KEY = 'matthews_artifacts_v1';

const defaultArtifacts = [
  {
    id: 'art-001',
    title: 'Tuesday Executive AI Intelligence Brief',
    category: 'Memory',
    timestamp: '07:15 AM',
    summary: 'Synthesized 16 VIP emails, DMCA edge uptime, Whistler alpine weather, and Deck / Shop build milestones.',
    tag: 'Executive',
    badgeClass: 'hud-badge-purple',
    content: `### Tuesday Executive Daily Summary
- **DMCA.com Infrastructure**: 100% operational, average latency 29ms across CDN edge nodes.
- **Family Projects Active**:
  - **Deck**: Low-voltage stair LED wiring underway (78%).
  - **Bathroom**: Shower niche tiled, vanity plumbing prep (62%).
  - **Shop**: Cyclone dust collection testing passed (88%).
- **Whistler Telemetry**: Alpine freezing level at 2,450m, clear skies across Peak and Roundhouse.
- **Markets**: NVDA futures +2.8%, Tech momentum bullish.`
  },
  {
    id: 'art-002',
    title: 'Deck & Pergola Low-Voltage Lighting Schematic',
    category: 'Skills',
    timestamp: '06:45 AM',
    summary: '12V DC waterproof step riser LED wiring run and twilight photocell sensor integration spec.',
    tag: 'Deck Work',
    badgeClass: 'hud-badge-amber',
    content: `### Deck Electrical & Lighting Specification
- **System**: 12V DC Low-Voltage Landscape Driver (150W Stainless Housing)
- **Fixtures**: 8x Recessed Warm-White (2700K) Step Riser Puck LEDs
- **Wire Run**: 14/2 Direct Burial Oxygen-Free Copper Cable
- **Status**: Tested and waterproofed with marine-grade heat shrink tubing.`
  },
  {
    id: 'art-003',
    title: 'Bathroom Renovation Plumbing & Schluter Hydro-Check',
    category: 'Routines',
    timestamp: '06:15 AM',
    summary: '24-hour shower pan flood test passed with 0% level drop. Ready for double-sink vanity mounting.',
    tag: 'Bathroom',
    badgeClass: 'hud-badge-cyan',
    content: `### Ensuite Bathroom Hydrostatic Report
- **Substrate**: Schluter-Kerdi Waterproof Membrane & Kerdi-Drain
- **Flood Test**: 24-hour test bowl holding constant water volume (Zero seepage detected)
- **Vanity Specs**: 60-inch Solid Oak Floating Vanity with dual undermount ceramic basins
- **Next Step**: Hang floating vanity cleats and connect PEX shut-off valves.`
  },
  {
    id: 'art-004',
    title: 'DMCA Edge Infrastructure Diagnostic Log',
    category: 'Applications',
    timestamp: '05:45 AM',
    summary: 'Automated health probe to https://www.dmca.com. SSL valid for 245 days. DNS propagation healthy.',
    tag: 'Security',
    badgeClass: 'hud-badge-emerald',
    content: `### DMCA.com Health Audit
- **Endpoint**: https://www.dmca.com
- **Response Code**: 200 OK
- **Edge Latency**: 27ms (US-West), 39ms (US-East)
- **SSL Certificate**: Let's Encrypt Authority X3 (TLS 1.3 Active)
- **Security Score**: A+ / Strict Transport Security Enabled`
  },
  {
    id: 'art-005',
    title: 'Shop Dust Collection Cyclone CFM Calibration',
    category: 'Skills',
    timestamp: '05:10 AM',
    summary: 'Air velocity benchmarked across 4-inch main trunk line. Table saw drop pulling 650 CFM.',
    tag: 'Shop Lab',
    badgeClass: 'hud-badge-emerald',
    content: `### Workshop Airflow Telemetry
- **Blower**: 2HP Single-Phase Induction Motor with 12-inch Aluminum Impeller
- **Filtration**: 1-Micron Spun-Bonded Pleated HEPA Canister
- **Static Pressure**: 7.2 in. W.G. at machine ports
- **Result**: Meets OSHA wood dust capture threshold for enclosed workspaces.`
  }
];

class ArtifactRingManager {
  constructor() {
    this.artifacts = this.loadArtifacts();
    this.canvas = null;
    this.ctx = null;
    this.animationId = null;
    this.angle = 0;
    this.selectedCategory = 'All';

    this.armsMetrics = {
      applications: 91,
      routines: 95,
      memory: 86,
      skills: 98
    };
  }

  loadArtifacts() {
    try {
      const stored = localStorage.getItem(ARTIFACT_STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {}
    return defaultArtifacts;
  }

  saveArtifacts() {
    try {
      localStorage.setItem(ARTIFACT_STORAGE_KEY, JSON.stringify(this.artifacts));
    } catch (e) {}
  }

  init() {
    this.canvas = document.getElementById('artifact-ring-canvas');
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    
    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());

    this.startAnimation();
    this.renderArtifactList();
    this.setupListeners();
  }

  resizeCanvas() {
    if (!this.canvas) return;
    const rect = this.canvas.parentElement.getBoundingClientRect();
    const size = Math.min(rect.width, 320);
    this.canvas.width = size * window.devicePixelRatio;
    this.canvas.height = size * window.devicePixelRatio;
    this.canvas.style.width = `${size}px`;
    this.canvas.style.height = `${size}px`;
    if (this.ctx) {
      this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    }
  }

  startAnimation() {
    const draw = () => {
      this.drawRing();
      this.angle += 0.008;
      this.animationId = requestAnimationFrame(draw);
    };
    draw();
  }

  drawRing() {
    if (!this.ctx || !this.canvas) return;
    const size = parseFloat(this.canvas.style.width) || 300;
    const ctx = this.ctx;
    const centerX = size / 2;
    const centerY = size / 2;

    ctx.clearRect(0, 0, size, size);

    // Rings Data: [name, radius, progress, color, glowColor]
    const rings = [
      { name: 'Skills', r: size * 0.44, val: this.armsMetrics.skills, col: '#a855f7', glow: 'rgba(168, 85, 247, 0.4)' },
      { name: 'Routines', r: size * 0.36, val: this.armsMetrics.routines, col: '#38bdf8', glow: 'rgba(56, 189, 248, 0.4)' },
      { name: 'Memory', r: size * 0.28, val: this.armsMetrics.memory, col: '#10b981', glow: 'rgba(16, 185, 129, 0.4)' },
      { name: 'Apps', r: size * 0.20, val: this.armsMetrics.applications, col: '#f59e0b', glow: 'rgba(245, 158, 11, 0.4)' }
    ];

    // Center Core Glow
    const gradient = ctx.createRadialGradient(centerX, centerY, 5, centerX, centerY, size * 0.45);
    gradient.addColorStop(0, 'rgba(56, 189, 248, 0.15)');
    gradient.addColorStop(0.5, 'rgba(168, 85, 247, 0.08)');
    gradient.addColorStop(1, 'transparent');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(centerX, centerY, size * 0.45, 0, Math.PI * 2);
    ctx.fill();

    // Draw background tracks and active glowing progress arcs
    rings.forEach((ring, idx) => {
      // Track background
      ctx.beginPath();
      ctx.arc(centerX, centerY, ring.r, 0, Math.PI * 2);
      ctx.lineWidth = 6;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
      ctx.stroke();

      // Progress Arc
      const startAngle = -Math.PI / 2 + (idx * 0.2);
      const endAngle = startAngle + (Math.PI * 2 * (ring.val / 100));

      ctx.save();
      ctx.shadowColor = ring.glow;
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.arc(centerX, centerY, ring.r, startAngle, endAngle);
      ctx.lineWidth = 6;
      ctx.lineCap = 'round';
      ctx.strokeStyle = ring.col;
      ctx.stroke();
      ctx.restore();

      // Rotating Node Particle
      const particleAngle = this.angle * (1 + idx * 0.3) + idx;
      const px = centerX + Math.cos(particleAngle) * ring.r;
      const py = centerY + Math.sin(particleAngle) * ring.r;

      ctx.save();
      ctx.shadowColor = ring.col;
      ctx.shadowBlur = 10;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(px, py, 3.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });

    // Center Display
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 22px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`${this.artifacts.length}`, centerX, centerY - 8);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '10px "JetBrains Mono", monospace';
    ctx.fillText('DAILY ARTIFACTS', centerX, centerY + 14);
  }

  renderArtifactList() {
    const listEl = document.getElementById('artifact-items-list');
    if (!listEl) return;

    const filtered = this.selectedCategory === 'All' 
      ? this.artifacts 
      : this.artifacts.filter(a => a.category === this.selectedCategory);

    listEl.innerHTML = filtered.map(item => `
      <div class="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-sky-500/40 transition-all cursor-pointer group mb-2" onclick="window.artifactRing.showArtifactModal('${item.id}')">
        <div class="flex items-center justify-between gap-2 mb-1">
          <span class="hud-badge ${item.badgeClass}">${item.category}</span>
          <span class="text-xs font-mono text-slate-500">${item.timestamp}</span>
        </div>
        <h4 class="text-sm font-semibold text-slate-200 group-hover:text-sky-300 transition-colors line-clamp-1">${item.title}</h4>
        <p class="text-xs text-slate-400 line-clamp-2 mt-1">${item.summary}</p>
      </div>
    `).join('');
  }

  setupListeners() {
    const filterBtns = document.querySelectorAll('.artifact-filter-btn');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        if (window.soundFx) window.soundFx.playClick();
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.selectedCategory = btn.getAttribute('data-cat') || 'All';
        this.renderArtifactList();
      });
    });
  }

  showArtifactModal(id) {
    if (window.soundFx) window.soundFx.playPing();
    const item = this.artifacts.find(a => a.id === id);
    if (!item) return;

    const modalBackdrop = document.getElementById('artifact-modal');
    if (!modalBackdrop) return;

    document.getElementById('modal-art-title').textContent = item.title;
    document.getElementById('modal-art-category').textContent = item.category;
    document.getElementById('modal-art-time').textContent = item.timestamp;
    document.getElementById('modal-art-summary').textContent = item.summary;
    document.getElementById('modal-art-content').innerHTML = marked.parse ? marked.parse(item.content) : `<pre class="text-xs font-mono text-slate-300 whitespace-pre-wrap">${item.content}</pre>`;

    modalBackdrop.classList.remove('hidden');
  }

  closeModal() {
    if (window.soundFx) window.soundFx.playClick();
    const modalBackdrop = document.getElementById('artifact-modal');
    if (modalBackdrop) modalBackdrop.classList.add('hidden');
  }

  addArtifact(title, category, summary, content) {
    const newArt = {
      id: `art-${Date.now()}`,
      title,
      category,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      summary,
      tag: category,
      badgeClass: category === 'Skills' ? 'hud-badge-purple' : category === 'Routines' ? 'hud-badge-cyan' : category === 'Memory' ? 'hud-badge-emerald' : 'hud-badge-amber',
      content
    };

    this.artifacts.unshift(newArt);
    this.saveArtifacts();
    this.renderArtifactList();
    if (window.soundFx) window.soundFx.playSuccess();
  }
}

window.artifactRing = new ArtifactRingManager();
