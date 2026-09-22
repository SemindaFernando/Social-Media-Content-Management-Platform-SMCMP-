/**
 * Grand Azure Luxury Hotel & Spa - Analytics Controller
 */

const db = require('../db/database');

// GET /api/analytics/summary
exports.getSummary = (req, res) => {
  const data = db.read();
  const posts = data.posts || [];
  
  const published = posts.filter(p => p.status === 'published');
  const scheduled = posts.filter(p => p.status === 'scheduled');
  const inReview = posts.filter(p => p.status === 'in_review');
  const drafts = posts.filter(p => p.status === 'draft');

  let totalLikes = 0;
  let totalShares = 0;
  let totalComments = 0;
  let totalReach = 0;

  const platformCounts = { instagram: 0, facebook: 0, tiktok: 0, linkedin: 0, x: 0, youtube: 0 };

  published.forEach(p => {
    if (p.analytics) {
      totalLikes += (p.analytics.likes || 0);
      totalShares += (p.analytics.shares || 0);
      totalComments += (p.analytics.comments || 0);
      totalReach += (p.analytics.reach || 0);
    }
    if (p.platforms) {
      p.platforms.forEach(plat => {
        if (platformCounts[plat] !== undefined) platformCounts[plat]++;
      });
    }
  });

  const avgEngagementRate = published.length > 0
    ? (((totalLikes + totalComments + totalShares) / (totalReach || 1)) * 100).toFixed(1) + '%'
    : '0%';

  const topPosts = [...published].sort((a, b) => ((b.analytics?.reach || 0) - (a.analytics?.reach || 0))).slice(0, 5);

  res.json({
    success: true,
    data: {
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
      topPosts
    }
  });
};
