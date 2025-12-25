// ClassCare 슈퍼어드민 포털 - 공통 JS

// 현재 페이지 경로
const currentPath = window.location.pathname;

// 슈퍼어드민 전용 네비게이션 메뉴
const navItems = [
  { name: '대시보드', href: 'index.html', icon: 'layout-dashboard' },
  { name: '학원 관리', href: 'academies.html', icon: 'building-2' },
  { name: '결제 관리', href: 'payments.html', icon: 'credit-card' },
  { name: '사용량 분석', href: 'usage.html', icon: 'bar-chart-3' },
  { name: '구독 플랜', href: 'plans.html', icon: 'package' },
  { name: '권한 관리', href: 'permissions.html', icon: 'shield-check' },
];

// 사이드바 생성
function createSidebar() {
  const sidebar = document.getElementById('sidebar');
  if (!sidebar) return;

  let navHtml = '';
  navItems.forEach(item => {
    const isActive = currentPath.includes(item.href);
    navHtml += `
      <a href="${item.href}"
         class="flex items-center space-x-3 px-4 py-3 rounded-xl transition ${isActive
           ? 'bg-gradient-to-r from-purple-600/30 to-pink-600/20 text-white'
           : 'text-gray-400 hover:text-white hover:bg-gray-800/50'}">
        <i data-lucide="${item.icon}" class="w-5 h-5 flex-shrink-0 ${isActive ? 'text-purple-400' : ''}"></i>
        <span class="sidebar-text font-medium">${item.name}</span>
      </a>
    `;
  });

  sidebar.innerHTML = `
    <!-- Logo -->
    <div class="h-16 flex items-center justify-between px-4 border-b border-gray-700/50">
      <a href="index.html" class="flex items-center space-x-3">
        <div class="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-purple-500/25">
          <span class="text-white font-bold text-lg">C</span>
        </div>
        <div class="sidebar-text">
          <span class="text-white font-bold text-lg">ClassCare</span>
          <span class="block text-purple-400 text-xs font-medium -mt-1">Super Admin</span>
        </div>
      </a>
      <button onclick="toggleSidebar()" class="p-2 hover:bg-gray-700/50 rounded-lg transition hidden lg:block">
        <i data-lucide="chevron-left" class="w-5 h-5 text-gray-400 sidebar-toggle-icon"></i>
      </button>
    </div>

    <!-- Navigation -->
    <nav class="p-4 space-y-1">
      <p class="text-xs text-gray-500 font-semibold uppercase tracking-wider px-4 mb-3 sidebar-text">메뉴</p>
      ${navHtml}
    </nav>

    <!-- User / Logout -->
    <div class="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700/50 bg-gray-900/50">
      <div class="mb-3 px-4 sidebar-text">
        <p class="text-white font-semibold truncate">슈퍼관리자</p>
        <p class="text-gray-500 text-sm truncate">admin@classcare.kr</p>
      </div>
      <a href="login.html" class="flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition w-full">
        <i data-lucide="log-out" class="w-5 h-5 flex-shrink-0"></i>
        <span class="sidebar-text font-medium">로그아웃</span>
      </a>
    </div>
  `;
}

// 헤더 생성
function createHeader() {
  const header = document.getElementById('header');
  if (!header) return;

  header.innerHTML = `
    <div class="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      <div class="flex items-center space-x-4">
        <button onclick="toggleSidebar()" class="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition">
          <i data-lucide="menu" class="w-5 h-5 text-gray-600"></i>
        </button>
        <div class="hidden sm:flex items-center bg-gray-100 rounded-xl px-4 py-2.5 w-72 border border-transparent focus-within:border-purple-300 focus-within:bg-white transition">
          <i data-lucide="search" class="w-4 h-4 text-gray-400 mr-3"></i>
          <input type="text" placeholder="학원, 강사 검색..." class="bg-transparent border-none outline-none text-sm w-full text-gray-700 placeholder-gray-400">
        </div>
      </div>
      <div class="flex items-center space-x-3">
        <button class="relative p-2.5 hover:bg-gray-100 rounded-xl transition">
          <i data-lucide="bell" class="w-5 h-5 text-gray-500"></i>
          <span class="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
        </button>
        <div class="flex items-center space-x-3 pl-3 border-l border-gray-200">
          <div class="text-right hidden sm:block">
            <p class="text-sm font-semibold text-gray-800">슈퍼관리자</p>
            <p class="text-xs text-purple-600 font-medium">ClassCare 운영</p>
          </div>
          <div class="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-md shadow-purple-500/20">
            <i data-lucide="crown" class="w-5 h-5 text-white"></i>
          </div>
        </div>
      </div>
    </div>
  `;
}

// 사이드바 토글
let sidebarCollapsed = false;
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const mainContent = document.getElementById('mainContent');
  sidebarCollapsed = !sidebarCollapsed;

  if (sidebarCollapsed) {
    sidebar.classList.remove('w-64');
    sidebar.classList.add('w-20');
    mainContent.classList.remove('lg:ml-64');
    mainContent.classList.add('lg:ml-20');
    document.querySelectorAll('.sidebar-text').forEach(el => el.classList.add('hidden'));
    document.querySelector('.sidebar-toggle-icon')?.setAttribute('data-lucide', 'chevron-right');
  } else {
    sidebar.classList.remove('w-20');
    sidebar.classList.add('w-64');
    mainContent.classList.remove('lg:ml-20');
    mainContent.classList.add('lg:ml-64');
    document.querySelectorAll('.sidebar-text').forEach(el => el.classList.remove('hidden'));
    document.querySelector('.sidebar-toggle-icon')?.setAttribute('data-lucide', 'chevron-left');
  }
  lucide.createIcons();
}

// 페이지 로드 시 초기화
document.addEventListener('DOMContentLoaded', function() {
  createSidebar();
  createHeader();
  lucide.createIcons();
});

// 숫자 포맷
function formatNumber(num) {
  return new Intl.NumberFormat('ko-KR').format(num);
}

// 날짜 포맷
function formatDate(date) {
  return new Date(date).toLocaleDateString('ko-KR');
}

// 금액 포맷
function formatCurrency(amount) {
  return new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW' }).format(amount);
}
