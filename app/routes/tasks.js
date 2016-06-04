var User = require('../models/user');
var Project = require('../models/project');
var Comment = require('../models/projectComments');
var TaskHistory = require('../models/taskHistory');
var Task = require('../models/task');
var config = require('../../config');
var secretKey = config.secretKey;
var ObjectId = require('mongodb').ObjectID;
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
        .post(function(req, res){

            var count = 0;
            var projectName = "";

            Task.find({ mark: req.body.mark }, function (err, countTasks) {
                if(err) {
                    res.send(err);
                    return;
                }

                count = countTasks.length;

                var index;
                if(count != 0) {
                    index = parseInt(countTasks[countTasks.length - 1].indexMark.split("-")[1]) + 1;
                }else {
                    index = 0;
                }

                Project.findOne({ _id: ObjectId(req.body.mark) }, function (err, project) {
                    if(err) {
                        res.send(err);
                        return;
                    }

                    projectName = project.mark + '-' + index;


                    var task = new Task({
                        mark: req.body.mark,
                        title: req.body.title,
                        description: req.body.description,
                        author: req.decoded._id,
                        task_to: req.body.task_to,
                        status: "To Do",
                        priority: req.body.priority,
                        indexMark: projectName
                    });

                    task.save(function (err, newTask) {
                        if(err) {
                            res.send(err);
                            console.log(err);
                            return;
                        }

                        res.json({message: "Successfuly added new task!"});
                    })



                });


            });



        })
        .get(function(req, res) {
            Task.find({ task_to: req.decoded._id}, function(err, tasks) {
                if(err) {
                    res.send(err);
                    return;
                }

                res.json(tasks);
            });
        });

    router.delete('/:id', function (req, res) {
           Task.remove({ _id: req.params.id }, function (err, removed) {
               if(err) {
                   res.send(err);
                   return;
               }

               res.json(removed);
           })
        });

    router.put('/', function (req, res) {

           Task.findOne({ _id: req.body._id }, function (err, task) {
               if(err) {
                res.send(err);
                return;
               }

               var newTaskHistory = new TaskHistory({
                    mark: task.mark,
                    title: task.title,
                    description: task.description,
                    author: task.author,
                    task_to: task.task_to,
                    status: task.status,
                    priority: task.priority,
                    indexMark: task.indexMark,
                    taskId: task._id,
                    userId: req.decoded._id,
                    time: new Date()
               });

               console.log(newTaskHistory);

               newTaskHistory.save(function (err, history) {
                   if(err) {
                        res.send(err);
                        console.log(err);
                        return;
                   }

                   console.log(history);
               })

               Task.update( { _id: req.body._id, mark: req.body.mark, title: req.body.title, description: req.body.description, author: req.body.author, task_to: req.body.task_to, status: req.body.status, priority: req.body.priority, indexMark: req.body.indexMark }, function (err, updated) {
                    if(err) {
                        res.send(err);
                        console.log(err);
                        return;
                    }
                    console.log(updated);

                    res.json(updated);
               })


           }) 
        });


    router.get('/get/:id', function (req, res) {
        var taskId = req.params.id;

        Project.findOne({ _id: taskId}, function(err, task) {
            if(err) {
                res.send(err);
                return;
            }


            res.json(task);
        });
    });

    router.get('/getAllFromProject/:id', function (req, res) {
        var projectId = req.params.id;

        Task.find({ mark: projectId }, function (err, tasks) {
            if(err) {
                res.send(err);
                console.log(err);
                return;
            }

            res.json(tasks);
        })
    });

    router.get('/getTaskById/:id', function (req, res) {
        var taskId = req.params.id;

        Task.findOne({ _id: ObjectId(taskId) }, function (err, task) {
            if(err) {
                res.send(err);
                return;
            }

            res.json(task);
        })
    });

    router.get('/getHistory/:id', function (req, res) {
        var id = req.params.id;

        TaskHistory.find({ taskId: id }, function (err, tasks) {
            if(err) {
                res.send(err);
                return;
            }

            res.json(tasks);
        })

    });

    router.route('/comment/:id')
        .post(function (req, res) {

            var newComment = new Comment({
                projectId: req.params.id,
                userId: req.decoded._id,
                comment: req.body.comment,
                time: new Date()
            });

            newComment.save(function (err, comment) {
                if(err) {
                    res.send(err);
                    return;
                }

                res.json(comment);
            })
        })
        .delete(function (req, res) {
            Comment.remove({ _id: req.params.id}, function (err, deleted) {
                if(err) {
                    res.send(err);
                    return;
                }


            })
        });


    router.get('/comments/:id', function (req, res) {

        console.log(req.params.id);

        Comment.find({ projectId: req.params.id }, function (err, comments) {
            if(err) {
                res.send(err);
                return;
            }

            console.log(comments);

            res.json(comments);
        });



    });




    return router;

};