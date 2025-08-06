const cartModel = require('../models/cartModel');

exports.addToCart = async (req, res) => {
  try {
    const { user_id, menu_id, quantity } = req.body;
    if (!user_id || !menu_id || !quantity) {
      return res.status(400).json({ message: 'Missing fields' });
    }
    const cartId = await cartModel.addToCart({ user_id, menu_id, quantity });
    res.status(200).json({ message: 'Item added to cart', cart_id: cartId });
  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.viewCart = async (req, res) => {
  try {
    const { user_id } = req.params;
    const cartItems = await cartModel.getCartByUser(user_id);
    res.status(200).json(cartItems);
  } catch (error) {
    console.error('View cart error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const { cart_id } = req.params;
    const deleted = await cartModel.removeFromCart(cart_id);
    if (deleted) {
      res.status(200).json({ message: 'Item removed from cart' });
    } else {
      res.status(404).json({ message: 'Cart item not found' });
    }
  } catch (error) {
    console.error('Remove cart item error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
