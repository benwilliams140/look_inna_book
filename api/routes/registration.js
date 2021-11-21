const express = require('express');
const router = express.Router();

router.post('/login', (req, res, next) => {
    res.send(JSON.stringify({
        response: 'API is working',
        loggedIn: true
    }));
});

module.exports = router;