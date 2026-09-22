/**
 * Grand Azure Luxury Hotel & Spa - Firebase 12.x Configuration & Integration
 * Project ID: hotel-smcmp
 * Services: Firebase Authentication, Cloud Firestore, Firebase Analytics
 */

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut, 
  onAuthStateChanged,
  updateProfile
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";
import { 
  getFirestore, 
  collection, 
  doc, 
  getDocs, 
  setDoc, 
  deleteDoc, 
  query, 
  orderBy,
  writeBatch
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-analytics.js";

// Web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA3Qu1mb34fuc8pUzYCfgnZNCXFt-X8_ls",
  authDomain: "hotel-smcmp.firebaseapp.com",
  projectId: "hotel-smcmp",
  storageBucket: "hotel-smcmp.firebasestorage.app",
  messagingSenderId: "751725120147",
  appId: "1:751725120147:web:a9937a7faf74fc6db35b66",
  measurementId: "G-H3D7DJGGCX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
let analytics = null;
try {
  analytics = getAnalytics(app);
} catch (e) {
  console.log("Firebase Analytics initialized");
}

const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

// Expose Firebase Service API globally
window.FirebaseService = {
  app,
  auth,
  db,

  // --------------------------------------------------------------------------
  // Firebase Authentication
  // --------------------------------------------------------------------------
  async loginWithEmail(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      const appUser = {
        id: user.uid,
        name: user.displayName || email.split('@')[0],
        email: user.email,
        role: localStorage.getItem("firebase_assigned_role_" + user.uid) || "Administrator",
        avatar: user.photoURL || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
        badgeClass: "admin",
        firebaseUid: user.uid
      };
      
      localStorage.setItem("grand_azure_current_user_v1", JSON.stringify(appUser));
      return { success: true, user: appUser };
    } catch (error) {
      console.error("Firebase Login Error:", error);
      return { success: false, error: error.message };
    }
  },

  async registerWithEmail(email, password, displayName, role = "Content Creator") {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      if (displayName) {
        await updateProfile(user, { displayName });
      }

      // Save role assignment in local storage and in Firestore users collection
      localStorage.setItem("firebase_assigned_role_" + user.uid, role);

      const appUser = {
        id: user.uid,
        name: displayName || email.split('@')[0],
        email: user.email,
        role: role,
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        badgeClass: role === "Administrator" ? "admin" : role === "Content Approver" ? "approver" : "creator",
        firebaseUid: user.uid
      };

      // Save user to Firestore users collection
      try {
        await setDoc(doc(db, "users", user.uid), appUser);
      } catch (e) {
        console.warn("User doc save warning:", e);
      }

      localStorage.setItem("grand_azure_current_user_v1", JSON.stringify(appUser));
      return { success: true, user: appUser };
    } catch (error) {
      console.error("Firebase Register Error:", error);
      return { success: false, error: error.message };
    }
  },

  async loginWithGoogle(selectedRole = "Administrator") {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const role = localStorage.getItem("firebase_assigned_role_" + user.uid) || selectedRole;
      localStorage.setItem("firebase_assigned_role_" + user.uid, role);

      const appUser = {
        id: user.uid,
        name: user.displayName || user.email.split('@')[0],
        email: user.email,
        role: role,
        avatar: user.photoURL || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
        badgeClass: role === "Administrator" ? "admin" : role === "Content Approver" ? "approver" : "creator",
        firebaseUid: user.uid
      };

      try {
        await setDoc(doc(db, "users", user.uid), appUser);
      } catch (e) {
        console.warn("User doc save warning:", e);
      }

      localStorage.setItem("grand_azure_current_user_v1", JSON.stringify(appUser));
      return { success: true, user: appUser };
    } catch (error) {
      console.error("Firebase Google Auth Error:", error);
      return { success: false, error: error.message };
    }
  },

  async logout() {
    try {
      await signOut(auth);
      localStorage.removeItem("grand_azure_current_user_v1");
      return { success: true };
    } catch (error) {
      console.error("Firebase Logout Error:", error);
      return { success: false, error: error.message };
    }
  },

  onAuthStatusChanged(callback) {
    return onAuthStateChanged(auth, (user) => {
      callback(user);
    });
  },

  // --------------------------------------------------------------------------
  // Cloud Firestore Database Operations & Bulk Auto-Seeder
  // --------------------------------------------------------------------------
  async seedAllDataToFirestore(onProgress = null) {
    try {
      let count = 0;
      const total = INITIAL_HOTEL_DATA.posts.length + INITIAL_HOTEL_DATA.campaigns.length + INITIAL_HOTEL_DATA.privacyConsentRecords.length + INITIAL_HOTEL_DATA.users.length;

      // 1. Seed Posts collection
      for (const post of INITIAL_HOTEL_DATA.posts) {
        await setDoc(doc(db, "posts", post.id), post);
        count++;
        if (onProgress) onProgress(`Uploading post ${count}/${total}: ${post.title}`);
      }

      // 2. Seed Campaigns collection
      for (const camp of INITIAL_HOTEL_DATA.campaigns) {
        await setDoc(doc(db, "campaigns", camp.id), camp);
        count++;
        if (onProgress) onProgress(`Uploading campaign ${count}/${total}: ${camp.name}`);
      }

      // 3. Seed Users collection
      for (const usr of INITIAL_HOTEL_DATA.users) {
        await setDoc(doc(db, "users", usr.id), usr);
        count++;
        if (onProgress) onProgress(`Uploading user ${count}/${total}: ${usr.name}`);
      }

      // 4. Seed Privacy Consents collection
      for (const cst of INITIAL_HOTEL_DATA.privacyConsentRecords) {
        await setDoc(doc(db, "privacy_consents", cst.id), cst);
        count++;
        if (onProgress) onProgress(`Uploading consent record ${count}/${total}: ${cst.subjectName}`);
      }

      // 5. Seed Strategy collection
      await setDoc(doc(db, "hotel_strategy", "main"), INITIAL_HOTEL_DATA.strategy);

      return { success: true, count };
    } catch (error) {
      console.error("Firestore Bulk Seeding Error:", error);
      return { success: false, error: error.message };
    }
  },

  async fetchAllPostsFromFirestore() {
    try {
      const q = query(collection(db, "posts"));
      const snapshot = await getDocs(q);
      const posts = [];
      snapshot.forEach((d) => posts.push(d.data()));
      if (posts.length > 0) {
        localStorage.setItem("grand_azure_posts_v1", JSON.stringify(posts));
        return { success: true, posts, count: posts.length };
      }
      return { success: false, message: "No posts found in Firestore collection" };
    } catch (error) {
      console.error("Firestore fetch error:", error);
      return { success: false, error: error.message };
    }
  },

  async savePostToFirestore(post) {
    try {
      await setDoc(doc(db, "posts", post.id), post);
      return { success: true };
    } catch (error) {
      console.warn("Firestore save post:", error.message);
      return { success: false, error: error.message };
    }
  },

  async deletePostFromFirestore(postId) {
    try {
      await deleteDoc(doc(db, "posts", postId));
      return { success: true };
    } catch (error) {
      console.warn("Firestore delete post:", error.message);
      return { success: false, error: error.message };
    }
  },

  async saveCampaignToFirestore(camp) {
    try {
      await setDoc(doc(db, "campaigns", camp.id), camp);
      return { success: true };
    } catch (error) {
      console.warn("Firestore save campaign:", error.message);
      return { success: false, error: error.message };
    }
  },

  async saveConsentToFirestore(cst) {
    try {
      await setDoc(doc(db, "privacy_consents", cst.id), cst);
      return { success: true };
    } catch (error) {
      console.warn("Firestore save consent:", error.message);
      return { success: false, error: error.message };
    }
  },

  // --------------------------------------------------------------------------
  // Cloud Firestore Users Collection
  // --------------------------------------------------------------------------
  async fetchAllUsersFromFirestore() {
    try {
      const q = query(collection(db, "users"));
      const snapshot = await getDocs(q);
      const users = [];
      snapshot.forEach((d) => {
        const u = d.data();
        if (u) {
          if (!u.id) u.id = d.id;
          users.push(u);
        }
      });
      return { success: true, users };
    } catch (error) {
      console.warn("Firestore fetch users:", error.message);
      return { success: false, users: [] };
    }
  },

  async saveUserToFirestore(user) {
    try {
      const uid = user.firebaseUid || user.id || ("usr-" + Date.now());
      await setDoc(doc(db, "users", uid), user, { merge: true });
      return { success: true };
    } catch (error) {
      console.warn("Firestore save user:", error.message);
      return { success: false, error: error.message };
    }
  },

  async deleteUserFromFirestore(userId) {
    try {
      await deleteDoc(doc(db, "users", userId));
      return { success: true };
    } catch (error) {
      console.warn("Firestore delete user:", error.message);
      return { success: false, error: error.message };
    }
  }
};

console.log("🔥 Firebase 12.19.0 connected to project: hotel-smcmp");
