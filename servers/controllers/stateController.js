

//const Problem = require('../models/problem');
//const Grading = require('../models/grading');



// dummy data
const data = {
    "gradingData" : {
        "timestamp": 0,
        "states": [
            {
                "id": 0,
                "floor": 6,
                "passengers": [
                    {
                        "id": 0,
                        "timestamp": 0,
                        "start": 6,
                        "end": 1
                    }
                ],
                "status": "OPENED"
            },
        ],
        "tickets": [],
        "isEnd": false,
    },
    "entire_tickets": [
        {
            "id": 0,
            "timestamp": 0,
            "start": 6,
            "end": 1,
        },
    ]
};


// req에 첨부된 data에서 state를 가져와서 token과 함께 respond
exports.respond_state = function(req, res) {
    const gradingData = req.data.gradingData;
    const token = req.authToken;
    const ret = {
        "token": token,
        "gradingData": gradingData,
    }
    res.status(200).json(ret);
}


// start api 호출 시 발급된 토큰으로 채점DB에 초기 state와 티켓배열을 넣음
// 성공하면 req.state 에 초기 state를 첨부
exports.create_first_state = function(req, res, next) {
    /* problem db에서 가져오는 경우   
    const scenario = Problem
        .find_by_problemId(req.body.problemId)
        .find_senario();
    */

    /* 랜덤 생성
    const scenario = new Promise((resolve, reject) => {
        generate_data(problemId, (ret, err) => {
            if(err) reject(err);
            resolve(ret);
        })
    });
    */

    /* 생성한 시나리오(json)를 채점DB에 gradingKey를 key, 시나리오를 value로 하여 저장
    // 시나리오는 firstState json객체와 사용자가 처리해야 할 ticket의 배열로 이루어진 json객체
    scenario.then((sc) => {
        Grading.hset(req.gradingKey, sc, (err, reply) => {
            if(err) return new Error('cannot store data');
            req.state = sc.state;
            next();
        })
    })
    .catch((e) => {
        console.log("Error: " + e);
        res.status(500).send('DB set failed');
    });
    */

    
    //temporary implementation
    req.data = data;
    next();
}


// 채점DB에서 token에 해당하는 데이터를 가져와 req에 첨부
exports.get_state = function(req, res, next) {
    /*
    Grading.hget(req.gradingKey, (err, reply) => {
        if(err) res.status(500).send('no data in Grading DB');
        req.data = reply;
        next();
    });
    */

    // temporary implementation
    req.data = data;
    next();
}



exports.increase_timestamp = function(req, res, next) {
    let data = req.data;
    let gradingData = data.gradingData;
    let nowTimestamp = gradingData.timestamp;

    req.data.gradingData.timestamp = nowTimestamp + 1;
    next();
}


exports.append_tickets = function(req, res, next) {
    let data = req.data;
    const entire_tickets = data.entire_tickets;
    let gradingData = data.gradingData;
    let tickets = gradingData.tickets;
    let nowTimestamp = gradingData.timestamp;

    let temp = [];
    for(let i = 0; i < entire_tickets.length; i++) {
        const ticket = entire_tickets[i];
        if(ticket.timestamp == nowTimestamp) {
            tickets.push(ticket);
        }
        else {
            temp.push(ticket);
        }
    }

    req.data.gradingData.tickets = tickets;
    req.data.entire_tickets = temp;
    next();
    
}







