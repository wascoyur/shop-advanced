const express = require('express');

const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require('../middlewares/auth');

// controller
const {
  create,
  listAll,
  remove,
  read,
  update,
  list,
  productsCount,
  productStar,
  listRelated,searchFilters
} = require('../controllers/product');

router.post('/product', authCheck, adminCheck, create);

router.delete('/product/:slug', authCheck, adminCheck, remove);
router.get('/product/:slug', read);
router.put('/product/:slug', authCheck, adminCheck, update);
router.post('/products', list);
router.get('/products/total', productsCount);
router.get('/products/:count', listAll);
router.put('/product/star/:id', authCheck, productStar);
router.get('/product/related/:productId', listRelated);
router.post('/search/filterd',searchFilters)

module.exports = router;
