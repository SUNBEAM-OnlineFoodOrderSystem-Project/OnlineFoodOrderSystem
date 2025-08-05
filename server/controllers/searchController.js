const Search = require('../models/searchModel');

exports.search = (req, res) => {
  const q = req.query.q;

  if (!q) {
    return res.status(400).json({ error: 'Search query (q) is required' });
  }

  Search.searchRestaurantsOrMenus(q, (err, results) => {
    if (err) {
      console.error('Search error:', err);
      return res.status(500).json({ error: 'Server error while searching' });
    }

    res.status(200).json({ results });
  });
};
