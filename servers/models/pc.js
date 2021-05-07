// const { Controller } = require('@nestjs/common');
//var db = require('./database');
var mongoDB = require('./mongodb');
var ret = new Object();
const token2 = "HelloWorld!";
const new_data = require('./new_data');


// async function f(){
//     var ret = await(db.getFirstQuery(1));
//     console.log(ret);
//     const token = "HelloWorldToken";
//     var ret2 = await(db.createDBtable(token));
//     console.log(ret2);
//     var ret3 = await(db.deleteDBtable(token));
//     console.log(ret3);
// }

async function f1(){
    var ret = await(mongoDB.select(token2));
    console.log(ret);
    console.log(ret.gradingData.state);
    console.log(ret.gradingData.tickets);
    console.log(ret.entire_tickets);
}

async function f2(){
    var ret3=await(mongoDB.create(token2));
    console.log(ret3.insertedCount);
}

async function f3(){
    var ret2= await(mongoDB.delete(token2));
    console.log(ret2);
}
async function f4(){
    var ret4=await(mongoDB.selectAll());
    console.log(ret4);
}

async function f5(){
    var ret5=await(mongoDB.update(token2,new_data.data));
    console.log(ret5.modifiedCount);
}

f5();
f4();