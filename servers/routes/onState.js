const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');


router.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('something broke!');
})


router.use('/', function(req, res, next) {
    console.log('Time: ', Date.now());
    next();
})

//verifying token
router.get('/', authController.verify_token);

router.get('/', function(req, res) {
    console.log(req.decoded);
    res.json(req.decoded);
});











module.exports = router;