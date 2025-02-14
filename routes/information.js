const express = require('express');
const router = express.Router();

router.get('/weather', (req, res) => {
    res.json({ message: 'Weather information endpoint' });
});

module.exports = router;
