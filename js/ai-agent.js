/* ══════════════════════════════════════════════════════════
   AI AGENT — Generate Konten Pembelajaran via DeepSeek API
   Endpoint: api.deepseek.com (OpenAI-compatible)
   ══════════════════════════════════════════════════════════ */

const AIAgent = {
  API_KEY_STORAGE: 'admin_deepseek_key',
  MODEL: 'deepseek-chat',
  BASE_URL: 'https://api.deepseek.com/v1/chat/completions',

  /** Simpan API Key */
  setApiKey(key) {
    localStorage.setItem(this.API_KEY_STORAGE, key.trim());
  },

  /** Ambil API Key */
  getApiKey() {
    return localStorage.getItem(this.API_KEY_STORAGE) || '';
  },

  /** Cek apakah API key sudah di-set */
  hasKey() {
    return !!this.getApiKey();
  },

  /** Panggil DeepSeek API */
  async _callDeepSeek(systemPrompt, userPrompt) {
    const apiKey = this.getApiKey();
    if (!apiKey) throw new Error('API Key belum diatur. Masukkan DeepSeek API Key di Settings.');

    const response = await fetch(this.BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: this.MODEL,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.7,
        max_tokens: 4096
      })
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.error?.message || `HTTP ${response.status}: Gagal generate konten.`);
    }

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content;
    if (!text) throw new Error('AI tidak menghasilkan konten. Coba lagi.');
    return text;
  },

  /** Generate materi pembelajaran per bab */
  async generateMaterial(subjectName, gradeLabel, chapterTitle, chapterNum) {
    const systemPrompt = `Kamu adalah asisten guru profesional untuk SMP/MTs Kurikulum Merdeka di Indonesia. Buat materi pembelajaran yang LENGKAP, mendalam, dan sesuai tingkat SMP/MTs.`;

    const userPrompt = `Buatkan MATERI PEMBELAJARAN untuk mata pelajaran "${subjectName}" kelas ${gradeLabel}, Bab ${chapterNum}: "${chapterTitle}".

Format output HARUS dalam HTML (tanpa <!DOCTYPE>, <html>, <head>, <body>), langsung konten:
- Gunakan <h3> untuk sub-judul
- Gunakan <p> untuk paragraf penjelasan
- Gunakan <ul><li> untuk poin-poin penting
- Gunakan <b> untuk istilah penting
- Gunakan <div class="info-box"><span class="info-title">ℹ️ Info:</span> ...</div> untuk info tambahan
- Gunakan <div class="activity-box"><span class="activity-title">✏️ Aktivitas:</span> ...</div> untuk aktivitas siswa
- Materi harus LENGKAP, mendalam, dan sesuai tingkat SMP/MTs
- Panjang: minimal 500 kata
- Bahasa Indonesia yang baik dan benar
- Sesuaikan dengan Kurikulum Merdeka Fase D`;

    return await this._callDeepSeek(systemPrompt, userPrompt);
  },

  /** Generate soal kuis pilihan ganda */
  async generateQuiz(subjectName, gradeLabel, chapterTitle, count = 5) {
    const systemPrompt = `Kamu adalah asisten guru untuk SMP/MTs Kurikulum Merdeka di Indonesia. Output HARUS berupa JSON array valid tanpa teks lain.`;

    const userPrompt = `Buatkan ${count} SOAL PILIHAN GANDA untuk mata pelajaran "${subjectName}" kelas ${gradeLabel}, Bab: "${chapterTitle}".

Output HARUS dalam format JSON array saja (tanpa markdown, tanpa komentar). Setiap soal adalah object:
{
  "q": "teks soal",
  "opts": ["A", "B", "C", "D"],
  "ans": 0  // index jawaban benar (0-3)
}

Pastikan:
- Soal sesuai tingkat SMP/MTs
- Variasi tingkat kesulitan
- Jawaban benar tersebar merata
- JSON valid`;

    const result = await this._callDeepSeek(systemPrompt, userPrompt);
    const cleaned = result.replace(/```json\n?/gi, '').replace(/```\n?/g, '').trim();
    const match = cleaned.match(/\[[\s\S]*\]/);
    if (!match) throw new Error('AI menghasilkan format tidak valid. Coba generate ulang.');
    const quiz = JSON.parse(match[0]);
    if (!Array.isArray(quiz)) throw new Error('Format bukan array');
    return quiz;
  },

  /** Generate soal isian singkat */
  async generateFillBlank(subjectName, gradeLabel, chapterTitle, count = 5) {
    const systemPrompt = `Kamu adalah asisten guru untuk SMP/MTs. Output HARUS berupa JSON array valid tanpa teks lain.`;

    const userPrompt = `Buatkan ${count} SOAL ISIAN SINGKAT untuk "${subjectName}" kelas ${gradeLabel}, Bab: "${chapterTitle}".

Output JSON array saja. Format tiap soal:
{
  "q": "teks soal dengan ___ untuk bagian isian",
  "answers": ["jawaban1", "jawaban2"]
}`;

    const result = await this._callDeepSeek(systemPrompt, userPrompt);
    const cleaned = result.replace(/```json\n?/gi, '').replace(/```\n?/g, '').trim();
    const match = cleaned.match(/\[[\s\S]*\]/);
    if (!match) throw new Error('Format tidak valid.');
    return JSON.parse(match[0]);
  },

  /** Generate soal benar/salah */
  async generateTrueFalse(subjectName, gradeLabel, chapterTitle, count = 10) {
    const systemPrompt = `Kamu adalah asisten guru untuk SMP/MTs. Output HARUS berupa JSON array valid tanpa teks lain.`;

    const userPrompt = `Buatkan ${count} SOAL BENAR/SALAH untuk "${subjectName}" kelas ${gradeLabel}, Bab: "${chapterTitle}".

Output JSON array saja. Format:
{
  "q": "pernyataan",
  "ans": true  // true = benar, false = salah
}

Seimbang antara benar dan salah.`;

    const result = await this._callDeepSeek(systemPrompt, userPrompt);
    const cleaned = result.replace(/```json\n?/gi, '').replace(/```\n?/g, '').trim();
    const match = cleaned.match(/\[[\s\S]*\]/);
    if (!match) throw new Error('Format tidak valid.');
    return JSON.parse(match[0]);
  },

  /** Generate flashcards */
  async generateFlashcards(subjectName, gradeLabel, chapterTitle, count = 8) {
    const systemPrompt = `Kamu adalah asisten guru untuk SMP/MTs. Output HARUS berupa JSON array valid tanpa teks lain.`;

    const userPrompt = `Buatkan ${count} FLASHCARD untuk "${subjectName}" kelas ${gradeLabel}, Bab: "${chapterTitle}".

Output JSON array saja. Format:
{
  "term": "istilah/konsep (sisi depan)",
  "def": "definisi singkat 1-2 kalimat (sisi belakang)"
}`;

    const result = await this._callDeepSeek(systemPrompt, userPrompt);
    const cleaned = result.replace(/```json\n?/gi, '').replace(/```\n?/g, '').trim();
    const match = cleaned.match(/\[[\s\S]*\]/);
    if (!match) throw new Error('Format tidak valid.');
    return JSON.parse(match[0]);
  }
};
