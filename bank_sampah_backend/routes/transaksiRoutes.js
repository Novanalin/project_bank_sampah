const express = require('express');
const transaksiController = require('../controller/transaksiController');

const router = express.Router();

router.route('/transaksi').get(transaksiController.transaksiList);
router.route('/transaksi/maxid').get(transaksiController.transaksiMaxID);
router.route('/transaksi/input').post(transaksiController.transaksiInput);
router.route('/transaksi/output').post(transaksiController.transaksiOuput);

module.exports = router;