const menuModel = require('../models/menuModel');

exports.getMenuByRestaurantId = async (req, res) => {
  try {
    const { id } = req.params;
    const menu = await menuModel.getMenuByRestaurantId(id);
    res.json(menu);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch menu' });
  }
};
