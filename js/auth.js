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
    const session = sessionStorage.getItem(this.SESSION_KEY);
    if (!session) return false;
    try {
      const data = JSON.parse(session);
      const users = this._getUsers();
      const user = users[data.username];
      return user && user.passwordHash === data.passwordHash;
    } catch (e) {
      return false;
    }
  },

  /** Ambil data user yang sedang login */
  currentUser() {
    if (!this.isLoggedIn()) return null;
    try {
      const session = JSON.parse(sessionStorage.getItem(this.SESSION_KEY));
      // Ambil role dari session langsung, fallback ke localStorage
      let role = session.role || 'siswa';
      let displayName = session.username;

      // Coba dapatkan displayName dari localStorage
      try {
        const users = this._getUsers();
        const user = users[session.username];
        if (user) {
          displayName = user.displayName || session.username;
          role = user.role || role;
        }
      } catch(e) {}

      return {
        username: session.username,
        displayName: displayName,
        role: role,
      };
    } catch (e) {
      return null;
    }
  },

  /** Register user baru — via Sheets jika ada, fallback localStorage */
  async register(username, password, displayName, role, adminCode) {
    // Validasi
    if (!username || username.trim().length < 3) {
      return { success: false, message: 'Username minimal 3 karakter.' };
    }
    if (!password || password.length < 4) {
      return { success: false, message: 'Password minimal 4 karakter.' };
    }
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      return { success: false, message: 'Username hanya boleh huruf, angka, dan underscore.' };
    }
    if (!role || !['guru','siswa','admin'].includes(role)) {
      return { success: false, message: 'Pilih status: Guru atau Siswa.' };
    }
    if (role === 'admin' && adminCode !== 'mtsadmin2026') {
      return { success: false, message: 'Kode admin tidak valid.' };
    }

    // Coba via Sheets
    if (typeof SheetsDB !== 'undefined' && SheetsDB.isConfigured()) {
      try {
        await SheetsDB._call('register', {
          username, password, displayName: displayName || username.trim(), role, adminCode
        });
        return { success: true, message: 'Registrasi berhasil! Silakan login.' };
      } catch (e) {
        return { success: false, message: 'Server: ' + e.message };
      }
    }

    // Fallback localStorage
    const users = this._getUsers();
    const key = username.trim().toLowerCase();
    if (users[key]) return { success: false, message: 'Username sudah terdaftar.' };
    users[key] = {
      passwordHash: this._hash(password),
      displayName: displayName || username.trim(),
      role: role,
      createdAt: new Date().toISOString()
    };
    this._saveUsers(users);
    return { success: true, message: 'Registrasi berhasil! Silakan login.' };
  },

  /** Login — via Sheets jika ada, fallback localStorage */
  async login(username, password) {
    if (!username || !password) {
      return { success: false, message: 'Username dan password harus diisi.' };
    }

    // Coba via Sheets
    if (typeof SheetsDB !== 'undefined' && SheetsDB.isConfigured()) {
      try {
        const result = await SheetsDB._call('login', { username, password });
        sessionStorage.setItem(this.SESSION_KEY, JSON.stringify({
          username: result.user.username,
          role: result.user.role || 'siswa',
          displayName: result.user.displayName,
          loginAt: new Date().toISOString()
        }));
        return { success: true, message: 'Login berhasil!', user: result.user };
      } catch (e) {
        return { success: false, message: 'Server: ' + e.message };
      }
    }

    // Fallback localStorage
    const users = this._getUsers();
    const key = username.trim().toLowerCase();
    const user = users[key];
    if (!user) return { success: false, message: 'Username tidak ditemukan.' };
    if (user.passwordHash !== this._hash(password)) return { success: false, message: 'Password salah.' };

    sessionStorage.setItem(this.SESSION_KEY, JSON.stringify({
      username: key,
      passwordHash: user.passwordHash,
      loginAt: new Date().toISOString()
    }));

    return {
      success: true, message: 'Login berhasil!',
      user: { username: key, displayName: user.displayName, role: user.role || 'siswa' }
    };
  },

  /** Logout */
  logout() {
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
