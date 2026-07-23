/* ══════════════════════════════════════════════════════════
   CROSSWORD ENGINE — Teka-Teki Silang Informatika
   ══════════════════════════════════════════════════════════ */

const CrosswordEngine = {
  grid: [],
  clues: { across: [], down: [] },
  size: 0,
  solution: [],
  userGrid: [],

  init(puzzleData, title) {
    this._title = title || '🔤 Teka-Teki Silang';
    this.size = puzzleData.size || 8;

    // Build empty grid
    this.grid = [];
    this.solution = [];
    this.userGrid = [];
    for (let r = 0; r < this.size; r++) {
      this.grid[r] = [];
      this.solution[r] = [];
      this.userGrid[r] = [];
      for (let c = 0; c < this.size; c++) {
        this.grid[r][c] = '';
        this.solution[r][c] = '';
        this.userGrid[r][c] = '';
      }
    }

    // Place words
    this.clues = { across: [], down: [] };
    (puzzleData.words || []).forEach((w, idx) => {
      const { word, clue, row, col, direction } = w;
      for (let i = 0; i < word.length; i++) {
        const r = direction === 'down' ? row + i : row;
        const c = direction === 'across' ? col + i : col;
        if (r < this.size && c < this.size) {
          this.solution[r][c] = word[i].toUpperCase();
          this.grid[r][c] = '■';
        }
      }
      const clueObj = { num: idx + 1, clue, word, row, col };
      if (direction === 'across') this.clues.across.push(clueObj);
      else this.clues.down.push(clueObj);
    });

    this.render();
  },

  render() {
    const main = document.getElementById('mainContent');
    const cellSize = this.size > 8 ? '36px' : '42px';

    let gridHTML = '<div class="crossword-grid" style="grid-template-columns: repeat(' + this.size + ', ' + cellSize + ');">';
    for (let r = 0; r < this.size; r++) {
      for (let c = 0; c < this.size; c++) {
        const isActive = this.grid[r][c] === '■';
        const val = this.userGrid[r][c] || '';
        gridHTML += isActive
          ? `<input class="cw-cell" maxlength="1" data-r="${r}" data-c="${c}" 
               value="${val}" oninput="CrosswordEngine.onCellInput(this)" 
               onkeydown="CrosswordEngine.onCellKey(event,${r},${c})"
               style="width:${cellSize};height:${cellSize};">`
          : `<div class="cw-cell cw-empty" style="width:${cellSize};height:${cellSize};"></div>`;
      }
    }
    gridHTML += '</div>';

    main.innerHTML = `
      <div class="fade-in" style="max-width:750px;margin:0 auto;">
        <h3 style="text-align:center;margin-bottom:16px;">🔤 ${this._title}</h3>
        ${gridHTML}

        <div class="flex-center mt-2">
          <button class="btn btn-primary btn-sm" onclick="CrosswordEngine.checkAll()">✅ Periksa</button>
          <button class="btn btn-secondary btn-sm" onclick="CrosswordEngine.revealOne()">💡 Petunjuk</button>
          <button class="btn btn-danger btn-sm" onclick="CrosswordEngine.reset()">🔄 Reset</button>
        </div>

        <div id="cwFeedback" style="text-align:center;margin-top:8px;min-height:20px;"></div>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:16px;">
          <div class="cw-clues">
            <h4 style="color:var(--blue);">➡️ Mendatar</h4>
            ${this.clues.across.map(c => `<div class="cw-clue"><b>${c.num}.</b> ${c.clue}</div>`).join('')}
          </div>
          <div class="cw-clues">
            <h4 style="color:var(--green);">⬇️ Menurun</h4>
            ${this.clues.down.map(c => `<div class="cw-clue"><b>${c.num}.</b> ${c.clue}</div>`).join('')}
          </div>
        </div>

        <div class="flex-center mt-2">
          <button class="btn btn-secondary" onclick="App.goBack()">📚 Kembali</button>
        </div>
      </div>
    `;
  },

  onCellInput(input) {
    const r = parseInt(input.dataset.r);
    const c = parseInt(input.dataset.c);
    const val = input.value.toUpperCase().replace(/[^A-Z]/g, '');
    input.value = val;
    this.userGrid[r][c] = val;

    // Auto-move to next cell
    if (val && c < this.size - 1 && this.grid[r][c + 1] === '■') {
      const nextCell = document.querySelector(`.cw-cell[data-r="${r}"][data-c="${c + 1}"]`);
      if (nextCell) nextCell.focus();
    }
  },

  onCellKey(event, r, c) {
    if (event.key === 'Backspace' && !this.userGrid[r][c] && c > 0 && this.grid[r][c - 1] === '■') {
      const prevCell = document.querySelector(`.cw-cell[data-r="${r}"][data-c="${c - 1}"]`);
      if (prevCell) { prevCell.focus(); prevCell.value = ''; this.userGrid[r][c - 1] = ''; }
    }
    if (event.key === 'ArrowUp' && r > 0) {
      const up = document.querySelector(`.cw-cell[data-r="${r - 1}"][data-c="${c}"]`);
      if (up && up.tagName === 'INPUT') up.focus();
    }
    if (event.key === 'ArrowDown' && r < this.size - 1) {
      const dn = document.querySelector(`.cw-cell[data-r="${r + 1}"][data-c="${c}"]`);
      if (dn && dn.tagName === 'INPUT') dn.focus();
    }
  },

  checkAll() {
    let correct = 0, total = 0;
    for (let r = 0; r < this.size; r++) {
      for (let c = 0; c < this.size; c++) {
        if (this.grid[r][c] === '■') {
          total++;
          const cell = document.querySelector(`.cw-cell[data-r="${r}"][data-c="${c}"]`);
          if (this.userGrid[r][c] === this.solution[r][c]) {
            correct++;
            if (cell) cell.classList.add('cw-correct');
          } else {
            if (cell) cell.classList.add('cw-wrong');
          }
        }
      }
    }
    const pct = Math.round((correct / total) * 100);
    const fb = document.getElementById('cwFeedback');
    fb.innerHTML = `<span style="font-weight:700;">${correct}/${total} benar (${pct}%)</span>`;
    if (pct === 100) fb.innerHTML += ' 🎉 <b style="color:var(--green);">TTS Selesai!</b>';
  },

  revealOne() {
    // Find first empty or wrong cell
    for (let r = 0; r < this.size; r++) {
      for (let c = 0; c < this.size; c++) {
        if (this.grid[r][c] === '■' && this.userGrid[r][c] !== this.solution[r][c]) {
          this.userGrid[r][c] = this.solution[r][c];
          const cell = document.querySelector(`.cw-cell[data-r="${r}"][data-c="${c}"]`);
          if (cell) { cell.value = this.solution[r][c]; cell.classList.add('cw-reveal'); }
          return;
        }
      }
    }
  },

  reset() {
    for (let r = 0; r < this.size; r++) {
      for (let c = 0; c < this.size; c++) {
        this.userGrid[r][c] = '';
      }
    }
    this.render();
    document.getElementById('cwFeedback').innerHTML = '';
  }
};
