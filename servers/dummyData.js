const fs = require('fs');
const parse = require('csv-parse/lib/sync');
const { time } = require('console');


let tickets = fs.readFileSync('p0.txt', 'utf8');

const outputRaw = parse(tickets);

let output = [];

for(let i = 0; i < outputRaw.length; i++) {
    output.push([]);
    for(let j = 0; j < outputRaw[i].length; j++) {
        let int = parseInt(outputRaw[i][j]);
        output[i].push(int);
    }
}

console.log(output);

const firstdata = {
    "gradingData" : {
        "timestamp": 0,
        "states": [
            {
                "id": 0,
                "floor": 1,
                "passengers": [],
                "status": "STOPPED"
            },
        ],
        "tickets": [],
        "isEnd": false,
    },
    "entire_tickets": []
};

for(let i = 0; i < output.length; i++) {
    const id = output[i][1];
    const timestamp = output[i][0];
    const start = output[i][2];
    const end = output[i][3];

    const temp = {
        "id": id,
        "timestamp": timestamp,
        "start": start,
        "end": end
    };
    firstdata.entire_tickets.push(temp);
}

console.log(firstdata.entire_tickets);




let dataList = {};

exports.create_data = function(token) {
    dataList[token] = firstdata;
    return firstdata;
};

exports.select_data = function(token) {
    return dataList[token];
};

exports.update_data = function(token, data) {
    dataList[token] = data;
};

exports.delete_data = function(token) {
    delete dataList[token];
};






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







