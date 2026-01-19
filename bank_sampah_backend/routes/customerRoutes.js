const express = require('express');
const customerController = require('../controller/customerController');

const router = express.Router();

router.route('/customer').get(customerController.customerList);
router.route('/customer').post(customerController.customerAdd);
router.route('/customer').patch(customerController.customerEdit);

module.exports = router;