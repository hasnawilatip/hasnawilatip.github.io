/* ══════════════════════════════════════════════════════════
   SHEETS CONFIG — URL Google Apps Script
   Ganti URL di bawah dengan URL deploy Anda
   ══════════════════════════════════════════════════════════ */

const SheetsDB = {
  // GANTI dengan URL dari Google Apps Script deploy
  API_URL: 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec',

  /** Set API URL (bisa dari admin settings) */
  setUrl(url) {
    localStorage.setItem('admin_sheets_url', url);
    this.API_URL = url;
  },

  getUrl() {
    return localStorage.getItem('admin_sheets_url') || this.API_URL;
  },

  /** Cek apakah Sheets dikonfigurasi */
  isConfigured() {
    const url = this.getUrl();
    return url && !url.includes('YOUR_SCRIPT_ID');
  },

  /** Panggil Apps Script API */
  async _call(action, data) {
    const url = this.getUrl();
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ action, data: data || {} })
    });

    if (!response.ok) throw new Error('Server error: ' + response.status);
    const result = await response.json();
    if (result.error) throw new Error(result.error);
    return result;
  }
};
