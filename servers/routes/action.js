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

router.post('/', actionController.increase_timestamp);

router.post('/', actionController.append_tickets);

router.post('/', actionController.check_ifend);

router.post('/', (req, res, next) => {
    if(req.data.gradingData.isEnd == true) {
        stateController.delete_state(req, res, next);
    }
    else {
        stateController.update_state(req, res, next);
    }
})

// 채점이 완료되면 어떤 response를 보내야 하는지 구현








module.exports = router;