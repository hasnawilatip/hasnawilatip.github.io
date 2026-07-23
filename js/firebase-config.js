/* ══════════════════════════════════════════════════════════
   FIREBASE CONFIG — Database & Auth untuk
   Media Interaktif SMP/MTs
   (CDN version, no npm needed)
   ══════════════════════════════════════════════════════════ */

const FBConfig = {
  apiKey: "AIzaSyBMpZmG9kXdzX7kPNiuGDodKz7AXx1ze3k",
  authDomain: "media-interaktif-aa4e2.firebaseapp.com",
  projectId: "media-interaktif-aa4e2",
  storageBucket: "media-interaktif-aa4e2.firebasestorage.app",
  messagingSenderId: "192645447775",
  appId: "1:192645447775:web:a90acf962430f4ac7c1bea"
};

// Initialize Firebase (CDN version)
firebase.initializeApp(FBConfig);

const FB = {
  auth: firebase.auth(),
  db: firebase.firestore(),

  /** Register dengan email + password */
  async register(email, password, displayName, role) {
    try {
      const cred = await this.auth.createUserWithEmailAndPassword(email, password);
      await cred.user.updateProfile({ displayName });
      // Simpan data tambahan ke Firestore
      await this.db.collection('users').doc(cred.user.uid).set({
        email, displayName, role: role || 'siswa',
        credits: role === 'admin' ? 999 : 5,
        unlocked: [],
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });
      return { success: true, message: 'Registrasi berhasil! Dapat 5 kredit gratis.' };
    } catch (e) {
      return { success: false, message: this._errorMsg(e) };
    }
  },

  /** Login */
  async login(email, password) {
    try {
      const cred = await this.auth.signInWithEmailAndPassword(email, password);
      const doc = await this.db.collection('users').doc(cred.user.uid).get();
      const data = doc.data() || {};
      return {
        success: true,
        user: {
          uid: cred.user.uid,
          email: cred.user.email,
          displayName: data.displayName || cred.user.displayName,
          role: data.role || 'siswa',
          credits: data.credits || 0,
          unlocked: data.unlocked || []
        }
      };
    } catch (e) {
      return { success: false, message: this._errorMsg(e) };
    }
  },

  /** Logout */
  async logout() {
    await this.auth.signOut();
  },

  /** Ambil data user saat ini */
  currentUser() {
    const u = this.auth.currentUser;
    if (!u) return null;
    return u;
  },

  /** Update credits */
  async addCredits(uid, amount) {
    const ref = this.db.collection('users').doc(uid);
    await this.db.runTransaction(async (t) => {
      const doc = await t.get(ref);
      const current = (doc.data()?.credits || 0) + amount;
      t.update(ref, { credits: current });
    });
  },

  /** Unlock konten */
  async unlockContent(uid, subjectId, gradeKey, chapterId, cost) {
    const ref = this.db.collection('users').doc(uid);
    const key = `${subjectId}|${gradeKey}|${chapterId}`;
    return this.db.runTransaction(async (t) => {
      const doc = await t.get(ref);
      const data = doc.data() || {};
      const credits = data.credits || 0;
      const unlocked = data.unlocked || [];
      if (unlocked.includes(key)) return { success: true, message: 'Sudah terbuka', alreadyUnlocked: true };
      if (credits < cost) throw new Error(`Kredit tidak cukup. Butuh ${cost}, punya ${credits}`);
      t.update(ref, { credits: credits - cost, unlocked: [...unlocked, key] });
      return { success: true, credits: credits - cost };
    });
  },

  /** Simpan konten */
  async saveContent(subjectId, data) {
    await this.db.collection('content').doc(subjectId).set({
      data, updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    }, { merge: true });
  },

  /** Ambil konten */
  async getContent(subjectId) {
    const doc = await this.db.collection('content').doc(subjectId).get();
    return doc.exists ? doc.data().data : null;
  },

  /** Simpan progres */
  async saveProgress(uid, progress) {
    await this.db.collection('progress').doc(uid).set({
      data: progress,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    });
  },

  /** Ambil progres */
  async getProgress(uid) {
    const doc = await this.db.collection('progress').doc(uid).get();
    return doc.exists ? doc.data().data : null;
  },

  _errorMsg(e) {
    switch (e.code) {
      case 'auth/email-already-in-use': return 'Email sudah terdaftar.';
      case 'auth/invalid-email': return 'Format email tidak valid.';
      case 'auth/weak-password': return 'Password minimal 6 karakter.';
      case 'auth/user-not-found': return 'Email tidak ditemukan.';
      case 'auth/wrong-password': return 'Password salah.';
      default: return e.message;
    }
  }
};
