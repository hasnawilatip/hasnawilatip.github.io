/* ══════════════════════════════════════════════════════════
   QUIZ ENGINE — Kuis Pilihan Ganda Interaktif
   ══════════════════════════════════════════════════════════ */

const QuizEngine = {
  currentQuestion: 0,
  score: 0,
  questions: [],
  answered: false,

  init(questions) {
    this.currentQuestion = 0;
    this.score = 0;
    this.questions = [...questions].sort(() => Math.random() - 0.5); // Acak soal
    this.answered = false;
    this.render();
  },

  render() {
    const q = this.questions[this.currentQuestion];
    const total = this.questions.length;
    const progress = ((this.currentQuestion) / total) * 100;

    const main = document.getElementById('mainContent');
    main.innerHTML = `
      <div class="quiz-container fade-in">
        <div class="quiz-progress">
          <div class="quiz-progress-bar" style="width:${progress}%"></div>
        </div>
        <div style="text-align:center;color:var(--gray-500);font-size:0.85rem;margin-bottom:8px;">
          Soal ${this.currentQuestion + 1} dari ${total}
        </div>

        <div class="quiz-question">
          <h3>${q.q}</h3>
          ${q.opts.map((opt, i) => `
            <button class="quiz-option" data-idx="${i}" onclick="QuizEngine.answer(${i})">
              <b>${String.fromCharCode(65 + i)}.</b> ${opt}
            </button>
          `).join('')}
        </div>

        <div style="text-align:center;margin-top:8px;">
          <span style="color:var(--gray-500);font-size:0.85rem;">Skor sementara: <b>${this.score}</b> / ${this.currentQuestion}</span>
        </div>
      </div>
    `;
    this.answered = false;
  },

  answer(idx) {
    if (this.answered) return;
    this.answered = true;

    const q = this.questions[this.currentQuestion];
    const correct = idx === q.ans;
    if (correct) this.score++;

    // Tandai semua opsi
    const buttons = document.querySelectorAll('.quiz-option');
    buttons.forEach((btn, i) => {
      btn.disabled = true;
      if (i === q.ans) btn.classList.add('correct');
      if (i === idx && !correct) btn.classList.add('wrong');
    });

    // Tunda untuk lanjut
    setTimeout(() => {
      this.currentQuestion++;
      if (this.currentQuestion < this.questions.length) {
        this.render();
      } else {
        this.showResult();
      }
    }, 1200);
  },

  showResult() {
    const total = this.questions.length;
    const pct = Math.round((this.score / total) * 100);
    let cssClass, emoji, msg;

    // Track progress
    if (App.currentGrade && this._chapterId) {
      ProgressTracker.markQuizTaken(App.currentGrade, this._chapterId, this.score, total);
    }

    if (pct >= 90) { cssClass = 'score-great'; emoji = '🌟'; msg = 'Luar Biasa!'; }
    else if (pct >= 70) { cssClass = 'score-good'; emoji = '👍'; msg = 'Bagus Sekali!'; }
    else if (pct >= 50) { cssClass = 'score-ok'; emoji = '📖'; msg = 'Cukup Baik, terus belajar ya!'; }
    else { cssClass = 'score-low'; emoji = '💪'; msg = 'Semangat! Coba lagi dan pelajari materinya.'; }

    const main = document.getElementById('mainContent');
    main.innerHTML = `
      <div class="quiz-container fade-in">
        <div class="quiz-score">
          <div class="score-circle ${cssClass}">${emoji}</div>
          <h2>${msg}</h2>
          <p style="font-size:2rem;font-weight:800;margin:8px 0;">${this.score} / ${total}</p>
          <p style="color:var(--gray-700);">Nilai: <b>${pct}</b></p>
          <div class="flex-center mt-3">
            <button class="btn btn-primary" onclick="QuizEngine.retry()">🔄 Coba Lagi</button>
            <button class="btn btn-secondary" onclick="App.goBack()">📚 Kembali ke Materi</button>
          </div>
        </div>
      </div>
    `;
  },

  retry() {
    this.init(this.questions); // soal sudah diacak di init
  }
};
