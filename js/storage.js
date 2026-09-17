/**
 * LocalStorage Manager for School Management System
 * Data is stored in browser LocalStorage. Ready for backend migration.
 */

const STORAGE_KEYS = {
  students: 'sms_students',
  teachers: 'sms_teachers',
  staff: 'sms_staff',
  parents: 'sms_parents',
  classes: 'sms_classes',
  sections: 'sms_sections',
  subjects: 'sms_subjects',
  attendance: 'sms_attendance',
  teacherAttendance: 'sms_teacher_attendance',
  timetable: 'sms_timetable',
  homework: 'sms_homework',
  exams: 'sms_exams',
  results: 'sms_results',
  fees: 'sms_fees',
  feePayments: 'sms_fee_payments',
  feeStructure: 'sms_fee_structure',
  admissions: 'sms_admissions',
  leaves: 'sms_leaves',
  notices: 'sms_notices',
  notifications: 'sms_notifications',
  users: 'sms_users',
  settings: 'sms_settings',
  library: 'sms_library',
  libraryIssues: 'sms_library_issues',
  vehicles: 'sms_vehicles',
  routes: 'sms_routes',
  inventory: 'sms_inventory',
  expenses: 'sms_expenses',
  events: 'sms_events',
  currentUser: 'sms_current_user',
  initialized: 'sms_initialized'
};

function generateId(prefix = 'ID') {
  return prefix + '_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

function getData(key) {
  try {
    const data = localStorage.getItem(STORAGE_KEYS[key] || key);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Error reading data:', e);
    return [];
  }
}

function saveData(key, data) {
  try {
    localStorage.setItem(STORAGE_KEYS[key] || key, JSON.stringify(data));
    return true;
  } catch (e) {
    console.error('Error saving data:', e);
    return false;
  }
}

function updateData(key, id, updates) {
  const items = getData(key);
  const index = items.findIndex(item => item.id === id);
  if (index !== -1) {
    items[index] = { ...items[index], ...updates, updatedAt: new Date().toISOString() };
    saveData(key, items);
    return items[index];
  }
  return null;
}

function deleteData(key, id) {
  const items = getData(key);
  const filtered = items.filter(item => item.id !== id);
  saveData(key, filtered);
  return filtered;
}

function findById(key, id) {
  const items = getData(key);
  return items.find(item => item.id === id) || null;
}

function getSettings() {
  const defaultSettings = {
    schoolName: 'THE SMART MODERN PUBLIC SCHOOL QAMBER',
    schoolAddress: 'Qamber, Pakistan',
    schoolPhone: '0304-886710',
    schoolEmail: 'info@smartmodernschool.edu.pk',
    schoolWebsite: 'www.smartmodernschool.edu.pk',
    principalName: 'Muneer Ahmed',
    registrationNumber: 'SMS-QBR-2020',
    academicSession: '2026-2027',
    currency: 'PKR',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: '12h',
    passingPercentage: 50,
    gradeSystem: [
      { grade: 'A+', min: 90, max: 100 },
      { grade: 'A', min: 80, max: 89 },
      { grade: 'B', min: 70, max: 79 },
      { grade: 'C', min: 60, max: 69 },
      { grade: 'D', min: 50, max: 59 },
      { grade: 'F', min: 0, max: 49 }
    ],
    logo: null,
    whatsapp: '0304886710'
  };
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.settings);
    return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings;
  } catch (e) {
    return defaultSettings;
  }
}

function saveSettings(settings) {
  localStorage.setItem(STORAGE_KEYS.settings, JSON.stringify(settings));
}

function initSeedData() {
  if (localStorage.getItem(STORAGE_KEYS.initialized)) return;

  // Users
  const users = [
    {
      id: 'USR_ADMIN',
      username: 'Muneer Ahmed',
      password: 'Muneer Ahmed 1234', 
      role: 'admin',
      name: 'Muneer Ahmed',
      email: 'admin@smartmodernschool.edu.pk',
      status: 'active',
      createdAt: new Date().toISOString()
    },
    {
      id: 'USR_PRINCIPAL',
      username: 'principal',
      password: 'principal123',
      role: 'principal',
      name: 'Principal',
      email: 'principal@smartmodernschool.edu.pk',
      status: 'active'
    },
    {
      id: 'USR_TEACHER',
      username: 'teacher',
      password: 'teacher123',
      role: 'teacher',
      name: 'Teacher',
      email: 'teacher@smartmodernschool.edu.pk',
      status: 'active'
    },
    {
      id: 'USR_ACCOUNTANT',
      username: 'accountant',
      password: 'accountant123',
      role: 'accountant',
      name: 'Accountant',
      email: 'accounts@smartmodernschool.edu.pk',
      status: 'active'
    },
    {
      id: 'USR_STAFF',
      username: 'staff',
      password: 'staff123',
      role: 'staff',
      name: 'Staff',
      email: 'staff@smartmodernschool.edu.pk',
      status: 'active'
    }
  ];
  saveData('users', users);

  // Classes
  const classes = [
    { id: 'CLS1', name: 'Grade 1', sections: ['A', 'B'], capacity: 40 },
    { id: 'CLS2', name: 'Grade 2', sections: ['A', 'B'], capacity: 40 },
    { id: 'CLS3', name: 'Grade 3', sections: ['A', 'B', 'C'], capacity: 45 },
    { id: 'CLS4', name: 'Grade 4', sections: ['A', 'B'], capacity: 40 },
    { id: 'CLS5', name: 'Grade 5', sections: ['A', 'B'], capacity: 40 },
    { id: 'CLS6', name: 'Grade 6', sections: ['A', 'B'], capacity: 40 }
  ];
  saveData('classes', classes);

  // Subjects
  const subjects = [
    { id: 'SUB1', name: 'Mathematics', code: 'MATH', maxMarks: 100, passMarks: 40 },
    { id: 'SUB2', name: 'English', code: 'ENG', maxMarks: 100, passMarks: 40 },
    { id: 'SUB3', name: 'Urdu', code: 'URD', maxMarks: 100, passMarks: 40 },
    { id: 'SUB4', name: 'Science', code: 'SCI', maxMarks: 100, passMarks: 40 },
    { id: 'SUB5', name: 'Islamiat', code: 'ISL', maxMarks: 100, passMarks: 40 },
    { id: 'SUB6', name: 'Social Studies', code: 'SST', maxMarks: 100, passMarks: 40 },
    { id: 'SUB7', name: 'Computer', code: 'CS', maxMarks: 100, passMarks: 40 },
    { id: 'SUB8', name: 'Art', code: 'ART', maxMarks: 50, passMarks: 20 }
  ];
  saveData('subjects', subjects);

  // Teachers
  const teachers = [
    { id: 'TCH1', name: 'Ahmed Khan', fatherName: 'Muhammad Khan', gender: 'Male', dob: '1985-03-15', phone: '03001234567', email: 'ahmed@school.edu.pk', qualification: 'M.Sc Mathematics', experience: 10, joiningDate: '2018-08-01', designation: 'Senior Teacher', subjects: ['Mathematics'], classes: ['Grade 5', 'Grade 6'], salary: 65000, status: 'active' },
    { id: 'TCH2', name: 'Fatima Ali', fatherName: 'Ali Raza', gender: 'Female', dob: '1990-07-22', phone: '03009876543', email: 'fatima@school.edu.pk', qualification: 'M.A English', experience: 7, joiningDate: '2019-03-15', designation: 'Teacher', subjects: ['English'], classes: ['Grade 3', 'Grade 4'], salary: 55000, status: 'active' },
    { id: 'TCH3', name: 'Bilal Hussain', fatherName: 'Hussain Ahmed', gender: 'Male', dob: '1988-11-05', phone: '03005556677', email: 'bilal@school.edu.pk', qualification: 'B.Ed Science', experience: 8, joiningDate: '2017-09-01', designation: 'Science Teacher', subjects: ['Science'], classes: ['Grade 4', 'Grade 5'], salary: 58000, status: 'active' },
    { id: 'TCH4', name: 'Sana Malik', fatherName: 'Malik Riaz', gender: 'Female', dob: '1992-01-18', phone: '03001112233', email: 'sana@school.edu.pk', qualification: 'M.A Urdu', experience: 5, joiningDate: '2020-02-10', designation: 'Teacher', subjects: ['Urdu'], classes: ['Grade 1', 'Grade 2'], salary: 50000, status: 'active' },
    { id: 'TCH5', name: 'Usman Shah', fatherName: 'Shahid Ali', gender: 'Male', dob: '1987-09-30', phone: '03004445566', email: 'usman@school.edu.pk', qualification: 'M.Sc Computer Science', experience: 6, joiningDate: '2019-08-20', designation: 'Computer Teacher', subjects: ['Computer'], classes: ['Grade 5', 'Grade 6'], salary: 60000, status: 'active' },
    { id: 'TCH6', name: 'Ayesha Noor', fatherName: 'Noor Muhammad', gender: 'Female', dob: '1991-04-12', phone: '03007778899', email: 'ayesha@school.edu.pk', qualification: 'M.A Islamiat', experience: 4, joiningDate: '2021-01-05', designation: 'Teacher', subjects: ['Islamiat'], classes: ['Grade 1', 'Grade 2', 'Grade 3'], salary: 48000, status: 'active' },
    { id: 'TCH7', name: 'Imran Baig', fatherName: 'Baig Sahib', gender: 'Male', dob: '1984-06-25', phone: '03003334455', email: 'imran@school.edu.pk', qualification: 'M.A Social Studies', experience: 12, joiningDate: '2015-04-01', designation: 'Senior Teacher', subjects: ['Social Studies'], classes: ['Grade 4', 'Grade 5', 'Grade 6'], salary: 70000, status: 'active' },
    { id: 'TCH8', name: 'Nadia Qureshi', fatherName: 'Qureshi Sahib', gender: 'Female', dob: '1993-08-08', phone: '03006667788', email: 'nadia@school.edu.pk', qualification: 'B.Ed Art', experience: 3, joiningDate: '2022-03-15', designation: 'Art Teacher', subjects: ['Art'], classes: ['Grade 1', 'Grade 2', 'Grade 3'], salary: 45000, status: 'active' },
    { id: 'TCH9', name: 'Kamran Ali', fatherName: 'Ali Akbar', gender: 'Male', dob: '1989-12-14', phone: '03009998877', email: 'kamran@school.edu.pk', qualification: 'M.Sc Physics', experience: 9, joiningDate: '2016-07-01', designation: 'Science Teacher', subjects: ['Science'], classes: ['Grade 6'], salary: 62000, status: 'active' },
    { id: 'TCH10', name: 'Hina Raza', fatherName: 'Raza Khan', gender: 'Female', dob: '1990-02-28', phone: '03002223344', email: 'hina@school.edu.pk', qualification: 'M.A English Literature', experience: 6, joiningDate: '2019-11-01', designation: 'Teacher', subjects: ['English'], classes: ['Grade 5', 'Grade 6'], salary: 54000, status: 'active' }
  ];
  saveData('teachers', teachers);

  // Students (20)
  const students = [
    { id: 'STU1', admissionNo: 'ADM-2024-001', name: 'Ali Hassan', fatherName: 'Hassan Raza', motherName: 'Saima Hassan', dob: '2015-05-12', gender: 'Male', className: 'Grade 5', section: 'A', rollNo: 1, phone: '03001110001', email: 'ali.parent@email.com', address: 'Street 5, Qamber', city: 'Qamber', admissionDate: '2024-04-01', previousSchool: 'ABC Primary', bloodGroup: 'B+', emergencyContact: '03001110002', status: 'active' },
    { id: 'STU2', admissionNo: 'ADM-2024-002', name: 'Ayesha Khan', fatherName: 'Khan Sahib', motherName: 'Fatima Khan', dob: '2015-08-20', gender: 'Female', className: 'Grade 5', section: 'A', rollNo: 2, phone: '03001110003', email: 'ayesha.p@email.com', address: 'Main Road, Qamber', city: 'Qamber', admissionDate: '2024-04-01', previousSchool: '', bloodGroup: 'A+', emergencyContact: '03001110004', status: 'active' },
    { id: 'STU3', admissionNo: 'ADM-2024-003', name: 'Bilal Ahmed', fatherName: 'Ahmed Malik', motherName: 'Nadia Ahmed', dob: '2016-01-15', gender: 'Male', className: 'Grade 4', section: 'B', rollNo: 5, phone: '03001110005', email: 'bilal.p@email.com', address: 'Colony Road', city: 'Qamber', admissionDate: '2024-04-05', previousSchool: 'XYZ School', bloodGroup: 'O+', emergencyContact: '03001110006', status: 'active' },
    { id: 'STU4', admissionNo: 'ADM-2024-004', name: 'Zara Malik', fatherName: 'Malik Javed', motherName: 'Sana Malik', dob: '2016-03-22', gender: 'Female', className: 'Grade 4', section: 'A', rollNo: 3, phone: '03001110007', email: 'zara.p@email.com', address: 'Near Market', city: 'Qamber', admissionDate: '2024-04-02', previousSchool: '', bloodGroup: 'AB+', emergencyContact: '03001110008', status: 'active' },
    { id: 'STU5', admissionNo: 'ADM-2024-005', name: 'Hamza Ali', fatherName: 'Ali Raza', motherName: 'Maryam Ali', dob: '2014-11-08', gender: 'Male', className: 'Grade 6', section: 'A', rollNo: 1, phone: '03001110009', email: 'hamza.p@email.com', address: 'Block C', city: 'Qamber', admissionDate: '2023-04-01', previousSchool: 'Smart School', bloodGroup: 'B+', emergencyContact: '03001110010', status: 'active' },
    { id: 'STU6', admissionNo: 'ADM-2024-006', name: 'Sana Fatima', fatherName: 'Fatima Husband', motherName: 'Fatima Bibi', dob: '2017-06-30', gender: 'Female', className: 'Grade 3', section: 'A', rollNo: 4, phone: '03001110011', email: 'sana.p@email.com', address: 'Village Road', city: 'Qamber', admissionDate: '2024-04-10', previousSchool: '', bloodGroup: 'A+', emergencyContact: '03001110012', status: 'active' },
    { id: 'STU7', admissionNo: 'ADM-2024-007', name: 'Usman Ghani', fatherName: 'Ghani Khan', motherName: 'Aisha Ghani', dob: '2015-09-14', gender: 'Male', className: 'Grade 5', section: 'B', rollNo: 7, phone: '03001110013', email: 'usman.p@email.com', address: 'New Colony', city: 'Qamber', admissionDate: '2024-04-01', previousSchool: 'Public School', bloodGroup: 'O-', emergencyContact: '03001110014', status: 'active' },
    { id: 'STU8', admissionNo: 'ADM-2024-008', name: 'Hira Noor', fatherName: 'Noor Ahmed', motherName: 'Hina Noor', dob: '2016-12-05', gender: 'Female', className: 'Grade 4', section: 'B', rollNo: 2, phone: '03001110015', email: 'hira.p@email.com', address: 'School Street', city: 'Qamber', admissionDate: '2024-04-03', previousSchool: '', bloodGroup: 'B+', emergencyContact: '03001110016', status: 'active' },
    { id: 'STU9', admissionNo: 'ADM-2024-009', name: 'Omar Farooq', fatherName: 'Farooq Sheikh', motherName: 'Sadia Farooq', dob: '2014-04-18', gender: 'Male', className: 'Grade 6', section: 'B', rollNo: 3, phone: '03001110017', email: 'omar.p@email.com', address: 'Main Bazaar', city: 'Qamber', admissionDate: '2023-04-01', previousSchool: 'City School', bloodGroup: 'A+', emergencyContact: '03001110018', status: 'active' },
    { id: 'STU10', admissionNo: 'ADM-2024-010', name: 'Maryam Bibi', fatherName: 'Bibi Husband', motherName: 'Bibi', dob: '2017-02-25', gender: 'Female', className: 'Grade 3', section: 'B', rollNo: 1, phone: '03001110019', email: 'maryam.p@email.com', address: 'Old Town', city: 'Qamber', admissionDate: '2024-04-08', previousSchool: '', bloodGroup: 'O+', emergencyContact: '03001110020', status: 'active' },
    { id: 'STU11', admissionNo: 'ADM-2024-011', name: 'Saad Khan', fatherName: 'Khan Wali', motherName: 'Rukhsana Khan', dob: '2015-07-07', gender: 'Male', className: 'Grade 5', section: 'A', rollNo: 8, phone: '03001110021', email: 'saad.p@email.com', address: 'Housing Society', city: 'Qamber', admissionDate: '2024-04-01', previousSchool: '', bloodGroup: 'AB+', emergencyContact: '03001110022', status: 'active' },
    { id: 'STU12', admissionNo: 'ADM-2024-012', name: 'Iqra Shah', fatherName: 'Shahid Shah', motherName: 'Nazia Shah', dob: '2016-10-11', gender: 'Female', className: 'Grade 4', section: 'A', rollNo: 6, phone: '03001110023', email: 'iqra.p@email.com', address: 'Canal Road', city: 'Qamber', admissionDate: '2024-04-04', previousSchool: 'Local Academy', bloodGroup: 'B+', emergencyContact: '03001110024', status: 'active' },
    { id: 'STU13', admissionNo: 'ADM-2024-013', name: 'Taha Raza', fatherName: 'Raza Ali', motherName: 'Saba Raza', dob: '2014-08-19', gender: 'Male', className: 'Grade 6', section: 'A', rollNo: 5, phone: '03001110025', email: 'taha.p@email.com', address: 'Phase 2', city: 'Qamber', admissionDate: '2023-04-01', previousSchool: 'Modern School', bloodGroup: 'A+', emergencyContact: '03001110026', status: 'active' },
    { id: 'STU14', admissionNo: 'ADM-2024-014', name: 'Laiba Ahmed', fatherName: 'Ahmed Saeed', motherName: 'Fouzia Ahmed', dob: '2017-05-03', gender: 'Female', className: 'Grade 3', section: 'A', rollNo: 2, phone: '03001110027', email: 'laiba.p@email.com', address: 'Near Mosque', city: 'Qamber', admissionDate: '2024-04-06', previousSchool: '', bloodGroup: 'O+', emergencyContact: '03001110028', status: 'active' },
    { id: 'STU15', admissionNo: 'ADM-2024-015', name: 'Yousuf Malik', fatherName: 'Malik Anwar', motherName: 'Shazia Malik', dob: '2015-12-28', gender: 'Male', className: 'Grade 5', section: 'B', rollNo: 4, phone: '03001110029', email: 'yousuf.p@email.com', address: 'Garden Town', city: 'Qamber', admissionDate: '2024-04-01', previousSchool: '', bloodGroup: 'B+', emergencyContact: '03001110030', status: 'active' },
    { id: 'STU16', admissionNo: 'ADM-2024-016', name: 'Areeba Noor', fatherName: 'Noor Khan', motherName: 'Amna Noor', dob: '2016-06-16', gender: 'Female', className: 'Grade 4', section: 'B', rollNo: 8, phone: '03001110031', email: 'areeba.p@email.com', address: 'Railway Colony', city: 'Qamber', admissionDate: '2024-04-07', previousSchool: 'Kids School', bloodGroup: 'A+', emergencyContact: '03001110032', status: 'active' },
    { id: 'STU17', admissionNo: 'ADM-2024-017', name: 'Hassan Raza', fatherName: 'Raza Hussain', motherName: 'Kiran Raza', dob: '2014-03-09', gender: 'Male', className: 'Grade 6', section: 'B', rollNo: 2, phone: '03001110033', email: 'hassan.p@email.com', address: 'Model Town', city: 'Qamber', admissionDate: '2023-04-01', previousSchool: 'Public High', bloodGroup: 'O+', emergencyContact: '03001110034', status: 'active' },
    { id: 'STU18', admissionNo: 'ADM-2024-018', name: 'Fatima Zahra', fatherName: 'Zahra Husband', motherName: 'Zahra', dob: '2017-09-21', gender: 'Female', className: 'Grade 3', section: 'B', rollNo: 5, phone: '03001110035', email: 'fatima.p@email.com', address: 'Station Road', city: 'Qamber', admissionDate: '2024-04-09', previousSchool: '', bloodGroup: 'AB+', emergencyContact: '03001110036', status: 'active' },
    { id: 'STU19', admissionNo: 'ADM-2024-019', name: 'Daniyal Ali', fatherName: 'Ali Akbar', motherName: 'Nida Ali', dob: '2015-01-30', gender: 'Male', className: 'Grade 5', section: 'A', rollNo: 10, phone: '03001110037', email: 'daniyal.p@email.com', address: 'Industrial Area', city: 'Qamber', admissionDate: '2024-04-01', previousSchool: 'Private School', bloodGroup: 'B+', emergencyContact: '03001110038', status: 'active' },
    { id: 'STU20', admissionNo: 'ADM-2024-020', name: 'Mahnoor Shah', fatherName: 'Shahzad Shah', motherName: 'Rabia Shah', dob: '2016-04-04', gender: 'Female', className: 'Grade 4', section: 'A', rollNo: 9, phone: '03001110039', email: 'mahnoor.p@email.com', address: 'Civil Lines', city: 'Qamber', admissionDate: '2024-04-05', previousSchool: '', bloodGroup: 'A+', emergencyContact: '03001110040', status: 'active' }
  ];
  saveData('students', students);

  // Staff
  const staff = [
    { id: 'STF1', name: 'Rashid Mehmood', position: 'Accountant', phone: '03005550001', email: 'rashid@school.edu.pk', joiningDate: '2019-01-15', salary: 45000, status: 'active' },
    { id: 'STF2', name: 'Shahid Iqbal', position: 'Clerk', phone: '03005550002', email: 'shahid@school.edu.pk', joiningDate: '2020-06-01', salary: 35000, status: 'active' },
    { id: 'STF3', name: 'Asma Bibi', position: 'Librarian', phone: '03005550003', email: 'asma@school.edu.pk', joiningDate: '2021-03-10', salary: 32000, status: 'active' },
    { id: 'STF4', name: 'Imtiaz Ali', position: 'Security Guard', phone: '03005550004', email: 'imtiaz@school.edu.pk', joiningDate: '2018-05-20', salary: 28000, status: 'active' },
    { id: 'STF5', name: 'Naseem Akhtar', position: 'Receptionist', phone: '03005550005', email: 'naseem@school.edu.pk', joiningDate: '2022-01-05', salary: 30000, status: 'active' }
  ];
  saveData('staff', staff);

  // Parents
  const parents = [
    { id: 'PAR1', fatherName: 'Hassan Raza', motherName: 'Saima Hassan', phone: '03001110001', email: 'ali.parent@email.com', address: 'Street 5, Qamber', occupation: 'Business', children: ['STU1'] },
    { id: 'PAR2', fatherName: 'Khan Sahib', motherName: 'Fatima Khan', phone: '03001110003', email: 'ayesha.p@email.com', address: 'Main Road, Qamber', occupation: 'Teacher', children: ['STU2'] },
    { id: 'PAR3', fatherName: 'Ahmed Malik', motherName: 'Nadia Ahmed', phone: '03001110005', email: 'bilal.p@email.com', address: 'Colony Road', occupation: 'Farmer', children: ['STU3'] },
    { id: 'PAR4', fatherName: 'Malik Javed', motherName: 'Sana Malik', phone: '03001110007', email: 'zara.p@email.com', address: 'Near Market', occupation: 'Engineer', children: ['STU4'] },
    { id: 'PAR5', fatherName: 'Ali Raza', motherName: 'Maryam Ali', phone: '03001110009', email: 'hamza.p@email.com', address: 'Block C', occupation: 'Doctor', children: ['STU5'] },
    { id: 'PAR6', fatherName: 'Ghani Khan', motherName: 'Aisha Ghani', phone: '03001110013', email: 'usman.p@email.com', address: 'New Colony', occupation: 'Shopkeeper', children: ['STU7'] },
    { id: 'PAR7', fatherName: 'Farooq Sheikh', motherName: 'Sadia Farooq', phone: '03001110017', email: 'omar.p@email.com', address: 'Main Bazaar', occupation: 'Business', children: ['STU9'] },
    { id: 'PAR8', fatherName: 'Raza Ali', motherName: 'Saba Raza', phone: '03001110025', email: 'taha.p@email.com', address: 'Phase 2', occupation: 'Government Employee', children: ['STU13'] },
    { id: 'PAR9', fatherName: 'Malik Anwar', motherName: 'Shazia Malik', phone: '03001110029', email: 'yousuf.p@email.com', address: 'Garden Town', occupation: 'Lawyer', children: ['STU15'] },
    { id: 'PAR10', fatherName: 'Shahzad Shah', motherName: 'Rabia Shah', phone: '03001110039', email: 'mahnoor.p@email.com', address: 'Civil Lines', occupation: 'Banker', children: ['STU20'] }
  ];
  saveData('parents', parents);

  // Notices
  const notices = [
    { id: 'NTC1', title: 'School Reopening Notice', description: 'School will reopen on 1st September 2026 for the new academic session 2026-2027. All students must report in proper uniform.', date: '2026-08-20', audience: 'Everyone', priority: 'high', status: 'active' },
    { id: 'NTC2', title: 'Parent-Teacher Meeting', description: 'PTM will be held on 15th September 2026. Parents are requested to attend.', date: '2026-09-01', audience: 'Parents', priority: 'medium', status: 'active' },
    { id: 'NTC3', title: 'Fee Submission Deadline', description: 'Last date for fee submission for September is 10th of the month. Late fee will apply after that.', date: '2026-09-01', audience: 'Parents', priority: 'high', status: 'active' },
    { id: 'NTC4', title: 'Sports Day Announcement', description: 'Annual Sports Day will be celebrated on 25th October 2026. Students interested in participating should register with their class teachers.', date: '2026-09-10', audience: 'Students', priority: 'medium', status: 'active' },
    { id: 'NTC5', title: 'Teacher Training Workshop', description: 'All teachers are required to attend the professional development workshop on 5th September.', date: '2026-08-28', audience: 'Teachers', priority: 'medium', status: 'active' }
  ];
  saveData('notices', notices);

  // Fee Structure
  const feeStructure = [
    { id: 'FEE1', className: 'Grade 1', admissionFee: 5000, tuitionFee: 3000, examFee: 500, computerFee: 300, transportFee: 1500, otherFee: 200 },
    { id: 'FEE2', className: 'Grade 2', admissionFee: 5000, tuitionFee: 3200, examFee: 500, computerFee: 300, transportFee: 1500, otherFee: 200 },
    { id: 'FEE3', className: 'Grade 3', admissionFee: 5500, tuitionFee: 3500, examFee: 600, computerFee: 400, transportFee: 1500, otherFee: 200 },
    { id: 'FEE4', className: 'Grade 4', admissionFee: 5500, tuitionFee: 3800, examFee: 600, computerFee: 400, transportFee: 1600, otherFee: 250 },
    { id: 'FEE5', className: 'Grade 5', admissionFee: 6000, tuitionFee: 4000, examFee: 700, computerFee: 500, transportFee: 1600, otherFee: 250 },
    { id: 'FEE6', className: 'Grade 6', admissionFee: 6000, tuitionFee: 4200, examFee: 700, computerFee: 500, transportFee: 1700, otherFee: 300 }
  ];
  saveData('feeStructure', feeStructure);

  // Sample Fee Payments
  const feePayments = [
    { id: 'PAY1', studentId: 'STU1', invoiceNo: 'INV-2026-001', month: 'September 2026', amount: 4500, paid: 4500, remaining: 0, method: 'Cash', date: '2026-09-05', status: 'paid' },
    { id: 'PAY2', studentId: 'STU2', invoiceNo: 'INV-2026-002', month: 'September 2026', amount: 4500, paid: 4500, remaining: 0, method: 'Bank Transfer', date: '2026-09-04', status: 'paid' },
    { id: 'PAY3', studentId: 'STU3', invoiceNo: 'INV-2026-003', month: 'September 2026', amount: 4300, paid: 2000, remaining: 2300, method: 'Cash', date: '2026-09-08', status: 'partial' },
    { id: 'PAY4', studentId: 'STU5', invoiceNo: 'INV-2026-004', month: 'September 2026', amount: 5200, paid: 5200, remaining: 0, method: 'Online', date: '2026-09-03', status: 'paid' },
    { id: 'PAY5', studentId: 'STU7', invoiceNo: 'INV-2026-005', month: 'September 2026', amount: 4500, paid: 0, remaining: 4500, method: '', date: '', status: 'pending' }
  ];
  saveData('feePayments', feePayments);

  // Homework
  const homework = [
    { id: 'HW1', subject: 'Mathematics', className: 'Grade 5', section: 'A', teacher: 'Ahmed Khan', title: 'Chapter 3 Exercises', description: 'Complete exercises 3.1 to 3.5 from the textbook.', assignedDate: '2026-09-10', dueDate: '2026-09-15', status: 'active' },
    { id: 'HW2', subject: 'English', className: 'Grade 4', section: 'A', teacher: 'Fatima Ali', title: 'Essay Writing', description: 'Write an essay on "My School" in 150 words.', assignedDate: '2026-09-11', dueDate: '2026-09-16', status: 'active' },
    { id: 'HW3', subject: 'Science', className: 'Grade 5', section: 'B', teacher: 'Bilal Hussain', title: 'Plant Life Cycle', description: 'Draw and label the life cycle of a plant.', assignedDate: '2026-09-09', dueDate: '2026-09-14', status: 'active' }
  ];
  saveData('homework', homework);

  // Exams
  const exams = [
    { id: 'EXM1', name: 'Monthly Test - September', type: 'Monthly Test', className: 'Grade 5', subject: 'Mathematics', date: '2026-09-20', startTime: '09:00', endTime: '11:00', room: 'Hall A' },
    { id: 'EXM2', name: 'Monthly Test - September', type: 'Monthly Test', className: 'Grade 5', subject: 'English', date: '2026-09-21', startTime: '09:00', endTime: '11:00', room: 'Hall A' },
    { id: 'EXM3', name: 'Mid Term Exam', type: 'Mid Term', className: 'Grade 6', subject: 'Science', date: '2026-10-15', startTime: '09:00', endTime: '12:00', room: 'Hall B' }
  ];
  saveData('exams', exams);

  // Attendance sample (today)
  const today = new Date().toISOString().split('T')[0];
  const attendance = students.slice(0, 15).map((s, i) => ({
    id: 'ATT' + (i + 1),
    studentId: s.id,
    date: today,
    className: s.className,
    section: s.section,
    status: i % 7 === 0 ? 'Absent' : (i % 11 === 0 ? 'Leave' : 'Present')
  }));
  saveData('attendance', attendance);

  // Leaves
  const leaves = [
    { id: 'LVE1', applicant: 'Ali Hassan', type: 'Student', leaveType: 'Sick Leave', fromDate: '2026-09-12', toDate: '2026-09-13', reason: 'Fever', status: 'Approved', approvedBy: 'Ahmed Khan' },
    { id: 'LVE2', applicant: 'Fatima Ali', type: 'Teacher', leaveType: 'Personal', fromDate: '2026-09-18', toDate: '2026-09-18', reason: 'Family function', status: 'Pending', approvedBy: '' }
  ];
  saveData('leaves', leaves);

  // Notifications
  const notifications = [
    { id: 'NOT1', title: 'Fee Due Reminder', message: 'Fee for September is due. Please submit by 10th.', read: false, date: '2026-09-01', type: 'fee' },
    { id: 'NOT2', title: 'New Homework Assigned', message: 'Mathematics homework has been assigned for Grade 5.', read: false, date: '2026-09-10', type: 'homework' },
    { id: 'NOT3', title: 'Exam Schedule Released', message: 'Monthly Test schedule for September is now available.', read: true, date: '2026-09-05', type: 'exam' },
    { id: 'NOT4', title: 'New Notice', message: 'School Reopening Notice has been published.', read: false, date: '2026-08-20', type: 'notice' }
  ];
  saveData('notifications', notifications);

  // Admissions
  const admissions = [
    { id: 'ADM1', applicationNo: 'APP-2026-001', studentName: 'New Student One', fatherName: 'Father One', motherName: 'Mother One', dob: '2018-05-10', gender: 'Male', previousSchool: 'ABC School', applyingClass: 'Grade 1', phone: '03009990001', email: 'new1@email.com', address: 'Qamber', applicationDate: '2026-08-15', status: 'Pending' },
    { id: 'ADM2', applicationNo: 'APP-2026-002', studentName: 'New Student Two', fatherName: 'Father Two', motherName: 'Mother Two', dob: '2017-08-22', gender: 'Female', previousSchool: '', applyingClass: 'Grade 2', phone: '03009990002', email: 'new2@email.com', address: 'Qamber', applicationDate: '2026-08-20', status: 'Approved' },
    { id: 'ADM3', applicationNo: 'APP-2026-003', studentName: 'New Student Three', fatherName: 'Father Three', motherName: 'Mother Three', dob: '2016-03-15', gender: 'Male', previousSchool: 'XYZ Academy', applyingClass: 'Grade 3', phone: '03009990003', email: 'new3@email.com', address: 'Qamber', applicationDate: '2026-08-25', status: 'Rejected' }
  ];
  saveData('admissions', admissions);

  // Timetable sample
  const timetable = [
    { id: 'TT1', className: 'Grade 5', section: 'A', day: 'Monday', period: 1, startTime: '08:00', endTime: '08:45', subject: 'Mathematics', teacher: 'Ahmed Khan', room: 'Room 5A' },
    { id: 'TT2', className: 'Grade 5', section: 'A', day: 'Monday', period: 2, startTime: '08:45', endTime: '09:30', subject: 'English', teacher: 'Hina Raza', room: 'Room 5A' },
    { id: 'TT3', className: 'Grade 5', section: 'A', day: 'Monday', period: 3, startTime: '09:45', endTime: '10:30', subject: 'Science', teacher: 'Bilal Hussain', room: 'Room 5A' },
    { id: 'TT4', className: 'Grade 5', section: 'A', day: 'Tuesday', period: 1, startTime: '08:00', endTime: '08:45', subject: 'Urdu', teacher: 'Sana Malik', room: 'Room 5A' },
    { id: 'TT5', className: 'Grade 5', section: 'A', day: 'Tuesday', period: 2, startTime: '08:45', endTime: '09:30', subject: 'Islamiat', teacher: 'Ayesha Noor', room: 'Room 5A' }
  ];
  saveData('timetable', timetable);

  // Settings

  // Library
  const library = [
    { id: 'BK1', title: 'Mathematics Grade 5', author: 'Oxford Press', isbn: '978-0-19-123456-1', category: 'Textbook', quantity: 40, available: 35, status: 'available' },
    { id: 'BK2', title: 'English Grammar', author: 'Cambridge', isbn: '978-0-521-123456-2', category: 'Textbook', quantity: 30, available: 28, status: 'available' },
    { id: 'BK3', title: 'Science Explorer', author: 'Pearson', isbn: '978-0-13-123456-3', category: 'Textbook', quantity: 25, available: 20, status: 'available' },
    { id: 'BK4', title: 'Urdu Literature', author: 'National Book', isbn: '978-969-123456-4', category: 'Literature', quantity: 20, available: 18, status: 'available' },
    { id: 'BK5', title: 'Computer Basics', author: 'IT Series', isbn: '978-1-23-123456-5', category: 'Computer', quantity: 15, available: 12, status: 'available' }
  ];
  saveData('library', library);

  // Vehicles
  const vehicles = [
    { id: 'VEH1', regNo: 'LES-1234', type: 'Bus', capacity: 40, driver: 'Muhammad Ali', phone: '03001234501', route: 'Route A', status: 'active' },
    { id: 'VEH2', regNo: 'LES-5678', type: 'Van', capacity: 15, driver: 'Ahmed Raza', phone: '03001234502', route: 'Route B', status: 'active' },
    { id: 'VEH3', regNo: 'LES-9012', type: 'Bus', capacity: 45, driver: 'Bilal Khan', phone: '03001234503', route: 'Route C', status: 'active' }
  ];
  saveData('vehicles', vehicles);

  // Routes
  const routes = [
    { id: 'RT1', name: 'Route A', stops: 'Main Bazaar, Colony Road, School', vehicleId: 'VEH1', fee: 1500 },
    { id: 'RT2', name: 'Route B', stops: 'Housing Society, Canal Road, School', vehicleId: 'VEH2', fee: 1200 },
    { id: 'RT3', name: 'Route C', stops: 'Station Road, Model Town, School', vehicleId: 'VEH3', fee: 1600 }
  ];
  saveData('routes', routes);

  // Inventory
  const inventory = [
    { id: 'INV1', name: 'Whiteboard Markers', category: 'Stationery', quantity: 120, minStock: 20, unit: 'pcs', status: 'in-stock' },
    { id: 'INV2', name: 'A4 Paper Reams', category: 'Stationery', quantity: 45, minStock: 10, unit: 'reams', status: 'in-stock' },
    { id: 'INV3', name: 'Classroom Chairs', category: 'Furniture', quantity: 8, minStock: 5, unit: 'pcs', status: 'low-stock' },
    { id: 'INV4', name: 'Projector Bulbs', category: 'Electronics', quantity: 3, minStock: 2, unit: 'pcs', status: 'low-stock' },
    { id: 'INV5', name: 'Science Lab Kits', category: 'Lab', quantity: 12, minStock: 5, unit: 'kits', status: 'in-stock' }
  ];
  saveData('inventory', inventory);

  // Expenses
  const expenses = [
    { id: 'EXP1', title: 'Electricity Bill', category: 'Utilities', amount: 45000, date: '2026-09-05', paidTo: 'WAPDA', status: 'paid' },
    { id: 'EXP2', title: 'Teacher Training', category: 'Staff Development', amount: 25000, date: '2026-09-08', paidTo: 'Training Institute', status: 'paid' },
    { id: 'EXP3', title: 'Furniture Repair', category: 'Maintenance', amount: 12000, date: '2026-09-10', paidTo: 'Local Carpenter', status: 'paid' }
  ];
  saveData('expenses', expenses);

  // Events
  const events = [
    { id: 'EVT1', title: 'Annual Sports Day', date: '2026-10-25', type: 'Sports', location: 'School Ground', description: 'Annual sports competition for all grades.', status: 'upcoming' },
    { id: 'EVT2', title: 'Parent Teacher Meeting', date: '2026-09-15', type: 'Meeting', location: 'Main Hall', description: 'Quarterly PTM for all classes.', status: 'upcoming' },
    { id: 'EVT3', title: 'Science Exhibition', date: '2026-11-10', type: 'Academic', location: 'Science Lab', description: 'Student science projects exhibition.', status: 'upcoming' }
  ];
  saveData('events', events);

\n  saveSettings(getSettings());

  localStorage.setItem(STORAGE_KEYS.initialized, 'true');
  console.log('Data initialized successfully');
}

// Initialize on load
if (typeof window !== 'undefined') {
  initSeedData();
}
