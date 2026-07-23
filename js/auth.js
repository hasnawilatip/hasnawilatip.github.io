/* ══════════════════════════════════════════════════════════
   AUTH MODULE — Login, Register, Logout
   Simpan data user di localStorage (offline-first)
   ══════════════════════════════════════════════════════════ */

const Auth = {
  STORAGE_KEY: 'app_users',
  SESSION_KEY: 'app_current_user',

  /** Hash sederhana (tidak untuk production, cukup untuk edukasi) */
  _hash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash |= 0; // Convert to 32bit integer
    }
    return 'h_' + Math.abs(hash).toString(36) + '_' + str.length.toString(36);
  },

  /** Test apakah localStorage & sessionStorage berfungsi */
  testStorage() {
    const testKey = '__storage_test__';
    try {
      localStorage.setItem(testKey, '1');
      localStorage.removeItem(testKey);
      sessionStorage.setItem(testKey, '1');
      sessionStorage.removeItem(testKey);
      return { ok: true };
    } catch (e) {
      return { ok: false, error: e.message };
    }
  },
  ensureDefaultAdmin() {
    const users = this._getUsers();
    // Cek apakah sudah ada admin
    const hasAdmin = Object.values(users).some(u => u.role === 'admin');
    if (!hasAdmin) {
      users['admin'] = {
        passwordHash: this._hash('admin123'),
        displayName: 'Administrator',
        role: 'admin',
        createdAt: new Date().toISOString()
      };
      this._saveUsers(users);
      return { username: 'admin', password: 'admin123' };
    }
    return null;
  },

  /** Ambil semua user dari localStorage */
  _getUsers() {
    try {
      return JSON.parse(localStorage.getItem(this.STORAGE_KEY)) || {};
    } catch (e) {
      return {};
    }
  },

  /** Simpan semua user ke localStorage */
  _saveUsers(users) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(users));
  },

  /** Cek apakah user sedang login */
  isLoggedIn() {
    // Firebase
    if (typeof FB !== 'undefined') {
      const u = FB.auth.currentUser;
      if (u) return true;
    }
    // Fallback sessionStorage
    const session = sessionStorage.getItem(this.SESSION_KEY);
    if (!session) return false;
    try {
      const data = JSON.parse(session);
      const users = this._getUsers();
      const user = users[data.email || data.username];
      return !!(user && user.passwordHash === data.passwordHash);
    } catch (e) { return false; }
  },

  /** Ambil data user yang sedang login */
  currentUser() {
    if (!this.isLoggedIn()) return null;
    try {
      // Firebase
      if (typeof FB !== 'undefined') {
        const u = FB.auth.currentUser;
        if (u) {
          const session = JSON.parse(sessionStorage.getItem(this.SESSION_KEY) || '{}');
          return {
            email: u.email,
            uid: u.uid,
            displayName: session.displayName || u.displayName || u.email,
            role: session.role || 'siswa',
            credits: session.credits || 0,
            unlocked: session.unlocked || []
          };
        }
      }
      // Fallback
      const session = JSON.parse(sessionStorage.getItem(this.SESSION_KEY));
      const users = this._getUsers();
      const user = users[session.email || session.username] || {};
      return {
        email: session.email || session.username,
        displayName: user.displayName || session.email || session.username,
        role: user.role || 'siswa',
        credits: user.credits || 0,
        unlocked: user.unlocked || []
      };
    } catch (e) { return null; }
  },

  /** Cek apakah konten sudah di-unlock */
  isUnlocked(subjectId, gradeKey, chapterId) {
    const user = this.currentUser();
    if (!user) return false;
    if (user.role === 'admin') return true; // Admin selalu bisa akses
    if (user.credits >= 999) return true; // Unlimited credits
    const key = subjectId + '|' + gradeKey + '|' + chapterId;
    return (user.unlocked || []).includes(key);
  },

  /** Simpan unlock state ke session */
  saveUnlock(subjectId, gradeKey, chapterId) {
    const session = JSON.parse(sessionStorage.getItem(this.SESSION_KEY) || '{}');
    if (!session.unlocked) session.unlocked = [];
    const key = subjectId + '|' + gradeKey + '|' + chapterId;
    if (!session.unlocked.includes(key)) session.unlocked.push(key);
    sessionStorage.setItem(this.SESSION_KEY, JSON.stringify(session));
  },

  /** Register user baru — Firebase */
  async register(email, password, displayName, role, adminCode) {
    if (!email || !email.includes('@')) {
      return { success: false, message: 'Email tidak valid.' };
    }
    if (!password || password.length < 6) {
      return { success: false, message: 'Password minimal 6 karakter.' };
    }
    if (!role || !['guru','siswa','admin'].includes(role)) {
      return { success: false, message: 'Pilih status: Guru atau Siswa.' };
    }
    if (role === 'admin' && adminCode !== 'mtsadmin2026') {
      return { success: false, message: 'Kode admin tidak valid.' };
    }

    // Firebase register
    if (typeof FB !== 'undefined') {
      try {
        const result = await FB.register(email, password, displayName, role);
        return result;
      } catch (e) {
        return { success: false, message: e.message };
      }
    }

    // Fallback localStorage
    const users = this._getUsers();
    const key = email.trim().toLowerCase();
    if (users[key]) return { success: false, message: 'Email sudah terdaftar.' };
    users[key] = { passwordHash: this._hash(password), displayName: displayName || key, role, credits: 5, unlocked: [], createdAt: new Date().toISOString() };
    this._saveUsers(users);
    return { success: true, message: 'Registrasi berhasil! Dapat 5 kredit gratis.' };
  },

  /** Login — Firebase */
  async login(email, password) {
    if (!email || !password) {
      return { success: false, message: 'Email dan password harus diisi.' };
    }

    // Firebase login
    if (typeof FB !== 'undefined') {
      try {
        const result = await FB.login(email, password);
        if (result.success) {
          sessionStorage.setItem(this.SESSION_KEY, JSON.stringify({
            email: result.user.email,
            uid: result.user.uid,
            displayName: result.user.displayName,
            role: result.user.role,
            credits: result.user.credits,
            unlocked: result.user.unlocked,
            loginAt: new Date().toISOString()
          }));
        }
        return result;
      } catch (e) {
        return { success: false, message: e.message };
      }
    }

    // Fallback localStorage
    const users = this._getUsers();
    const key = email.trim().toLowerCase();
    const user = users[key];
    if (!user) return { success: false, message: 'Email tidak ditemukan.' };
    if (user.passwordHash !== this._hash(password)) return { success: false, message: 'Password salah.' };
    sessionStorage.setItem(this.SESSION_KEY, JSON.stringify({
      email: key, passwordHash: user.passwordHash, loginAt: new Date().toISOString()
    }));
    return { success: true, message: 'Login berhasil!', user: { email: key, displayName: user.displayName, role: user.role, credits: user.credits, unlocked: user.unlocked } };
  },

  /** Logout */
  logout() {
    if (typeof FB !== 'undefined') FB.auth.signOut();
    sessionStorage.removeItem(this.SESSION_KEY);
  },

  /** Update display name */
  updateDisplayName(newName) {
    if (!this.isLoggedIn()) return false;
    const session = JSON.parse(sessionStorage.getItem(this.SESSION_KEY));
    const users = this._getUsers();
    if (users[session.username]) {
      users[session.username].displayName = newName;
      this._saveUsers(users);
      return true;
    }
    return false;
  }
};
