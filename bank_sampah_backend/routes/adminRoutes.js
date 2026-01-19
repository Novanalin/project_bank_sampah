const express = require('express');
const adminController = require('../controller/adminController');

const router = express.Router();

router.route('/login').post(adminController.login);

// router.route('/admin/:id')
//     .get(productController.getProductById)
//     .put(productController.updateProduct)
//     .delete(productController.deleteProduct);

// // GET /api/products : Mendapatkan semua produk
// router.get('/products', productController.getProducts);

// // GET /api/products/:id : Mendapatkan satu produk berdasarkan ID
// router.get('/products/:id', productController.getProductById);

// // POST /api/products : Menambahkan produk baru
// router.post('/products', productController.createProduct);

// // PUT /api/products/:id : Memperbarui produk berdasarkan ID
// router.put('/products/:id', productController.updateProduct);

// // DELETE /api/products/:id : Menghapus produk berdasarkan ID
// router.delete('/products/:id', productController.deleteProduct);

module.exports = router;