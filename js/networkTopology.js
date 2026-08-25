// Universal Networks Topology & Global Mesh Visualizer
// Real-time interactive node graph representing Matthew's agentic ecosystem

class NetworkTopologyManager {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.nodes = [];
    this.links = [];
    this.particles = [];
    this.animationId = null;
    this.hoveredNode = null;
    this.mouse = { x: 0, y: 0 };
  }

  init() {
    this.canvas = document.getElementById('network-topology-canvas');
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');

    this.resizeCanvas();
    this.setupNodes();
    this.setupListeners();
    this.startAnimation();
  }

  resizeCanvas() {
    if (!this.canvas) return;
    const rect = this.canvas.parentElement.getBoundingClientRect();
    const width = rect.width;
    const height = 180;
    this.canvas.width = width * window.devicePixelRatio;
    this.canvas.height = height * window.devicePixelRatio;
    this.canvas.style.width = `${width}px`;
    this.canvas.style.height = `${height}px`;
    if (this.ctx) {
      this.ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    }
  }

  setupNodes() {
    const width = parseFloat(this.canvas.style.width) || 400;
    const height = 180;
    const cx = width / 2;
    const cy = height / 2;

    this.nodes = [
      { id: 0, label: 'Matthew Core OS', type: 'core', x: cx, y: cy, vx: 0, vy: 0, r: 12, col: '#38bdf8', glow: 'rgba(56, 189, 248, 0.6)' },
      { id: 1, label: 'DMCA.com Sentinel', type: 'monitor', x: cx - width * 0.32, y: cy - 40, vx: (Math.random() - 0.5) * 0.2, vy: (Math.random() - 0.5) * 0.2, r: 8, col: '#10b981', glow: 'rgba(16, 185, 129, 0.5)' },
      { id: 2, label: 'Whistler Alpine Node', type: 'weather', x: cx - width * 0.22, y: cy + 45, vx: (Math.random() - 0.5) * 0.2, vy: (Math.random() - 0.5) * 0.2, r: 8, col: '#38bdf8', glow: 'rgba(56, 189, 248, 0.5)' },
      { id: 3, label: 'Autonomous Agent Hive', type: 'agent', x: cx + width * 0.28, y: cy - 45, vx: (Math.random() - 0.5) * 0.2, vy: (Math.random() - 0.5) * 0.2, r: 9, col: '#a855f7', glow: 'rgba(168, 85, 247, 0.5)' },
      { id: 4, label: 'Family & Feline Mesh', type: 'family', x: cx + width * 0.24, y: cy + 48, vx: (Math.random() - 0.5) * 0.2, vy: (Math.random() - 0.5) * 0.2, r: 8, col: '#f59e0b', glow: 'rgba(245, 158, 11, 0.5)' },
      { id: 5, label: 'Global Market Stream', type: 'market', x: cx + width * 0.38, y: cy + 8, vx: (Math.random() - 0.5) * 0.2, vy: (Math.random() - 0.5) * 0.2, r: 7, col: '#34d399', glow: 'rgba(52, 211, 153, 0.5)' },
      { id: 6, label: 'Cloud CDN Anycast', type: 'cloud', x: cx - width * 0.38, y: cy + 12, vx: (Math.random() - 0.5) * 0.2, vy: (Math.random() - 0.5) * 0.2, r: 7, col: '#818cf8', glow: 'rgba(129, 140, 248, 0.5)' }
    ];

    this.links = [
      { source: 0, target: 1 },
      { source: 0, target: 2 },
      { source: 0, target: 3 },
      { source: 0, target: 4 },
      { source: 3, target: 5 },
      { source: 1, target: 6 },
      { source: 2, target: 6 }
    ];

    // Data packet animations
    this.particles = [];
    for (let i = 0; i < 14; i++) {
      this.particles.push({
        linkIndex: Math.floor(Math.random() * this.links.length),
        t: Math.random(),
        speed: 0.006 + Math.random() * 0.008
      });
    }
  }

  setupListeners() {
    window.addEventListener('resize', () => {
      this.resizeCanvas();
      this.setupNodes();
    });

    this.canvas.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouse.x = e.clientX - rect.left;
      this.mouse.y = e.clientY - rect.top;

      let found = null;
      for (const node of this.nodes) {
        const dx = this.mouse.x - node.x;
        const dy = this.mouse.y - node.y;
        if (Math.hypot(dx, dy) < node.r + 6) {
          found = node;
          break;
        }
      }
      this.hoveredNode = found;
    });

    this.canvas.addEventListener('click', () => {
      if (this.hoveredNode && window.soundFx) {
        window.soundFx.playPing();
      }
    });
  }

  startAnimation() {
    const render = () => {
      this.updatePhysics();
      this.draw();
      this.animationId = requestAnimationFrame(render);
    };
    render();
  }

  updatePhysics() {
    const width = parseFloat(this.canvas.style.width) || 400;
    const height = 180;

    // Small floating wander
    this.nodes.forEach(node => {
      if (node.id === 0) return; // Keep core anchored
      node.x += node.vx;
      node.y += node.vy;

      if (node.x < 30 || node.x > width - 30) node.vx *= -1;
      if (node.y < 20 || node.y > height - 20) node.vy *= -1;
    });

    // Update data packets
    this.particles.forEach(p => {
      p.t += p.speed;
      if (p.t > 1) {
        p.t = 0;
        p.linkIndex = Math.floor(Math.random() * this.links.length);
      }
    });
  }

  draw() {
    if (!this.ctx || !this.canvas) return;
    const ctx = this.ctx;
    const width = parseFloat(this.canvas.style.width) || 400;
    const height = 180;

    ctx.clearRect(0, 0, width, height);

    // Draw Links
    this.links.forEach(link => {
      const src = this.nodes[link.source];
      const tgt = this.nodes[link.target];
      if (!src || !tgt) return;

      ctx.beginPath();
      ctx.moveTo(src.x, src.y);
      ctx.lineTo(tgt.x, tgt.y);
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.18)';
      ctx.lineWidth = 1.2;
      ctx.stroke();
    });

    // Draw Packet Particles
    this.particles.forEach(p => {
      const link = this.links[p.linkIndex];
      if (!link) return;
      const src = this.nodes[link.source];
      const tgt = this.nodes[link.target];
      if (!src || !tgt) return;

      const px = src.x + (tgt.x - src.x) * p.t;
      const py = src.y + (tgt.y - src.y) * p.t;

      ctx.save();
      ctx.shadowColor = '#00f2fe';
      ctx.shadowBlur = 8;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(px, py, 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });

    // Draw Nodes
    this.nodes.forEach(node => {
      const isHovered = this.hoveredNode === node;

      // Glow circle
      ctx.save();
      ctx.shadowColor = node.glow;
      ctx.shadowBlur = isHovered ? 20 : 12;
      ctx.fillStyle = node.col;
      ctx.beginPath();
      ctx.arc(node.x, node.y, isHovered ? node.r + 3 : node.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Inner dot
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.r * 0.45, 0, Math.PI * 2);
      ctx.fill();

      // Node label
      ctx.fillStyle = isHovered ? '#38bdf8' : '#cbd5e1';
      ctx.font = '10px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.fillText(node.label, node.x, node.y + node.r + 12);
    });
  }
}

window.networkTopology = new NetworkTopologyManager();
