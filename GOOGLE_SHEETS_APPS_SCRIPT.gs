/**
 * Dr. Aditya Soni Clinic — lead capture into Google Sheets.
 * Paste this into Extensions → Apps Script of your sheet, then Deploy → Web app.
 */
var SHARED_TOKEN = "drsoni-sheet-2026"; // must match GOOGLE_SHEETS_TOKEN in the app

var HEADERS = [
  "Received", "Name", "Phone", "Source", "Language", "Concern track",
  "Score", "Risk band", "Concern", "Preferred time", "Answers", "Lead ID"
];

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    if (SHARED_TOKEN && data.token !== SHARED_TOKEN) {
      return json({ ok: false, error: "unauthorized" });
    }

    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
      sheet.setFrozenRows(1);
    }

    sheet.appendRow([
      data.received || new Date().toISOString(),
      data.name || "",
      "'" + (data.phone || ""),
      data.source || "",
      data.language || "",
      data.concern_track || "",
      data.score || "",
      data.risk_band || "",
      data.concern || "",
      data.preferred_time || "",
      data.answers || "",
      data.lead_id || ""
    ]);

    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

function doGet() {
  return json({ ok: true, service: "Dr. Soni Clinic lead capture" });
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
