/* ══════════════════════════════════════════════════════════
   FIREBASE CONFIG — Realtime Database + Auth
   Media Interaktif SMP/MTs
   ══════════════════════════════════════════════════════════ */

firebase.initializeApp({
  apiKey: "AIzaSyBMpZmG9kXdzX7kPNiuGDodKz7AXx1ze3k",
  authDomain: "media-interaktif-aa4e2.firebaseapp.com",
  projectId: "media-interaktif-aa4e2",
  storageBucket: "media-interaktif-aa4e2.firebasestorage.app",
  messagingSenderId: "192645447775",
  appId: "1:192645447775:web:a90acf962430f4ac7c1bea",
  databaseURL: "https://media-interaktif-aa4e2-default-rtdb.asia-southeast1.firebasedatabase.app"
});

const FB = {
  auth: firebase.auth(),
  db: firebase.database(),

  async register(email, password, displayName, role) {
    try {
      const cred = await this.auth.createUserWithEmailAndPassword(email, password);
      await cred.user.updateProfile({ displayName });
      await this.db.ref('users/' + cred.user.uid).set({
        email, displayName, role: role || 'siswa',
        credits: role === 'admin' ? 999 : 5,
        unlocked: [''], createdAt: new Date().toISOString()
      });
      return { success: true, message: 'Registrasi berhasil! Dapat 5 kredit gratis.' };
    } catch (e) { return { success: false, message: this._err(e) }; }
  },

  async login(email, password) {
    try {
      const cred = await this.auth.signInWithEmailAndPassword(email, password);
      const snap = await this.db.ref('users/' + cred.user.uid).once('value');
      const data = snap.val() || {};
      return { success: true, user: {
        uid: cred.user.uid, email: cred.user.email,
        displayName: data.displayName || cred.user.displayName,
        role: data.role || 'siswa', credits: data.credits || 0,
        unlocked: data.unlocked || []
      }};
    } catch (e) { return { success: false, message: this._err(e) }; }
  },

  async logout() { await this.auth.signOut(); },

  async unlockContent(uid, subjectId, gradeKey, chapterId, cost) {
    const ref = this.db.ref('users/' + uid);
    const snap = await ref.once('value');
    const data = snap.val() || {};
    const credits = data.credits || 0;
    const unlocked = data.unlocked || [];
    const key = subjectId + '|' + gradeKey + '|' + chapterId;
    if (unlocked.includes(key)) return { success: true, alreadyUnlocked: true };
    if (credits < cost) throw new Error('Kredit tidak cukup. Butuh ' + cost + ', punya ' + credits);
    unlocked.push(key);
    await ref.update({ credits: credits - cost, unlocked });
    return { success: true, credits: credits - cost };
  },

  async saveContent(subjectId, data) {
    await this.db.ref('content/' + subjectId).set(data);
  },

  async getContent(subjectId) {
    const snap = await this.db.ref('content/' + subjectId).once('value');
    return snap.val();
  },

  async saveProgress(uid, progress) {
    await this.db.ref('progress/' + uid).set(progress);
  },

  async getProgress(uid) {
    const snap = await this.db.ref('progress/' + uid).once('value');
    return snap.val();
  },

  _err(e) {
    const m = {
      'auth/email-already-in-use': 'Email sudah terdaftar.',
      'auth/invalid-email': 'Format email tidak valid.',
      'auth/weak-password': 'Password minimal 6 karakter.',
      'auth/user-not-found': 'Email tidak ditemukan.',
      'auth/wrong-password': 'Password salah.'
    };
    return m[e.code] || e.message;
  }
};
