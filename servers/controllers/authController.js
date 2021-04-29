const jwt = require('jsonwebtoken');

// const User = require('../models/user');
// const Problem = require('../models/problem');


const crypto = require('crypto');


exports.make_grading_token = function(req, res, next) {
    const { userId, problemId } = req.body;
    const secret = req.app.get('jwt-secret');

    console.log(userId, problemId);

    const check = function(id) {
        return new Promise((resolve, reject) => {
            if(!id) {
                reject('no id')
            }
            else {
                resolve(id);
            }
        });
    }

    const make_token = function(user, problem) {
        if(!user || !problem) {
            throw new Error('no data');
        }
        const p = new Promise((resolve, reject) => {
            jwt.sign(
                {
                    "user": user,
                    "problem": problem,
                },
                secret,
                {
                    expiresIn: "10m",
                              
                },  (err, token) => {
                    if(err) reject(err);
                    resolve(token);
                }
            )
        });
        return p;
    }

    const append_token = function(token) {
        
        req.authToken = token;
        next();
    }

    /*
    const userInstance = User.findOneByUserId(userId).then(check)
    const problemInstance = Problem.findOneByProblemId(problemId).then(check)
    */


    // temporary implementation

    let userInstance = new Promise((resolve, reject) => {
        resolve(userId);
        reject('');
    })
    let problemInstance = new Promise((resolve, reject) => {
        resolve(problemId);
        reject('');
    })

    Promise.all([userInstance, problemInstance]).then(values => {
        make_token(values[0], values[1])
        .then(append_token)
        .catch(e => {
            console.log("Error: " + e);
            res.status(500).send('something broke in auth');
        })
    });
    
}




exports.verify_token = function(req, res, next) {
    // read the token from header or url
    const token = req.header('x-auth-token') || req.query.token;

    //token does not exist
    if(!token) {
        return res.status(401).send('Unauthorized');
    }

    const p = new Promise((resolve, reject) => {
        jwt.verify(token, req.app.get('jwt-secret'), (err, decoded) => {
            if(err) reject(err);
            resolve(decoded);
        })
    });

    p.then((decoded) => {
        req.decoded = decoded;
        next()
    })
    .catch(e => {
        res.status(401).send('Unauthorized');
    });


}



