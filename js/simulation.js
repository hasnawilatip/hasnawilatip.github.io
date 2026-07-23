/* ══════════════════════════════════════════════════════════
   SIMULATION ENGINE — Simulasi Interaktif
   ══════════════════════════════════════════════════════════ */

const SimulationEngine = {

  // ─── BINARY-DECIMAL CONVERTER ───
  binaryConverter() {
    const main = document.getElementById('mainContent');
    main.innerHTML = `
      <div class="sim-container fade-in">
        <h3>🔢 Konversi Bilangan Biner ↔ Desimal</h3>
        <p style="text-align:center;color:var(--gray-700);margin-bottom:16px;">
          Komputer menggunakan bilangan biner (0 dan 1). Coba konversi di sini!
        </p>

        <!-- Desimal ke Biner -->
        <div class="sim-row">
          <label>Desimal:</label>
          <input type="number" class="sim-input" id="decInput" placeholder="Contoh: 42"
                 min="0" max="255" oninput="SimulationEngine._decToBin()">
          <span style="color:var(--gray-500);">→</span>
          <label>Biner (8-bit):</label>
          <input type="text" class="sim-input" id="binOutput" readonly placeholder="00101010">
        </div>

        <!-- Biner ke Desimal -->
        <div class="sim-row">
          <label>Biner:</label>
          <input type="text" class="sim-input" id="binInput" placeholder="Contoh: 101010"
                 maxlength="8" oninput="SimulationEngine._binToDec()">
          <span style="color:var(--gray-500);">→</span>
          <label>Desimal:</label>
          <input type="text" class="sim-input" id="decOutput" readonly placeholder="42">
        </div>

        <div class="sim-output" id="binSteps"></div>

        <div style="text-align:center;margin-top:12px;color:var(--gray-500);font-size:0.85rem;">
          💡 <b>Tips:</b> Biner adalah bahasa mesin! Setiap digit disebut <i>bit</i>.
          8 bit = 1 byte. Nilai maksimum 8-bit = 255.
        </div>
        <div class="flex-center mt-2">
          <button class="btn btn-secondary" onclick="App.goBack()">📚 Kembali</button>
        </div>
      </div>
    `;
  },

  _decToBin() {
    const dec = parseInt(document.getElementById('decInput').value);
    const binOut = document.getElementById('binOutput');
    const steps = document.getElementById('binSteps');
    if (isNaN(dec) || dec < 0 || dec > 255) {
      binOut.value = '';
      steps.innerHTML = '⚠️ Masukkan angka 0–255';
      return;
    }
    let n = dec;
    let binary = '';
    let stepText = `Konversi ${dec} ke biner:\n`;
    while (n > 0) {
      const rem = n % 2;
      stepText += `  ${n} ÷ 2 = ${Math.floor(n/2)} sisa ${rem}\n`;
      binary = rem + binary;
      n = Math.floor(n / 2);
    }
    binary = binary || '0';
    const padded = binary.padStart(8, '0');
    binOut.value = padded;
    stepText += `\nHasil: ${binary} → 8-bit: ${padded}`;
    steps.textContent = stepText;
  },

  _binToDec() {
    const bin = document.getElementById('binInput').value.replace(/[^01]/g, '').slice(0, 8);
    document.getElementById('binInput').value = bin;
    const decOut = document.getElementById('decOutput');
    const steps = document.getElementById('binSteps');
    if (bin === '') { decOut.value = ''; steps.innerHTML = ''; return; }

    let decimal = 0;
    let stepText = `Konversi biner "${bin}" ke desimal:\n`;
    for (let i = 0; i < bin.length; i++) {
      const bit = parseInt(bin[bin.length - 1 - i]);
      const val = bit * Math.pow(2, i);
      stepText += `  bit ke-${i} (posisi ${i}): ${bit} × 2^${i} = ${val}\n`;
      decimal += val;
    }
    stepText += `\nHasil: ${decimal}`;
    decOut.value = decimal;
    steps.textContent = stepText;
  },

  // ─── LOGIC GATE SIMULATOR ───
  logicGate() {
    const main = document.getElementById('mainContent');
    main.innerHTML = `
      <div class="sim-container fade-in">
        <h3>⚡ Simulasi Gerbang Logika</h3>
        <p style="text-align:center;color:var(--gray-700);margin-bottom:12px;">
          Atur input A dan B, lalu lihat hasil setiap gerbang logika!
        </p>

        <div class="sim-row" style="justify-content:center;">
          <label>A:</label>
          <select class="sim-input" id="inputA" onchange="SimulationEngine._updateGates()" style="width:100px;">
            <option value="0">0 (OFF)</option>
            <option value="1">1 (ON)</option>
          </select>
          <label>B:</label>
          <select class="sim-input" id="inputB" onchange="SimulationEngine._updateGates()" style="width:100px;">
            <option value="0">0 (OFF)</option>
            <option value="1">1 (ON)</option>
          </select>
        </div>

        <div class="gate-grid" id="gateGrid"></div>

        <div class="sim-output" id="gateInfo" style="font-size:0.85rem;">
          Atur input A dan B di atas untuk melihat hasil.
        </div>

        <div class="flex-center mt-2">
          <button class="btn btn-secondary" onclick="App.goBack()">📚 Kembali</button>
        </div>
      </div>
    `;
    this._updateGates();
  },

  _updateGates() {
    const a = parseInt(document.getElementById('inputA').value);
    const b = parseInt(document.getElementById('inputB').value);

    const gates = [
      { name: 'AND', fn: (a,b) => a && b, symbol: '&', desc: 'TRUE jika A DAN B TRUE' },
      { name: 'OR', fn: (a,b) => a || b, symbol: '≥1', desc: 'TRUE jika A ATAU B TRUE' },
      { name: 'NOT A', fn: (a,b) => a ? 0 : 1, symbol: '¬', desc: 'Kebalikan dari A' },
      { name: 'NAND', fn: (a,b) => (a && b) ? 0 : 1, symbol: '&̅', desc: 'Kebalikan dari AND' },
      { name: 'NOR', fn: (a,b) => (a || b) ? 0 : 1, symbol: '≥̅1̅', desc: 'Kebalikan dari OR' },
      { name: 'XOR', fn: (a,b) => a !== b ? 1 : 0, symbol: '=1', desc: 'TRUE jika A dan B BERBEDA' }
    ];

    const grid = document.getElementById('gateGrid');
    grid.innerHTML = gates.map(g => {
      const out = g.fn(a, b);
      return `
        <div class="gate-card" style="border-color:${out ? 'var(--green)' : 'var(--gray-300)'}">
          <div class="gate-name">${g.name}</div>
          <div class="gate-symbol">${g.symbol}</div>
          <div style="font-size:0.8rem;color:var(--gray-500);margin:4px 0;">
            A=${a}, B=${b} → Output
          </div>
          <div class="gate-output ${out ? 'gate-on' : 'gate-off'}"></div>
          <div style="font-weight:700;margin-top:4px;font-size:0.9rem;">${out}</div>
        </div>`;
    }).join('');

    document.getElementById('gateInfo').textContent =
      `Input A = ${a}, B = ${b}. Perhatikan setiap gerbang menghasilkan output berbeda untuk input yang sama!`;
  },

  // ─── SORTING VISUALIZATION ───
  sortingVisualizer() {
    const main = document.getElementById('mainContent');
    const arr = [64, 34, 25, 12, 22, 11, 90, 45, 8, 55];
    main.innerHTML = `
      <div class="sim-container fade-in">
        <h3>📊 Visualisasi Algoritma Pengurutan (Sorting)</h3>
        <p style="text-align:center;color:var(--gray-700);margin-bottom:16px;">
          Lihat bagaimana algoritma Bubble Sort mengurutkan data!
        </p>

        <div id="sortBars" style="display:flex;align-items:flex-end;justify-content:center;gap:6px;height:200px;margin:16px 0;"></div>

        <div class="sim-output" id="sortInfo" style="font-size:0.85rem;">
          Klik tombol di bawah untuk memulai visualisasi.
        </div>

        <div class="flex-center mt-2">
          <button class="btn btn-primary" id="btnSortStart" onclick="SimulationEngine._startSort()">▶️ Mulai Bubble Sort</button>
          <button class="btn btn-secondary" id="btnSortReset" onclick="SimulationEngine.sortingVisualizer()">🔄 Reset</button>
          <button class="btn btn-secondary" onclick="App.goBack()">📚 Kembali</button>
        </div>
      </div>
    `;
    this._drawBars([64, 34, 25, 12, 22, 11, 90, 45, 8, 55], -1, -1);
  },

  _drawBars(arr, cmpA, cmpB) {
    const container = document.getElementById('sortBars');
    if (!container) return;
    const maxVal = Math.max(...arr);
    container.innerHTML = arr.map((v, i) => {
      const h = (v / maxVal) * 180;
      let color = 'var(--blue)';
      if (i === cmpA) color = 'var(--orange)';
      if (i === cmpB) color = 'var(--red)';
      return `<div style="width:30px;height:${h}px;background:${color};border-radius:4px 4px 0 0;display:flex;align-items:flex-end;justify-content:center;font-size:0.65rem;color:white;font-weight:700;padding-bottom:2px;transition:height 0.3s,background 0.2s;">${v}</div>`;
    }).join('');
  },

  async _startSort() {
    const btn = document.getElementById('btnSortStart');
    if (btn) btn.disabled = true;
    const arr = [64, 34, 25, 12, 22, 11, 90, 45, 8, 55];
    const n = arr.length;
    const info = document.getElementById('sortInfo');

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        this._drawBars(arr, j, j + 1);
        info.textContent = `Bandingkan: ${arr[j]} dan ${arr[j+1]}${arr[j] > arr[j+1] ? ' → TUKAR!' : ' → tetap'}`;
        await this._sleep(600);

        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          this._drawBars(arr, j, j + 1);
          await this._sleep(400);
        }
      }
      this._drawBars(arr, -1, -1);
      info.textContent = `Iterasi ${i+1} selesai. Angka terbesar ke-${i+1} sudah di posisi benar.`;
      await this._sleep(600);
    }

    this._drawBars(arr, -1, -1);
    info.textContent = '✅ Pengurutan selesai! Data sudah terurut dari kecil ke besar.';
    if (btn) btn.disabled = false;
  },

  _sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  },

  // ─── SIMULATION MENU ───
  showMenu(gradeColor) {
    const main = document.getElementById('mainContent');
    main.innerHTML = `
      <div class="fade-in">
        <h3 style="text-align:center;margin-bottom:20px;">🧪 Pilih Simulasi Interaktif</h3>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:16px;max-width:800px;margin:0 auto;">
          <div class="grade-card card-k7" onclick="SimulationEngine.binaryConverter();App.pushState({view:'sim-binary'})" style="cursor:pointer;">
            <div class="grade-icon">🔢</div>
            <div class="grade-number" style="font-size:1.2rem;">Konversi Biner</div>
            <div class="grade-desc">Desimal ↔ Biner, lengkap dengan langkah-langkah konversi</div>
          </div>
          <div class="grade-card card-k8" onclick="SimulationEngine.logicGate();App.pushState({view:'sim-logic'})" style="cursor:pointer;">
            <div class="grade-icon">⚡</div>
            <div class="grade-number" style="font-size:1.2rem;">Gerbang Logika</div>
            <div class="grade-desc">Simulasi AND, OR, NOT, NAND, NOR, XOR interaktif</div>
          </div>
          <div class="grade-card card-k9" onclick="SimulationEngine.sortingVisualizer();App.pushState({view:'sim-sort'})" style="cursor:pointer;">
            <div class="grade-icon">📊</div>
            <div class="grade-number" style="font-size:1.2rem;">Visualisasi Sorting</div>
            <div class="grade-desc">Animasi Bubble Sort langkah demi langkah</div>
          </div>
        </div>
        <div class="flex-center mt-3">
          <button class="btn btn-secondary" onclick="App.goBack()">📚 Kembali</button>
        </div>
      </div>
    `;
  }
};
