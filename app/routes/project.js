var User = require('../models/user');
var Project = require('../models/project');
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
            var project = new Project({
                mark: req.body.mark,
                description: req.body.description,
                author: req.decoded._id,
            });

            project.save(function (err, newProject) {
                if(err) {
                    res.send(err);
                    return;
                }

                res.json({message: "Successfuly added new project!"});
            })

        })
        .get(function(req, res) {
            Project.find({ author: req.decoded._id}, function(err, project) {
                if(err) {
                    res.send(err);
                    return;
                }

                res.json(project);
            });
        });



    return router;

};