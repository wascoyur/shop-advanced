const express = require('express');
const router = express.Router();

router.get('/user', (req, res) => {
  res.json({
    data: `this link:${req.url}  endpoint /user`,
  });
});

module.exports = router;
