var User = require('../models/user');
var config = require('../../config');
var secretKey = config.secretKey;
var jsonwebtoken = require('jsonwebtoken');

function createToken(user) {

    var token = jsonwebtoken.sign({
        _id: user._id,
        username: user.username
    }, secretKey, {
        expiresIn: 1440
    });

    return token;
}


module.exports = function(app, express) {

    var router = express.Router();


    router.post('/signup', function(req, res) {

        var user = new User({
            username: req.body.username,
            password: req.body.password,
            role: 'user'
        });

        var token = createToken(user);

        user.save(function(err) {
            if(err) {
                res.send(err);
                return;
            }

            res.json({
                success: true,
                message: 'User has been created!',
                token: token
            });
        });
    });

    router.get('/all', function(req, res) {
        User.find({}, function (err, users) {
            if(err) {
                res.send(err);
                return;
            }

            res.json(users);
        });
    });

    router.post('/login', function(req, res) {
        User.findOne({
            username: req.body.username
        }).select('username password role').exec(function(err, user) {
            if(err) throw err;

            if(!user) {
                res.send({ message: "User does not exist"});
            }else if(user) {
                var validPassword = user.comparePassword(req.body.password);

                if(!validPassword) {
                    res.send({ message: "Invalid Password"});
                }else {
                    var token = createToken(user);

                    res.json({
                        success: true,
                        message: "Successfuly login!",
                        token: token
                    });
                }
            }
        });
    });

    router.use(function(req, res, next) {
        var token = req.body.token || req.param('token') ||req.headers['x-access-token'];

        if(token) {
            jsonwebtoken.verify(token, secretKey, function(err, decoded) {
                if(err) {
                    res.status(403).send({ success: false, message: "Failed to authenticate user!"});
                }else {
                    req.decoded = decoded;
                    next();
                }
            });
        }else {
            res.status(403).send({ success: false, message: "No Token Provider"});
        }
    });

    router.get('/me', function (req, res) {
        res.json(req.decoded);
    });

    router.get('/get/:id', function(req, res) {
        var userId = req.params.id;

        User.findOne({ _id: userId}, function(err, user) {
            if(err) {
                res.send(err);
                return;
            }

            res.json(user);
        });
    });

    return router;

};