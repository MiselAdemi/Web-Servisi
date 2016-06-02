angular.module('projectService', [])

.factory('Project', function ($http) {

        var projectFactory = {};

        projectFactory.create = function(projectData) {
            return $http.post('/projects', projectData);
        };

        projectFactory.allProjects = function () {
            return $http.get('/projects');
        };

        projectFactory.getProjectAuthor = function(id) {
            return $http.get('/users/get/' + id);
        };

        projectFactory.allUsers = function () {
            return $http.get('/users/all');
        }

        projectFactory.addUser = function(userId, projectId) {
            return $http.post('/projects/user/' + userId + "/" + projectId);
        };

        projectFactory.removeUser = function(userId, projectId) {
            return $http.delete('/projects/user/' + userId + "/" + projectId);
        };

        projectFactory.usersOnProject = function(id) {
            return $http.get('/projects/allUsersOnProject/' + id);
        }

        projectFactory.potentialUsers = function(id) {
            return $http.get('/projects/potentialUsers/' + id);
        }

        return projectFactory;

    });