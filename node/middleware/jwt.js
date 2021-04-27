const jwt = require('jsonwebtoken');
const config = require('../config/secrets');
const fs = require('fs');
const randomHash = require('random-hash');

exports.verify_token = function(req, res, next){
    let auth = req.headers['authorization'];
    if(typeof auth !== 'undefined'){
        jwt.verify(auth, config.secrets.jwt_key, (err, authData) => {
            if(err){
                console.log(err.message);
                res.sendStatus(403);
            }
            next();
        });
    }else{
        res.sendStatus(403);
    }
};
