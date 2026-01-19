const express = require('express');
const sampahController = require('../controller/sampahController');

const router = express.Router();

router.route('/sampah').get(sampahController.sampahList);
router.route('/sampah').post(sampahController.sampahAdd);
router.route('/sampah').patch(sampahController.sampahEdit);

module.exports = router;