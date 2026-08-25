// Web Audio API Procedural Cybernetic Sound Synthesizer + Cute Pet Audio
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
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
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

  toggle() {
    this.enabled = !this.enabled;
    return this.enabled;
  }
}

window.soundFx = new SoundManager();
