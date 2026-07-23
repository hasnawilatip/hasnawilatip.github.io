/* ══════════════════════════════════════════════════════════
   DATA IPS — SMP/MTs Kelas 7, 8, 9 (Kurikulum Merdeka)
   ══════════════════════════════════════════════════════════ */

const IPS_DATA = {
  k7: {
    name: 'IPS Kelas 7', icon: '🌍', color: '#8E44AD', colorLight: '#F3E8F8',
    desc: 'Interaksi sosial, kehidupan ekonomi, peta & geografi, sejarah kerajaan Nusantara.',
    chapters: [
      { id: 1, title: 'Interaksi Sosial dan Lembaga Sosial', sem: 1,
        content: `<h3>A. Interaksi Sosial</h3><p><b>Interaksi sosial</b> adalah hubungan timbal balik antar individu/kelompok. Syarat: kontak sosial dan komunikasi.</p>
<h3>B. Lembaga Sosial</h3><p>Keluarga, pendidikan, agama, ekonomi, politik. Fungsi: mengatur perilaku masyarakat.</p>`,
        quiz: [{ q:'Syarat interaksi sosial adalah...', opts:['Kontak & komunikasi','Uang & kuasa','Usia & gender','Jarak & waktu'], ans:0},{ q:'Lembaga sosial paling dasar adalah...', opts:['Sekolah','Keluarga','Pemerintah','Pasar'], ans:1}]
      },
      { id: 2, title: 'Kehidupan Ekonomi: Kebutuhan dan Kelangkaan', sem: 1,
        content: `<h3>A. Kebutuhan Manusia</h3><p>Primer (pokok): pangan, sandang, papan. Sekunder: pendidikan, hiburan. Tersier: barang mewah.</p>
<h3>B. Kelangkaan (Scarcity)</h3><p>Sumber daya terbatas, kebutuhan tak terbatas → <b>kelangkaan</b> → perlu skala prioritas.</p>`,
        quiz: [{ q:'Kebutuhan primer meliputi...', opts:['Mobil mewah','Pangan, sandang, papan','Liburan','Handphone'], ans:1},{ q:'Penyebab kelangkaan adalah...', opts:['Sumber daya terbatas','Uang terlalu banyak','Produksi berlebih','Konsumsi rendah'], ans:0}]
      },
      { id: 3, title: 'Peta, Atlas, dan Globe', sem: 2,
        content: `<h3>A. Komponen Peta</h3><p>Judul, skala, legenda, orientasi (mata angin), garis astronomis (lintang & bujur), inset.</p>
<h3>B. Letak Geografis Indonesia</h3><p>6°LU–11°LS, 95°BT–141°BT. Di antara 2 benua (Asia & Australia) dan 2 samudra (Pasifik & Hindia).</p>`,
        quiz: [{ q:'Garis khayal horizontal pada peta disebut...', opts:['Bujur','Lintang','Khatulistiwa','Meridian'], ans:1},{ q:'Indonesia terletak di antara dua benua yaitu...', opts:['Eropa & Afrika','Asia & Australia','Amerika & Asia','Australia & Eropa'], ans:1}]
      },
      { id: 4, title: 'Kerajaan Hindu-Buddha dan Islam di Nusantara', sem: 2,
        content: `<h3>A. Kerajaan Hindu-Buddha</h3><p>Kutai (tertua, Kaltim), Tarumanegara (Jabar), Sriwijaya (Sumatera, maritim), Majapahit (Jatim, terbesar, Gajah Mada & Sumpah Palapa).</p>
<h3>B. Kerajaan Islam</h3><p>Samudera Pasai (Aceh), Demak (Jateng, Raden Patah), Mataram Islam, Gowa-Tallo (Sulsel), Ternate & Tidore (Maluku).</p>`,
        quiz: [{ q:'Kerajaan Hindu tertua di Indonesia adalah...', opts:['Majapahit','Sriwijaya','Kutai','Tarumanegara'], ans:2},{ q:'Sumpah Palapa diucapkan oleh...', opts:['Hayam Wuruk','Gajah Mada','Raden Patah','Sultan Agung'], ans:1}]
      }
    ]
  },
  k8: {
    name: 'IPS Kelas 8', icon: '🌍', color: '#8E44AD', colorLight: '#F3E8F8',
    desc: 'Perubahan sosial, pembangunan ekonomi, ASEAN, kolonialisme & imperialisme, pergerakan nasional.',
    chapters: [
      { id: 1, title: 'Perubahan Sosial dan Globalisasi', sem: 1,
        content: `<h3>A. Perubahan Sosial</h3><p>Perubahan pada lembaga, nilai, dan pola perilaku masyarakat. Bisa direncanakan atau tidak.</p>
<h3>B. Globalisasi</h3><p>Proses mendunia: ekonomi, budaya, teknologi, komunikasi. Dampak +: akses informasi luas. Dampak −: budaya asing mengikis budaya lokal.</p>`,
        quiz: [{ q:'Proses mendunianya berbagai aspek disebut...', opts:['Modernisasi','Globalisasi','Urbanisasi','Industrialisasi'], ans:1}]
      },
      { id: 2, title: 'Pembangunan Ekonomi dan Perdagangan Internasional', sem: 1,
        content: `<h3>A. Pembangunan Ekonomi</h3><p>Proses meningkatkan pendapatan per kapita dan kesejahteraan. Indikator: PDB, IPM, tingkat kemiskinan.</p>
<h3>B. Ekspor & Impor</h3><p><b>Ekspor:</b> menjual barang ke luar negeri. <b>Impor:</b> membeli barang dari luar negeri.</p>`,
        quiz: [{ q:'Menjual barang ke luar negeri disebut...', opts:['Impor','Ekspor','Distribusi','Konsumsi'], ans:1}]
      },
      { id: 3, title: 'ASEAN dan Kerja Sama Internasional', sem: 2,
        content: `<h3>A. ASEAN</h3><p>10 negara Asia Tenggara. Didirikan 8 Agustus 1967 (Deklarasi Bangkok). 5 pendiri: Indonesia, Malaysia, Filipina, Singapura, Thailand.</p>`,
        quiz: [{ q:'ASEAN didirikan tahun...', opts:['1945','1967','1975','1990'], ans:1},{ q:'Bukan pendiri ASEAN:', opts:['Indonesia','Malaysia','Vietnam','Singapura'], ans:2}]
      },
      { id: 4, title: 'Kolonialisme, Imperialisme, dan Pergerakan Nasional', sem: 2,
        content: `<h3>A. Kolonialisme di Indonesia</h3><p>Portugis (1511), Belanda/VOC (1602), Inggris (1811–1816), Belanda kembali hingga 1942, Jepang (1942–1945).</p>
<h3>B. Pergerakan Nasional</h3><p>Budi Utomo (1908), Sumpah Pemuda (1928), BPUPKI, Proklamasi 17 Agustus 1945.</p>`,
        quiz: [{ q:'Organisasi pergerakan nasional pertama adalah...', opts:['Sarekat Islam','Budi Utomo','Muhammadiyah','PNI'], ans:1},{ q:'Sumpah Pemuda terjadi tahun...', opts:['1908','1928','1945','1966'], ans:1}]
      }
    ]
  },
  k9: {
    name: 'IPS Kelas 9', icon: '🌍', color: '#8E44AD', colorLight: '#F3E8F8',
    desc: 'Pasar bebas, ketenagakerjaan, kemerdekaan Indonesia, demokrasi, pembangunan berkelanjutan.',
    chapters: [
      { id: 1, title: 'Pasar Bebas dan Organisasi Perdagangan Dunia', sem: 1,
        content: `<h3>A. Pasar Bebas</h3><p>Perdagangan tanpa hambatan tarif/kuota. Contoh: MEA (Masyarakat Ekonomi ASEAN), AFTA, WTO.</p>`,
        quiz: [{ q:'MEA adalah singkatan dari...', opts:['Masyarakat Ekonomi Asia','Masyarakat Ekonomi ASEAN','Masyarakat Eropa Asia','Moneter Ekonomi ASEAN'], ans:1}]
      },
      { id: 2, title: 'Ketenagakerjaan dan Ekonomi Kreatif', sem: 1,
        content: `<h3>A. Tenaga Kerja</h3><p>Penduduk usia 15–64 tahun yang bekerja/mencari kerja. Masalah: pengangguran, rendahnya skill.</p>`,
        quiz: [{ q:'Penduduk yang tidak bekerja dan tidak mencari kerja disebut...', opts:['Pengangguran','Bukan angkatan kerja','Pekerja','Wirausaha'], ans:1}]
      },
      { id: 3, title: 'Indonesia dari Kemerdekaan hingga Reformasi', sem: 2,
        content: `<h3>A. Masa Awal Kemerdekaan</h3><p>Proklamasi 17 Agustus 1945. Agresi Militer Belanda I & II. Perjanjian Linggarjati, Renville, KMB (1949).</p>`,
        quiz: [{ q:'Proklamasi kemerdekaan Indonesia dibacakan tanggal...', opts:['17 Agustus 1945','18 Agustus 1945','17 Agustus 1946','1 Juni 1945'], ans:0}]
      },
      { id: 4, title: 'Pembangunan Berkelanjutan (SDGs)', sem: 2,
        content: `<h3>A. 17 Tujuan SDGs</h3><p>Tanpa kemiskinan, tanpa kelaparan, kesehatan, pendidikan berkualitas, kesetaraan gender, air bersih, energi bersih, dll.</p>`,
        quiz: [{ q:'SDGs memiliki berapa tujuan?', opts:['8','12','17','21'], ans:2},{ q:'SDGs singkatan dari...', opts:['Sustainable Development Goals','Social Development Groups','System Development Growth','Sustainable Digital Goals'], ans:0}]
      }
    ]
  },
  dragDrop: {
    k7: [{ title: 'Pasangkan Kerajaan & Lokasinya!', pairs: [
      { left: 'Kutai', right: 'Kalimantan Timur' },
      { left: 'Sriwijaya', right: 'Sumatera' },
      { left: 'Majapahit', right: 'Jawa Timur' },
      { left: 'Samudera Pasai', right: 'Aceh' }
    ]}],
    k8: [{ title: 'Pasangkan Tokoh & Perannya!', pairs: [
      { left: 'Gajah Mada', right: 'Mahapatih Majapahit' },
      { left: 'Soekarno', right: 'Proklamator RI' },
      { left: 'R.A. Kartini', right: 'Pahlawan emansipasi wanita' }
    ]}],
    k9: [{ title: 'Pasangkan Istilah Ekonomi!', pairs: [
      { left: 'Ekspor', right: 'Menjual barang ke luar negeri' },
      { left: 'Impor', right: 'Membeli barang dari luar negeri' },
      { left: 'Inflasi', right: 'Kenaikan harga barang secara umum' }
    ]}]
  },
  fillBlank: { k7:{title:'✍️ Isian IPS K7',questions:[
    {q:'Kerajaan maritim terbesar di Sumatera adalah...',ans:['sriwijaya']},
    {q:'Garis lintang 0° disebut garis...',ans:['khatulistiwa','equator']}
  ]},k8:{title:'✍️ Isian IPS K8',questions:[
    {q:'ASEAN didirikan pada tanggal 8 ... 1967',ans:['agustus']}
  ]},k9:{title:'✍️ Isian IPS K9',questions:[
    {q:'Proklamasi dibacakan pada 17 Agustus...',ans:['1945']}
  ]}},
  trueFalse: { k7:{title:'✅❌ B/S IPS K7',questions:[
    {q:'Indonesia terletak di antara 2 benua dan 2 samudra',ans:true},
    {q:'Kerajaan Kutai bercorak Islam',ans:false,explanation:'Kutai bercorak Hindu.'}
  ]},k8:{title:'✅❌ B/S IPS K8',questions:[
    {q:'Sumpah Pemuda terjadi tahun 1928',ans:true}
  ]},k9:{title:'✅❌ B/S IPS K9',questions:[
    {q:'Bukan angkatan kerja termasuk pengangguran',ans:false,explanation:'Bukan angkatan kerja = tidak bekerja & tidak mencari kerja.'}
  ]}},
  flashcards: { k7:{title:'🃏 Flashcard IPS K7',cards:[
    {front:'Skala Peta',back:'Perbandingan jarak di peta dengan jarak sebenarnya'},
    {front:'Letak Geografis',back:'Posisi suatu tempat berdasarkan kenyataan di permukaan bumi'},
    {front:'Primer',back:'Kebutuhan pokok: pangan, sandang, papan'}
  ]},k8:{title:'🃏 Flashcard IPS K8',cards:[
    {front:'Globalisasi',back:'Proses mendunianya aspek kehidupan'},
    {front:'ASEAN',back:'Association of Southeast Asian Nations (10 negara)'}
  ]},k9:{title:'🃏 Flashcard IPS K9',cards:[
    {front:'SDGs',back:'Sustainable Development Goals — 17 tujuan pembangunan berkelanjutan PBB'}
  ]}},
  glossary: [
    { term: 'ASEAN', def: 'Association of Southeast Asian Nations — organisasi 10 negara Asia Tenggara, didirikan 1967.' },
    { term: 'Budi Utomo', def: 'Organisasi pergerakan nasional pertama di Indonesia, didirikan 20 Mei 1908 (Hari Kebangkitan Nasional).' },
    { term: 'Ekspor', def: 'Kegiatan menjual barang atau jasa dari dalam negeri ke luar negeri.' },
    { term: 'Globalisasi', def: 'Proses mendunianya berbagai aspek kehidupan: ekonomi, budaya, teknologi, dan komunikasi.' },
    { term: 'Impor', def: 'Kegiatan membeli barang atau jasa dari luar negeri ke dalam negeri.' },
    { term: 'Inflasi', def: 'Kenaikan harga barang dan jasa secara umum dan terus-menerus.' },
    { term: 'Interaksi Sosial', def: 'Hubungan timbal balik antara individu dengan individu, individu dengan kelompok, atau kelompok dengan kelompok.' },
    { term: 'Kelangkaan (Scarcity)', def: 'Kondisi di mana sumber daya terbatas sementara kebutuhan manusia tidak terbatas.' },
    { term: 'Kolonialisme', def: 'Penguasaan suatu bangsa atas bangsa lain dengan tujuan mengeksploitasi sumber daya.' },
    { term: 'Letak Geografis', def: 'Posisi suatu tempat berdasarkan kenyataan di permukaan bumi (ditinjau dari wilayah sekitarnya).' },
    { term: 'MEA', def: 'Masyarakat Ekonomi ASEAN — pasar bebas di kawasan Asia Tenggara.' },
    { term: 'Proklamasi', def: 'Pernyataan kemerdekaan Indonesia pada 17 Agustus 1945 oleh Soekarno-Hatta.' },
    { term: 'SDGs', def: 'Sustainable Development Goals — 17 tujuan pembangunan berkelanjutan PBB hingga 2030.' },
    { term: 'Skala Peta', def: 'Perbandingan antara jarak di peta dengan jarak sebenarnya di lapangan.' },
    { term: 'Sumpah Pemuda', def: 'Ikrar pemuda Indonesia pada 28 Oktober 1928: satu nusa, satu bangsa, satu bahasa — Indonesia.' }
  ]
};
