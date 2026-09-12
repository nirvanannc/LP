# Connect leads to Google Sheets (5 minutes)

Every self-check and booking lead already lands in your dashboard and your inbox.
This adds a live copy into a Google Sheet.

## Step 1 — Create the sheet
1. Open https://sheets.new (you'll be logged in as your clinic Google account).
2. Rename it something like **Dr. Soni — Leads**.

## Step 2 — Add the script
1. In that sheet, click **Extensions → Apps Script**.
2. Delete whatever code is in the editor.
3. Open `/app/GOOGLE_SHEETS_APPS_SCRIPT.gs` (the agent will paste the code in chat for you) and paste all of it.
4. Click the **save** (disk) icon.

## Step 3 — Deploy it as a Web App
1. Click **Deploy → New deployment**.
2. Click the gear next to "Select type" and choose **Web app**.
3. Fill in:
   - Description: `Clinic leads`
   - **Execute as: Me** (your own account)
   - **Who has access: Anyone**
4. Click **Deploy**.
5. Google will ask you to **Authorize access** → choose your account → "Advanced" →
   "Go to (project name) (unsafe)" → **Allow**. (It says "unsafe" only because the script
   is yours and not Google-verified; it can only write to this one sheet.)
6. Copy the **Web app URL**. It looks like:
   `https://script.google.com/macros/s/AKfy..../exec`

## Step 4 — Send the URL to the agent
Paste that URL in the chat. It gets stored in the backend as `GOOGLE_SHEETS_WEBHOOK_URL`
(never in the frontend), and every new lead is appended within a second or two.

## Notes
- A shared token (`GOOGLE_SHEETS_TOKEN`, currently `drsoni-sheet-2026`) is sent with each
  row, and the script rejects anything without it — so random people can't write to your sheet.
- If Sheets is ever down or the URL changes, the lead is still saved to the dashboard and
  emailed; only the sheet copy is skipped (and logged).
- Changed the script later? Use **Deploy → Manage deployments → edit → Deploy** so the URL
  stays the same.
