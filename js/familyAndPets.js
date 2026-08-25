// Family & Pets Status Sub-Panels with High-Resolution Face Avatars + 10-Tier Mau Chonk Easter Egg
// Family: Brillianna, Aurora, Matthison, Ryker, Grandma Linda, Great Grandma Lara, Charles
// Cats: Jax, Atom, Mau

const FAMILY_STORAGE_KEY = 'matthews_family_status_v8';
const CATS_STORAGE_KEY = 'matthews_cats_status_v8';
const MAU_CHONK_KEY = 'matthews_mau_chonk_level_v8';

const defaultFamily = [
  { 
    id: 'f-1', 
    name: 'Brillianna May Carson', 
    role: 'Awesome Daughter, T1', 
    status: 'HMFIC of Whistler Premier (-: ❤️', 
    note: 'Awesome Daughter, T1, and HMFIC of Whistler Premier (-: ❤️', 
    time: 'Active now', 
    mood: '🌟 Inspired & Fierce', 
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
    name: 'Grandma Linda', 
    role: 'Grandma', 
    status: 'Great mom and grandma', 
    note: 'Great mom and grandma • Landscape grading, soil rolling & family care', 
    time: 'Active now', 
    mood: '🌿 Loving & Caring', 
    avatar: './assets/family/linda.jpg',
    color: 'from-purple-400 to-indigo-500' 
  },
  { 
    id: 'f-6', 
    name: 'Great Grandma Lara', 
    role: 'Great Grandma', 
    status: 'Great grandma to all', 
    note: 'Great grandma to all • Cherished matriarch & family heart', 
    time: 'Active now', 
    mood: '💖 Warm & Beloved', 
    avatar: './assets/family/laura.jpg',
    color: 'from-violet-500 to-fuchsia-500' 
  },
  { 
    id: 'f-7', 
    name: 'Charles', 
    role: 'Grandson', 
    status: 'Sunny Naps & Play', 
    note: 'Tummy time & morning stroller walk in his sunhat', 
    time: 'Active now', 
    mood: '👶 Sweet & Cozy', 
    avatar: './assets/family/charles.jpg',
    color: 'from-amber-300 via-yellow-400 to-sky-400' 
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
    avatar: './assets/family/atom.jpg',
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
    avatar: './assets/family/mau.jpg',
    color: 'from-teal-400 to-emerald-500' 
  }
];

class FamilyAndPetsManager {
  constructor() {
    this.family = this.loadData(FAMILY_STORAGE_KEY, defaultFamily);
    this.cats = this.loadData(CATS_STORAGE_KEY, defaultCats);
    this.mauChonkCount = parseInt(localStorage.getItem(MAU_CHONK_KEY) || '0', 10);

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

  saveMauChonk() {
    try {
      localStorage.setItem(MAU_CHONK_KEY, this.mauChonkCount.toString());
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
          <!-- Real Photo Avatar with glowing ring (Guaranteed 1:1 Aspect Ratio) -->
          <div class="w-12 h-12 min-w-[48px] min-h-[48px] aspect-square rounded-full bg-gradient-to-tr ${person.color} p-[2px] flex-shrink-0 shadow-md shadow-sky-500/10">
            <div class="w-full h-full aspect-square rounded-full bg-slate-950 overflow-hidden relative border border-slate-900">
              <img 
                src="${person.avatar}" 
                alt="${person.name}" 
                class="w-full h-full aspect-square object-cover object-center group-hover:scale-110 transition-transform duration-300" 
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

    container.innerHTML = this.cats.map(cat => {
      const isMau = cat.id === 'c-3';
      
      // Calculate progressive chonk scale for Mau (1.0x up to 2.8x at 9 thefts)
      const chonkScale = isMau ? (1 + (this.mauChonkCount * 0.18)) : 1;
      const chonkPercent = Math.min(100, (this.mauChonkCount / 10) * 100);

      return `
      <div class="p-3 rounded-xl bg-slate-900/60 border ${isMau && this.mauChonkCount >= 8 ? 'border-rose-500/60 shadow-rose-500/20' : 'border-slate-800 hover:border-amber-500/40'} transition-all flex flex-col justify-between group shadow-lg">
        <div class="flex items-start gap-3">
          <!-- Photo Avatar with interactive Pet badge & Dynamic Chonk Scale -->
          <div class="relative w-12 h-12 min-w-[48px] min-h-[48px] aspect-square rounded-full bg-gradient-to-tr ${cat.color} p-[2px] flex-shrink-0 shadow-md shadow-amber-500/10">
            <div class="w-full h-full aspect-square rounded-full bg-slate-950 overflow-hidden relative border border-slate-900" style="${isMau ? `transform: scale(${chonkScale}); transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);` : ''}">
              <img 
                src="${cat.avatar}" 
                alt="${cat.name}" 
                class="w-full h-full aspect-square object-cover object-center group-hover:scale-110 transition-transform duration-300"
                loading="eager"
              />
            </div>
            <!-- Interactive Floating Paw Button on Avatar -->
            <button 
              onclick="window.familyAndPets.petCat('${cat.id}')" 
              class="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-pink-600 hover:bg-pink-500 text-white flex items-center justify-center text-[11px] shadow-lg border border-pink-400 hover:scale-125 transition-transform cursor-pointer z-10"
              title="Click to Pet ${cat.name} 🐾"
            >
              🐾
            </button>
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between">
              <h4 class="text-xs font-bold text-slate-100 truncate">${cat.name}</h4>
              <span class="hud-badge ${isMau && this.mauChonkCount >= 8 ? 'hud-badge-rose animate-pulse' : 'hud-badge-amber'} text-[9px]">
                ${isMau ? `Chonk ${this.mauChonkCount}/10` : cat.role}
              </span>
            </div>
            <p id="cat-status-${cat.id}" class="text-[11px] font-medium text-amber-300 truncate">${cat.status}</p>
            <p class="text-[10px] text-slate-400 truncate mt-0.5">${cat.diet}</p>
            
            ${isMau ? `
              <!-- Mau Chonk Pressure Meter -->
              <div class="mt-2 pt-1 border-t border-slate-800/60">
                <div class="flex items-center justify-between text-[9px] font-mono mb-1">
                  <span class="${this.mauChonkCount >= 8 ? 'text-rose-400 font-bold animate-pulse' : 'text-amber-400'}">
                    💥 Pressure: ${this.mauChonkCount}/10 ${this.mauChonkCount === 9 ? '⚠️ CRITICAL!' : ''}
                  </span>
                  <span class="text-slate-500 font-mono">${Math.round(chonkPercent)}% Mass</span>
                </div>
                <div class="w-full bg-slate-950 rounded-full h-1.5 border border-slate-800 overflow-hidden">
                  <div class="h-full bg-gradient-to-r ${this.mauChonkCount >= 8 ? 'from-amber-500 via-rose-500 to-red-600 animate-pulse' : 'from-amber-400 to-orange-500'} transition-all duration-300" style="width: ${chonkPercent}%"></div>
                </div>
              </div>
            ` : ''}
          </div>
        </div>

        <!-- Action Bar with High-Visibility Pet & Feed Buttons -->
        <div class="mt-3 pt-2.5 border-t border-slate-800/60 flex items-center justify-between gap-2">
          <div class="text-slate-400 font-mono text-[10px]">
            <span>Fed: <strong class="text-slate-200">${cat.lastFed}</strong></span>
          </div>
          <div class="flex items-center gap-2">
            <button 
              onclick="window.familyAndPets.petCat('${cat.id}')" 
              class="px-2.5 py-1.5 rounded-lg bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-400 hover:to-rose-400 text-white font-bold text-[11px] shadow-md shadow-pink-500/20 hover:scale-105 transition-all flex items-center gap-1.5 cursor-pointer" 
              title="Pet ${cat.name} for happy purrs!"
            >
              <span class="text-sm">🐾</span>
              <span>Pet Cat</span>
            </button>
            <button 
              onclick="window.familyAndPets.feedCat('${cat.id}')" 
              class="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 hover:border-amber-400 font-bold text-[11px] hover:scale-105 transition-all flex items-center gap-1 cursor-pointer"
            >
              <span>🍖</span>
              <span>Feed</span>
            </button>
          </div>
        </div>
      </div>
      `;
    }).join('');
  }

  petCat(id) {
    const cat = this.cats.find(c => c.id === id);
    if (!cat) return;

    if (window.soundFx) {
      window.soundFx.playPetMeow();
    }

    const prevStatus = cat.status;
    cat.status = '❤️ Purring & Enjoying Scratches! 😸';
    cat.mood = '😻 In Pure Bliss';
    this.renderCats();

    if (window.artifactRing) {
      window.artifactRing.addArtifact(
        `Petting Session: Scratched ${cat.name}`,
        'Routines',
        `Interactive affection session with ${cat.name}. Feline dopamine & purr telemetry at 100%.`,
        `### Feline Affection Interaction
- **Companion**: ${cat.name} (${cat.role})
- **Timestamp**: ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
- **Reaction**: Leaning in for chin scratches & purring continuously
- **Happiness Index**: 10/10`
      );
    }

    setTimeout(() => {
      cat.status = prevStatus;
      cat.mood = '😸 Purring Loudly';
      this.saveData(CATS_STORAGE_KEY, this.cats);
      this.renderCats();
    }, 6000);
  }

  feedCat(id) {
    const targetCat = this.cats.find(c => c.id === id);
    if (!targetCat) return;

    const mau = this.cats.find(c => c.id === 'c-3');

    if (id === 'c-1' || id === 'c-2') {
      // Mau intercepts Jax or Atom's food!
      this.mauChonkCount++;
      this.saveMauChonk();

      if (this.mauChonkCount < 10) {
        // Mau grows bigger (steals 1 through 9)
        this.triggerMauGrowEasterEgg(targetCat, mau);
      } else {
        // 10th theft: CRITICAL DETONATION!
        this.triggerMauExplosionEasterEgg(targetCat, mau);
      }
    } else {
      // Mau fed directly
      targetCat.lastFed = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      targetCat.status = 'Enjoying Fresh Salmon & Kibble 🥣';
      targetCat.mood = '😸 Purring Happily';
      this.saveData(CATS_STORAGE_KEY, this.cats);
      this.renderCats();

      if (window.soundFx) window.soundFx.playSuccess();

      if (window.artifactRing) {
        window.artifactRing.addArtifact(
          `Cat Feeding Log: Mau fed at ${targetCat.lastFed}`,
          'Routines',
          `Direct feeding session for Mau (${targetCat.diet}).`,
          `### Feline Nutrition Telemetry
- **Subject**: Mau (Egyptian Scout)
- **Timestamp**: ${targetCat.lastFed}
- **Ration**: ${targetCat.diet}
- **Behavior Status**: Fully satisfied`
        );
      }
    }
  }

  // Steals 1-9: Mau sprints, steals food, and grows bigger
  triggerMauGrowEasterEgg(victimCat, mau) {
    if (!mau) return;

    if (window.soundFx) window.soundFx.playMauSprintAndNom();

    const prevVictimStatus = victimCat.status;
    const prevVictimMood = victimCat.mood;
    const prevMauStatus = mau.status;

    // Victim cat reaction
    victimCat.status = `🙀 Mau stole my bowl! (Theft #${this.mauChonkCount})`;
    victimCat.mood = `😿 Robbed!`;

    // Mau status based on chonk stage
    const chonkDescriptions = [
      '',
      `🍗 Theft #1: Snatched ${victimCat.name}'s food! Slight belly forming.`,
      `🍖 Theft #2: Gobbled another bowl! Noticeably rounder.`,
      `🐟 Theft #3: Heist successful! Wobbly gait developing.`,
      `🍗 Theft #4: Growing chonkier! Rolling across the rug.`,
      `🚨 Theft #5: HALFWAY TO DETONATION (5/10)! Certified Heavy Chonker.`,
      `🌪️ Theft #6: Gravitational pull increasing around Mau.`,
      `⚠️ Theft #7: Floor creaking under Mau's growing mass!`,
      `🎈 Theft #8: GIGA-ORB (8/10)! Barely fits in her chair.`,
      `🔴 Theft #9: CRITICAL PRESSURE (9/10)! ONE MORE WILL DETONATE MAU! 💥`
    ];

    mau.status = chonkDescriptions[this.mauChonkCount] || `🍖 Chonk Level ${this.mauChonkCount}/10!`;
    mau.mood = this.mauChonkCount >= 8 ? '🚨 Critical Chonk' : '😼 Hungry Chonker';
    this.renderCats();

    const mauAvatarEl = document.querySelector('#cats-panels-grid > div:nth-child(3) .relative');
    if (mauAvatarEl) {
      mauAvatarEl.classList.add('mau-running');
      setTimeout(() => mauAvatarEl.classList.remove('mau-running'), 600);
    }

    if (window.artifactRing) {
      window.artifactRing.addArtifact(
        `🚨 Mau Heist #${this.mauChonkCount}: Mass Increased!`,
        'Routines',
        `Mau intercepted ${victimCat.name}'s bowl. Chonk count: ${this.mauChonkCount}/10 (${10 - this.mauChonkCount} steals until detonation).`,
        `### 🐾 Mau Food Hijack Telemetry
- **Victim Cat**: ${victimCat.name}
- **Current Chonk Level**: Stage ${this.mauChonkCount} of 10
- **Detonation Countdown**: ${10 - this.mauChonkCount} more heists to explosion!
- **Estimated Mass**: ${(1 + this.mauChonkCount * 0.18).toFixed(2)}x baseline`
      );
    }

    // Deliver replacement bowl to victim cat after 2.5s
    setTimeout(() => {
      victimCat.status = `😸 ${victimCat.name} got a replacement bowl! 🥣`;
      victimCat.mood = `😺 Fed`;
      victimCat.lastFed = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      mau.lastFed = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      this.saveData(CATS_STORAGE_KEY, this.cats);
      this.renderCats();

      setTimeout(() => {
        victimCat.status = prevVictimStatus;
        victimCat.mood = '😸 Purring';
        this.saveData(CATS_STORAGE_KEY, this.cats);
        this.renderCats();
      }, 4000);
    }, 2500);
  }

  // 10th Steal: CRITICAL DETONATION!!
  triggerMauExplosionEasterEgg(victimCat, mau) {
    if (!mau) return;

    if (window.soundFx) window.soundFx.playMauSprintAndNom();

    const prevVictimStatus = victimCat.status;
    const prevMauStatus = mau.status;

    victimCat.status = `🙀 10TH BOWL INTERCEPTED! MAU IS GONNA BLOW!`;
    victimCat.mood = `😱 RUN FOR COVER!`;

    mau.status = `💨 THE 10TH THEFT! Snatched ${victimCat.name}'s meal! 🏃💨`;
    mau.mood = `💥 CRITICAL OVERLOAD 10/10`;
    this.renderCats();

    const mauAvatarEl = document.querySelector('#cats-panels-grid > div:nth-child(3) .relative');
    if (mauAvatarEl) {
      mauAvatarEl.classList.add('mau-running');
    }

    // Phase 2: Rapid balloon swelling (600ms)
    setTimeout(() => {
      if (window.soundFx) window.soundFx.playMauInflate();

      mau.status = `🍗 10/10 CHONK! EXCEEDING PHYSICAL LIMITS... 🎈💥`;
      mau.mood = `🐡 PLANETARY CHONK`;
      this.renderCats();

      const el = document.querySelector('#cats-panels-grid > div:nth-child(3) .relative');
      if (el) {
        el.classList.remove('mau-running');
        el.classList.add('mau-inflating');
      }
    }, 600);

    // Phase 3: KABOOOOOM!! (2400ms)
    setTimeout(() => {
      if (window.soundFx) window.soundFx.playMauExplosion();

      mau.status = `💥 *MEGA-KABOOOOOM!!* Mau exploded into cosmic confetti! ✨🎉`;
      mau.mood = `💥 Starburst Explosion`;
      this.renderCats();

      this.spawnExplosionParticles();

      if (window.artifactRing) {
        window.artifactRing.addArtifact(
          `💥 THE GREAT MAU DETONATION (10/10 HEISTS ACHIEVED)!`,
          'Routines',
          `Mau reached maximum critical mass on the 10th stolen meal and exploded into celebratory stardust confetti!`,
          `### 🌟 Grand Feline Detonation Event
- **Total Heists Executed**: 10 stolen meals
- **Final Chonk Level**: 10/10 (Critical Mass)
- **Blast Radius**: Full Living Room
- **Particles Discharged**: 100% Stardust & Confetti
- **Reboot Status**: Resetting Mau to slim default state 😇`
        );
      }
    }, 2400);

    // Phase 4: Angelic Respawn & Reset to 0 (4200ms)
    setTimeout(() => {
      if (window.soundFx) window.soundFx.playMauRespawn();

      this.mauChonkCount = 0;
      this.saveMauChonk();

      mau.status = `✨ Respawned as a slim kitten! Chonk reset to 0/10 😇😹`;
      mau.mood = `😇 Innocent Angel`;
      victimCat.status = `😸 ${victimCat.name} got a replacement fresh bowl! 🥣`;
      victimCat.mood = `😺 Content & Fed`;
      victimCat.lastFed = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      mau.lastFed = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      this.saveData(CATS_STORAGE_KEY, this.cats);
      this.renderCats();

      const el = document.querySelector('#cats-panels-grid > div:nth-child(3) .relative');
      if (el) {
        el.classList.remove('mau-inflating');
        el.classList.add('mau-respawning');
        setTimeout(() => el.classList.remove('mau-respawning'), 1000);
      }

      setTimeout(() => {
        victimCat.status = prevVictimStatus;
        victimCat.mood = '😸 Purring';
        mau.status = prevMauStatus;
        mau.mood = '🐾 Ultra Alert';
        this.saveData(CATS_STORAGE_KEY, this.cats);
        this.renderCats();
      }, 7000);
    }, 4200);
  }

  spawnExplosionParticles() {
    const mauCard = document.querySelector('#cats-panels-grid > div:nth-child(3)');
    if (!mauCard) return;

    const emojis = ['💥', '🎉', '✨', '🍗', '🐟', '⭐', '💫', '💖', '🍖', '⚡', '🎈', '😻'];

    const shockwave = document.createElement('div');
    shockwave.className = 'shockwave-effect';
    mauCard.style.position = 'relative';
    mauCard.appendChild(shockwave);
    setTimeout(() => shockwave.remove(), 900);

    for (let i = 0; i < 30; i++) {
      const p = document.createElement('div');
      p.className = 'confetti-particle';
      p.innerText = emojis[Math.floor(Math.random() * emojis.length)];

      const angle = (Math.PI * 2 / 30) * i + (Math.random() - 0.5) * 0.3;
      const distance = 70 + Math.random() * 110;
      const tx = Math.cos(angle) * distance + 'px';
      const ty = Math.sin(angle) * distance + 'px';
      const rot = (Math.random() * 720 - 360) + 'deg';

      p.style.setProperty('--tx', tx);
      p.style.setProperty('--ty', ty);
      p.style.setProperty('--rot', rot);

      mauCard.appendChild(p);
      setTimeout(() => p.remove(), 1200);
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
