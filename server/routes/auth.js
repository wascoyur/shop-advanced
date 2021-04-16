const express = require('express');
const router = express.Router()

router.get('/crateupdate', (req, res) => {
  res.json({
    data: 'hit API, /crateupdate enpoint',
  });
});

module.exports = router; 