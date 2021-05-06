const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const stateController = require('../controllers/stateController');
const actionController = require('../controllers/actionController');

router.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('something broke!');
});

// 토큰 검증
router.post('/', authController.verify_token);

// 채점DB에서 데이터를 가져옴
router.post('/', stateController.get_state);


router.post('/', actionController.exec_command);

router.post('/', stateController.increase_timestamp);

router.post('/', stateController.append_tickets);






module.exports = router;