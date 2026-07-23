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

  /** Load content overrides dari localStorage */
  loadOverrides() {
    try {
      return JSON.parse(localStorage.getItem(this.OVERRIDE_KEY)) || {};
    } catch (e) {
      return {};
    }
  },

  /** Simpan content overrides */
  saveOverrides(data) {
    localStorage.setItem(this.OVERRIDE_KEY, JSON.stringify(data));
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
    const userCount = Object.keys(users).length;

    main.innerHTML = `
      <div class="fade-in" style="max-width:950px;margin:0 auto;">
        <div class="section-header">
          <h2>🛡️ Dashboard Admin</h2>
          <p style="color:var(--gray-700);">Kelola konten, soal, dan data aplikasi</p>
        </div>

        <!-- Statistik Admin -->
        <div class="landing-stats" style="margin-bottom:20px;">
          <div class="landing-stat">
            <span class="landing-stat-num">${userCount}</span>
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

        <!-- Menu Admin -->
        <div class="chapter-grid">
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
          <button class="btn btn-secondary" onclick="App.goBack()">📚 Kembali</button>
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

  /** Manajemen User */
  showUserManager() {
    if (!this._checkAdmin()) return;

    const users = Auth._getUsers();
    const userList = Object.entries(users);

    const main = document.getElementById('mainContent');
    main.innerHTML = `
      <div class="fade-in" style="max-width:700px;margin:0 auto;">
        <div class="section-header">
          <h2>👥 Manajemen User</h2>
          <p style="color:var(--gray-700);">Total: <b>${userList.length}</b> user terdaftar di perangkat ini</p>
        </div>

        ${userList.length === 0 ? '<p style="text-align:center;color:var(--gray-500);">Belum ada user terdaftar.</p>' : `
        <div style="background:var(--white);border-radius:var(--radius);padding:16px;box-shadow:var(--shadow-sm);">
          <table class="simple-table" style="font-size:0.85rem;">
            <thead><tr><th>Username</th><th>Nama</th><th>Role</th><th>Terdaftar</th></tr></thead>
            <tbody>
              ${userList.map(([key, u]) => `
                <tr>
                  <td><b>${key}</b></td>
                  <td>${u.displayName}</td>
                  <td>${u.role === 'admin' ? '🛡️ Admin' : u.role === 'guru' ? '👨‍🏫 Guru' : '🎒 Siswa'}</td>
                  <td>${new Date(u.createdAt).toLocaleDateString('id')}</td>
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
