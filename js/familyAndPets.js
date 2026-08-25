// Family & Pets Status Sub-Panels with High-Resolution Face Avatars
// Family: Brillianna, Aurora, Matthison, Ryker, Linda, Laura
// Cats: Jax, Atom, Mau

const FAMILY_STORAGE_KEY = 'matthews_family_status_v3';
const CATS_STORAGE_KEY = 'matthews_cats_status_v3';

const defaultFamily = [
  { 
    id: 'f-1', 
    name: 'Brillianna', 
    role: 'Family', 
    status: 'Creative Studio', 
    note: 'Working on visual design art & creative concepts', 
    time: 'Active now', 
    mood: '🌟 Inspired', 
    avatar: './assets/family/brillianna.jpg',
    color: 'from-pink-500 to-rose-400' 
  },
  { 
    id: 'f-2', 
    name: 'Aurora', 
    role: 'Family', 
    status: 'Activity Prep', 
    note: 'Gymnastics practice & mountain adventures', 
    time: 'Active now', 
    mood: '✨ Energetic', 
    avatar: './assets/family/aurora.jpg',
    color: 'from-amber-400 to-orange-500' 
  },
  { 
    id: 'f-3', 
    name: 'Matthison', 
    role: 'Family', 
    status: 'Focus Zone', 
    note: 'Shop workbench assembly & robotics coding', 
    time: 'Active now', 
    mood: '🚀 Focused', 
    avatar: './assets/family/matthison.jpg',
    color: 'from-cyan-400 to-blue-500' 
  },
  { 
    id: 'f-4', 
    name: 'Ryker', 
    role: 'Family', 
    status: 'Recreation & Deck', 
    note: 'Helped align railing brackets on North steps', 
    time: 'Active now', 
    mood: '⚡ High Energy', 
    avatar: './assets/family/ryker.jpg',
    color: 'from-emerald-400 to-teal-500' 
  },
  { 
    id: 'f-5', 
    name: 'Linda', 
    role: 'Family', 
    status: 'Home & Yard Works', 
    note: 'Landscape grading, soil rolling & wellness', 
    time: 'Active now', 
    mood: '🌿 Productive', 
    avatar: './assets/family/linda.jpg',
    color: 'from-purple-400 to-indigo-500' 
  },
  { 
    id: 'f-6', 
    name: 'Laura', 
    role: 'Family', 
    status: 'Executive & Reno Sync', 
    note: 'Bathroom vanity & fixture selection for 2:00 PM', 
    time: 'Active now', 
    mood: '💼 Motivated', 
    avatar: './assets/family/laura.jpg',
    color: 'from-violet-500 to-fuchsia-500' 
  }
];

const defaultCats = [
  { 
    id: 'c-1', 
    name: 'Jax', 
    role: 'Tuxedo Sentinel', 
    status: 'Sunbeam Patrol & Vigilance', 
    lastFed: '07:30 AM', 
    nextFed: '05:30 PM', 
    diet: 'Organic Salmon Wet Food', 
    mood: '😺 Purring Loudly', 
    avatar: './assets/family/jax.jpg',
    color: 'from-slate-400 to-slate-100' 
  },
  { 
    id: 'c-2', 
    name: 'Atom', 
    role: 'Ginger Dynamo', 
    status: 'Laser Pursuit Mode', 
    lastFed: '07:30 AM', 
    nextFed: '05:30 PM', 
    diet: 'Crunchy Kibble + Omega-3', 
    mood: '⚡ High Zoomies', 
    avatar: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=400&q=80',
    color: 'from-amber-500 to-yellow-400' 
  },
  { 
    id: 'c-3', 
    name: 'Mau', 
    role: 'Egyptian Scout', 
    status: 'Window Bird Observatory', 
    lastFed: '07:30 AM', 
    nextFed: '05:30 PM', 
    diet: 'Tuna Fillet & Probiotics', 
    mood: '🐾 Ultra Alert', 
    avatar: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=400&q=80',
    color: 'from-teal-400 to-emerald-500' 
  }
];

class FamilyAndPetsManager {
  constructor() {
    this.family = this.loadData(FAMILY_STORAGE_KEY, defaultFamily);
    this.cats = this.loadData(CATS_STORAGE_KEY, defaultCats);

    // Ensure avatars are always populated with current paths
    this.family.forEach(person => {
      const match = defaultFamily.find(d => d.id === person.id);
      if (match) {
        person.avatar = match.avatar;
      }
    });

    this.cats.forEach(cat => {
      const match = defaultCats.find(d => d.id === cat.id);
      if (match) {
        cat.avatar = match.avatar;
      }
    });
  }

  loadData(key, fallback) {
    try {
      const stored = localStorage.getItem(key);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    return fallback;
  }

  saveData(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {}
  }

  init() {
    this.renderFamily();
    this.renderCats();
  }

  renderFamily() {
    const container = document.getElementById('family-panels-grid');
    if (!container) return;

    container.innerHTML = this.family.map(person => `
      <div class="p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-sky-500/40 transition-all group flex flex-col justify-between shadow-lg">
        <div class="flex items-start gap-3">
          <!-- Real Photo Avatar with glowing ring -->
          <div class="w-12 h-12 rounded-full bg-gradient-to-tr ${person.color} p-[2px] flex-shrink-0 shadow-md shadow-sky-500/10">
            <div class="w-full h-full rounded-full bg-slate-950 overflow-hidden relative border border-slate-900">
              <img 
                src="${person.avatar}" 
                alt="${person.name}" 
                class="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-300" 
                loading="eager"
              />
            </div>
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between">
              <h4 class="text-xs font-bold text-slate-100 group-hover:text-sky-300 truncate">${person.name}</h4>
              <span class="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> ${person.time}
              </span>
            </div>
            <p class="text-[11px] font-medium text-sky-400 truncate">${person.status}</p>
            <p class="text-[10px] text-slate-400 line-clamp-1 mt-0.5">${person.note}</p>
          </div>
        </div>
        <div class="mt-2.5 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] text-slate-500 font-mono">
          <span>${person.mood}</span>
          <button onclick="window.familyAndPets.editPerson('${person.id}')" class="text-sky-400 hover:underline transition-colors">✎ Note</button>
        </div>
      </div>
    `).join('');
  }

  renderCats() {
    const container = document.getElementById('cats-panels-grid');
    if (!container) return;

    container.innerHTML = this.cats.map(cat => `
      <div class="p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-amber-500/40 transition-all flex flex-col justify-between group shadow-lg">
        <div class="flex items-start gap-3">
          <!-- Real Photo Avatar for Jax / Cats -->
          <div class="w-12 h-12 rounded-full bg-gradient-to-tr ${cat.color} p-[2px] flex-shrink-0 shadow-md shadow-amber-500/10">
            <div class="w-full h-full rounded-full bg-slate-950 overflow-hidden relative border border-slate-900">
              <img 
                src="${cat.avatar}" 
                alt="${cat.name}" 
                class="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-300"
                loading="eager"
              />
            </div>
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between">
              <h4 class="text-xs font-bold text-slate-100 truncate">${cat.name}</h4>
              <span class="hud-badge hud-badge-amber text-[9px]">${cat.role}</span>
            </div>
            <p class="text-[11px] font-medium text-amber-300 truncate">${cat.status}</p>
            <p class="text-[10px] text-slate-400 truncate mt-0.5">${cat.diet}</p>
          </div>
        </div>

        <div class="mt-2.5 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px]">
          <div class="text-slate-400 font-mono">
            <span>Fed: <strong class="text-slate-200">${cat.lastFed}</strong></span>
          </div>
          <button onclick="window.familyAndPets.feedCat('${cat.id}')" class="px-2.5 py-1 rounded-md bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-semibold border border-amber-500/30 transition-all text-[10px]">
            🍖 Feed
          </button>
        </div>
      </div>
    `).join('');
  }

  feedCat(id) {
    const cat = this.cats.find(c => c.id === id);
    if (!cat) return;

    cat.lastFed = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    cat.status = 'Enjoying Fresh Meal 🥣';
    cat.mood = '😸 Purring Happily';
    this.saveData(CATS_STORAGE_KEY, this.cats);
    this.renderCats();

    if (window.soundFx) window.soundFx.playSuccess();

    if (window.artifactRing) {
      window.artifactRing.addArtifact(
        `Cat Feeding Log: ${cat.name} fed at ${cat.lastFed}`,
        'Routines',
        `Logged automatic feeding session for ${cat.name} (${cat.diet}). Health metrics optimal.`,
        `### Feline Nutrition Telemetry
- **Subject**: ${cat.name} (${cat.role})
- **Timestamp**: ${cat.lastFed}
- **Ration**: ${cat.diet}
- **Behavior Status**: Post-meal content & satisfied`
      );
    }
  }

  editPerson(id) {
    const person = this.family.find(p => p.id === id);
    if (!person) return;

    const newNote = prompt(`Update status note for ${person.name}:`, person.note);
    if (newNote !== null && newNote.trim() !== '') {
      person.note = newNote.trim();
      const newStatus = prompt(`Update status tag for ${person.name}:`, person.status);
      if (newStatus !== null && newStatus.trim() !== '') {
        person.status = newStatus.trim();
      }
      this.saveData(FAMILY_STORAGE_KEY, this.family);
      this.renderFamily();
      if (window.soundFx) window.soundFx.playSuccess();
    }
  }
}

window.familyAndPets = new FamilyAndPetsManager();
