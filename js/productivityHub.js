// Productivity Hub: Emails, Tasks/Routines, Calendar, Stocks & Market, Top News (Tuesday Edition)

const EMAILS_STORAGE_KEY = 'matthews_emails_v1';
const TASKS_STORAGE_KEY = 'matthews_tasks_v1';

const defaultEmails = [
  {
    id: 'em-1',
    from: 'Legal & IP Operations',
    senderEmail: 'compliance@dmca.com',
    subject: 'Tuesday DMCA Shield Automated Takedown Verification',
    snippet: 'All partner search index removals verified. Global edge uptime tracking at 99.98% SLA.',
    time: '07:22 AM',
    tag: 'Urgent',
    tagClass: 'hud-badge-rose',
    unread: true
  },
  {
    id: 'em-2',
    from: 'Laura (Executive Flow)',
    senderEmail: 'laura@globalexecutive.io',
    subject: 'Tuesday Strategy Sync & Ensuite Bathroom Fixture Selection',
    snippet: 'Hey Matthew! I reviewed the vanity plumbing schematic and the matte black shower hardware. Let us finalize during our 2:00 PM check-in.',
    time: '06:55 AM',
    tag: 'Priority',
    tagClass: 'hud-badge-purple',
    unread: true
  },
  {
    id: 'em-3',
    from: 'Whistler Blackcomb Dispatch',
    senderEmail: 'snowreport@whistlerblackcomb.com',
    subject: 'Tuesday Alpine Telemetry: Clear Skies & Early Gondola Access',
    snippet: 'Pristine mountain visibility on Peak Express. Freezing level steady at 2,450m. Trail conditions fast and packed powder.',
    time: '06:10 AM',
    tag: 'Alpine',
    tagClass: 'hud-badge-cyan',
    unread: false
  },
  {
    id: 'em-4',
    from: 'Timber & Hardware Supplier',
    senderEmail: 'orders@cedarwoodsupply.ca',
    subject: 'Order Confirmed: 12V LED Deck Riser Lights & Outdoor Sealant',
    snippet: 'Your order for low-voltage waterproof LED pucks and UV cedar stain is staged for afternoon delivery.',
    time: '05:40 AM',
    tag: 'Deck Supplies',
    tagClass: 'hud-badge-amber',
    unread: false
  }
];

const defaultTasks = [
  { id: 'tk-1', text: 'Verify DMCA.com automated health probe & SSL status', done: true, priority: 'High', category: 'Security' },
  { id: 'tk-2', text: 'Wire 12V LED step lights on North Deck stairs', done: false, priority: 'High', category: 'Deck' },
  { id: 'tk-3', text: 'Hang Schluter-Kerdi vanity mounting cleats in Bathroom', done: false, priority: 'High', category: 'Bathroom' },
  { id: 'tk-4', text: 'Level CNC router spoilboard & run test cut in Shop', done: false, priority: 'Medium', category: 'Shop' },
  { id: 'tk-5', text: 'Confirm Aurora gymnastics gear and ride at 4:30 PM', done: false, priority: 'Medium', category: 'Family' },
  { id: 'tk-6', text: 'Check Jax, Atom, and Mau morning feeding and water fountain', done: true, priority: 'Routine', category: 'Cats' }
];

const calendarEvents = [
  { id: 'ev-1', time: '08:30 AM', duration: '30m', title: 'Tuesday Standup & AI Agent Workflow Review', host: 'Autonomous Core', badge: 'Active Soon', isNext: true },
  { id: 'ev-2', time: '10:00 AM', duration: '90m', title: 'Shop & Deck Build Sprint: Wiring & CNC Spindle', host: 'Workshop Lab', badge: 'Project Work', isNext: false },
  { id: 'ev-3', time: '02:00 PM', duration: '45m', title: 'Laura Strategy Session & Bathroom Fixtures', host: 'Laura', badge: 'Meeting', isNext: false },
  { id: 'ev-4', time: '04:30 PM', duration: '45m', title: 'Aurora Gymnastics Activity Dispatch', host: 'Family Calendar', badge: 'Family', isNext: false },
  { id: 'ev-5', time: '06:30 PM', duration: '60m', title: 'Family Dinner & Evening Project Check-In', host: 'Household Hub', badge: 'Personal', isNext: false }
];

const stockData = [
  { symbol: 'NVDA', name: 'NVIDIA Corp', price: 131.20, change: '+2.85%', positive: true, spark: [126, 127, 128, 129, 130, 131.2] },
  { symbol: 'AAPL', name: 'Apple Inc', price: 228.40, change: '+1.32%', positive: true, spark: [224, 225, 226, 227, 227.5, 228.4] },
  { symbol: 'GOOGL', name: 'Alphabet Inc', price: 171.15, change: '+1.94%', positive: true, spark: [166, 167, 168, 169, 170, 171.15] },
  { symbol: 'MSFT', name: 'Microsoft Corp', price: 452.80, change: '+1.05%', positive: true, spark: [447, 448, 449, 450, 451, 452.8] },
  { symbol: 'TSLA', name: 'Tesla Inc', price: 218.60, change: '+2.10%', positive: true, spark: [213, 214, 215, 216, 217, 218.6] },
  { symbol: 'BTC/USD', name: 'Bitcoin', price: 65480, change: '+3.40%', positive: true, spark: [63200, 63800, 64200, 64800, 65100, 65480] },
  { symbol: 'ETH/USD', name: 'Ethereum', price: 3540, change: '+2.90%', positive: true, spark: [3420, 3450, 3480, 3500, 3520, 3540] }
];

const newsFeed = [
  {
    title: 'Autonomous Agentic OS 2.0 Sets Benchmark for Multi-Agent Task Orchestration',
    source: 'TechCrunch AI',
    time: '20m ago',
    badge: 'hud-badge-purple',
    category: 'AI Agents',
    summary: 'Enterprises deploy recursive sub-agents to manage complex physical-world projects, code repositories, and real-time infrastructure.'
  },
  {
    title: 'Whistler Alpine Weather Network Deploys Advanced High-Altitude Sensors',
    source: 'BC Alpine Report',
    time: '45m ago',
    badge: 'hud-badge-cyan',
    category: 'BC Alpine',
    summary: 'Sub-meter snowpack depth sensors and real-time wind shear telemetry now live across Blackcomb and Peak summits.'
  },
  {
    title: 'Semiconductor Index Reaches All-Time High on Enterprise AI Workstation Expansion',
    source: 'Bloomberg Markets',
    time: '1h ago',
    badge: 'hud-badge-emerald',
    category: 'Markets',
    summary: 'Global equities surge on strong hardware capex forecasts and automated manufacturing productivity gains.'
  },
  {
    title: 'Digital Millennium Copyright Act Automated Edge Sentinel Upgrades Verification Protocol',
    source: 'Cyber IP Review',
    time: '2h ago',
    badge: 'hud-badge-amber',
    category: 'Copyright',
    summary: 'New cryptographic attribution engine speeds up content verification across global CDN partner caches.'
  }
];

class ProductivityHubManager {
  constructor() {
    this.emails = this.loadData(EMAILS_STORAGE_KEY, defaultEmails);
    this.tasks = this.loadData(TASKS_STORAGE_KEY, defaultTasks);
    this.selectedStockIndex = 0;
  }

  loadData(key, fallback) {
    try {
      const stored = localStorage.getItem(key);
      if (stored) return JSON.parse(stored);
    } catch (e) {}
    return fallback;
  }

  saveData(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {}
  }

  init() {
    this.renderEmails();
    this.renderTasks();
    this.renderCalendar();
    this.renderStocks();
    this.renderNews();
    this.setupListeners();
  }

  renderEmails() {
    const container = document.getElementById('emails-list-container');
    if (!container) return;

    container.innerHTML = this.emails.map(email => `
      <div class="p-3 rounded-xl ${email.unread ? 'bg-slate-900/80 border-sky-500/40' : 'bg-slate-900/40 border-slate-800/80'} border hover:border-sky-400/50 transition-all cursor-pointer group mb-2" onclick="window.productivityHub.openEmailModal('${email.id}')">
        <div class="flex items-center justify-between gap-2 mb-1">
          <div class="flex items-center gap-2">
            ${email.unread ? '<span class="pulse-dot cyan"></span>' : ''}
            <span class="text-xs font-bold text-slate-200 group-hover:text-sky-300 truncate">${email.from}</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="hud-badge ${email.tagClass} text-[10px]">${email.tag}</span>
            <span class="text-[11px] font-mono text-slate-500">${email.time}</span>
          </div>
        </div>
        <h4 class="text-xs font-semibold text-slate-300 line-clamp-1">${email.subject}</h4>
        <p class="text-[11px] text-slate-400 line-clamp-1 mt-0.5">${email.snippet}</p>
      </div>
    `).join('');
  }

  renderTasks() {
    const container = document.getElementById('tasks-list-container');
    if (!container) return;

    container.innerHTML = this.tasks.map(task => `
      <div class="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-all mb-1.5 group">
        <label class="flex items-center gap-2.5 cursor-pointer flex-1 min-w-0">
          <input type="checkbox" ${task.done ? 'checked' : ''} onchange="window.productivityHub.toggleTask('${task.id}')" class="w-4 h-4 rounded bg-slate-950 border-slate-700 text-sky-500 focus:ring-0 focus:ring-offset-0 cursor-pointer" />
          <span class="text-xs ${task.done ? 'line-through text-slate-500' : 'text-slate-200 font-medium'} truncate group-hover:text-sky-300 transition-colors">${task.text}</span>
        </label>
        <span class="hud-badge ${task.category === 'Deck' ? 'hud-badge-amber' : task.category === 'Bathroom' ? 'hud-badge-cyan' : task.category === 'Shop' ? 'hud-badge-emerald' : task.category === 'Family' ? 'hud-badge-purple' : 'hud-badge-rose'} text-[9px] ml-2 flex-shrink-0">
          ${task.category}
        </span>
      </div>
    `).join('');
  }

  renderCalendar() {
    const container = document.getElementById('calendar-events-container');
    if (!container) return;

    container.innerHTML = calendarEvents.map(ev => `
      <div class="flex items-start gap-3 p-2.5 rounded-lg bg-slate-900/50 border ${ev.isNext ? 'border-sky-500/50 bg-sky-950/20' : 'border-slate-800'} mb-2">
        <div class="text-center font-mono py-1 px-2 rounded bg-slate-950/80 border border-slate-800 flex-shrink-0">
          <span class="text-xs font-bold text-sky-400 block">${ev.time.split(' ')[0]}</span>
          <span class="text-[9px] text-slate-500">${ev.time.split(' ')[1]}</span>
        </div>
        <div class="flex-1 min-w-0">
          <div class="flex items-center justify-between">
            <h4 class="text-xs font-bold text-slate-200 truncate">${ev.title}</h4>
            <span class="hud-badge ${ev.isNext ? 'hud-badge-cyan' : ev.badge === 'Project Work' ? 'hud-badge-amber' : 'hud-badge-purple'} text-[9px]">${ev.badge}</span>
          </div>
          <p class="text-[11px] text-slate-400 mt-0.5">Host: ${ev.host} • ${ev.duration}</p>
        </div>
      </div>
    `).join('');
  }

  renderStocks() {
    const container = document.getElementById('stocks-ticker-container');
    if (!container) return;

    container.innerHTML = stockData.map((st, idx) => `
      <div class="p-2.5 rounded-xl bg-slate-900/60 border ${idx === this.selectedStockIndex ? 'border-sky-500/50' : 'border-slate-800'} hover:border-sky-500/30 transition-all cursor-pointer flex flex-col justify-between" onclick="window.productivityHub.selectStock(${idx})">
        <div class="flex items-center justify-between">
          <span class="font-mono font-bold text-xs text-white">${st.symbol}</span>
          <span class="text-[11px] font-mono font-bold ${st.positive ? 'text-emerald-400' : 'text-rose-400'}">${st.change}</span>
        </div>
        <div class="mt-1 flex items-baseline justify-between">
          <span class="text-sm font-extrabold text-slate-200 font-mono">$${typeof st.price === 'number' && st.price > 1000 ? st.price.toLocaleString() : st.price.toFixed(2)}</span>
          <span class="text-[10px] text-slate-400 truncate">${st.name}</span>
        </div>
      </div>
    `).join('');

    this.drawMainStockChart();
  }

  selectStock(idx) {
    if (window.soundFx) window.soundFx.playClick();
    this.selectedStockIndex = idx;
    this.renderStocks();
  }

  drawMainStockChart() {
    const canvas = document.getElementById('main-stock-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = 110 * window.devicePixelRatio;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = '110px';
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    const st = stockData[this.selectedStockIndex];
    if (!st) return;

    const width = rect.width;
    const height = 110;
    ctx.clearRect(0, 0, width, height);

    const pts = st.spark;
    const minP = Math.min(...pts) * 0.99;
    const maxP = Math.max(...pts) * 1.01;
    const step = width / (pts.length - 1);

    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, st.positive ? 'rgba(16, 185, 129, 0.3)' : 'rgba(244, 63, 94, 0.3)');
    gradient.addColorStop(1, 'transparent');

    ctx.beginPath();
    pts.forEach((p, i) => {
      const x = i * step;
      const y = height - ((p - minP) / (maxP - minP)) * (height - 24) - 12;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();

    // Line
    ctx.save();
    ctx.strokeStyle = st.positive ? '#10b981' : '#f43f5e';
    ctx.lineWidth = 2.5;
    ctx.shadowColor = st.positive ? '#10b981' : '#f43f5e';
    ctx.shadowBlur = 10;
    ctx.beginPath();
    pts.forEach((p, i) => {
      const x = i * step;
      const y = height - ((p - minP) / (maxP - minP)) * (height - 24) - 12;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();
    ctx.restore();
  }

  renderNews() {
    const container = document.getElementById('news-feed-container');
    if (!container) return;

    container.innerHTML = newsFeed.map(news => `
      <div class="p-3 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-all mb-2">
        <div class="flex items-center justify-between mb-1">
          <span class="hud-badge ${news.badge} text-[9px]">${news.category}</span>
          <span class="text-[10px] font-mono text-slate-500">${news.source} • ${news.time}</span>
        </div>
        <h4 class="text-xs font-bold text-slate-200 hover:text-sky-300 transition-colors">${news.title}</h4>
        <p class="text-[11px] text-slate-400 mt-1">${news.summary}</p>
      </div>
    `).join('');
  }

  setupListeners() {
    const addTaskBtn = document.getElementById('add-task-btn');
    if (addTaskBtn) {
      addTaskBtn.addEventListener('click', () => {
        const text = prompt('Enter new task description:');
        if (text && text.trim()) {
          const cat = prompt('Enter category (Deck, Bathroom, Shop, Family, Security):', 'Deck') || 'Personal';
          this.tasks.unshift({
            id: `tk-${Date.now()}`,
            text: text.trim(),
            done: false,
            priority: 'Medium',
            category: cat.trim()
          });
          this.saveData(TASKS_STORAGE_KEY, this.tasks);
          this.renderTasks();
          if (window.soundFx) window.soundFx.playSuccess();
        }
      });
    }
  }

  toggleTask(id) {
    const task = this.tasks.find(t => t.id === id);
    if (!task) return;
    task.done = !task.done;
    this.saveData(TASKS_STORAGE_KEY, this.tasks);
    this.renderTasks();
    if (window.soundFx) window.soundFx.playBlip(task.done ? 1200 : 700, 0.04);
  }

  openEmailModal(id) {
    if (window.soundFx) window.soundFx.playPing();
    const email = this.emails.find(e => e.id === id);
    if (!email) return;

    email.unread = false;
    this.saveData(EMAILS_STORAGE_KEY, this.emails);
    this.renderEmails();

    const modal = document.getElementById('email-modal');
    if (!modal) return;

    document.getElementById('modal-email-from').textContent = `${email.from} <${email.senderEmail}>`;
    document.getElementById('modal-email-subject').textContent = email.subject;
    document.getElementById('modal-email-body').textContent = email.snippet;

    modal.classList.remove('hidden');
  }

  closeEmailModal() {
    if (window.soundFx) window.soundFx.playClick();
    const modal = document.getElementById('email-modal');
    if (modal) modal.classList.add('hidden');
  }
}

window.productivityHub = new ProductivityHubManager();
