/**
 * Authentication Module -  
 * Passwords are stored in plain text for local use only.
 * In production, use proper hashing and a secure backend.
 */

function getCurrentUser() {
  try {
    const user = localStorage.getItem(STORAGE_KEYS.currentUser);
    return user ? JSON.parse(user) : null;
  } catch (e) {
    return null;
  }
}

function setCurrentUser(user) {
  if (user) {
    localStorage.setItem(STORAGE_KEYS.currentUser, JSON.stringify(user));
  } else {
    localStorage.removeItem(STORAGE_KEYS.currentUser);
  }
}

function login(username, password, remember) {
  const users = getData('users');
  const user = users.find(u => 
    u.username.toLowerCase() === username.toLowerCase() && 
    u.password === password &&
    u.status === 'active'
  );
  
  if (user) {
    const sessionUser = {
      id: user.id,
      username: user.username,
      name: user.name,
      role: user.role,
      email: user.email
    };
    setCurrentUser(sessionUser);
    if (remember) {
      localStorage.setItem('sms_remember', username);
    }
    return { success: true, user: sessionUser };
  }
  return { success: false, message: 'Invalid username or password' };
}

function logout() {
  setCurrentUser(null);
  window.location.href = 'login.html';
}

function isAuthenticated() {
  return getCurrentUser() !== null;
}

function hasPermission(module, action = 'view') {
  const user = getCurrentUser();
  if (!user) return false;
  
  const role = user.role;
  
  // Permission matrix
  const permissions = {
    admin: { all: true },
    principal: {
      dashboard: true, students: true, teachers: true, staff: true, parents: true,
      classes: true, subjects: true, attendance: true, timetable: true, homework: true,
      exams: true, results: true, fees: 'view', admissions: true, leaves: true,
      notices: true, events: true, reports: true, settings: 'limited', library: true
    },
    teacher: {
      dashboard: 'limited', students: 'assigned', attendance: 'manage',
      homework: true, exams: 'manage', results: true, timetable: true,
      notices: true, reports: 'limited', library: 'view'
    },
    accountant: {
      dashboard: 'limited', fees: true, payments: true, expenses: true, reports: 'fee'
    },
    staff: {
      dashboard: 'limited', students: 'view', teachers: 'view', attendance: 'view'
    },
    librarian: {
      dashboard: 'limited', library: true, students: 'view'
    },
    transport: {
      dashboard: 'limited', transport: true, students: 'view'
    }
  };
  
  if (role === 'admin') return true;
  
  const rolePerms = permissions[role] || {};
  if (rolePerms.all) return true;
  
  const modulePerm = rolePerms[module];
  if (!modulePerm) return false;
  if (modulePerm === true) return true;
  if (typeof modulePerm === 'string') {
    if (action === 'view') return true;
    return modulePerm === action || modulePerm === 'manage' || modulePerm === 'full';
  }
  return false;
}

function requireAuth() {
  if (!isAuthenticated()) {
    window.location.href = 'login.html';
    return false;
  }
  return true;
}

function getRoleBadgeClass(role) {
  const classes = {
    admin: 'bg-danger',
    principal: 'bg-primary',
    teacher: 'bg-success',
    accountant: 'bg-warning text-dark',
    staff: 'bg-secondary'
  };
  return classes[role] || 'bg-secondary';
}

// Change password
function changePassword(oldPass, newPass) {
  const user = getCurrentUser();
  if (!user) return { success: false, message: 'Not logged in' };
  
  const users = getData('users');
  const idx = users.findIndex(u => u.id === user.id);
  if (idx === -1) return { success: false, message: 'User not found' };
  
  if (users[idx].password !== oldPass) {
    return { success: false, message: 'Current password is incorrect' };
  }
  
  users[idx].password = newPass;
  saveData('users', users);
  return { success: true, message: 'Password changed successfully' };
}

function changeUsername(newUsername) {
  const user = getCurrentUser();
  if (!user) return { success: false, message: 'Not logged in' };
  
  const users = getData('users');
  if (users.some(u => u.username.toLowerCase() === newUsername.toLowerCase() && u.id !== user.id)) {
    return { success: false, message: 'Username already exists' };
  }
  
  const idx = users.findIndex(u => u.id === user.id);
  if (idx === -1) return { success: false, message: 'User not found' };
  
  users[idx].username = newUsername;
  saveData('users', users);
  
  user.username = newUsername;
  setCurrentUser(user);
  return { success: true, message: 'Username updated successfully' };
}
