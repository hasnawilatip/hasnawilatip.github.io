/* ══════════════════════════════════════════════════════════
   ADMIN DASHBOARD — Kontrol Konten & Manajemen Data
   ══════════════════════════════════════════════════════════ */

const AdminDashboard = {
  OVERRIDE_KEY: 'admin_content_overrides',

  /** Cek apakah user saat ini admin */
  _checkAdmin() {
    const user = Auth.currentUser();
    if (!user || user.role !== 'admin') {
      alert('Akses ditolak. Hanya admin yang bisa mengakses halaman ini.');
      App.showHome();
      return false;
    }
    return true;
  },

  /** Load content overrides — Firestore */
  loadOverrides() {
    try {
      return JSON.parse(localStorage.getItem(this.OVERRIDE_KEY)) || {};
    } catch (e) { return {}; }
  },

  saveOverrides(data) {
    localStorage.setItem(this.OVERRIDE_KEY, JSON.stringify(data));
  },

  /** Sync overrides ke Firestore */
  async syncToFirestore(subjectId, overrides) {
    if (typeof FB === 'undefined') return;
    try {
      await FB.saveContent(subjectId, overrides[subjectId] || {});
      console.log('✅ Konten tersimpan ke Firestore');
    } catch (e) {
      console.warn('⚠️ Gagal sync ke Firestore:', e.message);
    }
  },

  /** Ambil data asli dari global variable */
  _getSubjectData(subjectId) {
    return App._getData(subjectId);
  },

  /** Gabungkan data override dengan default */
  getMergedData(subjectId) {
    const defaults = this._getSubjectData(subjectId);
    const overrides = this.loadOverrides();
    const subjOverride = overrides[subjectId];
    if (!subjOverride) return defaults;
    // Merge sederhana: override per grade
    const merged = JSON.parse(JSON.stringify(defaults));
    for (const gradeKey of ['k7','k8','k9']) {
      if (subjOverride[gradeKey]) {
        merged[gradeKey] = subjOverride[gradeKey];
      }
    }
    return merged;
  },

  /** Tampilkan Dashboard Admin */
  showDashboard() {
    if (!this._checkAdmin()) return;

    const main = document.getElementById('mainContent');
    const overrides = this.loadOverrides();
    const subjCount = Object.keys(overrides).length;
    const users = Auth._getUsers();
    let userCount = Object.keys(users).length;
    // Firebase user count (async update)
    if (typeof FB !== 'undefined') {
      FB.db.ref('users').once('value').then(snap => {
        const fbUsers = snap.val() || {};
        const el = document.getElementById('adminUserCount');
        if (el) el.textContent = Object.keys(fbUsers).length;
      });
    }

    // Build daftar konten per mapel
    let contentOverview = '';
    SUBJECTS.forEach(s => {
      const data = App._getData(s.id);
      let totalChapters = 0, filledChapters = 0;
      ['k7','k8','k9'].forEach(gk => {
        const grade = data[gk];
        if (grade && grade.chapters) {
          grade.chapters.forEach(ch => {
            totalChapters++;
            if ((ch.content && ch.content.length > 100) || (ch.quiz && ch.quiz.length > 0)) filledChapters++;
          });
        }
      });
      const pct = totalChapters > 0 ? Math.round((filledChapters / totalChapters) * 100) : 0;
      const barColor = pct >= 80 ? 'var(--green)' : pct >= 40 ? 'var(--orange)' : 'var(--gray-300)';
      contentOverview += `<div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid var(--gray-200);"><span style="width:24px;">${s.icon}</span><span style="flex:1;font-size:0.85rem;font-weight:600;cursor:pointer;color:var(--blue);" onclick="AdminDashboard.editSubject('${s.id}')">${s.name}</span><span style="font-size:0.75rem;color:var(--gray-500);min-width:50px;">${filledChapters}/${totalChapters}</span><div style="width:80px;background:var(--gray-200);height:6px;border-radius:3px;"><div style="height:100%;width:${pct}%;background:${barColor};border-radius:3px;"></div></div><span style="font-size:0.7rem;color:var(--gray-500);min-width:30px;">${pct}%</span></div>`;
    });

    main.innerHTML = `
      <div class="fade-in" style="max-width:950px;margin:0 auto;">
        <div class="section-header">
          <h2>🛡️ Dashboard Admin</h2>
          <p style="color:var(--gray-700);">Kelola konten, soal, dan data aplikasi</p>
        </div>

        <!-- Statistik Admin -->
        <div class="landing-stats" style="margin-bottom:20px;">
          <div class="landing-stat">
            <span class="landing-stat-num" id="adminUserCount">${userCount}</span>
            <span class="landing-stat-label">User Terdaftar</span>
          </div>
          <div class="landing-stat">
            <span class="landing-stat-num">${subjCount}</span>
            <span class="landing-stat-label">Mapel Diedit</span>
          </div>
          <div class="landing-stat">
            <span class="landing-stat-num">15</span>
            <span class="landing-stat-label">Total Mapel</span>
          </div>
          <div class="landing-stat">
            <span class="landing-stat-num">📦</span>
            <span class="landing-stat-label">Export/Import</span>
          </div>
        </div>

        <!-- Konten Overview -->
        <div style="background:var(--white);border-radius:var(--radius);padding:16px 20px;box-shadow:var(--shadow-sm);margin-bottom:16px;">
          <h4 style="margin-bottom:10px;">📋 Daftar Konten Per Mapel</h4>
          ${contentOverview}
          <div style="font-size:0.7rem;color:var(--gray-500);margin-top:6px;">Klik nama mapel untuk edit · Progress bar: hijau ≥80%, oranye ≥40%</div>
        </div>

        <!-- Menu Admin -->
        <div class="chapter-grid">
          <div class="chapter-card k8" onclick="AdminDashboard.showAIGenerator()">
            <div class="chapter-num">🤖</div>
            <div><div class="chapter-title">AI Generator Konten</div>
            <div class="chapter-meta">Generate materi, soal, flashcard otomatis dengan AI</div></div>
          </div>
          <div class="chapter-card k7" onclick="AdminDashboard.showPerangkatPembelajaran()">
            <div class="chapter-num">📋</div>
            <div><div class="chapter-title">Perangkat Pembelajaran</div>
            <div class="chapter-meta">RPP, Silabus, Bahan Ajar, Evaluasi (AI)</div></div>
          </div>
          <div class="chapter-card k7" onclick="AdminDashboard.showContentEditor()">
            <div class="chapter-num">📝</div>
            <div><div class="chapter-title">Editor Konten</div>
            <div class="chapter-meta">Edit materi, kuis, soal per mapel & kelas</div></div>
          </div>
          <div class="chapter-card k8" onclick="AdminDashboard.showUserManager()">
            <div class="chapter-num">👥</div>
            <div><div class="chapter-title">Manajemen User</div>
            <div class="chapter-meta">Lihat semua user terdaftar di perangkat ini</div></div>
          </div>
          <div class="chapter-card k9" onclick="AdminDashboard.showExportImport()">
            <div class="chapter-num">📦</div>
            <div><div class="chapter-title">Export / Import</div>
            <div class="chapter-meta">Backup & restore data konten (JSON)</div></div>
          </div>
          <div class="chapter-card k7" onclick="AdminDashboard.showGlobalStats()">
            <div class="chapter-num">📊</div>
            <div><div class="chapter-title">Statistik Global</div>
            <div class="chapter-meta">Lihat progres semua user di perangkat ini</div></div>
          </div>
        </div>

        <div class="flex-center mt-3">
          <button class="btn btn-primary" onclick="App.showHome()">📚 Lihat Menu Belajar</button>
          <button class="btn btn-secondary" onclick="Auth.logout();App.showLanding();">🚪 Logout</button>
        </div>
      </div>
    `;
    App.pushState({ view: 'admin' });
  },

  /** Pilih Mapel untuk diedit */
  showContentEditor() {
    if (!this._checkAdmin()) return;

    const main = document.getElementById('mainContent');
    const subjects = SUBJECTS;
    const overrides = this.loadOverrides();

    main.innerHTML = `
      <div class="fade-in" style="max-width:800px;margin:0 auto;">
        <div class="section-header">
          <h2>📝 Editor Konten</h2>
          <p style="color:var(--gray-700);">Pilih mata pelajaran untuk diedit</p>
          <span style="font-size:0.75rem;color:var(--gray-500);">Mapel dengan ⭐ memiliki kustomisasi tersimpan</span>
        </div>

        <div class="chapter-grid">
          ${subjects.map(s => {
            const hasOverride = overrides[s.id] ? ' ⭐' : '';
            return `
            <div class="chapter-card" style="cursor:pointer;border-left-color:${s.color};" onclick="AdminDashboard.editSubject('${s.id}')">
              <div class="chapter-num" style="color:${s.color};">${s.icon}</div>
              <div>
                <div class="chapter-title">${s.name}${hasOverride}</div>
                <div class="chapter-meta">${s.chapters.k7 + s.chapters.k8 + s.chapters.k9} bab total · Klik untuk edit</div>
              </div>
            </div>`;
          }).join('')}
        </div>

        <div class="flex-center mt-2">
          <button class="btn btn-secondary" onclick="AdminDashboard.showDashboard()">🛡️ Kembali ke Dashboard</button>
        </div>
      </div>
    `;
    App.pushState({ view: 'admin-content' });
  },

  /** Edit satu mapel */
  editSubject(subjectId) {
    if (!this._checkAdmin()) return;

    const info = App._getSubjectInfo(subjectId);
    const data = App._getData(subjectId);
    const overrides = this.loadOverrides();
    const currentOverride = overrides[subjectId] || {};

    const main = document.getElementById('mainContent');

    let html = `
      <div class="fade-in" style="max-width:850px;margin:0 auto;">
        <div class="section-header">
          <h2>${info.icon} Edit: ${info.name}</h2>
          <p style="color:var(--gray-700);">Edit konten per kelas & bab</p>
        </div>

        <!-- Action: Reset override mapel ini -->
        <div style="text-align:right;margin-bottom:12px;">
          ${Object.keys(currentOverride).length > 0 ? `
            <button class="btn btn-danger btn-sm" onclick="if(confirm('Reset semua perubahan di mapel ini?')){AdminDashboard._resetSubject('${subjectId}');AdminDashboard.editSubject('${subjectId}');}">🗑️ Reset Semua Perubahan</button>
          ` : ''}
        </div>
    `;

    ['k7','k8','k9'].forEach(gradeKey => {
      const grade = data[gradeKey];
      if (!grade) return;
      const hasGradeOverride = currentOverride[gradeKey];

      html += `
        <h3 style="margin:16px 0 8px;color:${gradeKey === 'k7' ? 'var(--blue)' : gradeKey === 'k8' ? 'var(--green)' : 'var(--purple)'};">
          ${gradeKey === 'k7' ? '📗' : gradeKey === 'k8' ? '📘' : '📙'} ${grade.name} ${hasGradeOverride ? '⭐' : ''}
        </h3>
        <div class="chapter-grid">
      `;

      grade.chapters.forEach(ch => {
        const quizCount = ch.quiz ? ch.quiz.length : 0;
        html += `
          <div class="chapter-card" style="cursor:pointer;border-left-color:${info.color};" onclick="AdminDashboard.editChapter('${subjectId}','${gradeKey}',${ch.id})">
            <div class="chapter-num" style="color:${info.color};">${ch.id}</div>
            <div>
              <div class="chapter-title">${ch.title}</div>
              <div class="chapter-meta">${quizCount} soal kuis · Klik untuk edit soal</div>
            </div>
          </div>`;
      });

      html += `</div>`;
    });

    html += `
        <div class="flex-center mt-3">
          <button class="btn btn-secondary" onclick="AdminDashboard.showContentEditor()">📝 Pilih Mapel Lain</button>
        </div>
      </div>
    `;

    main.innerHTML = html;
    App.pushState({ view: 'admin-edit-subject', subjectId });
  },

  /** Edit quiz per chapter */
  editChapter(subjectId, gradeKey, chapterId) {
    if (!this._checkAdmin()) return;

    const info = App._getSubjectInfo(subjectId);
    const data = App._getData(subjectId);
    const grade = data[gradeKey];
    const ch = grade.chapters.find(c => c.id === chapterId);
    if (!ch) return;

    // Load override quiz jika ada
    const overrides = this.loadOverrides();
    const overrideQuiz = overrides[subjectId]?.[gradeKey]?.chapters?.find(c => c.id === chapterId)?.quiz;
    const quizData = overrideQuiz || ch.quiz || [];

    const main = document.getElementById('mainContent');

    let quizRows = '';
    quizData.forEach((q, idx) => {
      quizRows += `
        <div style="background:var(--white);border-radius:var(--radius-sm);padding:14px;margin-bottom:8px;box-shadow:var(--shadow-sm);border-left:4px solid ${info.color};">
          <div style="display:flex;justify-content:space-between;align-items:start;flex-wrap:wrap;gap:8px;">
            <div style="flex:1;min-width:200px;">
              <b>Soal #${idx + 1}:</b>
              <div id="qText_${idx}" style="margin:6px 0;">${this._esc(q.q)}</div>
              <div style="font-size:0.8rem;color:var(--gray-500);">
                A: ${this._esc(q.opts[0])} | B: ${this._esc(q.opts[1])} | C: ${this._esc(q.opts[2])} | D: ${this._esc(q.opts[3])}
                <br>✅ Jawaban: <b>${'ABCD'[q.ans]}</b>
              </div>
            </div>
            <div style="display:flex;gap:4px;">
              <button class="btn btn-sm btn-secondary" onclick="AdminDashboard._editQuizItem('${subjectId}','${gradeKey}',${chapterId},${idx})">✏️</button>
              <button class="btn btn-sm btn-danger" onclick="if(confirm('Hapus soal ini?')){AdminDashboard._deleteQuizItem('${subjectId}','${gradeKey}',${chapterId},${idx})}">🗑️</button>
            </div>
          </div>
        </div>`;
    });

    main.innerHTML = `
      <div class="fade-in" style="max-width:750px;margin:0 auto;">
        <div class="section-header">
          <h2>📝 Edit Soal: ${ch.title}</h2>
          <p style="color:var(--gray-700);">${info.icon} ${info.name} · ${grade.name} · Bab ${chapterId}</p>
        </div>

        ${quizData.length === 0 ? '<p style="text-align:center;color:var(--gray-500);">Belum ada soal. Tambahkan soal baru.</p>' : quizRows}

        <div class="flex-center mt-2" style="gap:8px;">
          <button class="btn btn-primary btn-sm" onclick="AdminDashboard._addQuizItem('${subjectId}','${gradeKey}',${chapterId})">➕ Tambah Soal</button>
          <button class="btn btn-secondary btn-sm" onclick="AdminDashboard.editSubject('${subjectId}')">📋 Kembali</button>
        </div>
      </div>
    `;
    App.pushState({ view: 'admin-edit-chapter', subjectId, gradeKey, chapterId });
  },

  /** Manajemen User — dari Firebase */
  async showUserManager() {
    if (!this._checkAdmin()) return;

    const main = document.getElementById('mainContent');
    main.innerHTML = `<div class="fade-in" style="max-width:700px;margin:0 auto;"><div class="section-header"><h2>👥 Manajemen User</h2><p style="color:var(--gray-700);">⏳ Memuat data...</p></div></div>`;

    let userList = [];
    try {
      if (typeof FB !== 'undefined') {
        const snap = await FB.db.ref('users').once('value');
        const users = snap.val() || {};
        userList = Object.entries(users).map(([uid, u]) => ({
          email: u.email || uid, displayName: u.displayName, role: u.role, credits: u.credits, createdAt: u.createdAt
        }));
      }
    } catch(e) { userList = []; }

    main.innerHTML = `
      <div class="fade-in" style="max-width:700px;margin:0 auto;">
        <div class="section-header">
          <h2>👥 Manajemen User</h2>
          <p style="color:var(--gray-700);">Total: <b>${userList.length}</b> user terdaftar (Firebase)</p>
        </div>

        ${userList.length === 0 ? '<p style="text-align:center;color:var(--gray-500);">Belum ada user terdaftar.</p>' : `
        <div style="background:var(--white);border-radius:var(--radius);padding:16px;box-shadow:var(--shadow-sm);overflow-x:auto;">
          <table class="simple-table" style="font-size:0.85rem;">
            <thead><tr><th>Email</th><th>Nama</th><th>Role</th><th>Kredit</th><th>Terdaftar</th></tr></thead>
            <tbody>
              ${userList.map(u => `
                <tr>
                  <td><b>${u.email}</b></td>
                  <td>${u.displayName}</td>
                  <td>${u.role === 'admin' ? '🛡️ Admin' : u.role === 'guru' ? '👨‍🏫 Guru' : '🎒 Siswa'}</td>
                  <td>💰 ${u.credits || 0}</td>
                  <td>${u.createdAt ? new Date(u.createdAt).toLocaleDateString('id') : '-'}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>`}

        <div class="flex-center mt-3">
          <button class="btn btn-secondary" onclick="AdminDashboard.showDashboard()">🛡️ Dashboard</button>
        </div>
      </div>
    `;
    App.pushState({ view: 'admin-users' });
  },

  /** Export / Import */
  showExportImport() {
    if (!this._checkAdmin()) return;

    const main = document.getElementById('mainContent');
    main.innerHTML = `
      <div class="fade-in" style="max-width:650px;margin:0 auto;">
        <div class="section-header">
          <h2>📦 Export / Import Data</h2>
          <p style="color:var(--gray-700);">Backup & restore konten kustom</p>
        </div>

        <!-- Export -->
        <div style="background:var(--white);border-radius:var(--radius);padding:20px;box-shadow:var(--shadow-sm);margin-bottom:16px;">
          <h3 style="margin-bottom:8px;">📤 Export Konten</h3>
          <p style="font-size:0.85rem;color:var(--gray-500);margin-bottom:12px;">Download semua perubahan konten sebagai file JSON. Simpan sebagai backup.</p>
          <button class="btn btn-primary" onclick="AdminDashboard._exportData()">📥 Download Backup (JSON)</button>
        </div>

        <!-- Import -->
        <div style="background:var(--white);border-radius:var(--radius);padding:20px;box-shadow:var(--shadow-sm);margin-bottom:16px;">
          <h3 style="margin-bottom:8px;">📥 Import Konten</h3>
          <p style="font-size:0.85rem;color:var(--gray-500);margin-bottom:12px;">Upload file JSON backup untuk mengembalikan perubahan konten.</p>
          <input type="file" id="importFile" accept=".json" style="margin-bottom:8px;">
          <button class="btn btn-secondary" onclick="AdminDashboard._importData()">📤 Upload & Terapkan</button>
          <div id="importMsg" style="margin-top:8px;font-size:0.85rem;"></div>
        </div>

        <!-- Reset All -->
        <div style="background:var(--red-light);border-radius:var(--radius);padding:20px;box-shadow:var(--shadow-sm);border:2px solid var(--red);">
          <h3 style="margin-bottom:8px;color:var(--red);">⚠️ Reset Semua Konten</h3>
          <p style="font-size:0.85rem;color:var(--gray-700);margin-bottom:12px;">Hapus SEMUA perubahan konten. Kembali ke data default bawaan aplikasi.</p>
          <button class="btn btn-danger" onclick="if(confirm('⚠️ YAKIN? Semua konten kustom akan hilang!')){AdminDashboard._resetAll();AdminDashboard.showExportImport();}">🗑️ Reset ke Default</button>
        </div>

        <div class="flex-center mt-3">
          <button class="btn btn-secondary" onclick="AdminDashboard.showDashboard()">🛡️ Dashboard</button>
        </div>
      </div>
    `;
    App.pushState({ view: 'admin-export' });
  },

  /** Statistik Global */
  showGlobalStats() {
    if (!this._checkAdmin()) return;

    const users = Auth._getUsers();
    const userList = Object.entries(users);

    let statsHtml = '';
    userList.forEach(([key, u]) => {
      // Ambil progress user
      try {
        const progressKey = `informatika_progress_${key}`;
        const raw = localStorage.getItem(progressKey);
        const progress = raw ? JSON.parse(raw) : null;
        const chRead = progress ? Object.keys(progress.chaptersRead || {}).length : 0;
        const quizDone = progress ? Object.keys(progress.quizzesTaken || {}).length : 0;
        const points = progress ? progress.totalPoints || 0 : 0;
        statsHtml += `
          <tr>
            <td><b>${key}</b></td>
            <td>${u.displayName}</td>
            <td>${u.role === 'admin' ? '🛡️' : u.role === 'guru' ? '👨‍🏫' : '🎒'}</td>
            <td>${chRead} bab</td>
            <td>${quizDone} kuis</td>
            <td>⭐ ${points}</td>
          </tr>`;
      } catch (e) {
        statsHtml += `<tr><td><b>${key}</b></td><td>${u.displayName}</td><td colspan="4">Data error</td></tr>`;
      }
    });

    const main = document.getElementById('mainContent');
    main.innerHTML = `
      <div class="fade-in" style="max-width:850px;margin:0 auto;">
        <div class="section-header">
          <h2>📊 Statistik Global</h2>
          <p style="color:var(--gray-700);">Progres semua user di perangkat ini</p>
        </div>

        ${userList.length === 0 ? '<p style="text-align:center;color:var(--gray-500);">Belum ada data.</p>' : `
        <div style="background:var(--white);border-radius:var(--radius);padding:16px;box-shadow:var(--shadow-sm);overflow-x:auto;">
          <table class="simple-table" style="font-size:0.82rem;">
            <thead><tr><th>Username</th><th>Nama</th><th>Role</th><th>Bab Dibaca</th><th>Kuis</th><th>Poin</th></tr></thead>
            <tbody>${statsHtml}</tbody>
          </table>
        </div>`}

        <div class="flex-center mt-3">
          <button class="btn btn-secondary" onclick="AdminDashboard.showDashboard()">🛡️ Dashboard</button>
        </div>
      </div>
    `;
    App.pushState({ view: 'admin-stats' });
  },

  // ─── HELPER FUNCTIONS ───

  /** Perangkat Pembelajaran — RPP, Silabus, dll */
  showPerangkatPembelajaran() {
    if (!this._checkAdmin()) return;

    const main = document.getElementById('mainContent');
    main.innerHTML = `
      <div class="fade-in" style="max-width:750px;margin:0 auto;">
        <div class="section-header">
          <h2>📋 Perangkat Pembelajaran</h2>
          <p style="color:var(--gray-700);">Generate RPP, Silabus, Bahan Ajar, dan Evaluasi dengan AI</p>
        </div>

        <h3 style="color:var(--blue);margin:20px 0 12px;">📅 Perencanaan Pembelajaran</h3>
        <div class="chapter-grid">
          <div class="chapter-card k7" onclick="AdminDashboard._genPerangkat('rpp')">
            <div class="chapter-num">📖</div><div><div class="chapter-title">RPP / Modul Ajar</div><div class="chapter-meta">Rencana Pelaksanaan Pembelajaran</div></div>
          </div>
          <div class="chapter-card k8" onclick="AdminDashboard._genPerangkat('silabus')">
            <div class="chapter-num">📋</div><div><div class="chapter-title">Silabus</div><div class="chapter-meta">Garis besar materi pembelajaran</div></div>
          </div>
          <div class="chapter-card k9" onclick="AdminDashboard._genPerangkat('prota')">
            <div class="chapter-num">📅</div><div><div class="chapter-title">Prota & Promes</div><div class="chapter-meta">Program Tahunan & Semester</div></div>
          </div>
        </div>

        <h3 style="color:var(--green);margin:20px 0 12px;">📝 Pelaksanaan & Pendukung</h3>
        <div class="chapter-grid">
          <div class="chapter-card k7" onclick="AdminDashboard._genPerangkat('bahanajar')">
            <div class="chapter-num">📚</div><div><div class="chapter-title">Bahan Ajar</div><div class="chapter-meta">Materi lengkap siap pakai</div></div>
          </div>
          <div class="chapter-card k8" onclick="AdminDashboard._genPerangkat('lkpd')">
            <div class="chapter-num">✍️</div><div><div class="chapter-title">LKPD</div><div class="chapter-meta">Lembar Kerja Peserta Didik</div></div>
          </div>
          <div class="chapter-card k9" onclick="AdminDashboard._genPerangkat('media')">
            <div class="chapter-num">🎯</div><div><div class="chapter-title">Media Pembelajaran</div><div class="chapter-meta">Ide media & alat peraga</div></div>
          </div>
        </div>

        <h3 style="color:var(--purple);margin:20px 0 12px;">📊 Evaluasi & Administrasi</h3>
        <div class="chapter-grid">
          <div class="chapter-card k7" onclick="AdminDashboard._genPerangkat('kisikisi')">
            <div class="chapter-num">🎯</div><div><div class="chapter-title">Kisi-Kisi Soal</div><div class="chapter-meta">Blueprint penilaian</div></div>
          </div>
          <div class="chapter-card k8" onclick="AdminDashboard._genPerangkat('rubrik')">
            <div class="chapter-num">📐</div><div><div class="chapter-title">Rubrik Penilaian</div><div class="chapter-meta">Kriteria penilaian terstandar</div></div>
          </div>
          <div class="chapter-card k9" onclick="AdminDashboard._genPerangkat('remedial')">
            <div class="chapter-num">🔄</div><div><div class="chapter-title">Remedial & Pengayaan</div><div class="chapter-meta">Program perbaikan nilai</div></div>
          </div>
        </div>

        <div class="flex-center mt-3">
          <button class="btn btn-secondary" onclick="AdminDashboard.showDashboard()">🛡️ Dashboard</button>
        </div>
      </div>
    `;
    App.pushState({ view: 'admin-perangkat' });
  },

  /** Generate perangkat via AI */
  _genPerangkat(type) {
    if (!this._checkAdmin()) return;

    const labels = {
      rpp: '📖 RPP / Modul Ajar', silabus: '📋 Silabus', prota: '📅 Prota & Promes',
      bahanajar: '📚 Bahan Ajar', lkpd: '✍️ LKPD', media: '🎯 Media',
      kisikisi: '🎯 Kisi-Kisi', rubrik: '📐 Rubrik', remedial: '🔄 Remedial'
    };

    const subjects = SUBJECTS;
    const main = document.getElementById('mainContent');
    main.innerHTML = `
      <div class="fade-in" style="max-width:600px;margin:0 auto;">
        <div class="section-header"><h2>${labels[type]}</h2><p>AI akan generate otomatis</p></div>
        <div style="background:var(--white);border-radius:var(--radius);padding:24px;box-shadow:var(--shadow-sm);">
          <label class="fill-label">Mata Pelajaran</label>
          <select id="ppMapel" class="fill-input" style="margin-bottom:14px;" onchange="AdminDashboard._ppUpdateChapters()">${subjects.map(s=>`<option value="${s.id}">${s.icon} ${s.name}</option>`).join('')}</select>

          <label class="fill-label">Kelas</label>
          <select id="ppKelas" class="fill-input" style="margin-bottom:14px;" onchange="AdminDashboard._ppUpdateChapters()">
            <option value="k7">Kelas 7</option><option value="k8">Kelas 8</option><option value="k9">Kelas 9</option>
          </select>

          <label class="fill-label">Bab (dari konten mapel)</label>
          <select id="ppBab" class="fill-input" style="margin-bottom:14px;">
            <option value="">-- Semua Bab (per semester) --</option>
          </select>

          <label class="fill-label">Atau Topik Kustom</label>
          <input id="ppTopik" class="fill-input" placeholder="Isi manual jika tidak ada di daftar bab" style="margin-bottom:20px;">

          <button class="btn btn-primary" onclick="AdminDashboard._doGenPerangkat('${type}')" style="width:100%;">🤖 Generate</button>
          <div id="ppResult" style="margin-top:16px;"></div>
        </div>
        <div class="flex-center mt-3"><button class="btn btn-secondary" onclick="AdminDashboard.showPerangkatPembelajaran()">⬅ Kembali</button></div>
      </div>`;
    // Populate bab dropdown
    setTimeout(() => this._ppUpdateChapters(), 100);
    App.pushState({ view: 'admin-perangkat-gen', type });
  },

  /** Populate bab dropdown dari konten mapel */
  _ppUpdateChapters() {
    const subjectId = document.getElementById('ppMapel')?.value;
    const gradeKey = document.getElementById('ppKelas')?.value;
    const select = document.getElementById('ppBab');
    if (!select) return;
    const data = App._getData(subjectId);
    const grade = data?.[gradeKey];
    select.innerHTML = '<option value="">-- Semua Bab (per semester) --</option>';
    if (grade && grade.chapters) {
      grade.chapters.forEach(ch => {
        select.innerHTML += `<option value="${this._escAttr(ch.title)}">Bab ${ch.id}: ${ch.title}</option>`;
      });
    }
  },

  async _doGenPerangkat(type) {
    const subjectId = document.getElementById('ppMapel')?.value;
    const kelasEl = document.getElementById('ppKelas');
    const kelasVal = kelasEl?.value || 'k7';
    const kelas = kelasVal.replace('k','');
    const babSelect = document.getElementById('ppBab')?.value;
    const customTopik = document.getElementById('ppTopik')?.value?.trim();
    const topik = babSelect || customTopik || '';
    const info = App._getSubjectInfo(subjectId);
    const resultEl = document.getElementById('ppResult');
    resultEl.innerHTML = '<p style="color:var(--blue);">🤖 AI sedang generate...</p>';

    const gradeInfo = `kelas ${kelas} SMP/MTs`;
    const topicInfo = topik ? `, topik: ${topik}` : '';
    const t = gradeInfo + topicInfo;

    const prompts = {
      rpp: `Buat RPP/Modul Ajar Kurikulum Merdeka Fase D untuk ${info.name} ${t}. Format lengkap: identitas, capaian pembelajaran, tujuan, langkah pembelajaran, asesmen. HTML.`,
      silabus: `Buat Silabus ${info.name} ${gradeInfo} Kurikulum Merdeka semester 1&2. Format: kompetensi inti, KD, materi pokok, alokasi waktu, sumber. HTML.`,
      prota: `Buat Program Tahunan & Program Semester ${info.name} ${gradeInfo}. Format: tabel dengan kolom semester, bab, alokasi waktu, keterangan. HTML.`,
      bahanajar: `Buat Bahan Ajar lengkap ${info.name} ${t}. Mencakup ringkasan materi, contoh soal, latihan. HTML.`,
      lkpd: `Buat LKPD ${info.name} ${t}. Format: tujuan, petunjuk, langkah kerja, pertanyaan, kesimpulan. HTML.`,
      media: `Beri 5 ide Media Pembelajaran kreatif untuk ${info.name} ${t}. Setiap ide: nama media, bahan, cara pakai. HTML.`,
      kisikisi: `Buat Kisi-Kisi Soal ${info.name} ${t}. Tabel: KD, indikator, level kognitif, bentuk soal, nomor soal. HTML.`,
      rubrik: `Buat Rubrik Penilaian ${info.name} ${t}. Tabel: kriteria, skor 1-4, deskripsi. HTML.`,
      remedial: `Buat Program Remedial & Pengayaan ${info.name} ${t}. Format: analisis, rencana remedial, rencana pengayaan. HTML.`
    };

    try {
      const system = 'Kamu asisten guru profesional Kurikulum Merdeka SMP/MTs. Output HTML langsung.';
      const user = prompts[type] || prompts.rpp;
      const result = await AIAgent._callAPI(system, user);

      // Simpan ke Firebase
      if (typeof FB !== 'undefined') {
        const key = `${subjectId}_${gradeKey}_${type}`;
        await FB.db.ref('perangkat/' + key).set({
          subjectId, gradeKey, type,
          title: labels[type], topic: chapterTitle,
          content: result, createdAt: new Date().toISOString()
        });
      }

      resultEl.innerHTML = `<div style="background:var(--green-light);padding:16px;border-radius:8px;max-height:500px;overflow:auto;font-size:0.85rem;">${result}</div>
        <p style="color:var(--green);margin-top:8px;">✅ Tersimpan! Guru bisa lihat di halaman mapel.</p>
        <button class="btn btn-sm btn-primary mt-2" onclick="AdminDashboard._copyResult()">📋 Copy</button>
        <textarea id="ppCopy" style="display:none;">${this._escAttr(result)}</textarea>`;
    } catch(e) {
      resultEl.innerHTML = `<div class="info-box" style="background:var(--red-light);border-left-color:var(--red);">❌ ${e.message}</div>`;
    }
  },

  _copyResult() {
    const ta = document.getElementById('ppCopy');
    if (ta) { ta.style.display='block'; ta.select(); document.execCommand('copy'); ta.style.display='none'; alert('Disalin!'); }
  },

  /** AI Generator — main page: pilih mapel & kelas */
  showAIGenerator() {
    if (!this._checkAdmin()) return;

    const hasKey = AIAgent.hasKey();
    const activeProv = AIAgent.PROVIDERS[AIAgent.getActiveProvider()];
    const subjects = SUBJECTS;

    const main = document.getElementById('mainContent');
    main.innerHTML = `
      <div class="fade-in" style="max-width:750px;margin:0 auto;">
        <div class="section-header">
          <h2>🤖 AI Generator Konten</h2>
          <p style="color:var(--gray-700);">Generate materi & soal otomatis per bab — pilih mapel, kelas, lalu ceklis bab & tipe konten</p>
        </div>

        ${!hasKey ? `
        <div class="info-box" style="background:var(--orange-light);border-left-color:var(--orange);margin-bottom:16px;">
          <span class="info-title">⚠️ API Key belum diatur!</span>
          <p>Masukkan API Key dulu. <a href="#" onclick="AdminDashboard.showAISettings()" style="color:var(--blue);font-weight:600;">Setting API Key</a></p>
        </div>` : `
        <div class="info-box" style="background:var(--green-light);border-left-color:var(--green);margin-bottom:16px;">
          <span class="info-title">✅ ${activeProv.name} siap</span> · <a href="#" onclick="AdminDashboard.showAISettings()" style="color:var(--blue);">Ganti AI / API Key</a>
        </div>`}

        <div style="background:var(--white);border-radius:var(--radius);padding:24px;box-shadow:var(--shadow-sm);">
          <label style="display:block;font-weight:600;margin-bottom:6px;">📚 Mata Pelajaran</label>
          <select id="aiSubject" class="fill-input" style="text-align:left;margin-bottom:16px;">
            ${subjects.map(s => `<option value="${s.id}">${s.icon} ${s.name}</option>`).join('')}
          </select>

          <label style="display:block;font-weight:600;margin-bottom:6px;">🏫 Kelas</label>
          <div style="display:flex;gap:10px;margin-bottom:20px;">
            <label class="role-label" style="cursor:pointer;">
              <input type="radio" name="aiGradeMain" value="k7" checked style="accent-color:var(--blue);"> 📗 Kelas 7
            </label>
            <label class="role-label" style="cursor:pointer;">
              <input type="radio" name="aiGradeMain" value="k8" style="accent-color:var(--green);"> 📘 Kelas 8
            </label>
            <label class="role-label" style="cursor:pointer;">
              <input type="radio" name="aiGradeMain" value="k9" style="accent-color:var(--purple);"> 📙 Kelas 9
            </label>
          </div>

          <button class="btn btn-primary" onclick="AdminDashboard.showAIBatchGenerate()" style="width:100%;">👉 Pilih Bab & Tipe Konten</button>
        </div>

        <div class="flex-center mt-3">
          <button class="btn btn-secondary btn-sm" onclick="AdminDashboard.showAISettings()">⚙️ AI Settings</button>
          <button class="btn btn-secondary btn-sm" onclick="AdminDashboard.showDashboard()">🛡️ Dashboard</button>
        </div>
      </div>
    `;
    App.pushState({ view: 'admin-ai' });
  },

  /** AI Settings (API Key + Multi-Provider) */
  showAISettings() {
    if (!this._checkAdmin()) return;

    const activeProvider = AIAgent.getActiveProvider();
    const providers = AIAgent.PROVIDERS;
    const currentKey = AIAgent.getApiKey(activeProvider);
    const currentModel = AIAgent.getModel(activeProvider);
    const masked = currentKey ? currentKey.slice(0, 6) + '...' + currentKey.slice(-4) : '';

    const main = document.getElementById('mainContent');

    // Provider tabs
    const providerTabs = Object.entries(providers).map(([id, p]) => {
      const isActive = id === activeProvider;
      const hasKey = !!AIAgent.getApiKey(id);
      return `<button class="btn btn-sm ${isActive ? 'btn-primary' : 'btn-secondary'}"
        onclick="AIAgent.setActiveProvider('${id}');AdminDashboard.showAISettings();"
        style="margin:2px;">${p.icon} ${p.name} ${hasKey ? '✅' : ''}</button>`;
    }).join('');

    // Model options
    const activeProv = providers[activeProvider];
    const modelOptions = (activeProv?.models || []).map(m =>
      `<option value="${m}" ${m === currentModel ? 'selected' : ''}>${m}</option>`
    ).join('');

    main.innerHTML = `
      <div class="fade-in" style="max-width:600px;margin:0 auto;">
        <div class="section-header">
          <h2>⚙️ AI Settings</h2>
          <p style="color:var(--gray-700);">Konfigurasi multi-provider AI & Database</p>
        </div>

        <!-- Database -->
        <div style="background:var(--white);border-radius:var(--radius);padding:20px;box-shadow:var(--shadow-sm);margin-bottom:16px;border-left:5px solid var(--green);">
          <h4 style="margin-bottom:10px;">📊 Google Sheets Database</h4>
          <p style="font-size:0.8rem;color:var(--gray-500);margin-bottom:8px;">
            Masukkan URL Google Apps Script untuk <b>sinkronisasi data antar perangkat</b>.<br>
            Biarkan kosong untuk pakai localStorage (offline, perangkat sendiri).
          </p>
          <input type="text" id="sheetsUrl" class="fill-input" placeholder="https://script.google.com/macros/s/xxx/exec" value="${typeof SheetsDB !== 'undefined' ? SheetsDB.getUrl().replace('YOUR_SCRIPT_ID','') : ''}" style="text-align:left;margin-bottom:8px;">
          <div style="display:flex;gap:8px;align-items:center;">
            <button class="btn btn-sm btn-primary" onclick="AdminDashboard._saveSheetsUrl()">💾 Simpan URL</button>
            <button class="btn btn-sm btn-success" onclick="AdminDashboard._testSheetsConnection()">🔌 Tes Koneksi</button>
            <span id="sheetsMsg" style="font-size:0.8rem;">${typeof SheetsDB !== 'undefined' && SheetsDB.isConfigured() ? '✅ Terhubung' : '⚠️ Pakai localStorage'}</span>
          </div>
          <div id="sheetsTestResult" style="margin-top:8px;font-size:0.8rem;"></div>
        </div>

        <div style="background:var(--white);border-radius:var(--radius);padding:20px;box-shadow:var(--shadow-sm);margin-bottom:16px;">
          <h4 style="margin-bottom:10px;">🔌 Pilih Provider AI</h4>
          <div style="display:flex;flex-wrap:wrap;gap:6px;">${providerTabs}</div>
          <p style="font-size:0.75rem;color:var(--gray-500);margin-top:8px;">
            Aktif: <b>${activeProv.icon} ${activeProv.name}</b>
          </p>
        </div>

        <div style="background:var(--white);border-radius:var(--radius);padding:20px;box-shadow:var(--shadow-sm);margin-bottom:16px;">
          <h4 style="margin-bottom:10px;">🔑 API Key — ${activeProv.icon} ${activeProv.name}</h4>
          <p style="font-size:0.8rem;color:var(--gray-500);margin-bottom:12px;">
            Dapatkan di <a href="${activeProv.getApiLink}" target="_blank" style="color:var(--blue);">${activeProv.getApiLink}</a>
          </p>
          ${currentKey ? `<p style="font-size:0.8rem;color:var(--gray-500);margin-bottom:8px;">Key: <code>${masked}</code></p>` : ''}

          <input type="password" id="apiKeyInput" class="fill-input" placeholder="Masukkan API Key..." value="${currentKey}" style="text-align:left;margin-bottom:12px;">

          <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:12px;">
            <button class="btn btn-primary btn-sm" onclick="AdminDashboard._saveApiKey()">💾 Simpan</button>
            <button class="btn btn-success btn-sm" onclick="AdminDashboard._testApi()">🔌 Tes Koneksi</button>
            ${currentKey ? `<button class="btn btn-danger btn-sm" onclick="if(confirm('Hapus key?')){AIAgent.setApiKey('${activeProvider}','');AdminDashboard.showAISettings();}">🗑️</button>` : ''}
          </div>
          <div id="apiTestResult" style="padding:12px;border-radius:var(--radius-sm);display:none;"></div>
        </div>

        ${modelOptions ? `
        <div style="background:var(--white);border-radius:var(--radius);padding:20px;box-shadow:var(--shadow-sm);margin-bottom:16px;">
          <h4 style="margin-bottom:10px;">🧩 Model</h4>
          <select id="aiModelSelect" class="fill-input" style="text-align:left;margin-bottom:6px;" onchange="AdminDashboard._saveModel()">
            ${modelOptions}
          </select>
          <input type="text" id="aiModelCustom" class="fill-input" placeholder="Atau ketik model kustom (contoh: deepseek-v4-pro)..." value="${currentModel && !activeProv.models.includes(currentModel) ? currentModel : ''}" style="text-align:left;font-size:0.85rem;" onchange="AdminDashboard._saveModel()">
          <span style="font-size:0.7rem;color:var(--gray-500);">Ketik manual jika model belum ada di daftar</span>
        </div>` : ''}

        <div class="flex-center mt-3">
          <button class="btn btn-secondary" onclick="AdminDashboard.showAIGenerator()">🤖 Kembali</button>
        </div>
      </div>
    `;
    App.pushState({ view: 'admin-ai-settings' });
  },

  _saveModel() {
    // Baca dari custom input dulu, fallback ke dropdown
    const custom = document.getElementById('aiModelCustom')?.value?.trim();
    const select = document.getElementById('aiModelSelect')?.value;
    const model = custom || select;
    if (model) AIAgent.setModel(AIAgent.getActiveProvider(), model);
  },

  _saveSheetsUrl() {
    const url = document.getElementById('sheetsUrl')?.value?.trim();
    if (url) {
      SheetsDB.setUrl(url);
      const el = document.getElementById('sheetsMsg');
      if (el) el.textContent = '✅ Terhubung ke Sheets';
    } else {
      localStorage.removeItem('admin_sheets_url');
      const el = document.getElementById('sheetsMsg');
      if (el) el.textContent = '⚠️ Pakai localStorage';
    }
  },

  async _testSheetsConnection() {
    const resultEl = document.getElementById('sheetsTestResult');
    if (!resultEl) return;
    resultEl.innerHTML = '<span style="color:var(--blue);">⏳ Menghubungi Sheets...</span>';

    if (!SheetsDB.isConfigured()) {
      resultEl.innerHTML = '<span style="color:var(--red);">❌ URL Sheets belum diatur.</span>';
      return;
    }

    try {
      const result = await SheetsDB._call('getUsers', {});
      resultEl.innerHTML = `<span style="color:var(--green);">✅ Koneksi berhasil! ${Object.keys(result).length} user di database.</span>`;
    } catch (err) {
      resultEl.innerHTML = `<span style="color:var(--red);">❌ Gagal: ${err.message}</span>`;
    }
  },

  _saveApiKey() {
    const key = document.getElementById('apiKeyInput').value.trim();
    const resultEl = document.getElementById('apiTestResult');
    if (!key) {
      if (resultEl) { resultEl.style.display = 'block'; resultEl.style.background = 'var(--red-light)'; resultEl.innerHTML = '<span style="color:var(--red);">API Key tidak boleh kosong.</span>'; }
      return;
    }
    AIAgent.setApiKey(AIAgent.getActiveProvider(), key);
    if (resultEl) { resultEl.style.display = 'block'; resultEl.style.background = 'var(--green-light)'; resultEl.innerHTML = '<span style="color:var(--green);">✅ API Key disimpan!</span>'; }
    setTimeout(() => this.showAISettings(), 600);
  },

  async _testApi() {
    const resultEl = document.getElementById('apiTestResult');
    resultEl.style.display = 'block';
    resultEl.style.background = 'var(--blue-light)';
    resultEl.innerHTML = '<p style="color:var(--blue);">⏳ Menguji koneksi ke ' + AIAgent.PROVIDERS[AIAgent.getActiveProvider()].name + '...</p>';

    try {
      const reply = await AIAgent.testConnection();
      resultEl.style.background = 'var(--green-light)';
      resultEl.innerHTML = `<b style="color:var(--green);">✅ Koneksi Berhasil!</b><p style="margin-top:4px;font-size:0.85rem;color:var(--gray-700);">${reply}</p>`;
    } catch (err) {
      resultEl.style.background = 'var(--red-light)';
      resultEl.innerHTML = `<b style="color:var(--red);">❌ Koneksi Gagal</b><p style="margin-top:4px;font-size:0.85rem;color:var(--gray-700);">${err.message}</p>`;
    }
  },

  /** Batch Generate — pilih bab & tipe konten, lalu generate semua */
  showAIBatchGenerate() {
    if (!this._checkAdmin()) return;

    const subjectId = document.getElementById('aiSubject')?.value || SUBJECTS[0].id;
    const gradeEl = document.querySelector('input[name="aiGradeMain"]:checked');
    const gradeKey = gradeEl ? gradeEl.value : 'k7';
    const info = App._getSubjectInfo(subjectId);
    const data = App._getData(subjectId);
    const grade = data[gradeKey];
    const gradeLabel = gradeKey === 'k7' ? '7' : gradeKey === 'k8' ? '8' : '9';
    const chapters = grade?.chapters || [];

    const sem1 = chapters.filter(c => c.sem === 1);
    const sem2 = chapters.filter(c => c.sem === 2);

    const main = document.getElementById('mainContent');
    main.innerHTML = `
      <div class="fade-in" style="max-width:750px;margin:0 auto;">
        <div class="section-header">
          <h2>📋 Pilih Bab & Konten</h2>
          <p style="color:var(--gray-700);">${info.icon} ${info.name} · ${grade?.name || 'Kelas ' + gradeLabel}</p>
        </div>

        <!-- Tipe konten -->
        <div style="background:var(--white);border-radius:var(--radius);padding:20px;box-shadow:var(--shadow-sm);margin-bottom:16px;">
          <h4 style="margin-bottom:10px;">📦 Tipe Konten yang akan di-generate:</h4>
          <div style="display:flex;flex-wrap:wrap;gap:8px;">
            <label class="role-label" style="cursor:pointer;">
              <input type="checkbox" class="aiContentType" value="material" checked> 📖 Materi
            </label>
            <label class="role-label" style="cursor:pointer;">
              <input type="checkbox" class="aiContentType" value="quiz" checked> 📝 Kuis PG
            </label>
            <label class="role-label" style="cursor:pointer;">
              <input type="checkbox" class="aiContentType" value="fillblank"> ✍️ Isian
            </label>
            <label class="role-label" style="cursor:pointer;">
              <input type="checkbox" class="aiContentType" value="truefalse"> ✅ B/S
            </label>
            <label class="role-label" style="cursor:pointer;">
              <input type="checkbox" class="aiContentType" value="flashcards"> 🃏 Flashcard
            </label>
          </div>
          <div style="margin-top:10px;font-size:0.75rem;color:var(--gray-500);">
            ⚠️ Generate banyak bab + banyak tipe = proses lebih lama
          </div>
        </div>

        <!-- Bab list -->
        <div style="background:var(--white);border-radius:var(--radius);padding:20px;box-shadow:var(--shadow-sm);margin-bottom:16px;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
            <h4>📚 Pilih Bab</h4>
            <span style="font-size:0.8rem;">
              <a href="#" onclick="AdminDashboard._toggleAllChapters(true)" style="color:var(--blue);">Pilih Semua</a> ·
              <a href="#" onclick="AdminDashboard._toggleAllChapters(false)" style="color:var(--gray-500);">Batal</a>
            </span>
          </div>

          <button class="btn btn-sm btn-primary" onclick="AdminDashboard._fetchCurriculum('${subjectId}','${gradeKey}')" style="margin-bottom:12px;width:100%;">🔍 Cari Data Bab Sesuai Kurikulum Merdeka (AI)</button>
          <div id="curriculumMsg" style="font-size:0.8rem;margin-bottom:8px;"></div>

          <div id="chapterCheckboxArea">
            ${sem1.length > 0 ? `<h5 style="color:var(--blue);margin:12px 0 8px;">📗 Semester 1</h5>` : ''}
            ${sem1.map(ch => this._chapterCheckbox(ch, info)).join('')}

            ${sem2.length > 0 ? `<h5 style="color:var(--green);margin:12px 0 8px;">📘 Semester 2</h5>` : ''}
            ${sem2.map(ch => this._chapterCheckbox(ch, info)).join('')}

            ${chapters.length === 0 ? '<p style="color:var(--gray-500);text-align:center;padding:20px;">Belum ada data bab. Klik tombol <b>🔍 Cari Data Bab</b> di atas untuk mengambil data dari AI.</p>' : ''}
          </div>
        </div>

        <!-- Topik kustom -->
        <div style="background:var(--white);border-radius:var(--radius);padding:20px;box-shadow:var(--shadow-sm);margin-bottom:16px;">
          <h4 style="margin-bottom:8px;">📝 Topik Kustom (tambahan)</h4>
          <textarea id="aiCustomTopics" class="fill-input" placeholder="Tulis topik tambahan, satu per baris. Contoh:&#10;Surah Al-Fatihah dan Tafsirnya&#10;Hukum Bacaan Mad Thabi'i" style="height:80px;text-align:left;margin-bottom:8px;"></textarea>
          <span style="font-size:0.75rem;color:var(--gray-500);">Topik ini akan digenerate sebagai bab tambahan</span>
        </div>

        <button class="btn btn-primary" onclick="AdminDashboard._doBatchGenerate('${subjectId}','${gradeKey}')" style="width:100%;padding:14px;font-size:1rem;">🚀 Generate Semua yang Dicentang</button>
        <div id="aiBatchProgress" style="margin-top:16px;"></div>

        <div class="flex-center mt-3">
          <button class="btn btn-secondary" onclick="AdminDashboard.showAIGenerator()">⬅ Kembali Pilih Mapel</button>
        </div>
      </div>
    `;
    App.pushState({ view: 'admin-ai-batch', subjectId, gradeKey });
  },

  _chapterCheckbox(ch, info) {
    return `
      <label style="display:flex;align-items:center;gap:10px;padding:10px 12px;margin-bottom:4px;background:var(--gray-50);border-radius:var(--radius-sm);cursor:pointer;border-left:4px solid ${info.color};">
        <input type="checkbox" class="aiChapterCb" value="${ch.id}|${this._escAttr(ch.title)}" checked>
        <div style="flex:1;">
          <div style="font-weight:600;font-size:0.9rem;">Bab ${ch.id}: ${ch.title}</div>
          <div style="font-size:0.7rem;color:var(--gray-500);">Semester ${ch.sem}</div>
        </div>
      </label>`;
  },

  _toggleAllChapters(on) {
    document.querySelectorAll('.aiChapterCb').forEach(cb => { cb.checked = on; });
  },

  /** Fetch daftar bab dari AI sesuai Kurikulum Merdeka */
  async _fetchCurriculum(subjectId, gradeKey) {
    const msgEl = document.getElementById('curriculumMsg');
    const areaEl = document.getElementById('chapterCheckboxArea');
    if (!msgEl || !areaEl) return;

    msgEl.innerHTML = '<span style="color:var(--blue);">⏳ AI mencari data kurikulum...</span>';

    const info = App._getSubjectInfo(subjectId);
    const gradeLabel = gradeKey === 'k7' ? '7' : gradeKey === 'k8' ? '8' : '9';

    try {
      const chapters = await AIAgent.searchCurriculum(info.name, gradeLabel);

      if (!chapters || chapters.length === 0) {
        msgEl.innerHTML = '<span style="color:var(--red);">❌ AI tidak menemukan data. Coba lagi atau gunakan topik kustom.</span>';
        return;
      }

      // Render ulang chapter checkboxes
      const sem1 = chapters.filter(c => c.sem === 1);
      const sem2 = chapters.filter(c => c.sem === 2);

      areaEl.innerHTML = `
        ${sem1.length > 0 ? `<h5 style="color:var(--blue);margin:12px 0 8px;">📗 Semester 1</h5>` : ''}
        ${sem1.map(ch => this._chapterCheckbox(ch, info)).join('')}

        ${sem2.length > 0 ? `<h5 style="color:var(--green);margin:12px 0 8px;">📘 Semester 2</h5>` : ''}
        ${sem2.map(ch => this._chapterCheckbox(ch, info)).join('')}
      `;

      msgEl.innerHTML = `<span style="color:var(--green);">✅ Ditemukan ${chapters.length} bab dari Kurikulum Merdeka!</span>`;

      // Simpan ke overrides supaya下次 langsung ada
      const overrides = this.loadOverrides();
      if (!overrides[subjectId]) overrides[subjectId] = {};
      if (!overrides[subjectId][gradeKey]) {
        overrides[subjectId][gradeKey] = JSON.parse(JSON.stringify(App._getData(subjectId)[gradeKey] || {}));
      }
      overrides[subjectId][gradeKey].chapters = chapters;
      this.saveOverrides(overrides);

    } catch (err) {
      msgEl.innerHTML = `<span style="color:var(--red);">❌ Gagal: ${err.message}</span>`;
    }
  },

  /** Proses batch generate */
  async _doBatchGenerate(subjectId, gradeKey) {
    const info = App._getSubjectInfo(subjectId);
    const gradeLabel = gradeKey === 'k7' ? '7' : gradeKey === 'k8' ? '8' : '9';

    // Kumpulkan bab yang dicentang
    const checkedChapters = [];
    document.querySelectorAll('.aiChapterCb:checked').forEach(cb => {
      const [id, title] = cb.value.split('|');
      checkedChapters.push({ id: parseInt(id), title });
    });

    // Kumpulkan tipe konten yang dicentang
    const checkedTypes = [];
    document.querySelectorAll('.aiContentType:checked').forEach(cb => {
      checkedTypes.push(cb.value);
    });

    // Topik kustom
    const customTopicsRaw = document.getElementById('aiCustomTopics')?.value?.trim() || '';
    const customTopics = customTopicsRaw ? customTopicsRaw.split('\n').filter(t => t.trim()) : [];

    const totalTasks = (checkedChapters.length + customTopics.length) * checkedTypes.length;
    if (totalTasks === 0) {
      alert('Centang minimal 1 bab dan 1 tipe konten.');
      return;
    }

    if (!confirm(`Akan generate ${totalTasks} item (${checkedChapters.length + customTopics.length} topik × ${checkedTypes.length} tipe). Lanjutkan?`)) return;

    const progressEl = document.getElementById('aiBatchProgress');
    progressEl.innerHTML = `
      <div style="background:var(--blue-light);border-radius:var(--radius-sm);padding:16px;margin-top:12px;">
        <b>⏳ Sedang generate...</b>
        <div id="batchStatus" style="margin-top:8px;font-size:0.85rem;color:var(--gray-700);">Persiapan...</div>
        <div style="background:var(--gray-200);height:6px;border-radius:3px;margin-top:8px;overflow:hidden;">
          <div id="batchBar" style="height:100%;background:var(--blue);width:0%;transition:width 0.3s;"></div>
        </div>
      </div>
    `;

    let completed = 0;
    const errors = [];
    const generatedContent = {}; // { chapterId: { material, quiz, ... } }

    const updateProgress = (msg) => {
      const pct = Math.round((completed / totalTasks) * 100);
      document.getElementById('batchStatus').textContent = msg;
      document.getElementById('batchBar').style.width = pct + '%';
    };

    const allTopics = [
      ...checkedChapters.map(ch => ({ id: ch.id, title: ch.title, isCustom: false })),
      ...customTopics.map((t, i) => ({ id: 999 + i, title: t, isCustom: true }))
    ];

    for (const topic of allTopics) {
      if (!generatedContent[topic.id]) generatedContent[topic.id] = {};

      for (const type of checkedTypes) {
        const label = type === 'material' ? 'Materi' : type === 'quiz' ? 'Kuis' : type === 'fillblank' ? 'Isian' : type === 'truefalse' ? 'B/S' : 'Flashcard';
        updateProgress(`Bab ${topic.id}: ${topic.title} → ${label}...`);

        try {
          let result;
          switch (type) {
            case 'material':
              result = await AIAgent.generateMaterial(info.name, gradeLabel, topic.title, topic.id);
              generatedContent[topic.id].material = result;
              break;
            case 'quiz':
              result = await AIAgent.generateQuiz(info.name, gradeLabel, topic.title, 5);
              generatedContent[topic.id].quiz = result;
              break;
            case 'fillblank':
              result = await AIAgent.generateFillBlank(info.name, gradeLabel, topic.title, 5);
              generatedContent[topic.id].fillBlank = { questions: result, title: topic.title };
              break;
            case 'truefalse':
              result = await AIAgent.generateTrueFalse(info.name, gradeLabel, topic.title, 10);
              generatedContent[topic.id].trueFalse = { questions: result, title: topic.title };
              break;
            case 'flashcards':
              result = await AIAgent.generateFlashcards(info.name, gradeLabel, topic.title, 8);
              generatedContent[topic.id].flashcards = { cards: result, title: topic.title };
              break;
          }
        } catch (err) {
          errors.push(`${topic.title} (${label}): ${err.message}`);
        }
        completed++;
      }
    }

    updateProgress('✅ Selesai! Menyimpan ke Sheets...');
    await this._saveBatchResults(subjectId, gradeKey, generatedContent, allTopics);

    // Tampilkan hasil
    let resultHtml = `<div style="background:var(--green-light);border-radius:var(--radius-sm);padding:16px;margin-top:12px;">
      <b style="color:var(--green);">✅ ${completed} item berhasil digenerate!</b>`;
    if (errors.length > 0) {
      resultHtml += `<div style="margin-top:8px;color:var(--red);font-size:0.85rem;"><b>⚠️ ${errors.length} error:</b><br>${errors.map(e => '· ' + e).join('<br>')}</div>`;
    }
    resultHtml += `
      <div style="margin-top:12px;display:flex;gap:8px;flex-wrap:wrap;">
        <button class="btn btn-success btn-sm" onclick="alert('Semua konten sudah otomatis tersimpan!');AdminDashboard.showContentEditor();">📝 Lihat di Editor Konten</button>
        <button class="btn btn-secondary btn-sm" onclick="AdminDashboard.showAIBatchGenerate()">🔄 Generate Ulang</button>
      </div>
    </div>`;
    progressEl.innerHTML += resultHtml;
  },

  /** Simpan hasil batch generate ke overrides */
  async _saveBatchResults(subjectId, gradeKey, generatedContent, allTopics) {
    const overrides = this.loadOverrides();
    if (!overrides[subjectId]) overrides[subjectId] = {};
    if (!overrides[subjectId][gradeKey]) {
      overrides[subjectId][gradeKey] = JSON.parse(JSON.stringify(App._getData(subjectId)[gradeKey]));
    }
    if (!overrides[subjectId][gradeKey].chapters) {
      overrides[subjectId][gradeKey].chapters = JSON.parse(JSON.stringify(App._getData(subjectId)[gradeKey].chapters));
    }

    for (const topic of allTopics) {
      const gen = generatedContent[topic.id];
      if (!gen) continue;

      let ch = overrides[subjectId][gradeKey].chapters.find(c => c.id === topic.id);
      if (!ch) {
        ch = {
          id: topic.id,
          title: topic.title,
          sem: topic.id <= 5 ? 1 : 2,
          content: '',
          quiz: []
        };
        overrides[subjectId][gradeKey].chapters.push(ch);
      }

      if (gen.material) ch.content = gen.material;
      if (gen.quiz) ch.quiz = gen.quiz;
      if (gen.fillBlank) {
        if (!overrides[subjectId].fillBlank) overrides[subjectId].fillBlank = {};
        if (!overrides[subjectId].fillBlank[gradeKey]) overrides[subjectId].fillBlank[gradeKey] = gen.fillBlank;
      }
      if (gen.trueFalse) {
        if (!overrides[subjectId].trueFalse) overrides[subjectId].trueFalse = {};
        if (!overrides[subjectId].trueFalse[gradeKey]) overrides[subjectId].trueFalse[gradeKey] = gen.trueFalse;
      }
      if (gen.flashcards) {
        if (!overrides[subjectId].flashcards) overrides[subjectId].flashcards = {};
        if (!overrides[subjectId].flashcards[gradeKey]) overrides[subjectId].flashcards[gradeKey] = gen.flashcards;
      }
    }

    this.saveOverrides(overrides);
    // Sync ke Firestore
    await this.syncToFirestore(subjectId, overrides);
  },
  showAIGenerate(type) {
    if (!this._checkAdmin()) return;

    const subjects = SUBJECTS;
    const typeLabels = {
      material: '📖 Generate Materi',
      quiz: '📝 Generate Soal Kuis',
      fillblank: '✍️ Generate Isian Singkat',
      truefalse: '✅ Generate Benar/Salah',
      flashcards: '🃏 Generate Flashcards'
    };

    const main = document.getElementById('mainContent');
    main.innerHTML = `
      <div class="fade-in" style="max-width:600px;margin:0 auto;">
        <div class="section-header">
          <h2>${typeLabels[type]}</h2>
          <p style="color:var(--gray-700);">Pilih mata pelajaran, kelas, dan topik</p>
        </div>

        <div style="background:var(--white);border-radius:var(--radius);padding:24px;box-shadow:var(--shadow-sm);">
          <label style="display:block;font-weight:600;margin-bottom:4px;font-size:0.85rem;">Mata Pelajaran</label>
          <select id="aiSubject" class="fill-input" style="text-align:left;margin-bottom:14px;cursor:pointer;" onchange="AdminDashboard._onSubjectChange('${type}')">
            ${subjects.map(s => `<option value="${s.id}">${s.icon} ${s.name}</option>`).join('')}
          </select>

          <label style="display:block;font-weight:600;margin-bottom:4px;font-size:0.85rem;">Kelas</label>
          <select id="aiGrade" class="fill-input" style="text-align:left;margin-bottom:14px;cursor:pointer;" onchange="AdminDashboard._onGradeChange('${type}')">
            <option value="k7">📗 Kelas 7</option>
            <option value="k8">📘 Kelas 8</option>
            <option value="k9">📙 Kelas 9</option>
          </select>

          <label style="display:block;font-weight:600;margin-bottom:4px;font-size:0.85rem;">Bab / Topik (dari data)</label>
          <select id="aiChapter" class="fill-input" style="text-align:left;margin-bottom:8px;cursor:pointer;" onchange="AdminDashboard._onChapterChange()">
            <option value="">-- Pilih Bab (jika ada) --</option>
          </select>

          <label style="display:block;font-weight:600;margin-bottom:4px;font-size:0.85rem;">📝 Topik Kustom <span style="font-weight:400;color:var(--gray-500);font-size:0.75rem;">(isi sendiri, lebih akurat!)</span></label>
          <input type="text" id="aiCustomTopic" class="fill-input" placeholder="Contoh: Al-Qur'an Surah Al-Fatihah, Hukum Bacaan Mad, dll." style="text-align:left;margin-bottom:14px;">

          <label style="display:block;font-weight:600;margin-bottom:4px;font-size:0.85rem;">Jumlah Soal</label>
          <input type="number" id="aiCount" class="fill-input" value="5" min="1" max="20" style="text-align:left;margin-bottom:20px;width:100px;">

          <button class="btn btn-primary" onclick="AdminDashboard._doGenerate('${type}')" style="width:100%;">🤖 Generate dengan AI</button>
          <div id="aiProgress" style="text-align:center;margin-top:12px;"></div>
          <div id="aiResult" style="margin-top:16px;"></div>
        </div>

        <div class="flex-center mt-3">
          <button class="btn btn-secondary" onclick="AdminDashboard.showAIGenerator()">🤖 Kembali</button>
        </div>
      </div>
    `;

    // Populate chapters
    this._populateChapters('aiSubject', 'aiGrade', 'aiChapter');
    App.pushState({ view: 'admin-ai-generate', type });
  },

  _onSubjectChange(type) {
    this._populateChapters('aiSubject', 'aiGrade', 'aiChapter');
  },

  _onGradeChange(type) {
    this._populateChapters('aiSubject', 'aiGrade', 'aiChapter');
  },

  _onChapterChange() {
    const chapterVal = document.getElementById('aiChapter')?.value;
    const customInput = document.getElementById('aiCustomTopic');
    if (!customInput) return;
    // Jika user pilih bab dari dropdown, isi otomatis topik kustom
    if (chapterVal && chapterVal.includes('|')) {
      const title = chapterVal.split('|')[1];
      if (title && !title.includes('Materi Semester') && !title.includes('Bab ' + title.match(/Bab (\d+)/)?.[1] + ' —')) {
        customInput.value = title;
      }
    }
  },

  _populateChapters(subjectSelectId, gradeSelectId, chapterSelectId) {
    const subjectId = document.getElementById(subjectSelectId)?.value;
    const gradeKey = document.getElementById(gradeSelectId)?.value;
    const chapterSelect = document.getElementById(chapterSelectId);
    if (!chapterSelect) return;

    const data = App._getData(subjectId);
    const grade = data?.[gradeKey];
    if (!grade || !grade.chapters) {
      chapterSelect.innerHTML = '<option value="">-- Tidak ada bab --</option>';
      return;
    }

    chapterSelect.innerHTML = '<option value="">-- Pilih Bab --</option>' +
      grade.chapters.map(ch => `<option value="${ch.id}|${this._escAttr(ch.title)}">Bab ${ch.id}: ${ch.title}</option>`).join('');
  },

  async _doGenerate(type) {
    const subjectId = document.getElementById('aiSubject').value;
    const gradeKey = document.getElementById('aiGrade').value;
    const chapterVal = document.getElementById('aiChapter').value;
    const customTopic = document.getElementById('aiCustomTopic')?.value?.trim();
    const count = parseInt(document.getElementById('aiCount').value) || 5;

    // Pakai topik kustom jika diisi, jika tidak pakai dari dropdown
    let chapterTitle, chapterId, chapterNum;
    if (customTopic) {
      chapterTitle = customTopic;
      chapterId = chapterVal ? parseInt(chapterVal.split('|')[0]) || 0 : 0;
      chapterNum = chapterId;
    } else if (chapterVal && chapterVal.includes('|')) {
      [chapterId, chapterTitle] = chapterVal.split('|');
      chapterNum = parseInt(chapterId);
    } else {
      alert('Pilih bab dari dropdown atau isi topik kustom.');
      return;
    }

    const info = App._getSubjectInfo(subjectId);
    const gradeLabel = gradeKey === 'k7' ? '7' : gradeKey === 'k8' ? '8' : '9';

    const progressEl = document.getElementById('aiProgress');
    const resultEl = document.getElementById('aiResult');
    progressEl.innerHTML = '<p style="color:var(--blue);">🤖 AI sedang generate... tunggu sebentar...</p>';
    resultEl.innerHTML = '';

    try {
      let output = '';
      switch (type) {
        case 'material': {
          const html = await AIAgent.generateMaterial(info.name, gradeLabel, chapterTitle, chapterNum);
          output = html;
          resultEl.innerHTML = `
            <div style="background:var(--green-light);border-radius:var(--radius-sm);padding:16px;margin-top:12px;">
              <b style="color:var(--green);">✅ Materi berhasil digenerate!</b>
              <div style="max-height:400px;overflow-y:auto;margin-top:8px;padding:12px;background:var(--white);border-radius:var(--radius-sm);font-size:0.9rem;">${html}</div>
              <div style="margin-top:12px;display:flex;gap:8px;">
                <button class="btn btn-success btn-sm" onclick="AdminDashboard._saveGeneratedMaterial('${subjectId}','${gradeKey}',${chapterId})">💾 Simpan Materi</button>
                <button class="btn btn-secondary btn-sm" onclick="AdminDashboard.showAIGenerate('material')">🔄 Generate Ulang</button>
              </div>
              <textarea id="genOutput" style="display:none;">${this._escAttr(html)}</textarea>
            </div>`;
          break;
        }
        case 'quiz': {
          const quiz = await AIAgent.generateQuiz(info.name, gradeLabel, chapterTitle, count);
          output = JSON.stringify(quiz);
          resultEl.innerHTML = `
            <div style="background:var(--green-light);border-radius:var(--radius-sm);padding:16px;margin-top:12px;">
              <b style="color:var(--green);">✅ ${quiz.length} soal kuis berhasil digenerate!</b>
              <div style="max-height:300px;overflow-y:auto;margin-top:8px;">${quiz.map((q,i) => `<p style="margin:4px 0;font-size:0.85rem;"><b>#${i+1}:</b> ${q.q}<br>✅ ${q.opts[q.ans]}</p>`).join('')}</div>
              <div style="margin-top:12px;display:flex;gap:8px;">
                <button class="btn btn-success btn-sm" onclick="AdminDashboard._saveGeneratedQuiz('${subjectId}','${gradeKey}',${chapterId})">💾 Simpan Soal</button>
                <button class="btn btn-secondary btn-sm" onclick="AdminDashboard.showAIGenerate('quiz')">🔄 Generate Ulang</button>
              </div>
              <textarea id="genOutput" style="display:none;">${this._escAttr(output)}</textarea>
            </div>`;
          break;
        }
        default: {
          resultEl.innerHTML = `<p style="color:var(--orange);">Tipe generate ini akan segera hadir.</p>`;
        }
      }
      progressEl.innerHTML = '';
    } catch (err) {
      progressEl.innerHTML = `<div class="info-box" style="background:var(--red-light);border-left-color:var(--red);"><b>❌ Gagal:</b> ${err.message}</div>`;
    }
  },

  _saveGeneratedMaterial(subjectId, gradeKey, chapterId) {
    const html = document.getElementById('genOutput')?.value;
    if (!html) return alert('Tidak ada data untuk disimpan.');

    const overrides = this.loadOverrides();
    if (!overrides[subjectId]) overrides[subjectId] = {};
    if (!overrides[subjectId][gradeKey]) overrides[subjectId][gradeKey] = JSON.parse(JSON.stringify(App._getData(subjectId)[gradeKey]));
    if (!overrides[subjectId][gradeKey].chapters) {
      overrides[subjectId][gradeKey].chapters = JSON.parse(JSON.stringify(App._getData(subjectId)[gradeKey].chapters));
    }
    let ch = overrides[subjectId][gradeKey].chapters.find(c => c.id === chapterId);
    if (!ch) {
      const orig = App._getData(subjectId)[gradeKey].chapters.find(c => c.id === chapterId);
      ch = JSON.parse(JSON.stringify(orig));
      overrides[subjectId][gradeKey].chapters.push(ch);
    }
    ch.content = html;
    this.saveOverrides(overrides);
    alert('✅ Materi berhasil disimpan! Siswa/guru akan melihat materi baru.');
  },

  _saveGeneratedQuiz(subjectId, gradeKey, chapterId) {
    const jsonStr = document.getElementById('genOutput')?.value;
    if (!jsonStr) return alert('Tidak ada data untuk disimpan.');
    let quiz;
    try { quiz = JSON.parse(jsonStr); } catch(e) { return alert('Data tidak valid.'); }

    const overrides = this.loadOverrides();
    if (!overrides[subjectId]) overrides[subjectId] = {};
    if (!overrides[subjectId][gradeKey]) overrides[subjectId][gradeKey] = JSON.parse(JSON.stringify(App._getData(subjectId)[gradeKey]));
    if (!overrides[subjectId][gradeKey].chapters) {
      overrides[subjectId][gradeKey].chapters = JSON.parse(JSON.stringify(App._getData(subjectId)[gradeKey].chapters));
    }
    let ch = overrides[subjectId][gradeKey].chapters.find(c => c.id === chapterId);
    if (!ch) {
      const orig = App._getData(subjectId)[gradeKey].chapters.find(c => c.id === chapterId);
      ch = JSON.parse(JSON.stringify(orig));
      overrides[subjectId][gradeKey].chapters.push(ch);
    }
    ch.quiz = quiz;
    this.saveOverrides(overrides);
    alert(`✅ ${quiz.length} soal berhasil disimpan!`);
  },

  _escAttr(str) {
    return String(str).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  },

  _esc(str) {
    return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  },

  _resetSubject(subjectId) {
    const overrides = this.loadOverrides();
    delete overrides[subjectId];
    this.saveOverrides(overrides);
  },

  _resetAll() {
    localStorage.removeItem(this.OVERRIDE_KEY);
  },

  _exportData() {
    const overrides = this.loadOverrides();
    const users = Auth._getUsers();
    const exportData = { contentOverrides: overrides, users: users, exportedAt: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `backup_mts_${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  },

  _importData() {
    const fileInput = document.getElementById('importFile');
    const msgEl = document.getElementById('importMsg');
    if (!fileInput.files.length) {
      msgEl.innerHTML = '<span style="color:var(--red);">Pilih file JSON terlebih dahulu.</span>';
      return;
    }
    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (data.contentOverrides) {
          this.saveOverrides(data.contentOverrides);
          msgEl.innerHTML = '<span style="color:var(--green);">✅ Konten berhasil diimport! Refresh halaman untuk melihat perubahan.</span>';
        } else {
          msgEl.innerHTML = '<span style="color:var(--red);">Format file tidak valid (tidak ada contentOverrides).</span>';
        }
      } catch (err) {
        msgEl.innerHTML = '<span style="color:var(--red);">Gagal parse JSON: ' + err.message + '</span>';
      }
    };
    reader.readAsText(file);
  },

  /** Tambah soal baru */
  _addQuizItem(subjectId, gradeKey, chapterId) {
    const qText = prompt('Masukkan teks soal:');
    if (!qText) return;
    const optA = prompt('Opsi A:') || '';
    const optB = prompt('Opsi B:') || '';
    const optC = prompt('Opsi C:') || '';
    const optD = prompt('Opsi D:') || '';
    const ans = prompt('Jawaban benar (0=A, 1=B, 2=C, 3=D):', '0');
    const ansIdx = parseInt(ans);
    if (isNaN(ansIdx) || ansIdx < 0 || ansIdx > 3) {
      alert('Jawaban harus 0-3.');
      return;
    }

    const overrides = this.loadOverrides();
    if (!overrides[subjectId]) overrides[subjectId] = {};
    if (!overrides[subjectId][gradeKey]) overrides[subjectId][gradeKey] = JSON.parse(JSON.stringify(App._getData(subjectId)[gradeKey]));
    if (!overrides[subjectId][gradeKey].chapters) {
      overrides[subjectId][gradeKey].chapters = JSON.parse(JSON.stringify(App._getData(subjectId)[gradeKey].chapters));
    }

    let ch = overrides[subjectId][gradeKey].chapters.find(c => c.id === chapterId);
    if (!ch) {
      const orig = App._getData(subjectId)[gradeKey].chapters.find(c => c.id === chapterId);
      ch = JSON.parse(JSON.stringify(orig));
      overrides[subjectId][gradeKey].chapters.push(ch);
    }
    if (!ch.quiz) ch.quiz = [];
    ch.quiz.push({ q: qText, opts: [optA, optB, optC, optD], ans: ansIdx });

    this.saveOverrides(overrides);
    this.editChapter(subjectId, gradeKey, chapterId);
  },

  /** Edit soal */
  _editQuizItem(subjectId, gradeKey, chapterId, idx) {
    const overrides = this.loadOverrides();
    // Cari quiz dari override atau default
    let quiz;
    if (overrides[subjectId]?.[gradeKey]?.chapters) {
      const ch = overrides[subjectId][gradeKey].chapters.find(c => c.id === chapterId);
      if (ch?.quiz) quiz = ch.quiz;
    }
    if (!quiz) {
      const orig = App._getData(subjectId)[gradeKey].chapters.find(c => c.id === chapterId);
      quiz = orig?.quiz || [];
    }

    const q = quiz[idx];
    if (!q) return;

    const newQ = prompt('Edit teks soal:', q.q);
    if (newQ === null) return;
    const newA = prompt('Edit opsi A:', q.opts[0]);
    if (newA === null) return;
    const newB = prompt('Edit opsi B:', q.opts[1]);
    if (newB === null) return;
    const newC = prompt('Edit opsi C:', q.opts[2]);
    if (newC === null) return;
    const newD = prompt('Edit opsi D:', q.opts[3]);
    if (newD === null) return;
    const newAns = prompt('Edit jawaban benar (0=A,1=B,2=C,3=D):', String(q.ans));
    if (newAns === null) return;

    const ansIdx = parseInt(newAns);
    if (isNaN(ansIdx) || ansIdx < 0 || ansIdx > 3) {
      alert('Jawaban harus 0-3.');
      return;
    }

    // Simpan ke override
    if (!overrides[subjectId]) overrides[subjectId] = {};
    if (!overrides[subjectId][gradeKey]) overrides[subjectId][gradeKey] = JSON.parse(JSON.stringify(App._getData(subjectId)[gradeKey]));
    if (!overrides[subjectId][gradeKey].chapters) {
      overrides[subjectId][gradeKey].chapters = JSON.parse(JSON.stringify(App._getData(subjectId)[gradeKey].chapters));
    }
    let ch = overrides[subjectId][gradeKey].chapters.find(c => c.id === chapterId);
    if (!ch) {
      const orig = App._getData(subjectId)[gradeKey].chapters.find(c => c.id === chapterId);
      ch = JSON.parse(JSON.stringify(orig));
      overrides[subjectId][gradeKey].chapters.push(ch);
    }
    if (!ch.quiz) ch.quiz = JSON.parse(JSON.stringify(quiz));
    ch.quiz[idx] = { q: newQ, opts: [newA, newB, newC, newD], ans: ansIdx };

    this.saveOverrides(overrides);
    this.editChapter(subjectId, gradeKey, chapterId);
  },

  /** Hapus soal */
  _deleteQuizItem(subjectId, gradeKey, chapterId, idx) {
    const overrides = this.loadOverrides();
    if (!overrides[subjectId]) overrides[subjectId] = {};
    if (!overrides[subjectId][gradeKey]) overrides[subjectId][gradeKey] = JSON.parse(JSON.stringify(App._getData(subjectId)[gradeKey]));
    if (!overrides[subjectId][gradeKey].chapters) {
      overrides[subjectId][gradeKey].chapters = JSON.parse(JSON.stringify(App._getData(subjectId)[gradeKey].chapters));
    }
    let ch = overrides[subjectId][gradeKey].chapters.find(c => c.id === chapterId);
    if (!ch) {
      const orig = App._getData(subjectId)[gradeKey].chapters.find(c => c.id === chapterId);
      ch = JSON.parse(JSON.stringify(orig));
      overrides[subjectId][gradeKey].chapters.push(ch);
    }
    if (!ch.quiz) {
      const orig = App._getData(subjectId)[gradeKey].chapters.find(c => c.id === chapterId);
      ch.quiz = JSON.parse(JSON.stringify(orig.quiz || []));
    }
    ch.quiz.splice(idx, 1);

    this.saveOverrides(overrides);
    this.editChapter(subjectId, gradeKey, chapterId);
  }
};
