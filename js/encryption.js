/* ══════════════════════════════════════════════════════════
   ENCRYPTION SIM — Simulasi Caesar Cipher & Enkripsi
   ══════════════════════════════════════════════════════════ */

const EncryptionSim = {

  init() {
    this.render();
  },

  render(shiftVal = 3, inputText = '', outputText = '') {
    const main = document.getElementById('mainContent');
    main.innerHTML = `
      <div class="sim-container fade-in">
        <h3>🔐 Simulasi Caesar Cipher</h3>
        <p style="text-align:center;color:var(--gray-700);margin-bottom:16px;">
          Caesar Cipher adalah teknik enkripsi kuno dengan menggeser huruf sejumlah tertentu.
        </p>

        <div class="sim-row" style="justify-content:center;">
          <label>🔑 Kunci (pergeseran):</label>
          <input type="range" class="enc-slider" id="shiftSlider" min="1" max="25" value="${shiftVal}"
                 oninput="document.getElementById('shiftVal').textContent=this.value;EncryptionSim._update();">
          <span id="shiftVal" style="font-weight:700;min-width:30px;">${shiftVal}</span>
        </div>

        <div class="enc-io">
          <div>
            <label>📝 Plain Text (teks asli):</label>
            <textarea class="enc-textarea" id="plainText" placeholder="Ketik teks di sini..."
                      oninput="EncryptionSim._update()">${this._escHtml(inputText)}</textarea>
          </div>
          <div style="display:flex;align-items:center;justify-content:center;font-size:2rem;">
            🔒
          </div>
          <div>
            <label>🔒 Cipher Text (terenkripsi):</label>
            <textarea class="enc-textarea enc-output" id="cipherText" readonly
                      placeholder="Hasil enkripsi...">${this._escHtml(outputText)}</textarea>
          </div>
        </div>

        <div class="sim-row" style="justify-content:center;flex-wrap:wrap;font-family:monospace;font-size:0.85rem;overflow-x:auto;" id="encMap">
          ${this._generateMap(shiftVal)}
        </div>

        <div class="flex-center mt-2">
          <button class="btn btn-primary btn-sm" onclick="EncryptionSim._swap()">🔄 Tukar (Dekripsi)</button>
          <button class="btn btn-secondary btn-sm" onclick="EncryptionSim.render()">🗑️ Reset</button>
        </div>

        <div class="sim-output" id="encSteps" style="font-size:0.85rem;max-height:200px;overflow-y:auto;">
          💡 <b>Cara kerja:</b> Setiap huruf digeser ${shiftVal} posisi dalam alfabet.
          Huruf 'A' → '${String.fromCharCode(65 + shiftVal)}', 'B' → '${String.fromCharCode(66 + shiftVal)}', dst.
        </div>

        <div class="flex-center mt-2">
          <button class="btn btn-secondary" onclick="App.goBack()">📚 Kembali</button>
        </div>
      </div>
    `;
  },

  _escHtml(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  },

  _generateMap(shift) {
    let html = '<div style="display:flex;gap:2px;flex-wrap:wrap;">';
    for (let i = 0; i < 26; i++) {
      const from = String.fromCharCode(65 + i);
      const to = String.fromCharCode(65 + (i + shift) % 26);
      html += `<span style="background:var(--blue-light);padding:2px 6px;border-radius:4px;font-size:0.75rem;">${from}→${to}</span>`;
    }
    html += '</div>';
    return html;
  },

  _caesar(text, shift, decrypt = false) {
    const s = decrypt ? (26 - (shift % 26)) : (shift % 26);
    let result = '';
    for (const ch of text) {
      if (ch >= 'A' && ch <= 'Z') {
        result += String.fromCharCode(((ch.charCodeAt(0) - 65 + s) % 26) + 65);
      } else if (ch >= 'a' && ch <= 'z') {
        result += String.fromCharCode(((ch.charCodeAt(0) - 97 + s) % 26) + 97);
      } else {
        result += ch;
      }
    }
    return result;
  },

  _update() {
    const shift = parseInt(document.getElementById('shiftSlider').value);
    const plain = document.getElementById('plainText').value;
    const cipher = this._caesar(plain, shift);
    document.getElementById('cipherText').value = cipher;
    document.getElementById('encMap').innerHTML = this._generateMap(shift);
    document.getElementById('encSteps').innerHTML = `
      💡 <b>Cara kerja:</b> Setiap huruf digeser ${shift} posisi.<br>
      ➡️ Enkripsi: <code>${plain.substring(0, 20)}${plain.length > 20 ? '...' : ''}</code> 
      → <code style="color:#00FF88;">${cipher.substring(0, 20)}${cipher.length > 20 ? '...' : ''}</code>
    `;
  },

  _swap() {
    const cipher = document.getElementById('cipherText').value;
    const shift = parseInt(document.getElementById('shiftSlider').value);
    const plain = this._caesar(cipher, shift, true);
    this.render(shift, cipher, plain);
  }
};
