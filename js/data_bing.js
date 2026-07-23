/* ══════════════════════════════════════════════════════════
   DATA BAHASA INGGRIS — MTs Kelas 7, 8, 9 (Kurikulum Merdeka)
   ══════════════════════════════════════════════════════════ */

const BING_DATA = {
  k7: {
    name: 'Bahasa Inggris Kelas 7', icon: '🇬🇧', color: '#2980B9', colorLight: '#E8F4FD',
    desc: 'Greetings, introduction, daily activities, describing people & things, telling time, likes & dislikes.',
    chapters: [
      { id: 1, title: 'Greetings and Introduction', sem: 1,
        content: `<h3>A. Greetings (Salam)</h3><ul><li><b>Good morning</b> (pagi) · <b>Good afternoon</b> (siang) · <b>Good evening</b> (sore) · <b>Good night</b> (malam/selamat tidur)</li></ul>
<h3>B. Introduction (Perkenalan)</h3><ul><li><b>Hi, I'm ... / My name is ...</b></li><li><b>Nice to meet you.</b> (Senang bertemu denganmu.)</li><li><b>How are you? — I'm fine, thank you.</b></li></ul>
<h3>C. Leave-Taking</h3><ul><li><b>Goodbye / Bye / See you later / Take care</b></li></ul>`,
        quiz: [{ q:'"Selamat pagi" in English is...', opts:['Good night','Good morning','Good evening','Good afternoon'], ans:1},{ q:'"Senang bertemu denganmu" = ...', opts:['How are you?','Nice to meet you','See you later','Take care'], ans:1}]
      },
      { id: 2, title: 'Pronouns and To Be', sem: 1,
        content: `<h3>A. Subject Pronouns</h3><p>I, You, He, She, It, We, They.</p>
<h3>B. To Be (am, is, are)</h3><ul><li><b>I am</b> a student. <b>You are</b> smart. <b>He/She/It is</b> ... <b>We/They are</b> ...</li></ul>`,
        quiz: [{ q:'She ... a teacher.', opts:['am','is','are','be'], ans:1},{ q:'They ... from Jakarta.', opts:['am','is','are','be'], ans:2}]
      },
      { id: 3, title: 'Daily Activities & Simple Present', sem: 1,
        content: `<h3>A. Simple Present Tense</h3><p>Untuk kebiasaan/fakta. <b>I/You/We/They + V1</b>. <b>He/She/It + V1 + s/es</b>.</p>
<h3>B. Daily Routine Vocabulary</h3><p>Wake up, take a bath, have breakfast, go to school, study, do homework, go to bed.</p>`,
        quiz: [{ q:'She ... to school every day.', opts:['go','goes','going','gone'], ans:1},{ q:'I ... breakfast at 6 AM.', opts:['has','have','had','having'], ans:1}]
      },
      { id: 4, title: 'Describing People & Things (Adjectives)', sem: 2,
        content: `<h3>A. Adjectives</h3><p>Tall, short, big, small, beautiful, handsome, smart, kind, funny, old, young, new.</p>
<h3>B. Describing</h3><p><b>She is tall and beautiful.</b> <b>It is a big house.</b> <b>He has curly hair.</b></p>`,
        quiz: [{ q:'"Dia (pr) cantik" = She is ...', opts:['handsome','beautiful','smart','tall'], ans:1}]
      },
      { id: 5, title: 'Telling Time, Days & Months', sem: 2,
        content: `<h3>A. Telling Time (Jam)</h3><p>07:00 = <b>seven o'clock.</b> 07:15 = <b>a quarter past seven.</b> 07:30 = <b>half past seven.</b> 07:45 = <b>a quarter to eight.</b></p>
<h3>B. Days: Monday–Sunday. Months: January–December.</h3>`,
        quiz: [{ q:'What day comes after Tuesday?', opts:['Monday','Wednesday','Thursday','Friday'], ans:1},{ q:'08:30 = half past ...', opts:['seven','eight','nine','ten'], ans:1}]
      },
      { id: 6, title: 'Likes, Dislikes & Hobbies', sem: 2,
        content: `<h3>A. Expressing Likes & Dislikes</h3><p><b>I like</b> reading. <b>I love</b> swimming. <b>I don't like</b> running. <b>I hate</b> waiting.</p>
<h3>B. Hobbies</h3><p>Reading, swimming, cooking, singing, drawing, playing football/badminton, watching movies, listening to music.</p>`,
        quiz: [{ q:'"Saya suka membaca" = I ... reading.', opts:['hate','like','don\'t like','dislike'], ans:1}]
      }
    ]
  },
  k8: {
    name: 'Bahasa Inggris Kelas 8', icon: '🇬🇧', color: '#2980B9', colorLight: '#E8F4FD',
    desc: 'Present continuous, comparative & superlative, past tense, giving instructions, obligation & prohibition.',
    chapters: [
      { id: 1, title: 'Present Continuous Tense', sem: 1,
        content: `<h3>A. Form: S + to be + V-ing</h3><p>Digunakan untuk kegiatan yang SEDANG berlangsung.</p><p><b>I am studying.</b> <b>She is cooking.</b> <b>They are playing.</b></p>`,
        quiz: [{ q:'She ... reading a book now.', opts:['am','is','are','be'], ans:1},{ q:'They ... playing football.', opts:['am','is','are','be'], ans:2}]
      },
      { id: 2, title: 'Comparative & Superlative', sem: 1,
        content: `<h3>A. Comparative (lebih...)</h3><p>Adj + er / more + adj. <b>Taller, bigger, more beautiful.</b></p>
<h3>B. Superlative (paling...)</h3><p>The + adj + est / the most + adj. <b>The tallest, the most beautiful.</b></p>`,
        quiz: [{ q:'Ali is ... than Budi. (tall)', opts:['tall','taller','tallest','more tall'], ans:1},{ q:'She is the ... in class. (smart)', opts:['smart','smarter','smartest','more smart'], ans:2}]
      },
      { id: 3, title: 'Simple Past Tense', sem: 2,
        content: `<h3>A. Regular Verbs: V1 + ed/d</h3><p>Play → played, study → studied, stop → stopped.</p>
<h3>B. Irregular Verbs</h3><p>Go → went, eat → ate, see → saw, buy → bought, write → wrote.</p>`,
        quiz: [{ q:'Yesterday, I ... to the market. (go)', opts:['go','goes','went','gone'], ans:2},{ q:'She ... a cake last night. (make)', opts:['make','makes','made','maked'], ans:2}]
      },
      { id: 4, title: 'Giving Instructions & Imperatives', sem: 2,
        content: `<h3>A. Imperative (Perintah)</h3><p>V1 + object. <b>Open the door! Don't smoke! Please sit down.</b></p>
<h3>B. Sequence Words</h3><p>First, then, next, after that, finally.</p>`,
        quiz: [{ q:'"Jangan berlari!" = ...', opts:['Run!','Don\'t run!','Not run!','No running!'], ans:1}]
      },
      { id: 5, title: 'Obligation, Prohibition & Suggestion', sem: 2,
        content: `<h3>A. Must / Have to (keharusan)</h3><p><b>You must wear a uniform.</b></p>
<h3>B. Must not / Don't (larangan)</h3><p><b>You must not smoke here.</b></p>
<h3>C. Should (saran)</h3><p><b>You should study harder.</b></p>`,
        quiz: [{ q:'You ... eat healthy food. (saran)', opts:['must','must not','should','don\'t'], ans:2}]
      },
      { id: 6, title: 'Recount Text', sem: 2,
        content: `<h3>A. Recount Text</h3><p>Menceritakan pengalaman masa lalu. Struktur: <b>Orientation → Events → Reorientation</b>.</p>`,
        quiz: [{ q:'Bagian pembuka recount text disebut...', opts:['Events','Reorientation','Orientation','Complication'], ans:2}]
      }
    ]
  },
  k9: {
    name: 'Bahasa Inggris Kelas 9', icon: '🇬🇧', color: '#2980B9', colorLight: '#E8F4FD',
    desc: 'Present perfect, passive voice, conditional sentences, narrative text, report text, agreement & disagreement.',
    chapters: [
      { id: 1, title: 'Present Perfect Tense', sem: 1,
        content: `<h3>A. Form: Have/Has + V3</h3><p>Untuk pengalaman/kegiatan yang SUDAH terjadi (tidak spesifik waktu). <b>I have finished</b> my homework. <b>She has visited</b> Bali.</p>`,
        quiz: [{ q:'I ... eaten lunch.', opts:['has','have','had','having'], ans:1},{ q:'She ... never been to Japan.', opts:['have','had','has','having'], ans:2}]
      },
      { id: 2, title: 'Passive Voice', sem: 1,
        content: `<h3>A. Form: To be + V3</h3><p>Active: <b>The cat eats the fish.</b> → Passive: <b>The fish is eaten by the cat.</b></p>`,
        quiz: [{ q:'The letter ... by her yesterday.', opts:['write','writes','was written','is writing'], ans:2}]
      },
      { id: 3, title: 'Conditional Sentences (If Clause)', sem: 1,
        content: `<h3>A. Type 1: If + present, will + V1</h3><p><b>If it rains, I will bring an umbrella.</b></p>
<h3>B. Type 2: If + past, would + V1</h3><p><b>If I were rich, I would travel the world.</b></p>`,
        quiz: [{ q:'If I study hard, I ... pass the exam.', opts:['will','would','would have','had'], ans:0}]
      },
      { id: 4, title: 'Narrative Text', sem: 2,
        content: `<h3>A. Narrative Text (Cerita)</h3><p>Struktur: <b>Orientation → Complication → Resolution → Reorientation/Coda</b>. Contoh: legend, fable, fairy tale.</p>`,
        quiz: [{ q:'Bagian masalah dalam narrative text disebut...', opts:['Orientation','Complication','Resolution','Coda'], ans:1}]
      },
      { id: 5, title: 'Report Text', sem: 2,
        content: `<h3>A. Report Text</h3><p>Menyajikan informasi faktual tentang suatu hal. Struktur: <b>General Classification → Description</b>.</p>`,
        quiz: [{ q:'Report text bertujuan untuk...', opts:['Menghibur','Memberi informasi','Membujuk','Menceritakan pengalaman'], ans:1}]
      },
      { id: 6, title: 'Agreement & Disagreement', sem: 2,
        content: `<h3>A. Agreement (Setuju)</h3><p><b>I agree.</b> <b>You're right.</b> <b>That's a good point.</b></p>
<h3>B. Disagreement (Tidak Setuju)</h3><p><b>I disagree.</b> <b>I don't think so.</b> <b>I'm not sure about that.</b></p>`,
        quiz: [{ q:'"Saya setuju" = ...', opts:['I disagree','I agree','I don\'t think so','I\'m not sure'], ans:1}]
      }
    ]
  },
  dragDrop: {
    k7: [{ title: 'Match the Greetings!', pairs: [
      { left: 'Good morning', right: 'Pukul 06:00–12:00' },
      { left: 'Good afternoon', right: 'Pukul 12:00–18:00' },
      { left: 'Good evening', right: 'Pukul 18:00–24:00' },
      { left: 'Good night', right: 'Selamat tidur / berpisah malam' }
    ]}],
    k8: [{ title: 'Match the Tenses!', pairs: [
      { left: 'Simple Present', right: 'I eat rice every day' },
      { left: 'Present Continuous', right: 'I am eating rice now' },
      { left: 'Simple Past', right: 'I ate rice yesterday' }
    ]}],
    k9: [{ title: 'Match the Text Types!', pairs: [
      { left: 'Narrative', right: 'Legend, fable, fairy tale' },
      { left: 'Report', right: 'General classification → description' },
      { left: 'Recount', right: 'Personal experience in the past' }
    ]}]
  },
  fillBlank: { k7:{title:'✍️ Fill in the Blank — English K7',questions:[
    {q:'Good morning = Selamat ...',ans:['pagi']},{q:'I ... a student. (to be)',ans:['am']}
  ]},k8:{title:'✍️ Fill in the Blank — English K8',questions:[
    {q:'Past tense of "go" is ...',ans:['went']},{q:'Comparative of "big" is ...',ans:['bigger']}
  ]},k9:{title:'✍️ Fill in the Blank — English K9',questions:[
    {q:'Present perfect: She has ... her homework. (finish)',ans:['finished']},{q:'"Jika" in English = ...',ans:['if']}
  ]}},
  trueFalse: { k7:{title:'✅❌ True/False — English K7',questions:[
    {q:'"She are a teacher" is correct.',ans:false,explanation:'Should be "She IS a teacher."'},
    {q:'Monday comes before Tuesday.',ans:true}
  ]},k8:{title:'✅❌ True/False — English K8',questions:[
    {q:'"I am eating" is Present Continuous.',ans:true},
    {q:'Past tense of "eat" is "eated".',ans:false,explanation:'It\'s "ate".'}
  ]},k9:{title:'✅❌ True/False — English K9',questions:[
    {q:'"The book was written by her" is active voice.',ans:false,explanation:'It\'s passive voice.'}
  ]}},
  flashcards: { k7:{title:'🃏 Flashcards — English K7',cards:[
    {front:'Greeting',back:'Salam (Hello, Good morning, How are you?)'},
    {front:'Pronoun',back:'Kata ganti (I, you, he, she, it, we, they)'},
    {front:'To Be',back:'am, is, are — kata kerja "adalah"'}
  ]},k8:{title:'🃏 Flashcards — English K8',cards:[
    {front:'Past Tense',back:'Waktu lampau (V2): go→went, eat→ate, see→saw'},
    {front:'Comparative',back:'Lebih ... : taller, bigger, more beautiful'}
  ]},k9:{title:'🃏 Flashcards — English K9',cards:[
    {front:'Present Perfect',back:'Have/Has + V3 — sudah terjadi'},
    {front:'Passive Voice',back:'To be + V3 — objek jadi subjek'}
  ]}},
  glossary: [
    { term: 'Adjective', def: 'Kata sifat — describes a noun (tall, beautiful, smart, big).' },
    { term: 'Comparative', def: 'Bentuk "lebih": Adj+er / more+adj (taller, more beautiful).' },
    { term: 'Conditional Sentence', def: 'Kalimat pengandaian: If + Present, will + V1 (Type 1); If + Past, would + V1 (Type 2).' },
    { term: 'Imperative', def: 'Kalimat perintah: V1 + object! / Don\'t + V1! (Open the door! / Don\'t run!).' },
    { term: 'Narrative Text', def: 'Teks cerita (legend, fable, fairy tale): Orientation → Complication → Resolution → Coda.' },
    { term: 'Passive Voice', def: 'Kalimat pasif: To be + V3. Active: "The cat eats fish" → Passive: "Fish is eaten by the cat".' },
    { term: 'Present Continuous', def: 'S + to be + V-ing — kegiatan yang SEDANG berlangsung (I am studying now).' },
    { term: 'Present Perfect', def: 'Have/Has + V3 — pengalaman yang sudah terjadi, tidak spesifik waktu (I have visited Bali).' },
    { term: 'Pronoun', def: 'Kata ganti: I, You, He, She, It, We, They (subject pronouns).' },
    { term: 'Recount Text', def: 'Teks menceritakan pengalaman masa lalu: Orientation → Events → Reorientation.' },
    { term: 'Report Text', def: 'Teks faktual informatif: General Classification → Description.' },
    { term: 'Simple Past Tense', def: 'Waktu lampau: Regular verbs (V+ed), Irregular verbs (go→went, eat→ate, see→saw).' },
    { term: 'Simple Present Tense', def: 'Kebiasaan/fakta: I/You/We/They + V1; He/She/It + V1+s/es.' },
    { term: 'Superlative', def: 'Bentuk "paling": The + Adj+est / The most + adj (the tallest, the most beautiful).' },
    { term: 'To Be', def: 'am, is, are — kata kerja "adalah" (I am, You/We/They are, He/She/It is).' }
  ]
};
