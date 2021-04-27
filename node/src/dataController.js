'use strict';

const request = require('request');
const swapi = require('../providers/SwapiProvider');

exports.explore = function(req, res){
    const resource = req.params.resource;
    let requestUrl = swapi.swapi.baseUrl;
    if(resource){
        const search = req.query.search;
        requestUrl += resource+"/";
        const id = req.params.id;
        if(!search){
            if(id){
                requestUrl+=id;
            }
        }else{
            requestUrl+="?search="+search;
            const page = req.query.page;
            if(page){
                requestUrl+="&page="+page;
            }
        }
    }
    request(requestUrl, function(err, response, body){
        if (err) {
            console.log(err);
            res.sendStatus(409)
        }else{
            res.json(JSON.parse(body));
        }
    });
};
