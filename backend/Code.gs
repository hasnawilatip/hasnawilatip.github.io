/* ══════════════════════════════════════════════════════════
   Google Apps Script — Backend Database untuk
   Media Interaktif SMP/MTs
   ══════════════════════════════════════════════════════════
   CARA SETUP:
   1. Buka https://script.google.com → New Project
   2. Copy-paste SELURUH kode ini
   3. Deploy → New Deployment → Web App
      - Execute as: Me
      - Who has access: Anyone
   4. Copy URL yang muncul (misal: https://script.google.com/macros/s/xxx/exec)
   5. Paste URL ini ke file: js/sheets-config.js
   ══════════════════════════════════════════════════════════ */

const SHEET_NAME = 'MediaInteraktifDB';

function doGet(e) {
  return handleRequest(e);
}

function doPost(e) {
  return handleRequest(e);
}

function handleRequest(e) {
  try {
    const action = e.parameter.action;
    const data = e.parameter.data ? JSON.parse(e.parameter.data) : {};
    if (!action) return response({ error: 'No action' });

    switch (action) {
      case 'getUsers':       return response(getUsers());
      case 'register':       return response(registerUser(data));
      case 'login':          return response(loginUser(data));
      case 'getContent':     return response(getContent(data.subjectId));
      case 'saveContent':    return response(saveContent(data));
      case 'getProgress':    return response(getProgress(data.username));
      case 'saveProgress':   return response(saveProgress(data));
      case 'getAllProgress': return response(getAllProgress());
      case 'getAllUsers':    return response(getAllUsersData());
      default: return response({ error: 'Unknown: ' + action });
    }
  } catch (err) {
    return response({ error: err.message });
  }
}

function response(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

// ─── ENSURE SPREADSHEET EXISTS ───
function getOrCreateSpreadsheet() {
  // Cek apakah sudah ada spreadsheet tersimpan
  const props = PropertiesService.getScriptProperties();
  let ssId = props.getProperty('SPREADSHEET_ID');

  if (ssId) {
    try {
      return SpreadsheetApp.openById(ssId);
    } catch (e) {
      // Spreadsheet dihapus, buat baru
    }
  }

  // Buat spreadsheet baru
  const ss = SpreadsheetApp.create('MediaInteraktifDB');
  ssId = ss.getId();
  props.setProperty('SPREADSHEET_ID', ssId);

  // Setup sheet awal
  setupSheets(ss);
  return ss;
}

function ensureSheets() {
  const ss = getOrCreateSpreadsheet();
  setupSheets(ss);
  return ss;
}

function setupSheets(ss) {
  const names = ['users', 'content', 'progress'];
  names.forEach(name => {
    let sheet = ss.getSheetByName(name);
    if (!sheet) {
      sheet = ss.insertSheet(name);
      if (name === 'users') {
        sheet.appendRow(['username', 'passwordHash', 'displayName', 'role', 'createdAt']);
        sheet.appendRow(['admin', hashPassword('admin123'), 'Administrator', 'admin', new Date().toISOString()]);
      }
      if (name === 'content') {
        sheet.appendRow(['subjectId', 'gradeKey', 'dataJson', 'updatedAt']);
      }
      if (name === 'progress') {
        sheet.appendRow(['username', 'progressJson', 'updatedAt']);
      }
    }
    // Hapus sheet default "Sheet1" jika ada
    const defaultSheet = ss.getSheetByName('Sheet1');
    if (defaultSheet) ss.deleteSheet(defaultSheet);
  });
}

// ─── SIMPLE HASH ───
function hashPassword(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return 'h_' + Math.abs(hash).toString(36) + '_' + str.length.toString(36);
}

// ─── USERS ───
function getUsers() {
  const ss = ensureSheets();
  const sheet = ss.getSheetByName('users');
  const rows = sheet.getDataRange().getValues();
  const users = {};
  for (let i = 1; i < rows.length; i++) {
    const r = rows[i];
    if (r[0]) users[r[0]] = { passwordHash: r[1], displayName: r[2], role: r[3], createdAt: r[4] };
  }
  return users;
}

function getAllUsersData() {
  const ss = ensureSheets();
  const sheet = ss.getSheetByName('users');
  const rows = sheet.getDataRange().getValues();
  const users = [];
  for (let i = 1; i < rows.length; i++) {
    const r = rows[i];
    if (r[0]) users.push({ username: r[0], displayName: r[2], role: r[3], createdAt: r[4] });
  }
  return users;
}

function registerUser(data) {
  const users = getUsers();
  const key = data.username.toLowerCase().trim();
  if (users[key]) return { error: 'Username sudah terdaftar.' };
  if (data.role === 'admin' && data.adminCode !== 'mtsadmin2026') return { error: 'Kode admin tidak valid.' };

  const ss = ensureSheets();
  const sheet = ss.getSheetByName('users');
  sheet.appendRow([key, hashPassword(data.password), data.displayName || key, data.role || 'siswa', new Date().toISOString()]);
  return { success: true, message: 'Registrasi berhasil!' };
}

function loginUser(data) {
  const users = getUsers();
  const key = data.username.toLowerCase().trim();
  const user = users[key];
  if (!user) return { error: 'Username tidak ditemukan.' };
  if (user.passwordHash !== hashPassword(data.password)) return { error: 'Password salah.' };
  return { success: true, user: { username: key, displayName: user.displayName, role: user.role } };
}

// ─── CONTENT ───
function getContent(subjectId) {
  const ss = ensureSheets();
  const sheet = ss.getSheetByName('content');
  const rows = sheet.getDataRange().getValues();
  const result = {};
  for (let i = 1; i < rows.length; i++) {
    const r = rows[i];
    if (r[0] === subjectId) {
      if (!result[r[0]]) result[r[0]] = {};
      result[r[0]][r[1]] = JSON.parse(r[2]);
    }
  }
  return result;
}

function saveContent(data) {
  const ss = ensureSheets();
  const sheet = ss.getSheetByName('content');
  const rows = sheet.getDataRange().getValues();

  // Hapus baris lama untuk subjectId + gradeKey ini
  for (let i = rows.length - 1; i >= 1; i--) {
    if (rows[i][0] === data.subjectId) {
      sheet.deleteRow(i + 1);
    }
  }

  // Simpan baru
  for (const gradeKey of ['k7', 'k8', 'k9']) {
    if (data.overrides[gradeKey]) {
      sheet.appendRow([data.subjectId, gradeKey, JSON.stringify(data.overrides[gradeKey]), new Date().toISOString()]);
    }
  }
  return { success: true };
}

// ─── PROGRESS ───
function getProgress(username) {
  const ss = ensureSheets();
  const sheet = ss.getSheetByName('progress');
  const rows = sheet.getDataRange().getValues();
  for (let i = 1; i < rows.length; i++) {
    if (rows[i][0] === username) return JSON.parse(rows[i][1]);
  }
  return null;
}

function saveProgress(data) {
  const ss = ensureSheets();
  const sheet = ss.getSheetByName('progress');
  const rows = sheet.getDataRange().getValues();

  // Hapus baris lama
  for (let i = rows.length - 1; i >= 1; i--) {
    if (rows[i][0] === data.username) sheet.deleteRow(i + 1);
  }

  sheet.appendRow([data.username, JSON.stringify(data.progress), new Date().toISOString()]);
  return { success: true };
}

function getAllProgress() {
  const ss = ensureSheets();
  const sheet = ss.getSheetByName('progress');
  const rows = sheet.getDataRange().getValues();
  const result = [];
  for (let i = 1; i < rows.length; i++) {
    if (rows[i][0]) result.push({ username: rows[i][0], progress: JSON.parse(rows[i][1]), updatedAt: rows[i][2] });
  }
  return result;
}
