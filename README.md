# Patna Mahanagar Team Dynamic IDI Analytics Dashboard

A modern, responsive, and dynamic analytics dashboard built for tracking and visualizing Team IDI progress with **real-time Google Sheets auto-synchronization**, multi-report switching, interactive charts, and sharable progress links.

---

## 🚀 Key Features

1. **Pixel-Perfect 6-Card Dashboard Layout**:
   - **Meeting Status**: Total Meetings, Political Meetings, Non-Political Meetings + Interactive Donut Chart with center total & percentages.
   - **Onboarding Status**: Onboarded, Dicey, Not Onboarded + 3-Segment Donut Chart.
   - **Key Takeaways**: 5 highlighted summary metrics with colorful rounded square icons.
   - **PK Intervention**: Yes vs. No with Donut Chart.
   - **Wants To Host PK Tea**: Yes vs. No with Donut Chart.
   - **Committee Recommendation**: State, District, Ward + Horizontal comparative progress bars.

2. **Google Sheets Live Auto-Sync**:
   - Pre-connected to your published Google Sheet: `https://docs.google.com/spreadsheets/d/e/2PACX-1vRQb0jRQdRJpvpnmpOl4eZP9i9RLuKrK07CFY--Tbbhbc_3MEuIkoPxCjpdXjA2aNjda0Ii7_pw5CDC/pub?output=csv`
   - Configurable auto-refresh frequency (10s, 30s, 1m, 5m).
   - Live countdown badge and manual "Sync Now" button.
   - Smart parser: Handles both raw IDI survey logs and summary metric tables.

3. **Multi-Report & Assembly Selector**:
   - Easily switch between assemblies (e.g., *181 - Digha*, *182 - Bankipur*, *183 - Kumhrar*, *184 - Patna Sahib*, *Patna Mahanagar Overall*, or *Consolidated Grand Total*).
   - Instant re-rendering of all metrics and charts on selection.

4. **Sharable Progress Links & Mobile QR Code**:
   - **Direct Deep-Link**: Share links like `?report=183_kumhrar_assembly` so users open directly into their team's report.
   - **1-Click WhatsApp Broadcast**: Formats a message with latest metrics and the live link.
   - **Mobile QR Code**: Anyone can scan with their phone camera to view live progress.
   - **Local Wi-Fi Access**: Open from any device on your Wi-Fi using `http://192.168.1.5:3000`.

5. **Data Management & Export**:
   - **Interactive In-Browser Data Editor**: Add, edit, or delete reports on the fly.
   - **Cross-Report Comparison Table**: Side-by-side KPI comparison across all teams.
   - **Export Options**: High-resolution PNG, PDF, and Print-ready view.
   - **Theme Support**: Dark mode & Light mode toggle.

---

## 🌐 How to Host & Share Online 24/7 (Free)

You can share this live dashboard with your team anywhere in the world using any of these free static hosting options:

### Option A: Netlify Drop (Takes 30 Seconds, No Code Required)
1. Go to [https://app.netlify.com/drop](https://app.netlify.com/drop).
2. Drag and drop the `e:\Reports` folder into the browser.
3. You will instantly get a permanent public link like `https://patna-idi-dashboard.netlify.app` that auto-updates whenever your Google Sheet changes!

### Option B: GitHub Pages (Free Permanent Hosting)
1. Create a repository on GitHub (e.g. `patna-idi-dashboard`).
2. Push the files from `e:\Reports`.
3. Go to **Settings &rarr; Pages &rarr; Source: main branch**.
4. Your live link will be `https://<your-username>.github.io/patna-idi-dashboard/`.

### Option C: Local Network / Wi-Fi
Anyone connected to the same Wi-Fi or office network can open:
`http://192.168.1.5:3000`

---

## 🛠️ How to Run Locally

If you ever restart the local server, run:
```bash
python -m http.server 3000
```
Then open `http://localhost:3000` in any browser.
