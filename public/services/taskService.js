angular.module('taskService', [])

.factory('Task', function ($http) {

        var taskFactory = {};

        taskFactory.create = function(taskData) {
            return $http.post('/tasks', taskData);
        };

        taskFactory.removeTask = function(id) {
            return $http.delete('/tasks/' + id);
        };

        taskFactory.allTasks = function () {
            return $http.get('/tasks');
        };

        taskFactory.getTaskAuthor = function(id) {
            return $http.get('/users/get/' + id);
        };

        taskFactory.getTaskTo = function(id) {
            return $http.get('/users/get/' + id);
        };

        taskFactory.getProjectById = function(id) {
            return $http.get('/tasks/get/' + id);
        };

        taskFactory.getTasksFromProject = function(id) {
            return $http.get('/tasks/getAllFromProject/' + id);
        }

        taskFactory.getTaskById = function(id) {
            return $http.get('/tasks/getTaskById/' + id);
        }

        taskFactory.updateTask = function(selectedTask) {
            return $http.put('/tasks', selectedTask);
        }

        taskFactory.getHistory = function(id) {
            return $http.get('/tasks/getHistory/' + id);
        }

        taskFactory.sendComment = function(id, newComment) {
            return $http.post('/tasks/comment/' + id, newComment);
        }

        taskFactory.getComments = function(id) {
            return $http.get('/tasks/comments/' + id);
        }

        taskFactory.removeComment = function(id) {
            return $http.delete('/tasks/comment/' + id);
        }

        return taskFactory;

    });