const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, orderController.placeOrder);
router.get('/my', authMiddleware, orderController.getMyOrders);
router.put('/:id/cancel', authMiddleware, orderController.cancelOrder);

// GET /api/orders/track/:order_id?user_id=123
router.get('/track/:order_id', orderController.trackOrder);
module.exports = router;
