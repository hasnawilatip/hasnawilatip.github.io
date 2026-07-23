/* ══════════════════════════════════════════════════════════
   SUBJECTS REGISTRY — Semua Mata Pelajaran MTs
   Kurikulum Merdeka — Fase D (Kelas 7–9)
   ══════════════════════════════════════════════════════════ */

const SUBJECTS = [
  // ── PAI (Pendidikan Agama Islam) ──
  {
    id: 'quran-hadis',
    name: "Al-Qur'an Hadis",
    icon: '📖',
    color: '#1A6B3C',
    colorLight: '#E6F4EA',
    group: 'PAI',
    desc: 'Memahami, menghafal, dan mengamalkan ayat-ayat Al-Qur\'an dan Hadis pilihan.',
    chapters: { k7: 9, k8: 9, k9: 9 }
  },
  {
    id: 'akidah-akhlak',
    name: 'Akidah Akhlak',
    icon: '🕌',
    color: '#6B3FA0',
    colorLight: '#F3E8FF',
    group: 'PAI',
    desc: 'Mempelajari keimanan (akidah) dan pembentukan karakter mulia (akhlak) dalam Islam.',
    chapters: { k7: 9, k8: 9, k9: 9 }
  },
  {
    id: 'fikih',
    name: 'Fikih',
    icon: '📜',
    color: '#8B4513',
    colorLight: '#FFF0E0',
    group: 'PAI',
    desc: 'Hukum-hukum Islam tentang ibadah dan muamalah dalam kehidupan sehari-hari.',
    chapters: { k7: 9, k8: 9, k9: 9 }
  },
  {
    id: 'ski',
    name: 'Sejarah Kebudayaan Islam',
    icon: '🏛️',
    color: '#B8860B',
    colorLight: '#FFF8DC',
    group: 'PAI',
    desc: 'Menelusuri perjalanan sejarah dan peradaban Islam dari masa Nabi hingga modern.',
    chapters: { k7: 9, k8: 9, k9: 9 }
  },
  {
    id: 'bahasa-arab',
    name: 'Bahasa Arab',
    icon: '🇸🇦',
    color: '#2E8B57',
    colorLight: '#E8F5E9',
    group: 'PAI',
    desc: 'Mempelajari bahasa Arab sebagai bahasa Al-Qur\'an: istima\', kalam, qira\'ah, kitabah.',
    chapters: { k7: 9, k8: 9, k9: 9 }
  },

  // ── UMUM ──
  {
    id: 'ppkn',
    name: 'Pendidikan Pancasila',
    icon: '🇮🇩',
    color: '#C0392B',
    colorLight: '#FCE4E4',
    group: 'Umum',
    desc: 'Memahami Pancasila, UUD 1945, Bhinneka Tunggal Ika, dan NKRI sebagai warga negara.',
    chapters: { k7: 6, k8: 6, k9: 6 }
  },
  {
    id: 'bahasa-indonesia',
    name: 'Bahasa Indonesia',
    icon: '📝',
    color: '#2471A3',
    colorLight: '#E8F4FD',
    group: 'Umum',
    desc: 'Meningkatkan keterampilan menyimak, membaca, berbicara, dan menulis dalam bahasa Indonesia.',
    chapters: { k7: 6, k8: 6, k9: 6 }
  },
  {
    id: 'matematika',
    name: 'Matematika',
    icon: '🔢',
    color: '#E67E22',
    colorLight: '#FFF3CD',
    group: 'Umum',
    desc: 'Mengembangkan kemampuan berpikir logis, analitis, sistematis, kritis, dan kreatif.',
    chapters: { k7: 7, k8: 6, k9: 6 }
  },
  {
    id: 'ipa',
    name: 'Ilmu Pengetahuan Alam',
    icon: '🔬',
    color: '#27AE60',
    colorLight: '#E8F8F0',
    group: 'Umum',
    desc: 'Memahami alam semesta melalui observasi, eksperimen, dan metode ilmiah (Fisika, Kimia, Biologi).',
    chapters: { k7: 7, k8: 6, k9: 6 }
  },
  {
    id: 'ips',
    name: 'Ilmu Pengetahuan Sosial',
    icon: '🌍',
    color: '#8E44AD',
    colorLight: '#F3E8F8',
    group: 'Umum',
    desc: 'Mempelajari interaksi manusia dengan lingkungan sosial, ekonomi, budaya, dan geografi.',
    chapters: { k7: 4, k8: 4, k9: 4 }
  },
  {
    id: 'bahasa-inggris',
    name: 'Bahasa Inggris',
    icon: '🇬🇧',
    color: '#2980B9',
    colorLight: '#E8F4FD',
    group: 'Umum',
    desc: 'Mengembangkan keterampilan listening, speaking, reading, dan writing dalam bahasa Inggris.',
    chapters: { k7: 6, k8: 6, k9: 6 }
  },
  {
    id: 'informatika',
    name: 'Informatika',
    icon: '🖥️',
    color: '#1A56DB',
    colorLight: '#E8F0FE',
    group: 'Umum',
    desc: 'Pengenalan 8 bidang informatika, berpikir komputasional, TIK, pemrograman, AI, IoT, dan etika digital.',
    chapters: { k7: 9, k8: 9, k9: 9 }
  },
  {
    id: 'seni-budaya',
    name: 'Seni Budaya',
    icon: '🎨',
    color: '#E91E63',
    colorLight: '#FCE4EC',
    group: 'Umum',
    desc: 'Mengeksplorasi seni rupa, seni musik, seni tari, dan seni teater Nusantara.',
    chapters: { k7: 4, k8: 4, k9: 4 }
  },
  {
    id: 'pjok',
    name: 'PJOK',
    icon: '⚽',
    color: '#FF5722',
    colorLight: '#FBE9E7',
    group: 'Umum',
    desc: 'Pendidikan Jasmani, Olahraga, dan Kesehatan untuk hidup aktif dan sehat.',
    chapters: { k7: 8, k8: 8, k9: 8 }
  },
  {
    id: 'prakarya',
    name: 'Prakarya',
    icon: '🛠️',
    color: '#795548',
    colorLight: '#EFEBE9',
    group: 'Umum',
    desc: 'Mengembangkan kreativitas dan keterampilan melalui kerajinan, rekayasa, budi daya, dan pengolahan.',
    chapters: { k7: 4, k8: 4, k9: 4 }
  }
];

// ─── Helper: Dapatkan data mapel (safe access) ───
function getSubjectData(subjectId) {
  // Gunakan try-catch + typeof untuk safe access ke variable data
  try {
    switch(subjectId) {
      case 'informatika':      return typeof INFORMATIKA_DATA !== 'undefined' ? INFORMATIKA_DATA : null;
      case 'matematika':        return typeof MATEMATIKA_DATA !== 'undefined' ? MATEMATIKA_DATA : null;
      case 'ipa':               return typeof IPA_DATA !== 'undefined' ? IPA_DATA : null;
      case 'ips':               return typeof IPS_DATA !== 'undefined' ? IPS_DATA : null;
      case 'bahasa-indonesia':  return typeof BINDO_DATA !== 'undefined' ? BINDO_DATA : null;
      case 'bahasa-inggris':    return typeof BING_DATA !== 'undefined' ? BING_DATA : null;
      case 'ppkn':              return typeof PPKN_DATA !== 'undefined' ? PPKN_DATA : null;
      case 'quran-hadis':       return typeof QURAN_HADIS_DATA !== 'undefined' ? QURAN_HADIS_DATA : null;
      case 'akidah-akhlak':     return typeof AKIDAH_AKHLAK_DATA !== 'undefined' ? AKIDAH_AKHLAK_DATA : null;
      case 'fikih':             return typeof FIKIH_DATA !== 'undefined' ? FIKIH_DATA : null;
      case 'ski':               return typeof SKI_DATA !== 'undefined' ? SKI_DATA : null;
      case 'bahasa-arab':       return typeof BAHASA_ARAB_DATA !== 'undefined' ? BAHASA_ARAB_DATA : null;
      case 'seni-budaya':       return typeof SENI_DATA !== 'undefined' ? SENI_DATA : null;
      case 'pjok':              return typeof PJOK_DATA !== 'undefined' ? PJOK_DATA : null;
      case 'prakarya':          return typeof PRAKARYA_DATA !== 'undefined' ? PRAKARYA_DATA : null;
      default: return null;
    }
  } catch(e) {
    console.error('Error loading data for subject:', subjectId, e);
    return null;
  }
}

// ─── Helper: Info subject ───
function getSubjectInfo(subjectId) {
  return SUBJECTS.find(s => s.id === subjectId) || null;
}
