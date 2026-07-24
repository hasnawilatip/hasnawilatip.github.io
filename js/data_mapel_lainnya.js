/* ══════════════════════════════════════════════════════════
   DATA QURAN HADIS, AKIDAH AKHLAK, FIKIH, SKI, B.ARAB
   PPKN, SENI, PJOK, PRAKARYA — Template Skeleton
   Konten dapat dilengkapi secara bertahap.
   ══════════════════════════════════════════════════════════ */

function _makeSkeleton(name, icon, color, colorLight, desc) {
  function ch(id, title, sem) {
    return { id, title, sem, content: '', quiz: [] };
  }
  return {
    name, icon, color, colorLight, desc,
    chapters: [
      ch(1, 'Bab 1 — Materi Semester 1', 1),
      ch(2, 'Bab 2 — Materi Semester 1', 1),
      ch(3, 'Bab 3 — Materi Semester 1', 1),
      ch(4, 'Bab 4 — Materi Semester 2', 2),
      ch(5, 'Bab 5 — Materi Semester 2', 2),
      ch(6, 'Bab 6 — Materi Semester 2', 2)
    ],
    dragDrop: { k7: [], k8: [], k9: [] },
    fillBlank: { k7: { title: '✍️ Isian Singkat', questions: [] }, k8: { title: '✍️ Isian Singkat', questions: [] }, k9: { title: '✍️ Isian Singkat', questions: [] } },
    trueFalse: { k7: { title: '✅❌ Benar/Salah', questions: [] }, k8: { title: '✅❌ Benar/Salah', questions: [] }, k9: { title: '✅❌ Benar/Salah', questions: [] } },
    flashcards: { k7: { title: '🃏 Flashcards', cards: [] }, k8: { title: '🃏 Flashcards', cards: [] }, k9: { title: '🃏 Flashcards', cards: [] } }
  };
}

// ─── QURAN HADIS ───
const QURAN_HADIS_DATA = {};
['k7','k8','k9'].forEach(k => {
  QURAN_HADIS_DATA[k] = _makeSkeleton(
    `Al-Qur'an Hadis Kelas ${k === 'k7' ? '7' : k === 'k8' ? '8' : '9'}`,
    '📖', '#1A6B3C', '#E6F4EA',
    'Memahami, menghafal, dan mengamalkan ayat-ayat Al-Qur\'an dan Hadis pilihan.'
  );
  QURAN_HADIS_DATA[k].chapters[0].content = `<h3>A. Al-Qur'an dan Hadis sebagai Pedoman Hidup</h3><p>Al-Qur'an adalah kitab suci umat Islam yang diturunkan kepada Nabi Muhammad SAW. Hadis adalah perkataan, perbuatan, dan ketetapan Nabi.</p><div class="info-box"><span class="info-title">📌 Tahukah Kamu?</span> Al-Qur'an terdiri dari 30 juz, 114 surah, dan sekitar 6.236 ayat.</div>`;
  QURAN_HADIS_DATA[k].dragDrop = QURAN_HADIS_DATA[k].dragDrop || {};
  QURAN_HADIS_DATA[k].fillBlank = QURAN_HADIS_DATA[k].fillBlank || {};
  QURAN_HADIS_DATA[k].trueFalse = QURAN_HADIS_DATA[k].trueFalse || {};
  QURAN_HADIS_DATA[k].flashcards = QURAN_HADIS_DATA[k].flashcards || {};
});

// ─── AKIDAH AKHLAK ───
const AKIDAH_AKHLAK_DATA = {};
['k7','k8','k9'].forEach(k => {
  AKIDAH_AKHLAK_DATA[k] = _makeSkeleton(
    `Akidah Akhlak Kelas ${k === 'k7' ? '7' : k === 'k8' ? '8' : '9'}`,
    '🕌', '#6B3FA0', '#F3E8FF',
    'Mempelajari keimanan (akidah) dan pembentukan karakter mulia (akhlak) dalam Islam.'
  );
  AKIDAH_AKHLAK_DATA[k].chapters[0].content = `<h3>A. Iman, Islam, dan Ihsan</h3><p><b>Iman:</b> keyakinan dalam hati. <b>Islam:</b> amal perbuatan. <b>Ihsan:</b> beribadah seolah melihat Allah.</p><div class="info-box"><span class="info-title">📌 Rukun Iman:</span> Iman kepada Allah, Malaikat, Kitab, Rasul, Hari Akhir, Qadha & Qadar.</div>`;
});

// ─── FIKIH ───
const FIKIH_DATA = {};
['k7','k8','k9'].forEach(k => {
  FIKIH_DATA[k] = _makeSkeleton(
    `Fikih Kelas ${k === 'k7' ? '7' : k === 'k8' ? '8' : '9'}`,
    '📜', '#8B4513', '#FFF0E0',
    'Hukum-hukum Islam tentang ibadah dan muamalah dalam kehidupan sehari-hari.'
  );
  FIKIH_DATA[k].chapters[0].content = `<h3>A. Thaharah (Bersuci)</h3><p>Thaharah adalah bersuci dari hadas dan najis. Air suci & menyucikan, istinja, wudhu, tayammum, dan mandi wajib.</p><div class="info-box"><span class="info-title">📌 Rukun Wudhu:</span> Niat, membasuh muka, membasuh tangan, mengusap kepala, membasuh kaki, tertib.</div>`;
});

// ─── SKI ───
const SKI_DATA = {};
['k7','k8','k9'].forEach(k => {
  SKI_DATA[k] = _makeSkeleton(
    `SKI Kelas ${k === 'k7' ? '7' : k === 'k8' ? '8' : '9'}`,
    '🏛️', '#B8860B', '#FFF8DC',
    'Menelusuri perjalanan sejarah dan peradaban Islam dari masa Nabi hingga modern.'
  );
  SKI_DATA[k].chapters[0].content = `<h3>A. Misi Dakwah Nabi Muhammad SAW di Mekah</h3><p>Nabi Muhammad SAW menerima wahyu pertama di Gua Hira (610 M). Dakwah secara sembunyi-sembunyi (3 tahun) lalu terang-terangan.</p><div class="info-box"><span class="info-title">📌 Tahukah Kamu?</span> Wahyu pertama adalah Surah Al-Alaq ayat 1–5.</div>`;
});

// ─── BAHASA ARAB ───
const BAHASA_ARAB_DATA = {};
['k7','k8','k9'].forEach(k => {
  BAHASA_ARAB_DATA[k] = _makeSkeleton(
    `Bahasa Arab Kelas ${k === 'k7' ? '7' : k === 'k8' ? '8' : '9'}`,
    '🇸🇦', '#2E8B57', '#E8F5E9',
    'Mempelajari bahasa Arab: istima\' (mendengar), kalam (bicara), qira\'ah (membaca), kitabah (menulis).'
  );
  BAHASA_ARAB_DATA[k].chapters[0].content = `<h3>أ. التعارف (At-Ta'aruf — Perkenalan)</h3><p><b>السَّلَامُ عَلَيْكُمْ</b> (Assalamu'alaikum). <b>اِسْمِي...</b> (Namaku...). <b>كَيْفَ حَالُكَ؟</b> (Bagaimana kabarmu?).</p>`;
});

// ─── PPKN ───
const PPKN_DATA = {};
['k7','k8','k9'].forEach(k => {
  PPKN_DATA[k] = _makeSkeleton(
    `PPKn Kelas ${k === 'k7' ? '7' : k === 'k8' ? '8' : '9'}`,
    '🇮🇩', '#C0392B', '#FCE4E4',
    'Memahami Pancasila, UUD 1945, Bhinneka Tunggal Ika, dan NKRI.'
  );
  PPKN_DATA[k].chapters[0].content = `<h3>A. Pancasila sebagai Dasar Negara</h3><p>Pancasila terdiri dari 5 sila: (1) Ketuhanan YME, (2) Kemanusiaan yang adil dan beradab, (3) Persatuan Indonesia, (4) Kerakyatan, (5) Keadilan sosial.</p><div class="info-box"><span class="info-title">📌 Tahukah Kamu?</span> Hari Lahir Pancasila diperingati setiap 1 Juni.</div>`;
});

// ─── SENI BUDAYA ───
const SENI_DATA = {};
['k7','k8','k9'].forEach(k => {
  SENI_DATA[k] = _makeSkeleton(
    `Seni Budaya Kelas ${k === 'k7' ? '7' : k === 'k8' ? '8' : '9'}`,
    '🎨', '#E91E63', '#FCE4EC',
    'Mengeksplorasi seni rupa, musik, tari, dan teater Nusantara.'
  );
  SENI_DATA[k].chapters[0].content = `<h3>A. Menggambar Ragam Hias</h3><p>Ragam hias Nusantara: flora, fauna, figuratif, geometris. Teknik: stilasi, deformasi, distorsi.</p>`;
});

// ─── PJOK ───
const PJOK_DATA = {};
['k7','k8','k9'].forEach(k => {
  PJOK_DATA[k] = _makeSkeleton(
    `PJOK Kelas ${k === 'k7' ? '7' : k === 'k8' ? '8' : '9'}`,
    '⚽', '#FF5722', '#FBE9E7',
    'Pendidikan Jasmani, Olahraga, dan Kesehatan untuk hidup aktif dan sehat.'
  );
  PJOK_DATA[k].chapters[0].content = `<h3>A. Permainan Bola Besar</h3><p>Sepak bola, bola voli, bola basket. Teknik dasar: passing, dribbling, shooting, servis, smash.</p>`;
});

// ─── PRAKARYA ───
const PRAKARYA_DATA = {};
['k7','k8','k9'].forEach(k => {
  PRAKARYA_DATA[k] = _makeSkeleton(
    `Prakarya Kelas ${k === 'k7' ? '7' : k === 'k8' ? '8' : '9'}`,
    '🛠️', '#795548', '#EFEBE9',
    'Mengembangkan kreativitas melalui kerajinan, rekayasa, budi daya, dan pengolahan.'
  );
  PRAKARYA_DATA[k].chapters[0].content = `<h3>A. Kerajinan Bahan Lunak</h3><p>Bahan lunak alami: tanah liat, serat alam. Bahan lunak buatan: plastisin, polymer clay, gips.</p>`;
});
