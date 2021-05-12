
const mongodb_config = require('../config/mongodb_config.json');
const elevator = require('../lib/elevator');

const ObjectId = require('mongodb').ObjectID;
const uri = mongodb_config.uri;
const MongoClient = require('mongodb').MongoClient(uri , { useNewUrlParser: true, useUnifiedTopology: true });


exports.create = async(token) => {
    try{
        const dbo= await MongoClient.connect();
        try {
            const data = elevator.init_elevator_data(0);
            const gradingData = data.gradingData;
            const entire_tickets = data.entire_tickets;
            let result = await dbo.db("gradingDB").collection("problem_id0").insertOne({ _id: token, gradingData, entire_tickets });

            // result = JSON.parse(result)['ops'][0];

            
            // console.log(JSON.parse(data)['ops'][0]['gradingData']);
            return data;
        } catch(err2){
            console.log("Query error!" + err2);
            return false;
        }  
    } catch(err){
        console.log("DB error!" + err);
        return false;
    }
};

exports.update = async(token,new_data) => {
    try{
        const dbo= await MongoClient.connect();
        try {
            const gradingData = new_data.gradingData;
            const entire_tickets = new_data.entire_tickets;
            const result = await dbo.db("gradingDB").collection("problem_id0").updateOne({ _id: token }, gradingData, entire_tickets);
            
            return result;
        } catch(err2){
            console.log("Query error!" + err2);
            return false;
        }  
    } catch(err){
        console.log("DB error!" + err);
        return false;
    }
};

exports.select = async(token) => {
    try{
        const dbo= await MongoClient.connect();
        try{
            const result = await dbo.db("gradingDB").collection("problem_id0").find(token).toArray();
            return result;
        } catch(err2){
            console.log("Query error!" + err2);
            return false;
        } 
    } catch(err){
        console.log("DB error!" + err);
        return false;
    }
};

exports.selectAll = async() => {
    try{
        const dbo= await MongoClient.connect();
        try{
            const result = await dbo.db("gradingDB").collection("problem_id0").find({}).toArray();
            return result;
        } catch(err2){
            console.log("Query error!" + err2);
            return false;
        } 
    } catch(err){
        console.log("DB error!" + err);
        return false;
    }
};

exports.delete = async(token) => {
    try{
        const dbo= await MongoClient.connect();
        try{
            const myQuery = { "_id": token};
            const result = await dbo.db("gradingDB").collection("problem_id0").deleteOne(myQuery);
            return result.deletedCount;
        } catch(err2){
            console.log("Query error!" + err2);
            return false;
        }

    } catch(err){
        console.log("DB error!" + err);
        return false;
    }
};