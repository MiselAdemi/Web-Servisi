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

        return projectFactory;

    });