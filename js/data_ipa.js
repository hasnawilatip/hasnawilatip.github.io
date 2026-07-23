/* ══════════════════════════════════════════════════════════
   DATA IPA — MTs Kelas 7, 8, 9 (Kurikulum Merdeka)
   ══════════════════════════════════════════════════════════ */

const IPA_DATA = {
  k7: {
    name: 'IPA Kelas 7', icon: '🔬', color: '#27AE60', colorLight: '#E8F8F0',
    desc: 'Metode ilmiah, zat & perubahannya, suhu & kalor, energi, gerak & gaya, ekologi, tata surya.',
    chapters: [
      { id: 1, title: 'Hakikat Ilmu Sains dan Metode Ilmiah', sem: 1,
        content: `<h3>A. Apa itu Sains?</h3><p><b>Sains (IPA)</b> adalah ilmu yang mempelajari alam semesta melalui observasi, eksperimen, dan pemikiran logis.</p>
<h3>B. Metode Ilmiah</h3><ol><li>Merumuskan masalah</li><li>Menyusun hipotesis</li><li>Merancang eksperimen</li><li>Mengumpulkan data</li><li>Menganalisis data</li><li>Menarik kesimpulan</li></ol>
<h3>C. Alat Laboratorium</h3><p>Gelas ukur, tabung reaksi, termometer, mikroskop, neraca, stopwatch, dll.</p>
<div class="info-box"><span class="info-title">📌 Keselamatan Lab:</span> Selalu pakai jas lab, kacamata pelindung, dan ikuti petunjuk guru!</div>`,
        quiz: [{ q:'Langkah pertama metode ilmiah adalah...', opts:['Eksperimen','Hipotesis','Merumuskan masalah','Kesimpulan'], ans:2},{ q:'Alat untuk mengukur suhu adalah...', opts:['Neraca','Termometer','Stopwatch','Mikroskop'], ans:1}]
      },
      { id: 2, title: 'Zat dan Perubahannya', sem: 1,
        content: `<h3>A. Wujud Zat</h3><p><b>Padat:</b> bentuk & volume tetap. <b>Cair:</b> bentuk berubah, volume tetap. <b>Gas:</b> bentuk & volume berubah.</p>
<h3>B. Perubahan Fisika vs Kimia</h3><p><b>Fisika:</b> tidak menghasilkan zat baru (es mencair, kertas sobek). <b>Kimia:</b> menghasilkan zat baru (besi berkarat, kayu terbakar).</p>
<h3>C. Asam, Basa, dan Garam</h3><p>Indikator: kertas lakmus. Asam → lakmus biru jadi merah. Basa → lakmus merah jadi biru. pH: asam < 7, netral = 7, basa > 7.</p>`,
        quiz: [{ q:'Es mencair termasuk perubahan...', opts:['Kimia','Fisika','Biologi','Permanen'], ans:1},{ q:'pH air murni adalah...', opts:['0','5','7','14'], ans:2},{ q:'Lakmus merah dalam basa berubah jadi...', opts:['Merah','Biru','Hijau','Kuning'], ans:1}]
      },
      { id: 3, title: 'Suhu, Kalor, dan Pemuaian', sem: 1,
        content: `<h3>A. Suhu vs Kalor</h3><p><b>Suhu:</b> derajat panas-dingin (°C, °F, K). <b>Kalor:</b> energi panas yang berpindah (Joule).</p>
<h3>B. Pemuaian</h3><p>Zat MEMUAI saat dipanaskan dan MENYUSUT saat didinginkan. Contoh: rel kereta diberi celah, kabel listrik dipasang kendur.</p>
<h3>C. Perpindahan Kalor</h3><ul><li><b>Konduksi:</b> lewat zat padat (besi dipanaskan)</li><li><b>Konveksi:</b> lewat aliran zat cair/gas (air mendidih)</li><li><b>Radiasi:</b> tanpa medium (sinar matahari)</li></ul>`,
        quiz: [{ q:'Perpindahan kalor tanpa medium disebut...', opts:['Konduksi','Konveksi','Radiasi','Induksi'], ans:2},{ q:'0°C = ... K', opts:['−273','0','100','273'], ans:3}]
      },
      { id: 4, title: 'Energi dalam Kehidupan', sem: 2,
        content: `<h3>A. Bentuk Energi</h3><p>Energi kinetik (gerak), potensial (posisi), kimia, listrik, panas, cahaya, bunyi, nuklir.</p>
<h3>B. Hukum Kekekalan Energi</h3><p><b>"Energi tidak dapat diciptakan atau dimusnahkan, hanya berubah bentuk."</b></p>
<h3>C. Sumber Energi</h3><p><b>Terbarukan:</b> matahari, angin, air, biomassa. <b>Tak terbarukan:</b> batu bara, minyak bumi, gas alam.</p>`,
        quiz: [{ q:'Energi benda karena geraknya disebut...', opts:['Potensial','Kinetik','Kimia','Listrik'], ans:1},{ q:'Sumber energi terbarukan adalah...', opts:['Batu bara','Minyak bumi','Matahari','Gas alam'], ans:2}]
      },
      { id: 5, title: 'Gerak dan Gaya', sem: 2,
        content: `<h3>A. Besaran Gerak</h3><p><b>v = s/t</b> (kecepatan = jarak ÷ waktu). GLB: kecepatan tetap. GLBB: percepatan tetap.</p>
<h3>B. Hukum Newton</h3><ul><li><b>Newton I (Inersia):</b> benda diam tetap diam, bergerak tetap bergerak</li><li><b>Newton II:</b> F = m × a</li><li><b>Newton III (Aksi-Reaksi):</b> F aksi = −F reaksi</li></ul>`,
        quiz: [{ q:'Rumus Hukum Newton II adalah...', opts:['F=m×a','F=m÷a','F=a÷m','F=m+a'], ans:0},{ q:'Jarak 120 km, waktu 2 jam. Kecepatan = ... km/jam', opts:['30','60','120','240'], ans:1}]
      },
      { id: 6, title: 'Ekologi dan Keanekaragaman Hayati', sem: 2,
        content: `<h3>A. Ekosistem</h3><p><b>Produsen</b> (tumbuhan) → <b>Konsumen I</b> (herbivora) → <b>Konsumen II</b> (karnivora) → <b>Pengurai</b> (bakteri/jamur).</p>
<h3>B. Rantai Makanan & Jaring Makanan</h3><p>Aliran energi dari satu organisme ke organisme lain.</p>
<h3>C. Pencemaran Lingkungan</h3><p>Udara (asap kendaraan), air (limbah pabrik), tanah (sampah plastik).</p>`,
        quiz: [{ q:'Organisme yang membuat makanan sendiri disebut...', opts:['Konsumen','Produsen','Pengurai','Herbivora'], ans:1},{ q:'Padi → Tikus → Ular → Elang. Ular adalah...', opts:['Produsen','Konsumen I','Konsumen II','Pengurai'], ans:2}]
      },
      { id: 7, title: 'Tata Surya', sem: 2,
        content: `<h3>A. Planet dalam Tata Surya</h3><p><b>Merkurius-Venus-Bumi-Mars-Jupiter-Saturnus-Uranus-Neptunus.</b> (MiVeBuMaJuSaUrNe)</p>
<h3>B. Gerhana</h3><p><b>Gerhana Bulan:</b> Bumi di antara Matahari & Bulan. <b>Gerhana Matahari:</b> Bulan di antara Matahari & Bumi.</p>`,
        quiz: [{ q:'Planet terbesar di tata surya adalah...', opts:['Bumi','Mars','Saturnus','Jupiter'], ans:3},{ q:'Planet merah adalah sebutan untuk...', opts:['Venus','Mars','Jupiter','Merkurius'], ans:1}]
      }
    ]
  },
  k8: {
    name: 'IPA Kelas 8', icon: '🔬', color: '#27AE60', colorLight: '#E8F8F0',
    desc: 'Sel & jaringan, sistem organ, tekanan zat, usaha & pesawat sederhana, getaran & gelombang, cahaya.',
    chapters: [
      { id: 1, title: 'Sel dan Jaringan', sem: 1,
        content: `<h3>A. Sel</h3><p><b>Sel</b> adalah unit terkecil makhluk hidup. Organel: membran sel, nukleus (inti), mitokondria, ribosom, dll.</p>
<h3>B. Perbedaan Sel Hewan & Tumbuhan</h3><p>Tumbuhan: ada dinding sel & kloroplas. Hewan: tidak ada.</p>`,
        quiz: [{ q:'Organel penghasil energi (ATP) adalah...', opts:['Nukleus','Mitokondria','Ribosom','Membran'], ans:1},{ q:'Yang hanya dimiliki sel tumbuhan:', opts:['Membran sel','Nukleus','Kloroplas','Mitokondria'], ans:2}]
      },
      { id: 2, title: 'Sistem Organ Manusia', sem: 1,
        content: `<h3>A. Sistem Pencernaan</h3><p>Mulut → kerongkongan → lambung → usus halus → usus besar → anus. Enzim: amilase, pepsin, lipase.</p>
<h3>B. Sistem Pernapasan</h3><p>Hidung → trakea → bronkus → bronkiolus → alveolus (pertukaran O₂ & CO₂).</p>`,
        quiz: [{ q:'Pertukaran O₂ dan CO₂ terjadi di...', opts:['Trakea','Bronkus','Alveolus','Hidung'], ans:2},{ q:'Enzim pencerna protein di lambung adalah...', opts:['Amilase','Pepsin','Lipase','Insulin'], ans:1}]
      },
      { id: 3, title: 'Tekanan Zat', sem: 1,
        content: `<h3>A. Tekanan pada Zat Padat</h3><p><b>P = F/A</b> (tekanan = gaya ÷ luas). Semakin kecil luas permukaan, semakin besar tekanan.</p>
<h3>B. Hukum Archimedes</h3><p>Benda dalam fluida mendapat gaya ke atas sebesar berat fluida yang dipindahkan.</p>`,
        quiz: [{ q:'Rumus tekanan zat padat: P = ...', opts:['F×A','F÷A','A÷F','F+A'], ans:1},{ q:'Kapal laut bisa mengapung karena Hukum...', opts:['Newton','Archimedes','Pascal','Bernoulli'], ans:1}]
      },
      { id: 4, title: 'Usaha dan Pesawat Sederhana', sem: 2,
        content: `<h3>A. Usaha (Work)</h3><p><b>W = F × s</b>. Satuan: Joule (J). Usaha = 0 jika benda tidak berpindah.</p>
<h3>B. Pesawat Sederhana</h3><p>Tuas/pengungkit, katrol, bidang miring. <b>KM = W/F = lk/lb</b> (keuntungan mekanis).</p>`,
        quiz: [{ q:'Usaha = 0 jika...', opts:['Gaya besar','Benda tidak berpindah','Jarak jauh','Gaya kecil'], ans:1},{ q:'Jenis pesawat sederhana:', opts:['Motor','Tuas','Dinamo','Generator'], ans:1}]
      },
      { id: 5, title: 'Getaran, Gelombang, dan Bunyi', sem: 2,
        content: `<h3>A. Getaran</h3><p>Gerak bolak-balik melalui titik setimbang. <b>T = t/n, f = n/t, T = 1/f.</b></p>
<h3>B. Gelombang</h3><p><b>v = λ × f.</b> Gelombang transversal (cahaya) & longitudinal (bunyi).</p>`,
        quiz: [{ q:'Rumus cepat rambat gelombang: v = ...', opts:['λ+f','λ×f','λ÷f','f÷λ'], ans:1},{ q:'Bunyi termasuk gelombang...', opts:['Transversal','Longitudinal','Elektromagnetik','Statis'], ans:1}]
      },
      { id: 6, title: 'Cahaya dan Alat Optik', sem: 2,
        content: `<h3>A. Sifat Cahaya</h3><p>Merambat lurus, dapat dipantulkan (refleksi), dibiaskan (refraksi), diuraikan (dispersi).</p>
<h3>B. Cermin dan Lensa</h3><p>Cermin: datar, cekung (konvergen), cembung (divergen). Lensa: cembung (+), cekung (−).</p>`,
        quiz: [{ q:'Pelangi terjadi karena cahaya mengalami...', opts:['Refleksi','Refraksi','Dispersi','Difraksi'], ans:2},{ q:'Cermin yang mengumpulkan cahaya adalah...', opts:['Datar','Cekung','Cembung','Prisma'], ans:1}]
      }
    ]
  },
  k9: {
    name: 'IPA Kelas 9', icon: '🔬', color: '#27AE60', colorLight: '#E8F8F0',
    desc: 'Sistem reproduksi, pewarisan sifat, listrik statis & dinamis, kemagnetan, bioteknologi, teknologi ramah lingkungan.',
    chapters: [
      { id: 1, title: 'Sistem Reproduksi Manusia', sem: 1,
        content: `<h3>A. Reproduksi</h3><p>Pembelahan sel: <b>mitosis</b> (2 sel anak identik) dan <b>meiosis</b> (4 sel anak, setengah kromosom — untuk gamet).</p>`,
        quiz: [{ q:'Pembelahan sel menghasilkan gamet disebut...', opts:['Mitosis','Meiosis','Amitosis','Fragmentasi'], ans:1}]
      },
      { id: 2, title: 'Pewarisan Sifat (Genetika)', sem: 1,
        content: `<h3>A. Hukum Mendel</h3><p><b>Dominan vs Resesif.</b> Genotipe: homozigot dominan (AA), heterozigot (Aa), homozigot resesif (aa).</p>`,
        quiz: [{ q:'Aa adalah genotipe...', opts:['Dominan','Resesif','Heterozigot','Homozigot'], ans:2},{ q:'Bapak genetika adalah...', opts:['Darwin','Mendel','Newton','Einstein'], ans:1}]
      },
      { id: 3, title: 'Listrik Statis dan Dinamis', sem: 1,
        content: `<h3>A. Listrik Statis</h3><p>Muatan listrik diam. Muatan sejenis tolak-menolak, berbeda tarik-menarik. Hukum Coulomb: F = k·q₁·q₂/r².</p>
<h3>B. Listrik Dinamis</h3><p><b>Hukum Ohm: V = I × R.</b> Rangkaian seri dan paralel.</p>`,
        quiz: [{ q:'Hukum Ohm: V = ...', opts:['I+R','I−R','I×R','I÷R'], ans:2},{ q:'Satuan hambatan listrik adalah...', opts:['Volt','Ampere','Ohm (Ω)','Watt'], ans:2}]
      },
      { id: 4, title: 'Kemagnetan dan Induksi Elektromagnetik', sem: 2,
        content: `<h3>A. Magnet</h3><p>Kutub: Utara & Selatan. Kutub sama tolak-menolak, berbeda tarik-menarik. Bumi adalah magnet raksasa.</p>
<h3>B. Induksi Elektromagnetik</h3><p>Perubahan medan magnet menghasilkan listrik (generator). Prinsip ini ditemukan Michael Faraday.</p>`,
        quiz: [{ q:'Generator mengubah energi ... menjadi listrik', opts:['Kimia','Gerak','Cahaya','Panas'], ans:1}]
      },
      { id: 5, title: 'Bioteknologi', sem: 2,
        content: `<h3>A. Bioteknologi Konvensional vs Modern</h3><p><b>Konvensional:</b> tempe, tape, yoghurt (fermentasi). <b>Modern:</b> rekayasa genetika, kloning, kultur jaringan.</p>`,
        quiz: [{ q:'Pembuatan tempe menggunakan bioteknologi...', opts:['Modern','Konvensional','Nuklir','Digital'], ans:1},{ q:'Mikroorganisme dalam pembuatan tempe:', opts:['Saccharomyces','Rhizopus','Lactobacillus','E.coli'], ans:1}]
      },
      { id: 6, title: 'Tanah dan Keberlangsungan Kehidupan', sem: 2,
        content: `<h3>A. Peran Tanah</h3><p>Media tanam, penyedia nutrisi, penyaring air, habitat organisme tanah.</p>
<h3>B. Teknologi Ramah Lingkungan</h3><p>Panel surya, mobil listrik, biopori, biogas, daur ulang.</p>`,
        quiz: [{ q:'Teknologi yang menggunakan energi matahari:', opts:['Biogas','Panel surya','Generator','Motor diesel'], ans:1}]
      }
    ]
  },
  dragDrop: {
    k7: [{ title: 'Pasangkan Besaran & Satuannya!', pairs: [
      { left: 'Suhu', right: 'Celcius (°C) / Kelvin (K)' },
      { left: 'Massa', right: 'Kilogram (kg)' },
      { left: 'Waktu', right: 'Sekon / detik (s)' },
      { left: 'Energi', right: 'Joule (J)' }
    ]}],
    k8: [{ title: 'Pasangkan Organ & Fungsinya!', pairs: [
      { left: 'Jantung', right: 'Memompa darah ke seluruh tubuh' },
      { left: 'Paru-paru', right: 'Tempat pertukaran O₂ dan CO₂' },
      { left: 'Lambung', right: 'Mencerna protein dengan enzim pepsin' }
    ]}],
    k9: [{ title: 'Pasangkan Istilah Genetika!', pairs: [
      { left: 'Genotipe', right: 'Susunan genetik makhluk hidup' },
      { left: 'Fenotipe', right: 'Sifat yang tampak (fisik)' },
      { left: 'Dominan', right: 'Sifat yang menutupi sifat lain' },
      { left: 'Resesif', right: 'Sifat yang tertutupi' }
    ]}]
  },
  fillBlank: { k7:{title:'✍️ Isian IPA K7',questions:[
    {q:'Alat ukur suhu disebut...',ans:['termometer']},{q:'Planet ketiga dari Matahari adalah...',ans:['bumi']},
    {q:'Perubahan wujud padat ke cair disebut...',ans:['mencair','melebur']}
  ]},k8:{title:'✍️ Isian IPA K8',questions:[
    {q:'Unit terkecil makhluk hidup adalah...',ans:['sel']},{q:'Rumus tekanan: P = ... ÷ A',ans:['f']}
  ]},k9:{title:'✍️ Isian IPA K9',questions:[
    {q:'Bapak genetika modern adalah...',ans:['mendel','gregor mendel']},{q:'Hukum Ohm: V = I × ...',ans:['r']}
  ]}},
  trueFalse: { k7:{title:'✅❌ B/S IPA K7',questions:[
    {q:'Matahari adalah planet',ans:false,explanation:'Matahari adalah bintang.'},
    {q:'Energi tidak dapat diciptakan atau dimusnahkan',ans:true}
  ]},k8:{title:'✅❌ B/S IPA K8',questions:[
    {q:'Hewan memiliki dinding sel',ans:false,explanation:'Hanya tumbuhan yang punya dinding sel.'}
  ]},k9:{title:'✅❌ B/S IPA K9',questions:[
    {q:'Muatan listrik sejenis tarik-menarik',ans:false,explanation:'Sejenis tolak-menolak.'}
  ]}},
  flashcards: { k7:{title:'🃏 Flashcard IPA K7',cards:[
    {front:'Konduksi',back:'Perpindahan kalor melalui zat padat'},
    {front:'Produsen',back:'Organisme yang membuat makanan sendiri (tumbuhan)'},
    {front:'Metamorfosis',back:'Perubahan bentuk tubuh selama pertumbuhan hewan'}
  ]},k8:{title:'🃏 Flashcard IPA K8',cards:[
    {front:'Alveolus',back:'Gelembung paru-paru tempat pertukaran gas'},
    {front:'Archimedes',back:'Benda dalam fluida mendapat gaya ke atas'}
  ]},k9:{title:'🃏 Flashcard IPA K9',cards:[
    {front:'Mitosis',back:'Pembelahan sel → 2 sel anak identik'},
    {front:'Meiosis',back:'Pembelahan sel → 4 sel anak, kromosom setengah (gamet)'}
  ]}},
  glossary: [
    { term: 'Alveolus', def: 'Gelembung kecil di paru-paru tempat terjadinya pertukaran oksigen (O₂) dan karbon dioksida (CO₂).' },
    { term: 'Archimedes (Hukum)', def: 'Benda yang dicelupkan dalam fluida mendapat gaya ke atas sebesar berat fluida yang dipindahkan.' },
    { term: 'Bioteknologi', def: 'Pemanfaatan makhluk hidup atau bagiannya untuk menghasilkan produk yang bermanfaat.' },
    { term: 'Dispersi', def: 'Penguraian cahaya putih menjadi warna-warna pelangi (merah-jingga-kuning-hijau-biru-nila-ungu).' },
    { term: 'Ekosistem', def: 'Hubungan timbal balik antara makhluk hidup dengan lingkungannya.' },
    { term: 'Energi Kinetik', def: 'Energi yang dimiliki benda karena geraknya. EK = ½mv².' },
    { term: 'Fermentasi', def: 'Proses penguraian zat oleh mikroorganisme tanpa oksigen (contoh: pembuatan tempe, tape).' },
    { term: 'Hukum Newton I', def: 'Benda diam cenderung tetap diam, benda bergerak cenderung tetap bergerak (inersia/kelembaman).' },
    { term: 'Hukum Ohm', def: 'V = I × R (tegangan = arus × hambatan).' },
    { term: 'Induksi Elektromagnetik', def: 'Proses menghasilkan listrik dari perubahan medan magnet (prinsip generator).' },
    { term: 'Kalor', def: 'Energi panas yang berpindah dari benda bersuhu tinggi ke benda bersuhu rendah.' },
    { term: 'Konduksi', def: 'Perpindahan kalor melalui zat padat tanpa disertai perpindahan partikel zatnya.' },
    { term: 'Konveksi', def: 'Perpindahan kalor melalui aliran zat cair atau gas.' },
    { term: 'Meiosis', def: 'Pembelahan sel menghasilkan 4 sel anak dengan kromosom setengah (untuk gamet/reproduksi).' },
    { term: 'Metamorfosis', def: 'Perubahan bentuk tubuh hewan selama pertumbuhan (contoh: telur→ulat→kepompong→kupu-kupu).' },
    { term: 'Mitosis', def: 'Pembelahan sel menghasilkan 2 sel anak yang identik dengan induknya.' },
    { term: 'Organel', def: 'Bagian-bagian kecil di dalam sel yang memiliki fungsi spesifik (mitokondria, nukleus, ribosom).' },
    { term: 'Produsen', def: 'Organisme yang mampu membuat makanan sendiri melalui fotosintesis (tumbuhan hijau).' },
    { term: 'Radiasi', def: 'Perpindahan kalor tanpa melalui medium/zat perantara (contoh: sinar matahari ke bumi).' },
    { term: 'Rhizopus', def: 'Jamur yang digunakan dalam pembuatan tempe (Rhizopus oligosporus).' }
  ]
};
