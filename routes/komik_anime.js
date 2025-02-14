const express = require('express');
const router = express.Router();

router.get('/manga', (req, res) => {
    res.json({ message: 'Manga search endpoint' });
});

module.exports = router;
