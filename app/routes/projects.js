var User = require('../models/user');
var UserOnProject = require('../models/userOnProject');
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
                status: "opened"
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


    router.route('/user/:userId/:projectId')
        .post(function(req, res) {
            // Add user on project
            console.log("ADD USER ON PROJECT" + req.params.userId);
            console.log(req.params.projectId)
            
            var uop = new UserOnProject({
                userId: req.params.userId,
                projectId: req.params.projectId
            });

            uop.save(function (err, newUserOnProject) {
                if(err) {
                    res.send(err);
                    return;
                }

                res.json({ message: "User added to project" });
            })
        })
        .delete(function(req, res) {
            // Remove user from project
        });


    router.get('/allUsersOnProject/:id', function (req, res) {
        UserOnProject.find({ projectId : req.params.id }, function (err, users) {
            if(err) {
                res.send(err);
                return;
            }

            idList = [];

            for (var i = 0; i < users.length; i++) {
                idList.push(users[i].userId);
            }

            User.find( { _id : { $in : idList } }, function (err, allUsers) {
                if(err) {
                    res.send(err);
                    return;
                }   

                res.json(allUsers);
            });
        })
    });

    router.get('/potentialUsers/:id', function (req, res) {
        UserOnProject.find({ projectId : req.params.id }, function (err, usersOnProject) {
            if(err) {
                res.send(err);
                return;
            }

            idList = [];
            idList.push(req.decoded._id);

            for (var i = 0; i < usersOnProject.length; i++) {
                idList.push(usersOnProject[i].userId);
            }
            console.log(idList);

            User.find({ _id : {$in : idList } }, function (err, allUsersOnProject) {
                if(err) {
                    res.send(err);
                    return;
                }


                User.find({}, function (err, allUsers) {

                    for( var i = 0; i < allUsers.length; i++) {
                        for( var j = 0; j < allUsersOnProject.length; j++) {

                            if(allUsers[i]._id.equals(allUsersOnProject[j]._id)) {
                                var index = allUsersOnProject.indexOf(allUsersOnProject[i]);
                                allUsers.splice(index, 1);
                            }
                            else
                                console.log("NOt equal");

                        }
                    }

                    console.log(allUsers);

                    res.json(allUsers);
                })

                
            })

        })
    })


    return router;

};