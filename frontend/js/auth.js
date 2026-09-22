/**
 * Grand Azure Luxury Hotel & Spa - SMCMP Auth & Role Manager
 * Handles switching roles (Admin, Creator, Approver), Firebase Auth sessions, and UI updates.
 */

const AuthService = {
  getCurrentUser() {
    DataStore.init();
    const userJson = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    if (userJson) {
      try {
        return JSON.parse(userJson);
      } catch (e) {
        return INITIAL_HOTEL_DATA.users[0];
      }
    }
    return INITIAL_HOTEL_DATA.users[0]; // Admin by default
  },

  setCurrentUser(userId) {
    const user = INITIAL_HOTEL_DATA.users.find(u => u.id === userId) || INITIAL_HOTEL_DATA.users[0];
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
    return user;
  },

  switchRole(roleName) {
    const user = INITIAL_HOTEL_DATA.users.find(u => u.role.toLowerCase().includes(roleName.toLowerCase())) || INITIAL_HOTEL_DATA.users[0];
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
    window.location.reload();
  },

  isAdministrator() {
    return this.getCurrentUser().role === "Administrator";
  },

  isContentCreator() {
    return this.getCurrentUser().role === "Content Creator" || this.isAdministrator();
  },

  isContentApprover() {
    return this.getCurrentUser().role === "Content Approver" || this.isAdministrator();
  },

  async logout() {
    if (window.FirebaseService) {
      await window.FirebaseService.logout();
    }
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    window.location.href = "login.html";
  },

  renderUserUI() {
    const user = this.getCurrentUser();

    // Update navbar badges and names
    document.querySelectorAll(".current-user-name").forEach(el => el.textContent = user.name);
    document.querySelectorAll(".current-user-role").forEach(el => {
      el.textContent = user.role;
      el.className = `current-user-role role-badge ${user.badgeClass || 'admin'}`;
    });
    document.querySelectorAll(".current-user-avatar").forEach(el => {
      if (user.avatar) el.src = user.avatar;
    });

    // Apply role-based visibility attributes [data-role-guard="admin|approver|creator"]
    document.querySelectorAll("[data-role-guard]").forEach(el => {
      const requiredRole = el.getAttribute("data-role-guard");
      if (requiredRole === "admin" && !this.isAdministrator()) {
        el.style.display = "none";
      } else if (requiredRole === "approver" && !this.isContentApprover()) {
        el.style.display = "none";
      } else if (requiredRole === "creator" && !this.isContentCreator()) {
        el.style.display = "none";
      }
    });
  }
};

document.addEventListener("DOMContentLoaded", () => {
  AuthService.renderUserUI();
});
