/* ══════════════════════════════════════════════════════════
   SEARCH ALGORITHM VISUALIZER — Linear vs Binary Search
   ══════════════════════════════════════════════════════════ */

const SearchAlgoSim = {
  data: [],
  target: 0,
  sorted: false,

  init() {
    this.data = [3, 15, 7, 22, 9, 31, 5, 18, 12, 27, 4, 20, 8, 14, 25];
    this.sorted = false;
    this.render();
  },

  render(highlightIdx = -1, foundIdx = -1, comparing = [], steps = '') {
    const main = document.getElementById('mainContent');
    const maxVal = Math.max(...this.data);

    const barsHTML = this.data.map((v, i) => {
      let color = 'var(--blue)';
      if (i === foundIdx) color = 'var(--green)';
      else if (comparing.includes(i)) color = 'var(--orange)';
      else if (i === highlightIdx && foundIdx < 0) color = 'var(--red)';
      const h = (v / maxVal) * 140;
      return `<div style="flex:1;min-width:32px;text-align:center;">
        <div style="height:${h}px;background:${color};border-radius:4px 4px 0 0;margin:0 2px;transition:0.3s;display:flex;align-items:flex-end;justify-content:center;color:white;font-weight:700;font-size:0.7rem;padding-bottom:2px;">${v}</div>
        <div style="font-size:0.65rem;color:var(--gray-500);margin-top:2px;">[${i}]</div>
      </div>`;
    }).join('');

    main.innerHTML = `
      <div class="sim-container fade-in" style="max-width:800px;">
        <h3>🔍 Visualisasi Algoritma Pencarian</h3>
        <p style="text-align:center;color:var(--gray-700);margin-bottom:12px;font-size:0.9rem;">
          Bandingkan <b>Linear Search</b> vs <b>Binary Search</b> secara visual!
        </p>

        <div style="display:flex;align-items:flex-end;justify-content:center;gap:0;height:160px;margin:16px 0;padding:0 8px;">
          ${barsHTML}
        </div>

        <div class="sim-row" style="justify-content:center;">
          <label>🎯 Target:</label>
          <input type="number" class="sim-input" id="searchTarget" value="${this.target || ''}" 
                 placeholder="Angka" style="width:100px;" min="1" max="99">
        </div>

        <div class="flex-center">
          <button class="btn btn-primary btn-sm" onclick="SearchAlgoSim.linearSearch()">🔍 Linear Search</button>
          <button class="btn btn-success btn-sm" onclick="SearchAlgoSim.binarySearch()">⚡ Binary Search</button>
          <button class="btn btn-secondary btn-sm" onclick="SearchAlgoSim.sortData()">📊 Urutkan Data</button>
          <button class="btn btn-secondary btn-sm" onclick="SearchAlgoSim.init()">🔄 Reset</button>
        </div>

        <div class="sim-output" id="searchSteps" style="max-height:200px;overflow-y:auto;font-size:0.8rem;">
          ${steps || `💡 Data: [${this.data.join(', ')}] ${this.sorted ? '(TERURUT ✅)' : '(BELUM terurut ⚠️ — Binary Search butuh data terurut!)'}`}
        </div>

        <div style="margin-top:12px;padding:12px;background:var(--blue-light);border-radius:8px;font-size:0.85rem;">
          <b>📌 Info:</b><br>
          • <b>Linear Search:</b> Cek satu per satu. O(n). Cocok untuk data sedikit/tidak terurut.<br>
          • <b>Binary Search:</b> Bagi dua terus. O(log n). <b>HARUS data terurut!</b> Sangat cepat untuk data besar.
        </div>

        <div class="flex-center mt-2">
          <button class="btn btn-secondary" onclick="App.goBack()">📚 Kembali</button>
        </div>
      </div>
    `;
  },

  sortData() {
    this.data.sort((a, b) => a - b);
    this.sorted = true;
    this.render(-1, -1, [], `✅ Data telah diurutkan: [${this.data.join(', ')}] — Sekarang Binary Search bisa digunakan!`);
  },

  async linearSearch() {
    const target = parseInt(document.getElementById('searchTarget').value);
    if (isNaN(target)) {
      document.getElementById('searchSteps').innerHTML = '⚠️ Masukkan angka target terlebih dahulu!';
      return;
    }
    this.target = target;

    let steps = `🔍 Linear Search — Mencari ${target}:\n`;
    for (let i = 0; i < this.data.length; i++) {
      this.render(i, -1, [...Array(i).keys()], steps + `  Cek indeks [${i}]: ${this.data[i]} ${this.data[i] === target ? '← KETEMU! ✅' : 'bukan target'}`);
      await this._sleep(500);
      if (this.data[i] === target) {
        steps += `\n✅ Ditemukan di indeks [${i}] setelah ${i + 1} langkah.`;
        this.render(-1, i, [], steps);
        return;
      }
    }
    steps += `\n❌ ${target} tidak ditemukan setelah ${this.data.length} langkah.`;
    this.render(-1, -1, [], steps);
  },

  async binarySearch() {
    if (!this.sorted) {
      document.getElementById('searchSteps').innerHTML = '⚠️ Binary Search membutuhkan data TERURUT! Klik "Urutkan Data" dulu.';
      return;
    }
    const target = parseInt(document.getElementById('searchTarget').value);
    if (isNaN(target)) {
      document.getElementById('searchSteps').innerHTML = '⚠️ Masukkan angka target terlebih dahulu!';
      return;
    }
    this.target = target;

    let left = 0, right = this.data.length - 1, step = 0;
    let steps = `⚡ Binary Search — Mencari ${target}:\n`;

    while (left <= right) {
      step++;
      const mid = Math.floor((left + right) / 2);
      const comparing = [];
      for (let i = left; i <= right; i++) comparing.push(i);

      this.render(mid, -1, comparing, steps + `  Langkah ${step}: Rentang [${left}–${right}], tengah=[${mid}] = ${this.data[mid]} ${this.data[mid] === target ? '← KETEMU! ✅' : this.data[mid] < target ? '→ cari kanan' : '→ cari kiri'}`);
      await this._sleep(700);

      if (this.data[mid] === target) {
        steps += `\n✅ Ditemukan di indeks [${mid}] hanya dalam ${step} langkah! (Binary Search: O(log n))`;
        this.render(-1, mid, [], steps);
        return;
      } else if (this.data[mid] < target) {
        left = mid + 1;
        steps += `    ${this.data[mid]} < ${target}, geser kiri ke ${left}\n`;
      } else {
        right = mid - 1;
        steps += `    ${this.data[mid]} > ${target}, geser kanan ke ${right}\n`;
      }
    }
    steps += `\n❌ ${target} tidak ditemukan dalam ${step} langkah.`;
    this.render(-1, -1, [], steps);
  },

  _sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
};
