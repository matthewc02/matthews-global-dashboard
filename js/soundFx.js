// Web Audio API Procedural Cybernetic Sound Synthesizer + Cute Pet & Easter Egg Audio
class SoundManager {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
  }

  playBlip(freq = 880, duration = 0.05, type = 'sine') {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, this.ctx.currentTime + duration);
      
      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      console.debug('Audio error:', e);
    }
  }

  playClick() {
    this.playBlip(1200, 0.03, 'triangle');
  }

  playPing() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') this.ctx.resume();
      
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1400, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(580, this.ctx.currentTime + 0.18);
      
      gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.18);
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      
      osc.start();
      osc.stop(this.ctx.currentTime + 0.18);
    } catch (e) {}
  }

  playSuccess() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') this.ctx.resume();

      const now = this.ctx.currentTime;
      [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.06);
        gain.gain.setValueAtTime(0.04, now + i * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.06 + 0.2);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + i * 0.06);
        osc.stop(now + i * 0.06 + 0.2);
      });
    } catch (e) {}
  }

  // Cute Cat Purr & Happy Meow Sound Synthesizer
  playPetMeow() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') this.ctx.resume();

      const now = this.ctx.currentTime;

      // 1. Cute Vocal "Meow / Mrrp" Curve
      const voiceOsc = this.ctx.createOscillator();
      const voiceGain = this.ctx.createGain();
      
      voiceOsc.type = 'sine';
      voiceOsc.frequency.setValueAtTime(460, now);
      voiceOsc.frequency.exponentialRampToValueAtTime(740, now + 0.12);
      voiceOsc.frequency.exponentialRampToValueAtTime(540, now + 0.35);

      voiceGain.gain.setValueAtTime(0.001, now);
      voiceGain.gain.linearRampToValueAtTime(0.08, now + 0.08);
      voiceGain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      voiceOsc.connect(voiceGain);
      voiceGain.connect(this.ctx.destination);
      voiceOsc.start(now);
      voiceOsc.stop(now + 0.35);

      // 2. Harmonic Overtone (Chirrup tone)
      const harmonicOsc = this.ctx.createOscillator();
      const harmonicGain = this.ctx.createGain();

      harmonicOsc.type = 'triangle';
      harmonicOsc.frequency.setValueAtTime(920, now + 0.04);
      harmonicOsc.frequency.exponentialRampToValueAtTime(1480, now + 0.16);
      harmonicOsc.frequency.exponentialRampToValueAtTime(1080, now + 0.35);

      harmonicGain.gain.setValueAtTime(0.001, now + 0.04);
      harmonicGain.gain.linearRampToValueAtTime(0.03, now + 0.12);
      harmonicGain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      harmonicOsc.connect(harmonicGain);
      harmonicGain.connect(this.ctx.destination);
      harmonicOsc.start(now + 0.04);
      harmonicOsc.stop(now + 0.35);

      // 3. Gentle Rhythmic Purr Rumble
      const purrOsc = this.ctx.createOscillator();
      const purrGain = this.ctx.createGain();
      const lfo = this.ctx.createOscillator();
      const lfoGain = this.ctx.createGain();

      purrOsc.type = 'sine';
      purrOsc.frequency.setValueAtTime(80, now + 0.15);

      lfo.type = 'sine';
      lfo.frequency.setValueAtTime(24, now + 0.15); // 24Hz purr flutter

      lfoGain.gain.setValueAtTime(0.04, now + 0.15);
      lfo.connect(lfoGain);
      lfoGain.connect(purrGain.gain);

      purrGain.gain.setValueAtTime(0.04, now + 0.15);
      purrGain.gain.exponentialRampToValueAtTime(0.001, now + 0.65);

      purrOsc.connect(purrGain);
      purrGain.connect(this.ctx.destination);

      lfo.start(now + 0.15);
      purrOsc.start(now + 0.15);
      lfo.stop(now + 0.65);
      purrOsc.stop(now + 0.65);
    } catch (e) {
      console.debug('Pet sound error:', e);
    }
  }

  // --- Mau Food Intercept & Explosion Easter Egg Sounds ---
  
  // 1. Mau Fast Sprint & Nom Nom Nom
  playMauSprintAndNom() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') this.ctx.resume();

      const now = this.ctx.currentTime;

      // Sprint Slide Swoosh
      const swoosh = this.ctx.createOscillator();
      const sGain = this.ctx.createGain();
      swoosh.type = 'sine';
      swoosh.frequency.setValueAtTime(200, now);
      swoosh.frequency.exponentialRampToValueAtTime(1200, now + 0.25);
      swoosh.frequency.exponentialRampToValueAtTime(300, now + 0.45);
      sGain.gain.setValueAtTime(0.08, now);
      sGain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
      swoosh.connect(sGain);
      sGain.connect(this.ctx.destination);
      swoosh.start(now);
      swoosh.stop(now + 0.45);

      // Rapid Crunchy "Nom Nom Nom" Clicks
      [0.2, 0.3, 0.4, 0.5, 0.6].forEach((t, i) => {
        const nom = this.ctx.createOscillator();
        const nGain = this.ctx.createGain();
        nom.type = 'triangle';
        nom.frequency.setValueAtTime(350 + (i % 2) * 150, now + t);
        nom.frequency.exponentialRampToValueAtTime(180, now + t + 0.08);
        nGain.gain.setValueAtTime(0.07, now + t);
        nGain.gain.exponentialRampToValueAtTime(0.001, now + t + 0.08);
        nom.connect(nGain);
        nGain.connect(this.ctx.destination);
        nom.start(now + t);
        nom.stop(now + t + 0.08);
      });
    } catch (e) {}
  }

  // 2. Swelling Chonk Inflation Tone ("whoooommmmp!")
  playMauInflate() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') this.ctx.resume();

      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(90, now);
      osc.frequency.exponentialRampToValueAtTime(550, now + 1.6);

      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.08, now + 1.2);
      gain.gain.linearRampToValueAtTime(0.12, now + 1.6);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.7);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 1.7);
    } catch (e) {}
  }

  // 3. Cartoon Explosion & Sparkle Boom ("KABOOM! ✨")
  playMauExplosion() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') this.ctx.resume();

      const now = this.ctx.currentTime;

      // Deep Sub-Bass Boom
      const boom = this.ctx.createOscillator();
      const bGain = this.ctx.createGain();
      boom.type = 'sine';
      boom.frequency.setValueAtTime(140, now);
      boom.frequency.exponentialRampToValueAtTime(32, now + 0.6);
      bGain.gain.setValueAtTime(0.2, now);
      bGain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
      boom.connect(bGain);
      bGain.connect(this.ctx.destination);
      boom.start(now);
      boom.stop(now + 0.6);

      // Noise Pop / Crunch
      const bufferSize = this.ctx.sampleRate * 0.25;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }
      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = buffer;
      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.15, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      whiteNoise.connect(noiseGain);
      noiseGain.connect(this.ctx.destination);
      whiteNoise.start(now);

      // Sparkling Confetti Arpeggio
      [880, 1174.66, 1396.91, 1760, 2093, 2793.83].forEach((f, idx) => {
        const chime = this.ctx.createOscillator();
        const cGain = this.ctx.createGain();
        chime.type = 'triangle';
        chime.frequency.setValueAtTime(f, now + 0.1 + idx * 0.05);
        cGain.gain.setValueAtTime(0.06, now + 0.1 + idx * 0.05);
        cGain.gain.exponentialRampToValueAtTime(0.001, now + 0.1 + idx * 0.05 + 0.35);
        chime.connect(cGain);
        cGain.connect(this.ctx.destination);
        chime.start(now + 0.1 + idx * 0.05);
        chime.stop(now + 0.1 + idx * 0.05 + 0.35);
      });
    } catch (e) {}
  }

  // 4. Angelic Respawn Chime ("Ding! 😇")
  playMauRespawn() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') this.ctx.resume();

      const now = this.ctx.currentTime;
      [523.25, 659.25, 783.99, 1046.50, 1318.51].forEach((f, i) => {
        const osc = this.ctx.createOscillator();
        const g = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, now + i * 0.07);
        g.gain.setValueAtTime(0.05, now + i * 0.07);
        g.gain.exponentialRampToValueAtTime(0.001, now + i * 0.07 + 0.4);
        osc.connect(g);
        g.connect(this.ctx.destination);
        osc.start(now + i * 0.07);
        osc.stop(now + i * 0.07 + 0.4);
      });
    } catch (e) {}
  }

  toggle() {
    this.enabled = !this.enabled;
    return this.enabled;
  }
}

window.soundFx = new SoundManager();
