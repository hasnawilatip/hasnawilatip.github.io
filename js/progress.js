/* ══════════════════════════════════════════════════════════
   PROGRESS TRACKER + BADGES — localStorage
   ══════════════════════════════════════════════════════════ */

const ProgressTracker = {
  STORAGE_KEY: 'informatika_progress',

  _load() {
    try {
      const raw = localStorage.getItem(this.STORAGE_KEY);
      return raw ? JSON.parse(raw) : this._defaultData();
    } catch (e) {
      return this._defaultData();
    }
  },

  _save(data) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
  },

  _defaultData() {
    return {
      chaptersRead: {},      // { 'k7-1': true, ... }
      quizzesTaken: {},       // { 'k7-1': {score, total, date} }
      fillBlankTaken: {},
      trueFalseTaken: {},
      flashcardsDone: {},
      puzzlesDone: {},
      badges: [],            // ['badge-id', ...]
      totalPoints: 0,
      streak: 0,
      lastActive: null
    };
  },

  // Mark chapter as read
  markChapterRead(gradeKey, chapterId) {
    const data = this._load();
    const key = `${gradeKey}-${chapterId}`;
    if (!data.chaptersRead[key]) {
      data.chaptersRead[key] = true;
      data.totalPoints += 5;
      this._checkBadges(data);
    }
    data.lastActive = new Date().toISOString();
    this._save(data);
  },

  // Mark quiz taken
  markQuizTaken(gradeKey, chapterId, score, total) {
    const data = this._load();
    const key = `${gradeKey}-${chapterId}`;
    data.quizzesTaken[key] = { score, total, date: new Date().toISOString() };
    data.totalPoints += score * 2;
    if (score === total) data.totalPoints += 10; // Perfect bonus
    data.lastActive = new Date().toISOString();
    this._checkBadges(data);
    this._save(data);
  },

  // Mark fill blank taken
  markFillBlankTaken(gradeKey, score, total) {
    const data = this._load();
    const key = `fb-${gradeKey}`;
    data.fillBlankTaken[key] = { score, total, date: new Date().toISOString() };
    data.totalPoints += score * 2;
    data.lastActive = new Date().toISOString();
    this._checkBadges(data);
    this._save(data);
  },

  // Mark true/false taken
  markTrueFalseTaken(gradeKey, score, total) {
    const data = this._load();
    const key = `tf-${gradeKey}`;
    data.trueFalseTaken[key] = { score, total, date: new Date().toISOString() };
    data.totalPoints += score * 2;
    data.lastActive = new Date().toISOString();
    this._checkBadges(data);
    this._save(data);
  },

  // Mark flashcards done
  markFlashcardsDone(gradeKey, known, total) {
    const data = this._load();
    const key = `fc-${gradeKey}`;
    data.flashcardsDone[key] = { known, total, date: new Date().toISOString() };
    data.totalPoints += known;
    data.lastActive = new Date().toISOString();
    this._checkBadges(data);
    this._save(data);
  },

  // Mark puzzle complete
  markPuzzleComplete(title, idx) {
    const data = this._load();
    const key = `puzzle-${title}-${idx}`;
    data.puzzlesDone[key] = { date: new Date().toISOString() };
    data.totalPoints += 15;
    data.lastActive = new Date().toISOString();
    this._checkBadges(data);
    this._save(data);
  },

  _checkBadges(data) {
    const badges = [];

    // Badge: Pemula — baca 1 chapter
    if (Object.keys(data.chaptersRead).length >= 1 && !data.badges.includes('pemula')) {
      badges.push({ id: 'pemula', name: '🌱 Pemula', desc: 'Membaca 1 bab materi' });
    }
    // Badge: Pembelajar — baca 5 chapter
    if (Object.keys(data.chaptersRead).length >= 5 && !data.badges.includes('pembelajar')) {
      badges.push({ id: 'pembelajar', name: '📖 Pembelajar', desc: 'Membaca 5 bab materi' });
    }
    // Badge: Rajin — baca 10 chapter
    if (Object.keys(data.chaptersRead).length >= 10 && !data.badges.includes('rajin')) {
      badges.push({ id: 'rajin', name: '📚 Rajin', desc: 'Membaca 10 bab materi' });
    }
    // Badge:Master — baca semua (27 chapters)
    if (Object.keys(data.chaptersRead).length >= 27 && !data.badges.includes('master')) {
      badges.push({ id: 'master', name: '🎓 Master', desc: 'Membaca SEMUA bab' });
    }
    // Badge: Kuis — pertama kali kuis
    if (Object.keys(data.quizzesTaken).length >= 1 && !data.badges.includes('kuis1')) {
      badges.push({ id: 'kuis1', name: '📝 Penguji', desc: 'Menyelesaikan 1 kuis' });
    }
    // Badge: Nilai Sempurna
    const perfectQuiz = Object.values(data.quizzesTaken).some(q => q.score === q.total);
    if (perfectQuiz && !data.badges.includes('perfect')) {
      badges.push({ id: 'perfect', name: '🌟 Sempurna', desc: 'Nilai 100% di kuis' });
    }
    // Badge: 100 poin
    if (data.totalPoints >= 100 && !data.badges.includes('100pts')) {
      badges.push({ id: '100pts', name: '💯 100 Poin', desc: 'Mengumpulkan 100 poin' });
    }
    // Badge: 500 poin
    if (data.totalPoints >= 500 && !data.badges.includes('500pts')) {
      badges.push({ id: '500pts', name: '🏆 500 Poin', desc: 'Mengumpulkan 500 poin' });
    }

    badges.forEach(b => data.badges.push(b.id));
    return badges;
  },

  // Get summary for dashboard
  getSummary() {
    const data = this._load();
    return {
      chaptersRead: Object.keys(data.chaptersRead).length,
      quizzesTaken: Object.keys(data.quizzesTaken).length,
      totalPoints: data.totalPoints,
      badges: data.badges,
      streak: data.streak
    };
  },

  // Show progress dashboard
  showDashboard() {
    const data = this._load();
    const summary = this.getSummary();

    const allBadges = [
      { id: 'pemula', name: '🌱 Pemula', desc: 'Membaca 1 bab materi' },
      { id: 'pembelajar', name: '📖 Pembelajar', desc: 'Membaca 5 bab materi' },
      { id: 'rajin', name: '📚 Rajin', desc: 'Membaca 10 bab materi' },
      { id: 'master', name: '🎓 Master', desc: 'Membaca SEMUA bab' },
      { id: 'kuis1', name: '📝 Penguji', desc: 'Menyelesaikan 1 kuis' },
      { id: 'perfect', name: '🌟 Sempurna', desc: 'Nilai 100% di kuis' },
      { id: '100pts', name: '💯 100 Poin', desc: 'Mengumpulkan 100 poin' },
      { id: '500pts', name: '🏆 500 Poin', desc: 'Mengumpulkan 500 poin' }
    ];

    const main = document.getElementById('mainContent');
    main.innerHTML = `
      <div class="fade-in" style="max-width:700px;margin:0 auto;">
        <h3 style="text-align:center;margin-bottom:20px;">📊 Progress Belajarku</h3>

        <!-- Stats cards -->
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:12px;margin-bottom:20px;">
          <div class="progress-stat">
            <div class="progress-stat-num">${summary.chaptersRead}</div>
            <div class="progress-stat-label">📖 Bab Dibaca</div>
          </div>
          <div class="progress-stat">
            <div class="progress-stat-num">${summary.quizzesTaken}</div>
            <div class="progress-stat-label">📝 Kuis Dikerjakan</div>
          </div>
          <div class="progress-stat">
            <div class="progress-stat-num">${summary.totalPoints}</div>
            <div class="progress-stat-label">⭐ Total Poin</div>
          </div>
        </div>

        <!-- Progress bars per kelas -->
        ${this._renderClassProgress(data)}

        <!-- Badges -->
        <h4 style="margin:20px 0 12px;text-align:center;">🏆 Pencapaian (Badge)</h4>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:8px;">
          ${allBadges.map(b => {
            const earned = data.badges.includes(b.id);
            return `<div class="badge-card ${earned ? 'badge-earned' : 'badge-locked'}">
              <div style="font-size:1.5rem;">${earned ? b.name.split(' ')[0] : '🔒'}</div>
              <div style="font-weight:600;font-size:0.8rem;">${b.name}</div>
              <div style="font-size:0.7rem;color:var(--gray-500);">${b.desc}</div>
            </div>`;
          }).join('')}
        </div>

        <div class="flex-center mt-3">
          <button class="btn btn-danger btn-sm" onclick="ProgressTracker.resetAll()">🗑️ Reset Progress</button>
          <button class="btn btn-secondary" onclick="App.goBack()">📚 Kembali</button>
        </div>
      </div>
    `;
  },

  _renderClassProgress(data) {
    const classes = { k7: 'Kelas 7', k8: 'Kelas 8', k9: 'Kelas 9' };
    const chapterCounts = { k7: 9, k8: 9, k9: 9 };
    const colors = { k7: 'var(--blue)', k8: 'var(--green)', k9: 'var(--purple)' };

    return Object.entries(classes).map(([key, name]) => {
      const read = Object.keys(data.chaptersRead).filter(k => k.startsWith(key)).length;
      const pct = Math.round((read / chapterCounts[key]) * 100);
      return `<div style="margin-bottom:8px;">
        <div style="display:flex;justify-content:space-between;font-size:0.85rem;margin-bottom:2px;">
          <span>${name}</span><span>${read}/${chapterCounts[key]} bab</span>
        </div>
        <div style="background:var(--gray-200);border-radius:10px;height:10px;overflow:hidden;">
          <div style="width:${pct}%;height:100%;background:${colors[key]};border-radius:10px;transition:width 0.5s;"></div>
        </div>
      </div>`;
    }).join('');
  },

  resetAll() {
    if (confirm('Yakin ingin mereset semua progress? Ini tidak bisa dibatalkan!')) {
      localStorage.removeItem(this.STORAGE_KEY);
      this.showDashboard();
    }
  }
};
