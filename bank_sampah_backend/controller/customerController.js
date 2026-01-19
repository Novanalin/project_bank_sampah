const database = require('../config/database');

const customerList = async (request, response) => {
    console.log("Customer List request at " + new Date().toLocaleString());

    try {
        const [rows] = await database.query('SELECT * FROM customer');
        
        if (rows.length === 0) {
            response.status(404).json({
                message: 'Customer is not exist'
            });
        } else {
            response.status(200).json({
                message: 'List Customer',
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

const customerAdd = async (request, response) => {
    console.log("Customer Add request at " + new Date().toLocaleString());

    const {nama, kategori, kelas} = request.body;

    try {
        const [rows] = await database.query('SELECT * FROM customer WHERE nama = ? AND kategori = ? AND kelas = ?', [nama, kategori, kelas]);
        console.log(rows);
        
        if (rows.length === 0) {
            // IF CUSTOMER NOT EXIST, THEN INSERT A NEW DATA
            const [result] = await database.query("INSERT INTO customer (nama, kategori, kelas, status) VALUES (?, ?, ?, 'Aktif')", [nama, kategori, kelas]);

            if (result.affectedRows === 0) {
                response.status(404).json({
                    message: 'Insert query ran, but no rows were affected'
                });
            } else {
                response.status(200).json({
                    message: 'Customer was successfully added',
                    data: result
                });
            }
        } else {
            // IF CUSTOMER EXIST, THEN CANCEL INSERT DATA
            response.status(404).json({
                message: 'Customer with the same information already exist'
            });
        }
    } catch (error) {
        response.status(500).json({
            error: 'Internal Error',
            details: error.message
        });
    }
};

const customerEdit = async (request, response) => {
    console.log("Customer Edit request at " + new Date().toLocaleString());

    const {customerID, nama, kategori, kelas, status} = request.body;

    try {
        const [rows] = await database.query('SELECT * FROM customer WHERE customerID = ?', [customerID]);
        
        if (rows.length === 0) {
            // IF CUSTOMER NOT EXIST, THEN CANCEL UPDATE DATA
            response.status(404).json({
                message: 'Customer is not exist'
            });
        } else {
            // IF CUSTOMER EXIST, THEN UPDATE DATA
            const [result] = await database.query('UPDATE customer SET nama = ?, kategori = ?, kelas = ?, status = ? WHERE customerID = ?', [nama, kategori, kelas, status, customerID]);

            if (result.affectedRows === 0) {
                response.status(404).json({
                    message: 'Update query ran, but no rows were affected'
                });
            } else {
                response.status(200).json({
                    message: 'Customer was successfully updated',
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
    customerList,
    customerAdd,
    customerEdit
};