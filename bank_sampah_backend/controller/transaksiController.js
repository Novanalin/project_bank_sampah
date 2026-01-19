const database = require('../config/database');

const transaksiList = async (request, response) => {
    console.log("Transaksi List request at " + new Date().toLocaleString());

    try {
        const [rows] = await database.query('SELECT * FROM transaksi');
        
        if (rows.length === 0) {
            response.status(404).json({
                message: 'Transaksi is not exist'
            });
        } else {
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

const transaksiMaxID = async (request, response) => {
    console.log("Transaksi Max ID request at " + new Date().toLocaleString());

    try {
        const [result] = await database.query('SELECT MAX(transaksiID) as maxID FROM transaksi');

        if (result[0].maxID == null) {
            result[0].maxID = 999;
        }

        response.status(200).json({
            message: 'Max Transaksi ID',
            data: result[0].maxID
        });
    } catch (error) {
        response.status(500).json({
            error: 'Internal Error',
            details: error.message
        });
    }
}

const transaksiInput = async (request, response) => {
    console.log("Transaksi Input request at " + new Date().toLocaleString());

    const {adminID, customerID, pengepulID, tanggal, totalBerat, totalHarga, detail} = request.body;
    const formattedDate = tanggal.split("/").reverse().join("-");

    const tglArray = tanggal.split("/").reverse();
    const formattedPeriod = tglArray[0] + "-" + tglArray[1];

    try {
        // INSERT TRANSAKSI
        console.log("START INSERT TRANSAKSI");

        const [result] = await database.query("INSERT INTO transaksi (adminID, customerID, pengepulID, tanggal, tipeTransaksi, totalBerat, totalHarga) VALUES (?, ?, NULL, ?, 'INPUT', ?, ?)", [adminID, customerID, formattedDate, totalBerat, totalHarga]);

        if (result.affectedRows === 0) {
            response.status(404).json({
                message: 'Insert query ran, but no rows were affected'
            });
        } else {
            // INSERT TRANSAKSI DETAIL
            console.log("COMPLETE INSERT TRANSAKSI AND START INSERT TRANSAKSI DETAIL");

            let finalDetail = []
            for (let x in detail) {
                let eachDetail = [
                    transaksiID = result.insertId,
                    jenisSampahID = detail[x].jenisSampahID,
                    namaJenis = detail[x].namaJenis,
                    berat = detail[x].berat,
                    hargaPerKg = detail[x].hargaPerKg,
                    subtotal = detail[x].subtotal
                ]

                finalDetail.push(eachDetail);
            }

            const [resultDetail] = await database.query("INSERT INTO detailTransaksi (transaksiID, jenisSampahID, namaJenis, berat, hargaPerKg, subtotal) VALUES ?", [finalDetail]);

            if (resultDetail.affectedRows === 0) {
                response.status(404).json({
                    message: 'Insert query ran, but no rows were affected'
                });
            } else {
                // INSERT LAPORAN STOK
                console.log("COMPLETE INSERT TRANSAKSI DETAIL AND START INSERT LAPORAN STOK");

                const [rows] = await database.query('SELECT * FROM jenisSampah');

                let finalStok = []
                for (let x in detail) {
                    let eachDetail = [
                        jenisSampahID = detail[x].jenisSampahID,
                        periode = formattedPeriod,
                        stokAwal = Number(rows.find(item => item.jenisSampahID == detail[x].jenisSampahID).stok),
                        stokMasuk = Number(detail[x].berat),
                        stokKeluar = 0,
                        stokAkhir = Number(stokAwal + stokMasuk)
                    ]

                    finalStok.push(eachDetail);
                }

                const [resultStok] = await database.query("INSERT INTO laporanStok (jenisSampahID, periode, stokAwal, stokMasuk, stokKeluar, stokAkhir) VALUES ?", [finalStok]);

                if (resultStok.affectedRows === 0) {
                    response.status(404).json({
                        message: 'Insert query ran, but no rows were affected'
                    });
                } else {
                    // UPDATE STOK JENIS SAMPAH
                    console.log("COMPLETE INSERT LAPORAN STOK AND START UPDATE JENIS SAMPAH");

                    let finalSampah = [];
                    let finalJenisSampahID = [];
                    for (let y in finalStok) {
                        finalSampah.push(finalStok[y][0]); // jenisSampahID
                        finalSampah.push(finalStok[y][5]); // StokAkhir

                        finalJenisSampahID.push(finalStok[y][0]); // jenisSampahID
                    }

                    // query parameters: [id1, val1, id2, val2, ..., idN, valN, [ids]]
                    finalSampah.push(finalJenisSampahID);

                    // Build the dynamic CASE statement string
                    // SET stok = CASE jenisSampahID WHEN 1 THEN 10 WHEN 2 THEN 15 ... END
                    let sql = 'UPDATE jenisSampah SET stok = CASE jenisSampahID ';
                    for (let x in finalStok) {
                        sql += 'WHEN ? THEN ? ';
                    }
                    sql += 'END WHERE jenisSampahID IN (?)';

                    const [resultSampah] = await database.query(sql, finalSampah);

                    if (resultSampah.affectedRows === 0) {
                        response.status(404).json({
                            message: 'Insert query ran, but no rows were affected'
                        });
                    } else {
                        console.log("COMPLETE UPDATE JENIS SAMPAH");

                        response.status(200).json({
                            message: 'Transaksi Input was successfully added',
                            data: resultSampah
                        });
                    }
                }
            }
        }
    } catch (error) {
        response.status(500).json({
            error: 'Internal Error',
            details: error.message
        });
    }
};

const transaksiOuput = async (request, response) => {
    console.log("Transaksi Output request at " + new Date().toLocaleString());

    const {adminID, customerID, pengepulID, tanggal, totalBerat, totalHarga, detail} = request.body;
    const formattedDate = tanggal.split("/").reverse().join("-");

    const tglArray = tanggal.split("/").reverse();
    const formattedPeriod = tglArray[0] + "-" + tglArray[1];

    try {
        // INSERT TRANSAKSI
        console.log("START INSERT TRANSAKSI");

        const [result] = await database.query("INSERT INTO transaksi (adminID, customerID, pengepulID, tanggal, tipeTransaksi, totalBerat, totalHarga) VALUES (?, NULL, ?, ?, 'OUTPUT', ?, ?)", [adminID, pengepulID, formattedDate, totalBerat, totalHarga]);

        if (result.affectedRows === 0) {
            response.status(404).json({
                message: 'Insert query ran, but no rows were affected'
            });
        } else {
            // INSERT TRANSAKSI DETAIL
            console.log("COMPLETE INSERT TRANSAKSI AND START INSERT TRANSAKSI DETAIL");

            let finalDetail = []
            for (let x in detail) {
                let eachDetail = [
                    transaksiID = result.insertId,
                    jenisSampahID = detail[x].jenisSampahID,
                    namaJenis = detail[x].namaJenis,
                    berat = detail[x].berat,
                    hargaPerKg = detail[x].hargaPerKg,
                    subtotal = detail[x].subtotal
                ]

                finalDetail.push(eachDetail);
            }

            const [resultDetail] = await database.query("INSERT INTO detailTransaksi (transaksiID, jenisSampahID, namaJenis, berat, hargaPerKg, subtotal) VALUES ?", [finalDetail]);

            if (resultDetail.affectedRows === 0) {
                response.status(404).json({
                    message: 'Insert query ran, but no rows were affected'
                });
            } else {
                // INSERT LAPORAN STOK
                console.log("COMPLETE INSERT TRANSAKSI DETAIL AND START INSERT LAPORAN STOK");

                const [rows] = await database.query('SELECT * FROM jenisSampah');

                let finalStok = []
                for (let x in detail) {
                    let eachDetail = [
                        jenisSampahID = detail[x].jenisSampahID,
                        periode = formattedPeriod,
                        stokAwal = Number(rows.find(item => item.jenisSampahID == detail[x].jenisSampahID).stok),
                        stokMasuk = 0,
                        stokKeluar = Number(detail[x].berat),
                        stokAkhir = Number(stokAwal - stokKeluar)
                    ]

                    finalStok.push(eachDetail);
                }

                const [resultStok] = await database.query("INSERT INTO laporanStok (jenisSampahID, periode, stokAwal, stokMasuk, stokKeluar, stokAkhir) VALUES ?", [finalStok]);

                if (resultStok.affectedRows === 0) {
                    response.status(404).json({
                        message: 'Insert query ran, but no rows were affected'
                    });
                } else {
                    // UPDATE STOK JENIS SAMPAH
                    console.log("COMPLETE INSERT LAPORAN STOK AND START UPDATE JENIS SAMPAH");

                    let finalSampah = [];
                    let finalJenisSampahID = [];
                    for (let y in finalStok) {
                        finalSampah.push(finalStok[y][0]); // jenisSampahID
                        finalSampah.push(finalStok[y][5]); // StokAkhir

                        finalJenisSampahID.push(finalStok[y][0]); // jenisSampahID
                    }

                    // query parameters: [id1, val1, id2, val2, ..., idN, valN, [ids]]
                    finalSampah.push(finalJenisSampahID);

                    // Build the dynamic CASE statement string
                    // SET stok = CASE jenisSampahID WHEN 1 THEN 10 WHEN 2 THEN 15 ... END
                    let sql = 'UPDATE jenisSampah SET stok = CASE jenisSampahID ';
                    for (let x in finalStok) {
                        sql += 'WHEN ? THEN ? ';
                    }
                    sql += 'END WHERE jenisSampahID IN (?)';

                    const [resultSampah] = await database.query(sql, finalSampah);

                    if (resultSampah.affectedRows === 0) {
                        response.status(404).json({
                            message: 'Insert query ran, but no rows were affected'
                        });
                    } else {
                        console.log("COMPLETE UPDATE JENIS SAMPAH");

                        response.status(200).json({
                            message: 'Transaksi Output was successfully added',
                            data: resultSampah
                        });
                    }
                }
            }
        }
    } catch (error) {
        response.status(500).json({
            error: 'Internal Error',
            details: error.message
        });
    }
};

module.exports = {
    transaksiList,
    transaksiMaxID,
    transaksiInput,
    transaksiOuput
};