/* ══════════════════════════════════════════════════════════
   DRAG & DROP ENGINE — Aktivitas Menjodohkan
   ══════════════════════════════════════════════════════════ */

const DragDropEngine = {
  matched: 0,
  total: 0,
  draggedItem: null,

  init(pairs, title) {
    this.matched = 0;
    this.total = pairs.length;
    this.draggedItem = null;

    // Acak urutan tampilan kiri dan kanan
    const shuffledLeft = [...pairs].sort(() => Math.random() - 0.5);
    const shuffledRight = [...pairs].sort(() => Math.random() - 0.5);

    const main = document.getElementById('mainContent');
    let html = `
      <div class="fade-in">
        <h3 style="text-align:center;margin-bottom:16px;">🧩 ${title}</h3>
        <p style="text-align:center;color:var(--gray-500);margin-bottom:8px;font-size:0.85rem;">
          Seret (drag) istilah di <b>kiri</b> ke definisi yang cocok di <b>kanan</b>
        </p>
        <div class="dd-container">
          <!-- KOLOM KIRI: draggable items -->
          <div class="dd-column" id="ddLeftCol">
            <h4>📋 Istilah</h4>
            ${shuffledLeft.map((p, i) => `
              <div class="dd-item dd-draggable" draggable="true" data-value="${this._escape(p.left)}" id="drag-${i}">
                ${p.left}
              </div>
            `).join('')}
          </div>

          <!-- KOLOM KANAN: droppable targets -->
          <div class="dd-column" id="ddRightCol">
            <h4>📝 Definisi</h4>
            ${shuffledRight.map((p, i) => `
              <div class="dd-item dd-droppable" data-answer="${this._escape(p.left)}" id="drop-${i}">
                ${p.right}
              </div>
            `).join('')}
          </div>
        </div>
        <div class="dd-feedback" id="ddFeedback">
          Cocokkan: <span id="ddCount">0</span> / ${this.total}
        </div>
        <div class="flex-center mt-2">
          <button class="btn btn-secondary" onclick="App.goBack()">📚 Kembali</button>
          <button class="btn btn-primary" onclick="DragDropEngine.reset()">🔄 Ulangi</button>
        </div>
      </div>
    `;

    main.innerHTML = html;
    this._attachEvents(pairs);
    this._updateCount();
  },

  _escape(str) {
    return str.replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  },

  _attachEvents(pairs) {
    // Drag events pada draggable items
    document.querySelectorAll('.dd-draggable').forEach(el => {
      el.addEventListener('dragstart', (e) => {
        if (el.classList.contains('matched')) { e.preventDefault(); return; }
        this.draggedItem = el;
        el.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', el.getAttribute('data-value'));
      });
      el.addEventListener('dragend', () => {
        el.classList.remove('dragging');
        this.draggedItem = null;
      });
    });

    // Drop events pada droppable targets
    document.querySelectorAll('.dd-droppable').forEach(el => {
      el.addEventListener('dragover', (e) => {
        e.preventDefault();
        if (!el.classList.contains('matched')) {
          el.classList.add('over');
        }
        e.dataTransfer.dropEffect = 'move';
      });
      el.addEventListener('dragleave', () => {
        el.classList.remove('over');
      });
      el.addEventListener('drop', (e) => {
        e.preventDefault();
        el.classList.remove('over');
        if (el.classList.contains('matched')) return;

        const draggedValue = e.dataTransfer.getData('text/plain');
        const correctAnswer = el.getAttribute('data-answer');

        if (draggedValue === correctAnswer) {
          // Benar!
          el.classList.add('matched');
          el.innerHTML = '✅ ' + el.textContent.trim();
          if (this.draggedItem) {
            this.draggedItem.classList.add('matched');
            this.draggedItem.style.opacity = '0.5';
            this.draggedItem.draggable = false;
            this.draggedItem.style.cursor = 'default';
          }
          this.matched++;
          this._updateCount();

          if (this.matched === this.total) {
            document.getElementById('ddFeedback').innerHTML =
              '🎉 <b>Semua Benar! Luar Biasa!</b>';
          }
        } else {
          // Salah - animasi shake
          el.classList.add('wrong-drop');
          setTimeout(() => el.classList.remove('wrong-drop'), 400);
        }
      });
    });

    // Touch events untuk mobile
    this._attachTouchEvents();
  },

  _attachTouchEvents() {
    let touchDrag = null;
    let touchClone = null;
    let touchOffsetX = 0, touchOffsetY = 0;

    document.querySelectorAll('.dd-draggable').forEach(el => {
      el.addEventListener('touchstart', (e) => {
        if (el.classList.contains('matched')) return;
        touchDrag = el;
        const touch = e.touches[0];
        const rect = el.getBoundingClientRect();
        touchOffsetX = touch.clientX - rect.left;
        touchOffsetY = touch.clientY - rect.top;

        touchClone = el.cloneNode(true);
        touchClone.style.position = 'fixed';
        touchClone.style.zIndex = '9999';
        touchClone.style.opacity = '0.8';
        touchClone.style.pointerEvents = 'none';
        touchClone.style.width = rect.width + 'px';
        touchClone.style.left = (touch.clientX - touchOffsetX) + 'px';
        touchClone.style.top = (touch.clientY - touchOffsetY) + 'px';
        document.body.appendChild(touchClone);
        el.classList.add('dragging');
        e.preventDefault();
      }, { passive: false });

      el.addEventListener('touchmove', (e) => {
        if (!touchClone) return;
        const touch = e.touches[0];
        touchClone.style.left = (touch.clientX - touchOffsetX) + 'px';
        touchClone.style.top = (touch.clientY - touchOffsetY) + 'px';
        e.preventDefault();
      }, { passive: false });

      el.addEventListener('touchend', (e) => {
        if (!touchClone || !touchDrag) return;
        const touch = e.changedTouches[0];
        const dropTarget = document.elementFromPoint(touch.clientX, touch.clientY);
        const droppable = dropTarget?.closest('.dd-droppable');

        if (droppable && !droppable.classList.contains('matched')) {
          const draggedValue = touchDrag.getAttribute('data-value');
          const correctAnswer = droppable.getAttribute('data-answer');
          if (draggedValue === correctAnswer) {
            droppable.classList.add('matched');
            droppable.innerHTML = '✅ ' + droppable.textContent.trim();
            touchDrag.classList.add('matched');
            touchDrag.style.opacity = '0.5';
            touchDrag.draggable = false;
            touchDrag.style.cursor = 'default';
            this.matched++;
            this._updateCount();
            if (this.matched === this.total) {
              document.getElementById('ddFeedback').innerHTML = '🎉 <b>Semua Benar! Luar Biasa!</b>';
            }
          } else {
            droppable.classList.add('wrong-drop');
            setTimeout(() => droppable.classList.remove('wrong-drop'), 400);
          }
        }

        touchDrag.classList.remove('dragging');
        document.body.removeChild(touchClone);
        touchClone = null;
        touchDrag = null;
      });
    });
  },

  _updateCount() {
    const el = document.getElementById('ddCount');
    if (el) el.textContent = this.matched;
  },

  reset() {
    // Reload the same activity
    if (this._lastPairs && this._lastTitle) {
      this.init(this._lastPairs, this._lastTitle);
    }
  }
};
