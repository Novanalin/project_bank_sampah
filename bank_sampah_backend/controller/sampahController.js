const database = require('../config/database');

const sampahList = async (request, response) => {
    console.log("Sampah List request at " + new Date().toLocaleString());

    try {
        const [rows] = await database.query('SELECT * FROM jenisSampah');
        
        if (rows.length === 0) {
            response.status(404).json({
                message: 'Jenis Sampah is not exist'
            });
        } else {
            for (let x in rows) {
                rows[x].hargaPerKg = Number(rows[x].hargaPerKg);
                rows[x].stok = Number(rows[x].stok);
            }

            response.status(200).json({
                message: 'List Jenis Sampah',
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

const sampahAdd = async (request, response) => {
    console.log("Sampah Add request at " + new Date().toLocaleString());

    const {namaJenis, hargaPerKg, stok} = request.body;

    try {
        const [rows] = await database.query('SELECT * FROM jenisSampah WHERE namaJenis = ?', [namaJenis]);
        
        if (rows.length === 0) {
            // IF JENIS SAMPAH NOT EXIST, THEN INSERT A NEW DATA
            const [result] = await database.query("INSERT INTO jenisSampah (namaJenis, hargaPerKg, stok, status) VALUES (?, ?, ?, 'Aktif')", [namaJenis, hargaPerKg, stok]);

            if (result.affectedRows === 0) {
                response.status(404).json({
                    message: 'Insert query ran, but no rows were affected'
                });
            } else {
                response.status(200).json({
                    message: 'Jenis Sampah was successfully added',
                    data: result
                });
            }
        } else {
            // IF JENIS SAMPAH EXIST, THEN CANCEL INSERT DATA
            response.status(404).json({
                message: 'Jenis Sampah with the same name already exist'
            });
        }
    } catch (error) {
        response.status(500).json({
            error: 'Internal Error',
            details: error.message
        });
    }
};

const sampahEdit = async (request, response) => {
    console.log("Sampah Edit request at " + new Date().toLocaleString());

    const {jenisSampahID, namaJenis, hargaPerKg, stok, status} = request.body;

    try {
        const [rows] = await database.query('SELECT * FROM jenisSampah WHERE jenisSampahID = ?', [jenisSampahID]);
        
        if (rows.length === 0) {
            // IF JENIS SAMPAH NOT EXIST, THEN CANCEL UPDATE DATA
            response.status(404).json({
                message: 'Jenis Sampah is not exist'
            });
        } else {
            // IF JENIS SAMPAH EXIST, THEN UPDATE DATA
            const [result] = await database.query('UPDATE jenisSampah SET namaJenis = ?, hargaPerKg = ?, stok = ?, status = ? WHERE jenisSampahID = ?', [namaJenis, hargaPerKg, stok, status, jenisSampahID]);

            if (result.affectedRows === 0) {
                response.status(404).json({
                    message: 'Update query ran, but no rows were affected'
                });
            } else {
                response.status(200).json({
                    message: 'Jenis Sampah was successfully updated',
                    data: result
                });
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
    sampahList,
    sampahAdd,
    sampahEdit
};