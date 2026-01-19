const express = require('express');
const cors = require('cors');

const app = express();
const adminRoutes = require('./routes/adminRoutes');
const customerRoutes = require('./routes/customerRoutes');
const pengepulRoutes = require('./routes/pengepulRoutes');
const sampahRoutes = require('./routes/sampahRoutes');
const transaksiRoutes = require('./routes/transaksiRoutes');
const laporanRoutes = require('./routes/laporanRoutes');

// Middleware untuk memparsing body permintaan JSON
app.use(express.json());

// Enables CORS for all routes with default options
app.use(cors());

// Middleware untuk routes
app.use('/', adminRoutes);
app.use('/', customerRoutes);
app.use('/', pengepulRoutes);
app.use('/', sampahRoutes);
app.use('/', transaksiRoutes);
app.use('/', laporanRoutes);

// Route default
app.get('/', (req, res) => {
    res.send('REST API works!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
});