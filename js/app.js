/* ══════════════════════════════════════════════════════════
   APP CONTROLLER — Navigasi Multi-Mapel MTs
   Alur: Home → Pilih Mapel → Pilih Kelas → Bab → Materi/Latihan
   ══════════════════════════════════════════════════════════ */

const App = {
  history: [],
  currentSubject: null,
  currentGrade: null,

  init() {
    this.history = [];
    this.showHome();
    document.getElementById('btnBack').addEventListener('click', () => this.goBack());
    document.getElementById('btnHome').addEventListener('click', () => this.showHome());
    DarkMode.init();
  },

  // ─── HELPER ───
  _getData(subjectId) {
    return getSubjectData(subjectId) || INFORMATIKA_DATA;
  },

  _getSubjectInfo(subjectId) {
    return getSubjectInfo(subjectId) || SUBJECTS.find(s => s.id === 'informatika');
  },

  // ─── NAVIGASI ───
  pushState(state) {
    this.history.push(state);
    const btnBack = document.getElementById('btnBack');
    const btnHome = document.getElementById('btnHome');
    btnBack.style.display = 'inline-block';
    btnHome.style.display = 'inline-block';
    if (state.view === 'home') {
      btnBack.style.display = 'none';
      btnHome.style.display = 'none';
    }
    if (state.subjectId) this.currentSubject = state.subjectId;
    if (state.grade) this.currentGrade = state.grade;
  },

  goBack() {
    if (this.history.length <= 1) { this.showHome(); return; }
    this.history.pop();
    const prev = this.history[this.history.length - 1];
    if (!prev) { this.showHome(); return; }

    this.currentSubject = prev.subjectId || null;
    this.currentGrade = prev.grade || null;

    switch (prev.view) {
      case 'home': this.showHome(); break;
      case 'subject': this.showSubject(prev.subjectId); break;
      case 'grade': this.showChapters(prev.subjectId, prev.grade); break;
      case 'chapter': this.showChapter(prev.subjectId, prev.grade, prev.chapterId); break;
      case 'simulation': SimulationEngine.showMenu(); this.pushState({ view:'simulation', subjectId:prev.subjectId, grade:prev.grade, chapterId:prev.chapterId }); break;
      case 'dragdrop': this.startDragDrop(prev.subjectId, prev.grade); break;
      case 'fillblank': this.startFillBlank(prev.subjectId, prev.grade); break;
      case 'truefalse': this.startTrueFalse(prev.subjectId, prev.grade); break;
      case 'flashcards': this.startFlashcards(prev.subjectId, prev.grade); break;
      case 'codepuzzle': CodePuzzleEngine.init(APP_DATA.codePuzzle||INFORMATIKA_DATA.codePuzzle,'🧩 Susun Kode'); this.pushState({ view:'codepuzzle' }); break;
      case 'crossword': CrosswordEngine.init(APP_DATA.crossword||INFORMATIKA_DATA.crossword,(APP_DATA.crossword||INFORMATIKA_DATA.crossword).title); this.pushState({ view:'crossword' }); break;
      case 'encryption': EncryptionSim.init(); this.pushState({ view:'encryption' }); break;
      case 'networksim': NetworkSim.init(); this.pushState({ view:'networksim' }); break;
      case 'searchalgo': SearchAlgoSim.init(); this.pushState({ view:'searchalgo' }); break;
      case 'flowchart': FlowchartBuilder.init(); this.pushState({ view:'flowchart' }); break;
      case 'glossary': GlossaryEngine.init(); this.pushState({ view:'glossary' }); break;
      case 'progress': ProgressTracker.showDashboard(); this.pushState({ view:'progress' }); break;
      case 'about': this.showAbout(); break;
      case 'allfeatures': this.showAllFeatures(); break;
      case 'quickpick': this.showAllFeatures(); break;
      case 'launchpick': this.showAllFeatures(); break;
      case 'sim-binary': SimulationEngine.binaryConverter(); this.pushState({ view:'sim-binary' }); break;
      case 'sim-logic': SimulationEngine.logicGate(); this.pushState({ view:'sim-logic' }); break;
      case 'sim-sort': SimulationEngine.sortingVisualizer(); this.pushState({ view:'sim-sort' }); break;
      default: this.showHome();
    }
  },

  // ─── HOME — Pilih Mata Pelajaran ───
  showHome() {
    this.currentSubject = null;
    this.currentGrade = null;
    const main = document.getElementById('mainContent');

    const paiSubjects = SUBJECTS.filter(s => s.group === 'PAI');
    const umumSubjects = SUBJECTS.filter(s => s.group === 'Umum');

    const renderSubjectCards = (subjects) => subjects.map(s => `
      <div class="grade-card subject-card" style="border-color:${s.color};" onclick="App.showSubject('${s.id}')">
        <div class="grade-icon">${s.icon}</div>
        <div class="grade-number" style="font-size:1rem;color:${s.color};">${s.name}</div>
        <div class="grade-desc">${s.desc}</div>
      </div>
    `).join('');

    main.innerHTML = `
      <div class="home-container fade-in">
        <h2 class="home-title">📚 Media Pembelajaran Interaktif</h2>
        <p class="home-subtitle">Madrasah Tsanawiyah (MTs) — Kurikulum Merdeka Fase D</p>

        <h3 style="color:var(--green);margin:20px 0 12px;text-align:center;">🕌 Pendidikan Agama Islam</h3>
        <div class="grade-cards">${renderSubjectCards(paiSubjects)}</div>

        <h3 style="color:var(--blue);margin:20px 0 12px;text-align:center;">📖 Mata Pelajaran Umum</h3>
        <div class="grade-cards">${renderSubjectCards(umumSubjects)}</div>

        <div style="text-align:center;margin-top:20px;display:flex;gap:10px;flex-wrap:wrap;justify-content:center;">
          <button class="btn btn-primary btn-sm" onclick="App.showAllFeatures()">📋 Semua Fitur Interaktif</button>
          <button class="btn btn-secondary btn-sm" onclick="GlossaryEngine.init();App.pushState({view:'glossary'})">📋 Glosarium Multi-Mapel</button>
          <button class="btn btn-success btn-sm" onclick="ProgressTracker.showDashboard();App.pushState({view:'progress'})">📊 Progressku</button>
          <button class="btn btn-secondary btn-sm" onclick="App.showAbout()">ℹ️ Tentang</button>
        </div>
      </div>
    `;

    this.history = [];
    this.pushState({ view: 'home' });
  },

  // ─── SUBJECT — Pilih Kelas ───
  showSubject(subjectId) {
    this.currentSubject = subjectId;
    const info = this._getSubjectInfo(subjectId);
    const data = this._getData(subjectId);

    const grades = [
      { key: 'k7', label: 'Kelas 7', icon: '📗', desc: 'Semester 1 & 2', cls: 'card-k7' },
      { key: 'k8', label: 'Kelas 8', icon: '📘', desc: 'Semester 1 & 2', cls: 'card-k8' },
      { key: 'k9', label: 'Kelas 9', icon: '📙', desc: 'Semester 1 & 2', cls: 'card-k9' }
    ];

    const main = document.getElementById('mainContent');
    main.innerHTML = `
      <div class="fade-in">
        <div class="section-header">
          <h2>${info.icon} ${info.name}</h2>
          <p style="color:var(--gray-700);max-width:600px;margin:0 auto;">${info.desc}</p>
        </div>

        <div class="grade-cards">
          ${grades.map(g => {
            const gData = data[g.key];
            const chCount = gData ? gData.chapters.length : '?';
            return `
            <div class="grade-card ${g.cls}" style="cursor:pointer;" onclick="App.showChapters('${subjectId}','${g.key}')">
              <div class="grade-icon">${g.icon}</div>
              <div class="grade-number">${g.label}</div>
              <span class="grade-badge">${chCount} Bab</span>
              <p class="grade-desc">${gData ? gData.desc : 'Konten akan segera hadir.'}</p>
            </div>`;
          }).join('')}
        </div>

        ${subjectId === 'informatika' ? `
        <div style="text-align:center;margin-top:12px;">
          <button class="btn btn-primary btn-sm" onclick="SimulationEngine.showMenu();App.pushState({view:'simulation',subjectId:'${subjectId}'})">🧪 Simulasi</button>
          <button class="btn btn-secondary btn-sm" onclick="CodePuzzleEngine.init(INFORMATIKA_DATA.codePuzzle,'🧩 Susun Kode');App.pushState({view:'codepuzzle'})">🧩 Puzzle Kode</button>
          <button class="btn btn-secondary btn-sm" onclick="CrosswordEngine.init(INFORMATIKA_DATA.crossword,INFORMATIKA_DATA.crossword.title);App.pushState({view:'crossword'})">🔤 TTS</button>
        </div>` : ''}

        <div class="flex-center mt-2">
          <button class="btn btn-secondary" onclick="App.goBack()">📚 Kembali</button>
        </div>
      </div>
    `;
    this.pushState({ view: 'subject', subjectId: subjectId });
  },

  // ─── CHAPTER LIST ───
  showChapters(subjectId, gradeKey) {
    this.currentSubject = subjectId;
    this.currentGrade = gradeKey;
    const data = this._getData(subjectId);
    const grade = data[gradeKey];
    if (!grade) { alert('Konten belum tersedia untuk kelas ini.'); this.goBack(); return; }

    const chapters = grade.chapters;
    const sem1 = chapters.filter(c => c.sem === 1);
    const sem2 = chapters.filter(c => c.sem === 2);
    const info = this._getSubjectInfo(subjectId);

    const main = document.getElementById('mainContent');
    let html = `
      <div class="fade-in">
        <div class="section-header">
          <h2>${grade.icon || info.icon} ${grade.name}</h2>
          <p style="color:var(--gray-700);max-width:600px;margin:0 auto 12px;">${grade.desc}</p>
        </div>

        <!-- Action buttons -->
        <div class="flex-center mb-2">
          ${subjectId === 'informatika' ? `<button class="btn btn-primary" onclick="SimulationEngine.showMenu()">🧪 Simulasi</button>` : ''}
          <button class="btn btn-secondary" onclick="App.startDragDrop('${subjectId}','${gradeKey}')">🧩 Drag & Drop</button>
          <button class="btn btn-secondary" onclick="App.startFillBlank('${subjectId}','${gradeKey}')">✍️ Isian</button>
          <button class="btn btn-secondary" onclick="App.startTrueFalse('${subjectId}','${gradeKey}')">✅ B/S</button>
          <button class="btn btn-secondary" onclick="App.startFlashcards('${subjectId}','${gradeKey}')">🃏 Flashcard</button>
        </div>

        <!-- Semester 1 -->
        <h3 style="text-align:center;margin:20px 0 12px;">
          <span class="semester-badge" style="background:${info.colorLight};color:${info.color};">📗 Semester 1</span>
        </h3>
        <div class="chapter-grid">
          ${sem1.map(ch => this._chapterCard(ch, subjectId, gradeKey)).join('')}
        </div>

        <!-- Semester 2 -->
        <h3 style="text-align:center;margin:20px 0 12px;">
          <span class="semester-badge" style="background:${info.colorLight};color:${info.color};">📘 Semester 2</span>
        </h3>
        <div class="chapter-grid">
          ${sem2.map(ch => this._chapterCard(ch, subjectId, gradeKey)).join('')}
        </div>
      </div>
    `;
    main.innerHTML = html;
    this.pushState({ view: 'grade', subjectId: subjectId, grade: gradeKey });
  },

  _chapterCard(ch, subjectId, gradeKey) {
    const subj = this._getSubjectInfo(subjectId);
    const colors = { k7: 'var(--blue)', k8: 'var(--green)', k9: 'var(--purple)' };
    const cls = gradeKey === 'k7' ? 'k7' : gradeKey === 'k8' ? 'k8' : 'k9';
    const icon = ch.sem === 1 ? '📗' : '📘';
    return `
      <div class="chapter-card ${cls}" onclick="App.showChapter('${subjectId}','${gradeKey}',${ch.id})" style="border-left-color:${subj.color};">
        <div class="chapter-num" style="color:${subj.color};">${icon}<br>${ch.id}</div>
        <div>
          <div class="chapter-title">${ch.title}</div>
          <div class="chapter-meta">Semester ${ch.sem} · Kuis tersedia</div>
        </div>
      </div>
    `;
  },

  // ─── CHAPTER CONTENT VIEW ───
  showChapter(subjectId, gradeKey, chapterId) {
    this.currentSubject = subjectId;
    this.currentGrade = gradeKey;
    const data = this._getData(subjectId);
    const grade = data[gradeKey];
    const ch = grade.chapters.find(c => c.id === chapterId);
    if (!ch) return;

    // Track progress
    ProgressTracker.markChapterRead(gradeKey, chapterId);

    const main = document.getElementById('mainContent');
    main.innerHTML = `
      <div class="fade-in">
        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:12px;">
          <div class="content-tabs">
            <button class="content-tab active" onclick="App._switchTab('content','${subjectId}','${gradeKey}',${chapterId})">📖 Materi</button>
            <button class="content-tab" onclick="App._switchTab('quiz','${subjectId}','${gradeKey}',${chapterId})">📝 Kuis</button>
          </div>
          <div style="display:flex;gap:6px;flex-wrap:wrap;">
            ${subjectId === 'informatika' ? `<button class="btn btn-sm btn-secondary" onclick="SimulationEngine.showMenu();App.pushState({view:'simulation',subjectId:'${subjectId}',grade:'${gradeKey}',chapterId:${chapterId}})">🧪 Simulasi</button>` : ''}
            <button class="btn btn-sm btn-secondary" onclick="App.startDragDrop('${subjectId}','${gradeKey}')">🧩 Drag & Drop</button>
            <button class="btn btn-sm btn-secondary" onclick="App.startFillBlank('${subjectId}','${gradeKey}')">✍️ Isian</button>
            <button class="btn btn-sm btn-secondary" onclick="App.startTrueFalse('${subjectId}','${gradeKey}')">✅ B/S</button>
            <button class="btn btn-sm btn-secondary" onclick="App.startFlashcards('${subjectId}','${gradeKey}')">🃏 Flashcard</button>
          </div>
        </div>
        <div class="content-view" id="chapterContentView">
          ${ch.content}
        </div>
      </div>
    `;
    this.pushState({ view: 'chapter', subjectId: subjectId, grade: gradeKey, chapterId: chapterId });
  },

  _switchTab(tab, subjectId, gradeKey, chapterId) {
    const data = this._getData(subjectId);
    const grade = data[gradeKey];
    const ch = grade.chapters.find(c => c.id === chapterId);
    if (!ch) return;

    document.querySelectorAll('.content-tab').forEach(t => t.classList.remove('active'));
    const tabs = document.querySelectorAll('.content-tab');
    if (tab === 'content') tabs[0].classList.add('active');
    else tabs[1].classList.add('active');

    const view = document.getElementById('chapterContentView');
    if (tab === 'content') {
      view.innerHTML = ch.content;
    } else {
      view.innerHTML = '';
      QuizEngine._chapterId = chapterId;
      QuizEngine.init(ch.quiz);
    }
  },

  // ─── EXERCISE STARTERS ───
  startDragDrop(subjectId, gradeKey) {
    const data = this._getData(subjectId);
    const ddData = data.dragDrop ? data.dragDrop[gradeKey] : null;
    if (!ddData || ddData.length === 0) {
      alert('Aktivitas drag & drop belum tersedia untuk kelas ini.');
      return;
    }
    const activity = ddData[0];
    DragDropEngine._lastPairs = activity.pairs;
    DragDropEngine._lastTitle = activity.title;
    DragDropEngine.init(activity.pairs, activity.title);
    this.pushState({ view: 'dragdrop', subjectId: subjectId, grade: gradeKey });
  },

  startFillBlank(subjectId, gradeKey) {
    const data = this._getData(subjectId);
    const fb = data.fillBlank ? data.fillBlank[gradeKey] : null;
    if (!fb) { alert('Isian singkat belum tersedia.'); return; }
    FillBlankEngine.init(fb.questions, fb.title);
    this.pushState({ view: 'fillblank', subjectId: subjectId, grade: gradeKey });
  },

  startTrueFalse(subjectId, gradeKey) {
    const data = this._getData(subjectId);
    const tf = data.trueFalse ? data.trueFalse[gradeKey] : null;
    if (!tf) { alert('Benar/Salah belum tersedia.'); return; }
    TrueFalseEngine.init(tf.questions, tf.title);
    this.pushState({ view: 'truefalse', subjectId: subjectId, grade: gradeKey });
  },

  startFlashcards(subjectId, gradeKey) {
    const data = this._getData(subjectId);
    const fc = data.flashcards ? data.flashcards[gradeKey] : null;
    if (!fc) { alert('Flashcards belum tersedia.'); return; }
    FlashcardEngine.init(fc.cards, fc.title);
    this.pushState({ view: 'flashcards', subjectId: subjectId, grade: gradeKey });
  },

  // ─── QUICK PICKER — Pilih mapel untuk langsung latihan ───
  quickPickAndLaunch(exerciseType) {
    const main = document.getElementById('mainContent');
    const umumSubjects = SUBJECTS.filter(s => s.group === 'Umum' && ['informatika','matematika','ipa','ips','bahasa-indonesia','bahasa-inggris'].includes(s.id));
    const paiSubjects = SUBJECTS.filter(s => s.group === 'PAI');

    const renderPicker = (subjects, groupLabel) => `
      <h4 style="margin-top:16px;color:var(--gray-700);">${groupLabel}</h4>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:8px;margin-top:8px;">
        ${subjects.map(s => `
          <div class="grade-card subject-card" style="padding:12px;border-color:${s.color};cursor:pointer;" 
               onclick="App._launchExercise('${s.id}','${exerciseType}')">
            <span>${s.icon}</span> <b style="color:${s.color};">${s.name}</b>
            <div style="font-size:0.7rem;color:var(--gray-500);">Klik → pilih kelas</div>
          </div>
        `).join('')}
      </div>
    `;

    const exerciseLabels = {
      fillblank: '✍️ Isian Singkat',
      truefalse: '✅ Benar / Salah',
      flashcards: '🃏 Flashcards',
      dragdrop: '🧩 Drag & Drop',
      quiz: '📝 Kuis Pilihan Ganda'
    };

    main.innerHTML = `
      <div class="fade-in" style="max-width:700px;margin:0 auto;">
        <h3 style="text-align:center;margin-bottom:8px;">${exerciseLabels[exerciseType] || 'Latihan'}</h3>
        <p style="text-align:center;color:var(--gray-500);margin-bottom:16px;">
          Pilih mata pelajaran untuk memulai latihan:
        </p>
        ${renderPicker(umumSubjects, '📖 Umum')}
        ${renderPicker(paiSubjects, '🕌 PAI')}
        <div class="flex-center mt-3">
          <button class="btn btn-secondary" onclick="App.goBack()">📚 Kembali</button>
        </div>
      </div>
    `;
    this.pushState({ view: 'quickpick', exerciseType });
  },

  // ─── Launch exercise after subject picked ───
  _launchExercise(subjectId, exerciseType) {
    const data = this._getData(subjectId);
    // Show compact grade picker
    const info = this._getSubjectInfo(subjectId);
    const main = document.getElementById('mainContent');

    const grades = [
      { key: 'k7', label: 'Kelas 7', icon: '📗', cls: 'card-k7' },
      { key: 'k8', label: 'Kelas 8', icon: '📘', cls: 'card-k8' },
      { key: 'k9', label: 'Kelas 9', icon: '📙', cls: 'card-k9' }
    ];

    const exerciseLabels = {
      fillblank: '✍️ Isian Singkat',
      truefalse: '✅ Benar / Salah',
      flashcards: '🃏 Flashcards',
      dragdrop: '🧩 Drag & Drop',
      quiz: '📝 Kuis Pilihan Ganda'
    };

    main.innerHTML = `
      <div class="fade-in" style="max-width:600px;margin:0 auto;">
        <div class="section-header">
          <h3>${info.icon} ${info.name}</h3>
          <p style="color:var(--gray-700);">${exerciseLabels[exerciseType] || 'Latihan'} — pilih kelas:</p>
        </div>
        <div class="grade-cards">
          ${grades.map(g => {
            const gData = data[g.key];
            const hasData = gData && (
              (exerciseType === 'fillblank' && data.fillBlank && data.fillBlank[g.key]) ||
              (exerciseType === 'truefalse' && data.trueFalse && data.trueFalse[g.key]) ||
              (exerciseType === 'flashcards' && data.flashcards && data.flashcards[g.key]) ||
              (exerciseType === 'dragdrop' && data.dragDrop && data.dragDrop[g.key]) ||
              (exerciseType === 'quiz')
            );
            return `
            <div class="grade-card ${g.cls}" style="cursor:pointer;" onclick="App._doExercise('${subjectId}','${g.key}','${exerciseType}')">
              <div class="grade-icon">${g.icon}</div>
              <div class="grade-number" style="font-size:1.2rem;">${g.label}</div>
              <span class="grade-badge" style="background:${hasData ? info.colorLight : '#f0f0f0'};color:${hasData ? info.color : '#999'};">${hasData ? '✅ Tersedia' : 'Segera'}</span>
              <p class="grade-desc">${gData ? gData.desc : 'Konten akan segera hadir.'}</p>
            </div>`;
          }).join('')}
        </div>
        <div class="flex-center mt-2">
          <button class="btn btn-secondary" onclick="App.goBack()">📚 Kembali</button>
        </div>
      </div>
    `;
    this.pushState({ view: 'launchpick', subjectId, exerciseType });
  },

  // ─── Execute exercise ───
  _doExercise(subjectId, gradeKey, exerciseType) {
    this.currentSubject = subjectId;
    this.currentGrade = gradeKey;
    switch (exerciseType) {
      case 'fillblank': this.startFillBlank(subjectId, gradeKey); break;
      case 'truefalse': this.startTrueFalse(subjectId, gradeKey); break;
      case 'flashcards': this.startFlashcards(subjectId, gradeKey); break;
      case 'dragdrop': this.startDragDrop(subjectId, gradeKey); break;
      case 'quiz':
        // Go to first chapter quiz
        this.showChapters(subjectId, gradeKey);
        break;
    }
  },

  // ─── TENTANG / CREDITS ───
  showAbout() {
    const main = document.getElementById('mainContent');
    main.innerHTML = `
      <div class="fade-in" style="max-width:650px;margin:0 auto;">
        <div class="section-header">
          <h2>ℹ️ Tentang Aplikasi</h2>
          <p style="color:var(--gray-700);max-width:500px;margin:0 auto;">Media Pembelajaran Interaktif untuk Madrasah Tsanawiyah</p>
        </div>

        <div style="background:var(--card-bg);border-radius:12px;padding:24px;margin-top:20px;box-shadow:var(--shadow-sm);text-align:center;">
          <div style="font-size:3rem;margin-bottom:12px;">🖥️</div>
          <h3 style="margin-bottom:8px;">Media Interaktif MTs</h3>
          <p style="color:var(--gray-700);margin-bottom:20px;">
            Platform belajar interaktif untuk siswa Madrasah Tsanawiyah (MTs)<br>
            dengan 15 mata pelajaran sesuai Kurikulum Merdeka Fase D.<br>
            Dilengkapi kuis, simulasi, puzzle, flashcards, dan berbagai latihan interaktif.
          </p>

          <hr style="border-color:var(--gray-200);margin:20px 0;">

          <h4 style="color:var(--blue);margin-bottom:16px;">👨‍💻 Pembuat</h4>
          <div style="display:inline-block;background:var(--gray-50);border-radius:12px;padding:20px 30px;text-align:center;">
            <div style="font-size:2.5rem;margin-bottom:8px;">👤</div>
            <div style="font-size:1.4rem;font-weight:700;color:var(--text-primary);">Hasnawi Latip</div>
            <div style="color:var(--gray-500);margin-top:4px;">Pengembang & Perancang Aplikasi</div>
          </div>

          <hr style="border-color:var(--gray-200);margin:20px 0;">

          <div style="color:var(--gray-500);font-size:0.85rem;">
            <p>📚 15 Mata Pelajaran MTs</p>
            <p>📝 Kuis · Isian · Benar/Salah · Flashcards · Drag & Drop</p>
            <p>🔬 Simulasi: Biner · Gerbang Logika · Sorting · Jaringan · Enkripsi</p>
            <p>🛠️ Tools: Flowchart Builder · TTS · Puzzle Kode · Glosarium</p>
            <p style="margin-top:12px;"><strong>Kurikulum Merdeka — Fase D</strong></p>
            <p>© 2026 — Hak Cipta Dilindungi</p>
          </div>
        </div>

        <div class="flex-center mt-3">
          <button class="btn btn-secondary" onclick="App.goBack()">📚 Kembali</button>
        </div>
      </div>
    `;
    this.pushState({ view: 'about' });
  },

  // ─── SHOW ALL FEATURES ───
  showAllFeatures() {
    const main = document.getElementById('mainContent');
    main.innerHTML = `
      <div class="fade-in" style="max-width:800px;margin:0 auto;">
        <h2 style="text-align:center;margin-bottom:20px;">📋 Semua Fitur Interaktif</h2>

        <h3 style="color:var(--blue);margin-bottom:12px;">📝 Latihan (tersedia untuk semua mapel)</h3>
        <div class="chapter-grid">
          <div class="chapter-card k7" onclick="App.quickPickAndLaunch('quiz')">
            <div class="chapter-num">📝</div><div><div class="chapter-title">Kuis Pilihan Ganda</div><div class="chapter-meta">Per bab — acak soal, skor otomatis</div></div>
          </div>
          <div class="chapter-card k8" onclick="App.quickPickAndLaunch('fillblank')">
            <div class="chapter-num">✍️</div><div><div class="chapter-title">Isian Singkat</div><div class="chapter-meta">Ketik jawaban, fuzzy matching</div></div>
          </div>
          <div class="chapter-card k9" onclick="App.quickPickAndLaunch('truefalse')">
            <div class="chapter-num">✅</div><div><div class="chapter-title">Benar / Salah</div><div class="chapter-meta">Streak counter, cek pemahaman</div></div>
          </div>
          <div class="chapter-card k7" onclick="App.quickPickAndLaunch('flashcards')">
            <div class="chapter-num">🃏</div><div><div class="chapter-title">Flashcards</div><div class="chapter-meta">Kartu belajar bolak-balik</div></div>
          </div>
          <div class="chapter-card k8" onclick="App.quickPickAndLaunch('dragdrop')">
            <div class="chapter-num">🧩</div><div><div class="chapter-title">Drag & Drop</div><div class="chapter-meta">Menjodohkan istilah & definisi</div></div>
          </div>
          <div class="chapter-card k9" onclick="CodePuzzleEngine.init(INFORMATIKA_DATA.codePuzzle,'🧩 Susun Kode');App.pushState({view:'codepuzzle'})">
            <div class="chapter-num">🧩</div><div><div class="chapter-title">Susun Kode</div><div class="chapter-meta">Puzzle urutan logika & algoritma</div></div>
          </div>
          <div class="chapter-card k7" onclick="CrosswordEngine.init(INFORMATIKA_DATA.crossword,INFORMATIKA_DATA.crossword.title);App.pushState({view:'crossword'})">
            <div class="chapter-num">🔤</div><div><div class="chapter-title">Teka-Teki Silang</div><div class="chapter-meta">TTS istilah informatika</div></div>
          </div>
        </div>

        <h3 style="color:var(--green);margin:20px 0 12px;">🔬 Simulasi Interaktif</h3>
        <div class="chapter-grid">
          <div class="chapter-card k7" onclick="SimulationEngine.binaryConverter();App.pushState({view:'sim-binary'})">
            <div class="chapter-num">🔢</div><div><div class="chapter-title">Konversi Biner</div><div class="chapter-meta">Desimal ↔ Biner langkah demi langkah</div></div>
          </div>
          <div class="chapter-card k8" onclick="SimulationEngine.logicGate();App.pushState({view:'sim-logic'})">
            <div class="chapter-num">⚡</div><div><div class="chapter-title">Gerbang Logika</div><div class="chapter-meta">AND, OR, NOT, NAND, NOR, XOR</div></div>
          </div>
          <div class="chapter-card k9" onclick="SimulationEngine.sortingVisualizer();App.pushState({view:'sim-sort'})">
            <div class="chapter-num">📊</div><div><div class="chapter-title">Visualisasi Sorting</div><div class="chapter-meta">Animasi Bubble Sort</div></div>
          </div>
          <div class="chapter-card k9" onclick="SearchAlgoSim.init();App.pushState({view:'searchalgo'})">
            <div class="chapter-num">🔍</div><div><div class="chapter-title">Algoritma Pencarian</div><div class="chapter-meta">Linear vs Binary Search visual</div></div>
          </div>
          <div class="chapter-card k8" onclick="EncryptionSim.init();App.pushState({view:'encryption'})">
            <div class="chapter-num">🔐</div><div><div class="chapter-title">Caesar Cipher</div><div class="chapter-meta">Simulasi enkripsi & dekripsi</div></div>
          </div>
          <div class="chapter-card k7" onclick="NetworkSim.init();App.pushState({view:'networksim'})">
            <div class="chapter-num">🌐</div><div><div class="chapter-title">Simulasi Jaringan</div><div class="chapter-meta">Client-Server & paket data</div></div>
          </div>
        </div>

        <h3 style="color:var(--purple);margin:20px 0 12px;">🛠️ Tools</h3>
        <div class="chapter-grid">
          <div class="chapter-card k9" onclick="FlowchartBuilder.init();App.pushState({view:'flowchart'})">
            <div class="chapter-num">🧮</div><div><div class="chapter-title">Flowchart Builder</div><div class="chapter-meta">Drag & drop simbol flowchart</div></div>
          </div>
          <div class="chapter-card k7" onclick="GlossaryEngine.init();App.pushState({view:'glossary'})">
            <div class="chapter-num">📋</div><div><div class="chapter-title">Glosarium Multi-Mapel</div><div class="chapter-meta">Kamus istilah semua mapel + pencarian</div></div>
          </div>
          <div class="chapter-card k8" onclick="ProgressTracker.showDashboard();App.pushState({view:'progress'})">
            <div class="chapter-num">📊</div><div><div class="chapter-title">Progress Tracker</div><div class="chapter-meta">Lacak belajar + badge</div></div>
          </div>
        </div>

        <div class="flex-center mt-3">
          <button class="btn btn-secondary" onclick="App.goBack()">📚 Kembali</button>
        </div>
      </div>
    `;
    this.pushState({ view: 'allfeatures' });
  }
};

// ─── STARTUP ───
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
