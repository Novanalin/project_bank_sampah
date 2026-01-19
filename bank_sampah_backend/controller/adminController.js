const database = require('../config/database');

const login = async (request, response) => {
    console.log("Login request at " + new Date().toLocaleString());

    const {username, password} = request.body;

    try {
        const [rows] = await database.query('SELECT * FROM admin WHERE username = ? AND password = ?', [username, password]);

        if (rows.length === 0) {
            response.status(404).json({
                message: 'Incorrect Admin username or password'
            });
        } else {
            response.status(200).json({
                message: 'Login success',
                data: rows[0]
            });
        }
    } catch (error) {
        response.status(500).json({
            error: 'Internal Error',
            details: error.message
        });
    }
};

module.exports = {
    login
};