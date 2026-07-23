/* ══════════════════════════════════════════════════════════
   AI AGENT — Multi-Provider AI untuk Generate Konten
   Support: DeepSeek, OpenAI, Google Gemini
   ══════════════════════════════════════════════════════════ */

const AIAgent = {
  SETTINGS_KEY: 'admin_ai_settings',

  PROVIDERS: {
    deepseek: {
      name: 'DeepSeek', icon: '🔍',
      baseURL: 'https://api.deepseek.com/v1/chat/completions',
      model: 'deepseek-chat',
      models: ['deepseek-chat', 'deepseek-reasoner', 'deepseek-chat-v3', 'deepseek-r1'],
      authHeader: (key) => ({ 'Authorization': `Bearer ${key}` }),
      parseResponse: (data) => data.choices?.[0]?.message?.content,
      parseError: (data) => data.error?.message,
      getApiLink: 'https://platform.deepseek.com/api_keys'
    },
    openai: {
      name: 'OpenAI', icon: '🧠',
      baseURL: 'https://api.openai.com/v1/chat/completions',
      model: 'gpt-4o-mini',
      models: ['gpt-4o', 'gpt-4o-mini', 'gpt-4-turbo', 'gpt-3.5-turbo'],
      authHeader: (key) => ({ 'Authorization': `Bearer ${key}` }),
      parseResponse: (data) => data.choices?.[0]?.message?.content,
      parseError: (data) => data.error?.message,
      getApiLink: 'https://platform.openai.com/api-keys'
    },
    gemini: {
      name: 'Google Gemini', icon: '🌐',
      model: 'gemini-2.0-flash',
      models: ['gemini-2.0-flash', 'gemini-1.5-flash', 'gemini-1.5-pro'],
      authHeader: () => null,
      parseResponse: (data) => data.candidates?.[0]?.content?.parts?.[0]?.text,
      parseError: (data) => data.error?.message,
      getApiLink: 'https://aistudio.google.com/apikey',
      _isGemini: true
    }
  },

  _loadSettings() {
    try { return JSON.parse(localStorage.getItem(this.SETTINGS_KEY)) || {}; }
    catch (e) { return {}; }
  },

  _saveSettings(s) { localStorage.setItem(this.SETTINGS_KEY, JSON.stringify(s)); },

  getActiveProvider() { return this._loadSettings().activeProvider || 'deepseek'; },
  setActiveProvider(id) { const s = this._loadSettings(); s.activeProvider = id; this._saveSettings(s); },

  getApiKey(providerId) { const s = this._loadSettings(); return (s.keys && s.keys[providerId]) || ''; },
  setApiKey(providerId, key) { const s = this._loadSettings(); if (!s.keys) s.keys = {}; s.keys[providerId] = key.trim(); this._saveSettings(s); },

  getModel(providerId) { const s = this._loadSettings(); const p = this.PROVIDERS[providerId]; return (s.models && s.models[providerId]) || p?.model || ''; },
  setModel(providerId, model) { const s = this._loadSettings(); if (!s.models) s.models = {}; s.models[providerId] = model; this._saveSettings(s); },

  hasKey() { return !!this.getApiKey(this.getActiveProvider()); },
  resetAll() { localStorage.removeItem(this.SETTINGS_KEY); },

  async _callAPI(systemPrompt, userPrompt) {
    const pid = this.getActiveProvider();
    const p = this.PROVIDERS[pid];
    if (!p) throw new Error('Provider tidak dikenal.');
    const apiKey = this.getApiKey(pid);
    if (!apiKey) throw new Error(`API Key ${p.name} belum diatur.`);
    const model = this.getModel(pid);

    if (p._isGemini) {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const r = await fetch(url, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: systemPrompt + '\n\n' + userPrompt }] }], generationConfig: { temperature: 0.7, maxOutputTokens: 4096 } })
      });
      if (!r.ok) { const e = await r.json().catch(() => ({})); throw new Error(p.parseError(e) || `HTTP ${r.status}`); }
      const d = await r.json(); const t = p.parseResponse(d);
      if (!t) throw new Error(`${p.name} tidak menghasilkan konten.`); return t;
    }

    const r = await fetch(p.baseURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...p.authHeader(apiKey) },
      body: JSON.stringify({ model, messages: [{ role: 'system', content: systemPrompt }, { role: 'user', content: userPrompt }], temperature: 0.7, max_tokens: 4096 })
    });
    if (!r.ok) { const e = await r.json().catch(() => ({})); throw new Error(p.parseError(e) || `HTTP ${r.status}`); }
    const d = await r.json(); const t = p.parseResponse(d);
    if (!t) throw new Error(`${p.name} tidak menghasilkan konten.`); return t;
  },

  async testConnection() {
    const pid = this.getActiveProvider();
    const p = this.PROVIDERS[pid];
    return await this._callAPI(
      'Kamu asisten ramah. Jawab singkat bahasa Indonesia.',
      `Balas: "✅ Koneksi ${p.name} API berhasil! Siap generate konten."`
    );
  },

  async generateMaterial(subjectName, gradeLabel, chapterTitle, chapterNum) {
    return await this._callAPI(
      `Kamu asisten guru SMP/MTs Kurikulum Merdeka. Buat materi LENGKAP, mendalam, sesuai tingkat SMP/MTs.`,
      `Buat MATERI PEMBELAJARAN "${subjectName}" kelas ${gradeLabel}, Bab ${chapterNum}: "${chapterTitle}".

Format output HARUS HTML langsung (tanpa <!DOCTYPE>, <html>, <head>, <body>):
- <h3> sub-judul
- <p> paragraf
- <ul><li> poin penting
- <b> istilah penting
- <div class="info-box"><span class="info-title">ℹ️ Info:</span> ...</div> info tambahan
- <div class="activity-box"><span class="activity-title">✏️ Aktivitas:</span> ...</div> aktivitas
- Minimal 500 kata, Bahasa Indonesia baik, Kurikulum Merdeka Fase D`
    );
  },

  async generateQuiz(subjectName, gradeLabel, chapterTitle, count = 5) {
    const r = await this._callAPI(
      `Output HARUS JSON array valid tanpa teks lain.`,
      `${count} SOAL PILIHAN GANDA "${subjectName}" kelas ${gradeLabel}, Bab: "${chapterTitle}".
JSON: [{"q":"soal","opts":["A","B","C","D"],"ans":0}]
Variasi kesulitan, jawaban tersebar.`
    );
    const c = r.replace(/```json\n?/gi, '').replace(/```\n?/g, '').trim();
    const m = c.match(/\[[\s\S]*\]/);
    if (!m) throw new Error('Format tidak valid. Coba ulang.');
    return JSON.parse(m[0]);
  },

  async generateFillBlank(subjectName, gradeLabel, chapterTitle, count = 5) {
    const r = await this._callAPI(
      `Output HARUS JSON array valid.`,
      `${count} SOAL ISIAN SINGKAT "${subjectName}" kelas ${gradeLabel}, Bab: "${chapterTitle}".
JSON: [{"q":"soal dengan ___","answers":["jwb1","jwb2"]}]`
    );
    const c = r.replace(/```json\n?/gi, '').replace(/```\n?/g, '').trim();
    const m = c.match(/\[[\s\S]*\]/); if (!m) throw new Error('Format tidak valid.'); return JSON.parse(m[0]);
  },

  async generateTrueFalse(subjectName, gradeLabel, chapterTitle, count = 10) {
    const r = await this._callAPI(
      `Output HARUS JSON array valid.`,
      `${count} SOAL BENAR/SALAH "${subjectName}" kelas ${gradeLabel}, Bab: "${chapterTitle}".
JSON: [{"q":"pernyataan","ans":true}] Seimbang benar/salah.`
    );
    const c = r.replace(/```json\n?/gi, '').replace(/```\n?/g, '').trim();
    const m = c.match(/\[[\s\S]*\]/); if (!m) throw new Error('Format tidak valid.'); return JSON.parse(m[0]);
  },

  async generateFlashcards(subjectName, gradeLabel, chapterTitle, count = 8) {
    const r = await this._callAPI(
      `Output HARUS JSON array valid.`,
      `${count} FLASHCARD "${subjectName}" kelas ${gradeLabel}, Bab: "${chapterTitle}".
JSON: [{"term":"istilah","def":"definisi singkat"}]`
    );
    const c = r.replace(/```json\n?/gi, '').replace(/```\n?/g, '').trim();
    const m = c.match(/\[[\s\S]*\]/); if (!m) throw new Error('Format tidak valid.'); return JSON.parse(m[0]);
  },

  /** Cari daftar bab sesuai Kurikulum Merdeka */
  async searchCurriculum(subjectName, gradeLabel) {
    const r = await this._callAPI(
      `Kamu adalah ahli Kurikulum Merdeka Indonesia untuk SMP/MTs. Output HARUS JSON array valid.`,
      `Berikan daftar bab untuk mata pelajaran "${subjectName}" kelas ${gradeLabel} SMP/MTs sesuai Kurikulum Merdeka Fase D.

Format JSON array:
[
  {"id":1, "title":"Judul Bab", "sem":1, "desc":"Deskripsi singkat 1 kalimat"},
  ...
]

Ketentuan:
- id: nomor urut bab (1, 2, 3, ...)
- title: judul bab yang SESUAI KURIKULUM MERDEKA (jangan placeholder!)
- sem: 1 untuk semester 1, 2 untuk semester 2
- desc: deskripsi singkat bab tersebut (1 kalimat)
- Urutkan per semester
- Bab biasanya 4-5 per semester
- HANYA output JSON, tanpa teks lain`
    );
    const c = r.replace(/```json\n?/gi, '').replace(/```\n?/g, '').trim();
    const m = c.match(/\[[\s\S]*\]/);
    if (!m) throw new Error('Format tidak valid. Coba lagi.');
    return JSON.parse(m[0]);
  }
};
