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
      const users = this._getUsers();
      const user = users[session.username];
      return {
        username: session.username,
        displayName: user.displayName || session.username,
        role: user.role || 'siswa',
        createdAt: user.createdAt
      };
    } catch (e) {
      return null;
    }
  },

  /** Register user baru */
  register(username, password, displayName, role) {
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
    if (!role || !['guru','siswa'].includes(role)) {
      return { success: false, message: 'Pilih status: Guru atau Siswa.' };
    }

    const users = this._getUsers();
    const key = username.trim().toLowerCase();

    if (users[key]) {
      return { success: false, message: 'Username sudah terdaftar. Silakan login.' };
    }

    users[key] = {
      passwordHash: this._hash(password),
      displayName: displayName || username.trim(),
      role: role,
      createdAt: new Date().toISOString()
    };

    this._saveUsers(users);
    return { success: true, message: 'Registrasi berhasil! Silakan login.' };
  },

  /** Login */
  login(username, password) {
    if (!username || !password) {
      return { success: false, message: 'Username dan password harus diisi.' };
    }

    const users = this._getUsers();
    const key = username.trim().toLowerCase();
    const user = users[key];

    if (!user) {
      return { success: false, message: 'Username tidak ditemukan.' };
    }

    if (user.passwordHash !== this._hash(password)) {
      return { success: false, message: 'Password salah.' };
    }

    // Simpan session
    sessionStorage.setItem(this.SESSION_KEY, JSON.stringify({
      username: key,
      passwordHash: user.passwordHash,
      loginAt: new Date().toISOString()
    }));

    return {
      success: true,
      message: 'Login berhasil!',
      user: {
        username: key,
        displayName: user.displayName
      }
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
