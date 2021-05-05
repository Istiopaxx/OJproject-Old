
// const { Controller } = require("@nestjs/common");
var mysql = require("mysql2/promise");
var db_config = require('../config/mysql_config.json')

console.log(db_config.host);
console.log(db_config.user);
console.log(db_config.password);
console.log(db_config.database);



const pool = mysql.createPool({
    host: db_config.host,
    user: db_config.user,
    password: db_config.password,
    database: db_config.database,
    multipleStatements: true
});

function AddQuery(rows,problem_id){
    return new Promise(function(resolve,reject){
        const allQuery = new Object();
        var idx=0;
        for(var i =0;i<rows[1].length;i++){
            if(rows[1][i].problem_id === problem_id) idx=problem_id;
        }
        allQuery.token = rows[1][idx].token;
        allQuery.timestamp = rows[1][idx].timestamp;
        allQuery.elevators = rows[0];
        allQuery.calls = rows[2];
        allQuery.is_end = rows[1][idx].is_end;
        resolve(allQuery);
    })
}

//problem_id를 받아 문제에 맞는 첫 상태를 json형태로 반환
exports.getFirstQuery = async(problem_id) => {
    try{
        const connection = await pool.getConnection(async conn => conn);
        try{
            const query = "SELECT * FROM elevatorsDB; SELECT * FROM problemDB; SELECT * FROM callsDB"
            const [rows] = await connection.query(query);
            connection.release();
            const ret = await AddQuery(rows);
            return ret;
        } catch(err2){
            console.log("Query error!" + err2);
            connection.release();
            return false;
        }
        
    } catch(err){
        console.log("DB error!" + err);
        return false;
    }
}