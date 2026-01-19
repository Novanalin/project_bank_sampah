const database = require('../config/database');

const laporanStokDistinctPeriod = async (request, response) => {
    console.log("Laporan Stok Distinct Period request at " + new Date().toLocaleString());

    try {
        const [rows] = await database.query('SELECT DISTINCT periode FROM laporanStok');
        
        if (rows.length === 0) {
            response.status(404).json({
                message: 'Laporan Stok Distinct Period is not exist'
            });
        } else {
            response.status(200).json({
                message: 'List Laporan Stok Distinct Period',
                data: rows
            });
        }
    } catch (error) {
        response.status(500).json({
            error: 'Internal Error',
            details: error.message
        });
    }
}

const laporanTransaksiLatest = async (request, response) => {
    console.log("Laporan Transaksi Latest request at " + new Date().toLocaleString());

    try {
        const [rows] = await database.query(`
            SELECT * FROM detailTransaksi 
            LEFT JOIN transaksi ON detailTransaksi.transaksiID = transaksi.transaksiID 
            LEFT JOIN customer ON transaksi.customerID = customer.customerID 
            WHERE MONTH(tanggal) = MONTH(CURRENT_DATE()) AND YEAR(tanggal) = YEAR(CURRENT_DATE()) 
            ORDER BY detailID DESC
        `);
        
        if (rows.length === 0) {
            response.status(404).json({
                message: 'Laporan Transaksi Latest is not exist'
            });
        } else {
            for (let x in rows) {
                let newTanggal = rows[x].tanggal.toLocaleDateString('en-GB');
                rows[x].tanggal = newTanggal;
            }

            response.status(200).json({
                message: 'List Transaksi Latest',
                data: rows
            });
        }
    } catch (error) {
        response.status(500).json({
            error: 'Internal Error',
            details: error.message
        });
    }
}

const laporanTransaksiList = async (request, response) => {
    console.log("Laporan Transaksi List request at " + new Date().toLocaleString());

    const {startDate, endDate} = request.body;

    try {
        let sql;

        if ((startDate == null || startDate == undefined) && (endDate == null || endDate == undefined)) {
            sql = 'SELECT * FROM detailTransaksi LEFT JOIN transaksi ON detailTransaksi.transaksiID = transaksi.transaksiID';
        } else if (startDate == null || startDate == undefined) {
            sql = 'SELECT * FROM detailTransaksi LEFT JOIN transaksi ON detailTransaksi.transaksiID = transaksi.transaksiID WHERE tanggal <= ?';
        } else if (endDate == null || endDate == undefined) {
            sql = 'SELECT * FROM detailTransaksi LEFT JOIN transaksi ON detailTransaksi.transaksiID = transaksi.transaksiID WHERE tanggal >= ?';
        } else {
            sql = 'SELECT * FROM detailTransaksi LEFT JOIN transaksi ON detailTransaksi.transaksiID = transaksi.transaksiID WHERE tanggal >= ? AND tanggal <= ?';
        }
        
        const [rows] = await database.query(sql, [startDate, endDate]);
        
        if (rows.length === 0) {
            response.status(404).json({
                message: 'Transaksi is not exist'
            });
        } else {
            for (let x in rows) {
                let newTanggal = rows[x].tanggal.toLocaleDateString('en-GB');
                rows[x].tanggal = newTanggal;
            }

            response.status(200).json({
                message: 'List Transaksi',
                data: rows
            });
        }
    } catch (error) {
        response.status(500).json({
            error: 'Internal Error',
            details: error.message
        });
    }
}

const laporanStokList = async (request, response) => {
    console.log("Laporan Stok List request at " + new Date().toLocaleString());

    const {periode} = request.body;

    try {
        let sql;

        if (periode == null || periode == undefined) {
            sql = 'SELECT * FROM laporanStok LEFT JOIN jenisSampah ON laporanStok.jenisSampahID = jenisSampah.jenisSampahID';
        } else {
            sql = 'SELECT * FROM laporanStok LEFT JOIN jenisSampah ON laporanStok.jenisSampahID = jenisSampah.jenisSampahID WHERE periode = ?';
        }

        // sql = `
        //     WITH RankedData AS (
        //         SELECT
        //             *, -- Or list specific columns
        //             ROW_NUMBER() OVER (
        //                 PARTITION BY laporanStok.jenisSampahID -- Groups rows by the type ID
        //                 ORDER BY laporanStok.stokID DESC -- Orders within each group, latest first
        //             ) AS rn
        //         FROM
        //             laporanStok
        //     )
        //     SELECT
        //         * -- Select the desired columns from the ranked data
        //     FROM
        //         RankedData
        //     LEFT JOIN jenisSampah ON RankedData.jenisSampahID = jenisSampah.jenisSampahID
        //     WHERE
        //         rn = 1
        // `;

        const [rows] = await database.query(sql, [periode]);
        
        if (rows.length === 0) {
            response.status(404).json({
                message: 'Laporan Stok is not exist'
            });
        } else {
            response.status(200).json({
                message: 'List Laporan Stok',
                data: rows
            });
        }
    } catch (error) {
        response.status(500).json({
            error: 'Internal Error',
            details: error.message
        });
    }
}

module.exports = {
    laporanStokDistinctPeriod,
    laporanTransaksiLatest,
    laporanTransaksiList,
    laporanStokList
};