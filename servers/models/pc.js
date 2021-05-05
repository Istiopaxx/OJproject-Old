// const { Controller } = require('@nestjs/common');
var db = require('./database');
var ret = new Object();


async function f(){
    var ret = await(db.getFirstQuery(1));
    console.log(ret);
    const token = "HelloWorldToken";
    var ret2 = await(db.createDBtable(token));
    console.log(ret2);
    var ret3 = await(db.deleteDBtable(token));
    console.log(ret3);
}

f();
