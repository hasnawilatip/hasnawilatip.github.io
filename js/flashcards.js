/* ══════════════════════════════════════════════════════════
   FLASHCARD ENGINE — Kartu Belajar Bolak-Balik
   ══════════════════════════════════════════════════════════ */

const FlashcardEngine = {
  cards: [],
  currentIndex: 0,
  flipped: false,
  knownCards: new Set(),
  unknownCards: new Set(),

  init(cards, title) {
    this.cards = [...cards].sort(() => Math.random() - 0.5);
    this.currentIndex = 0;
    this.flipped = false;
    this.knownCards = new Set();
    this.unknownCards = new Set();
    this._title = title || '🃏 Flashcards';
    this.render();
  },

  render() {
    const card = this.cards[this.currentIndex];
    const total = this.cards.length;
    const progress = (this.currentIndex / total) * 100;

    const main = document.getElementById('mainContent');
    main.innerHTML = `
      <div class="fade-in" style="max-width:600px;margin:0 auto;">
        <h3 style="text-align:center;margin-bottom:8px;">🃏 ${this._title}</h3>
        <div class="quiz-progress" style="margin-bottom:20px;">
          <div class="quiz-progress-bar" style="width:${progress}%;background:linear-gradient(90deg,var(--purple),#c084fc);"></div>
        </div>

        <div class="flashcard-wrapper" onclick="FlashcardEngine.flip()">
          <div class="flashcard ${this.flipped ? 'flipped' : ''}" id="flashcardEl">
            <div class="flashcard-front">
              <div class="flashcard-label">📋 Istilah</div>
              <div class="flashcard-text">${card.front}</div>
              <div class="flashcard-hint">👆 Klik untuk melihat definisi</div>
            </div>
            <div class="flashcard-back">
              <div class="flashcard-label">📝 Definisi</div>
              <div class="flashcard-text">${card.back}</div>
            </div>
          </div>
        </div>

        <div style="text-align:center;margin-top:16px;color:var(--gray-500);font-size:0.85rem;">
          Kartu ${this.currentIndex + 1} dari ${total}
        </div>

        <div class="flex-center mt-2">
          ${this.flipped ? `
            <button class="btn btn-success" onclick="FlashcardEngine.markKnown()">✅ Saya Tahu</button>
            <button class="btn btn-danger" onclick="FlashcardEngine.markUnknown()">❌ Belum Tahu</button>
          ` : ''}
        </div>

        <div class="flex-center mt-2">
          <button class="btn btn-secondary btn-sm" onclick="FlashcardEngine.prev()" ${this.currentIndex === 0 ? 'disabled' : ''}>◀ Sebelumnya</button>
          <button class="btn btn-secondary btn-sm" onclick="FlashcardEngine.next()">${this.currentIndex < total - 1 ? 'Lewati ▶' : 'Selesai 🏁'}</button>
          <button class="btn btn-secondary btn-sm" onclick="FlashcardEngine.shuffle()">🔀 Acak</button>
        </div>

        <div style="text-align:center;margin-top:8px;font-size:0.8rem;color:var(--gray-500);">
          ✅ Diketahui: ${this.knownCards.size} | ❌ Dipelajari: ${this.unknownCards.size}
        </div>

        <div class="flex-center mt-2">
          <button class="btn btn-secondary" onclick="App.goBack()">📚 Kembali</button>
        </div>
      </div>
    `;
  },

  flip() {
    this.flipped = !this.flipped;
    this.render();
  },

  markKnown() {
    this.knownCards.add(this.currentIndex);
    this.next();
  },

  markUnknown() {
    this.unknownCards.add(this.currentIndex);
    this.next();
  },

  next() {
    if (this.currentIndex < this.cards.length - 1) {
      this.currentIndex++;
      this.flipped = false;
      this.render();
    } else {
      this.showSummary();
    }
  },

  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.flipped = false;
      this.render();
    }
  },

  shuffle() {
    this.cards = [...this.cards].sort(() => Math.random() - 0.5);
    this.currentIndex = 0;
    this.flipped = false;
    this.knownCards = new Set();
    this.unknownCards = new Set();
    this.render();
  },

  showSummary() {
    const main = document.getElementById('mainContent');
    const total = this.cards.length;
    const known = this.knownCards.size;
    const pct = Math.round((known / total) * 100);

    main.innerHTML = `
      <div class="quiz-container fade-in" style="text-align:center;">
        <div class="quiz-score">
          <div class="score-circle ${pct >= 70 ? 'score-great' : 'score-ok'}">🃏</div>
          <h2>Ringkasan Flashcards</h2>
          <p style="font-size:2rem;font-weight:800;margin:8px 0;">${known} / ${total}</p>
          <p style="color:var(--gray-700);">Kamu menguasai <b>${pct}%</b> istilah</p>
          <div style="display:flex;gap:20px;justify-content:center;margin-top:12px;font-size:0.9rem;">
            <span>✅ Diketahui: <b>${known}</b></span>
            <span>📖 Perlu dipelajari: <b>${this.unknownCards.size}</b></span>
          </div>
          <div class="flex-center mt-3">
            <button class="btn btn-primary" onclick="FlashcardEngine.shuffle()">🔄 Ulangi</button>
            <button class="btn btn-secondary" onclick="App.goBack()">📚 Kembali</button>
          </div>
        </div>
      </div>
    `;
  }
};
