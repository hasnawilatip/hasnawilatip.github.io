/* ══════════════════════════════════════════════════════════
   FLOWCHART BUILDER — Drag & Drop Simbol Flowchart
   ══════════════════════════════════════════════════════════ */

const FlowchartBuilder = {
  shapes: [],
  selectedTool: null,

  init() {
    this.shapes = [];
    this.render();
  },

  render() {
    const main = document.getElementById('mainContent');
    main.innerHTML = `
      <div class="fade-in" style="max-width:900px;margin:0 auto;">
        <h3 style="text-align:center;margin-bottom:8px;">🧮 Flowchart Builder</h3>
        <p style="text-align:center;color:var(--gray-500);margin-bottom:12px;font-size:0.85rem;">
          Klik simbol di toolbar, lalu klik di canvas untuk menempatkan.
        </p>

        <!-- Toolbar -->
        <div class="flow-toolbar">
          <button class="flow-tool" data-shape="start" onclick="FlowchartBuilder.selectTool('start')" title="Start/End (Terminator)">
            <svg width="36" height="22"><rect x="2" y="2" width="32" height="18" rx="9" fill="#1A56DB"/><text x="18" y="15" text-anchor="middle" fill="white" font-size="9">MULAI</text></svg>
            <span>Start</span>
          </button>
          <button class="flow-tool" data-shape="process" onclick="FlowchartBuilder.selectTool('process')" title="Proses">
            <svg width="36" height="22"><rect x="2" y="2" width="32" height="18" fill="#0D8C24"/><text x="18" y="15" text-anchor="middle" fill="white" font-size="8">PROSES</text></svg>
            <span>Proses</span>
          </button>
          <button class="flow-tool" data-shape="decision" onclick="FlowchartBuilder.selectTool('decision')" title="Decision (Percabangan)">
            <svg width="36" height="26"><polygon points="18,2 34,13 18,24 2,13" fill="#E67E22"/><text x="18" y="15" text-anchor="middle" fill="white" font-size="7">IF?</text></svg>
            <span>Decision</span>
          </button>
          <button class="flow-tool" data-shape="io" onclick="FlowchartBuilder.selectTool('io')" title="Input/Output">
            <svg width="36" height="22"><polygon points="6,2 36,2 30,20 0,20" fill="#8B008B"/><text x="18" y="14" text-anchor="middle" fill="white" font-size="7">I/O</text></svg>
            <span>I/O</span>
          </button>
          <button class="flow-tool" data-shape="arrow" onclick="FlowchartBuilder.selectTool('arrow')" title="Panah">
            <span style="font-size:1.2rem;">➡️</span>
            <span>Panah</span>
          </button>
          <button class="flow-tool" data-shape="text" onclick="FlowchartBuilder.selectTool('text')" title="Teks">
            <span style="font-size:1.2rem;">📝</span>
            <span>Teks</span>
          </button>
          <button class="flow-tool flow-tool-del" onclick="FlowchartBuilder.clearAll()" title="Hapus Semua">
            <span style="font-size:1.2rem;">🗑️</span>
            <span>Hapus</span>
          </button>
        </div>

        <!-- Canvas -->
        <div class="flow-canvas" id="flowCanvas" onclick="FlowchartBuilder.placeShape(event)">
          <div class="flow-grid"></div>
          ${this.shapes.map((s, i) => this._renderShape(s, i)).join('')}
        </div>

        <div style="text-align:center;margin-top:8px;font-size:0.8rem;color:var(--gray-500);" id="flowInfo">
          🖱️ Pilih tool di atas, lalu klik di area canvas untuk menempatkan.
        </div>

        <div class="flex-center mt-2">
          <button class="btn btn-primary btn-sm" onclick="FlowchartBuilder.exportFlowchart()">📋 Lihat Pseudocode</button>
          <button class="btn btn-secondary" onclick="App.goBack()">📚 Kembali</button>
        </div>
      </div>
    `;
  },

  _renderShape(s, i) {
    const colors = {
      start: { bg: '#1A56DB', w: 90, h: 40, rx: 20 },
      process: { bg: '#0D8C24', w: 100, h: 40, rx: 4 },
      decision: { bg: '#E67E22', w: 80, h: 50, rx: 0 },
      io: { bg: '#8B008B', w: 100, h: 40, rx: 0 }
    };
    const c = colors[s.shape];
    if (!c) {
      if (s.shape === 'arrow') {
        return `<div class="flow-shape-arrow" style="left:${s.x}px;top:${s.y}px;transform:rotate(${s.angle || 0}deg);" 
                onclick="event.stopPropagation();FlowchartBuilder.removeShape(${i})" title="Klik untuk hapus">➡️</div>`;
      }
      if (s.shape === 'text') {
        return `<div class="flow-shape-text" style="left:${s.x}px;top:${s.y}px;" 
                onclick="event.stopPropagation();FlowchartBuilder.removeShape(${i})" title="Klik untuk hapus">${s.content || 'Teks'}</div>`;
      }
      return '';
    }
    if (s.shape === 'decision') {
      const cx = c.w / 2, cy = c.h / 2;
      return `<svg style="position:absolute;left:${s.x}px;top:${s.y}px;width:${c.w}px;height:${c.h}px;cursor:pointer;" 
              onclick="event.stopPropagation();FlowchartBuilder.removeShape(${i})" title="Klik untuk hapus">
        <polygon points="${cx},0 ${c.w},${cy} ${cx},${c.h} 0,${cy}" fill="${c.bg}" opacity="0.85"/>
        <text x="${cx}" y="${cy + 4}" text-anchor="middle" fill="white" font-size="10">${s.label || '?'}</text>
      </svg>`;
    }
    return `<div class="flow-shape" style="left:${s.x}px;top:${s.y}px;width:${c.w}px;height:${c.h}px;
            background:${c.bg};border-radius:${c.rx}px;${s.shape === 'start' ? 'border-radius:' + c.h / 2 + 'px;' : ''}"
            onclick="event.stopPropagation();FlowchartBuilder.removeShape(${i})" title="Klik untuk hapus">
      <span style="color:white;font-size:0.75rem;font-weight:600;">${s.label || s.shape}</span>
    </div>`;
  },

  selectTool(shape) {
    this.selectedTool = shape;
    document.querySelectorAll('.flow-tool').forEach(b => b.classList.remove('active'));
    const btn = document.querySelector(`.flow-tool[data-shape="${shape}"]`);
    if (btn) btn.classList.add('active');
    document.getElementById('flowInfo').textContent = `🖱️ Tool: ${shape}. Klik di canvas untuk menempatkan.`;
  },

  placeShape(event) {
    if (!this.selectedTool) return;
    const canvas = document.getElementById('flowCanvas');
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left + canvas.scrollLeft;
    const y = event.clientY - rect.top + canvas.scrollTop;

    if (this.selectedTool === 'arrow') {
      this.shapes.push({ shape: 'arrow', x: x - 12, y: y - 12, angle: 0 });
    } else if (this.selectedTool === 'text') {
      const label = prompt('Masukkan teks:');
      if (label) this.shapes.push({ shape: 'text', x, y, content: label });
    } else {
      const label = prompt('Masukkan label (opsional):') || '';
      this.shapes.push({ shape: this.selectedTool, x, y, label });
    }
    this.render();
  },

  removeShape(idx) {
    this.shapes.splice(idx, 1);
    this.render();
  },

  clearAll() {
    if (confirm('Hapus semua simbol?')) {
      this.shapes = [];
      this.render();
    }
  },

  exportFlowchart() {
    const steps = [];
    this.shapes.forEach(s => {
      if (s.shape === 'start' && s.label) steps.push(`MULAI: ${s.label}`);
      else if (s.shape === 'process' && s.label) steps.push(`  ${s.label}`);
      else if (s.shape === 'decision' && s.label) steps.push(`  JIKA ${s.label} MAKA...`);
      else if (s.shape === 'io' && s.label) steps.push(`  INPUT/OUTPUT: ${s.label}`);
    });
    if (steps.length === 0) {
      alert('Tambahkan simbol dulu ke canvas!');
      return;
    }
    alert('📋 Pseudocode dari Flowchart:\n\n' + steps.join('\n'));
  }
};
