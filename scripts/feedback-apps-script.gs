/**
 * Receives event feedback from mhcplus.plus (src/app/feedback/actions.ts)
 * and appends it to this spreadsheet.
 *
 * Setup:
 *  1. Create a Google Sheet, then Extensions > Apps Script, and paste this file.
 *  2. Project Settings > Script properties: add SECRET = <same value as FEEDBACK_SECRET>.
 *  3. Deploy > New deployment > Web app. Execute as: Me. Who has access: Anyone.
 *  4. Put the web app URL in FEEDBACK_SCRIPT_URL (.env.local and Vercel).
 *
 * After editing this script, redeploy (Manage deployments > Edit > New version).
 * Each event gets its own tab ("YYYY-MM-DD Title"); every response is also
 * appended to the "All" tab for cross-event analysis.
 */

var COLUMNS = [
  ['Timestamp', function (d, now) { return now; }],
  ['Event', function (d) { return d.eventTitle; }],
  ['Event date', function (d) { return d.eventDate; }],
  ['Event type', function (d) { return d.eventType; }],
  ['First name', function (d) { return d.firstName; }],
  ['Last name', function (d) { return d.lastName; }],
  ['Email', function (d) { return d.email; }],
  ['Overall (1-5)', function (d) { return d.overall; }],
  ['Access (1-5)', function (d) { return d.access; }],
  ['Relevance (1-5)', function (d) { return d.relevance; }],
  ['Speaker (1-5)', function (d) { return d.speaker === null ? '' : d.speaker; }],
  ['Enjoyed', function (d) { return (d.enjoyed || []).join(', '); }],
  ['Enjoyed (other)', function (d) { return d.enjoyedOther; }],
  ['Improve', function (d) { return d.improve; }],
  ['Topics wanted', function (d) { return d.topics; }],
  ['Recommend (1-5)', function (d) { return d.recommend; }],
  ['Comments', function (d) { return d.comments; }],
];

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var secret = PropertiesService.getScriptProperties().getProperty('SECRET');
    if (!secret || data.secret !== secret) return json({ ok: false, error: 'unauthorized' });

    var lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      var now = new Date();
      var row = COLUMNS.map(function (c) { return sanitize(c[1](data, now)); });
      append(tabName(data), row);
      append('All', row);
    } finally {
      lock.releaseLock();
    }
    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

function append(name, row) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    sheet.appendRow(COLUMNS.map(function (c) { return c[0]; }));
    sheet.setFrozenRows(1);
  }
  sheet.appendRow(row);
}

// Sheet names can't contain []*/\?: and max out at 100 characters.
function tabName(d) {
  return (d.eventDate + ' ' + d.eventTitle).replace(/[\[\]*\/\\?:]/g, '-').slice(0, 100);
}

// Stop free-text from being interpreted as a formula.
function sanitize(v) {
  return typeof v === 'string' && /^[=+\-@]/.test(v) ? "'" + v : v;
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
