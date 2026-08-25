// Family Work & Projects Activity Hub
// Tracking Deck, Bathroom Renovation, and Workshop/Shop projects

const PROJECTS_STORAGE_KEY = 'matthews_family_projects_v1';

const defaultProjects = [
  {
    id: 'proj-deck',
    name: 'Outdoor Cedar Deck & Pergola',
    category: 'Deck',
    tag: 'Carpentry & Exterior',
    badgeClass: 'hud-badge-amber',
    progress: 78,
    status: 'Railing & Lighting Phase',
    lead: 'Matthew & Family Crew',
    lastUpdated: 'Today 06:45 AM',
    milestones: [
      { text: 'Foundation concrete piers poured & cured', done: true },
      { text: 'Pressure-treated main joists & framing secured', done: true },
      { text: 'Western red cedar deck boards spaced & fastened', done: true },
      { text: 'Black aluminum perimeter railing posts installed', done: true },
      { text: 'Low-voltage stair riser LED wiring & testing', done: false },
      { text: 'UV-resistant protective sealant coat application', done: false }
    ],
    recentActivities: [
      { time: 'Today 06:45 AM', user: 'Matthew', text: 'Checked cedar plank expansion gaps after morning dew. Surface level optimal.' },
      { time: 'Yesterday 04:30 PM', user: 'Matthison & Ryker', text: 'Helped align and fasten railing bracket hardware on north steps.' },
      { time: 'Yesterday 01:15 PM', user: 'Matthew', text: 'Completed cable run for 12V LED step lights beneath perimeter fascia.' }
    ]
  },
  {
    id: 'proj-bathroom',
    name: 'Master Ensuite Bathroom Renovation',
    category: 'Bathroom',
    tag: 'Plumbing & Tiling',
    badgeClass: 'hud-badge-cyan',
    progress: 62,
    status: 'Tile Setting & Vanity Mount',
    lead: 'Matthew & Laura',
    lastUpdated: 'Yesterday 07:15 PM',
    milestones: [
      { text: 'Old drywall, tub, and tile demolition & disposal', done: true },
      { text: 'Rough-in PEX hot/cold plumbing & drain repositioning', done: true },
      { text: 'Schluter-Kerdi waterproof membrane & shower pan flood test', done: true },
      { text: 'Large format porcelain subway tile shower surround', done: true },
      { text: 'Double-sink floating oak vanity installation & leveling', done: false },
      { text: 'Matte black thermostatic shower valve & trim finish', done: false },
      { text: 'Epoxy grout sealing & frameless glass door mounting', done: false }
    ],
    recentActivities: [
      { time: 'Yesterday 07:15 PM', user: 'Laura & Matthew', text: 'Selected matte black vanity hardware and verified plumbing alignment.' },
      { time: 'Yesterday 02:00 PM', user: 'Matthew', text: 'Finished tiling the shower accent niche; 24-hour thin-set cure initiated.' },
      { time: 'Sunday 03:30 PM', user: 'Linda & Brillianna', text: 'Inspected grout color swatches in natural morning and vanity lighting.' }
    ]
  },
  {
    id: 'proj-shop',
    name: 'Precision Workshop & Tool Lab',
    category: 'Shop',
    tag: 'Makerspace & Electrical',
    badgeClass: 'hud-badge-emerald',
    progress: 88,
    status: 'Dust Ducting & CNC Calibration',
    lead: 'Matthew & Matthison',
    lastUpdated: 'Today 07:05 AM',
    milestones: [
      { text: 'Epoxy floor coating applied with slip-resistant flake', done: true },
      { text: '220V dedicated electrical subpanel & outlet drops wired', done: true },
      { text: '8ft Heavy-duty maple top workbench assembly', done: true },
      { text: 'French cleat tool storage wall with custom tool holders', done: true },
      { text: '4-inch cyclone dust collection ceiling duct run with blast gates', done: true },
      { text: 'CNC Router bed leveling and spindle test cut calibration', done: false }
    ],
    recentActivities: [
      { time: 'Today 07:05 AM', user: 'Matthew', text: 'Tested blast gate airflow on the miter saw and table saw drops (650 CFM confirmed).' },
      { time: 'Yesterday 05:45 PM', user: 'Matthison', text: 'Organized digital calipers, drill bits, and metric socket trays on tool wall.' },
      { time: 'Sunday 11:00 AM', user: 'Matthew', text: 'Assembled mobile base for 8-inch spiral head jointer.' }
    ]
  }
];

class FamilyProjectsManager {
  constructor() {
    this.projects = this.loadData();
    this.activeTab = 'All';
  }

  loadData() {
    try {
      const stored = localStorage.getItem(PROJECTS_STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {}
    return defaultProjects;
  }

  saveData() {
    try {
      localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(this.projects));
    } catch (e) {}
  }

  init() {
    this.renderProjects();
    this.setupListeners();
  }

  setupListeners() {
    const tabs = document.querySelectorAll('.project-filter-tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        if (window.soundFx) window.soundFx.playClick();
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        this.activeTab = tab.getAttribute('data-tab') || 'All';
        this.renderProjects();
      });
    });
  }

  renderProjects() {
    const container = document.getElementById('family-projects-grid');
    if (!container) return;

    const filtered = this.activeTab === 'All'
      ? this.projects
      : this.projects.filter(p => p.category.toLowerCase() === this.activeTab.toLowerCase());

    container.innerHTML = filtered.map(proj => `
      <div class="glass-panel p-4.5 bg-slate-900/60 border border-slate-800 hover:border-sky-500/40 transition-all flex flex-col justify-between group">
        <div>
          <!-- Header -->
          <div class="flex items-center justify-between gap-2 mb-2">
            <div class="flex items-center gap-2">
              <span class="text-base">${proj.category === 'Deck' ? '🌲' : proj.category === 'Bathroom' ? '🚿' : '🛠️'}</span>
              <h4 class="text-sm font-bold text-slate-100 group-hover:text-sky-300 transition-colors truncate">${proj.name}</h4>
            </div>
            <span class="hud-badge ${proj.badgeClass} text-[9px]">${proj.tag}</span>
          </div>

          <!-- Progress Bar & Status -->
          <div class="mb-3">
            <div class="flex items-center justify-between text-xs font-mono mb-1">
              <span class="text-slate-400 text-[11px] truncate">Phase: <strong class="text-slate-200">${proj.status}</strong></span>
              <span class="font-bold text-sky-400">${proj.progress}%</span>
            </div>
            <div class="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
              <div class="h-full bg-gradient-to-r ${proj.category === 'Deck' ? 'from-amber-500 to-yellow-400' : proj.category === 'Bathroom' ? 'from-cyan-500 to-sky-400' : 'from-emerald-500 to-teal-400'} rounded-full transition-all duration-500 shadow-sm" style="width: ${proj.progress}%;"></div>
            </div>
          </div>

          <!-- Milestones Checklist -->
          <div class="mb-3">
            <span class="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono block mb-1.5">Key Milestones</span>
            <div class="space-y-1.5">
              ${proj.milestones.map((m, mIdx) => `
                <label class="flex items-center gap-2 text-[11px] cursor-pointer group/item">
                  <input type="checkbox" ${m.done ? 'checked' : ''} onchange="window.familyProjects.toggleMilestone('${proj.id}', ${mIdx})" class="w-3.5 h-3.5 rounded bg-slate-950 border-slate-700 text-sky-500 focus:ring-0 focus:ring-offset-0 cursor-pointer" />
                  <span class="${m.done ? 'line-through text-slate-500' : 'text-slate-300'} group-hover/item:text-slate-100 transition-colors truncate">${m.text}</span>
                </label>
              `).join('')}
            </div>
          </div>

          <!-- Latest Activity Stream -->
          <div class="pt-2 border-t border-slate-800/60">
            <span class="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono block mb-1">Latest Activity</span>
            <div class="space-y-1">
              ${proj.recentActivities.slice(0, 2).map(act => `
                <div class="text-[10px] bg-slate-950/60 p-1.5 rounded border border-slate-800/40">
                  <div class="flex items-center justify-between text-slate-400 font-mono mb-0.5">
                    <span class="text-sky-400 font-bold">${act.user}</span>
                    <span class="text-[9px] text-slate-500">${act.time}</span>
                  </div>
                  <p class="text-slate-300 line-clamp-1">${act.text}</p>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Footer Actions -->
        <div class="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
          <span class="text-slate-500 font-mono text-[10px]">Lead: ${proj.lead}</span>
          <button onclick="window.familyProjects.logActivityPrompt('${proj.id}')" class="hud-btn text-[10px] py-0.5 px-2 text-sky-400 hover:text-white">
            + Log Work Activity
          </button>
        </div>
      </div>
    `).join('');
  }

  toggleMilestone(projId, mIdx) {
    const proj = this.projects.find(p => p.id === projId);
    if (!proj || !proj.milestones[mIdx]) return;

    proj.milestones[mIdx].done = !proj.milestones[mIdx].done;

    // Recalculate progress percentage
    const completed = proj.milestones.filter(m => m.done).length;
    proj.progress = Math.round((completed / proj.milestones.length) * 100);
    proj.lastUpdated = `Today ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

    this.saveData();
    this.renderProjects();

    if (window.soundFx) window.soundFx.playBlip(proj.milestones[mIdx].done ? 1400 : 800, 0.04);
  }

  logActivityPrompt(projId) {
    const proj = this.projects.find(p => p.id === projId);
    if (!proj) return;

    const user = prompt(`Enter logger name (Matthew, Laura, Matthison, etc.):`, 'Matthew');
    if (!user) return;

    const text = prompt(`Enter work activity / task update for ${proj.name}:`);
    if (!text || !text.trim()) return;

    const timeStr = `Today ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    proj.recentActivities.unshift({
      time: timeStr,
      user: user.trim(),
      text: text.trim()
    });

    proj.lastUpdated = timeStr;
    this.saveData();
    this.renderProjects();

    if (window.soundFx) window.soundFx.playSuccess();

    // Log directly into Artifact Ring
    if (window.artifactRing) {
      window.artifactRing.addArtifact(
        `${proj.category} Work Log: ${text.trim().substring(0, 40)}...`,
        'Routines',
        `Work activity logged by ${user.trim()} on ${proj.name}. Project completion at ${proj.progress}%.`,
        `### Project Task Update: ${proj.name}
- **Category**: ${proj.category} (${proj.tag})
- **Lead / Worker**: ${user.trim()}
- **Timestamp**: ${timeStr}
- **Activity Description**: ${text.trim()}
- **Current Completion**: ${proj.progress}%
- **Next Milestone**: ${proj.milestones.find(m => !m.done)?.text || 'All Milestones Complete!'}`
      );
    }
  }
}

window.familyProjects = new FamilyProjectsManager();
