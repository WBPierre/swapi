module.exports = function(app){
    const data = require('../src/dataController');
    const middleware = require('../middleware/jwt');
    const api = require('../providers/SwapiProvider');

    app.route('/swapi/:resource?/:id?')
        .all(middleware.verify_token)
        .get(data.explore);
};
