/**
 * Grand Azure Luxury Hotel & Spa - Bonus AI Caption & Hashtag Generator
 * Simulates intelligent generative AI tailored for 5-star hotel marketing.
 */

const AIGenerator = {
  templates: {
    pool: {
      sophisticated: "Where emerald hills embrace crystal azure waters. Discover uninterrupted tranquility by our heated infinity edge, accompanied by hand-crafted vintage Bellinis. 🥂🌊 #GrandAzureResort #LuxuryInfinityPool #MediterraneanLuxury #StaycationReimagined",
      relaxed: "Soak in the warmth, leave the world behind. ☀️ Nothing beats afternoon poolside dips followed by fresh coconut sorbet at Grand Azure. Tag someone who needs this vacation right now! 🏊‍♀️🌴 #PoolsideVibes #ResortLife #TropicalLuxury #VacationMode",
      festive: "Golden hour glow hits differently on our Sunset Deck! 🌅 Join us this weekend for chilled ambient beats, artisan aperitivos, and endless ocean panoramas. #SunsetSessions #AzureLife #WeekendVibes #LuxuryEscape"
    },
    dining: {
      sophisticated: "A symphony of flavors curated by Michelin-awarded Chef Antoine. Freshly caught Brittany turbot paired with crisp saffron velouté and 2018 Meursault Premier Cru. 🍷✨ Reserve your culinary journey via link in bio. #FineDining #MichelinExperience #GrandAzureEats #Gastronomy",
      relaxed: "Crispy wood-fired sourdough, fresh Mediterranean burrata, and garden-picked basil. Lunch with a view has never tasted so divine! 🥗🍕 #FoodieGram #BeachfrontDining #HotelEats #LunchGoals",
      festive: "Get ready for our Grand Seafood & Champagne Gala this Saturday! 🦞🍾 Fresh oysters on ice, live flame grilling, and vibrant live acoustic jazz. Reserve tables early. #SeafoodFestival #LiveJazzDining #GourmetNight #GrandAzureEvents"
    },
    spa: {
      sophisticated: "Reclaim your inner equilibrium. Our 90-minute Himalayan warm stone ritual releases deep tension, enveloped in soothing organic lavender and bergamot essences. 🌿💆‍♀️ #SpaWellness #ThermalRetreat #GrandAzureSpa #HolisticHealing",
      relaxed: "Your official reminder to pause and breathe. 🧖‍♂️ Step into our eucalyptus crystal steam cave and let the week melt away. #SelfCareSunday #SpaDay #RelaxationGoals #WellnessHotel",
      festive: "Autumn Rejuvenation Flash: Book any signature couples massage this week and receive complimentary herbal vitality pool access + champagne! 🥂💆‍♂️ #SpaPromo #CouplesRetreat #WellnessDeals"
    },
    suite: {
      sophisticated: "Elevated living above the clouds. Our 240sqm Presidential Penthouse features bespoke Italian marble finishes, a private rooftop plunge jacuzzi, and dedicated 24-hour butler hospitality. 🏨✨ #PresidentialSuite #PenthouseLuxury #SuiteLife #GrandAzureSuites",
      relaxed: "Wake up to sweeping 180-degree ocean views and breakfast in bed. 🥐☕ Which room would you choose: Ocean Terrace or Poolside Villa? #RoomWithAView #LuxuryStay #HotelTour #Staycation",
      festive: "Take a virtual step inside the most luxurious suite on the coast! Watch till the end to see the hidden sunset jacuzzi. 🛁✨ #TikTokTravel #SuiteTour #HotelLife #LuxuryVacation"
    },
    wedding: {
      sophisticated: "Where timeless romance meets unparalleled elegance. From breathtaking floral arches on our private lawn to crystal ballroom galas, let us craft your dream celebration. 💍🌸 #GrandAzureWeddings #LuxuryWedding #DestinationWedding #BridalDream",
      relaxed: "Say 'I Do' with soft sand between your toes and the ocean breeze as your backdrop. 🌊🕊️ Inquire today with our dedicated wedding concierge. #BeachWedding #RomanticGetaway #WeddingInspo",
      festive: "Love was in the air this weekend! Heartfelt congratulations to Clara & Julian on their magical Grand Azure reception. ✨🎉 #WeddingCelebration #RealWeddings #LuxuryResortWedding"
    },
    eco: {
      sophisticated: "Pioneering sustainable hospitality. We are immensely proud to eliminate 100% of single-use plastics and source 80% of our dining produce from local certified organic farms. 🌿💚 #SustainableLuxury #GreenHotel #EcoTourism #ConsciousTravel",
      relaxed: "Green views, clean conscience. Enjoy luxury that cares for the ocean and planet. 🌍🌱 #EcoFriendly #ZeroWaste #GreenLiving #ResortSustainability",
      festive: "Earth Week at Grand Azure: Join our complimentary rooftop organic honey harvesting tour and organic wine tasting! 🐝🍷 #EcoFarm #GreenStay #SustainabilityInAction"
    }
  },

  generateCaption(topic = "pool", tone = "sophisticated", platform = "instagram") {
    let baseText = "";
    if (this.templates[topic] && this.templates[topic][tone]) {
      baseText = this.templates[topic][tone];
    } else {
      baseText = this.templates.pool.sophisticated;
    }

    if (platform === "x") {
      // Shorten for X/Twitter
      baseText = baseText.slice(0, 220) + " ✨ Link in bio. #GrandAzure";
    } else if (platform === "linkedin") {
      baseText = "Grand Azure Resort & Spa | Hospitality Insights\n\n" + baseText.replace(/#\w+/g, '') + "\n\nWe remain committed to delivering five-star excellence across all guest touchpoints. #HospitalityIndustry #LuxuryResorts #TravelTrends";
    } else if (platform === "tiktok") {
      baseText = "✨ POV: You checked into the most aesthetic luxury hotel on the coast 🏨🌊 " + baseText;
    }

    return baseText;
  },

  suggestHashtags(topic = "pool") {
    const hashtagMap = {
      pool: ["#GrandAzureResort", "#LuxuryHotel", "#InfinityPool", "#SunsetLovers", "#StaycationGoals", "#ResortLife"],
      dining: ["#GrandAzureEats", "#FineDining", "#MichelinGuide", "#GourmetFood", "#SeafoodLovers", "#WineAndDine"],
      spa: ["#GrandAzureSpa", "#SpaWellness", "#SelfCare", "#ThermalPool", "#HolisticDetox", "#LuxurySpa"],
      suite: ["#GrandAzureSuites", "#PenthouseSuite", "#LuxuryTravel", "#RoomTour", "#HotelGoals", "#BespokeStay"],
      wedding: ["#GrandAzureWeddings", "#DestinationWedding", "#LuxuryEvents", "#BrideToBe", "#WeddingVenue"],
      eco: ["#SustainableLuxury", "#GreenHotel", "#EcoTourism", "#PlasticFree", "#FarmToTable"]
    };

    return hashtagMap[topic] || hashtagMap.pool;
  }
};
