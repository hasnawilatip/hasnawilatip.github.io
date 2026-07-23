/* ══════════════════════════════════════════════════════════
   FILL IN THE BLANK ENGINE — Latihan Isian Singkat
   ══════════════════════════════════════════════════════════ */

const FillBlankEngine = {
  currentQuestion: 0,
  score: 0,
  questions: [],
  answered: false,

  init(questions, title) {
    this.currentQuestion = 0;
    this.score = 0;
    this.questions = [...questions].sort(() => Math.random() - 0.5);
    this.answered = false;
    this._title = title || '✍️ Isian Singkat';
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
          <div class="quiz-progress-bar" style="width:${progress}%"></div>
        </div>
        <div style="text-align:center;color:var(--gray-500);font-size:0.85rem;margin-bottom:8px;">
          ✍️ Soal ${this.currentQuestion + 1} dari ${total}
        </div>

        <div class="quiz-question" style="text-align:center;">
          <h3 style="margin-bottom:20px;">${q.q}</h3>
          ${q.hint ? `<p style="color:var(--gray-500);font-size:0.85rem;margin-bottom:12px;">💡 Petunjuk: ${q.hint}</p>` : ''}
          <input type="text" class="fill-input" id="fillAnswer" placeholder="Ketik jawabanmu di sini..."
                 autocomplete="off" onkeydown="if(event.key==='Enter')FillBlankEngine.check()">
          <div style="margin-top:16px;">
            <button class="btn btn-primary" onclick="FillBlankEngine.check()">✅ Periksa</button>
          </div>
          <div id="fillFeedback" style="margin-top:12px;min-height:24px;"></div>
        </div>

        <div style="text-align:center;margin-top:8px;">
          <span style="color:var(--gray-500);font-size:0.85rem;">Skor: <b>${this.score}</b> / ${this.currentQuestion}</span>
        </div>
      </div>
    `;
    this.answered = false;
    setTimeout(() => {
      const inp = document.getElementById('fillAnswer');
      if (inp) inp.focus();
    }, 100);
  },

  check() {
    if (this.answered) return;
    const inp = document.getElementById('fillAnswer');
    const fb = document.getElementById('fillFeedback');
    if (!inp) return;

    const userAnswer = inp.value.trim().toLowerCase();
    if (!userAnswer) {
      fb.innerHTML = '<span style="color:var(--orange);">⚠️ Silakan ketik jawaban terlebih dahulu.</span>';
      return;
    }

    this.answered = true;
    const q = this.questions[this.currentQuestion];
    const correctAnswers = Array.isArray(q.ans) ? q.ans.map(a => a.toLowerCase()) : [q.ans.toLowerCase()];
    const isCorrect = correctAnswers.some(a => userAnswer === a || this._fuzzyMatch(userAnswer, a));

    if (isCorrect) {
      this.score++;
      fb.innerHTML = `<span style="color:var(--green);font-weight:700;">✅ Benar! Jawaban: <b>${q.ans[0] || q.ans}</b></span>`;
    } else {
      fb.innerHTML = `<span style="color:var(--red);">❌ Kurang tepat. Jawaban yang benar: <b>${q.ans[0] || q.ans}</b></span>`;
    }
    inp.disabled = true;

    setTimeout(() => {
      this.currentQuestion++;
      if (this.currentQuestion < this.questions.length) {
        this.render();
      } else {
        this.showResult();
      }
    }, 1800);
  },

  _fuzzyMatch(user, correct) {
    // Allow minor variations (trimmed, case-insensitive already done)
    return user.replace(/\s+/g, ' ') === correct.replace(/\s+/g, ' ');
  },

  showResult() {
    const total = this.questions.length;
    const pct = Math.round((this.score / total) * 100);

    // Track progress
    if (App.currentGrade) {
      ProgressTracker.markFillBlankTaken(App.currentGrade, this.score, total);
    }

    let cssClass, emoji, msg;

    if (pct >= 90) { cssClass = 'score-great'; emoji = '🌟'; msg = 'Luar Biasa!'; }
    else if (pct >= 70) { cssClass = 'score-good'; emoji = '👍'; msg = 'Bagus Sekali!'; }
    else if (pct >= 50) { cssClass = 'score-ok'; emoji = '📖'; msg = 'Cukup Baik, terus belajar!'; }
    else { cssClass = 'score-low'; emoji = '💪'; msg = 'Semangat! Coba lagi ya.'; }

    const main = document.getElementById('mainContent');
    main.innerHTML = `
      <div class="quiz-container fade-in">
        <div class="quiz-score">
          <div class="score-circle ${cssClass}">${emoji}</div>
          <h2>${msg}</h2>
          <p style="font-size:2rem;font-weight:800;margin:8px 0;">${this.score} / ${total}</p>
          <p style="color:var(--gray-700);">Nilai: <b>${pct}</b></p>
          <div class="flex-center mt-3">
            <button class="btn btn-primary" onclick="FillBlankEngine.retry()">🔄 Coba Lagi</button>
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
