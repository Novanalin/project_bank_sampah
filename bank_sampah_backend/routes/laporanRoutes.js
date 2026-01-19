const express = require('express');
const laporanController = require('../controller/laporanController');

const router = express.Router();

router.route('/laporan/transaksi').post(laporanController.laporanTransaksiList);
router.route('/laporan/transaksi/latest').get(laporanController.laporanTransaksiLatest);
router.route('/laporan/stok').post(laporanController.laporanStokList);
router.route('/laporan/stok/period').get(laporanController.laporanStokDistinctPeriod);

module.exports = router;