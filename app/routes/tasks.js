var User = require('../models/user');
var Task = require('../models/task');
var config = require('../../config');
var secretKey = config.secretKey;
var jsonwebtoken = require('jsonwebtoken');

module.exports = function(app, express) {

    var router = express.Router();


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
            })
        }else {
            res.status(403).send({ success: false, message: "No Token Provider"});
        }
    });


    router.route('/')
        .post(function(req, res) {
            var task = new Task({
                mark: req.body.mark,
                title: req.body.title,
                description: req.body.description,
                author: req.decoded._id,
                task_to: req.body.user_to,
                status: "to_do",
                priority: req.body.priority
            });

            task.save(function (err, newTask) {
                if(err) {
                    res.send(err);
                    return;
                }

                res.json({message: "Successfuly added new task!"});
            })

        })
        .get(function(req, res) {
            Task.find({ author: req.decoded._id}, function(err, tasks) {
                if(err) {
                    res.send(err);
                    return;
                }

                res.json(tasks);
            });
        });



    return router;

};