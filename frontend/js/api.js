/**
 * Grand Azure Luxury Hotel & Spa - Client REST API Bridge
 * Communicates with the Node.js Express REST API (`/api/*`)
 * with automatic fallback to DataStore (LocalStorage) for seamless resilience.
 */

const API_BASE = "http://localhost:5000/api";

const API = {
  // Helper to build headers with active user role / JWT token
  getHeaders() {
    const user = AuthService.getCurrentUser();
    const token = localStorage.getItem("grand_azure_jwt_token");
    const headers = { "Content-Type": "application/json" };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    if (user) {
      headers["x-user-id"] = user.id;
      headers["x-user-role"] = user.role;
    }
    return headers;
  },

  // Check if Node.js Express backend is online
  async checkBackendOnline() {
    try {
      const res = await fetch(`${API_BASE}/health`, { method: "GET", headers: { "Content-Type": "application/json" } });
      return res.ok;
    } catch (e) {
      return false;
    }
  },

  // --------------------------------------------------------------------------
  // Authentication & Member 1 (Admin) User Management
  // --------------------------------------------------------------------------
  async login(email, password) {
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem("grand_azure_jwt_token", data.token);
        localStorage.setItem("grand_azure_current_user_v1", JSON.stringify(data.user));
      }
      return data;
    } catch (e) {
      // Fallback
      const localUsers = INITIAL_HOTEL_DATA.users;
      const found = localUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (found) {
        localStorage.setItem("grand_azure_current_user_v1", JSON.stringify(found));
        return { success: true, user: found };
      }
      return { success: false, message: "Server offline & credentials not found in local seed." };
    }
  },

  async register(name, email, password, role = "Content Creator") {
    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role })
      });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem("grand_azure_jwt_token", data.token);
        localStorage.setItem("grand_azure_current_user_v1", JSON.stringify(data.user));
      }
      return data;
    } catch (e) {
      const newUser = {
        id: "usr-" + Date.now(),
        name,
        email,
        role,
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        badgeClass: role === "Administrator" ? "admin" : role === "Content Approver" ? "approver" : "creator"
      };
      localStorage.setItem("grand_azure_current_user_v1", JSON.stringify(newUser));
      return { success: true, user: newUser };
    }
  },

  async getAllUsers() {
    let firestoreUsers = [];

    // 1. Try Firestore users collection if available
    if (window.FirebaseService) {
      try {
        const fireRes = await window.FirebaseService.fetchAllUsersFromFirestore();
        if (fireRes && fireRes.success && Array.isArray(fireRes.users)) {
          firestoreUsers = fireRes.users;
        }
      } catch (e) {
        console.warn("Firestore users fetch:", e);
      }
    }

    // 2. Try Node.js Express backend
    let backendUsers = [];
    try {
      const res = await fetch(`${API_BASE}/auth/users`, { headers: this.getHeaders() });
      if (res.ok) {
        const data = await res.json();
        if (data.users && Array.isArray(data.users)) {
          backendUsers = data.users;
        }
      }
    } catch (e) {
      // backend offline
    }

    // 3. Merge with DataStore / LocalStorage users
    const localUsers = DataStore.getUsers();
    const userMap = new Map();
    
    // Default / Seed users
    (INITIAL_HOTEL_DATA.users || []).forEach(u => userMap.set(u.email.toLowerCase(), u));
    
    // Local storage users
    localUsers.forEach(u => {
      if (u && u.email) {
        const existing = userMap.get(u.email.toLowerCase()) || {};
        userMap.set(u.email.toLowerCase(), { ...existing, ...u });
      }
    });

    // Backend users
    backendUsers.forEach(u => {
      if (u && u.email) {
        const existing = userMap.get(u.email.toLowerCase()) || {};
        userMap.set(u.email.toLowerCase(), { ...existing, ...u });
      }
    });

    // Firestore users
    firestoreUsers.forEach(u => {
      if (u && u.email) {
        const existing = userMap.get(u.email.toLowerCase()) || {};
        userMap.set(u.email.toLowerCase(), { ...existing, ...u });
      }
    });

    const combined = Array.from(userMap.values());
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(combined));
    return combined;
  },

  async updateUserRole(userId, newRole) {
    try {
      fetch(`${API_BASE}/auth/users/${userId}/role`, {
        method: "PUT",
        headers: this.getHeaders(),
        body: JSON.stringify({ role: newRole })
      }).catch(() => {});
    } catch (e) {}

    const updated = DataStore.updateUserRole(userId, newRole);
    return { success: true, user: updated, message: `Role updated to ${newRole}` };
  },

  async deleteUser(userId) {
    try {
      fetch(`${API_BASE}/auth/users/${userId}`, {
        method: "DELETE",
        headers: this.getHeaders()
      }).catch(() => {});
    } catch (e) {}

    DataStore.deleteUser(userId);
    return { success: true, message: "User deleted successfully" };
  },

  // --------------------------------------------------------------------------
  // Posts CRUD
  // --------------------------------------------------------------------------
  async getPosts(filter = {}) {
    try {
      const params = new URLSearchParams(filter).toString();
      const res = await fetch(`${API_BASE}/posts?${params}`, { headers: this.getHeaders() });
      if (res.ok) {
        const data = await res.json();
        return data.posts || [];
      }
      return DataStore.getPosts(filter);
    } catch (e) {
      return DataStore.getPosts(filter);
    }
  },

  async getPostById(id) {
    try {
      const res = await fetch(`${API_BASE}/posts/${id}`, { headers: this.getHeaders() });
      if (res.ok) {
        const data = await res.json();
        return data.post;
      }
      return DataStore.getPostById(id);
    } catch (e) {
      return DataStore.getPostById(id);
    }
  },

  async createPost(postData) {
    try {
      const res = await fetch(`${API_BASE}/posts`, {
        method: "POST",
        headers: this.getHeaders(),
        body: JSON.stringify(postData)
      });
      const data = await res.json();
      if (data.success) {
        DataStore.createPost(postData); // Sync local
        return data.post;
      }
      throw new Error(data.message);
    } catch (e) {
      return DataStore.createPost(postData);
    }
  },

  async updatePost(id, postData) {
    try {
      const res = await fetch(`${API_BASE}/posts/${id}`, {
        method: "PUT",
        headers: this.getHeaders(),
        body: JSON.stringify(postData)
      });
      const data = await res.json();
      if (data.success) {
        DataStore.updatePost(id, postData);
        return data.post;
      }
      throw new Error(data.message);
    } catch (e) {
      return DataStore.updatePost(id, postData);
    }
  },

  async deletePost(id) {
    try {
      const res = await fetch(`${API_BASE}/posts/${id}`, {
        method: "DELETE",
        headers: this.getHeaders()
      });
      DataStore.deletePost(id);
      return res.ok;
    } catch (e) {
      return DataStore.deletePost(id);
    }
  },

  // Member 3 (Approver) Review Endpoint
  async reviewPost(id, action, notes) {
    try {
      const res = await fetch(`${API_BASE}/posts/${id}/review`, {
        method: "PUT",
        headers: this.getHeaders(),
        body: JSON.stringify({ action, notes })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to review post");
      }
      const user = AuthService.getCurrentUser();
      DataStore.changePostStatus(id, action === 'approve' ? 'scheduled' : 'rejected', notes, user.name);
      return data;
    } catch (e) {
      const user = AuthService.getCurrentUser();
      DataStore.changePostStatus(id, action === 'approve' ? 'scheduled' : 'rejected', notes, user.name);
      return { success: true, message: `Post ${action}d` };
    }
  },

  // --------------------------------------------------------------------------
  // Campaigns CRUD
  // --------------------------------------------------------------------------
  async getCampaigns() {
    try {
      const res = await fetch(`${API_BASE}/campaigns`, { headers: this.getHeaders() });
      if (res.ok) {
        const data = await res.json();
        return data.campaigns || [];
      }
      return DataStore.getCampaigns();
    } catch (e) {
      return DataStore.getCampaigns();
    }
  },

  async createCampaign(campData) {
    try {
      const res = await fetch(`${API_BASE}/campaigns`, {
        method: "POST",
        headers: this.getHeaders(),
        body: JSON.stringify(campData)
      });
      const data = await res.json();
      DataStore.createCampaign(campData);
      return data.campaign;
    } catch (e) {
      return DataStore.createCampaign(campData);
    }
  },

  // --------------------------------------------------------------------------
  // Analytics Summary
  // --------------------------------------------------------------------------
  async getAnalyticsSummary() {
    try {
      const res = await fetch(`${API_BASE}/analytics/summary`, { headers: this.getHeaders() });
      if (res.ok) {
        const json = await res.json();
        return json.data;
      }
      return DataStore.getAnalyticsSummary();
    } catch (e) {
      return DataStore.getAnalyticsSummary();
    }
  },

  // --------------------------------------------------------------------------
  // Privacy & Consent CRUD
  // --------------------------------------------------------------------------
  async getConsents() {
    try {
      const res = await fetch(`${API_BASE}/consents`, { headers: this.getHeaders() });
      if (res.ok) {
        const data = await res.json();
        return data.consents || [];
      }
      return DataStore.getConsents();
    } catch (e) {
      return DataStore.getConsents();
    }
  },

  async createConsent(consentData) {
    try {
      const res = await fetch(`${API_BASE}/consents`, {
        method: "POST",
        headers: this.getHeaders(),
        body: JSON.stringify(consentData)
      });
      const data = await res.json();
      DataStore.createConsent(consentData);
      return data.consent;
    } catch (e) {
      return DataStore.createConsent(consentData);
    }
  },

  async deleteConsent(id) {
    try {
      await fetch(`${API_BASE}/consents/${id}`, { method: "DELETE", headers: this.getHeaders() });
      DataStore.deleteConsent(id);
      return true;
    } catch (e) {
      return DataStore.deleteConsent(id);
    }
  }
};
