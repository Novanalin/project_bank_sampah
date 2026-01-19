const database = require('../config/database');

const pengepulList = async (request, response) => {
    console.log("Pengepul List request at " + new Date().toLocaleString());

    try {
        const [rows] = await database.query('SELECT * FROM pengepul');
        
        if (rows.length === 0) {
            response.status(404).json({
                message: 'Pengepul is not exist'
            });
        } else {
            response.status(200).json({
                message: 'List Pengepul',
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

const pengepulAdd = async (request, response) => {
    console.log("Pengepul Add request at " + new Date().toLocaleString());

    const {nama, telepon} = request.body;

    try {
        const [rows] = await database.query('SELECT * FROM pengepul WHERE nama = ? AND telepon = ?', [nama, telepon]);
        console.log(rows);
        
        if (rows.length === 0) {
            // IF CUSTOMER NOT EXIST, THEN INSERT A NEW DATA
            const [result] = await database.query("INSERT INTO pengepul (nama, telepon, status) VALUES (?, ?, 'Aktif')", [nama, telepon]);

            if (result.affectedRows === 0) {
                response.status(404).json({
                    message: 'Insert query ran, but no rows were affected'
                });
            } else {
                response.status(200).json({
                    message: 'Pengepul was successfully added',
                    data: result
                });
            }
        } else {
            // IF CUSTOMER EXIST, THEN CANCEL INSERT DATA
            response.status(404).json({
                message: 'Pengepul with the same information already exist'
            });
        }
    } catch (error) {
        response.status(500).json({
            error: 'Internal Error',
            details: error.message
        });
    }
};

const pengepulEdit = async (request, response) => {
    console.log("Pengepul Edit request at " + new Date().toLocaleString());

    const {pengepulID, nama, telepon, status} = request.body;

    try {
        const [rows] = await database.query('SELECT * FROM pengepul WHERE pengepulID = ?', [pengepulID]);
        
        if (rows.length === 0) {
            // IF CUSTOMER NOT EXIST, THEN CANCEL UPDATE DATA
            response.status(404).json({
                message: 'Pengepul is not exist'
            });
        } else {
            // IF CUSTOMER EXIST, THEN UPDATE DATA
            const [result] = await database.query('UPDATE pengepul SET nama = ?, telepon = ?, status = ? WHERE pengepulID = ?', [nama, telepon, status, pengepulID]);

            if (result.affectedRows === 0) {
                response.status(404).json({
                    message: 'Update query ran, but no rows were affected'
                });
            } else {
                response.status(200).json({
                    message: 'Pengepul was successfully updated',
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
    pengepulList,
    pengepulAdd,
    pengepulEdit
};