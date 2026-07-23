/* ══════════════════════════════════════════════════════════
   DATA BAHASA INDONESIA — MTs Kelas 7, 8, 9 (Kurikulum Merdeka)
   ══════════════════════════════════════════════════════════ */

const BINDO_DATA = {
  k7: {
    name: 'Bahasa Indonesia Kelas 7', icon: '📝', color: '#2471A3', colorLight: '#E8F4FD',
    desc: 'Teks deskripsi, teks narasi (cerita fantasi), teks prosedur, teks laporan observasi, puisi rakyat, surat.',
    chapters: [
      { id: 1, title: 'Teks Deskripsi', sem: 1,
        content: `<h3>A. Pengertian</h3><p><b>Teks deskripsi</b> menggambarkan objek (tempat, orang, benda) secara detail sehingga pembaca seolah melihat/mengalaminya sendiri.</p>
<h3>B. Struktur</h3><ol><li><b>Identifikasi:</b> pengenalan objek</li><li><b>Deskripsi bagian:</b> rincian ciri-ciri</li><li><b>Penutup:</b> kesan/pesan</li></ol>
<h3>C. Ciri Kebahasaan</h3><p>Kata sifat, kata konkret, kalimat bermajas (personifikasi, metafora), panca indera.</p>`,
        quiz: [{ q:'Teks yang menggambarkan objek secara detail disebut teks...', opts:['Narasi','Deskripsi','Prosedur','Eksposisi'], ans:1},{ q:'"Angin berbisik lembut" adalah majas...', opts:['Metafora','Personifikasi','Hiperbola','Ironi'], ans:1}]
      },
      { id: 2, title: 'Teks Narasi: Cerita Fantasi', sem: 1,
        content: `<h3>A. Teks Narasi</h3><p>Menceritakan rangkaian peristiwa secara kronologis. <b>Cerita fantasi:</b> narasi dengan unsur imajinatif/magis.</p>
<h3>B. Unsur Cerita</h3><p>Tema, tokoh & penokohan, alur (maju/mundur/campuran), latar (tempat, waktu, suasana), sudut pandang, amanat.</p>`,
        quiz: [{ q:'Unsur yang menceritakan watak tokoh disebut...', opts:['Tema','Alur','Penokohan','Amanat'], ans:2},{ q:'Pesan moral dalam cerita disebut...', opts:['Tema','Alur','Latar','Amanat'], ans:3}]
      },
      { id: 3, title: 'Teks Prosedur', sem: 2,
        content: `<h3>A. Pengertian</h3><p><b>Teks prosedur</b> berisi langkah-langkah untuk melakukan sesuatu. Tujuan: memberi petunjuk.</p>
<h3>B. Struktur</h3><ol><li><b>Tujuan</b></li><li><b>Alat & bahan</b></li><li><b>Langkah-langkah</b> (berurutan)</li><li><b>Penutup</b></li></ol>`,
        quiz: [{ q:'Teks yang berisi langkah-langkah disebut teks...', opts:['Deskripsi','Narasi','Prosedur','Eksplanasi'], ans:2}]
      },
      { id: 4, title: 'Teks Laporan Hasil Observasi', sem: 2,
        content: `<h3>A. Pengertian</h3><p><b>Teks LHO</b> menyajikan informasi hasil pengamatan secara sistematis dan objektif (berdasarkan fakta).</p>
<h3>B. Struktur</h3><p><b>Pernyataan umum</b> (klasifikasi) → <b>Deskripsi bagian</b> → <b>Simpulan</b>.</p>`,
        quiz: [{ q:'Teks LHO bersifat...', opts:['Subjektif','Objektif','Imajinatif','Fiktif'], ans:1}]
      },
      { id: 5, title: 'Puisi Rakyat (Pantun, Syair, Gurindam)', sem: 2,
        content: `<h3>A. Pantun</h3><p>4 baris, bersajak a-b-a-b. Baris 1-2 = sampiran, baris 3-4 = isi. Tiap baris 8-12 suku kata.</p>
<h3>B. Syair</h3><p>4 baris, bersajak a-a-a-a. Semua baris adalah isi (cerita/nasihat).</p>
<h3>C. Gurindam</h3><p>2 baris, bersajak a-a. Baris 1 = sebab, baris 2 = akibat. Berisi nasihat.</p>`,
        quiz: [{ q:'Pantun bersajak...', opts:['a-a-a-a','a-b-a-b','a-b-b-a','a-a-b-b'], ans:1},{ q:'Puisi 2 baris berisi nasihat disebut...', opts:['Pantun','Syair','Gurindam','Soneta'], ans:2}]
      },
      { id: 6, title: 'Surat Pribadi dan Surat Dinas', sem: 2,
        content: `<h3>A. Surat Pribadi</h3><p>Surat tidak resmi untuk keluarga/teman. Struktur: tempat & tanggal, salam pembuka, isi, salam penutup, tanda tangan.</p>
<h3>B. Surat Dinas</h3><p>Surat resmi dari instansi. Struktur: kop surat, nomor, lampiran, perihal, alamat tujuan, salam, isi, penutup, tanda tangan & stempel.</p>`,
        quiz: [{ q:'Kop surat hanya ada di...', opts:['Surat pribadi','Surat dinas','Keduanya','Bukan keduanya'], ans:1}]
      }
    ]
  },
  k8: {
    name: 'Bahasa Indonesia Kelas 8', icon: '📝', color: '#2471A3', colorLight: '#E8F4FD',
    desc: 'Teks berita, teks iklan/slogan/poster, teks eksposisi, teks puisi, teks eksplanasi, teks persuasi.',
    chapters: [
      { id: 1, title: 'Teks Berita', sem: 1,
        content: `<h3>A. Unsur Berita (5W+1H)</h3><p><b>What</b> (apa), <b>Who</b> (siapa), <b>When</b> (kapan), <b>Where</b> (di mana), <b>Why</b> (mengapa), <b>How</b> (bagaimana).</p>
<h3>B. Struktur</h3><p>Judul → Kepala berita (lead/teras) → Tubuh berita → Ekor berita. Piramida terbalik.</p>`,
        quiz: [{ q:'Unsur berita "siapa" dalam bahasa Inggris adalah...', opts:['What','Who','When','Why'], ans:1},{ q:'Struktur berita berbentuk...', opts:['Piramida','Piramida terbalik','Kronologis','Bebas'], ans:1}]
      },
      { id: 2, title: 'Teks Iklan, Slogan, dan Poster', sem: 1,
        content: `<h3>A. Iklan</h3><p>Teks persuasif yang menawarkan produk/jasa. Unsur: perhatian, minat, keinginan, tindakan (AIDA).</p>
<h3>B. Slogan</h3><p>Kalimat pendek yang mudah diingat. Contoh: "Bersih itu indah."</p>`,
        quiz: [{ q:'Teks persuasif penawaran produk disebut...', opts:['Poster','Iklan','Slogan','Spanduk'], ans:1}]
      },
      { id: 3, title: 'Teks Eksposisi', sem: 2,
        content: `<h3>A. Pengertian</h3><p><b>Teks eksposisi</b> memaparkan informasi untuk menambah wawasan. Struktur: tesis → argumentasi → penegasan ulang.</p>`,
        quiz: [{ q:'Bagian pembuka teks eksposisi disebut...', opts:['Argumentasi','Tesis','Penegasan','Simpulan'], ans:1}]
      },
      { id: 4, title: 'Puisi Modern', sem: 2,
        content: `<h3>A. Unsur Puisi</h3><p><b>Fisik:</b> diksi, imaji, majas, rima, tipografi. <b>Batin:</b> tema, rasa, nada, amanat.</p>`,
        quiz: [{ q:'Pilihan kata dalam puisi disebut...', opts:['Rima','Diksi','Majas','Nada'], ans:1}]
      },
      { id: 5, title: 'Teks Eksplanasi', sem: 2,
        content: `<h3>A. Pengertian</h3><p>Menjelaskan proses terjadinya fenomena alam/sosial. Struktur: pernyataan umum → deret penjelas → interpretasi.</p>`,
        quiz: [{ q:'Teks yang menjelaskan "mengapa" dan "bagaimana" disebut...', opts:['Eksposisi','Eksplanasi','Deskripsi','Prosedur'], ans:1}]
      },
      { id: 6, title: 'Teks Persuasi dan Pidato', sem: 2,
        content: `<h3>A. Teks Persuasi</h3><p>Bertujuan membujuk/memengaruhi pembaca. Struktur: pengenalan isu → rangkaian argumen → ajakan → penegasan kembali.</p>`,
        quiz: [{ q:'Teks yang bertujuan membujuk disebut...', opts:['Eksposisi','Deskripsi','Persuasi','Narasi'], ans:2}]
      }
    ]
  },
  k9: {
    name: 'Bahasa Indonesia Kelas 9', icon: '📝', color: '#2471A3', colorLight: '#E8F4FD',
    desc: 'Teks laporan percobaan, teks tanggapan, teks diskusi, teks cerita inspiratif, karya ilmiah, literasi digital.',
    chapters: [
      { id: 1, title: 'Teks Laporan Percobaan', sem: 1,
        content: `<h3>A. Struktur</h3><p>Tujuan → alat & bahan → langkah-langkah → hasil → simpulan.</p>`,
        quiz: [{ q:'Bagian "alat & bahan" termasuk struktur teks...', opts:['LHO','Percobaan','Prosedur','Eksplanasi'], ans:1}]
      },
      { id: 2, title: 'Teks Tanggapan', sem: 1,
        content: `<h3>A. Teks Tanggapan Kritis</h3><p>Berisi penilaian/pujian/kritik terhadap suatu karya. Struktur: evaluasi → deskripsi → penegasan ulang.</p>`,
        quiz: [{ q:'Teks berisi pujian dan kritik disebut teks...', opts:['Laporan','Tanggapan','Deskripsi','Eksposisi'], ans:1}]
      },
      { id: 3, title: 'Teks Diskusi', sem: 1,
        content: `<h3>A. Struktur</h3><p>Isu → argumen mendukung → argumen menentang → simpulan/rekomendasi.</p>`,
        quiz: [{ q:'Teks yang menyajikan pro-kontra disebut...', opts:['Eksposisi','Diskusi','Persuasi','Tanggapan'], ans:1}]
      },
      { id: 4, title: 'Teks Cerita Inspiratif', sem: 2,
        content: `<h3>A. Ciri</h3><p>Kisah nyata/fiktif yang mengandung nilai moral dan menginspirasi pembaca. Struktur: orientasi → komplikasi → resolusi → koda.</p>`,
        quiz: [{ q:'Bagian akhir cerita inspiratif yang berisi pesan moral disebut...', opts:['Orientasi','Komplikasi','Resolusi','Koda'], ans:3}]
      },
      { id: 5, title: 'Karya Ilmiah Sederhana', sem: 2,
        content: `<h3>A. Sistematika</h3><p>Judul → pendahuluan → tinjauan pustaka → metode → hasil & pembahasan → simpulan → daftar pustaka.</p>`,
        quiz: [{ q:'Bagian yang berisi sumber referensi adalah...', opts:['Pendahuluan','Metode','Simpulan','Daftar Pustaka'], ans:3}]
      },
      { id: 6, title: 'Literasi Digital dan Media Sosial', sem: 2,
        content: `<h3>A. Etika Bermedia Sosial</h3><p>THINK before posting: True, Helpful, Inspiring, Necessary, Kind. Hargai privasi, hindari ujaran kebencian, cek fakta.</p>`,
        quiz: [{ q:'THINK before posting. T = ...', opts:['Tell','True','Try','Take'], ans:1}]
      }
    ]
  },
  dragDrop: {
    k7: [{ title: 'Pasangkan Jenis Teks & Cirinya!', pairs: [
      { left: 'Deskripsi', right: 'Menggambarkan objek secara detail' },
      { left: 'Narasi', right: 'Menceritakan rangkaian peristiwa' },
      { left: 'Prosedur', right: 'Langkah-langkah melakukan sesuatu' },
      { left: 'Pantun', right: '4 baris, a-b-a-b, ada sampiran & isi' }
    ]}],
    k8: [{ title: 'Pasangkan Teks & Definisinya!', pairs: [
      { left: 'Berita', right: 'Informasi faktual aktual (5W+1H)' },
      { left: 'Iklan', right: 'Teks persuasif menawarkan produk' },
      { left: 'Eksplanasi', right: 'Menjelaskan proses fenomena' }
    ]}],
    k9: [{ title: 'Pasangkan Struktur Teks!', pairs: [
      { left: 'Diskusi', right: 'Isu → Argumen Pro-Kontra → Simpulan' },
      { left: 'Laporan Percobaan', right: 'Tujuan → Alat → Langkah → Hasil → Simpulan' }
    ]}]
  },
  fillBlank: { k7:{title:'✍️ Isian B.Indonesia K7',questions:[
    {q:'Pantun bersajak a-b-...',ans:['a-b']},{q:'Teks yang menggambarkan objek disebut teks...',ans:['deskripsi']}
  ]},k8:{title:'✍️ Isian B.Indonesia K8',questions:[
    {q:'Unsur berita: What, Who, When, Where, Why, ...',ans:['how']}
  ]},k9:{title:'✍️ Isian B.Indonesia K9',questions:[
    {q:'Bagian akhir cerita inspiratif disebut...',ans:['koda']}
  ]}},
  trueFalse: { k7:{title:'✅❌ B/S B.Indonesia K7',questions:[
    {q:'Gurindam terdiri dari 4 baris',ans:false,explanation:'Gurindam hanya 2 baris.'}
  ]},k8:{title:'✅❌ B/S B.Indonesia K8',questions:[
    {q:'Teks berita menggunakan piramida terbalik',ans:true}
  ]},k9:{title:'✅❌ B/S B.Indonesia K9',questions:[
    {q:'Teks diskusi hanya berisi argumen yang mendukung',ans:false,explanation:'Teks diskusi berisi pro DAN kontra.'}
  ]}},
  flashcards: { k7:{title:'🃏 Flashcard B.Indonesia K7',cards:[
    {front:'Majas Personifikasi',back:'Benda mati seolah hidup ("angin berbisik")'},
    {front:'Amanat',back:'Pesan moral yang ingin disampaikan penulis'}
  ]},k8:{title:'🃏 Flashcard B.Indonesia K8',cards:[
    {front:'5W+1H',back:'What, Who, When, Where, Why, How'},
    {front:'Slogan',back:'Kalimat pendek mudah diingat ("Bersih itu indah")'}
  ]},k9:{title:'🃏 Flashcard B.Indonesia K9',cards:[
    {front:'Koda',back:'Bagian akhir cerita inspiratif berisi pesan moral'},
    {front:'Daftar Pustaka',back:'Daftar sumber referensi dalam karya ilmiah'}
  ]}},
  glossary: [
    { term: 'Amanat', def: 'Pesan moral yang ingin disampaikan pengarang melalui karyanya.' },
    { term: 'Daftar Pustaka', def: 'Daftar sumber referensi yang digunakan dalam penulisan karya ilmiah.' },
    { term: 'Diksi', def: 'Pilihan kata yang digunakan pengarang dalam karya sastra.' },
    { term: 'Gurindam', def: 'Puisi lama dua baris, bersajak a-a, berisi nasihat (baris 1=sebab, baris 2=akibat).' },
    { term: 'Koda', def: 'Bagian akhir teks cerita inspiratif yang berisi pesan moral atau pelajaran.' },
    { term: 'Majas Personifikasi', def: 'Gaya bahasa yang memberikan sifat-sifat manusia pada benda mati ("angin berbisik").' },
    { term: 'Pantun', def: 'Puisi lama empat baris, bersajak a-b-a-b, baris 1-2=sampiran, baris 3-4=isi.' },
    { term: 'SDLC', def: 'Software Development Life Cycle — tahapan pengembangan perangkat lunak.' },
    { term: 'Syair', def: 'Puisi lama empat baris, bersajak a-a-a-a, semua baris adalah isi.' },
    { term: 'Teks Berita', def: 'Teks berisi informasi faktual dan aktual dengan unsur 5W+1H, struktur piramida terbalik.' },
    { term: 'Teks Deskripsi', def: 'Teks yang menggambarkan objek secara detail sehingga pembaca seolah melihat/mengalaminya.' },
    { term: 'Teks Diskusi', def: 'Teks yang menyajikan dua sudut pandang (pro dan kontra) tentang suatu isu.' },
    { term: 'Teks Eksplanasi', def: 'Teks yang menjelaskan proses terjadinya fenomena alam atau sosial (mengapa & bagaimana).' },
    { term: 'Teks Eksposisi', def: 'Teks yang memaparkan informasi untuk menambah wawasan pembaca.' },
    { term: 'Teks Persuasi', def: 'Teks yang bertujuan membujuk atau memengaruhi pembaca.' },
    { term: 'Teks Prosedur', def: 'Teks yang berisi langkah-langkah atau petunjuk untuk melakukan sesuatu.' }
  ]
};
