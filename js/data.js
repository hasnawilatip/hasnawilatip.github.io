/* ══════════════════════════════════════════════════════════
   DATA — Konten Materi, Kuis, & Aktivitas untuk 3 Kelas
   ══════════════════════════════════════════════════════════ */

const INFORMATIKA_DATA = {

  // ─────────────────────────────────────────────
  // KELAS 7
  // ─────────────────────────────────────────────
  k7: {
    name: "Kelas 7",
    icon: "📗",
    color: "#1A56DB",
    colorLight: "#E8F0FE",
    desc: "Pengenalan 8 bidang Informatika, berpikir komputasional dasar, TIK, sistem komputer, jaringan, Scratch, dan etika digital.",
    semester1: "Semester 1 — Bab 1–4",
    semester2: "Semester 2 — Bab 5–9",
    chapters: [
      { id: 1, title: "Informatika dan Keterampilan Generik", sem: 1,
        content: `<h3>A. Pengertian Informatika</h3>
<p>Informatika adalah ilmu yang mempelajari tentang pengolahan informasi menggunakan komputer. Kata <b>informatika</b> berasal dari bahasa Prancis <i>informatique</i>, gabungan dari <i>information</i> (informasi) dan <i>automatique</i> (otomatis).</p>
<p>Informatika mencakup 8 bidang pengetahuan yang saling terkait:</p>
<ol><li><b>Berpikir Komputasional (BK)</b> — cara berpikir untuk memecahkan masalah</li>
<li><b>Teknologi Informasi dan Komunikasi (TIK)</b> — penggunaan tools digital</li>
<li><b>Sistem Komputer (SK)</b> — cara kerja komputer</li>
<li><b>Jaringan Komputer dan Internet (JKI)</b> — koneksi antar komputer</li>
<li><b>Analisis Data (AD)</b> — mengolah dan memaknai data</li>
<li><b>Algoritma dan Pemrograman (AP)</b> — membuat program</li>
<li><b>Dampak Sosial Informatika (DSI)</b> — etika dan tanggung jawab</li>
<li><b>Praktik Lintas Bidang (PLB)</b> — proyek gabungan</li></ol>

<div class="info-box"><span class="info-title">📌 Tahukah Kamu?</span> Delapan bidang ini bukan dipelajari terpisah, melainkan saling terhubung. Misalnya, saat membuat program (AP), kamu juga perlu berpikir komputasional (BK) dan menggunakan komputer (SK).</div>

<h3>B. Keterampilan Generik Informatika</h3>
<p>Selain 8 bidang pengetahuan, ada 7 keterampilan generik yang harus dikuasai:</p>
<ol><li><b>Membina budaya kerja masyarakat digital</b> — etika dalam tim</li>
<li><b>Berkolaborasi</b> — bekerja sama dalam tim</li>
<li><b>Mengomunikasikan hasil</b> — presentasi dan dokumentasi</li>
<li><b>Mengembangkan artefak komputasional</b> — membuat produk digital</li>
<li><b>Mengabstraksi</b> — menyederhanakan masalah kompleks</li>
<li><b>Mengelola proyek</b> — merencanakan dan mengatur waktu</li>
<li><b>Mengembangkan rencana pengujian</b> — menguji solusi</li></ol>`,

        quiz: [
          { q: "Apa kepanjangan dari TIK dalam 8 bidang informatika?", opts: ["Teknologi Informasi dan Komunikasi", "Teknik Informatika Komputer", "Teknologi Internet dan Komputer", "Telekomunikasi Informasi Komputer"], ans: 0 },
          { q: "Berapa jumlah bidang pengetahuan dalam Informatika?", opts: ["5", "6", "7", "8"], ans: 3 },
          { q: "Kata 'informatika' berasal dari bahasa...", opts: ["Inggris", "Jerman", "Prancis", "Yunani"], ans: 2 },
          { q: "Keterampilan 'bekerja sama dalam tim' disebut...", opts: ["Mengabstraksi", "Berkolaborasi", "Mengomunikasikan", "Mengelola proyek"], ans: 1 },
          { q: "Bidang yang mempelajari cara membuat program adalah...", opts: ["SK", "JKI", "AP", "DSI"], ans: 2 }
        ]
      },

      { id: 2, title: "Berpikir Komputasional", sem: 1,
        content: `<h3>A. Apa itu Berpikir Komputasional?</h3>
<p><b>Berpikir komputasional</b> adalah cara berpikir untuk memecahkan masalah dengan menggunakan konsep-konsep dalam ilmu komputer. BUKAN berpikir seperti komputer, melainkan berpikir seperti seorang <i>computer scientist</i>.</p>
<p>Ada 4 pilar utama:</p>
<ol><li><b>Dekomposisi</b> — memecah masalah besar menjadi bagian-bagian kecil</li>
<li><b>Pengenalan Pola</b> — mencari kesamaan atau pola</li>
<li><b>Abstraksi</b> — fokus pada hal penting, abaikan yang tidak relevan</li>
<li><b>Algoritma</b> — langkah-langkah logis untuk menyelesaikan masalah</li></ol>

<h3>B. Contoh Penerapan</h3>
<p><b>Contoh: Membuat Kue</b></p>
<ul><li><b>Dekomposisi:</b> Siapkan bahan → campur → panggang → hias</li>
<li><b>Pengenalan Pola:</b> Resep kue bolu mirip dengan resep muffin</li>
<li><b>Abstraksi:</b> Fokus pada takaran dan suhu, abaikan warna mangkuk</li>
<li><b>Algoritma:</b> Urutan langkah yang harus diikuti dengan tepat</li></ul>

<div class="info-box"><span class="info-title">📌 Tips:</span> 4 pilar ini bisa diterapkan untuk menyelesaikan masalah apa pun, bukan hanya soal komputer! Coba terapkan saat mengerjakan PR atau merencanakan acara.</div>`,

        quiz: [
          { q: "Memecah masalah besar menjadi bagian kecil disebut...", opts: ["Abstraksi", "Algoritma", "Dekomposisi", "Pengenalan Pola"], ans: 2 },
          { q: "Berapa pilar utama berpikir komputasional?", opts: ["3", "4", "5", "6"], ans: 1 },
          { q: "Mencari kesamaan antar masalah adalah...", opts: ["Dekomposisi", "Pengenalan Pola", "Abstraksi", "Algoritma"], ans: 1 },
          { q: "Langkah-langkah logis menyelesaikan masalah disebut...", opts: ["Dekomposisi", "Abstraksi", "Pengenalan Pola", "Algoritma"], ans: 3 }
        ]
      },

      { id: 3, title: "Teknologi Informasi dan Komunikasi (TIK)", sem: 1,
        content: `<h3>A. Pengertian TIK</h3>
<p><b>TIK</b> adalah semua teknologi yang berkaitan dengan pengambilan, pengolahan, penyimpanan, dan penyebaran informasi. TIK mencakup perangkat keras (hardware), perangkat lunak (software), dan jaringan.</p>

<h3>B. Perangkat Keras Komputer</h3>
<p>Komponen utama komputer:</p>
<ul><li><b>Input:</b> Keyboard, mouse, scanner, microphone, webcam</li>
<li><b>Proses:</b> CPU (Central Processing Unit) — otak komputer</li>
<li><b>Output:</b> Monitor, printer, speaker, headphone</li>
<li><b>Storage:</b> Hard disk, SSD, flash disk, memory card</li>
<li><b>Memory:</b> RAM (sementara), ROM (permanen)</li></ul>

<div class="info-box"><span class="info-title">📌 Analogi:</span> Bayangkan komputer seperti meja kerja. RAM = luas meja (semakin luas, semakin banyak yang bisa dikerjakan sekaligus). Hard disk = laci (tempat menyimpan permanen). CPU = kamu sendiri (yang mengerjakan semua).</div>

<h3>C. Perangkat Lunak</h3>
<ul><li><b>Sistem Operasi:</b> Windows, macOS, Linux, Android, iOS</li>
<li><b>Aplikasi Perkantoran:</b> Word, Excel, PowerPoint, Google Docs</li>
<li><b>Browser:</b> Chrome, Firefox, Edge</li>
<li><b>Aplikasi Khusus:</b> Scratch, Photoshop, VS Code</li></ul>`,

        quiz: [
          { q: "CPU adalah singkatan dari...", opts: ["Central Processing Unit", "Computer Personal Unit", "Central Program Utility", "Core Processing Unit"], ans: 0 },
          { q: "RAM termasuk jenis memori yang bersifat...", opts: ["Permanen", "Sementara", "Hanya baca", "Eksternal"], ans: 1 },
          { q: "Contoh perangkat input adalah...", opts: ["Monitor", "Printer", "Keyboard", "Speaker"], ans: 2 },
          { q: "Windows, macOS, dan Linux adalah contoh...", opts: ["Aplikasi", "Browser", "Sistem Operasi", "Game"], ans: 2 }
        ]
      },

      { id: 4, title: "Sistem Komputer", sem: 1,
        content: `<h3>A. Definisi Sistem Komputer</h3>
<p><b>Sistem komputer</b> adalah kumpulan perangkat keras, perangkat lunak, dan pengguna (brainware) yang bekerja bersama untuk mengolah data menjadi informasi.</p>

<h3>B. Komponen Sistem Komputer</h3>
<ol><li><b>Hardware (perangkat keras):</b> komponen fisik komputer</li>
<li><b>Software (perangkat lunak):</b> program/aplikasi</li>
<li><b>Brainware (pengguna):</b> manusia yang mengoperasikan</li></ol>

<h3>C. Cara Kerja Komputer</h3>
<p>Komputer bekerja dengan siklus: <b>Input → Proses → Output → Storage</b></p>
<p>Data dimasukkan melalui perangkat input → diolah CPU → hasil ditampilkan di perangkat output → dapat disimpan di media penyimpanan.</p>

<div class="info-box"><span class="info-title">📌 Fakta Menarik:</span> CPU modern bisa melakukan miliaran operasi per detik! Prosesor 3 GHz artinya bisa melakukan 3 miliar siklus dalam 1 detik.</div>`,

        quiz: [
          { q: "Tiga komponen utama sistem komputer adalah...", opts: ["CPU, RAM, Hard disk", "Hardware, Software, Brainware", "Input, Output, Storage", "Monitor, Keyboard, Mouse"], ans: 1 },
          { q: "Siklus kerja komputer yang benar adalah...", opts: ["Output → Input → Proses", "Input → Proses → Output", "Proses → Input → Output", "Storage → Input → Proses"], ans: 1 },
          { q: "Manusia yang mengoperasikan komputer disebut...", opts: ["Hardware", "Software", "Brainware", "Firmware"], ans: 2 }
        ]
      },

      { id: 5, title: "Jaringan Komputer dan Internet", sem: 2,
        content: `<h3>A. Pengertian Jaringan Komputer</h3>
<p><b>Jaringan komputer</b> adalah dua atau lebih komputer yang saling terhubung untuk berbagi data, resource, dan informasi.</p>

<h3>B. Jenis Jaringan Berdasarkan Jangkauan</h3>
<ul><li><b>PAN</b> (Personal Area Network): jangkauan beberapa meter (contoh: Bluetooth)</li>
<li><b>LAN</b> (Local Area Network): satu gedung/kampus (contoh: WiFi sekolah)</li>
<li><b>MAN</b> (Metropolitan Area Network): satu kota</li>
<li><b>WAN</b> (Wide Area Network): antar kota/negara (contoh: Internet)</li></ul>

<h3>C. Internet</h3>
<p>Internet adalah jaringan komputer terbesar di dunia yang menghubungkan miliaran perangkat. Internet bekerja dengan protokol <b>TCP/IP</b>.</p>
<p>Layanan di internet: World Wide Web (WWW), email, media sosial, streaming, cloud storage, dll.</p>

<div class="info-box"><span class="info-title">📌 Tahukah Kamu?</span> Internet dan WiFi itu berbeda! Internet = jaringan global. WiFi = teknologi nirkabel untuk menghubungkan perangkat ke jaringan lokal.</div>`,

        quiz: [
          { q: "LAN adalah singkatan dari...", opts: ["Large Area Network", "Local Area Network", "Long Area Network", "Linked Area Network"], ans: 1 },
          { q: "Jaringan dengan jangkauan satu kota disebut...", opts: ["PAN", "LAN", "MAN", "WAN"], ans: 2 },
          { q: "Internet menggunakan protokol...", opts: ["HTTP", "TCP/IP", "FTP", "SMTP"], ans: 1 }
        ]
      },

      { id: 6, title: "Analisis Data", sem: 2,
        content: `<h3>A. Apa itu Analisis Data?</h3>
<p><b>Analisis data</b> adalah proses mengumpulkan, membersihkan, mengolah, dan menginterpretasi data untuk mendapatkan informasi yang berguna.</p>

<h3>B. Tahapan Analisis Data</h3>
<ol><li><b>Pengumpulan data</b> — kuesioner, observasi, wawancara</li>
<li><b>Pembersihan data</b> — hapus data ganda, perbaiki kesalahan</li>
<li><b>Pengolahan data</b> — hitung rata-rata, urutkan, filter</li>
<li><b>Visualisasi</b> — buat grafik/diagram</li>
<li><b>Interpretasi</b> — tarik kesimpulan</li></ol>

<h3>C. Jenis Data</h3>
<ul><li><b>Data kualitatif:</b> data berupa kata/kategori (warna favorit, jenis kelamin)</li>
<li><b>Data kuantitatif:</b> data berupa angka (tinggi badan, nilai ujian)</li></ul>`,

        quiz: [
          { q: "Proses mengumpulkan, membersihkan, dan mengolah data disebut...", opts: ["Pemrograman", "Analisis Data", "Jaringan", "Abstraksi"], ans: 1 },
          { q: "Data berupa angka disebut data...", opts: ["Kualitatif", "Kuantitatif", "Primer", "Sekunder"], ans: 1 },
          { q: "Langkah pertama dalam analisis data adalah...", opts: ["Visualisasi", "Interpretasi", "Pengumpulan data", "Pembersihan data"], ans: 2 },
          { q: "Grafik batang, diagram lingkaran termasuk tahap...", opts: ["Pengumpulan", "Pembersihan", "Visualisasi", "Interpretasi"], ans: 2 }
        ]
      },

      { id: 7, title: "Algoritma dan Pemrograman", sem: 2,
        content: `<h3>A. Algoritma</h3>
<p><b>Algoritma</b> adalah urutan langkah-langkah logis dan sistematis untuk menyelesaikan suatu masalah. Ciri algoritma yang baik: <b>finiteness</b> (ada akhirnya), <b>definiteness</b> (jelas), <b>input & output</b> (ada masukan dan keluaran).</p>

<h3>B. Cara Merepresentasikan Algoritma</h3>
<ul><li><b>Deskriptif:</b> ditulis dengan kata-kata (pseudocode)</li>
<li><b>Flowchart:</b> diagram alir dengan simbol-simbol</li></ul>

<h3>C. Pemrograman dengan Scratch</h3>
<p>Scratch adalah bahasa pemrograman visual berbasis blok yang cocok untuk pemula. Konsep dasar: sprite (karakter), stage (panggung), blocks (perintah), script (rangkaian blok).</p>
<p>Konsep pemrograman di Scratch:</p>
<ul><li><b>Sequence:</b> menjalankan perintah berurutan</li>
<li><b>Loop:</b> mengulang perintah (forever, repeat)</li>
<li><b>Conditional:</b> percabangan (if-else)</li><li><b>Variable:</b> menyimpan nilai</li></ul>

<div class="info-box"><span class="info-title">📌 Tips:</span> Sebelum coding, biasakan menulis algoritma dulu. Ini disebut <b>pseudocode</b>. Dengan begitu, kamu sudah punya "resep" sebelum mulai "memasak" kode.</div>`,

        quiz: [
          { q: "Urutan langkah logis menyelesaikan masalah disebut...", opts: ["Variabel", "Algoritma", "Flowchart", "Program"], ans: 1 },
          { q: "Scratch menggunakan pemrograman berbasis...", opts: ["Teks", "Blok visual", "Command line", "Suara"], ans: 1 },
          { q: "Perulangan perintah dalam program disebut...", opts: ["Sequence", "Loop", "Conditional", "Variable"], ans: 1 },
          { q: "Simbol untuk percabangan (if-else) disebut...", opts: ["Loop", "Variable", "Conditional", "Function"], ans: 2 }
        ]
      },

      { id: 8, title: "Dampak Sosial Informatika", sem: 2, premium: true, cost: 2,
        content: `<h3>A. Dampak Positif Teknologi</h3>
<ul><li>Mempermudah komunikasi jarak jauh</li><li>Akses informasi tanpa batas</li><li>Meningkatkan efisiensi kerja dan belajar</li><li>Membuka peluang ekonomi digital</li><li>Mempercepat inovasi di berbagai bidang</li></ul>

<h3>B. Dampak Negatif Teknologi</h3>
<ul><li><b>Cyberbullying:</b> perundungan di dunia maya</li><li><b>Kecanduan gadget:</b> gangguan kesehatan mental & fisik</li><li><b>Hoax & misinformasi:</b> penyebaran berita palsu</li><li><b>Pelanggaran privasi:</b> data pribadi disalahgunakan</li><li><b>Kejahatan siber:</b> penipuan, hacking, phishing</li></ul>

<div class="info-box"><span class="info-title">📌 Ingat!</span> THINK sebelum posting: <b>T</b>rue (benarkah?), <b>H</b>elpful (bermanfaatkah?), <b>I</b>nspiring (menginspirasikah?), <b>N</b>ecessary (perlukah?), <b>K</b>ind (baikkah?).</div>`,

        quiz: [
          { q: "Perundungan di dunia maya disebut...", opts: ["Hacking", "Cyberbullying", "Phishing", "Spamming"], ans: 1 },
          { q: "THINK sebelum posting. Huruf T berarti...", opts: ["Trust", "True", "Tell", "Try"], ans: 1 },
          { q: "Berita palsu yang disebarkan disebut...", opts: ["Spam", "Hoax", "Virus", "Malware"], ans: 1 }
        ]
      },

      { id: 9, title: "Praktik Lintas Bidang", sem: 2, premium: true, cost: 3,
        content: `<h3>A. Apa itu Praktik Lintas Bidang?</h3>
<p>Praktik Lintas Bidang (PLB) adalah proyek yang menggabungkan beberapa bidang Informatika sekaligus. Siswa mengerjakan proyek nyata secara berkelompok.</p>

<h3>B. Contoh Proyek PLB Kelas 7</h3>
<ol><li><b>Presentasi Digital tentang Sekolah:</b> mengumpulkan data (AD), membuat slide (TIK), menyajikan (DSI), bekerja dalam tim (kolaborasi)</li>
<li><b>Game Sederhana dengan Scratch:</b> merancang algoritma (AP), berpikir komputasional (BK), mendesain karakter (kreativitas)</li>
<li><b>Poster Digital Keamanan Internet:</b> riset (AD), desain (TIK), edukasi (DSI)</li></ol>

<div class="activity-box"><span class="activity-title">✏️ Aktivitas:</span> Buatlah sebuah proyek Scratch sederhana bertema "Lingkungan Sekolahku" yang berisi: (1) minimal 2 sprite, (2) percakapan antar sprite, (3) perulangan, (4) percabangan.</div>`,

        quiz: [
          { q: "PLB adalah singkatan dari...", opts: ["Praktik Lintas Bidang", "Pembelajaran Luar Biasa", "Proyek Literasi Bangsa", "Program Latihan Bersama"], ans: 0 },
          { q: "Proyek PLB dikerjakan secara...", opts: ["Individu", "Berpasangan", "Berkelompok", "Mandiri di rumah"], ans: 2 }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // KELAS 8
  // ─────────────────────────────────────────────
  k8: {
    name: "Kelas 8",
    icon: "📘",
    color: "#0D8C24",
    colorLight: "#E6F4EA",
    desc: "Pendalaman strategi pemecahan masalah, logika & gerbang logika, aplikasi perkantoran mahir, basis data, HTML & Python dasar, UU ITE.",
    semester1: "Semester 1 — Bab 1–4",
    semester2: "Semester 2 — Bab 5–9",
    chapters: [
      { id: 1, title: "Informatika dan Strategi Pemecahan Masalah", sem: 1,
        content: `<h3>A. Informatika sebagai Problem Solver</h3>
<p>Informatika bukan hanya tentang komputer, tapi tentang cara berpikir dan alat untuk menyelesaikan berbagai masalah nyata.</p>
<p>Karakteristik solusi berbasis informatika: <b>efisien, efektif, skalabel, reusable, terukur.</b></p>

<h3>B. Strategi Pemecahan Masalah Kompleks</h3>
<table class="simple-table">
<tr><th>Strategi</th><th>Penjelasan</th><th>Contoh</th></tr>
<tr><td>Divide & Conquer</td><td>Memecah masalah besar → selesaikan satu per satu → gabungkan</td><td>Membuat website per bagian</td></tr>
<tr><td>Brute Force</td><td>Mencoba semua kemungkinan</td><td>Mencari password 4 digit</td></tr>
<tr><td>Greedy</td><td>Pilih opsi terbaik saat ini</td><td>Menukar uang dengan pecahan terbesar</td></tr>
<tr><td>Backtracking</td><td>Coba jalur, jika buntu mundur</td><td>Permainan Sudoku</td></tr>
<tr><td>Dynamic Programming</td><td>Simpan hasil, jangan hitung ulang</td><td>Deret Fibonacci</td></tr>
</table>

<div class="info-box"><span class="info-title">📌 Tips:</span> Tidak ada strategi terbaik untuk semua masalah. Semakin banyak strategi yang kamu kuasai, semakin banyak masalah yang bisa kamu selesaikan!</div>`,

        quiz: [
          { q: "Strategi memecah masalah besar menjadi kecil disebut...", opts: ["Brute Force", "Divide & Conquer", "Greedy", "Backtracking"], ans: 1 },
          { q: "Mencoba semua kemungkinan satu per satu adalah strategi...", opts: ["Divide & Conquer", "Greedy", "Brute Force", "Dynamic Programming"], ans: 2 },
          { q: "Strategi yang memilih opsi terbaik saat ini tanpa memikirkan masa depan adalah...", opts: ["Backtracking", "Dynamic Programming", "Brute Force", "Greedy"], ans: 3 },
          { q: "Berapa tahap dalam Design Thinking?", opts: ["3", "4", "5", "6"], ans: 2 }
        ]
      },

      { id: 2, title: "Berpikir Komputasional Tingkat Lanjut", sem: 1,
        content: `<h3>A. Dekomposisi dengan Dependensi</h3>
<p>Di kelas 8, dekomposisi tidak hanya memecah masalah, tapi juga memperhatikan <b>keterkaitan (dependensi)</b> antar sub-masalah. Beberapa sub-masalah tidak bisa dikerjakan sebelum yang lain selesai.</p>
<p><b>Contoh: Acara Sekolah</b> — Mencari dana harus selesai sebelum menyewa tempat dan menyiapkan konsumsi. Ini disebut <i>dependency graph</i>.</p>

<h3>B. Pengenalan Pola Lanjutan</h3>
<ul><li><b>Pola numerik:</b> Fibonacci (1,1,2,3,5,8,13,...), geometri, aritmatika bertingkat</li>
<li><b>Pola struktural:</b> susunan kalimat, kode program, arsitektur</li>
<li><b>Pola perilaku:</b> interaksi pengguna, lalu lintas, pola belanja</li></ul>

<h3>C. Abstraksi Berlapis</h3>
<p>Abstraksi bisa bertingkat-tingkat. Contoh: Google Maps — level kota (jalan utama), level jalan (detail), level bangunan (sangat detail).</p>`,

        quiz: [
          { q: "Ketergantungan antar sub-masalah disebut...", opts: ["Dekomposisi", "Abstraksi", "Dependensi", "Algoritma"], ans: 2 },
          { q: "Deret Fibonacci: 1, 1, 2, 3, 5, ... angka berikutnya?", opts: ["6", "7", "8", "9"], ans: 2 },
          { q: "Google Maps yang menampilkan level berbeda adalah contoh...", opts: ["Dekomposisi", "Pengenalan Pola", "Abstraksi Berlapis", "Algoritma"], ans: 2 }
        ]
      },

      { id: 3, title: "Aplikasi Perkantoran dan Multimedia", sem: 1,
        content: `<h3>A. Aplikasi Pengolah Kata (Word Processor)</h3>
<p>Fitur mahir: daftar isi otomatis, mail merge (surat massal), heading styles, table of figures, track changes, komentar.</p>

<h3>B. Aplikasi Pengolah Angka (Spreadsheet)</h3>
<p>Fitur mahir: rumus lanjutan (VLOOKUP, HLOOKUP, IF bertingkat), pivot table, chart/graph, conditional formatting, filter & sort.</p>
<p>Rumus penting: <b>=SUM(), =AVERAGE(), =COUNT(), =MAX(), =MIN(), =IF(), =VLOOKUP()</b></p>

<h3>C. Aplikasi Presentasi</h3>
<p>Fitur mahir: slide master, animasi & transisi, hyperlink, embedded media, presenter view.</p>

<div class="info-box"><span class="info-title">📌 Skill Penting:</span> Kemampuan menggunakan aplikasi perkantoran adalah salah satu skill digital paling dicari di dunia kerja. Kuasai minimal: Word, Excel, PowerPoint (atau Google Docs, Sheets, Slides).</div>`,

        quiz: [
          { q: "Fitur untuk membuat surat massal di Word disebut...", opts: ["Track Changes", "Mail Merge", "Table of Contents", "Header & Footer"], ans: 1 },
          { q: "Rumus Excel untuk mencari nilai dalam tabel secara vertikal adalah...", opts: ["=SUM()", "=IF()", "=VLOOKUP()", "=AVERAGE()"], ans: 2 },
          { q: "Pivot Table adalah fitur di aplikasi...", opts: ["Word", "Excel", "PowerPoint", "Photoshop"], ans: 1 }
        ]
      },

      { id: 4, title: "Logika Proposisi & Gerbang Logika", sem: 1,
        content: `<h3>A. Logika Proposisi</h3>
<p><b>Proposisi</b> adalah pernyataan yang bernilai TRUE (benar) atau FALSE (salah), tidak bisa keduanya.</p>
<p>Operator logika: <b>AND</b> (∧), <b>OR</b> (∨), <b>NOT</b> (¬).</p>

<h3>B. Gerbang Logika (Logic Gates)</h3>
<p>Gerbang logika adalah rangkaian elektronik yang menerapkan fungsi logika boolean. Gerbang dasar:</p>
<ul><li><b>AND:</b> output TRUE jika SEMUA input TRUE</li>
<li><b>OR:</b> output TRUE jika MINIMAL SATU input TRUE</li>
<li><b>NOT:</b> output kebalikan dari input</li>
<li><b>NAND:</b> kebalikan dari AND</li>
<li><b>NOR:</b> kebalikan dari OR</li>
<li><b>XOR:</b> output TRUE jika input BERBEDA</li></ul>

<div class="info-box"><span class="info-title">📌 Fakta:</span> Seluruh komputer modern dibangun dari milyaran gerbang logika yang disusun menjadi transistor di dalam chip prosesor!</div>`,

        quiz: [
          { q: "Pernyataan yang hanya bernilai TRUE atau FALSE disebut...", opts: ["Variabel", "Proposisi", "Fungsi", "Konstanta"], ans: 1 },
          { q: "Gerbang AND menghasilkan TRUE jika...", opts: ["Salah satu input TRUE", "Semua input TRUE", "Semua input FALSE", "Input berbeda"], ans: 1 },
          { q: "Gerbang NOT berfungsi untuk...", opts: ["Menjumlahkan", "Membalikkan nilai", "Mengalikan", "Membandingkan"], ans: 1 }
        ]
      },

      { id: 5, title: "Jaringan Komputer, Protokol & Keamanan Siber", sem: 2,
        content: `<h3>A. Protokol Jaringan</h3>
<p>Protokol adalah aturan komunikasi antar komputer. Protokol penting: <b>HTTP/HTTPS</b> (web), <b>FTP</b> (transfer file), <b>SMTP/POP3</b> (email), <b>DNS</b> (penerjemah domain ke IP).</p>

<h3>B. Keamanan Siber Dasar</h3>
<ul><li><b>Password kuat:</b> panjang, campuran huruf-angka-simbol, unik tiap akun</li>
<li><b>2FA (Two-Factor Authentication):</b> lapisan keamanan tambahan</li>
<li><b>Phishing:</b> penipuan yang mengaku sebagai pihak terpercaya</li>
<li><b>Malware:</b> virus, worm, trojan, ransomware</li>
<li><b>Firewall:</b> tembok pelindung jaringan</li></ul>

<div class="info-box"><span class="info-title">📌 Tips Keamanan:</span> (1) Jangan gunakan password yang sama untuk semua akun. (2) Aktifkan 2FA. (3) Jangan klik link mencurigakan. (4) Selalu logout dari komputer umum.</div>`,

        quiz: [
          { q: "HTTPS adalah singkatan dari...", opts: ["HyperText Transfer Protocol Secure", "High Tech Transfer Protocol System", "Hyper Transfer Text Protocol Safe", "Host Transfer Technology Protocol"], ans: 0 },
          { q: "Penipuan yang mengaku sebagai pihak terpercaya disebut...", opts: ["Malware", "Phishing", "Spamming", "Hacking"], ans: 1 },
          { q: "2FA adalah singkatan dari...", opts: ["Two Factor Authentication", "Two File Archive", "Third Factor Access", "Triple Firewall Activation"], ans: 0 }
        ]
      },

      { id: 6, title: "Analisis Data dan Basis Data Sederhana", sem: 2,
        content: `<h3>A. Analisis Data Kompleks</h3>
<p>Di kelas 8, analisis data melibatkan data yang lebih banyak dan beragam. Menggunakan ukuran statistik: <b>mean</b> (rata-rata), <b>median</b> (nilai tengah), <b>modus</b> (nilai paling sering muncul).</p>

<h3>B. Basis Data Sederhana</h3>
<p><b>Basis data (database)</b> adalah kumpulan data yang terorganisir. Komponen: <b>tabel</b> (kumpulan data), <b>record/baris</b> (satu entri), <b>field/kolom</b> (satu jenis data).</p>
<p>Contoh tabel "Siswa": NISN, Nama, Kelas, Alamat, Tanggal_Lahir.</p>
<p><b>Primary Key:</b> field unik untuk mengidentifikasi setiap record (contoh: NISN).</p>

<div class="info-box"><span class="info-title">📌 Contoh SQL Sederhana:</span> <code>SELECT Nama, Kelas FROM Siswa WHERE Kelas = '8A';</code> — artinya: tampilkan Nama dan Kelas dari tabel Siswa yang kelasnya 8A.</div>`,

        quiz: [
          { q: "Nilai tengah dari sekumpulan data disebut...", opts: ["Mean", "Median", "Modus", "Range"], ans: 1 },
          { q: "Field unik untuk mengidentifikasi record disebut...", opts: ["Foreign Key", "Primary Key", "Unique Key", "Index Key"], ans: 1 },
          { q: "Satu baris data dalam tabel database disebut...", opts: ["Field", "Record", "Column", "Table"], ans: 1 }
        ]
      },

      { id: 7, title: "Algoritma & Pemrograman Lanjutan (Scratch, HTML, Python)", sem: 2,
        content: `<h3>A. Scratch Tingkat Lanjut</h3>
<p>Konsep lanjutan: <b>broadcast</b> (mengirim pesan antar sprite), <b>clone</b> (menggandakan sprite), <b>list</b> (kumpulan data), <b>custom blocks</b> (fungsi buatan sendiri).</p>

<h3>B. Pengantar HTML</h3>
<p>HTML (HyperText Markup Language) adalah bahasa untuk membuat halaman web. Struktur dasar:</p>
<pre style="background:#f0f0f0;padding:10px;border-radius:6px;font-size:0.85rem;">&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;&lt;title&gt;Judul&lt;/title&gt;&lt;/head&gt;
&lt;body&gt;
  &lt;h1&gt;Halo Dunia!&lt;/h1&gt;
  &lt;p&gt;Ini paragraf pertama.&lt;/p&gt;
&lt;/body&gt;
&lt;/html&gt;</pre>

<h3>C. Pengantar Python</h3>
<p>Python adalah bahasa pemrograman populer yang mudah dipelajari. Contoh:</p>
<pre style="background:#1a1a2e;color:#00FF88;padding:10px;border-radius:6px;font-size:0.85rem;"># Program pertama
nama = input("Siapa namamu? ")
print("Halo, " + nama + "! Selamat belajar!")</pre>`,

        quiz: [
          { q: "HTML adalah singkatan dari...", opts: ["HyperText Markup Language", "High Tech Modern Language", "Hyper Transfer Markup Language", "Home Tool Markup Language"], ans: 0 },
          { q: "Tag untuk judul besar di HTML adalah...", opts: ["&lt;p&gt;", "&lt;title&gt;", "&lt;h1&gt;", "&lt;head&gt;"], ans: 2 },
          { q: "Fungsi Python untuk menampilkan output adalah...", opts: ["input()", "print()", "display()", "show()"], ans: 1 },
          { q: "Di Scratch, mengirim pesan antar sprite menggunakan...", opts: ["Clone", "Broadcast", "List", "Variable"], ans: 1 }
        ]
      },

      { id: 8, title: "Etika Digital, Keamanan Data & UU ITE", sem: 2,
        content: `<h3>A. Etika Digital</h3>
<p>Etika digital adalah aturan berperilaku di dunia digital: hormati privasi orang lain, jangan menyebar hoax, hargai hak cipta, gunakan bahasa sopan.</p>

<h3>B. UU ITE (Undang-Undang Informasi dan Transaksi Elektronik)</h3>
<p>UU No. 11 Tahun 2008 (diperbarui UU No. 19 Tahun 2016) mengatur tentang informasi dan transaksi elektronik di Indonesia.</p>
<p>Pasal penting yang perlu diketahui pelajar:</p>
<ul><li><b>Pasal 27:</b> larangan mendistribusikan konten melanggar kesusilaan, perjudian, pencemaran nama baik, pemerasan</li>
<li><b>Pasal 28:</b> larangan menyebar berita bohong (hoax) dan ujaran kebencian (SARA)</li>
<li><b>Pasal 30:</b> larangan mengakses sistem orang lain tanpa izin (hacking)</li></ul>

<div class="info-box"><span class="info-title">⚠️ Peringatan:</span> Pelanggaran UU ITE bisa berakibat pidana penjara dan/atau denda. Berpikirlah sebelum posting. Jejak digital itu permanen!</div>`,

        quiz: [
          { q: "UU ITE mengatur tentang...", opts: ["Informasi dan Transaksi Elektronik", "Internet dan Teknologi Edukasi", "Ilmu Teknologi Elektro", "Industri Telekomunikasi Elektronik"], ans: 0 },
          { q: "Pasal yang melarang penyebaran hoax adalah...", opts: ["Pasal 27", "Pasal 28", "Pasal 29", "Pasal 30"], ans: 1 },
          { q: "Mengakses sistem orang lain tanpa izin termasuk pelanggaran pasal...", opts: ["Pasal 27", "Pasal 28", "Pasal 29", "Pasal 30"], ans: 3 }
        ]
      },

      { id: 9, title: "Proyek Kolaboratif Digital", sem: 2,
        content: `<h3>A. Proyek Kolaboratif</h3>
<p>Proyek akhir kelas 8 adalah proyek kolaboratif yang menggabungkan berbagai bidang Informatika. Dikerjakan dalam tim 3-4 orang.</p>

<h3>B. Contoh Proyek</h3>
<ol><li><b>Website Sederhana:</b> HTML + CSS tentang profil sekolah atau topik tertentu</li>
<li><b>Game Scratch Kompleks:</b> game dengan scoring, multiple level, broadcast & clone</li>
<li><b>Analisis Data Sederhana:</b> survei → analisis → grafik → presentasi</li>
<li><b>Kampanye Keamanan Digital:</b> poster, video pendek, atau presentasi tentang etika digital</li></ol>

<div class="activity-box"><span class="activity-title">✏️ Proyek Akhir:</span> Buat website HTML sederhana bertema "Keamanan Digital untuk Remaja" yang berisi: (1) minimal 3 halaman, (2) heading & paragraf, (3) gambar, (4) daftar/list, (5) link antar halaman.</div>`,

        quiz: [
          { q: "Proyek akhir kelas 8 dikerjakan dalam tim berjumlah...", opts: ["1-2 orang", "3-4 orang", "5-6 orang", "Seluruh kelas"], ans: 1 },
          { q: "Website dibuat dengan bahasa...", opts: ["Python", "Scratch", "HTML", "Excel"], ans: 2 }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // KELAS 9
  // ─────────────────────────────────────────────
  k9: {
    name: "Kelas 9",
    icon: "📙",
    color: "#8B008B",
    colorLight: "#F3E8F3",
    desc: "Teknologi masa depan: AI, IoT, Big Data, Cloud Computing, aplikasi mobile/web, Python lanjutan, keamanan siber & forensik digital, proyek capstone.",
    semester1: "Semester 1 — Bab 1–4",
    semester2: "Semester 2 — Bab 5–9",
    chapters: [
      { id: 1, title: "Informatika untuk Masa Depan", sem: 1,
        content: `<h3>A. Perjalanan Informatika dari Kelas 7 ke 9</h3>
<table class="simple-table">
<tr><th>Kelas</th><th>Fokus</th><th>Kompetensi Utama</th></tr>
<tr><td>7</td><td>Pengenalan 8 bidang</td><td>Memahami konsep dasar, menggunakan tools digital</td></tr>
<tr><td>8</td><td>Pendalaman & perluasan</td><td>Menerapkan konsep pada masalah kompleks</td></tr>
<tr><td>9</td><td>Teknologi masa depan</td><td>Mengintegrasikan kompetensi, siap ke SMA/SMK</td></tr>
</table>

<h3>B. Peta Karir IT</h3>
<table class="simple-table">
<tr><th>Bidang</th><th>Contoh Profesi</th></tr>
<tr><td>Software Development</td><td>Software Engineer, Web Developer, Mobile Developer</td></tr>
<tr><td>Data Science & AI</td><td>Data Scientist, AI Engineer, ML Engineer</td></tr>
<tr><td>Cybersecurity</td><td>Security Analyst, Ethical Hacker</td></tr>
<tr><td>Cloud & Infrastruktur</td><td>Cloud Engineer, DevOps, Network Admin</td></tr>
<tr><td>UI/UX Design</td><td>UI/UX Designer, Product Designer</td></tr>
<tr><td>IoT & Robotics</td><td>IoT Engineer, Robotics Engineer</td></tr>
</table>

<h3>C. Teknologi Masa Depan (Overview)</h3>
<p>Di kelas 9, kamu akan menjelajahi teknologi masa depan yang menjadi tren global:</p>
<ul><li><b>AI (Kecerdasan Buatan):</b> mesin yang bisa belajar dan berpikir seperti manusia</li>
<li><b>IoT (Internet of Things):</b> benda sehari-hari yang terhubung dan berkomunikasi via internet</li>
<li><b>Cloud Computing:</b> komputasi dan penyimpanan berbasis internet (server jarak jauh)</li>
<li><b>Big Data:</b> pengolahan dan analisis data dalam skala masif</li></ul>

<div class="info-box"><span class="info-title">📌 Tahukah Kamu?</span> 85% pekerjaan di tahun 2030 belum ditemukan saat ini. Sebagian besar akan membutuhkan keterampilan digital!</div>`,

        quiz: [
          { q: "Profesi yang membuat aplikasi dan website disebut...", opts: ["Data Scientist", "Software Engineer", "Network Admin", "UI Designer"], ans: 1 },
          { q: "Ethical Hacker bekerja di bidang...", opts: ["Software Development", "Data Science", "Cybersecurity", "Cloud"], ans: 2 },
          { q: "Profesi yang fokus pada tampilan dan pengalaman pengguna adalah...", opts: ["Web Developer", "Data Scientist", "UI/UX Designer", "Cloud Engineer"], ans: 2 },
          { q: "Berapa persen pekerjaan 2030 yang belum ditemukan saat ini?", opts: ["50%", "65%", "75%", "85%"], ans: 3 }
        ]
      },

      { id: 2, title: "Berpikir Komputasional untuk Optimasi", sem: 1,
        content: `<h3>A. Optimasi dalam Komputasi</h3>
<p><b>Optimasi</b> adalah proses membuat sesuatu menjadi seefektif dan seefisien mungkin. Dalam informatika, optimasi berarti mencari solusi TERBAIK, bukan sekadar solusi.</p>

<h3>B. Algoritma Pencarian (Searching)</h3>
<ul><li><b>Linear Search:</b> cek satu per satu dari awal → O(n), lambat untuk data banyak</li>
<li><b>Binary Search:</b> data harus terurut → O(log n), sangat cepat</li></ul>

<h3>C. Algoritma Pengurutan (Sorting)</h3>
<ul><li><b>Bubble Sort:</b> bandingkan & tukar berulang → O(n²), sederhana tapi lambat</li>
<li><b>Selection Sort:</b> cari terkecil, taruh di depan → O(n²)</li>
<li><b>Insertion Sort:</b> sisipkan di posisi tepat → O(n²), cepat untuk data hampir terurut</li>
<li><b>Quick Sort:</b> divide & conquer → O(n log n), sangat cepat</li></ul>

<div class="info-box"><span class="info-title">📌 Big O Notation:</span> Notasi untuk mengukur efisiensi algoritma. O(1) = paling cepat (langsung), O(n) = linear, O(n²) = kuadratik (lambat), O(log n) = logaritmik (sangat cepat).</div>`,

        quiz: [
          { q: "Algoritma pencarian yang memerlukan data terurut adalah...", opts: ["Linear Search", "Binary Search", "Bubble Search", "Quick Search"], ans: 1 },
          { q: "Big O notation untuk Binary Search adalah...", opts: ["O(n)", "O(n²)", "O(log n)", "O(1)"], ans: 2 },
          { q: "Algoritma sorting paling cepat untuk data besar adalah...", opts: ["Bubble Sort", "Selection Sort", "Insertion Sort", "Quick Sort"], ans: 3 }
        ]
      },

      { id: 3, title: "Aplikasi Mobile dan Web", sem: 1,
        content: `<h3>A. Aplikasi Mobile vs Web</h3>
<p><b>Aplikasi mobile</b> adalah program yang berjalan di smartphone/tablet (Android/iOS). <b>Aplikasi web</b> adalah program yang diakses melalui browser (Chrome, Firefox, Safari).</p>
<p>Perbedaan utama:</p>
<ul><li><b>Mobile App:</b> di-install via Play Store/App Store, bisa offline, bisa akses hardware (kamera, GPS, sensor)</li>
<li><b>Web App:</b> diakses via URL, perlu koneksi internet, tidak perlu install, otomatis update, multiplatform</li></ul>

<h3>B. Desain UI/UX</h3>
<p><b>UI (User Interface):</b> tampilan visual — warna, tombol, ikon, tipografi, layout. <b>UX (User Experience):</b> pengalaman pengguna — mudah digunakan, intuitif, nyaman, efisien.</p>
<p>Prinsip desain aplikasi yang baik:</p>
<ul><li><b>Sederhana:</b> tidak berlebihan, fokus pada fungsi utama</li>
<li><b>Konsisten:</b> warna, ikon, dan navigasi seragam</li>
<li><b>Responsif:</b> tampilan menyesuaikan ukuran layar</li>
<li><b>Aksesibel:</b> bisa digunakan semua orang, termasuk difabel</li></ul>

<h3>C. Alur Pengembangan (SDLC)</h3>
<p><b>Software Development Life Cycle</b> — tahapan membuat aplikasi:</p>
<ol><li><b>Planning:</b> menentukan tujuan, target pengguna, dan fitur</li>
<li><b>Design:</b> membuat wireframe, mockup, dan prototype (Figma, Canva)</li>
<li><b>Development:</b> coding front-end (HTML/CSS/JS) dan back-end (Python/Node.js)</li>
<li><b>Testing:</b> menguji bug, error, dan keamanan</li>
<li><b>Deployment:</b> merilis aplikasi ke pengguna (hosting / app store)</li>
<li><b>Maintenance:</b> perbaikan bug, update fitur, dan peningkatan</li></ol>

<div class="info-box"><span class="info-title">📌 Tools Populer:</span> <b>Figma</b> — desain UI/UX profesional (gratis untuk pelajar). <b>Canva</b> — desain cepat dan mudah. Coba buat mockup aplikasi idemu!</div>`,

        quiz: [
          { q: "UI adalah singkatan dari...", opts: ["User Interface", "User Interaction", "Universal Input", "Unified Integration"], ans: 0 },
          { q: "Aplikasi yang diakses via browser tanpa install disebut...", opts: ["Mobile App", "Web App", "Desktop App", "Native App"], ans: 1 },
          { q: "Tahap pertama dalam SDLC adalah...", opts: ["Design", "Testing", "Planning", "Deployment"], ans: 2 },
          { q: "Tools populer untuk desain UI/UX adalah...", opts: ["VS Code", "Figma", "Python", "Excel"], ans: 1 }
        ]
      },

      { id: 4, title: "Kecerdasan Buatan (AI) dan Machine Learning", sem: 1,
        content: `<h3>A. Apa itu AI?</h3>
<p><b>Artificial Intelligence (AI)</b> atau Kecerdasan Buatan adalah kemampuan mesin untuk meniru kecerdasan manusia: belajar, bernalar, memecahkan masalah, memahami bahasa, dan mengenali pola.</p>

<h3>B. Jenis-jenis AI</h3>
<ul><li><b>Narrow AI (ANI):</b> AI untuk tugas spesifik (asisten virtual, rekomendasi, mobil otonom) — inilah AI yang ada saat ini</li>
<li><b>General AI (AGI):</b> AI setara manusia (belum tercapai)</li>
<li><b>Super AI (ASI):</b> AI melampaui manusia (masih fiksi ilmiah)</li></ul>

<h3>C. Machine Learning (Pembelajaran Mesin)</h3>
<p>ML adalah cabang AI di mana komputer BELAJAR dari data tanpa diprogram secara eksplisit.</p>
<ul><li><b>Supervised Learning:</b> belajar dari data berlabel</li>
<li><b>Unsupervised Learning:</b> belajar dari data tanpa label</li>
<li><b>Reinforcement Learning:</b> belajar dari trial & error</li></ul>

<div class="info-box"><span class="info-title">📌 Contoh AI di Sekitar Kita:</span> Google Translate, rekomendasi YouTube, filter spam email, Face ID, asisten Google/Siri, ChatGPT, kamera AI di smartphone.</div>`,

        quiz: [
          { q: "AI yang hanya bisa melakukan tugas spesifik disebut...", opts: ["AGI", "ASI", "Narrow AI", "General AI"], ans: 2 },
          { q: "Cabang AI di mana komputer belajar dari data disebut...", opts: ["Deep Learning", "Machine Learning", "Neural Network", "Expert System"], ans: 1 },
          { q: "Metode ML yang belajar dari data berlabel adalah...", opts: ["Unsupervised Learning", "Supervised Learning", "Reinforcement Learning", "Transfer Learning"], ans: 1 }
        ]
      },

      { id: 5, title: "Internet of Things (IoT)", sem: 2,
        content: `<h3>A. Apa itu IoT?</h3>
<p><b>Internet of Things (IoT)</b> adalah konsep di mana benda-benda fisik (things) terhubung ke internet dan bisa saling berkomunikasi serta bertukar data tanpa campur tangan manusia.</p>
<p>IoT = Sensor + Konektivitas + Pengolahan Data + Aksi.</p>

<h3>B. Komponen Sistem IoT</h3>
<ol><li><b>Sensor:</b> mengumpulkan data dari lingkungan (suhu, cahaya, gerak, kelembaban, tekanan)</li>
<li><b>Mikrokontroler:</b> otak kecil pemroses data — Arduino, ESP32, Raspberry Pi, NodeMCU</li>
<li><b>Konektivitas:</b> WiFi, Bluetooth, LoRa, Zigbee, NB-IoT, 5G</li>
<li><b>Cloud/Platform:</b> tempat data dikirim, disimpan, dan diolah (ThingSpeak, Blynk, Firebase)</li>
<li><b>Aktuator:</b> komponen yang melakukan aksi (motor, lampu, pompa, relay)</li>
<li><b>Aplikasi Pengguna:</b> dashboard/tampilan untuk monitoring dan kontrol</li></ol>

<h3>C. Contoh Aplikasi IoT</h3>
<ul><li><b>Smart Home:</b> lampu & AC otomatis, kunci pintu digital, kamera keamanan</li>
<li><b>Smart Farming:</b> penyiraman tanaman otomatis berdasarkan kelembaban tanah</li>
<li><b>Wearable Tech:</b> smartwatch, fitness tracker untuk monitoring kesehatan</li>
<li><b>Smart City:</b> lampu lalu lintas adaptif, smart parking, tempat sampah pintar</li>
<li><b>Industri 4.0:</b> pabrik dengan mesin-mesin terhubung untuk efisiensi</li></ul>

<div class="info-box"><span class="info-title">📌 Coba Sendiri:</span> Dengan Arduino Uno + sensor suhu DHT11 + modul WiFi ESP8266, kamu bisa membuat alat monitoring suhu ruangan yang datanya tampil di smartphone!</div>`,

        quiz: [
          { q: "IoT adalah singkatan dari...", opts: ["Internet of Technology", "Internet of Things", "Integration of Tools", "Intelligent Online Terminal"], ans: 1 },
          { q: "Mikrokontroler populer untuk proyek IoT pelajar adalah...", opts: ["Intel Core i7", "Arduino", "NVIDIA RTX", "AMD Ryzen"], ans: 1 },
          { q: "Komponen IoT yang mengumpulkan data dari lingkungan disebut...", opts: ["Aktuator", "Sensor", "Router", "Server"], ans: 1 },
          { q: "Komponen IoT yang melakukan aksi (misal: menyalakan lampu) disebut...", opts: ["Sensor", "Cloud", "Aktuator", "Router"], ans: 2 }
        ]
      },

      { id: 6, title: "Analisis Data Lanjutan", sem: 2,
        content: `<h3>A. Cloud Computing</h3>
<p><b>Cloud computing</b> adalah penyimpanan dan pengolahan data melalui internet (server jarak jauh). Ibarat "menyewa" komputer super canggih lewat internet.</p>
<p>Model layanan cloud:</p>
<ul><li><b>IaaS</b> (Infrastructure as a Service): menyewa infrastruktur (server, storage) — contoh: AWS, Google Cloud</li>
<li><b>PaaS</b> (Platform as a Service): menyewa platform pengembangan — contoh: Google Colab, Heroku</li>
<li><b>SaaS</b> (Software as a Service): software siap pakai — contoh: Google Drive, Gmail, Canva</li></ul>

<h3>B. Big Data</h3>
<p><b>Big Data</b> adalah data dalam jumlah sangat besar yang tidak bisa diolah dengan cara biasa. Karakteristik <b>5V</b>:</p>
<ul><li><b>Volume:</b> jumlah data sangat besar (terabyte–petabyte)</li>
<li><b>Velocity:</b> data mengalir sangat cepat (real-time)</li>
<li><b>Variety:</b> beragam jenis (teks, gambar, video, suara, sensor)</li>
<li><b>Veracity:</b> ketidakpastian/kualitas data</li>
<li><b>Value:</b> nilai/manfaat dari data</li></ul>
<p>Contoh Big Data: data media sosial, transaksi e-commerce, data sensor IoT, data GPS.</p>

<h3>C. Python untuk Analisis Data</h3>
<p>Library Python populer untuk data science:</p>
<ul><li><b>pandas:</b> pengolahan dan analisis data tabular (DataFrame)</li>
<li><b>numpy:</b> komputasi numerik dan matriks</li>
<li><b>matplotlib & seaborn:</b> visualisasi data (grafik, chart)</li></ul>

<h3>D. Visualisasi Data</h3>
<p>Jenis grafik dan kegunaannya:</p>
<ul><li><b>Bar chart:</b> membandingkan kategori</li>
<li><b>Line chart:</b> menunjukkan tren/perubahan waktu</li>
<li><b>Pie chart:</b> menunjukkan proporsi/bagian dari keseluruhan</li>
<li><b>Scatter plot:</b> menunjukkan hubungan/korelasi dua variabel</li>
<li><b>Histogram:</b> menunjukkan distribusi frekuensi data</li></ul>

<div class="info-box"><span class="info-title">📌 Ingat:</span> Pilih jenis grafik sesuai cerita yang ingin disampaikan. Grafik yang salah bisa menyesatkan! Big Data butuh tools khusus seperti Hadoop dan Spark.</div>`,

        quiz: [
          { q: "Google Drive adalah contoh layanan cloud model...", opts: ["IaaS", "PaaS", "SaaS", "DaaS"], ans: 2 },
          { q: "Karakteristik Big Data dikenal dengan istilah...", opts: ["3V", "4V", "5V", "6V"], ans: 2 },
          { q: "Library Python untuk pengolahan data adalah...", opts: ["flask", "pandas", "django", "turtle"], ans: 1 },
          { q: "Grafik untuk menunjukkan tren waktu adalah...", opts: ["Bar chart", "Pie chart", "Line chart", "Histogram"], ans: 2 }
        ]
      },

      { id: 7, title: "Pemrograman Python Lanjutan", sem: 2,
        content: `<h3>A. Struktur Data Python</h3>
<p>Python menyediakan struktur data bawaan yang sangat berguna:</p>
<ul><li><b>List:</b> kumpulan data terurut, bisa diubah — <code>['apel', 'jeruk', 'mangga']</code></li>
<li><b>Tuple:</b> kumpulan data terurut, TIDAK bisa diubah — <code>(10, 20, 30)</code></li>
<li><b>Dictionary:</b> kumpulan pasangan key:value — <code>{'nama': 'Budi', 'usia': 15}</code></li>
<li><b>Set:</b> kumpulan data unik, tidak terurut — <code>{1, 2, 3, 4}</code></li></ul>

<h3>B. Fungsi (Function)</h3>
<p>Fungsi adalah blok kode yang bisa dipanggil berulang. Dibuat dengan keyword <b>def</b>:</p>
<pre style="background:#1a1a2e;color:#00FF88;padding:10px;border-radius:6px;font-size:0.85rem;">def sapa(nama):
    return f"Halo, {nama}! Selamat belajar Python."

# Memanggil fungsi
print(sapa("Rina"))  # Output: Halo, Rina!</pre>

<h3>C. Perulangan & Percabangan</h3>
<ul><li><b>for loop:</b> mengulang sejumlah tertentu atau setiap elemen</li>
<li><b>while loop:</b> mengulang selama kondisi TRUE</li>
<li><b>if-elif-else:</b> pengambilan keputusan bercabang</li></ul>

<h3>D. Contoh Program: Kalkulator</h3>
<pre style="background:#1a1a2e;color:#00FF88;padding:10px;border-radius:6px;font-size:0.85rem;">def kalkulator():
    print("=== KALKULATOR ===")
    a = float(input("Angka pertama: "))
    op = input("Operator (+, -, *, /): ")
    b = float(input("Angka kedua: "))
    
    if op == '+':   hasil = a + b
    elif op == '-': hasil = a - b
    elif op == '*': hasil = a * b
    elif op == '/': hasil = a / b if b != 0 else "Error!"
    else: hasil = "Operator tidak valid"
    
    print(f"Hasil: {hasil}")

kalkulator()</pre>

<div class="info-box"><span class="info-title">📌 Tips Python:</span> Gunakan <b>f-string</b> (f"...") untuk format teks yang rapi. Gunakan <b>try-except</b> untuk menangani error. Latihan membuat program kecil setiap hari!</div>`,

        quiz: [
          { q: "Keyword Python untuk membuat fungsi adalah...", opts: ["function", "def", "func", "define"], ans: 1 },
          { q: "Struktur data Python untuk pasangan key:value adalah...", opts: ["List", "Tuple", "Dictionary", "Set"], ans: 2 },
          { q: "Untuk mengulang setiap elemen dalam list, gunakan...", opts: ["if", "def", "for", "class"], ans: 2 },
          { q: "Fungsi bawaan Python untuk menampilkan output adalah...", opts: ["input()", "print()", "len()", "type()"], ans: 1 }
        ]
      },

      { id: 8, title: "Keamanan Siber dan Forensik Digital", sem: 2,
        content: `<h3>A. Keamanan Siber Lanjutan</h3>
<ul><li><b>Enkripsi:</b> mengubah data menjadi kode rahasia</li>
<li><b>VPN:</b> jaringan pribadi virtual untuk koneksi aman</li>
<li><b>Digital signature:</b> tanda tangan elektronik untuk verifikasi</li>
<li><b>Penetration testing:</b> menguji keamanan sistem</li></ul>

<h3>B. Forensik Digital</h3>
<p><b>Forensik digital</b> adalah ilmu mengumpulkan, menganalisis, dan melaporkan bukti digital untuk keperluan hukum.</p>
<p>Tahapan: <b>Identification → Preservation → Analysis → Documentation → Presentation</b></p>

<div class="info-box"><span class="info-title">⚠️ Etika:</span> Keahlian keamanan siber HARUS digunakan secara etis dan legal. Menggunakan skill hacking untuk kejahatan adalah tindakan kriminal!</div>`,

        quiz: [
          { q: "Mengubah data menjadi kode rahasia disebut...", opts: ["Dekripsi", "Enkripsi", "Kompresi", "Encoding"], ans: 1 },
          { q: "VPN adalah singkatan dari...", opts: ["Very Private Network", "Virtual Private Network", "Verified Public Node", "Visual Protocol Name"], ans: 1 },
          { q: "Ilmu mengumpulkan bukti digital untuk hukum disebut...", opts: ["Cybersecurity", "Forensik Digital", "Data Science", "Cloud Computing"], ans: 1 }
        ]
      },

      { id: 9, title: "Proyek Capstone Informatika", sem: 2,
        content: `<h3>A. Apa itu Proyek Capstone?</h3>
<p>Proyek Capstone adalah proyek puncak yang mengintegrasikan SEMUA keterampilan informatika yang telah dipelajari selama 3 tahun. Dikerjakan secara individu atau tim kecil.</p>

<h3>B. Ide Proyek Capstone</h3>
<ol><li><b>Aplikasi Web Sederhana:</b> sistem perpustakaan, katalog produk, blog pribadi (HTML+CSS+JS+Python Flask)</li>
<li><b>Proyek IoT:</b> monitoring suhu & kelembaban dengan Arduino + dashboard web</li>
<li><b>Game Edukasi:</b> game pembelajaran dengan Scratch/Python + elemen AI sederhana</li>
<li><b>Analisis Data:</b> riset data (media sosial, lingkungan) + visualisasi + rekomendasi</li>
<li><b>Chatbot Sederhana:</b> bot tanya-jawab dengan Python + AI API</li></ol>

<div class="activity-box"><span class="activity-title">✏️ Tugas Capstone:</span> Pilih salah satu ide di atas (atau ide sendiri). Buat: (1) Proposal proyek, (2) Prototipe/produk, (3) Dokumentasi, (4) Presentasi akhir. Kumpulkan dalam bentuk portofolio digital.</div>`,

        quiz: [
          { q: "Proyek puncak yang mengintegrasikan semua keterampilan disebut...", opts: ["Proyek Akhir", "Proyek Capstone", "Proyek Mandiri", "Proyek Skripsi"], ans: 1 },
          { q: "Untuk proyek IoT monitoring suhu, mikrokontroler yang cocok adalah...", opts: ["Keyboard", "Mouse", "Arduino", "Printer"], ans: 2 }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────
  // FILL IN THE BLANK (per kelas)
  // ─────────────────────────────────────────────
  fillBlank: {
    k7: {
      title: '✍️ Isian Singkat — Kelas 7',
      questions: [
        { q: 'Kepanjangan dari TIK adalah Teknologi ... dan Komunikasi', ans: ['informasi'], hint: '8 huruf, diawali huruf I' },
        { q: 'Jumlah bidang pengetahuan dalam Informatika ada ...', ans: ['8', 'delapan'] },
        { q: 'Memecah masalah besar menjadi bagian kecil disebut ...', ans: ['dekomposisi'] },
        { q: 'Bahasa pemrograman visual berbasis blok untuk pemula adalah ...', ans: ['scratch'] },
        { q: 'Jaringan dengan jangkauan satu gedung disebut ...', ans: ['lan', 'local area network'] },
        { q: 'Perangkat keras yang berfungsi sebagai otak komputer adalah ...', ans: ['cpu', 'central processing unit'] },
        { q: 'Data berupa angka disebut data ...', ans: ['kuantitatif'] },
        { q: 'Langkah-langkah logis menyelesaikan masalah disebut ...', ans: ['algoritma'] }
      ]
    },
    k8: {
      title: '✍️ Isian Singkat — Kelas 8',
      questions: [
        { q: 'Strategi memecah masalah besar menjadi kecil disebut Divide & ...', ans: ['conquer'] },
        { q: 'Protokol web yang aman (terenkripsi) adalah ...', ans: ['https'] },
        { q: 'Fitur Excel untuk mencari nilai dalam tabel adalah ...', ans: ['vlookup'] },
        { q: 'Penipuan online yang mengaku pihak terpercaya disebut ...', ans: ['phishing'] },
        { q: 'Bahasa untuk membuat struktur halaman web adalah ...', ans: ['html'] },
        { q: 'Field unik pengidentifikasi record dalam database disebut ...', ans: ['primary key'] },
        { q: 'UU yang mengatur informasi dan transaksi elektronik adalah UU ...', ans: ['ite'] },
        { q: 'Fitur Word untuk membuat surat massal adalah ...', ans: ['mail merge'] }
      ]
    },
    k9: {
      title: '✍️ Isian Singkat — Kelas 9',
      questions: [
        { q: 'IoT adalah singkatan dari Internet of ...', ans: ['things'] },
        { q: 'AI adalah singkatan dari Artificial ...', ans: ['intelligence'] },
        { q: 'Library Python untuk pengolahan data adalah ...', ans: ['pandas'] },
        { q: 'Google Drive adalah contoh layanan cloud model ...', ans: ['saas'] },
        { q: 'Mikrokontroler populer untuk proyek IoT adalah ...', ans: ['arduino'] },
        { q: 'UI adalah singkatan dari User ...', ans: ['interface'] },
        { q: 'Tools desain UI/UX profesional adalah ...', ans: ['figma'] },
        { q: 'Keyword Python untuk membuat fungsi adalah ...', ans: ['def'] }
      ]
    }
  },

  // ─────────────────────────────────────────────
  // TRUE / FALSE (per kelas)
  // ─────────────────────────────────────────────
  trueFalse: {
    k7: {
      title: '✅❌ Benar atau Salah — Kelas 7',
      questions: [
        { q: 'Informatika hanya mempelajari cara menggunakan komputer.', ans: false, explanation: 'Informatika mencakup 8 bidang, bukan hanya penggunaan komputer.' },
        { q: 'RAM adalah memori sementara yang akan hilang saat komputer dimatikan.', ans: true, explanation: 'RAM (Random Access Memory) bersifat volatile.' },
        { q: 'Internet dan WiFi adalah hal yang sama.', ans: false, explanation: 'Internet adalah jaringan global, WiFi adalah teknologi nirkabel lokal.' },
        { q: 'Scratch menggunakan pemrograman berbasis blok visual.', ans: true, explanation: 'Scratch memang menggunakan blok visual, cocok untuk pemula.' },
        { q: 'Berpikir komputasional hanya bisa digunakan untuk masalah komputer.', ans: false, explanation: 'Bisa digunakan untuk berbagai masalah sehari-hari.' },
        { q: 'CPU adalah singkatan dari Central Processing Unit.', ans: true, explanation: 'CPU memang Central Processing Unit.' },
        { q: 'Brainware adalah komponen perangkat keras komputer.', ans: false, explanation: 'Brainware adalah manusia/pengguna, bukan hardware.' },
        { q: 'Data kualitatif adalah data berupa angka.', ans: false, explanation: 'Data kualitatif berupa kata/kategori, kuantitatif yang berupa angka.' }
      ]
    },
    k8: {
      title: '✅❌ Benar atau Salah — Kelas 8',
      questions: [
        { q: 'Brute Force adalah strategi mencoba semua kemungkinan satu per satu.', ans: true, explanation: 'Benar, brute force mencoba semua kemungkinan.' },
        { q: 'HTTP dan HTTPS adalah protokol yang sama persis.', ans: false, explanation: 'HTTPS memiliki enkripsi SSL/TLS, HTTP tidak.' },
        { q: 'Mail Merge adalah fitur untuk membuat surat massal di Word.', ans: true, explanation: 'Mail Merge memang untuk surat massal.' },
        { q: 'Gerbang AND menghasilkan TRUE jika minimal satu input TRUE.', ans: false, explanation: 'AND butuh SEMUA input TRUE. Yang minimal satu itu OR.' },
        { q: 'Python adalah bahasa pemrograman tingkat tinggi.', ans: true, explanation: 'Python adalah high-level programming language.' },
        { q: 'Primary Key boleh memiliki nilai yang sama antar record.', ans: false, explanation: 'Primary Key harus UNIK untuk setiap record.' },
        { q: 'Phishing adalah teknik pencurian data dengan menyamar sebagai pihak terpercaya.', ans: true, explanation: 'Benar, phishing memang menyamar sebagai pihak terpercaya.' },
        { q: 'Tag &lt;h1&gt; di HTML digunakan untuk membuat paragraf.', ans: false, explanation: '&lt;h1&gt; untuk heading/judul, &lt;p&gt; untuk paragraf.' }
      ]
    },
    k9: {
      title: '✅❌ Benar atau Salah — Kelas 9',
      questions: [
        { q: 'IoT memungkinkan benda fisik terhubung dan berkomunikasi lewat internet.', ans: true, explanation: 'Benar, itulah definisi IoT.' },
        { q: 'Narrow AI adalah AI yang bisa melakukan semua tugas seperti manusia.', ans: false, explanation: 'Narrow AI hanya untuk tugas spesifik. Yang seperti manusia itu AGI.' },
        { q: 'Cloud computing berarti menyimpan data di server jarak jauh melalui internet.', ans: true, explanation: 'Benar, data disimpan di server remote.' },
        { q: 'Binary Search bisa digunakan pada data yang belum terurut.', ans: false, explanation: 'Binary Search MEMBUTUHKAN data terurut.' },
        { q: 'Big O notation O(log n) lebih cepat dari O(n) untuk data besar.', ans: true, explanation: 'O(log n) memang jauh lebih cepat dari O(n).' },
        { q: 'Pandas adalah library Python untuk web development.', ans: false, explanation: 'Pandas untuk analisis data. Flask/Django untuk web.' },
        { q: 'Enkripsi mengubah data menjadi kode rahasia yang hanya bisa dibaca dengan kunci.', ans: true, explanation: 'Benar, itulah prinsip enkripsi.' },
        { q: 'VPN adalah singkatan dari Very Private Network.', ans: false, explanation: 'VPN = Virtual Private Network.' }
      ]
    }
  },

  // ─────────────────────────────────────────────
  // FLASHCARDS (per kelas)
  // ─────────────────────────────────────────────
  flashcards: {
    k7: {
      title: '🃏 Flashcards — Kelas 7',
      cards: [
        { front: 'Informatika', back: 'Ilmu yang mempelajari pengolahan informasi menggunakan komputer' },
        { front: 'Dekomposisi', back: 'Memecah masalah besar menjadi bagian-bagian kecil' },
        { front: 'Abstraksi', back: 'Fokus pada hal penting, mengabaikan yang tidak relevan' },
        { front: 'Algoritma', back: 'Urutan langkah-langkah logis untuk menyelesaikan masalah' },
        { front: 'CPU', back: 'Central Processing Unit — otak komputer yang memproses data' },
        { front: 'RAM', back: 'Random Access Memory — memori sementara komputer' },
        { front: 'LAN', back: 'Local Area Network — jaringan dalam satu gedung/kampus' },
        { front: 'WAN', back: 'Wide Area Network — jaringan antar kota/negara' },
        { front: 'Scratch', back: 'Bahasa pemrograman visual berbasis blok untuk pemula' },
        { front: 'Brainware', back: 'Manusia yang mengoperasikan komputer' },
        { front: 'Cyberbullying', back: 'Perundungan yang terjadi di dunia maya' },
        { front: 'Hoax', back: 'Berita palsu yang disebarkan dengan sengaja' }
      ]
    },
    k8: {
      title: '🃏 Flashcards — Kelas 8',
      cards: [
        { front: 'Divide & Conquer', back: 'Strategi memecah masalah besar → selesaikan → gabungkan' },
        { front: 'Brute Force', back: 'Mencoba semua kemungkinan satu per satu' },
        { front: 'Greedy', back: 'Memilih opsi terbaik saat ini tanpa memikirkan masa depan' },
        { front: 'Backtracking', back: 'Mencoba jalur, jika buntu mundur ke langkah sebelumnya' },
        { front: 'Proposisi', back: 'Pernyataan yang hanya bernilai TRUE atau FALSE' },
        { front: 'Gerbang AND', back: 'Gerbang logika: output TRUE jika SEMUA input TRUE' },
        { front: 'Gerbang OR', back: 'Gerbang logika: output TRUE jika MINIMAL SATU input TRUE' },
        { front: 'Phishing', back: 'Penipuan online yang menyamar sebagai pihak terpercaya' },
        { front: 'Primary Key', back: 'Field unik untuk mengidentifikasi setiap record di database' },
        { front: 'VLOOKUP', back: 'Rumus Excel untuk mencari nilai dalam tabel secara vertikal' },
        { front: 'HTML', back: 'HyperText Markup Language — bahasa untuk struktur halaman web' },
        { front: 'UU ITE', back: 'Undang-Undang yang mengatur Informasi dan Transaksi Elektronik' }
      ]
    },
    k9: {
      title: '🃏 Flashcards — Kelas 9',
      cards: [
        { front: 'IoT', back: 'Internet of Things — benda fisik terhubung internet & saling berkomunikasi' },
        { front: 'AI / Kecerdasan Buatan', back: 'Kemampuan mesin meniru kecerdasan manusia (belajar, bernalar, dll)' },
        { front: 'Machine Learning', back: 'Cabang AI: komputer belajar dari data tanpa diprogram eksplisit' },
        { front: 'Cloud Computing', back: 'Penyimpanan & pengolahan data melalui server jarak jauh (internet)' },
        { front: 'Big Data', back: 'Data dalam jumlah sangat besar dengan karakteristik 5V' },
        { front: 'Linear Search', back: 'Pencarian dengan mengecek satu per satu — O(n)' },
        { front: 'Binary Search', back: 'Pencarian dengan membagi dua — O(log n), data harus terurut' },
        { front: 'Enkripsi', back: 'Mengubah data menjadi kode rahasia yang butuh kunci untuk membaca' },
        { front: 'Forensik Digital', back: 'Ilmu mengumpulkan & menganalisis bukti digital untuk keperluan hukum' },
        { front: 'SaaS', back: 'Software as a Service — software siap pakai via cloud (contoh: Google Drive)' },
        { front: 'Pandas', back: 'Library Python untuk pengolahan dan analisis data' },
        { front: 'Flask', back: 'Framework Python untuk web development (back-end)' }
      ]
    }
  },

  // ─────────────────────────────────────────────
  // CODE PUZZLE (Susun Kode)
  // ─────────────────────────────────────────────
  codePuzzle: [
    {
      title: '🧩 Susun Algoritma — Membuat Teh',
      desc: 'Susun langkah membuat teh dengan urutan yang benar!',
      blocks: ['Tuang air panas ke cangkir', 'Masukkan gula (opsional)', 'Siapkan cangkir dan teh celup', 'Aduk hingga larut', 'Masukkan teh celup ke cangkir', 'Teh siap diminum!'],
      order: ['Siapkan cangkir dan teh celup', 'Masukkan teh celup ke cangkir', 'Tuang air panas ke cangkir', 'Masukkan gula (opsional)', 'Aduk hingga larut', 'Teh siap diminum!']
    },
    {
      title: '🧩 Susun Kode — Alur Login',
      desc: 'Susun alur program login dengan urutan yang benar!',
      blocks: ['Tampilkan "Login Berhasil"', 'Minta input username & password', 'Tampilkan "Password salah!"', 'Cek apakah password benar?', 'Masuk ke halaman utama'],
      order: ['Minta input username & password', 'Cek apakah password benar?', 'Tampilkan "Login Berhasil"', 'Masuk ke halaman utama', 'Tampilkan "Password salah!"']
    },
    {
      title: '🧩 Susun Kode — Alur Scratch Sederhana',
      desc: 'Susun blok Scratch: sprite kucing berjalan 10 langkah lalu mengeong!',
      blocks: ['Bersuara "Meong"', 'Mulai saat bendera hijau diklik', 'Berjalan 10 langkah', 'Berhenti'],
      order: ['Mulai saat bendera hijau diklik', 'Berjalan 10 langkah', 'Bersuara "Meong"', 'Berhenti']
    }
  ],

  // ─────────────────────────────────────────────
  // CROSSWORD (Teka-Teki Silang)
  // ─────────────────────────────────────────────
  crossword: {
    title: '🔤 Teka-Teki Silang Informatika',
    size: 10,
    words: [
      { word: 'ALGORITMA', clue: 'Urutan langkah logis menyelesaikan masalah', row: 0, col: 0, direction: 'across' },
      { word: 'INTERNET', clue: 'Jaringan komputer terbesar di dunia', row: 2, col: 2, direction: 'across' },
      { word: 'SCRATCH', clue: 'Bahasa pemrograman visual berbasis blok', row: 4, col: 1, direction: 'across' },
      { word: 'DATABASE', clue: 'Kumpulan data yang terorganisir', row: 6, col: 0, direction: 'across' },
      { word: 'PYTHON', clue: 'Bahasa pemrograman populer, mudah dipelajari', row: 8, col: 2, direction: 'across' },
      { word: 'AI', clue: 'Kecerdasan Buatan (singkatan Inggris)', row: 0, col: 6, direction: 'down' },
      { word: 'CPU', clue: 'Otak komputer (singkatan)', row: 2, col: 8, direction: 'down' },
      { word: 'LAN', clue: 'Jaringan area lokal (singkatan)', row: 4, col: 5, direction: 'down' }
    ]
  },

  // ─────────────────────────────────────────────
  // GLOSSARY (Kamus Istilah)
  // ─────────────────────────────────────────────
  glossary: [
    { term: 'Abstraksi', def: 'Proses menyederhanakan masalah dengan fokus pada hal penting dan mengabaikan detail yang tidak relevan.' },
    { term: 'AI (Artificial Intelligence)', def: 'Kecerdasan Buatan — kemampuan mesin untuk meniru kecerdasan manusia.' },
    { term: 'Algoritma', def: 'Urutan langkah-langkah logis dan sistematis untuk menyelesaikan suatu masalah.' },
    { term: 'Analisis Data', def: 'Proses mengumpulkan, membersihkan, mengolah, dan menginterpretasi data.' },
    { term: 'Big Data', def: 'Data dalam jumlah sangat besar yang tidak bisa diolah dengan cara biasa (karakteristik 5V).' },
    { term: 'Binary Search', def: 'Algoritma pencarian dengan membagi dua — O(log n), membutuhkan data terurut.' },
    { term: 'Brainware', def: 'Manusia yang mengoperasikan, mengelola, dan menggunakan sistem komputer.' },
    { term: 'Caesar Cipher', def: 'Teknik enkripsi kuno dengan menggeser setiap huruf sejumlah posisi tertentu dalam alfabet.' },
    { term: 'Cloud Computing', def: 'Penyimpanan dan pengolahan data melalui internet (server jarak jauh).' },
    { term: 'CPU (Central Processing Unit)', def: 'Otak komputer yang mengeksekusi instruksi dan memproses data.' },
    { term: 'Cyberbullying', def: 'Perundungan atau pelecehan yang terjadi di dunia maya/menggunakan teknologi digital.' },
    { term: 'Database', def: 'Kumpulan data yang terorganisir, biasanya dalam bentuk tabel-tabel yang saling terkait.' },
    { term: 'Dekomposisi', def: 'Memecah masalah besar menjadi bagian-bagian kecil yang lebih mudah diselesaikan.' },
    { term: 'Divide & Conquer', def: 'Strategi pemecahan masalah: pecah → selesaikan per bagian → gabungkan hasilnya.' },
    { term: 'Enkripsi', def: 'Proses mengubah data menjadi kode rahasia yang hanya bisa dibaca dengan kunci tertentu.' },
    { term: 'Flowchart', def: 'Diagram alir yang menggunakan simbol-simbol untuk merepresentasikan langkah-langkah algoritma.' },
    { term: 'Forensik Digital', def: 'Ilmu mengumpulkan, menganalisis, dan melaporkan bukti digital untuk keperluan hukum.' },
    { term: 'Hardware', def: 'Perangkat keras — komponen fisik komputer (CPU, RAM, monitor, keyboard, dll).' },
    { term: 'HTML', def: 'HyperText Markup Language — bahasa standar untuk membuat struktur halaman web.' },
    { term: 'HTTP/HTTPS', def: 'Protokol transfer hypertext — HTTPS adalah versi aman dengan enkripsi SSL/TLS.' },
    { term: 'Informatika', def: 'Ilmu yang mempelajari pengolahan informasi menggunakan komputer (8 bidang pengetahuan).' },
    { term: 'IoT (Internet of Things)', def: 'Konsep di mana benda fisik terhubung ke internet dan saling berkomunikasi.' },
    { term: 'LAN (Local Area Network)', def: 'Jaringan komputer dengan jangkauan terbatas (satu gedung/kampus).' },
    { term: 'Linear Search', def: 'Algoritma pencarian dengan mengecek satu per satu — O(n).' },
    { term: 'Logic Gate (Gerbang Logika)', def: 'Rangkaian elektronik yang menerapkan fungsi boolean (AND, OR, NOT, NAND, NOR, XOR).' },
    { term: 'Machine Learning', def: 'Cabang AI di mana komputer belajar dari data tanpa diprogram secara eksplisit.' },
    { term: 'Malware', def: 'Perangkat lunak berbahaya (virus, worm, trojan, ransomware).' },
    { term: 'Phishing', def: 'Penipuan online yang menyamar sebagai pihak terpercaya untuk mencuri data.' },
    { term: 'Primary Key', def: 'Field unik dalam database yang digunakan untuk mengidentifikasi setiap record secara unik.' },
    { term: 'Pseudocode', def: 'Deskripsi algoritma menggunakan bahasa manusia (bukan bahasa pemrograman).' },
    { term: 'Python', def: 'Bahasa pemrograman tingkat tinggi yang populer, mudah dipelajari, dan serbaguna.' },
    { term: 'RAM', def: 'Random Access Memory — memori sementara (volatile) yang digunakan komputer saat berjalan.' },
    { term: 'Scratch', def: 'Bahasa pemrograman visual berbasis blok yang cocok untuk pemula.' },
    { term: 'Software', def: 'Perangkat lunak — program/aplikasi yang berjalan di komputer.' },
    { term: 'TCP/IP', def: 'Protokol standar yang digunakan internet untuk mengirim dan menerima data.' },
    { term: 'UU ITE', def: 'Undang-Undang Informasi dan Transaksi Elektronik (No. 11/2008, diperbarui 19/2016).' },
    { term: 'VPN', def: 'Virtual Private Network — jaringan pribadi virtual untuk koneksi internet yang aman.' },
    { term: 'WAN (Wide Area Network)', def: 'Jaringan komputer dengan jangkauan luas (antar kota/negara), contoh: Internet.' }
  ],

  // ─────────────────────────────────────────────
  // DRAG & DROP ACTIVITIES (per kelas)
  // ─────────────────────────────────────────────
  dragDrop: {
    k7: [
      {
        title: "Pasangkan Bidang Informatika dengan Deskripsinya!",
        pairs: [
          { left: "Berpikir Komputasional (BK)", right: "Cara berpikir untuk memecahkan masalah" },
          { left: "TIK", right: "Penggunaan tools dan teknologi digital" },
          { left: "Sistem Komputer (SK)", right: "Cara kerja perangkat keras & lunak" },
          { left: "Jaringan Komputer (JKI)", right: "Koneksi dan komunikasi antar komputer" },
          { left: "Analisis Data (AD)", right: "Mengolah dan memaknai data" },
          { left: "Algoritma & Pemrograman (AP)", right: "Membuat program dan kode" }
        ]
      }
    ],
    k8: [
      {
        title: "Pasangkan Strategi Pemecahan Masalah dengan Definisinya!",
        pairs: [
          { left: "Divide & Conquer", right: "Memecah masalah besar menjadi kecil, selesaikan, gabungkan" },
          { left: "Brute Force", right: "Mencoba semua kemungkinan satu per satu" },
          { left: "Greedy", right: "Memilih opsi terbaik saat ini" },
          { left: "Backtracking", right: "Mencoba jalur, mundur jika buntu" },
          { left: "Dynamic Programming", right: "Menyimpan hasil agar tidak menghitung ulang" }
        ]
      }
    ],
    k9: [
      {
        title: "Pasangkan Profesi IT dengan Bidangnya!",
        pairs: [
          { left: "Software Engineer", right: "Membuat aplikasi dan website" },
          { left: "Data Scientist", right: "Menganalisis data untuk wawasan" },
          { left: "Ethical Hacker", right: "Menguji dan melindungi keamanan sistem" },
          { left: "Cloud Engineer", right: "Mengelola infrastruktur server awan" },
          { left: "UI/UX Designer", right: "Mendesain tampilan dan pengalaman pengguna" },
          { left: "IoT Engineer", right: "Membuat perangkat pintar terhubung internet" }
        ]
      }
    ]
  }

};

// Backward compatibility alias
const APP_DATA = INFORMATIKA_DATA;
