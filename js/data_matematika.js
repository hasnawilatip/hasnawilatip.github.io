/* ══════════════════════════════════════════════════════════
   DATA MATEMATIKA — MTs Kelas 7, 8, 9 (Kurikulum Merdeka)
   ══════════════════════════════════════════════════════════ */

const MATEMATIKA_DATA = {
  k7: {
    name: 'Matematika Kelas 7',
    icon: '🔢',
    color: '#E67E22',
    colorLight: '#FFF3CD',
    desc: 'Bilangan, Aljabar, Persamaan Linear, Perbandingan, Bangun Datar, dan Statistika.',
    chapters: [
      { id: 1, title: 'Bilangan Bulat dan Pecahan', sem: 1,
        content: `<h3>A. Bilangan Bulat</h3><p><b>Bilangan bulat</b> terdiri dari bilangan positif, nol, dan bilangan negatif: ..., −3, −2, −1, 0, 1, 2, 3, ...</p>
<h3>B. Operasi Bilangan Bulat</h3><ul><li><b>Penjumlahan:</b> a + (−b) = a − b</li><li><b>Pengurangan:</b> a − (−b) = a + b</li><li><b>Perkalian:</b> (+) × (+) = (+), (+) × (−) = (−), (−) × (−) = (+)</li><li><b>Pembagian:</b> aturan tanda sama dengan perkalian</li></ul>
<h3>C. Bilangan Pecahan</h3><p>Bentuk umum: <b>a/b</b> dengan b ≠ 0. Operasi: penjumlahan (samakan penyebut), perkalian (kalikan pembilang & penyebut), pembagian (kali kebalikan).</p>
<div class="info-box"><span class="info-title">📌 Tips:</span> (−) × (−) = (+). Bayangkan: lawan dari lawan = kembali ke awal!</div>`,
        quiz: [{ q:'Hasil dari −5 + 8 = ...', opts:['−13','−3','3','13'], ans:2},{ q:'(−4) × (−6) = ...', opts:['−24','−10','10','24'], ans:3},{ q:'2/3 + 1/4 = ...', opts:['3/7','11/12','8/12','3/12'], ans:1},{ q:'Suhu −3°C naik 7°C menjadi...', opts:['−10°C','−4°C','4°C','10°C'], ans:2}]
      },
      { id: 2, title: 'Himpunan', sem: 1,
        content: `<h3>A. Pengertian Himpunan</h3><p><b>Himpunan</b> adalah kumpulan objek yang terdefinisi dengan jelas. Notasi: A = {1, 2, 3, 4}. Anggota himpunan disebut <b>elemen</b>.</p>
<h3>B. Operasi Himpunan</h3><ul><li><b>Irisan (∩):</b> anggota yang sama di kedua himpunan</li><li><b>Gabungan (∪):</b> semua anggota dari kedua himpunan</li><li><b>Selisih (−):</b> anggota A yang bukan anggota B</li><li><b>Komplemen (Aᶜ):</b> anggota semesta yang bukan anggota A</li></ul>
<h3>C. Diagram Venn</h3><p>Diagram Venn digunakan untuk menggambarkan hubungan antar himpunan secara visual.</p>`,
        quiz: [{ q:'A = {1,2,3}, B = {3,4,5}. A ∩ B = ...', opts:['{1,2}','{3}','{4,5}','{1,2,3,4,5}'], ans:1},{ q:'A ∪ B dari soal di atas adalah...', opts:['{1,2,3}','{3}','{1,2,3,4,5}','{4,5}'], ans:2},{ q:'Himpunan kosong dilambangkan...', opts:['∅ atau {}','0','{0}','∞'], ans:0}]
      },
      { id: 3, title: 'Bentuk Aljabar', sem: 1,
        content: `<h3>A. Unsur Aljabar</h3><p><b>Variabel:</b> huruf pengganti bilangan (x, y, a, b). <b>Koefisien:</b> angka di depan variabel. <b>Konstanta:</b> bilangan tetap.</p><p>Contoh: 3x + 2y − 5 → variabel: x, y; koefisien: 3, 2; konstanta: −5</p>
<h3>B. Operasi Aljabar</h3><ul><li><b>Penjumlahan:</b> 3x + 2x = 5x (variabel sama)</li><li><b>Perkalian:</b> 3x × 2y = 6xy</li><li><b>Distributif:</b> a(b + c) = ab + ac</li></ul>`,
        quiz: [{ q:'Sederhanakan: 5x + 3x = ...', opts:['8x','15x','8x²','2x'], ans:0},{ q:'Hasil dari 2(a + 3b) = ...', opts:['2a + 3b','2a + 6b','a + 6b','2a + 3'], ans:1},{ q:'Koefisien x pada 7x − 2y + 4 adalah...', opts:['7','−2','4','x'], ans:0}]
      },
      { id: 4, title: 'Persamaan Linear Satu Variabel', sem: 2,
        content: `<h3>A. Persamaan Linear</h3><p><b>Persamaan linear satu variabel (PLSV)</b> adalah kalimat terbuka dengan satu variabel berpangkat 1. Bentuk umum: <b>ax + b = c</b>.</p>
<h3>B. Menyelesaikan PLSV</h3><p>Langkah-langkah: (1) Kelompokkan variabel di satu ruas, konstanta di ruas lain. (2) Sederhanakan. (3) Bagi kedua ruas dengan koefisien variabel.</p><p>Contoh: 2x + 3 = 11 → 2x = 8 → x = 4</p>`,
        quiz: [{ q:'Penyelesaian 3x − 6 = 9 adalah...', opts:['x=3','x=5','x=6','x=15'], ans:1},{ q:'Jika 4(x + 1) = 20, maka x = ...', opts:['4','5','6','19'], ans:0}]
      },
      { id: 5, title: 'Perbandingan dan Skala', sem: 2,
        content: `<h3>A. Perbandingan Senilai dan Berbalik Nilai</h3><p><b>Perbandingan senilai:</b> semakin besar A, semakin besar B (proporsional). Contoh: harga beras vs berat.</p><p><b>Perbandingan berbalik nilai:</b> semakin besar A, semakin kecil B. Contoh: kecepatan vs waktu tempuh.</p>
<h3>B. Skala</h3><p><b>Skala = Jarak pada peta : Jarak sebenarnya.</b> Skala 1 : 100 artinya 1 cm di peta = 100 cm sebenarnya.</p>`,
        quiz: [{ q:'Skala 1:200.000 berarti 1 cm di peta = ... km sebenarnya', opts:['0,2','2','20','200'], ans:1},{ q:'2 kg beras Rp24.000. Harga 5 kg = ...', opts:['Rp48.000','Rp60.000','Rp72.000','Rp96.000'], ans:1}]
      },
      { id: 6, title: 'Bangun Datar', sem: 2,
        content: `<h3>A. Jenis-jenis Bangun Datar</h3><ul><li><b>Segitiga:</b> L = ½ × a × t, K = jumlah ketiga sisi</li><li><b>Persegi:</b> L = s², K = 4s</li><li><b>Persegi panjang:</b> L = p × l, K = 2(p + l)</li><li><b>Lingkaran:</b> L = πr², K = 2πr</li><li><b>Trapesium:</b> L = ½(a + b) × t</li></ul>
<h3>B. Keliling dan Luas</h3><p>Keliling = jumlah semua sisi. Luas = ukuran daerah di dalam bangun. Satuan luas: m², cm², dll.</p>`,
        quiz: [{ q:'Luas persegi dengan sisi 8 cm = ... cm²', opts:['32','64','16','24'], ans:1},{ q:'Keliling lingkaran dengan r = 7 cm (π=22/7) = ... cm', opts:['22','44','88','154'], ans:1},{ q:'Luas segitiga: a=10, t=6 → L = ...', opts:['60','30','16','20'], ans:1}]
      },
      { id: 7, title: 'Statistika: Data dan Diagram', sem: 2,
        content: `<h3>A. Pengumpulan Data</h3><p>Data dapat dikumpulkan melalui observasi, wawancara, kuesioner, atau studi dokumen.</p>
<h3>B. Ukuran Pemusatan Data</h3><ul><li><b>Mean (rata-rata):</b> jumlah data ÷ banyak data</li><li><b>Median:</b> nilai tengah data terurut</li><li><b>Modus:</b> nilai yang paling sering muncul</li></ul>
<h3>C. Penyajian Data</h3><p>Diagram batang, diagram garis, diagram lingkaran, dan tabel distribusi frekuensi.</p>`,
        quiz: [{ q:'Data: 7,8,6,9,5. Mean = ...', opts:['6','7','8','35'], ans:1},{ q:'Median dari 3,7,2,9,5 adalah...', opts:['3','5','7','9'], ans:1},{ q:'Nilai paling sering muncul disebut...', opts:['Mean','Median','Modus','Range'], ans:2}]
      }
    ]
  },
  k8: {
    name: 'Matematika Kelas 8',
    icon: '🔢',
    color: '#E67E22',
    colorLight: '#FFF3CD',
    desc: 'Relasi & Fungsi, Persamaan Garis Lurus, SPLDV, Teorema Pythagoras, Lingkaran, dan Peluang.',
    chapters: [
      { id: 1, title: 'Relasi dan Fungsi', sem: 1,
        content: `<h3>A. Relasi</h3><p><b>Relasi</b> adalah hubungan antara dua himpunan. Dapat dinyatakan dengan diagram panah, himpunan pasangan berurutan, atau grafik Cartesius.</p>
<h3>B. Fungsi (Pemetaan)</h3><p><b>Fungsi</b> adalah relasi khusus di mana setiap anggota domain dipasangkan TEPAT SATU dengan anggota kodomain. Notasi: f(x) = ax + b.</p>`,
        quiz: [{ q:'f(x) = 2x + 3. Nilai f(4) = ...', opts:['8','10','11','14'], ans:2},{ q:'Relasi yang setiap domain punya tepat 1 pasangan disebut...', opts:['Relasi','Fungsi','Korespondensi','Diagram'], ans:1}]
      },
      { id: 2, title: 'Persamaan Garis Lurus', sem: 1,
        content: `<h3>A. Gradien (Kemiringan)</h3><p><b>Gradien (m)</b> = perubahan y ÷ perubahan x = (y₂ − y₁) ÷ (x₂ − x₁). m > 0: naik ke kanan, m < 0: turun ke kanan.</p>
<h3>B. Persamaan Garis</h3><ul><li><b>y = mx + c</b> (bentuk umum)</li><li><b>y − y₁ = m(x − x₁)</b> (jika diketahui gradien & 1 titik)</li></ul>`,
        quiz: [{ q:'Gradien garis y = 3x − 5 adalah...', opts:['3','−5','−3','5'], ans:0},{ q:'Garis sejajar memiliki gradien yang...', opts:['Berlawanan','Sama','Berkebalikan','Negatif'], ans:1}]
      },
      { id: 3, title: 'Sistem Persamaan Linear Dua Variabel (SPLDV)', sem: 1,
        content: `<h3>A. Metode Eliminasi & Substitusi</h3><p>SPLDV adalah dua persamaan linear dengan dua variabel. Metode penyelesaian: (1) <b>Eliminasi:</b> hilangkan salah satu variabel. (2) <b>Substitusi:</b> ganti variabel dengan nilainya. (3) <b>Campuran</b>.</p>`,
        quiz: [{ q:'x+y=5, x−y=1. Nilai x=...', opts:['2','3','4','6'], ans:1},{ q:'Dari soal di atas, nilai y=...', opts:['1','2','3','4'], ans:1}]
      },
      { id: 4, title: 'Teorema Pythagoras', sem: 2,
        content: `<h3>A. Teorema Pythagoras</h3><p>Pada segitiga siku-siku: <b>a² + b² = c²</b> di mana c adalah sisi miring (hipotenusa).</p>
<h3>B. Triple Pythagoras</h3><p>Pasangan bilangan bulat yang memenuhi: (3,4,5), (5,12,13), (7,24,25), (8,15,17).</p>`,
        quiz: [{ q:'Sisi miring segitiga dengan sisi 6 dan 8 adalah...', opts:['9','10','12','14'], ans:1},{ q:'Triple Pythagoras yang benar:', opts:['(2,3,4)','(5,12,13)','(4,5,7)','(6,7,9)'], ans:1}]
      },
      { id: 5, title: 'Lingkaran', sem: 2,
        content: `<h3>A. Unsur Lingkaran</h3><p>Jari-jari (r), diameter (d = 2r), tali busur, apotema, juring, tembereng, sudut pusat, sudut keliling.</p>
<h3>B. Sudut Pusat & Sudut Keliling</h3><p><b>Sudut keliling = ½ × sudut pusat</b> (jika menghadap busur yang sama).</p>`,
        quiz: [{ q:'Keliling lingkaran: L = πr² atau...', opts:['2πr','πd','½πr','πr'], ans:0},{ q:'Sudut keliling 30°, sudut pusatnya = ...', opts:['15°','30°','60°','90°'], ans:2}]
      },
      { id: 6, title: 'Peluang', sem: 2,
        content: `<h3>A. Ruang Sampel & Titik Sampel</h3><p><b>Ruang sampel (S):</b> semua hasil yang mungkin. <b>Titik sampel:</b> setiap anggota ruang sampel.</p>
<h3>B. Peluang Teoretik</h3><p><b>P(A) = n(A) ÷ n(S)</b>. Nilai peluang antara 0 (mustahil) dan 1 (pasti).</p>`,
        quiz: [{ q:'Peluang muncul angka pada koin = ...', opts:['0','¼','½','1'], ans:2},{ q:'Dadu dilempar, peluang muncul > 4 = ...', opts:['1/6','1/3','1/2','2/3'], ans:1}]
      }
    ]
  },
  k9: {
    name: 'Matematika Kelas 9',
    icon: '🔢',
    color: '#E67E22',
    colorLight: '#FFF3CD',
    desc: 'Perpangkatan, Persamaan Kuadrat, Transformasi, Kesebangunan, Bangun Ruang, dan Statistika Lanjutan.',
    chapters: [
      { id: 1, title: 'Perpangkatan dan Bentuk Akar', sem: 1,
        content: `<h3>A. Sifat Perpangkatan</h3><ul><li>aᵐ × aⁿ = aᵐ⁺ⁿ</li><li>aᵐ ÷ aⁿ = aᵐ⁻ⁿ</li><li>(aᵐ)ⁿ = aᵐⁿ</li><li>a⁰ = 1 (a ≠ 0)</li><li>a⁻ⁿ = 1/aⁿ</li></ul>
<h3>B. Bentuk Akar</h3><p>√a × √b = √(ab). Merasionalkan penyebut: a/√b = a√b/b.</p>`,
        quiz: [{ q:'2³ × 2⁴ = ...', opts:['2⁷','2¹²','4⁷','2'], ans:0},{ q:'√18 disederhanakan = ...', opts:['3√2','2√3','6√2','9√2'], ans:0}]
      },
      { id: 2, title: 'Persamaan Kuadrat', sem: 1,
        content: `<h3>A. Bentuk Umum</h3><p><b>ax² + bx + c = 0</b> dengan a ≠ 0. Akar-akar: x₁ dan x₂.</p>
<h3>B. Cara Menyelesaikan</h3><p>(1) Pemfaktoran, (2) Melengkapkan kuadrat sempurna, (3) Rumus ABC: x = [−b ± √(b²−4ac)] ÷ 2a.</p>`,
        quiz: [{ q:'Akar x² − 5x + 6 = 0 adalah...', opts:['2 dan 3','−2 dan −3','1 dan 6','−1 dan −6'], ans:0},{ q:'Diskriminan D = b² − 4ac. Jika D > 0, akar-akarnya...', opts:['Imajiner','Kembar','Real berbeda','Tidak ada'], ans:2}]
      },
      { id: 3, title: 'Transformasi Geometri', sem: 1,
        content: `<h3>A. Jenis Transformasi</h3><ul><li><b>Translasi:</b> pergeseran</li><li><b>Refleksi:</b> pencerminan</li><li><b>Rotasi:</b> perputaran</li><li><b>Dilatasi:</b> perkecilan/pembesaran</li></ul>`,
        quiz: [{ q:'Pencerminan terhadap sumbu X mengubah (x,y) menjadi...', opts:['(−x,y)','(x,−y)','(−x,−y)','(y,x)'], ans:1}]
      },
      { id: 4, title: 'Kesebangunan dan Kekongruenan', sem: 2,
        content: `<h3>A. Kesebangunan</h3><p>Dua bangun <b>sebangun</b> jika sudut-sudut bersesuaian sama besar dan sisi-sisi bersesuaian sebanding.</p>
<h3>B. Kekongruenan</h3><p>Dua bangun <b>kongruen</b> jika bentuk dan ukurannya sama persis (sudut dan sisi sama).</p>`,
        quiz: [{ q:'Syarat kesebangunan: sudut sama dan sisi...', opts:['Sama','Sejajar','Sebanding','Tegak lurus'], ans:2}]
      },
      { id: 5, title: 'Bangun Ruang Sisi Lengkung', sem: 2,
        content: `<h3>A. Tabung, Kerucut, Bola</h3><ul><li><b>Tabung:</b> V = πr²t, LP = 2πr(r + t)</li><li><b>Kerucut:</b> V = ⅓πr²t, LP = πr(r + s)</li><li><b>Bola:</b> V = ⁴⁄₃πr³, LP = 4πr²</li></ul>`,
        quiz: [{ q:'Volume bola dengan r=7 cm (π=22/7) = ... cm³', opts:['1.437','1.437,3','616','4.312'], ans:1},{ q:'Rumus volume tabung adalah...', opts:['πr²t','⅓πr²t','2πr²t','πrt'], ans:0}]
      },
      { id: 6, title: 'Statistika: Ukuran Penyebaran Data', sem: 2,
        content: `<h3>A. Jangkauan & Kuartil</h3><p><b>Jangkauan:</b> data terbesar − data terkecil. <b>Kuartil:</b> membagi data terurut menjadi 4 bagian (Q₁, Q₂=median, Q₃).</p>
<h3>B. Diagram Box-Plot</h3><p>Visualisasi data menggunakan nilai minimum, Q₁, median, Q₃, dan maksimum.</p>`,
        quiz: [{ q:'Data: 5,8,12,7,15,10,6. Jangkauan = ...', opts:['9','10','7','15'], ans:1},{ q:'Q₂ sama dengan...', opts:['Mean','Modus','Median','Range'], ans:2}]
      }
    ]
  },
  dragDrop: {
    k7: [{ title: 'Pasangkan Istilah Matematika!', pairs: [
      { left: 'Mean', right: 'Rata-rata (jumlah÷banyak data)' },
      { left: 'Median', right: 'Nilai tengah data terurut' },
      { left: 'Modus', right: 'Nilai paling sering muncul' },
      { left: 'Variabel', right: 'Huruf pengganti bilangan' },
      { left: 'Skala', right: 'Perbandingan jarak peta : sebenarnya' }
    ]}],
    k8: [{ title: 'Pasangkan Istilah Geometri!', pairs: [
      { left: 'Hipotenusa', right: 'Sisi miring segitiga siku-siku' },
      { left: 'Gradien', right: 'Kemiringan garis' },
      { left: 'SPLDV', right: 'Dua persamaan linear dua variabel' },
      { left: 'Fungsi', right: 'Relasi khusus: 1 domain → 1 kodomain' }
    ]}],
    k9: [{ title: 'Pasangkan Transformasi!', pairs: [
      { left: 'Translasi', right: 'Pergeseran' },
      { left: 'Refleksi', right: 'Pencerminan' },
      { left: 'Rotasi', right: 'Perputaran' },
      { left: 'Dilatasi', right: 'Perbesaran/pengecilan' }
    ]}]
  },
  fillBlank: { k7:{title:'✍️ Isian Matematika K7',questions:[
    {q:'Hasil dari (−12) + 7 = ...', ans:['-5','−5']},{q:'2/5 + 1/5 = ...', ans:['3/5']},
    {q:'Sederhanakan: 4x − x = ...', ans:['3x']},{q:'Luas persegi s=9 cm = ... cm²', ans:['81']}
  ]},k8:{title:'✍️ Isian Matematika K8',questions:[
    {q:'f(x)=3x−4, f(2)=...', ans:['2']},{q:'Sisi miring segitiga 6,8 adalah...', ans:['10']},
    {q:'Gradien y=5x+2 adalah...', ans:['5']}
  ]},k9:{title:'✍️ Isian Matematika K9',questions:[
    {q:'2⁵ = ...', ans:['32']},{q:'Akar dari x²−9=0 adalah x=...', ans:['3','-3','3 dan -3','±3']},
    {q:'Hasil √16 = ...', ans:['4']}
  ]}},
  trueFalse: { k7:{title:'✅❌ B/S Matematika K7',questions:[
    {q:'(−3) × (−5) = −15',ans:false,explanation:'(−)×(−)=(+), jadi 15.'},
    {q:'1/2 + 1/3 = 5/6',ans:true},{q:'2x dan 2y bisa dijumlahkan jadi 4xy',ans:false,explanation:'Variabel berbeda tidak bisa dijumlahkan.'},
    {q:'Luas lingkaran = 2πr',ans:false,explanation:'Itu keliling. Luas = πr².'}
  ]},k8:{title:'✅❌ B/S Matematika K8',questions:[
    {q:'Teorema Pythagoras: a²+b²=c² untuk segitiga siku-siku',ans:true},
    {q:'Garis y=2x+3 dan y=2x−5 sejajar',ans:true,explanation:'Gradien sama (m=2).'},
    {q:'Peluang pasti = 0',ans:false,explanation:'Peluang pasti = 1. Peluang mustahil = 0.'}
  ]},k9:{title:'✅❌ B/S Matematika K9',questions:[
    {q:'a⁰ = 0 (a ≠ 0)',ans:false,explanation:'a⁰ = 1.'},
    {q:'Transformasi refleksi mengubah ukuran bangun',ans:false,explanation:'Refleksi tidak mengubah ukuran.'}
  ]}},
  flashcards: { k7:{title:'🃏 Flashcard Matematika K7',cards:[
    {front:'Mean',back:'Rata-rata = jumlah data ÷ banyak data'},
    {front:'Variabel',back:'Huruf pengganti bilangan (x, y, a, b)'},
    {front:'Koefisien',back:'Angka di depan variabel'},
    {front:'Skala',back:'Perbandingan jarak peta : jarak sebenarnya'},
    {front:'Himpunan',back:'Kumpulan objek yang terdefinisi dengan jelas'}
  ]},k8:{title:'🃏 Flashcard Matematika K8',cards:[
    {front:'Gradien',back:'Kemiringan garis = Δy/Δx = (y₂−y₁)/(x₂−x₁)'},
    {front:'Pythagoras',back:'a² + b² = c² (segitiga siku-siku)'},
    {front:'Fungsi',back:'Relasi khusus: setiap domain → tepat 1 kodomain'},
    {front:'Peluang',back:'P(A) = n(A)/n(S), nilai 0–1'}
  ]},k9:{title:'🃏 Flashcard Matematika K9',cards:[
    {front:'Diskriminan',back:'D = b² − 4ac (menentukan jenis akar persamaan kuadrat)'},
    {front:'Translasi',back:'Transformasi pergeseran'},
    {front:'Kongruen',back:'Dua bangun dengan bentuk dan ukuran sama persis'}
  ]}},
  glossary: [
    { term: 'Aljabar', def: 'Cabang matematika yang menggunakan huruf (variabel) untuk mewakili bilangan.' },
    { term: 'Bangun Datar', def: 'Bangun dua dimensi yang hanya memiliki panjang dan lebar (luas dan keliling).' },
    { term: 'Bangun Ruang Sisi Lengkung', def: 'Bangun tiga dimensi yang memiliki sisi lengkung: tabung, kerucut, bola.' },
    { term: 'Bilangan Bulat', def: 'Bilangan yang terdiri dari bilangan positif, nol, dan bilangan negatif (..., −2, −1, 0, 1, 2, ...).' },
    { term: 'Dilatasi', def: 'Transformasi geometri yang mengubah ukuran bangun (perbesaran/pengecilan) dengan faktor skala.' },
    { term: 'Diskriminan', def: 'D = b² − 4ac; menentukan jenis akar persamaan kuadrat (real berbeda, kembar, atau imajiner).' },
    { term: 'Fungsi', def: 'Relasi khusus di mana setiap anggota domain dipasangkan tepat satu dengan anggota kodomain.' },
    { term: 'Gradien', def: 'Kemiringan garis lurus = perubahan y ÷ perubahan x = (y₂−y₁)/(x₂−x₁).' },
    { term: 'Himpunan', def: 'Kumpulan objek yang terdefinisi dengan jelas. Contoh: A = {1, 2, 3, 4}.' },
    { term: 'Hipotenusa', def: 'Sisi miring pada segitiga siku-siku, sisi terpanjang yang berhadapan dengan sudut 90°.' },
    { term: 'Jangkauan (Range)', def: 'Selisih antara data terbesar dan data terkecil dalam statistika.' },
    { term: 'Kesebangunan', def: 'Dua bangun dengan sudut bersesuaian sama besar dan sisi bersesuaian sebanding.' },
    { term: 'Kongruen', def: 'Dua bangun yang memiliki bentuk dan ukuran sama persis (sudut dan sisi sama).' },
    { term: 'Kuartil', def: 'Nilai yang membagi data terurut menjadi empat bagian sama banyak (Q₁, Q₂=median, Q₃).' },
    { term: 'Mean (Rata-rata)', def: 'Jumlah seluruh data dibagi banyaknya data.' },
    { term: 'Median', def: 'Nilai tengah dari data yang telah diurutkan.' },
    { term: 'Modus', def: 'Nilai yang paling sering muncul dalam sekumpulan data.' },
    { term: 'Peluang', def: 'Kemungkinan terjadinya suatu kejadian. P(A) = n(A)/n(S), nilainya 0–1.' },
    { term: 'Persamaan Kuadrat', def: 'Persamaan berbentuk ax² + bx + c = 0 dengan a ≠ 0.' },
    { term: 'Refleksi', def: 'Transformasi geometri berupa pencerminan terhadap sumbu atau garis tertentu.' },
    { term: 'Rotasi', def: 'Transformasi geometri berupa perputaran bangun terhadap titik pusat.' },
    { term: 'SPLDV', def: 'Sistem Persamaan Linear Dua Variabel — dua persamaan linear dengan dua variabel.' },
    { term: 'Teorema Pythagoras', def: 'Pada segitiga siku-siku: a² + b² = c² (c = sisi miring/hipotenusa).' },
    { term: 'Translasi', def: 'Transformasi geometri berupa pergeseran (perpindahan) bangun.' },
    { term: 'Variabel', def: 'Huruf atau simbol yang mewakili suatu bilangan yang belum diketahui nilainya.' }
  ]
};
