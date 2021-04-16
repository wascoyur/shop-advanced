const express = require('express');
const router = express.Router();

router.get('/user', (req, res) => {
  res.json({
    data: `${req.url}  endpoint `,
  });
});

module.exports = router;
