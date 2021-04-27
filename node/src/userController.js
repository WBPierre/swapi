'use strict';

const jwt = require('jsonwebtoken');
const config = require('../config/secrets');
const staticData = require('../config/user');

exports.user_login = function(req, res){
    if(req.body.username === staticData.user.username && req.body.password === staticData.user.password){
        jwt.sign({user: staticData.user}, config.secrets.jwt_key, {expiresIn: '30 days'}, (err, token) => {
            if(err) res.send(err);
            res.json({token});
        });
    }else{
        res.sendStatus(400);
    }
};

exports.verify_token = function (req, res){
    if(req.body.token){
        jwt.verify(req.body.token, config.secrets.jwt_key, (err, authData) => {
            if(err){
                console.log(err.message);
                res.sendStatus(403);
            }
            res.sendStatus(200);
        });
    }else{
        res.sendStatus(403);
    }

}
