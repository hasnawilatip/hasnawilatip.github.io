/* ══════════════════════════════════════════════════════════
   CODE PUZZLE ENGINE — Susun Blok Kode/Logika
   ══════════════════════════════════════════════════════════ */

const CodePuzzleEngine = {
  blocks: [],
  answer: [],
  slots: [],
  currentPuzzle: 0,

  init(puzzles, title) {
    this.puzzles = puzzles;
    this.currentPuzzle = 0;
    this._title = title || '🧩 Susun Kode';
    this.loadPuzzle();
  },

  loadPuzzle() {
    const puzzle = this.puzzles[this.currentPuzzle];
    this.answer = [...puzzle.order];
    this.blocks = [...puzzle.blocks].sort(() => Math.random() - 0.5);
    this.slots = new Array(puzzle.order.length).fill(null);
    this.render();
  },

  render() {
    const puzzle = this.puzzles[this.currentPuzzle];
    const total = this.puzzles.length;

    const main = document.getElementById('mainContent');
    main.innerHTML = `
      <div class="fade-in" style="max-width:700px;margin:0 auto;">
        <h3 style="text-align:center;margin-bottom:4px;">🧩 ${this._title}</h3>
        <p style="text-align:center;color:var(--gray-500);margin-bottom:4px;font-size:0.85rem;">
          Puzzle ${this.currentPuzzle + 1} dari ${total}
        </p>
        <p style="text-align:center;color:var(--gray-700);margin-bottom:16px;font-size:0.9rem;">
          ${puzzle.desc}
        </p>

        <!-- Slot tempat menyusun -->
        <div class="puzzle-slots" id="puzzleSlots">
          ${this.slots.map((block, i) => `
            <div class="puzzle-slot ${block !== null ? 'filled' : ''}" 
                 onclick="CodePuzzleEngine.removeFromSlot(${i})" 
                 id="slot-${i}"
                 title="${block !== null ? 'Klik untuk mengembalikan' : 'Kosong'}">
              ${block !== null ? block : `<span class="slot-num">${i + 1}</span>`}
            </div>
          `).join('')}
        </div>

        <!-- Blok yang bisa dipilih -->
        <div style="margin-top:16px;">
          <p style="text-align:center;font-weight:600;margin-bottom:8px;font-size:0.9rem;">📦 Blok yang tersedia (klik untuk menempatkan):</p>
          <div class="puzzle-blocks" id="puzzleBlocks">
            ${this.blocks.map((block, i) => `
              <div class="puzzle-block ${this._isUsed(block) ? 'used' : ''}" 
                   onclick="CodePuzzleEngine.placeBlock('${this._esc(block)}')" 
                   id="block-${i}">
                ${block}
              </div>
            `).join('')}
          </div>
        </div>

        <div id="puzzleFeedback" style="text-align:center;margin-top:12px;min-height:24px;"></div>

        <div class="flex-center mt-2">
          <button class="btn btn-secondary btn-sm" onclick="CodePuzzleEngine.resetSlots()">🔄 Reset</button>
          <button class="btn btn-primary btn-sm" onclick="CodePuzzleEngine.checkPuzzle()">✅ Periksa</button>
        </div>

        <div class="flex-center mt-2">
          ${this.currentPuzzle > 0 ? `<button class="btn btn-secondary btn-sm" onclick="CodePuzzleEngine.prevPuzzle()">◀ Sebelumnya</button>` : ''}
          ${this.currentPuzzle < total - 1 ? `<button class="btn btn-secondary btn-sm" onclick="CodePuzzleEngine.nextPuzzle()">Lewati ▶</button>` : ''}
          <button class="btn btn-secondary" onclick="App.goBack()">📚 Kembali</button>
        </div>
      </div>
    `;
  },

  _esc(s) {
    return s.replace(/'/g, "\\'").replace(/"/g, '&quot;');
  },

  _isUsed(block) {
    return this.slots.includes(block);
  },

  placeBlock(block) {
    if (this._isUsed(block)) return;
    const emptyIdx = this.slots.indexOf(null);
    if (emptyIdx === -1) return;
    this.slots[emptyIdx] = block;
    this.render();
  },

  removeFromSlot(idx) {
    if (this.slots[idx] === null) return;
    this.slots[idx] = null;
    this.render();
  },

  resetSlots() {
    this.slots = new Array(this.answer.length).fill(null);
    this.render();
  },

  checkPuzzle() {
    const fb = document.getElementById('puzzleFeedback');
    if (this.slots.includes(null)) {
      fb.innerHTML = '<span style="color:var(--orange);">⚠️ Lengkapi semua slot terlebih dahulu!</span>';
      return;
    }

    const correct = this.slots.every((block, i) => block === this.answer[i]);
    if (correct) {
      fb.innerHTML = '<span style="color:var(--green);font-weight:700;font-size:1.1rem;">✅ Benar! Susunan sudah tepat.</span>';
      // Mark progress
      ProgressTracker.markPuzzleComplete(this._title, this.currentPuzzle);
    } else {
      fb.innerHTML = '<span style="color:var(--red);">❌ Belum tepat. Coba susun ulang.</span>';
    }
  },

  prevPuzzle() {
    if (this.currentPuzzle > 0) {
      this.currentPuzzle--;
      this.loadPuzzle();
    }
  },

  nextPuzzle() {
    if (this.currentPuzzle < this.puzzles.length - 1) {
      this.currentPuzzle++;
      this.loadPuzzle();
    }
  }
};
