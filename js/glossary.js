/* ══════════════════════════════════════════════════════════
   GLOSSARY + SEARCH — Kamus Istilah Multi-Mapel
   ══════════════════════════════════════════════════════════ */

const GlossaryEngine = {
  terms: [],
  filteredTerms: [],

  init() {
    // Gabungkan glosarium dari SEMUA mapel yang memiliki data glossary
    this.terms = [];
    const dataSources = [
      { data: INFORMATIKA_DATA, subject: 'Informatika' },
      { data: typeof MATEMATIKA_DATA !== 'undefined' ? MATEMATIKA_DATA : null, subject: 'Matematika' },
      { data: typeof IPA_DATA !== 'undefined' ? IPA_DATA : null, subject: 'IPA' },
      { data: typeof IPS_DATA !== 'undefined' ? IPS_DATA : null, subject: 'IPS' },
      { data: typeof BINDO_DATA !== 'undefined' ? BINDO_DATA : null, subject: 'B.Indonesia' },
      { data: typeof BING_DATA !== 'undefined' ? BING_DATA : null, subject: 'B.Inggris' },
      { data: typeof PPKN_DATA !== 'undefined' ? PPKN_DATA : null, subject: 'PPKn' },
      { data: typeof QURAN_HADIS_DATA !== 'undefined' ? QURAN_HADIS_DATA : null, subject: 'Quran Hadis' },
      { data: typeof AKIDAH_AKHLAK_DATA !== 'undefined' ? AKIDAH_AKHLAK_DATA : null, subject: 'Akidah Akhlak' },
      { data: typeof FIKIH_DATA !== 'undefined' ? FIKIH_DATA : null, subject: 'Fikih' },
      { data: typeof SKI_DATA !== 'undefined' ? SKI_DATA : null, subject: 'SKI' },
      { data: typeof BAHASA_ARAB_DATA !== 'undefined' ? BAHASA_ARAB_DATA : null, subject: 'B.Arab' },
      { data: typeof SENI_DATA !== 'undefined' ? SENI_DATA : null, subject: 'Seni Budaya' },
      { data: typeof PJOK_DATA !== 'undefined' ? PJOK_DATA : null, subject: 'PJOK' },
      { data: typeof PRAKARYA_DATA !== 'undefined' ? PRAKARYA_DATA : null, subject: 'Prakarya' }
    ];

    dataSources.forEach(src => {
      if (src.data && src.data.glossary) {
        src.data.glossary.forEach(item => {
          this.terms.push({
            ...item,
            subject: src.subject
          });
        });
      }
    });

    // Juga tambahkan istilah dari glosarium global
    const globalGlossary = INFORMATIKA_DATA.glossary || [];
    globalGlossary.forEach(item => {
      if (!this.terms.find(t => t.term === item.term)) {
        this.terms.push({ ...item, subject: 'Informatika' });
      }
    });

    // Deduplicate
    const seen = new Set();
    this.terms = this.terms.filter(t => {
      const key = t.term.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    this.filteredTerms = [...this.terms].sort((a, b) => a.term.localeCompare(b.term));
    this.render();
  },
    this.filteredTerms = [...this.terms].sort((a, b) => a.term.localeCompare(b.term));
    this.render();
  },

  render(query = '') {
    const main = document.getElementById('mainContent');

    // Filter
    if (query) {
      const q = query.toLowerCase();
      this.filteredTerms = this.terms.filter(t =>
        t.term.toLowerCase().includes(q) || t.def.toLowerCase().includes(q)
      );
    } else {
      this.filteredTerms = [...this.terms].sort((a, b) => a.term.localeCompare(b.term));
    }

    // Group by first letter
    const groups = {};
    this.filteredTerms.forEach(t => {
      const letter = t.term.charAt(0).toUpperCase();
      if (!groups[letter]) groups[letter] = [];
      groups[letter].push(t);
    });

    main.innerHTML = `
      <div class="fade-in" style="max-width:750px;margin:0 auto;">
        <h3 style="text-align:center;margin-bottom:16px;">📋 Glosarium Multi-Mapel MTs</h3>

        <!-- Search bar -->
        <div class="glossary-search">
          <input type="text" class="glossary-input" id="glossarySearch" 
                 placeholder="🔍 Cari istilah informatika..." value="${this._escHtml(query)}"
                 oninput="GlossaryEngine.render(this.value)">
          ${query ? `<button class="btn btn-sm btn-secondary" onclick="GlossaryEngine.render('')" style="margin-left:8px;">✕ Hapus</button>` : ''}
        </div>

        <div style="margin-top:4px;color:var(--gray-500);font-size:0.8rem;text-align:center;">
          ${this.filteredTerms.length} istilah dari berbagai mata pelajaran
        </div>

        <!-- Alphabet quick jump -->
        <div class="glossary-alpha" style="text-align:center;margin:12px 0;flex-wrap:wrap;">
          ${'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(l => {
            const hasTerms = groups[l];
            return `<span class="glossary-letter ${hasTerms ? 'has-terms' : ''}" 
                         onclick="document.getElementById('group-${l}')?.scrollIntoView({behavior:'smooth'})"
                         style="cursor:${hasTerms ? 'pointer' : 'default'};opacity:${hasTerms ? '1' : '0.3'};">${l}</span>`;
          }).join('')}
        </div>

        <!-- Terms listing -->
        <div style="max-height:55vh;overflow-y:auto;">
          ${Object.keys(groups).sort().map(letter => `
            <div id="group-${letter}" style="margin-bottom:16px;">
              <h4 style="color:var(--blue);border-bottom:2px solid var(--blue-light);padding-bottom:4px;margin-bottom:8px;">${letter}</h4>
              ${groups[letter].map(t => `
                <div class="glossary-term">
                  <div class="glossary-term-name">${t.term} <span class="glossary-subject-badge">${t.subject || ''}</span></div>
                  <div class="glossary-term-def">${t.def}</div>
                </div>
              `).join('')}
            </div>
          `).join('')}
        </div>

        <div class="flex-center mt-3">
          <button class="btn btn-secondary" onclick="App.goBack()">📚 Kembali</button>
        </div>
      </div>
    `;
  },

  _escHtml(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
};
