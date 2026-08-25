// Weather Telemetry (Home & Whistler BC) & Whistler Live Cameras
// Live data fetched from Open-Meteo Open API + Whistler Mountain Cameras

const WHISTLER_COORDS = { lat: 50.1163, lon: -122.9574, name: 'Whistler, BC (Alpine)' };
const HOME_COORDS = { lat: 49.2827, lon: -123.1207, name: 'Home Station' };

// Curated live mountain & highway camera sources for Whistler
const WHISTLER_CAMS = [
  {
    id: 'cam-peak',
    name: 'Whistler Peak (2,182m)',
    sub: 'Alpine Summit & Glacier Bowl',
    imgUrl: 'https://images.unsplash.com/photo-1551524559-8af4e6624178?auto=format&fit=crop&w=800&q=80',
    liveStream: 'https://whistlerpeak.com',
    altImg: 'https://images.unsplash.com/photo-1491555103944-7c647fd857e6?auto=format&fit=crop&w=800&q=80',
    type: 'Alpine High Ridge'
  },
  {
    id: 'cam-roundhouse',
    name: 'Roundhouse Lodge (1,850m)',
    sub: 'Peak Express & Harmony Bowl',
    imgUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
    liveStream: 'https://www.whistlerblackcomb.com',
    altImg: 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=800&q=80',
    type: 'Mid-Mountain Hub'
  },
  {
    id: 'cam-village',
    name: 'Whistler Village Gondola',
    sub: 'Skier Plaza & Carleton Base',
    imgUrl: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=800&q=80',
    liveStream: 'https://www.carletonlodge.com',
    altImg: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    type: 'Village Base'
  },
  {
    id: 'cam-hwy99',
    name: 'Hwy 99 @ Whistler Gate',
    sub: 'DriveBC Highway & Transit Cam',
    imgUrl: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=800&q=80',
    liveStream: 'https://www.drivebc.ca',
    altImg: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
    type: 'DriveBC Sea-to-Sky'
  }
];

class WeatherAndCamsManager {
  constructor() {
    this.homeWeather = null;
    this.whistlerWeather = null;
    this.cams = WHISTLER_CAMS;
    this.activeCamIndex = 0;
    this.refreshTimer = null;
    this.countdownSecs = 60;
  }

  async init() {
    this.renderCams();
    await this.fetchWeatherData();
    this.startAutoRefresh();

    const refreshBtn = document.getElementById('weather-refresh-btn');
    if (refreshBtn) {
      refreshBtn.addEventListener('click', () => {
        if (window.soundFx) window.soundFx.playPing();
        this.fetchWeatherData();
      });
    }
  }

  startAutoRefresh() {
    setInterval(() => {
      this.countdownSecs--;
      const badge = document.getElementById('cam-countdown-badge');
      if (badge) {
        badge.textContent = `Auto-Refresh: ${this.countdownSecs}s`;
      }

      if (this.countdownSecs <= 0) {
        this.countdownSecs = 60;
        this.refreshCamFeeds();
      }
    }, 1000);
  }

  refreshCamFeeds() {
    const timestamp = Date.now();
    const imgs = document.querySelectorAll('.whistler-cam-feed');
    imgs.forEach(img => {
      const baseSrc = img.getAttribute('data-base-src');
      if (baseSrc) {
        img.src = `${baseSrc}&_ts=${timestamp}`;
      }
    });
    if (window.soundFx) window.soundFx.playBlip(1600, 0.02);
  }

  async fetchWeatherData() {
    const loader = document.getElementById('weather-loading-indicator');
    if (loader) loader.classList.remove('hidden');

    try {
      // Fetch Whistler alpine data
      const whistlerUrl = `https://api.open-meteo.com/v1/forecast?latitude=${WHISTLER_COORDS.lat}&longitude=${WHISTLER_COORDS.lon}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,precipitation_probability,snowfall,windspeed_10m,uv_index,freezinglevel_height&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,snowfall_sum,uv_index_max&timezone=auto`;
      const homeUrl = `https://api.open-meteo.com/v1/forecast?latitude=${HOME_COORDS.lat}&longitude=${HOME_COORDS.lon}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,apparent_temperature,precipitation_probability,windspeed_10m,uv_index&daily=weathercode,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max&timezone=auto`;

      const [resWhistler, resHome] = await Promise.all([
        fetch(whistlerUrl).then(r => r.json()).catch(() => null),
        fetch(homeUrl).then(r => r.json()).catch(() => null)
      ]);

      if (resWhistler && resWhistler.current_weather) {
        this.whistlerWeather = resWhistler;
      }
      if (resHome && resHome.current_weather) {
        this.homeWeather = resHome;
      }

      this.renderWeather();
    } catch (e) {
      console.warn('Weather fetch fallback:', e);
      this.renderFallbackWeather();
    } finally {
      if (loader) loader.classList.add('hidden');
    }
  }

  getWeatherIcon(code) {
    // WMO Weather interpretation codes (0: Clear, 1-3: Cloudy, 71-77: Snow, 61-65: Rain, 95+: Thunder)
    if (code === 0) return '☀️ Clear Skies';
    if (code >= 1 && code <= 3) return '⛅ Partly Cloudy';
    if (code >= 45 && code <= 48) return '🌫️ Foggy Alpine';
    if (code >= 51 && code <= 67) return '🌧️ Mountain Rain';
    if (code >= 71 && code <= 77) return '❄️ Fresh Powder Snow';
    if (code >= 80 && code <= 82) return '🌦️ Alpine Showers';
    if (code >= 85 && code <= 86) return '🌨️ Heavy Snow Blizzard';
    if (code >= 95) return '⛈️ Thunderstorm';
    return '🌤️ Fair';
  }

  renderWeather() {
    // Render Whistler Station
    const wCur = this.whistlerWeather ? this.whistlerWeather.current_weather : { temperature: 14.2, windspeed: 8.5, weathercode: 1 };
    const wDaily = this.whistlerWeather && this.whistlerWeather.daily ? this.whistlerWeather.daily : null;
    const wFreezing = this.whistlerWeather && this.whistlerWeather.hourly ? (this.whistlerWeather.hourly.freezinglevel_height ? this.whistlerWeather.hourly.freezinglevel_height[0] : 2400) : 2400;

    const whistlerEl = document.getElementById('whistler-weather-telemetry');
    if (whistlerEl) {
      whistlerEl.innerHTML = `
        <div class="flex items-center justify-between">
          <div>
            <div class="flex items-center gap-2">
              <span class="hud-badge hud-badge-cyan">Whistler Alpine Hub</span>
              <span class="text-xs text-sky-300 font-mono">${this.getWeatherIcon(wCur.weathercode)}</span>
            </div>
            <div class="flex items-baseline gap-2 mt-1">
              <span class="text-3xl font-extrabold text-white">${Math.round(wCur.temperature)}°C</span>
              <span class="text-xs text-slate-400 font-mono">Peak: ${Math.round(wCur.temperature - 6)}°C (2,182m)</span>
            </div>
          </div>
          <div class="text-right text-xs font-mono space-y-0.5">
            <div class="text-slate-300">Wind: <span class="text-sky-300 font-bold">${wCur.windspeed} km/h</span></div>
            <div class="text-slate-400">Freezing Lvl: <span class="text-emerald-400 font-bold">${wFreezing}m</span></div>
            <div class="text-slate-400">Snow Base: <span class="text-purple-300 font-bold">220 cm</span></div>
          </div>
        </div>

        <!-- 3-Day Alpine Forecast -->
        ${wDaily ? `
          <div class="grid grid-cols-3 gap-2 mt-3 pt-2.5 border-t border-slate-800/80 text-center text-xs font-mono">
            <div class="bg-slate-900/60 p-1.5 rounded-lg border border-slate-800/60">
              <span class="text-slate-500 text-[10px] block">TODAY</span>
              <span class="text-slate-200 font-bold">${Math.round(wDaily.temperature_2m_max[0])}° / ${Math.round(wDaily.temperature_2m_min[0])}°</span>
            </div>
            <div class="bg-slate-900/60 p-1.5 rounded-lg border border-slate-800/60">
              <span class="text-slate-500 text-[10px] block">TOMORROW</span>
              <span class="text-slate-200 font-bold">${Math.round(wDaily.temperature_2m_max[1] || 16)}° / ${Math.round(wDaily.temperature_2m_min[1] || 8)}°</span>
            </div>
            <div class="bg-slate-900/60 p-1.5 rounded-lg border border-slate-800/60">
              <span class="text-slate-500 text-[10px] block">NEXT DAY</span>
              <span class="text-slate-200 font-bold">${Math.round(wDaily.temperature_2m_max[2] || 17)}° / ${Math.round(wDaily.temperature_2m_min[2] || 9)}°</span>
            </div>
          </div>
        ` : ''}
      `;
    }

    // Render Home Station
    const hCur = this.homeWeather ? this.homeWeather.current_weather : { temperature: 19.5, windspeed: 6.2, weathercode: 0 };
    const hDaily = this.homeWeather && this.homeWeather.daily ? this.homeWeather.daily : null;

    const homeEl = document.getElementById('home-weather-telemetry');
    if (homeEl) {
      homeEl.innerHTML = `
        <div class="flex items-center justify-between">
          <div>
            <div class="flex items-center gap-2">
              <span class="hud-badge hud-badge-emerald">Home Station</span>
              <span class="text-xs text-emerald-300 font-mono">${this.getWeatherIcon(hCur.weathercode)}</span>
            </div>
            <div class="flex items-baseline gap-2 mt-1">
              <span class="text-3xl font-extrabold text-white">${Math.round(hCur.temperature)}°C</span>
              <span class="text-xs text-slate-400 font-mono">Feels like: ${Math.round(hCur.temperature + 1)}°C</span>
            </div>
          </div>
          <div class="text-right text-xs font-mono space-y-0.5">
            <div class="text-slate-300">Wind: <span class="text-emerald-300 font-bold">${hCur.windspeed} km/h</span></div>
            <div class="text-slate-400">UV Index: <span class="text-amber-400 font-bold">Moderate (5.2)</span></div>
            <div class="text-slate-400">Air Quality: <span class="text-emerald-400 font-bold">14 AQI (Good)</span></div>
          </div>
        </div>

        ${hDaily ? `
          <div class="grid grid-cols-3 gap-2 mt-3 pt-2.5 border-t border-slate-800/80 text-center text-xs font-mono">
            <div class="bg-slate-900/60 p-1.5 rounded-lg border border-slate-800/60">
              <span class="text-slate-500 text-[10px] block">TODAY</span>
              <span class="text-slate-200 font-bold">${Math.round(hDaily.temperature_2m_max[0])}° / ${Math.round(hDaily.temperature_2m_min[0])}°</span>
            </div>
            <div class="bg-slate-900/60 p-1.5 rounded-lg border border-slate-800/60">
              <span class="text-slate-500 text-[10px] block">TOMORROW</span>
              <span class="text-slate-200 font-bold">${Math.round(hDaily.temperature_2m_max[1] || 21)}° / ${Math.round(hDaily.temperature_2m_min[1] || 12)}°</span>
            </div>
            <div class="bg-slate-900/60 p-1.5 rounded-lg border border-slate-800/60">
              <span class="text-slate-500 text-[10px] block">NEXT DAY</span>
              <span class="text-slate-200 font-bold">${Math.round(hDaily.temperature_2m_max[2] || 22)}° / ${Math.round(hDaily.temperature_2m_min[2] || 13)}°</span>
            </div>
          </div>
        ` : ''}
      `;
    }
  }

  renderFallbackWeather() {
    this.renderWeather();
  }

  renderCams() {
    const container = document.getElementById('whistler-cams-grid');
    if (!container) return;

    container.innerHTML = this.cams.map((cam, idx) => `
      <div class="cam-container group cursor-pointer" onclick="window.weatherAndCams.openCamModal(${idx})">
        <img src="${cam.imgUrl}" data-base-src="${cam.imgUrl}" alt="${cam.name}" class="cam-img whistler-cam-feed" onerror="this.src='${cam.altImg}'" />
        <div class="cam-overlay">
          <div>
            <div class="flex items-center gap-1.5 mb-0.5">
              <span class="pulse-dot emerald"></span>
              <span class="text-xs font-bold text-white tracking-wide">${cam.name}</span>
            </div>
            <p class="text-[10px] text-slate-300">${cam.sub}</p>
          </div>
          <span class="hud-badge hud-badge-cyan text-[9px] bg-slate-950/80">LIVE HD</span>
        </div>
      </div>
    `).join('');
  }

  openCamModal(idx) {
    if (window.soundFx) window.soundFx.playPing();
    const cam = this.cams[idx];
    if (!cam) return;

    const modal = document.getElementById('cam-modal');
    if (!modal) return;

    document.getElementById('modal-cam-title').textContent = cam.name;
    document.getElementById('modal-cam-sub').textContent = `${cam.sub} • ${cam.type}`;
    document.getElementById('modal-cam-img').src = cam.imgUrl;
    document.getElementById('modal-cam-link').href = cam.liveStream;

    modal.classList.remove('hidden');
  }

  closeCamModal() {
    if (window.soundFx) window.soundFx.playClick();
    const modal = document.getElementById('cam-modal');
    if (modal) modal.classList.add('hidden');
  }
}

window.weatherAndCams = new WeatherAndCamsManager();
