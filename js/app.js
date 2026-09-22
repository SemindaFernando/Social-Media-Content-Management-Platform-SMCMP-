/**
 * Grand Azure Luxury Hotel & Spa - SMCMP Global Application Scripts
 * Manages UI interactions, toasts, sidebar toggle, role selector, and common formatters.
 */

const App = {
  init() {
    this.setupSidebarToggle();
    this.setupDataResetButton();
    this.setupRoleSwitcher();
  },

  // Show Toast Alert
  showToast(message, type = "success") {
    let container = document.querySelector(".toast-container");
    if (!container) {
      container = document.createElement("div");
      container.className = "toast-container position-fixed bottom-0 end-0 p-3";
      document.body.appendChild(container);
    }

    const toastId = "toast-" + Date.now();
    const bgClass = type === "success" ? "bg-success text-white" :
                    type === "danger" ? "bg-danger text-white" :
                    type === "warning" ? "bg-warning text-dark" : "bg-primary text-white";

    const icon = type === "success" ? "bi-check-circle-fill" :
                 type === "danger" ? "bi-x-circle-fill" :
                 type === "warning" ? "bi-exclamation-triangle-fill" : "bi-info-circle-fill";

    const toastHtml = `
      <div id="${toastId}" class="toast align-items-center ${bgClass} border-0 shadow-lg" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="d-flex">
          <div class="toast-body d-flex align-items-center gap-2">
            <i class="bi ${icon} fs-5"></i>
            <div>${message}</div>
          </div>
          <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
      </div>
    `;

    container.insertAdjacentHTML("beforeend", toastHtml);
    const toastEl = document.getElementById(toastId);
    const bsToast = new bootstrap.Toast(toastEl, { delay: 3500 });
    bsToast.show();
    toastEl.addEventListener("hidden.bs.toast", () => toastEl.remove());
  },

  // Setup Sidebar Toggle for mobile
  setupSidebarToggle() {
    const toggleBtn = document.getElementById("sidebarToggleBtn");
    const sidebar = document.querySelector(".sidebar");
    if (toggleBtn && sidebar) {
      toggleBtn.addEventListener("click", () => {
        sidebar.classList.toggle("show");
      });
    }
  },

  // Setup Reset Default Data
  setupDataResetButton() {
    const resetButtons = document.querySelectorAll(".btn-reset-data");
    resetButtons.forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        if (confirm("Reset all posts and campaigns back to default 18+ sample hotel records?")) {
          DataStore.resetDefaultData();
          App.showToast("Data reset to initial hotel demo dataset successfully!");
          setTimeout(() => window.location.reload(), 800);
        }
      });
    });
  },

  // Setup Role Switcher in navbar
  setupRoleSwitcher() {
    const switchItems = document.querySelectorAll(".role-switch-item");
    switchItems.forEach(item => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        const role = item.getAttribute("data-role");
        if (role) {
          AuthService.switchRole(role);
        }
      });
    });
  },

  // Format Helper: Platform Badges
  getPlatformBadges(platforms = []) {
    const iconMap = {
      instagram: '<span class="platform-pill platform-instagram me-1" title="Instagram"><i class="fa-brands fa-instagram"></i></span>',
      facebook: '<span class="platform-pill platform-facebook me-1" title="Facebook"><i class="fa-brands fa-facebook-f"></i></span>',
      tiktok: '<span class="platform-pill platform-tiktok me-1" title="TikTok"><i class="fa-brands fa-tiktok"></i></span>',
      linkedin: '<span class="platform-pill platform-linkedin me-1" title="LinkedIn"><i class="fa-brands fa-linkedin-in"></i></span>',
      x: '<span class="platform-pill platform-x me-1" title="X (Twitter)"><i class="fa-brands fa-x-twitter"></i></span>',
      youtube: '<span class="platform-pill platform-youtube me-1" title="YouTube"><i class="fa-brands fa-youtube"></i></span>'
    };
    return platforms.map(p => iconMap[p] || "").join("");
  },

  // Format Helper: Status Badge
  getStatusBadge(status) {
    const map = {
      published: '<span class="status-badge status-published"><i class="bi bi-check-circle me-1"></i>Published</span>',
      scheduled: '<span class="status-badge status-scheduled"><i class="bi bi-clock me-1"></i>Scheduled</span>',
      in_review: '<span class="status-badge status-in_review"><i class="bi bi-hourglass-split me-1"></i>In Review</span>',
      draft: '<span class="status-badge status-draft"><i class="bi bi-file-earmark me-1"></i>Draft</span>',
      rejected: '<span class="status-badge status-rejected"><i class="bi bi-x-circle me-1"></i>Needs Edit</span>'
    };
    return map[status] || `<span class="status-badge">${status}</span>`;
  },

  // Format Date Helper
  formatDate(dateStr) {
    if (!dateStr) return "N/A";
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  }
};

document.addEventListener("DOMContentLoaded", () => {
  App.init();
});
