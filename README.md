# Grand Azure Resort & Spa — Social Media Content Management Platform (SMCMP)

> **Course:** CCS4360 – Techniques in Social Media  
> **Faculty:** Faculty of Computing and Technology — Department of Computing and IT  
> **Project Type:** Group Assignment (Full-Stack Software Development)  
> **Selected Organisation:** Luxury Hotel & Spa (*Grand Azure Luxury Resort & Spa*)  
> **Frontend Stack:** HTML5, CSS3, Bootstrap 5.3, FontAwesome 6, Bootstrap Icons, Chart.js, Vanilla JavaScript  
> **Backend Stack:** Node.js + Express REST API (`/api/*`), JWT Authentication, Role-Based Access Control (RBAC)  
> **Database & Cloud:** Google Firebase (Cloud Firestore, Firebase Authentication, Firebase Analytics) + In-Memory/LocalStorage Fallback Engine  

---

## 🌟 Executive Summary

**Grand Azure SMCMP** is an enterprise-grade full-stack platform designed to streamline social media workflows for a luxury 5-star resort. The platform addresses multi-channel marketing challenges across **Instagram, Facebook, TikTok, LinkedIn, X (Twitter), and YouTube**.

It incorporates:
1. **3-Member Role-Based Access Control (RBAC):**
   - 👨‍💻 **Member 1 (Administrator — Victoria Sterling):** User management (`users.html`), full CRUD, campaign budget, security & privacy.
   - 👩‍💻 **Member 2 (Content Creator — Marcus Vance):** Post creation, AI captions, platform selection, save drafts, edit own posts, submit for approval. **CANNOT approve own posts**.
   - 👨‍💻 **Member 3 (Content Approver — Elena Rostova):** Review pending queue, approve, reject with feedback notes, audit logs. **CANNOT manage users**.
2. **End-to-End Multi-Stage Approval Pipeline:** Creator ➔ Approver ➔ Scheduled / Published.
3. **Live Multi-Platform Preview & AI Assistant:** Real-time social card rendering with automated hospitality caption generation.
4. **Interactive Visual Calendar & Scheduler:** Date/time slotting with hospitality peak-hour recommendations.
5. **Campaign Management:** Tracking product launches, CSR eco-tourism, and seasonal dining events.
6. **Data-Driven Analytics:** Visual charts with Chart.js measuring Reach, Likes, Shares, Comments, and ROI.
7. **Privacy & Legal Compliance:** Guest & influencer photo release waiver register, GDPR alignment, and brand voice policy.
8. **18+ Rich Seed Datasets:** Fully interactive CRUD (Create, Read, Update, Delete) pre-loaded in both Node.js Backend & Cloud Firestore (`hotel-smcmp`).

---

## 📁 System Architecture & Directory Structure

```
Grand-Azure-SMCMP/
│
├── frontend/                     ← 🌐 FRONTEND (HTML5, CSS3, Bootstrap 5, JS)
│   ├── index.html                # Main Landing Hub & Module Showcase
│   ├── login.html                # Firebase & Local Auth Login & Role Switcher
│   ├── dashboard.html            # Content Management Dashboard (Search, Filter, Grid/List CRUD)
│   ├── create-post.html          # Content Creation Studio with Live Feed Preview & AI Caption Assistant
│   ├── approval-workflow.html    # 3-Stage Approval Pipeline & Review Notes Audit Trail
│   ├── calendar.html             # Visual Interactive Content Calendar & Scheduler
│   ├── campaigns.html            # Hotel Campaign Management Hub
│   ├── analytics.html            # Analytics & Performance Dashboard with Chart.js
│   ├── strategy.html             # Hotel Social Media Strategy, Best Posting Times & Hashtag Banks
│   ├── privacy-compliance.html   # Privacy Center, Guest Consent Waiver Tracker & Brand Guidelines
│   ├── users.html                # Member 1 User Management & Role Governance
│   │
│   ├── css/
│   │   └── custom.css            # Luxury Hotel Theme Stylesheet (Navy & Champagne Gold Palette)
│   │
│   └── js/
│       ├── firebase-config.js    # 🔥 Firebase 12.19.0 SDK, Auth, Firestore Auto-Seeder
│       ├── auth.js               # Client Role-Based Access Control Manager
│       ├── api.js                # Client REST API Bridge (Express API + Fallback)
│       ├── data.js               # 18+ Hotel Seed Dataset (Posts, Campaigns, Users, Strategy)
│       ├── store.js              # State management & LocalStorage CRUD engine
│       ├── ai-generator.js       # Bonus AI Caption & Hashtag generator simulator
│       └── app.js                # Global utilities, toast notifications, formatting, and modals
│
├── server/                       ← 🟢 BACKEND (Node.js + Express REST API)
│   ├── package.json              # Express, Cors, JWT, Bcryptjs dependencies
│   ├── server.js                 # Express server entry point (Port 5000)
│   │
│   ├── config/
│   │   ├── db.js                 # Database configuration
│   │   └── firebase.js           # Firebase Admin SDK configuration
│   │
│   ├── middleware/
│   │   ├── auth.js               # JWT & Header Authentication middleware
│   │   ├── rbac.js               # Role-Based Access Control (Admin, Creator, Approver)
│   │   └── errorHandler.js       # Global Express error handler
│   │
│   ├── controllers/
│   │   ├── authController.js     # User registration, login, role assignment
│   │   ├── postController.js     # Posts CRUD & Review pipeline
│   │   ├── campaignController.js # Campaigns CRUD & linked post tracking
│   │   ├── analyticsController.js# Dynamic metrics aggregation & KPIs
│   │   └── consentController.js  # Privacy consent records CRUD
│   │
│   ├── routes/
│   │   ├── authRoutes.js         # /api/auth endpoints
│   │   ├── postRoutes.js         # /api/posts endpoints
│   │   ├── campaignRoutes.js     # /api/campaigns endpoints
│   │   ├── analyticsRoutes.js    # /api/analytics endpoints
│   │   └── consentRoutes.js      # /api/consents endpoints
│   │
│   └── db/
│       └── database.js           # In-Memory Database Engine with 18+ Hotel Seed Records
│
├── firestore.rules               # Cloud Firestore Security Rules
├── firebase.json                 # Firebase Hosting & Emulators Configuration
├── .firebaserc                   # Firebase Project Binding (hotel-smcmp)
└── README.md                     # Comprehensive Project Guide & Academic Presentation Walkthrough
```

---

## 👥 3-Member Academic Group Allocation & RBAC Matrix

| Role & Member | Target User | Key Responsibilities | Access Permissions & Guards |
|---|---|---|---|
| **👨‍💻 Member 1: Administrator** | **Victoria Sterling** (`admin@grandazurehotel.com`) | System administrator, user account management, role assignment, hotel campaigns & budget, full system access, security governance. | Full CRUD on all modules, `/api/auth/users` access, override approval powers. |
| **👩‍💻 Member 2: Content Creator** | **Marcus Vance** (`creator@grandazurehotel.com`) | Social media post authoring, AI captions, platform selection, image upload, draft saving, submitting posts for review. | Can create/edit own posts, save drafts, submit for review. **CANNOT approve own posts** (Enforced by `preventSelfApproval` & `requireApprover`). |
| **👨‍💻 Member 3: Content Approver** | **Elena Rostova** (`approver@grandazurehotel.com`) | Review submitted content queue, quality assurance, brand voice compliance, approving/rejecting posts, feedback notes. | Review queue access, approve/reject endpoints. **CANNOT manage system users** (Guarded on `users.html` and `/api/auth/users`). |

---

## 🚀 How to Run the Project

### Option A: Run Full-Stack (Node.js + Express Server)
1. Open a terminal in the `server/` directory:
   ```bash
   cd server
   npm install
   node server.js
   ```
2. Open your browser and navigate to:
   - **Main Hub:** `http://localhost:5000/` or `http://localhost:5000/index.html`
   - **Dashboard:** `http://localhost:5000/dashboard.html`
   - **Member 1 (Admin User Mgmt):** `http://localhost:5000/users.html`
   - **Member 2 (Content Creation & AI):** `http://localhost:5000/create-post.html`
   - **Member 3 (Approval Pipeline):** `http://localhost:5000/approval-workflow.html`

### Option B: Run Frontend Directly (Standalone Mode)
- Simply double-click `frontend/index.html` or open it in any web browser (Chrome, Edge, Firefox, Safari).
- All features, local CRUD operations, Chart.js analytics, AI caption generator, and Firebase services work seamlessly with automatic LocalStorage caching!

---

## 🔥 Firebase Cloud Architecture (`hotel-smcmp`)

Grand Azure SMCMP is fully configured with Google Firebase:
1. **Firebase Authentication:**
   - Pre-configured email/password accounts:
     - `admin@grandazurehotel.com` (Pass: `GrandAzure@2026`)
     - `creator@grandazurehotel.com` (Pass: `GrandAzure@2026`)
     - `approver@grandazurehotel.com` (Pass: `GrandAzure@2026`)
   - Google Sign-In with popup OAuth
2. **Cloud Firestore Collections:**
   - `posts` ➔ 18+ hotel social media documents across 6 platforms.
   - `campaigns` ➔ 4 hotel campaigns (Penthouse Launch, Green Stay, Jazz Fest, Spa Retreat).
   - `users` ➔ User records and assigned RBAC roles.
   - `privacy_consents` ➔ Guest & influencer media release records.
   - `hotel_strategy` ➔ Optimal posting times and hashtag libraries.
3. **One-Click Cloud Seeder:**
   - Open `dashboard.html`, click **"Firebase Cloud"** modal, and click **"Push / Seed All 18+ Posts to Firestore"** to sync all records to Google Cloud Firestore in 2 seconds!

---

## 🎬 10-Minute Academic Presentation Walkthrough

1. **Minute 0:00 - 1:30 (Introduction & Hotel Scenario):**
   - Introduce team members, hotel brand (*Grand Azure Luxury Resort & Spa*), and business challenge across 6 platforms (*Instagram, Facebook, TikTok, LinkedIn, X, YouTube*).
2. **Minute 1:30 - 3:30 (Member 1: User Management & RBAC):**
   - Open `users.html` and `login.html`. Demonstrate Victoria Sterling (Admin) managing user accounts and assigning roles. Show access restrictions when switched to Member 2 or Member 3.
3. **Minute 3:30 - 5:30 (Member 2: Post Creation & AI Studio):**
   - Open `create-post.html`. Pick a theme (e.g. Infinity Pool or Michelin Dining), use the **Bonus AI Caption Generator**, select platforms, and observe the live real-time social feed preview updating. Click "Submit for Approver Review".
4. **Minute 5:30 - 7:00 (Member 3: Approval Workflow Pipeline):**
   - Switch role to *Elena Rostova (Approver)* in `approval-workflow.html`.
   - Inspect the pending queue, demonstrate why creators cannot self-approve, add review feedback notes, and approve the post.
5. **Minute 7:00 - 8:30 (Calendar & Campaign Management):**
   - Open `calendar.html` to demonstrate monthly schedule planning.
   - Open `campaigns.html` to show progress bars for product launches, budget tracking, and linked posts.
6. **Minute 8:30 - 9:30 (Analytics & Privacy Compliance):**
   - Showcase `analytics.html` with interactive Chart.js growth trends, platform share doughnut, and CSV report export.
   - Showcase `privacy-compliance.html` demonstrating the guest photo release waiver register (GDPR compliance).
7. **Minute 9:30 - 10:00 (Conclusion & Technical Architecture):**
   - Highlight full-stack integration (HTML5/Bootstrap 5 frontend + Node.js/Express backend + Firebase Cloud Firestore).

---

## 📄 License & Attribution
Prepared for **CCS4360 – Techniques in Social Media** group assignment.
All photography assets curated via Unsplash license for prototype demonstration purposes.
