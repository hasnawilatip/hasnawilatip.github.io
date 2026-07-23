/* ══════════════════════════════════════════════════════════
   TRUE/FALSE ENGINE — Latihan Benar / Salah
   ══════════════════════════════════════════════════════════ */

const TrueFalseEngine = {
  currentQuestion: 0,
  score: 0,
  questions: [],
  answered: false,
  streak: 0,
  bestStreak: 0,

  init(questions, title) {
    this.currentQuestion = 0;
    this.score = 0;
    this.questions = [...questions].sort(() => Math.random() - 0.5);
    this.answered = false;
    this.streak = 0;
    this.bestStreak = 0;
    this._title = title || '✅❌ Benar atau Salah';
    this.render();
  },

  render() {
    const q = this.questions[this.currentQuestion];
    const total = this.questions.length;
    const progress = (this.currentQuestion / total) * 100;

    const main = document.getElementById('mainContent');
    main.innerHTML = `
      <div class="quiz-container fade-in">
        <div class="quiz-progress">
          <div class="quiz-progress-bar tf-bar" style="width:${progress}%"></div>
        </div>
        <div style="text-align:center;color:var(--gray-500);font-size:0.85rem;margin-bottom:8px;">
          ✅❌ Soal ${this.currentQuestion + 1} dari ${total}
        </div>

        <div class="quiz-question" style="text-align:center;">
          <div class="tf-statement">${q.q}</div>
          <div style="display:flex;gap:16px;justify-content:center;margin-top:20px;">
            <button class="btn-tf btn-tf-true" onclick="TrueFalseEngine.answer(true)" id="btnTrue">
              ✅ BENAR
            </button>
            <button class="btn-tf btn-tf-false" onclick="TrueFalseEngine.answer(false)" id="btnFalse">
              ❌ SALAH
            </button>
          </div>
          <div id="tfFeedback" style="margin-top:16px;min-height:24px;"></div>
        </div>

        <div style="text-align:center;margin-top:8px;color:var(--gray-500);font-size:0.85rem;">
          Skor: <b>${this.score}</b> / ${this.currentQuestion} | Streak: 🔥 ${this.streak}
        </div>
      </div>
    `;
    this.answered = false;
  },

  answer(userAnswer) {
    if (this.answered) return;
    this.answered = true;

    const q = this.questions[this.currentQuestion];
    const correct = userAnswer === q.ans;
    const fb = document.getElementById('tfFeedback');
    const btnTrue = document.getElementById('btnTrue');
    const btnFalse = document.getElementById('btnFalse');

    if (correct) {
      this.score++;
      this.streak++;
      if (this.streak > this.bestStreak) this.bestStreak = this.streak;
      fb.innerHTML = `<span style="color:var(--green);font-weight:700;">✅ Benar! ${q.explanation || ''}</span>`;
    } else {
      this.streak = 0;
      fb.innerHTML = `<span style="color:var(--red);">❌ Salah! ${q.explanation || ''}</span>`;
    }

    // Highlight correct answer
    if (q.ans) {
      btnTrue.classList.add('tf-correct');
      btnFalse.classList.add('tf-dimmed');
    } else {
      btnFalse.classList.add('tf-correct');
      btnTrue.classList.add('tf-dimmed');
    }
    btnTrue.disabled = true;
    btnFalse.disabled = true;

    setTimeout(() => {
      this.currentQuestion++;
      if (this.currentQuestion < this.questions.length) {
        this.render();
      } else {
        this.showResult();
      }
    }, 1800);
  },

  showResult() {
    const total = this.questions.length;
    const pct = Math.round((this.score / total) * 100);

    // Track progress
    if (App.currentGrade) {
      ProgressTracker.markTrueFalseTaken(App.currentGrade, this.score, total);
    }

    let cssClass, emoji, msg;

    if (pct >= 90) { cssClass = 'score-great'; emoji = '🌟'; msg = 'Luar Biasa!'; }
    else if (pct >= 70) { cssClass = 'score-good'; emoji = '👍'; msg = 'Bagus Sekali!'; }
    else if (pct >= 50) { cssClass = 'score-ok'; emoji = '📖'; msg = 'Cukup Baik!'; }
    else { cssClass = 'score-low'; emoji = '💪'; msg = 'Semangat, coba lagi!'; }

    const main = document.getElementById('mainContent');
    main.innerHTML = `
      <div class="quiz-container fade-in">
        <div class="quiz-score">
          <div class="score-circle ${cssClass}">${emoji}</div>
          <h2>${msg}</h2>
          <p style="font-size:2rem;font-weight:800;margin:8px 0;">${this.score} / ${total}</p>
          <p style="color:var(--gray-700);">Nilai: <b>${pct}</b></p>
          <p style="color:var(--gray-500);font-size:0.9rem;">🔥 Streak terbaik: ${this.bestStreak}</p>
          <div class="flex-center mt-3">
            <button class="btn btn-primary" onclick="TrueFalseEngine.retry()">🔄 Coba Lagi</button>
            <button class="btn btn-secondary" onclick="App.goBack()">📚 Kembali</button>
          </div>
        </div>
      </div>
    `;
  },

  retry() {
    this.init([...this.questions.map(q => ({...q}))], this._title);
  }
};
