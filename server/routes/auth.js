const express = require('express');
const router = express.Router()

router.get('/crateupdateuser', (req, res) => {
  res.json({
    data: 'hit API, /crateupdateuser enpoint',
  });
});

module.exports = router; 