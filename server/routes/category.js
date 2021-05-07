const express = require('express');

const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require('../middlewares/auth');

// controller
const {
  create,
  read,
  update,
  remove,
  list,
} = require('../controllers/category');

router.post('/category/', authCheck, adminCheck, create);
router.get('/categoryies', list);
router.get('/category/:slug', authCheck, adminCheck, read);

router.put('/category/:slug', authCheck, adminCheck, update);
router.delete('/category/:slug', authCheck, adminCheck, remove);

module.exports = router;
