const express = require('express');
const router = express.Router();

router.get('/hentai', (req, res) => {
    res.json({ message: 'NSFW content endpoint' });
});

module.exports = router;
