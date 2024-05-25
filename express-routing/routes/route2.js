const express = require('express');
const router = express.Router();

router.get('/path1', (req, res) => {
    res.send('Route1, Path1, GET request received!')
});
router.get('/path2', (req, res) => {
    res.send('Route1, Path1, GET request received!')
});

module.exports = router;