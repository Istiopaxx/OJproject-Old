const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');




// error catch
router.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('something broke!');
});



// logging time
router.all('/', function(req, res, next) {
    console.log('Time:', Date.now());
    next();
});


// making authToken with problem-id, user-id
router.post('/', authController.make_grading_token);



// make a row at grading DB
// Key : authToken  Value : problem_id's first state
router.post('/', function(req, res, next) {
    // not yet implemented

    next();
});


// response json - token, first state
router.post('/', function(req, res, next) {
    const authToken = req.authToken;
    // const firstState = req.firstState;
    const firstState = {};

    const ret = {
        "token": authToken,
        "state": firstState,
    }
    console.log(ret);

    res.status(200).json(ret);
});



module.exports = router;