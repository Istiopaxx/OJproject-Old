
var mongodb_config = require('../config/mongodb_config.json');
var ObjectId = require('mongodb').ObjectId; 
const uri = mongodb_config.uri;
var MongoClient = require('mongodb').MongoClient(uri , { useNewUrlParser: true, useUnifiedTopology: true });


exports.create = async(token) => {
    try{
        const dbo= await MongoClient.connect();
        try{
            var gradingData={
                "timestamp": 0,
                "states": [],
                "tickets": [],
                "isEnd": false
            };
            var entire_tickets = [];
            const result = await dbo.db("gradingDB").collection("problem_id0").insertOne({_id:token , gradingData,entire_tickets});
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

exports.update = async(token,new_data) => {
    try{
        const dbo= await MongoClient.connect();
        try{
            const result = await dbo.db("gradingDB").collection("problem_id0").updateOne({_id : token},new_data);
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
            const result = await dbo.db("gradingDB").collection("problem_id0").find(ObjectId(token)).toArray();
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
            const myQuery= {"_id": token};
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