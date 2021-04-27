module.exports = function(app){
    const user = require('../src/userController');

    app.post('/user/login', user.user_login);
    app.post('/user/verifyToken', user.verify_token);
};
