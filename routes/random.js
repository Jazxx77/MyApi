const express = require('express');
const router = express.Router();

router.get('/joke', (req, res) => {
    res.json({ message: 'Random joke endpoint' });
});

module.exports = router;
