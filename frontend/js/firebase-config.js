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
  getDoc,
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

// Friendly error message converter
function formatFirebaseAuthError(error) {
  const code = error.code || "";
  const msg = error.message || "";
  if (code === "auth/user-not-found" || code === "auth/invalid-credential" || msg.includes("invalid-credential")) {
    return "Account not found or password incorrect. Please click 'Register' to create a new account.";
  }
  if (code === "auth/wrong-password") {
    return "Incorrect password. Please verify and try again.";
  }
  if (code === "auth/email-already-in-use") {
    return "This email is already registered in Firebase. Please Sign In with your existing account.";
  }
  if (code === "auth/weak-password") {
    return "Password is too weak. Please use at least 6 characters.";
  }
  if (code === "auth/invalid-email") {
    return "Please enter a valid email address.";
  }
  if (code === "auth/too-many-requests") {
    return "Too many failed attempts. Please wait a moment and try again.";
  }
  if (code === "auth/popup-closed-by-user") {
    return "Google Sign-In was closed before completing.";
  }
  return error.message || "Authentication error occurred.";
}

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
      
      let userRole = "Administrator";
      let userName = user.displayName || email.split('@')[0];
      let userAvatar = user.photoURL || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80";

      // Try fetching saved profile from Firestore
      try {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          if (data.role) userRole = data.role;
          if (data.name) userName = data.name;
          if (data.avatar) userAvatar = data.avatar;
        } else {
          userRole = localStorage.getItem("firebase_assigned_role_" + user.uid) || (email.includes("creator") ? "Content Creator" : email.includes("approver") ? "Content Approver" : "Administrator");
        }
      } catch (e) {
        userRole = localStorage.getItem("firebase_assigned_role_" + user.uid) || "Administrator";
      }

      const badgeClass = userRole === "Administrator" ? "admin" : userRole === "Content Approver" ? "approver" : "creator";
      const appUser = {
        id: user.uid,
        name: userName,
        email: user.email,
        role: userRole,
        avatar: userAvatar,
        badgeClass: badgeClass,
        firebaseUid: user.uid
      };
      
      localStorage.setItem("grand_azure_current_user_v1", JSON.stringify(appUser));
      localStorage.setItem("grand_azure_current_user", JSON.stringify(appUser));
      return { success: true, user: appUser };
    } catch (error) {
      console.error("Firebase Login Error:", error);
      return { success: false, error: formatFirebaseAuthError(error) };
    }
  },

  async registerWithEmail(email, password, displayName, role = "Content Creator") {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      if (displayName) {
        await updateProfile(user, { displayName });
      }

      const badgeClass = role === "Administrator" ? "admin" : role === "Content Approver" ? "approver" : "creator";
      const defaultAvatar = role === "Administrator" 
        ? "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
        : role === "Content Approver"
        ? "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80"
        : "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80";

      const appUser = {
        id: user.uid,
        name: displayName || email.split('@')[0],
        email: user.email,
        role: role,
        avatar: defaultAvatar,
        badgeClass: badgeClass,
        firebaseUid: user.uid,
        createdAt: new Date().toISOString()
      };

      // Save role assignment in local storage and in Firestore users collection
      localStorage.setItem("firebase_assigned_role_" + user.uid, role);

      // Save user to Firestore users collection
      try {
        await setDoc(doc(db, "users", user.uid), appUser);
      } catch (e) {
        console.warn("User doc save warning:", e);
      }

      localStorage.setItem("grand_azure_current_user_v1", JSON.stringify(appUser));
      localStorage.setItem("grand_azure_current_user", JSON.stringify(appUser));
      return { success: true, user: appUser };
    } catch (error) {
      console.error("Firebase Register Error:", error);
      return { success: false, error: formatFirebaseAuthError(error) };
    }
  },

  async loginWithGoogle(selectedRole = "Administrator") {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      let userRole = selectedRole;
      let userName = user.displayName || user.email.split('@')[0];
      let userAvatar = user.photoURL || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80";

      // Check if user already exists in Firestore
      try {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          if (data.role) userRole = data.role;
          if (data.name) userName = data.name;
        } else {
          // New user registering via Google - save assigned role
          userRole = localStorage.getItem("firebase_assigned_role_" + user.uid) || selectedRole;
        }
      } catch (e) {
        userRole = localStorage.getItem("firebase_assigned_role_" + user.uid) || selectedRole;
      }

      const badgeClass = userRole === "Administrator" ? "admin" : userRole === "Content Approver" ? "approver" : "creator";
      const appUser = {
        id: user.uid,
        name: userName,
        email: user.email,
        role: userRole,
        avatar: userAvatar,
        badgeClass: badgeClass,
        firebaseUid: user.uid
      };

      try {
        await setDoc(doc(db, "users", user.uid), appUser, { merge: true });
      } catch (e) {
        console.warn("User doc save warning:", e);
      }

      localStorage.setItem("grand_azure_current_user_v1", JSON.stringify(appUser));
      localStorage.setItem("grand_azure_current_user", JSON.stringify(appUser));
      return { success: true, user: appUser };
    } catch (error) {
      console.error("Firebase Google Auth Error:", error);
      return { success: false, error: formatFirebaseAuthError(error) };
    }
  },

  async logout() {
    try {
      await signOut(auth);
      localStorage.removeItem("grand_azure_current_user_v1");
      localStorage.removeItem("grand_azure_current_user");
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
