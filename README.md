# THE SMART MODERN PUBLIC SCHOOL QAMBER
## School Management System / School ERP

A complete, modern, professional School Management System built with HTML5, CSS3, Vanilla JavaScript, Font Awesome, and Chart.js.

**Data is stored in browser LocalStorage** and is structured for easy future migration to Firebase, Supabase, MySQL or any backend API.

---

### Initial Administrator Credentials

| Role        | Username         | Password            |
|-------------|------------------|---------------------|
| **Admin**   | `Muneer Ahmed`   | `Muneer Ahmed 1234` |
| Principal   | `principal`      | `principal123`      |
| Teacher     | `teacher`        | `teacher123`        |
| Accountant  | `accountant`     | `accountant123`     |
| Staff       | `staff`          | `staff123`          |

---

### Features

- Professional Login with role-based access
- Dashboard with live stats & Chart.js charts
- Student Management (CRUD, search, filter, profile)
- Teacher Management (CRUD)
- Staff Management
- Parent Profiles
- Classes & Sections
- Subjects
- Attendance System (present / absent / leave)
- Timetable
- Homework Management
- Exam Schedule & Results
- Fee Management (structure, collect, receipts, print)
- Expense Management
- Admissions (approve / reject)
- Leave Management
- Notices & Announcements
- Notifications
- Library Catalogue
- Transport (vehicles & routes)
- Inventory & Stock
- Events & Activities
- Reports & CSV Export
- Settings (School profile, change username/password)
- WhatsApp contact button (0304886710)
- Fully responsive (mobile, tablet, desktop)
- Print-friendly pages
- Toast notifications & modals

---

### Folder Structure

```
school-management-system/
├── index.html          # Redirects to login/dashboard
├── login.html          # Login page
├── dashboard.html      # Main application shell
├── css/
│   ├── style.css
│   └── responsive.css
├── js/
│   ├── storage.js      # LocalStorage + seed data
│   ├── auth.js         # Authentication & roles
│   └── app.js          # Main application logic
└── README.md
```

---

### How to Run Locally

1. Download / clone the project folder.
2. Open `login.html` or `index.html` in any modern browser (Chrome, Firefox, Edge).
3. Or use a local server:
   ```bash
   python -m http.server 8000
   # Then open http://localhost:8000
   ```
4. Login with the administrator credentials above.

**No build step required.** Pure static files.

---

### How to Deploy on GitHub Pages

1. Create a new GitHub repository.
2. Upload all files from `school-management-system/`.
3. Go to **Settings → Pages**.
4. Source: Deploy from branch `main` / root.
5. Your site will be live at `https://username.github.io/repo-name/`.

---

### Data Persistence (LocalStorage)

All data is stored under keys prefixed with `sms_`:

- `sms_students`, `sms_teachers`, `sms_staff`, `sms_parents`
- `sms_classes`, `sms_subjects`, `sms_attendance`
- `sms_fees`, `sms_fee_payments`, `sms_fee_structure`
- `sms_library`, `sms_vehicles`, `sms_routes`, `sms_inventory`
- `sms_expenses`, `sms_events`, `sms_notices`, `sms_notifications`
- `sms_users`, `sms_settings`, `sms_current_user`

Clearing browser data will reset the system. Use **Settings → Reset System Data** (internal reset) only when needed.

---

### How to Connect Firebase / Supabase / MySQL Later

The architecture is modular:

- `storage.js` contains `getData()`, `saveData()`, `updateData()`, `deleteData()`.
- Replace these functions with Firebase Firestore / Supabase client / REST API calls.
- Keep the same data structure (arrays of objects with `id` field).
- Move authentication to Firebase Auth / Supabase Auth.
- Never store passwords in plain text in production — use hashing on the server.

Example (Firebase):
```js
async function getData(key) {
  const snap = await getDocs(collection(db, key));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}
```

---

### Important Notes

- This is a frontend application. All data lives in the browser until a backend is connected.
- Passwords are stored in plain text **only for local/offline use**. Use proper hashing + backend in production.
- WhatsApp number: **0304886710**
- School: **THE SMART MODERN PUBLIC SCHOOL QAMBER**

---

### Browser Support

Chrome, Firefox, Safari, Edge (latest versions). Fully responsive on mobile and tablet.
