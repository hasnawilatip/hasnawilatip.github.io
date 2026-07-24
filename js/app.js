/* ══════════════════════════════════════════════════════════
   APP CONTROLLER — Navigasi Multi-Mapel SMP/MTs
   Alur: Home → Pilih Mapel → Pilih Kelas → Bab → Materi/Latihan
   ══════════════════════════════════════════════════════════ */

const App = {
  history: [],
  currentSubject: null,
  currentGrade: null,

  init() {
    this.history = [];
    this._loadFirebaseOverrides(); // Preload konten dari Firebase
    document.getElementById('btnBack').addEventListener('click', () => this.goBack());
    document.getElementById('btnHome').addEventListener('click', () => this._goHome());
    document.getElementById('btnLogout').addEventListener('click', () => this._doLogout());
    DarkMode.init();

    // Cek storage — jika rusak, tampilkan peringatan
    const storageCheck = Auth.testStorage();
    if (!storageCheck.ok) {
      document.getElementById('mainContent').innerHTML = `
        <div class="fade-in" style="max-width:500px;margin:40px auto;text-align:center;">
          <div style="font-size:3rem;">⚠️</div>
          <h2>Storage Tidak Tersedia</h2>
          <p style="color:var(--gray-700);margin:12px 0;">Browser Anda tidak mengizinkan penyimpanan data (localStorage/sessionStorage).</p>
          <p style="font-size:0.85rem;color:var(--gray-500);">Penyebab umum:</p>
          <ul style="text-align:left;display:inline-block;font-size:0.85rem;color:var(--gray-700);">
            <li>Mode private/incognito di beberapa browser</li>
            <li>Membuka file HTML langsung (file://) — solusi: gunakan <b>Live Server</b> atau <b>GitHub Pages</b></li>
            <li>Storage browser penuh</li>
          </ul>
          <p style="margin-top:12px;font-size:0.8rem;color:var(--gray-500);">Error: ${storageCheck.error}</p>
        </div>
      `;
      return;
    }

    // Tunggu Firebase Auth siap, lalu tentukan halaman
    if (typeof FB !== 'undefined' && FB.auth) {
      let authResolved = false;
      FB.auth.onAuthStateChanged(async (fbUser) => {
        if (authResolved) return;
        authResolved = true;
        if (fbUser) {
          const snap = await FB.db.ref('users/' + fbUser.uid).once('value');
          const data = snap.val() || {};
          sessionStorage.setItem('app_current_user', JSON.stringify({
            email: fbUser.email, uid: fbUser.uid,
            displayName: data.displayName || fbUser.displayName,
            role: data.role || 'siswa', credits: data.credits || 0,
            unlocked: data.unlocked || [], loginAt: new Date().toISOString()
          }));
          this._updateHeader();
          if (data.role === 'admin') {
            if (typeof AIAgent !== 'undefined') await AIAgent._loadFromFirebase();
            AdminDashboard.showDashboard();
          } else {
            this.showHome();
          }
        } else {
          this.showLanding();
        }
      });
      // Fallback: if auth doesn't resolve within 3s, show landing anyway
      setTimeout(() => {
        if (!authResolved) { authResolved = true; this.showLanding(); }
      }, 3000);
      return;
    }

    // Fallback localStorage
    if (Auth.isLoggedIn()) {
      this._updateHeader();
      const user = Auth.currentUser();
      if (user && user.role === 'admin') {
        AdminDashboard.showDashboard();
      } else {
        this.showHome();
      }
    } else {
      this.showLanding();
    }
  },

  /** Auth guard — redirect ke login jika belum login */
  _requireAuth() {
    if (!Auth.isLoggedIn()) {
      this.showLogin();
      return false;
    }
    this._updateHeader();
    return true;
  },

  /** Halaman Pembuka — Buananet-style Dark Theme */
  showLanding() {
    const loggedIn = Auth.isLoggedIn();
    const user = Auth.currentUser();
    const subjects = SUBJECTS || [];

    // Separate PAI and Umum — gunakan group dari SUBJECTS
    const paiCards = subjects.filter(s => s.group === 'PAI').map(s => `
      <div class="bn-card" onclick="App.showSubject('${s.id}')">
        <div class="bn-card-icon">${s.icon||'📖'}</div>
        <div class="bn-card-info"><div class="bn-card-name">${s.name}</div><div class="bn-card-desc">${s.desc||''}</div></div>
        <span class="bn-card-badge">K7–K9</span>
      </div>`).join('');
    const umumCards = subjects.filter(s => s.group !== 'PAI').map(s => `
      <div class="bn-card" onclick="App.showSubject('${s.id}')">
        <div class="bn-card-icon">${s.icon||'📖'}</div>
        <div class="bn-card-info"><div class="bn-card-name">${s.name}</div><div class="bn-card-desc">${s.desc||''}</div></div>
        <span class="bn-card-badge">K7–K9</span>
      </div>`).join('');

    const main = document.getElementById('mainContent');
    main.innerHTML = `
      <!-- Hero -->
      <div class="bn-hero">
        <h1>Platform Belajar Interaktif Lengkap<br>untuk <strong>SMP/MTs Kurikulum Merdeka</strong></h1>
        <p class="bn-hero-sub">Materi, kuis, simulasi, dan perangkat pembelajaran — semua mapel dalam satu tempat. Gratis.</p>
        ${loggedIn ? `
          <p style="color:#3fb950;font-weight:600;margin-bottom:12px;">✅ Login sebagai <strong>${user.displayName}</strong> (${user.role==='guru'?'👨‍🏫 Guru':user.role==='admin'?'🛡️ Admin':'🎒 Siswa'})</p>
          <div class="bn-hero-btns">
            <button class="bn-btn-fill" onclick="${user.role==='admin'?'AdminDashboard.showDashboard()':'App.showHome()'}">📚 ${user.role==='admin'?'Dashboard Admin':'Lanjutkan Belajar'}</button>
            <button class="bn-btn-outline" onclick="App._doLogout()">🚪 Ganti Akun</button>
          </div>
        ` : `
          <div class="bn-hero-btns">
            <button class="bn-btn-fill" onclick="App.showLogin()">🚀 Mulai Belajar</button>
            <button class="bn-btn-outline" onclick="App.showRegister()">📝 Daftar Gratis</button>
          </div>
          <p style="margin-top:10px;font-size:0.8rem;color:#8b949e;">Sudah punya akun? <a href="#" onclick="App.showLogin();return false;" style="color:#58a6ff;">Masuk di sini</a></p>
        `}
      </div>

      <!-- Stats -->
      <div class="bn-stats">
        <div class="bn-stat"><span class="bn-stat-num">15</span><span class="bn-stat-label">Mata Pelajaran</span></div>
        <div class="bn-stat"><span class="bn-stat-num">27</span><span class="bn-stat-label">Bab Pelajaran</span></div>
        <div class="bn-stat"><span class="bn-stat-num">13+</span><span class="bn-stat-label">Jenis Latihan</span></div>
        <div class="bn-stat"><span class="bn-stat-num">6</span><span class="bn-stat-label">Simulasi</span></div>
      </div>

      <!-- PAI Section -->
      <div class="bn-section-hdr">🕌 Pendidikan Agama Islam</div>
      <div class="bn-grid">${paiCards||''}</div>

      <!-- Umum Section -->
      <div class="bn-section-hdr">📖 Mata Pelajaran Umum</div>
      <div class="bn-grid">${umumCards||''}</div>

      <!-- Footer -->
      <div class="bn-footer">
        <p>📋 <a href="#" onclick="App.showAllFeatures();return false;">Semua Fitur Interaktif</a> · <a href="#" onclick="App.showGlossary();return false;">Glosarium</a> · <a href="#" onclick="App.showAbout();return false;">Tentang</a></p>
        <p style="margin-top:12px;">© 2026 <strong style="color:#c9d1d9;">Hasnawi Latip</strong> — Media Pembelajaran Interaktif SMP/MTs</p>
        <p>Kurikulum Merdeka Fase D | 100% Gratis | Powered by <a href="https://pages.github.com/">GitHub Pages</a></p>
      </div>
    `;

    // Update header for landing style
    const hdr = document.querySelector('.main-header');
    if (hdr) {
      hdr.innerHTML = `
        <div class="bn-nav">
          <a class="bn-nav-logo" href="#" onclick="App.showLanding();return false;">🖥️ Media Interaktif</a>
          <ul class="bn-nav-links">
            <li><a href="#" onclick="App.showLanding();return false;">HOME</a></li>
            <li><a href="#" onclick="App.showHome();return false;">MAPEL</a></li>
            <li><a href="#" onclick="App.showAbout();return false;">TENTANG</a></li>
          </ul>
          <div class="bn-nav-btns">
            ${loggedIn
              ? `<span style="color:#8b949e;font-size:0.8rem;margin-right:8px;">${user.displayName||user.email}</span><button class="bn-btn-outline" onclick="App._doLogout()">Keluar</button>`
              : `<button class="bn-btn-outline" onclick="App.showLogin()">Masuk</button><button class="bn-btn-fill" onclick="App.showRegister()">Daftar</button>`
            }
          </div>
        </div>`;
    }

    this.pushState({ view: 'landing' });
  },

  /** Tombol Home → sesuai role */
  _goHome() {
    const user = Auth.currentUser();
    if (user && user.role === 'admin') {
      AdminDashboard.showDashboard();
    } else {
      this.showLanding();
    }
  },

  /** Update header: tampilkan nama user + role + credits + admin button + tombol logout */
  _updateHeader() {
    // Restore original header if landing page modified it
    const hdr = document.querySelector('.main-header');
    if (hdr && !document.getElementById('btnBack')) {
      hdr.innerHTML = `
        <button class="btn-back" id="btnBack" title="Kembali" style="display:none;">← Kembali</button>
        <button class="btn-home" id="btnHome" title="Ke Halaman Utama" style="display:none;">🏠 Home</button>
        <h1>🖥️ Media Interaktif SMP/MTs</h1>
        <span class="header-sub">Kurikulum Merdeka — Semua Mapel</span>
        <span id="headerUser" style="display:none;"></span>
        <button class="btn-logout" id="btnLogout" title="Keluar" style="display:none;">🚪 Keluar</button>`;
      document.getElementById('btnBack').addEventListener('click', () => this.goBack());
      document.getElementById('btnHome').addEventListener('click', () => this._goHome());
      document.getElementById('btnLogout').addEventListener('click', () => this._doLogout());
    }
    const user = Auth.currentUser();
    const userEl = document.getElementById('headerUser');
    const logoutEl = document.getElementById('btnLogout');
    if (user) {
      const roleIcon = user.role === 'admin' ? '🛡️' : user.role === 'guru' ? '👨‍🏫' : '🎒';
      const creditInfo = user.role !== 'admin' ? ` · 💰${user.credits || 0}` : '';
      userEl.innerHTML = roleIcon + ' ' + user.displayName + creditInfo;
      if (user.role === 'admin') {
        userEl.innerHTML += ' <button class="btn btn-sm btn-secondary" onclick="AdminDashboard.showDashboard()" style="margin-left:8px;font-size:0.7rem;padding:3px 10px;">🛡️ Admin</button>';
      }
      userEl.style.display = 'inline';
      logoutEl.style.display = 'inline-block';
    } else {
      userEl.style.display = 'none';
      logoutEl.style.display = 'none';
    }
  },

  /** Logout */
  _doLogout() {
    if (confirm('Apakah Anda yakin ingin keluar?')) {
      Auth.logout();
      this.history = [];
      document.getElementById('btnBack').style.display = 'none';
      document.getElementById('btnHome').style.display = 'none';
      document.getElementById('headerUser').style.display = 'none';
      document.getElementById('btnLogout').style.display = 'none';
      this.showLanding();
    }
  },

  /** Halaman Login */
  showLogin(returnUrl) {
    this._returnUrl = returnUrl || '';
    const main = document.getElementById('mainContent');
    main.innerHTML = `
      <div class="fade-in" style="max-width:420px;margin:0 auto;">
        <div style="text-align:center;margin-bottom:24px;">
          <div style="font-size:3rem;margin-bottom:8px;">🖥️</div>
          <h2 style="margin-bottom:4px;">Media Interaktif SMP/MTs</h2>
          <p style="color:var(--gray-500);">Masuk untuk melanjutkan belajar</p>
        </div>

        <div id="authMsg" style="text-align:center;margin-bottom:12px;"></div>

        <form id="loginForm" onsubmit="return false;" style="background:var(--white);border-radius:var(--radius);padding:24px;box-shadow:var(--shadow-sm);">
          <label style="display:block;font-weight:600;margin-bottom:4px;font-size:0.85rem;">Email</label>
          <input type="email" id="loginUser" class="fill-input" placeholder="contoh@email.com" autocomplete="email" style="margin-bottom:14px;text-align:left;">

          <label style="display:block;font-weight:600;margin-bottom:4px;font-size:0.85rem;">Password</label>
          <input type="password" id="loginPass" class="fill-input" placeholder="Password" autocomplete="current-password" style="margin-bottom:20px;text-align:left;">

          <button type="submit" class="btn btn-primary" style="width:100%;" onclick="App._handleLogin()">🔑 Masuk</button>
        </form>

        <p style="text-align:center;margin-top:16px;font-size:0.85rem;color:var(--gray-500);">
          Belum punya akun?
          <a href="#" onclick="App.showRegister();return false;" style="color:var(--blue);font-weight:600;">Daftar di sini</a>
        </p>
      </div>
    `;

    document.getElementById('btnBack').style.display = 'none';
    document.getElementById('btnHome').style.display = 'none';
    document.getElementById('headerUser').style.display = 'none';
    document.getElementById('btnLogout').style.display = 'none';

    // Enter key
    document.getElementById('loginPass').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') this._handleLogin();
    });

    this.history = [];
    this.pushState({ view: 'login' });
  },

  /** Handle login submit */
  async _handleLogin() {
    const email = document.getElementById('loginUser').value.trim();
    const password = document.getElementById('loginPass').value;
    const msgEl = document.getElementById('authMsg');

    const result = await Auth.login(email, password);
    if (result.success) {
      msgEl.innerHTML = '';
      this._updateHeader();
      if (result.user && result.user.role === 'admin') {
        AdminDashboard.showDashboard();
      } else if (this._returnUrl) {
        const [sid, gk, cid] = this._returnUrl.split('|');
        this._returnUrl = '';
        this.showChapter(sid, gk, parseInt(cid));
      } else {
        this.showHome();
      }
    } else {
      msgEl.innerHTML = `<div class="info-box" style="background:var(--red-light);border-left-color:var(--red);"><b>Gagal:</b> ${result.message}</div>`;
    }
  },

  /** Halaman Register */
  showRegister() {
    const main = document.getElementById('mainContent');
    main.innerHTML = `
      <div class="fade-in" style="max-width:420px;margin:0 auto;">
        <div style="text-align:center;margin-bottom:24px;">
          <div style="font-size:3rem;margin-bottom:8px;">📝</div>
          <h2 style="margin-bottom:4px;">Daftar Akun Baru</h2>
          <p style="color:var(--gray-500);">Buat akun untuk menyimpan progres belajar</p>
        </div>

        <div id="authMsg" style="text-align:center;margin-bottom:12px;"></div>

        <form id="regForm" onsubmit="return false;" style="background:var(--white);border-radius:var(--radius);padding:24px;box-shadow:var(--shadow-sm);">
          <label style="display:block;font-weight:600;margin-bottom:4px;font-size:0.85rem;">Nama Lengkap</label>
          <input type="text" id="regName" class="fill-input" placeholder="Contoh: Ahmad" autocomplete="name" style="margin-bottom:14px;text-align:left;">

          <label style="display:block;font-weight:600;margin-bottom:4px;font-size:0.85rem;">Email</label>
          <input type="email" id="regUser" class="fill-input" placeholder="contoh@email.com" autocomplete="email" style="margin-bottom:14px;text-align:left;">

          <label style="display:block;font-weight:600;margin-bottom:4px;font-size:0.85rem;">Password</label>
          <input type="password" id="regPass" class="fill-input" placeholder="Min. 6 karakter" autocomplete="new-password" style="margin-bottom:14px;text-align:left;">

          <label style="display:block;font-weight:600;margin-bottom:4px;font-size:0.85rem;">Status</label>
          <div style="display:flex;gap:10px;margin-bottom:20px;">
            <label class="role-label">
              <input type="radio" name="role" value="siswa" checked style="accent-color:var(--blue);">
              <span>🎒 <b>Siswa</b></span>
            </label>
            <label class="role-label">
              <input type="radio" name="role" value="guru" style="accent-color:var(--green);">
              <span>👨‍🏫 <b>Guru</b></span>
            </label>
            <label class="role-label">
              <input type="radio" name="role" value="admin" style="accent-color:var(--purple);">
              <span>🛡️ <b>Admin</b></span>
            </label>
          </div>

          <div id="adminCodeBox" style="display:none;margin-bottom:14px;">
            <label style="display:block;font-weight:600;margin-bottom:4px;font-size:0.85rem;">Kode Admin</label>
            <input type="password" id="regAdminCode" class="fill-input" placeholder="Masukkan kode admin" style="text-align:left;">
          </div>

          <button type="submit" class="btn btn-success" style="width:100%;" onclick="App._handleRegister()">✅ Daftar</button>
        </form>

        <p style="text-align:center;margin-top:16px;font-size:0.85rem;color:var(--gray-500);">
          Sudah punya akun?
          <a href="#" onclick="App.showLogin();return false;" style="color:var(--blue);font-weight:600;">Masuk di sini</a>
        </p>
      </div>
    `;

    document.getElementById('btnBack').style.display = 'none';
    document.getElementById('btnHome').style.display = 'none';

    // Toggle admin code box
    document.querySelectorAll('input[name="role"]').forEach(r => {
      r.addEventListener('change', () => {
        document.getElementById('adminCodeBox').style.display = r.value === 'admin' ? 'block' : 'none';
      });
    });

    document.getElementById('regPass').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') this._handleRegister();
    });

    this.pushState({ view: 'register' });
  },

  /** Handle register submit */
  async _handleRegister() {
    const name = document.getElementById('regName').value.trim();
    const email = document.getElementById('regUser').value.trim();
    const password = document.getElementById('regPass').value;
    const role = document.querySelector('input[name="role"]:checked')?.value || 'siswa';
    const adminCode = document.getElementById('regAdminCode')?.value || '';
    const msgEl = document.getElementById('authMsg');

    const result = await Auth.register(email, password, name, role, adminCode);
    if (result.success) {
      msgEl.innerHTML = `<div class="info-box" style="background:var(--green-light);border-left-color:var(--green);"><b>Berhasil!</b> ${result.message}</div>`;
      // Auto-redirect ke login setelah 1.5 detik
      setTimeout(() => this.showLogin(), 1500);
    } else {
      msgEl.innerHTML = `<div class="info-box" style="background:var(--red-light);border-left-color:var(--red);"><b>Gagal:</b> ${result.message}</div>`;
    }
  },

  // ─── HELPER ───
  _firebaseOverrides: {}, // Cache Firebase overrides

  /** Preload Firebase overrides on init */
  async _loadFirebaseOverrides() {
    if (typeof FB === 'undefined') return;
    try {
      const snap = await FB.db.ref('content').once('value');
      this._firebaseOverrides = snap.val() || {};
    } catch(e) { this._firebaseOverrides = {}; }
  },

  _getData(subjectId) {
    const defaults = getSubjectData(subjectId) || INFORMATIKA_DATA;
    let overrides = {};
    // Merge localStorage overrides
    if (typeof AdminDashboard !== 'undefined' && AdminDashboard.loadOverrides) {
      overrides = AdminDashboard.loadOverrides() || {};
    }
    // Merge Firebase overrides (cached)
    if (this._firebaseOverrides && this._firebaseOverrides[subjectId]) {
      if (!overrides[subjectId]) overrides[subjectId] = {};
      Object.assign(overrides[subjectId], this._firebaseOverrides[subjectId]);
    }
    const subjOverride = overrides[subjectId];
    if (subjOverride) {
      const merged = JSON.parse(JSON.stringify(defaults));
      for (const key of Object.keys(subjOverride)) {
        if (subjOverride[key] && typeof subjOverride[key] === 'object') {
          merged[key] = subjOverride[key];
        }
      }
      return merged;
    }
    return defaults;
  },

  _getSubjectInfo(subjectId) {
    return getSubjectInfo(subjectId) || SUBJECTS.find(s => s.id === 'informatika');
  },

  // ─── NAVIGASI ───
  pushState(state) {
    this.history.push(state);
    const btnBack = document.getElementById('btnBack');
    const btnHome = document.getElementById('btnHome');
    if (!btnBack || !btnHome) return; // landing page doesn't have these
    // Halaman publik: sembunyikan Back & Home
    if (state.view === 'home' || state.view === 'login' || state.view === 'register' || state.view === 'landing') {
      btnBack.style.display = 'none';
      btnHome.style.display = 'none';
    } else if (state.view && state.view.startsWith('admin')) {
      // Admin pages: tampilkan Back, sembunyikan Home
      btnBack.style.display = 'inline-block';
      btnHome.style.display = 'none';
    } else {
      btnBack.style.display = 'inline-block';
      btnHome.style.display = 'inline-block';
    }
    if (state.subjectId) this.currentSubject = state.subjectId;
    if (state.grade) this.currentGrade = state.grade;
  },

  goBack() {
    // Tidak perlu auth untuk navigasi publik (landing ↔ subject)
    if (this.history.length <= 1) { this.showLanding(); return; }
    this.history.pop();
    const prev = this.history[this.history.length - 1];
    if (!prev) { this.showHome(); return; }

    // Landing page → kembali ke landing (homepage baru)
    if (prev.view === 'landing') { this.showLanding(); return; }

    this.currentSubject = prev.subjectId || null;
    this.currentGrade = prev.grade || null;

    switch (prev.view) {
      case 'home': this.showHome(); break;
      case 'landing': this.showLanding(); break;
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
      case 'premium-lock': this._showPremiumLock(prev.subjectId, prev.grade || prev.gradeKey, prev.chapterId, {title:'...'}, 1); this.pushState({ view:'premium-lock' }); break;
      case 'about': this.showAbout(); break;
      case 'login': this.showLogin(); break;
      case 'register': this.showRegister(); break;
      case 'admin': AdminDashboard.showDashboard(); break;
      case 'admin-content': AdminDashboard.showContentEditor(); break;
      case 'admin-ai': AdminDashboard.showAIGenerator(); break;
      case 'admin-ai-batch': AdminDashboard.showAIBatchGenerate(); break;
      case 'admin-ai-settings': AdminDashboard.showAISettings(); break;
      case 'admin-perangkat': AdminDashboard.showPerangkatPembelajaran(); break;
      case 'admin-perangkat-gen': AdminDashboard._genPerangkat(prev.type); break;
      case 'admin-edit-subject': AdminDashboard.editSubject(prev.subjectId); break;
      case 'admin-edit-chapter': AdminDashboard.editChapter(prev.subjectId, prev.gradeKey || prev.grade, prev.chapterId); break;
      case 'admin-users': AdminDashboard.showUserManager(); break;
      case 'admin-export': AdminDashboard.showExportImport(); break;
      case 'admin-stats': AdminDashboard.showGlobalStats(); break;
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
    this._updateHeader();
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
        <p class="home-subtitle">SMP/MTs — Kurikulum Merdeka Fase D</p>

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

        <div id="perangkatArea_${subjectId}" style="margin-top:20px;"></div>

        ${subjectId === 'informatika' ? `
        <div style="text-align:center;margin-top:12px;">
          <button class="btn btn-primary btn-sm" onclick="SimulationEngine.showMenu();App.pushState({view:'simulation',subjectId:'${subjectId}'})">🧪 Simulasi</button>
          <button class="btn btn-secondary btn-sm" onclick="CodePuzzleEngine.init(INFORMATIKA_DATA.codePuzzle,'🧩 Susun Kode');App.pushState({view:'codepuzzle'})">🧩 Puzzle Kode</button>
          <button class="btn btn-secondary btn-sm" onclick="CrosswordEngine.init(INFORMATIKA_DATA.crossword,INFORMATIKA_DATA.crossword.title);App.pushState({view:'crossword'})">🔤 TTS</button>
        </div>` : ''}

        <div class="flex-center mt-2">
          <button class="btn btn-primary btn-sm" onclick="App.showPerangkatMapel('${subjectId}')">📋 Perangkat</button>
          <button class="btn btn-secondary" onclick="App.goBack()">📚 Kembali</button>
        </div>
      </div>
    `;
    this.pushState({ view: 'subject', subjectId: subjectId });
    this._loadPerangkatInline(subjectId);
  },

  /** Tampilkan perangkat pembelajaran untuk mapel tertentu */
  async showPerangkatMapel(subjectId) {
    const info = this._getSubjectInfo(subjectId);
    const main = document.getElementById('mainContent');

    main.innerHTML = `<div class="fade-in" style="max-width:700px;margin:0 auto;"><div class="section-header"><h2>📋 Perangkat ${info.name}</h2><p style="color:var(--gray-700);">⏳ Memuat...</p></div></div>`;

    let items = [];
    try {
      if (typeof FB !== 'undefined') {
        const snap = await FB.db.ref('perangkat').once('value');
        const all = snap.val() || {};
        items = Object.entries(all)
          .filter(([k, v]) => v.subjectId === subjectId)
          .map(([k, v]) => ({ id: k, ...v }));
      }
    } catch(e) {}

    const typeIcons = { rpp: '📖', silabus: '📋', prota: '📅', bahanajar: '📚', lkpd: '✍️', media: '🎯', kisikisi: '🎯', rubrik: '📐', remedial: '🔄' };
    const typeLabels = { rpp: 'RPP/Modul Ajar', silabus: 'Silabus', prota: 'Prota/Promes', bahanajar: 'Bahan Ajar', lkpd: 'LKPD', media: 'Media', kisikisi: 'Kisi-Kisi', rubrik: 'Rubrik', remedial: 'Remedial' };

    main.innerHTML = `
      <div class="fade-in" style="max-width:700px;margin:0 auto;">
        <div class="section-header"><h2>📋 Perangkat ${info.name}</h2><p style="color:var(--gray-700);">${items.length} perangkat tersedia</p></div>
        ${items.length === 0 ? '<p style="text-align:center;color:var(--gray-500);padding:40px;">Belum ada perangkat. Admin harus generate dulu dari Dashboard.</p>' : ''}
        ${items.map(it => `
          <div class="chapter-card" style="cursor:pointer;margin-bottom:8px;" onclick="App._viewPerangkat('${it.id}')">
            <div class="chapter-num">${typeIcons[it.type]||'📄'}</div>
            <div><div class="chapter-title">${typeLabels[it.type]||it.type} — ${it.topic || 'Semua Bab'}</div>
            <div class="chapter-meta">${it.createdAt ? new Date(it.createdAt).toLocaleDateString('id') : ''} · Klik untuk lihat</div></div>
          </div>
        `).join('')}
        <div class="flex-center mt-3"><button class="btn btn-secondary" onclick="App.goBack()">📚 Kembali</button></div>
      </div>`;
    this.pushState({ view: 'perangkat-mapel', subjectId });
  },

  /** Load perangkat inline di halaman mapel */
  async _loadPerangkatInline(subjectId) {
    const area = document.getElementById('perangkatArea_' + subjectId);
    if (!area) return;
    try {
      if (typeof FB === 'undefined') { area.innerHTML = ''; return; }
      const snap = await FB.db.ref('perangkat').once('value');
      const all = snap.val() || {};
      const items = Object.entries(all).filter(([k,v]) => v.subjectId === subjectId);
      if (items.length === 0) { area.innerHTML = ''; return; }
      const icons = { rpp:'📖', silabus:'📋', prota:'📅', bahanajar:'📚', lkpd:'✍️', media:'🎯', kisikisi:'🎯', rubrik:'📐', remedial:'🔄' };
      const labels = { rpp:'RPP', silabus:'Silabus', prota:'Prota', bahanajar:'Bahan Ajar', lkpd:'LKPD', media:'Media', kisikisi:'Kisi-Kisi', rubrik:'Rubrik', remedial:'Remedial' };
      area.innerHTML = `<h4 style="margin-bottom:8px;color:var(--green);">📋 Perangkat Pembelajaran</h4><div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:8px;">${items.map(([id, it]) => `<div class="grade-card subject-card" style="padding:14px;cursor:pointer;border-color:var(--green);" onclick="App._viewPerangkat('${id}')"><div style="font-size:1.5rem;">${icons[it.type]||'📄'}</div><div style="font-weight:600;font-size:0.85rem;">${labels[it.type]||it.type}</div><div style="font-size:0.7rem;color:var(--gray-500);">${it.topic||'Semua Bab'}</div></div>`).join('')}</div>`;
    } catch(e) { area.innerHTML = ''; }
  },

  /** View satu perangkat */
  async _viewPerangkat(id) {
    const main = document.getElementById('mainContent');
    main.innerHTML = `<div class="fade-in"><p>⏳ Memuat...</p></div>`;
    try {
      const snap = await FB.db.ref('perangkat/' + id).once('value');
      const data = snap.val();
      if (!data) { main.innerHTML = '<p>Data tidak ditemukan.</p>'; return; }
      main.innerHTML = `
        <div class="fade-in" style="max-width:800px;margin:0 auto;">
          <div class="content-view" style="font-size:0.9rem;">${data.content}</div>
          <div class="flex-center mt-3"><button class="btn btn-secondary" onclick="App.goBack()">📚 Kembali</button></div>
        </div>`;
    } catch(e) { main.innerHTML = `<p style="color:red;">Error: ${e.message}</p>`; }
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
    const isPremium = ch.premium || false;
    const loggedIn = Auth.isLoggedIn();
    const unlocked = !isPremium || Auth.isUnlocked(subjectId, gradeKey, ch.id);
    const lockIcon = (!loggedIn || (isPremium && !unlocked)) ? ' 🔒' : '';
    const costText = isPremium && !unlocked ? ` · 🪙${ch.cost || 1}` : '';
    return `
      <div class="chapter-card ${cls}" onclick="App.showChapter('${subjectId}','${gradeKey}',${ch.id})" style="border-left-color:${subj.color};">
        <div class="chapter-num" style="color:${subj.color};">${icon}<br>${ch.id}</div>
        <div>
          <div class="chapter-title">${ch.title}${lockIcon}</div>
          <div class="chapter-meta">Semester ${ch.sem} · Kuis tersedia${costText}</div>
        </div>
      </div>
    `;
  },

  /** Tampilkan halaman kunci premium */
  _showPremiumLock(subjectId, gradeKey, chapterId, ch, cost) {
    const user = Auth.currentUser();
    const main = document.getElementById('mainContent');
    main.innerHTML = `
      <div class="fade-in" style="max-width:500px;margin:40px auto;text-align:center;">
        <div style="font-size:4rem;margin-bottom:16px;">🔒</div>
        <h2 style="margin-bottom:8px;">Konten Premium</h2>
        <p style="color:var(--gray-700);margin-bottom:20px;">
          Bab <b>${ch.title}</b> memerlukan kredit untuk dibuka.
        </p>
        <div style="background:var(--white);border-radius:var(--radius);padding:24px;box-shadow:var(--shadow-sm);display:inline-block;margin-bottom:20px;">
          <div style="font-size:2rem;font-weight:800;color:var(--orange);">🪙 ${cost}</div>
          <div style="color:var(--gray-500);">Kredit diperlukan</div>
          <div style="margin-top:12px;font-size:0.9rem;color:var(--gray-700);">
            Kredit kamu: <b>💰 ${user.credits || 0}</b>
          </div>
        </div>
        <br>
        <button class="btn btn-primary btn-lg" onclick="App._unlockChapter('${subjectId}','${gradeKey}',${chapterId},${cost})" ${(user.credits || 0) < cost ? 'disabled' : ''}>
          🔓 Buka dengan ${cost} Kredit
        </button>
        ${(user.credits || 0) < cost ? `<p style="color:var(--red);margin-top:8px;font-size:0.85rem;">Kredit tidak cukup. Hubungi admin untuk topup.</p>` : ''}
        <div id="unlockMsg" style="margin-top:12px;"></div>
        <div class="flex-center mt-3">
          <button class="btn btn-secondary" onclick="App.goBack()">← Kembali</button>
        </div>
      </div>
    `;
    App.pushState({ view: 'premium-lock', subjectId, gradeKey, chapterId });
  },

  /** Buka kunci konten premium */
  async _unlockChapter(subjectId, gradeKey, chapterId, cost) {
    const msgEl = document.getElementById('unlockMsg');
    if (!msgEl) return;
    msgEl.innerHTML = '<span style="color:var(--blue);">⏳ Membuka kunci...</span>';

    const user = Auth.currentUser();
    if (!user) return;

    // Firebase
    if (typeof FB !== 'undefined') {
      try {
        const result = await FB.unlockContent(user.uid, subjectId, gradeKey, chapterId, cost);
        if (result.success) {
          Auth.saveUnlock(subjectId, gradeKey, chapterId);
          const session = JSON.parse(sessionStorage.getItem('app_current_user') || '{}');
          session.credits = result.credits;
          sessionStorage.setItem('app_current_user', JSON.stringify(session));
          msgEl.innerHTML = '<span style="color:var(--green);">✅ Terbuka! Mengarahkan...</span>';
          setTimeout(() => App.showChapter(subjectId, gradeKey, chapterId), 800);
        } else {
          msgEl.innerHTML = '<span style="color:var(--red);">❌ ' + (result.error || 'Gagal') + '</span>';
        }
      } catch (e) {
        msgEl.innerHTML = '<span style="color:var(--red);">❌ ' + e.message + '</span>';
      }
      return;
    }

    // Fallback localStorage
    Auth.saveUnlock(subjectId, gradeKey, chapterId);
    msgEl.innerHTML = '<span style="color:var(--green);">✅ Terbuka! Mengarahkan...</span>';
    setTimeout(() => App.showChapter(subjectId, gradeKey, chapterId), 800);
  },
  showChapter(subjectId, gradeKey, chapterId) {
    this.currentSubject = subjectId;
    this.currentGrade = gradeKey;
    const data = this._getData(subjectId);
    const grade = data[gradeKey];
    const ch = grade.chapters.find(c => c.id === chapterId);
    if (!ch) return;

    // Cek apakah konten premium & terkunci
    const isPremium = ch.premium || false;
    const cost = ch.cost || 1;
    const unlocked = Auth.isUnlocked(subjectId, gradeKey, chapterId);

    if (isPremium && !unlocked) {
      this._showPremiumLock(subjectId, gradeKey, chapterId, ch, cost);
      return;
    }

    // Cek login — jika belum, arahkan ke login
    if (!Auth.isLoggedIn()) {
      const returnUrl = `${subjectId}|${gradeKey}|${chapterId}`;
      this.showLogin(returnUrl);
      return;
    }
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
  showGlossary() {
    this._updateHeader();
    if (typeof GlossaryEngine !== 'undefined') {
      GlossaryEngine.init();
      this.pushState({ view: 'glossary' });
    }
  },

  showAbout() {
    this._updateHeader();
    const main = document.getElementById('mainContent');
    main.innerHTML = `
      <div class="fade-in" style="max-width:650px;margin:0 auto;">
        <div class="section-header">
          <h2>ℹ️ Tentang Aplikasi</h2>
          <p style="color:var(--gray-700);max-width:500px;margin:0 auto;">Media Pembelajaran Interaktif untuk SMP/MTs</p>
        </div>

        <div style="background:var(--card-bg);border-radius:12px;padding:24px;margin-top:20px;box-shadow:var(--shadow-sm);text-align:center;">
          <div style="font-size:3rem;margin-bottom:12px;">🖥️</div>
          <h3 style="margin-bottom:8px;">Media Interaktif SMP/MTs</h3>
          <p style="color:var(--gray-700);margin-bottom:20px;">
            Platform belajar interaktif untuk siswa SMP/MTs<br>
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
            <p>📚 15 Mata Pelajaran SMP/MTs</p>
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
