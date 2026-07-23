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
          <div class="chapter-card k8" onclick="AdminDashboard.showAIGenerator()">
            <div class="chapter-num">🤖</div>
            <div><div class="chapter-title">AI Generator Konten</div>
            <div class="chapter-meta">Generate materi, soal, flashcard otomatis dengan AI</div></div>
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

  /** AI Generator Page */
  showAIGenerator() {
    if (!this._checkAdmin()) return;

    const hasKey = AIAgent.hasKey();
    const subjects = SUBJECTS;

    const main = document.getElementById('mainContent');
    main.innerHTML = `
      <div class="fade-in" style="max-width:750px;margin:0 auto;">
        <div class="section-header">
          <h2>🤖 AI Generator Konten</h2>
          <p style="color:var(--gray-700);">Generate materi & soal otomatis dengan DeepSeek AI</p>
        </div>

        ${!hasKey ? `
        <div class="info-box" style="background:var(--orange-light);border-left-color:var(--orange);margin-bottom:16px;">
          <span class="info-title">⚠️ API Key belum diatur!</span>
          <p>Masukkan DeepSeek API Key terlebih dahulu. 
          <a href="#" onclick="AdminDashboard.showAISettings()" style="color:var(--blue);font-weight:600;">Klik di sini untuk Setting API Key</a></p>
        </div>` : `
        <div class="info-box" style="background:var(--green-light);border-left-color:var(--green);margin-bottom:16px;">
          <span class="info-title">✅ API Key siap</span> · 
          <a href="#" onclick="AdminDashboard.showAISettings()" style="color:var(--blue);">Ganti API Key</a>
        </div>`}

        <div class="chapter-grid">
          <div class="chapter-card k7" onclick="AdminDashboard.showAIGenerate('material')">
            <div class="chapter-num">📖</div>
            <div><div class="chapter-title">Generate Materi</div>
            <div class="chapter-meta">Buat materi pembelajaran per bab (HTML)</div></div>
          </div>
          <div class="chapter-card k8" onclick="AdminDashboard.showAIGenerate('quiz')">
            <div class="chapter-num">📝</div>
            <div><div class="chapter-title">Generate Soal Kuis</div>
            <div class="chapter-meta">Soal pilihan ganda + jawaban</div></div>
          </div>
          <div class="chapter-card k9" onclick="AdminDashboard.showAIGenerate('fillblank')">
            <div class="chapter-num">✍️</div>
            <div><div class="chapter-title">Generate Isian Singkat</div>
            <div class="chapter-meta">Soal isian dengan kunci jawaban</div></div>
          </div>
          <div class="chapter-card k7" onclick="AdminDashboard.showAIGenerate('truefalse')">
            <div class="chapter-num">✅</div>
            <div><div class="chapter-title">Generate Benar/Salah</div>
            <div class="chapter-meta">Pernyataan benar & salah</div></div>
          </div>
          <div class="chapter-card k8" onclick="AdminDashboard.showAIGenerate('flashcards')">
            <div class="chapter-num">🃏</div>
            <div><div class="chapter-title">Generate Flashcards</div>
            <div class="chapter-meta">Kartu istilah & definisi</div></div>
          </div>
        </div>

        <div class="flex-center mt-3">
          <button class="btn btn-secondary" onclick="AdminDashboard.showDashboard()">🛡️ Dashboard</button>
        </div>
      </div>
    `;
    App.pushState({ view: 'admin-ai' });
  },

  /** AI Settings (API Key) */
  showAISettings() {
    if (!this._checkAdmin()) return;

    const currentKey = AIAgent.getApiKey();
    const masked = currentKey ? currentKey.slice(0, 6) + '...' + currentKey.slice(-4) : '';

    const main = document.getElementById('mainContent');
    main.innerHTML = `
      <div class="fade-in" style="max-width:550px;margin:0 auto;">
        <div class="section-header">
          <h2>⚙️ AI Settings</h2>
          <p style="color:var(--gray-700);">Konfigurasi DeepSeek API Key</p>
        </div>

        <div style="background:var(--white);border-radius:var(--radius);padding:24px;box-shadow:var(--shadow-sm);">
          <p style="font-size:0.85rem;color:var(--gray-700);margin-bottom:12px;">
            Dapatkan API Key dari <a href="https://platform.deepseek.com/api_keys" target="_blank" style="color:var(--blue);">platform.deepseek.com</a>
          </p>

          ${currentKey ? `<p style="font-size:0.8rem;color:var(--gray-500);margin-bottom:8px;">Key saat ini: <code>${masked}</code></p>` : ''}

          <label style="display:block;font-weight:600;margin-bottom:4px;font-size:0.85rem;">DeepSeek API Key</label>
          <input type="password" id="apiKeyInput" class="fill-input" placeholder="sk-..." value="${currentKey}" style="text-align:left;margin-bottom:16px;">
          <div style="display:flex;gap:8px;">
            <button class="btn btn-primary" onclick="AdminDashboard._saveApiKey()">💾 Simpan</button>
            <button class="btn btn-success btn-sm" onclick="AdminDashboard._testApi()">🔌 Tes Koneksi</button>
            ${currentKey ? `<button class="btn btn-danger btn-sm" onclick="if(confirm('Hapus API Key?')){AIAgent.setApiKey('');AdminDashboard.showAISettings();}">🗑️ Hapus</button>` : ''}
          </div>
          <div id="apiTestResult" style="margin-top:12px;padding:12px;border-radius:var(--radius-sm);display:none;"></div>
          <p id="apiKeyMsg" style="margin-top:8px;font-size:0.8rem;"></p>
        </div>

        <div class="flex-center mt-3">
          <button class="btn btn-secondary" onclick="AdminDashboard.showAIGenerator()">🤖 Kembali</button>
        </div>
      </div>
    `;
    App.pushState({ view: 'admin-ai-settings' });
  },

  async _testApi() {
    const resultEl = document.getElementById('apiTestResult');
    resultEl.style.display = 'block';
    resultEl.style.background = 'var(--blue-light)';
    resultEl.innerHTML = '<p style="color:var(--blue);">⏳ Menguji koneksi ke DeepSeek API...</p>';

    try {
      const reply = await AIAgent.testConnection();
      resultEl.style.background = 'var(--green-light)';
      resultEl.innerHTML = `
        <b style="color:var(--green);">✅ Koneksi Berhasil!</b>
        <p style="margin-top:4px;font-size:0.85rem;color:var(--gray-700);">Balasan AI: "${reply}"</p>
      `;
    } catch (err) {
      resultEl.style.background = 'var(--red-light)';
      resultEl.innerHTML = `
        <b style="color:var(--red);">❌ Koneksi Gagal</b>
        <p style="margin-top:4px;font-size:0.85rem;color:var(--gray-700);">${err.message}</p>
        <p style="font-size:0.75rem;color:var(--gray-500);">Pastikan API Key benar dan internet tersedia.</p>
      `;
    }
  },
    const key = document.getElementById('apiKeyInput').value.trim();
    if (!key) {
      document.getElementById('apiKeyMsg').innerHTML = '<span style="color:var(--red);">API Key tidak boleh kosong.</span>';
      return;
    }
    if (!key.startsWith('sk-')) {
      document.getElementById('apiKeyMsg').innerHTML = '<span style="color:var(--orange);">⚠️ Key biasanya diawali "sk-". Tetap simpan?</span><br><button class="btn btn-sm btn-primary" onclick="AIAgent.setApiKey(document.getElementById(\'apiKeyInput\').value.trim());AdminDashboard.showAIGenerator();">Ya, Simpan</button>';
      return;
    }
    AIAgent.setApiKey(key);
    document.getElementById('apiKeyMsg').innerHTML = '<span style="color:var(--green);">✅ API Key disimpan!</span>';
    setTimeout(() => this.showAIGenerator(), 800);
  },

  /** Form Generate Konten */
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

          <label style="display:block;font-weight:600;margin-bottom:4px;font-size:0.85rem;">Bab / Topik</label>
          <select id="aiChapter" class="fill-input" style="text-align:left;margin-bottom:14px;cursor:pointer;">
            <option value="">-- Pilih Bab --</option>
          </select>

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
    const count = parseInt(document.getElementById('aiCount').value) || 5;

    if (!chapterVal) {
      alert('Pilih bab terlebih dahulu.');
      return;
    }

    const [chapterId, chapterTitle] = chapterVal.split('|');
    const info = App._getSubjectInfo(subjectId);
    const gradeLabel = gradeKey === 'k7' ? '7' : gradeKey === 'k8' ? '8' : '9';
    const chapterNum = parseInt(chapterId);

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
