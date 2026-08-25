// Main Application Initialization & Orchestrator for Matthews Global Dashboard-Tuesday

document.addEventListener('DOMContentLoaded', () => {
  // Update Realtime Clock
  function updateClock() {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const dateStr = now.toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' });

    const clockEl = document.getElementById('hud-live-clock');
    const dateEl = document.getElementById('hud-live-date');

    if (clockEl) clockEl.textContent = timeStr;
    if (dateEl) dateEl.textContent = dateStr;
  }

  setInterval(updateClock, 1000);
  updateClock();

  // Initialize Modules
  if (window.artifactRing) window.artifactRing.init();
  if (window.dmcaMonitor) window.dmcaMonitor.init();
  if (window.familyProjects) window.familyProjects.init();
  if (window.familyAndPets) window.familyAndPets.init();
  if (window.weatherAndCams) window.weatherAndCams.init();
  if (window.productivityHub) window.productivityHub.init();
  if (window.networkTopology) window.networkTopology.init();
  if (window.copilot) window.copilot.init();

  // Sound Toggle Button
  const soundBtn = document.getElementById('hud-sound-toggle');
  if (soundBtn) {
    soundBtn.addEventListener('click', () => {
      if (window.soundFx) {
        const enabled = window.soundFx.toggle();
        soundBtn.innerHTML = enabled ? `<span>🔊 Sound: ON</span>` : `<span class="text-slate-500">🔇 Sound: OFF</span>`;
        if (enabled) window.soundFx.playPing();
      }
    });
  }

  // Audio Context unlock on first user interaction
  document.body.addEventListener('click', () => {
    if (window.soundFx) window.soundFx.init();
  }, { once: true });

  console.log('%c Matthews Global Dashboard-Tuesday %c Online & Synchronized ', 'background: #0284c7; color: #fff; font-weight: bold; padding: 4px;', 'background: #0f172a; color: #38bdf8; padding: 4px;');
});
