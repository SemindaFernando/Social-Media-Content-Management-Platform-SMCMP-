/**
 * Grand Azure Luxury Hotel & Spa - Database Storage Adapter
 * JSON-backed persistence engine pre-seeded with 18+ Hotel Posts, Campaigns, Users, and Privacy Records.
 */

const fs = require('fs');
const path = require('path');

const DB_FILE = path.join(__dirname, 'db.json');

// Default initial dataset
const DEFAULT_DATA = {
  users: [
    {
      id: "usr-admin",
      name: "Victoria Sterling",
      email: "admin@grandazurehotel.com",
      password: "password123", // In production: bcrypt hash
      role: "Administrator",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
      badgeClass: "admin",
      createdAt: "2026-08-01T00:00:00Z"
    },
    {
      id: "usr-creator",
      name: "Marcus Vance",
      email: "creator@grandazurehotel.com",
      password: "password123",
      role: "Content Creator",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      badgeClass: "creator",
      createdAt: "2026-08-05T00:00:00Z"
    },
    {
      id: "usr-approver",
      name: "Elena Rostova",
      email: "approver@grandazurehotel.com",
      password: "password123",
      role: "Content Approver",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
      badgeClass: "approver",
      createdAt: "2026-08-10T00:00:00Z"
    }
  ],
  campaigns: [
    {
      id: "camp-1",
      name: "Royal Penthouse & Spa Suites Launch",
      type: "New Product Launch",
      status: "Active",
      startDate: "2026-09-01",
      endDate: "2026-10-15",
      budget: "$12,500",
      targetPosts: 8,
      completedPosts: 5,
      goal: "Promote brand new private jacuzzi penthouse suites and generate 120+ direct luxury bookings.",
      coverImage: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&auto=format&fit=crop&q=80"
    },
    {
      id: "camp-2",
      name: "Green Stay & Eco-Resort Initiative",
      type: "Awareness Campaign",
      status: "Active",
      startDate: "2026-08-15",
      endDate: "2026-11-30",
      budget: "$6,000",
      targetPosts: 6,
      completedPosts: 4,
      goal: "Highlight zero-single-use-plastic, solar energy, and organic farm-to-table dining sustainability.",
      coverImage: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&auto=format&fit=crop&q=80"
    },
    {
      id: "camp-3",
      name: "Sunset Jazz & Mediterranean Seafood Fest",
      type: "Event Promotion",
      status: "Upcoming",
      startDate: "2026-09-20",
      endDate: "2026-09-28",
      budget: "$4,800",
      targetPosts: 5,
      completedPosts: 2,
      goal: "Drive 300+ table reservations for the beachfront terrace weekend jazz & live grill night.",
      coverImage: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&auto=format&fit=crop&q=80"
    },
    {
      id: "camp-4",
      name: "Autumn Wellness & Thermal Spa Retreat",
      type: "Seasonal Promotion",
      status: "Draft",
      startDate: "2026-10-01",
      endDate: "2026-11-15",
      budget: "$8,000",
      targetPosts: 6,
      completedPosts: 1,
      goal: "Attract luxury couples and solo wellness travelers for 3-day holistic detox packages.",
      coverImage: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&auto=format&fit=crop&q=80"
    }
  ],
  posts: [
    {
      id: "post-101",
      title: "Royal Azure Infinity Pool Sunset Serenity",
      caption: "Unwind where the horizon meets pure luxury. Our 50m heated infinity pool overlooks the sapphire coastline. What is your definition of the ultimate sunset view? 🌅🥂 #GrandAzureResort #LuxuryHospitality #SunsetVibes #InfinityPool #StaycationGoals",
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop&q=80",
      platforms: ["instagram", "facebook"],
      status: "published",
      campaignId: "camp-1",
      scheduledDate: "2026-09-05",
      scheduledTime: "18:30",
      author: "Marcus Vance",
      authorId: "usr-creator",
      approver: "Elena Rostova",
      approvalNotes: "Approved - Great high-res shot of the sunset terrace.",
      analytics: { likes: 1845, shares: 240, comments: 92, reach: 16400, engagementRate: "8.4%" },
      createdAt: "2026-09-04T10:15:00Z"
    },
    {
      id: "post-102",
      title: "Michelin-Starred Ocean Dining Experience",
      caption: "Culinary artistry redefined. Chef Antoine presents our signature pan-seared sea bass with saffron reduction & organic herbs picked directly from our rooftop greenhouse. 🍷✨ Reserve your table via link in bio. #FineDining #GrandAzureEats #MichelinGuide #SeafoodLovers",
      image: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=800&auto=format&fit=crop&q=80",
      platforms: ["instagram", "facebook", "tiktok"],
      status: "published",
      campaignId: "camp-3",
      scheduledDate: "2026-09-08",
      scheduledTime: "12:45",
      author: "Marcus Vance",
      authorId: "usr-creator",
      approver: "Elena Rostova",
      approvalNotes: "Approved without modifications.",
      analytics: { likes: 2410, shares: 380, comments: 145, reach: 22800, engagementRate: "9.2%" },
      createdAt: "2026-09-07T14:30:00Z"
    },
    {
      id: "post-103",
      title: "Eco-Stay: 100% Single-Use Plastic Elimination",
      caption: "We believe true luxury cares for our planet. Grand Azure is proud to announce that all guest amenities, glass water bottling, and kitchen operations are now 100% free of single-use plastics. 🌿💚 #SustainableLuxury #GreenHotel #EcoTourism #EcoFriendlyTravel",
      image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&auto=format&fit=crop&q=80",
      platforms: ["linkedin", "facebook", "x"],
      status: "published",
      campaignId: "camp-2",
      scheduledDate: "2026-09-10",
      scheduledTime: "09:00",
      author: "Marcus Vance",
      authorId: "usr-creator",
      approver: "Victoria Sterling",
      approvalNotes: "Approved by Admin - Excellent CSR messaging.",
      analytics: { likes: 980, shares: 410, comments: 67, reach: 14200, engagementRate: "7.1%" },
      createdAt: "2026-09-09T11:00:00Z"
    },
    {
      id: "post-104",
      title: "Presidential Penthouse Suite Tour (TikTok & Reels)",
      caption: "Step inside our top-floor 240sqm Presidential Penthouse with private wrap-around terrace, bespoke marble bath, and 24/7 butler service. ✨🏨 #HotelTour #LuxurySuite #TikTokTravel #PresidentialSuite #GrandAzure",
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&auto=format&fit=crop&q=80",
      platforms: ["tiktok", "instagram", "youtube"],
      status: "scheduled",
      campaignId: "camp-1",
      scheduledDate: "2026-09-14",
      scheduledTime: "19:00",
      author: "Marcus Vance",
      authorId: "usr-creator",
      approver: "Elena Rostova",
      approvalNotes: "Video approved. Music licensed under BMI hotel master agreement.",
      analytics: { likes: 0, shares: 0, comments: 0, reach: 0, engagementRate: "0%" },
      createdAt: "2026-09-11T09:20:00Z"
    },
    {
      id: "post-105",
      title: "Live Jazz & Wine Nights on the Azure Deck",
      caption: "Join us this Friday at 7:30 PM for smooth sax melodies, artisan charcuterie boards, and sommelier-selected vintage wines by the sea. 🎷🥂 Free entry for resident guests. #GrandAzureEvents #LiveJazz #WeekendGetaway #WineAndDine",
      image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=800&auto=format&fit=crop&q=80",
      platforms: ["facebook", "instagram"],
      status: "scheduled",
      campaignId: "camp-3",
      scheduledDate: "2026-09-15",
      scheduledTime: "17:00",
      author: "Marcus Vance",
      authorId: "usr-creator",
      approver: "Elena Rostova",
      approvalNotes: "Approved. Tag the guest musician @JulianSaxOfficial.",
      analytics: { likes: 0, shares: 0, comments: 0, reach: 0, engagementRate: "0%" },
      createdAt: "2026-09-11T13:40:00Z"
    },
    {
      id: "post-106",
      title: "Signature Himalayan Salt Stone Massage Promo",
      caption: "Release all tension with our deep warming Himalayan stone therapy, infused with organic lavender and eucalyptus oils. Book your 90-minute treatment this week and receive complimentary herbal sauna access. 🧖‍♀️💆‍♂️ #SpaWellness #LuxurySpa #SelfCareSunday #DetoxRetreat",
      image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&auto=format&fit=crop&q=80",
      platforms: ["instagram", "facebook"],
      status: "in_review",
      campaignId: "camp-4",
      scheduledDate: "2026-09-17",
      scheduledTime: "11:00",
      author: "Marcus Vance",
      authorId: "usr-creator",
      approver: "Elena Rostova",
      approvalNotes: "Awaiting Elena's final confirmation on promo discount voucher code.",
      analytics: { likes: 0, shares: 0, comments: 0, reach: 0, engagementRate: "0%" },
      createdAt: "2026-09-11T16:10:00Z"
    },
    {
      id: "post-107",
      title: "Master Bartender's Secret: Smoked Rosemary Old Fashioned",
      caption: "Crafting magic in every glass. Watch head mixologist Julian smoke white oak chips to infuse our aged bourbon. Which cocktail should we feature next? 🍸🥃 #CraftCocktails #Mixology #BarLife #HotelBar #LuxuryDrinks",
      image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&auto=format&fit=crop&q=80",
      platforms: ["instagram", "tiktok"],
      status: "in_review",
      campaignId: "camp-3",
      scheduledDate: "2026-09-18",
      scheduledTime: "20:15",
      author: "Marcus Vance",
      authorId: "usr-creator",
      approver: "Elena Rostova",
      approvalNotes: "Pending legal check on alcohol marketing compliance disclaimer.",
      analytics: { likes: 0, shares: 0, comments: 0, reach: 0, engagementRate: "0%" },
      createdAt: "2026-09-11T17:00:00Z"
    },
    {
      id: "post-108",
      title: "Corporate Executive Retreat & Conference Packages 2026",
      caption: "Elevate your next board summit. Grand Azure offers state-of-the-art panoramic conference halls, high-speed fiber connectivity, and bespoke executive catering. Inquire with our corporate events team today. 💼📊 #CorporateEvents #BusinessTravel #MICE #ConferenceVenue",
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=80",
      platforms: ["linkedin", "x"],
      status: "draft",
      campaignId: "",
      scheduledDate: "2026-09-22",
      scheduledTime: "08:30",
      author: "Marcus Vance",
      authorId: "usr-creator",
      approver: "",
      approvalNotes: "",
      analytics: { likes: 0, shares: 0, comments: 0, reach: 0, engagementRate: "0%" },
      createdAt: "2026-09-11T18:00:00Z"
    }
  ],
  privacyConsents: [
    {
      id: "cst-001",
      subjectName: "Sophia Bennett (Guest)",
      mediaDescription: "Infinity Pool Sunrise Yoga Photo",
      consentType: "Guest Photo Release",
      status: "Signed & Verified",
      dateSigned: "2026-09-02",
      expiryDate: "2028-09-02",
      notes: "Signed digital waiver during Spa check-in. Valid for global social channels."
    },
    {
      id: "cst-002",
      subjectName: "Chef Antoine Laurent (Staff)",
      mediaDescription: "Signature Dish Video Masterclass",
      consentType: "Employee Media Release",
      status: "Signed & Verified",
      dateSigned: "2026-01-15",
      expiryDate: "Indefinite",
      notes: "Internal staff employment media clause in place."
    },
    {
      id: "cst-003",
      subjectName: "Julian & Clara Hayes (Wedding Couple)",
      mediaDescription: "Grand Ballroom Wedding Showcase",
      consentType: "Wedding Media Agreement",
      status: "Signed & Verified",
      dateSigned: "2026-08-28",
      expiryDate: "2029-08-28",
      notes: "Signed consent permitting high-res photography publication on hotel socials."
    }
  ]
};

// Database Service
class Database {
  constructor() {
    this.init();
  }

  init() {
    if (!fs.existsSync(DB_FILE)) {
      this.write(DEFAULT_DATA);
    }
  }

  read() {
    try {
      const data = fs.readFileSync(DB_FILE, 'utf8');
      return JSON.parse(data);
    } catch (e) {
      this.write(DEFAULT_DATA);
      return DEFAULT_DATA;
    }
  }

  write(data) {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
  }

  reset() {
    this.write(DEFAULT_DATA);
    return DEFAULT_DATA;
  }
}

module.exports = new Database();
