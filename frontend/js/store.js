/**
 * Grand Azure Luxury Hotel & Spa - SMCMP Data Store
 * Provides full CRUD operations for Posts, Campaigns, Consent Records,
 * LocalStorage caching and Cloud Firestore background sync.
 */

const STORAGE_KEYS = {
  POSTS: "grand_azure_posts_v1",
  CAMPAIGNS: "grand_azure_campaigns_v1",
  CONSENTS: "grand_azure_consents_v1",
  CURRENT_USER: "grand_azure_current_user_v1",
  USERS: "grand_azure_users_v1"
};

const DataStore = {
  // Initialize storage with seed data if not present
  init() {
    if (!localStorage.getItem(STORAGE_KEYS.POSTS)) {
      localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(INITIAL_HOTEL_DATA.posts));
    }
    if (!localStorage.getItem(STORAGE_KEYS.CAMPAIGNS)) {
      localStorage.setItem(STORAGE_KEYS.CAMPAIGNS, JSON.stringify(INITIAL_HOTEL_DATA.campaigns));
    }
    if (!localStorage.getItem(STORAGE_KEYS.CONSENTS)) {
      localStorage.setItem(STORAGE_KEYS.CONSENTS, JSON.stringify(INITIAL_HOTEL_DATA.privacyConsentRecords));
    }
    if (!localStorage.getItem(STORAGE_KEYS.CURRENT_USER)) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(INITIAL_HOTEL_DATA.users[0]));
    }
    if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(INITIAL_HOTEL_DATA.users));
    }
  },

  // Reset to default seed dataset
  resetDefaultData() {
    localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(INITIAL_HOTEL_DATA.posts));
    localStorage.setItem(STORAGE_KEYS.CAMPAIGNS, JSON.stringify(INITIAL_HOTEL_DATA.campaigns));
    localStorage.setItem(STORAGE_KEYS.CONSENTS, JSON.stringify(INITIAL_HOTEL_DATA.privacyConsentRecords));
    
    // Background sync to Firestore if connected
    if (window.FirebaseService) {
      window.FirebaseService.syncPostsToFirestore(INITIAL_HOTEL_DATA.posts);
    }
  },

  // --------------------------------------------------------------------------
  // Posts CRUD
  // --------------------------------------------------------------------------
  getPosts(filter = {}) {
    this.init();
    let posts = JSON.parse(localStorage.getItem(STORAGE_KEYS.POSTS) || "[]");

    if (filter.status && filter.status !== "all") {
      posts = posts.filter(p => p.status === filter.status);
    }
    if (filter.platform && filter.platform !== "all") {
      posts = posts.filter(p => p.platforms && p.platforms.includes(filter.platform));
    }
    if (filter.campaignId && filter.campaignId !== "all") {
      posts = posts.filter(p => p.campaignId === filter.campaignId);
    }
    if (filter.search && filter.search.trim() !== "") {
      const q = filter.search.toLowerCase();
      posts = posts.filter(p =>
        (p.title && p.title.toLowerCase().includes(q)) ||
        (p.caption && p.caption.toLowerCase().includes(q)) ||
        (p.author && p.author.toLowerCase().includes(q))
      );
    }

    // Sort by scheduledDate or createdAt descending
    posts.sort((a, b) => new Date(b.scheduledDate || b.createdAt) - new Date(a.scheduledDate || a.createdAt));
    return posts;
  },

  getPostById(id) {
    const posts = this.getPosts();
    return posts.find(p => p.id === id) || null;
  },

  createPost(postData) {
    const posts = this.getPosts();
    const newPost = {
      id: "post-" + Date.now(),
      title: postData.title || "Untitled Post",
      caption: postData.caption || "",
      image: postData.image || "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=80",
      platforms: postData.platforms && postData.platforms.length ? postData.platforms : ["instagram"],
      status: postData.status || "draft",
      campaignId: postData.campaignId || "",
      scheduledDate: postData.scheduledDate || new Date().toISOString().split('T')[0],
      scheduledTime: postData.scheduledTime || "12:00",
      author: postData.author || "Marcus Vance",
      approver: postData.approver || "",
      approvalNotes: postData.approvalNotes || "",
      analytics: postData.analytics || {
        likes: postData.status === "published" ? Math.floor(Math.random() * 2000) + 500 : 0,
        shares: postData.status === "published" ? Math.floor(Math.random() * 400) + 50 : 0,
        comments: postData.status === "published" ? Math.floor(Math.random() * 150) + 20 : 0,
        reach: postData.status === "published" ? Math.floor(Math.random() * 25000) + 8000 : 0,
        engagementRate: postData.status === "published" ? (Math.random() * 5 + 5).toFixed(1) + "%" : "0%"
      },
      createdAt: new Date().toISOString()
    };

    posts.unshift(newPost);
    localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts));

    // Cloud Firestore Async Sync
    if (window.FirebaseService) {
      window.FirebaseService.savePostToFirestore(newPost);
    }

    return newPost;
  },

  updatePost(id, updatedFields) {
    const posts = this.getPosts();
    const index = posts.findIndex(p => p.id === id);
    if (index !== -1) {
      posts[index] = { ...posts[index], ...updatedFields };
      localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts));
      
      // Cloud Firestore Async Sync
      if (window.FirebaseService) {
        window.FirebaseService.savePostToFirestore(posts[index]);
      }

      return posts[index];
    }
    return null;
  },

  deletePost(id) {
    let posts = this.getPosts();
    const initialLen = posts.length;
    posts = posts.filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts));

    // Cloud Firestore Async Delete
    if (window.FirebaseService) {
      window.FirebaseService.deletePostFromFirestore(id);
    }

    return posts.length < initialLen;
  },

  changePostStatus(id, newStatus, notes = "", approverName = "") {
    const post = this.getPostById(id);
    if (!post) return null;

    const updates = {
      status: newStatus,
      approvalNotes: notes || post.approvalNotes
    };

    if (approverName) {
      updates.approver = approverName;
    }

    if (newStatus === "published" && (!post.analytics || post.analytics.reach === 0)) {
      updates.analytics = {
        likes: Math.floor(Math.random() * 2500) + 600,
        shares: Math.floor(Math.random() * 450) + 80,
        comments: Math.floor(Math.random() * 180) + 30,
        reach: Math.floor(Math.random() * 30000) + 12000,
        engagementRate: (Math.random() * 6 + 6).toFixed(1) + "%"
      };
    }

    return this.updatePost(id, updates);
  },

  // --------------------------------------------------------------------------
  // Campaigns CRUD
  // --------------------------------------------------------------------------
  getCampaigns() {
    this.init();
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.CAMPAIGNS) || "[]");
  },

  getCampaignById(id) {
    const campaigns = this.getCampaigns();
    return campaigns.find(c => c.id === id) || null;
  },

  createCampaign(campData) {
    const campaigns = this.getCampaigns();
    const newCamp = {
      id: "camp-" + Date.now(),
      name: campData.name || "Untitled Campaign",
      type: campData.type || "Event Promotion",
      status: campData.status || "Upcoming",
      startDate: campData.startDate || new Date().toISOString().split('T')[0],
      endDate: campData.endDate || "",
      budget: campData.budget || "$5,000",
      targetPosts: parseInt(campData.targetPosts) || 5,
      completedPosts: 0,
      goal: campData.goal || "",
      coverImage: campData.coverImage || "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&auto=format&fit=crop&q=80"
    };
    campaigns.unshift(newCamp);
    localStorage.setItem(STORAGE_KEYS.CAMPAIGNS, JSON.stringify(campaigns));
    return newCamp;
  },

  // --------------------------------------------------------------------------
  // Privacy & Consent CRUD
  // --------------------------------------------------------------------------
  getConsents() {
    this.init();
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.CONSENTS) || "[]");
  },

  createConsent(data) {
    const list = this.getConsents();
    const newConsent = {
      id: "cst-" + Date.now().toString().slice(-4),
      subjectName: data.subjectName || "Guest / Participant",
      mediaDescription: data.mediaDescription || "",
      consentType: data.consentType || "Guest Photo Release",
      status: data.status || "Signed & Verified",
      dateSigned: data.dateSigned || new Date().toISOString().split('T')[0],
      expiryDate: data.expiryDate || "2028-12-31",
      notes: data.notes || ""
    };
    list.unshift(newConsent);
    localStorage.setItem(STORAGE_KEYS.CONSENTS, JSON.stringify(list));
    return newConsent;
  },

  deleteConsent(id) {
    let list = this.getConsents();
    list = list.filter(c => c.id !== id);
    localStorage.setItem(STORAGE_KEYS.CONSENTS, JSON.stringify(list));
    return true;
  },

  // --------------------------------------------------------------------------
  // Users & Staff Management CRUD
  // --------------------------------------------------------------------------
  getUsers() {
    this.init();
    let users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || "[]");
    if (!users || users.length === 0) {
      users = [...INITIAL_HOTEL_DATA.users];
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    }
    return users;
  },

  addUser(userData) {
    const users = this.getUsers();
    const existingIndex = users.findIndex(u => u.email && u.email.toLowerCase() === (userData.email || "").toLowerCase());
    if (existingIndex !== -1) {
      users[existingIndex] = { ...users[existingIndex], ...userData };
    } else {
      users.push(userData);
    }
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    return userData;
  },

  updateUserRole(userId, newRole) {
    const users = this.getUsers();
    const u = users.find(x => x.id === userId || x.firebaseUid === userId);
    if (u) {
      u.role = newRole;
      u.badgeClass = newRole === "Administrator" ? "admin" : newRole === "Content Approver" ? "approver" : "creator";
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
      
      const cur = AuthService.getCurrentUser();
      if (cur && (cur.id === userId || cur.email === u.email)) {
        cur.role = newRole;
        cur.badgeClass = u.badgeClass;
        localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(cur));
      }
      
      if (window.FirebaseService) {
        window.FirebaseService.saveUserToFirestore(u);
      }
      return u;
    }
    return null;
  },

  deleteUser(userId) {
    let users = this.getUsers();
    users = users.filter(x => x.id !== userId && x.firebaseUid !== userId);
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    if (window.FirebaseService) {
      window.FirebaseService.deleteUserFromFirestore(userId);
    }
    return true;
  },

  // --------------------------------------------------------------------------
  // Dynamic Analytics Calculator
  // --------------------------------------------------------------------------
  getAnalyticsSummary() {
    const posts = this.getPosts();
    const published = posts.filter(p => p.status === "published");
    const scheduled = posts.filter(p => p.status === "scheduled");
    const inReview = posts.filter(p => p.status === "in_review");
    const drafts = posts.filter(p => p.status === "draft");

    let totalLikes = 0;
    let totalShares = 0;
    let totalComments = 0;
    let totalReach = 0;

    const platformCounts = {
      instagram: 0,
      facebook: 0,
      tiktok: 0,
      linkedin: 0,
      x: 0,
      youtube: 0
    };

    published.forEach(p => {
      if (p.analytics) {
        totalLikes += (p.analytics.likes || 0);
        totalShares += (p.analytics.shares || 0);
        totalComments += (p.analytics.comments || 0);
        totalReach += (p.analytics.reach || 0);
      }
      if (p.platforms) {
        p.platforms.forEach(plat => {
          if (platformCounts[plat] !== undefined) {
            platformCounts[plat]++;
          }
        });
      }
    });

    const avgEngagementRate = published.length > 0
      ? (((totalLikes + totalComments + totalShares) / (totalReach || 1)) * 100).toFixed(1) + "%"
      : "0%";

    return {
      totalPosts: posts.length,
      publishedCount: published.length,
      scheduledCount: scheduled.length,
      inReviewCount: inReview.length,
      draftCount: drafts.length,
      totalLikes,
      totalShares,
      totalComments,
      totalReach,
      avgEngagementRate,
      platformCounts,
      topPosts: [...published].sort((a, b) => ((b.analytics?.reach || 0) - (a.analytics?.reach || 0))).slice(0, 5)
    };
  }
};

// Auto-run init
DataStore.init();
