/* ══════════════════════════════════════════════════════════
   NETWORK SIMULATION — Visualisasi Jaringan Client-Server
   ══════════════════════════════════════════════════════════ */

const NetworkSim = {
  animationId: null,
  packets: [],

  init() {
    this.packets = [];
    this.render();
    this._startAnimation();
  },

  render() {
    const main = document.getElementById('mainContent');
    main.innerHTML = `
      <div class="sim-container fade-in" style="max-width:750px;">
        <h3>🌐 Simulasi Jaringan Client-Server</h3>
        <p style="text-align:center;color:var(--gray-700);margin-bottom:12px;font-size:0.9rem;">
          Lihat bagaimana data (paket) dikirim dari <b>Client</b> ke <b>Server</b> dan sebaliknya!
        </p>

        <div class="network-canvas" id="netCanvas">
          <!-- Client -->
          <div class="net-node net-client" id="netClient">
            <div class="net-icon">💻</div>
            <div><b>Client</b></div>
            <div style="font-size:0.7rem;">(Komputermu)</div>
          </div>

          <!-- Router -->
          <div class="net-node net-router" id="netRouter">
            <div class="net-icon">📡</div>
            <div><b>Router</b></div>
            <div style="font-size:0.7rem;">(Penghubung)</div>
          </div>

          <!-- Server -->
          <div class="net-node net-server" id="netServer">
            <div class="net-icon">🖥️</div>
            <div><b>Server</b></div>
            <div style="font-size:0.7rem;">(Penyedia data)</div>
          </div>

          <!-- Connection lines (SVG) -->
          <svg class="net-svg" id="netSvg"></svg>

          <!-- Packets container -->
          <div id="packetsLayer"></div>
        </div>

        <div class="sim-row" style="justify-content:center;flex-wrap:wrap;">
          <button class="btn btn-primary btn-sm" onclick="NetworkSim.sendRequest()">📤 Kirim Request</button>
          <button class="btn btn-success btn-sm" onclick="NetworkSim.sendResponse()">📥 Kirim Response</button>
          <button class="btn btn-secondary btn-sm" onclick="NetworkSim.clearPackets()">🗑️ Bersihkan</button>
        </div>

        <div class="sim-output" id="netLog" style="max-height:180px;overflow-y:auto;font-size:0.8rem;">
          🟢 Simulasi siap. Klik "Kirim Request" untuk memulai!
        </div>

        <div style="margin-top:12px;padding:12px;background:var(--blue-light);border-radius:8px;font-size:0.85rem;">
          <b>📌 Protokol yang Disimulasikan:</b><br>
          • <b>HTTP Request:</b> Client meminta halaman web ke Server<br>
          • <b>HTTP Response:</b> Server mengirimkan halaman kembali ke Client<br>
          • <b>Router:</b> Mengarahkan paket data ke tujuan
        </div>

        <div class="flex-center mt-2">
          <button class="btn btn-secondary" onclick="App.goBack()">📚 Kembali</button>
        </div>
      </div>
    `;

    this._drawLines();
  },

  _drawLines() {
    const svg = document.getElementById('netSvg');
    if (!svg) return;
    const client = document.getElementById('netClient');
    const router = document.getElementById('netRouter');
    const server = document.getElementById('netServer');
    if (!client || !router || !server) return;

    const canvas = document.getElementById('netCanvas');
    const rect = canvas.getBoundingClientRect();
    const cRect = client.getBoundingClientRect();
    const rRect = router.getBoundingClientRect();
    const sRect = server.getBoundingClientRect();

    const cx = cRect.left + cRect.width / 2 - rect.left;
    const cy = cRect.top + cRect.height / 2 - rect.top;
    const rx = rRect.left + rRect.width / 2 - rect.left;
    const ry = rRect.top + rRect.height / 2 - rect.top;
    const sx = sRect.left + sRect.width / 2 - rect.left;
    const sy = sRect.top + sRect.height / 2 - rect.top;

    svg.setAttribute('viewBox', `0 0 ${rect.width} ${rect.height}`);
    svg.style.width = rect.width + 'px';
    svg.style.height = rect.height + 'px';
    svg.innerHTML = `
      <line x1="${cx}" y1="${cy}" x2="${rx}" y2="${ry}" stroke="#1A56DB" stroke-width="2" stroke-dasharray="6,3" marker-end="url(#arrowBlue)"/>
      <line x1="${rx}" y1="${ry}" x2="${sx}" y2="${sy}" stroke="#0D8C24" stroke-width="2" stroke-dasharray="6,3" marker-end="url(#arrowGreen)"/>
      <defs>
        <marker id="arrowBlue" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#1A56DB"/>
        </marker>
        <marker id="arrowGreen" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#0D8C24"/>
        </marker>
      </defs>`;
  },

  _startAnimation() {
    this._drawLines();
    // Redraw on resize
    window.addEventListener('resize', () => this._drawLines());
  },

  sendRequest() {
    this._animatePacket('client-to-server', '📤', 'HTTP Request');
    this._log('📤 Client mengirim <b>HTTP Request</b> ke Server melalui Router');
    setTimeout(() => {
      this._log('📡 Router meneruskan request ke Server...');
    }, 800);
    setTimeout(() => {
      this._log('🖥️ Server menerima request dan memproses...');
    }, 1600);
  },

  sendResponse() {
    this._animatePacket('server-to-client', '📥', 'HTTP Response');
    this._log('🖥️ Server mengirim <b>HTTP Response</b> ke Client');
    setTimeout(() => {
      this._log('📡 Router meneruskan response ke Client...');
    }, 800);
    setTimeout(() => {
      this._log('💻 Client menerima halaman web! ✅');
    }, 1600);
  },

  _animatePacket(direction, icon, label) {
    const layer = document.getElementById('packetsLayer');
    if (!layer) return;

    const packet = document.createElement('div');
    packet.className = 'net-packet';
    packet.innerHTML = `${icon} ${label}`;
    packet.style.animationName = direction;
    packet.style.animationDuration = '2s';
    layer.appendChild(packet);

    setTimeout(() => packet.remove(), 2200);
  },

  _log(msg) {
    const log = document.getElementById('netLog');
    if (!log) return;
    const time = new Date().toLocaleTimeString();
    log.innerHTML += `<br>[${time}] ${msg}`;
    log.scrollTop = log.scrollHeight;
  },

  clearPackets() {
    const log = document.getElementById('netLog');
    if (log) log.innerHTML = '🟢 Log dibersihkan.';
    const layer = document.getElementById('packetsLayer');
    if (layer) layer.innerHTML = '';
  }
};
