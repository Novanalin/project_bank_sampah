const express = require('express');
const pengepulController = require('../controller/pengepulController');

const router = express.Router();

router.route('/pengepul').get(pengepulController.pengepulList);
router.route('/pengepul').post(pengepulController.pengepulAdd);
router.route('/pengepul').patch(pengepulController.pengepulEdit);

module.exports = router;