// const { Controller } = require('@nestjs/common');
var db = require('./database');
var ret = new Object();

async function f(){
    var ret = await(db.getFirstQuery(1));
    console.log(ret);
    console.log(ret.calls);
    console.log(ret.calls[1].start + "to" + ret.calls[1].end);
}

f();