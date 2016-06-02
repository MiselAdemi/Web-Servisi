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

        return taskFactory;

    });