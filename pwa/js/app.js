// ClassCare PWA App

// Register Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/pwa/sw.js')
      .then(registration => {
        console.log('ServiceWorker registered:', registration.scope);
      })
      .catch(error => {
        console.log('ServiceWorker registration failed:', error);
      });
  });
}

// App State
const AppState = {
  user: null,
  academy: null,
  classes: [],
  students: [],
  isOnline: navigator.onLine
};

// Local Storage Keys
const STORAGE_KEYS = {
  USER: 'classcare_user',
  TOKEN: 'classcare_token',
  THEME: 'classcare_theme'
};

// Check authentication
function isAuthenticated() {
  return localStorage.getItem(STORAGE_KEYS.TOKEN) !== null;
}

// Get current user
function getCurrentUser() {
  const userData = localStorage.getItem(STORAGE_KEYS.USER);
  return userData ? JSON.parse(userData) : null;
}

// Login
function login(email, password) {
  // Demo login - replace with actual API call
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email && password) {
        const user = {
          id: 1,
          name: '김선생',
          email: email,
          role: 'instructor',
          academy: '스마트코딩학원',
          academyId: 1,
          avatar: null
        };
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
        localStorage.setItem(STORAGE_KEYS.TOKEN, 'demo_token_' + Date.now());
        resolve(user);
      } else {
        reject(new Error('이메일과 비밀번호를 입력해주세요.'));
      }
    }, 500);
  });
}

// Logout
function logout() {
  localStorage.removeItem(STORAGE_KEYS.USER);
  localStorage.removeItem(STORAGE_KEYS.TOKEN);
  window.location.href = 'login.html';
}

// Show toast notification
function showToast(message, type = 'info') {
  const existingToast = document.querySelector('.toast');
  if (existingToast) existingToast.remove();

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <i data-lucide="${type === 'success' ? 'check-circle' : type === 'error' ? 'x-circle' : 'info'}" class="w-5 h-5"></i>
    <span>${message}</span>
  `;
  document.body.appendChild(toast);

  if (window.lucide) lucide.createIcons();

  setTimeout(() => toast.classList.add('show'), 10);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Format date
function formatDate(date, format = 'short') {
  const d = new Date(date);
  const options = {
    short: { month: 'short', day: 'numeric' },
    long: { year: 'numeric', month: 'long', day: 'numeric' },
    time: { hour: '2-digit', minute: '2-digit' },
    full: { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }
  };
  return d.toLocaleDateString('ko-KR', options[format]);
}

// Format number with commas
function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// Get initials from name
function getInitials(name) {
  return name.split(' ').map(n => n[0]).join('').substring(0, 2);
}

// Render bottom navigation
function renderBottomNav(activePage) {
  const navItems = [
    { id: 'home', icon: 'home', label: '홈', href: 'dashboard.html' },
    { id: 'attendance', icon: 'user-check', label: '출석', href: 'attendance.html' },
    { id: 'consultations', icon: 'message-circle', label: '상담', href: 'consultations.html' },
    { id: 'feedback', icon: 'file-text', label: '피드백', href: 'feedback.html' },
    { id: 'more', icon: 'menu', label: '더보기', href: 'more.html' }
  ];

  const nav = document.getElementById('bottomNav');
  if (!nav) return;

  nav.innerHTML = navItems.map(item => `
    <a href="${item.href}" class="nav-item ${activePage === item.id ? 'active' : ''}">
      <i data-lucide="${item.icon}" class="w-5 h-5"></i>
      <span>${item.label}</span>
    </a>
  `).join('');

  if (window.lucide) lucide.createIcons();
}

// Check online status
function updateOnlineStatus() {
  AppState.isOnline = navigator.onLine;
  const indicator = document.getElementById('onlineIndicator');
  if (indicator) {
    indicator.style.display = AppState.isOnline ? 'none' : 'flex';
  }
}

window.addEventListener('online', updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);

// Pull to refresh (basic implementation)
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', e => {
  touchStartY = e.touches[0].clientY;
});

document.addEventListener('touchend', e => {
  touchEndY = e.changedTouches[0].clientY;
  if (touchEndY - touchStartY > 100 && window.scrollY === 0) {
    // Pull to refresh triggered
    if (typeof onRefresh === 'function') {
      onRefresh();
    } else {
      location.reload();
    }
  }
});

// Demo data generators
function generateDemoStudents() {
  const names = ['김민준', '이서연', '박지호', '최수아', '정도윤', '강하은', '윤준우', '임서현', '조민서', '한예준'];
  return names.map((name, i) => ({
    id: i + 1,
    name,
    grade: Math.floor(Math.random() * 3) + 1,
    class: ['A반', 'B반', 'C반'][Math.floor(Math.random() * 3)],
    status: ['active', 'active', 'active', 'inactive'][Math.floor(Math.random() * 4)],
    avatar: null
  }));
}

function generateDemoAttendance() {
  return [
    { date: new Date(), present: 8, absent: 1, late: 1, total: 10 },
    { date: new Date(Date.now() - 86400000), present: 9, absent: 1, late: 0, total: 10 },
    { date: new Date(Date.now() - 172800000), present: 10, absent: 0, late: 0, total: 10 }
  ];
}

function generateDemoConsultations() {
  return [
    { id: 1, student: '김민준', date: new Date(), type: '학습상담', summary: '수학 성적 향상을 위한 학습 계획 수립', status: 'completed' },
    { id: 2, student: '이서연', date: new Date(Date.now() - 86400000), type: '진로상담', summary: 'IT 분야 진로 탐색', status: 'completed' },
    { id: 3, student: '박지호', date: new Date(Date.now() + 86400000), type: '학부모상담', summary: '학습 태도 상담 예정', status: 'scheduled' }
  ];
}

function generateDemoFeedback() {
  return [
    { id: 1, student: '김민준', date: new Date(), type: '퀴즈', score: 85, comment: '전반적으로 잘 이해하고 있음' },
    { id: 2, student: '이서연', date: new Date(Date.now() - 86400000), type: '과제', score: 92, comment: '창의적인 접근이 돋보임' },
    { id: 3, student: '박지호', date: new Date(Date.now() - 172800000), type: '실습', score: 78, comment: '기본기 보강 필요' }
  ];
}

// Initialize Lucide icons
document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) {
    lucide.createIcons();
  }
  updateOnlineStatus();
});
