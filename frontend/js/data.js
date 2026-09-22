/**
 * Grand Azure Luxury Hotel & Spa - SMCMP Seed Data
 * Contains 18+ rich hotel social media posts for full CRUD demonstration,
 * campaigns, user roles, strategy guides, and privacy consent records.
 */

const INITIAL_HOTEL_DATA = {
  // Current user accounts
  users: [
    {
      id: "usr-admin",
      name: "Victoria Sterling",
      role: "Administrator",
      email: "v.sterling@grandazurehotel.com",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
      badgeClass: "admin"
    },
    {
      id: "usr-creator",
      name: "Marcus Vance",
      role: "Content Creator",
      email: "m.vance@grandazurehotel.com",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      badgeClass: "creator"
    },
    {
      id: "usr-approver",
      name: "Elena Rostova",
      role: "Content Approver",
      email: "e.rostova@grandazurehotel.com",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
      badgeClass: "approver"
    }
  ],

  // Hotel Campaigns
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

  // 18+ Rich Hotel Social Media Posts
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
      approver: "Elena Rostova",
      approvalNotes: "Approved - Great high-res shot of the sunset terrace.",
      analytics: {
        likes: 1845,
        shares: 240,
        comments: 92,
        reach: 16400,
        engagementRate: "8.4%"
      },
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
      approver: "Elena Rostova",
      approvalNotes: "Approved without modifications.",
      analytics: {
        likes: 2410,
        shares: 380,
        comments: 145,
        reach: 22800,
        engagementRate: "9.2%"
      },
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
      approver: "Victoria Sterling",
      approvalNotes: "Approved by Admin - Excellent CSR messaging.",
      analytics: {
        likes: 980,
        shares: 410,
        comments: 67,
        reach: 14200,
        engagementRate: "7.1%"
      },
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
      approver: "",
      approvalNotes: "",
      analytics: { likes: 0, shares: 0, comments: 0, reach: 0, engagementRate: "0%" },
      createdAt: "2026-09-11T18:00:00Z"
    },
    {
      id: "post-109",
      title: "Floating Breakfast Experience in Private Villa Pool",
      caption: "Waking up like this. Fresh tropical fruits, warm French pastries, freshly brewed espresso, and chilled Champagne served on floating teak trays directly in your private plunge pool. 🍓🥐🥂 #FloatingBreakfast #LuxuryResort #VillaLife #BreakfastGoals",
      image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&auto=format&fit=crop&q=80",
      platforms: ["instagram", "tiktok", "facebook"],
      status: "draft",
      campaignId: "camp-1",
      scheduledDate: "2026-09-24",
      scheduledTime: "08:00",
      author: "Marcus Vance",
      approver: "",
      approvalNotes: "",
      analytics: { likes: 0, shares: 0, comments: 0, reach: 0, engagementRate: "0%" },
      createdAt: "2026-09-11T19:30:00Z"
    },
    {
      id: "post-110",
      title: "Grand Ballroom Fairy Tale Wedding Showcase",
      caption: "Where forever begins. Our bespoke crystal ballroom staged for an intimate 150-guest celebration. Schedule your private walkthrough with our lead wedding planner. 💍🌸 #LuxuryWeddings #DestinationWedding #HotelWedding #BridalInspiration",
      image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&auto=format&fit=crop&q=80",
      platforms: ["instagram", "facebook", "youtube"],
      status: "published",
      campaignId: "",
      scheduledDate: "2026-09-02",
      scheduledTime: "15:00",
      author: "Marcus Vance",
      approver: "Elena Rostova",
      approvalNotes: "Approved. Photo consent signed by couple.",
      analytics: {
        likes: 3120,
        shares: 520,
        comments: 180,
        reach: 28900,
        engagementRate: "11.2%"
      },
      createdAt: "2026-09-01T12:00:00Z"
    },
    {
      id: "post-111",
      title: "Guest Spotlight: Sunrise Beachside Yoga & Meditation",
      caption: "Breathe in calmness, breathe out stress. Start your morning with complimentary guided mindfulness sessions with Master Yogi Priya on our secluded private beach. 🧘‍♀️🌅 #MorningYoga #WellnessHotel #Mindfulness #BeachYoga",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&auto=format&fit=crop&q=80",
      platforms: ["instagram", "facebook"],
      status: "published",
      campaignId: "camp-4",
      scheduledDate: "2026-09-03",
      scheduledTime: "07:00",
      author: "Marcus Vance",
      approver: "Elena Rostova",
      approvalNotes: "Approved. All featured participants signed waiver form.",
      analytics: {
        likes: 1420,
        shares: 190,
        comments: 74,
        reach: 12500,
        engagementRate: "7.8%"
      },
      createdAt: "2026-09-02T10:00:00Z"
    },
    {
      id: "post-112",
      title: "Behind the Scenes: Housekeeping 5-Star Sanitization Ritual",
      caption: "The secret to 5-star perfection lies in the unseen details. Meet Maria, our Executive Housekeeper, ensuring every Egyptian cotton sheet and marble fixture is immaculate. 🛏️✨ #BehindTheScenes #HospitalityHeroes #5StarService #HotelLife",
      image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&auto=format&fit=crop&q=80",
      platforms: ["linkedin", "tiktok", "facebook"],
      status: "published",
      campaignId: "",
      scheduledDate: "2026-09-06",
      scheduledTime: "11:30",
      author: "Marcus Vance",
      approver: "Victoria Sterling",
      approvalNotes: "Approved. Staff photo consent on file.",
      analytics: {
        likes: 1890,
        shares: 310,
        comments: 112,
        reach: 17800,
        engagementRate: "8.1%"
      },
      createdAt: "2026-09-05T09:00:00Z"
    },
    {
      id: "post-113",
      title: "Chef's Table Autumn Truffle Degustation Menu",
      caption: "An exclusive 7-course culinary voyage celebrating Alba white truffles, aged Wagyu, and paired Grand Cru selections. Limited to 12 guests per evening. 🍽️🍄 #TruffleSeason #ChefsTable #Gastronomy #FoodieGram",
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80",
      platforms: ["instagram", "facebook"],
      status: "scheduled",
      campaignId: "camp-3",
      scheduledDate: "2026-09-19",
      scheduledTime: "19:30",
      author: "Marcus Vance",
      approver: "Elena Rostova",
      approvalNotes: "Approved. Link directs to OpenTable VIP booking widget.",
      analytics: { likes: 0, shares: 0, comments: 0, reach: 0, engagementRate: "0%" },
      createdAt: "2026-09-10T14:10:00Z"
    },
    {
      id: "post-114",
      title: "Eco-Farm Organic Harvesting Tour for Hotel Families",
      caption: "Show the little ones where real food comes from! Join our resident horticulturist every Saturday morning to harvest organic heirloom tomatoes, fresh mint, and honey from our rooftop apiary. 🐝🍅 #FamilyTravel #EcoResort #Agrotourism #KidsActivities",
      image: "https://images.unsplash.com/photo-1592417817098-8f3d6eb22513?w=800&auto=format&fit=crop&q=80",
      platforms: ["facebook", "instagram"],
      status: "scheduled",
      campaignId: "camp-2",
      scheduledDate: "2026-09-20",
      scheduledTime: "10:00",
      author: "Marcus Vance",
      approver: "Elena Rostova",
      approvalNotes: "Approved.",
      analytics: { likes: 0, shares: 0, comments: 0, reach: 0, engagementRate: "0%" },
      createdAt: "2026-09-11T11:00:00Z"
    },
    {
      id: "post-115",
      title: "Weekend Flash Offer: Complimentary Sunset Catamaran Cruise",
      caption: "Book 3 nights in any Deluxe Suite this October and enjoy an unforgettable private sunset sailing excursion along the azure coast. Use code AZURECRUISE at checkout. ⛵🌅 #FlashSale #HotelDeals #LuxuryTravel #CatamaranCruise",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80",
      platforms: ["x", "facebook", "instagram"],
      status: "in_review",
      campaignId: "camp-1",
      scheduledDate: "2026-09-21",
      scheduledTime: "14:00",
      author: "Marcus Vance",
      approver: "Elena Rostova",
      approvalNotes: "Under review: verify maximum booking dates limit with revenue manager.",
      analytics: { likes: 0, shares: 0, comments: 0, reach: 0, engagementRate: "0%" },
      createdAt: "2026-09-11T15:20:00Z"
    },
    {
      id: "post-116",
      title: "Hydrotherapy Vitality Pool & Thermal Suite Sneak Peek",
      caption: "Immerse yourself in mineral-rich water jets, steam caves, and eucalyptus crystal showers. Rejuvenation designed for the senses. 💧✨ #ThermalSpa #Hydrotherapy #WellnessEscape #GrandAzureSpa",
      image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&auto=format&fit=crop&q=80",
      platforms: ["instagram", "tiktok"],
      status: "draft",
      campaignId: "camp-4",
      scheduledDate: "2026-09-26",
      scheduledTime: "16:45",
      author: "Marcus Vance",
      approver: "",
      approvalNotes: "",
      analytics: { likes: 0, shares: 0, comments: 0, reach: 0, engagementRate: "0%" },
      createdAt: "2026-09-11T19:00:00Z"
    },
    {
      id: "post-117",
      title: "Awarded 'Best Luxury Resort & Spa 2026' by Conde Nast",
      caption: "We are deeply humbled and honored to be voted 'Best Luxury Resort in the Region' by Condé Nast Traveler Readers' Choice Awards. Heartfelt thanks to our incredible guests and hardworking team! 🏆🌟 #CondeNastTraveler #AwardWinningHotel #HospitalityExcellence",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=80",
      platforms: ["linkedin", "instagram", "facebook", "x"],
      status: "published",
      campaignId: "",
      scheduledDate: "2026-09-07",
      scheduledTime: "16:00",
      author: "Marcus Vance",
      approver: "Victoria Sterling",
      approvalNotes: "Approved by Admin. Tag Conde Nast Official accounts.",
      analytics: {
        likes: 4210,
        shares: 680,
        comments: 295,
        reach: 34500,
        engagementRate: "12.8%"
      },
      createdAt: "2026-09-06T18:00:00Z"
    },
    {
      id: "post-118",
      title: "Specialty High Tea in the Palm Court Conservatory",
      caption: "Delicate cucumber finger sandwiches, warm clotted cream scones, and rare loose-leaf Darjeeling teas served amidst lush exotic botanicals. Afternoon tea served daily from 2:30 PM to 5:30 PM. 🫖🍰 #HighTea #AfternoonTea #TeaTime #GrandAzureMoments",
      image: "https://images.unsplash.com/photo-1577968897966-3d4325b36b61?w=800&auto=format&fit=crop&q=80",
      platforms: ["instagram", "facebook"],
      status: "rejected",
      campaignId: "",
      scheduledDate: "2026-09-12",
      scheduledTime: "13:00",
      author: "Marcus Vance",
      approver: "Elena Rostova",
      approvalNotes: "Rejected: Please update image with the new autumn porcelain tea set and re-submit.",
      analytics: { likes: 0, shares: 0, comments: 0, reach: 0, engagementRate: "0%" },
      createdAt: "2026-09-09T16:00:00Z"
    }
  ],

  // Sample Hotel Photography Presets for Post Creation
  photoPresets: [
    { title: "Infinity Pool & Sunset", url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop&q=80" },
    { title: "Oceanfront Luxury Suite", url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&auto=format&fit=crop&q=80" },
    { title: "Gourmet Seafood Dining", url: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=800&auto=format&fit=crop&q=80" },
    { title: "Thermal Spa & Massage", url: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&auto=format&fit=crop&q=80" },
    { title: "Grand Hotel Facade", url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=80" },
    { title: "Craft Cocktail Lounge", url: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&auto=format&fit=crop&q=80" },
    { title: "Floating Villa Breakfast", url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&auto=format&fit=crop&q=80" },
    { title: "Crystal Ballroom Wedding", url: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&auto=format&fit=crop&q=80" },
    { title: "Eco-Garden & Nature", url: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&auto=format&fit=crop&q=80" }
  ],

  // Hotel Social Media Strategy Data
  strategy: {
    bestPostingTimes: [
      { platform: "Instagram", bestDays: "Thursday - Sunday", bestTimes: "11:00 AM - 1:00 PM (Lunch browsing) & 7:00 PM - 9:00 PM (Leisure vacation planning)", tip: "Carousel posts and high-resolution sunset reels generate highest save & share rates." },
      { platform: "Facebook", bestDays: "Wednesday - Friday", bestTimes: "1:00 PM - 4:00 PM", tip: "Family packages, seasonal dining events, and user reviews perform exceptionally well." },
      { platform: "TikTok", bestDays: "Tuesday, Thursday, Saturday", bestTimes: "6:00 PM - 10:00 PM", tip: "Behind-the-scenes room tours, mixology ASMR, and aesthetic transition videos." },
      { platform: "LinkedIn", bestDays: "Tuesday - Thursday", bestTimes: "8:00 AM - 10:00 AM", tip: "Focus on corporate conference packages, CSR eco-initiatives, and industry awards." },
      { platform: "X (Twitter)", bestDays: "Monday - Friday", bestTimes: "9:00 AM & 12:00 PM", tip: "Flash sales, live event announcements, and concierge customer service inquiries." },
      { platform: "YouTube", bestDays: "Friday - Sunday", bestTimes: "2:00 PM - 5:00 PM", tip: "Long-form 4K cinematic hotel tours and seasonal chef masterclasses." }
    ],
    hashtagLibraries: [
      { category: "Luxury & Lifestyle", tags: ["#GrandAzureResort", "#LuxuryHotel", "#5StarHospitality", "#BoutiqueHotel", "#LuxuryStay", "#HotelsAndResorts"] },
      { category: "Food & Dining", tags: ["#GrandAzureEats", "#FineDining", "#MichelinGuide", "#CulinaryArt", "#HotelDining", "#SeafoodLovers", "#Mixology"] },
      { category: "Wellness & Spa", tags: ["#GrandAzureSpa", "#SpaWellness", "#HolisticHealth", "#ThermalSpa", "#SelfCareSunday", "#DetoxRetreat"] },
      { category: "Events & Weddings", tags: ["#GrandAzureWeddings", "#DestinationWedding", "#LuxuryEvents", "#CorporateRetreat", "#MICE", "#BallroomEvents"] },
      { category: "Sustainability & Eco", tags: ["#SustainableLuxury", "#GreenHotel", "#EcoTourism", "#PlasticFree", "#FarmToTable"] }
    ],
    buyerPersonas: [
      {
        name: "Luxury Vacationers (Couples & Honeymooners)",
        demographics: "Age 28-55, High disposable income",
        interests: "Private infinity pools, candlelit beach dining, spa therapies, privacy and scenic views",
        preferredPlatforms: ["Instagram", "TikTok", "YouTube"],
        contentFocus: "Aesthetic visuals, emotional storytelling, romantic package discounts"
      },
      {
        name: "Business Executives & Event Planners",
        demographics: "Age 32-60, Corporate decision makers",
        interests: "High-speed WiFi, executive boardrooms, seamless airport transfers, corporate catering",
        preferredPlatforms: ["LinkedIn", "X (Twitter)"],
        contentFocus: "MICE facilities, executive testimonials, boardroom tech specs"
      },
      {
        name: "Gastronomy & Experience Seekers (Foodies)",
        demographics: "Age 25-50, Urban professionals",
        interests: "Michelin-caliber chefs, wine pairings, artisan cocktail mixology, chef's table events",
        preferredPlatforms: ["Instagram", "TikTok", "Facebook"],
        contentFocus: "Culinary preparation reels, seasonal menu reveals, cocktail tutorials"
      }
    ]
  },

  // Privacy & Compliance Consent Records
  privacyConsentRecords: [
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
    },
    {
      id: "cst-004",
      subjectName: "Liam Sterling (@TravelWithLiam - Influencer)",
      mediaDescription: "Penthouse Suite Review Reel",
      consentType: "Influencer Collaboration Agreement",
      status: "Pending Signature",
      dateSigned: "Pending",
      expiryDate: "2027-09-01",
      notes: "Awaiting final signed contract for complimentary 2-night stay influencer UGC rights."
    }
  ]
};
